import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Register from './components/register';
import Login from './components/login';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Router>
    <div>
        <Route exact path="/app" component={App} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
    </div>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
