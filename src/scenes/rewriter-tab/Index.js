import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Rewriter extends React.PureComponent {

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

});

export default connect(mapStateToProps, mapDispatchToProps)(Rewriter);