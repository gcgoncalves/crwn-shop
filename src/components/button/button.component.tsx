import { FC, ButtonHTMLAttributes } from "react"
import { 
  PrimaryButton, 
  SecondaryButton, 
  InvertedButton 
} from './button.styles'

export enum BUTTON_TYPE_CLASSES {
  primary = 'primary',
  secondary = 'secondary-button',
  inverted = 'inverted-button',
} 

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getButton = (buttonType = BUTTON_TYPE_CLASSES.primary): typeof PrimaryButton =>
  ({
    [BUTTON_TYPE_CLASSES.primary]: PrimaryButton,
    [BUTTON_TYPE_CLASSES.secondary]: SecondaryButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { buttonType, ...otherProps } = props
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton 
      {...otherProps}
    />
  )
}

export default Button