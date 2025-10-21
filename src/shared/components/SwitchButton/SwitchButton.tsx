import styles from './styles.module.css';

type Props = {
  text: string;
};

const SwitchButton = (props: Props) => {
  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        <input type="checkbox" />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <p>{props.text}</p>
    </div>
  );
};

export default SwitchButton;
