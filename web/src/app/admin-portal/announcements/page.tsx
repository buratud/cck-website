'use client';

import Navbar from '../navbar';
import styles from './page.module.scss';
import Announcement from './announcement';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../../config';

interface AnnouncementData {
  _id: string;
  name: string;
  description: string;
  images: string[];
}

export default function Home() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);

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

    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/announcements`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const data: AnnouncementData[] = await response.json();
          setAnnouncements(data);
        } else {
          console.error('Failed to fetch announcements');
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    checkAuthentication().then(fetchAnnouncements);
  }, [router]);

  const handleEdit = (id: string) => {
    router.push(`/admin-portal/announcements/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this announcement?');
    if (!confirmed) return;
  
    try {
      const response = await fetch(`${BASE_API_URL}/announcement/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
        },
      });
  
      if (response.ok) {
        console.log(`Announcement ${id} deleted successfully.`);
        
        // Update the announcements state to remove the deleted announcement
        setAnnouncements((prevAnnouncements) => 
          prevAnnouncements.filter((announcement) => announcement._id !== id)
        )
          // Fallback refresh to ensure data is accurate
        router.refresh();
  
      } else {
        console.error('Failed to delete announcement');
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };  

  const handleAddAnnouncement = () => {
    router.push('/admin-portal/announcements/add');
  };

  const handleBack = () => {
    router.push('/admin-portal');
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.view}>
          <h2 className={styles.header}>Announcements</h2>
          {announcements.length === 0 ? (
            <p className={styles.noAnnouncements}>No Announcements</p>
          ) : (
            announcements.map((announcement) => (
              <Announcement
                key={announcement._id}
                title={announcement.name}
                description={announcement.description}
                onEdit={() => handleEdit(announcement._id)}
                onDelete={() => handleDelete(announcement._id)}
              />
            ))
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.backButton} onClick={handleBack}>Back</button>
          <button className={styles.addButton} onClick={handleAddAnnouncement}>Add Announcement</button>
        </div>
      </div>
    </div>
  );
}
