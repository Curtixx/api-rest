import Aluno from '../models/Aluno';
import Archive from '../models/Archive';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Archive, 'id', 'DESC']],
      include: {
        model: Archive,
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
      const aluno = await Aluno.create(req.body);
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
      const aluno = await Aluno.findByPk(id);
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
      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Archive, 'id', 'DESC']],
        include: {
          model: Archive,
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
      const aluno = await Aluno.findByPk(id);
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
export default new AlunoController();
