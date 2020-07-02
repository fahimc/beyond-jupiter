import { combineReducers, Store, createStore, applyMiddleware, compose } from 'redux';
import { starReducer } from './reducers/star-reducer';
import { RootState } from './state';
import { loggerMiddleware } from './middleware/logger-middleware';

export const initialRootState: RootState = {
  stars: {
    items: [],
  },
};

export class RootStore {
  private store: Store<RootState>;
  constructor() {
    const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    const enhancer = composeEnhancers(
      applyMiddleware(loggerMiddleware),
      // other store enhancers if any
    );
    this.store = createStore(
      combineReducers<RootState>({
        stars: starReducer,
      }),
      initialRootState,
      enhancer,
    );
  }
  public getStore() {
    return this.store;
  }
}
