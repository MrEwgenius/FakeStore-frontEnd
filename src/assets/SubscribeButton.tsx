import React from "react"

export const SubscribeButton = (
    {
        fill = '#E64926'
    }

) => {
    return (

        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 9H13.5M13.5 9L11 6M13.5 9L11 12" stroke={fill} />
            <rect x="0.5" y="0.5" width="17" height="17" stroke={fill} />
        </svg>
    )
}

