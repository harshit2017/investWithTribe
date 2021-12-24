import Register from './components/Register'
import Togglable from './components/Togglable'
import { createUser } from './services/User'
import { Container, Button } from 'react-bootstrap'
import { useState } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'


const App = () => {


  const [user, setUser] = useState(null)
  const handleSignup = async (name, email, password, confirmPassword) => {
    try {
      const user = await createUser({ name, email, password })
      setUser(user)
    }
    catch (err) {
      setUser(null)
      // console.log(err.response.data.message)
      NotificationManager.error(err.response.data.message, 'Error');

    }

  }

  if (user) {
    // console.log(user)
    return (
      <Container fluid>
        <div className='text-center' style={{ position: 'absolute', top: '50%', left: '40%' }}>
          <h4>Account created successfully.</h4>
          <h5>Please check your inbox for Welcome mail</h5>
          <Button variant="primary" onClick={() => { setUser(null) }}>Home</Button>
        </div>
      </Container>)

  }

  return <Container fluid>
    <NotificationContainer />
    <Togglable>
      <Register handleSignup={handleSignup} />
    </Togglable>

  </Container>

}



export default App;
