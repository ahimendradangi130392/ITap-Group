
import React from 'react';
import axios from 'axios';

export const Users = () => {


    const [users, setUsers] = React.useState<any>(false)

    const fetchUsers = async  () => {

    const allUsers =   await  axios({
            method: 'get',
            url: '/users',
             baseURL :'https://jsonplaceholder.typicode.com/'
          });

          console.log(allUsers,"alluserS")
          setUsers(allUsers?.data)

    }



    return <>
    
    <div>
  
        <button onClick={fetchUsers}>Getusers</button>


    </div>

    </>
}


