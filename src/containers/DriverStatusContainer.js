import React from 'react';
import autobind from 'autobind-decorator';

import RideListContainer from '../containers/RideListContainer.js';

@autobind
class DriverStatusContainer extends React.Component {

    componentWillMount() {
        this.props.fetchStatus();
    }

    render() {
        if (this.props.state.driverState.available) {
            return <RideListContainer {...this.props} />
        } else {
            return (
                <div>
                    <div className="jumbotron text-center">
                        <h1><i className="fa fa-users"></i></h1>
                        <p>11 People waiting to vote...</p>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-success" onClick={this.props.submitAvailable}>Tap here to start driving</button>
                        </div>
                    </div>
            )
        }
    }

};

export default DriverStatusContainer;
