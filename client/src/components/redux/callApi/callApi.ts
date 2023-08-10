import axios from "axios";
import {DataForm} from "../../interfaces/regiterUpload"
import {inviteInfo} from "../../interfaces/reduxActions"
import {loginPayload,dataSearch } from "../../interfaces/reduxActions"

const url = "http://localhost:3000"

export const fetchCreateUser = (payload : DataForm) =>
  axios.post(`${url}/user`, payload);

export const fetchConfirmRegister = ( payload : { user_id: string; code: string }) =>
  axios.post(`${url}/user/validate-code`, payload);

export const fetchReConfirmRegister = ( payload : { username : string, password : string}) =>
  axios.post(`${url}/user/reconfirm`, payload);

export const fetchLogin = ( payload : loginPayload) =>
  axios.post(`${url}/user/login`, payload,{ withCredentials: true });

export const fetchSearch = ( payload : dataSearch) =>
  axios.post(`${url}/user/searchUser`, payload);



export const fetchInvite = (payload : inviteInfo)=>
  axios.post(`${url}/user-friend-ship`,payload)

export const fetchConfirmInvite = (payload : inviteInfo)=>
   axios.post(`${url}/user-friend-ship/confirm`,payload)

export const fetchCancelInvite = (payload : inviteInfo)=>
   axios.post(`${url}/user-friend-ship/cancel`,payload)

export const fetchBlockUser = (payload : inviteInfo)=>
   axios.post(`${url}/user-friend-ship/block`,payload, { withCredentials: true })

export const fetchGetProfile = (userId : string ) => 
   axios.get(`${url}/user/${userId}`, { withCredentials: true });

export const fetchGetChat = (roomId : string, page : number) => 
   axios.get(`${url}/chat-real-time/room/${roomId}?page=${page}`, { withCredentials: true });

export const fetchGePreviewChat = (userId : string) => 
   axios.get(`${url}/chat-real-time/preview/${userId}`, { withCredentials: true });

export const fetchInforInRoom = (idRoom : string) => 
   axios.get(`${url}/user/infor-in-room/${idRoom}`, { withCredentials: true });

export const fetchSearchUserForChat = (payload : string) => 
   axios.post(`${url}/user/createchatsearch`,payload, { withCredentials: true });





