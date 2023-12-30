import React, { useState, Dispatch, SetStateAction } from 'react'
import { useAppDispatch } from '../../hook'
import { fetchLoginUser, fetchRegisterUser } from '../../store/slice/userSlice'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IRegister } from '../../Interfaces/Interfaces'

interface IProps {
    popup: boolean,
    setPopup: Dispatch<SetStateAction<boolean>>
}

const Popup: React.FC<IProps> = (props) => {
    const popupClose = (e: any) => {
        if (e.currentTarget.classList.contains('overlay')) {
            props.setPopup(false)
        } else {
            props.setPopup(true)
        }
    }
    const [status, setStatus] = useState<string>("signIn");

    const {
        register, handleSubmit, reset, formState: {
            errors
        }
    } = useForm<IRegister>()

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<IRegister> = (data) => {
        const user = {
            ...data,
            photo: '',
            products: [],
            balance: 0
        }
        if (status === 'signIn') {
            dispatch(fetchLoginUser(user))
        } else {
            dispatch(fetchRegisterUser(user))
        }
        reset()
        props.setPopup(false)
    }

    return (
        <div onClick={(e: any) => popupClose(e)} className={`overlay ${props.popup && "overlay_active"}`}>
            <div className="popup">
                <form onSubmit={handleSubmit(onSubmit)} noValidate action="" className="popup__form">
                    <div className="popup__form-top">
                        <h2 onClick={() => setStatus("signIn")} className={`popup__title ${status === "signIn" && "popup__title_active"}`}>
                            Войти
                        </h2>
                        <h2 onClick={() => setStatus("signUp")} className={`popup__title ${status === "signUp" && "popup__title_active"}`}>
                            Регистрация
                        </h2>
                    </div>
                    <input {...register('email', {
                        required: {
                            message: "Почта не может быть пустой!",
                            value: true,
                        },
                        minLength: {
                            message: "Минимальная длина почты 10!",
                            value: 10,
                        },
                        pattern: {
                            message: "Проверьте почту!",
                            value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/,
                        },
                    })} className="popup__input" type="email" placeholder="email" />
                    {
                        status === "signUp" && <input {...register('name')} className="popup__input" type="text" placeholder="name" />
                    }
                    <input {...register('password', {
                        required: {
                            message: "Пароль не может быть пустым!",
                            value: true,
                        },
                        minLength: {
                            message: "Минимальная длина пароля 5!",
                            value: 5,
                        },
                    })} className="popup__input" type="password" placeholder="password" />
                    <p className="errors-error">
                        {errors.email ? errors.email.message : errors.password?.message}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
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