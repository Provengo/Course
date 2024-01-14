const URL = 'https://www.google.com'

bthread("Search", function () {
    let s = new SeleniumSession("session").start(URL)
    s.searchPizza({ searchTerm: "pizza" })
})
