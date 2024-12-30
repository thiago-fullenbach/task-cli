// Constants
const { Status } = require('../utils/constants/objects')

// Model
const { Task } = require('../models/Task')

// Utils
const Database = require('../utils/db')

const TaskController = {
    addTask: async description => {
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
    updateTaskDesc: async (id, description = null) => {
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
        return await Database.deleteTask(id)
    },
    getTask: async id => {
        return await Database.readTask(id)
    },
    getTaskList: async (status = null) => {
        // Only returns the list of tasks if either status arg is defined and valid, 
        // or if status is undefined (in this case, get all tasks).
        return await Database.readTasks(status)
    }
}

module.exports = {
    TaskController
}