export enum StarKeys {
  ADD_FLEET = 'ADD_FLEET',
}

export type StarActionTypes = AddFleetAction;

interface AddFleetAction {
  type: StarKeys.ADD_FLEET;
  starId: string;
}

export const addFleet = (starId: string): AddFleetAction => {
  return {
    starId,
    type: StarKeys.ADD_FLEET,
  };
};
