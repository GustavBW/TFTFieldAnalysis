package gbw.riot.tftfieldanalysis.controllers;

import gbw.riot.tftfieldanalysis.core.DataModel;
import gbw.riot.tftfieldanalysis.core.ServerLocations;
import gbw.riot.tftfieldanalysis.responseUtil.dtos.AccountDTO;
import gbw.riot.tftfieldanalysis.responseUtil.dtos.SummonerDTO;
import gbw.riot.tftfieldanalysis.core.ValErr;
import gbw.riot.tftfieldanalysis.responseUtil.ArrayUtil;
import gbw.riot.tftfieldanalysis.responseUtil.DetailedResponse;
import gbw.riot.tftfieldanalysis.responseUtil.ResponseDetails;
import gbw.riot.tftfieldanalysis.services.DataRetrievalService;
import gbw.riot.tftfieldanalysis.services.DefaultResponseRegistryService;
import gbw.riot.tftfieldanalysis.services.ModelRegistryService;
import gbw.riot.tftfieldanalysis.services.ModelTrainingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/v1/train", produces = "application/json")
public class ModelTrainingController {

    @Autowired
    private ModelRegistryService registry;

    @Autowired
    private ModelTrainingService trainer;

    @Autowired
    private DefaultResponseRegistryService responses;

    @Autowired
    private DataRetrievalService dataRetrievalService;

    /**
     * @return Static asset retrieval: Get TFT Server Targets
     */
    @Operation(summary = "Static asset retrieval: Get TFT Server Targets.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "String array of valid TFT servers.")
    })
    @GetMapping("/serverTargets")
    public @ResponseBody ResponseEntity<DetailedResponse<List<String>>>
    getValidTFTServerTargets()
    {
        ModelTrainingService.ServerTargets[] values = ArrayUtil.removeTail(ModelTrainingService.ServerTargets.values(),1);
        List<String> asStringList = new ArrayList<>(values.length);
        for(ModelTrainingService.ServerTargets value : values){
            asStringList.add(value.target);
        }
        return new ResponseEntity<>(
                DetailedResponse.success(
                        asStringList
                ), HttpStatusCode.valueOf(200)
        );
    }

    /**
     * @return Static asset retrieval: Get RIOT Account Server Targets
     */
    @Operation(summary = "Static asset retrieval: Get RIOT Account Server Targets.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "String array of valid account servers.")
    })
    @GetMapping("/serverLocations")
    public @ResponseBody ResponseEntity<DetailedResponse<List<String>>>
    getAccountServerLocations()
    {
        ServerLocations[] values = ArrayUtil.removeTail(ServerLocations.values(),1);
        List<String> asStrList = new ArrayList<>(values.length);
        for(ServerLocations value : values) {
            asStrList.add(value.domain);
        }
        return new ResponseEntity<>(
                DetailedResponse.success(
                        asStrList.stream().toList()
                ), HttpStatusCode.valueOf(200)
        );
    }

    /**
     * @param ign IGN of player for given server
     * @param server Server domain
     * @return Cross confirmation: Validate account, returns player puuid
     */
    @Operation(summary = "Cross confirmation: Validate account, returns player puuid.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Player puuid"),
            @ApiResponse(responseCode = "404", description = "Invalid account server target"),
            @ApiResponse(responseCode = "400", description = "Unable to locate/access account")
    })
    @GetMapping("/validate")
    public @ResponseBody ResponseEntity<DetailedResponse<String>>
    validatePlayerIGN(
            @RequestParam String ign,
            @RequestParam @Schema(implementation = ServerLocations.class) String server,
            @RequestParam String tagLine
    ){
        ServerLocations location = ServerLocations.byDomain(server.toLowerCase());

        if(location == ServerLocations.ERR_UNKNOWN){
            return new ResponseEntity<>(
                    DetailedResponse.details(
                            new ResponseDetails(
                                    "Invalid Server Location", "Valid location are: " + ArrayUtil.arrayJoinWith(ServerLocations.values(), ","), null
                            )
                    ), HttpStatusCode.valueOf(404)
            );
        }

        ValErr<AccountDTO, Exception> result = dataRetrievalService.getAccount(ign, location, tagLine);
        if(result.error() != null){
            System.out.println(result.error().getMessage());
            return new ResponseEntity<>(
                    DetailedResponse.details(
                            new ResponseDetails(result.error().getMessage(),"Description intentionally cut short.", null)
                    ), HttpStatusCode.valueOf(400)
            );
        }

        return new ResponseEntity<>(
                DetailedResponse.success(
                        result.value().puuid()
                ), HttpStatusCode.valueOf(200)
        );
    }

    /**
     * @param id identifier of model to train
     * @param puuid personal uuid of base player for model
     * @param config TrainingConfig
     * @return The id of the model when the training is complete (long-polling)
     */
    @Operation(summary = "The id of the model when the training is complete (long-polling).")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Model id"),
            @ApiResponse(responseCode = "404", description = "Unknown model"),
            @ApiResponse(responseCode = "500", description = "Internal model registry missing"),
            @ApiResponse(responseCode = "501", description = "Error encountered while training, details.notes contains what matchIds were evaluated"),
            @ApiResponse(responseCode = "400", description = "Error encountered before training start"),
            @ApiResponse(responseCode = "400", description = "Missing PUUID query parameter")
    })
    @PostMapping("/{id}")
    public @ResponseBody ResponseEntity<DetailedResponse<Integer>> trainModel(
            @PathVariable int id,
            @RequestParam String puuid,
            @RequestBody(required = false) ModelTrainingService.TrainingConfiguration config
    ) {
        if(registry == null){
            return responses.getResponseOnRegistryMissing();
        }
        DataModel model = registry.retrieveModel(id);
        if(model == null){
            return responses.getResponseOnModelNotFound(id);
        }
        if(puuid == null || puuid.isEmpty()){
            return responses.getResponseOnMissingPUUID();
        }

        ValErr<Set<String>,Exception> result = trainer.run(model, puuid, config);
        if(result.error() != null && result.value() != null){
            return new ResponseEntity<>(
                    DetailedResponse.of(
                            model.getMetaData().modelId(),
                            new ResponseDetails(
                                    "Issue Encountered While Training",
                                    result.error().getMessage(),
                                    List.of("Matches evaluated: " +
                                            ArrayUtil.arrayJoinWith(result.value().toArray(new String[0]), ", ")
                                    )
                            )
                    ), HttpStatusCode.valueOf(501)
            );
        }
        if(result.error() != null){
            return new ResponseEntity<>(
                    DetailedResponse.of(
                            model.getMetaData().modelId(),
                            new ResponseDetails(
                                    "Issue Encountered Before Training",
                                    result.error().getMessage(),
                                    null
                            )
                    ), HttpStatusCode.valueOf(400)
            );
        }

        return new ResponseEntity<>(
                DetailedResponse.of(
                        model.getMetaData().modelId(),
                        new ResponseDetails("Training Complete", "Matches evaluated: " + ArrayUtil.arrayJoinWith(result.value().toArray(new String[0]), ", "),
                                List.of("Model: " + id, "maxMatchCount: " + config.maxMatchCount, "patch: " + config.patch)
                        )
                ), HttpStatusCode.valueOf(200)
        );
    }

}
