import React, { Component } from 'react';
import {Link} from "react-router-dom";
import AnswersList from "./AnswersList";

export default class Question extends Component {
    API_URL = process.env.REACT_APP_API;

    constructor(match, props) {
        super(props);

        this.state = {
            title: String,
            description: String
        }
    }

    componentDidMount() {
        fetch(`${this.API_URL}/questions/`+ this.props.match.params.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    title: data[0].title,
                    description: data[0].description,
                })
            })
    }

    render() {
        return (
            <div>

                <div className="media-body">
                    <h3 className="bg-dark text-light p-3 rounded">{this.state.title}</h3>
                    <h5 className="ml-4 mt-4 font-weight-normal">{this.state.description}</h5>
                    <Link className="btn btn-secondary
                    mt-5 mb-3 ml-2" to={"/answers/add-answer/" + this.props.match.params.id}>Add comment</Link>
                </div>
                <AnswersList id={this.props.match.params.id}/>
            </div>
        );
    }
}