
export interface Color {
    tone: string;
    hex: string;
    usage: string;
    palette: string;
}

export interface Palette {
    name: string;
    tone: string;
    colors: Color[];
}

/**
 * A container contaiing a list of palettes
 */
export interface PaletteList {
    palettes: Palette[];
}

/**
 * Maps to CSSStyleDeclarations that should be usable on elements
 * that can take CSS style rules.
 */
export interface LayerStyle {
    [name: string]: string | number | boolean | undefined
}

/**
 * An object that contains values describing the visual attributes of a styled layer.
 * Together with a palette values in Layer object can be used to create CSS style
 * declarations
 */
export interface Layer {
    sourceId: string;
    styleMap: StylAbleZMap;
    imageDataUrl?: string;
}

export interface StylAbleZMap {
    [styleName: string]: string | number | boolean | undefined;
    backgroundColor?: string;
}

/**
 * A container for of layers that can be referenced by name.
 */
export interface Composition {
    name: string;
    layers: Layer[];
    preview?: string;
    previewonly?: boolean;
    tone?: string;
}

export interface StylablezWork {
    name: string;
    collection: string;
    chpt: string;
    id: string;
    localPath: string;
    alt: string;
    width: number;
    height: number;
    comps: Composition[];
}


export interface Gallery {
    assets: StylablezWork[]
}
