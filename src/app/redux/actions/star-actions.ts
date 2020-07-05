import { StarItem } from '../reducers/star-reducer';

export enum StarKeys {
  ADD_FLEET = 'ADD_FLEET',
  UPDATE_ALL = 'STARS_UPDATE_ALL',
}

export type StarActionTypes = AddFleetAction | UpdateAllStarAction;

interface AddFleetAction {
  type: StarKeys.ADD_FLEET;
  starId: number;
  fleetId: number;
}

interface UpdateAllStarAction {
  type: StarKeys.UPDATE_ALL;
  stars: StarItem[];
}

export const addFleetToStar = (
  starId: number,
  fleetId: number,
): AddFleetAction => {
  return {
    starId,
    fleetId,
    type: StarKeys.ADD_FLEET,
  };
};

export const updateAllStars = (stars: StarItem[]): UpdateAllStarAction => {
  return {
    stars,
    type: StarKeys.UPDATE_ALL,
  };
};
