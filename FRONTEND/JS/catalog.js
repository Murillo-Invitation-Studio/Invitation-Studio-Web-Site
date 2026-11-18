//----------------------------------
// Cargar catalago desde JSON
//----------------------------------
async function cargarCatalogo(){
    const contenedor = document.getElementById('Catalago_Grid');

    try{
        const respuesta = await fetch('/FRONTEND/data/catalog.json');

        if(!respuesta.ok){
            throw new Error('No se pudo cargar el catalogo');
        }

        const datos = await respuesta.json();

        //Limpiar el catalago
        contenedor.innerHTML = '';

        //Clases CSS correspondientes a cada vista previa de invitacion
        const classPreview = {
            boda: 'Catalago_Prevista_Boda',
            xv: 'Catalago_Prevista_XV',
            cumpleaños: 'Catalago_Prevista_Cumpleaños',
            fiesta: 'Catalago_Prevista_Fiesta',
            bautizo: 'Catalago_Prevista_Bautizo',
            graduacion: 'Catalago_Prevista_Graduacion',
            corporativo: 'Catalago_Prevista_Corporativo'
        };

        //Recorrer los elementos del JSON
        datos.catalago.forEach(invitacion => {

            //Crear tarjeta para cada invitacion
            const tarjeta = document.createElement('div');
            tarjeta.className = 'Catalago_Item fade-in';
            tarjeta.dataset.cat = invitacion.categoria;

            //Vista Previa de la invitacion
            const preview = document.createElement('div');
            preview.className = classPreview[invitacion.preview];

            const vista = document.createElement('div');
            vista.className = 'Catalago_Vista';

            //Elementos decorativos de la vista previa
            const linea1 = document.createElement('div');
            linea1.className = 'Vista_Line';

            const texto1 = document.createElement('div');
            texto1.className = 'Vista_Text';
            texto1.textContent = 'Te invitamos a celebrar';

            const titulo = document.createElement('div');
            titulo.className = 'Vista_Title';
            titulo.textContent = invitacion.evento;

            const linea2 = document.createElement('div');
            linea2.className = 'Vista_Line';

            const personas = document.createElement('div');
            personas.className = 'Vista_Text';
            personas.textContent = invitacion.personas || 'Tu evento especial';

            const linea3 = document.createElement('div');
            linea3.className = 'Vista_Line';

            //Agregar elementos de la vista previa a su contenedor
            vista.append(linea1, texto1, titulo, linea2, personas, linea3);
            preview.appendChild(vista);

            //Etiqueta Popular
            if(invitacion.popular){
                const etiqueta = document.createElement('span');
                etiqueta.className = 'Tag_Popular';
                etiqueta.textContent = 'Popular';

                preview.appendChild(etiqueta);
            }

            //Etiqueta Nuevo
            if(invitacion.nuevo){
                const etiqueta = document.createElement('span');
                etiqueta.className = 'Tag_Nuevo';
                etiqueta.textContent = 'Nuevo';

                preview.appendChild(etiqueta);
            }

            //Informacion de la invitacion
            const informacion = document.createElement('div');
            informacion.className = 'Catalago_Info';

            const tipo = document.createElement('p');
            tipo.className = 'Catalago_Tipo_Evento';
            tipo.textContent = invitacion.evento;

            const nombre = document.createElement('h3');
            nombre.className = 'Catalago_Nombre';
            nombre.textContent = invitacion.nombre;

            const descripcion = document.createElement('p');
            descripcion.className = 'Catalago_Descripcion';
            descripcion.textContent = invitacion.descripcion;

            informacion.append(tipo, nombre, descripcion);

            //Construir la tarjeta completa
            tarjeta.append(preview, informacion);
            contenedor.appendChild(tarjeta);

            //Activar animacion fade-in para la tarjeta nueva
            observer.observe(tarjeta);
        });
    }catch(error){
        console.error('Error al cargar el catalogo:', error);
        contenedor.textContent = 'No fue posible cargar el catalago. Intente nuevamente...';
    }
}

//Ejecutar cuando HTML ya este disponible
cargarCatalogo();

//---------------------------------------
// Filtro de catalago
//---------------------------------------
function filterCatalog(cat, btn){

  // Cambiar el boton activo
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
  });

  btn.classList.add('active');

  // Filtrar los elementos del catalogo
  const items = document.querySelectorAll('.Catalago_Item');

  items.forEach(item => {
    const category = item.dataset.cat;

    if(cat === 'all' || category === cat){
      item.style.display = 'block';
    } else{
        item.style.display = 'none';
      }
  });
}