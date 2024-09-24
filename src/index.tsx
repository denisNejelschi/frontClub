import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Auth from './components/auth/Auth';
import { UserProvider } from './components/userContext/UserContext'; 
import Layout from './components/layout/Layout';

import { Footer } from './components/footer/Footer';
import HomePage from './components/homePages/HomePage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Product from './components/product/Product';
import ProductList from './components/productCard/productList';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<Provider store={store}>
  <UserProvider>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
        <Route path='/login' element={<Auth />} />
        <Route path='/registration' element={<Auth />} />
        <Route path='/homePage' element={<HomePage />} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/productCard' element={<ProtectedRoute component={<ProductList />} />} />
        <Route path='/productCard/:id' element={<ProtectedRoute component={<Product />} />} />
        <Route path='*' element={<h1>Error 404 😵</h1>} />
        </Route>
      </Routes>
    </HashRouter>
  </UserProvider>

</Provider>
);