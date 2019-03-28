import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";



function delay(duration) {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve(true), duration)
    })
    return promise
  }
   
  
/** Make a call to the API to get the drone data
 * if there was an error or no data yield API_ERROR action
 * else
 * yield another action and send the data
 */
function* getDataFromDrone(){
  let skipAtFirstTime = true
  while (true){
      const { error, data } = yield call(API.getData);
      if (error || !data) {
          yield put({
              type : actions.API_ERROR
          });
          yield cancel();
          return;
      }
    if (!skipAtFirstTime) {
        skipAtFirstTime = false
        yield call(delay, 4000);
      }     
      yield put({type : actions.DATA_RECEIVED, data});
  }
}


/**
 * Updating drone data
 */
function* watchUpdate(action) {
    const { data } = action;
    yield put({ type : actions.UPDATE_DATA, data})
}


/**Check for an action to trigger a function */
function* watcher(){
    yield all([
        takeEvery(actions.DATA_FROM_DRONE, getDataFromDrone),
        takeEvery(actions.DATA_RECEIVED, watchUpdate)
      ]);
}


export default [watcher];