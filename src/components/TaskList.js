import React, {Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange =(event) => {
        var {filterName, filterStatus} = this.state;
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : filterName,
            name === 'filterStatus' ? value : filterStatus
            );
        this.setState({
            [name]: value
        });
    }

    render(){
        var {tasks} = this.props;
        var {filterName, filterStatus} = this.state;
        var elmTasks = tasks.map((task, index) => {
                            return <TaskItem
                                        key = {task.id}
                                        index = {index}
                                        task ={task}
                                        onUpdateStatus = {this.props.onUpdateStatus}
                                        onDelete = {this.props.onDelete}
                                        onUpdate ={this.props.onUpdate}
                                    />
                        });
        return (
            <div>
                <table className="table table-bordered table-hover mt-15">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input
                                    type="text"
                                    name="filterName"
                                    id="inputFilterName"
                                    className="form-control"
                                    value={filterName}
                                    onChange= {this.onChange}
                                />
                            </td>
                            <td>
                                <select
                                    name="filterStatus"
                                    id="input"
                                    className="form-control"
                                    value ={filterStatus}
                                    onChange= {this.onChange}
                                >
                                    <option value={-1}>All</option>
                                    <option value={0}>Hided</option>
                                    <option value={1}>Activated</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        { elmTasks }
                    </tbody>
                </table>
            </div>
            );
    }
}

export default TaskList;
