import { throwError, timer, of } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';

export const genericRetryStrategy = ({
    maxRetryAttempts = 3,
    scalingDuration = 1000,
    excludedStatusCodes = [],
    errorSubject$ = null,
}: {
    maxRetryAttempts?: number,
    scalingDuration?: number,
    excludedStatusCodes?: number[],
    errorSubject$?: any,
} = {}) => ({
    count: maxRetryAttempts,
    delay: (attempts: any, retryCount: number) => {
        return of(attempts).pipe(
            mergeMap((error: any) => {
                // if maximum number of retries have been met
                // or response is a status code we don't wish to retry, throw error
                if (
                    excludedStatusCodes.find(e => e === error.http_status)
                ) {
                    return throwError(() => error);
                }
                console.log(
                    `Attempt ${retryCount}: retrying in ${retryCount *
                    scalingDuration}ms`
                );
                // retry after 1s, 2s, etc...
                return timer(retryCount * scalingDuration);
            }),
            finalize(() => {
                if (retryCount === maxRetryAttempts) {
                    errorSubject$.next(attempts)
                }
            })
        );
    }
})