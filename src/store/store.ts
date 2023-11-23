import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const reducers = combineReducers({
    user:userReducer
})
const persistedReducer = persistReducer(persistConfig, reducers);
const store =  configureStore({
    reducer:persistedReducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware({
        //关闭redux序列化检测
        serializableCheck:false
    })
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch