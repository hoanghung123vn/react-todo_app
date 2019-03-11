import * as types from '../constants/ActionTypes';

export const listAll = () => {
    return {
        type: types.LIST_ALL
    };
}

export const addTask = task => {
    return {
        type: types.ADD_TASK,
        task: task
    };
}

export const tonggleForm = () => {
    return {
        type: types.TONGGLE_FORM
    };
}

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM
    };
}

export const openForm = () => {
    return {
        type: types.OPEN_FORM
    };
}

export const updateStatusTask = (id) => {
    return {
        id,
        type: types.UPDATE_STATUS_TASK
    };
}

export const deleteTask = (id) => {
    return {
        id,
        type: types.DELETE_TASK
    }
}
