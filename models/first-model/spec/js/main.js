// bthread("Shop", function () {
//     sync({ request: Event('AddProductToCart', { name: 'HUMMINGBIRD PRINTED T-SHIRT' }) });
//     sync({ request: Event('AddProductToCart', { name: 'HUMMINGBIRD PRINTED T-SHIRT' }) });
//     sync({ request: Event('AddProductToCart', { name: 'HUMMINGBIRD PRINTED SWEATER' }) });
//     sync({ request: Event('Checkuout', { defaultAdress: true, defaultPaymentMethod: true }) });
// })

// bthread("Login", function () {
//     sync({ request: Event('Login', { email: 'bob.marley@provego.com', password: 'ishotthesherif' }) });
// })


bthread("Adding product A, B, and C", function () {
    sync({ request: Event('AddProductToCart', { name: 'A' }) });
    sync({ request: Event('AddProductToCart', { name: 'B' }) });
    sync({ request: Event('AddProductToCart', { name: 'C' }) });
})

bthread("Adding product 1, 2, and 3", function () {
    sync({ request: Event('AddProductToCart', { name: '1' }) });
    sync({ request: Event('AddProductToCart', { name: '2' }) });
    sync({ request: Event('AddProductToCart', { name: '3' }) });
})
