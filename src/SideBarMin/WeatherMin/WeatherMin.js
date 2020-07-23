import React from 'react';
import 'tachyons';
import './WeatherMin.css'

class WeatherMin extends React.Component {
    constructor(){
        super();
        this.state = {            
                temp: '',
                date: '',
                time: '',
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                daysmin: ['Sun','Mon', 'Tue', 'Wed','Thu','Fri','Sat'],
                day: ''
        }

    }
    apiFetch = () => {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=Bangalore,India&APPID=4acd3ff18c838bacf9ca233c2b7138c8")
        .then(res => res.json())
        .then(data => {
            // fetching data from openweather map api
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
            let str = date.getDate() + ' ' + (month[date.getMonth()]) + ' ' + date.getUTCFullYear(); //Used for formatting the data to desired way
            let time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            let day = date.getDay();
            // this.state.days[day]
            this.setState({temp: t,date: str,time:time,d:day})
        })
    }
    componentDidMount(){
        const func = this.apiFetch;
        func();
    }
    render(){
        return(
            <div className = "Main">
                <div className = "Main_Text sans-serif">
                    Blr,IN
                    {/* Static value of location */}
                </div>
                <div className = "Time_Text sans-serif">
                    {this.state.time}
                </div>
                <div className = "Date_Text sans-serif">
                    {this.state.date}
                </div>
                <div className = "Temp_text sans-serif">
                    {this.state.temp}&deg;
                </div>
            </div>
        )
    }
}

export default WeatherMin;