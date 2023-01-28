import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json('There are no users');
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      const { nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json('User does not exist');
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user){
        return res.status(400).json({
          errors: ['User does not exist'],
        });
      }
      const newData = await user.update(req.body);
      const { id, nome, email } = newData;
      return res.json({ id, nome, email });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user){
        return res.status(400).json({
          errors: ['User does not exist'],
        });
      }
      await user.destroy();
      return res.json(`Deleted! ${user.nome}`);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
export default new UserController();
