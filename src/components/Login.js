import React, { useState } from "react";
import User from "../services/User";

const Login = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onSubmit = (e) => {
    e.preventDefault();
 
    User
      .login(username, password)
      .then(() => {
          history.push(`/${username}/notes`);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      );
  };

  return (
    <div className="columns is-mobile is-centered"> 
      <div className="card column is-one-quarter mt-6 has-background-primary-light">
        <div className="card-header has-background-primary-dark">
          <h2 className="card-header-title has-text-white">Log in to your personal diary.</h2>
        </div>
        <div className="card-content">
          
          <form onSubmit={onSubmit}>
            {message && (
              <div className="notification is-danger is-light">
                {message}
              </div>
            )}

            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input 
                  className="input" 
                  name="username" 
                  type="text" 
                  placeholder="Username"
                  value={username}
                  onChange={onChangeUsername}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input 
                  className="input" 
                  name="password" 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={onChangePassword} 
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-fullwidth is-primary">
                  Login
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div> 
  );
};

export default Login;