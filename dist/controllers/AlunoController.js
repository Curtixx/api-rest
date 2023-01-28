"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Archive = require('../models/Archive'); var _Archive2 = _interopRequireDefault(_Archive);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Archive2.default, 'id', 'DESC']],
      include: {
        model: _Archive2.default,
        attributes: ['id', 'filename', 'url'],
      },
    });
    if (!alunos){
      return res.json('No registry');
    }
    return res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);
      return res.json(aluno);
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id){
        return res.status(400).json({
          errors: ['ID invalid'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno){
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }
      const alunoUpdate = await aluno.update(req.body);

      return res.json(alunoUpdate);
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id){
        return res.status(400).json({
          errors: ['ID invalid'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Archive2.default, 'id', 'DESC']],
        include: {
          model: _Archive2.default,
          attributes: ['id', 'filename', 'url'],
        },
      });
      if (!aluno){
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }
      return res.json(aluno);
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id){
        return res.status(400).json({
          errors: ['ID invalid'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno){
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }
      await aluno.destroy();
      return res.json(`Deleted ${aluno.nome}`);
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
exports. default = new AlunoController();
