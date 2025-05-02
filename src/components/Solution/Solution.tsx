import useRunnerStore from '../../utils/useRunnerStore';
import styles from './Solution.module.scss';

const Solution = () => {
  const { solutionRef } = useRunnerStore();

  return (
    <div>
      <h3>Solution</h3>
      <div className={styles.solution} ref={solutionRef}>
        <div className={styles.solutionOne} />
        <div className={styles.solutionTwo} />
        <div className={styles.solutionThree} />
      </div>
    </div>
  );
}

export default Solution;