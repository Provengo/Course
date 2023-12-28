// bthread("", function () {
//     bp.sync({ request: bp.Event('StartSession', { session: 'session1', selectors: ['https://www.google.com/search?tbm=isch&q=ET'] }) });
// });

// bthread("", function () {
//     bp.sync({ request: bp.Event('StartSession', { session: 'session2', selectors: ['https://www.google.com/search?tbm=isch&q=Phone'] }) });



// });



// InFirstSesion = bp.EventSet(
//     // Name the event set
//     "Session1" + s,

//     // The filter function 
//     function (e) {
//         return e.data.session == "session1";
//     }
// );


// InSecondSesion = bp.EventSet(
//     // Name the event set
//     "Session2" + s,

//     // The filter function 
//     function (e) {
//         return e.data.session == "session2";
//     }
// );



const events = [
    Event('A', { length: 10, age: 7 }),
    Event('B', { length: 12, age: 3 }),
    Event('A', { length: 1, age: 2 }),
    Event('B', { length: 2, age: 3 }),
]

events.forEach(e => {
    bthread("", function () {
        bp.sync({ request: e });
    })
})

// bthread("", function () {
//     bp.sync({
//         waitFor:
//             EventSet("B with small length", e => e.name == 'B' && e.data.length < 4),

//         block:
//             EventSet("A with old age", e => e.name == 'A' && e.data.age > 6)
//     });
// });
