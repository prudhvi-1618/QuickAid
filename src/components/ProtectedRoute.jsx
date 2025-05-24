import React, { useEffect, useState } from 'react'
import { USERNAME,ROLE } from '../constants';
import api from '../api';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {
  const [isAuthenticated,setIsAuthenticated] = useState(null);
  const [role,setRole] = useState('');
  useEffect(()=>{
    auth();
  },[])

  const auth = async ()=>{
    try{
      const username = localStorage.getItem(USERNAME)||'';
      const role = localStorage.getItem(ROLE)||'';
      if(username==='' || role==='') {
        setIsAuthenticated(false);
      }else{
        setIsAuthenticated(true);
      }
      if(role==="ADMIN") setRole("admin");
        else if(role==="DRIVER") setRole("driver");
        else setRole("app");
      
      // const res = await api.post("/auth/login-success",{
      //   username:username,
      //   role:role
      // })
      // console.log(res);
      
      // if(res.status===200){

      // }
      // console.log(username,role);
      
    }catch(e){
      console.log("Found an Error : ",e);
      
    }
  }

  if(isAuthenticated===null) return <div>loading...</div>
  const url_path = window.location.pathname.split('/')[1];
  
  let children_name = children.type.name;
  console.log(children_name);
  
  return isAuthenticated?(role===url_path?children:(children_name==="Login"||children_name==="Register")?<Navigate to={`/${role}`}/>:<div>your are Unauthorized to access the {url_path} Page</div>):<Navigate to="/login" />
}

export default ProtectedRoute