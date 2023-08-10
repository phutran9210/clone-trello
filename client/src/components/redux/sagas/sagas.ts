import { loginPayload,userBasicInfo } from './../../interfaces/reduxActions';
import { Effect, call, put, takeEvery, takeLatest,actionChannel,take,fork,select} from 'redux-saga/effects'
import {DataForm} from "../../interfaces/regiterUpload"
import { registerUserRequest, registerUserSuccess, registerUserFailure,registerConfirmUserRequest,registerConfirmUserFailure,registerConfirmUserSuccess} from "../slices/createUser"
import {confirmRequest,confirmSuccess,confirmFailure,} from "../slices/confirmRegister"
import {loginUserRequest,loginUserSuccess,loginUserFailure} from "../slices/loginUser"
import {searchSuccess,searchRequest,searchFailure,updateStateSearch,updateCancelStateSearch} from "../slices/search"
import {inviteUserRequest,inviteUserSuccess,inviteUserFailure} from "../slices/invite"
import {confirmUserRequest,confirmUserFailure} from "../slices/confirmInvite"
import {cancelUserRequest,cancelUserFailure} from "../slices/cancelInvite"
import {profileUserRequest,profileUserSuccess,profileUserFailure} from "../slices/profile"
import {blockUserFailure,blockUserSuccess,blockUserRequest} from "../slices/blockUser"
import { inviteInfo,dataSearch } from './../../interfaces/reduxActions';
import {openChatWindowRequest,openChatWindowSuccess, closeChatWindow} from "../slices/chatWindow"
import {getChatRequest,getChatSuccess,getChatFailure,sendDataToUpdate,changeChatState,setLoaded,addToCurrentState,getPreChat,setPage,getMoreChat,getMoreChatSuccess,setHasMore} from "../slices/getChat"
import {updateInputValue,setInputValue,setState} from "../slices/inputChat"
import {getPreviewChatRequet,getPreviewChatSuccess,getPreviewFailure,selectRoom,selectRoomSuccess,setLoggedUserRequest,setLoggedUserSuccess,updateRoomData,updateRoomDataSuccess,updateNewRoomDataSuccess,getPreviewData,getPreviewDataSuccess,setParticipants,setFirstRoomRequest,setFirstRoomSuccess} from "../slices/getPreviewChat"
import {createChatRequess,createChatSuccess,createChatFailure,selectedChatUserRequest,selectedChatUserSuccess} from "../slices/createNewChat"

import generateRoomId from "../../messages/ChatWindow"
import * as api from "../callApi/callApi"
import {Modal, message} from "antd"


function* createUser(action : { payload: DataForm }): Generator<Effect, any, any>{

  try {
    const response = yield call(api.fetchCreateUser,action.payload)
    yield put(registerUserSuccess(response.data))
 ;
  } catch (error : any) {  
    yield put(registerUserFailure(error.response.data))
    if (error) {
      Modal.error({
        title: 'Đã xảy ra lỗi',
        content:`${error.response.data.message}` ,
        okText: 'Close',
       
      });
      
    }

  }
}

function* confirmCodeSaga (action : {payload: {user_id: string; code: string} }):Generator<Effect, any, any>{
  
  try {
    const response = yield call(api.fetchConfirmRegister,action.payload )
    yield put(confirmSuccess(response.data))
   
  } catch (error : any) {
    yield put(confirmFailure(error.response.data)) 
    if (error) {
      Modal.error({
        title: 'Đã xảy ra lỗi',
        content:`${error.response.data.message}` ,
        okText: 'Close', 
      });  
    }
  }
}

function* reConfirmCodeSaga(action : {payload: { username : string, password : string} }):Generator<Effect, any, any> {
  try {
    const response = yield call(api.fetchReConfirmRegister, action.payload )
    console.log(response.data);
    yield put(registerConfirmUserSuccess(response.data))
   
  } catch (error : any) {
    yield put(registerConfirmUserFailure(error.response.data)) 
    if (error) {
      Modal.error({
        title: 'Đã xảy ra lỗi',
        content:`${error.response.data.message}` ,
        okText: 'Close', 
      });  
    }
  }
}

function* loginUserSaga (action :{ payload : loginPayload}) :Generator<Effect, any, any> {

  try {
    const response = yield call(api.fetchLogin,action.payload)
    console.log(response.data);
    yield put(loginUserSuccess(response.data))
    localStorage.setItem("loggedUser",JSON.stringify(response.data.data))
  
  } catch (error : any) {
    yield put(loginUserFailure(error.response.data))     
  }
}

function* searchSaga ( action :{payload : dataSearch}) : Generator<Effect,any,any>{
  console.log(action.payload);
  
  try {
    const response = yield call(api.fetchSearch, action.payload);
    console.log(response.data);
    
    yield put(searchSuccess(response.data));
  } catch (error : any) {
    yield put(searchFailure(error.response.data))
    if (error) {
      Modal.error({
        title: 'Đã xảy ra lỗi',
        content:`${error.response.data.message}` ,
        okText: 'Close', 
      });  
    }
  }
}

function* inviteUser(action :{payload : inviteInfo}) : Generator<Effect,any,any>{

  try {
    const respone = yield call(api.fetchInvite,action.payload)
     yield put(inviteUserSuccess(respone.data))
  } catch (error : any) {
    yield put(inviteUserFailure(error.response.data))
    if (error) {
      Modal.error({
        title: 'Đã xảy ra lỗi',
        content:`${error.response.data.message}` ,
        okText: 'Close', 
      });  
    }
  }
  
}

function* confirmFriendShipSaga(action :{payload : inviteInfo}) : Generator<Effect,any,any>{
  try {
    const response = yield call(api.fetchConfirmInvite,action.payload)
   console.log(response);
   yield put(updateStateSearch({id: response.data.id, status: response.data.statusId}));
  } catch (error : any) {

    yield put(confirmUserFailure(error.response.data))
    if (error) {
      Modal.error({
        title: 'Đã xảy ra lỗi',
        content:`${error.response.data.message}` ,
        okText: 'Close', 
      });  
    }
  }
}
function* cancelFriendShipSaga(action :{payload : inviteInfo}) : Generator<Effect,any,any>{
  console.log("cancel",action.payload);
  
  try {
    const response = yield call(api.fetchCancelInvite,action.payload)
   console.log(response);
   yield put(updateCancelStateSearch({id: response.data.id, status: response.data.status_id}));
  } catch (error : any) {

    yield put(confirmUserFailure(error.response.data))
    if (error) {
      Modal.error({
        title: 'Đã xảy ra lỗi',
        content:`${error.response.data.message}` ,
        okText: 'Close', 
      });  
    }
  }
}

function* blockUserSaga(action :{payload : inviteInfo}) : Generator<Effect,any,any>{
  try {
    const response = yield call(api.fetchBlockUser,action.payload)
   yield put(blockUserSuccess(response.data));
   message.success("Chặn người dùng thành công")
  } catch (error : any) {
    yield put(blockUserFailure(error.response.data))
    if (error) {
      Modal.error({
        title: 'Đã xảy ra lỗi',
        content:`${error.response.data.message}` ,
        okText: 'Close', 
      });  
    }
  }
}

function* getProfileSaga(action :{payload : string} ): Generator<Effect,any,any>{
  try {
    const response = yield call(api.fetchGetProfile,action.payload)
    yield put(profileUserSuccess(response.data))
  } catch (error : any) {
    yield put(profileUserFailure(error.response.data))
    if (error) {
      Modal.error({
        title: 'Đã xảy ra lỗi',
        content:`${error.response.data.message}` ,
        okText: 'Close', 
      });  
    }
}
}

function* setOpenChatWindowSaga( action :{payload : string} ): Generator<Effect, any, any> {
  console.log(action.payload);
  
  try {
    yield put(openChatWindowSuccess())
    const loaded = yield select(state=>state.getChat.isLoaded)
    const roomId = action.payload;
    const page = 1;
    if (loaded === false) {
      const response = yield call(api.fetchGetChat, roomId, page)
      yield put(getChatSuccess(response.data.conversations))
      yield put(setLoaded())
    }
  } catch (error) {
    console.log(error);
    
  }
}



function* getInputChatSaga(action : {payload : string}): Generator<Effect,any,any>{
  yield put(setState())
  yield put(setInputValue(action.payload));
}

function* mesAddStateSaga(action : {payload : any}) :Generator<Effect,any,any>{

  yield put(addToCurrentState(action.payload))
}

function* getPreChatSaga(action : { payload : any}) : Generator<Effect,any,any>{
  const roomId = action.payload;
  const page = 1;
  const response = yield call(api.fetchGetChat,roomId,page)
  yield put(getChatSuccess(response.data.conversations))
  yield put(setLoaded())
}

function* getMoreChatSaga(action : {payload : string}) : Generator<Effect,any,any>{
yield put(setPage())
const roomId = action.payload;
const page = yield select(state=> state.getChat.page)
const response = yield call(api.fetchGetChat,roomId,page)
yield put(getMoreChatSuccess(response.data.conversations))
yield put(setHasMore(response.data.hasMore))

}

function* getPreviewChatSaga ( action : { payload : string}) : Generator<Effect,any,any>{
  try {
    const response = yield call(api.fetchGePreviewChat,action.payload)
    yield put(getPreviewChatSuccess(response.data))
  } catch (error) {
    
  }
}

function* setRoomChat ( action : { payload : string}) : Generator<Effect,any,any>{
  yield put(selectRoomSuccess(action.payload))
}

function* setLoggUserSaga ( action : { payload : userBasicInfo}) : Generator<Effect,any,any>{
  yield put(setLoggedUserSuccess(action.payload))
}

function* updateRoomDataSaga(action : { payload : any}) : Generator<Effect,any,any>{
  yield put(updateRoomDataSuccess(action.payload))
  yield put(selectRoomSuccess(action.payload.room))
}

function* sendUsername4CreateChatSaga(action : { payload : string}) : Generator<Effect,any,any>{
try {
  const response = yield call(api.fetchSearchUserForChat,action.payload)
  yield put(createChatSuccess(response.data))
} catch (error) {
  
}
}

function* selectedUserSaga(action : { payload : any}) : Generator<Effect,any,any>{
  const roomId = action.payload.roomId
  const page = 1 

  const response = yield call(api.fetchGetChat,roomId,page)
  if (response.data.conversations) {
    
  }
  const newMessage = {
    messages : [],
    participants : action.payload.participants,
    room_name : response.data
  }
  console.log(newMessage);
  yield put(updateNewRoomDataSuccess(newMessage))
  yield put(selectRoomSuccess(action.payload.roomId))

}
function* getchatDataSaga (action : { payload : string}) : Generator<Effect,any,any>{
  const roomId = action.payload;
  const page = 1;
  const response = yield call(api.fetchGetChat,roomId,page)
  console.log("đây là resp",response.data);
  const data = yield select(state => state.previewChat.data)
  console.log(data);
  
  if (response.data.conversations) {
    yield put(getPreviewDataSuccess(response.data.conversations[0]))
    yield put(setHasMore(response.data.hasMore))
  }
  const infoInRoom = yield call(api.fetchInforInRoom,response.data)
  console.log(infoInRoom.data);
  
  const newMessage = {
    messages : [],
    participants : infoInRoom.data,
    room_name : action.payload
  }
  yield put(setParticipants(newMessage))

}

function* setFirstRoomSaga (action : { payload : string}) : Generator<Effect,any,any>{
  console.log("sagaaa");
  
  const roomId = action.payload;
  const infoInRoom = yield call(api.fetchInforInRoom,roomId)
  const newMessage = {
    messages : [],
    participants : infoInRoom.data,
    room_name : action.payload
  }
  yield put(setFirstRoomSuccess(newMessage))
}

function* mySaga() {
  yield takeEvery(registerUserRequest,createUser)
  yield takeEvery(confirmRequest,confirmCodeSaga)
  yield takeEvery(registerConfirmUserRequest,reConfirmCodeSaga)

  yield takeEvery(searchRequest,searchSaga)

  yield takeEvery(loginUserRequest,loginUserSaga)

  yield takeEvery(inviteUserRequest,inviteUser)

  yield takeEvery(confirmUserRequest,confirmFriendShipSaga)

  yield takeEvery(cancelUserRequest,cancelFriendShipSaga)

  yield takeEvery(profileUserRequest,getProfileSaga)

  yield takeEvery(blockUserRequest,blockUserSaga)

  yield takeEvery(openChatWindowRequest,setOpenChatWindowSaga)

  yield takeEvery(updateInputValue, getInputChatSaga);

  // yield takeEvery(sendDataToUpdate,chatDataToUpdateStateSaga)

  yield takeEvery(changeChatState,mesAddStateSaga)

  yield takeEvery(getPreChat,getPreChatSaga)

  yield takeEvery ( getMoreChat,getMoreChatSaga)

  yield takeEvery(getPreviewChatRequet,getPreviewChatSaga)
  yield takeEvery(setLoggedUserRequest,setLoggUserSaga)

  yield takeEvery(selectRoom,setRoomChat)

  yield takeEvery(updateRoomData,updateRoomDataSaga)

  yield takeEvery(createChatRequess,sendUsername4CreateChatSaga)

  yield takeEvery(selectedChatUserRequest,selectedUserSaga)

  yield takeEvery (getPreviewData,getchatDataSaga)

  yield takeEvery(setFirstRoomRequest,setFirstRoomSaga)
  }
export default mySaga