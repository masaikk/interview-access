const request = indexedDB.open("library");
let db;

request.onupgradeneeded = function() {
    // The database did not previously exist, so create object stores and indexes.
    const db = request.result;
    const store = db.createObjectStore("books", {keyPath: "isbn"});
    const titleIndex = store.createIndex("by_title", "title", {unique: true});
    const authorIndex = store.createIndex("by_author", "author");

    // Populate with initial data.
    store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
    store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
    store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
};

request.onsuccess = function() {
    db = request.result;
};


const tx = db.transaction("books", "readonly");
const store = tx.objectStore("books");
const index = store.index("by_title");

const request = index.get("Bedrock Nights");
request.onsuccess = function() {
    const matching = request.result;
    if (matching !== undefined) {
        // A match was found.
        report(matching.isbn, matching.title, matching.author);
    } else {
        // No match was found.
        report(null);
    }
};
