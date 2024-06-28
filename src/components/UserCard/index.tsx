import React from 'react';
import PhotoPlacholder from '../../assets/photo-cover.svg';
import { IUser } from '../../types/user.type';

import Tooltip from '../Tooltip';
import styles from './user-card.module.scss';

const UserCard = ({user}: {user: IUser}) => {
    // const emailText = useMemo(()=>truncateText(user.email, 30),[user.email])
    // const namelText = useMemo(()=>truncateText(user.name, 30),[user.name])
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = PhotoPlacholder; 
      };
    
  return (
    <div className={styles.card}>
        <div className={styles.img}>
            <img src={user.photo } alt={user.name} onError={handleImageError}/>

        </div>
        <div className='mb-[20px]'>
            <Tooltip text={user.name} maxLength={30}/>
        </div>
        <div className={styles.content}>            
            <p>{user.position}</p>
            <Tooltip text={user.email} maxLength={30}/>
            <p>{user.phone}</p>
        </div>
        
    </div>
  )
}

export default UserCard