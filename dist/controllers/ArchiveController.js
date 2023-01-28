"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _Archive = require('../models/Archive'); var _Archive2 = _interopRequireDefault(_Archive);
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);

const upload = _multer2.default.call(void 0, _multer4.default).single('archive');

class ArchiveController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (!err) {
        try {
          const { originalname, filename } = req.file;
          const { aluno_id } = req.body;
          const alunos = await _Aluno2.default.findByPk(aluno_id);
          if (!alunos) {
            return res.status(400).json({
              errors: ['Non-existent student id'],
            });
          }
          const archive = await _Archive2.default.create({ originalname, filename, aluno_id });
          return res.json(archive);
        } catch (e) {
          return res.status(400).json({
            errors: ['Non-existent student'],
          });
        }
      }
      return res.status(400).json({
        errors: [err.code],
      });
    });
  }
}
exports. default = new ArchiveController();
