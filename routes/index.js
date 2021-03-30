module.exports = function(app){
    app.use('/contact',require('./contactRoute'));
    app.use('/facture',require('./factureRoute'));
    app.use('/festival',require('./festivalRoute'));
    app.use('/jeu',require('./jeuRoute'));
    app.use('/reservation',require('./reservationRoute.js'));
    app.use('/societe',require('./societeRoute'));
    app.use('/suiviexposant',require('./suiviRoute'));
   // app.use('/user',require('./userRoute'));
    app.use('/zone',require('./zoneRoute'));  
}