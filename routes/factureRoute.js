// ---------- Factures

const router = require('express').Router();
const db = require('../database/dbConfig');

//---------------- Liste des factures  ----------------------------------
//-----------------------------------------------------------------------

//----------get------------

/**
 * Récupération de tous les contacts (inutile en vrai)
 * /facture/:idFestival/all
 */
 router.get('/:idFestival/all',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryAllWhere3OrderedLinkOnOne('Societe','Reservation','Festival','Facture','idSociete','idSociete','idFestival','idFestival','idReservation','idReservation',{"Reservation.idFestival":id},'nomSociete',function(result){
        res.send(result);
    });
});

/**
 * Récupération de tous les contacts (inutile en vrai)
 * /facture/:idFestival/all/:idExposant
 */
 router.get('/:idFestival/all/:idSociete',(req,res,next) => {
    const id = req.params['idFestival'];
    const idS = req.params['idSociete'];
    db.queryAllWhere3OrderedLinkOnOne2('Societe','Reservation','Festival','Facture','idSociete','idSociete','idFestival','idFestival','idReservation','idReservation',{"Reservation.idFestival":id},{"Societe.idSociete":idS},'nomSociete',function(result){
        res.send(result);
    });
});
 
//----------post-----------

/**
 * création d'un nouveau contact (modification éditeur/exposant avec formulaire d'ajout des contacts)
 * /contact/create
 */
router.post('/create',(req,res,next) => {
    db.insertValue('Facture',req.body,function(result){
        res.send(result);
    });
});

 //----------put-------------

 /**
  * Modification d'une facture
  * /facture/modify
  */
  router.put('/modify',(req,res,next) => {
    db.updateValue('Facture',req.body,function(result){
        res.status(200).send(result);
    });
 });


module.exports = router