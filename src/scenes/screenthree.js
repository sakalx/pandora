import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRedditData } from '../utils/redditAPI';
import { bindActionCreators } from 'redux';

import axios from 'axios';

import {navigate} from '../redux-core/actions/navigate';
import {screen} from '../redux-core/types';

class ScreenThree extends Component {
    constructor (props) {
        super(props);
        this.state = {
            newreddit: "Enter subreddit here...",
            redditData: []
        } 
    }
 
    getRedditData() {
        getRedditData().then(
            (redditData) => {
                console.log('ScreenThree - getRedditData: ', redditData );
              this.setState({redditData})
            })
      }//end getRedditData
  
    componentDidMount() {
        console.log("ScreenOne - Compoonent mounted - do we have a userid: ", this.props.userId );
          this.getRedditData();
        }

    render() {
      const {navigate} = this.props;


 /*       if ( this.props.screen != 'Third Screen') {
            console.log("ScreenThree is off");
         return false;
       }

       if (this.props.screen === "Close Screen" ) {
           return false;
       }*/
       
       var store = this.props.store;
       console.log("ScreenThree - Store: ", store );

       var query = this.props.query;
       console.log("Screen Two - we have our query: ", query);
        
       var style = {
        padding: "1em",
      }
        var reddit_links = [];

        console.log("Screen 3 - Current reddit props: (store) ", this.props.reddit);
        console.log("Screen 3 - Current reddit state (local): ", this.state.redditData);

        if ((this.state.redditData === null ) || (this.state.redditData === undefined) ){
            alert("Warning, Will Robinson...");
        }

        if ((this.props.reddit_results === null ) || (this.state.reddit_results === undefined) ){
        //    alert("Warning, Will Robinson...No new listing from STORE...");
            console.log("Inside IF - Your pussy good: ", this.props.reddit_results)
        }
        console.log("Outside - Your pussy good: ", this.props.reddit_results)

      if ((this.props.reddit.reddit_results !== undefined ) ) {
            console.log("ScreenThree - props props state updated: ", this.props.reddit.reddit_results.children );
            console.log("ScreenThree - props local state updated: ", this.state.redditData.data.children[0].data.title );

            reddit_links = this.props.reddit.reddit_results.children;
       
            } else {//end iff 

                //reddit_links = this.state.redditData.data.children
            }

        console.log('Reddit links: ', reddit_links );

        var subreddit = this.state.newreddit;

        var num = 0;
        var userId = 0;

        return (
            <div style={style} className="center option animated fadeIn mainScrn">
            <h3 className="fontStyle"> Current Keywords: {query}</h3>
                <br/><br/>
                <h4 className="fontStyle">Search Reddit Article by SubReddit</h4>                <button className="homeBtn"  onClick={() => navigate(screen.MAIN)}>Home</button>
                <input
                        className='searchBar'
                        width='60%'
                        value = {this.state.newreddit }
                        onChange={(e) => this.setState({newreddit: e.target.value})}
                        onFocus={(e) => this.setState({newreddit: " "})}
                    /><span className='searchBtn' onClick={getReddit.bind(this, this.state.newreddit, "00")}>Search Reddit</span>
                <br /><br/>
                SubReddit:  {subreddit}
                {this.state.redditData.data && this.state.redditData.data.children.map(function(reddit_links) {
							++num;
							return  <div style={style} key={num} userID={userId} onClick={handleClick.bind(this, num, reddit_links.data , userId )}>  
                                    <br/> 
                                    {reddit_links.data.title} <button className="homeBtn right" onClick={openLink.bind(this, num, reddit_links.data.permalink , userId )}>Open</button>
							</div>
						}) }

            </div>
        )//end return

        return (
            <div style={style} className="center option animated fadeIn">
                <h3> Screen Three</h3>
                <p>Social API data goes here: {this.props.data}</p>
                <button className="homeBtn"  onClick={()=> this.props.navigate(screen.MAIN)}>Home</button>
            </div>
        )//end return

        function handleClick (num, link, id){
            //cooper s - use jquery to open/close each items content....
            console.log("ScreenThree - handleClick: ", link.permalink, " userID: ", id );
            window.open('http://reddit.com'+link.permalink );
            //Here's where the fun starts...
        }//end handleItemClick

        function openLink (redditLink){
            //cooper s - use jquery to open/close each items content....
            console.log("Open Reddit: ",redditLink );
            //Here's where the fun starts...
        }//end handleItemClic

        function getReddit(subreddit) {
            subreddit = subreddit.replace(/\s+/g, '');
            console.log('ScreenThree - get reddit: ', subreddit );

            store.dispatch((dispatch) =>{
                dispatch({type: "GET_REDDIT_START"})
                axios.get('http://www.reddit.com/r/'+subreddit+'.json')
                .then ((response) => {
                    console.log("Reddit response: ", response.data.data );
                    dispatch({type: "GOT_REDDIT_DATA", payload: response.data.data })
                })
                .catch((err)=> {
                    dispatch({type: "REDDIT_DATA_ERROR", payload: err });
                    alert("That subreddit does not exist. Please, try again.");
                    this.setState({reddit: ''})
                }) 
                
            })
  
        }
    }//end render

}//end Component

function mapStateToProps(state) {
        console.log("ScreenThree.mapStateToProps - current state results: ", state.reddit_results );
        return {
            data: state.reddit_results,
            reddit: state.reddit_results,
            screen: state.screen,
            query: state.query 
        };
    }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({navigate}, dispatch )
}
    
export default connect(mapStateToProps,  mapDispatchToProps) (ScreenThree)