import React from 'react';

import {Layer, Palette} from "../model/types";
import {CompositionLayer} from "./CompositionLayer";

/**
 * Properties provided to a visual Composite element. The most important properties are the
 * layers and the palette.  layerWidht and layerHeight are provided to the udnerlying
 * CompositionLayer to keep them properly aligned within the composition.  backgroundColor
 * is global to the composite itself and replaces the need style the background, relying instead,
 * on the palette control mechanism.  Each layer is used to create and style a CompositionLayer
 */
interface CompositeProps {
    backgroundColor: string;
    layerWidth: number;
    layerHeight: number;
    layers: Layer[];
    palette: Palette;
}

/**
 * A React JSX element that wraps child CompositionLayer elements.
 * @param props CompositeProps
 * @constructor
 */
export const Composite = (props: CompositeProps) => {
    const {backgroundColor, layers, layerWidth, layerHeight, palette} = props

    return <div style={{
        backgroundColor: backgroundColor,
        width: '100%',
        height: '100%',
        position: 'absolute'
    }}>
        {
            layers.map((layer: Layer, layerIndex: number) => {
                return <CompositionLayer
                    key={layerIndex}
                    layer={layer}
                    width={layerWidth}
                    height={layerHeight}
                    palette={palette} />
            })
        }
    </div>
}

