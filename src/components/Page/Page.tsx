import Challenge from '../Challenge/Challenge.tsx'
import Solution from '../Solution/Solution.tsx'
import Comparison from '../Comparison/Comparison.tsx'
import StylesEditor from '../StylesEditor/StylesEditor.tsx';
import TitleBar from '../TitleBar/TitleBar.tsx';
import useRunnerStore from '../../utils/useRunnerStore.ts';
import styles from './Page.module.scss'


function Page() {
  const { isValidating } = useRunnerStore()

  return (
    <>
      <TitleBar />
      <div className={styles.layout}>
        <div className={styles.editorWindow}>
          <StylesEditor />
        </div>
        <div className={styles.challengeWindow}>
          <Challenge />
          <Solution />
          {isValidating && <Comparison />}
        </div>
      </div>
    </>
  )
}

export default Page
