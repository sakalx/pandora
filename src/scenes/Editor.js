import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {navigate} from '../redux-core/actions/navigate';
import {screen} from '../redux-core/types';

import downloadFile from '../helpers/download-file';
import sentencesIntoText from '../helpers/sentences-into-text';
import {
  saveArticleToLs,
  getSavedArticleFromLs,
  removeSavedArticleFromLs
} from '../helpers/local-storage';

import OrgSrcList from '../components/OrgSrcList';

class Editor extends React.PureComponent {
  state = {
    sentences: 'Query not selected',
  };

  componentDidMount() {
    const {aiArticle, selectedQuery} = this.props;

    if (aiArticle.payload[selectedQuery.id]) {
      const {versions} = aiArticle.payload[selectedQuery.id];
      const currentCompression = versions.find(({is_default}) => is_default);
      const {sentences} = currentCompression;

      const orgSentences = sentencesIntoText(sentences);
      const savedArticle = getSavedArticleFromLs(selectedQuery.id);

      savedArticle
        ? this._makeChoiceArticle(savedArticle, orgSentences)
        : this.setState({sentences: orgSentences})
    }
  }

  handleSave = () => {
    alert('Saving Article');
    const {sentences} = this.state;
    const {selectedQuery} = this.props;

    saveArticleToLs(selectedQuery.id, sentences);
  };

  handleDelete = () => {
    alert('Deleting Article');
    removeSavedArticleFromLs(this.props.selectedQuery.id);
    this.setState({sentences: ''});
  };

  handleDownload = () => {
    const {sentences} = this.state;
    const {selectedQuery} = this.props;

    saveArticleToLs(selectedQuery.id, sentences);
    downloadFile(sentences);
  };

  _makeChoiceArticle = (savedArticle, orgSentences) => {
    const {selectedQuery: {name}} = this.props;

    const promptMsg = `
      You have Saved article for this query.
      Query: '${name}'
      
      Do you wish continue edit that article ?
      `;

    confirm(promptMsg)
      ? this.setState({sentences: savedArticle})
      : this.setState({sentences: orgSentences});
  };

  _defaultImg = ({target}) => target.src = 'https://sakals.000webhostapp.com/share/img-not-found.png';

  renderOrgImg = sources =>
    // FIXME need style for img in css
    sources.map(({image, title}, i) =>
      <div key={i.toString()} className={'query-item'}>
        <h5>{title.toString()}</h5>
        <img style={{width: '100px', height: '100px'}}
             onError={this._defaultImg}
             src={image}
             alt={title}
        />
      </div>);

  renderActionsBtn = (name, callBack) =>
    <button className='homeBtn' onClick={callBack}>
      {name}
    </button>;

  renderNavigationBtn = (name, callBack) =>
    <button className='homeBtn' onClick={callBack}>
      {name}
    </button>;

  render() {
    const {selectedQuery, aiArticle: {payload}, navigate} = this.props;
    const {sentences} = this.state;
    const article = payload[selectedQuery.id];

    return (
      <div className='center option animated fadeIn mainScrn'>
        <div>
          {this.renderNavigationBtn('Home', () => navigate(screen.MAIN))}
          {article
              ? this.renderNavigationBtn('Back To Article List', () => navigate(screen.ARTICLE_LIST))
              : this.renderNavigationBtn('Back To Query History', () => navigate(screen.QUERY_HISTORY))
          }
          <div>
            <h3 className='fontStyle'>Query: {selectedQuery.name}</h3>

            <textarea name='body' rows='10' className='textArea'
                      value={sentences}
                      onChange={({target}) => this.setState({sentences: target.value})}
            />
          </div>
        </div>
        {article &&
          <div>
            {this.renderActionsBtn('Delete', this.handleDelete)}
            {this.renderActionsBtn('Save', this.handleSave)}
            {this.renderActionsBtn('Download Saved Article', this.handleDownload)}

            <div>
              <h2>Original Sources:</h2>
              <OrgSrcList sources={article.sources}/>
            </div>

            <div>
              <h2>Original Graphics</h2>
              {this.renderOrgImg(article.sources)}
            </div>

          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({queries: {selectedQuery}, aiArticle}) => ({
  selectedQuery,
  aiArticle,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  navigate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);