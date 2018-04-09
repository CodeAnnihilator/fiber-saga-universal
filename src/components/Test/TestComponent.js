import React, { Component } from 'react'
// import { testSagaFunc } from '../../sagas/watchTestSaga.js'
import { getUser } from '../../actions/userActions.js'
import { connect } from 'react-redux'

class TestComponent extends Component {
  componentWillMount() {
    this.props.getUser()
  }
  render() {
    return (
      <div>
        <h1>TEST COMPONENT</h1>
      </div>
    )
  }
}

export default connect(null, {
  getUser
})(TestComponent)
