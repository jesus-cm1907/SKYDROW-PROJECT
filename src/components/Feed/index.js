
import React, { useRef, useState } from "react";
import './styles.css'
import CreateIcon from '@material-ui/icons/Create';
import PhotoIcon from '@material-ui/icons/Photo';
import YouTubeIcon from '@material-ui/icons/YouTube';
import EventIcon from '@material-ui/icons/Event';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import { InputIcon } from "./InputIcon";
import { Post } from "./Post";
import { db, auth } from "../../firebase"
import firebase from 'firebase'
import { storage } from '../../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/useSlice'



import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const Feed = ({ posteos }) => {

  const [input, setInput] = useState('')
  const [imgPost, setImgPost] = useState('')
  const [photoFile, setPhoto] = useState(null);
  const inputFile = useRef(null)

  //var photoFile;

  const user = useSelector(selectUser)

  const sendPost = e => {

    e.preventDefault()

    if (input.trim().length !== 0) {
      MySwal.fire({
        title: 'Publicando post',
        allowOutsideClick: false,
        showConfirmButton: false
      })
      MySwal.showLoading();
      //console.log(photoFile);
      if (photoFile !== null) {
        const storageRef = storage.ref(`/post/${photoFile.name}`).put(photoFile);
        storageRef.on(
          "state_changed",
          snapshot => { },
          error => {

            console.log(error)
          }, () => {
            storage
              .ref('post')
              .child(photoFile.name)
              .getDownloadURL()
              .then(url => {
                console.log(url);
                setImgPost(url)
                realizandoPosteo(url);
              })
          }
        )
      } else {
        realizandoPosteo();
      }

    } else {
      MySwal.fire({
        title: 'Atención!',
        text: 'Es necesario adjuntar un comentario al post!',
        icon: 'info',
      })
    }

  }

  function realizandoPosteo(url = '') {
    db.collection("posteos").add({
      uid: auth.currentUser.uid,
      userName: auth.currentUser.email.split('@')[0],
      email: auth.currentUser.email,
      text: input.trim(),
      createdAt: firebase.firestore.Timestamp.now(),
      photoURL: user.photoURL || "",
      images: url,
    }).then((docRef) => {
      MySwal.fire({
        title: 'Post realizado',
        icon: 'success',
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 2000,
        didClose: () => {
          setInput('')
          setPhoto(null)
          setImgPost('')
        }
      })
    }).catch((error) => {
      MySwal.fire({
        title: 'Atención!',
        text: 'Ocurrió un error, vuelva a intentarlo',
        icon: 'error',
      })
    });
  }

  const hanleFoto = e => {
    // photoFile = e.target.files[0]
    setPhoto(e.target.files[0]);

    /*  */
  }

  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <div className="feed">
      <div className="feed__containerInput">
        <div className="feed__input">
          <CreateIcon className="feed__input_icon" />
          <form>
            <input
              type="text"
              placeholder="Crear publicacion"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button onClick={sendPost} >Enviar</button>

          </form>
        </div>
        <div className="feed__inputIcon">
          {/*Icons */}

          <input accept="image/*" type="file" id="file" ref={inputFile} onChange={hanleFoto} style={{ display: 'none' }} />
          <div onClick={onButtonClick}>

            <InputIcon
              Icon={PhotoIcon}
              title='Foto'
              color='#70b5f9'
            />
          </div>
          <InputIcon
            Icon={YouTubeIcon}
            title='Video'
            color='#7fc15e'
          />
          <InputIcon
            Icon={EventIcon}
            title='Evento'
            color='#e7a33e'
          />
          <InputIcon
            Icon={VerticalSplitIcon}
            title='Escribir articulo'
            color='#f5987e'
          />
        </div>
      </div>
      {

        posteos.map(post => <Post
          name={post.userName}
          description={post.email}
          mensaje={post.text}
          photoURL={post.photoURL}
          images={post.images}
          time={post.createdAt}
        />)
      }


    </div>
  );
};
