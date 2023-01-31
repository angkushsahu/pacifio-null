const reactStarsOptions = (value = 3.5, edit = false, size = 20) => {
    return {
        edit,
        activeColor: "#FFB300",
        color: "#808080",
        value,
        isHalf: true,
        size,
    };
};

export default reactStarsOptions;
