import multerjs from 'multer';
import multer from '../config/multer';
import Archive from '../models/Archive';
import Aluno from '../models/Aluno';

const upload = multerjs(multer).single('archive');

class ArchiveController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (!err) {
        try {
          const { originalname, filename } = req.file;
          const { aluno_id } = req.body;
          const alunos = await Aluno.findByPk(aluno_id);
          if (!alunos) {
            return res.status(400).json({
              errors: ['Non-existent student id'],
            });
          }
          const archive = await Archive.create({ originalname, filename, aluno_id });
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
export default new ArchiveController();
