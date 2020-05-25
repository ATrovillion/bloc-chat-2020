import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            user: this.props.user,
            newMessage: {
                content: ''
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
        console.log("handleSubmit called!")
        if (this.state.newMessage.content === '') {
            return;
        } else {
            const messageToAdd = {
                content: this.state.newMessage.content,
                roomId: this.props.activeRoom.key

            }
            this.messagesRef.push({
                content: messageToAdd.content,
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                roomId: messageToAdd.roomId,
                user: this.props.user.displayName
            })
            // This section resets the newMessage part of state for form cleanup
            this.setState({
                newMessage: {
                    content: ''
                }
            })
        }
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
                <div>
                    <form onSubmit={(e) => this.handleSubmit(e)} >
                            {this.props.user
                            ? <fieldset>
                                <h4>Enter the text of the new message</h4>
                                <input type="text" size="100" value={ this.state.newMessage.content } onChange={ (e) => this.handleChange(e) } />
                                <input type="submit" onSubmit={ (e) => this.handleSubmit(e) } />
                            </fieldset>
                            
                            : <fieldset>
                                <h2>Please log in to create new messages</h2>
                            </fieldset>
                            }
                    </form>
                </div>
                {/*This section will replace the all-message list by listing ony messages associated with the active room */}
                <div>
                    <h2>List of Messages for: {this.props.activeRoom.name}</h2>

                    <ul>{this.state.messages
                            .filter(message => message.roomId === this.props.activeRoom.key)
                            .map(message => <li key={message.key}>{message.content}</li>)
                        }
                    </ul>
                </div>
            </div>
        )}
    }
}

export default MessageList
