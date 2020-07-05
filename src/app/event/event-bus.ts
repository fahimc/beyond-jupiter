import { Events } from './events';

const subscriptions = {};
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export function subscribe(eventType: Events, callback) {
  const id = uuidv4();
  // create new entry for eventType
  if (!subscriptions[eventType]) subscriptions[eventType] = {};
  // the callback is registered
  subscriptions[eventType][id] = callback;
  return {
    unsubscribe: () => {
      delete subscriptions[eventType][id];
      if (Object.keys(subscriptions[eventType]).length === 0)
        delete subscriptions[eventType];
    },
  };
}

export function dispatch(eventType: Events, arg) {
  if (!subscriptions[eventType]) return;
  Object.keys(subscriptions[eventType]).forEach(id =>
    subscriptions[eventType][id](arg),
  );
}
