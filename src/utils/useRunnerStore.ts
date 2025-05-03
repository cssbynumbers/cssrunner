import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { createRef, Ref } from 'react';

const challengeRef = createRef<HTMLDivElement>();
const solutionRef = createRef<HTMLDivElement>();

const defaultStylesValue = `.solution {
  
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