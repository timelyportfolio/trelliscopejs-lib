import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Snackbar from 'material-ui/Snackbar';

import { setErrorMessage } from '../actions';

const ErrorSnack = ({ errorMsg, handleClose }) => (
  <Snackbar
    open={errorMsg !== ''}
    message={errorMsg}
    onRequestClose={handleClose}
    action="close"
    onActionTouchTap={handleClose}
    style={{
      position: 'absolute'
    }}
    bodyStyle={{
      paddingTop: 14,
      height: 'auto',
      lineHeight: 'normal'
    }}
  />
);

ErrorSnack.propTypes = {
  errorMsg: React.PropTypes.string,
  handleClose: React.PropTypes.func
};

// ------ static styles ------

// const staticStyles = {
//   overlay: {}
// };

// ------ redux container ------

const errorSelector = state => state.errorMsg;

const stateSelector = createSelector(
  errorSelector,
  errorMsg => ({
    errorMsg
  })
);

const mapStateToProps = state => (
  stateSelector(state)
);

const mapDispatchToProps = dispatch => ({
  handleClose: () => {
    dispatch(setErrorMessage(''));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((ErrorSnack));
