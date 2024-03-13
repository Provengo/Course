const SESSIONS = [
    {
        name: "s1", 
            customer: Customer('bob.smith@prestashop.com', 'Bob', 'Smith', 'bob.smith@prestashop.com', Address('16 Main St', 'Paris', 'France', '75002'), true, []), 
            products: [Product(…), Product(…)]
    },
    { name: "s2", customer: Customer(…), products: [Product(…), Product(…)] },
]

SESSIONS.forEach(session => {
    bthread("shopping", function () {
        with (new SeleniumSession(session.name).start(URL)) {
            for (i in session.products)
                addToCart(session.products[i]);

            checkout()
        }
    })

    bthread("login", function () {
        with (new SeleniumSession(session.name).start(URL)) {
            login(session.customer)
        }
    })

    bthread("dont-checkout-before-login", function () {
        sync({
            waitFor: EventSet("", e => e.name == "End(login)" && e.data.session.name == session.name),
            block: EventSet("", e => e.name == "Start(checkout)" && e.data.session.name == session.name)
        });
    })
})