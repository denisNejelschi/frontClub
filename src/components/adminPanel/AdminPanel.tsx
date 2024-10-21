import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin/users">Manage Users</Link>
          </li>
          <li>
            <Link to="/admin/activities">Manage Activities</Link>
          </li>
          <li>
            <Link to="/admin/news">Manage News</Link>
          </li>
        </ul>
      </nav>
      
      {/* Здесь будет рендериться выбранный раздел */}
      <Outlet />
    </div>
  );
};

export default AdminPanel;