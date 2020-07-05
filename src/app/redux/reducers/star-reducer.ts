import { StarActionTypes, StarKeys } from '../actions/star-actions';

export interface StarItem {
  id: number;
  playerId: number;
  fleetsOrbiting: number[];
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
      const star = state.items.find(s => s.id === action.starId);
      console.log(star);
      if (!star) return state;
      const updateStar = {
        ...star,
        fleetsOrbiting: [...star.fleetsOrbiting, action.fleetId],
      };
      return {
        ...state,
        items: [...state.items.filter(s => s.id !== action.starId), updateStar],
      };
    case StarKeys.UPDATE_ALL:
      return {
        ...state,
        items: action.stars,
      };
    default:
      return state;
  }
};
