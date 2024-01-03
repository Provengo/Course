const SESSION = "customer-session"

bthread("", function () {
    sync({ request: Event('Login', { email: 'bob.marley@provego.com', password: 'ishotthesherif' }) });
    sync({ request: Event('AddProductToCart', { name: 'HUMMINGBIRD PRINTED T-SHIRT' }) });
    sync({ request: Event('AddProductToCart', { name: 'HUMMINGBIRD PRINTED SWEATER' }) });
    sync({ request: Event('Checkuout', { defaultAdress: true, defaultPaymentMethod: true }) });
})

