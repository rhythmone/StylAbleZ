import React, {useMemo} from "react";
import {Layer, Palette} from "../model/types";
import {LayerTool} from "../tools/LayerTool";

/**
 * Properties passed in with the CompositeLayer visual element attributes.  The most important
 * attributes are layer and palette both of which can be controlled with React using controlled
 * components.  See the example in this repository to see how this is done.
 */
interface LayerProps {
    layer: Layer;
    width: number;
    height: number;
    palette: Palette;
    key: number;
}

/**
 * A React JSX element whose styles are applied directly to the element
 * based on the values extracted from the @Layer using the extractLayerStyles method.
 * @param props LayerProps
 * @constructor
 */
export const CompositionLayer = (props: LayerProps) => {
    const {layer, width, height, palette} = props

    return useMemo(
    () => {
        const layerStyle = new LayerTool().extractLayerStyles(palette, layer, width, height);

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
