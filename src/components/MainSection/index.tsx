import styles from './main.module.scss'


const Main = () => {
  return (
    <div className={styles.main}>
        <div className={styles.container}>
            <div className={styles.text}>
                <h1>Test assignment for front-end developer</h1>
                <h2>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</h2>
                <div className={styles.btn}>
                    <button className='btn_standart'>Sign up</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main