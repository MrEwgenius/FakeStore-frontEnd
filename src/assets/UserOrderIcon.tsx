import React from "react"

export const UserOrderIcon = ({
    width = '18',
    hight = '14',
    fill = "#0F303F"

}) => {
    return (
        <svg width={width} height={hight} viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="17" height="12.8125" stroke={fill} />
            <path
                d="M14.625 1.78814e-07C14.625 1.69076 14.0324 3.31226 12.9775 4.50781C11.9226 5.70335 10.4918 6.375 9 6.375C7.50816 6.375 6.07742 5.70335 5.02252 4.50781C3.96763 3.31226 3.375 1.69076 3.375 1.28421e-06"
                stroke={fill} />
        </svg>
    )
}




