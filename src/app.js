import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();
import './database';

import home from './routes/home';
import user from './routes/user';
import token from './routes/token';
import aluno from './routes/aluno';
import archive from './routes/archive';

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
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/users/', user);
    this.app.use('/tokens/', token);
    this.app.use('/alunos/', aluno);
    this.app.use('/archives/', archive);
  }
}
export default new App().app;
