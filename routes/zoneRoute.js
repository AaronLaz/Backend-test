// ---------- Zone

const router = require('express').Router();
const db = require('../database/dbConfig');

//---------------- Liste des zone du festival ---------------------------------------------------------- 
//----------------(à utiliser durant la création de jeu dans une réservation) --------------------------

/** 
 * récupération de la liste des zones (pour ajout au festival sinon création en post)
 * /zone/all
 */
router.get('/all', (req,res,next)=> {
    db.queryAllOrdered('Zone','nomZone',function(result){
        res.send(result);
    });
});

/**
 * Ajout d'une zone à un festival
 */
/// post

/**
 * création d'une zone : nomZone
 * /zone/create
 */
router.post('/create',(req,res,next) => {
    db.insertValue('Zone',req.body,function(result){
        res.send(result);
    });
});

/**
 * Ajout de la zone au festival : idZone,idFestival
 * /zonefestival/create
 */
router.post('/zoneFestival/create', (req,res,next) =>{
    db.insertValue('ZoneFestival',req.body,function(result){
        res.send(result);
    });
});

module.exports = router