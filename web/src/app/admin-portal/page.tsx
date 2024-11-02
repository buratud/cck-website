'use client';

import Navbar from './navbar';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      router.push('/');
    }
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
            <button
              className={styles.actionButton}
              onClick={() => router.push('/admin-portal/members')}
            >
              Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
