import React from 'react'

const KitchenContext = React.createContext({
  cartList: [],
  onAddToCart: () => {},
})

export default KitchenContext
