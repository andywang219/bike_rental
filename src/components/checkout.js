import React, { Component } from 'react';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';

class CheckOut extends Component {
    render() {
        return (
            <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);