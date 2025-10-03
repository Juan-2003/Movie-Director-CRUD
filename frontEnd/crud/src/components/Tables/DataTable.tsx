import styles from "../../styles/Tables/DataTable.module.css";

import Table from "./Table";
import Title from "../Title";

//Propiedades del componente.
//Uso de tipo de dato generico 'T' para permitir su uso con Director y Movie
type DataTableProps<T> = {
    title : string;
    data : T[];
    onCreate : (newData : T) => void;
    onUpdate : (id:number, data: Omit<T, "id">) => void;
    onDelete : (id:number) => void; 
}

//Componente que contiene 'Titulo' y 'Tabla'
function DataTable<T extends {id:number}>({title, data, onDelete, onCreate, onUpdate}:DataTableProps<T>){
    return(
        <div className={styles.dataTableContainer}>
            <div className={styles.titleContainer}>
                <Title text={title}/>
            </div>
            <Table 
                data={data}
                onDelete={onDelete}
                onCreate={onCreate}
                onUpdate={onUpdate}
            />
        </div>
    )
}

export default DataTable;