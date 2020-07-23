import React from 'react';
import './SideBarmin.css';
import Weather from './WeatherMin/WeatherMin';

import Collapse from "@material-ui/core/Collapse";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarBorder from "@material-ui/icons/StarBorder";
import {Home,InvertColors,Opacity,MoreHoriz,LocalDrink, PlayCircleFilledWhite} from '@material-ui/icons';
import {ReactComponent as Watertap} from './water_tp.svg';
import Titan from './Titan.png'
import {SvgIcon,Avatar} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {ReactComponent as Quality} from './waterquality_24.svg';
import Logo from './AquaGenDrop.png';

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "rgb(108, 189, 234)"
        },
        "&:active": {
            backgroundColor: "rgb(108, 189, 234)" 
        },
        "&:focus": {
            backgroundColor: "rgb(108, 189, 234)" 
        }
      },
      gutters: {
          "padding-left":"5px" 
      },
      root: {
        //   "padding-top":"18px",
        //   "padding-bottom":"18px"
      }
    },
    MuiListItemIcon: {
        root: {
            color: "white"
        }
    }
  }
});
class SideBarExp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Home: false,
            water_con: false,
            water_res: false,
            wat_qual: false,
            more: false,
            curr: ''
        }
        this.setHome = this.setHome.bind(this)
        this.setWaterCon = this.setWaterCon.bind(this)
        this.setWaterRes = this.setWaterRes.bind(this)
        this.setWaterQual = this.setWaterQual.bind(this)
        this.setMore = this.setMore.bind(this)

    }
    setHome(){
        console.log("Home")
        var newState = {
            Home: true,
            water_con: false,
            water_res: false,
            wat_qual: false,
            more: false,
            curr: ''
        }
        this.setState(newState)
        console.log(this.state)
        this.props.activeState("Home")
        // Sets the home variable in state to true and the others to false, sends Home as heading to app.js to add to navbar
    }

    setWaterCon(){
        console.log("Water Consumption")
        var newState = {
            Home: false,
            water_con: true,
            water_res: false,
            wat_qual: false,
            more: false,
            curr: 'Water Consumption'
        }
        this.setState(newState)
        console.log(this.state)
        this.props.activeState("Water Consumption")
        // Sets the water_con variable in state to true and the others to false, sends Water Consumption as heading to app.js to add to navbar
    }
    setWaterRes(){
        console.log("Water Reservoir")
        var newState = {
            Home: false,
            water_con: false,
            water_res: true,
            wat_qual: false,
            more: false,
            curr: 'Water Reservoir'
        }
        this.setState(newState)
        console.log(this.state)
        this.props.activeState("Water Reservoir")
        // Sets the water_res variable in state to true and the others to false, sends Water Reservoir as heading to app.js to add to navbar

    }
    setWaterQual(){
        console.log("Water Quality")
        var newState = {
            Home: false,
            water_con: false,
            water_res: false,
            wat_qual: true,
            more: false,
            curr: 'Water Quality'
        }
        this.setState(newState)
        console.log(this.state)
        this.props.activeState("Water Quality")
        // Sets the wat_qual variable in state to true and the others to false, sends Water Quality as heading to app.js to add to navbar
    }
    setMore(){
        console.log("More")
        var newState = {
            Home: false,
            water_con: false,
            water_res: false,
            wat_qual: false,
            more: true,
            curr: 'More'
        }
        this.setState(newState)
        console.log(this.state)
        this.props.activeState("More")
        // Sets the more variable in state to true and the others to false, sends More as heading to app.js to add to navbar
    }

    render(){
        // console.log(this.props.arrowClick)
    return(
        <MuiThemeProvider theme={theme}>
        <nav className = "SideBarmin">
        {/* Basically for the logo and the anem of the company */}
        <List className = "SideBarmin_List" component="nav" aria-label="secondary mailbox folders">
        <ListItem button  >
        <ListItemIcon className = "SideBarmin_ListItemIcon">
            {/* <SvgIcon viewBox = "0 0 200 150" >
                <Titan />
            </SvgIcon> */}
            {/* Logo is imported as a png file and placed in avatar tag */}
            <Avatar alt = "NA" src = {Titan} />
        </ListItemIcon>
        </ListItem>
        </List>

        {/* Demarcation */}
        <Divider />


            <List component="nav" aria-label="main mailbox folders" className = "SideBar_List">

            {/* <Home /> */}
            <ListItem className = "SideBarmin_ListItem" button selected = {this.state.Home} onClick = {this.setHome}>
            <ListItemIcon className = "SideBarmin_ListItemIcon">
            <SvgIcon>
            {/* Path tag for home icon */}
            <path d = "M10,20V14h4v6h5V12h3L12,3,2,12H5v8Z" ></path>
            {/* <Home /> */}
            </SvgIcon>                
            </ListItemIcon>
            </ListItem>

            {/*Water Consumption Button  */}
            <ListItem className = "SideBarmin_ListItem" button onClick = {this.setWaterCon}>
            <ListItemIcon className = "SideBarmin_ListItemIcon">
            <SvgIcon>
            {/* Path tag for Water COnsumption Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(-2 -1)">
<path style = {{"fill":"#fff"}} d="M40.735,36.635a.365.365,0,0,0-.587,0c-.183.251-1.614,2.292-1.064,3.546a1.578,1.578,0,0,0,2.752,0C42.386,38.927,40.919,36.85,40.735,36.635Zm.44,3.224a.851.851,0,0,1-1.394,0c-.257-.537.22-1.612.7-2.364C40.919,38.282,41.4,39.321,41.175,39.858Z" transform="translate(-16.459 -15.987)"/>
<path style = {{"fill":"#fff"}} d="M7.15,6.074H3.445a.518.518,0,0,0-.545.552v8.548a.518.518,0,0,0,.545.552H7.2a.518.518,0,0,0,.545-.552V13.685h4.959a.282.282,0,0,1,.218.11,3.488,3.488,0,0,0,2.561,1.268,4.264,4.264,0,0,0,2.779-1.324c2.561.221,3.488,2.482,3.815,3.805a1.919,1.919,0,0,0,1.8,1.434c.054,0,3.324.386
,3-2.151-.763-6.508-6.43-8.107-8.119-8.438-.109,0-.163-.11-.218-.221a1.363,1.363,0,0,0-1.308-.882h-.109V4.861h.436a2.223,2.223,0,0,0,1.689.772,
2.316,2.316,0,0,0,0-4.633,2.223,2.223,0,0,0-1.689.772h-4.2A2.223,2.223,0,0,0,11.673,1a2.316,2.316,0,0,0,0,4.633,2.223,2.223,0,0,0,1.689-.772H13.8V7.287H13.69a1.376,
1.376,0,0,0-1.253.827.3.3,0,0,1-.272.165H7.75V6.625A.643.643,0,0,0,7.15,6.074Zm-.545,8.6H3.99v-7.5H6.66v7.5ZM13.09,3.758a.67.67,0,0,0-.436.221A1.2,
1.2,0,1,1,11.673,2.1a1.161,1.161,0,0,1,.981.5.494.494,0,0,0,.436.221h4.741a.67.67,0,0,0,.436-.221,1.161,1.161,0,0,1,.981-.5,1.213,1.213,0,0,1,0,
2.427,1.161,1.161,0,0,1-.981-.5.555.555,0,0,0-.436-.276H13.09Zm1.8,1.1h1.144V7.287H14.889ZM12.164,9.438a1.376,1.376,0,0,0,1.253-.827.3.3,0,0,1,
.272-.165h3.542a.279.279,0,0,1,.272.221,1.252,1.252,0,0,0,1.035.827c1.526.276,6.594,1.71,7.357,7.445a.782.782,0,0,1-.763.882H23.989a.819.819,0,0,
1-.763-.607c-.708-2.868-2.561-4.522-5.068-4.633a.615.615,0,0,0-.436.165,3.366,3.366,0,0,1-2.18,1.158,2.341,2.341,0,0,1-1.744-.882,1.48,1.48,0,0,
0-1.035-.441H7.8V9.438Z" transform="translate(-0.9)"/></g></svg>
                {/* <Watertap /> */}
            </SvgIcon>
            </ListItemIcon>
            </ListItem>
            
            {/* Water Reservoir Button */}
            <ListItem className = "SideBarmin_ListItem" button onClick = {this.setWaterRes}>
            <ListItemIcon className = "SideBarmin_ListItemIcon">
            <SvgIcon>
            {/* Path for water Reservoir icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<path style = {{fill: "none"}} d="M0,0H24V24H0Z"/><g transform="translate(-3 -2)">
<path style = {{fill: "none" ,stroke: "#fff","stroke-linecap":"round"}} d="M299,1247l-5,5v5l-3,12h16l-3-12v-5Z" transform="translate(-284 -1244)"/>
<path style = {{fill: "none" ,stroke: "#fff","stroke-linecap":"round"}} d="M293,1257h14" transform="translate(-285 -1244)"/>
<path style = {{fill: "none" ,stroke: "#fff"}} d="M293,1261h12" transform="translate(-284 -1244)"/>
<path style = {{fill: "none" ,stroke: "#fff","stroke-linecap":"round"}}d="M288,1269h22" transform="translate(-284 -1244)"/></g></svg>
            </SvgIcon>
            </ListItemIcon>
            </ListItem>

            {/* Water Quality Button */}
            <ListItem className = "SideBarmin_ListItem" button onClick = {this.setWaterQual}>
            <ListItemIcon className = "SideBarmin_ListItemIcon">
                <Quality />
                {/* SVG icon imported from the same folder */}
            </ListItemIcon>
            </ListItem>


            {/* More Button */}
            <ListItem className = "SideBarmin_ListItem" button onClick = {this.setMore}>
            <ListItemIcon>
            {/* Path for more icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<path style = {{"fill":"none"}}d="M0,0H24V24H0Z"/>
<path style = {{"fill" : "#fff"}} d="M6,10a2,2,0,1,0,2,2A2.006,2.006,0,0,0,6,10Zm12,0a2,2,0,1,0,2,2A2.006,2.006,0,0,0,18,10Zm-6,0a2,2,0,1,0,2,2A2.006,2.006,0,0,0,12,10Z"/></svg>
        	    {/* <MoreHoriz /> */}
            </ListItemIcon>
            </ListItem>
        </List>
        <div className = "SideBarmin_ListImage">
        {/* Weather component for minimised sidebar imported  */}
        <Weather />
        <img className = "AquaGenmin" src = {Logo} alt = {Logo} height="60" width="120" />
        </div>   
        </nav>
        <ArrowForwardIosIcon 
        onClick = {this.props.arrowClick}
        className = "Arrowmin" 
        button/>
        </MuiThemeProvider>
    )
    }
}

export default SideBarExp;