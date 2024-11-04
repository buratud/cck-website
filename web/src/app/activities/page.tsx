import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import Banner from '@/app/components/banner';
import styles from './page.module.scss';
import Activity from './activity';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <Banner
        title="กิจกรรม"
        subtitle='รวมกิจกรรมของชมรม งานต่าง ๆ ที่เคยจัด'
        showButton={false}
      />

      <div className={styles.pageContainer}>
        <div className={styles.title2}>กิจกรรม</div>
        <div className={styles.view}>
          <Activity />
        </div>
      </div>

      <Footer />

    </div>
  );
}