import React from 'react';
import autobind from 'autobind-decorator';

import PendingRide from '../components/PendingRide.js';
import ActiveRide from '../components/ActiveRide.js';


@autobind
class RideListContainer extends React.Component {

   

    render() {
        const availableRides = this.props.state.driverState.rides;

        if (this.props.state.driverState.active_ride && this.props.state.driverState.active_ride.id) {
            return <ActiveRide {...this.props} ride={this.props.state.driverState.active_ride} />

        } else {
            if (this.props.state.driverState.available) {
                if (availableRides.length) {
                    return (
                        <div className="container">
                        <h5 className="text-center">Voters Found!</h5>
                        <ul>
                            {availableRides.map((ride, i) => <PendingRide {...this.props} key={i} i={i} ride={ride} />)}
                        </ul>
                         <div className="text-center">
                            <button className="btn btn-danger" onClick={this.props.submitUnavailable}>Tap here to stop driving</button>
                            </div>

                        </div>
                    )
                } else {
                    return (
                        <div>
                        <div className="jumbotron text-center">
                            <h1><i className="fa fa-circle-o-notch fa-spin"></i></h1>
                            <p>Waiting for voters</p>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger" onClick={this.props.submitUnavailable}>Tap here to stop driving</button>
                            </div>
                        </div>
                    )
                }
            }
        }
    }

};

export default RideListContainer;
