import React, { Component } from 'react'
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
            selectedItem: {}
        }
    }
    
    componentDidMount() {
        this.convertJson()
        this.getQuantity()
    }

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
    }

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
            <div>
                <h1 id='cartTitle'>Your Cart</h1>
                <div id='cart'>
                    {
                        Object.keys(this.state.itemQuantity).map((item) => {
                            let itemId = item - 1
                            let options = []
                            
                            for(var i = this.state.itemQuantity[item]; i > 0; i--) {
                               options.push(<option key={i} value={i}>{i}</option>)
                            }

                            if(this.state.itemQuantity[item] > 0) {
                                return (
                                    <div className='cartItem' key={itemId}> 
                                        < img 
                                            src={this.state.products[parseInt(itemId)].image}
                                            alt={this.state.products[parseInt(itemId)].name}
                                        />
                                        <h6 className='cartDesc'>
                                            {this.state.products[parseInt(itemId)].name}
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