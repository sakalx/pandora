import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {deleteQuery, setSelectedQuery} from 'root/redux-core/actions/queries';
import {getAiArticle} from 'root/redux-core/actions/ai';
import {toggleSnackbar} from 'root/redux-core/actions/notification';

import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveIcon from '@material-ui/icons/Clear';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import AddThemeField from './add-theme-field'

import {ListThemes} from './style';

class ListOfThemes extends React.PureComponent {
  state = {
    itemForRemove: '',
  };

  handleRemoveTheme = (id, query) => {
    const {deleteQuery, toggleSnackbar} = this.props;

    this.setState({itemForRemove: id});
    deleteQuery(id); // || setTimeout(deleteQuery, 200, id);
    toggleSnackbar(`Theme: ${query}, has been successfully removed.`);

    // TODO remove from local storage
  };

  handleRewriteTheme = (query_id, url) => {
    const {aiArticle, getAiArticle, handleTabSwitch, setSelectedQuery} = this.props;
    !aiArticle.payload[query_id] && getAiArticle(url, query_id);

    setSelectedQuery(query_id);
    handleTabSwitch(1)
  };

  renderListItemText = query =>
    <ListItemText primary={
      <Typography color='primary' variant='subheading'>
        {query}
      </Typography>
    }/>;

  renderListItemAction = (query_id, query) =>
    <ListItemSecondaryAction>
      <Tooltip id='tooltip-remove-theme' title='Remove'>
        <IconButton color='secondary'
                    onClick={() => this.handleRemoveTheme(query_id, query)}
                    aria-label='Remove Theme'>
          <RemoveIcon/>
        </IconButton>
      </Tooltip>
    </ListItemSecondaryAction>;

  render() {
    const {queryHistory, fetching, processingNewQuery} = this.props;
    const {itemForRemove} = this.state;

    return (
      <React.Fragment>
        <AddThemeField/>

        <Collapse in={
          (!queryHistory.length && fetching.queryHistory)
          || !!processingNewQuery.length
        }>
          {!!processingNewQuery.length &&
          <Typography gutterBottom variant='caption'>
            Processing new theme ...
          </Typography>}
          <LinearProgress/>
        </Collapse>

        <ListThemes>
          {queryHistory.map(({query_id, query, result_endpoint}, i) => (
            <Slide direction='up'
                   in={itemForRemove !== query_id}
                   key={query_id.toString()}
                   mountOnEnter
                   timeout={{enter: 700 + i * 100, exit: 200}}>
              <ListItem button dense
                        onClick={() => this.handleRewriteTheme(query_id, result_endpoint)}>
                {this.renderListItemText(query)}
                {this.renderListItemAction(query_id, query)}
              </ListItem>
            </Slide>
          ))}
        </ListThemes>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({
                           queries: {queryHistory, fetching, processingNewQuery},
                           aiArticle
                         }) => ({
  aiArticle,
  fetching,
  processingNewQuery,
  queryHistory,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteQuery,
  getAiArticle,
  setSelectedQuery,
  toggleSnackbar,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListOfThemes);