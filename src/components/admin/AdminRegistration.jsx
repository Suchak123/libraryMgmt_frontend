import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminRegistration = () => {
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        userRole: 'admin'
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await axios.post( 'http://localhost:9000/users/signupUser', formData)
           alert(response.data.message);
           
            
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed');

        }
    }


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <div className="register-title">
                    <h2 className='mb-3 text-primary'>Register as Admin</h2>

                    </div>
                   
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong >Name</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                className="form-control" 
                                id="exampleInputname" value={formData.userName}
                                onChange={handleChange}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                value={formData.userEmail}
                                onChange={handleChange}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                value={formData.userPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>User Role</strong>
                            </label>
                            <input
                            type="text"
                            name="userRole"
                            value="admin"
                            readOnly
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                    <p className='container my-2'>Already have an account ?</p>
                    <Link to='/login' className="btn btn-secondary">Login</Link>
                    <Link to='/register' className="btn btn-secondary">Register as User</Link>
                </div>
            </div>
        </div>
    )
}

export default AdminRegistration