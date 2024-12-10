// Constants
const INVALID_ID = -1
const INVALID_STATUS = -1

// Task Model
const Task = {
    id: INVALID_ID,
    description: "",
    status: INVALID_STATUS,
    createdAt: "",
    updatedAt: ""
}

// Status Enumerator
const Status = Object.freeze({
    TODO: 0,
    IN_PROGRESS: 1,
    DONE: 2
})

module.exports = {
    INVALID_ID,
    INVALID_STATUS,
    Task,
    Status
}