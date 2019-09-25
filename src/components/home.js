import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux'
import bikes from '../data/bikerentals.json';
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.cart = []

        this.handleScrollToElement = this.handleScrollToElement.bind(this);
        this.rentalScroll = React.createRef();
        this.accessScroll = React.createRef();
        this.addScroll = React.createRef();
    }
    
    handleScrollToElement(pos) {
        if(pos === 'rentalScroll') {
            this.rentalScroll.current.scrollIntoView({behavior: "smooth", block: "center"});
        } else if(pos === 'accessScroll') {
            this.accessScroll.current.scrollIntoView({behavior: "smooth", block: "center"});
        } else {
            this.addScroll.current.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }

    // add items to the cart
    cartHandler(item) {
        this.cart.push(item.id)
        this.props.onSetCart([...this.cart])
        this.cart = []
    }

    render() {
        let rentals = 
            bikes.products.map((bike) => {
                if(bike.product_type === 'bike') {
                    return (
                        <div key={bike.name} className='item'>
                            <img className='bikeImg' src={bike.image} alt={bike.name} />
                            <h4><Link to={`/${bike.product_type}/${bike.id}`} className='shopLink'>{bike.name}</Link></h4>
                            <p>${bike.price}</p>
                            <Button onClick={() => this.cartHandler(bike)}>Add to Cart</Button>
                        </div>
                    )
                }
                return null
            })

        let access = 
            bikes.products.map((bike) => {
                if(bike.product_type === 'accessory') {
                    return (
                        <div key={bike.name} className='item'>
                            <img className='bikeImg' src={bike.image} alt={bike.name} />
                            <h4><Link to={`/${bike.product_type}/${bike.id}`} className='shopLink'>{bike.name}</Link></h4>
                            <p>${bike.price}</p>
                            <Button onClick={() => this.cartHandler(bike)}>Add to Cart</Button>
                        </div>
                    )
                }
                return null
            })

        let addon = 
            bikes.products.map((bike) => {
                if(bike.product_type === 'addon') {
                    return (
                        <div key={bike.name} className='item'>
                            <img className='bikeImg' src={bike.image} alt={bike.name} />
                            <h4><Link to={`/${bike.product_type}/${bike.id}`} className='shopLink'>{bike.name}</Link></h4>
                            <p>${bike.price}</p>
                            <Button onClick={() => this.cartHandler(bike)}>Add to Cart</Button>
                        </div>
                    )
                }
                return null
            })

        return (
            <div>
                {/* Navbar */}
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
                            <Link to='cart' className='links'>Cart<sup style={{color: 'red'}}>{this.props.cart.length}</sup></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                {/* Homepage jumbotron */}
                <Jumbotron fluid>
                    <h1 className='jumboText'>Let's Get Riding!</h1>
                    <h2 className='subJumboText'>Your Adventure Awaits</h2>
                    <p>In Progress</p>
                    <Button 
                        id='learnMore' 
                        size='lg' 
                        variant="outline-primary" 
                        onClick={() => this.handleScrollToElement('rentalScroll')}
                    >
                        Explore
                    </Button>
                </Jumbotron>

                <section ref={this.rentalScroll}>
                    <h1 className='rentalText'>Bike Rentals</h1>
                    <div className='rentals'>{rentals}</div>
                </section>

                <section ref={this.accessScroll}>
                    <h1 className='rentalText'>Bike Accessories</h1>
                    <div className='rentals'>{access}</div>
                </section>

                <section ref={this.addScroll}>
                    <h1 className='rentalText'>Addons</h1>
                    <div className='rentals'>{addon}</div>
                </section>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);