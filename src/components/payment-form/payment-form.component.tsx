import { 
  CardElement, 
  useElements, 
  useStripe, 
} from "@stripe/react-stripe-js"
import { StripeCardElement } from "@stripe/stripe-js"
import { FormEvent, FormEventHandler, useState } from "react"
import { useSelector } from "react-redux"
import { selectCartTotal } from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector"

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"
import { PaymentButton, PaymentFormContainer, StyledForm } from "./payment-form.styles"

export const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const cartTotal = useSelector(selectCartTotal)
  const currentUser = useSelector(selectCurrentUser)

  const [processingPayment, setProcessingPayment] = useState(false)
  
  const paymentHandler: FormEventHandler = async (e: FormEvent<Element>) => {
    e.preventDefault()

    if (!stripe || !elements) return;

    setProcessingPayment(true)
    const response = await fetch(
      '/.netlify/functions/create-payment-intent', 
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({amount: (cartTotal * 100)})
      }
    ).then(res => res.json())

    const clientSecret: string = response.paymentIntent?.client_secret
    const name = currentUser?.displayName ? currentUser.displayName : 'Guest'
    if (clientSecret) {
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
          billing_details: {
            name,
          }
        }
      })

      if (paymentResult.error) {
        alert(paymentResult.error.message)
      } else {
        alert('Payment Successful')
      }
    }

    setProcessingPayment(false)
  }

  return (
    <PaymentFormContainer onSubmit={ paymentHandler }>
      <StyledForm>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton 
          loading={processingPayment} 
          disabled={processingPayment} 
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay now
        </PaymentButton>
      </StyledForm>
    </PaymentFormContainer>
  )
}