import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Use next/image for optimised images
import styles from "./footer.module.css";
import '../app/globals.css';

const Footer: React.FC = () => {

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Left Section - Logo and Club Text */}
                <div className={styles.leftSection}>
                    <Image
                        src="/CCK_normal_circle.png" // Replace with the actual path to your logo
                        alt="Computer Club Logo"
                        width={35}
                        height={35}
                        className={styles.logoImage}
                    />
                    <div className={styles.logoText}>
                        <span className={styles.clubName}>Computer Club</span>
                        <span className={styles.universityName}>KMUTNB</span>
                    </div>
                </div>

                {/* Center Section - Copyright Text */}
                <div className={styles.centerSection}>
                    <p>© 2024-2025 Computer Club KMUTNB, All rights reserved.</p>
                </div>

                {/* Right Section - Social Media Icons */}
                <div className={styles.rightSection}>
                    <Link href="https://www.facebook.com/ComClubKMUTNB" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/fb.png" // Replace with actual path to your Facebook icon
                            alt="Facebook"
                            width={27}
                            height={27}
                            className={styles.socialIcon}
                        />
                    </Link>
                    <Link href="https://www.instagram.com/comclub_kmutnb/" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/ig.png" // Replace with actual path to your Instagram icon
                            alt="Instagram"
                            width={27}
                            height={27}
                            className={styles.socialIcon}
                        />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
