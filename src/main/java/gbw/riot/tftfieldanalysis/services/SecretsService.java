package gbw.riot.tftfieldanalysis.services;

import gbw.riot.tftfieldanalysis.core.environmentloading.RequestsEnvironmentResource;
import gbw.riot.tftfieldanalysis.core.ValueErrorTuple;
import gbw.riot.tftfieldanalysis.responseUtil.ArrayUtil;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequestsEnvironmentResource
public class SecretsService {

    private static String root;
    static {
        File file = new File(".");
        try{
            root = file.getCanonicalPath();
        }catch (IOException e){
            System.err.println("SecretsService: Project Root Not Found");
            e.printStackTrace();
        }
    }
    private static class DateValueEntry{
        public long ms;
        public ValueErrorTuple<String,Exception> result;
        public DateValueEntry(long ms, ValueErrorTuple<String,Exception> result){
            this.ms = ms;
            this.result = result;
        }
    }

    private final Map<String,DateValueEntry> cache = new HashMap<>();

    public ValueErrorTuple<String,Exception> getConfigurable(String key) {
        return getByKey(key, "/runtimeConfigurables.txt");
    }

    public ValueErrorTuple<String,Exception> getSecret(String key){
        return getByKey(key, "/secrets.txt");
    }

    private ValueErrorTuple<String,Exception> getByKey(String key, String pathAndFile){
        DateValueEntry entry = cache.get(key);
        final long now = System.currentTimeMillis();
        if(entry == null){
            //if no entry - i.e. on first request - load the value
            loadKVToCache(key,pathAndFile);
        }else if(entry.ms < now + 5000){
            //if older than 5 seconds, reload value
            updateCacheEntry(entry, key, now,pathAndFile);
        }
        return cache.get(key).result;
    }

    private void updateCacheEntry(DateValueEntry entry, String key, long now, String pathAndFile){
        entry.result = getValueOf(key,pathAndFile);
        entry.ms = now;
    }

    private void loadKVToCache(String key, String pathAndFile){
        final long processStart = System.currentTimeMillis();
        cache.put(
                key,
                new DateValueEntry(
                        processStart,
                        getValueOf(key, pathAndFile)
                )
        );
    }

    private ValueErrorTuple<String,Exception> getValueOf(String key, String pathAndFile){
        try{
            BufferedReader br = new BufferedReader(new FileReader(root + pathAndFile));
            String line;
            String[] split;
            while((line = br.readLine()) != null){
                split = line.split(":");
                split = ArrayUtil.forEach(split, String::trim);
                split = ArrayUtil.resizeStringArray(split, s -> !s.isEmpty());
                if(split.length < 2){
                    return ValueErrorTuple.error(new Exception("Incorrect k:v declaration for key: " + key));
                }
                if(split[0].equals(key)){
                    return ValueErrorTuple.value(split[1]);
                }
            }
            br.close();
        }catch (IOException e){
            return ValueErrorTuple.error(e);
        }
        return ValueErrorTuple.error(new Exception("No Such Key"));
    }
}
