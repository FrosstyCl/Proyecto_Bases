#Doctor que mas/menos ha ganado 
select nombre,costes from empleado,(select empleado.id ,sum(costo_atencion)as costes from empleado, especialidad, atencion where empleado.id=atencion.id_empleado and empleado.especialidadId = especialidad.especialidadId group by empleado.id) as total where
total.costes =(select min(costes) from(select empleado.id ,sum(costo_atencion)as costes from empleado, especialidad, atencion where empleado.id=atencion.id_empleado and empleado.especialidadId = especialidad.especialidadId group by empleado.id) as total) and 
total.id=empleado.id