import React, { useState } from "react"
import "./styles.css";
import { Button } from "@material-ui/core";
import { auth } from "../../firebase.js";
import { useDispatch } from 'react-redux'
import { login } from '../../features/useSlice'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);



export const Login = () => {
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault();


        if (email.trim().length === 0 || password.trim().length === 0) {
            MySwal.fire({
                title: 'Atención',
                text: 'Debe completar los campos solicitados',
                icon: 'warning',
            })
            return;
        } else {
            if (!validateEmail(email.trim())) {
                MySwal.fire({
                    title: 'Atención',
                    text: 'El email ingresado es inválido',
                    icon: 'warning',
                })
                return;
            } else if (password.trim().length < 6) {
                MySwal.fire({
                    title: 'Atención',
                    text: 'Debe ingresar una contraseña mayor a 6 caracteres',
                    icon: 'warning',
                })
                return;
            } else {
                MySwal.fire({
                    title: 'Iniciando sesión',
                    showConfirmButton: false,
                    allowOutsideClick: false
                })
                MySwal.showLoading();
                auth.signInWithEmailAndPassword(email, password)
                    .then((userAuth) => {
                        MySwal.close();
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            name: userAuth.user.displayName,
                            photoURL: userAuth.user.photoURL

                        }))
                        setName('')
                        setEmail('')
                        setPassword('')

                    }).catch(error => {
                        MySwal.fire({
                            title: 'Opps',
                            text: 'Usuario o contraseña incorrecto',
                            icon: 'error'
                        });
                    })
            }
        }

    };

    const handleRegister = e => {
        e.preventDefault();

        if (email.trim().length === 0 || password.trim().length === 0 || name.trim().length === 0) {
            MySwal.fire({
                title: 'Atención',
                text: 'Debe completar los campos solicitados',
                icon: 'warning',
            })
            return;
        } else {
            if (!validateEmail(email.trim())) {
                MySwal.fire({
                    title: 'Atención',
                    text: 'El email ingresado es inválido',
                    icon: 'warning',
                })
                return;
            } else if (password.trim().length < 6) {
                MySwal.fire({
                    title: 'Atención',
                    text: 'Debe ingresar una contraseña mayor a 6 caracteres',
                    icon: 'warning',
                })
                return;
            } else {

                MySwal.fire({
                    title: 'Creando usuario',
                    showConfirmButton: false,
                    allowOutsideClick: false
                })
                MySwal.showLoading();
                auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
                    userAuth.user.updateProfile({
                        displayName: name,
                        photoURL: ''
                    }).then((response) => {
                        MySwal.close();
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            name: userAuth.user.displayName,
                            photoURL: userAuth.user.photoURL
                        }))
                        setName('')
                        setEmail('')
                        setPassword('')

                    }).catch((errorRes) => {
                        MySwal.fire({
                            title: 'Opps',
                            text: 'Verifique los datos ingresados y vuelva a intentarlo',
                            icon: 'error'
                        });
                    })
                }).catch(error => {
                    MySwal.fire({
                        title: 'Opps',
                        text: 'Verifique los datos ingresados y vuelva a intentarlo',
                        icon: 'error'
                    });
                })
            }
        }



    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    return (

        <>

            {register ? (

                <div className="login register">
                    <div className="login__container">
                        <div className="login__logo
                        register">


                        </div>

                        <h2 className="login__sesion register">Saca el mejor partido a tu vida deportiva</h2>

                        <div className="login__form register">


                            <form onSubmit={handleRegister}>

                                <div className="div__Input register">

                                    <input
                                        type="text"
                                        placeholder="Usuario"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}


                                    />
                                </div>

                                <div className="div__Input register">

                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}


                                    />
                                </div>
                                <div className="div__Input register">
                                    <input
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}


                                    />
                                </div>

                                <p>Al hacer click en Aceptar "Aceptar y unirse",acepta las  <span>aceptas las condiciones de uso,</span> y la <span>Politica de cookies</span>Skydrow </p>
                                <br />
                                <Button
                                    varitant="contained"
                                    color="primary"
                                    disableElevation
                                    type="submit"
                                >
                                    Aceptar y Unirse
            </Button>

                            </form>
                        </div>

                        <p className="login__footer">

                            ¿Ya eres usuario de Skydrow?{" "}
                            <span onClick={() => setRegister(false)}>Iniciar Sesion</span>
                        </p>
                    </div>
                </div>

            ) : (


                <div className="login">
                    <div className="login__container">
                        <div className="login__logo">
                            <img className="logo_style" src="https://firebasestorage.googleapis.com/v0/b/linkedin-947f8.appspot.com/o/logos%2Flogo.png?alt=media&token=d4074b21-f961-4e26-9ac1-2c86bd84098e"/>

                        </div>
                        <div className="login__form">
                            <h2 className="login__sesion regiter">Iniciar sesion </h2>
                            <p>Mantente al dia en el mundo del deporte </p>
                            <form onSubmit={handleSubmit}>

                                <div className="div__Input">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}


                                    />
                                </div>
                                <div className="div__Input">
                                    <input
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}


                                    />
                                </div>

                                <p>¿Has olvidado tu contraseña?</p>
                                <br />
                                <Button
                                    varitant="contained"
                                    color="primary"
                                    disableElevation
                                    type="submit"
                                >
                                    Iniciar Sesion
                                </Button>

                            </form>
                        </div>

                        <p className="login__footer">

                            ¿Eres nuevo en Skydrow?{" "}
                            <span onClick={() => setRegister(true)}>Unete ahora</span>
                        </p>
                    </div>
                </div>

            )}


        </>


    );
};
