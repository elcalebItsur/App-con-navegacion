import React, { useEffect, useState } from 'react'
import Semana from '../components/semana/Semana.jsx'
import personas from '../datos/personas.json'

function ListasPersonas() {
    // Estado para la lista de personas, visibilidad del formulario, campos del formulario y modo edición
    const [listaPersonas, setListaPersonas] = useState(personas);
    const [agregarVisible, setAgregarVisible]=useState(false);
    const [nombre, setNombre] = useState('');
    const [disponibilidad, setDisponibilidad] = useState([false,false,false,false,false,false,false]);
    const [editando, setEditando] = useState(null);

    // Función para resetear el formulario a su estado inicial
    const resetForm = () => {
        setNombre('');
        setDisponibilidad([false,false,false,false,false,false,false]);
    };

    // Función para manejar el guardado tanto en modo agregar como editar
    const handleGuardar = (event) => {
        event.preventDefault(); // Evitar recarga de página
        const nuevoNombre = nombre.trim(); 
        if (!nuevoNombre) return; // Validar que el nombre no esté vacío

        let nuevaLista;
        
        if (editando !== null) { // Si estamos editando, actualizar la persona existente
            // Modo edición
            nuevaLista = listaPersonas.map((persona, i) => // Si el índice coincide con el que estamos editando, actualizar esa persona, sino dejarla igual
                i === editando ? { nombre: nuevoNombre, disponibilidad } : persona
            );
            setEditando(null); // Salir del modo edición
        } else {
            // Modo agregar
            const nuevaPersona = {
                nombre: nuevoNombre,
                disponibilidad,
            };
            nuevaLista = [...listaPersonas, nuevaPersona]; // Agregar la nueva persona al final de la lista existente
        }

        setListaPersonas(nuevaLista); // Actualizar el estado con la nueva lista de personas
        localStorage.setItem('personasStorage', JSON.stringify(nuevaLista)); // Guardar la nueva lista en localStorage
        resetForm(); // Limpiar el formulario después de guardar
        setAgregarVisible(false); // Ocultar el formulario después de guardar
    };

    const handleCancelar = () => {
        resetForm();
        setAgregarVisible(false);
        setEditando(null);
    };

    const handleEditar = (index) => {
        setNombre(listaPersonas[index].nombre);
        setDisponibilidad(listaPersonas[index].disponibilidad);
        setEditando(index);
        setAgregarVisible(true);
    };

    const handleEliminar = (index) => {
        if (window.confirm(`¿Está seguro de que desea eliminar a ${listaPersonas[index].nombre}?`)) {
            const nuevaLista = listaPersonas.filter((_, i) => i !== index);
            setListaPersonas(nuevaLista);
            localStorage.setItem('personasStorage', JSON.stringify(nuevaLista));
        }
    };

    const updatePersonaDisponibilidad = (index, nuevosChecked) => { // Función para actualizar la disponibilidad de una persona específica
        const nuevaLista = listaPersonas.map((persona, i) => // Si el índice coincide con el que estamos editando, actualizar esa persona, sino dejarla igual
            i === index ? { ...persona, disponibilidad: nuevosChecked } : persona // Usar spread operator para mantener el resto de las propiedades de la persona sin cambios y solo actualizar la disponibilidad
        );
        setListaPersonas(nuevaLista); // Actualizar el estado con la nueva lista de personas
        localStorage.setItem('personasStorage', JSON.stringify(nuevaLista)); // Guardar la nueva lista en localStorage
    };

    useEffect(()=>{
        //Verificar si el storage esta gargado
        let personasStorage=localStorage.getItem('personasStorage')?
        JSON.parse(localStorage.getItem('personasStorage')):null;
        //Cuando no esta, cargar el json en el storage
        if(!personasStorage){
            localStorage.setItem('personasStorage',JSON.stringify(personas));
            setListaPersonas(personas);
        }else{
            setListaPersonas(personasStorage);
        }
    },[]);
    return (
        <>
            <h2>Lista Personas</h2>
            <button type='button' onClick={()=>{resetForm(); setEditando(null); setAgregarVisible(true)}}>Agregar</button>
            {agregarVisible && (
                <form onSubmit={handleGuardar}>
                    <h3>{editando !== null ? 'Editar Persona' : 'Agregar Persona'}</h3>
                    <input type="text" placeholder='Nombre de la persona' value={nombre} onChange={(e)=>setNombre(e.target.value)} />
                    <Semana diasSeleccionados={disponibilidad} cambioDeDia={setDisponibilidad} />
                    <button type='submit'>Guardar</button>
                    <button type='button' onClick={handleCancelar}>Cancelar</button>
                </form>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Persona</th>
                        <th>Disponibilidad</th>
                        <th>Días Disponibles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPersonas.map((persona, index) => (
                        <tr key={index}>
                            <td>{persona.nombre}</td>
                            <td>
                                <Semana diasSeleccionados={persona.disponibilidad} cambioDeDia={(nuevosChecked) => updatePersonaDisponibilidad(index, nuevosChecked)} readOnly={true} />
                            </td>
                            <td>
                                {persona.disponibilidad.filter((dia) => dia === true).length}
                            </td>
                            <td>
                                <button type='button' onClick={()=>handleEditar(index)}>Editar</button>
                                <button type='button' onClick={()=>handleEliminar(index)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ListasPersonas