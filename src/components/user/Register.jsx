import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/signup.module.css";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9000/users/signupUser"; 
      const { data: res } = await axios.post(url, data);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/login");
    } catch (error) {
        console.error("Error: ", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } 
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Username"
              name="userName"
              onChange={handleChange}
              value={data.userName}
              className={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="userEmail"
              onChange={handleChange}
              value={data.userEmail}
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="userPassword"
              
              onChange={handleChange}
              value={data.userPassword}
              className={styles.input}
              required
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
