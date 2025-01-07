import Image from "next/image"
import { InstallPWAButton } from "./InstallButton"

export const WhitePage = () => {
    return(
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position:"relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Image src="/bg.png" width={100} height={100} alt="bg" style={{ objectFit: "cover", filter: "brightness(60%)", position: "absolute", left: "0", top: "0", height: "100%", width: "100%"}}/>
            <div style={{zIndex: "100", position: "relative", backgroundColor: "#00000080", borderRadius: "50px", padding: "40px", paddingTop: "100px", maxWidth: "600px", textAlign: "center"}}>
                <div style={{position: "absolute", top: "0", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <div style={{borderRadius: "50%", overflow: "hidden", position: "relative", width: "200px", height: "200px"}}>
                        <Image style={{ objectFit: "cover", filter: "brightness(50%)", position: "absolute", left: "0", top: "0", height: "100%", width: "100%"}} src="/avatar.png" alt="avatar" width={100} height={100}/>
                    </div>
                </div>
                <h1 style={{fontSize: "50px"}}>Орынбасар Диас</h1>
                <p>Не упустите свой шанс изменить свою жизнь! Уже более 1000 человек заработали деньги только за то, что написали мне. Вы могли бы быть следующим! Перейдите по ссылке и начните выигрывать прямо сейчас!</p>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center" , gap: "10px"}}>
                    <button style={{padding: "20px 30px", backgroundColor: "#007bff", borderRadius: "50px", marginBottom: "10px", marginTop: "10px"}}>
                        <a href="https://t.me/diasorynbasarbot?start=link_4RBFNsLtbo">Написать мне</a>
                    </button>
                    <InstallPWAButton/>
                </div>
            </div>
        </div>
    )
}