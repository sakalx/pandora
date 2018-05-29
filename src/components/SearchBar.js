import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {addQuery, getQueryHistory} from '../redux-core/actions/queries';
import {navigate} from '../redux-core/actions/navigate';
import {screen} from '../redux-core/types';

class SearchBar extends React.PureComponent {
  state = {
    searchValue: '',
    processingNewQuery: [],
    processingIntervalID: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevProcessingQuery = prevState.processingNewQuery;
    const nextProcessingQuery = nextProps.queries.processingNewQuery;

    if (prevState.processingIntervalID) {
      const preHasDifference = prevProcessingQuery.filter(pre =>
        !nextProcessingQuery.some(next => pre.query_id === next.query_id)
      );

      if (preHasDifference.length) {
        _alertQueryReady(preHasDifference);

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
      preHasDifference.forEach(({query}) => alert(`Query: ${query} ready. ✨`));
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

  handleSubmit = query => {
    const {addQuery, getQueryHistory, user} = this.props;
    const {processingIntervalID} = this.state;

    const alertMsg = `
    Query ${query} has been sent.
    We let you know when query finished processing.
    `;

    addQuery(query, user._id);
    alert(alertMsg);

    !processingIntervalID &&
    this.setState({
      processingIntervalID: setInterval(getQueryHistory, 15000, user._id),
    });

    this.setState({
      searchValue: '',
    });
  };

  render() {
    const {navigate} = this.props;
    const {searchValue} = this.state;

    return (
      <div className='pageOne center option animated fadeIn'>
        <h3 className="name">{searchValue}</h3>
        <input
          className='searchBar'
          width='100%'
          value={searchValue}
          placeholder='Type your query'
          onChange={({target: {value}}) => this.setState({searchValue: value})}
        />
        <button className='searchBtn'
                onClick={() => this.handleSubmit(searchValue)}>
          Search
        </button>
        <div>
          <button className='advancedBtn'
                  onClick={() => navigate(screen.INTERNET_RESOURCES)}>
            Advanced Search
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({queries, screen, userData: {user}}) => ({
  screen,
  user,
  queries,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  navigate,
  addQuery,
  getQueryHistory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);