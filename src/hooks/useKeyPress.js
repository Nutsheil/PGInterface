import {useEffect, useState} from "react";

export const useKeyPress = (key) => {
    const [isKeyPressed, setIsKeyPressed] = useState(false)

    const downHandler = (keyPressed) => {
        if (keyPressed.key === key)
            setIsKeyPressed(true)
    }

    const upHandler = (keyPressed) => {
        if (keyPressed.key === key)
            setIsKeyPressed(false)
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)

        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [])

    return isKeyPressed
}