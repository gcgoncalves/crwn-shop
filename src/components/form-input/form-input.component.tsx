import React, { ChangeEventHandler } from 'react'
import './form-input.styles.scss'

type Props = {
  name?: string,
  label?: string,
  value?: any,
  type?: string
  required?: boolean,
  onChange?: ChangeEventHandler,
}

export default function FormInput(
  {
    name,
    label,
    value,
    type='text',
    required = false,
    onChange = () => {},
  }: Props,
) {
  return (
    <div className='group'>
      <input 
        className='form-input'
        name={ name } 
        value={ value } 
        type={ type || 'text' } 
        required={ required }
        onChange={ onChange } 
      />
      { label && 
        <label 
          className={`${value.length? 'shrink' : ''} form-input-label`} 
          htmlFor={ name }
        >
          { label }
        </label> 
      }
    </div>
  )
}