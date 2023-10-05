export interface ServerError {
    code: string,
    message: string,
};

export interface ServerErrors {
    errors: ServerError[]
};
