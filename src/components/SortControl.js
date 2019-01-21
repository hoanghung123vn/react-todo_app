import React, {Component} from 'react';

class SortControl extends Component {
    constructor(props){
        super(props);
        this.state={
            sort: {
                by: 'name',
                value: 1
            }
        }
    }

    onClick = (sortBy,sortStatus) => {
        this.props.onSort(sortBy, sortStatus);
        this.setState({
            sort:{
                by: sortBy,
                value: sortStatus
            }
        });
    }

    render(){
        var {by, value} = this.state.sort;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className = "dropdown">
                    <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                        data-toggle = "dropdown"
                        aria-haspopup = "true"
                        aria-expanded = "true"
                        id = "dropdownMenu1"
                        >
                        Sort
                        <span className = "fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className = "dropdown-menu" aria-labelledby = "dropdownMenu1">
                        <li onClick = {() => {this.onClick('name', 1)}}>
                            <a
                                className = {(by === "name" && value === 1) ? "sort_selected" : ""}
                                role = "button"
                            >
                               <span className = "fa fa-sort-alpha-asc pr-5">A - Z</span>
                            </a>
                        </li>
                        <li onClick = {() => {this.onClick('name', -1)}}>
                            <a
                                role = "button"
                                className = {(by === "name" && value === -1) ? "sort_selected" : ""}
                            >
                               <span className = "fa fa-sort-alpha-desc pr-5">Z - A</span>
                            </a>
                        </li>
                        <li className = "divider" role = "separator"></li>
                        <li onClick = {() => {this.onClick('status', 1)}}>
                            <a
                                role = "button"
                                className = {(by === "status" && value === 1) ? "sort_selected" : ""}
                            >
                                Activated status
                            </a>
                        </li>
                        <li onClick = {() => {this.onClick('status', -1)}}>
                            <a
                                role = "button"
                                className = {(by === "status" && value === -1) ? "sort_selected" : ""}
                            >
                                Hide status
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            );
    }
}

export default SortControl;
