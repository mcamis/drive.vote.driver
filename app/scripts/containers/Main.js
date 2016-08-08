import React from 'react';
import autobind from 'autobind-decorator';

import Header from '../components/Header'

@autobind
class Main extends React.Component {

    render() {
        return (
            <div>
              	<Header logout={this.logout} />
              	<div className="container">
          	        {React.cloneElement(this.props.children, this.props)}
              	</div>
          	</div>

        )
    }
};

export default Main;
