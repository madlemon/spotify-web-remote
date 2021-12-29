import {useEffect, useState} from "react";
import Vibrant from "node-vibrant/lib/bundle";

function useDominantColor(imageSource) {
    const [dominantColor, setDominantColor] = useState([0, 0, 0]);

    function sortByPopulation(colorArray) {
        return colorArray.sort(
            function (a, b) {
                return a._population - b._population;
            })
    }

    useEffect(() => {
        if (!imageSource || !dominantColor) return
        Vibrant.from(imageSource)
            .getPalette((err, palette) => {
                let colors = [
                    palette.DarkMuted,
                    palette.DarkVibrant,
                    palette.LightMuted,
                    palette.LightVibrant,
                    palette.Muted,
                    palette.Vibrant,]
                let mostPopulatedColor = sortByPopulation(colors).pop()
                setDominantColor(mostPopulatedColor._rgb)
            }).catch((err) => {
            console.log('Something went wrong!', err)
        })

    }, [imageSource]);

    return dominantColor;
}


export default useDominantColor
