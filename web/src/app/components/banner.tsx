'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './banner.module.scss';

interface BannerProps {
  title: string;
  subtitle: string;
  showButton?: boolean;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, showButton = true }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };
    handleResize(); // Initialize on component mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.cover}>
      <div className={`${styles.content} ${isSmallScreen ? 'responsive-content' : ''}`}>
        <h1 className={`${styles.title} ${isSmallScreen ? 'responsive-title' : ''}`}>{title}</h1>
        <p className={`${styles.subtitle} ${isSmallScreen ? 'responsive-subtitle' : ''}`}>{subtitle}</p>
        {showButton && (
          <Link href="/about">
            <button className={styles.button}>เกี่ยวกับเรา</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Banner;
