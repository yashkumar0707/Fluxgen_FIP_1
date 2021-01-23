import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Image from './fluxgen.png';
import Image1 from './AquaGen.jpeg';
import Image2 from './fluxgen_logo_new.png'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleCheck = (event) => {
    if (event.key == 'Enter') {
      this.handleClick()
    }
  }
  //handle clicking on 'Login' button
  handleClick = e => {
    console.log('yashhsyhay')
    let base64 = require('base-64');
    //getting value of email and password
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    //getting authentication details from API for comparison
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode(email + ":" + password))
    if (email && password) {
      fetch('https://api.fluxgen.in/aquagen/v1/auth/login', {
        method: 'GET',
        headers: headers
      })
        .then(res => res.json())
        .then(response => {
          console.log(JSON.stringify(response))
          console.log(response.status)
          //error message on incorrect credentials
          if (response.status === "failed") {

            this.setState({ flag: 1 });
          }
          else {
            //redirecting incase of authentication sucess
            let data = []
            data.push(response.data)
            this.props.appCallBack1(data)
            console.log(data)
            this.props.history.push('/dashboard')
          }
        })
        .catch(error => console.error(error));
    }
    else {
      //error message in case all input fields are not entered
      this.setState({ flag: 2 });
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center" style={{ backgroundColor: "#F5F5F5" }}>
        <Container>
          {/* <div className="center-align" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            verticalAlign: 'middle'
          }}> */}
          <Row className="justify-content-center" >
            {/* <div style={{ marginTop: "25%" }}> */}
            <Col md="8" style={{ textAlign: "center", marginTop: "25%" }}>
              {/* <Col md="8" style={{ textAlign: "center" }}> */}
              <img src={Image} alt="Login-page" style={{ width: '60%' }} />
            </Col>
            <Col style={{ textAlign: "center", marginTop: "25%" }}>
              {/* <Col className="align-middle" style={{ textAlign: "center" }}> */}
              <Card className="p-4" style={{ backgroundColor: "#DFFAE0", borderRadius: '75px', boxShadow: "0px 0px 15px 2px rgba(107,99,107,0.5)" }}>
                <CardBody>
                  <Form style={{ textAlign: "center" }}>
                    <img src={Image1} alt="AquaGen Logo" style={{ width: '80%' }} />
                    <br />
                    <br />
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText style={{ borderColor: "green" }}>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" placeholder="Email ID" autoComplete="email ID" id="email" style={{ borderColor: "green" }} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText style={{ borderColor: "green" }}>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" onKeyPress={this.handleCheck} autoComplete="current-password" id="password" style={{ borderColor: "green" }} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.handleClick}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Link to="/forgotpassword">
                          <Button color="link" className="px-0" active tabIndex={-1} >Forgot password?</Button>
                        </Link>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      {/* <div className="image_center"> */}
                      <img src={Image2} alt="Login-page" style={{ width: '70%', paddingLeft: '20%' }} />
                      {/* </div> */}
                    </Row>
                    <br></br>
                    <Row>
                      {this.state.flag === 1 && <p style={{ color: "red" }}>Incorrect login credentials, please try again</p>}
                      {this.state.flag === 2 && <p style={{ color: "red" }}>Enter all input fields</p>}
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <br />
              <button><i>Please click here to take to our latest blog on water conservation</i></button>
            </Col>
            {/* </div> */}
          </Row>
          {/* </div> */}
        </Container>

      </div >
    );
  }
}

export default Login;
