import { useState } from 'react'

export const useField = (name, type = 'text') => { 
  const [value, setValue] = useState('')

  const onChange = (event) => {
    if (type === 'file') {
      setValue(event.target.files[0])
    } else {
      setValue(event.target.value)
    }
  };

  const reset = () => {
    setValue(type === 'file' ? '' : '')
  };

  return {
    input: {
      name,
      value,
      onChange,
    },
    reset
  };
};
