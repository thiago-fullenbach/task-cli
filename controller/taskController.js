// Constants
const { Status } = require('../utils/constants/objects')
const { ERROR_MISSING_ARGS, ERROR_RSC_NOT_FOUND, ERROR_INVALID_ARG_VALUE, ERROR_INVALID_ARG_TYPE, ERROR_INVALID_STATUS } = require('../utils/constants/strings')

// Model
const { Task } = require('../models/Task')

// Utils
const { isNullOrEmpty } = require('../utils/validation')
const Database = require('../utils/db')

const TaskController = {
    addTask: async description => {
        if(isNullOrEmpty(description))
            throw { message: ERROR_MISSING_ARGS('description') }

        // Creates Task model from given data
        let task = {
            ...Task,
            description,
            status: Status.TODO,
            createdAt: (new Date()).toISOString()
        }

        // Adds to memory
        return await Database.addTask(task)
    },
    updateTask: async (id, status = null) => {
        try {
            id = Number.parseInt(id)
            let task = await TaskController.getTask(id)

            if(isNaN(id))
                throw { message: ERROR_INVALID_ARG_TYPE(id, 'Number') }

            if(!status)
                throw { message: ERROR_INVALID_ARG_VALUE(status) }

            task = { 
                ...task, 
                status, 
                updatedAt: (new Date()).toISOString() 
            }

            // Update task in array
            return await Database.updateTask(id, task)
        } catch(err) {
            // Throws error forward
            throw err
        }

        return {}
    },
    deleteTask: async id => {
        try {
            id = Number.parseInt(id)

            if(isNaN(id))
                throw { message: ERROR_INVALID_ARG_TYPE(id, 'Number') }

            return await Database.deleteTask(id)
        } catch(err) {
            // Throws error forward
            throw err
        }
    },
    getTask: async id => {
        try {
            id = Number.parseInt(id)

            if(isNaN(id))
                throw { message: ERROR_INVALID_ARG_TYPE(id, 'Number') }

            return await Database.readTask(id)
        } catch(err) {
            throw err
        }
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