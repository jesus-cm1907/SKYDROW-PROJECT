import './App.css';
import React, { useEffect, useState } from "react";
import { Feed } from './components/Feed';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Widgets } from './components/Widgets';
import { Login } from './components/Login';
import { selectUser, login, logout } from './features/useSlice'
import { useSelector, useDispatch } from 'react-redux'
import { auth, db } from './firebase'

function App() {



  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [items, setItems] = useState([]);


  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {

        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          name: userAuth.displayName,
          photoURL: userAuth.photoURL
        }))
      } else {
        dispatch(logout())
      }

    })

    db.collection("posteos")
      .orderBy('createdAt', "desc")
      .onSnapshot((querySnapshot) => {
        var post = [];
        querySnapshot.forEach((doc) => {
          post.push(doc.data());
        });
        setItems([...post])
      });

  }, [])

  const salir = () => {
    auth.signOut()
  }





  return (
    <div className="App">




      {user ? (

        <>
          <Header />
          <div className="wrapper">

            <Sidebar />

            <Feed posteos={items} />

            <Widgets />

          </div>
        </>
      ) : (
        <Login />

      )}

    </div>
  );
};

export default App;
