import React, { Dispatch, SetStateAction } from 'react'

interface IProps {
    popup: boolean,
    setPopup: Dispatch<SetStateAction<boolean>>
}

const Purchase: React.FC<IProps> = (props) => {
    const popupClose = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.classList.contains('overlay')) {
            props.setPopup(false)
        } else {
            props.setPopup(true)
        }
    }
    return (
        <div onClick={(e: React.MouseEvent<HTMLElement>) => popupClose(e)} className={`overlay ${props.popup && "overlay_active"}`}>
            <div className="popup">
                <form action="" className="popup__form">
                    <div className="popup__form-top">
                        <h2 className="popup__form__title_active" style={{ color: 'white' }}>Купить</h2>
                    </div>
                    <input type="number" className="popup__input" placeholder='Номер карты' />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className="popup__btn" type="submit">Продолжить</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Purchase