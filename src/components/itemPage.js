import React, { Component } from 'react';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import bikes from '../data/bikerentals.json';
import './itemPage.css';

class itemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemData: {},
            quantityToAdd: 1
        }

        this.cart = []
    }
    componentDidMount() {
       this.getData();
    }

    handleChangeQuantity(e) {
        this.setState({
            quantityToAdd: e.target.value
        })
    }

    getData() {
        let itemId = this.props.match.params.id;

        for(let item of bikes.products) {
            if(item.id === parseInt(itemId)) {
                this.setState({itemData: item})
                break
            }
        }
    }

    cartHandler(item) {
        for(var i = 0; i < this.state.quantityToAdd; i++) {
            this.cart.push(item.id)
        }
        
        this.props.onSetCart([...this.cart])
        this.cart = []
    }

    render() {
        return (
            <div id='itemInfo'>
                <img src={this.state.itemData.image} alt={this.state.itemData.name} />
                <h4>{this.state.itemData.name}</h4>
                <h6 id='description'><strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper vitae ex id tristique. In sit amet est condimentum, rutrum turpis nec, luctus dui. In vitae gravida tortor. Phasellus quis erat nulla. Nulla facilisi. Aliquam erat volutpat. Nam aliquam aliquet purus.</h6>
                <p><strong>Price: </strong>${this.state.itemData.price}</p>
                <input type='number' style={{width: '85px'}} defaultValue={1} onChange={(e) => this.handleChangeQuantity(e)}/>
                <br />
                <Button onClick={() => this.cartHandler(this.state.itemData)} style={{marginTop: '15px'}}>Add to Cart</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(itemPage)
