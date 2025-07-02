import React, { useEffect, useState } from 'react'
import { USERNAME,ROLE } from '../constants';
import api from '../api';
import { Navigate } from 'react-router-dom';
const AuthRedirectRoute = ({children}) => {
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
        else if(role==="USER") setRole("app");
    }catch(e){
      console.log("Found an Error : ",e); 
    }
  }

  return isAuthenticated?<Navigate to={`/${role}`}/>:children;
}

export default AuthRedirectRoute