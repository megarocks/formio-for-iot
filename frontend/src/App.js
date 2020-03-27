import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom'
import DeviceLibraryScreen from './DeviceLibraryScreen'
import LocalizationScreen from './LocalizationScreen'
import CapabilityScreen from './CapabilityScreen'

export const Context = React.createContext()

function App() {
  const history = useHistory()
  const location = useLocation()

  const onNavChange = (selectedKey) => history.push(selectedKey)

  return (
    <Container fluid>
      <Navbar bg='light' className='m-3'>
        <Nav activeKey={location.pathname} onSelect={onNavChange}>
          <Nav.Item>
            <Nav.Link eventKey='/device-library'>Device Library</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='/capabilities'>Capabilities</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='/localization'>Localization</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Switch>
        <Route path='/device-library'>
          <DeviceLibraryScreen />
        </Route>
        <Route path='/capabilities'>
          <CapabilityScreen />
        </Route>
        <Route path='/localization'>
          <LocalizationScreen />
        </Route>
        <Redirect to="/device-library" />
      </Switch>
      <ToastContainer />
    </Container>
  )
}

export default App
