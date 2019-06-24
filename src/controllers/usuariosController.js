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
            console.log(rows)
            res.json(rows)
        })
    })
}
module.exports=controller;