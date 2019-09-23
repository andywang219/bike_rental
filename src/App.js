import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Cart from './components/cart';
import ItemPage from './components/itemPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div id='App'>
        <Switch>
          <Route path='/' exact component={ Home } />
          <Route path='/cart' exact component={ Cart } />
          <Route path='/:product_type/:id' exact component={ ItemPage } />
        </Switch>
      </div>
    </Router>
  );
}

export default (App);
