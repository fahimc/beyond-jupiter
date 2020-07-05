import { PlayerActionTypes, PlayerKeys } from '../actions/player-actions';
export interface Tech {
  level: number;
  research: number;
}

export interface PlayerItem {
  id: number;
  alias: string;
  ships: number;
  playerId: number;
  homeId?: number;
  color?: string;
  tech: {
    scanning: Tech;
    manufacturing: Tech;
    science: Tech;
    range: Tech;
    terraforming: Tech;
    experimentation: Tech;
    weapons: Tech;
    banking: Tech;
  };
}

export interface PlayerState {
  playerId: number;
  items: PlayerItem[];
  playerCash: number;
}
export const initialStarState: PlayerState = {
  playerId: 0,
  playerCash: 0,
  items: [],
};

export const playerReducer = (
  state: PlayerState = initialStarState,
  action: PlayerActionTypes,
): PlayerState => {
  switch (action.type) {
    case PlayerKeys.UPDATE_ALL:
      return {
        ...state,
        playerId: action.playerId,
        playerCash: action.playerCash,
        items: action.players,
      };
    default:
      return state;
  }
};
