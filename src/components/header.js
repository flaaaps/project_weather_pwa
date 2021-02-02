import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Header({ passCurrentLanguage, canToggleLang }) {
    const [currentLanguage, setCurrentLanguage] = useState(navigator.language.split("-")[1].toLocaleLowerCase())
    const [transitioningIcon, setTransitioningIcon] = useState(false)

    const iconTransitionDuration = 200

    useEffect(() => {
        passCurrentLanguage(currentLanguage)
        // eslint-disable-next-line
    }, [currentLanguage])

    const setLanguage = () => {
        if (canToggleLang) {
            setTransitioningIcon(true)
            setTimeout(() => {
                setCurrentLanguage(currentLanguage === "us" ? "de" : "us")
                setTransitioningIcon(false)
            }, iconTransitionDuration)
        }
    }

    return (
        <header>
            <motion.img animate={{ translateY: transitioningIcon ? "-50px" : "0px" }} initial={{ translateY: "0px" }}
                        transition={{ duration: iconTransitionDuration / 1000, type: "just", bounce: .15 }}
                        className="lang-flag" alt={currentLanguage}
                        src={`https://www.countryflags.io/${currentLanguage}/shiny/48.png`}
                        onClick={() => setLanguage()}/>
        </header>
    )
}

export default Header