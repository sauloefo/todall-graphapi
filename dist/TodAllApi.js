"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TodAllApi = /** @class */ (function () {
    function TodAllApi(storage) {
        this.storage = storage;
    }
    TodAllApi.prototype.retrieveTodo = function () {
        return this.storage.retrieve();
    };
    TodAllApi.prototype.saveTodo = function (todo) {
        console.log('saveTodo: ', todo);
        this.storage.save(todo);
    };
    return TodAllApi;
}());
exports.default = TodAllApi;
