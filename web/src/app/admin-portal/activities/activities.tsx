import styles from './activities.module.scss';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ActivitiesProps {
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Activities: React.FC<ActivitiesProps> = ({ title, description, onEdit, onDelete }) => {
  return (
    <div className={styles.activities}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.editButton}>
          <FaEdit /> Edit
        </button>
        <button onClick={onDelete} className={styles.deleteButton}>
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default Activities;
