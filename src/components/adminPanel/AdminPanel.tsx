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
          <li>
            <Link to="/admin/comments">Manage Comments</Link>
          </li>
          <li>
            <Link to="/admin/roles">Manage Roles</Link>
          </li>
          <li>
            <Link to="/admin/permissions">Manage Permissions</Link>
          </li>
          <li>
            <Link to="/admin/activitiesTypes">Manage Activities Types</Link>
          </li>
          <li>
            <Link to="/admin/activitiesStatuses">Manage Activities Statuses</Link>
          </li>
          <li>
            <Link to="/admin/activitiesCategories">Manage Activities Categories</Link>
          </li>
        </ul>
      </nav>
      
      {/* Здесь будет рендериться выбранный раздел */}
      <Outlet />
    </div>
  );
};

export default AdminPanel;