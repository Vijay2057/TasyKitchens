import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import RestaurantDetailsRoute from './components/RestaurantDetailsRoute'
import KitchenContext from './context/KitchenContext'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class App extends Component {
  state = {cartList: [], isHomeClicked: true, isCartClicked: false}

  onAddToCart = items => {
    this.setState(previous => ({cartList: [...previous.cartList, items]}))
  }

  increaseItems = id => {
    const {cartList} = this.state
    const newCartList = cartList.map(each => {
      if (each.id === id) {
        return {
          cost: each.cost,
          foodType: each.foodType,
          id: each.id,
          imageUrl: each.imageUrl,
          name: each.name,
          quantity: each.quantity + 1,
          rating: each.rating,
        }
      }
      return each
    })

    this.setState({cartList: newCartList})
  }

  decreaseItems = id => {
    const {cartList} = this.state

    const newCartList = cartList.map(each => {
      if (each.id === id) {
        console.log(each.quantity)
        if (each.quantity - 1 > 0) {
          return {
            cost: each.cost,
            foodType: each.foodType,
            id: each.id,
            imageUrl: each.imageUrl,
            name: each.name,
            quantity: each.quantity - 1,
            rating: each.rating,
          }
        }
        return null
      }

      return each
    })

    const newCartList1 = newCartList.filter(each => each !== null)

    this.setState({cartList: newCartList1})
  }

  isHomeClickedFun = () => {
    this.setState({isHomeClicked: true, isCartClicked: false})
  }

  isCartClickedFun = () => {
    this.setState({isHomeClicked: false, isCartClicked: true})
  }

  clearCart = () => {
    this.setState({cartList: []})
    this.isHomeClickedFun()
  }

  render() {
    const {cartList, isHomeClicked, isCartClicked} = this.state

    return (
      <BrowserRouter>
        <KitchenContext.Provider
          value={{
            cartList,
            onAddToCart: this.onAddToCart,
            increaseItems: this.increaseItems,
            decreaseItems: this.decreaseItems,
            isHomeClicked,
            isCartClicked,
            isHomeClickedFun: this.isHomeClickedFun,
            isCartClickedFun: this.isCartClickedFun,
            clearCart: this.clearCart,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantDetailsRoute}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </KitchenContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
