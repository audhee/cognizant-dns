
import React,{ Component } from "react";

class Cart extends Component {
    render() {
        return(
            <div style={{
                border:"1px solid black",
                padding:"10px",
                margin:"10px",
                width:"250px"
            }}
            >
                <h3>{this.props.itemName}</h3>
                <h4>Price: ${this.props.price}</h4>
            </div>
        );
    }
}

export default Cart;