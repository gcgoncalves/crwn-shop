import React, { ComponentPropsWithoutRef } from 'react'
import {
  Group,
  StyledLabel,
  StyledInput,
} from './form-input.styles'

export interface Props extends ComponentPropsWithoutRef<"input"> {
  name?: string
  label?: string,
  value?: string,
}

export default function FormInput(
  props: Props,
) {
  const { name, label, value, ...otherProps } = props
  return (
    <Group>
      <StyledInput 
        className='form-input'
        name={ name } 
        value={ value } 
        {...otherProps}
      />
      { label && 
        <StyledLabel 
          shrink={Boolean(
            value &&
              typeof value === 'string' &&
              value.length
          )}
          className={`${value?.length? 'shrink' : ''} form-input-label`} 
          htmlFor={ name }
        >
          { label }
        </StyledLabel> 
      }
    </Group>
  )
}