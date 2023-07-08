import React, { useState, Dispatch, SetStateAction } from 'react'

interface PropsI {
    popup: boolean,
    setPopup: Dispatch<SetStateAction<boolean>>
}

const Popup: React.FC<PropsI> = (props) => {
    const popupClose = (e: any) => {
        if (e.target.classList.contains('overlay')) {
            props.setPopup(false)
        } else {
            props.setPopup(true)
        }
    }
    const [status, setStatus] = useState<string>("signIn");
    return (
        <div onClick={(e: any) => popupClose(e)} className={`overlay ${props.popup && "overlay_active"}`}>
            <div className="popup">
                <form noValidate action="" className="popup__form">
                    <div className="popup__form-top">
                        <h2 onClick={() => setStatus("signIn")} className={`popup__title ${status === "signIn" && "popup__title_active"}`}>
                            Войти
                        </h2>
                        <h2 onClick={() => setStatus("signUp")} className={`popup__title ${status === "signUp" && "popup__title_active"}`}>
                            Регистрация
                        </h2>
                    </div>
                    <input className="popup__input" type="email" placeholder="email" />
                    {
                        status === "signUp" && <input className="popup__input" type="text" placeholder="name" />
                    }
                    <input className="popup__input" type="password" placeholder="password" />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className="popup__btn" type="submit">
                            {
                                status === "signIn" ? <p>Войти</p> : <p>Регистрация</p>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Popup