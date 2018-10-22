"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var TodAllApi_1 = __importDefault(require("./TodAllApi"));
var InMemoryStorage_1 = __importDefault(require("./InMemoryStorage"));
exports.schema = graphql_1.buildSchema("\n  type Todo {\n    title: String!\n  }\n\n  input TodoInput {\n    title: String!\n  }\n\n  type Query {\n    retrieve: [Todo!]!\n  }\n\n  type Mutation {\n    save(todo: TodoInput): String\n  }\n");
var storage = new InMemoryStorage_1.default();
var api = new TodAllApi_1.default(storage);
exports.resolver = {
    retrieve: function () {
        return api.retrieveTodo();
    },
    save: function (args) {
        api.saveTodo(args.todo);
        return '';
    }
};
