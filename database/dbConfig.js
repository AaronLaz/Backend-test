var mysql = require('mysql');

var connection = null;

exports.connect = function(done){
    done(null);
}

var connectionPool = null;

function getConnection(){
    if (!connectionPool){
        connectionPool = mysql.createPool({
            connectionLimit: 10,
            host     : 'mysql-projetsep.alwaysdata.net',
            user     : 'projetsep',
            password : 'ProjetSEP-2020',
            database: 'projetsep_festival_des_jeux'
        })      
   }
   return connectionPool;
}

// ----------------------------------------------------
// ---------- SELECT / Query data

exports.queryData = function(request,callback){
   // console.log("query")
   getConnection().query(request,function(err,result){
        if(err) console.log(err);
        callback(result);
    });
}

exports.queryAll = function(table,callback){
    this.queryData(`SELECT * FROM ${table}`, callback);
}

//---------------------------------------------------------------------------------------------------------------------------------------------

var firstvaluekey = function(values){
    var keys = Object.keys(values);
    var firstValue = ` ${keys[0]}=${val2val(values[keys[0]])}`;
    return firstValue;
}

/**
 * Renvoie une jointure avec condition sur 1 unique attribut trié dans l'ordre croissant de 'order'
 * @param {*} table : table 1
 * @param {*} table2 : table 2
 * @param {*} key : clé table 1 pour jointure
 * @param {*} key2 : clé table 2 pour jointure
 * @param {*} parameter : condition
 * @param {*} order : attribut pour trié
 * @param {*} callback : appel pour renvoyer le résultat
 */
exports.queryAllWhereOrdered = function(table,table2,key,key2,parameter,order,callback){
    this.queryData(`SELECT * FROM ${table},${table2} WHERE ${table}.${key} = ${table2}.${key2} AND ${firstvaluekey(parameter)} ORDER BY ${order}`,callback);
}

/**
 * Renvoie d'une double jointure avec condition sur 1 unique attribut trié dans l'ordre croissant de 'order'
 * @param {*} table : table 1
 * @param {*} table2 : table 2
 * @param {*} table3 : table 3
 * @param {*} key : clé table 1 pour jointure avec 2
 * @param {*} key2 : clé table 2 pour jointure avec 1
 * @param {*} key3 : clé table 2 pour jointure avec 3
 * @param {*} key4 : clé table 3 pour jointure avec 2
 * @param {*} parameter : condition
 * @param {*} order : attribut pour trié
 * @param {*} callback : appel pour renvoyer le résultat
 */
exports.queryAllWhere2Ordered = function(table,table2,table3,key,key2,key3,key4,parameter,order,callback){
    this.queryData(`SELECT * FROM ${table},${table2},${table3} WHERE ${table}.${key} = ${table2}.${key2} AND ${table2}.${key3} = ${table3}.${key4} AND  ${firstvaluekey(parameter)} ORDER BY ${order}`,callback);
}

/**
 * Renverra le résultat sur une table pour une condition particulière
 * @param {*} table 
 * @param {*} condition 
 * @param {*} callback 
 */
exports.queryLast = function(table,condition,callback){
    this.queryData(`SELECT * FROM ${table} WHERE ${condition}`,callback);
}


/**
 * Renvoie d'une triple jointure avec condition sur 1 unique attribut trié dans l'ordre croissant de 'order' et condition ajoutée
 * @param {*} table : table 1
 * @param {*} table2 : table 2
 * @param {*} table3 : table 3
 * @param {*} table4 : table 4
 * @param {*} key : clé table 1 pour jointure avec 2
 * @param {*} key2 : clé table 2 pour jointure avec 1
 * @param {*} key3 : clé table 2 pour jointure avec 3
 * @param {*} key4 : clé table 3 pour jointure avec 2
 * @param {*} key5 : clé table 3 pour jointure avec 4
 * @param {*} key6 : clé table 4 pour jointure avec 3
 * @param {*} parameter : condition
 * @param {*} order : attribut pour trié
 * @param {*} callback : appel pour renvoyer le résultat
 */
exports.queryAllWhere3OrderedOne = function(table,table2,table3,table4,key,key2,key3,key4,key5,key6,parameter,order,callback){
    this.queryData(`SELECT * FROM ${table},${table2},${table3},${table4} WHERE ${table}.${key} = ${table2}.${key2} AND ${table2}.${key3} = ${table3}.${key4} AND ${table3}.${key5} = ${table4}.${key6} AND ${firstvaluekey(parameter)} ORDER BY ${order}`,callback);
}

/**
 * Renvoie d'une triple jointure avec condition sur 1 unique attribut trié dans l'ordre croissant de 'order' et condition ajoutée
 * @param {*} table : table 1
 * @param {*} table2 : table 2
 * @param {*} table3 : table 3
 * @param {*} table4 : table 4
 * @param {*} key : clé table 1 pour jointure avec 2
 * @param {*} key2 : clé table 2 pour jointure avec 1
 * @param {*} key3 : clé table 2 pour jointure avec 3
 * @param {*} key4 : clé table 3 pour jointure avec 2
 * @param {*} key5 : clé table 3 pour jointure avec 4
 * @param {*} key6 : clé table 4 pour jointure avec 3
 * @param {*} parameter : condition
 * @param {*} order : attribut pour trié
 * @param {*} callback : appel pour renvoyer le résultat
 */
 exports.queryAllWhere3OrderedLinkOnOne = function(table,table2,table3,table4,key,key2,key3,key4,key5,key6,parameter,order,callback){
    this.queryData(`SELECT * FROM ${table},${table2},${table3},${table4} WHERE ${table}.${key} = ${table2}.${key2} AND ${table2}.${key3} = ${table3}.${key4} AND ${table2}.${key5} = ${table4}.${key6} AND ${firstvaluekey(parameter)} ORDER BY ${order}`,callback);
}

/**
 * Renvoie d'une triple jointure avec condition sur 1 unique attribut trié dans l'ordre croissant de 'order' et condition ajoutée
 * @param {*} table : table 1
 * @param {*} table2 : table 2
 * @param {*} table3 : table 3
 * @param {*} table4 : table 4
 * @param {*} key : clé table 1 pour jointure avec 2
 * @param {*} key2 : clé table 2 pour jointure avec 1
 * @param {*} key3 : clé table 2 pour jointure avec 3
 * @param {*} key4 : clé table 3 pour jointure avec 2
 * @param {*} key5 : clé table 3 pour jointure avec 4
 * @param {*} key6 : clé table 4 pour jointure avec 3
 * @param {*} parameter : condition
 * @param {*} order : attribut pour trié
 * @param {*} callback : appel pour renvoyer le résultat
 */
 exports.queryAllWhere3OrderedLinkOnOne2 = function(table,table2,table3,table4,key,key2,key3,key4,key5,key6,parameter,parameter2,order,callback){
    this.queryData(`SELECT * FROM ${table},${table2},${table3},${table4} WHERE ${table}.${key} = ${table2}.${key2} AND ${table2}.${key3} = ${table3}.${key4} AND ${table2}.${key5} = ${table4}.${key6} AND ${firstvaluekey(parameter)} AND ${firstvaluekey(parameter2)} ORDER BY ${order}`,callback);
}

/**
 * Renvoie d'une triple jointure avec condition sur 1 unique attribut trié dans l'ordre croissant de 'order'
 * @param {*} table : table 1
 * @param {*} table2 : table 2
 * @param {*} table3 : table 3
 * @param {*} table4 : table 4
 * @param {*} key : clé table 1 pour jointure avec 2
 * @param {*} key2 : clé table 2 pour jointure avec 1
 * @param {*} key3 : clé table 2 pour jointure avec 3
 * @param {*} key4 : clé table 3 pour jointure avec 2
 * @param {*} key5 : clé table 3 pour jointure avec 4
 * @param {*} key6 : clé table 4 pour jointure avec 3
 * @param {*} parameter : condition
 * @param {*} order : attribut pour trié
 * @param {*} callback : appel pour renvoyer le résultat
 */
 exports.queryAllWhere3Ordered = function(table,table2,table3,table4,key,key2,key3,key4,key5,key6,parameter,order,callback){
    this.queryData(`SELECT * FROM ${table},${table2},${table3},${table4} WHERE ${table}.${key} = ${table2}.${key2} AND ${table2}.${key3} = ${table3}.${key4} AND ${table3}.${key5} = ${table4}.${key6} AND ${firstvaluekey(parameter)} ORDER BY ${order}`,callback);
}

/**
 * Renvoie d'une triple jointure avec condition sur 1 unique attribut trié dans l'ordre croissant de 'order'
 * @param {*} table : table 1
 * @param {*} table2 : table 2
 * @param {*} table3 : table 3
 * @param {*} table4 : table 4
 * @param {*} key : clé table 1 pour jointure avec 2
 * @param {*} key2 : clé table 2 pour jointure avec 1
 * @param {*} key3 : clé table 2 pour jointure avec 3
 * @param {*} key4 : clé table 3 pour jointure avec 2
 * @param {*} key5 : clé table 3 pour jointure avec 4
 * @param {*} key6 : clé table 4 pour jointure avec 3
 * @param {*} condition : condition
 * @param {*} order : attribut pour trié
 * @param {*} callback : appel pour renvoyer le résultat
 */
 exports.queryAllWhere3OrderedCondition = function(table,table2,table3,table4,key,key2,key3,key4,key5,key6,condition,order,callback){
    this.queryData(`SELECT * FROM ${table},${table2},${table3},${table4} WHERE ${table}.${key} = ${table2}.${key2} AND ${table2}.${key3} = ${table3}.${key4} AND ${table3}.${key5} = ${table4}.${key6} AND ${condition} ORDER BY ${order}`,callback);
}

/**
 * Renvoie d'une triple jointure avec condition sur 1 unique attribut trié dans l'ordre croissant de 'order'
 * @param {*} table : table 1
 * @param {*} table2 : table 2
 * @param {*} table3 : table 3
 * @param {*} table4 : table 4
 * @param {*} key : clé table 1 pour jointure avec 2
 * @param {*} key2 : clé table 2 pour jointure avec 1
 * @param {*} key3 : clé table 2 pour jointure avec 3
 * @param {*} key4 : clé table 3 pour jointure avec 2
 * @param {*} key5 : clé table 3 pour jointure avec 4
 * @param {*} key6 : clé table 4 pour jointure avec 3
 * @param {*} parameter : condition
 * @param {*} parameter2 : condition2
 * @param {*} order : attribut pour trié
 * @param {*} callback : appel pour renvoyer le résultat
 */
 exports.queryAllWhere3Ordered2 = function(table,table2,table3,table4,key,key2,key3,key4,key5,key6,parameter,parameter2,order,callback){
    this.queryData(`SELECT * FROM ${table},${table2},${table3},${table4} WHERE ${table}.${key} = ${table2}.${key2} AND ${table2}.${key3} = ${table3}.${key4} AND ${table3}.${key5} = ${table4}.${key6} AND ${firstvaluekey(parameter)} AND ${firstvaluekey(parameter2)} ORDER BY ${order}`,callback);
}

/**
 * Renvoie d'une triple jointure avec condition sur 1 unique attribut trié dans l'ordre croissant de 'order'
 * @param {*} table : table 1
 * @param {*} table2 : table 2
 * @param {*} table3 : table 3
 * @param {*} table4 : table 4
 * @param {*} key : clé table 1 pour jointure avec 2
 * @param {*} key2 : clé table 2 pour jointure avec 1
 * @param {*} key3 : clé table 2 pour jointure avec 3
 * @param {*} key4 : clé table 3 pour jointure avec 2
 * @param {*} key5 : clé table 3 pour jointure avec 4
 * @param {*} key6 : clé table 4 pour jointure avec 3
 * @param {*} parameter : condition
 * @param {*} condition : condition speciale
 * @param {*} order : attribut pour trié
 * @param {*} callback : appel pour renvoyer le résultat
 */
 exports.queryAllWhere3Ordered2Condition = function(table,table2,table3,table4,key,key2,key3,key4,key5,key6,parameter,condition,order,callback){
    this.queryData(`SELECT * FROM ${table},${table2},${table3},${table4} WHERE ${table}.${key} = ${table2}.${key2} AND ${table2}.${key3} = ${table3}.${key4} AND ${table3}.${key5} = ${table4}.${key6} AND ${firstvaluekey(parameter)} AND ${condition} ORDER BY ${order}`,callback);
}

/**
 * Renvoie d'une triple jointure avec condition sur 1 unique attribut trié dans l'ordre croissant de 'order'
 * @param {*} table : table 1
 * @param {*} table2 : table 2
 * @param {*} table3 : table 3
 * @param {*} table4 : table 4
 * @param {*} table5 : table 5
 * @param {*} key : clé table 1 pour jointure avec 2
 * @param {*} key2 : clé table 2 pour jointure avec 1
 * @param {*} key3 : clé table 2 pour jointure avec 3
 * @param {*} key4 : clé table 3 pour jointure avec 2
 * @param {*} key5 : clé table 3 pour jointure avec 4
 * @param {*} key6 : clé table 4 pour jointure avec 3
 * @param {*} key7 : clé table 4 pour jointure avec 5
 * @param {*} key8 : clé table 5 pour jointure avec 4
 * @param {*} parameter : condition
 * @param {*} order : attribut pour trié
 * @param {*} callback : appel pour renvoyer le résultat
 */
 exports.queryAllWhere4Ordered = function(table,table2,table3,table4,table5,key,key2,key3,key4,key5,key6,key7,key8,parameter,order,callback){
    this.queryData(`SELECT * FROM ${table},${table2},${table3},${table4},${table5} WHERE ${table}.${key} = ${table2}.${key2} AND ${table2}.${key3} = ${table3}.${key4} AND ${table3}.${key5} = ${table4}.${key6} AND ${table4}.${key7} = ${table5}.${key8} AND ${firstvaluekey(parameter)} ORDER BY ${order}`,callback);
}

/**
 * Requête à conditions multiples
 * @param {*} table : table
 * @param {*} values : conditions
 * @param {*} callback : appel pour renvoyer le résultat
 */
exports.queryWhere = function(table,table2,key,key2,value1,value2,callback){
    this.queryData(`SELECT * FROM ${table},${table2} WHERE ${table}.${key} = ${table2}.${key2} AND ${firstvaluekey(value1)} AND ${firstvaluekey(value2)}`, callback);
}

//---------------------------------------------------------------------------------------------------------------------------------------------

exports.queryAllOrdered = function(table,order,callback){
    this.queryData(`SELECT * FROM ${table} ORDER BY ${order}`, callback);
}

exports.queryAllOrderedDesc = function(table,order,callback){
    this.queryData(`SELECT * FROM ${table} ORDER BY ${order} DESC`, callback);
}

exports.queryValue = function(table,property,key,callback){
    this.queryData(`SELECT * FROM ${table} WHERE ${property}=${key}`, callback);
}

exports.queryValuesOrdered = function(table,property,key,order,callback){
    this.queryData(`SELECT * FROM ${table} WHERE ${property}=${key} ORDER BY ${order}`, callback);
}

exports.queryValuesOrderedDesc = function(table,property,key,order,callback){
    this.queryData(`SELECT * FROM ${table} WHERE ${property}=${key} ORDER BY ${order} DESC`, callback);
}

// no collate, seems to be case insensitive !?
//COLLATE SQL_Latin1_General_CP1_CI_AS 
exports.queryValueStarting = function(table,property,searchTerm,callback){
    this.queryData(`SELECT DISTINCT * FROM ${table} WHERE ${property} LIKE '${searchTerm}%'`,callback);
}

exports.queryValueOrderedStarting = function(table,property,searchTerm,order,callback){
    this.queryData(`SELECT DISTINCT * FROM ${table} WHERE ${property} LIKE '${searchTerm}%' ORDER BY ${order}`,callback);
}

exports.queryValueOrderedStartingDesc = function(table,property,searchTerm,order,callback){
    this.queryData(`SELECT DISTINCT * FROM ${table} WHERE ${property} LIKE '${searchTerm}%' ORDER BY ${order} DESC`,callback);
}



// ----------------------------------------------------
// ---------- INSERT/UPDATE / Add or modify data


// if val is a string return 'val' else return val
var val2val = function(val){
    if(typeof(val)=='string'){
        val = '"'+val+'"';
    }
    return val;
}
// build SET request from value objects properties
var mapsetvalues = function(values){
    var keys = Object.keys(values);
    // console.log(keys);
    var setvalue = "SET ";
    for(i=1;i<keys.length;i++){
        if (keys[i].slice(0,1) != "_"){ // convention for private property not save on BD
            if(i>1) { setvalue += ", "; } 
            setvalue += `${keys[i]}=${val2val(values[keys[i]])}`;
        }
    }
    return setvalue;
}

var mapfirstvaluekey = function(values){
    var wherevalue = " WHERE ";
    var keys = Object.keys(values);
    wherevalue += ` ${keys[0]}=${val2val(values[keys[0]])}`;
    return wherevalue;
}

var maptwovaluekey = function(values,firstKey,secondKey){
    var setvalue = "SET ";
    var wherevalue = " WHERE ";
    var keys = Object.keys(values);
    var first = 0;
    var second = 0;
    for(i=0;i<keys.length;i++){
        if (keys[i].slice(0,1) != "_"){ // convention for private property not save on BD
            if(i>0) { setvalue += ", "; } 
            setvalue += `${keys[i]}=${val2val(values[keys[i]])}`;
            if(keys[i]==firstKey) { first = i; }
            if(keys[i]==secondKey) { second = i; }
        }
    }
   //  console.log(`first=${first}`);
   //  console.log(`second=${second}`);
    wherevalue += ` ${keys[first]}=${val2val(values[keys[first]])} AND ${keys[second]}=${val2val(values[keys[second]])}`;
   //  console.log(`wherevalue=${wherevalue}`);
    return setvalue + wherevalue;
}

// table is the table to update
// values is an object describing values to change
// first property of this object has to be the key used by WHERE clause
exports.updateValue = function(table,values,callback){
    var req = `UPDATE ${table} ` + mapsetvalues(values) + mapfirstvaluekey(values);
   //  console.log(req);
    this.queryData(req,callback);
}
exports.updateValueTwoKeys = function(table,values,first,second,callback){
   //  console.log(`first key=${first} - second key=${second}`);
    var req = `UPDATE ${table} ` + maptwovaluekey(values,first,second);
   //  console.log(req);
    this.queryData(req,callback);
}
// build INSERT request from value object properties
// ignore first value considered as primary index
var mapinsertvalues = function(values){
    var keys = Object.keys(values);
    console.log(keys);
    var setvalue = "(";
    for(i=0;i<keys.length;i++){
        if (keys[i].slice(0,1) != "_"){ // convention for private property not save on BD
            if(i>0) { setvalue += ", "; } 
            setvalue += keys[i];
        }
    }
    setvalue += ") VALUES (";
    for(i=0;i<keys.length;i++){
        if (keys[i].slice(0,1) != "_"){ // convention for private property not save on BD
            if(i>0) { setvalue += ", "; } 
            setvalue += `${val2val(values[keys[i]])}`;
        }
    }
    setvalue += ");";
    return setvalue;
}
// build INSERT request from value object properties
// same as previous but no primary key, all values are inserted
var mapinsertallvalues = function(values){
    var keys = Object.keys(values);
    //console.log(keys);
    var setvalue = "(";
    for(i=0;i<keys.length;i++){
        if (keys[i].slice(0,1) != "_"){ // convention for private property not save on BD
            if(i>0) { setvalue += ", "; } 
            setvalue += keys[i];
        }
    }
    setvalue += ") VALUES (";
    for(i=0;i<keys.length;i++){
        if (keys[i].slice(0,1) != "_"){ // convention for private property not save on BD
            if(i>0) { setvalue += ", "; } 
            setvalue += `${val2val(values[keys[i]])}`;
        }
    }
    setvalue += ");";
    return setvalue;
}

// table is the table where insert new value
// values is an object describing values to insert
exports.insertValue= function(table,values,callback){
    console.log(values);
    var req = `INSERT INTO ${table} ${mapinsertvalues(values)}`;
    console.log(req);
    //req = `INSERT INTO Zone (nomZone) VALUES ('Test');`
    this.queryData(req,callback);
}
// table is the table where insert new value
// values is an object describing values to insert
exports.insertallValue= function(table,values,callback){
    var req = `INSERT INTO ${table} ${mapinsertallvalues(values)}`;
   //  console.log(req);
    this.queryData(req,callback);
}


exports.deleteValue = function(table,key,keyval,callback){
    this.queryData(`DELETE FROM ${table} WHERE ${key}=${val2val(keyval)}`,callback);
}

exports.deleteValueTwoKeys = function(table,key1,key1val,key2,key2val,callback){
    this.queryData(`DELETE FROM ${table} WHERE ${key1}=${val2val(key1val)} AND ${key2}=${val2val(key2val)}`,callback);
}