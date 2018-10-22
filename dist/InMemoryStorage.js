"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InMemoryStorage = /** @class */ (function () {
    function InMemoryStorage() {
        this.storage = [];
    }
    InMemoryStorage.prototype.save = function (todo) {
        this.storage.push(todo);
    };
    InMemoryStorage.prototype.retrieve = function () {
        return this.storage;
    };
    return InMemoryStorage;
}());
exports.default = InMemoryStorage;
