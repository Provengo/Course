// @provengo summon selenium

SeleniumSession.prototype.login = function (user) {
    sync({ request: Event('Start(login)', { session: this, startEvent: true, payload: user }) });
};

bthread('login-triggerer', function () {
    while (true) {
        e = sync({ waitFor: EventSet("StartLogin", e => e.data != null && e.data.startEvent == true) });

        user = e.data.payload;
        bthread('login-worker', function () {
            with (e.data.session) {
                click('//span[contains(.,"Sign in")]')
                writeText('//input[@id="field-email"]', user.email)
                writeText('//input[@id="field-password"]', user.password)
                click('//button[@id="submit-login"]')

                sync({ request: Event('End(login)', { session: e.data.session, endEvent: true, payload: user }) });
            }
        })
    }
})




// /**
//  * Login to the store as a regular user.
//  * 
//  * @param {Session} session - The session to use.
//  * @param {object} data - An object with the customer's email and password.
//  */
// defineAction("login", function (session, user) {
//     with (session) {
//         click("//span[contains(.,'Sign in')]")
//         writeText('//input[@id="field-email"]', user.email)
//         writeText('//input[@id="field-password"]', user.password)
//         click('//button[@id="submit-login"]')
//     }
// })





// /**
//  * Add a product to the cart.
//  * 
//  * @param {Session} session - The session to use.
//  * @param {object} data - An object with the product's name
//  */
// defineAction("addToCart", function (session, product) {
//   with (session) {
//     writeText('//input[@name="s"]', product.name + '\n')
//     click('(//div[@id="js-product-list"]//a)[1]')
//     click('//button[@data-button-action="add-to-cart"]')
//     click('//div[h4[contains(text(),"Product successfully added to your shopping cart")]]/button')
//   }
// })


// /**
//  * Checkout.
//  * 
//  * @param {Session} session - The session to use.
//  * @param {object} data - An object with the product's name
//  */
// defineAction("checkout", function (session, data) {
//   with (session) {
//     click('//*[@id="_desktop_cart"]//a')
//     click("//a[contains(.,'Proceed to checkout')]")
//     click("//button[contains(@name,'confirm-addresses')]")
//     click("//button[contains(@name,'confirmDeliveryOption')]")
//     click("//input[@name='conditions_to_approve[terms-and-conditions]']")
//     click("//button[contains(.,'Place order')]")
//     waitForVisibility("//*[contains(.,'Your order is confirmed')]")
//   }
// })
