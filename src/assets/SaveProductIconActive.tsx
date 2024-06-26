import React from "react"
 
export const SaveProductIconActive = (
    {
        width = "21",
        height = "18",
        fill = "#E64926",
        fillInner = "#E64926"

    }

) => {
    return (
        
        <svg width={width} height={height} viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                d="M2.31802 2.31802C4.07538 0.56066 6.92462 0.56066 8.68198 2.31802L10.5 4.13604L12.318 2.31802C14.0754 0.56066 16.9246 0.56066 18.682 2.31802C20.4393 4.07538 20.4393 6.92462 18.682 8.68198L10.5 16.864L2.31802 8.68198C0.56066 6.92462 0.56066 4.07538 2.31802 2.31802Z"
                fill={fillInner} stroke={fill} strokeLinecap="round" />
        </svg>
    )
}




