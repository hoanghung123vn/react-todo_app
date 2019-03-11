import * as types from '../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];
var genarateId = () => {
    return Math.round(10000 * Math.random());
}

var findIndexById = (id, state) => {
    var k = -1;
    state.forEach(function (element, index) {
        if (id === element.id) {
            k = index;
        }
    });
    return k;
}

var onUpdateStatus = (id, state) => {
    var index = findIndexById(id, state);
    // var coppyTask = { ...state[index] };
    // coppyTask.status = !coppyTask.status;
    // state[index] = coppyTask;
    state[index] = {
        ...state[index],
        status: !state[index].status
    }
    localStorage.setItem('tasks', JSON.stringify(state));
}

var onDelete = (id, state) => {
    var index = findIndexById(id, state);
    state.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(state));
}

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            var newTask = {
                id: genarateId(),
                name: action.task.name,
                status: action.task.status === 'true' ? true : false
            };
            state.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            onUpdateStatus(action.id, state);
            return [...state];
        case types.DELETE_TASK:
            onDelete(action.id, state);
            return [...state];
        default:
            return state;
    }
}

export default myReducer;
