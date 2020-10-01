import React from 'react';
import './SideBar.css';
import 'tachyons';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core'
import Collapse from "@material-ui/core/Collapse";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarBorder from "@material-ui/icons/StarBorder";
import { InvertColors, Opacity, MoreHoriz, LocalDrink, PlayCircleFilledWhite } from '@material-ui/icons';
import { ReactComponent as Watertap } from './water_tp.svg';
import Titan from './Titan.png'
import { SvgIcon } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { ReactComponent as Home } from './home_24.svg'
import { ReactComponent as Reservoir } from './reservoir_24.svg';
import { ReactComponent as Quality } from './waterquality_24.svg';
import Logo from './MainAquaGen.png';
import Weather from './WeatherComp/Weather'


// Theme used to override material ui default styles 
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
                "&.active": {
                    backgroundColor: "rgb(108, 189, 234)"
                },
                "&:focus": {
                    backgroundColor: "rgb(108, 189, 234)"
                }
            },
            root: {
                "padding-top": "1vh",
                "padding-bottom": "0px"
            }
        },
        MuiListItemIcon: {
            root: {
                color: "white"
            }
        },
        MuiTypography: {
            body1: {
                "letter-spacing": "0px"
            }
        }
    }
});
class SideBarExp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Home: false,
            water_con: false,
            water_res: false,
            wat_qual: false,
            more: false,
            curr: '',
            width: 1000,
        }
        this.setHome = this.setHome.bind(this)
        this.setWaterCon = this.setWaterCon.bind(this)
        this.setWaterRes = this.setWaterRes.bind(this)
        this.setWaterQual = this.setWaterQual.bind(this)
        this.setMore = this.setMore.bind(this)

    }
    setHome() {
        console.log("Home")
        let width = this.state.width
        var newState = {
            Home: true,
            water_con: false,
            water_res: false,
            wat_qual: false,
            more: false,
            curr: 'Home',
            width: width
        }
        this.setState(newState)
        console.log(this.state)
        this.props.activeState("Home")
        // Sets the home variable in state to true and the others to false, sends Home as heading to app.js to add to navbar
    }

    setWaterCon() {
        console.log("Water Consumption")
        let width = this.state.width
        var newState = {
            Home: false,
            water_con: true,
            water_res: false,
            wat_qual: false,
            more: false,
            curr: 'Water Consumption',
            width: width
        }
        this.setState(newState)
        console.log(this.state)
        this.props.activeState("Water Consumption")
        // Sets the water_con variable in state to true and the others to false, sends Water Consumption as heading to app.js to add to navbar
    }
    setWaterRes() {
        console.log("Water Reservoir")
        let width = this.state.width
        var newState = {
            Home: false,
            water_con: false,
            water_res: true,
            wat_qual: false,
            more: false,
            curr: 'Water Reservoir',
            width: width
        }
        this.setState(newState)
        console.log(this.state)
        //this.props.activeState("Storage")
        // Sets the water_res variable in state to true and the others to false, sends Water Reservoir as heading to app.js to add to navbar

    }
    setWaterQual() {
        console.log("Water Quality")
        let width = this.state.width
        var newState = {
            Home: false,
            water_con: false,
            water_res: false,
            wat_qual: true,
            more: false,
            curr: 'Water Quality',
            width: width
        }
        this.setState(newState)
        console.log(this.state)
        this.props.activeState("Water Quality")
        // Sets the wat_qual variable in state to true and the others to false, sends Water Quality as heading to app.js to add to navbar
    }
    setMore() {
        console.log("More")
        let width = this.state.width
        var newState = {
            Home: false,
            water_con: false,
            water_res: false,
            wat_qual: false,
            more: true,
            curr: 'More',
            width: width
        }
        this.setState(newState)
        console.log(this.state)
        //return <Link to="/More"></Link>
        //this.history.push('/More')
        // Sets the more variable in state to true and the others to false, sends More as heading to app.js to add to navbar
    }
    resize = () => {
        // Everytime sidebar is resized width variable must be changed
        let x = 0.1805 * (window.innerWidth)
        if (x > 300) {//max width of sidebar is set to 300
            x = 300
        }
        if (x < 100) {// min width of sidebar is set to 100
            x = 100
        }
        // console.log(x)
        this.setState({ width: x }) //Changes ae recorded in the state
        this.props.appCallBack(x) // Correspondin changes are made in the parent as well

    }
    text = (limit, word) => {
        if (this.state.width >= limit) {
            return (
                <p className="SideBar_ListItemText sans-serif" >
                    {/* Called when the sidebar width reduces so that the text still fits sidebar */}
                    {word}
                </p>
            )
        }
    }
    heading = (limit) => {
        if (this.state.width >= limit) {
            // Similar function as text but for the heading
            return (<ListItemText className="SideBar_ListItemText" primary="TITAN" />)
        }
    }
    // When consumption is active in sidebar, the dropdowns are handled bu this
    handleConsumptionDropdown = () => {
        let arr = []
        let ref = ['Raw Water', 'RO', 'Treated', 'Soft', 'Hot', 'Tanker', 'Misc']
        // ref values are corresponding to the boolean array received from props
        let cons = Object.keys(this.props.consumption).map((key) => {
            return [this.props.consumption[key]]
        })
        //Converting the object to array of arrays stored in cons
        for (let i = 0; i < cons.length; i++) {
            // Whenever corresponding value is true, this means the component is active
            if (cons[i][0] == true) {
                arr.push(
                    <ListItem
                        className="SideBar_ListItemSub"
                        button >
                        <ListItemIcon className="SideBar_ListItemIcon">
                            {/* <StarBorder /> */}
                        </ListItemIcon>
                        <ListItemText
                            className="SideBar_ListItemTextSmall"
                            primary={ref[i]} />
                    </ListItem>
                )
            }
        }
        // arr contains all the active dropdown options 
        return arr;
    }
    // Similar to handleConsumptionDropDown
    handleStorageDropdown = () => {
        // Block1 , OHT, Sump
        let arr = []
        let ref = ['Block 1', 'OHT', 'Sump']
        let cons = Object.keys(this.props.storage).map((key) => {
            return [this.props.storage[key]]
        })
        for (let i = 0; i < cons.length; i++) {

            if (cons[i][0] == true) {
                arr.push(

                    <ListItem
                        className="SideBar_ListItemSub"
                        button >
                        <ListItemIcon className="SideBar_ListItemIcon">
                            {/* <StarBorder /> */}
                        </ListItemIcon>
                        {/* <Link to={"Storage/$ref[i]" > */}
                        <Link to={`/Storage/${ref[i]}`}>
                            <ListItemText
                                className="SideBar_ListItemTextSmall"
                                primary={ref[i]} />
                        </Link>
                    </ListItem >
                )
            }
        }
        return arr;
    }
    // Similar to handleQualityDropdown
    handleQualityDropdown = () => {
        let arr = []
        let ref = ['TDS', 'NO2', 'SPM', 'pH', 'Cl2', 'EC', 'Sump', 'Treated(STP)', 'RO', 'Soft Water']
        let cons = Object.keys(this.props.quality).map((key) => {
            return [this.props.quality[key]]
        })
        for (let i = 0; i < cons.length; i++) {

            if (cons[i][0] == true) {
                arr.push(
                    <ListItem
                        className="SideBar_ListItemSub"
                        button >
                        <ListItemIcon className="SideBar_ListItemIcon">
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText
                            className="SideBar_ListItemTextSmall"
                            primary={ref[i]} />
                    </ListItem>
                )
            }
        }
        // console.log(arr)
        return arr;
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }
    render() {
        // console.log(this.props.consumption)
        return (
            <MuiThemeProvider theme={theme}>
                <nav className="SideBar">
                    <List className="SideBar_List" component="nav" aria-label="secondary mailbox folders">
                        <ListItem button  >
                            <ListItemIcon className="SideBar_ListItemIcon">
                                {/* <SvgIcon viewBox = "0 0 200 150" >
                <Titan />
            </SvgIcon> */}
                                <Avatar alt="NW" src={Titan} />
                                {/* Logo is imported as a png file and placed in avatar tag */}
                            </ListItemIcon>
                            {this.heading(160)}
                        </ListItem>
                    </List>
                    <Divider />
                    <List component="nav" aria-label="main mailbox folders" className="SideBar_List_main">

                        {/* <Home /> */}
                        <Link to="/dashboard">
                            <ListItem className="SideBar_ListItem" button selected={this.state.Home} onClick={this.setHome}>
                                <ListItemIcon className="SideBar_ListItemIcon">
                                    <SvgIcon>
                                        {/* Path tag for home icon */}
                                        <path d="M10,20V14h4v6h5V12h3L12,3,2,12H5v8Z" ></path>
                                        {/* <Home /> */}
                                    </SvgIcon>
                                </ListItemIcon>
                                {/* Conditional rendering of text */}
                                {this.text(160, "Home")}
                            </ListItem>
                        </Link>

                        {/*Water Consumption Button  */}
                        <ListItem className="SideBar_ListItem" button onClick={this.setWaterCon}>
                            <ListItemIcon className="SideBar_ListItemIcon">
                                <SvgIcon>
                                    {/* Path tag for water consumption icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(-2 -1)">
                                        <path style={{ "fill": "#fff" }} d="M40.735,36.635a.365.365,0,0,0-.587,0c-.183.251-1.614,2.292-1.064,3.546a1.578,1.578,0,0,0,2.752,0C42.386,38.927,40.919,36.85,40.735,36.635Zm.44,3.224a.851.851,0,0,1-1.394,0c-.257-.537.22-1.612.7-2.364C40.919,38.282,41.4,39.321,41.175,39.858Z" transform="translate(-16.459 -15.987)" />
                                        <path style={{ "fill": "#fff" }} d="M7.15,6.074H3.445a.518.518,0,0,0-.545.552v8.548a.518.518,0,0,0,.545.552H7.2a.518.518,0,0,0,.545-.552V13.685h4.959a.282.282,0,0,1,.218.11,3.488,3.488,0,0,0,2.561,1.268,4.264,4.264,0,0,0,2.779-1.324c2.561.221,3.488,2.482,3.815,3.805a1.919,1.919,0,0,0,1.8,1.434c.054,0,3.324.386
,3-2.151-.763-6.508-6.43-8.107-8.119-8.438-.109,0-.163-.11-.218-.221a1.363,1.363,0,0,0-1.308-.882h-.109V4.861h.436a2.223,2.223,0,0,0,1.689.772,
2.316,2.316,0,0,0,0-4.633,2.223,2.223,0,0,0-1.689.772h-4.2A2.223,2.223,0,0,0,11.673,1a2.316,2.316,0,0,0,0,4.633,2.223,2.223,0,0,0,1.689-.772H13.8V7.287H13.69a1.376,
1.376,0,0,0-1.253.827.3.3,0,0,1-.272.165H7.75V6.625A.643.643,0,0,0,7.15,6.074Zm-.545,8.6H3.99v-7.5H6.66v7.5ZM13.09,3.758a.67.67,0,0,0-.436.221A1.2,
1.2,0,1,1,11.673,2.1a1.161,1.161,0,0,1,.981.5.494.494,0,0,0,.436.221h4.741a.67.67,0,0,0,.436-.221,1.161,1.161,0,0,1,.981-.5,1.213,1.213,0,0,1,0,
2.427,1.161,1.161,0,0,1-.981-.5.555.555,0,0,0-.436-.276H13.09Zm1.8,1.1h1.144V7.287H14.889ZM12.164,9.438a1.376,1.376,0,0,0,1.253-.827.3.3,0,0,1,
.272-.165h3.542a.279.279,0,0,1,.272.221,1.252,1.252,0,0,0,1.035.827c1.526.276,6.594,1.71,7.357,7.445a.782.782,0,0,1-.763.882H23.989a.819.819,0,0,
1-.763-.607c-.708-2.868-2.561-4.522-5.068-4.633a.615.615,0,0,0-.436.165,3.366,3.366,0,0,1-2.18,1.158,2.341,2.341,0,0,1-1.744-.882,1.48,1.48,0,0,
0-1.035-.441H7.8V9.438Z" transform="translate(-0.9)" /></g></svg>
                                    {/* <Watertap /> */}
                                </SvgIcon>
                            </ListItemIcon>
                            {/* Conditional rendering of text */}
                            {this.text(160, "Consumption")}
                        </ListItem>


                        <Collapse in={this.state.water_con} timeout="auto" unmountOnExit onClick={this.handleConsumptionDropdown}>
                            <List component="div" disablePadding>
                                {/* <ListItem button >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem> */}
                                {/* Conditional rendering of options based on active state in settings page */}
                                {this.handleConsumptionDropdown()}
                            </List>

                        </Collapse>


                        {/* Water Reservoir Button */}
                        <Link to="/Storage/Sump">
                            <ListItem className="SideBar_ListItem" button onClick={this.setWaterRes}>
                                <ListItemIcon className="SideBar_ListItemIcon">
                                    <SvgIcon>
                                        {/* Path tag for Storage icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path style={{ fill: "none" }} d="M0,0H24V24H0Z" /><g transform="translate(-3 -2)">
                                                <path style={{ fill: "none", stroke: "#fff", "stroke-linecap": "round" }} d="M299,1247l-5,5v5l-3,12h16l-3-12v-5Z" transform="translate(-284 -1244)" />
                                                <path style={{ fill: "none", stroke: "#fff", "stroke-linecap": "round" }} d="M293,1257h14" transform="translate(-285 -1244)" />
                                                <path style={{ fill: "none", stroke: "#fff" }} d="M293,1261h12" transform="translate(-284 -1244)" />
                                                <path style={{ fill: "none", stroke: "#fff", "stroke-linecap": "round" }} d="M288,1269h22" transform="translate(-284 -1244)" /></g></svg>
                                    </SvgIcon>
                                </ListItemIcon>

                                {this.text(160, "Storage")}
                            </ListItem>
                        </Link>
                        <Collapse in={this.state.water_res} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {/* Conditional rendering of options based on active state in settings page */}
                                {this.handleStorageDropdown()}
                            </List>

                        </Collapse>


                        {/* Water Quality Button */}
                        <ListItem className="SideBar_ListItem" button onClick={this.setWaterQual}>
                            <ListItemIcon className="SideBar_ListItemIcon">
                                <Quality />
                                {/* Quality Icon imprted as svg file */}
                            </ListItemIcon>
                            {this.text(160, "Quality")}
                        </ListItem>
                        <Collapse in={this.state.wat_qual} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {/* Conditional rendering of options based on active state in settings page */}
                                {this.handleQualityDropdown()}
                            </List>
                        </Collapse>


                        {/* More Button */}
                        <Link to="/More">
                            <ListItem className="SideBar_ListItem" button onClick={this.setMore}>

                                <ListItemIcon>
                                    {/* Path tag for More icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path style={{ "fill": "none" }} d="M0,0H24V24H0Z" />
                                        <path style={{ "fill": "#fff" }} d="M6,10a2,2,0,1,0,2,2A2.006,2.006,0,0,0,6,10Zm12,0a2,2,0,1,0,2,2A2.006,2.006,0,0,0,18,10Zm-6,0a2,2,0,1,0,2,2A2.006,2.006,0,0,0,12,10Z" /></svg>
                                    {/* <MoreHoriz /> */}
                                </ListItemIcon>

                                {/* Conditional rendering of text */}
                                {this.text(160, "More")}

                            </ListItem>
                        </Link>

                    </List>
                    <div className="SideBar_ListImage">
                        <Weather />
                        <Divider />
                        <img className="AquaGen" src={Logo} alt={Logo} height="60" width="120" />
                    </div>
                </nav>
                <ArrowBackIosIcon
                    onClick={this.props.arrowClick}
                    className="Arrow"
                    button />
            </MuiThemeProvider >
        )
    }
}

export default SideBarExp;