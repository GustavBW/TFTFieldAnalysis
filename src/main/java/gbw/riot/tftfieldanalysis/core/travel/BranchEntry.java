package gbw.riot.tftfieldanalysis.core.travel;

/**
 * On null member, assume all is included
 * @param start int | null, id of branch origin point
 * @param includedNamespaces String[] | null
 * @param includedTags String[] | null
 * @param pointIds int[] | null
 */
public record BranchEntry(
        int start, String[] includedNamespaces, String[] includedTags, int[] pointIds) {

    //traverse context: array of all former branch points for current point
    //context should accommodate culling on any of: "namespace", "tag", "ids"
    //context should be either query param or path variable
    //query param it is. It is easier to isolate (none are hard, but string.substring(string.indexOf("?")) is pretty quick)
    //also conforms to http url standards - only 1 "?" per url for param list start
    //context is required
    //i.e. context is just a list of entries of culling parameters, which may or may not include the branch origin point

}
