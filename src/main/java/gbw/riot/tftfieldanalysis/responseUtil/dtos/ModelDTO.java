package gbw.riot.tftfieldanalysis.responseUtil.dtos;

import gbw.riot.tftfieldanalysis.core.DataModel;
import gbw.riot.tftfieldanalysis.core.DataPoint;
import gbw.riot.tftfieldanalysis.core.Dictionary;
import gbw.riot.tftfieldanalysis.core.Edge;

import java.util.List;
import java.util.Map;
import java.util.Set;

public record ModelDTO(
        ModelMetaDataDTO metadata,
        List<String> namespaces,
        Map<Integer, Set<Edge>> pointIdEdgeSetMap,
        Map<String,Set<DataPoint>> namespacePointMap
        ) {

    public static ModelDTO of(DataModel model) {
        Dictionary<String> dictionary = model.getMetaData().dictionary();
        return new ModelDTO(
                ModelMetaDataDTO.of(model),
                dictionary.translateAll(model.getNamespaces()),
                model.getPointEdgeMap(),
                dictionary.decompress(model.getNamespacePointMap())
        );
    }
}
