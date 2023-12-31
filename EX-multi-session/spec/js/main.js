
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

// const players = ["X", "O"];


// const cells = [
//     { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
//     { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
//     { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 },
// ]

// const moves = [
//     Event("X", { row: 0, col: 0 }), Event("X", { row: 0, col: 1 }), Event("X", { row: 0, col: 2 }),
//     Event("X", { row: 1, col: 0 }), Event("X", { row: 1, col: 1 }), Event("X", { row: 1, col: 2 }),
//     Event("X", { row: 2, col: 0 }), Event("X", { row: 2, col: 1 }), Event("X", { row: 2, col: 2 }),
//     Event("O", { row: 0, col: 0 }), Event("O", { row: 0, col: 1 }), Event("O", { row: 0, col: 2 }),
//     Event("O", { row: 1, col: 0 }), Event("O", { row: 1, col: 1 }), Event("O", { row: 1, col: 2 }),
//     Event("O", { row: 2, col: 0 }), Event("O", { row: 2, col: 1 }), Event("O", { row: 2, col: 2 }),
// ];


// The size of the board
const N = 2

// An array of the two players in the game.
const players = ["X", "O"];

// An array of all the cells in the board. Each cell is an object with a row and a column.
const cells = [];
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        cells.push({ row: i, col: j });
    }
}

// An array of all the possible moves. Each move is an event with a name (X or O) and a data object with a row and a column.
const moves = [];
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        players.forEach(player => {
            moves.push(Event(player, { row: i, col: j }));
        });
    }
}

// A b-thread that continously requests all the moves in the moves array.
bthread("Continously eequest all the moves ", function () {
    while (true)
        sync({ request: moves })
})

// A b-thread that enforce the alternation between the players.
bthread("X begins and then the players play alternatingly", function () {
    while (true) {
        sync({ waitFor: EventSet("Any X Move", e => e.name == "X"), block: EventSet("Any O Move", e => e.name == "O") })
        sync({ waitFor: EventSet("Any O Move", e => e.name == "O"), block: EventSet("Any X Move", e => e.name == "X") })
    }
})

// A b-thread that enforce that a cell cannot be marked more than once.
cells.forEach(cell => {
    bthread("A cell cannot be marked more than once", function () {
        sync({ waitFor: EventSet(`Any move in ${cell}`, e => e.data.row == cell.row && e.data.col == cell.col) })
        sync({ block: EventSet(`Any move in ${cell}`, e => e.data.row == cell.row && e.data.col == cell.col) })
    })
})

// B-threads that enforce that if a player fills a row, column or diagonal, the game ends.
players.forEach(player => {
    [0,1].forEach(i => {
        bthread(`If a player ${player} fills row ${i}, the game ends`, function () {
            for (let j = 0; j < N; j++)
                sync({ waitFor: EventSet(`Any ${player} move in row ${i}`, e => e.name == player && e.data.row == i) })

            sync({ request: Event("End", { winner: player }), block: moves })
        })

        bthread(`If a player ${player} fills column ${i}, the game ends`, function () {
            for (let j = 0; j < N; j++)
                sync({ waitFor: EventSet(`Any ${player} move in column ${i}`, e => e.name == player && e.data.col == i) })

            sync({ request: Event("End", { winner: player }), block: moves })
        })
    })
})

// players.forEach(player => {
//     bthread(`If a player ${player} fills the main diagonal, the game ends`, function () {
//         for (let i = 0; i < N; i++)
//             sync({ waitFor: EventSet(`Any ${player} move on the main diagonal`, e => e.name == player && e.data.row == e.data.col) })

//         sync({ request: Event("End", { winner: player }), block: moves })
//     })
// })


// players.forEach(player => {
//     bthread(`If a player ${player} fills the secondary diagonal, the game ends`, function () {
//         for (let i = 0; i < N; i++)
//             sync({ waitFor: EventSet(`Any ${player} move on the main diagonal`, e => e.name == player && e.data.row == 2 - e.data.col) })

//         sync({ request: Event("End", { winner: player }), block: moves })
//     })
// })

bthread("No events after End", function () {
    sync({ waitFor: EventSet("End", e => e.name == "End") })
    sync({ block: moves })
})




// bthread("length", function () {
//     for (let i = 0; i < 5; i++)
//         sync({ waitFor: bp.all })
//     sync({ block: bp.all })
// })







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
