import CodeMirror from '@uiw/react-codemirror';
import {sass} from "@codemirror/lang-sass"
import useRunnerStore from '../../utils/useRunnerStore';

const StylesEditor = () => {
  const { styles, updateStyles } = useRunnerStore();

  return (
    <CodeMirror value={styles} theme={"dark"} height="95vh" extensions={[sass()]} onChange={updateStyles} />
  );
}

export default StylesEditor;