import React from 'react';

import {Layer, Palette} from "../model/types";
import {CompositionLayer} from "./CompositionLayer";

interface CompositeProps {
    backgroundColor: string;
    layerWidth: number;
    layerHeight: number;
    layers: Layer[];
    palette: Palette;
}

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

