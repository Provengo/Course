
const URL = 'https://demo.prestashop.com/#/en/login'

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

bthread("1", function () {
    let s = new SeleniumSession("my session").start(URL)

    login(s, { email: 'user1@provengo.com', password: 'password1' })
})

bthread("2", function () {
    let s = new SeleniumSession("my session").start(URL)

    login(s, { email: 'user2@provengo.com', password: 'password2' })
})





