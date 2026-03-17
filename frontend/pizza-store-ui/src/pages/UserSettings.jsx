import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import Navbar
import "../styles/userSettings.css";

function UserSettings(){

const username = sessionStorage.getItem("username");
const email = sessionStorage.getItem("email");

const [oldPassword,setOldPassword] = useState("");
const [newPassword,setNewPassword] = useState("");


// =============================
// CHANGE PASSWORD FUNCTION
// =============================

const handleChangePassword = async () => {

try{

const token = sessionStorage.getItem("token");

await axios.put(
"http://localhost:8081/api/user/change-password",
{
oldPassword,
newPassword
},
{
headers:{Authorization:`Bearer ${token}`}
}
);

alert("Password updated successfully");

setOldPassword("");
setNewPassword("");

}catch(error){

alert("Failed to update password");

}

};


return(

<div>

{/* ================= NAVBAR ================= */}
{/* Navbar stays fixed at the top */}
<Navbar/>

{/* 
IMPORTANT:
Navbar is fixed, so we push page content down
to avoid it hiding under navbar
*/}
<div style={{marginTop:"70px"}} className="settings-container">

<h2 className="settings-title">User Settings</h2>

<div className="settings-grid">


{/* ================= PROFILE CARD ================= */}

<div className="profile-card">

<h3>User Profile</h3>

<p><b>Name:</b> {username}</p>
<p><b>Email:</b> {email}</p>

</div>


{/* ================= CHANGE PASSWORD ================= */}

<div className="password-card">

<h3>Change Password</h3>

<input
type="password"
placeholder="Old Password"
value={oldPassword}
onChange={(e)=>setOldPassword(e.target.value)}
/>

<input
type="password"
placeholder="New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>

<button
className="update-btn"
onClick={handleChangePassword}
>
Update Password
</button>

</div>

</div>

</div>

</div>

)

}

export default UserSettings;