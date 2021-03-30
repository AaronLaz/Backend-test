// ---------- Jeu

const router = require('express').Router();
const db = require('../database/dbConfig');

//---------------- Liste des jeux pour le suivi des exposants ------------------------------------------ 
//----------------(on s'en fout de l'éditeur du coup il faut juste le nom du jeu) ----------------------

//----------get------------

/**
 * a utiliser dans un menu déroulant pour ajouter le jeu dans le suivi exposant seulement
 * récupération de tous les jeux
 * /jeu/all
 */
router.get('/all',(req,res,next) => {
    db.queryAllOrdered('Jeu','nomJeu',function(result){
        res.send(result);
    });
});

// affichage des détails des jeux seulement pour la partie mobile...
//jeu par id : /jeu/all/{id}
router.get('/all/:idJeu',(req,res,next) => {
    const id = req.params['idJeu'];  
    db.queryValue('Jeu','idJeu',id,function(result){
        res.send(result);
    });
});


//---------------- Liste des jeux du festival ------------------------------------------ 

//----------get------------

/**
 * liste des jeux du festival le plus récent
 * /jeu/last/allbyfestival
 */
router.get('/last/allbyfestival',(req,res,next) => {
    db.queryAllWhere3OrderedOne('Jeu','JeuReserve','Reservation','Festival','idJeu','idJeu','idReservation','idReservation','idFestival','idFestival','annee=(SELECT MAX(annee) FROM Festival)','nomJeu',function(result){
        res.send(result);
    });
});

/**
 * liste des jeux par festival
 *  /jeu/allbyfestival/{idFestival}
 */ 
router.get('/allbyfestival/:idFestival',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryAllWhere2Ordered('Jeu','JeuReserve','Reservation','idJeu','idJeu','idReservation','idReservation',{"idFestival":id},'nomJeu',function(result){
        res.send(result);
    });
});


//---------------- Liste des jeux par éditeur ------------------------------------------

//----------get------------

/** 
 * jeux par editeur
 * jeu/allbyeditor/{idFestival}
 */
router.get('/allbyeditor/:idFestival',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryAllWhere3Ordered('Societe','Jeu','JeuReserve','Reservation','idSociete','idEditeur','idJeu','idJeu','idReservation','idReservation',{"idFestival":id},'nomSociete',function(result){
        res.send(result);
    });
});

/** 
 * jeux par editeur
 * jeu/allbyeditor/{idFestival}/{idEditeur}
 */
 router.get('/allbyeditor/:idFestival/:idEditeur',(req,res,next) => {
    const id = req.params['idFestival'];
    const ide = req.params['idEditeur'];
    db.queryAllWhere3Ordered2('Societe','Jeu','JeuReserve','Reservation','idSociete','idEditeur','idJeu','idJeu','idReservation','idReservation',{"idFestival":id},{"idEditeur":ide},'nomSociete',function(result){
        res.send(result);
    });
});

/** 
 * jeux par editeur
 * /jeu/allbyeditor/{idFestival}
 */
 router.get('/last/allbyeditor',(req,res,next) => {
    db.queryAllWhere3OrderedCondition('Societe','Jeu','JeuReserve','Reservation','idSociete','idEditeur','idJeu','idJeu','idReservation','idReservation','idFestival = (SELECT idFestival FROM Festival WHERE annee = (SELECT MAX(annee) FROM Festival))','nomSociete',function(result){
        res.send(result);
    });
});

/** 
 * jeux par editeur
 * /jeu/allbyeditor/{idFestival}/{idEditeur}
 */
 router.get('/last/allbyeditor/:idEditeur',(req,res,next) => {
    const id = req.params['idFestival'];
    const ide = req.params['idEditeur'];
    db.queryAllWhere3Ordered2Condition('Societe','Jeu','JeuReserve','Reservation','idSociete','idEditeur','idJeu','idJeu','idReservation','idReservation',{"idEditeur":ide},'Reservation.idFestival = (SELECT idFestival FROM Festival WHERE annee = (SELECT MAX(annee) FROM Festival))','nomSociete',function(result){
        res.send(result);
    });
});

//---------------- Liste des jeux par exposant ------------------------------------------

//----------get------------

/** 
 * jeux par exposant
 * jeu/allbyexposant/{idFestival}
 */
 router.get('/allbyexposant/:idFestival',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryAllWhere3Ordered('Jeu','JeuReserve','Reservation','Societe','idJeu','idJeu','idReservation','idReservation','idSociete','idSociete',{"idFestival":id},'nomSociete',function(result){
        res.send(result);
    });
});

//---------------- Liste des jeux par zone ------------------------------------------

//----------get------------

/** 
 * jeux par zone
 * /jeu/allbyzone/{idFestival}
 */
router.get('/allbyzone/:idFestival',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryAllWhere3Ordered('Jeu','JeuReserve','Zone','ZoneFestival','idJeu','idJeu','idZone','idZone','idZone','idZone',{"idFestival":id},'nomZone',function(result){
        res.send(result);
    });
});

/**
 * Jeux par zone avec affichage éditeur et type de jeu
 */
router.get('/allbyzone/:idFestival/details',(req,res,next) => {
    const id = req.params['idFestival'];
    db.queryData('SELECT * FROM Jeu j,JeuReserve jr,Zone z,ZoneFestival zf,TypeJeu t,Societe s WHERE j.idJeu = jr.idJeu AND j.idTypeJeu = t.idTypeJeu AND z.idZone = jr.idZone AND j.idEditeur = s.idSociete AND z.idZone = zf.idZone AND zf.idFestival = '+id+' ORDER BY nomZone',function(result) {
        res.send(result);
    });
});

/**
 * Affichage de la liste des jeux pour une zone donnée
 * /jeu/allbyzone/{id} 
 */
router.get('/allbyzone/:idZone',(req,res,next) => {
    const id = req.params['idZone'];
    db.queryAllWhere3Ordered('Jeu','JeuReserve','Zone','ZoneFestival','idJeu','idJeu','idZone','idZone','idZone','idZone',{"JeuReserve.idZone":id},'nomZone',function(result){
        res.send(result);
    });
}); 


//----------post------------

 /**
  * creation d'un jeu
  * /jeu/create
  */
 router.post('/create',(req,res,next) => {
    db.insertValue('Jeu',req.body,function(result){
        res.send(result);
    });
 });

 //----------put-------------
 /**
  * Modification d'un jeu
  * /jeu/modify
  */
  router.put('/modify',(req,res,next) => {
    db.updateValue('Jeu',req.body,function(result){
        res.status(200).send(result);
    });
 });


module.exports = router