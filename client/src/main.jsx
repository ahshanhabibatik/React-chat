import React from 'react'
import ReactDOM from 'react-dom/client'
import Autthonicate from '../src/ContextHandler/AuthContext/Autthonicate'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import rout from './Rout/Rout'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Autthonicate>
      <RouterProvider router={rout}></RouterProvider>
    </Autthonicate>
  </React.StrictMode>,
)
