import { FleetActionTypes, FleetKeys } from '../actions/fleet-actions';

export interface FleetItem {
  id: number;
  name: string;
  ships: number;
  playerId: number;
  x: number;
  y: number;
}

export interface FleetState {
  items: FleetItem[];
}
export const initialStarState: FleetState = {
  items: [],
};

export const fleetReducer = (
  state: FleetState = initialStarState,
  action: FleetActionTypes,
): FleetState => {
  switch (action.type) {
    case FleetKeys.UPDATE_ALL:
      return {
        ...state,
        items: action.fleets,
      };
    case FleetKeys.ADD_NEW_FLEET:
      return {
        ...state,
        items: [...state.items, action.fleet],
      };
    default:
      return state;
  }
};
