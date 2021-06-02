import React from "react";
import {Layer, PaletteList, StylablezWork} from "../model/types";
import {extractLayerStyles} from "../functions/style";

interface LayerProps {
    paletteList: PaletteList;
    layer: Layer;
    width: number;
    height: number;
    paletteName: string;
    key: number;
}

export const CompositionLayer = (props: LayerProps) => {
    const {layer, width, height, paletteName, paletteList} = props
    let layerStyle = {}


    layerStyle = extractLayerStyles(paletteList, layer, width, height, paletteName);

    return <div style={{
        flex: '1 1 auto',
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: -12,
        marginRight: -12,
        position: 'absolute'
    }}>
        <div style={layerStyle}/>
    </div>;
}

// Blank page
// Two pallets...
// upload icon
// upload files and you render (with the parse that does what the JSON does)... fxsSass.json
