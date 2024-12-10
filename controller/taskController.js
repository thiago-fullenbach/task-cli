const { INVALID_STATUS } = require('../models/taskModel')

// TODO: Implementar armazenamento em arquivos JSON
const tasks = []

const addTask = (task) => {
    console.log(`Add Task: ${task}`)
}

const updateTask = (id, task) => {
    console.log(`Update Task with ID=${id}: ${task}`)
}

const deleteTask = (id) => {
    console.log(`Delete Task with ID=${id}`)
}

const getTask = (id) => [
    // Used only internally, as per project description
    console.log(`Get Task with ID=${id}`)
]

const getTaskList = (status = INVALID_STATUS) => {
    console.log(`Get All Tasks with STATUS=${status}`)
}

const markTaskAs = (status = INVALID_STATUS) => {
    console.log(`Mark Task as ${status}`)
}

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    getTaskList,
    markTaskAs
}