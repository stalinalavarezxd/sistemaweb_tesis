import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../credenciales';

const ConsultaSeniales = () => {
  const [seniales, setSeniales] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [senialIdToEdit, setSenialIdToEdit] = useState(null);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoTipoSenial, setNuevoTipoSenial] = useState('');
  const [nuevoIdClase, setNuevoIdClase] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(appFirebase);
      const senialesCollection = collection(db, 'seniales');
      const data = await getDocs(senialesCollection);
      setSeniales(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleClickConsultarSeniales = () => {
    setIsOpen(!isOpen);
    setIsEditing(false);
    setSenialIdToEdit(null);
  };

  const handleClickEditarSenial = async (senialId) => {
    setIsEditing(true);
    setSenialIdToEdit(senialId);

    try {
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
    } catch (error) {
      console.error('Error al obtener información para editar:', error);
    }
  };

  const handleGuardarCambios = async () => {
    try {
      const db = getFirestore(appFirebase);
      const senialDoc = doc(db, 'seniales', senialIdToEdit);
      await updateDoc(senialDoc, {
        nombre: nuevoNombre,
        tipo_senial: nuevoTipoSenial,
        id_clase: nuevoIdClase,
        imagen: nuevaImagen,
        // Agrega más campos según tus necesidades
      });

      setIsEditing(false);
      setSenialIdToEdit(null);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  const handleEliminarSenial = async (senialId) => {
    try {
      const db = getFirestore(appFirebase);
      const senialDoc = doc(db, 'seniales', senialId);
      await deleteDoc(senialDoc);
      setIsEditing(false);
      setSenialIdToEdit(null);
      // Actualizar la lista de señales después de eliminar
      const data = await getDocs(collection(db, 'seniales'));
      setSeniales(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error al eliminar señal:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Consultar Señales</h3>
      <button className="btn btn-primary mb-3" onClick={handleClickConsultarSeniales}>
        {isOpen ? 'Cerrar Señales' : 'Consultar Señales'}
      </button>
      {isOpen && (
        <ul className="list-group">
          {seniales.map(senial => (
            <li key={senial.id} className="list-group-item d-flex justify-content-between align-items-center">
              {senial.nombre} - {senial.tipo_senial}
              <div>
                <button className="btn btn-warning me-2" onClick={() => handleClickEditarSenial(senial.id)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleEliminarSenial(senial.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isEditing && senialIdToEdit && (
        <div className="mt-4">
          <h4>Editar Señal</h4>
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
          <button type="button" className="btn btn-primary me-2" onClick={handleGuardarCambios}>
            Guardar Cambios
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsultaSeniales;
