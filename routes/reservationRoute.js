// ---------- Réservation

const router = require('express').Router();
const db = require('../database/dbConfig');

//---------------- Liste des réservations ------------------------------------------ 
//----------------------------------------------------------------------------------

//----------get------------

/**
 * Liste réservations
 * /reservation/all/:idFestival
 */
router.get('/all/:idFestival',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryAllWhere4Ordered('Societe','SuiviExposant','Reservation','JeuReserve','Jeu','idSociete','idSociete','idReservation','idReservation','idReservation','idReservation','idJeu','idJeu',{"idFestival":id},'nomSociete',function(result){
        res.send(result);
    });
});

//----------post------------

 /**
  * Création d'une réservation
  * /reservation/create
  */
 router.post('/create',(req,res,next) => {
    db.insertValue('Reservation',req.body,function(result){
        res.send(result);
    });
 });

  //----------put-------------
 /**
  * Modification d'un jeu
  * /reservation/modify
  */
  router.put('/modify',(req,res,next) => {
    db.updateValue('Reservation',req.body,function(result){
        res.status(200).send(result);
    });
 });


module.exports = router