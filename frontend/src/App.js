import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./Components/user/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import Setting from "./Components/SettingUser/Setting";
import Profile from "./Components/Profile/Profile";
import Signin from "./Components/user/Signin";


const PrivateRoute = ({ element }) => {
  const { successsignin } = useSelector((state) => state.user);

  if (!successsignin) {
    return <Navigate to="/signin" />;
  } else if (element.type === Signin || element.type === Auth) {
    return <Navigate to="/post" />;
  }

  return element;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Auth />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected routes */}
        <Route
          path="/post"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/setting"
          element={<PrivateRoute element={<Setting />} />}
        />
        <Route
          path="/:usernameprofile"
          element={<PrivateRoute element={<Profile />} />}
        />

        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

export default App;
