import { StarState } from './reducers/star-reducer';
import { SystemState } from './reducers/system-reducer';
import { PlayerState } from './reducers/player-reducer';
import { FleetState } from './reducers/fleet-reducer';

export interface RootState {
  stars: StarState;
  players: PlayerState;
  system: SystemState;
  fleets: FleetState;
}
