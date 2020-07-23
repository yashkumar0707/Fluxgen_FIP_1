//This webpage is used to choose whether a user would like to change their password using an email or OTP

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Row } from 'reactstrap';



class Login extends Component {

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
                      <p className="text-muted">Choose how you would like to change your password</p>
                      <Row>
                        <Col xs="6">
                          <Link to="/forgotpasswordemail">
                            <Button color="primary" className="px-4" active tabIndex={-1} >Change Password via Email</Button>
                          </Link>
                        </Col>
                        <Col xs="6">
                          <Link to="/forgotpasswordotp">
                            <Button color="primary" className="px-4" active tabIndex={-1} >Change Password via OTP</Button>
                          </Link>
                        </Col>
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
