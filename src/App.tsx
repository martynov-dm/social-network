import React from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import './App.css'
import Preloader from './components/common/preloader/preloader'

import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import UsersContainer from './components/Users/UsersContainer'
import { withSuspense } from './hoc/withSuspense'
import { initializeApp } from './redux/app/app.thunks'
import { AppStateType } from './redux/rootReducer'
import store from './redux/store'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const DialogsContainer = React.lazy(
  () => import('./components/Dialogs/Dialogs-Container')
)
const ProfileContainer = React.lazy(
  () => import('./components/Profile/ProfileContainer')
)

class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
          <Route
            path='/profile/:userId?'
            render={withSuspense(ProfileContainer)}
          />
          <Route
            exact
            path='/users'
            render={() => <UsersContainer pageTitle={'Samurai'} />}
          />
          <Route exact path='/login' render={() => <Login />} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

const MainApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <React.StrictMode>
          <AppContainer />
        </React.StrictMode>
      </Provider>
    </BrowserRouter>
  )
}

export default MainApp