import { PlayerItem } from '../reducers/player-reducer';

export enum PlayerKeys {
  UPDATE_ALL = 'PLAYERS_UPDATE_ALL',
}

export type PlayerActionTypes = UpdateAllPlayersAction;

interface UpdateAllPlayersAction {
  type: PlayerKeys.UPDATE_ALL;
  players: PlayerItem[];
  playerId: number;
  playerCash: number;
}

export const updateAllPlayers = (
  players: PlayerItem[],
  playerId: number,
  playerCash: number,
): UpdateAllPlayersAction => {
  return {
    players,
    playerId,
    playerCash,
    type: PlayerKeys.UPDATE_ALL,
  };
};
