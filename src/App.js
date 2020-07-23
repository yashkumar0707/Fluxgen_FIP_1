import React from 'react';
import './App.css';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import Settings from './Pages/Settings';
import Activity from './Pages/ActivityLog/ActivityLog'
import More from './Pages/More/More'
import Contact from './Pages/Contact_Us_FaQ/Contact_Us'
import Template from './Pages/Template_with_sidebar_Nav/Template';
import "core-js";
import 'core-js/features/set/map';
import './App.scss';


import Sump from './Pages/Storage/Sump/Sump';
import { Dashboard } from '@material-ui/icons';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Pages
const Dashboard2 = React.lazy(() => import('./Pages/NewDashboard/Dashboard'));
const Login = React.lazy(() => import('./Pages/Login'));
const Trial = React.lazy(() => import('./Pages/Trial'));
const ChangePassword = React.lazy(() => import('./Pages/ChangePassword/ChangePassword'));
const ForgotPassword = React.lazy(() => import('./Pages/ForgotPassword/ForgotPassword'));
const ForgotPasswordEmail = React.lazy(() => import('./Pages/ForgotPasswordEmail/ForgotPasswordEmail'));
const ForgotPasswordOTP = React.lazy(() => import('./Pages/ForgotPasswordOTP/ForgotPasswordOTP'));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      storage: '',
      consumption: '',
      quality: '',
      auth: 'sxxsxss'
    }
  }
  settingsCallBack = (childdata) => {
    // Settings page returns storage,consumption and quality array, this is passed on to each webpage by app.js
    console.log(childdata)
    let storage = childdata[0]
    let consumption = childdata[1]
    let quality = childdata[2] // Assigned to state variables
    this.setState({ storage: storage, consumption: consumption, quality: quality })
  }
  loginCallBack = (childdata) => {
    // Settings page returns storage,consumption and quality array, this is passed on to each webpage by app.js
    console.log(childdata)
    this.setState({ auth: childdata })
  }
  render() {
    return (
      <BrowserRouter className="App">
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/Activity"
              render={props => (
                <Activity {...props}
                  storage={this.state.storage}
                  consumption={this.state.consumption}
                  quality={this.state.quality}
                />
              )}
            />
            <Route exact path="/More"
              render={props => (
                <More {...props}
                  storage={this.state.storage}
                  consumption={this.state.consumption}
                  quality={this.state.quality}
                />
              )}
            />
            <Route exact path="/"
              render={props => (
                <Contact {...props}
                  storage={this.state.storage}
                  consumption={this.state.consumption}
                  quality={this.state.quality}
                />
              )}
            />
            <Route exact path="/Template"
              render={props => (
                <Template {...props}
                  storage={this.state.storage}
                  consumption={this.state.consumption}
                  quality={this.state.quality}
                />
              )}
            />
            <Route exact path="/Settings"
              render={props => (
                <Settings {...props}
                  appCallBack={this.settingsCallBack}
                // Settings page is different as it sets the basic pros and passes the data by itself to the sidebar
                />
              )} />
            <Route exact path="/Storage/Sump"
              render={props => (
                <Sump {...props}
                  storage={this.state.storage}
                  consumption={this.state.consumption}
                  quality={this.state.quality}
                />
              )}
            />
            <Route exact path="/dashboard"
              render={props => (
                <Dashboard2 {...props}
                  storage={this.state.storage}
                  consumption={this.state.consumption}
                  quality={this.state.quality}
                  auth={this.state.auth}
                />
              )}
            />
            <Route exact path="/login"
              name="Login Page"
              render={props => (
                <Login {...props}
                  appCallBack1={this.loginCallBack} />
              )} />
            <Route exact path="/trial" name="Trial Page" render={props => <Trial {...props} />} />
            <Route exact path="/forgotpassword" name="Change Password" render={props => <ForgotPassword {...props} />} />
            <Route exact path="/forgotpasswordemail" name="Change Password" render={props => <ForgotPasswordEmail {...props} />} />
            <Route exact path="/forgotpasswordotp" name="Change Password" render={props => <ForgotPasswordOTP {...props} />} />
            <Route exact path="/changepassword/:token" name="Change Password" render={props => <ChangePassword {...props} />} />
            {/* <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} /> */}
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App;
