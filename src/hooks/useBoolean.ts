import {useCallback, useState, useRef} from 'react'

const useBoolean = (initialState: boolean | (() => boolean) = false) => {
    const [value, setValue] = useState(initialState)
    const valueSwitch = useRef({
      on: useCallback(() => setValue(true), []),
      off: useCallback(() => setValue(false), []),
      toggle: useCallback(() => setValue((v) => !v), []),
    }).current
    return [value, valueSwitch] as const
  }
  
  export default useBoolean