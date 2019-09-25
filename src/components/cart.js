import React, { Component } from 'react'
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux'
import bikes from '../data/bikerentals.json';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import './cart.css';

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartTitle: '',
            itemQuantity: {},
            products: {}
        }
    }
    
    componentDidMount() {
        this.convertJson()
        this.getQuantity()
    }

    convertJson() {
        this.setState({
            products: {...bikes.products}
        })
    }

    // {itemId: quantity}
    getQuantity() {
        if(this.props.cart.length === 0) {
            this.setState({cartTitle: 'Your Cart is Empty'})
        } else {
            let itemCount = {}

            for(let id of this.props.cart) {
                itemCount[id] = (itemCount[id] || 0) + 1
            }

            this.setState({itemQuantity: itemCount, cartTitle: 'Your Cart'})
        }
    }

    render() {

        return (
            <div id='cart'>
                <h1 id='cartTitle'>{this.state.cartTitle}</h1>
                {
                    Object.keys(this.state.itemQuantity).map((item) => {
                        let itemId = item - 1

                        return (
                            <div className='cartItem'> 
                                < img 
                                    src={this.state.products[parseInt(itemId)].image}
                                    alt={this.state.products[parseInt(itemId)].name}
                                />
                                <span className='quantity'>
                                    {this.state.products[parseInt(itemId)].name}: {this.state.itemQuantity[item]}
                                </span>
                                <Dropdown>
                                    <Dropdown.Toggle 
                                        size='sm' 
                                        variant="outline-primary" 
                                        id="dropdown-basic"
                                    >
                                        {this.state.itemQuantity[item]}
                                    </Dropdown.Toggle>
                                    
                                    <Dropdown.Menu>
                                        
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button>Remove</Button>
                            </div>
                        )
                    })
                }
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
        onSetCart: (cart) => dispatch({
            type: actionTypes.SET_CART,
            payload: cart
        }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);