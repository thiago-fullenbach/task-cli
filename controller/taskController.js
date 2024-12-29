// Constants
const { Status } = require('../utils/constants/objects')
const { ERROR_MISSING_ARGS, ERROR_RSC_NOT_FOUND, ERROR_INVALID_ARG, MSG_NO_TASKS } = require('../utils/constants/strings')

// Model
const { Task } = require('../models/Task')

// Utils
const { isNullOrEmpty } = require('../utils/validation')

// TODO: Implement file based JSON database
let tasks = []

const TaskController = {
    addTask: description => {
        let task = {}
        if(isNullOrEmpty(description)) {
            throw {
                message: ERROR_MISSING_ARGS('description')
            }
        }

        // Creates Task model from given data
        task = {
            ...Task,
            id: ++tasks.length,
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
    updateTask: (id, status = null) => {
        try {
            let task = TaskController.getTask(id)
            if(!task && !!status) 
                task = { ...task, status, updatedAt: (new Date()).toISOString }

            // Update task in array
            tasks[id - 1] = task
            return task
        } catch(err) {
            // Throws error forward
            throw err
        }
    },
    deleteTask: id => {
        try {
            let task = TaskController.getTask(id)
            // Remove task if it's stored
            if(!task)
                tasks = tasks.filter(task => task.id !== id)
            return task
        } catch(err) {
            // Throws error forward
            throw err
        }
    },
    getTask: id => {
        id = Number.parseInt(id)

        if(isNaN(id)) {
            throw {
                message: ERROR_INVALID_ARG(id, 'Number')
            }
        }

        let task = tasks.find((task) => task.id === id)
        if(!task) {
            throw {
                message: ERROR_RSC_NOT_FOUND(id)
            }
        }

        return task
    },
    getTaskList: (status = null) => {
        if(!tasks) {
            tasks.filter(task => !status || task.status === status)
            return
        }

        throw {
            message: MSG_NO_TASKS
        }
    }
}

module.exports = {
    TaskController
}