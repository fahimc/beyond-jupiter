export enum SystemKeys {
  UPDATE_READY = 'UPDATE_READY',
  UPDATE_FLEET_SELECTED = 'UPDATE_FLEET_SELECTED',
}

export type SystemActionTypes = UpdateReadyAction | UpdateFleetSelectedAction;

interface UpdateReadyAction {
  type: SystemKeys.UPDATE_READY;
  ready: boolean;
}

interface UpdateFleetSelectedAction {
  type: SystemKeys.UPDATE_FLEET_SELECTED;
  fleetId: number | null;
}

export const updateReady = (ready: boolean): UpdateReadyAction => {
  return {
    ready,
    type: SystemKeys.UPDATE_READY,
  };
};

export const updateFleetSelected = (
  fleetId: number | null,
): UpdateFleetSelectedAction => {
  return {
    fleetId,
    type: SystemKeys.UPDATE_FLEET_SELECTED,
  };
};
