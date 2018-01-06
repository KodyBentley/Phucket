import * as React from 'react';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';
import Props from './../interfaces/iProp';

class PopUp extends React.Component<Props, {}> {
    render() {
        return (
            <div className="popup">
                <div className="popup_inner">
                    <h1>{this.props.text}</h1>
                    <Button bsStyle="danger" onClick={this.props.deleteItem}>Delete</Button>
                    <Button bsStyle="primary" onClick={this.props.closePopup}>Cancel</Button>
                </div>
            </div>
        );
    }
}

export default PopUp;