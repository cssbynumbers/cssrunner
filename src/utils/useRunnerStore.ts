import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { createRef, Ref } from 'react';

const challengeRef = createRef<HTMLDivElement>();
const solutionRef = createRef<HTMLDivElement>();

const defaultStylesValue = `/* Add your CSS here and see it reflected in the 'Solution' box. */

.solution {
  --color: green;
  --size: 20px;
  
  width: var(--size);
  height: var(--size);
  background-color: var(--color);
  position: relative;

  &:before, &:after {
    background-color: var(--color);
    content: "";
    display: block;
    position: absolute;
    top: 0;
    height: var(--size);
    width: var(--size);
  }
  
  &:before {
    --color: red;
    left: calc(0px - (var(--size) * 1.5));
  }

  &:after {
    --color: blue;
    right: calc(0px - var(--size) * 1.5)
  }
}`

interface RunnerState {
  challengeKey: number;
  challengeRef: Ref<HTMLDivElement>;
  solutionRef: Ref<HTMLDivElement>;
  isValidating: boolean;
  validate: () => void;
  reset: () => void;
  styles: string;
  updateStyles: (newStyles: string) => void;
}

const useRunnerStore = create<RunnerState>()(
  devtools(
    persist(
      (set, get) => ({
        challengeKey: 1,
        challengeRef: challengeRef,
        solutionRef: solutionRef,
        isValidating: false,
        validate: () => set(() => ({ isValidating: true }), undefined, 'validate'),
        reset: () => set(() => { console.clear(); return ({ challengeKey: get().challengeKey + 1, styles: defaultStylesValue, isValidating: false }) }, undefined, 'reset'),
        styles: defaultStylesValue,
        updateStyles: (newStyles) => set(() => ({ styles: newStyles }), undefined, 'update styles')
      }),
      {
        name: 'runner-store',
        partialize: (state) => ({ styles: state.styles }),
      },
    ),
  ),
)

export default useRunnerStore;