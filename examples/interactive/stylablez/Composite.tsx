import React, {useState} from 'react';

import {Composition, StylablezWork} from "./model/types";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {extractLayerStyles, getPaletteNames} from "./functions/style";
import {EditLayersPanel} from "./editor//EditLayersPanel";
import {CompositionLayer} from "./CompositionLayer";

interface CompositeProps {
    width: number;
    height: number;
    comp: Composition;
    asset: StylablezWork;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        compositeWrapper: {
            width: '100%',
            height: '100%',
            position: 'absolute'
        },
    })
);


export const Composite = (props: CompositeProps) => {
    const classes = useStyles();
    const {width, height, asset, comp} = props
    const [backgroundColor, setBackground] = useState('transparent');
    const [paletteName, setPaletteName] =useState(getPaletteNames()[0]);
    const [onlyLayer, setOnlyLayer] =useState(-1);
    const layers = comp.comp

    return <div className={classes.compositeWrapper} style={{backgroundColor: backgroundColor}}>
        {
            layers.map((layer, layerIndex) => {
                if (onlyLayer < 0 || layerIndex === onlyLayer) {
                    return <CompositionLayer
                        key={layerIndex}
                        asset={asset}
                        layer={layer}
                        width={width}
                        height={height}
                        paletteName={paletteName}/>
                }
            })
        }
    <EditLayersPanel
        layers={layers}
        setBackground={setBackground}
        paletteName={paletteName}
        setPaletteName={setPaletteName}
        setOnlyLayer={setOnlyLayer}/>
    </div>
}
