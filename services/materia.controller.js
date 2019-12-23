// import Materia from '../models/User'
// import logger from '../core/logger/app-logger'

// const controller = {};

// controller.getAll = async (req, res) => {
//     try {
//         const materias = await Materia.getAll();
//         logger.info('sending all materias...');
//         res.send({sucess: true,message:"",object: materias});
//     }
//     catch(err) {
//         logger.error('Error in getting materias- ' + err);
//         res.send({sucess: false,message:"Erro ao buscar: " + err,object: []});
//     }
// }

// controller.updateMateria = async (req,res) => {
//     let materiaToUpdate = Materia.findOne({nome: req.body.nome})
//     try{
//         materiaToUpdate = req.body
//         const updatedMateria = await Materia.updateMateria(materiaToUpdate);
//         logger.info('Updating materia...');
//         res.send({sucess: true,message: "Atualizado com sucesso", object: updatedMateria});
//     }
//     catch(err) {
//         logger.error('Error in getting materias- ' + err);
//         res.send({sucess: false,message: "Erro ao atualizar: " + err, object: []});
//     }
// }

// controller.addMateria = async (req, res) => {
//     let materiaToAdd = Materia({
//         nome: req.body.nome,
//         professor: req.body.professor,
//         fase: req.body.fase,
//         sala: req.body.sala,
//         bloco: req.body.bloco,
//         urlImg: req.body.urlImg
//     });
//     try {
//         const savedMateria = await Materia.addMateria(materiaToAdd);
//         logger.info('Adding materia...');
//         res.send({sucess: true,message: "Adicionado com sucesso", object: savedMateria});
//     }
//     catch(err) {
//         logger.error('Error in getting materias- ' + err);
//         res.send({sucess: false,message: "Erro ao adicionar: " + err, object: []});
//     }
// }

// controller.deleteMateria = async (req, res) => {
//     let nomeMateria = req.body.nome;
//     try{
//         const removedMateria = await Materia.removeMateria(nomeMateria);
//         logger.info('Deleted Materia- ' + removedMateria);
//         res.send({sucess: true,message: "Removido com sucesso", object: removedMateria});
//     }
//     catch(err) {
//         logger.error('Failed to delete materia- ' + err);
//         res.send({sucess: false,message: "Erro ao deletar" + err, object: []});
//     }
// }

// export default controller;