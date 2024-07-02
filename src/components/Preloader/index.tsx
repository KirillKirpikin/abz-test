import Spiner from "@components/Spiner"
import styles from './preloader.module.scss'

const Preloader = () => {
    return (
      <div className={styles.send}> 
        <div>
            <Spiner w="100" h="100"/>
        </div>
      </div>
    )
  }
  
  export default Preloader