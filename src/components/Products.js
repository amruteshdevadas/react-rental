import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ProductContext from "./Productcontext";

function Products(props) {
  const productContext = useContext(ProductContext);
  
  useEffect(async () => {
    try {
      let product = await axios
        .get("https://rentalshop.herokuapp.com/products/getproducts")
        .then((response) => {
          // console.log(response.data)
          productContext.setProductList(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function handleAdd(obj) {
    // console.log(obj);
    let cartItem = {
      _id: obj._id,
      productName: obj.productName,
      sellingPrice: obj.sellingPrice,
      quantity: 1,
      image:obj.image
    };
    try {
      await axios
        .post(
          "https://rentalshop.herokuapp.com/users/cart",
          {cartItem},
          {
            headers: {
              Authorization: window.localStorage.getItem("app_token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="col">
      <div className="row">
        {productContext.productList.map((item) => {
          return (
            <div className="col-12 col-md-6 col-lg-4" key={item._id}>
              <div className="card">
                <img
                  className="card-img-top"
                  src={item.image}
                  alt="Card image cap"
                  width="200"
                  height="200"
                />
                <div className="">
                  <h6 className="">{item.productName}</h6>
                  <p className="fs-6">{item.productDescription}</p>
                  <h4 className="card-body">${item.sellingPrice}</h4>
                </div>
                <div className="col">
                  <button
                    href="#"
                    className="btn btn-success btn-block mb-3"
                    onClick={() => {
                      handleAdd(item);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
