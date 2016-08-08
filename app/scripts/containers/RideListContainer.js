import React from 'react';
import autobind from 'autobind-decorator';

import FlaskHelper from '../helpers/flaskHelper';
import h from '../helpers/helpers';

@autobind
class RideListContainer extends React.Component {

    render() {
        if (this.props.rides.length && !this.props.rides.isFetching) {
            return (
                <RideList {...this.props} />
            )
        } else {
            if (this.props.rides.isFetching) {
                return <Loading />
            } else
                return <h1>Looking for rides</h1>
        }
    }

};

export default RideListContainer;
