import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

function driverState(state = {
    isFetching: false,
    rides: [],
}, action) {
    switch (action.type) {
        case 'REQUEST_STATUS':
        case 'REQUEST_TOGGLE':
            return Object.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_STATUS':
            return Object.assign({}, state, {
                isFetching: false,
                available: action.available,
                waiting_rides_interval: action.waiting_rides_interval,
                update_location_interval: action.update_location_interval,
                active_ride: action.active_ride,
            })
        case 'DRIVER_UNAVAILABLE':
            return Object.assign({}, state, {
                isFetching: false,
                available: false,
                active_ride: {}
            })
        case 'DRIVER_AVAILABLE':
            return Object.assign({}, state, {
                isFetching: false,
                available: true,
            })
        case 'RECEIVE_RIDES':
            return Object.assign({}, state, {
                isFetching: false,
                rides: action.rides,
                waiting_rides_interval: action.waiting_rides_interval,

            })
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    driverState,
    routing: routerReducer
});

export default rootReducer;
