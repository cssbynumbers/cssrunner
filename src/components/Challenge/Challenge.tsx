import { type Ref } from 'react';
import styles from './Challenge.module.scss'

const Challenge = ({ ref }: { ref: Ref<HTMLDivElement> }) => {
  return (
    <div className={styles.challengeContainer}>
      <h3>Challenge</h3>  
      <div className={styles.challenge} ref={ref}>
        <div className={styles.challengeOne} />
        <div className={styles.challengeTwo} />
        <div className={styles.challengeThree} />
      </div>
    </div>
  )
}

export default Challenge;