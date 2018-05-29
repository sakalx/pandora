import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import axios from 'axios';

import {navigate} from '../redux-core/actions/navigate';
import {screen} from '../redux-core/types';

class ScreenTwo extends Component {

    constructor (props) {
        super(props);
        this.state = {
            url: " Enter your own url one at a time...",
            urlArr: ["http://www.wikipedia.org/"]
        } 
    }

    render() {
        const {navigate} = this.props;

        var userId = this.props.userId;
        console.log("Screen Two - we have our user: ", userId );

        //var query = this.props.articles[1].article;
        var query = this.props.query;
        console.log("Screen Two - we have our query: ", query);

   /*     if ( this.props.screen != 'Second Screen') {
            console.log("ScreenTwo is off");
         return false;
       }

       if (this.props.screen === "Close Screen" ) {
           return false;
       }*/
       
          var num = 0;
          var currentUrls = this.state.urlArr;
          console.log("ScreenTwo - Current URLS: ", currentUrls );

    /*      var i = 0;

            currentUrls.forEach( function() {
            currentUrls[i] = currentUrls[i].replace('','|')
           ++i;
          }) */

        ///  console.log("ScreenTwo - Current URLS 2: ", currentUrls );
        
        return (
            <div className="center option animated fadeIn mainScrn">
            <br/><br/>
            <button className="homeBtn"  onClick={() => navigate(screen.MAIN)}>Home</button><button className="homeBtn" onClick={submitQuery.bind(this,this.state.urlArr,query, userId)}>Submit Links</button>
                <h3>Current Keywords: {query}</h3>
                <br/><br/>
                {currentUrls}
                <br/><br/>
                <div className="fontStyle"> Add your own links (include "http://"):</div>
                <input
                        className='searchBar'
                        width='60%'
                        value = {this.state.url }
                        onChange={(e) => this.setState({url: e.target.value})}
                        onFocus={(e) => this.setState({url: " "})}
                    /><span className='searchBtn' onClick={handleClick.bind(this,this.state.url,query, userId)}>Add</span>
                    <br /><br />

            Current List of URLS: {
                 currentUrls.map(function(url, num){
                    return (
                        
                    <p className='urllink' key={num}>{url}</p>
                    )
                })
                }
                <button className='btn right' onClick={clearLinks.bind(this)}>Clear Links</button>
            </div>
        )//end return

        function handleClick ( url, query, id){
            //cooper s - use jquery to open/close each items content....
            console.log("nandleClick: ", url," query: ",query  ," userID: ", id );

            //Here's where the fun starts...
            // cooper s - post a new query
            console.log("appAPI.postQuery: ", url ,"for user: ",userId);

            this.state.urlArr.push("|"+url);
            console.log("current urlArr: ", this.state.urlArr );
            this.setState(this.state.urlArr);
            this.setState({url:""});
   
        }//end handleItemClick

        function submitQuery(urls, query, id ){
            //cooper s - use jquery to open/close each items content....
            console.log("ScreenTwo Submit Query: ", urls," query: ",query, " userID: ", id );
            //Here's where the fun starts..
            axios.post('http://ai-writer.com/mpnt_json_endpoint.php?add_query='+query+'&word_count=500&comment='+ id , { urls:urls},{
                headers: {
                    "Content-Type" : "application/x-www-form-urlencoded" 
                }
            } )
			.then(function(response) {
				console.log("postQuery Response: ", response );
            })
            .catch((err)=> {
                store.dispatch({type: "DATA_ERROR", payload: err })
              });  //end postQuery

              alert("Your query has been resubmitted using selected resoucres.");

        }//end submitQuery

        function clearLinks() {
            console.log("Clear Url links...2");
            this.setState({urlArr: ["http://bidwinads.com/"]});
        }

    }//end render

}//end Component

function mapStateToProps(state) {
        console.log("ScreenTwo - current state props: ", state );
        //console.log("Component One - Map Dispatch current props: ", state.state.data );
        return {
            data: state.data,
            screen: state.screen,
            articles: state.articles,
            query: state.query
        };
    }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({navigate}, dispatch )
}
    
export default connect(mapStateToProps,  mapDispatchToProps) (ScreenTwo)