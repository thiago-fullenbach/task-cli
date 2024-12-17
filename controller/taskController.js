// Constants
const { Status } = require('../utils/constants/objects')
const { MISSING_ARGS_ERROR } = require('../utils/constants/strings')

// Model
const { Task } = require('../models/Task')

// Utils
const { isNullOrEmpty } = require('../utils/validation')

// TODO: Implement file based JSON database
let tasks = []
let lastId = 0

const TaskController = {
    addTask: description => {
        let task = {}
        if(isNullOrEmpty(description)) {
            throw {
                message: MISSING_ARGS_ERROR('description')
            }
        }

        // Creates Task model from given data
        task = {
            ...Task,
            id: ++lastId,
            description,
            status: Status.TODO,
            createdAt: (new Date()).toISOString()
        }

        // Adds to memory
        tasks = [
            task,
            ...tasks
        ]

        return task
    },
    updateTask: (id, task) => console.log(`Update Task with ID=${id}: ${task}`),
    deleteTask: id => console.log(`Delete Task with ID=${id}`),
    getTask: id => console.log(`Get Task with ID=${id}`),
    getTaskList: (status = null) => console.log(`Get All Tasks with STATUS=${status}`)
}

module.exports = {
    TaskController
}