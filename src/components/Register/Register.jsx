import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
export default function Register() {
  let [errorMsg, setErrorMsg] = useState(null);
  let navigate = useNavigate();
  // function validation(form){
  //   let errors = {}
  //   //name
  //   if(!form.name)
  //   {
  //     errors.name = 'Name is required.'
  //   }
  //   else if(!/^[A-Za-z]+(?:[-'\s][A-Za-z]+)*$/.test(form.name))
  //   {
  //     errors.name = 'Invalid characters in name.'
  //   }
  //   //email
  //   if(!form.email)
  //   {
  //     errors.email = 'Email is required.'
  //   }
  //   else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email))
  //   {
  //     errors.email = 'Invalid email format.'
  //   }
  //   //phone
  //   if(!form.phone)
  //   {
  //     errors.phone = 'Phone is required.'
  //   }
  //   else if(!/^01[0-2|5][0-9]{8}$/.test(form.phone))
  //   {
  //     errors.phone = 'Invalid phone number format.'
  //   }
  //   //password
  //   if(!form.password)
  //   {
  //     errors.password = 'Password is required.'
  //   }
  //   else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?]{8,}$/.test(form.password))
  //   {
  //     errors.password = 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
  //   }
  //   //rePassword
  //   if(!form.rePassword)
  //   {
  //     errors.rePassword = 'Both password fields are required.'
  //   }
  //   else if(form.rePassword !== form.password)
  //   {
  //     errors.rePassword = 'Passwords do not match.'
  //   }
  //   return errors
  // }
  // yup validation
  let validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required.")
      .min(3, "Name must be more than 3 letters.")
      .max(10, "Name must be less than 10 letters")
      .matches(
        /^[A-Za-z]+(?:[-'\s][A-Za-z]+)*$/,
        "Invalid characters in name."
      ),
    email: yup
      .string()
      .required("Email is required.")
      .email("Invalid email format."),
    phone: yup
      .string()
      .required("Phone is required.")
      .matches(/^01[0-2|5][0-9]{8}$/, "Invalid phone number format."),
    password: yup
      .string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?]{8,}$/,
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character."
      ),
    rePassword: yup
      .string()
      .required("Both password fields are required.")
      .oneOf([yup.ref("password")], "Passwords do not match."),
  });
  async function handleRegister(values) {
    let toastId;
    try {
      toastId = toast.loading("Waiting...");
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      toast.dismiss(toastId);
      toast.success("User Created Successfully");
      if (data.message == "success") {
        navigate("/auth/login");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit: handleRegister,
    // validate:validation,
    validationSchema: validationSchema,
  });
  const [isEyeVisible1, setIsEyeVisible1] = useState(false); // State to track visibility
  const toggleIcon1 = () => {
    setIsEyeVisible1(!isEyeVisible1); // Toggle the state
  };
  const [isEyeVisible2, setIsEyeVisible2] = useState(false); // State to track visibility
  const toggleIcon2 = () => {
    setIsEyeVisible2(!isEyeVisible2); // Toggle the state
  };
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <>
    <Helmet>
      <title>Register</title>
    </Helmet>
    <form
      className="mx-auto text-center w-full lg:w-3/5 p-10"
      onSubmit={formik.handleSubmit}
    >
      <h3 className=" text-left text-2xl md:text-3xl lg:text-4xl my-3 text-[--main-color]">
        {" "}
        <i className="fa-regular fa-circle-user mr-3"></i>Register now
      </h3>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
          id="floating_name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent dark:text-gray-300 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer border-[--main-color] focus:border-[--main-color]"
          placeholder=" "
        />
        {formik.errors.name && formik.touched.name ? (
          <p className="text-red-600">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {formik.errors.name}
          </p>
        ) : null}
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 peer-focus:text-[--main-color] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent dark:text-gray-300 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer border-[--main-color] focus:border-[--main-color]"
          placeholder=" "
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="text-red-600">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {formik.errors.email}
          </p>
        ) : null}
        {errorMsg ? (
          <p className="text-red-600">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {errorMsg}
          </p>
        ) : null}
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 peer-focus:text-[--main-color] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          name="phone"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
          id="floating_phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent dark:text-gray-300 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer border-[--main-color] focus:border-[--main-color]"
          placeholder=" "
        />
        {formik.errors.phone && formik.touched.phone ? (
          <p className="text-red-600">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {formik.errors.phone}
          </p>
        ) : null}
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 peer-focus:text-[--main-color] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type={isEyeVisible1 ? "text" : "password"}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          id="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent dark:text-gray-300 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer border-[--main-color] focus:border-[--main-color]"
          placeholder=" "
        />
        <span
          onClick={toggleIcon1}
          className={`fa-regular cursor-pointer absolute right-0 top-4 text-[--main-color] ${
            isEyeVisible1 ? "fa-eye" : "fa-eye-slash"
          }`}
        ></span>
        {formik.errors.password && formik.touched.password ? (
          <p className="text-red-600">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {formik.errors.password}
          </p>
        ) : null}
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 peer-focus:text-[--main-color] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type={isEyeVisible2 ? "text" : "password"}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.rePassword}
          name="rePassword"
          id="floating_repassword"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent dark:text-gray-300 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer border-[--main-color] focus:border-[--main-color]"
          placeholder=" "
        />
        <span
          onClick={toggleIcon2}
          className={`fa-regular cursor-pointer absolute right-0 top-4 text-[--main-color] ${
            isEyeVisible2 ? "fa-eye" : "fa-eye-slash"
          }`}
        ></span>
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <p className="text-red-600">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {formik.errors.rePassword}
          </p>
        ) : null}
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 peer-focus:text-[--main-color] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm Password
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-[--main-color]  font-medium rounded-lg text-lg px-5 py-2.5 text-center active:scale-90"
      >
        Register
      </button>
      <p className='mt-3 font-semibold dark:text-gray-300'>Already have an account<Link to="/auth/login" className='text-[--main-color] ml-2 underline' >Log in</Link> </p>
    </form>
    </>
  );
}
