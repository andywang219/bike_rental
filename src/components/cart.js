import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux'
import bikes from '../data/bikerentals.json';
import Button from 'react-bootstrap/Button';
import './cart.css';

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemQuantity: {},
            products: {},
            selectedItem: {}, 
            total: 0
        }
    }
    
    componentDidMount() {
        this.convertJson()
        this.getQuantity()
    }

    // modify Json file for easier access
    convertJson() {
        let hash = {}

        bikes.products.map((data) => {
            hash[data.id] = data
            return 1
        })

        this.setState({
            products: {...hash}
        })
    }

    // get the quantity of each item in cart {itemId: quantity}
    getQuantity() {
        let itemCount = {}

        for(let id of this.props.cart) {
            itemCount[id] = (itemCount[id] || 0) + 1
        }

        this.setState({
            itemQuantity: itemCount,
            selectedItem: itemCount
        })

        this.getTotal()
    }

    getTotal() {
        let sum = 0

        Object.keys(this.state.itemQuantity).map((item) => {
            sum += (this.state.itemQuantity[item] * this.state.products[item].price)
            return 1
        })

        this.setState({
            total: sum
        })
    }

    // record the amount user wants to delete
    handleChangeQuantity(id, e) {
        let newTotal = {
            [id] : e.target.value
        }
        this.setState({
            selectedItem: {
                ...this.state.selectedItem,
                ...newTotal
            }
        })
    }

    // remove x quantity
    handleRemove(id) {
        let quantity = this.state.itemQuantity
        
        if(quantity[id] === 0) {
            delete this.state.itemQuantity[id]
        } else {
            quantity[id] = quantity[id] - parseInt(this.state.selectedItem[id])
            this.setState({
                ...this.state,
                itemQuantity: {
                    ...quantity
                }
            }, this.updateCart())
        }
        this.getTotal()
    }

    // update the cart
    updateCart() {
        let cart = []

        // not efficient for huge carts
        for(let key of Object.keys(this.state.itemQuantity)) {
            for(var i = 0; i < this.state.itemQuantity[key]; i++) {
                cart.push(key)
            }
        }
        
        this.props.onUpdateCart() // resets the cart in redux
        this.props.onSetCart(cart)
        cart = []
    }

    // can only checkout if there is a bike in the cart
    canProceed() {
        if((this.state.itemQuantity[1] > 0) || (this.state.itemQuantity[2] > 0) || (this.state.itemQuantity[3] > 0)) {
            return true
        }

        return false
    }

    render() {
        let proceed = (
            <div style={{textAlign: 'center'}}>
                <Button id='checkoutBtn' disabled><Link to='#' id='checkoutLink' disabled>Proceed to Checkout</Link></Button>
                <p>Please add a bike before proceeding</p>
            </div>
        )
        
        if(this.canProceed()) {
            proceed = (<Button id='checkoutBtn'><Link to='/checkout' id='checkoutLink'>Proceed to Checkout</Link></Button>)
        }

        return (
            <div>
                <h1 id='cartTitle'>Your Cart</h1>
                <div id='cart'>
                    {
                        Object.keys(this.state.itemQuantity).map((item) => {
                            let options = []
                            
                            for(var i = this.state.itemQuantity[item]; i > 0; i--) {
                               options.push(<option key={i} value={i}>{i}</option>)
                            }

                            if(this.state.itemQuantity[item] > 0) {
                                return (
                                    <div className='cartItem' key={item}> 
                                        < img 
                                            src={this.state.products[(item)].image}
                                            alt={this.state.products[(item)].name}
                                        />
                                        <h6 className='cartDesc'>
                                            {this.state.products[(item)].name}
                                        </h6>
                                        <h6 className='cartDesc'>
                                            Quantity: {this.state.itemQuantity[item]}
                                        </h6>
                                        
                                        <span className='removeSection'>
                                            <select 
                                                name='quantity' 
                                                value={this.state.selectedItem[item]? this.state.selectedItem[item] : this.state.itemQuantity[item]}
                                                onChange={(e) => this.handleChangeQuantity(item, e)}
                                            >
                                                {options.map((option) => {
                                                    return option
                                                })}
                                            </select>
                                            <Button onClick={() => this.handleRemove(item)}>Remove</Button>
                                        </span>
                                    </div>
                                )
                            } else {
                                return null;
                            }
                        })
                    }
                    <p>Total: ${this.state.total}</p>
                    {proceed}
                </div>
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
        onUpdateCart: (cart) => dispatch({
            type: actionTypes.UPDATE_CART
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);