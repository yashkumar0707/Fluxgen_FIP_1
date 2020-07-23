import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';



class Login extends Component {

  constructor(props) {
    super(props);
    this.state={
      flag:0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  //handle clicking on 'Update Password' button
  handleClick = e => {
    e.preventDefault()
    //get new password and re-entered new password values
    var new_pass = document.getElementById("new_password").value;
    var recover_pass = document.getElementById("reenter_password").value;
    const {token} = this.props.match.params;

    if(new_pass && recover_pass){
      if(new_pass===recover_pass){
        //API to reset password and send confirmation email
        const input = {password: new_pass, reset_token: token};
        fetch('http://54.244.196.27/aquagen/v1/auth/reset', {
          method: 'POST',  
          body: JSON.stringify(input),  
          headers:{
            'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
        //redirects to login page on succesful updation of password
        this.props.history.push('/login')
      }
      else{
        //error message if both fields don't match
        this.setState({flag:1})
      }
    }
    else{
      //error message if all input fields are not entered
      this.setState({flag:2})
    }
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                <CardBody>
                    <Form>
                      <h1>Update Password</h1>
                      <p className="text-muted">Enter your new password</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Enter New Password" autoComplete="new password" id="new_password" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Re-enter New Password" autoComplete="reenter new password" id="reenter_password"/>
                      </InputGroup>
                      <Row>
                        <Button color="primary" className="px-4" active tabIndex={-1} onClick={ this.handleClick }>Update Password</Button>
                      </Row>
                      <br />
                      { this.state.flag === 1 && <p style={{color:"red"}}>Both password fields do not match. Re-enter.</p> }
                      { this.state.flag === 2 && <p style={{color:"red"}}>Enter all input fields</p> }
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
