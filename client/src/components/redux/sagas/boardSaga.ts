import { Effect, takeEvery,call,put,select} from "redux-saga/effects"
import * as api from "../callApi/apiBoard"
import {createPermissionRequest,createPermissionSuccess,setDefaultPermisionBoardRequest,setDefaultPermisionBoardSuccess} from "../slices/createNewChat"
import {createBoardRequest,createBoardSuccess,createBoardFailure} from "../slices/createBoard"


function* getPermissionSaga(action : { payload : {data : string}}) : Generator<Effect,any,any>{

try {
    const response = yield call(api.fetchPermission,action.payload)
    yield put(createPermissionSuccess(response.data))
        
} catch (error) {
    
}
}

function* createBoardSaga(action : { payload : any}) : Generator<Effect,any,any>{
    console.log(action.payload);
    
    try {
        const response = yield call(api.fetchCreateBoard,action.payload)
        console.log(response.data);
        
        yield put(createBoardSuccess(response.data))
    } catch (error) {
        
    }
}

function* setDefaultPermissionSaga(action : unknown) : Generator<Effect,any,any>{
    yield put(setDefaultPermisionBoardSuccess())
    const resuult = yield select(state =>state.createChat.permisionBoard)
    console.log(resuult);
    
}

function* boardSaga() {
 yield   takeEvery(createPermissionRequest,getPermissionSaga)

yield takeEvery(createBoardRequest,createBoardSaga)
yield takeEvery(setDefaultPermisionBoardRequest,setDefaultPermissionSaga)
}
export default boardSaga