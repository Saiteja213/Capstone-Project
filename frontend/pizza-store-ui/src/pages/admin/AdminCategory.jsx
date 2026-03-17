import { useEffect, useState } from "react";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../../services/CategoryService";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/AdminMenu.css";

function AdminCategory(){

// ===============================
// STATE VARIABLES
// ===============================

const [categories,setCategories] = useState([]);
const [name,setName] = useState("");
const [editId,setEditId] = useState(null);
const [showForm,setShowForm] = useState(false);
const [search,setSearch] = useState("");


// ===============================
// LOAD CATEGORIES
// ===============================

useEffect(()=>{
 loadCategories();
},[]);


// ===============================
// FETCH CATEGORIES
// ===============================

const loadCategories = async()=>{

 try{

 const res = await getCategories();
 setCategories(res.data);

 }catch(error){

 console.error("Error loading categories:",error);

 }

};


// ===============================
// OPEN ADD FORM
// ===============================

const openAddForm = ()=>{

setName("");
setEditId(null);
setShowForm(true);

};


// ===============================
// ADD / UPDATE CATEGORY
// ===============================

const handleAddCategory = async()=>{

if(!name.trim()){
 alert("Category cannot be empty");
 return;
}

const category = {
 categoryName:name
};

try{

if(editId){

 await updateCategory(editId,category);

}else{

 await addCategory(category);

}

loadCategories();
setShowForm(false);

}catch(error){

console.error("Error saving category:",error);

}

};


// ===============================
// EDIT CATEGORY
// ===============================

const handleEdit = (cat)=>{

setName(cat.categoryName);
setEditId(cat.categoryId);
setShowForm(true);

};


// ===============================
// DELETE CATEGORY
// ===============================

const handleDelete = async(id)=>{

if(window.confirm("Delete this category?")){

await deleteCategory(id);
loadCategories();

}

};


// ===============================
// SEARCH FILTER
// ===============================

const filteredCategories = categories.filter(cat =>
cat.categoryName.toLowerCase().includes(search.toLowerCase())
);


// ===============================
// UI
// ===============================

return(

<div className="menu-container">

{/* HEADER */}

<div className="menu-header">

<h2 className="menu-title">Manage Categories</h2>

<div className="menu-actions">

<input
type="text"
placeholder="Search category..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<button className="add-btn" onClick={openAddForm}>
+ Add Category
</button>

</div>

</div>


{/* CATEGORY TABLE */}

<div className="menu-table">

<table>

<thead>

<tr>
<th>ID</th>
<th>Category Name</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{filteredCategories.map(cat =>(

<tr key={cat.categoryId}>

<td>{cat.categoryId}</td>

<td>{cat.categoryName}</td>

<td className="action-buttons">

<button
className="edit-btn"
onClick={()=>handleEdit(cat)}
>
<FaEdit/>
</button>

<button
className="delete-btn"
onClick={()=>handleDelete(cat.categoryId)}
>
<FaTrash/>
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>


{/* MODAL FORM */}

{showForm &&(

<div className="menu-modal">

<div className="menu-modal-content">

<h3>{editId ? "Edit Category" : "Add Category"}</h3>

<input
type="text"
placeholder="Category Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<button
className="edit-btn"
onClick={handleAddCategory}
>
{editId ? "Update Category" : "Add Category"}
</button>

<button
className="delete-btn"
onClick={()=>setShowForm(false)}
>
Cancel
</button>

</div>

</div>

)}

</div>

)

}

export default AdminCategory;