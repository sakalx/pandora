import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {screen} from '../redux-core/types';
import {navigate} from '../redux-core/actions/navigate';
import {logOut} from '../redux-core/actions/user';
import {getQueryHistory} from '../redux-core/actions/queries';

import {removeUserToken} from '../helpers/local-storage';

//FIXME: AdminScrn, ScreenTwo, ScreenThree,
import AdminScrn from './adminScrn';
import ScreenTwo from './screentwo';
import ScreenThree from './screenthree.js';

import SearchBar from '../components/SearchBar';
import QueryHistory from './QueryHistory';
import Editor from './Editor.js';
import ArticleList from './ArticleList';
import OriginalSources from './OriginalSources.js';

class MainScreen extends React.PureComponent {

  componentDidMount() {
    const {queries, getQueryHistory, user} = this.props;

    !queries.queryHistory.length && getQueryHistory(user._id);
  }

  handleLogOut = () => {
    removeUserToken();
    this.props.logOut();
  };

  render() {
    const {stackScreen, navigate, user, queries} = this.props;

    return (
      <div className='center option animated fadeIn splashScrn'>
        <img className='margin1' src='img/bidwin-logo-small.png' alt={'bidwin logo'}/>

        <button className='homeBtn'
                onClick={this.handleLogOut}>
          Logout
        </button>
        <button className={user.admin ? 'homeBtn' : 'hide'}
                onClick={() => navigate(screen.ADMIN_SCREEN)}>
          Admin
        </button>

        <p>Hello: {user.name}</p>
        <p>
          Current Query: {queries.selectedQuery.name || 'Query not selected from history'}
        </p>

        <SearchBar className='searchBar'/>

        <span className='navBtn green'
              onClick={() => navigate(screen.QUERY_HISTORY)}>
              Query <b>History</b>
        </span>
        <span className='navBtn red'
              onClick={() => navigate(screen.INTERNET_RESOURCES)}>
            Internet <b>Resources</b>
        </span>
        <span className='navBtn babyblue'
              onClick={() => navigate(screen.SOCIAL_RESOURCES)}>
            Social <b>Resources</b>
        </span>
        <span className='navBtn orange'
              onClick={() => navigate(screen.EDITOR)}>
            Editor
        </span>

        {stackScreen[screen.QUERY_HISTORY] && <QueryHistory/>}
        {stackScreen[screen.EDITOR] && <Editor/>}
        {stackScreen[screen.ARTICLE_LIST] && <ArticleList/>}
        {stackScreen[screen.SOURCES_SCREEN] && <OriginalSources/>}

        {stackScreen[screen.INTERNET_RESOURCES] && <ScreenTwo userId={user._id}/>}
        {stackScreen[screen.ADMIN_SCREEN] && <AdminScrn/>}
        {stackScreen[screen.SOCIAL_RESOURCES] && <ScreenThree userId={user._id}/>}
      </div>
    )
  }
}

const mapStateToProps = ({stackScreen, userData, queries, userData: {user}}) => ({
  stackScreen,
  userData,
  queries,
  user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  navigate,
  logOut,
  getQueryHistory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);