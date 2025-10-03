import { useState } from "react";
import Input from "./Input";
import type { Director } from "../types";
import styles from "../styles/UpdateForm.module.css"

type UpdateFormProps={
    director? : Director;
    onSubmit:(formData: {
        name:string;
        nationality:string;
        age : number;
        active:boolean;
    })=> void;
};

function DirectorForm({director, onSubmit} : UpdateFormProps){
    const [formValues, setFormValues] = useState({
        name: director?.name ?? "",
        nationality: director?.nationality  ?? "",
        age: director?.age.toString() ?? "",
        active: director?.active ?? false,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked} = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    
    const handleSubmit = async () => {
        onSubmit({
            name: formValues.name,
            nationality: formValues.nationality,
            age: Number(formValues.age),
            active: formValues.active,
        });
    };

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input 
                name="name" 
                text="Name" 
                type="string" 
                value={formValues.name} 
                onChange={handleChange}
                />

            <Input 
                name="nationality" 
                text="Nationality" 
                type="string" 
                value={formValues.nationality} 
                onChange={handleChange}
                />
            
            <Input 
                name="age" 
                text="Age" 
                type="number" 
                value={formValues.age} 
                onChange={handleChange}
                />
            
            <Input 
                name="active" 
                text="Active" 
                type="checkbox" 
                onChange={handleChange}
            />
            <p className={styles.note}>*If you check the box, it will be active.</p>
            <button className={styles.submitButton} type='submit'>Update</button>
        </form>
    );
}

export default DirectorForm;