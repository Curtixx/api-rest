import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/app';

export default class Archive extends Model{
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Field cannot be empty or null',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Field cannot be empty or null',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get(){
          return `${appConfig.url}/img/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'archive',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}
