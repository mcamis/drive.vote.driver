import React from 'react';
import { Link } from 'react-router';

import autobind from 'autobind-decorator';

@autobind
class ActiveRide extends React.Component {

    render() {
        const ride = this.props.ride;
        //Current status of the ride. One of waiting_assignment, driver_assigned, picked_up, complete.
        switch (ride.status) {
            case 'driver_assigned':
                let fromMapLink = `https://www.google.com/maps?saddr=My+Location&daddr=${ride.from_address}`;
                return (
                    <div className="panel panel-default">
                        <p>Pick up ride <label>{ride.id}</label></p>
                        <p>{ride.from_address}</p>
                        <a className="btn btn-primary btn-block" target="_blank" href={fromMapLink}>Get directions</a>
                        <button className="btn btn-success btn-block" onClick={()=>this.props.pickupRider(ride)}>Rider picked up</button>
                        <button className="btn btn-danger btn-block" onClick={()=>this.props.cancelRide(ride)}>Cancel ride</button>
                    </div>
                )
            case 'picked_up':
                let toMapLink = `https://www.google.com/maps?saddr=My+Location&daddr=${ride.to_address}`;
                return (
                    <div className="panel panel-default">
                        <p>Drop off at polls</p>
                        <p>Ride <label>{ride.id}</label></p>
                        <p>{ride.to_address}</p>
                         <a className="btn btn-primary btn-block" target="_blank" href={toMapLink}>Get directions</a>
                        <button className="btn btn-success btn-block" onClick={()=>this.props.completeRide(ride)}>Complete ride</button>
                    </div>
                )
            case 'complete':
                return (
                    <div className="">
                        <img src="/app/assets/images/obama_chuckled.png" /> <br />
                        <button className="btn btn-danger" onClick={this.props.submitUnavailable}>Stop Driving</button>
                        <button className="btn btn-success" onClick={this.props.fetchStatus}>Keep Driving</button>
                    </div>
                )
            default:
                this.this.props.fetchStatus;
                return null;
        }
    }
};

export default ActiveRide;
