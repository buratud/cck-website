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
        title="สวัสดี! นี่คือหน้าทดสอบ"
        subtitle='"ปัญหามันคือปัญหารึเปล่า ขึ้นอยู่กับมึงจะมองว่ามันเป็นมั้ย" ~ Rookies111'
        showButton={true}
      />

      <div className={styles.pageContainer}>
        <div className={styles.view}>
          <Placeholder
            title="Rookies111 successfully launches Nuclear missile!"
            description="This is the description for placeholder 1."
            imgsrc='/image.jpg'
          />
          <Placeholder
            title="Is CCK a cult?"
            description="This is the description for placeholder 2."
            imgsrc='/image.jpg'
          />
          <Placeholder
            title="Do you know that CCK is funded by no one?"
            description="This is the description for placeholder 3."
            imgsrc='/image.jpg'
          />
          <Placeholder
            title="Our CEO got banned from the server!"
            description="This is the description for placeholder 4."
            imgsrc='/image.jpg'
          />
        </div>
      </div>

      <Footer />

    </div>
  );
}