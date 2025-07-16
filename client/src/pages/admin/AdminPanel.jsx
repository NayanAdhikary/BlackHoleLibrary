import React from 'react';
import '../../Style/AdminPanel.css';
import { Link, Outlet } from 'react-router-dom';

export const AdminPanel = () => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/auth/admin">Dashboard</Link></li>
          <li><Link to="/auth/admin/users">Users</Link></li>
          <li><Link to="/auth/admin/books">Books</Link></li>
          <li><Link to="/auth/admin/rented-books">Rent Logs</Link></li>
          <li><Link to="/auth/admin/reviews">Reviews</Link></li>
          <li><Link to="/auth/admin/settings">Settings</Link></li>
        </ul>
      </aside>

      <main className="admin-main">
        <Outlet /> {/* ✅ Renders nested route components like AdminUsers */}
      </main>
    </div>
  );
};
