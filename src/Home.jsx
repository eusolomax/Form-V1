import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import style from '../src/css/form.module.css'

export default function Home() {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [birth, setBirth] = useState('')

  const [userError, setUserError] = useState('userError')
  const [passwordError, setPasswordError] = useState('passwordError')
  
  const onSubmit = (e) => {
    e.preventDefault()

    setUserError('userError')
    setPasswordError('passwordError')

    //TEST AREA
    if (user.length < 2 || password.length < 5) {
      if (user.length < 2) {
        toast.error("Nome de usuário deve conter 2 digitos ou mais!", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          })

        setUserError('userError_active')
      }

      if (password.length < 5) {
        toast.error("Senha deve conter 5 digitos ou mais!", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          })

        setPasswordError('passwordError_active')
      }

      return
    }

    //COLLECT DATA
    const data = {
      user,
      password,
      birth
    }

    //AXIOS
    console.log(data)
    axios.post("localhost:8080", data)
      .then(e => console.log(e))
      .catch(e => console.error(e))
  }

  return (
    <>
        <div className={style.initBG}>
          <div className={style.background}>
            <div className={style.titleContainer}>
              <h1 className={style.title}>Teste formulário.</h1>
            </div>
          
            <div className={style.formContainer}>
              <form onSubmit={onSubmit}>
                <label className={style[userError]}>Usuario:</label>
                <input
                  id="user"
                  type='text'
                  placeholder='Digite seu usuário...'

                  value={user}
                  onChange={(e) => setUser(e.target.value)}>
                </input>

                <label className={style[passwordError]}>Senha:</label>
                <input
                  id="lastName"
                  type='password'
                  placeholder='Digite sua senha...'

                  value={password}
                  onChange={(e) => setPassword(e.target.value)}>
                </input>
                

                <label>Data de nascimento:</label>
                <input
                  id="birthDate"
                  type='date'
                  className='dateInput'

                  onChange={(e) => setBirth(e.target.value)}>
                </input>

                <div className={style.submitContainer}>
                  <button>Enviar</button>
                </div>
              </form>
            </div>

            <div className={style.boobleContainer}>
              <div className={style.booble} />
            </div>
            <div className={style.boobleContainer2}>
              <div className={style.booble2} />
            </div>
          </div>
          
          <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        </div>
    </>
  )
}