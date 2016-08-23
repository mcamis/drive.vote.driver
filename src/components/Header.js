import React from 'react';

class Header extends React.Component {

    render() {
        return (
			<nav className="navbar navbar-default navbar-static-top">
			    <div className="container">
			        <div className="navbar-header">
			            <a className="navbar-brand">
			                <span aria-hidden="true" className="glyphicon glyphicon-road"></span>&nbsp;
			                Drive the Vote!
			            </a>
			        </div>
			        <div className="collapse navbar-collapse" id="navbar">
			            <ul className="nav navbar-nav navbar-right">
			                <li><a>Settings</a></li>
			            </ul>
			        </div>
			    </div>
			</nav>
        )
    }
};

export default Header;
