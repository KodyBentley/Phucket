import * as React from 'react';
import { render } from 'react-dom';
import { Jumbotron, Row, Col, Grid, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './../styles/register-login.css';

interface Props {

}

interface State {
    email: string;
    password: string;
}

class Register extends React.Component<{}, State> {
    constructor(props: Props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange(e: any) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e: any) {
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.state.email, password: this.state.password }),
            redirect: 'manual'
        })
            .then((res) => {
                return res.json();
            });
    }
    render() {
        return (
            <div className="page-container">
                <Jumbotron className="register-header"><h1>Login</h1></Jumbotron>
                <Grid>
                    <Row>
                        <Col className="register-container" lg={12}>
                            <Col className="register-box" lgPush={3} lgPull={3} lg={6}>
                                <div>
                                    <h3>Please Login</h3>
                                    <form className="register-form" onSubmit={this.handleSubmit}>

                                        <input type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />

                                        <input type="text" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />

                                        <input className="register-submit-btn" type="Submit" value="Submit" />

                                        <p>Not a member? Register here.</p>
                                        <Link to="/register"><Button className="login-btn" bsStyle="primary">Register</Button></Link>
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