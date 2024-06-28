import styles from './tooltip.module.scss'


const Tooltip = ({text, maxLength}: {text:string, maxLength: number}) => {
    if(text.length > maxLength){
        return (
            <div className={styles.tool}>
                <span >{text}</span>
                {text.substring(0, maxLength) + '. . .'}              
            </div>
        )
            
    }
    return text
}

export default Tooltip