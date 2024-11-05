'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "./navbar.module.scss";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      router.push('/admin-login');
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              src="/CCK_normal_circle.png"
              alt="Computer Club Logo"
              width={50}
              height={50}
              className={styles.logoImage}
            />
          </Link>
          <div className={styles.logoText}>
            <span className={styles.clubName}>Computer Club</span>
            <span className={styles.universityName}>KMUTNB</span>
          </div>
        </div>

        <div className={styles.hamburger} onClick={toggleMenu} role="button" aria-label="menu">
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        <ul className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
          <li className={styles.navItem}>
            <button onClick={handleLogout} className={styles.navLink}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
