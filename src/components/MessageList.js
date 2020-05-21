import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessageContent: ''
        }

        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const newMessage = this.state.newMessageContent
        this.messagesRef.push({
            content: newMessage
        })
        this.setState({ newMessageContent: '' })
    }

    handleChange(e) {
        this.setState({ newMessageContent: e.target.value });
    }

    render() {
        return (
            <div>
                <div>
                    <h2>List of All Messages</h2>
                    <ul>{this.state.messages.map((message) =>
                        <li key={message.key}>{message.content}</li>)}
                    </ul>
                </div>
                <div>
                    <form onSubmit={(e) => this.handleSubmit(e) }>
                        <fieldset>
                            <h2>Enter the text of the new message</h2>
                            <input type="text" size="100" value={ this.state.newMessageContent } onChange={ (e) => this.handleChange(e) } />
                            <input type="submit" onSubmit={ (e) => this.handleSubmit(e) } />
                        </fieldset>
                    </form>
                </div>
                <div>
                    <h2>List of Messages for the Active Room</h2>
                    <ul>{this.props.activeRoom}</ul>
                </div>
            </div>
        )
    }
}

export default MessageList
