#!/usr/bin/env node
const { argv } = require('node:process')

// Constants
const { Command, Status } = require('./utils/constants/objects')
const { MSG_SUCCESS_ADD_TASK, ERROR_CMD_NOT_FND } = require('./utils/constants/strings')

// Controller
const { TaskController } = require('./controller/TaskController')

const [ cmd, ...args ] = argv.slice(2)

try {
    switch(cmd) {
        case Command.ADD:
            let taskToAdd = TaskController.addTask(args.join(' '))
            console.log(MSG_SUCCESS_ADD_TASK(taskToAdd))
            break
        case Command.UPDATE:
            TaskController.updateTask(args[0], args[1])
            break
        case Command.DELETE:
            TaskController.deleteTask(args[0])
            break
        case Command.MARK_IN_PROGRESS:
            TaskController.updateTask(args[0], Status.IN_PROGRESS)
            break
        case Command.MARK_DONE:
            TaskController.updateTask(args[0], Status.DONE)
            break
        case Command.LIST:
            let tasks = TaskController.getTaskList(args[0])
            if(!tasks && tasks.length > 0)
                console.log(tasks.join("\n"))
            break
        case Command.HELP:
            console.log(`Ajuda`)
            break
        default:
            // Given command not found.
            console.error(ERROR_CMD_NOT_FND(cmd))
    }
} catch(err) {
    console.error(err.message)
}