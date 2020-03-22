
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import albumAppReducer from '../store/reducers/albumAppReducer';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, albumAppReducer);

const store = createStore(persistedReducer);

let persistor = persistStore(store);

export { store, persistor };
