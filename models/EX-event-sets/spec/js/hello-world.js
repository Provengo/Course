const events = [
    Event('A', { length: 10, age: 7 }),
    Event('B', { length: 12, age: 3 }),
    Event('A', { length: 1, age: 2 }),
    Event('B', { length: 2, age: 3 }),
];

// For each event, create a bthread and sync the event
events.forEach((event, index) => {
    bthread(`bthread-${index}`, function () {
        bp.sync({ request: event });
    });
});

bthread("", function () {
    bp.sync({
        waitFor:
            new EventSet("length < age", e => e.data.length < e.data.age),
        block:
            new EventSet("age <= lentgh", e => e.data.length >= e.data.age)
    });
});