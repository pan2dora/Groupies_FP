
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'


//Function that takes a element that will create my router
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/"  element={<Home/>} >
//       <Route path="/user-profile" element={<Profile/>} />
//     </Route>
//   )
// )



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
  
    <BrowserRouter>
    <App />
</BrowserRouter>
 
    
  </React.StrictMode>,
)