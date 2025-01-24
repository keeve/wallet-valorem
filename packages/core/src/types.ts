export interface Record {
    messageId: string,
    body: any,
}


export interface HEvent {
    Records: Record[]
}

export interface WebEvent {
    rawPath: string
    headers: any, // todo - implement this correctly
    body: any, // todo
}