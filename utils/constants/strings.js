const MSG_CLI_USAGE = `\n\nUsage: task-cli <COMMAND> [ARGUMENTS]\nType 'task-cli help' to list all available commands.`
const MSG_NO_TASKS = 'No tasks found with the specified filters.'
const MSG_SUCCESS_ADD_TASK = (task) => `Task created successfully: ID=${task.id}`
const MSG_SUCCESS_UPDATE_TASK = (task) => `Task updated successfully: ID=${task.id}, DESCRIPTION=${task.description}, STATUS=${task.status.name}`
const MSG_SUCCESS_DELETE_TASK = (id) => `Task deleted successfully: ID=${id}`
const MSG_HELP = `
===============================================
            TASK MANAGER CLI
===============================================

Welcome to the Task Manager CLI!

Use the commands below to manage your tasks. Each command has a specific format. Read the instructions carefully.

------------------------------------------------
AVAILABLE COMMANDS:
------------------------------------------------

1. add <description>  
   Adds a new task with the provided description (Max description size: 100 characters). The task will be created with the status 'TODO'. 
   Example:  
       task-cli add 'Buy bread and milk'

2. update <id> <description>  
   Updates the description of an existing task based on its ID (Max description size: 100 characters).  
   Example:  
       task-cli update 1 'Buy whole grain bread and skim milk'

3. delete <id>  
   Removes a task from the list based on its ID.  
   Example:  
       task-cli delete 3

4. mark-in-progress <id>  
   Updates a task's status to 'In Progress'. Use this command to indicate that you have started working on a task.  
   Example:  
       task-cli mark-in-progress 2

5. mark-done <id>  
   Updates a task's status to 'Done'. Use this command when a task is completed.  
   Example:  
       task-cli mark-done 5

6. list [status]  
   Lists all tasks. Optionally, you can filter tasks by status:  
       - 'todo': Lists pending tasks.  
       - 'in-progress': Lists tasks in progress.  
       - 'done': Lists completed tasks.  
   Examples:  
       task-cli list (lists all tasks)  
       task-cli list todo (lists only tasks with 'TODO' status)

------------------------------------------------
TIPS:  
------------------------------------------------

- Make sure to use the correct IDs when manipulating tasks.  
- Use the 'list' command to view task IDs and statuses before performing specific actions.

===============================================
`

const ERROR_CMD_NOT_FND = (cmd) => getCLIErrorMsg(`Command not found: '${cmd}'`)
const ERROR_INVALID_ARG_TYPE = (arg, expectedType) => getCLIErrorMsg(`Unexpected type ${typeof arg} - Expected ${expectedType}`)
const ERROR_INVALID_ARG_VALUE = (value) => getCLIErrorMsg(`Invalid value: ${value}`)
const ERROR_INVALID_DESC_SIZE = () => getCLIErrorMsg(`Task description must be 100 characters or less`)
const ERROR_INVALID_STATUS = (arg) => getCLIErrorMsg(`Invalid status: ${arg}`)
const ERROR_MISSING_ARGS = (argName) => getCLIErrorMsg(`Missing arguments: '${argName}'`)
const ERROR_RSC_NOT_FOUND = (id) => `Reference object with ID=${id} not found`

// Default error msg
const getCLIErrorMsg = (error) => `${error}${MSG_CLI_USAGE}`

module.exports = {
    MSG_NO_TASKS,
    MSG_SUCCESS_ADD_TASK,
    MSG_SUCCESS_UPDATE_TASK,
    MSG_SUCCESS_DELETE_TASK,
    MSG_HELP,
    ERROR_CMD_NOT_FND,
    ERROR_INVALID_ARG_TYPE,
    ERROR_INVALID_ARG_VALUE,
    ERROR_INVALID_DESC_SIZE,
    ERROR_INVALID_STATUS,
    ERROR_MISSING_ARGS,
    ERROR_RSC_NOT_FOUND
}