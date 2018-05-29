import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { deleteUser } from '../utils/usersAPI';

import {navigate} from '../redux-core/actions/navigate';
import {screen} from '../redux-core/types';

class AdminScrn extends React.Component {
    constructor() {
        super()
        this.state = { users: [],
            name: "",
            email: "",
            company: "",
            username: "",
            password: "",
            password_verification: "",
            errors: []
        };
      }

  getUserData() {
      getUserData().then(
          (users) => {
              console.log('Login - getUserData: ', users );
            this.setState({users})
          })
    }//end getUserData


    //Initialize the data
    componentDidMount() {
        //this.getUserData();
    }

   render() {

      const {navigate} = this.props;

    var users = this.props.users;

    console.log('Admin Screen: ', users );

    var num = 0;
    var userId = "000";

  /*  if (this.props.screen != 'Admin Screen') {
        console.log("Admin Screen is off");
        return false;
    } */

      return (
        <div className='center option animated fadeIn mainScrn'><br/><br/> 
        <button className="homeBtn"
                onClick={() => navigate(screen.MAIN)}>
          Home</button>
            Admin Screen
            <br/><br />
            {
                users.map(function(users, num ){
                    console.log("lets go!");
                    ++num;
                    return  <div>
                                <div key={num} user={userId} >  
                                    <span className='users' >Name: {users.name} ID: {users._id} Admin: {users.admin ? "true" : "false"}</span>
                                    <span><button className='userBtn right' onClick={handleDelete.bind(this,users._id )}>Delete</button></span>
                                    <br/><br/>
                                </div>
                                
                            </div>
                })//end mapping
            }
            <br /><br />
           
        </div>
      )

      function handleClick() {
          console.log("Handle click on user...");
      }

      function handleDelete ( user_id) {
        console.log('Delete user ', user_id );

        deleteUser(user_id).then(
            (response) => {
            console.log("Deleted User: ", response );
            alert("User has been deleted.");
            })  
      }//end delete user...

      function updateUser ( user_id) {
        console.log('Update user ', user_id );

        updateUser(user_id).then(
            (response) => {
            console.log("Updated User: ", response );
            alert("User has been updated.");
            })  
      }

      
   }//end render
}//end component


function mapStateToProps(state) {
    console.log("AdminScrn - current state to map: ", state);
    return {
        data: state.data,
        screen: state.screen,
      users: state.userData.users,
    };
}//end mapStateToProps


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      navigate
    }, dispatch )
}//end mapDispatchToProps
    
export default connect(mapStateToProps, mapDispatchToProps) (AdminScrn)
