import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getQueryHistory} from 'root/redux-core/actions/queries';


import HeaderBar from 'root/scenes/main-page/header-bar';
import ListOfThemes from 'root/scenes/list-themes-tab';


import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import ListIcon from '@material-ui/icons/List';
import RewriterIcon from '@material-ui/icons/BorderColor';
import Slide from '@material-ui/core/Slide';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import {
  MainSection,
  Wrap,
} from './style';

// TODO Full-screen component for profile page
class MainScreen extends React.PureComponent {
  state = {
    tabIndex: 0,
  };

  componentDidMount() {
    // const {queryHistory, getQueryHistory, user} = this.props;
    //
    // !queryHistory.length && getQueryHistory(user._id);
  }

  handleTabSwitch = tabIndex => this.setState({tabIndex});

  render() {
    const {selectedQuery} = this.props;
    const {tabIndex} = this.state;

    return (
      <Wrap>
        <HeaderBar user={'Sakal'}/>
       {/* <Slide direction='up' in={true} mountOnEnter timeout={1000} unmountOnExit>
          <MainSection elevation={24}>
            <AppBar color='default' position='static'>
              <Tabs indicatorColor='primary'
                    onChange={(event, value) => this.setState({tabIndex: value})}
                    textColor='primary'
                    value={tabIndex}
                    fullWidth>
                <Tab icon={<ListIcon/>} label='List of Themes'/>
                <Tab disabled={!selectedQuery.id} icon={<RewriterIcon/>} label='Rewriter'/>
              </Tabs>
            </AppBar>
            <SwipeableViews onChangeIndex={index => this.setState({tabIndex: index})}
                            index={tabIndex}>
              <ListOfThemes handleTabSwitch={this.handleTabSwitch}/>
              <span>two</span>
            </SwipeableViews>
          </MainSection>
        </Slide>*/}
      </Wrap>
    )
  }
}

const mapStateToProps = ({queries:{queryHistory, selectedQuery}}) => ({
  queryHistory,
  selectedQuery,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getQueryHistory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);