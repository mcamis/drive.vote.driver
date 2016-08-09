import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class LocationManager extends React.Component {

    componentWillMount() {
        this.setupLocationStatus();
    }

    setupLocationStatus() {
        var self = this;
        let locationAvailable = true;
        let errorCount = 0;
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition(function(position) {
                self.props.setLocation(position);
                errorCount = 0;
            }, function(error) {
                //   0: unknown error
                //   1: permission denied
                //   2: position unavailable (error response from locaton provider)
                //   3: timed out
                console.log('Something went wrong getting location:', error);
                if (error.code == 1) {
                    console.log('User denied access');
                    locationAvailable = false;
                    self.updateLocationState(locationAvailable);
                } else {
                    errorCount++;
                }
            });
        } else {
            locationAvailable = false;
        }
        if (errorCount >= 10) {
            console.log('Something is wrong with location tracking...');
            // TODO: Implement location warning
        }
        this.updateLocationState(locationAvailable);
    }

    updateLocationState(locationAvailable) {
        this.setState({
            location: locationAvailable
        });
    }

    componentWillReceiveProps() {
        let locationUpdateInterval = this.props.state.driverState.update_location_interval;
        if (locationUpdateInterval && this.state.location) {
            setInterval(() => this.submitLocation(), locationUpdateInterval);
        }
    }

    submitLocation() {
        fetch('http://httpbin.org/post', {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    }

    render() {
        if (this.state.location) {
            return null
        } else {
            return (
                <div className="takeover">
                <h3>Drive the vote requires you to share your location.</h3><p>Please reload the application to start sharing your location</p>
                </div>
            )
        }
    }

};

export default LocationManager;
