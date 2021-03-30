// ---------- Suivi exposant

const router = require('express').Router();
const db = require('../database/dbConfig');

//---------------- Liste suivi des exposants ------------------------------------------ 
//-------------------------------------------------------------------------------------
//----------get------------

/**
 * Récupération de tous les suivis des exposants.
 * /:idFestival
 */
/* router.get('/:idFestival',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryAllOrdered('Jeu','nomJeu',function(result){
        res.send(result);
    });
});
 */
/**
 * Récupération de tous les suivis des exposants.
 * /:idFestival/details
 */
 router.get('/:idFestival/details',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryAllOrdered('SuiviExposant','nomJeu',function(result){
        res.send(result);
    });
});

//----------post------------

 /**
  * creation d'un suivi d'exposant : idSociete, idFestival, idReservation, statutSuivi, dateContact1, dateContact2, dateContact3, plan
  * /create
  */
 router.post('/create',(req,res,next) => {
    db.insertValue('SuiviExposant',req.body,function(result){
        res.send(result);
    });
 });

  //----------put-------------
 /**
  * Modification d'un suivi d'exposant
  * /suivi/modify
  */
  router.put('/modify',(req,res,next) => {
    db.updateValue('SuiviExposant',req.body,function(result){
        res.status(200).send(result);
    });
 });


module.exports = router