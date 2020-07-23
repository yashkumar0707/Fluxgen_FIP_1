import React from 'react';
import SideBarExp from '../../SIdeBar/SideBar';
import SideBarmin from '../../SideBarMin/SideBarmin';
import NavBar from '../../NavBar/NavBar';
import {Button,TextField,Checkbox} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './Contact.css'


class Contact extends React.Component{
    constructor(props){
        super(props);
        let date = new Date()
        this.state = {
            sidebarexp: true,
            sidewidth: '18.05%',
            activePage: 'Contact Us',
            //Refer Template.js for the usefulness of the above 3
            contact: false,
            contactApproved: false,
            subject: '',
            description: '',
            usefulFAQ: false
        }
    }
    //Refer Template.js
    arrowClick = () => {
        this.setState((prevState) => {
          return{sidebarexp: !prevState.sidebarexp}
        })
        console.log(this.state.sidewidth)
      }
      //Refer Template.js
      callBack = (childdata) => {
        this.setState({sidewidth: childdata})
      }
    //Refer Template.js
      active = (childdata) => {
          this.setState({activePage: childdata})
          console.log(childdata + "in main")
      }
    // Changes subject value   
    handleSubjectChange = (event) => {
        this.setState({subject: event.target.value })
    } 
    // Changes Description value 
    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    }
    // Basic validation to check whether fields are empty 
    handleContactSubmit = () => {
        if(this.state.subject === ''){
            this.setState({description: ''})
            alert("Please enter a subject")            
        }
        else if(this.state.description === ''){
            this.setState({subject: ''})
            alert("Please enter a description")            
        }
        else{
            this.setState({contactApproved: true})
        }
    }
    handleContactBack = () => {
        this.setState({contactApproved: false})
    }
    isUsefulFAQ = () => {
        this.setState((prevState) => {
            return {usefulFAQ: !prevState.usefulFAQ}
        })
    }
    handleFAQBack = () => {
        this.setState({contact: true})
        this.setState({contactApproved: false})
    }
    setOnPage = () => {
        // If the form is not submitted and contact page is active
        if(this.state.contact === true && this.state.contactApproved === false){
            return (
                <div className = "PageDependentContent">
                <div className = "Contact_Us_Subject">
                    Subject:
                    {/* Textfield - Material UI component */}
                    <TextField
                    className = "Contact_Us_Subject_Textfield"
                    id="standard-multiline-flexible"
                    multiline
                    rowsMax={4}
                    variant="outlined"
                    value={this.state.subject}
                    onChange={this.handleSubjectChange}
                    />
                    {/* handleSubjectChange is called when text is being written */}
                </div>
                <div className = "Contact_Us_Description">
                    Description: 
                    <TextField
                    id="outlined-multiline-static"
                    className = "Contact_Us_Description_Textfield"
                    multiline
                    rows={6}
                    value = {this.state.description}
                    onChange = {this.handleDescriptionChange}
                    variant="outlined"
                    />
                    {/* handleDescriptionChange is called when text is being written */}
                </div>
                <div className = "Contact_Us_Phone">
                Phone no: 080 26789444
                </div>
                {/* Onclick of button form is validated- handleContactSubmit is called */}
                <div className = "Send_Button_Contact_Us">
                <Button
                    variant="contained"
                    color="primary"
                    onClick = {this.handleContactSubmit}
                    // className={classes.button}
                    endIcon={<SendIcon />}
                >
                Send
                </Button>
                </div>
                </div>
                );
        }
        // If the form is submitted and contact page is active
        else if(this.state.contact === true && this.state.contactApproved === true)
        {
            return(
                <div className = "Succesful_Form_Submission_Contact">
                    <div className = "Form_Submit_Heading_Contact">
                        Service Acknowledgement
                    </div>
                    <div className = "Form_Submit_Body_Contact">
                    Your query has been submitted and your service number is xxxx002xx and our 
                    representative will call you as soon as possible.
                    </div>
                    <div className = "Form_Submit_Phone_Contact">
                    Phone no: 080 26789444 
                    </div>
                    <div className = "Form_Submit_Contact_Back">
                    <Button
                    variant="contained"
                    color="primary"
                    onClick = {this.handleContactBack}
                    // className={classes.button}
                    >
                    Back
                    </Button>
                    {/* Redirects to the form page of contact us page */}
                    </div>
                </div>
            )
        }
        // If the faq page is active
        else{
            return(
            <div className = "FAQ_Page_Content">
                <div className = "FAQ_Points">
                    <ul>
                        <li>Point</li>
                        <li>Point</li>
                        <li>Point</li>
                        <li>Point</li>
                        <li>Point</li>
                    </ul>
                </div>
                <div className = "FAQ_Issue_Not">
                If the issue is not resolved, please click on Need help/Contact us
                </div>
                <div className = "FAQ_Useful">
                <Checkbox
                    checked = {this.state.usefulFAQ}
                    onChange = {this.isUsefulFAQ}
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
                {/* To enable toggle of checkbox onchange function is called */}
                <div className = "FAQ_useful_text" >Please click here if this page was useful</div>
                </div>
                <div className = "FAQ_Back">
                <Button
                    variant="contained"
                    color="primary"
                    onClick = {this.handleFAQBack}
                    // className={classes.button}
                >
                Back
                </Button>
                {/* Redirects to initial contact us page with the form */}
                </div>
            </div>
            );
        }
    }
    // Redirects to contact subpage
    contactPage = () => {
        this.setState({contact: true})
    }
    //Redirects to FAQ subpage
    FAQPage = () => {
        this.setState({contact: false})
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
    //Refer Template.js for explanation of code in render till here
        return(
            <div className = "Contact_Us_Page">
                <NavBar heading = {this.state.activePage} width = {this.state.sidewidth} big = {this.state.sidebarexp}/>
                {sidebar}  
                {/* Set up for layout with sidebar and navbar */}

                <div className = "ContactUsPage_Content" style = {{"position":"fixed","top":"10vh","left":this.state.sidewidth}}>
                {/* <MuiThemeProvider theme = {activityTheme}> */}

                <div className = "ContactUsPage_Navigate">
                {/* Navigating between contact us and faq sub pages */}
                    <Button color = "primary" onClick = {this.contactPage}>Contact Us</Button>
                    <Button color = "primary" onClick = {this.FAQPage}>FAQ</Button>
                </div>

                {/* Conditional rendering of page depending on contact us or faq */}
                {this.setOnPage()}
                {/* <div className = "PageDependentContent">
                    
                </div> */}
                </div>
            </div>
        )
    }
}

export default Contact;