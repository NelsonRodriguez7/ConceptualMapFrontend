export interface ResponseWrapper <T>{
   body?: T | null,
   status: Status  
}

export interface Status {
    code: string,
    description: string
}