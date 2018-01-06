import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import App from './App';
import Register from './components/register'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Register />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
