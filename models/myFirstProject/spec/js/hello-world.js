// @provengo summon selenium
bthread("", function () {new SeleniumSession().start("https://google.com")})
