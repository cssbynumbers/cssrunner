import useRunnerStore from '../../utils/useRunnerStore';
import styles from './Challenge.module.scss'

const Challenge = () => {
  const { challengeRef } = useRunnerStore();

  return (
    <div className={styles.challengeContainer}>
      <h3>Challenge</h3>  
      <div className={styles.challenge} ref={challengeRef}>
        <div className={styles.challengeOne} />
        <div className={styles.challengeTwo} />
        <div className={styles.challengeThree} />
      </div>
    </div>
  )
}

export default Challenge;