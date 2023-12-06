var database = require("../database/config");

function buscarUltimasMedidas() {
  instrucaoSql = `
    select 
        fkSensor idSensor,
        sensor.geladeira,
        registro.temperatura, 
        DATE_FORMAT(horario,'%H:%i:%s') as momento_grafico 
    from registro
    join sensor on fkSensor = idSensor
    order by idRegistro 
    desc limit 3;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal() {
  instrucaoSql = `
        select 
            registro.temperatura, 
            DATE_FORMAT(horario,'%H:%i:%s') as momento_grafico 
            
        from registro 
        order by idRegistro 
        desc limit 3;
        `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUltimasMedidasSensor(idSensor) {
  instrucaoSql = `
  select 
  registro.idRegistro,
  registro.temperatura,
  registro.fkSensor,
  sensor.geladeira,
  DATE_FORMAT(horario, '%H:%i:%s')as horario
  
from registro 
join sensor on fkSensor = idSensor
where fkSensor = 1001 
order by idRegistro 
desc limit 7;
;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealSensor(idSensor) {
  instrucaoSql = `
    select 
        registro.temperatura, 
        DATE_FORMAT(horario,'%H:%i:%s') as momento_grafico 
        
    from registro 
    order by idRegistro 
    desc limit 3
    where fkSensor = ${idSensor}
    ;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function alertas(fkEndereco) {
  instrucaoSql = `
  select  
    alerta.idAlerta,
    alerta.tipo,
    alerta.temperatura,
    alerta.acesso,
    alerta.fkSensor,
    DATE_FORMAT(horario, '%H:%i:%s')as horario
  
  
  
  from alerta 
  join sensor on idSensor = fkSensor
   where sensor.fkEndereco = ${fkEndereco} order by idAlerta desc;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function mediaAlertas() {
  instrucaoSql = `
    select count(*) as quantidade, tipo from alerta where tipo != 'verde' group by tipo;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}



function qtnSensor(fkEndereco) {
  instrucaoSql = `
        select count(*) as qtdSensor from sensor where fkEndereco = ${fkEndereco};
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function alterarAcesso(idAlerta) {
  instrucaoSql = `
  update alerta set acesso = true where idAlerta = ${idAlerta};
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
  buscarUltimasMedidasSensor,
  buscarMedidasEmTempoRealSensor,
  alertas,
  mediaAlertas,
  qtnSensor,
  alterarAcesso
};
