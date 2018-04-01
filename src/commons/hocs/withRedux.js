import { connect } from 'react-redux'

const withRedux = (mapStateToProps, WrappedComponent) =>
  connect(mapStateToProps)(WrappedComponent)

export default withRedux
