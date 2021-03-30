// ---------- Societe

const router = require('express').Router();
const db = require('../database/dbConfig');

//----------------------------------------------
//----------Societé dans un festival------------
//----------------------------------------------

/**
 * Affichage des sociétés dans un festival donné
 * /societe/festival/{idFestival}/all
 */
 router.get('/festival/:idFestival/all',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryAllWhereOrdered('Societe','Reservation','idSociete','idSociete',{"idFestival":id},'nomSociete',function(result){
        res.send(result);
    });
});

/**
 * Affichage des exposants dans un festival donné
 * /societe/festival/{idFestival}/exposants
 */
 router.get('/festival/:idFestival/exposants',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryWhere('Societe','Reservation','idSociete','idSociete',{"idFestival":id},{"exposant":true},function(result){
        res.send(result);
    });
});

/**
 * Affichage des éditeurs dans un festival donné
 * /societe/festival/{idFestival}/exposants
 */ 
/*  router.get('/festival/:idFestival/exposants',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryWhere('Societe','Reservation','idSociete','idSociete',{"idFestival":id},{"exposant":true},function(result){
        res.send(result);
    });
}); */ // en cours de développement

//----------Societé hors festival --------------
//----------------------------------------------

/**
 * récupération de tous les éditeurs
 * /societe/editeur/all
 */
router.get('/editeur/all', (req,res,next)=> {
    db.queryValuesOrdered('Societe','editeur',true,'nomSociete',function(result){
        res.send(result);
    });
});

/**
 * récupération de tous les exposants
 * /societe/exposant/all
 */
 router.get('/exposant/all', (req,res,next) => {
    db.queryValuesOrdered('Societe','exposant',true,'nomSociete',function(result){
        res.send(result);
    });
});

/**
 * récupération d'une société particulière
 * /societe/all/{idSociete}
 */
router.get('/all/:id',function(req,res,next){
    const id = req.params['id'];  
    db.queryValue('Societe','idSociete',id,function(result){
        res.send(result);
    });
 });

//----------post------------

/**
 * création d'une société (à utiliser dans le formulaire de création de société)
 * /societe/create
 */
router.post('/create',(req,res,next) => {
    db.insertValue('Societe',req.body,function(result){
        res.send(result);
    });
});

 //----------put-------------
 /**
  * Modification d'une societe
  * /societe/modify
  */
  router.put('/modify',(req,res,next) => {
    db.updateValue('Societe',req.body,function(result){
        res.status(200).send(result);
    });
 });


module.exports = router