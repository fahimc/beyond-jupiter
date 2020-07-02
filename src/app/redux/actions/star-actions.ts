import { StarItem } from "../reducers/star-reducer";

export enum StarKeys {
  ADD_FLEET = 'ADD_FLEET',
  UPDATE_ALL = 'UPDATE_ALL',
}

export type StarActionTypes = AddFleetAction | UpdateAllStarAction;

interface AddFleetAction {
  type: StarKeys.ADD_FLEET;
  starId: string;
}

interface UpdateAllStarAction {
  type: StarKeys.UPDATE_ALL;
  stars: StarItem[];
}

export const updateAllStars = (stars: StarItem[]): UpdateAllStarAction => {
  return {
    stars,
    type: StarKeys.UPDATE_ALL,
  };
};
