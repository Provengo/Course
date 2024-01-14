// @provengo summon selenium


defineAction('searchPizza', function (session, data) {
    session.writeText("//textarea[@type='search']", data.searchTerm)
    session.click("//input[@name='btnK']")
})