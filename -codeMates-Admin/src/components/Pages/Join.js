import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Header from "../main components/Header";
import Footer from "../footer";
const Join = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/signin");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    
    <section className="hero has-background-grey-light is-fullheight is-fullwidth"><Header></Header>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Register} className="box">
                <p className="has-text-centered">{msg}</p>
                <div className="field mt-5">
                  <label className="label"><strong>Name</strong></label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      name="username"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label"><strong>Email</strong></label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field mt-5">
                  <label className="label"><strong>Password</strong></label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      name="password"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label"><strong>Confirm Password</strong></label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      name="cPassword"
                      placeholder="******"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </section>
  );
};
export default Join;
