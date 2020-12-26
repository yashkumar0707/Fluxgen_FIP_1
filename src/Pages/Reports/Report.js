import React from 'react';
import SideBarExp from '../../SIdeBar/SideBar';
import SideBarmin from '../../SideBarMin/SideBarmin';
import NavBar from '../../NavBar/NavBar';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import '../More/More.css'
import {
    JsonToCsv,
    useJsonToCsv
} from 'react-json-csv';
// npm i jspdf
import jsPDF from 'jspdf'

// npm i jspdf-autotable
import 'jspdf-autotable';

import DatePicker from 'react-datepicker';
class Report extends React.Component {
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
            csv_wait: false,
            startDate: new Date(),
            endDate: new Date(),
            startepochDate: new Date(),
            csv_flag: false,
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
            text: "Convert Json to Csv",
            array1: [{ c1: "yash", c2: "yash", c3: "yash" }, { c2: "yash" }, "yash"]
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
        console.log(this.state.startDate)
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



    }

    jsPdfGenerator = async () => {
        let myheaders = {
            //Token is added here
            "authorization": this.props.auth
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
                    await fetch("https://api.fluxgen.in/aquagen/v1/industries/" + this.props.industry + "/consumption/report?duration=hourlyreport&createdAfter=" + this.state.startepochDate + "&createdBefore=" + this.state.endDate + "&unit_id=" + units[i][j], {
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
        data = [];
        let col = [
            { dataKey: 'count', header: 'Count' },
            { dataKey: 'c1', header: 'Units' },
            { dataKey: 'c2', header: 'Consumption' },
            // { dataKey: 'c3', header: 'C3' },
            // { dataKey: 'c4', header: 'C4' },
        ]
        let count = 1;

        var doc = new jsPDF('p', 'pt');
        doc.page = 1;

        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();

        var header = function () {

            // var imgData =  // Convert the image to base64 and place it here // 

            //     // doc.setFontStyle('normal');

            //     // move_from_left, move_from_height, width, height 
            //     // doc.addImage(imgData, 'JPEG', 5, 10, width - 10, 65)

            //     doc.setFontSize(14);
            // // doc.setFontStyle('bold');

            // move_from_left, move_from_height
            doc.setFontSize(25);
            doc.text(150, 100, 'Water Consumption Report')
        };

        var footer = function () {
            // var imgData = // Convert the image to base64 and place it here // 

            //     //print number bottom right

            //     doc.setFontSize(7);
            // doc.text(width - 40, height - 30, 'Page - ' + doc.page);
            // doc.page++;

            // //_________________________________

            // doc.addImage(imgData, 'JPEG', 5, height - 25, width - 10, 30)
        };



        var options = {
            beforePageContent: header,
            afterPageContent: footer,
            theme: 'grid',
            columnStyles: {
                count: { cellWidth: 100, },
                c1: { cellWidth: 200 },
                c2: { cellWidth: 200 },
                // c3: { columnWidth: 30 },
                // c4: { columnWidth: 50, halign: 'right' },
            },

            headStyles: { fillColor: 'white', textColor: 'black' },
            style: { cellWidth: 'auto' },
            margin: { top: 150, bottom: 100, horizontal: 10 },
        }


        // Data Processing
        console.log(this.state.data)
        this.state.data.map((item, index) => {
            let b = {
                count: count,
                c1: item.index,
                c2: item.guid,
                // c3: item.c3,
                // c4: item.c4,
            }

            count++;
            data.push(b);
        })


        doc.setFontSize(12)
        doc.line(0, 145, width, 145)

        doc.autoTable(col, data, options)

        doc.save('Generate.pdf')
    }
    handleChange = (date) => {
        console.log(date)
        this.setState({ startDate: date })
        var epoch = new Date(date).getTime() / 1000
        var hours = date.getHours(); // => 9
        var minutes = date.getMinutes(); // =>  30
        var seconds = date.getSeconds(); // => 51
        seconds = hours * 60 * 60 + minutes * 60 + seconds
        var start = epoch - seconds
        var end = epoch
        this.setState({ startepochDate: start, endDate: end, csv_flag: false, unit_value: [], unit_value_total: [], pdf_data: [], data: [] })
        console.log(start, end)
    }

    CsvGenerator = async () => {
        let myheaders = {
            //Token is added here
            "authorization": this.props.auth
        }
        this.setState({ csv_wait: true })
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
                    await fetch("https://api.fluxgen.in/aquagen/v1/industries/" + this.props.industry + "/consumption/report?duration=hourlyreport&createdAfter=" + this.state.startepochDate + "&createdBefore=" + this.state.endDate + "&unit_id=" + units[i][j], {
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
            this.setState({ pdf_data, csv_flag: true, csv_wait: false })
        }
        catch (err) {
            console.log(err.message);
        }
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

                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        name="startDate"
                        dateFormat="MM/dd/yyyy"
                    />
                    <Button onClick={this.CsvGenerator} type="primary"> Generate CSV </Button>
                    {
                        this.state.csv_wait && <p>yash</p>
                    }
                    {this.state.csv_flag && <JsonToCsv
                        data={this.state.data}
                        filename={this.state.filename}
                        fields={this.state.fields}
                        style={this.state.style}
                        text={this.state.text}
                    />}
                    <Button onClick={this.jsPdfGenerator} type="primary"> Generate PDF </Button>

                </div>
            </div>
        )
    }
}

export default Report;