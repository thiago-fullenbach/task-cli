const Command = Object.freeze({
    ADD: "add",
    UPDATE: "update",
    DELETE: "delete",
    MARK_IN_PROGRESS: "mark-in-progress",
    MARK_DONE: "mark-done",
    LIST: "list",
    HELP: "help"
})

const Status = Object.freeze({
    TODO: 0,
    IN_PROGRESS: 1,
    DONE: 2
})

module.exports = {
    Command,
    Status
}