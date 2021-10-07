import {
  FaPinterestSquare,
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footerBg">
    <div className="footerLogoContainer">
      <img
        src="https://i.postimg.cc/QtpGwkdS/White-Logo.png"
        className="footerLogo"
        alt="website-footer-logo"
      />
      <h1 className="footerlogoName">Tasty Kitchens</h1>
    </div>
    <p className="footerPara">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="socialApps">
      <FaPinterestSquare
        className="socialLogo"
        data-testid="pintrest-social-icon"
      />
      <FaInstagram className="socialLogo" data-testid="instagram-social-icon" />
      <FaTwitter className="socialLogo" data-testid="twitter-social-icon" />
      <FaFacebookSquare
        className="socialLogo"
        data-testid="facebook-social-icon"
      />
    </div>
  </div>
)

export default Footer
