import React, { useState,useContext } from "react";
import axios from "axios";
import ProductContext from "./Productcontext";
function Category() {
  const productContext = useContext(ProductContext);
  
  const handleChange = async (e)=>{
 
if(e.target.checked){
     var search = e.target.name   
    console.log(search)
  }
  else{
    search= null
  }

    if(true){    
    try {
      await axios.get(`https://rentalshop.herokuapp.com/products/checkbox/${search}`,)
      .then((response) => {
        console.log(response.data.productList);
        let newproduct = response.data.productList
        productContext.setProductList(newproduct);

      });
    } catch (error) {
      console.log(error);
    }
  }
  }
  return (
    <div className="col-lg-3">
      <div className="card bg-light mb-3">
        <div className="card-header bg-primary text-white text-uppercase">
           Categories
        </div>
        <ul className="list-group category_block">
          <li className="list-group-item">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                name="Arts"
                
                onChange={e=>
                  handleChange(e)
                  }
                 
                  
              />
              <label className="form-check-label" for="flexCheckDefault">
                Arts and Crafts
              </label>
            </div>
          </li>
          <li className="list-group-item">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                
                name="Cellphones"
                onChange={(e)=>{
                handleChange(e)
                }}
              />
              <label className="form-check-label" for="flexCheckDefault">
                Cellphones and Accesories
              </label>
            </div>
          </li>
          <li className="list-group-item">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
               
                name="Electronics"
                onChange={(e)=>{
                  handleChange(e)
                  }}
              />
              <label className="form-check-label" for="flexCheckDefault">
                Electronics
              </label>
            </div>
          </li>
          <li className="list-group-item">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                
                name="Home"
                onChange={(e)=>{
                  handleChange(e)
                  }}
              />
              <label className="form-check-label" for="flexCheckDefault">
               Home And Kitchen
              </label>
            </div>
          </li>
          <li className="list-group-item">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                name="Toys"
                
                onChange={(e)=>{
                  handleChange(e)
                  }}
              />
              <label className="form-check-label" for="flexCheckDefault">
                Toys and Games
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Category;
