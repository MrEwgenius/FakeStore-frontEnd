import React from "react"

export const HiddenIcon = (
    { fill = "#B7C1C5" }
) => {
    return (
        <svg width="21" height="21" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_83_189)">
                <path
                    d="M7 1.74976C10.2345 1.74976 12.9787 3.94319 14 6.99977C12.9787 10.0564 10.2345 12.2498 7 12.2498C3.76549 12.2498 1.02128 10.0563 -1.90735e-06 6.99977C1.02128 3.94319 3.76549 1.74976 7 1.74976ZM7 10.4998C8.93301 10.4998 10.5 8.93275 10.5 6.99977C10.5 5.06676 8.93301 3.49977 7 3.49977C5.06699 3.49977 3.5 5.06676 3.5 6.99977C3.5 8.93273 5.06699 10.4998 7 10.4998Z"
                    fill={fill} />
                <path
                    d="M5.76257 5.76256C5.07916 6.44597 5.07916 7.55401 5.76257 8.23743C6.44599 8.92084 7.55403 8.92084 8.23744 8.23743C8.92085 7.55401 8.92085 6.44597 8.23744 5.76256C7.55403 5.07915 6.44599 5.07915 5.76257 5.76256Z"
                    fill={fill} />
            </g>
            <defs>
                <clipPath id="clip0_83_189">
                    <rect width="14" height="14" fill="white" transform="matrix(-1 0 0 1 14 0)" />
                </clipPath>
            </defs>
        </svg>
    )
}


