// @provengo summon selenium

const URL = 'https://demo.prestashop.com/#/en/login'
const SESSION = "customer-session"

user = {
    email: 'bob.smith@prestashop.com',
    password: 'bob.smith@prestashop.com'
}

bthread("", function () {
    with (new SeleniumSession().start(URL)) {
        switchFrame("//iframe[contains(@id,'framelive')]")
        waitForVisibility("//img[contains(@src,'logo')]", 50000)
        click("//span[contains(.,'Sign in')]")
        writeText('//input[@id="field-email"]', user.email)
        writeText('//input[@id="field-password"]', user.password)
        click('//button[@id="submit-login"]')
    }
})


bthread("Login using Selenium", function () {
    sync({ request: StartSession("my session", "chrome", [URL]) });

    sync({ request: SwitchFrame("my session", ["//iframe[contains(@id,'framelive')]"]) })
    sync({ request: WaitForVisibility("my session", ["//img[contains(@src,'logo.png')]"], 50000) });
    sync({ request: Click("my session", ["//span[contains(.,'Sign in')]"]) })
    sync({ request: WriteText("my session", ['//input[@id="field-email"]'], user.email, true) })
    sync({ request: WriteText("my session", ['//input[@id="field-password"]'], user.password, true) })
    sync({ request: Click("my session", ['//button[@id="submit-login"]']) })
})









// bthread("", function () {
//     with (new SeleniumSession().start(URL)) {
//         with (session) {
//             click("//span[contains(.,'Sign in')]")
//             writeText('//input[@id="field-email"]', user.email)
//             writeText('//input[@id="field-password"]', user.password)
//             click('//button[@id="submit-login"]')
//         }
//     }
// })
