import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';



class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flag: 0
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClickPassword = this.handleClickPassword.bind(this);
  }

  //handle clicking on 'Send OTP' button
  handleClick = event => {
    event.preventDefault()
    //getting value of mobile number
    var mobile = document.getElementById("mobile_number").value;
    if (mobile) {
      //confirmation message when OTP is sent
      this.setState({ flag: 1 })
    }
    else {
      //error message when email is not entered
      this.setState({ flag: 2 })
    }
  }
  handleClickPassword = event => {
    event.preventDefault()
    //getting value of otp
    var otp = document.getElementById("otp").value;
    if (otp) {
      //redirecting to trial webpage
      this.props.history.push('/trial')
    }
    else {
      //error message if incorrect OTP
      this.setState({ flag: 3 })
    }
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8" style={{ marginTop: "20%" }}>
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Change Password</h1>
                      <p className="text-muted">Enter your Mobile Number</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-phone"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="mobile_number" placeholder="Mobile Number" autoComplete="mobile number" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.handleClick}>Send OTP</Button>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        {this.state.flag === 1 && <p style={{ color: "green" }}>OTP Sent</p>}
                        {this.state.flag === 2 && <p style={{ color: "red" }}>Enter Mobile Number</p>}
                      </Row>
                      <br />
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-phone"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="otp" placeholder="Enter OTP" autoComplete="otp" />
                      </InputGroup>
                      <Row>
                        <Button color="primary" className="px-4" active tabIndex={-1} onClick={this.handleClickPassword} >Change Password</Button>
                      </Row>
                      <br />
                      <Row>
                        {this.state.flag === 3 && <p style={{ color: "red" }}>Incorrect OTP</p>}
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



