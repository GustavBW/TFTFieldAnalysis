package gbw.riot.tftfieldanalysis.services;

import gbw.riot.tftfieldanalysis.core.DataModel;
import gbw.riot.tftfieldanalysis.core.DataPoint;
import gbw.riot.tftfieldanalysis.core.MatchData;
import gbw.riot.tftfieldanalysis.core.ValueErrorTouple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
public class ModelTrainingService {
    @FunctionalInterface
    public interface ExcludeMatchFunction {
        boolean eval(MatchData match);
    }

    public static class TrainingConfiguration{
        public int maxMatchCount = 10;
        public String patch = null;
        public boolean confineToBasePlayer = false;
        public TrainingConfiguration(){}
        public TrainingConfiguration(int maxMatchCount){
            this.maxMatchCount = maxMatchCount;
        }
        public TrainingConfiguration(String patch){
            this.patch = patch;
        }
        public TrainingConfiguration(int maxMatchCount, String patch){
            this.patch = patch;
            this.maxMatchCount = maxMatchCount == 0 ? 10 : maxMatchCount;
        }
        public TrainingConfiguration(int maxMatchCount, String patch, boolean confineToBasePlayer){
            this.patch = patch;
            this.maxMatchCount = maxMatchCount == 0 ? 10 : maxMatchCount;
            this.confineToBasePlayer = confineToBasePlayer;
        }
    }

    @Autowired
    private DataRetrievalService retrievalService;

    public ValueErrorTouple<Set<String>,Exception> run(DataModel model, String puuid, TrainingConfiguration config){
        if(config.patch == null){
            return run(
                    model,
                    puuid,
                    config,
                    data -> false
            );
        }
        return run(
                model,
                puuid,
                config,
                data -> !data.metadata().data_version().equalsIgnoreCase(config.patch)
            );
    }

    public ValueErrorTouple<Set<String>,Exception> run(DataModel model, String puuid, TrainingConfiguration config, ExcludeMatchFunction excludeFunc){
        return run(
                model,
                config,
                puuid,
                excludeFunc,
                Set.of()
        );
    }

    public ValueErrorTouple<Set<String>,Exception> run(DataModel model, TrainingConfiguration config, String puuid, ExcludeMatchFunction excludeFunc,  Set<String> excludedMatches){
        long timeA = System.currentTimeMillis();
        LocalDateTime dateStart = LocalDateTime.now();
        ValueErrorTouple<Set<String>,Exception> result = retrievalService.start(
                config,
                match -> parseMatch(match, model, excludeFunc),
                excludedMatches
        );
        model.getMetaData().dateSecondsTrainingMap().add(
                new DataModel.TrainingSession(dateStart, System.currentTimeMillis() - timeA)
        );
        return result;
    }
    private static final String[] defaultNoTrack = new String[]{"player","item"};

    private boolean parseMatch(MatchData data, DataModel model, ExcludeMatchFunction excludeFunc){
        if(excludeFunc.eval(data)){
            return false;
        }
        for(MatchData.Info.Participant participant : data.info().participants()){
            DataPoint playerAsPoint = model.insertPoint("player", Set.of(participant.puuid()),defaultNoTrack);
            DataPoint placementAsPoint = model.insertPoint("placement", Set.of(participant.placement() + ""),defaultNoTrack);
            DataPoint gametimeAsPoint = model.insertPoint("round", Set.of(participant.last_round() + ""), defaultNoTrack);
            model.insertOrIncrementEdge(placementAsPoint, playerAsPoint);

            for(MatchData.Info.Trait trait : participant.traits()){
                DataPoint traitAsPoint = model.insertPoint("trait", Set.of(trait.name(), trait.num_units() + ""), defaultNoTrack);
                model.insertOrIncrementEdge(traitAsPoint, playerAsPoint);
                model.insertOrIncrementEdge(traitAsPoint, placementAsPoint);
                model.insertOrIncrementEdge(traitAsPoint, gametimeAsPoint);
            }

            for(MatchData.Info.Unit unit : participant.units()){
                DataPoint unitAsPoint = model.insertPoint("unit", Set.of(unit.character_id(), unit.tier() + ""), defaultNoTrack);
                model.insertOrIncrementEdge(unitAsPoint, placementAsPoint);
                model.insertOrIncrementEdge(unitAsPoint, playerAsPoint);
                model.insertOrIncrementEdge(unitAsPoint, gametimeAsPoint);

                for(String item : unit.itemNames()){
                    DataPoint itemAsPoint = model.insertPoint("item", Set.of(item), defaultNoTrack);
                    model.insertOrIncrementEdge(itemAsPoint, unitAsPoint);
                    model.insertOrIncrementEdge(itemAsPoint, placementAsPoint);
                    model.insertOrIncrementEdge(itemAsPoint, playerAsPoint);
                    model.insertOrIncrementEdge(itemAsPoint, gametimeAsPoint);
                }
            }
        }
        model.getMetaData().matchIdsEvaluated().add(
                model.getMetaData().dictionary().insert(
                        data.metadata().match_id()
                )
        );

        return false;
    }
}
