import * as actions from '../actions';

const initialState = {
  droneInfo: [],
  lastPosition: [],
  lastUoM: 'temperature - fahrenheit',
  lastTemp: 0,
  lastTimestamp:  new Date(),
  lastAccuracy: 0
};

const updateData = (state, action) => {
   let { data } = action.data;
   let latestData = droneInfo.data.reduce((accur, dat) => {
    if (dat.timestamp >= accur.timestamp) {
      return dat;
    }
    else {
      return accur;
    }
  });
  return {
    ...state,
    droneInfo: action.data, 
    lastPosition: [latestData.latitude, latestData.longitude],
    lastUoM: latestData.uom,
    lastTemperature: latestData.metric,
    lastTimestamp: latestData.timestamp,
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

