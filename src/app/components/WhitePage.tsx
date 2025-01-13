import Image from "next/image"
import { InstallPWAButton } from "./InstallButton"

export const WhitePage = () => {
    return(
        <>
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position:"relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{background: "url(/bg.png) center center/cover no-repeat", filter: "brightness(30%)", position: "fixed", left: "0", top: "0", height: "100%", width: "100%"}}></div>
            <div style={{zIndex: "100", position: "relative", backgroundColor: "#00000080", borderRadius: "50px", padding: "40px", paddingTop: "100px", maxWidth: "600px", textAlign: "center", marginTop: "40px"}}>
                <div style={{position: "absolute", top: "0", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <div style={{background: "url(/avatar.png) center center/cover no-repeat", filter: "brightness(50%)", borderRadius: "50%", overflow: "hidden", position: "relative", width: "200px", height: "200px"}}>
                    </div>
                </div>
                <h1 style={{fontSize: "50px"}}>Орынбасар Диас</h1>
                <p>Не упустите свой шанс изменить свою жизнь! Уже более 1000 человек заработали деньги только за то, что написали мне. Вы могли бы быть следующим! Перейдите по ссылке и начните выигрывать прямо сейчас!</p>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center" , gap: "10px", marginTop: "20px"}}>
                    <InstallPWAButton/>
                </div>
            </div>
        </div>
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position:"relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{zIndex: "100", position: "relative", backgroundColor: "#00000080", borderRadius: "50px", padding: "40px", paddingTop: "100px", maxWidth: "600px", textAlign: "center", marginTop: "40px"}}>
                <h1 style={{fontSize: "50px"}}>Регистрация</h1>
                <div style={{display: "grid", justifyContent: "center", alignItems: "start" , gap: "20px", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "1fr"}}>
                <p style={{gridArea: "1 / 1 / 2 / 2"}}>Регистрация по номеру телефона. 
                    Напишите номер телефона, дальше введите код и придумайте пароль.
                </p>
                <p style={{gridArea: "1 / 2 / 2 / 3"}}>Регистрация по email.
                    Напишите email, придумайте пароль 
                </p>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center" , gap: "10px", marginTop: "20px"}}>
                    <Image src="/reg_phone.jpg" width={200} height={100} alt="reg"/>
                    <Image src="/reg_email.jpg" width={200} height={100} alt="reg"/>
                </div>
            </div>
        </div>
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position:"relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{zIndex: "100", position: "relative", backgroundColor: "#00000080", borderRadius: "50px", padding: "40px", paddingTop: "100px", maxWidth: "600px", textAlign: "center", marginTop: "40px"}}>
                <h1 style={{fontSize: "50px"}}>Пополнение</h1>
                <div style={{display: "grid", justifyContent: "center", alignItems: "start" , gap: "20px", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "1fr"}}>
                <p style={{gridArea: "1 / 1 / 2 / 2"}}>Пополнение через карту. 
                    Пополните на любую сумму через банковскую карту.
                </p>
                <p style={{gridArea: "1 / 2 / 2 / 3"}}>Регистрация через beeline.
                    Пополните на любую сумму через beeline
                </p>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center" , gap: "10px", marginTop: "20px"}}>
                    <Image src="/dep_bank.jpg" width={200} height={100} alt="reg"/>
                    <Image src="/dep_beeline.jpg" width={200} height={100} alt="reg"/>
                </div>
            </div>
        </div>
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position:"relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{zIndex: "100", position: "relative", backgroundColor: "#00000080", borderRadius: "50px", padding: "40px", paddingTop: "100px", maxWidth: "600px", textAlign: "center", marginTop: "40px"}}>
                <h1 style={{fontSize: "50px"}}>Как играть</h1>
                <div style={{display: "grid", justifyContent: "center", alignItems: "start" , gap: "20px", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "1fr"}}>
                <p style={{gridArea: "1 / 1 / 2 / 2"}}>Уведомления от приложения. 
                    Вам будут поступать сигналы из нашего приложения.
                </p>
                <p style={{gridArea: "1 / 2 / 2 / 3"}}>Зайдите на сайт.
                    Зайдите на сайт и играйте в игру авиатор по нашим сигналам 
                     <a style={{marginLeft: "5px", color: "red"}} href="https://pokerdomwins.com">pokerdomwins</a>
                </p>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center" , gap: "10px", marginTop: "20px"}}>
                    <Image src="/notification.jpg" width={200} height={100} alt="reg"/>
                    <Image src="/aviator.jpg" width={200} height={100} alt="reg"/>
                </div>
            </div>
        </div>
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position:"relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{background: "url(/bg.png) center center/cover no-repeat", filter: "brightness(30%)", position: "fixed", left: "0", top: "0", height: "100%", width: "100%"}}></div>
            <div style={{zIndex: "100", position: "relative", backgroundColor: "#00000080", borderRadius: "50px", padding: "40px", paddingTop: "100px", maxWidth: "600px", textAlign: "center", marginTop: "40px"}}>
                <div style={{position: "absolute", top: "0", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <div style={{background: "url(/avatar.png) center center/cover no-repeat", filter: "brightness(50%)", borderRadius: "50%", overflow: "hidden", position: "relative", width: "200px", height: "200px"}}>
                    </div>
                </div>
                <h1 style={{fontSize: "50px"}}>Обратная связь</h1>
                <p>Пишите в любое время всегда рад помочь</p>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center" , gap: "10px", marginTop: "20px"}}>
                <button style={{padding: "20px 30px", backgroundColor: "#007bff", borderRadius: "50px", marginBottom: "10px", marginTop: "10px"}}>
                        <a href="https://t.me/diasorynbasarbot?start=link_4RBFNsLtbo">Написать мне</a>
                    </button>
                    <InstallPWAButton/>
                </div>
            </div>
        </div>
        </>
    )
}