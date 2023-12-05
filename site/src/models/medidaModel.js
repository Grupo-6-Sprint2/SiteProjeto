var database = require("../database/config");

function buscarUltimasMedidas() {

    instrucaoSql = `
    select 
        registro.temperatura, 
        DATE_FORMAT(horario,'%H:%i:%s') as momento_grafico 
        
    from registro 
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
    select * 
    from registro 
    where fkSensor = ${idSensor} 
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

function alertas() {

    instrucaoSql = `
    select * from alerta  order by idAlerta desc;;
    `;


console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}








module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarUltimasMedidasSensor,
    buscarMedidasEmTempoRealSensor,
    alertas
}
