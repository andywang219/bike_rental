import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, withRouter, Redirect } from 'react-router-dom';
import * as actionTypes from './store/actions';
import { connect } from 'react-redux'
import Home from './components/home';
import Cart from './components/cart';
import ItemPage from './components/itemPage';
import Checkout from './components/checkout';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';

class App extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			home: false
		}
		this.handleScrollToElement = this.handleScrollToElement.bind(this);
		this.rentalScroll = React.createRef();
		this.accessScroll = React.createRef();
		this.addScroll = React.createRef();
  	}

	  handleScrollToElement(pos) {
		let doc = document.querySelectorAll('.rentals')
		if(doc.length) {
			if(pos === 'rentalScroll') {
				doc[0].scrollIntoView({behavior: "smooth", block: "center"});
			} else if(pos === 'accessScroll') {
				doc[1].scrollIntoView({behavior: "smooth", block: "center"});
			} else {
				doc[2].scrollIntoView({behavior: "smooth", block: "center"});
			}
		} else {
			this.setState({
				home: true
			})
		}
  	}

	render() {
		if(this.state.home) {
			this.setState({home: false})
			return <Redirect to='/' />
		}
		return (
			<Router>
				<div id='App'>
					<Switch>
						<Route path='/' exact component={ Home } />
						<Route path='/cart' exact component={ Cart } />
						<Route path='/checkout' exact component={ Checkout } />
						<Route path='/:product_type/:id' exact component={ ItemPage } />
					</Switch>
				</div>
				<Navbar bg='light' expand='lg' fixed='top' style={{width: '100%'}}>
					<Navbar.Brand><Link to='/' style={{textDecoration: 'none'}}>Bikey</Link></Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto">
							<NavDropdown title="Shop" id="collasible-nav-dropdown">
								<Link 
									to='#' 
									className='links' 
									onClick={() => this.handleScrollToElement('rentalScroll')}
								>
									Bike Rentals
								</Link>
								<Link 
									to='#' 
									className='links' 
									onClick={() => this.handleScrollToElement('accessScroll')}
								>
									Accessories
								</Link>
								<Link 
									to='#' 
									className='links' 
									onClick={() => this.handleScrollToElement('addScroll')}
								>
									Addons
								</Link>
							</NavDropdown>
						</Nav>
						<Nav>
							<Link to='/cart' className='links'>Cart<sup style={{color: 'red'}}>{this.props.cart.length}</sup></Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Router>
		);
	}
}

const mapStateToProps = state => {
  return {
      cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onSetCart: (cart) => dispatch({type: actionTypes.SET_CART, payload: cart}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter (App));
