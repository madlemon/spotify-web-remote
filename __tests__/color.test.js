import {generateGradientStopStyleFromRGB, rgbToHex} from "../lib/color";

describe('test Color Utils', () => {

    it('converts RGB to hex', () => {
        expect(rgbToHex(0, 0, 0)).toBe('#000000')
        expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
        expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
        expect(rgbToHex(0, 255, 0)).toBe('#00ff00')
        expect(rgbToHex(0, 4, 255)).toBe('#0004ff')
        expect(rgbToHex(252, 186, 3)).toBe('#fcba03')
    })

    it('generates Style from RGB', () => {
        expect(generateGradientStopStyleFromRGB(100, 100, 255))
            .toEqual({
                "--tw-gradient-from": '#6464ff',
                "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to, rgb(100 100 255 / 0))`,
            })
    })

})
