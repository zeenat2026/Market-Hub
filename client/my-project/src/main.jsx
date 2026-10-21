
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import  store  from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import Product from './pages/Product.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import {ProductDetails} from './pages/ProductDetails.jsx';
import CartPage from './pages/CartPage.jsx';
import Orders from './pages/Orders.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';


  const router=createBrowserRouter([{
    path:'/',
    element:<MainLayout />,
    children:[
   { index:true, element: <Product />
  },
   { path:'/register',element:<Register />,},
   {path:'/login', element:<Login />},
   {path:'/cart', element:<ProtectedRoute><CartPage /></ProtectedRoute>},
   {path:'/orders', element:<ProtectedRoute><Orders /></ProtectedRoute>},
   {path:'/product/:id', element:<ProductDetails />}
    ]
}])
  

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router} />
  
</Provider>
    
  
)
