export interface DataForm {
    username : string
    email : string;
    password : string;
}


export interface RegisterUserPayload {
    dataForm: DataForm;
    callback: () => void;
  }
  