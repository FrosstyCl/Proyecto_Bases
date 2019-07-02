const controller = {}

//Funciones para agregar, borrar y listar

controller.mostrarPacientes = (req,res)=>{
    req.getConnection((err,conn)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
        conn.query('select * from paciente',(err,rows)=>{
            res.json(rows)
        })
    })
}

controller.addPaciente = (req,res)=>{
    const data=req.body;
    req.getConnection((err, conn)=>{
        conn.query('INSERT INTO pacientes set ?',[data],(err,rows)=> {
            res.redirect('/pacientes.html')
        });
    })
}

controller.mostrarEd = (req,res)=>{
    req.getConnection((err,conn)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
        conn.query('select * from edificio order by edificio.edificioID',(err,rows)=>{
            res.json(rows)
        })
    })
}

controller.addEd = (req,res)=>{
    const data=req.body;
    req.getConnection((err, conn)=>{
    
        conn.query('INSERT INTO edificios set ?',[data],(err,rows)=> {
            res.redirect('/edificios.html')
        });
    })
}

controller.addEmpleado = (req,res)=>{
    const data=req.body;
    req.getConnection((err, conn)=>{
    conn.query('INSERT INTO empleado set ?',[data],(err,rows)=> {
            res.redirect('/empleados.html')
        });
    })
}
controller.mostrarEmpleado = (req,res)=>{
    req.getConnection((err,conn)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
        conn.query('select * from empleado order by empleado.id_edificio ',(err,rows)=>{
            res.json(rows)
        })
    })
}


controller.mostrarAtenciones = (req,res)=>{
    req.getConnection((err,conn)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
        conn.query('select empleado.nombre as medico, empleado.id as medico_id, paciente.nombre as paciente, paciente.id as paciente_id,atencion.fecha, atencion.hora from atencion,paciente, empleado where atencion.id_paciente=paciente.id and atencion.id_empleado=empleado.id;',(err,rows)=>{
            res.json(rows)
        })
    })
}

controller.addAtencion= (req,res)=>{
    const data=req.body;
    console.log(data)
    req.getConnection((err, conn)=>{
    conn.query('INSERT INTO atencion set ?',[data],(err,rows)=> {
            res.redirect('/atencion.html')
        });
    })
}


controller.consulta= (req,res)=>{//req es lo que llega, res lo que se manda
    const data=req.body
    console.log(data)
    req.getConnection((err,conn)=>{
        res.setHeader('Access-Control-Allow-Origin', '*')
        if(data.consulta==0){res.render('index')}
        if(data.consulta==1){
            var sql ='select nombre,costes from (select paciente.nombre, sum(costo_atencion) as costes from paciente,atencion,empleado,especialidad '
            sql+= ' where paciente.id=atencion.id_paciente and atencion.id_empleado=empleado.id and empleado.especialidadId=especialidad.especialidadId group by paciente.id) as total'
            sql+= ' where total.costes=(select max(costes) from (select sum(costo_atencion) as costes from paciente,atencion,empleado,especialidad '
            sql+= ' where paciente.id=atencion.id_paciente and atencion.id_empleado=empleado.id and empleado.especialidadId=especialidad.especialidadId group by paciente.id)as total)'
            conn.query(sql,(err,rows)=>{
                //console.log(rows)
                res.render('consulta1',{data:rows})
            })
        }
        if(data.consulta==2){
            var sql='select nombre,costes from empleado,(select empleado.id ,sum(costo_atencion)as costes from empleado, especialidad, atencion '
            sql+= ' where empleado.id=atencion.id_empleado and empleado.especialidadId = especialidad.especialidadId group by empleado.id) as total where'
            sql+= ' total.costes =(select min(costes) from(select empleado.id ,sum(costo_atencion)as costes from empleado, especialidad, atencion'
            sql+= ' where empleado.id=atencion.id_empleado and empleado.especialidadId = especialidad.especialidadId group by empleado.id) as total) and '
            sql+= ' total.id=empleado.id'
            conn.query(sql,(err,rows)=>{
                console.log(rows)
                res.render('consulta2',{data:rows})
            })
        }
        if(data.consulta==3){
            var sql='select fecha,cuantas from (select fecha, count(fecha) as cuantas from atencion group by fecha ) as total'
            sql+=' where cuantas=(select max(cuantas) from (select fecha, count(fecha) as cuantas from atencion group by fecha) as total)'
            conn.query(sql,(err,rows)=>{
                console.log(rows)
                res.render('consulta3',{data:rows})
            })
        }
        if(data.consulta==4){
            var sql= 'select especialidadId,nombre, max(consultas) as mayor from (select empleado.nombre, count(id) as consultas , empleado.especialidadId '
            sql+= ' from atencion,empleado where empleado.id=atencion.id_empleado group by empleado.id) as total'
            sql+= ' group by especialidadId order by especialidadId'
            conn.query(sql,(err,rows)=>{
                console.log(rows)
                res.render('consulta4',{data:rows})
            })
        }
        if(data.consulta==5){
            var sql=' select comuna, count(empleado.id) as cant from empleado,edificio where edificio.edificioId=empleado.id_edificio group by comuna'
            conn.query(sql,(err,rows)=>{
                console.log(rows)
                res.render('consulta5',{data:rows})
            })
        }
    })
}       

controller.araya = (req,res)=>{
    req.getConnection((err,conn)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    var sql='SELECT COUNT(Edificio.rut_director) AS cuenta FROM Edificio, Paciente WHERE Paciente.distrito = "Santiago IV" AND Paciente.comuna = Edificio.comuna;'
        sql+='SELECT SUM(costo_atencion) AS suma FROM Atencion, Empleado, Especialidad WHERE Atencion.id_empleado = Empleado.id AND Empleado.especialidadID = Especialidad.especialidadId AND Atencion.fecha = "14/04/2019";'
        sql+=' SELECT MAX(cuenta), total.nombre FROM (SELECT Paciente.nombre, COUNT(Atencion.id_empleado) as cuenta FROM Paciente, Atencion WHERE Paciente.id = Atencion.id_paciente GROUP BY Paciente.nombre) as total;'
        conn.query(sql,(err,rows)=>{
            console.log(rows)
            //res.json(rows)
        })
    })
}


/*

SELECT COUNT(Edificio.rut_director) AS cuenta FROM Edificio, Paciente WHERE Paciente.distrito = "Santiago IV" AND Paciente.comuna = Edificio.comuna;
 #Número de edificios pertenecientes al distrito Santiago IV (Edificio.distrito no sirve pq lo llené con los distritos pero de forma independiente a las comunas).

SELECT Atencion.fecha, Atencion.hora FROM Atencion, Empleado, Especialidad WHERE Atencion.rut_medico = Empleado.rut AND  Empleado.especialidad = Especialidad.especialidad AND costo_atencion = MIN(costo_atencion);
 #Fecha y hora de las atenciones con la especialidad menos costosa.

SELECT Edificio.nombre, Edificio.comuna FROM Edificio, (SELECT COUNT(Paciente.rut) AS suma, Paciente.comuna FROM Paciente GROUP BY comuna) AS total WHERE Edificio.comuna = total.comuna AND total.suma=(SELECT MAX(suma) FROM (SELECT COUNT(Paciente.rut) AS suma, Paciente.comuna FROM Paciente GROUP BY comuna));
 #Nombres de los edificios de la comuna con más pacientes.

SELECT SUM(costo_atencion) AS suma FROM Atencion, Empleado, Especialidad WHERE Atencion.rut_medico = Empleado.rut AND Empleado.especialidad = Especialidad.especialidad AND Atencion.fecha = "14/04/2019";
 #Suma de recaudaciones del día 14/04/2019.

SELECT MAX(cuenta), total.nombre FROM (SELECT Pacientes.nombre, COUNT(Atencion.rut_medico) as cuenta FROM Pacientes, Atencion WHERE Pacientes.rut = Atencion.rut_paciente GROUP BY Pacientes.nombre) as total;
 #Nombre de los pacientes que más han sido atendidos y el número de veces.
*/



module.exports=controller;