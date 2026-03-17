import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/login.css";
import pizza from "../assets/pizza.jpg";

function Register(){

const navigate = useNavigate();
const [showPassword,setShowPassword] = useState(false);

const formik = useFormik({

initialValues:{
fullName:"",
email:"",
password:""
},

validationSchema:Yup.object({
fullName:Yup.string()
.min(3,"Minimum 3 characters")
.required("Name required"),
email:Yup.string()
.email("Invalid email")
.required("Email required"),
password:Yup.string()
.min(6,"Minimum 6 characters")
.required("Password required")
}),

onSubmit: async(values)=>{
try{
await registerUser(values);
alert("Registration Successful");
navigate("/");
}catch(error){
alert("Registration failed");
}
}
});

return(
<div className="login-page">
  <div className="login-container">

    <div className="login-card">
      <div className="login-header">

        {/* CHANGED: h1 → p to remove browser default heading margins */}
        <p className="logo">Welcome to Pizza Store!</p>

        <h2>Create your account</h2>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
        />
        {formik.touched.fullName && formik.errors.fullName &&
          <p className="error">{formik.errors.fullName}</p>
        }

        <input
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email &&
          <p className="error">{formik.errors.email}</p>
        }

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <span className="toggle" onClick={()=>setShowPassword(!showPassword)}>👁</span>
        </div>
        {formik.touched.password && formik.errors.password &&
          <p className="error">{formik.errors.password}</p>
        }

        <button type="submit" className="login-btn">Register</button>

        <p>Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>

    <div className="image-section">
      <img src={pizza} alt="pizza"/>
    </div>

  </div>
</div>
);
}

export default Register;
