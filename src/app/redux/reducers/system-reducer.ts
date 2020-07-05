import { SystemActionTypes, SystemKeys } from '../actions/system-actions';
export interface SystemState {
  ready: boolean;
  selectedFleet: number | null;
}
export const initialSystemState: SystemState = {
  ready: false,
  selectedFleet: null,
};

export const systemReducer = (
  state: SystemState = initialSystemState,
  action: SystemActionTypes,
): SystemState => {
  switch (action.type) {
    case SystemKeys.UPDATE_READY:
      return {
        ...state,
        ready: action.ready,
      };
    case SystemKeys.UPDATE_FLEET_SELECTED:
      return {
        ...state,
        selectedFleet: action.fleetId,
      };
    default:
      return state;
  }
};
