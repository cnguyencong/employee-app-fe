export interface TodoAddResponse {
    action: string;
    timestamp: Date;
}

export interface TodoEditResponse {
    action: string;
    timestamp: Date;
}

export interface TodoResponse {
    action: string;
    timestamp: Date;
}

export interface TodoFetchAllResponse {
    todo: TodoResponse[];
}