// @provengo summon selenium

const URL = 'https://demo.prestashop.com/#/en/login'
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

        switchFrame('//iframe[contains(@id,"framelive")]')
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





