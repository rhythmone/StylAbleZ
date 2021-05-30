import React from 'react';

import {Layer} from "../model/types";
import {Slider, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


interface LayerEditorProps {
    layer: Layer | null
    layerIndex: number
    paletteName: string
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        slider: {
            width: '100%'
        },
        sliderLabel: {
            fontSize: 12
        }
    })
);

const modifyLayer = (layer: Layer, attribute: string, e: React.ChangeEvent<{}>) => {
    // @ts-ignore
    if (e.target) {
        // @ts-ignore
        layer[attribute] = e.target.value
    } else {
        // @ts-ignore
        layer[attribute] = e
    }
}

export const LayerEditor = (props: LayerEditorProps) => {
    const classes = useStyles();

    const {layer, layerIndex, paletteName} = props


    if (!layer) {
        return <div></div>
    } else {
        /*
        if (layer.opacity === undefined) {
            layer.opacity = 0
        }
        if (layer.brightness === undefined) {
            layer.brightness = 0
        }

         */

        return (
            <div>
                <Typography id="brightness-slider" className={classes.sliderLabel}>
                    Brightness
                </Typography>
                <Slider
                    className={classes.slider}
                    value={layer.brightness}
                    min={0}
                    max={200}
                    onChange={(e) => modifyLayer(layer, 'brightness', e)}
                    aria-labelledby="brightness-slider"/>
                <Typography id="opacity-slider"  className={classes.sliderLabel}>
                    Opacity
                </Typography>
                <Slider
                    className={classes.slider}
                    value={layer.opacity}
                    min={0}
                    max={200}
                    onChange={(e) => modifyLayer(layer, 'opacity', e)}
                    aria-labelledby="opacity-slider"/>
            </div>
        )
    }
}
