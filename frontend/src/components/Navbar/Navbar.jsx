import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div>
      <div className="navbar-container">
        <div>
          <h3>
            <Link to="/">Home</Link>
          </h3>
        </div>
        <div className="navbar-navigation">
          <nav>
            <h3>
              <Link to="/">Jogos ao vivo</Link>
            </h3>
          </nav>
        </div>
      </div>
    </div>
  )
}
export default Navbar
