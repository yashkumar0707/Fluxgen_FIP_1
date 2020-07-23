import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';



class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flag: 0
    }

    this.handleClick = this.handleClick.bind(this);
  }

  //handle clicking on 'Send Email' button
  handleClick = e => {
    e.preventDefault()
    //getting value of email
    var email = document.getElementById("email").value;
    if (email) {
      //conifirmation message that email has been sent
      this.setState({ flag: 1 })
    }
    else {
      //error message when email is not entered
      this.setState({ flag: 2 })
    }
    const input = { email: email };
    //API for sending an email
    fetch('http://54.244.196.27/aquagen/v1/auth/forgot', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => console.log(JSON.stringify(response)))
      .catch(error => console.error(error));
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8" style={{ marginTop: "30%" }}>
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Change Password</h1>
                      <p className="text-muted">Enter your Email ID</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email ID" autoComplete="emailid" id="email" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.handleClick}>Send Email</Button>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        {this.state.flag === 1 && <p style={{ color: "green" }}>Email Sent. Check your email in order to reset password</p>}
                        {this.state.flag === 2 && <p style={{ color: "red" }}>Enter Email ID</p>}
                      </Row>
                      <br />
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
