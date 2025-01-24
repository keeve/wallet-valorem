export interface Record {
    messageId: string,
    body: any,
}


export interface HEvent {
    Records: Record[]
}

export interface headers {
    authorization?: string
    hmac_value?: string
}

export interface WebEvent {
    requestId: string
    rawPath: string
    headers: headers, // todo - implement this correctly
    body: any, // todo
}