import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import AllProfiles from "./profiles/pages/AllProfiles";
import Users from "./user/pages/Users";
import ProfilesList from "./profiles/pages/ProfilesList";
import MainNav from "./shared/Navigation/MainNav";
import ProfilePage from "./profiles/pages/ProfilePage";
import NewProfile from "./profiles/pages/NewProfile";
import Auth from "./user/pages/Auth";
import { AuthProvider } from "./shared/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <MainNav />
        <Switch>
          <Route exact path="/">
            <AllProfiles />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/:id/profiles">
            <ProfilesList />
          </Route>
          <ProtectedRoute exact path="/profiles/new">
            <NewProfile />
          </ProtectedRoute>

          <Route path="/profiles/:id">
            <ProfilePage />
          </Route>

          <Route path="/auth">
            <Auth />
          </Route>
          <Redirect to="/auth" />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
