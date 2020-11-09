import React, { useState } from "react";
import User from "../services/User";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    User
      .register(username, email, password)
      .then((response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
  };

  return (
    <div className="columns is-mobile is-centered"> 
      <div className="card column is-one-quarter mt-6 has-background-primary-light">
        <div className="card-header has-background-primary-dark">
          <h2 className="card-header-title has-text-white">Register for your account.</h2>
        </div>
        <div className="card-content">
            <div className={ message ? "" : "is-hidden"}>
              <div className={ successful ? "notification is-success is-light" : "notification is-danger is-light" }>
                {message}
              </div>
            </div>

            <form className={ successful ? "is-hidden" : ""} onSubmit={onSubmit}>
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
                <label className="label">Email</label>
                <div className="control has-icons-left">
                  <input 
                    className="input" 
                    name="email" 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={onChangeEmail}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
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
                    Register
                  </button>
                </div>
              </div>
            </form>

        </div>
      </div>
    </div>  
  );
};

export default Register;