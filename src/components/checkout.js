import React, { Component } from 'react';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import './checkout.css';

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zipCode: '',
                cardName: '',
                cardNumber: '',
                cardCvv: '',
                expDate: ''
            },
            complete: false,
            continue: false,
        }
    }

    handleChange = (name, event) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name] : event.target.value
            }
        })
    }

    handleCheckout = () => {
        let user = {...this.state.user}

        if(new Set(Object.values(user)).size >= 10) {
            this.setState({
                ...this.state,
                complete: true
            })
            this.props.onUpdateCart()
        }
        
    }

    handleContinue = () => {
        this.setState({
            continue: true
        })
        
    }

    render() {
        let state = this.state.user
        
        if(!this.state.complete && !this.state.continue) {
            return (
                <div>
                    <h1 className='checkoutTitle'>Checkout</h1>
                    <h2 className='infoTitle'>Please Fill Out Your Shipping Information</h2>
                    <div className='buyerInfo'>
                        <TextField
                            required
                            label='First Name'
                            name='firstName'
                            type='text'
                            margin='normal'
                            variant="outlined"
                            onChange={(e) => this.handleChange('firstName', e)}
                            value={state.name}
                            style={{margin: '10px'}}
                        />
                        <TextField
                            required
                            label='Last Name'
                            name='lastName'
                            type='text'
                            margin='normal'
                            variant="outlined"
                            onChange={(e) => this.handleChange('lastName', e)}
                            value={state.name}
                            style={{margin: '10px'}}
                        />
                        <br />
                        <TextField
                            required
                            label='Address'
                            name='address1'
                            type='text'
                            margin='normal'
                            variant="outlined"
                            onChange={(e) => this.handleChange('address1', e)}
                            value={state.name}
                            style={{margin: '10px', width: '300px'}}
                        />
                        <TextField
                            label='Apt, Suite, Floor, Etc'
                            name='address2'
                            type='text'
                            margin='normal'
                            variant="outlined"
                            onChange={(e) => this.handleChange('address2', e)}
                            value={state.name}
                            style={{margin: '10px'}}
                        />
                        <br/>
                        <TextField
                            required
                            label='City'
                            name='city'
                            type='text'
                            margin='normal'
                            variant="outlined"
                            onChange={(e) => this.handleChange('city', e)}
                            value={state.name}
                            style={{margin: '10px'}}
                        />
                        <TextField
                            required
                            label='State'
                            name='state'
                            type='text'
                            margin='normal'
                            variant="outlined"
                            onChange={(e) => this.handleChange('state', e)}
                            value={state.name}
                            style={{margin: '10px'}}
                        />
                        <TextField
                            required
                            label='Zip Code'
                            name='zipCode'
                            type='text'
                            margin='normal'
                            variant="outlined"
                            onChange={(e) => this.handleChange('zipCode', e)}
                            value={state.name}
                            style={{margin: '10px'}}
                        />
                    </div>
    
                    <h2 className='infoTitle'>Please Fill Out Your Billing Information</h2>
                    <div className='buyerInfo'>
                        <TextField
                            required
                            label='Name on the Credit Card'
                            name='cardName'
                            type='text'
                            margin='normal'
                            variant="outlined"
                            onChange={(e) => this.handleChange('cardName', e)}
                            value={state.name}
                            style={{margin: '10px'}}
                        />
                        <TextField
                            required
                            label='Credit Card Number'
                            name='cardNumber'
                            type='text'
                            margin='normal'
                            variant="outlined"
                            onChange={(e) => this.handleChange('cardNumber', e)}
                            value={state.name}
                            style={{margin: '10px'}}
                        />
                        <br />
                        <TextField
                            required
                            label='CVV'
                            name='cardCvv'
                            type='text'
                            margin='normal'
                            variant="outlined"
                            onChange={(e) => this.handleChange('cardCvv', e)}
                            value={state.name}
                            style={{margin: '10px'}}
                        />
                        <TextField
                            required
                            helperText="Expiration Date"
                            name='expDate'
                            type='date'
                            margin='normal'
                            variant="outlined"
                            onChange={(e) => this.handleChange('expDate', e)}
                            value={state.name}
                            style={{margin: '10px'}}
                        />
                        <br />
                        <Button style={{marginTop: '25px'}} type='submit' onClick={() => this.handleContinue()}>Continue</Button>
                    </div>
                </div>
            )
        } else if(this.state.continue && !this.state.complete) {
            return (
                <div id='confirm'>
                    <h1 className='checkoutTitle'>Please Confirm Your Information</h1>
                    <h5>Name: {state.firstName} {state.lastName}</h5>
                    <h5>Address: {state.address1} {state.address2}</h5>
                    <h5>{state.city} {state.state} {state.zipCode}</h5>
                    <Button style={{marginTop: '25px'}} type='submit' onClick={() => this.handleCheckout()}>Checkout</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className='checkoutTitle'>Thank You for Your Purchase</h1>
                </div>
            )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);