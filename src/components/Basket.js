import React from "react";
import SelectedProduct from "./SelectedProduct.js";

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //products:props.selectedProducts.map(e=>({...e})), //will give deep copy of the object
      products: props.selectedProducts.slice(), //will give shallow copy (we need that kind of copy,
      //so changing amount on the product will change the amount on the product in the parent)
      totalPrice: 0,
    };
  }
  componentDidMount() {
    this.calcPrice();
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.selectedProducts != this.props.selectedProducts) {
      this.setState({ products: this.props.selectedProducts });
    }
    if (prevState.products != this.state.products) {
      this.calcPrice();
    }
  }

  onMinusClick = (selectedProd) => {
    let products = this.state.products.slice();
    products.forEach((p) => {
      if (selectedProd.id === p.id) {
        p.amount = p.amount - 1;
        this.setState({ products });
        if (p.amount === 0) {
          this.props.unselect(p, false);
        }
      }
    });
  };

  onPlusClick = (selectedProduct) => {
    let products = this.state.products.slice();
    products.forEach((p) => {
      if (selectedProduct.id === p.id) {
        p.amount = p.amount + 1;
      }
    });
    this.setState({ products });
  };

  goBack = () => {
    this.props.history.push("/");
  };

  calcPrice = () => {
    let price = 0;
    this.state.products.forEach((p) => {
      price += p.price * p.amount;
    });
    this.setState({ totalPrice: price });
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <button className="btn btn-outline-primary" onClick={this.goBack}>
          Go To Product List
        </button>
        <div style={{ textAlign: "center" }}>
          <div className="basket">
            {this.state.products.length > 0 &&
              this.state.products.map((prod, i) => (
                <SelectedProduct
                  key={i}
                  product={prod}
                  onMinusClick={this.onMinusClick}
                  onPlusClick={this.onPlusClick}
                />
              ))}
            {this.state.products.length == 0 && (
              <p style={{ marginTop: "50px" }}>EMPTY BASKET</p>
            )}
          </div>
          <p>Total amount: {this.state.totalPrice} den</p>
          <button className="btn btn-primary" onClick={this.props.placeOrder}>
            PlaceOrder
          </button>
        </div>
      </div>
    );
  }
}

export default Basket;
