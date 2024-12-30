#!/usr/bin/env node
const { argv } = require('node:process')

// Constants
const { Command, Status } = require('./utils/constants/objects')
const { MSG_SUCCESS_ADD_TASK, ERROR_CMD_NOT_FND, MSG_NO_TASKS, MSG_HELP, MSG_SUCCESS_UPDATE_TASK, MSG_SUCCESS_DELETE_TASK } = require('./utils/constants/strings')

// Controller
const { TaskController } = require('./controller/TaskController')

const [ cmd, ...args ] = argv.slice(2)
const runCLICmd = async (cmd, args) => {
    try {
        switch(cmd) {
            case Command.ADD:
                let addedTask = await TaskController.addTask(args.join(' '))
                console.log(MSG_SUCCESS_ADD_TASK(addedTask))
                break
            case Command.UPDATE:
                let updatedTask = await TaskController.updateTaskDesc(args[0], args[1])
                console.log(MSG_SUCCESS_UPDATE_TASK(updatedTask))
                break
            case Command.DELETE:
                let success = await TaskController.deleteTask(args[0])
                if(success) console.log(MSG_SUCCESS_DELETE_TASK(args[0]))
                break
            case Command.MARK_IN_PROGRESS:
                let taskInProgress = await TaskController.updateTaskStatus(args[0], Status.IN_PROGRESS)
                if(taskInProgress.status === Status.IN_PROGRESS) console.log(MSG_SUCCESS_UPDATE_TASK(taskInProgress))
                break
            case Command.MARK_DONE:
                let taskDone = await TaskController.updateTaskStatus(args[0], Status.DONE)
                if(taskDone.status === Status.DONE) console.log(MSG_SUCCESS_UPDATE_TASK(taskDone))
                break
            case Command.LIST:
                let tasks = await TaskController.getTaskList(args[0])
                if(tasks && tasks.length > 0) console.log(tasks.map(task => JSON.stringify(task)))
                else console.log(MSG_NO_TASKS)
                break
            case Command.HELP:
                console.log(MSG_HELP)
                break
            default:
                // Given command not found.
                console.error(ERROR_CMD_NOT_FND(cmd))
        }
    } catch(err) {
        // TODO: Show stacktrace, if development mode.
        console.error(err.message)
    }
}

// Run Command on CLI
runCLICmd(cmd, args)