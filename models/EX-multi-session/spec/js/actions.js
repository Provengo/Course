// @provengo summon selenium

const AnyStartInSession = function (s) {
    return bp.EventSet("AnyStartInSession-" + s.name, function (e) {
        return e.data !== null && e.data.hasOwnProperty('startEvent') && e.data.startEvent && s.name.equals(e.data.session.name);
    });
};

function login(session, user) {
    sync({ request: Event('Start(login)', { startEvent: true, session: session, parameters: user }) })

    block(AnyStartInSession(session), function () {
        with (session) {
            click('//span[contains(.,"Sign in")]')
            writeText('//input[@id="field-email"]', user.email)
            writeText('//input[@id="field-password"]', user.password)
            click('//button[@id="submit-login"]')

            sync({ request: Event('End(login)', { endEvent: true, session: session, parameters: user }) });
        }
    })
}

