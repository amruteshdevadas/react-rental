import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchList = async () => {
    try {
      let product = await axios
        .get("https://rentalshop.herokuapp.com/users/usercart",{
          headers: {
            Authorization:window.localStorage.getItem("app_token")
          }
        })
        .then((response) => { 
            setCart(response.data.userCartList[0].products)
            setTotal(response.data.totalAmount)
        });
    } catch (error) {
      // console.log(error);
      setCart([])
    }
  };
  useEffect(async () => {
    fetchList();
  }, []);

  const handleAdd = async (e) => {
    let productId = e._id;
    {
      try {
        await axios
          .put(`https://rentalshop.herokuapp.com/users/addquantity`, { productId },{
            headers: {
              Authorization:window.localStorage.getItem("app_token")
            }
          })
          .then((response) => {
            console.log(response.data);
            if(response.data.totalAmount)
            {
              setTotal(response.data.totalAmount)
            }
            else{
              setTotal(0)
            }
            fetchList()
          });
          ;
          
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRemove = async (e) => {
 
    let productId = e._id;
    let quantity = e.quantity;
   
    try {
      await axios
        .delete(`https://rentalshop.herokuapp.com/users/deletequantity`,
        { 
          data:{ productId:productId, quantity:quantity },
          headers: {
            authorization:window.localStorage.getItem("app_token")
          }
        })
        .then((response) => {
          console.log(response.data);
          if(response.data.totalAmount)
            {
              setTotal(response.data.totalAmount)
            }
            else{
              setTotal(0)
            }
            fetchList()
        });

    } catch (error) {
      fetchList()
      // console.log(error);
    }
  };


  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
  async function displayRazorpay(e) {
    e.preventDefault()
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const result = await axios.post("https://rentalshop.herokuapp.com/payment/orders",{total});

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_x78awm3cqHdfCH", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Dummy Rental Shop",
        description: "Test Transaction",
        // image: { logo },
        order_id: order_id,


        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post("http://localhost:3001/payment/success", data);

            alert(result.data.msg);
        },
        prefill: {
            name: "Dummy",
            email: "Dummy@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Rental Shop",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

  return (
    <div>
      <div className="cart-wrap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="main-heading">Shopping Cart</div>
              <div className="table-cart">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {cart.length ? 
                    cart.map((item) => {
                      return (
                        <tr>
                          <td>
                            <div className="display-flex align-center">
                              <div className="img-product">
                                <img
                                  src={item.image}
                                  alt=""
                                  className="mCS_img_loaded"
                                />
                              </div>
                              <div className="name-product">
                                {item.productName}
                              </div>
                              <div className="price">{item.sellingPrice}</div>
                            </div>
                          </td>
                          <td className="product-count">
                            <div action="#" className="count-inlineflex">
                              <button
                                className=" btn btn-warning"
                                type="button"
                                onClick={() => {
                                  handleRemove(item);
                                }}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                name="quantity"
                                value={item.quantity}
                                className="qty"
                              />
                              <button
                                className="btn btn-success"
                                type="button"
                                
                                onClick={() => {
                                  handleAdd(item);
                                }}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="total">
                              ${(item.sellingPrice * item.quantity).toFixed(2)}
                            </div>
                          </td>
                        </tr>
                      );
                    }) : <h2> Cart is Empty..!! </h2>}
                  </tbody>
                </table>
              </div>
              {/* <!-- /.table-cart --> */}
            </div>
            {/* <!-- /.col-lg-8 --> */}
            <div className="col-lg-4">
              <div className="cart-totals">
                <h3>Cart Totals</h3>
                <form action="#" method="get" accept-charset="utf-8">
                  <table>
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td className="subtotal">${total.toFixed(1)}</td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td className="free-shipping">Free Shipping</td>
                      </tr>
                      <tr>
                        <td>GST</td>
                        <td className="free-shipping">18%</td>
                      </tr>
                      <tr className="total-row">
                        <td>Total</td>
                        <td className="price-total">${(total+(total*0.18)).toFixed(1)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="btn-cart-totals">
                    <button onClick={displayRazorpay}
                    
                    className="round-black-btn" 
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </form>
                {/* <!-- /form --> */}
              </div>
              {/* <!-- /.cart-totals --> */}
            </div>
            {/* <!-- /.col-lg-4 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
