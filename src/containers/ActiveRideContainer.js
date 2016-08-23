import React from 'react';
import autobind from 'autobind-decorator';

import PendingRide from '../components/PendingRide.js';

@autobind
class DriverStatusContainer extends React.Component {

    componentWillMount() {
        this.props.fetchStatus();
    }
    
    render() {
        const availableRides = this.props.state.driverState.rides;
        if (this.props.state.driverState.available) {
            if (availableRides.length) {
                return (
                    <div className="container">
                    <h5 className="text-center">Ride Found!</h5>
                    <ul>
                        {availableRides.map((ride, i) => <PendingRide {...this.props} key={i} i={i} ride={ride} />)}
                    </ul>
                     <div className="text-center">
                        <button className="btn btn-success" onClick={this.props.submitUnavailable}>Available to drive <span aria-hidden="true" className="glyphicon glyphicon-menu-down"></span></button>
                        </div>

                    </div>
                )
            } else {
                return (
                    <div>
                    <div className="jumbotron text-center">
                        <h1><span aria-hidden="true" className="glyphicon glyphicon-transfer"></span></h1>
                        <p>Waiting for riders</p>
                        <button className="btn btn-primary" onClick={this.props.fetchWaitingRides}>DEBUG: Add ride to state</button>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-success" onClick={this.props.submitUnavailable}>Available to drive <span aria-hidden="true" className="glyphicon glyphicon-menu-down"></span></button>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <div className="jumbotron text-center">
                        <h1><span aria-hidden="true" className="glyphicon glyphicon-user"></span></h1>
                        <p>11 People waiting to vote...</p>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-danger" onClick={this.props.submitAvailable}>Not available to drive <span aria-hidden="true" className="glyphicon glyphicon-menu-down"></span></button>
                        </div>
                    </div>
            )
        }
    }

};

export default DriverStatusContainer;
