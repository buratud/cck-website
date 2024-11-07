'use client';

import Navbar from '../../navbar';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect, useState, FormEvent } from 'react';
import { BASE_API_URL } from '../../../config';

export default function AddAnnouncement() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      let accessToken = sessionStorage.getItem('access_token');
      const refreshToken = sessionStorage.getItem('refresh_token');

      if (!accessToken && refreshToken) {
        try {
          const response = await fetch(`${BASE_API_URL}/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          if (response.ok) {
            const data = await response.json();
            accessToken = data.access_token;
            sessionStorage.setItem('access_token', data.access_token);

            if (data.refresh_token) {
              sessionStorage.setItem('refresh_token', data.refresh_token);
            }
          } else {
            router.push('/');
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
          router.push('/');
        }
      } else if (!accessToken) {
        router.push('/');
      }
    };

    checkAuthentication();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !description) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch(`${BASE_API_URL}/announcement`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccess("Announcement added successfully!");
        setName('');
        setDescription('');
        setFile(null);

        // Delay for 2 seconds before redirecting back
        setTimeout(() => {
          router.push('/admin-portal/announcements/');
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add announcement.");
      }
    } catch (error) {
      console.error('Error submitting announcement:', error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleBack = () => {
    router.push('/admin-portal/announcements/');
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.fullPage}>
        <h2 className={styles.header}>Add Announcement</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          
          <label className={styles.label}>Description (Markdown supported):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            placeholder="Enter description in Markdown format"
          ></textarea>
          
          <label className={styles.label}>Image File (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          
          <button type="submit" className={styles.submitButton}>Add Announcement</button>
        </form>
        <button className={styles.backButton} onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}
