## Drive The Vote mobile driver app

A React/Redux app for claiming available rides.

### Get Started
####`npm install`
This installs all depedencies needed for running the app locally.


### Develop with a local Rails API
####Setup drive.vote
Clone the [drive.vote repo](https://github.com/devprogress/drive.vote) and follow environment setup instructions from the [wiki](https://github.com/devprogress/drive.vote/wiki/Dev-environment-setup).

####Point to the correct `bundle.js` in Rails
Set via `/app/views/driving/index.html.haml` in the Rails repo.

####Start local servs
With the Rails server already running, run `npm start`. You should now be able to test the driver app at [http://localhost:3000/driving](http://localhost:3000/driving)




