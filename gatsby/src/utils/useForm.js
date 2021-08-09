import React, { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    let { value, name } = e.target;

    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValues({
      ...values,
      [name]: value,
    });
  }

  return { values, updateValue };
}
