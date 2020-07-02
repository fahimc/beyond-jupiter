import { combineReducers, Store, createStore, applyMiddleware } from 'redux';
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
    this.store = createStore(
      combineReducers<RootState>({
        stars: starReducer,
      }),
      initialRootState,
      applyMiddleware(loggerMiddleware),
    );
  }
  public getStore() {
    return this.store;
  }
}
