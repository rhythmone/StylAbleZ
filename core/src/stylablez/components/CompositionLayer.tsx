import React, {useMemo} from "react";
import {Layer, Palette} from "../model/types";
import {extractLayerStyles} from "../functions/style";

interface LayerProps {
    layer: Layer;
    width: number;
    height: number;
    palette: Palette;
    key: number;
}

export const CompositionLayer = (props: LayerProps) => {
    const {layer, width, height, palette} = props

    return useMemo(
    () => {
        const layerStyle = extractLayerStyles(palette, layer, width, height);

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
    },
    [layer, palette],
    );
}
