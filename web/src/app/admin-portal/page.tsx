'use client';

import Navbar from './navbar';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BASE_API_URL } from '../config';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      let accessToken = sessionStorage.getItem('access_token');
      const refreshToken = sessionStorage.getItem('refresh_token');

      // If no access token, try to refresh
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

            // Optionally, update refresh_token if the API provides a new one
            if (data.refresh_token) {
              sessionStorage.setItem('refresh_token', data.refresh_token);
            }
          } else {
            // If refresh token request fails, redirect to login
            router.push('/');
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
          router.push('/');
        }
      } else if (!accessToken) {
        // If neither access token nor refresh token is available, redirect to login
        router.push('/');
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.view}>
          <h2 className={styles.header}>Admin Portal</h2>
          <div className={styles.buttonContainer}>
            <button
              className={styles.actionButton}
              onClick={() => router.push('/admin-portal/announcements')}
            >
              Announcements
            </button>
            <button
              className={styles.actionButton}
              onClick={() => router.push('/admin-portal/activities')}
            >
              Activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
