import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from "react-router-dom";

class Edit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            title: '',
            description: '',
            author: ''
        }
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const board = doc.data();
                this.setState({
                    key: doc.id,
                    title: board.title,
                    description: board.description,
                    author: board.author
                });
            } else {
                console.log("No such document!");
            }
        });
    };

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({board:state});
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { title, description, author } = this.state;

        const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
        updateRef.set({
            title,
            description,
            author
        }).then((docRef) => {
            this.setState({
                key: '',
                title: '',
                description: '',
                author: ''
            });
            this.props.history.push("/show/" + this.props.match.params.id)
        })
            .catch((error) => {
                console.error("Error editing document: ", error);
            })
    };

    render() {
        const { key, title, description, author } = this.state;
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT BOARD
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={`/show/${key}`} className="btn btn-primary">Board List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input type="text" className="form-control" name="title" value={title}
                                       onChange={this.onChange} placeholder="Title"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <textarea className="form-control" name="description" onChange={this.onChange}
                                          placeholder="Description" cols="80" rows="3" value={description} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Author:</label>
                                <input type="text" className="form-control" name="author" value={author}
                                       onChange={this.onChange} placeholder="Author"/>
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit
