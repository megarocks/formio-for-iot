import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom'
import DeviceLibraryScreen from './DeviceLibraryScreen'
import LocalizationScreen from './LocalizationScreen'
import CapabilityScreen from './CapabilityScreen'

// Context is used at react to pass data between component which work in same ... context
// https://reactjs.org/docs/context.html
export const Context = React.createContext()

// App mainly holds navigation, it could also hold logic for login flows
// react router is most common here
// https://reacttraining.com/react-router/web/guides/quick-start
// bootstrap is used for styling, somewhere directly via css classes
// somewhere, where JS interactivity is needed via bindings
// https://react-bootstrap.github.io/
// https://getbootstrap.com/docs/4.1/getting-started/introduction/

//state management is organized with two main approaches,
// when its helper data (not related to JSON configuration)
// react hooks are used: https://reactjs.org/docs/hooks-intro.html
// form data management is implemented with formik library:
// https://jaredpalmer.com/formik

// lodash get, set often used manipulate values in immutable fashion
// also to set or get deeply nested properties
// https://lodash.com/docs/4.17.15

// Selector functionality is used very intesivelly
// For it's purposes ReactSelect open-source component is utilized
// https://react-select.com/home

// often for useEffect running JSON.strigify values are used
// this approach gives capability to ensure, if value really changed
// effect will be called. So complex values are casted to string
// to be compared

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
        <Redirect to='/device-library' />
      </Switch>
      <ToastContainer />
    </Container>
  )
}

export default App
