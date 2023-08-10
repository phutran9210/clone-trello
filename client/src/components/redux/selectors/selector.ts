
import { createSelector } from "reselect";

export const isLoadingRegister = (state: { createUser: { loading: boolean; }; }) => state.createUser.loading
export const hasErrRegister = (state: { createUser: { hasError: boolean; }; }) => state.createUser.hasError
export const confirmRegiter = (state: { createUser: { response: {  confirmCode: string; }; }; }) => state.createUser.response.confirmCode;
export const user_idRegiter = (state: { createUser: { response: { user_id : string }; }; }) => state.createUser.response.user_id;
export const successRegiter = (state: { createUser: { response: {  code: number}; }; }) => state.createUser.response.code;
export const confirmSuccess = (state : { confirmUser :{  response : {message : string,status : number} } }) => state.confirmUser.response.status;
export const confirmMesage = (state : { confirmUser :{  response : {message : string,status : number} } }) => state.confirmUser.response.message;

export const messageErr = (state : {userLogged: { err : { message : string}}})=> state.userLogged.err.message
export const messageSuccess = (state : {userLogged: { response : { message : string}}})=> state.userLogged.response.message

export const inviteSelector = (state : {invite : { response : {}}}) => state.invite.response

export const resultData = ( state : { searchData : { response : []}}) => state.searchData.response

export const profileSelector = (state : {getProfile :{response: {status : number, result : []}}}) => state.getProfile.response

export const setChatWindow = ( state : {chatWindow :{isOpen : boolean} })=> state.chatWindow.isOpen
export const getChatData = (state : { getChat : { data : []}}) => state.getChat.data
export const loadMoreSelector = (state : { getChat : {hasMore : boolean}}) => state.getChat.hasMore
export const inputChatData = ( state : { inputChat : {inputValue : string}})=> state.inputChat.inputValue

export const previewChatSelector = (state : { previewChat : { data : []}}) =>state.previewChat.data
export const dataRoomSelector = (state : { previewChat : { dataRoom : []}} ) => state.previewChat.dataRoom
export const roomNameSelector = (state : { previewChat : { selectedRoom : []}} ) => state.previewChat.selectedRoom
export const loggedUserSelector = (state : { previewChat : { loggedUser : null}} ) => state.previewChat.loggedUser
export const inviteUserSelector = (state : { createChat : { data : string}}) => state.createChat.data
export const permissionSelector = (state : { createChat  : { permisionBoard : []}}) => state.createChat.permisionBoard
export const selectedUserSelector = (state : { createChat : { selectedUser : string}}) => state.createChat.selectedUser