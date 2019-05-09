import React, {Component} from 'react';

export default class AddAnswer extends Component {
    API_URL = process.env.REACT_APP_API;


    constructor(props) {
        super(props);

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: String,
            description: String
        }
    }

    onTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    onDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        fetch(`${this.API_URL}/questions/add-question/`, {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description
            }),
            headers: {"Content-Type": "application/json"}
        }).then(res => console.log(res.data));
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <h3 className="bg-dark text-light p-3 mb-3 rounded">Ask a question</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Question title</label>
                        <input type="text"
                               name="title"
                               className="form-control mb-3"
                               placeholder="Title..."
                               onChange={this.onTitleChange}
                               required
                        />
                        <label>Question description</label>
                        <input  type="text"
                                name="description"
                                className="form-control"
                                placeholder="Description..."
                                onChange={this.onDescriptionChange}
                                required
                        />
                        <input className="btn btn-success mt-4" type='submit' value='Confirm'/>
                    </div>
                </form>
            </div>
        )
    }

}