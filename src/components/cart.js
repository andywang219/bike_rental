import React, { Component } from 'react'
import { connect } from 'react-redux'

class Cart extends Component {
    
    reduceCart() {
        for(let item of this.props.cart) {
            
        }
    }

    render() {
        console.log('cart: ', this.props.cart)
        return (
            <div>
                {
                    this.props.cart.map((item) => {
                        return (
                            <div>
                                {item.name}
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

export default connect(mapStateToProps)(Cart);