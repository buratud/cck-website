import React, { useState, useEffect } from 'react';
import styles from './about_placeholder.module.scss';

interface AboutPlaceholderProps {
    title: string;
    description: string;
    imgsrc: string;
    email: string;
}

const AboutPlaceholder: React.FC<AboutPlaceholderProps> = ({
    title,
    description,
    imgsrc,
    email
}) => {
    const [copied, setCopied] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 700);
        };
        handleResize(); // Check initially
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`${styles.container} ${isSmallScreen ? 'responsive-container' : ''}`}>
            <img
                src={imgsrc}
                alt="Placeholder"
                className={styles.image}
            />
            <div className={styles.textContainer}>
                <h2 className={`${styles.title} ${isSmallScreen ? 'responsive-title' : ''}`}>{title}</h2>
                <p className={`${styles.description} ${isSmallScreen ? 'responsive-description' : ''}`}>
                    {description}
                </p>
                <p
                    className={styles.email}
                    onClick={copyEmailToClipboard}
                >
                    {copied ? 'Copied!' : email}
                </p>
            </div>
        </div>
    );
};

export default AboutPlaceholder;
