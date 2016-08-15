import fetch from 'isomorphic-fetch';
import $ from 'jquery';

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



// TODO: API urls to environment vars
export function fetchStatus() {
    // const fakeResults = {
    //     available: true,
    //     waiting_rides_interval: '5000',
    //     update_location_interval: '15000',
    //     active_ride: {}
    // }
    return function(dispatch) {
        dispatch(requestStatus())
        return $.ajax('http://localhost:3000/driving/status', {
            method: 'GET',
            xhrFields: {
                withCredentials: true
            },
            success: function(data, status, xhr) {
                console.log('success', data);
                dispatch(receiveStatus(data))
            }
        });
    }

}

export function submitUnavailable() {
    // /driving/unavailable
    return function(dispatch) {
        dispatch(requestToggle())
        return fetch('http://localhost:3000/driving/status', {
                credentials: 'include',
                crossDomain: true,
                method: 'GET',
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
    var payload = {
        'latitude': '41.8979338',
        'longitude': '-87.67499889999999'
    };

    $.ajax('http://localhost:3000/driving/available', {
        method: 'POST',
        data: payload,
        xhrFields: {
            withCredentials: true
        },
        content_type: 'application/json'
    });
}

export function fetchWaitingRides() {
    const fakeJSON = {
        waiting_rides_interval: '1500',
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
