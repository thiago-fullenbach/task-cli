// Constants
const { Status, Command } = require('../utils/constants/objects')
const { ERROR_MISSING_ARGS, ERROR_INVALID_ARG_VALUE, ERROR_INVALID_STATUS } = require('../utils/constants/strings')

// Model
const { Task } = require('../models/Task')

// Utils
const { isNullOrEmpty, validateId, validateDesc } = require('../utils/validation')
const Database = require('../utils/db')

const TaskController = {
    addTask: async description => {
        description = validateDesc(description)

        // Creates Task model from given data
        let task = {
            ...Task,
            description: description.trim(),
            status: Status.TODO,
            createdAt: (new Date()).toISOString()
        }

        // Adds to memory
        return await Database.addTask(task)
    },
    updateTaskDesc: async (id, description = null) => {
        id = validateId(id)
        description = validateDesc(description)
        let task = await TaskController.getTask(id)

        task = { 
            ...task, 
            description: description.trim(),
            updatedAt: (new Date()).toISOString() 
        }

        // Update task in array
        return await Database.updateTask(id, task)
    },
    updateTaskStatus: async (id, status = null) => {      
        if(!status) 
            throw { message: ERROR_INVALID_ARG_VALUE('status') }

        id = validateId(id)
        let task = await TaskController.getTask(id)

        task = { 
            ...task, 
            status,
            updatedAt: (new Date()).toISOString() 
        }

        // Update task in array
        return await Database.updateTask(id, task)
    },
    deleteTask: async id => {
        return await Database.deleteTask(validateId(id))
    },
    getTask: async id => {
        return await Database.readTask(validateId(id))
    },
    getTaskList: async (status = null) => {
        let objStatus = Status.getByName(status)

        if(status && !objStatus) {
            throw { message: ERROR_INVALID_STATUS(status) }
        }

        // Only returns the list of tasks if either status arg is defined and valid, 
        // or if status is undefined (in this case, get all tasks).
        return await Database.readTasks(objStatus)
    }
}

module.exports = {
    TaskController
}