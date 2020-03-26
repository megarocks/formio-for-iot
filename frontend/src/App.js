import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom'
import DeviceLibraryScreen from './DeviceLibraryScreen'
import LocalizationScreen from './LocalizationScreen'

export const DeviceDefinitionContext = React.createContext()

function App() {
  const history = useHistory()
  const location = useLocation()

  const onNavChange = (selectedKey) => history.push(selectedKey)

  return (
    <Container fluid>
      <Navbar>
        <Nav activeKey={location.href} onSelect={onNavChange}>
          <Nav.Item>
            <Nav.Link eventKey='/device-library'>Device Library</Nav.Link>
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
