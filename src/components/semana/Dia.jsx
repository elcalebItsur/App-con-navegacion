import React, { useState } from 'react'
import './Dia.css'

function Dia({texto,marcado,click}) {
    // const [marcadoActual,setMarcadoActual]=useState(marcado);
    return (
        <button className={'dia '+ (marcado && 'marcado')} type="button" 
        // onClick={()=>setMarcadoActual(!marcadoActual)}
        onClick={click}
        >{texto}</button>

        // <button className={marcado?'dia marcado':'dia'} type="button">{texto}</button>
    )
}

export default Dia