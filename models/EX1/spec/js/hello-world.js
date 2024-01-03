bthread("1", function () {
    sync({ request: Event("A") })
    sync({ request: Event("A") })
})

bthread("2", function () {
    sync({ request: Event("B") })
    sync({ request: Event("B") })
})


bthread("3", function () {
    sync({ request: Event("C") })
    sync({ request: Event("C") })
})


bthread("3", function () {
    sync({ waitFor: Event("A") })
    sync({ waitFor: Event("A"), block: Event("C") })
})