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

export const getPaletteNames = (paletteList: PaletteList): string[] => {
    const names = paletteList.palettes.map(palette => palette.name);
    return names
}

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

export const getHexesForPalette = (paletteList: PaletteList, currentPaletteName: string): VariantHex => {
    const currentPalette = getPalette(paletteList, currentPaletteName);
    return {
        primary: currentPalette.colors[0].hex,
        secondary: currentPalette.colors[1].hex,
        accent: currentPalette.colors[2].hex,
    }
}

export const getHexForLabel = (paletteList: PaletteList, label: string, currentPaletteName: string) => {
    // var currentPaletteName = $('body').data('currentPaletteName');
    var currentPalette = getPalette(paletteList, currentPaletteName);
    if (label === 'prim') {
        return currentPalette.colors[0].hex;
    } else if (label === 'scnd') {
        return currentPalette.colors[1].hex;
    } else if (label === 'acnt') {
        return currentPalette.colors[2].hex;
    } else {
        return label;
    }
}

export const getLabelForHex = (paletteList: PaletteList, hex: string, currentPaletteName: string) => {
    if (hex.startsWith('rgb')) {
        // https://stackoverflow.com/a/33511903/223225
        hex = '#' + hex.substr(4, hex.indexOf(')') - 4).split(',').map((color) => parseInt(color).toString(16)).join('');
    }
    var currentPalette = getPalette(paletteList, currentPaletteName);
    var colorIndex = currentPalette.colors.findIndex((color: Color) => color.hex === hex);
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

export const extractLayerStyles = (paletteList: PaletteList, layer: Layer,  width: number, height: number, paletteName: string): LayerStyle => {
    const imgDataUrl = layer.imageDataUrl
    const stylizableMap: StylAbleZMap = layer.styleMap

    let layerStyle: LayerStyle = {
        // Add width and height when rendering HTML, based on parent element
        mixBlendMode: stylizableMap.mixBlendMode || 'normal',
        visibility: (stylizableMap.visible === false) ? 'hidden' : 'visible',
        width: width,
        height: height
    }

    if (stylizableMap.backgroundColor && stylizableMap.backgroundColor !== 'transparent') {
        layerStyle.backgroundColor = getHexForLabel(paletteList, stylizableMap.backgroundColor, paletteName);
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
