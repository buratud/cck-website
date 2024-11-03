'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.scss";
import { useRouter } from "next/navigation";

// SHA-256
const hashedCode = "cc5ff57c097c54f7bccbcd1a42e919898909498501eb21a2e4c036160fd1dbc3";

const Footer: React.FC = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Function to hash the input code using SHA-256
    async function hashInput(input: string) {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }

    const handleDoubleClick = async () => {
        const secretCode = prompt("Enter the secret code:");
        if (!secretCode) return;

        // Log the original entered code for debugging
        //console.log("Entered code:", secretCode);

        const inputHash = await hashInput(secretCode);

        // Log the hash of the entered code for debugging
        //console.log("Hashed entered code:", inputHash);

        if (inputHash === hashedCode) {
            router.push("/admin-login");
        } else {
            setErrorMessage("Incorrect code. Try again.");
            setTimeout(() => setErrorMessage(null), 3000);
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Left Section - Logo and Club Text */}
                <div className={styles.leftSection}>
                    <Image
                        src="/CCK_normal_circle.png"
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
                    <p onDoubleClick={handleDoubleClick}>
                        © 2024-2025 Computer Club KMUTNB, All rights reserved.
                    </p>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </div>

                {/* Right Section - Social Media Icons */}
                <div className={styles.rightSection}>
                    <Link
                        href="https://www.facebook.com/ComClubKMUTNB"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/fb.png"
                            alt="Facebook"
                            width={27}
                            height={27}
                            className={styles.socialIcon}
                        />
                    </Link>
                    <Link
                        href="https://www.instagram.com/comclub_kmutnb/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/ig.png"
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
