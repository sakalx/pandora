import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {navigate} from '../redux-core/actions/navigate';
import {screen} from '../redux-core/types';

import OrgSrcList from '../components/OrgSrcList';

const OriginalSources = ({selectedQuery, aiArticle: {payload}, navigate}) => {
  const article = payload[selectedQuery.id];

  return (
    <div className='center option animated fadeIn mainScrn'>
      <h3 className='fontStyle'>Cited Sources</h3>
      <button className='homeBtn'
              onClick={() => navigate(screen.ARTICLE_LIST)}>
        Back
      </button>

      <h4>Query: {selectedQuery.name}</h4>
      <OrgSrcList sources={article.sources}/>
    </div>
  )
};

const mapStateToProps = ({queries: {selectedQuery}, aiArticle}) => ({
  selectedQuery,
  aiArticle,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  navigate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OriginalSources);