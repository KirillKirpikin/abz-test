import styles from './haeder.module.scss'
import ILogo from '../../assets/Logo.svg'

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={ILogo} alt="logo" />
            </div>
            <div className={styles.btns}>
                <button className='btn_standart'>Users</button>
                <button className='btn_standart'>Sign up</button>
            </div>
        </div>
    </header>
  )
}

export default Header