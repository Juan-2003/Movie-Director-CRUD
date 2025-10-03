import styles from '../../styles/Tables/Table.module.css'
import {useState } from 'react';

import ButtonIcon from '../ActionButton';
import CreateForm from '../Forms/CreateForm';
import UpdateForm from '../Forms/UpdateForm';

//Propiedades del componente
//Uso de tipo de dato generico 'T' para permitir su uso con Director y Movie
type TableProps<T> = {
    data : T[];
    onCreate : (newData : any) => void;
    onUpdate : (id:number, data: Omit<T, "id">) => void;
    onDelete : (id:number) => void;
}

//Componente que muestra la tabla del CRUD con filas, columnas, informacion y botones de accion
function Table<T extends {id:number}>({data, onDelete, onCreate, onUpdate}:TableProps<T>){
    const [selectedItem, setSelectedItem] = useState<any | null>(null);//Estado para almacenar fila seleccionada
    const [addFlag, setAddFlag] = useState(false);//Estado para boton de 'agregar' un nuevo registro
    const [updateFlag, setUpdateFlag] = useState(false); //Estado para boton de 'editar' un registro existente

    //Manejar estado 'addFlag'
    const handleAddFlag = () => {
        setAddFlag(!addFlag);
    }
    
    //Manejar estado 'updateFlag'
    const handleUpdateFlag = (item : any) => {
        setSelectedItem(item);
        setUpdateFlag(!updateFlag);
    }

    return (
        <>
            <div className={styles.addButton}>
                <ButtonIcon accion="Add" color='#2ba946' onClick={() => handleAddFlag()}/>{/*Botón agregar nuevo registro*/}
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        {/*Iteracion para crear columnas segun 'data'*/}
                        {data.length > 0 &&                      
                        Object.keys(data[0]).map((key) => (   
                            <th className={styles.column} key = {key}>
                                {key.toUpperCase()}
                            </th>
                        ))}
                        <th className={styles.column}>Actions</th> {/*Columna 'actions'*/}
                    </tr>
                </thead>
                <tbody className={styles.body}>
                    {/*Iteracion para crear filas segun 'data'*/}
                    {data.map((item) => (
                        <tr key={item.id}>
                            {Object.keys(item).map((key) => {
                                const value = (item as any)[key];
                                if(typeof value == "object"){ //En caso de ser un objeto se obtiene el nombre
                                    return(
                                        <td key={key} className={styles.row}>
                                            {value.name} 
                                        </td>
                                    )
                                }
                                return(
                                    //Si la columna dice 'active' mostrara 'Yes' si es true, 'No' si es false
                                    //Para cualquier otra columna se convierte el valor a string.
                                    <td key={key} className={styles.row}>
                                        {key === "active" ? ((item as any)[key] ? "Yes" : "No") : String(value)}
                                    </td>
                                )
                            })}
                            {/*Cada fila tiene sus boton es de accion*/}
                            <td className={styles.row}>
                                <div className={styles.actionButtonsContainer}>
                                    <ButtonIcon accion='Edit' color="#fbbf31" onClick={() => handleUpdateFlag(item)} />{/*Boton para editar registro*/}
                                    <ButtonIcon accion='Delete' color="#da1111ff" onClick={() => onDelete(item.id)} />{/*Boton para eliminar registro*/}
                                </div>
                            </td>
                        </tr>
                    ))}   
                </tbody>
            </table>
            {/*Si 'updateFlag' es true muestra formulario para actualizar*/}
            {updateFlag && selectedItem && (
                <div className={styles.formContainer}>
                    <UpdateForm initialData={selectedItem} onSubmit={(data) => onUpdate(selectedItem.id, data)}/>
                </div>
            )}
            {/*Si 'addFlag' es true muestra formulario de alta*/}
            {addFlag && (
                <div className={styles.formContainer}>
                    <CreateForm initialData={data[0]} onSubmit={(data) => onCreate(data)}/>
                </div>

            )}
           
        </>
    )
}

export default Table;
