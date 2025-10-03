import styles from "../styles/Title.module.css"

//Propiedades del componente
type TitleProps={
    text : string;
}

//Componente para titulos de las tablas
function Title({text}:TitleProps){
    return(
        <>
            <h1 className={styles.title}>{text}</h1>
        </>
    )
}

export default Title;