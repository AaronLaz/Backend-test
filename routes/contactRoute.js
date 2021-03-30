// ---------- Contact

const router = require('express').Router();
const db = require('../database/dbConfig');

//---------------- Liste des contacts pour le suivi des exposants ----------------------------------
//----------------(liste déroulante pour ajouter à l'exposant ou à l'éditeur) ----------------------

//----------get------------

/**
 * Récupération de tous les contacts (inutile en vrai)
 * contact/all
 */
router.get('/all',(req,res,next) => {
    db.queryAllOrdered('Contact','nom',function(result){
        res.status(200).send(result);
    });
});

/**
 * récupération d'un contact par id de société pour récupérer que ceux de la société (affichage de l'exposant/éditeur/suivi exposant)
 * /contact/all/{id}
*/
router.get('/all/:idSociete',(req,res,next) => {
    const id = req.params['idSociete'];  
    db.queryValue('Contact','idSociete',id,function(result){
        res.status(200).send(result);
    });
});
 
//----------post-----------

/**
 * création d'un nouveau contact (modification éditeur/exposant avec formulaire d'ajout des contacts)
 * /contact/create
 */
router.post('/create',(req,res,next) => {
    db.insertValue('Contact',req.body,function(result){
        res.status(200).send(result);
    });
});

 //----------put-------------

 /**
  * Modification d'un contact
  * /contact/modify
  */
  router.put('/modify',(req,res,next) => {
    db.updateValue('Contact',req.body,function(result){
        res.status(200).send(result);
    });
 });


module.exports = router