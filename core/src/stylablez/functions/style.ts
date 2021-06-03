import {
    Color,
    Layer,
    LayerStyle,
    Palette,
    PaletteList,
    StylAbleZMap,
    StylablezWork
} from "../model/types";
import {loadLayerSourceImage} from "./layers";

/**
 * Extracts a list of names from the provided palette list
 * @param paletteList the list with palette names that will be extracted
 */
export const getPaletteNames = (paletteList: PaletteList): string[] => {
    const names = paletteList.palettes.map(palette => palette.name);
    return names
}

/**
 * A simple utility method to find the palette with the specified name and return it
 */
export const getPalette = (paletteList: PaletteList, name: string): Palette => {
    const palette =  paletteList.palettes.find(palette => palette.name === name);
    if (!palette) {
        throw new Error(`The palette: ${name} could not be found in the palette list.`)
    }
    return palette
}

export interface VariantHex {
    primary: string;
    secondary: string;
    accent: string
}

export const getHexesForPalette = (palette: Palette): VariantHex => {
    return {
        primary: palette.colors[0].hex,
        secondary: palette.colors[1].hex,
        accent: palette.colors[2].hex,
    }
}

/**
 * For the specified label this will return the hex color value that is configued in
 * the palette
 * @param palette the palette with the lebeled hex colors
 * @param label one of: prim, scnd, or acnt which represent keys in the palette
 */
export const getHexForLabel = (palette: Palette, label: string) => {
    if (label === 'prim') {
        return palette.colors[0].hex;
    } else if (label === 'scnd') {
        return palette.colors[1].hex;
    } else if (label === 'acnt') {
        return palette.colors[2].hex;
    } else {
        return label;
    }
}

export const getLabelForHex = (palette: Palette, hex: string) => {
    if (hex.startsWith('rgb')) {
        // https://stackoverflow.com/a/33511903/223225
        hex = '#' + hex.substr(4, hex.indexOf(')') - 4).split(',').map((color) => parseInt(color).toString(16)).join('');
    }
    var colorIndex = palette.colors.findIndex((color: Color) => color.hex === hex);
    if (colorIndex === 0) {
        return 'prim';
    } else if (colorIndex === 1) {
        return 'scnd';
    } else if (colorIndex === 2) {
        return 'acnt';
    } else {
        return hex;
    }
}

export interface StyleMap {
    [styleName: string]: string | number
}

/**
 * Givent the specified palette and layer this will create styles that can be directely
 * applied to elements that take CSS styls.  The layer specs will be used ot map values out
 * of the palette and create the styles.
 */
export const extractLayerStyles = (palette: Palette, layer: Layer,  width: number, height: number): LayerStyle => {
    const imgDataUrl = layer.imageDataUrl
    const stylizableMap: StylAbleZMap = layer.styleMap

    let layerStyle: LayerStyle = {
        // Add width and height when rendering HTML, based on parent element
        mixBlendMode: stylizableMap.mixBlendMode || 'normal',
        visibility: (stylizableMap.visible === false) ? 'hidden' : 'visible',
        width: width,
        height: height,
        filter: `brightness(100%)`,
        opacity: 1,
    }

    if (stylizableMap.backgroundColor && stylizableMap.backgroundColor !== 'transparent') {
        layerStyle.backgroundColor = getHexForLabel(palette, stylizableMap.backgroundColor);
    }
    if (stylizableMap.brightness) {
        layerStyle.filter = `brightness(${stylizableMap.brightness}%)`;
    }
    if (stylizableMap.opacity) {
        layerStyle.opacity = Number(stylizableMap.opacity) * 0.01;
    }

    if (stylizableMap.mask) {
        layerStyle = {
            ...layerStyle, ...{
                'mask-repeat': 'no-repeat',
                '-webkit-mask-repeat': 'no-repeat',
                '-webkit-mask-size': 'contain',
                'mask-size': 'contain',
            }
        }
        if (imgDataUrl) {
            layerStyle = {
                ...layerStyle, ...{
                    'mask-image': `url('${imgDataUrl}')`,
                    '-webkit-mask-image': `url('${imgDataUrl}')`,
                }
            }
        }
    } else {
        layerStyle = {
            ...layerStyle, ...{
                backgroundBlendMode: stylizableMap.backgroundBlend,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
            }
        }
        if (imgDataUrl) {
            layerStyle = {
                ...layerStyle, ...{
                    backgroundImage: `url('${imgDataUrl}')`,
                }
            }
        }
    }
    return layerStyle;
}
