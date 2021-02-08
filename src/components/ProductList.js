import React from "react";
import Product from "./Product.js";
import Cart from "../assets/images/cart.png";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: props.products,
        };
    }

    onClick = (p) => {
        let products = this.state.products.slice();
        let selectedP;
        products.forEach((prod) => {
            if (prod.id === p.id) {
                prod.selected = prod.selected ? !prod.selected : true;
                selectedP = prod;
            }
        });
        this.setState({ products });
        this.props.clickProduct(p, selectedP.selected);
    };

    gotoBasket = () => {
        this.props.history.push("/basket");
    };

    render() {
        return (
            <div>
                <img className="cart" src={Cart} onClick={this.gotoBasket} />
                <div style={{ marginRight: "80px" }}>
                    {this.state.products.map((prod, i) => (
                        <Product
                            key={i}
                            product={prod}
                            onPress={this.onClick}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default ProductList;
