import React from 'react'
import { HeaderIcons } from './HeaderIcons'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SearchIcon from '@material-ui/icons/Search';
import {auth} from '../../firebase'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppsIcon from '@material-ui/icons/Apps';
import './styles.css'

export const Header = () => {

const salir = () =>{
    auth.signOut()
}



    return (
        <header className="header">
        <nav className="nav">
        <img className="logo_style" src="https://firebasestorage.googleapis.com/v0/b/linkedin-947f8.appspot.com/o/logos%2Flogo.png?alt=media&token=d4074b21-f961-4e26-9ac1-2c86bd84098e"/>
        <div className="header__buscar">
        <input type="text" placeholder="buscar"/>
        <SearchIcon/>


        </div>
        

        
        <HeaderIcons Icon={HomeIcon} title="Home"/>
        <HeaderIcons Icon={SupervisorAccountIcon} title="mi red"/>
        <HeaderIcons Icon={ChatIcon} title="Mensajes"/>
        <HeaderIcons Icon={NotificationsIcon} title="Notificaciones"/>
        <HeaderIcons avatar title="yo" salir={salir}/>
        <HeaderIcons text="Prueba Premium gratis durante un mes"/>





        </nav>

        </header>
    )
}
