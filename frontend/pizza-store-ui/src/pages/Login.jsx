import { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/login.css";
import pizza from "../assets/pizza.jpg";

function Login(){

const navigate = useNavigate();
const [showPassword,setShowPassword] = useState(false);

const formik = useFormik({

initialValues:{
email:"",
password:""
},

validationSchema:Yup.object({
email:Yup.string()
.email("Invalid email format")
.required("Email required"),
password:Yup.string()
.min(6,"Minimum 6 characters")
.required("Password required")
}),

onSubmit: async(values)=>{
try{
const res = await loginUser(values);
const token = res.data.token;
sessionStorage.setItem("token",token);
const decoded = jwtDecode(token);
sessionStorage.setItem("email", decoded.sub);
sessionStorage.setItem("role", decoded.role);
sessionStorage.setItem("username", decoded.fullName);
if(decoded.role === "ADMIN"){
navigate("/admin/dashboard");
}else{
navigate("/home");
}
}catch(error){
alert("Login failed");
}
}
});

return(
<div className="login-page">
  <div className="login-container">

    <div className="login-card">
      <div className="login-header">

        {/* CHANGED: h1 → p to remove browser default heading margins */}
        <p className="logo">Craving Something?</p>

        <h2>Let's get started! Login</h2>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
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

        <button type="submit" className="login-btn">Login</button>

        <p>Don't have an account? <Link to="/register">SignUp</Link></p>
      </form>
    </div>

    <div className="image-section">
      <img src={pizza} alt="pizza"/>
    </div>

  </div>
</div>
);
}

export default Login;
