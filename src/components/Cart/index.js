import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import KitchenContext from '../../context/KitchenContext'

import './index.css'

class Cart extends Component {
  state = {isOrderPlaced: false}

  render() {
    return (
      <KitchenContext.Consumer>
        {value => {
          const {cartList, clearCart, increaseItems, decreaseItems} = value

          const placed = () => {
            this.setState({isOrderPlaced: true})
          }

          const onPlaceOrder = () => (
            <div className="NoOrdersContainer">
              <div className="placeOrderContainer">
                <img
                  src="https://i.postimg.cc/CKHkRbnB/Vector.png"
                  className="placeOrderImg"
                  alt="xx"
                />
                <h1 className="noOrdersHead">Payment Successful</h1>
                <p className="noOrdersPara">Thank you for ordering</p>
                <p className="noOrdersPara">
                  Your payment is successfully completed.
                </p>
                <Link to="/" className="linkClass">
                  <button
                    className="orderButton"
                    type="button"
                    onClick={clearCart}
                  >
                    Go To Home Page
                  </button>
                </Link>
              </div>
            </div>
          )

          const onNoOrders = () => (
            <div className="NoOrdersContainer">
              <img
                src="https://i.postimg.cc/SNwsqHPD/OBJECTS.png"
                className="noOrdersImg"
                alt="empty cart"
              />
              <h1 className="noOrdersHead">No Order Yet!</h1>
              <p className="noOrdersPara">
                Your cart is empty. Add something from the menu.
              </p>
              <Link to="/" className="linkClass">
                <button className="orderButton" type="button">
                  Order Now
                </button>
              </Link>
            </div>
          )

          const withOrders = () => {
            const {isOrderPlaced} = this.state
            let total1 = 0
            let total2 = 0

            return (
              <>
                <div className="cartContainer">
                  <div className="cartBg">
                    <ul className="cartHeadContainer">
                      <li className="cartHead">Item</li>
                      <li className="cartHead">Quantity</li>
                      <li className="cartHead">Price</li>
                    </ul>
                    {cartList.map(each => {
                      total1 += each.quantity * each.cost

                      const increaseItems1 = () => {
                        increaseItems(each.id)
                      }

                      const decreaseItems1 = () => {
                        decreaseItems(each.id)
                      }

                      return (
                        <li className="cartItemContainer">
                          <div className="foodItem">
                            <img
                              src={each.imageUrl}
                              className="foodItemImg"
                              alt="xyz"
                            />
                            <h1 className="cartItemName">{each.name}</h1>
                          </div>
                          <div className="foodItem111">
                            <button
                              type="button"
                              onClick={decreaseItems1}
                              data-testid="decrement-quantity"
                              className="buttonStyle"
                            >
                              -
                            </button>
                            <div
                              className="counter"
                              data-testid="item-quantity"
                            >
                              {each.quantity}
                            </div>
                            <button
                              type="button"
                              onClick={increaseItems1}
                              data-testid="increment-quantity"
                              className="buttonStyle"
                            >
                              +
                            </button>
                          </div>
                          <div className="foodItem">
                            <FaRupeeSign className="cartRupeeSign" />
                            <h1 className="cartPrice">
                              {each.cost * each.quantity}.00
                            </h1>
                          </div>
                        </li>
                      )
                    })}
                    <hr className="line" />
                    <div className="bottomLine">
                      <h1 className="totalOrder">Order Total: </h1>
                      <div className="buttonContainer">
                        <div className="bottomTotal">
                          <FaRupeeSign className="cartRupeeSignBlack" />
                          <h1 className="totalOrder1" data-testid="total-price">
                            {total1}.00
                          </h1>
                        </div>
                        <button
                          className="orderButton"
                          type="button"
                          onClick={placed}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mobileCartBg">
                    {cartList.map(each => {
                      total2 += each.quantity * each.cost

                      const increaseItems1 = () => {
                        increaseItems(each.id)
                      }

                      const decreaseItems1 = () => {
                        decreaseItems(each.id)
                      }

                      return (
                        <li className="cartItemContainer">
                          <img
                            src={each.imageUrl}
                            className="foodItemImg"
                            alt="xys"
                          />
                          <div>
                            <h1 className="cartItemName">{each.name}</h1>
                            <div className="buttonContainer1">
                              <button
                                type="button"
                                onClick={decreaseItems1}
                                data-testid="decrement-quantity"
                                className="buttonStyle"
                              >
                                -
                              </button>
                              <div
                                className="counter"
                                data-testid="item-quantity"
                              >
                                {each.quantity}
                              </div>
                              <button
                                type="button"
                                onClick={increaseItems1}
                                data-testid="increment-quantity"
                                className="buttonStyle"
                              >
                                +
                              </button>
                            </div>
                            <div className="buttonContainer1">
                              <FaRupeeSign className="cartRupeeSign" />
                              <h1 className="cartPrice">
                                {each.cost * each.quantity}.00
                              </h1>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                    <hr className="line" />
                    <div className="bottomLine">
                      <h1 className="totalOrder">Order Total: </h1>
                      <div className="buttonContainer">
                        <div className="bottomTotal">
                          <FaRupeeSign className="cartRupeeSignBlack" />
                          <h1 className="totalOrder1" data-testid="total-price">
                            {total2}.00
                          </h1>
                        </div>
                        <button
                          className="orderButton"
                          type="button"
                          onClick={placed}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <Footer />
              </>
            )
          }

          const afterNoOrders = () => {
            const {isOrderPlaced} = this.state
            return <>{isOrderPlaced ? onPlaceOrder() : withOrders(cartList)}</>
          }

          return (
            <>
              <Header />
              {cartList.length === 0 ? onNoOrders() : afterNoOrders(cartList)}
            </>
          )
        }}
      </KitchenContext.Consumer>
    )
  }
}

export default Cart
