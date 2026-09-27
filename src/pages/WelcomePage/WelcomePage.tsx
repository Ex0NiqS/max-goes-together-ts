import './WelcomePage.css'
import logo from '../../assets/logo.png'

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <div className="welcome-title-background" />

        <h1 className="welcome-title">Добро пожаловать!</h1>

        <p className="welcome-description">
          Это твой помощник в<br />
          поиске компании на<br />
          мероприятие
        </p>

        <img className="logo" src={logo} alt="" />

        <button className="welcome-button">
          <span className="welcome-button-text">Начать</span>
          <span className="welcome-button-arrow">›</span>
        </button>

        <p className="welcome-hint">
          Ответьте на несколько вопросов, чтобы<br />
          составить анкету
        </p>
      </div>
    </div>
  )
}

export default WelcomePage