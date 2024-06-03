//PRUEBAS

//01:

shardl1DB.participantes.count();
shardl2DB.participantes.count();
shardl3DB.participantes.count();


//02:

for (i = 2000000; i < 2500000; i++) {
    shardlDB.participantes.insert({
        id: i,
        nombre: "Participante " + i,
        equipo: i
    });
}

shardl1DB.participantes.count();
shardl2DB.participantes.count();
shardl3DB.participantes.count();


//03:

// Conectar al primer shard
shardl1 = new Mongo("Hony:20000");
shardl1DB = shardl1.getDB("torneo_nacional_natacion");

// Insertar un nuevo documento en el primer shard
shardl1DB.participantes.insert({
    id: 2500001,
    nombre: "Participante 2500001",
    equipo: 5000
});

// Verificar que el documento se ha insertado en el primer shard
print("Contando documentos en shard 1:");
print(shardl1DB.participantes.count({id: 2500001}));

// Conectar al segundo shard
shardl2 = new Mongo("Hony:20001");
shardl2DB = shardl2.getDB("torneo_nacional_natacion");

// Verificar que el documento se ha replicado en el segundo shard
print("Contando documentos en shard 2:");
print(shardl2DB.participantes.count({id: 2500001}));

// Conectar al tercer shard
shardl3 = new Mongo("Hony:20002");
shardl3DB = shardl3.getDB("torneo_nacional_natacion");

// Verificar que el documento se ha replicado en el tercer shard
print("Contando documentos en shard 3:");
print(shardl3DB.participantes.count({id: 2500001}));

// Resultados esperados: El documento debe estar presente en todos los shards

//04:

// Conectar al mongos (router) del clúster
db = (new Mongo("Hony:20006")).getDB("torneo_nacional_natacion");

// Función para insertar grandes volúmenes de datos
function insertLargeVolumeOfData(start, end) {
    for (let i = start; i < end; i++) {
        db.participantes.insert({
            id: i,
            nombre: "Participante " + i,
            equipo: i
        });
    }
}

// Ejecutar la inserción de datos en paralelo
startParallelShell(`
    db = (new Mongo("Hony:20006")).getDB("torneo_nacional_natacion");
    for (let i = 2000000; i < 2500000; i++) {
        db.participantes.insert({
            id: i,
            nombre: "Participante " + i,
            equipo: i
        });
    }
`);

// Esperar a que los procesos paralelos terminen (puede requerir un tiempo adecuado dependiendo del volumen de datos)
sleep(300000); // Dormir por 5 minutos (ajustar el tiempo según sea necesario)

// Verificar el balanceo de datos entre los shards
sh.status(); // Verificar el estado del cluster y la distribución de los datos

// Verificar el número de documentos en cada shard
shardl1 = new Mongo("Hony:20000");
shardl1DB = shardl1.getDB("torneo_nacional_natacion");
print("Documentos en shard 1:");
print(shardl1DB.participantes.count());

shardl2 = new Mongo("Hony:20001");
shardl2DB = shardl2.getDB("torneo_nacional_natacion");
print("Documentos en shard 2:");
print(shardl2DB.participantes.count());

shardl3 = new Mongo("Hony:20002");
shardl3DB = shardl3.getDB("torneo_nacional_natacion");
print("Documentos en shard 3:");
print(shardl3DB.participantes.count());

// Verificar si el balanceador está corriendo
print("Estado del balanceador:");
printjson(sh.getBalancerState());
print("¿Está el balanceador corriendo?");
printjson(sh.isBalancerRunning());
