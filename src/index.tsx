import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { UserProvider } from "./components/userContext/UserContext";
import Layout from "./components/layout/Layout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ActivityList from "./components/activityList/ActivityList";
import HomePage from "./components/homePages/HomePage";
import School from "./components/school/school";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import AddActivityForm from "./components/addActivitiesForm/AddActivitiesForm";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <UserProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/activityList" element={<ActivityList />} />
            <Route
              path="/activityList/addActivity"
              element={
                <AddActivityForm
                  onSuccess={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
            <Route
              path="/school"
              element={<ProtectedRoute component={<School />} />}
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<h1>Error 404 😵</h1>} />
          </Route>
        </Routes>
      </HashRouter>
    </UserProvider>
  </Provider>
);
