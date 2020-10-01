import React from 'react';
import './App.css';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
//import { hashHistory } from 'react-router;'
import Settings from './Pages/Settings';
import Activity from './Pages/ActivityLog/ActivityLog'
import More from './Pages/More/More'
import Contact from './Pages/Contact_Us_FaQ/Contact_Us'
import Template from './Pages/Template_with_sidebar_Nav/Template';
import "core-js";
import 'core-js/features/set/map';
import './App.scss';
import Cookies from 'js-cookie'

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
var CryptoJS = require("crypto-js");
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      storage: '',
      consumption: '',
      quality: '',
      auth: '',
      industry: ''
    }
  }
  componentDidMount() {
    var bytes = ''
    var originalText = ''
    var ind = ''
    if (Cookies.get('auth')) {
      var test = Cookies.get('auth')
      console.log(test)
      bytes = CryptoJS.AES.decrypt(test, 'secret key 123');
      //var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      originalText = bytes.toString(CryptoJS.enc.Utf8);
      this.setState({ auth: originalText })
      console.log(originalText)
    }
    if (Cookies.get('industry')) {
      var ind = Cookies.get('industry')
      console.log(ind)
    }
    this.setState({ auth: originalText })
    this.setState({ industry: ind })
    console.log(this.state.industry)
    if (!this.state.auth) {
      // /console.log('syash')
      // hashHistory.push('/login')
      //  return <Redirect to="/login"></Redirect>
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
    this.setState({ auth: childdata[0].token, industry: childdata[0].industry_id })
    console.log(this.state.auth)
    var original = childdata[0].token.toString()
    console.log(original)
    var ciphertext = CryptoJS.AES.encrypt(original, 'secret key 123').toString();
    console.log(ciphertext);
    Cookies.set('auth', ciphertext, { expires: 1 / 24 });
    Cookies.set('industry', this.state.industry, { expires: 1 / 24 })
    console.log('cookie: ' + Cookies.get('auth'))
  }
  render() {
    return (

      <BrowserRouter className="App">
        <React.Suspense fallback={loading()}>
          {this.state.auth && <Switch>
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
                  auth={this.state.auth}
                  industry={this.state.industry}
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
                  industry={this.state.industry}
                />
              )}
            />
            <Route exact path="/login" >
              <Redirect to="/dashboard" />
            </Route>

            <Route exact path="/trial" name="Trial Page" render={props => <Trial {...props} />} />
            <Route exact path="/forgotpassword" name="Change Password" render={props => <ForgotPassword {...props} />} />
            <Route exact path="/forgotpasswordemail" name="Change Password" render={props => <ForgotPasswordEmail {...props} />} />
            <Route exact path="/forgotpasswordotp" name="Change Password" render={props => <ForgotPasswordOTP {...props} />} />
            <Route exact path="/changepassword/:token" name="Change Password" render={props => <ChangePassword {...props} />} />

          </Switch>
          }
          {!this.state.auth && <Switch>
            {/* <Redirect to="/login" ></Redirect> */}
            <Route exact path="/">

            </Route>
            <Route exact path="/login"
              name="Login Page"
              render={props => (
                <Login {...props}
                  appCallBack1={this.loginCallBack} />
              )} />
            <Route exact path="/:pid">
              <Redirect to="/login" />
            </Route>
          </Switch>
            // && <Redirect to='/login' name="Login Page"
            //   render={props => (
            //     <Login {...props}
            //       appCallBack1={this.loginCallBack} />
            //   )} />
          }
        </React.Suspense>
      </BrowserRouter >
    )
  }
}

export default App;
