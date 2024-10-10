import { HashRouter, Routes, Route } from "react-router-dom";
import ActivityList from "./components/activityList/ActivityList";
import AddActivityForm from "./components/addActivitiesForm/AddActivitiesForm";
import ActivityDetail from "./components/activityDetail/ActivityDetail";
import HomePage from "./components/homePages/HomePage";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import School from "./components/school/school";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { UserProvider } from "./components/userContext/UserContext";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUserWithToken } from "./components/auth/features/authAction";

const App = () => {
  const isAuthenticated = useAppSelector((store) => store.user.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserWithToken());

  }, [dispatch, isAuthenticated]);

  return (
      <UserProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/homePage" element={<HomePage />} />
              <Route path="/activityList" element={<ActivityList />} />
              <Route
                  path="/activityList/addActivity"
                  element={<AddActivityForm onSuccess={() => {}} />}
              />
              <Route path="/activityList/:id" element={<ActivityDetail />} />
              <Route path="/school" element={<ProtectedRoute component={<School />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<h1>Error 404 😵</h1>} />
            </Route>
          </Routes>
        </HashRouter>
      </UserProvider>
  );
};

export default App;
