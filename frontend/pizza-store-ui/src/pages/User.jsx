import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/UserProfile.css";

function User(){

const navigate = useNavigate();

const name = sessionStorage.getItem("name");
const email = sessionStorage.getItem("email");

const logout = () => {

sessionStorage.clear();

navigate("/");

};

return(

<div className="user-page">

<h2>User Profile</h2>

<p><strong>Name:</strong> {name}</p>

<p><strong>Email:</strong> {email}</p>

<div className="user-buttons">

<button onClick={()=>navigate("/change-password")}>
Change Password
</button>

<button onClick={logout}>
Logout
</button>

</div>

<Navbar/>

</div>

)

}

export default User;