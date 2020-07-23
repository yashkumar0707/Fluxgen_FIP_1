import React from 'react';
import './Settings.css';
import NavBar from '../NavBar/NavBar';
import SideBarExp from '../SIdeBar/SideBar';
import SideBarmin from '../SideBarMin/SideBarmin';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {FormLabel,FormControl,FormGroup,FormControlLabel,FormHelperText,Switch} from '@material-ui/core'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import {StylesProvider} from '@material-ui/core/styles';

// const settingstheme = createMuiTheme({
//     overrides: {
//         MuiFormControl: {
//             root: {
//                  "padding-left":"18.5vh",
//             }
//         },
//         MuiFormLabel: {
//             root: {
//                 "padding-top": "5vh",
//             }

//         }
//     }
// })


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      sidebarexp: true,
      sidewidth: '18.05%',
      activePage: 'Settings',
      // Refer Template.js to understand the usefulness of the above
      consumption: [false,false,false,false,false,false,false],
      storage: [false,false,false,],
      quality: [false,false,false,false,false,false,false,false,false,false]
    }
  }
  arrowClick = () => {
    this.setState((prevState) => {
      return{sidebarexp: !prevState.sidebarexp}
    })
    console.log(this.state.sidewidth)
  }
  // Refer Template.js  for above function
  menuToggleClick = () => {
    this.setState((prevState) => {
      return{sidebar: !prevState.sidebar,backdrop: !prevState.backdrop}
    })    
  }
  backdropClick = () => {
    this.setState({sidebar: false,backdrop:false})
  }
  //Above 2 functions are redundant
  callBack = (childdata) => {
    this.setState({sidewidth: childdata})
  }
  // Refer Template.js  for above function
  active = (childdata) => {
      this.setState({activePage: childdata})
      console.log(childdata + "in main")
  }
  // Refer Template.js  for above function
  handleChange = (event) => {
      let consumption = {... this.state.consumption} // Consumption array is taken
      let index = event.target.name; // the name has the index of the array to be changed
      let item = consumption[index] // assigning the corresonding boolean value to item
      item = !item // Assigning the opposite to item 
      consumption[index] = item//changing the item in the consumtpion array
      this.setState({consumption: consumption})// changing the state array to consumption
      let data = []
      data.push(this.state.storage) //Pushing data in the exact same format - storage,consumption,quality
    data.push(consumption)
    data.push(this.state.quality)
    this.props.appCallBack(data) //Since there is a change in the array, the change has tp be reflected in the main App.js and then sent on to web pages
  }
  //if any variable in consumption array changes value, the above function is called 
  handleStorageChange = (event) => {
    let consumption = {... this.state.storage}
      let index = event.target.name;
      let item = consumption[index]
      item = !item
      consumption[index] = item
      this.setState({storage: consumption})
      let data = []
      data.push(consumption)
    data.push(this.state.consumption)
    data.push(this.state.quality)
    console.log(data)
    this.props.appCallBack(data)
  }
  //if any variable in storage array changes value, the above function is called - Similar to handleChange function
  handleQualityChange = (event) => {
    let consumption = {... this.state.quality}
      let index = event.target.name;
      let item = consumption[index]
      item = !item
      consumption[index] = item
      this.setState({quality: consumption})
      let data = []
      data.push(this.state.storage)
    data.push(this.state.consumption)
    data.push(consumption)
    this.props.appCallBack(data)
  }
  //if any variable in quality array changes value, the above function is called - Similar to handleChange function
  render(){
    let data = []
    
    let sidebar;
    if(this.state.sidebarexp){
    sidebar = 
    <SideBarExp 
    arrowClick = {this.arrowClick} 
    appCallBack = {this.callBack} 
    activeState = {this.active}
    consumption = {this.state.consumption}
    storage = {this.state.storage}
    quality = {this.state.quality}
    />
    }
    else{
      sidebar =
       <SideBarmin 
       arrowClick = {this.arrowClick} 
       activeState = {this.active} 
       consumption = {this.state.consumption}
       storage = {this.state.storage} 
       quality = {this.state.quality} 
       />
    }
    // Refer Template.js  for all code in render function till now
    return (
      <div className="MainSettingsPage">
      <NavBar menuClick = {this.menuToggleClick} heading = {this.state.activePage} width = {this.state.sidewidth} big = {this.state.sidebarexp}/>
      {sidebar}  
      {/* Initial set up for sidebar + navbar */}
      <div className = "MainPage_Content" style = {{"position":"fixed","top":"10vh","left":this.state.sidewidth}}>
      {/* <MuiThemeProvider theme = {settingstheme}> */}
      {/* <StylesProvider injectFirst> */}

      {/* Material-UI components */}
      <FormControl component="fieldset" className = "Settings_Consumption">
      <FormLabel component="legend">Consumption</FormLabel>
      <FormGroup>
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.consumption[0]} onChange={this.handleChange} name={0}/>}
          label="Raw Water"
        />
        {/* Since the above affects the consumption fropdown, the consumption array changes and handleChange is called, similar for all consumption array elements */}
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.consumption[1]} onChange={this.handleChange} name={1}/>}
          label="RO"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.consumption[2]} onChange={this.handleChange} name={2}/>}
          label="Treated"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.consumption[3]} onChange={this.handleChange} name={3}/>}
          label="Soft"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.consumption[4]} onChange={this.handleChange} name={4}/>}
          label="Hot"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.consumption[5]} onChange={this.handleChange} name={5}/>}
          label="Tanker"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.consumption[6]} onChange={this.handleChange} name={6}/>}
          label="Misc"
        />
      </FormGroup>
    </FormControl>
    <FormControl component="fieldset" className = "Settings_Consumption">
      <FormLabel component="legend">Storage</FormLabel>
      <FormGroup>
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.storage[0]} onChange={this.handleStorageChange} name={0}/>}
          label="Block 1"
        />
        {/* Since the above affects the storage dropdown, the storage array changes and handleStorageChange is called, similar for all storage array elements */}
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.storage[1]} onChange={this.handleStorageChange} name={1}/>}
          label="OHT"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.storage[2]} onChange={this.handleStorageChange} name={2}/>}
          label="Sump"
        />
      </FormGroup>
    </FormControl>
    <FormControl component="fieldset" className = "Settings_Consumption">
      <FormLabel component="legend">Water Quality</FormLabel>
      <FormGroup>
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.quality[0]} onChange={this.handleQualityChange} name={0}/>}
          label="TDS"
        />
        {/* Since the above affects the quality dropdown, the quality array changes and handleQualityChange is called, similar for all quality array elements */}
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.quality[1]} onChange={this.handleQualityChange} name={1}/>}
          label="NO2"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.quality[2]} onChange={this.handleQualityChange} name={2}/>}
          label="SPM"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.quality[3]} onChange={this.handleQualityChange} name={3}/>}
          label="pH"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.quality[4]} onChange={this.handleQualityChange} name={4}/>}
          label="CL2"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.quality[5]} onChange={this.handleQualityChange} name={5}/>}
          label="EC"
        />
      </FormGroup>
    </FormControl>
    
    <FormControl component="fieldset" className = "Settings_Consumption">
      <FormGroup>
      <FormLabel component="legend"></FormLabel>
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.quality[6]} onChange={this.handleQualityChange} name={6}/>}
          label="Sump"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.quality[7]} onChange={this.handleQualityChange} name={7}/>}
          label="Treated(STP)"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.quality[8]} onChange={this.handleQualityChange} name={8}/>}
          label="RO"
        />
        <FormControlLabel
          className = "Settings_FormItem"
          control={<Switch checked={this.state.quality[9]} onChange={this.handleQualityChange} name={9}/>}
          label="Soft Water"
        />
      </FormGroup>
    </FormControl>
    {/* </StylesProvider> */}
    {/* </MuiThemeProvider> */}
      </div>      
      </div>
    );
  }
}

export default App;
