package gbw.riot.tftfieldanalysis.core;

//Because GoLang rules and Java kinda sucks...
public record ValueErrorTuple<T, R>(T value, R error) {

    @FunctionalInterface
    public interface ZeroParameterTupleRetriever<K, M extends Throwable> {
        K run() throws M;
    }
    @FunctionalInterface
    public interface OneParameterTupleRetriever<K, N, M extends Throwable> {
        K run(N value) throws M;
    }

    public static <T, R> ValueErrorTuple<T, R> value(T value) {
        return new ValueErrorTuple<>(value, null);
    }

    public static <T, R> ValueErrorTuple<T, R> error(R error) {
        return new ValueErrorTuple<>(null, error);
    }

    public static <T, R> ValueErrorTuple<T, R> of(T value, R error) {
        return new ValueErrorTuple<>(value, error);
    }

    public static <T, R extends Throwable> ValueErrorTuple<T, R> from(ZeroParameterTupleRetriever<T, R> retriever) {
        T value = null;
        try {
            value = retriever.run();
        } catch (Throwable e) {
            return of(value,(R) e);
        }
        return of(value, null);
    }
    public static <T, N, R extends Throwable> ValueErrorTuple<T, R> from(OneParameterTupleRetriever<T, N, R> retriever, N value) {
        T result = null;
        try {
            result = retriever.run(value);
        } catch (Throwable e) {
            return of(result,(R) e);
        }
        return of(result, null);
    }
}
