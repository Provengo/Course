const events = [Event("A"), Event("B")]
const LENGTH = 3

events.forEach(function (e) {
    bthread(e.name + " sequence", function () {
        for (var i = 0; i < LENGTH; i++) {
            sync({ request: e })
        }
    })
})


// bthread("Don't allow two consecutive events of the same type", function () {
//     last = Event(undefined)

//     while (true) {
//         last = sync({ block: last, waitFor: events })
//     }
// });



bthread("Don't allow three consecutive events of the same type", function () {
    [beforeLast, last] = [Event(undefined), Event(undefined)]

    while (true) {
        [beforeLast, last] =
            [
                last,
                sync({
                    block: beforeLast.name == 'A' && last.name == 'B' ? Event("A") : [],
                    waitFor: events
                })
            ]
    }
});



/*
bthread("Three A", function () {
    sync({ request: Event("A") })
    sync({ request: Event("A") })
    sync({ request: Event("A") })
})

bthread("Three B", function () {
    sync({ request: Event("B") })
    sync({ request: Event("B") })
    sync({ request: Event("B") })
})

bthread("Three C", function () {
    sync({ request: Event("C") })
    sync({ request: Event("C") })
    sync({ request: Event("C") })
})
*/


