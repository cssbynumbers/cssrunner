import styles from './TitleBar.module.scss'
import useRunnerStore from "../../utils/useRunnerStore";


const TitleBar = () => {
  const { validate, reset } = useRunnerStore();

  return (
    <div className={styles.titleBar}>
      <h3>CSS Runner</h3>
      <div className="controls">
        <button onClick={validate}>
          Validate Solution
        </button>
        <button onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default TitleBar;