import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/AdminSettings.css";

function AdminSettings(){

const [oldPassword,setOldPassword] = useState("");
const [newPassword,setNewPassword] = useState("");

const [admin,setAdmin] = useState({});


/* ============================= */
/* FETCH ADMIN PROFILE */
/* ============================= */

useEffect(()=>{

fetchAdminProfile();

},[]);

const fetchAdminProfile = async () => {

try{

const token = sessionStorage.getItem("token");

const res = await axios.get(
"http://localhost:8081/api/admin/users/profile",
{
headers:{Authorization:`Bearer ${token}`}
}
);

setAdmin(res.data);

}catch(error){

console.log("Error fetching profile",error);

}

};


/* ============================= */
/* CHANGE PASSWORD FUNCTION */
/* ============================= */

const handleChangePassword = async () => {

try{

const token = sessionStorage.getItem("token");

await axios.put(
"http://localhost:8081/api/admin/change-password",
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


/* ============================= */
/* UI */
/* ============================= */

return(

<div className="settings-container">

<h2 className="settings-title">Admin Settings</h2>

<div className="settings-grid">

{/* ============================= */}
{/* ADMIN PROFILE SECTION */}
{/* ============================= */}

<div className="profile-card">

<h3>Admin Profile</h3>

<p><b>Name:</b> {admin.fullName}</p>
<p><b>Email:</b> {admin.email}</p>
<p><b>Role:</b> {admin.role}</p>

</div>


{/* ============================= */}
{/* CHANGE PASSWORD SECTION */}
{/* ============================= */}

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

);

}

export default AdminSettings;