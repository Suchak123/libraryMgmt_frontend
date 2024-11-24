import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/login.module.css";
// import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ userEmail: "", userPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9000/users/userLogin";
      const response = await axios.post(url, formData, {
        "Content-Type": "application/json",
      });
        if(response.data.token){
            console.log(response.data.token);
            localStorage.setItem("token", response.data.token);
           
            navigate("/dashboard");
        } else{
            throw new Error("No token returned from server")
        }
        
    } catch (error) {
      console.log("Error", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error);
        setError(error.response.data.Message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="userEmail"
              onChange={handleChange}
              value={formData.userEmail}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="userPassword"
              onChange={handleChange}
              value={formData.userPassword}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Login
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Register here</h1>
          <Link to="/register">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;