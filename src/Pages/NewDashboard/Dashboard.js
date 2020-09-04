import React, { Component } from 'react';
import SideBarExp from '../../SIdeBar/SideBar';
import SideBarmin from '../../SideBarMin/SideBarmin';
import NavBar from '../../NavBar/NavBar';
//import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Row,
    CardFooter,

} from 'reactstrap';

import { BsFillCaretRightFill } from "react-icons/bs"
import { WiMoonFull } from "react-icons/wi";
import { IconContext } from "react-icons"
import ChartDataLabels from 'chartjs-plugin-datalabels'; //used to display values on charts

const moment = require('moment'); //library to get todays date

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date()
        //this.props.activeState("Dashboard")
        this.state = {
            sidebarexp: true, //Set to true when the expanded sidear is desired and false is collapsed sidebar is wanted
            sidewidth: '18.05%',//Initial width of expanded sidebar 
            activePage: 'Home',//Heading in the navbar
            activeState: 'Home',
            radioSelected: 1,
            today: moment().format('DD-MM-YYYY'),
            date: [],
            date_daily: [],
            date_weekly: [],
            date_monthly: [],
            bar_consumption: [],
            bar_consumption_month: [],
            bar_consumption_weekly: [],
            pie_consumption_daily: [],
            pie_consumption_weekly: [],
            pie_consumption_monthly: [],
            pie_category_daily: [],
            pie_category_weekly: [],
            pie_category_monthly: [],
            total_supply: 0,
            total_storage: 0,
            total_consumption: 0,
            percentage: 1000000,
            yash: 100,
            total_treated: 380,
            doughnut_data: {
                labels: [
                    // 'Washer ' + 100,
                    // 'CIP ' + 100,
                    // 'UHT ' + 100,
                    // 'label ' + 100,
                    // 'Others ' + 100
                ],
                datasets: [
                    {
                        // data: [100, 100, 100, 100, 100],
                        backgroundColor: [
                            '#21748B',
                            '#40A3BF',
                            '#60BED9',
                            '#132D34',
                            '#124A5A',
                            '#21748B',
                        ],
                        hoverBackgroundColor: [
                            '#21748B',
                            '#40A3BF',
                            '#60BED9',
                            '#132D34',
                            '#124A5A',
                            '#21748B',
                        ],
                    }
                ]
            },
            options: {
                plugins: {
                    labels: {
                        render: "percentage",
                        fontColor: 'white',
                        precision: 2
                    }

                }
            }
        }
        this.doughnut_balance = this.doughnut_balance.bind(this);
        this.barGraph = this.barGraph.bind(this);
        this.mainChartOpts = this.mainChartOpts.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.borderColor = this.borderColor.bind(this);
        //this.percentage = this.percentage.bind(this)
    }
    arrowClick = () => {//Refers to the arrow attached to the sidebar, onclick of the arrow the sidebar is expanded or collapsed
        this.setState((prevState) => {
            return { sidebarexp: !prevState.sidebarexp }
        })
        if (this.state.sidewidth == "18.05%") {
            console.log('yash')
            this.state.sidewidth = "5%"
        }
        else if (this.state.sidewidth == "5%") {
            console.log('yash')
            this.state.sidewidth = "18.05%"
        }
        console.log(this.state.sidewidth + 'a')//To test width change
    }
    callBack = (childdata) => {//Depending on whether the sidebar is expanded or not, width has to be changed accordingly to render navbar properly
        this.setState({ sidewidth: childdata })
    }

    active = (childdata) => {// Sidebar sends data of the active page to whole page, this data is then passed to navbar
        this.setState({ activePage: childdata })
        console.log(childdata + "in main")
    }
    async componentDidMount() {
        try {
            this.getfromApi()
            this.interval = setInterval(this.getfromApi, 300000);
            this.state.radioSelected = 1
            //this.doughnut_balance()
        } catch (err) {
            console.log(err.message);
        }
    }

    //data from API updating every 5 minutes
    getfromApi = async () => {
        let myheaders = {
            //Token is added here
            "authorization": this.props.auth
        }

        console.log("auth: " + this.props.auth)
        //fetching everyday consumption
        try {
            var i;
            var date = [];
            var test = []
            var bar_consumption = []
            var total_consumption = 0
            //await fetch("https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/graph?duration=thismonth&category=Internal Source", {

            console.log(this.props.auth)
            await fetch("https://api.fluxgen.in/aquagen/v1/industries/" + this.props.industry + "/consumption/graph?duration=daily&category=Borewell Water Consumption", {
                method: 'GET',
                headers: myheaders
            })
                .then(response => response.json())
                .then(bar => {
                    //console.log(bar.data)
                    // for (i = 10; i < 20; i++) {
                    //     date.unshift(Object.values(bar.data[i]))
                    // }
                    // for (i = 0; i < 10; i++) {
                    //     bar_consumption.unshift(date[i][0].process_consumption / 1000)
                    //     total_consumption = total_consumption + bar_consumption[i]
                    // }
                    console.log(bar.data)
                    var j = bar.data.length - 1
                    for (i = 0; i < bar.data.length; i++) {
                        console.log(bar.data[i][i + 1 + '.0'].cost)
                        bar_consumption[j] = bar.data[i][i + 1 + '.0'].cost
                        test[j--] = i + 1 + ':00'
                    }
                    console.log(test)
                }
                )
            this.setState({ bar_consumption: bar_consumption, total_consumption: total_consumption, date_daily: test })
            console.log(this.state.bar_consumption)
        } catch (err) {
            console.log(err.message);
        }
        try {
            var i;
            var date_daily = [];
            var date_monthly = []
            var bar_consumption = []
            var total_consumption = 0
            var temp = []
            var test = ''
            //await fetch("https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/graph?duration=thismonth&category=Internal Source", {

            //console.log(this)
            await fetch("https://api.fluxgen.in/aquagen/v1/industries/" + this.props.industry + "/consumption/graph?duration=thismonth&category=Borewell Water Consumption", {
                method: 'GET',
                headers: myheaders
            })
                .then(response => response.json())
                .then(bar => {
                    console.log(bar.data)
                    test = bar.data[0]
                    console.log(test)
                    for (var z = 0; z < bar.data.length; z++) {
                        //test[z] = console.log(bar.data[z])
                    }
                    temp = bar.data
                    //console.log(temp)
                    //console.log(bar.data[0])
                    var tempp = bar.data[0]
                    var myJSON = JSON.stringify(tempp);
                    console.log(myJSON.substring(1, 13))
                    //console.log(Object.values(bar.data[0]))
                    var j = bar.data.length - 1
                    for (i = 0; i < bar.data.length; i++) {
                        var tempp = bar.data[i]
                        var myJSON = JSON.stringify(tempp);
                        //console.log(myJSON.substring(1, 13))
                        date_monthly[j--] = myJSON.substring(2, 12)
                        date.unshift(Object.values(bar.data[i]))
                    }
                    // var j
                    // for (i = bar.data.length - 1, j = 0; i >= 0; i--, j++) {
                    //     var tempp = bar.data[i]
                    //     var myJSON = JSON.stringify(tempp);
                    //     //console.log(myJSON.substring(1, 13))
                    //     date_monthly[j] = myJSON.substring(2, 12)
                    //     date.shift(Object.values(bar.data[j]))
                    // }
                    console.log(date_monthly)
                    for (i = 0; i < bar.data.length; i++) {
                        //console.log(date[i][0].cost)
                        bar_consumption.unshift(date[i][0].cost)
                        //total_consumption = total_consumption + bar_consumption[i]
                    }
                    // for (i = 0; i < 14; i++) {
                    //     console.log(bar.data[i][i + 1 + '.0'].cost)
                    //     bar_consumption[i] = bar.data[i][i + 1 + '.0'].cost + i
                    // }
                    console.log(bar_consumption)
                }
                )
            this.setState({ bar_consumption_month: bar_consumption, total_consumption: total_consumption, date_monthly: date_monthly })
        } catch (err) {
            console.log(err.message);
        }
        try {
            var i;
            var date_weekly = [];
            var bar_consumption = []
            var total_consumption = 0
            var temp = []
            var test = ''
            //await fetch("https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/graph?duration=thismonth&category=Internal Source", {

            //console.log(this)
            await fetch("https://api.fluxgen.in/aquagen/v1/industries/" + this.props.industry + "/consumption/graph?duration=thisweek&category=Borewell Water Consumption", {
                method: 'GET',
                headers: myheaders
            })
                .then(response => response.json())
                .then(bar => {
                    console.log(bar.data)
                    test = bar.data[0]
                    console.log(test)
                    for (var z = 0; z < bar.data.length; z++) {
                        //test[z] = console.log(bar.data[z])
                    }
                    temp = bar.data
                    //console.log(temp)
                    //console.log(bar.data[0])
                    // var tempp = bar.data[0]
                    // var myJSON = JSON.stringify(tempp);
                    // console.log(myJSON.substring(1, 13))
                    //console.log(Object.values(bar.data[0]))
                    // var j = 0;
                    // for (i = bar.data.length - 1, j = 0; i >= 0; i--, j++) {
                    //     var tempp = bar.data[i]
                    //     var myJSON = JSON.stringify(tempp);
                    //     //console.log(myJSON.substring(1, 13))
                    //     date_weekly[j] = myJSON.substring(2, 12)
                    //     date.shift(Object.values(bar.data[i]))
                    // }
                    // console.log(date_weekly)
                    // for (i = 0; i < bar.data.length; i++) {
                    //     //console.log(date[i][0].cost)
                    //     bar_consumption.unshift(date[i][0].cost)
                    //     //total_consumption = total_consumption + bar_consumption[i]
                    // }
                    var j = bar.data.length - 1
                    for (i = 0; i < bar.data.length; i++) {
                        var tempp = bar.data[i]
                        var myJSON = JSON.stringify(tempp);
                        //console.log(myJSON.substring(1, 13))
                        date_weekly[j--] = myJSON.substring(2, 12)
                        date.unshift(Object.values(bar.data[i]))
                    }
                    // var j
                    // for (i = bar.data.length - 1, j = 0; i >= 0; i--, j++) {
                    //     var tempp = bar.data[i]
                    //     var myJSON = JSON.stringify(tempp);
                    //     //console.log(myJSON.substring(1, 13))
                    //     date_monthly[j] = myJSON.substring(2, 12)
                    //     date.shift(Object.values(bar.data[j]))
                    // }
                    console.log(date_weekly)
                    for (i = 0; i < bar.data.length; i++) {
                        //console.log(date[i][0].cost)
                        bar_consumption.unshift(date[i][0].cost)
                        //total_consumption = total_consumption + bar_consumption[i]
                    }
                    console.log(bar_consumption)
                }
                )
            this.setState({ bar_consumption_weekly: bar_consumption, date_weekly: date_weekly })
        } catch (err) {
            console.log(err.message);
        }

        try {
            var i;
            var date_weekly = [];
            var consumption = []
            var total_consumption = 0
            var temp = []
            var category = []
            var test = ''
            //await fetch("https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/graph?duration=thismonth&category=Internal Source", {

            //console.log(this)
            await fetch("https://api.fluxgen.in/aquagen/v1/industries/" + this.props.industry + "/total_consumption?duration=daily", {
                method: 'GET',
                headers: myheaders
            })
                .then(response => response.json())
                .then(bar => {
                    console.log(bar)
                    test = bar.data[0].category
                    console.log(test)
                    for (i = 0; i < bar.data.length; i++) {
                        category[i] = bar.data[i].category
                        consumption[i] = bar.data[i].cost

                    }
                    console.log(category)
                }
                )
            this.setState({ pie_consumption_daily: consumption, pie_category_daily: category })
            this.doughnut_balance()
        } catch (err) {
            console.log(err.message);
        }
        try {
            var i;
            var date_weekly = [];
            var consumption = []
            var total_consumption = 0
            var temp = []
            var category = []
            var test = ''
            //await fetch("https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/graph?duration=thismonth&category=Internal Source", {

            //console.log(this)
            await fetch("https://api.fluxgen.in/aquagen/v1/industries/" + this.props.industry + "/total_consumption?duration=weekly", {
                method: 'GET',
                headers: myheaders
            })
                .then(response => response.json())
                .then(bar => {
                    console.log(bar)
                    test = bar.data[0].category
                    console.log(test)
                    for (i = 0; i < bar.data.length; i++) {
                        category[i] = bar.data[i].category
                        consumption[i] = bar.data[i].cost

                    }
                    console.log(category)
                }
                )
            this.setState({ pie_consumption_weekly: consumption, pie_category_weekly: category })
            this.doughnut_balance()
        } catch (err) {
            console.log(err.message);
        }
        try {
            var i;
            var date_weekly = [];
            var consumption = []
            var total_consumption = 0
            var temp = []
            var category = []
            var test = ''
            //await fetch("https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/graph?duration=thismonth&category=Internal Source", {

            //console.log(this)
            await fetch("https://api.fluxgen.in/aquagen/v1/industries/" + this.props.industry + "/total_consumption?duration=monthly", {
                method: 'GET',
                headers: myheaders
            })
                .then(response => response.json())
                .then(bar => {
                    console.log(bar)
                    test = bar.data[0].category
                    console.log(test)
                    for (i = 0; i < bar.data.length; i++) {
                        category[i] = bar.data[i].category
                        consumption[i] = bar.data[i].cost

                    }
                    console.log(category)
                }
                )
            this.setState({ pie_consumption_monthly: consumption, pie_category_monthly: category })
            this.doughnut_balance()
        } catch (err) {
            console.log(err.message);
        }

        //fetching total supply and total storage
        // try {
        //     var total_supply = 0
        //     var total_storage = 0
        //     await fetch("https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/latest?category=Storage", {
        //         method: 'GET',
        //         headers: myheaders
        //     })
        //         .then(response => response.json())
        //         .then(balance => {
        //             console.log(balance)
        //             total_supply = (balance.data.units[0].DEMO1SU2.process_level + balance.data.units[1].DEMO1SU1.process_level) / 1000
        //             total_storage = (balance.data.units[0].DEMO1SU2.max_capacity + balance.data.units[1].DEMO1SU1.max_capacity) / 1000

        //         })

        //     this.setState({ total_supply: total_supply.toFixed(2), total_storage: total_storage })
        // } catch (err) {
        //     console.log(err.message);
        // }

        // try {
        //     var total_supply = 0
        //     var total_storage = 0
        //     await fetch("https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/latest?category=Storage", {
        //         method: 'GET',
        //         headers: myheaders
        //     })
        //         .then(response => response.json())
        //         .then(balance => {
        //             console.log(balance)
        //             total_supply = (balance.data.units[0].DEMO1SU2.process_level + balance.data.units[1].DEMO1SU1.process_level) / 1000
        //             total_storage = (balance.data.units[0].DEMO1SU2.max_capacity + balance.data.units[1].DEMO1SU1.max_capacity) / 1000

        //         })

        //     this.setState({ total_supply: total_supply.toFixed(2), total_storage: total_storage })
        // } catch (err) {
        //     console.log(err.message);
        // }

    };


    //doughnut chart and re-rendering to update values onClick of bar chart
    doughnut_balance() {
        var i;
        var date = [];
        var data;
        var labels = [];
        //var data_doughnut = [[130, 200, 240, 100, 180], [260, 190, 130, 175, 90], [130, 200, 240, 100, 180], [260, 190, 130, 175, 90], [130, 200, 240, 100, 180], [260, 190, 130, 175, 90], [130, 200, 240, 100, 180], [260, 190, 130, 175, 90], [130, 200, 240, 100, 180], [260, 190, 130, 175, 90]]
        var data_doughnut
        //date array
        for (i = 0; i < 10; i++) {
            date.unshift(moment().subtract(i, 'days').format('DD-MM-YYYY'))
        }
        if (this.state.radioSelected === 1) {
            //labels = date
            data = this.state.pie_consumption_daily
            for (i = 0; i < this.state.pie_category_daily.length; i++) {
                labels[i] = this.state.pie_category_daily[i] + ' ' + this.state.pie_consumption_daily[i]
                //console.log('yash')
            }
        }
        else if (this.state.radioSelected === 2) {
            //labels = month
            data = this.state.pie_consumption_weekly
            for (i = 0; i < this.state.pie_category_weekly.length; i++) {
                labels[i] = this.state.pie_category_weekly[i] + ' ' + this.state.pie_consumption_weekly[i]
                console.log('yash')
            }
        }
        else {
            //labels = month_10
            //data = [370.6, 450.3, 367.8, 380.6, 370.6, 470.3, 367.8, 380.6, 390.4, 315.4]
            data = this.state.pie_consumption_monthly
            for (i = 0; i < this.state.pie_category_weekly.length; i++) {
                labels[i] = this.state.pie_category_weekly[i] + ' ' + this.state.pie_consumption_weekly[i]
                console.log(this.state.pie_consumption_weekly[i].toString().length)
            }
        }

        //assigning data of the correct date to doughnut chart 
        // for (i = 0; i < 10; i++) {
        //     if (selected_date === date[i]) {
        //         data = data_doughnut[i]
        //         break;
        //     }
        //     else {
        //         continue;
        //     }
        // }

        //doughnut chart
        //console.log('yaygsyugvbuydcyudbfycibdidcbi' + data + ' ' + this.state.radioSelected)
        // labels = ['Washer ' + data[0], 'CIP ' + data[1], 'UHT ' + data[2], 'label ' + data[3], 'Others ' + data[4]]

        console.log(labels)
        var doughnut = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: [
                        '#21748B',
                        '#40A3BF',
                        '#60BED9',
                        '#132D34',
                        '#124A5A',
                        '#21748B',
                    ],
                    hoverBackgroundColor: [
                        '#21748B',
                        '#40A3BF',
                        '#60BED9',
                        '#132D34',
                        '#124A5A',
                        '#21748B',
                    ],
                }
            ],
        };

        this.setState({ doughnut_data: doughnut }) //re-rendering
    }


    //bar chart
    barGraph = () => {

        var i = 0;
        var labels;
        var data;
        var date = [];
        var month = ['Week 1', 'Week 2', 'Week 3', 'Week 4']; //dummy data for 'this month' option
        var month_10 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October']; //dummy data for 'last 10 months' option
        var greatest;
        var indexOfGreatest;
        var backgroundColor = [];
        var hoverBackgroundColor = [];
        var borderColor = [];
        var hoverBorderColor = [];

        //x-axis bar graph (dates)
        for (i = 0; i < 10; i++) {
            //console.log(date)
            date.unshift(moment().subtract(i, 'days').format('DD-MM-YYYY'))
        }

        //for last 10 days, this month and 10 months options and respective data
        //only last 10 days data is taken from API
        if (this.state.radioSelected === 1) {
            labels = this.state.date_daily
            data = this.state.bar_consumption
        }
        else if (this.state.radioSelected === 2) {
            labels = this.state.date_weekly
            data = this.state.bar_consumption_weekly
        }
        else {
            labels = this.state.date_monthly
            //data = [370.6, 450.3, 367.8, 380.6, 370.6, 470.3, 367.8, 380.6, 390.4, 315.4]
            data = this.state.bar_consumption_month
        }

        //obtain index of highest bar
        for (i = 0; i < data.length; i++) {
            if (!greatest || data[i] > greatest) {
                greatest = data[i];
                indexOfGreatest = i;
            }
        }

        //to change the colour of the highest bar
        for (i = 0; i < data.length; i++) {
            if (i === indexOfGreatest) {
                backgroundColor.push('rgb(255, 153, 128)')
                hoverBackgroundColor.push('rgb(255, 92, 51, 0.4)')
                borderColor.push('rgb(255, 92, 51)')
                hoverBorderColor.push('rgb(255, 92, 51)')
            }
            else {
                backgroundColor.push('rgba(204, 230, 255)')
                hoverBackgroundColor.push('rgb(51, 156, 255, 0.4)')
                borderColor.push('rgba(51, 156, 255)')
                hoverBorderColor.push('rgb(51, 156, 255)')
            }
        }

        //original bar graph code
        const bar = {
            labels: labels,
            datasets: [
                {
                    label: 'Kiloliters',
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                    hoverBackgroundColor: hoverBackgroundColor,
                    hoverBorderColor: hoverBorderColor,
                    data: data,
                },
            ],
        };

        return bar

    };


    //options for bar chart
    mainChartOpts = () => {

        var i = 0;
        var date = [];

        //x-axis bar graph (dates)
        for (i = 0; i < 10; i++) {
            date.unshift(moment().subtract(i, 'days').format('DD-MM-YYYY'))
        }

        const mainChartOpts = {

            //manipulate x-axis and y-axis
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        barPercentage: 0.5,
                        gridLines: {
                            drawOnChartArea: false,
                        },
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            display: true
                        },
                        gridLines: {
                            drawOnChartArea: true,
                            drawBorder: true,
                            display: true
                        },
                    }
                ],
            },
            tooltips: {
                xPadding: 10,
                yPadding: 10,
                //remove the colour box
                custom: function (tooltip) {
                    tooltip.displayColors = false;
                },
                callbacks: {
                    //use label callback to return the desired label
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel + ' kL';
                    },
                    //remove title
                    title: function (tooltipItem, data) {
                        return;
                    }
                }
            },
            //Onclick function in order to change data displayed on doughnut chart
            // onClick: (e, bar_index) => {
            //     var index = bar_index[0]._index;
            //     this.doughnut_balance(date[index])
            // }
        }
        return mainChartOpts;
    }


    //function for 3 buttons on bar chart - last 10 days, this month and 10 months
    async onRadioBtnClick(radioSelected) {
        await this.setState({
            radioSelected: radioSelected,
        });
        this.doughnut_balance()
    }

    //balance chart colour range
    borderColor(value) {
        var color;
        if (value > 300) {
            color = '#ff0000' //red
        }
        else if (value > 150 && value <= 300) {
            color = '#ffff00' //yellow
        }
        else {
            color = '#00ff00' //green
        }

        return color

    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

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
            <div>
                <div className="ActivityLog_Page">
                    <NavBar heading={this.state.activePage} width={this.state.sidewidth} big={this.state.sidebarexp} />
                    {/* heading is the active page, sidewidth determines where the navbar starts from */}
                    {sidebar}
                    <div className="MainActivityPage_Content" style={{ "position": "fixed", "top": "10vh", "left": this.state.sidewidth }}>
                        {/* All page content oges in this div */}
                    </div>
                </div>
                <div className="animated fadeIn" style={{ marginLeft: this.state.sidewidth }}>
                    <Row>
                        <Col xl={12} sm={12} md={12} lg={12}>
                            <Card>
                                <CardBody style={{ height: 450 + 'px', marginTop: 100 + 'px' }}>
                                    <Row>
                                        <Col sm="5">
                                            <CardTitle className="mb-0">Consumption</CardTitle>
                                        </Col>
                                        <Col />
                                        <Col>
                                            <Row>
                                                <Button className="btn-pill" style={{ fontSize: '10px' }} size="sm" color="ghost-info" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Daily</Button>
                                                <Button className="btn-pill" style={{ fontSize: '10px' }} size="sm" color="ghost-info" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Weekly</Button>
                                                <Button className="btn-pill" style={{ fontSize: '10px' }} size="sm" color="ghost-info" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Monthly</Button>
                                            </Row>
                                        </Col>
                                        <br />
                                        <br />
                                    </Row>
                                    <hr className="mt-0" />
                                    <div className="chart-wrapper" style={{ height: 350 }}>
                                        <Bar data={this.barGraph()} options={this.mainChartOpts()} height={300} />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} sm={12} md={12} lg={12}>
                            <Card style={{ height: "100%" }}>
                                <CardBody>
                                    <Row>
                                        <Col sm="5">
                                            <CardTitle className="mb-0" style={{ fontSize: '14px' }}>Top Consumers</CardTitle>
                                        </Col>
                                    </Row>
                                    <br />
                                    <hr className="mt-0" />
                                    <br />
                                    <div className="chart-wrapper">
                                        <Doughnut style={{ height: 1000 }}
                                            data={this.state.doughnut_data}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: true,
                                                legend: {
                                                    display: true,
                                                    //to postition label to the right
                                                    position: 'right',
                                                },
                                                tooltips: {
                                                    callbacks: {
                                                        //use label callback to return the desired label
                                                        label: function (tooltipItem, data) {
                                                            var indice = tooltipItem.index;
                                                            return data.labels[indice];
                                                        },
                                                    }
                                                },
                                                plugins: {
                                                    datalabels: {
                                                        color: '#ffffff',
                                                        formatter: function (value, context) {
                                                            return ((value / 100000) * 100).toFixed(2) + '%';
                                                        }
                                                    }
                                                }
                                            }
                                            }
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl={6} sm={12} md={12} lg={12}>
                            <Card style={{ height: "100%" }}>
                                <CardBody>
                                    <Row>
                                        <Col sm="5">
                                            <CardTitle className="mb-0" style={{ fontSize: '14px' }}>Balance Diagram</CardTitle>
                                        </Col>
                                    </Row>
                                    <br />
                                    <hr className="mt-0" />
                                    <br />
                                    <Row style={{ margin: "0.15rem", marginTop: '20px', textAlign: "center" }}>
                                        <Col>
                                            <Card style={{ borderBottomColor: this.borderColor(this.state.total_supply), borderBottomWidth: "thick", height: "130%", width: '110%' }}>
                                                <div>
                                                    <br />
                                                    <b>TOTAL SUPPLY</b>
                                                </div>
                                                <div style={{ fontSize: "20px" }}>
                                                    <br />
                                                    {this.state.total_supply} kL
                                                </div>
                                                <div style={{ fontSize: "10px" }}>
                                                    <br />
                        Increased by 41%
                      </div>
                                            </Card >
                                        </Col>
                                        <IconContext.Provider value={{ style: { fontSize: '20px', color: "rgb(105,105,105)", textAlign: "center", height: "100%" } }}>
                                            <div>
                                                <BsFillCaretRightFill />
                                            </div>
                                        </IconContext.Provider>
                                        <Col>
                                            <Card style={{ borderBottomColor: this.borderColor(this.state.total_storage), borderBottomWidth: "thick", height: "130%", width: '110%' }}>
                                                <div>
                                                    <br />
                                                    <b>TOTAL STORAGE</b>
                                                    <br />
                                                </div>
                                                <div style={{ fontSize: "20px" }}>
                                                    <br />
                                                    {this.state.total_storage} kL
                                                 </div>
                                                <div style={{ fontSize: "10px" }}>
                                                    <br />
                        Increased by 41%
                      </div>
                                            </Card>
                                        </Col>
                                        <IconContext.Provider value={{ style: { fontSize: '20px', color: "rgb(105,105,105)", textAlign: "center", height: "100%" } }}>
                                            <div>
                                                <BsFillCaretRightFill />
                                            </div>
                                        </IconContext.Provider>
                                        <Col>
                                            <Card style={{ borderBottomColor: this.borderColor(this.state.total_consumption), borderBottomWidth: "thick", height: "130%", width: '100%' }}>
                                                <div>
                                                    <br />
                                                    <b>TOTAL CONSUMPTION</b>
                                                </div>
                                                <div style={{ fontSize: "20px" }}>
                                                    <br />
                                                    {this.state.total_consumption} kL
                      </div>
                                                <div style={{ fontSize: "10px" }}>
                                                    <br />
                                                     Increased by 41%
                      </div>
                                            </Card>
                                        </Col>
                                        <IconContext.Provider value={{ style: { fontSize: '20px', color: "rgb(105,105,105)", textAlign: "center", height: "100%" } }}>
                                            <div>
                                                <BsFillCaretRightFill />
                                            </div>
                                        </IconContext.Provider>
                                        <Col>
                                            <Card style={{ borderBottomColor: this.borderColor(this.state.total_treated), borderBottomWidth: "thick", height: "130%", width: '110%' }}>
                                                <div>
                                                    <br />
                                                    <b>TOTAL TREATED</b>
                                                </div>
                                                <div style={{ fontSize: "20px" }}>
                                                    <br />
                                                    {this.state.total_treated} kL
                      </div>
                                                <div style={{ fontSize: "10px" }}>
                                                    <br />
                        Increased by 41%
                      </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter style={{ backgroundColor: 'white' }}>
                                    <Row>
                                        <IconContext.Provider value={{ style: { fontSize: '20px', color: "#00ff00" } }}>
                                            <div>
                                                <WiMoonFull />
                                            </div>
                                        </IconContext.Provider>
                                        <div>
                                            Safe Zone
                    </div>
                                        <IconContext.Provider value={{ style: { fontSize: '20px', color: "#ffff00" } }}>
                                            <div>
                                                <WiMoonFull />
                                            </div>
                                        </IconContext.Provider>
                                        <div>
                                            Warning Zone
                    </div>
                                        <IconContext.Provider value={{ style: { fontSize: '20px', color: "#ff0000" } }}>
                                            <div>
                                                <WiMoonFull />
                                            </div>
                                        </IconContext.Provider>
                                        <div>
                                            Danger Zone
                    </div>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>

        )
    }
}

export default Dashboard;