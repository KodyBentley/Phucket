import * as React from 'react';
import ImageUpload from './components/imageUpload';
import Header from './components/header';
import Popup from './components/popup';
import Input from './components/inputUpdate';
import * as BootStrap from 'react-bootstrap';
import Props from './interfaces/iProp';

import './App.css';
import { InputGroup } from 'react-bootstrap';

interface State {
  imgData: Array<{ _id: string, imgPath: string, name: string }>;
  showPopup: boolean;
  showInput: boolean;
  user: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.togglePopup = this.togglePopup.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.state = {
      imgData: [],
      showPopup: false,
      showInput: false,
      user: ''
    };
  }

  componentWillMount() {
    // fetch('/api')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((imgData) => {
    //     return this.setState({ imgData });
    //   });

    fetch('/login', {
      method: 'GET',
      headers: { Accept: 'application/json','Content-Type': 'application/json' },
      credentials: 'same-origin'
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          user: data.user
        })
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

  deleteItem(data: { _id: string, imgPath: string, name: string }) {
    let arrIndex: number = this.state.imgData.indexOf(data);
    fetch('/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data }),
      redirect: 'manual'
    })
      .then((res) => {
        return res.json();
      });
    this.setState(state => {
      state.imgData.splice(arrIndex, 1);
      return { imgData: state.imgData };
    });
    this.togglePopup();
  }

  updateItem(data: { _id: string, imgPath: string, name: string }, newName: string) {
    console.log(data);
    fetch('/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data, name: newName }),
      redirect: 'manual'
    })
      .then((res) => {
        return res.json();
      });

    this.toggleInput();
    // location.reload();
  }

  render() {
    let test;
    return (
      <div className="App">
        < Header 
          user={this.state.user}
        />
        < ImageUpload />
        <BootStrap.Grid className="container-fluid">
          <BootStrap.Row className="row-fluid">
            {this.state.imgData.map(data => {
              test = data;
              return (
                <BootStrap.Col className="img-container" lg={4} key={data._id}>
                  <div className="img-div" key={data._id}>
                    <img src={data.imgPath} />
                    <p>{data.name}</p>
                    <BootStrap.Button onClick={this.toggleInput} bsStyle="primary">Update</BootStrap.Button>
                    <BootStrap.Button onClick={this.togglePopup} bsStyle="danger">Delete</BootStrap.Button>
                    {this.state.showInput ?
                      <Input
                        updateName={this.updateItem.bind(this, data)}
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
