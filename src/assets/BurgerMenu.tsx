import React from "react"

export const BurgerMenu = (
    {
        width = '20px',
        height = '9px',
        stroke = '#0F303F'
    }

) => {
    return (

        <svg width={width} height={height} viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1C1.45455 1 13.9394 1 20 1" stroke={stroke} />
            <path d="M10 8C10.7273 8 16.9697 8 20 8" stroke={stroke} />
        </svg>

    )
}

