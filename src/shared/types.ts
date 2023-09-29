export enum ItemStatus {
    pending = "pending",
    ready= "ready",
    error = "error",
    deleted = "deleted"
}

export interface Item {
    id?: string,
    name?: string,
    status?: ItemStatus,
    creationTimeSec?: number,
    deletionTimeSec?: number
}

export enum ApiStatus {
    connecting = "connecting",
    ready= "ready",
    error = "error"
}

export enum SocketStatus {
    connecting = "connecting",
    ready= "connected",
    error = "error"
}