'use server';

import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import Placeholder from '@/app/components/placeholder';
import Banner from '@/app/components/banner';
import styles from './page.module.scss';
import Announcement from './announcement';

export default async function Home() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <Banner
        title="Computer Club KMUTNB"
        subtitle='"We are Changeing the world with technology." ~ Rookies111'
        showButton={true}
      />

      <div className={styles.pageContainer}>
        <div className={styles.title2}>Announcements</div>
        <div className={styles.view}>
          <Announcement />
        </div>
      </div>

      <Footer />

    </div>
  );
}