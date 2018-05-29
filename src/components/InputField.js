import React from 'react';

const InputField2 = ({
                      id,
                      label = '',
                      placeholder = '',
                      type = '',
                      value = '',
                      handleChange = () => null,
                    }) =>
  <FormGroup controlId={id} bsSize='large'>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
    />
  </FormGroup>;

const InputField = ({
                      id,
                      label = '',
                      placeholder = '',
                      type = '',
                      value = '',
                      handleChange = () => null,
                    }) =>
  <input id={id}
         type={type}
         value={value}
         onChange={handleChange}
         placeholder={placeholder}
  />;

export default InputField;