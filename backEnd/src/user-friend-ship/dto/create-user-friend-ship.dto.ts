export class CreateUserFriendShipDto {
    constructor( 
        public requesterId : string,
        public  requestedId : string,
        public status : string){}
   
}
