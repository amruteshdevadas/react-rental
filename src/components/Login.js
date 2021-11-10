//react component for creating an user
//formik for vaildation
import React, { useContext,useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useHistory } from "react-router";
import axios from 'axios'
import { Link } from "react-router-dom";
import Message from './Message'
function Createuser() {

  let history = useHistory();

  const initialValues = { email: "", password: "" };
  const [message, setMessage] = useState('')
  const [ShowMessage, setShowMessage] = useState(false)
  const [variant, setvariant] = useState("alert alert-primary")

  const validate = (values) => {
    const errors = {};
    
    if (!values.password) {
      errors.city = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };
//function to called when submit is clicked or when the form is submitted
  async function handleSubmit(obj, onSubmitProps) {
    let userData = obj;
    // console.log();
    let email = userData.email
    let city = userData.password
  
     try {
      await axios.post(`https://rentalshop.herokuapp.com/users/login`, {userData
    })
    .then((response) => {
      console.log(response.data) ;
      window.localStorage.setItem("app_token",response.data.token)
      setShowMessage(true)
      setvariant("alert alert-success")
      setMessage("Loggged in Successfully")
      setTimeout(() => {
      history.push("/");
      onSubmitProps.resetForm();
      }, 1500);
    })
     } catch (error) {
       console.log(error)
       setShowMessage(true)
       setvariant("alert alert-danger")
       setMessage(error.response.data.message)
     }
   
  }

  return (
    <>{ ShowMessage ? <Message variant={variant} message={message}/> : null}
    
    <div className="row">
    <div className=" ms-auto mx-auto mt-3 card border-primary col-lg-4">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <div className="text-start">
          <div className=" col-lg-4">
            <h1 className="h3 mb-1 text-dark-1000 mt-3 text-center">
             Login
            </h1>
          </div>
          <div className="container">
            <Form>
              <div className="col-lg-12">
                <label className="fw-bold">Email</label>
                <Field
                  type="text"
                  className="form-control"
                  name="email"
                ></Field>
                <ErrorMessage name="email">
                  {(error) => <h6 className="link-danger">{error}</h6>}
                </ErrorMessage>
              </div>
              <div className="col-lg-12">
                <label className="fw-bold">Password</label>
                <Field
                  type="password"
                  className="form-control"
                  name="password"
                ></Field>
                <ErrorMessage name="password">
                  {(error) => <h6 className="link-danger">{error}</h6>}
                </ErrorMessage>
              </div>
              <div className="col-lg-12 d-flex justify-content-between ">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary mt-3 mb-3 text-center"
                />
                <Link to="/register" className="btn btn-primary mt-3 mb-3 text-center ">Sign Up </Link>
              </div>
              {/* </div> */}
            </Form>
          </div>
        </div>
      </Formik>
    </div>
    </div>
    </>
  );
}

export default Createuser;
