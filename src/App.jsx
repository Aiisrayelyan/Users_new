import { useState, useEffect } from 'react';
import './App.css';
import { AddUser } from './components/AddUser';
import { UserList } from './components/UserList';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3004/users").then(res => {
            setUsers(res.data);
        }).catch(err => {
            console.error(err);
            toast.error("Failed to fetch users");
        });
    }, []);

    const handleDelete = id => {
        axios.delete(`http://localhost:3004/users/${id}`).then(() => {
            setUsers(users.filter(user => user.id !== id));
            toast.success("User has been removed successfully");
        }).catch(err => {
            console.error(err);
            toast.error("Failed to delete user");
        });
    };

    const handleSalaryUp = user => {
        const updatedUser = { ...user, salary: user.salary + 50000 };
        axios.put(`http://localhost:3004/users/${user.id}`, updatedUser).then(() => {
            setUsers(users.map(u => u.id === user.id ? updatedUser : u));
            toast.success("User salary has been updated successfully");
        }).catch(err => {
            console.error(err);
            toast.error("Failed to update user salary");
        });
    };

    const addItem = obj => {
        setUsers([...users, obj]);
        toast.success("New user has been added successfully");
    }

    return (
        <div className='row'>
            <ToastContainer />
            <AddUser onAdd={addItem} />
            <UserList users={users} onDelete={handleDelete} onSalaryUp={handleSalaryUp} />
        </div>
    );
}

export default App;
