import * as actions from '../actions';

const initialState = {
  droneInfo: [],
  lastPosition: [],
  lastUoM: 'temperature - fahrenheit',
  lastTemperature: 0,
  lastTimestamp: new Date(),
  lastAccuracy: 0,
  secAgo: 0
};

//Updating the info from the drone with the lastest data
const updateData = (state, action) => {
  let droneInfo = action.data;
  let index = droneInfo.data.length -1;
  let latestData = droneInfo.data[index];
  return {
    ...state,
    droneInfo: action.data, 
    lastPosition: [latestData.latitude, latestData.longitude],
    lastUoM: latestData.uom,
    lastTemperature: latestData.metric,
    lastTimestamp: latestData.timestamp,
    secAgo: Math.round(( Date.now() - latestData.timestamp) / 1000)
   }
}

const handlers = {
  [actions.UPDATE_DATA]: updateData
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};

