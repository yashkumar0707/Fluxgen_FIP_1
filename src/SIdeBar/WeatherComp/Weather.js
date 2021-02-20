import React from 'react';
import { ReactComponent as Location } from './location.svg';
import { ReactComponent as Sunny } from './sunny-color.svg';
import { ReactComponent as Rain } from './rain.svg'
import Other from './OtherImage';

import { SvgIcon, Divider } from '@material-ui/core';
import './Weather.css';
import 'tachyons';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    overrides: {
        MuiTypography: {
            body1: {
                "font-size": "0.8rem"
            },
            body2: {
                "font-size": "0.675rem",
                "line-height": "1"
            }
        },
        MuiListItem: {
            root: {
                "padding-top": "0.5vh",
                "padding-bottom": "0vh"
            },
            gutters: {
                "padding-left": "2vh",
                "padding-right": "2vh"
            }
        }
    }
})

class Weather extends React.Component {
    constructor() {
        super();
        this.state = {
            temp: '',
            date: '',
            time: '',
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysmin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            day: '',
            width: 1000
        }
    }
    apiFetch = () => {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=Bangalore,India&APPID=4acd3ff18c838bacf9ca233c2b7138c8")
            .then(res => res.json())
            .then(data => {
                let t = Math.round(data.main.temp - 273.15);
                let date = new Date();
                var month = new Array();
                month[0] = "January";
                month[1] = "February";
                month[2] = "March";
                month[3] = "April";
                month[4] = "May";
                month[5] = "June";
                month[6] = "July";
                month[7] = "August";
                month[8] = "September";
                month[9] = "October";
                month[10] = "November";
                month[11] = "December";
                var n = month[date.getMonth()];
                let str = date.getDate() + ' ' + (month[date.getMonth()]) + ' ' + date.getUTCFullYear();
                let time = date.toLocaleTimeString();
                let day = date.getDay();
                // this.state.days[day]
                this.setState({ temp: t, date: str, time: time, d: day })

            })
    }
    OtherIcons = (limit, num) => {
        if (this.state.width >= limit) {
            return (<Other day={(this.state.daysmin[((this.state.d) + num) % 7])} />)
        }
    }
    LocationText = (limit) => {
        if (this.state.width >= limit) {
            return (<ListItemText className="LocationText" primary="Bangalore,IN" secondary={this.state.time} />)
        }
        else {
            return (<ListItemText className="LocationText" primary="Blr,IN" secondary={this.state.time} />)
        }
    }
    resize = () => {
        // console.log(window.innerWidth)
        let x = 0.1805 * (window.innerWidth)
        if (x > 300) {
            x = 300
        }
        if (x < 100) {
            x = 100
        }
        this.setState({ width: x })
    }
    componentDidMount() {
        this.resize();
        this.setState({ width: 1000 })
        const func = this.apiFetch;
        func();
        window.addEventListener('resize', this.resize)
    }
    render() {
        // window.addEventListener('resize', this.render);
        return (
            <MuiThemeProvider theme={theme}>
                <div className="Main">
                    <ListItem className="Location">
                        <SvgIcon className="LocationImage" viewBox="0 0 26 26" >
                            <Location />
                        </SvgIcon>
                        {this.LocationText(130)}
                    </ListItem>
                    {/* <Divider /> */}
                    <ListItem>
                        <ListItemText className="Date" secondary={this.state.date} />
                    </ListItem>
                    <div className="rows">
                        <div className="row">
                            <p className="sans-serif day_small">
                                {this.state.days[this.state.d]}
                            </p>
                            <div className="Main_Weather">
                                <p className="sans-serif f4">
                                    {this.state.temp}&deg;
                    </p>
                                <SvgIcon className="Main_Weather_Icon" style={{ paddingLeft: '25%' }}>
                                    <Sunny />
                                </SvgIcon>
                            </div>
                        </div>
                        {/* {this.OtherIcons(110, 1)} */}
                        {/* <Other day = {(this.state.daysmin[((this.state.d)+1)%7])} /> */}
                        {/* {this.OtherIcons(135, 2)} */}
                        {/* <Other day = {(this.state.daysmin[((this.state.d)+2)%7])} />              */}
                        {/* {this.OtherIcons(180,3)} */}
                        {/* <Other day = {(this.state.daysmin[((this.state.d)+3)%7])} /> */}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }

};

export default Weather;