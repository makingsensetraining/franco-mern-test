import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import reducers from "../reducers";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

const logger = createLogger();
const persistConfig = {
  key: "root",
  storage,
  blacklist: ['routing']
};

// In order to use the devtools (https://github.com/gaearon/redux-devtools)
// we prepare it to enhance the store.
const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const middlewareWithHistory = routerMiddleware(browserHistory);
export default function configureStore(initialState) {
  const store = createStore(
    persistCombineReducers(persistConfig, {
      reducers,
      routing: routerReducer
    }),
    initialState,
    compose(
      applyMiddleware(
        thunk,
        reduxImmutableStateInvariant(),
        logger,
        middlewareWithHistory
      ),
      devtools
    )
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
