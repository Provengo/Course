
//const URL = 'https://demo.prestashop.com/#/en/login'

const N = 1

// for (var i = 0; i < N; i++) {
//     bthread(`Login users in session ${i}`, function () {

//         let s = new SeleniumSession("my session").start(URL)

//         // Switch to the iframe where the store is loaded
//         //s.switchFrame("//iframe[contains(@id,'framelive')]")

//         // // Login to the store with different users
//         // login(s, { email: 'user1@provengo.com', password: 'password1' })
//         // login(s, { email: 'user2@provengo.com', password: 'password2' })
//     })
// }
const URL = 'http://localhost:8080'

// bthread("1", function () {
//     let s = new SeleniumSession("session1").start(URL)

//     login(s, { email: 'bob.smith@prestashop.com', password: 'bob.smith@prestashop.com' })
//     addToCart(s, { name: 'HUMMINGBIRD PRINTED T-SHIRT' })
// })

// bthread("2", function () {
//     let s = new SeleniumSession("session2").start(URL)

//     login(s, { email: 'alice.wang@prestahsop.com', password: 'alice.wang@prestahsop.com' })
//     addToCart(s, { name: 'HUMMINGBIRD PRINTED T-SHIRT' })
// })




bthread("Shop", function () {
    let s = new SeleniumSession("session").start(URL)
    addToCart(s, { name: 'HUMMINGBIRD PRINTED T-SHIRT' })
    addToCart(s, { name: 'HUMMINGBIRD PRINTED T-SHIRT' })
    addToCart(s, { name: 'HUMMINGBIRD PRINTED SWEATER' })
    checkout(s, { defaultAdress: true, defaultPaymentMethod: true })
})

bthread("Login", function () {
    let session = new SeleniumSession("session").start(URL)
    session.login({ email: 'bob.marley@provego.com', password: 'ishotthesherif' })
})


// bthread("Checkout", function () {
//     let s = new SeleniumSession("session").start(URL)
//     checkout(s, { defaultAdress: true, defaultPaymentMethod: true })
// })


bthread("Correction", function () {
    let s = new SeleniumSession("session").start(URL)
    sync({
        waitFor: Event('End(login)', { endEvent: true, session: s, parameters: { email: 'bob.marley@provego.com', password: 'ishotthesherif' } }),
        block: Event('Start(checkout)', { startEvent: true, session: s, parameters: { defaultAdress: true, defaultPaymentMethod: true } })
    })
})









