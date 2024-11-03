'use client';

import Navbar from '../../../navbar';
import styles from './page.module.scss';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, FormEvent } from 'react';
import { BASE_API_URL } from '../../../../config';

export default function EditAdmin() {
  const router = useRouter();
  const { id } = useParams(); // Capture the admin ID dynamically
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/admins`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Find the admin with the matching ID
          const admin = data.find((admin: { _id: string }) => admin._id === id);
          if (admin) {
            setName(admin.name);
            setUsername(admin.username);
          } else {
            setError("Admin not found.");
          }
        } else {
          setError("Failed to fetch admin details.");
        }
      } catch (error) {
        console.error('Error fetching admin:', error);
        setError("An error occurred while fetching admin details.");
      }
    };

    fetchAdminDetails();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !username || !oldPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    const requestBody = {
      name,
      username,
      oldPassword,
      newPassword,
    };

    try {
      const response = await fetch(`${BASE_API_URL}/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSuccess("Admin details updated successfully!");
        setTimeout(() => {
          router.push('/admin-portal/admins/');
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update admin details.");
      }
    } catch (error) {
      console.error('Error updating admin details:', error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.fullPage}>
        <h2 className={styles.header}>Edit Admin</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Re-enter New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className={styles.input}
          />

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <button type="submit" className={styles.submitButton}>Save Changes</button>
        </form>
        <button className={styles.backButton} onClick={() => router.push('/admin-portal/admins/')}>Back</button>
      </div>
    </div>
  );
}
