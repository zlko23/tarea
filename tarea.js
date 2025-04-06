class Tarea {
  constructor(codigo, duracion, complejidad) {
    this.codigo = codigo;
    this.duracion = duracion;
    this.complejidad = complejidad;
  }
  getDuracion() {
    return this.duracion;
  }
  getCosto() {
    return this.duracion <= 5 ? 100 : 200;
  }
  getCostoTotal(){
    let costoTotal = this.complejidad === "minima" ? 100 * this.getDuracion() :
      this.complejidad === "media" ? (this.getDuracion() >= 5 ? 200 * this.getDuracion() : 150 * this.getDuracion()) :
      this.complejidad === "maxima" ? 300 * this.getDuracion() + 500 : 0;
    return costoTotal;
  }
}

class TareaCompuesta {
  constructor(codigo, duracion, subtareas = [], complejidad) {
    this.codigo = codigo;
    this.duracion = duracion;
    this.subtareas = subtareas;
    this.complejidad = complejidad;
  }
  agregar(unaTarea) {
    this.subtareas.push(unaTarea);
  }
  getDuracion() {
    return this.subtareas.reduce(
      (acum, tarea) => acum + tarea.getDuracion(),
      this.duracion,
    );
  }
  getCosto() {
    return this.duracion <= 5 ? 100 : 200;
  }
  getCostoTotal(){
    let costoTotal = this.complejidad === "minima" ? 100 * this.getDuracion() :
      this.complejidad === "media" ? (this.getDuracion() >= 5 ? 200 * this.getDuracion() : 150 * this.getDuracion()) :
      this.complejidad === "maxima" ? 300 * this.getDuracion() + 500 * this.subtareas.length : 0;
    costoTotal += this.subtareas.reduce((acum, tarea) => acum + tarea.getCostoTotal(), 0);
    return costoTotal;
  }
}

const t131 = new Tarea("1.3.1", 2 , "minima");
const t132 = new Tarea("1.3.2", 1 , "minima");
const t13 = new TareaCompuesta("1.3", 3, [t131, t132], "maxima");

const t1221 = new Tarea("1.2.2.1", 3, "minima");
const t1222 = new Tarea("1.2.2.2", 6, "media");
const t121 = new Tarea("1.2.1", 4, "minima");
const t122 = new TareaCompuesta("1.2.2", 1, [t1221, t1222], "minima");
const t12 = new TareaCompuesta("1.2", 4, [t121, t122], "maxima");

const t11 = new Tarea("1.1", 6, "maxima");

const t1 = new TareaCompuesta("1", 2, [t11, t12, t13], "media");

console.log(`\t_________________________________________________________________
\t|  TAREA\tDURACION\tCOSTE\t\tCOMPLEJIDAD\t|
\t|_______________________________________________________________|
\t|  ${t1.codigo}\t\t${t1.duracion} minutos \t$ ${t1.getCostoTotal()}\t\t${t1.complejidad}\t\t|
\t|  ${t11.codigo}\t\t${t11.duracion} minutos \t$ ${t11.getCostoTotal()}\t\t${t11.complejidad}\t\t|
\t|  ${t12.codigo}\t\t${t12.duracion} minutos \t$ ${t12.getCostoTotal()}\t\t${t12.complejidad}\t\t|
\t|  ${t121.codigo} \t${t121.duracion} minutos \t$ ${t121.getCostoTotal()}\t\t${t121.complejidad}\t\t|
\t|  ${t122.codigo} \t${t122.duracion} minutos \t$ ${t122.getCostoTotal()}\t\t${t122.complejidad}\t\t|
\t|  ${t1221.codigo} \t${t1221.duracion} minutos \t$ ${t1221.getCostoTotal()}\t\t${t1221.complejidad}\t\t|
\t|  ${t1222.codigo} \t${t1222.duracion} minutos \t$ ${t1222.getCostoTotal()}\t\t${t1222.complejidad}\t\t|
\t|  ${t13.codigo}\t\t${t13.duracion} minutos \t$ ${t13.getCostoTotal()}\t\t${t13.complejidad}\t\t|
\t|  ${t131.codigo} \t${t131.duracion} minutos \t$ ${t131.getCostoTotal()}\t\t${t131.complejidad}\t\t|
\t|  ${t132.codigo} \t${t132.duracion} minutos \t$ ${t132.getCostoTotal()}\t\t${t132.complejidad}\t\t|
\t|_______________________________________________________________|
\t|  SUBTOTAL\t${t1.getDuracion()} minutos \t$ ${t1.getCostoTotal()}\t\t\t\t|
\t|_______________________________________________________________|`);

class Proyecto {
  constructor(tareas = []) {
    this.tareas = tareas;
  }
  getDuracion() {
    return this.tareas.reduce((total, tarea) => total + tarea.getDuracion(), 0);
  }
  getCostoTotal() {
    return this.tareas.reduce(
      (total, tarea) => total + tarea.getCostoTotal(),
      0,
    );
  }
}

const proyecto = new Proyecto([t1]);

console.log(`\t|_______________________________________________________________|
\t|  TOTAL\t${proyecto.getDuracion()} minutos \t$ ${proyecto.getCostoTotal()}\t\t\t\t|
\t|_______________________________________________________________|`);
