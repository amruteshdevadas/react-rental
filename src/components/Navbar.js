import axios from "axios";
import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "./Productcontext";
import { useHistory } from "react-router";
function Navbar() {
  const [cartLength,setCartLength] =useState(0)
  let history = useHistory();
  const productContext = useContext(ProductContext);
const [product,setProduct]=useState("")
  
async function handleSubmit(e){
  e.preventDefault()
  console.log(product)

  if(product){
    var search = product   
   console.log(search)
 }
 else{
   search= null
 }
  try {
    await axios.get(`http://localhost:3001/products/searchInput/${search}`,)
    .then((response) => {
      console.log(response.data.productList);
      productContext.setProductList(response.data.productList);
      
    });
  } catch (error) {
    console.log(error);
  }
}

const logout = ()=>{
  history.push("/");
  window.localStorage.removeItem("app_token")
}

  return (
    <div>
      <nav className="navbar navbar-light  bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand">Rental Cart</a>
          <form className="d-flex justify-content-around" onSubmit={handleSubmit}>
            <input
              className="form-control me-2 mx-3"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={e=>setProduct(e.target.value)}
              value={product}
            />

            <button className="btn btn-warning" type="submit">
              Search
            </button>
            <Link className="btn btn-success btn-sm ml-3 mx-3" to="/cart">
              <i className="fa fa-shopping-cart"></i> Cart
              <span className="badge badge-dark">{cartLength}</span>
            </Link>
            <Link className="btn btn-warning" to="/login">
              Login
            </Link>
            <button  className="btn btn-warning" onClick={logout}>
              Logout
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
