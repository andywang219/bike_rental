import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import bikes from '../data/bikerentals.json';

export default class itemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemData: {}
        }
    }
    componentDidMount() {
       this.getData();
    }

    getData() {
        let itemId = this.props.match.params.id;

        for(let item of bikes.products) {
            console.log(item.id)
            if(item.id === parseInt(itemId)) {
                this.setState({itemData: item})
                break
            }
        }
    }

    render() {
        console.log(this.props)
        console.log(this.state.itemData)
        return (
            <div>
                <img src={this.state.itemData.image} alt={this.state.itemData.name} />
                <h4>{this.state.itemData.name}</h4>
                <h6 style={{width: '40vw', fontWeight: '400'}}>Dscription: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper vitae ex id tristique. In sit amet est condimentum, rutrum turpis nec, luctus dui. In vitae gravida tortor. Phasellus quis erat nulla. Nulla facilisi. Aliquam erat volutpat. Nam aliquam aliquet purus.</h6>
                <p>${this.state.itemData.price}</p>
                <Button onClick={() => this.cartHandler(this.state.itemData)}>Add to Cart</Button>
            </div>
        )
    }
}
