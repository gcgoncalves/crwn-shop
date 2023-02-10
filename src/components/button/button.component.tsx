import { ButtonHTMLAttributes, ReactNode } from "react"
import './button.styles.scss'

type Props = {
  children: ReactNode,
  buttonType?: 'primary' | 'secondary' | 'inverted',
}

const BUTTON_TYPE_CLASSES = {
  primary: '',
  secondary: 'secondary-button',
  inverted: 'inverted-button',
} 

const Button = (
  {
    children,
    buttonType='primary',
  }: Props,
  otherProps: ButtonHTMLAttributes<HTMLElement>,
) => {
  return (
    <button 
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} 
      {...otherProps}
    >
      { children }
    </button>
  )
}
export default Button