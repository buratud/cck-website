'use client';

import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import Placeholder from '@/app/components/placeholder';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <div className={styles.pageContainer}>
        <div className={styles.view}>
          <Placeholder
            title="Dynamic Title 1"
            description="This is the description for placeholder 1."
          />
          <Placeholder
            title="Dynamic Title 2"
            description="This is the description for placeholder 2."
          />
          <Placeholder
            title="Dynamic Title 3"
            description="This is the description for placeholder 3."
          />
          <Placeholder
            title="Dynamic Title 4"
            description="This is the description for placeholder 4."
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
