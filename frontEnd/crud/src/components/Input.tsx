import styles from "../styles/Input.module.css"

//Propiedades del componente
type InputProps={
    text : string;
    type : string;
    name : string;
    value? : string;
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

//Componente para inputs de formularios con label e input
function Input({text, type, name, value, onChange}:InputProps){
    return(
        <div className={styles.inputContainer}>
            <label className={styles.label}>{text}</label>
            <input name={name} type={type} value={value} onChange={onChange}></input>
        </div>
    )
}

export default Input;