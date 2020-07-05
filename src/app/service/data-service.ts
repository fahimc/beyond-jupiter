import * as data from './game.json';
import { store } from '../index';
import { updateAllStars, addFleetToStar } from 'app/redux/actions/star-actions';
import { updateAllPlayers } from 'app/redux/actions/player-actions';
import { StarItem } from 'app/redux/reducers/star-reducer';
import { updateReady } from 'app/redux/actions/system-actions';
import { PlayerItem } from 'app/redux/reducers/player-reducer';
import { FleetItem } from 'app/redux/reducers/fleet-reducer';
import { addNewFleet } from 'app/redux/actions/fleet-actions';
export const DataService = {
  getData() {
    store.dispatch(
      updateAllStars(
        data.stars.map(item => ({
          ...item,
          fleetsOrbiting: [],
          playerId: item.puid !== undefined ? item.puid : -1,
        })) as StarItem[],
      ),
    );
    store.dispatch(
      updateAllPlayers(
        data.players as PlayerItem[],
        data.playerId,
        data.playerCash,
      ),
    );
    store.dispatch(updateReady(true));
  },
  addFleetToStar(starId: number, ships: number) {
    const id = store.getState().fleets.items.length;
    const star = store.getState().stars.items.find(s => s.id === starId);
    if (star) {
      const newFleet: FleetItem = {
        id,
        name: `${star.name} ${id}`,
        ships: ships,
        playerId: star.playerId,
        x: star.x,
        y: star.y,
      };
      store.dispatch(addNewFleet(newFleet));
      store.dispatch(addFleetToStar(starId, id));
    }
  },
};
