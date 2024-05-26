replDB = new ReplSetTest({ name: "ReplicaDB", nodes: 3 });

// Iniciar los nodos del Replica Set
replDB.startSet();

// Inicializar el Replica Set
replDB.initiate();

//Nodo primario
primary = replDB.getPrimary();

//Prueba del grupo
conn=new Mongo("Hony:20000")
testDB=conn.getDB("torneo_nacional_natacion")
testDB.isMaster()

//Insertar datos

testDB.categorias.insertMany([
  { id: 1, categoria: "Infantil" },
  { id: 2, categoria: "Juvenil" },
  { id: 3, categoria: "Mayor" }
]);

testDB.equipos.insertMany([
  { id: 1, nombre: "Equipo Risaralda Norte", categoria: 1, subcategoria: 1 },
  { id: 2, nombre: "Equipo Risaralda Sur", categoria: 1, subcategoria: 1 },
  { id: 3, nombre: "Equipo Pereira Este", categoria: 1, subcategoria: 1 },
  { id: 4, nombre: "Equipo Cerritos", categoria: 1, subcategoria: 2 },
  { id: 5, nombre: "Equipo Santuario", categoria: 1, subcategoria: 2 },
  { id: 6, nombre: "Equipo Dosquebradas Oeste", categoria: 1, subcategoria: 2 },
  { id: 7, nombre: "Equipo La Celia", categoria: 2, subcategoria: 3 },
  { id: 8, nombre: "Equipo Santa Rosa de Cabal", categoria: 2, subcategoria: 3 },
  { id: 9, nombre: "Equipo Dosquebradas", categoria: 2, subcategoria: 3 },
  { id: 10, nombre: "Equipo Pereira", categoria: 2, subcategoria: 4 },
  { id: 11, nombre: "Equipo Marsella Norte", categoria: 2, subcategoria: 4 },
  { id: 12, nombre: "Equipo Belén de Umbría", categoria: 2, subcategoria: 4 },
  { id: 13, nombre: "Equipo Quinchía", categoria: 3, subcategoria: 5 },
  { id: 14, nombre: "Equipo Mistrató", categoria: 3, subcategoria: 5 },
  { id: 15, nombre: "Equipo Pereira Centro", categoria: 3, subcategoria: 5 },
  { id: 16, nombre: "Equipo Pueblo Rico", categoria: 3, subcategoria: 5 },
  { id: 17, nombre: "Equipo Apía", categoria: 3, subcategoria: 6 },
  { id: 18, nombre: "Equipo Pueblo Rico", categoria: 3, subcategoria: 6 },
  { id: 19, nombre: "Equipo Dosquebradas Sur", categoria: 3, subcategoria: 6 },
  { id: 20, nombre: "Equipo La Celia", categoria: 3, subcategoria: 6 }
]);

testDB.jueces.insertMany([
  { id: 1, documento: 332211, nombre: "Juan Carlos Bedoya", telefono: "3214758965", tipo: "Juez de salida" },
  { id: 2, documento: 8457965, nombre: "Camilo Sepulveda", telefono: "3114785845", tipo: "Juez de llegada" },
  { id: 3, documento: 2145851, nombre: "Lina Paola Ortiz", telefono: "3214758965", tipo: "Juez de virajes" },
  { id: 4, documento: 6142535, nombre: "Mariana Carmona", telefono: "3204587145", tipo: "Juez de salida y llegada de relevos" },
  { id: 5, documento: 14785456, nombre: "Jose Hernesto Alvares", telefono: 319547852, tipo: "Jueces de carriles" },
  { id: 6, documento: 5475621, nombre: "Sofia Hernandes", telefono: 31485465, tipo: "Jueces de infracciones" },
  { id: 7, documento: 2448664, nombre: "Brayan Rodriguez", telefono: "3204741256", tipo: "Juez de equipo" }
]);

testDB.participantes.insertMany([
  { id: 1, nombre: "Participante 1", equipo: "1" },
  { id: 2, nombre: "Participante 2", equipo: "2" },
  { id: 3, nombre: "Participante 3", equipo: "3" },
  { id: 4, nombre: "Participante 4", equipo: "4" },
  { id: 5, nombre: "Participante 5", equipo: "5" },
  { id: 6, nombre: "Participante 1", equipo: "6" },
  { id: 7, nombre: "Participante 2", equipo: "7" },
  { id: 8, nombre: "Participante 3", equipo: "8" },
  { id: 9, nombre: "Participante 4", equipo: "9" },
  { id: 10, nombre: "Participante 5", equipo: "10" }
]);

testDB.subcategorias.insertMany([
  { id: 1, categoria: "Infantil", subcategoria: "Sub-10" },
  { id: 2, categoria: "Infantil", subcategoria: "Sub-12" },
  { id: 3, categoria: "Juvenil", subcategoria: "Sub-16" },
  { id: 4, categoria: "Juvenil", subcategoria: "Sub-18" },
  { id: 5, categoria: "Mayor", subcategoria: "Grupo master 20-30" },
  { id: 6, categoria: "Mayor", subcategoria: "Grupo master 31-34" }
]);

//verificar datos
testDB.categorias.count()
printjson(testDB.categorias.find().toArray());

//Prueba secundarios
connSecondary=new Mongo("Hony:20001")
SecondarytestDB=connSecondary.getDB("torneo_nacional_natacion")

//verificar datos secundarios
SecondarytestDB.categorias.count()
printjson(SecondarytestDB.categorias.find().toArray());

//Activar permiso 
connSecondary.setSecondaryOk()

//Prueba secundarios 2
connSecondary2=new Mongo("Hony:20002")
SecondarytestDB2=connSecondary2.getDB("torneo_nacional_natacion")

//verificar datos secundarios 2
SecondarytestDB2.categorias.count()
printjson(SecondarytestDB2.categorias.find().toArray());

//Activar permiso 
connSecondary2.setSecondaryOk()
