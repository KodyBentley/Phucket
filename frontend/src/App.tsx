import * as React from 'react';
import ImageUpload from './components/imageUpload';
import Header from './components/header';
import Popup from './components/popup';
import Input from './components/inputUpdate';
import * as BootStrap from 'react-bootstrap';
// import Database from './backend/src/controllers/databaseController';
import Props from './interfaces/iProp';

import './App.css';
import { InputGroup } from 'react-bootstrap';

class App extends React.Component<{}, any> {
  constructor(props: Props) {
    super(props);
    this.togglePopup = this.togglePopup.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.state = {
      users: [],
      showPopup: false,
      showInput: false
    };
  }

  componentDidMount() {
    fetch('/api')
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        return this.setState({ users });
      });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  toggleInput() {
    this.setState({
      showInput: !this.state.showInput
    });
  }

  deleteItem(user: any) {
    let arrIndex: number = this.state.users.indexOf(user);
    fetch('/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: user }),
      redirect: 'manual'
    })
      .then((res) => {
        return res.json();
      });
    this.setState(state => {
      state.users.splice(arrIndex, 1);
      return { users: state.users };
    });
    this.togglePopup();
  }

  updateItem(user: any, newName: string) {
    fetch('/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: user, name: newName }),
      redirect: 'manual'
    })
      .then((res) => {
        return res.json();
      });

    this.toggleInput();
    location.reload();
  }

  render() {
    let test;
    return (
      <div className="App">
        < Header />
        < ImageUpload />
        <BootStrap.Grid className="container-fluid">
          <BootStrap.Row className="row-fluid">
            {this.state.users.map(user => {
              test = user;
              return (
                <BootStrap.Col className="img-container" lg={4} key={user._id}>
                  <div className="img-div" key={user._id}>
                    <img src={user.imgPath}/>
                    <p>{user.name}</p>
                    <BootStrap.Button onClick={this.toggleInput} bsStyle="primary">Update</BootStrap.Button>
                    <BootStrap.Button onClick={this.togglePopup} bsStyle="danger">Delete</BootStrap.Button>
                    {this.state.showInput ?
                      <Input
                        updateName={this.updateItem.bind(this, test)}
                        toggleInputBox={this.toggleInput}
                      />
                      : null
                    }
                  </div>
                </BootStrap.Col>
              );
            }
            )}
          </BootStrap.Row>
        </BootStrap.Grid>

        {this.state.showPopup ?
          <Popup
            text="Are you sure you wish to delete this item?"
            closePopup={this.togglePopup}
            deleteItem={this.deleteItem.bind(this, test)}
          />
          : null
        }
      </div>
    );
  }
}

export default App;
