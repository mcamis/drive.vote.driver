import fetch from 'isomorphic-fetch';

export function requestStatus() {
    return {
        type: 'REQUEST_STATUS',
    }
}

export function receiveStatus(status) {
    return {
        type: 'RECEIVE_STATUS',
        available: status.available,
        waiting_rides_interval: status.waiting_rides_interval,
        update_location_interval: status.update_location_interval,
        active_ride: status.active_ride
    }
}
export function requestToggle() {
    return {
        type: 'REQUEST_TOGGLE',
    }
}
export function driverUnavailable() {
    return {
        type: 'DRIVER_UNAVAILABLE',
    }
}

export function driverAvailable() {
    return {
        type: 'DRIVER_AVAILABLE',
    }
}

export function receveWaitingRides(rides) {
    console.log('rides:', rides);
    return {
        type: 'RECEIVE_RIDES',
        rides: rides.response,
        waiting_rides_interval: rides.waiting_rides_interval

    }
}

// TODO: API urls to environment vars
export function fetchStatus() {
    const fakeResults = {
        available: true,
        waiting_rides_interval: '5000ms',
        update_location_interval: '15000ms',
        active_ride: {}
    }

    return function(dispatch) {
        dispatch(requestStatus())
            // /driving/status
        return fetch('http://httpbin.org/get', {
                method: 'GET',
                mode: 'cors',
                cache: 'default',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(json =>
                dispatch(receiveStatus(fakeResults))
            )
    }
}

export function submitUnavailable() {
    // /driving/unavailable
    return function(dispatch) {
        dispatch(requestToggle())
        return fetch('http://httpbin.org/post', {
                method: 'POST',
                mode: 'cors',
                cache: 'default',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(json =>
                dispatch(driverUnavailable())
            )
    }
}

export function submitAvailable() {
    // /driving/available
    return function(dispatch) {
        dispatch(requestToggle())
        return fetch('http://httpbin.org/post', {
                method: 'POST',
                mode: 'cors',
                cache: 'default',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(json =>
                dispatch(driverAvailable())
            )
    }
}

export function fetchWaitingRides() {
    const fakeJSON = {
        waiting_rides_interval: '1500ms',
        response: [{
            id: 25,
            status: 'waiting_assignment',
            from_address: '300 Cadman Plaza W, Brooklyn, NY 11201',
            to_address: '1600 Pennsylvania Ave NW, Washington, DC 20500'
        }, {
            id: 30,
            status: 'waiting_assignment',
            from_address: '902 N Wolcott Ave, Chicago IL 60622',
            to_address: '3514 N Broadway St, Chicago IL 60654'
        }]
    };
    // /driving/waiting_rides
    return function(dispatch) {
        dispatch(requestStatus())
        return fetch('http://httpbin.org/get', {
                method: 'GET',
                mode: 'cors',
                cache: 'default',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(json =>
                dispatch(receveWaitingRides(fakeJSON))
            )
    }
}

/*
/driving/accept_ride
/driving/unaccept_ride
/driving/pickup_ride
/driving/complete_ride
*/