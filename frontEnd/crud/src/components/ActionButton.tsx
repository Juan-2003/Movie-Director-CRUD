
import styles from '../styles/ActionButton.module.css';

import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

//Propiedades del componente
type ButtonIconProps = {
    accion : string;
    color: string;
    onClick : () => void;
}

//Componente para crear botones de acciones CRUD
function ActionButton({accion, color, onClick}:ButtonIconProps){
    const renderIcon = () => {//Dependiendo de la accion se usa un icono y color diferente
        switch(accion){
            case "Delete":
                return <FaTrashAlt color='#ffffff'/>
            case "Edit":
                return <FaEdit color='#463903ff'/>
            case "Add":
                return <IoMdAdd color='#ffffff'/>
        }
    }
    
    
    return(
        <div className={styles.buttonContainer}>
            <button 
                className={styles.button} 
                //PENDIENTE---------------------------------------------------
                style={{backgroundColor: color}}
                onClick={onClick}
                >
                    {renderIcon()}
                    <span>{accion}</span>
            </button>
        </div>
    )
}

export default ActionButton;