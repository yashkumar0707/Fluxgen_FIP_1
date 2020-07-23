import React from 'react';
import SideBarExp from '../../SIdeBar/SideBar';
import SideBarmin from '../../SideBarMin/SideBarmin';
import NavBar from '../../NavBar/NavBar';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'


class Sump extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date()
        this.state = {
            sidebarexp: true, //Set to true when the expanded sidear is desired and false is collapsed sidebar is wanted
            sidewidth: '18.05%',//Initial width of expanded sidebar 
            activePage: 'Page_name',//Heading in the navbar
        }
    }
    arrowClick = () => {//Refers to the arrow attached to the sidebar, onclick of the arrow the sidebar is expanded or collapsed
        this.setState((prevState) => {
            return { sidebarexp: !prevState.sidebarexp }
        })
        console.log(this.state.sidewidth)//To test width change
    }
    callBack = (childdata) => {//Depending on whether the sidebar is expanded or not, width has to be changed accordingly to render navbar properly
        this.setState({ sidewidth: childdata })
    }

    active = (childdata) => {// Sidebar sends data of the active page to whole page, this data is then passed to navbar
        this.setState({ activePage: childdata })
        console.log(childdata + "in main")
    }

    render() {
        let sidebar;
        if (this.state.sidebarexp) {//Conditional rendering depending on sidebarexp
            sidebar =
                <SideBarExp
                    arrowClick={this.arrowClick}
                    appCallBack={this.callBack}
                    activeState={this.active}
                    consumption={this.props.consumption}
                    storage={this.props.storage}
                    quality={this.props.quality}
                />
        }
        else {
            sidebar =
                <SideBarmin
                    arrowClick={this.arrowClick}
                    activeState={this.active}
                />
        }
        return (
            <div className="ActivityLog_Page">
                <NavBar heading={this.state.activePage} width={this.state.sidewidth} big={this.state.sidebarexp} />
                {/* heading is the active page, sidewidth determines where the navbar starts from */}
                {sidebar}
                <div className="MainActivityPage_Content" style={{ "position": "fixed", "top": "10vh", "left": this.state.sidewidth }}>
                    {/* All page content oges in this div */}
                </div>
            </div>
        )
    }
}

export default Sump;