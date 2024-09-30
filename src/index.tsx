import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Auth from './components/auth/Auth';
import { UserProvider } from './components/userContext/UserContext'; 
import Layout from './components/layout/Layout';
import HomePage from './components/homePages/HomePage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Activity from './components/activity/Activity';


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
        <Route path='/homePage/:id' element={<HomePage />} />
        <Route path='/activityList/:id' element={<Activity />} />
        <Route path='/activity' element={<ProtectedRoute component={<Activity />} />} />
        <Route path='/activityCard' element={<ProtectedRoute component={<Activity />} />} />
        <Route path='/activityList' element={<ProtectedRoute component={<Activity />} />} />
        <Route path='/activity' element={<ProtectedRoute component={<Activity />} />} />
        <Route path='/activityList' element={<ProtectedRoute component={<Activity />} />} />
        <Route path='/activity/:id' element={<ProtectedRoute component={<Activity />} />} />
        <Route path='/activityCard' element={<ProtectedRoute component={<Activity />} />} />
        <Route path='/activityList' element={<ProtectedRoute component={<Activity />} />} />
        <Route path='/activityList/:id' element={<ProtectedRoute component={<Activity />} />} />
        <Route path='*' element={<h1>Error 404 😵</h1>} />
        </Route>
      </Routes>
    </HashRouter>
  </UserProvider>

</Provider>
);