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
module.exports=controller;