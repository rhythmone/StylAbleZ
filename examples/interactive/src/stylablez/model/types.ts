
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
    [name: string]: string | number
}
export interface Image {
    sourceId: string;
    filename: string;
}

export interface Layer {
    sourceId: string; // element id ... image slice
    mixBlendMode: string;
    visible: boolean;
    mask: boolean;
    backgroundColor: string;
    backgroundBlend: string;
    opacity?: number;
    brightness?: number;
    globOvr?: string;
    groupOp?: string;
}

export interface Composition {
    name: string;
    preview: string;
    previewonly: boolean;
    tone: string;
    // These are actually layers, right?
    comp: Layer[];
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
    images: Image[];
    comps: Composition[];
}


export interface Gallery {
    assets: StylablezWork[]
}
