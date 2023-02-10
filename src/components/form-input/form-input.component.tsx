import React, { ChangeEventHandler, ComponentPropsWithoutRef } from 'react'
import './form-input.styles.scss'

interface Props extends ComponentPropsWithoutRef<"input"> {
  name?: string
  label?: string,
  value?: string,
}

export default function FormInput(
  props: Props,
) {
  const { name, label, value, ...otherProps } = props
  return (
    <div className='group'>
      <input 
        className='form-input'
        name={ name } 
        value={ value } 
        {...otherProps}
      />
      { label && 
        <label 
          className={`${value?.length? 'shrink' : ''} form-input-label`} 
          htmlFor={ name }
        >
          { label }
        </label> 
      }
    </div>
  )
}