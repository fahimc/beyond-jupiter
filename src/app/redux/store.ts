import {
  combineReducers,
  Store,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { starReducer } from './reducers/star-reducer';
import { RootState } from './state';
import { loggerMiddleware } from './middleware/logger-middleware';
import { systemReducer } from './reducers/system-reducer';
import { playerReducer } from './reducers/player-reducer';
import { fleetReducer } from './reducers/fleet-reducer';

export const initialRootState: RootState = {
  system: {
    ready: false,
    selectedFleet: null,
  },
  stars: {
    items: [],
  },
  players: {
    playerId: 0,
    playerCash: 0,
    items: [],
  },
  fleets: {
    items: [],
  },
};

export class RootStore {
  private store: Store<RootState>;
  constructor() {
    const composeEnhancers =
      (typeof window !== 'undefined' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose;
    const enhancer = composeEnhancers(
      applyMiddleware(loggerMiddleware),
      // other store enhancers if any
    );
    this.store = createStore(
      combineReducers<RootState>({
        stars: starReducer,
        system: systemReducer,
        players: playerReducer,
        fleets: fleetReducer,
      }),
      initialRootState,
      enhancer,
    );
  }
  public getStore() {
    return this.store;
  }
}
