import React from "react";
import { useContext,useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router";
import axios from "axios";
import Message from './Message'


function Signup() {
  let history = useHistory();

  const initialValues = { name: "", email: "", password: ""};
  const [message, setMessage] = useState('')
  const [ShowMessage, setShowMessage] = useState(false)
  const [variant, setvariant] = useState("alert alert-primary")


  const validate = (values) => {
    // console.log(values)
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  async function handleSubmit(obj, onSubmitProps) {
    // obj.preventDefault()
    // let newUser = obj;
    let newUser =
    {
      userName : obj.name,
      email :obj.email,
      password : obj.password,
    }
   ;
    console.log(newUser);

    try {
      await axios
        .post(`http://localhost:5000/users/register`, {newUser
        })
        .then((response) => {
          console.log(response.data);
          setShowMessage(true)
          setvariant("alert alert-success")
          setMessage(response.data.message)
          setTimeout(() => {
          history.push("/");
          onSubmitProps.resetForm();
          }, 1500);
        });
    } catch (error) {
      console.log(error);
      setShowMessage(true)
       setvariant("alert alert-danger")
       setMessage(error.response.data.message)
    }
  }

  return (
    <>
{ ShowMessage ? <Message variant={variant} message={message}/> : null}
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
                  Sign Up
                </h1>
              </div>
              <div className="container">
                <Form>
                  {/* <div className="row"> */}
                  <div className="col-lg-12">
                    <label className="fw-bold">Name</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="name"
                    ></Field>
                    <ErrorMessage name="name">
                      {(error) => <h6 className="link-danger">{error}</h6>}
                    </ErrorMessage>
                  </div>
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
                  <div className="col-lg-12">
                    <label className="fw-bold">Confirm Password</label>
                    <Field
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                    ></Field>
                    <ErrorMessage name="confirmPassword">
                      {(error) => <h6 className="link-danger">{error}</h6>}
                    </ErrorMessage>
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary mt-3 mb-3 text-center"
                    />
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

export default Signup;
