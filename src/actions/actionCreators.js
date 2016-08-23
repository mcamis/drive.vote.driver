import fetch from 'isomorphic-fetch';

export function requestStatus() {
    return {
        type: 'REQUEST_STATUS',
    }
}

export function receiveStatus(status) {
    console.log('received status', status);
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

export function attemptClaim() {
    return {
        type: 'RIDE_CLAIM_ATTEMPT',
    }
}
export function claimRideSuccess(ride) {
    return {
        type: 'RIDE_CLAIMED',
        active_ride: ride
    }
}

export function attemptCancel() {
    return {
        type: 'RIDE_CANCEL_ATTEMPT',
    }
}

export function cancelRideSuccess(ride) {
    return {
        type: 'RIDE_CANCELLED',
        active_ride: {}
    }
}

export function attemptPickup() {
    return {
        type: 'RIDER_PICKUP_ATTEMPT',
    }
}

export function pickupRiderSuccess(ride) {
    return {
        type: 'RIDER_PICKUP',
        active_ride: ride
    }
}

export function attemptDropoff() {
    return {
        type: 'RIDE_COMPLETE_ATTEMPT',
    }
}
export function dropoffSuccess(ride) {
    return {
        type: 'RIDE_COMPLETE',
        active_ride: ride
    }
}
export function setLocation(location) {
    return {
        type: 'LOCATION_UPDATED',
        location: location.coords
    }
}

export function locationSaved(response) {
    return {
        type: 'LOCATION_SUBMITTED',
        update_location_interval: response.update_location_interval
    }
}

// TODO: API urls to environment vars
export function fetchStatus() {
   const showLogin=  function(response) {
        if (!response.ok) {
            window.location = "https://drive.vote/users/sign_in";
        }
        return response;
    }
    return function(dispatch) {
        dispatch(requestStatus())
        fetch('http://localhost:3000/driving/status', {
                credentials: 'include',
            })
            .then(showLogin)
            .then(response => response.json())
            .then(json =>
                dispatch(receiveStatus(json.response))
            )
    }
}

export function submitUnavailable() {
    // /driving/unavailable
    return function(dispatch) {
        dispatch(requestToggle())
        return fetch('http://localhost:3000/driving/unavailable', {
                credentials: 'include',
                method: 'POST',
            })
            .then(response => response.json())
            .then(json =>
                dispatch(driverUnavailable())
            )
    }
}

export function submitAvailable() {
    return function(dispatch) {
        dispatch(requestToggle())
        return fetch('http://localhost:3000/driving/available', {
                credentials: 'include',
                method: 'POST',
            })
            .then(response => response.json())
            .then(json =>
                dispatch(driverAvailable()),
            )
    }
}

export function submitLocation(location) {
    // /driving/available
    var payload = {
        'latitude': location.latitude,
        'longitude': location.longitude
    };
    return function(dispatch) {
        fetch('http://localhost:3000/driving/location', {
                credentials: 'include',
                method: 'POST',
                body: payload
            })
            .then(response => response.json())
            .then(json =>
                dispatch(locationSaved(json))
            )
    }
}

export function fetchWaitingRides() {
    // const fakeJSON = {
    //     waiting_rides_interval: '1500',
    //     response: [{
    //         id: 25,
    //         status: 'waiting_assignment',
    //         from_address: '300 Cadman Plaza W, Brooklyn, NY 11201',
    //         to_address: '1600 Pennsylvania Ave NW, Washington, DC 20500'
    //     }, {
    //         id: 30,
    //         status: 'waiting_assignment',
    //         from_address: '902 N Wolcott Ave, Chicago IL 60622',
    //         to_address: '3514 N Broadway St, Chicago IL 60654'
    //     }]
    // };
    // /driving/waiting_rides
    return function(dispatch) {
        dispatch(requestStatus())
        fetch('http://localhost:3000/driving/waiting_rides', {
                credentials: 'include',
            })
            .then(response => response.json())
            .then(json =>
                dispatch(receveWaitingRides(json))
            )
    }
}

export function claimRide(ride) {
    // /driving/accept_rid
    // Maybe this endpoint should return the current state of the ride?
    return function(dispatch) {
        dispatch(attemptClaim())
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
                dispatch(claimRideSuccess(ride))
            )
    }
}

export function cancelRide(ride) {
    // /driving/unaccept_ride
    return function(dispatch) {
        dispatch(attemptCancel())
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
                dispatch(cancelRideSuccess(ride))
            )
    }
}

export function pickupRider(ride) {
    // /driving/pickup_ride
    return function(dispatch) {
        dispatch(attemptPickup())
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
                dispatch(pickupRiderSuccess(ride))
            )
    }
}


export function completeRide(ride) {
    // /driving/complete_ride
    return function(dispatch) {
        dispatch(attemptDropoff())
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
                dispatch(dropoffSuccess(ride))
            )
    }
}
