import React from 'react';
import './ActivityLog.css';
import SideBarExp from '../../SIdeBar/SideBar';
import SideBarmin from '../../SideBarMin/SideBarmin';
import NavBar from '../../NavBar/NavBar';
import {Button,Menu,MenuItem,TextField,Icon,FormControl,InputLabel,Select} from '@material-ui/core'
import {StylesProvider} from '@material-ui/core/styles'
import MaterialTable from 'material-table'


import {Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {EditIcon} from '@material-ui/icons/Edit'

import DateFnsUtils from '@date-io/date-fns'; 
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';

// const activityTheme = createMuiTheme({
//     overrides: {
//         MuiInputBase: {
//             root: {
//                 "padding-top":"4vh",
//                 "margin-left": "30%"
//             }
//         }
//     }
// })

class ActivityLog extends React.Component{
    constructor(props){
        super(props);
        let date = new Date()
        this.state = {
            sidebarexp: true,
            sidewidth: '18.05%',
            activePage: 'Activity',
            //The above three important to render sidebar and navbar, refer template.js
            selectedDate: date,
            selectedFile: '',
            dropName: '',
            comment: '',
            page: 0,
            rowsPerPage: 3,
            columns: [
                { title: 'Date', field: 'date' },
                { title: 'Time', field: 'time' },
                { title: 'Activity', field: 'activity' },
                {
                  title: 'Comment',
                  field: 'comment',
                },
              ],
              data: [
                { date: '23.05.2000', time: '8:00', activity: 'Production', comment: 'Na' },
                {
                  date: '23.05.2000',
                  time: '11:00',
                  activity: 'Maintenance',
                  comment: 'Quality',
                },
              ],

        }
    }
    //Refer template.js 
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

    //Called in Date Picker to change the state value of date   
    handleDateChange = (event) => {
        console.log(event)
        this.setState({selectedDate: event})
    }

    handleCommentChange = (event) => {
        this.setState({comment: event.target.value})
    }

    // Incomplete function to send data to main server. If dropname is default, sends alert
    handleLogSend = () => {
        if(this.state.dropName == ''){
            alert("Please add a type")
        }
    }

    // Called in the DropDown From. Changes the type chosen 
    handleDropChange = (event) => {
        this.setState({dropName: event.target.value})
    }
    fileUpload = (event) => {
        console.log(event.target.files)
        this.setState({selectedFile: event.target.files[0]})
    }
    // Function to send uploaded xlsx file to a local directory 
    dataUploadFromFile = () => {
        
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
    // Code within render function explained in template.js
        return(
            <div className = "ActivityLog_Page">
                {/* Initial set up to obtin navbar and sidebar */}
                <NavBar heading = {this.state.activePage} width = {this.state.sidewidth} big = {this.state.sidebarexp}/>
                {sidebar} 
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link> 

                {/* Main Page Content */}
                <div className = "MainActivityPage_Content" style = {{"position":"fixed","top":"10vh","left":this.state.sidewidth}}>
                {/* <MuiThemeProvider theme = {activityTheme}> */}
                <StylesProvider injectFirst>
                {/* Components to enter new log:- Date Picker, Type, Additional Comments, Send Button */}
                    <div className = "NewLogEntry">
                        <div >

                        {/* Date Picker */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            {/* <DatePicker value={selectedDate} onChange={handleDateChange} />
                            <TimePicker value={selectedDate} onChange={handleDateChange} /> */}

                            {/* Picking the date and changing the value. Changed values are handled in handleDateChange function */}
                            <DateTimePicker className = "Date_Time_Picker" value={this.state.selectedDate} onChange={this.handleDateChange} />
                        </MuiPickersUtilsProvider>
                        </div>


                        <div className = "ItemsDropDown">
                        {/* Material Ui Component */}
                        <FormControl >
                            <div className = "ItemsDropDownInitial">
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.dropName}
                            onChange={this.handleDropChange}
                            >
                            {/* Each value is mapped to MenuItem, depending on this.state.dropName a particular menuitem will be rendered in main page */}
                            <MenuItem value={'Production'}>Production</MenuItem>
                            <MenuItem value={'Maintenance'}>Maintenance</MenuItem>
                            <MenuItem value={'Quality'}>Quality</MenuItem>
                            </Select>
                            </div>
                        </FormControl>
                        </div>

                        {/* Textbox for additinal components. Material UI Component */}
                        <div className = "TextBoxComment">
                        <TextField
                            className = "TextBoxCommentFR"
                            id="outlined-multiline-static"
                            label="Addnl Comments"
                            multiline
                            rows={4}
                            defaultValue="Default Value"
                            variant="outlined"
                            />
                        </div>

                        {/* Send button to validate what the user has sent. Calls handleLogSend on click */}
                        <div className = "sendbutton">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick = {this.handleLogSend}
                            className="sendbutton"
                            // endIcon={<Icon>send</Icon>}
                        >
                            Send
                        </Button>
                        </div>
                    </div>    
                    <div className = "NewLogRefresh"></div>
                    

                    {/* Material table component, columns and data are updated and kept in this.state */}
                    <div className =  "ActivityLogTable" >
                    <MaterialTable
                    title="Recent Activity"
                    columns={this.state.columns}
                    data={this.state.data}
                    editable={{
                        onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            this.setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                            }, 600);
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            if (oldData) {
                                this.setState((prevState) => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                                });
                            }
                            }, 600);
                        }),
                        onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            this.setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                            }, 600);
                        }),
                    }}
                    />
                    </div>

                     {/*Document Upload   */}
                    <div className = "UploadDocument">
                    {/* Only allowing xlsx files in the input and change is reflected in state */}
                    <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange = {this.fileUpload}/>
                    {/* OnClick of button function to send file to directocry should be called */}
                    <Button
                        variant="contained"
                        color="default"
                        className="UploadDocumentButton"
                        onClick = {this.dataUploadFromFile}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload
                    </Button>
                    </div> 
                    {/* </MuiThemeProvider>       */}
                    </StylesProvider>
                </div>
            </div>
        )
    }
}

export default ActivityLog;