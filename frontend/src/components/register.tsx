import * as React from 'react';
import { render } from 'react-dom';
import { Jumbotron, Row, Col, Grid } from 'react-bootstrap';
import './../styles/register-login.css';

interface Props {

}

interface State {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    value: string;
}

class Register extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            value: '',
        };
    }

    handleChange(e: any) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e: any) {
        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.name, email: this.state.email, password: this.state.password }),
            redirect: 'manual'
        })
            .then((res) => {
                return res.json();
            });
            e.preventDefault();
    }

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
                                    <form className="register-form" onSubmit={this.handleSubmit}>
                                        <input type="text" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} />

                                        <input type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />

                                        <input type="text" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />

                                        <input type="text" name="passwordConfirm" placeholder="Confirm Password" onChange={this.handleChange} value={this.state.passwordConfirm} />

                                        <input className="register-submit-btn" type="Submit" value="Submit" />
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