import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {screen} from '../redux-core/types';
import {navigate} from '../redux-core/actions/navigate';
import {getQueryHistory, deleteQuery, setSelectedQuery} from '../redux-core/actions/queries';
import {getAiArticle} from '../redux-core/actions/ai';

const QueryHistory = ({
                         queryHistory,
                         aiArticle,
                         navigate,
                         getQueryHistory,
                         deleteQuery,
                         setSelectedQuery,
                         getAiArticle,
                       }) => {

  const handleOpenArticleList = (url, query_id) => {
    !aiArticle.payload[query_id] && getAiArticle(url, query_id);

    setSelectedQuery(query_id);
    navigate(screen.ARTICLE_LIST);
  };

  // TODO when delete query also need remove from local-storage if exist !!!
  const renderQueryHistory = queryHistory =>
    queryHistory.map(({query_id, query, result_endpoint}) =>

      <div key={query_id} className='query-item'>
          <span className='queryLink'
                onClick={() => handleOpenArticleList(result_endpoint, query_id)}>
            {query}
          </span>
        <button className='delBtn'
                onClick={() => deleteQuery(query_id)}>
          Delete
        </button>
      </div>
    );

  return (
    <div className='center option animated fadeIn mainScrn'>
      <h3 className='fontStyle'>Your Query History</h3>
      <button className='homeBtn'
              onClick={() => navigate(screen.MAIN)}>
        Home
      </button>
      {renderQueryHistory(queryHistory)}
    </div>
  )
};

const mapStateToProps = ({queries: {queryHistory}, aiArticle}) => ({
  queryHistory,
  aiArticle,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  navigate,
  getQueryHistory,
  deleteQuery,
  setSelectedQuery,
  getAiArticle,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QueryHistory);