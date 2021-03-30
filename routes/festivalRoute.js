// ---------- Festival

const router = require('express').Router();
const db = require('../database/dbConfig');

//---------------- Liste des festivals -------------------------------------------------------------
//----------------(liste affichée seulement au grand manitou) --------------------------------------
//----------------Rappel les organisateurs ne voient que le festival en cours ----------------------

//----------get------------

/**
 * récupération de tous les festivals
 * /festival/all
 */ 
router.get('/all', (req,res,next)=> {
    db.queryAll('Festival',(result) => {
        res.send(result);
    });
});

/**
 * récupération de tous les festivals triés par année décroissante (affichage de l'accueil du grand manitou)
 * /festival/allbyyear
 */
router.get('/allbyyear',(req,res,next) => {
    db.queryAllOrderedDesc('Festival','annee',function(result){
        res.send(result);
    });
});

/**
 * Récupération du dernier festival
 * /festival/last
 */
router.get('/last',(req,res,next) => {
    db.queryLast('Festival','annee = (SELECT MAX(annee) FROM Festival)',function(result){
        res.status(200).send(result);
    });
});

/**
 * affichage d'un festival par id (dans l'url)
 * /festival/all/{id}
 */
router.get('/all/:id',(req,res,next) => {
   const id = req.params['id'];  
   db.queryValue('Festival','idFestival',id,function(result){
       res.send(result);
   });
});

//----------post------------

/**
 * creation d'un festival
 * /festival/create
 */
router.post('/create',(req,res,next) => {
    db.insertValue('Festival',req.body,function(result){
        res.send(result);
    });
});

 //----------put-------------
 /**
  * Modification d'un festival
  * /festival/modify
  */
  router.put('/modify',(req,res,next) => {
    db.updateValue('Festival',req.body,function(result){
        res.status(200).send(result);
    });
 });


module.exports = router