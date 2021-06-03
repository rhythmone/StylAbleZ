
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

export interface PaletteList {
    palettes: Palette[];
}

export interface LayerStyle {
    [name: string]: string | number | boolean | undefined
}

export interface Layer {
    sourceId: string;
    styleMap: StylAbleZMap;
    imageDataUrl?: string;
}

/**
 * This is just
 */
export interface StylAbleZMap {
    [styleName: string]: string | number | boolean | undefined;
    backgroundColor?: string;
}

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
