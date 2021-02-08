import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import productList from "./assets/data/list.js";
import Basket from "./components/Basket.js";
import ProductList from "./components/ProductList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: productList.map((prod) => ({ ...prod, amount: 1 })),
      selectedProducts: [],
    };
  }

  clickProduct = (prod, select) => {
    if (select) {
      let product = this.state.products.find((p) => p.id === prod.id);
      this.setState({
        selectedProducts: [...this.state.selectedProducts, { ...product }],
      });
    } else {
      let selectedProducts = this.state.selectedProducts.slice();
      selectedProducts.forEach((p, i) => {
        if (p.id === prod.id) {
          selectedProducts.splice(i, 1);
        }
      });
      let products = this.state.products.slice();
      products.forEach((p, i) => {
        if (p.id === prod.id) {
          p.selected = false;
        }
      });
      this.setState({ selectedProducts, products });
    }
  };

  placeOrder = () => {
    let products = this.state.products.slice();
    products.forEach((p, i) => {
      p.selected = false;
    });
    this.setState({ selectedProducts: [], products });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Route
            path="/"
            exact
            render={(props) => (
              <ProductList
                {...props}
                products={this.state.products}
                clickProduct={this.clickProduct}
              />
            )}
          />
          <Route
            path="/basket"
            render={(props) => (
              <Basket
                {...props}
                selectedProducts={this.state.selectedProducts}
                unselect={this.clickProduct}
                placeOrder={this.placeOrder}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
