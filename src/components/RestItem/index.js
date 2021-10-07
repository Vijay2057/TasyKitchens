import {Component} from 'react'
import {FaStar, FaRupeeSign} from 'react-icons/fa'

import KitchenContext from '../../context/KitchenContext'
import './index.css'

class RestItem extends Component {
  state = {isAddClicked: false, quantity: 1}

  render() {
    const {items} = this.props
    const {isAddClicked, quantity} = this.state

    const each = {...items}

    return (
      <KitchenContext.Consumer>
        {value => {
          const {onAddToCart, increaseItems, decreaseItems} = value

          const onAddFun = () => {
            this.setState({
              isAddClicked: true,
            })
            onAddToCart({...each, quantity})
          }

          const onDecrement = () => {
            if (quantity > 0) {
              if (quantity - 1 === 0) {
                this.setState({
                  isAddClicked: false,
                })
                decreaseItems(each.id)
              } else {
                this.setState(previous => ({
                  quantity: previous.quantity - 1,
                }))
                decreaseItems(each.id)
              }
            }
          }

          const onIncrement = () => {
            this.setState(previous => ({
              quantity: previous.quantity + 1,
            }))
            increaseItems(each.id)
          }

          return (
            <>
              <img src={each.imageUrl} className="eachFoodCardImg" alt="xyz" />
              <div className="itemsContent">
                <h1 className="itemName">{each.name}</h1>
                <div className="itemRateContainer">
                  <FaRupeeSign className="itemRateImg" />
                  <p className="itemCost">{each.cost}.00</p>
                </div>

                <div className="itemStarContainer">
                  <FaStar className="itemStarImg" />
                  <p className="itemStarValue">{each.rating}</p>
                </div>
                {isAddClicked ? (
                  <div className="counterBg">
                    <button type="button" onClick={onDecrement}>
                      -
                    </button>
                    <div className="counter">{quantity}</div>
                    <button type="button" onClick={onIncrement}>
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="addButton"
                    onClick={onAddFun}
                    type="button"
                  >
                    Add
                  </button>
                )}
              </div>
            </>
          )
        }}
      </KitchenContext.Consumer>
    )
  }
}

export default RestItem
