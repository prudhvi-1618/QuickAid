import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import AdminLayout from './pages/AdminLayout.jsx'
import User from './pages/User.jsx'
import Banner from './components/Banner.jsx'
import TableData from './components/TableData.jsx'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import DriverForm from './components/DriverForm.jsx'
import AmbulanceForm from './components/AmbulanceForm.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Admin from './components/Admin.jsx'
import Driver from './components/Driver.jsx'
import DriverLayout from './pages/DriverLayout.jsx'
import AmbulanceList from './components/AmbulanceList.jsx'

import api from './api.js'

const Logout = ()=>{
  // const res = api.post("/logout");
  // if(res===200){
    localStorage.clear();
    return <Navigate to="/login" />
  // }else{
    // console.log(res.response.data);
    
  // }
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/app" element={
          <ProtectedRoute>
            <User/>
          </ProtectedRoute>
        }/>
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout/>
          </ProtectedRoute>
        } >
          <Route index element={<Admin/>} />
          <Route path="ambulance">
            <Route index element={<TableData type="ambulance"/>}/>
            <Route path="add/:id?" element={<AmbulanceForm/>}/>
          </Route>          
          <Route path="driver">
            <Route index element={<TableData type="driver"/>} />
            <Route path="add/:id?" element={<DriverForm/>}/>
          </Route>
        </Route>
        <Route path='/driver' element={ 
            <ProtectedRoute>
              <DriverLayout/>
            </ProtectedRoute>
        }>
        <Route index  element={ <AmbulanceList/> } />
        <Route path='alerts'  element={
            <ProtectedRoute>
              <Driver/>
            </ProtectedRoute>
        } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
