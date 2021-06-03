import {Color, Palette, PaletteList} from "../model/types";

export interface VariantHex {
    primary: string;
    secondary: string;
    accent: string
}

/**
 * A tool containing utilities for working with Palettes
 */
export class PaletteTool {

    /**
     * Extracts a list of names from the provided palette list
     * @param paletteList the list with palette names that will be extracted
     */
    public getPaletteNames = (paletteList: PaletteList): string[] => {
        const names = paletteList.palettes.map(palette => palette.name);
        return names
    }

    /**
     * A simple utility method to find the palette with the specified name and return it
     */
    public getPalette = (paletteList: PaletteList, name: string): Palette => {
        const palette =  paletteList.palettes.find(palette => palette.name === name);
        if (!palette) {
            throw new Error(`The palette: ${name} could not be found in the palette list.`)
        }
        return palette
    }

    public getHexesForPalette = (palette: Palette): VariantHex => {
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
    public getHexForLabel = (palette: Palette, label: string) => {
        if (label === 'prim' || label === 'primary') {
            return palette.colors[0].hex;
        } else if (label === 'scnd' || label === 'secondary') {
            return palette.colors[1].hex;
        } else if (label === 'acnt' || label === 'accent') {
            return palette.colors[2].hex;
        } else {
            return label;
        }
    }

    public getLabelForHex = (palette: Palette, hex: string) => {
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
}
