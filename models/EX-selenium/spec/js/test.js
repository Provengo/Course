// @provengo summon selenium

//const URL = 'https://demo.prestashop.com/#/en/login'
const URL = 'http://localhost:8080'
const SESSION = "customer-session"

user = {
    email: 'bob.smith@prestashop.com',
    password: 'bob.smith@prestashop.com'
}

product = {
    name: 'HUMMINGBIRD PRINTED T-SHIRT'
}


bthread('login', function () {
    with (new SeleniumSession(SESSION).start(URL)) {
        sync({ request: Event("Begin(login)") })

        //switchFrame('//iframe[contains(@id,"framelive")]')
        waitForVisibility('//img[contains(@src,"logo")]', 50000)
        click('//span[contains(.,"Sign in")]')
        writeText('//input[@id="field-email"]', user.email)
        writeText('//input[@id="field-password"]', user.password)
        click('//button[@id="submit-login"]')

        sync({ request: Event("End(login)") })
    }
})

bthread("add to cart", function () {
    with (new SeleniumSession(SESSION).start(URL)) {
        sync({ request: Event("Begin(addToCart)") })

        writeText('//input[@name="s"]', product.name + '\n')
        click('(//div[@id="js-product-list"]//a)[1]')
        click('//button[@data-button-action="add-to-cart"]')
        click('//div[h4[contains(text(),"Product successfully added to your shopping cart")]]/button')

        sync({ request: Event("End(addToCart)") })  
    }
})

bthread('Add do card cannot start before login ends to cart', function () {
     sync({ waitFor: Event("End(login)"), block: Event("Begin(addToCart)") })
})






// // @provengo summon selenium

// const URL = "https://ecosia.org"

// const XPATHS = {
//     searchField: "//input[@name='q']",
//     submitButton: "//button[@type='submit']",
//     resultsSection: "//section[@data-test-id='mainline']",
//     body: "//body"
// }

// IgnoreCase = TextAssertions.modifiers.IgnoreCase
// Contains = TextAssertions.modifiers.Contains

// const seleniumSession = new SeleniumSession("user")

// // bthread("Search for pizza", function () {
// //     with (seleniumSession) {
// //         start(URL)
// //         waitForVisibility(XPATHS.searchField, 10000)
// //         writeText(XPATHS.searchField, "pizza")
// //         click(XPATHS.submitButton)
// //         waitForVisibility(XPATHS.resultsSection, 10000)
// //         assertText(XPATHS.resultsSection, "pizza", [IgnoreCase, Contains])
// //         waitForVisibility(XPATHS.body)
// //     }
// // })


// bthread("Search for pizza", function () {

//         sync({ request: StartSession(seleniumSession.name, "chrome", [URL]) });
//         sync({ request: WaitForVisibility(seleniumSession.name, [XPATHS.searchField], 10000) })
//         sync({ request: WriteText(seleniumSession.name, [XPATHS.searchField], "pizza", true) })
//         sync({ request: Click(seleniumSession.name, [XPATHS.submitButton]) })
//         sync({ request: WaitForVisibility(seleniumSession.name, [XPATHS.resultsSection], 10000) })
//         sync({ request: AssertText(seleniumSession.name, [XPATHS.resultsSection], "pizza", TextAssertions.toSet([IgnoreCase, Contains])) })
//         sync({ request: WaitForVisibility(seleniumSession.name, [XPATHS.body], 5000) })

// })



