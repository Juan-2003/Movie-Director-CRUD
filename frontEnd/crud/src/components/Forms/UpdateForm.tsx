import styles from "../../styles/Forms/UpdateForm.module.css"
import { useState } from "react";

import Input from "../Input";

//Propiedades del componente.
//Uso de tipo de dato generico 'T' para permitir su uso con Director y Movie
type UpdateFormProps<T>={
    initialData: T;
    onSubmit: (formData:Omit<T,"id">) => void;
}

//Componente para crear formularios genericos dependiendo de la informacion recibida.
//OBJETIVO: Actualizar registros Director y Movies existentes.
//Para el desarrollo de este componente me apoye en IA
function UpdateForm<T extends Record<string,any>>({initialData, onSubmit}:UpdateFormProps<T>){
    //Estado que almacena los valores actuales del formulario.
    //Inicializa los valores basándose en la estructura de initialData:
    const [formValues, setFormValues] = useState<Record<string, any>>(() => {
        const values: Record<string, any> = {};
        Object.keys(initialData).forEach(key => {
            if (key !== "id") {
               values[key] = initialData[key];
            }
        });
        return values;
    });

     //Determina el tipo de input basado en el tipo de dato y nombre.
    const getInputType = (value: any): "text" | "number" => {
        if (typeof value === "number") return "number";
        return "text";
    };

    //Maneja los cambios en los inputs del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value} = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: type === "number" || name === "director" ? Number(value) : value
        }));
    };
    
     //Manejo del envio del formulario
    const handleSubmit = () => {
        onSubmit(formValues as T);
    };

    return (
        //Formulario
        <form className={styles.form} onSubmit={handleSubmit}>
            {Object.keys(initialData)
                .filter(key => key != "id" && key != "director" && typeof initialData[key] !== "boolean")
                .map((key) => (
                    <Input  //Cada 'key' es un nuevo input
                        key={key}
                        name={key}
                        text={key}
                        type={getInputType(initialData[key])}
                        value={formValues[key]}
                        onChange={handleChange}
                    />
                ))}
            <button className={styles.submitButton} type="submit">Submit</button>
        </form>

    );
}


export default UpdateForm;