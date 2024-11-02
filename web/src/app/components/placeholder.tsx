import React from 'react';
import styles from './placeholder.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface PlaceholderProps {
  title: string;
  description: string;
  imgsrc: string;
  showButton?: boolean;
  buttonLink?: string;
  buttonText?: string; // Optional prop for custom button text
}

const Placeholder: React.FC<PlaceholderProps> = ({ 
  title, 
  description, 
  imgsrc, 
  showButton = true, 
  buttonLink, 
  buttonText = 'Button' // Default button text
}) => {
  return (
    <div className={styles.container}>
      <Image
        src={imgsrc}
        width={0}
        height={0}
        sizes="100vw"
        alt="Placeholder"
        className={styles.image}
      />
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>
          {description}
        </p>
        {showButton && buttonLink && (
          <Link href={buttonLink} className={styles.button}>
            {buttonText} {/* Render the custom or default button text */}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Placeholder;
