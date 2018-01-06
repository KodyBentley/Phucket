import * as React from 'react';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';

interface Props {
    updateName: any;
    toggleInputBox: any;
}

interface State {
    value: string;
}

class Input extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: any) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e: any) {
        this.props.updateName(this.state.value);
    }

    render() {
        return (
            <div className="input-container">
                <form onSubmit={this.handleSubmit}>
                    <input className="input-update" type="text" onChange={this.handleChange} value={this.state.value} placeholder="Enter New Name" />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Input;