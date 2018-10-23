"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('pkginfo')(module, 'version');
var version = module.exports.version;
console.log("Initializing TodALL GrapAPI version " + version + "...");
var express_1 = __importDefault(require("express"));
var express_graphql_1 = __importDefault(require("express-graphql"));
var GraphApi_1 = require("./GraphApi");
var apiPath = "/v" + version;
var apiPort = process.env.PORT || 4000;
var hostname = process.env.HOSTNAME || 'localhost';
var enableGraphiQL = Boolean(process.env.ENABLE_GRAPHIQL);
var enableCORS = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};
var app = express_1.default()
    .use(enableCORS)
    .use(apiPath, express_graphql_1.default({
    schema: GraphApi_1.schema,
    rootValue: GraphApi_1.resolver,
    graphiql: enableGraphiQL
}));
var entryURL = "http://" + hostname + ":" + apiPort + apiPath + "/";
app.listen(apiPort)
    .on('listening', function () { return console.log("TodALL GraphAPI (version " + version + ") running on " + entryURL + "."); })
    .on('error', function (error) { return console.error("Failure to initialize TodALL GraphAPI (version " + version + ") on " + entryURL + ":", error); });
