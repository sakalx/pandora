import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {addQuery, getQueryHistory} from 'root/redux-core/actions/queries';
import {toggleAlert} from 'root/redux-core/actions/notification';

import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';

import {
  AddThemeBtn,
  AddThemeIcon,
  AddThemeSection,
} from './style';

class AddThemeField extends React.PureComponent {
  state = {
    newTheme: '',
    processingIntervalID: null,
    processingNewQuery: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevProcessingQuery = prevState.processingNewQuery;
    const nextProcessingQuery = nextProps.queries.processingNewQuery;

    if (prevState.processingIntervalID) {
      const prevHasDifference = prevProcessingQuery.filter(pre =>
        !nextProcessingQuery.some(next => pre.query_id === next.query_id)
      );

      if (prevHasDifference.length) {
        _alertQueryReady(prevHasDifference);

        if (!nextProcessingQuery.length) {
          return _clearTimer();
        }
      }
      return {
        ...prevState,
        processingNewQuery: nextProcessingQuery,
      }
    }
    return null;

    function _alertQueryReady(preHasDifference) {
      const titleAlert = 'Your new theme ready. ✨';
      const descriptionAlert = preHasDifference.map(({query}) => query).join('\r\n');

      nextProps.toggleAlert({titleAlert, descriptionAlert});
    }

    function _clearTimer() {
      clearInterval(prevState.processingIntervalID);
      return {
        ...prevState,
        processingNewQuery: [],
        processingIntervalID: null,
      }
    }
  }

  handleAddTheme = query => {
    const {addQuery, getQueryHistory, toggleAlert, user} = this.props;
    const {processingIntervalID} = this.state;

    const titleAlert = 'Request for new theme has been sent, to processing.';
    const descriptionAlert = 'Processing will start after 15 sec. We let you know when new theme finishes processing and will be ready.';

    addQuery(query, user._id);
    toggleAlert({titleAlert, descriptionAlert});

    !processingIntervalID &&
    this.setState({
      processingIntervalID: setInterval(getQueryHistory, 15000, user._id),
    });

    this.setState({newTheme: ''});
  };

  render() {
    const {newTheme} = this.state;

    return (
      <AddThemeSection>
        <AddThemeIcon color='action'/>
        <TextField fullWidth
                   id='add-new-theme'

                   label='Add new theme'
                   onChange={({target}) => this.setState({newTheme: target.value})}
                   value={newTheme}
        />
        <Zoom in={!!this.state.newTheme.length}>
          <AddThemeBtn aria-label='send-new-theme-btn'
                       color='primary'
                       mini
                       onClick={() => this.handleAddTheme(this.state.newTheme)}
                       variant='fab'>
            <AddIcon/>
          </AddThemeBtn>
        </Zoom>
      </AddThemeSection>
    )
  }
}

const mapStateToProps = ({queries, screen, userData: {user}}) => ({
  user,
  queries,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addQuery,
  getQueryHistory,
  toggleAlert,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddThemeField);