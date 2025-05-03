import { useEffect, useMemo } from 'react';
import useRunnerStore from '../../utils/useRunnerStore';
import containerStyles from './container.module.scss'
import styles from './Challenge.module.scss'

const Challenge = () => {
  const { challengeRef, challengeKey } = useRunnerStore();

  const randomStyles = useMemo(() => {
    const randomInt = Math.floor(Math.random() * Object.keys(styles).length);
    return styles[Object.keys(styles)[randomInt]]
  }, [challengeKey]);

  return (
    <div>
      <h3>Challenge</h3>  
      <div className={containerStyles.challengeContainer} ref={challengeRef}>
        <div className={randomStyles} />
      </div>
    </div>
  )
}

export default Challenge;