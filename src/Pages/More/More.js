import React from 'react';
import SideBarExp from '../../SIdeBar/SideBar';
import SideBarmin from '../../SideBarMin/SideBarmin';
import NavBar from '../../NavBar/NavBar';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import './More.css'
import {
    JsonToCsv,
    useJsonToCsv
} from 'react-json-csv';

class More extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date()
        this.state = {
            categories: [],
            units: [],
            unit_name: [],
            unit_value: [],
            unit_value_total: [],
            pdf_data: [],
            sidebarexp: true,
            sidewidth: '18.05%',
            activePage: 'More',
            // Refer template.js for usefulness of above
            filename: 'Csv-file',
            fields: {
                "index": "Units",
                "guid": "Consumptions(KL)"
            },
            style: {
                padding: "5px"
            },
            data: [
                // { index: "oho", guid: '1' },
                // { index: "oho", guid: '1' }
            ],
            text: "Convert Json to Csv"
        }

    }
    // Refer template.js
    arrowClick = () => {
        this.setState((prevState) => {
            return { sidebarexp: !prevState.sidebarexp }
        })
        console.log(this.state.sidewidth)
    }
    // Refer template.js
    callBack = (childdata) => {
        this.setState({ sidewidth: childdata })
    }

    // Refer template.js
    active = (childdata) => {
        this.setState({ activePage: childdata })
        console.log(childdata + "in main")
    }
    async componentDidMount() {
        try {
            this.getfromApi()
            //this.interval = setInterval(this.getfromApi, 300000);
            //this.doughnut_balance()
        } catch (err) {
            console.log(err.message);
        }
    }

    getfromApi = async () => {
        let myheaders = {
            //Token is added here
            "authorization": this.props.auth
        }
        // this.state.data.push({ index: "oho", guid: "1" })
        var categories = []
        console.log("auth: " + this.props.auth)
        try {
            await fetch("https://api.fluxgen.in/aquagen/v1/industries/" + this.props.industry + "/category", {
                method: 'GET',
                headers: myheaders
            })
                .then(response => response.json())
                .then(bar => {
                    var i;
                    for (i = 0; i < bar.data.length; i++) {
                        console.log(bar.data[i].category)
                        categories[i] = bar.data[i].category
                    }
                }
                )
            this.setState({ categories: categories })

        } catch (err) {
            console.log(err.message);
        }


        //fetching everyday consumption
        try {
            var categories = this.state.categories
            var units = []
            var unitall = []
            var unit_name = []
            var unit_name_all = []
            for (var i = 0; i < categories.length; i++) {
                await fetch("https://api.fluxgen.in/aquagen/v1/industries/" + this.props.industry + "/units?category=" + categories[i], {
                    method: 'GET',
                    headers: myheaders
                })
                    .then(response => response.json())
                    .then(bar => {
                        var j = 0;
                        units = []
                        unit_name = []
                        //console.log(bar.data)
                        for (j = 0; j < bar.data.length; j++) {
                            //console.log(bar.data[j])
                            units[j] = bar.data[j].unit_id
                            unit_name[j] = bar.data[j].unit_name
                        }
                    }
                    )
                unitall[i] = units
                unit_name_all[i] = unit_name
                //console.log(unit_name_all[i])
            }
            this.setState({ units: unitall, unit_name: unit_name_all })

        } catch (err) {
            console.log(err.message);
        }

        try {
            //console.log(this.state.units)
            var units = this.state.units
            var unit_name = this.state.unit_name
            var unit_value = []
            var unit_value_total = []
            var unit_total = []
            var unit_total2 = []
            for (var i = 0; i < units.length; i++) {
                unit_value = []
                unit_total[i] = 0
                for (var j = 0; j < units[i].length; j++) {
                    //console.log(this.state.units[i][j])
                    await fetch("https://api.fluxgen.in/aquagen/v1/industries/" + this.props.industry + "/consumption/report?duration=hourlyreport&createdAfter=1608361825&createdBefore=1608371825&unit_id=" + units[i][j], {
                        method: 'GET',
                        headers: myheaders
                    })
                        .then(response => response.json())
                        .then(bar => {
                            //console.log(bar.data.total_consumption)
                            unit_value[j] = bar.data.total_consumption
                            unit_total[i] += parseFloat(bar.data.total_consumption)
                        }
                        )
                }
                unit_value_total[i] = unit_value
            }
            this.setState({ unit_value: unit_value_total, unit_value_total: unit_total })

        } catch (err) {
            console.log(err.message);
        }
        try {
            var pdf_data = []
            var data = []
            for (var i = 0; i < this.state.units.length; i++) {
                //{ index: 0, guid: 'asdf231234' }
                this.state.data.push({ index: this.state.categories[i], guid: this.state.unit_value_total[i] })
                for (var j = 0; j < this.state.units[i].length; j++) {
                    this.state.data.push({ index: this.state.unit_name[i][j], guid: this.state.unit_value[i][j] })
                    //console.log(this.state.unit_name[i][j])
                }
            }
            this.setState({ pdf_data })
        }
        catch (err) {
            console.log(err.message);
        }

        console.log(this.state.unit_value_total, this.state.data)
    }

    render() {
        let sidebar;
        if (this.state.sidebarexp) {
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
        // Refer template.js for usefulnesss
        return (
            <div className="ActivityLog_Page">
                <NavBar heading={this.state.activePage} width={this.state.sidewidth} big={this.state.sidebarexp} />
                {sidebar}
                {/* Initial setup for sidebar + navbar layout */}
                <div className="MainMorePage_Content" style={{ "position": "fixed", "top": "10vh", "left": this.state.sidewidth }}>
                    {/* <MuiThemeProvider theme = {activityTheme}> */}

                    {/* Buttons to link to activity log page and contact us page */}
                    <Link to="/Activity" style={{ "text-decoration": "none" }}>
                        <div className="MoreLinkActvityPage">
                            <Button color="primary">Activity Log </Button>
                        </div>
                    </Link>
                    <Link to="/" style={{ "text-decoration": "none" }}>
                        <div className="MoreLinkActvityPage">
                            <Button color="primary">Contact Us</Button>
                        </div>
                    </Link>
                    <JsonToCsv
                        data={this.state.data}
                        filename={this.state.filename}
                        fields={this.state.fields}
                        style={this.state.style}
                        text={this.state.text}
                    />

                </div>
            </div>
        )
    }
}

export default More;