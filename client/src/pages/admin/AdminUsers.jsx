import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../../Style/AdminUsers.css';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'user', password: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchUsers();
      } catch (err) {
        console.error(err);
        alert("Failed to delete user.");
      }
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, phone: user.phone, role: user.role, password: '' });
    setEditingId(user._id);
  };

  const handleCancelEdit = () => {
    setFormData({ name: '', email: '', phone: '', role: 'user', password: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/users/update/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`http://localhost:5000/api/users/add`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchUsers();
      setFormData({ name: '', email: '', phone: '', role: 'user', password: '' });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save user.");
    }
  };

  return (
    <motion.div
      className="admin-users"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {editingId ? "Edit User" : "Add New User"}
      </motion.h2>

      <motion.form
        className="user-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required type="email" />
        <input placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
        <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" required={!editingId} />
        <button type="submit">{editingId ? "Update" : "Add User"}</button>
        {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
      </motion.form>

      <motion.h2
        style={{ marginTop: '2rem' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        All Users
      </motion.h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <motion.table
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <motion.tr
              key={user._id}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
};
