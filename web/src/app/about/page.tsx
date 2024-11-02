'use client';

import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import AboutPlaceholder from '@/app/components/about_placeholder';
import Banner from '@/app/components/banner'; // Import the PageCover component
import styles from './page.module.scss';

export default function About() {
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

          <p className={styles.description}>
            ชมรมคอมพิวเตอร์ KMUTNB มุ่งมั่นที่จะสร้างสรรค์ชุมชนของคนที่หลงใหลในเทคโนโลยีและมีความปรารถนาที่จะใช้มันเพื่อสร้างการเปลี่ยนแปลงในทางที่ดี มาร่วมกับเราเพื่อสำรวจ เรียนรู้ และเติบโตทักษะด้านเทคโนโลยีของคุณให้ก้าวไกลไปพร้อมกับพวกเรา!
          </p>
          <p className={styles.description}>
            Facebook: Computer Club KMUTNB <br />
            Instagram: @comclub_kmutnb
          </p>

        <div className={styles.title2}>อาจารย์ที่ปรึกษาชมรม</div>
        <div className={styles.headview}>
          <AboutPlaceholder
            title="ศ.ดร. ณชล ไชยรัตนะ"
            description="อาจารย์ที่ปรึกษา"
            email="nachol.c@eng.kmutnb.ac.th"
            imgsrc='https://ece.eng.kmutnb.ac.th/en/wp-content/uploads/2023/08/อ.ณชล.png'
          />
        </div>
        <div className={styles.title2}>คณะกรรมการชมรม</div>
        <div className={styles.view}>
          <AboutPlaceholder
            title="นายชัยภัทร พันธุ์ประเสริฐ"
            description="ประธานชมรมคอมพิวเตอร์"
            email="s6501012620063@email.kmutnb.ac.th"
            imgsrc='https://1drv.ms/i/s!AqackJQOQ0zzg7dTgvmAk-bU1Esphw?embed=1&width=160&height=200'
          />
          <AboutPlaceholder
            title="นายชนาธิป ยอดเขื่อง"
            description="รองประธานชมรมคอมพิวเตอร์"
            email="s6501012620055@email.kmutnb.ac.th"
            imgsrc='https://1drv.ms/i/s!AqackJQOQ0zzg7dUQqpXbum0UvdwUA?embed=1&width=160&height=200'
          />
          <AboutPlaceholder
            title="นายคุณาพจน์ สุทธินนท์"
            description="เลขาธิการ"
            email="s6501012630034@email.kmutnb.ac.th"
            imgsrc='https://1drv.ms/i/s!AqackJQOQ0zzg7dZ2LVPAXVD4mufSw?embed=1&width=160&height=200'
          />
          <AboutPlaceholder
            title="นายณัฐกานต์	คุ้มสุภา"
            description="เหรัญญิก"
            email="s6501012630093@email.kmutnb.ac.th"
            imgsrc='https://1drv.ms/i/s!AqackJQOQ0zzg7da_qsmcYtlFPyRWA?embed=1&width=160&height=200'
          />
          <AboutPlaceholder
            title="นายภูมินทร์	สิทธิวรานนท์"
            description="ประสานงานภายใน"
            email="s6501012620098@email.kmutnb.ac.th"
            imgsrc='https://1drv.ms/i/s!AqackJQOQ0zzg7dXSxc9CiUl2RJcRQ?embed=1&width=160&height=200'
          />
          <AboutPlaceholder
            title="นายฐาปณวัฒน์ ม่วงศรี"
            description="ประสานงานภายนอก"
            email="s6501012620071@email.kmutnb.ac.th"
            imgsrc='https://1drv.ms/i/s!AqackJQOQ0zzg7dWjroOui8MTDS5uw?embed=1&width=160&height=200'
          />
          <AboutPlaceholder
            title="นายภูตะวัน จันทร์เรือง"
            description="ประชาสัมพันธ์"
            email="s6501012630140@email.kmutnb.ac.th"
            imgsrc='https://1drv.ms/i/s!AqackJQOQ0zzg7db6QkLUTXr4teYxg?embed=1&width=160&height=200'
          />
          <AboutPlaceholder
            title="นายสิรภพ	จอมปินตา"
            description="กรรมการ"
            email="s6501012620101@email.kmutnb.ac.th"
            imgsrc='https://1drv.ms/i/s!AqackJQOQ0zzg7dYtTMq4zrigoFwHQ?embed=1&width=160&height=200'
          />
          <AboutPlaceholder
            title="นายบุรธัช ทำบุญ"
            description="กรรมการ"
            email="s6501012610076@email.kmutnb.ac.th"
            imgsrc='https://1drv.ms/i/s!AqackJQOQ0zzg7dVnQS9P8n3sl_EfQ?embed=1&width=160&height=200'
          />
        </div>
      </div>

      <Footer />

    </div>
  );
}