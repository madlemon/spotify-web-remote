function componentToHex(c) {
    let hex = Math.floor(c).toString(16)
    return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function generateGradientStopStyleFromRGB(r, g, b) {
    if (!r || !b || !g) {
        return;
    }
    let hexColor = rgbToHex(r, g, b)
    return {
        "--tw-gradient-from": hexColor,
        "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to, rgb(${r} ${g} ${b} / 0))`,
    };
}

export {rgbToHex, generateGradientStopStyleFromRGB}
