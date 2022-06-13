import React from "react";
import axios from "axios";
import "./users.css";

export const Users = () => {


  const [users, setUsers] = React.useState<any>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<any>(null);
  const [searchText, setSearchText] = React.useState<any>("");

  const handleChange = ( ev:any) => {

    setSearchText(ev.target.value.toLowerCase())
    console.log(ev.target.value)
    filteredUsers(ev.target.value.toLowerCase())
  }

  const filteredUsers = async (text:any = searchText) => {

    const allUsers = await axios({
        method: "get",
        url: "/users",
        baseURL: "https://jsonplaceholder.typicode.com/",
      });
  
     
    
    const fusers = allUsers.data.filter((user:any)=> (user.username.toLowerCase().includes(text) || user.email.toLowerCase().includes(text) ))

    console.log(fusers, "alluserS");
    setUsers(fusers);
  };

//   const fetchUsers = async () => {
//     const allUsers = await axios({
//       method: "get",
//       url: "/users",
//       baseURL: "https://jsonplaceholder.typicode.com/",
//     });

//     console.log(allUsers, "alluserS");
//     setUsers(allUsers?.data);
//   };

  React.useEffect(() => {
   filteredUsers()
  }, []);

  React.useEffect(()=>{
  
  }, [users.length])

  return (
    <>
      <div className="container">
        <h2>Users list</h2>
<div className="form-style">


<input className = "search-box" onChange={handleChange} placeholder="Search by user name or email...." type = "text" value = {searchText} />

        <ol>
          {users.length ? (
            users.length &&
            users.map((user: any, index: any) => (
              <li onClick={() => {
                
                if(index == selectedIndex){

                    setSelectedIndex(null)
                }else{
                    setSelectedIndex(index)
                }
                
                
                }}>
              {user.name}  <span>{`@${user.username}`}</span>
               { 
              ( index == selectedIndex) &&
               <ul className="selected-index">
                  <li>Email:<span>{user.email}</span></li>
                  <li>Phone:<span>{user.phone}</span></li>
                  <li>Website:<span>{user.website}</span></li>
                </ul>
                
                
                }
              </li>
            ))
          ) : (
            <li>No Data Found</li>
          )}
        </ol>
        </div>
        
      </div>
    </>
  );
};
