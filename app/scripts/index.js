import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import  store, { history } from './store';
import { createStore } from 'redux';

import App from './containers/App';
import DriverStatusContainer from './containers/DriverStatusContainer'

const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/"  component={App}>
				<IndexRoute component={DriverStatusContainer}></IndexRoute>
				 {/*  <Route path="ride/:rideId" component={RideDetails}></Route> */}
			</Route>
		</Router>
	</Provider>
)

render(router, document.getElementById('root'));