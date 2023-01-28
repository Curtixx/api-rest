import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model{
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 100],
            msg: 'Name needs 3 to 100 characters',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 100],
            msg: 'Last name needs 3 to 100 characters',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: {
          msg: 'This email already exists',
        },
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Invalid e-mail',
          },
        },
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Age must be numerical',
          },
        },
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Weight needs to be numeric',
          },
        },
      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'The height must be numeric',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Archive, { foreignKey: 'aluno_id' });
  }
}
