import {Color, Layer, LayerStyle, Palette, StylablezWork} from "../../model/types"
import tym_transpData from '../../data/palettes.json'
import {loadLayerSourceImage} from "./layers";



export const getPaletteNames = (): string[] => {
    const names = tym_transpData.palettes.map(palette => palette.name);
    return names
}

export const tym_getPalette = (name: string): Palette => {
    const palette =  tym_transpData.palettes.find(palette => palette.name === name);
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

export const getPaletteHexCode = (currentPaletteName: string): VariantHex => {
    const currentPalette = tym_getPalette(currentPaletteName);
    return {
        primary: currentPalette.colors[0].hex,
        secondary: currentPalette.colors[1].hex,
        accent: currentPalette.colors[2].hex,
    }
}

export const tym_getHexForLabel = (label: string, currentPaletteName: string) => {
    // var currentPaletteName = $('body').data('currentPaletteName');
    var currentPalette = tym_getPalette(currentPaletteName);
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

export const tym_getLabelForHex = (hex: string, currentPaletteName: string) => {
    if (hex.startsWith('rgb')) {
        // https://stackoverflow.com/a/33511903/223225
        hex = '#' + hex.substr(4, hex.indexOf(')') - 4).split(',').map((color) => parseInt(color).toString(16)).join('');
    }
    var currentPalette = tym_getPalette(currentPaletteName);
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


// This is where your constructor went
export const extractLayerStyles = (asset: StylablezWork, layer: Layer,  width: number, height: number, paletteName: string) => {
    const image = loadLayerSourceImage(layer, asset);

    let layerStyle: LayerStyle = {
        // Add width and height when rendering HTML, based on parent element
        'mix-blend-mode': layer.mixBlendMode || 'normal',
        'visibility': (layer.visible) ? 'visible' : 'hidden',
        width: width, height: height
    }

    if (layer.backgroundColor && layer.backgroundColor !== 'transparent') {
        layerStyle['background-color'] = tym_getHexForLabel(layer.backgroundColor, paletteName);
    }
    if (layer.brightness) {
        layerStyle.filter = `brightness(${layer.brightness}%)`;
    }
    if (layer.opacity) {
        layerStyle.opacity = Number(layer.opacity) * 0.01;
    }
    if (layer.mask) {
        layerStyle = {
            ...layerStyle, ...{
                'mask-repeat': 'no-repeat',
                '-webkit-mask-repeat': 'no-repeat',
                '-webkit-mask-size': 'contain',
                'mask-size': 'contain',
            }
        }
        if (image) {
            layerStyle = {
                ...layerStyle, ...{
                    'mask-image': `url('${image}')`,
                    '-webkit-mask-image': `url('${image}')`,
                }
            }
        }
    } else {
        layerStyle = {
            ...layerStyle, ...{
                'background-blend-mode': layer.backgroundBlend,
                'background-size': 'contain',
                'background-repeat': 'no-repeat'
            }
        }
        if (image) {
            layerStyle = {
                ...layerStyle, ...{
                    'background-image': `url('${image}')`,
                }
            }
        }
    }
    return layerStyle;
}
