'use client';

import Navbar from '../navbar';
import styles from './page.module.scss';
import Admin from './admin';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../../config';

interface AdminData {
  _id: string;
  name: string;
  username: string; // Added username field
  role: string;
}

export default function Home() {
  const router = useRouter();
  const [admins, setAdmins] = useState<AdminData[]>([]);

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

    const fetchAdmins = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/admins`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const data: AdminData[] = await response.json();
          setAdmins(data);
        } else {
          console.error('Failed to fetch admins');
        }
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    checkAuthentication().then(fetchAdmins);
  }, [router]);

  const handleEdit = (id: string) => {
    router.push(`/admin-portal/admins/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this admin?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${BASE_API_URL}/admin/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        console.log(`Admin ${id} deleted successfully.`);
        setAdmins((prevAdmins) =>
          prevAdmins.filter((admin) => admin._id !== id)
        );
        router.refresh();
      } else {
        console.error('Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleAddAdmin = () => {
    router.push('/admin-portal/admins/register');
  };

  const handleBack = () => {
    router.push('/admin-portal');
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.view}>
          <h2 className={styles.header}>Admins</h2>
          <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={handleBack}>Back</button>
            <button className={styles.addButton} onClick={handleAddAdmin}>Register New Admin</button>
          </div>
          {admins.length === 0 ? (
            <p className={styles.noAdmins}>No Admins</p>
          ) : (
            admins.map((admin) => (
              <Admin
                key={admin._id}
                title={admin.name}
                description={admin.username} // Use username for description
                onEdit={() => handleEdit(admin._id)}
                onDelete={() => handleDelete(admin._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
