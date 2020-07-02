import { StarActionTypes, StarKeys } from '../actions/star-actions';
export interface StarItem {
  id: number;
  playerId: string;
  fleetsOrbiting: string[];
  name: string;
  naturalResource: number;
  terraformedResource: number;
  planets: number[];
  x: number;
  y: number;
}
export interface StarState {
  items: StarItem[];
}
export const initialStarState: StarState = {
  items: [],
};

export const starReducer = (
  state: StarState = initialStarState,
  action: StarActionTypes,
): StarState => {
  switch (action.type) {
    case StarKeys.ADD_FLEET:
      return {
        ...state,
      };
    default:
      return state;
  }
};
