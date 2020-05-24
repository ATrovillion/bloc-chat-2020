import React, { Component } from 'react';

class User extends Component {

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        })
    }

    userLogIn(e) {
        e.preventDefault();
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    userLogOut(e) {
        this.props.firebase.auth().signOut();
    }

    render() {
        if (!this.props.user || this.props.user.displayName === 'Guest') {
            return (
                <div>
                    <h3>Click the Log In button below</h3>
                    <form onSubmit={ (e) => this.userLogIn(e)}>
                        <button type="submit" onSubmit={ (e) => this.userLogIn(e)}>Sign In</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>The current user is: {this.props.user.displayName}</h2>

                    <button onClick={(e) => this.userLogOut(e) }>Log Out</button>
                </div>
        )}
    }
}

export default User