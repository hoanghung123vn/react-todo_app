import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
            name: '',
            status: false
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true :false;
        }
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    componentWillMount(){
        var {task} = this.props;
        if(task){
            this.setState({
                id: task.id,
                name: task.name,
                status: task.status
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            });
        }else if (!nextProps.task) {
            this.setState({
                id: '',
                name: '',
                status: false
            });
        }
    }

    render(){
        var {onCloseForm} =this.props;
        var {id} = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id !=='' ? 'Update ask' : 'Add Task'}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick= {onCloseForm}
                        >
                        </span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit = {this.onSubmit} >
                        <div className="form-group">
                            <label>Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value = {this.state.name}
                                onChange = {this.onChange}
                            />
                            <label>Status: </label>
                            <select
                                name="status"
                                className="form-control"
                                value = {this.state.status}
                                onChange = {this.onChange}
                            >
                            <option value={true}>Activated</option>
                            <option value={false}>Hide</option>
                            </select>
                        </div>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Save
                            </button>&nbsp;
                            <button type="button" onClick={ this.onClear } className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span>Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
