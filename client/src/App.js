import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Landing from './components/layout/Landing';
import Lab3 from './components/lab3/Lab3';
import Lab4 from './components/lab4/Lab4';
import Orders from './components/lab4/Orders';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Landing} />
            <div>
              <Route exact path="/lab3" component={Lab3} />
              <Route exact path="/lab4" component={Lab4} />
              <Route exact path="/lab4/orders" component={Orders} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
