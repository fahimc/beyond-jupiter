import { FleetItem } from '../reducers/fleet-reducer';

export enum FleetKeys {
  UPDATE_ALL = 'FLEET_UPDATE_ALL',
  CREATE_NEW_FLEET = 'FLEET_CREATE_NEW_FLEET',
  ADD_NEW_FLEET = 'FLEET_ADD_NEW_FLEET',
}

export type FleetActionTypes = UpdateAllFeetsAction | AddNewFeetAction;

interface UpdateAllFeetsAction {
  type: FleetKeys.UPDATE_ALL;
  fleets: FleetItem[];
}

interface AddNewFeetAction {
  type: FleetKeys.ADD_NEW_FLEET;
  fleet: FleetItem;
}

export const updateAllFleets = (fleets: FleetItem[]): UpdateAllFeetsAction => {
  return {
    fleets,
    type: FleetKeys.UPDATE_ALL,
  };
};

export const addNewFleet = (fleet: FleetItem): AddNewFeetAction => {
  return {
    fleet,
    type: FleetKeys.ADD_NEW_FLEET,
  };
};
