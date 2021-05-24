export const FirstLetterMaji = (str) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

export const TheRightSize = (str) => {
    if(str.length > 20) return str.slice(0, 25) + "..."
    else return str
}
