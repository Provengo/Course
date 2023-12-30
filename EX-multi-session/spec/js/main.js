
const URL = 'https://demo.prestashop.com/#/en/login'


// const users = [
//     { 'email': 'bob.smith@prestashop.com', 'password': 'bob.smith@prestashop.com' },
//     { 'email': 'bob.smith@prestashop.com', 'password': 'bob.smith@prestashop.com' },
// //    { 'email': 'john.doe@example.com', 'password': 'john.doe@example.com' },
// ]


// for (var i = 0; i < 2; i++) {
//     bthread(`Login users in session ${i}`, function () {
//         with (new SeleniumSession().start(URL)) {

//             // Switch to the iframe where the store is loaded
//             switchFrame("//iframe[contains(@id,'framelive')]")

//             // Login to the store with different users
//             for (var user of users)
//                 login(user)

//         }
//     })
// }




// Create the event array
const players = ["X", "O"];

const cells = [
    { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
    { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
    { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 },
]

const moves = [
    Event("X", { row: 0, col: 0 }), Event("X", { row: 0, col: 1 }), Event("X", { row: 0, col: 2 }),
    Event("X", { row: 1, col: 0 }), Event("X", { row: 1, col: 1 }), Event("X", { row: 1, col: 2 }),
    Event("X", { row: 2, col: 0 }), Event("X", { row: 2, col: 1 }), Event("X", { row: 2, col: 2 }),
    Event("O", { row: 0, col: 0 }), Event("O", { row: 0, col: 1 }), Event("O", { row: 0, col: 2 }),
    Event("O", { row: 1, col: 0 }), Event("O", { row: 1, col: 1 }), Event("O", { row: 1, col: 2 }),
    Event("O", { row: 2, col: 0 }), Event("O", { row: 2, col: 1 }), Event("O", { row: 2, col: 2 }),
];


bthread("Continously eequest all the moves ", function () {
    while (true)
        sync({ request: moves })
})

bthread("X begins and then the players play alternatingly", function () {
    while (true) {
        sync({ waitFor: EventSet("Any X Move", e => e.name == "X"), block: EventSet("Any O Move", e => e.name == "O") })
        sync({ waitFor: EventSet("Any O Move", e => e.name == "O"), block: EventSet("Any X Move", e => e.name == "X") })
    }
})

cells.forEach(cell => {
    bthread("A cell cannot be marked more than once", function () {
        sync({ waitFor: EventSet(`Any move in ${cell}`, e => e.data.row == cell.row && e.data.col == cell.col) })
        sync({ block: EventSet(`Any move in ${cell}`, e => e.data.row == cell.row && e.data.col == cell.col) })
    })
})


players.forEach(player => {
    [0, 1, 2].forEach(i => {
        bthread(`If a player ${player} fills row ${i}, the game ends`, function () {
            sync({ waitFor: EventSet(`Any ${player} move in row ${i}`, e => e.name == player && e.data.row == i) })
            sync({ waitFor: EventSet(`Any ${player} move in row ${i}`, e => e.name == player && e.data.row == i) })
            sync({ waitFor: EventSet(`Any ${player} move in row ${i}`, e => e.name == player && e.data.row == i) })
            sync({ request: Event("End", { winner: player }), block: moves })
        })

        bthread(`If a player ${player} fills column ${i}, the game ends`, function () {
            sync({ waitFor: EventSet(`Any ${player} move in column ${i}`, e => e.name == player && e.data.col == i) })
            sync({ waitFor: EventSet(`Any ${player} move in column ${i}`, e => e.name == player && e.data.col == i) })
            sync({ waitFor: EventSet(`Any ${player} move in column ${i}`, e => e.name == player && e.data.col == i) })
            sync({ request: Event("End", { winner: player }), block: moves })
        })
    })
})

players.forEach(player => {
    bthread(`If a player ${player} fills the main diagonal, the game ends`, function () {
        sync({ waitFor: EventSet(`Any ${player} move on the main diagonal`, e => e.name == player && e.data.row == e.data.col) })
        sync({ waitFor: EventSet(`Any ${player} move on the main diagonal`, e => e.name == player && e.data.row == e.data.col) })
        sync({ waitFor: EventSet(`Any ${player} move on the main diagonal`, e => e.name == player && e.data.row == e.data.col) })
        sync({ request: Event("End", { winner: player }), block: moves })
    })
})


players.forEach(player => {
    bthread(`If a player ${player} fills the secondary diagonal, the game ends`, function () {
        sync({ waitFor: EventSet(`Any ${player} move on the main diagonal`, e => e.name == player && e.data.row == 2 - e.data.col) })
        sync({ waitFor: EventSet(`Any ${player} move on the main diagonal`, e => e.name == player && e.data.row == 2 - e.data.col) })
        sync({ waitFor: EventSet(`Any ${player} move on the main diagonal`, e => e.name == player && e.data.row == 2 - e.data.col) })
        sync({ request: Event("End", { winner: player }), block: moves })
    })
})

bthread("No events after End", function () {
    sync({ waitFor: EventSet("End", e => e.name == "End") })
    sync({ block: moves })
})








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



// const events = [
//     Event('A', { length: 10, age: 7 }),
//     Event('B', { length: 12, age: 3 }),
//     Event('A', { length: 1, age: 2 }),
//     Event('B', { length: 2, age: 3 }),
// ]

// events.forEach(e => {
//     bthread("", function () {
//         bp.sync({ request: e });
//     })
// })

// bthread("", function () {
//     bp.sync({
//         waitFor:
//             EventSet("B with small length", e => e.name == 'B' && e.data.length < 4),

//         block:
//             EventSet("A with old age", e => e.name == 'A' && e.data.age > 6)
//     });
// });
