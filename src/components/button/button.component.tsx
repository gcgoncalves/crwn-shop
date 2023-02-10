import { ComponentPropsWithoutRef } from "react"
import './button.styles.scss'

interface Props extends ComponentPropsWithoutRef<"button"> {
  buttonType?: 'primary' | 'secondary' | 'inverted',
}

const BUTTON_TYPE_CLASSES = {
  primary: '',
  secondary: 'secondary-button',
  inverted: 'inverted-button',
} 

const Button = (props: Props) => {
  const { buttonType, ...otherProps } = props;
  return (
    <button 
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType || 'primary']}`} 
      {...otherProps}
    />
  )
}
export default Button