import React, { Component } from 'react';

class AnswersList extends Component {
    API_URL = process.env.REACT_APP_API;

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: String,
            answers: [],
            updated: false
        };
    }

    componentDidMount() {
        fetch(`${this.API_URL}/answers/`+ this.props.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ answers: data })
            })
    }

    onSubmit(e) {
        e.preventDefault();
        let button = e.target;
        let action;

        // eslint-disable-next-line
        if(button.innerHTML === 'Like') {
            action = 'like-answer';
        } else {
            action = 'dislike-answer';
        }
        fetch(`${this.API_URL}/answers/` + action + '/' + e.target.dataset.answerid, {
            method: 'POST',
            body: JSON.stringify({
                answerId: e.target.dataset.answerid
            }),
            headers: {"Content-Type": "application/json"}
        })
            .then(res => console.log(res))
            .catch(e => console.log(e));
        window.location.reload()
    }

    render() {
        return (
            <div>
                <h3 className="bg-light text-dark p-2 mb-4 mt-5 rounded">Answers</h3>
                <div>
                    {this.state.answers.map((answer) => (
                        <div  className="media-body mb-4">
                            <h6 className="ml-4 mt-2 font-weight-normal">{answer.text}</h6>
                            <p className="text-secondary mt-2 ml-2 " id={'rating-'+answer._id}><b>Likes: </b>{answer.rating}</p>

                            <button className="btn btn-success mr-1" data-answerId={answer._id} onClick={this.onSubmit}>Like</button>
                            <button className="btn btn-warning" data-answerId={answer._id} onClick={this.onSubmit}>Dislike</button>

                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default AnswersList

