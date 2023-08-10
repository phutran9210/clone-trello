import { configureStore,  } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware} from "redux"
import  createUserReducer  from "../slices/createUser"
import confirmCode from "../slices/confirmRegister"
import loginUser from '../slices/loginUser';
import mySaga from "../sagas/sagas"
import boardSaga from '../sagas/boardSaga';
import searchInput from "../slices/search"
import inviteUser from "../slices/invite"
import confirmInviteUser from "../slices/confirmInvite"
import cancelRequest from "../slices/cancelInvite"
import profile from '../slices/profile';
import block from "../slices/blockUser"
import chatWindowReducer from "../slices/chatWindow"
import get_chat from "../slices/getChat"
import chatInput from "../slices/inputChat"
import _inputChat from '../slices/inputChat';
import _getPreviewChat from "../slices/getPreviewChat"
import _createChat from "../slices/createNewChat"
import _createBoard from "../slices/createBoard"

const sagaMiddleware = createSagaMiddleware();


export const store = configureStore({
    reducer : {
        createUser: createUserReducer,
        confirmUser: confirmCode,
        userLogged : loginUser,
        searchData : searchInput,
        invite : inviteUser,
        confirmInvite : confirmInviteUser,
        cancelInvite : cancelRequest,
        getProfile  : profile,
        blockUser : block,
        chatWindow : chatWindowReducer,
        getChat : get_chat,
        inputChat : _inputChat,
        previewChat : _getPreviewChat,
        createChat : _createChat,
        createBoard : _createBoard
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(mySaga)
sagaMiddleware.run(boardSaga)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch