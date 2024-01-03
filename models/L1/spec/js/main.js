const SESSION = "customer-session"

bthread("", function () {
    with (new SeleniumSession(SESSION).start(URL)) {
        addToCart(choose(products))
        addToCart(choose(products))
        checkout()
    }
})

bthread("", function () {
    with (new SeleniumSession(SESSION).start(URL)) {
        login(choose(customers))
    }
})

bthread("", function () {
    sync({
        waitFor: EventSet("", e => e.name == "End(login)" && e.data.session.name == SESSION),
        block: EventSet("", e => e.name == "Start(checkout)" && e.data.session.name == SESSION)
    });
})
