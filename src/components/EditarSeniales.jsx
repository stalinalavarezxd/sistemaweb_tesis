import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import appFirebase from '../credenciales';

const EditarSenial = ({ senialId, onClose }) => {
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoTipoSenial, setNuevoTipoSenial] = useState('');
  const [nuevoIdClase, setNuevoIdClase] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(appFirebase);
      const senialDoc = doc(db, 'seniales', senialId);
      const senialData = await getDoc(senialDoc);

      if (senialData.exists()) {
        setNuevoNombre(senialData.data().nombre);
        setNuevoTipoSenial(senialData.data().tipo_senial);
        setNuevoIdClase(senialData.data().id_clase);
        setNuevaImagen(senialData.data().imagen);
        // Agrega más campos según tus necesidades
      }
    };

    fetchData();
  }, [senialId]);

  const handleGuardarCambios = async () => {
    try {
      const db = getFirestore(appFirebase);
      const senialDoc = doc(db, 'seniales', senialId);
      await updateDoc(senialDoc, {
        nombre: nuevoNombre,
        tipo_senial: nuevoTipoSenial,
        id_clase: nuevoIdClase,
        imagen: nuevaImagen,
        // Agrega más campos para actualizar según tus necesidades
      });

      // Cerrar el formulario de edición después de guardar cambios
      onClose();
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Editar Señal</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="nuevoNombre" className="form-label">Nuevo Nombre:</label>
          <input type="text" className="form-control" id="nuevoNombre" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="nuevoTipoSenial" className="form-label">Nuevo Tipo de Señal:</label>
          <input type="text" className="form-control" id="nuevoTipoSenial" value={nuevoTipoSenial} onChange={(e) => setNuevoTipoSenial(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="nuevoIdClase" className="form-label">Nuevo ID de Clase:</label>
          <input type="text" className="form-control" id="nuevoIdClase" value={nuevoIdClase} onChange={(e) => setNuevoIdClase(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="nuevaImagen" className="form-label">Nueva Imagen:</label>
          <input type="text" className="form-control" id="nuevaImagen" value={nuevaImagen} onChange={(e) => setNuevaImagen(e.target.value)} />
        </div>
        
        {/* Agrega más campos del formulario según tus necesidades */}
        <button type="button" className="btn btn-primary" onClick={handleGuardarCambios}>Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarSenial;
