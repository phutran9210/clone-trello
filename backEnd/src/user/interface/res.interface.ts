
export interface BasicResponse {
    status: number;
    message: string;
  }

export interface LoggedUser{
  user_id : string ,
  username : string ,
  role : string ,
}

interface User {
  userId: number;
  username: string;
}

interface SearchState {
  response: User[];
  error: {
    statusCode: number;
    message: string;
  };
  loading: boolean;
}

export interface tokenUser{
  
    sub: string,
    username: string,
    role: string,
    iat: number,
    exp: number
  
}