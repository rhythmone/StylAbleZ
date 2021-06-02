import React, {useState} from 'react';

import {PaletteList, StylablezWork} from "../model/types";
import {getPaletteNames} from "../functions/style";
import {CompositionLayer} from "./CompositionLayer";
import {Layer} from "../model/types";

interface CompositeProps {
    width: number;
    height: number;
    layers: Layer[];
    paletteList: PaletteList;
}

export const Composite = (props: CompositeProps) => {
    const {width, height, layers, paletteList} = props
    const [backgroundColor, setBackground] = useState('transparent');
    const [paletteName, setPaletteName] =useState(getPaletteNames(paletteList)[0]);
    const [onlyLayer, setOnlyLayer] =useState(-1);

    return <div style={{
        backgroundColor: backgroundColor,
        width: '100%',
        height: '100%',
        position: 'absolute'
    }}>
        {
            layers.map((layer: Layer, layerIndex: number) => {
                if (onlyLayer < 0 || layerIndex === onlyLayer) {
                    return <CompositionLayer
                        key={layerIndex}
                        layer={layer}
                        width={width}
                        height={height}
                        paletteName={paletteName}
                        paletteList={paletteList} />
                } else {
                    return null
                }
            })
        }
    </div>
}

