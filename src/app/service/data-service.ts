import * as data from './game.json';
import {store} from '../index';
import { updateAllStars } from 'app/redux/actions/star-actions';
import { StarItem } from 'app/redux/reducers/star-reducer';
export const DataService = {
  getData() {
    store.dispatch(updateAllStars(data.stars.map(item => ({...item, fleetsOrbiting: [], playerId: '1'})) as StarItem[]));
  },
};
