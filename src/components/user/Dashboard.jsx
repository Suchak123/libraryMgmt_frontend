import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [err, setError] = useState("");
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token")
      if(!token){
        console.error("No token found, please log in");
        navigate("/login");
        return;
      }
      console.log("Sending request with token:", token);

      const response = await axios.get('http://localhost:9000/users/userDashboard', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      console.log("Response: ",response.data);

      if (response.data.success) {
        setBooks(response.data.books);
      } else {
        setError(response.data.message || "Failed to fetch books.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}

      {books.length > 0 ? (
        <ul>
        {books.map((book) => (
          <li key={book._id}>
            <img src={`http://localhost:9000${book.bookImage}`}  style={{ width: "100px", height: "150px" }}/>
            <a href="/dashboard">{book.bookName}</a>
           
          <br></br>
          </li>
        ))}
      </ul>
      ): (
        <p>No books available</p> 
      )
    }
      
    </div>
  );
};

export default Dashboard;
