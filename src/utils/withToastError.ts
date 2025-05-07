import Toast from 'react-native-toast-message';

type AnyFunction<A extends any[], R> = (...args: A) => R;

const withToastError = <A extends any[], R>(
    fn: AnyFunction<A, R | Promise<R>>,
    type: string = 'Internal'
): AnyFunction<A, Promise<R | undefined>> => {
    return async (...args: A): Promise<R | undefined> => {
        try {
            const result = fn(...args);
            if (result instanceof Promise) {
                return await result;
            }
            return result;
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: type + ' Error',
                text2: error instanceof Error ? error.message : String(error)
            });
            return undefined;
        }
    };
};

export default withToastError;