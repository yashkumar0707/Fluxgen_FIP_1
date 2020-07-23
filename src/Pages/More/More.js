import React from 'react';
import SideBarExp from '../../SIdeBar/SideBar';
import SideBarmin from '../../SideBarMin/SideBarmin';
import NavBar from '../../NavBar/NavBar';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom'
import './More.css'


class More extends React.Component{
    constructor(props){
        super(props);
        let date = new Date()
        this.state = {
            sidebarexp: true,
            sidewidth: '18.05%',
            activePage: 'More',
            // Refer template.js for usefulness of above
        }
    }
    // Refer template.js
    arrowClick = () => {
        this.setState((prevState) => {
          return{sidebarexp: !prevState.sidebarexp}
        })
        console.log(this.state.sidewidth)
      }
      // Refer template.js
      callBack = (childdata) => {
        this.setState({sidewidth: childdata})
      }
      
      // Refer template.js
      active = (childdata) => {
          this.setState({activePage: childdata})
          console.log(childdata + "in main")
      }
   
    render(){
        let sidebar;
    if(this.state.sidebarexp){
    sidebar = 
    <SideBarExp 
    arrowClick = {this.arrowClick} 
    appCallBack = {this.callBack} 
    activeState = {this.active}
    consumption = {this.props.consumption}
    storage = {this.props.storage}
    quality = {this.props.quality}
    />
    }
    else{
      sidebar =
       <SideBarmin 
       arrowClick = {this.arrowClick} 
       activeState = {this.active}  
       />
    }
    // Refer template.js for usefulnesss
        return(
            <div className = "ActivityLog_Page">
                <NavBar heading = {this.state.activePage} width = {this.state.sidewidth} big = {this.state.sidebarexp}/>
                {sidebar}  
                {/* Initial setup for sidebar + navbar layout */}
                <div className = "MainMorePage_Content" style = {{"position":"fixed","top":"10vh","left":this.state.sidewidth}}>
                {/* <MuiThemeProvider theme = {activityTheme}> */}

                {/* Buttons to link to activity log page and contact us page */}
                <Link to = "/Activity" style = {{"text-decoration": "none"}}>
                <div className = "MoreLinkActvityPage">
                <Button color = "primary">Activity Log </Button>    
                </div> 
                </Link>
                <Link to = "/" style = {{"text-decoration": "none"}}>
                <div className = "MoreLinkActvityPage">
                <Button color = "primary">Contact Us</Button>    
                </div> 
                </Link>
                </div>
            </div>
        )
    }
}

export default More;