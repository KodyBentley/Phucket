import * as React from 'react';
import { render } from 'react-dom';
import { Jumbotron } from 'react-bootstrap';
const logo = require('./../logo.svg');

interface Props {
  user: string
}
class Header extends React.Component<Props, {}> {

  render() {
    return (
        <Jumbotron className="jumboHeader">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome {this.props.user} to Phucket</h2>
          <p>The photo bucket clone built with React JS!</p>
      </Jumbotron>
    );
  }
}

export default Header;