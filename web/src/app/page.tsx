'use client';

import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import Placeholder from '@/app/components/placeholder';
import Banner from '@/app/components/banner';
import styles from './page.module.scss';

export default function Home() {
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
          <Placeholder
            title="ComDay 2024 is now open for registration!"
            description="This is the description for placeholder 1."
            imgsrc='/image.jpg'
            showButton={true}
            buttonLink='/'
            buttonText='Learn More'
          />
          <Placeholder
            title="Title 2"
            description="This is the description for placeholder 2."
            imgsrc='/image.jpg'
            showButton={true}
            buttonLink='/'
            buttonText='Learn More'
          />
          <Placeholder
            title="Title 3"
            description="This is the description for placeholder 3."
            imgsrc='/image.jpg'
            showButton={true}
            buttonLink='/'
            buttonText='Learn More'
          />
          <Placeholder
            title="Title 4"
            description="This is the description for placeholder 4."
            imgsrc='/image.jpg'
            showButton={true}
            buttonLink='/'
            buttonText='Learn More'
          />
        </div>
      </div>

      <Footer />

    </div>
  );
}