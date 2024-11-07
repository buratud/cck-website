'use client';

import Navbar from '../../../navbar';
import styles from './page.module.scss';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, FormEvent } from 'react';
import { BASE_API_URL } from '../../../../config';

export default function EditAnnouncement() {
  const router = useRouter();
  const { id } = useParams(); // Using dynamic routing to capture the announcement ID
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/announcement/${id}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setDescription(data.description);
        } else {
          setError("Failed to fetch announcement details.");
        }
      } catch (error) {
        console.error('Error fetching announcement:', error);
        setError("An error occurred while fetching announcement details.");
      }
    };

    fetchAnnouncement();
  }, [id]);

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
    formData.append('description', description); // Save description as Markdown
    formData.append('erased', 'false');
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch(`${BASE_API_URL}/announcement/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccess("Announcement updated successfully!");
        setTimeout(() => {
          router.push('/admin-portal/announcements/');
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update announcement.");
      }
    } catch (error) {
      console.error('Error updating announcement:', error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.fullPage}>
        <h2 className={styles.header}>Edit Announcement</h2>
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

          <button type="submit" className={styles.submitButton}>Save Changes</button>
        </form>
        <button className={styles.backButton} onClick={() => router.push('/admin-portal/announcements/')}>Back</button>
      </div>
    </div>
  );
}