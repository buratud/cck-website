'use client';

import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import Placeholder from '@/app/components/placeholder';
import Banner from '@/app/components/banner'; // Import the PageCover component
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <Banner
        title="เกี่ยวกับเรา"
        subtitle='บอกให้เขารู้ว่าเราเป็นใคร'
        showButton={false}
      />

      <div className={styles.pageContainer}>
        <div className={styles.title2}>เกี่ยวกับเรา</div>
        <div className={styles.view}>
          <Placeholder
            title="นายชัยภัทร พันธุ์ประเสริฐ"
            description="ประธานชมรมคอมพิวเตอร์"
            imgsrc='/image.jpg'
          />
          <Placeholder
            title="นายชนาธิป ยอดเขื่อง"
            description="รองประธานชมรมคอมพิวเตอร์"
            imgsrc='/image.jpg'
          />
          <Placeholder
            title="นายคุณาพจน์ สุทธินนท์"
            description="เลขาธิการ"
            imgsrc='/image.jpg'
          />
          <Placeholder
            title="นายณัฐกานต์	คุ้มสุภา"
            description="เหรัญญิก"
            imgsrc='/image.jpg'
          />
          <Placeholder
            title="นายภูมินทร์	สิทธิวรานนท์"
            description="ประสานงานภายใน"
            imgsrc='/image.jpg'
          />
          <Placeholder
            title="นายฐาปณวัฒน์ ม่วงศรี"
            description="ประสานงานภายนอก"
            imgsrc='/image.jpg'
          />
          <Placeholder
            title="นายภูตะวัน จันทร์เรือง"
            description="ประชาสัมพันธ์"
            imgsrc='/image.jpg'
          />
          <Placeholder
            title="นายสิรภพ	จอมปินตา"
            description="กรรมการ"
            imgsrc='/image.jpg'
          />
        </div>
      </div>

      <Footer />

    </div>
  );
}