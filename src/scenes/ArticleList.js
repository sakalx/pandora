import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {screen} from '../redux-core/types';
import {navigate} from '../redux-core/actions/navigate';
import {toggleCompression} from '../redux-core/actions/ai';

import downloadFile from '../helpers/download-file';
import sentencesIntoText from '../helpers/sentences-into-text';

const ArticleList = ({selectedQuery, aiArticle, navigate, toggleCompression,}) => {

  const articles = aiArticle.payload[selectedQuery.id];

  const handleDownload = () => {
    const text = sentencesIntoText(aiArticle.payload[selectedQuery.id].sentences);

    downloadFile(text);
  };

  const renderActionsBtn = (name, callBack) =>
    <button className='bottomBtn' onClick={callBack}>
      {name}
    </button>;

  const renderCompressionBtn = (articles, query_id) =>
    articles.versions.map(({name, word_count}, i) =>
      <button className='bottomBtn'
              onClick={() => toggleCompression(query_id, i)}
              key={i.toString()}>
        {name} <sup>word count: {word_count}</sup>
      </button>
    );

  const renderArticleList = ({sources}, sentences) =>
    <ul className='article-list'>
      {sentences.map(({glob_uid, source, text}, i) =>
        <li key={i.toString()} style={{margin: '10px'}}>
          {text}
          <sup>
            <a href={sources[source].url} target='_blank' className='srcLink right'>source</a>
          </sup>
        </li>
      )}
    </ul>;

  if (articles) {
    const currentCompression = articles.versions.find(({is_default}) => is_default);

    return (
      <div className='center option animated fadeIn mainScrn'>
        <button className='homeBtn'
                onClick={() => navigate(screen.QUERY_HISTORY)}>
          Queries
        </button>
        <h3>Query: <b>{selectedQuery.name}</b></h3>
        <h4>Compression: {currentCompression.name}</h4>
        <h4>KeyWords: {currentCompression.keywords.join(', ')}</h4>

        {renderCompressionBtn(articles, selectedQuery.id)}

        {renderArticleList(articles, currentCompression.sentences)}

        {renderActionsBtn('Sources', () => navigate(screen.SOURCES_SCREEN))}
        {renderActionsBtn('Edit', () => navigate(screen.EDITOR))}
        {renderActionsBtn('Download Articles', handleDownload)}
      </div>
    )
  } else {
    return <span>loading ...</span>
  }
};

const mapStateToProps = ({queries: {selectedQuery}, aiArticle}) => ({
  selectedQuery,
  aiArticle,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  navigate,
  toggleCompression,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);