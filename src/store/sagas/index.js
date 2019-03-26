import WeatherSagas from "./Weather";
import ApiErrors from "./ApiErrors";
import Watcher from './DroneInfo';

export default [...ApiErrors, ...WeatherSagas, ...Watcher];
