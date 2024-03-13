// @provengo summon selenium
const AnyStartInSession = function (s) {
    return EventSet(
        `AnyStartInSession-${s}`,
        e => e.data != null && 'startEvent' in e.data && e.data.startEvent && s.name === e.data.session.name
    )
}

defineAction = function (name, func) {
  SeleniumSession.prototype[name] = function (data) {
    let session = this;
    
    // Request a start event
    sync({ request: bp.Event(`Start(${name})`, { session: session, startEvent: true, parameters: data }) })
    
    // Block any other start events in the session while the function is executing
    block(AnyStartInSession(session), function () {
        // Execute the function
        func(session, data)
    
        // Request an end event
        sync({ request: bp.Event(`End(${name})`, { session: session, endEvent: true, parameters: data }) })
    });
  }
}

defineAction('login', function (session, user) {
    session.click('//span[contains(.,"Sign in")]')
    session.writeText('//input[@id="field-email"]', user.email)
    session.writeText('//input[@id="field-password"]', user.password)
    session.click('//button[@id="submit-login"]')
})


function login(session, user) {
    sync({ request: Event('Start(login)', { startEvent: true, session: session, parameters: user }) })

    block(AnyStartInSession(session), function () {
        session.click('//span[contains(.,"Sign in")]')
        session.writeText('//input[@id="field-email"]', user.email)
        session.writeText('//input[@id="field-password"]', user.password)
        session.click('//button[@id="submit-login"]')

        sync({ request: Event('End(login)', { endEvent: true, session: session, parameters: user }) })
    })
}

function addToCart(session, product) {
    sync({ request: Event('Start(addToCart)', { startEvent: true, session: session, parameters: product }) })

    block(AnyStartInSession(session), function () {
        with (session) {
            writeText('//input[@name="s"]', product.name + '\n')
            click('(//div[@id="js-product-list"]//a)[1]')
            click('//button[@data-button-action="add-to-cart"]')
            click('//div[h4[contains(text(),"Product successfully added to your shopping cart")]]/button')

            sync({ request: Event('End(addToCart)', { endEvent: true, session: session, parameters: product }) })
        }
    })
}

function checkout(session, data) {
    sync({ request: Event('Start(checkout)', { startEvent: true, session: session, parameters: data }) })

    block(AnyStartInSession(session), function () {
        with (session) {
            click('//*[@id="_desktop_cart"]//a')
            click("//a[contains(.,'Proceed to checkout')]")
            click("//button[contains(@name,'confirm-addresses')]")
            click("//button[contains(@name,'confirmDeliveryOption')]")
            click("//input[@name='conditions_to_approve[terms-and-conditions]']")
            click("//button[contains(.,'Place order')]")
            waitForVisibility("//*[contains(.,'Your order is confirmed')]")

            sync({ request: Event('End(checkout)', { endEvent: true, session: session, parameters: data }) })
        }
    })
}

