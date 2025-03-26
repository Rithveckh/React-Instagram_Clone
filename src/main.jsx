import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import ViewStory from './ViewStory.jsx'

const router=createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>
    },
    {
      path:'/story/:id',
      element:<ViewStory/>
    }

  ]
)
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
