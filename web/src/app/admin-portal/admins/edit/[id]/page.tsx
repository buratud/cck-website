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
  const [initialUsername, setInitialUsername] = useState(''); // Store initial username separately
  const [role, setRole] = useState('');
  const [oldPassword, setOldPassword] = useState('');
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
          const admin = data.find((admin: { _id: string }) => admin._id === id);
          if (admin) {
            setName(admin.name);
            setUsername(admin.username);
            setInitialUsername(admin.username); // Set initial username for validation
            setRole(admin.role);
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

    if (!name || !username || !role || !oldPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Step 1: Validate the old password using the initially fetched username
    try {
      const loginResponse = await fetch(`${BASE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: initialUsername, // Use initialUsername for validation
          password: oldPassword,
        }),
      });

      if (!loginResponse.ok) {
        setError("Incorrect old password.");
        return;
      }

      // Step 2: Update admin details if the password validation succeeded
      const updateRequestBody = {
        name,
        username,
        role,
        password: oldPassword, // Send the current password as required in the update
      };

      const updateResponse = await fetch(`${BASE_API_URL}/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(updateRequestBody),
      });

      if (updateResponse.ok) {
        setSuccess("Admin details updated successfully!");
        setTimeout(() => {
          router.push('/admin-portal/admins/');
        }, 1000);
      } else {
        const errorData = await updateResponse.json();
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

          <label className={styles.label}>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Enter Password to change:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
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
