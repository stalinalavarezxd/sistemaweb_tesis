import React, { useState } from 'react';
import appFirebase from '../credenciales';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

const Form = () => {
  const [urlImDesc, setUrlImDesc] = useState('');

  const guardarInfo = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const tipo_senial = e.target.tipo_senial.value;
    const id_clase = e.target.id_clase.value;
    const descripcion = e.target.descripcion.value;

    // Asegúrate de que haya una URL de imagen antes de guardar la información
    if (!urlImDesc) {
      console.error('La imagen aún no se ha subido.');
      return;
    }

    const newSenial = {
      descripcion: descripcion,
      id_clase: id_clase,
      imagen: urlImDesc,
      nombre: nombre,
      tipo_senial: tipo_senial,
    };

    // Enviar la información a la API
    try {
      const response = await fetch('https://us-central1-swtesis-e0343.cloudfunctions.net/app/api/seniales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSenial),
      });

      if (response.ok) {
        console.log('Información enviada a la API exitosamente');

        // Función de guardado en la base de datos local
        try {
          await addDoc(collection(db, 'seniales'), {
            ...newSenial,
          });
          console.log('Señal subida exitosamente a la base de datos local');
        } catch (error) {
          console.log('Error al subir la señal a la base de datos local:', error);
        }

      } else {
        console.error('Error al enviar la información a la API:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud a la API:', error);
    }

    // Limpiar campos del formulario
    e.target.nombre.value = '';
    e.target.tipo_senial.value = '';
    e.target.id_clase.value = '';
    e.target.descripcion.value = '';
    e.target.file.value = '';
    setUrlImDesc(''); // Limpiar la URL de la imagen después de agregar la señal
  };

  const FileHandler = async (e) => {
    // Detectar el archivo
    const archivoI = e.target.files[0];

    // Cargar el archivo al Storage
    const storageRef = ref(storage, `documentos/${archivoI.name}`);
    await uploadBytes(storageRef, archivoI);

    // Obtener la URL de descarga de la imagen
    const url = await getDownloadURL(storageRef);
    setUrlImDesc(url);
  };

  return (
    <div className='card card-body'>
      <h3 className='text-center'>Agregar Señales</h3>
      <form onSubmit={guardarInfo}>
        <label>Nombre:</label>
        <div className='form-group'>
          <input type="text" placeholder='Ingresar el nombre de la señal' id='nombre' className='form-control mt-1' required></input>
        </div>
        <label>Tipo de Señal:</label>
        <div className='form-group'>
          <input type="text" placeholder='Ingresar el tipo de señal' id='tipo_senial' className='form-control mt-1' required></input>
        </div>
        <label>Clase:</label>
        <div className='form-group'>
          <input type="text" placeholder='Ingresar el ID de la clase de la señal' id='id_clase' className='form-control mt-1' required></input>
        </div>
        <label>Descripción:</label>
        <div className='form-group'>
          <input type="text" placeholder='Ingresar la descripción de la señal' id='descripcion' className='form-control mt-1' required></input>
        </div>
        <label>Agregar Imagen:</label>
        <input type="file" id="file" placeholder='Agregar Imagen' className='form-control' onChange={FileHandler}></input>
        <button className='btn btn-primary mt-3 form control'>Guardar</button>
      </form>
    </div>
  );
};

export default Form;