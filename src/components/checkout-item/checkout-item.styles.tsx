import styled from "styled-components"

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`

export const ImageContainer = styled.div`
  width: 23%;

  img {
    width: calc(100% - 15px);
    height: 100%;
  }
`    
  
export const ProductName= styled.span`
  width: 23%;
`
  
export const ProductPrice = styled.span`
  width: 23%;
`

export const ProductQuantity = styled.div`
  width: 23%;
  display: flex;
`

export const ProductValue = styled.span`
  margin: 0 10px;
`

export const Arrow = styled.span`
  cursor: pointer;
`
  
export const RemoveButton = styled.span`
  padding-left: 12px;
  cursor: pointer;
`