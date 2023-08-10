export interface loginPayload {
    username : string,
    password : string
}

export interface inviteInfo{
    requesterId : string,
    requestedId : string,
    status : string
}

export interface dataSearch{
    requesterId : string,
    content : string,
}

export interface userBasicInfo{
    userId : string,
    username : string
}