// bthread("Shop", function () {
//     sync({ request: Event('AddProductToCart', { name: 'HUMMINGBIRD PRINTED T-SHIRT' }) })
//     sync({ request: Event('AddProductToCart', { name: 'HUMMINGBIRD PRINTED T-SHIRT' }) })
//     sync({ request: Event('AddProductToCart', { name: 'HUMMINGBIRD PRINTED SWEATER' }) })
//     sync({ request: Event('Checkuout', { defaultAdress: true, defaultPaymentMethod: true }) })
// })

// bthread("Login", function () {
//     sync({ request: Event('Login', { email: 'bob.marley@provego.com', password: 'ishotthesherif' }) })
// })


// bthread("Login", function () {
//     sync({
//         waitFor: Event('Login', { email: 'bob.marley@provego.com', password: 'ishotthesherif' }),
//         block: Event('Checkuout', { defaultAdress: true, defaultPaymentMethod: true })
//     })
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

const pairs = [['A', '1'], ['B', '2'], ['C', '3']]

// pairs.forEach(p => {
//     bthread(String(p), function () {
//         bp.log.info(`p=${p}`)
//         sync({
//             waitFor: Event('AddProductToCart', { name: p[0] }),
//             block: Event('AddProductToCart', { name: p[1] })
//         })
//     })
// })