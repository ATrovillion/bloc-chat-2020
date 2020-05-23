import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: {
                content: '',
                roomId: '',
                sentAt: '',
                username: ''
            }
        }

        this.messagesRef = this.props.firebase.database().ref('messages');
        
    }

    componentDidMount() {
        // Retrieves the messages from firebase
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const messageToAdd = {
            content: this.state.newMessage.content,
            roomId: this.props.activeRoom.key
        }
        this.messagesRef.push({
            content: messageToAdd.content,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomId: messageToAdd.roomId
        })
        // This section resets the newMessage part of state for form cleanup
        this.setState({
            newMessage: {
                content: '',
                roomId: ''
            }
        })
    }

    handleChange(e) {
        // Allows form to reflect typed values
        this.setState({ newMessage: {
                            content: e.target.value,
                            roomId: this.props.activeRoom
                        }
        });
    }

    render() {
        if (!this.props.activeRoom.key || this.props.activeRoom.key === '') {
            return(<div><h2>Click on a room from the Room List to see messages from that room</h2></div>)
        } else {
        return (
            <div>
                {/* The following div renders a list of all messages, regardless of roomId */}
                {/* <div>
                    <h2>List of All Messages</h2>
                    <ul>{this.state.messages.map((message) =>
                        <li key={message.key}>{message.content}</li>)}
                    </ul>
                </div> */}
                <div>
                    <form onSubmit={(e) => this.handleSubmit(e) }>
                        <fieldset>
                            <h4>Enter the text of the new message</h4>
                            <input type="text" size="100" value={ this.state.newMessage.content } onChange={ (e) => this.handleChange(e) } />
                            <input type="submit" onSubmit={ (e) => this.handleSubmit(e) } />
                        </fieldset>
                    </form>
                </div>
                {/*This section will replace the all-message list by listing ony messages associated with the active room */}
                <div>
                    <h2>List of Messages for the Active Room</h2>
                    <h1>The active room is {this.props.activeRoom.name}, and the room's index is {this.props.activeRoom.key}</h1>

                    <ul>{this.state.messages
                            .filter(message => message.roomId === this.props.activeRoom.key)
                            .map(message => <li key={message.key}>{message.content}</li>)}
                    </ul>
                </div>
            </div>
        )}
    }
}

export default MessageList
