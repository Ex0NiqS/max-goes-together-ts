import { useState } from 'react'
import FormPage from './pages/FormPage/FormPage'
import WelcomePage from './pages/WelcomePage/WelcomePage'

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return isFormOpen ? (
    <FormPage onBackToWelcome={() => setIsFormOpen(false)} />
  ) : (
    <WelcomePage onStart={() => setIsFormOpen(true)} />
  )
}

export default App