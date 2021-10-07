import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import RestBanner from '../RestBanner'
import RestItem from '../RestItem'
import './index.css'

class RestaurantDetailsRoute extends Component {
  state = {restDetails: [], status: ''}

  componentDidMount() {
    this.specificRestCall()
  }

  specificRestCall = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({status: 'loading'})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const convertedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(each => ({
          cost: each.cost,
          foodType: each.food_type,
          id: each.id,
          imageUrl: each.image_url,
          name: each.name,
          rating: each.rating,
        })),
      }

      this.setState({restDetails: convertedData, status: 'success'})
    } else {
      this.setState({status: 'failure'})
    }
  }

  onLoading = () => (
    <div className="loaderBg1">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  onFailure = () => (
    <div className="failBg1">
      <img
        src="https://i.postimg.cc/kXcrNy1x/Layer-1-1.png"
        className="failImg1"
        alt="not found"
      />
      <h1 className="failHead1">Page Not Found</h1>
      <p className="failPara1">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
    </div>
  )

  onSuccess = () => {
    const {restDetails} = this.state
    const {foodItems} = restDetails
    return (
      <>
        <div className="eachRestDetailsBg1">
          <RestBanner items={restDetails} />
          <ul className="itemsMainBg">
            {foodItems.map(each => (
              <li className="eachFoodCard">
                <RestItem items={each} key={each.id} />
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  funCall = () => {
    const {status} = this.state
    switch (status) {
      case 'loading':
        return this.onLoading()
      case 'failure':
        return this.onFailure()
      case 'success':
        return this.onSuccess()
      default:
        return null
    }
  }

  render() {
    const {restDetails} = this.state
    const {foodItems} = restDetails
    if (foodItems === undefined) {
      return null
    }

    return (
      <>
        <Header />
        {this.funCall()}
      </>
    )
  }
}

export default RestaurantDetailsRoute
