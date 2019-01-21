import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import {findIndex} from 'lodash';

class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                filterName: '',
                filterStatus: -1
            },
            keyword: '',
            sort: {
                by: 'name',
                value: 1
            }
        }
    }

    onDisplayForm = () => {
        if (this.state.isDisplayForm && this.state.taskEditing !== null) {
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            });
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            });
        }
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false,
            taskEditing: null
        });
    }

    onOpenForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }

    onSubmit = (data) => {
        var {tasks} = this.state;
        if(data.id===''){
            data.id = this.genarateId();
            tasks.push(data);
        }else{
            var index = this.findIndexById(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        var {tasks} = this.state;
        var index = this.findIndexById(id);
        tasks[index].status = !tasks[index].status;
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onDelete = (id) => {
        var {tasks} = this.state;
        var index = this.findIndexById(id);
        tasks.splice(index,1);
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onCloseForm();
    }

    genarateId = () => {
        return Math.round(10000*Math.random());
    }

    findIndexById = (id) => {
        var {tasks} = this.state;
        var k = -1;
        tasks.forEach( function(element, index) {
            if (id===element.id){
                k = index;
            }
        });
        return k;
    }

    onUpdate = (id) => {
        var {tasks} = this.state;
        //var index = this.findIndexById(id);
        var index = findIndex(tasks, (task) => {
            return task.id === id;
        })
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        });
        this.onOpenForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                filterName: filterName.toLowerCase(),
                filterStatus: filterStatus
            }
        });
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        });
    }

    onSort = (sortBy, sortStatus) => {
        this.setState({
            sort:{
                by: sortBy,
                value: sortStatus
            }
        });
    }

    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    }

    render() {
        var {tasks, isDisplayForm, taskEditing, filter, keyword, sort} = this.state;
        if(filter){
            if(filter.filterName){
                tasks = tasks.filter(task => task.name.toLowerCase().indexOf(filter.filterName) !== -1);
            }
            tasks = tasks.filter((task) => {
                if(filter.filterStatus === -1){
                    return task;
                }else {
                    return task.status === (filter.filterStatus === 1 ? true :false);
                }
            });
        }
        if(keyword){
            tasks = tasks.filter(task => task.name.toLowerCase().indexOf(keyword) !== -1);
        }
        if(sort.by==='name'){
            tasks.sort((a,b)=>{
                if(a.name>b.name){
                    return sort.value;
                }else if(a.name<b.name){
                    return -sort.value;
                }else {
                    return 0;
                }
            });
        }else{
            tasks.sort((a,b)=>{
                if(a.status>b.status){
                    return -sort.value;
                }else if(a.status<b.status){
                    return sort.value;
                }else {
                    return 0;
                }
            });
        }
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Task Manager</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : null}>
                        {/*Form*/}
                        {isDisplayForm ? <TaskForm
                                            onCloseForm = {this.onCloseForm}
                                            onSubmit = {this.onSubmit}
                                            task = {taskEditing}
                                        /> : null}
                    </div>
                    <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" :
                        "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button type="button" className="btn btn-primary" onClick = {this.onDisplayForm}>
                            <span className = "fa fa-plus mr-5"></span>
                            Add Task
                        </button>
                        {/*Search-Sort*/}
                        <Control
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                        />
                        {/*List*/}
                        <TaskList
                            tasks = {tasks}
                            onUpdateStatus = {this.onUpdateStatus}
                            onDelete = {this.onDelete}
                            onUpdate = {this.onUpdate}
                            onFilter = {this.onFilter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
