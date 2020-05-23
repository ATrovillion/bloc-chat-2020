import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomDescription: ''
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
   
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const newRoomName = this.state.newRoomDescription
        this.roomsRef.push({
            name: newRoomName
        })
        this.setState({ newRoomDescription: ''})
    }

    handleChange(e) {
        this.setState({ newRoomDescription: e.target.value });

    }

    render() {
        return (
            <div>
                <nav>{this.state.rooms.map((room) =>
                    <p key={room.key} onClick={() => this.props.activeRoomSet(room)}>{room.name}</p>
                )}
                </nav>
                <form onSubmit={(e) => this.handleSubmit(e) }>
                    <fieldset>
                    <h2>Enter the name of your new room</h2>
                    <input type="text" value={ this.state.newRoomDescription } onChange={ (e) => this.handleChange(e) } />
                    <input type="submit" onSubmit={ (e) => this.handleSubmit(e) } />
                    </fieldset>
                </form>
                
            </div>
        )
    }
}

export default RoomList;