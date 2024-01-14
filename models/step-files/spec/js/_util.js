// @provengo summon selenium

// Define an event filter for start events in a session
const AnyStartInSession = function (s) {
    return EventSet("AnyStartInSession-" + s, function (e) {
        return e.data !== null && e.data.hasOwnProperty('startEvent') && e.data.startEvent && String(s).equals(e.data.session.name)
    })
}

// A utility function to define a new action
function defineAction(name, func) {
    // Add the new action to the SeleniumSession prototype
    SeleniumSession.prototype[name] = function (data) {
        let session = this;

        // Request a start event
        sync({ request: Event(`Start(${name})`, { session: session, startEvent: true, parameters: data }) })

        // Block any other start events in the session while the function is executing
        block(AnyStartInSession(this.name), function () {
            // Execute the function
            func(session, data)

            // Request an end event
            sync({ request: Event(`End(${name})`, { session: session, endEvent: true, parameters: data }) })
        })
    }
}