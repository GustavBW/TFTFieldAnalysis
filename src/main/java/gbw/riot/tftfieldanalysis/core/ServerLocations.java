package gbw.riot.tftfieldanalysis.core;

public enum ServerLocations {
    BR1("br1"), EUN1("eun1"), EUW1("euw1"),
    JP1("jp1"), KR("kr"), LA1("la1"), LA2("la2"),
    NA1("na1"), OC1("oc1"), PH2("ph2"), RU("ru"),
    SG2("sg2"), TH2("th2"), TR1("tr1"), TW2("tw2"),
    VN2("vn2"), ERR_UNKNOWN("err_unknown");
    public final String domain;
    ServerLocations(String domain){
        this.domain = domain;
    }
    public static ServerLocations byDomain(String string){
        for(ServerLocations location : ServerLocations.values()){
            if(string.equalsIgnoreCase(location.domain)){
                return location;
            }
        }
        return ERR_UNKNOWN;
    }
}
