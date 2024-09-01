
const RightArrowIcon = ({ width = "18", height = "41", stroke = "white" }) => {
    return (
        <svg
        width={width}
        height={height}
            viewBox="0 0 18 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M1 1L17 20.5L1 40" stroke={stroke} />
        </svg>
    );
};

export default RightArrowIcon;
