// // @pprovengo summon selenium


// /**
//  * An helper for defining actions.
//  *
//  * @param {string} name - The name of the action to be defined.
//  * @param {Function} func - The function to be executed when the action is triggered. This function should accept two parameters: the session and the data associated with the action.
//  *
//  * The function adds a new method to the SeleniumSession object. This method, when called, triggers the start of the action and executes the provided function.
//  * The function also blocks any other start actions in the same session while the provided function is being executed.
//  *
//  */
// defineAction = function (name, func) {
//     // Check that the name is a valid identifier
//     if (!/^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/.test(name)) {
//         throw new Error('The name parameter must be a valid identifier');
//     }
//     // Check that func is a function
//     if (typeof func !== 'function') {
//         throw new Error('The func parameter must be a function');
//     }

//     // Define an event filter for start events in a session
//     const AnyStartInSession = function (s) {
//         return bp.EventSet("AnyStartInSession-" + s, function (e) {
//             return e.data !== null && e.data.hasOwnProperty('startEvent') && e.data.startEvent && String(s).equals(e.data.session.name);
//         });
//     };

//     // Add the new action to the SeleniumSession prototype
//     SeleniumSession.prototype[name] = function (data) {
//         let session = this;

//         // Request a start event
//         var startData = Object.assign({ session: session, startEvent: true }, data);
//         sync({ request: bp.Event(`Start(${name})`, startData) });


//         // Block any other start events in the session while the function is executing
//         block(AnyStartInSession(this.name), function () {
//             func(session, data);

//             // Request an end event
//             var endData = Object.assign({ session: session, endEvent: true }, data);
//             sync({ request: bp.Event(`End(${name})`, endData) });
//         });

//     };
// }
