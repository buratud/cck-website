import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Use next/image for optimised images
import styles from "./navbar.module.css";
import '../app/globals.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          {/* Logo and Text Container */}
          <div className={styles.logoContainer}>
            {/* Logo */}
            <Link href="/">
              <Image
                src="/CCK_normal_circle.png" // Replace with the actual path to your logo
                alt="Computer Club Logo"
                width={50}  // Adjust size based on your needs
                height={50}
                className={styles.logoImage}
              />
            </Link>
            {/* Text */}
            <div className={styles.logoText}>
              <span className={styles.clubName}>Computer Club</span>
              <span className={styles.universityName}>KMUTNB</span>
            </div>
          </div>

          {/* Hamburger */}
          <div className={styles.hamburger} onClick={toggleMenu}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>

          {/* Navigation Links */}
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