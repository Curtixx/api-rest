"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault2(_dotenv);
var _path2 = require('path');

_dotenv2.default.config();
require('./database');

var _home = require('./routes/home'); var _home2 = _interopRequireDefault2(_home);
var _user = require('./routes/user'); var _user2 = _interopRequireDefault2(_user);
var _token = require('./routes/token'); var _token2 = _interopRequireDefault2(_token);
var _aluno = require('./routes/aluno'); var _aluno2 = _interopRequireDefault2(_aluno);
var _archive = require('./routes/archive'); var _archive2 = _interopRequireDefault2(_archive);

Object.defineProperty(exports, '__esModule', { value: true }); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _path = require('path');

const express = require('express');

const _express2 = _interopRequireDefault(express);

class App {
  constructor() {
    this.app = _express2.default.call(void 0);
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(express.static(_path2.resolve.call(void 0, __dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', _home2.default);
    this.app.use('/users/', _user2.default);
    this.app.use('/tokens/', _token2.default);
    this.app.use('/alunos/', _aluno2.default);
    this.app.use('/archives/', _archive2.default);
  }
}
exports. default = new App().app;
