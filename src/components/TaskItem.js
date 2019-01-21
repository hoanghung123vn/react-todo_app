import React, {Component} from 'react';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
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

export default TaskItem;
