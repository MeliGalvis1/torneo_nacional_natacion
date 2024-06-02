//Inicialización del cluster con particionamiento
cluster=new ShardingTest({shards: 3, chunksize:1})

//Conexión a los shards
shardl = new Mongo("Hony:20006")
shardlDB = shardl.getDB("torneo_nacional_natacion")

db = (new Mongo("localhost:20006")).getDB("torneo_nacional_natacion")

//Adicionamos una colección

for (i = 500000; i < 2000000; i++) {
    shardlDB.participantes.insert({
        id: i,
        nombre: "Participante " +i ,
        equipo: i
    });
}

shardlDB.participantes.count()

//Verificacion en los otros nodos
shardl1 = new Mongo("Hony:20000")
shardl1DB = shardl1.getDB("torneo_nacional_natacion")
shardl1DB.participantes.count()

//Información guardada en el nodo 2
shardl2 = new Mongo("Hony:20001")
shardl2DB = shardl2.getDB("torneo_nacional_natacion")
shardl2DB.participantes.count()

shardl3 = new Mongo("Hony:20002")
shardl3DB = shardl3.getDB("torneo_nacional_natacion")
shardl3DB.participantes.count()

//Habilitar sharding en la base de datos y colección
//Presentó un error
shardl = new Mongo("Hony:20006")
shardlDB = shardl.getDB("torneo_nacional_natacion");
sh.status()
shardl.adminCommand({enableSharding: "articles"})

//Probamos de otra forma
mongos = new Mongo("Hony:20006");
db = mongos.getDB("torneo_nacional_natacion");
sh.enableSharding("torneo_nacional_natacion");
sh.status()
db.participantes.ensureIndex({id:1})
sh.shardCollection("torneo_nacional_natacion.participantes", {id:1})
sh.status()

//Balanceo de los datos
sh.getBalancerState()

sh.setBalancerState(true)
sh.isBalancerRunning()

//Adición de más datos para activar la partición

mongos> for (i = 500000; i < 2000000; i++) {
    ...     shardlDB.participantes.insert({
    ...         id: i,
    ...         nombre: "Participante " +i ,
    ...         equipo: i
    ...     });
    ... }
shardlDB.participantes.count()

//Verificacion en los otros nodos
shardl1 = new Mongo("Hony:20000")
shardl1DB = shardl1.getDB("torneo_nacional_natacion")
shardl1DB.participantes.count()

//Información guardada en el nodo 2
shardl2 = new Mongo("Hony:20001")
shardl2DB = shardl2.getDB("torneo_nacional_natacion")
shardl2DB.participantes.count()

shardl3 = new Mongo("Hony:20002")
shardl3DB = shardl3.getDB("torneo_nacional_natacion")
shardl3DB.participantes.count()