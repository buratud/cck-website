'use client';

import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import Placeholder from '@/app/components/placeholder';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <div className={styles.pageContainer}>
        <div className={styles.view}>
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </div>
      </div>

      <Footer />
    </div>
  );
}
