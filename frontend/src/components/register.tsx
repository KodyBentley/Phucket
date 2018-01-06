import * as React from 'react';
import { render } from 'react-dom';
import { Jumbotron, Row, Col, Grid } from 'react-bootstrap';
import './../styles/register.css';


class Register extends React.Component<{}, {}> {
    render() {
        return (
            <div className="page-container">
                <Jumbotron className="register-header"><h1>Register</h1></Jumbotron>
                <Grid>
                    <Row> 
                        <Col className="register-container" lg={12}> 
                            <Col className="register-box" lgPush={3} lgPull={3} lg={6}> 
                                <div> 
                                    <h3>Please Register</h3>
                                    <form className="register-form">
                                        <input type="text" placeholder="Name"></input>
                                        <input type="text" placeholder="Email"></input>
                                        <input type="text" placeholder="Password"></input>
                                        <input type="text" placeholder="Confirm Password"></input>
                                        <input className="register-submit-btn" type="Submit" value="Submit"></input>
                                    </form>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Register;