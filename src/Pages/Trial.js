//Trial page for updation of password via OTP
//This is just a dummy page as no API is implemented for password updation via OTP  

import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';



class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flag:0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  //handle clicking on 'Update Password' button
  handleClick = e => {
    //get new password and re-entered new password values
    var new_pass = document.getElementById("new_password").value;
    var recover_pass = document.getElementById("reenter_password").value;
    
    if(new_pass && recover_pass){
      if(new_pass===recover_pass){
        //redirect to login page 
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
                      <Row>
                        { this.state.flag === 1 && <p style={{color:"red"}}>Both password fields do not match. Re-enter.</p> }
                        { this.state.flag === 2 && <p style={{color:"red"}}>Enter all input fields</p> }
                      </Row>
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
