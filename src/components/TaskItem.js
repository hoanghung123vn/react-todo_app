import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatusTask(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render(){
        var { task, index } =this.props;
        return (
            <tr>
                <td>{ index + 1 }</td>
                <td>{ task.name }</td>
                <td>
                    { task.status ?
                        <span onClick={this.onUpdateStatus} className="label label-success">Activated</span> :
                        <span onClick={this.onUpdateStatus} className="label label-danger">Hided</span>
                    }
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick = {this.onUpdate}>
                        <span className="fa fa-pencil mr-5">Update</span>
                    </button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick ={this.onDelete}>
                        <span className="fa fa-trash mr-5">Delete</span>
                    </button>
                </td>
            </tr>
            );
    }
}

const mapStateToProps = (state) => {
    return {
       
    };
}
const mapDispathToProps = (dispatch, props) => {
    return {
        onUpdateStatusTask: (id) => {
            dispatch(actions.updateStatusTask(id));
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));
        }
    };
}

export default connect(mapStateToProps, mapDispathToProps)(TaskItem);
