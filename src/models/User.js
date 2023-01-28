import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model{
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Name needs 3 to 100 characters',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'This email already exists',
        },
        validate: {
          isEmail: {
            msg: 'Invalid e-mail',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 20],
            msg: 'Password must be between 6 and 20 characters long',
          },
        },
      },
    }, {
      sequelize,
    });
    this.addHook('beforeSave', async (user) => {
      if (user.password){
        user.password_hash = await bcryptjs.hash(user.password, 10);
      }
    });
    return this;
  }

  passwordIsset(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
