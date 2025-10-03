import styles from "../../styles/Forms/CreateForm.module.css"
import { useState } from "react";

import Input from "../Input";

//Propiedades del componente.
//Uso de tipo de dato generico 'T' para permitir su uso con Director y Movie
type CreateFormProps<T>={
    initialData: T;
    onSubmit: (formData:Omit<T,"id">) => void;
}

//Componente para crear formularios genericos dependiendo de la informacion recibida.
//OBEJTIVO: Registrar nuevos Director y Movies
function CreateForm<T extends Record<string,any>>({initialData, onSubmit}:CreateFormProps<T>){
    //Estado que almacena los valores actuales del formulario.
    //Inicializa los valores basándose en la estructura de initialData:
    const [formValues, setFormValues] = useState<Record<string, any>>(() => {
        const values: Record<string, any> = {};
        Object.keys(initialData).forEach(key => {
            if (key !== "id") {
                const value = initialData[key];
            
                //Si se detecta que un campo es un obejto, transforma el nombre del campo en 'fk+{nombre del campo}'
                //NO ES LO IDEAL
                if (value && typeof value === "object" && "id" in value) {
                    const fkKey = `fk${key.charAt(0).toUpperCase() + key.slice(1)}`; 
                    values[fkKey] = "";
                } 
                else if (typeof value === "number") {
                    values[key] = "";
                } else {
                    values[key] = "";
                }
            }
        });
        return values;
    });

    //Determina el tipo de input basado en el tipo de dato y nombre.
    const getInputType = (key:string, value: any): "text" | "number" => {
        if (typeof value === "number") return "number";
        if(key === "director") return "number";
        return "text";
    };

    //Maneja los cambios en los inputs del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value} = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: type === "number" || name === "director" || name === "fkDirector" ? Number(value) : value
        }));
    };
    
    //Manejo del envio del formulario
    const handleSubmit = () => {
        const finalData: Record<string, any> = {};
        
        // Filtra los campos, excluyendo las relaciones originales que fueron reemplazadas por FK.
        //NO ES LO IDEAL
        Object.keys(formValues).forEach(key => {
            const isOriginalRelation = Object.keys(initialData).some(originalKey => 
                originalKey !== "id" && 
                initialData[originalKey] && 
                typeof initialData[originalKey] === "object" && 
                "id" in initialData[originalKey] &&
                originalKey === key
            );
            
            if (!isOriginalRelation) {
                finalData[key] = formValues[key];
            }
        });
        
        //Ejecucion de la funcion con datos
        onSubmit(finalData as Omit<T, "id">);
        
    };

    return (
        //Formulario
        <form className={styles.form} onSubmit={handleSubmit}>
            {Object.keys(formValues)
                .filter(key => key != "id" && typeof initialData[key] !== "boolean")
                .map((key) => (
                    <Input //Cada 'key' es un nuevo input
                        key={key}
                        name={key}
                        text={key}
                        type={getInputType(key,initialData[key])}
                        value={formValues[key]}
                        onChange={handleChange}
                    />
                ))}
            <button className={styles.submitButton} type="submit">Submit</button>
        </form>

    );
}


export default CreateForm;