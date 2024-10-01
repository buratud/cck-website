import React, { useState } from 'react';
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

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);

        // Reset the copied state after a delay (e.g., 2 seconds)
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className={styles.container}>
            <img
                src={imgsrc}
                alt="Placeholder"
                className={styles.image}
            />
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>
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
