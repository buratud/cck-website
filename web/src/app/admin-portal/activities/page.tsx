'use client';

import Navbar from '../navbar';
import styles from './page.module.scss';
import Activity from './activities';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../../config';

interface ActivityData {
  _id: string;
  name: string;
  description: string;
  images: string[];
}

export default function Home() {
  const router = useRouter();
  const [activities, setActivities] = useState<ActivityData[]>([]);

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

    const fetchActivities = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/activities`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const data: ActivityData[] = await response.json();
          setActivities(data);
        } else {
          console.error('Failed to fetch activities');
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    checkAuthentication().then(fetchActivities);
  }, [router]);

  const handleEdit = (id: string) => {
    router.push(`/admin-portal/activities/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this activity?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${BASE_API_URL}/activity/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        console.log(`Activity ${id} deleted successfully.`);

        // Update the activities state to remove the deleted activity
        setActivities((prevActivities) =>
          prevActivities.filter((activity) => activity._id !== id)
        )
        // Fallback refresh to ensure data is accurate
        router.refresh();

      } else {
        console.error('Failed to delete activity');
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleAddActivity = () => {
    router.push('/admin-portal/activities/add');
  };

  const handleBack = () => {
    router.push('/admin-portal');
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.view}>
          <h2 className={styles.header}>Activities</h2>
          <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={handleBack}>Back</button>
            <button className={styles.addButton} onClick={handleAddActivity}>Add Activity</button>
          </div>
          {activities.length === 0 ? (
            <p className={styles.noActivities}>No Activities</p>
          ) : (
            activities.map((activity) => (
              <Activity
                key={activity._id}
                title={activity.name}
                description={activity.description}
                onEdit={() => handleEdit(activity._id)}
                onDelete={() => handleDelete(activity._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
