import React, { useState, useRef } from "react";
import { Avatar } from "@material-ui/core";
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import AddIcon from '@material-ui/icons/Add';
import './styles.css';
import { selectUser, login } from '../../features/useSlice';
import { useDispatch, useSelector } from "react-redux";
import { auth, storage } from '../../firebase';
import { InputIcon } from "../Feed/InputIcon";
import CloudUploadTwoToneIcon from '@material-ui/icons/CloudUploadTwoTone';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const Sidebar = () => {
    const user = useSelector(selectUser);
    const [imgUrl, setImgUrl] = useState('')
    const dispatch = useDispatch()
    const inputFile = useRef(null)



    const recentItem = (topic) => (


        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>

            <p>{topic}</p>


        </div>
    );

    const actualizarEmail = (url) => {
        auth.currentUser.updateProfile({
            displayName: user.name,
            photoURL: url
        }).then(() => {
            dispatch(login({
                email: user.email,
                uid: user.uid,
                name: user.name,
                photoURL: url

            }))
            MySwal.fire({
                title: 'Foto de perfil actualizada',
                icon: 'success',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 2000
            })
        }).catch((error) => {
            MySwal.fire({
                title: 'Atención!',
                text: 'Ocurrió un error inesperado, vuelva a intentarlo',
                icon: 'error'
            })
        })
    }


    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file !== undefined && file.type.indexOf('image') >= 0) {
            var storageRef = storage.ref();
            var avatarRef = storageRef.child(`avatar/${user.uid}.png`);
            var uploadTask = avatarRef.put(file);
            MySwal.fire({
                title: 'Actualizando foto de perfil',
                showConfirmButton: false,
                allowOutsideClick: false
            })
            MySwal.showLoading();
            uploadTask.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // TODO: si deseas mostrar el porcentaje de subida
                //console.log('Upload is ' + progress + '% done');
            }, function (error) {
                MySwal.fire({
                    title: 'Atención!',
                    text: 'Ocurrió un error inesperado, vuelva a intentarlo',
                    icon: 'error'
                })
            }, function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    actualizarEmail(downloadURL)
                });
            });
        } else {

            MySwal.fire({
                title: 'Atención!',
                text: 'Solo puede subir archivos de imagen'
            })
        }
    };

    const onButtonClick = () => {
        inputFile.current.click();
    };

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="https://th.bing.com/th/id/R06de7de875c2493d389735e33918022d?rik=Hp5bi8ONwemU%2fA&riu=http%3a%2f%2fwww.solofondos.com%2fwp-content%2fuploads%2f2016%2f01%2ffondos-romanticos-9375.jpg&ehk=IQm2jud77pN1LoyM30l8IeQ5TxNeOjkW6%2bJBXErZ%2bVk%3d&risl=&pid=ImgRaw" alt=" " />

                <Avatar src={user.photoURL} className="sidebar__avatar">

                    {user.email[0]}


                </Avatar>

                <input accept="image/*" type='file' id='file' ref={inputFile} onChange={handlePhoto} style={{ display: 'none' }} />

                <div onClick={onButtonClick}>
                    <InputIcon
                        Icon={CloudUploadTwoToneIcon}
                        title='Subir foto'
                        color='#0A66C2'

                    />
                </div>
                <h3>{user.name}</h3>
                <h4>{user.email}</h4>
                <div className="sidebar__contents">
                    <div className="sidebar__cont">
                        <p>Contacto</p>
                        <p>2</p>
                    </div>
                    <div className="sidebar__cont">
                        <p>
                            <a href="#">
                                Acceder a informacion y herramientas <br />
             herramientas exclusivas <br />
                                {""}
                                <b>Prueba Premium Gratuita durante un mes</b>
                            </a>
                        </p>
                    </div>
                    <div className="sidebar__cont">
                        <div className="sidebar__marcadores">
                            <TurnedInIcon className="sidebar__icons" />
                            <p>Marcapaginas</p>
                        </div>

                    </div>

                </div>

            </div>
            <br />
            <br />
            <div className="sidebar__bottom">

                <ul>
                    <li>

                        <p>Grupos </p>
                    </li>
                    <li>

                        <p>Eventos </p>
                    </li>

                    <li>

                        <p>Hastags seguidores </p>
                    </li>

                </ul>
                <AddIcon className="sidebar__box" />
            </div>

            <div className="sidebar__recientes">
                <p>Recientes </p>

                {recentItem("react.js")}
                {recentItem("node.js")}
                {recentItem("firebase.js")}
                {recentItem("grasplq")}
                {recentItem("developer")}
                {recentItem("design")}
            </div>

        </div>
    );
};
