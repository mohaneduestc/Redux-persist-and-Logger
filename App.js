
// Imports: Dependencies
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/index';
import Counter from './screens/Counter';
import { persistStore, persistReducer } from 'redux-persist';
import {createLogger} from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage'
import {PersistGate} from 'redux-persist/es/integration/react';




const persistConfig = {
  key:'root',
  storage:AsyncStorage,
  whitelist:['counterReducer','authReducer'] // these will be saved
}

const persistedReducer = persistReducer(persistConfig,rootReducer)


const store = createStore(
  persistedReducer, applyMiddleware(createLogger())
);

const persistedStore = persistStore(store)

export default App = () => {
  return (
    <Provider store={store}> 
      <PersistGate persistor={persistedStore} loading={null}>
        <Counter />
      </PersistGate>   
    </Provider>
  );
};