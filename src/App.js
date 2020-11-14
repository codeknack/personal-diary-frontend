import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import User from "./services/User";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AllNotes from "./components/views/AllNotes";
import AddNote from "./components/views/AddNote";
import EditNote from "./components/views/EditNote";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = User.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    User.logout();
  };

  return (
      <div>
        <nav className="navbar is-dark">
          <div className="navbar-brand">
            <div className="navbar-item">
              <span className="icon is-small mx-2">
                <i className="fas fa-address-book"></i>
              </span>
              Personal Diary
            </div>
          </div>

          {currentUser ? (
            <div className="navbar-end">
              <Link to={`/${currentUser.username}/notes`} className="navbar-item">
                <span className="icon is-small mr-2">
                  <i className="fas fa-file-alt"></i>
                </span>
                {currentUser.username}'s notes
              </Link>

              <Link to="/" className="navbar-item" onClick={logOut}>
                <span className="icon is-small mr-1">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                Logout
              </Link>
            </div>
            
          ) : (

            <div className="navbar-end">
              <Link to="/login" className="navbar-item">
                <span className="icon is-small mr-2">
                  <i className="fas fa-sign-in-alt"></i>
                </span>
                Login
              </Link>

              <Link to="/register" className="navbar-item">
                <span className="icon is-small mr-2">
                  <i className="fas fa-user-plus"></i>
                </span>
                Register
              </Link>
            </div>
          )}

        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/:username/notes" component={AllNotes} />
          <Route path="/:username/add" component={AddNote} />
          <Route path="/:username/edit/:id" component={EditNote} />
        </Switch>

      </div>
  );
}

export default App;
