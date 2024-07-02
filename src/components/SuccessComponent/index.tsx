
import ImgSuccess from '../../assets/success-image.svg'
import styles from './success.module.scss'

const SuccessComponent = () => {

    return (
        <section className={styles.container}>
            <h2 className='title'>User successfully registered</h2>
            <div className={styles.img}>
                <img src={ImgSuccess} alt="success img"/>      
            </div>        
        </section>
    )
            
    

}

export default SuccessComponent