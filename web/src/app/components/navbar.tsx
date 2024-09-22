import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

        <div className={styles.hamburger} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        <ul className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              หน้าแรก
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/activities" className={styles.navLink}>
              กิจกรรม
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLink}>
              เกี่ยวกับเรา
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
