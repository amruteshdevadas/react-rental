import logo from "./logo.svg";
import "./App.css";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductContext, { ProductProvider } from "./components/Productcontext";
function App() {
  console.log(ProductContext.productList);

  return (
    <div>
      <Router>
        <ProductProvider>
          <Navbar />
          <Switch>
            <Route path="/" exact={true}>
              <div className="container-fluid">
                <div className="row">
                  <Category />
                  <Products />
                </div>
              </div>
            </Route>
            <Route path="/cart" exact={true}>
              <Cart />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="/register" exact={true}>
              <Signup />
            </Route>
          </Switch>
        </ProductProvider>
      </Router>
    </div>
  );
}

export default App;
