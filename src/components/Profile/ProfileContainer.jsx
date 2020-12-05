import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import {
  getStatus,
  getUserProfile,
  savePhoto,
  saveProfile,
  updateStatus,
} from '../../redux/profile/profile.thunks'

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  }
  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userId !== prevProps.match.params.userId)
      this.refreshProfile()
  }

  render() {
    return (
      <Profile
        isOwner={!this.props.match.params.userId}
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updatestatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
      />
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
})

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
