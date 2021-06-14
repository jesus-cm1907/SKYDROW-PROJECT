import React from 'react'
import './styles.css'
import { Avatar} from "@material-ui/core"
import {selectUser} from '../../features/useSlice'
import{useSelector} from 'react-redux'
export const HeaderIcons = ({Icon, title, text,avatar, salir}) => {
   const user= useSelector(selectUser)
  
   
   
   
   
   
   
    return (
        <div className="header__icons" onClick={salir}>
            
            {Icon && <Icon className="header__box" />}
            {avatar && (user ? <Avatar src={user.photoURL} 
            className="header__box"> {user.email[0]} </Avatar> : <Avatar
            className="header__box" />)}
            {title ? <h3>{title}</h3> : <h3 className="header__premium">{text}</h3>}
        </div>
    )
}
