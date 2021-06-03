import React, {Dispatch} from 'react';

import {Slider, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

interface LayerEditorProps {
    dispatch: Dispatch<any>;
    brightness: number;
    opacity: number;
    layerIndex: number;
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

const modifyOpacity = (dispatch: Dispatch<any>, layerIndex: number, value: number) => {
    dispatch({
        type: 'changeOpacity',
        layerIndex: layerIndex,
        value: value
    })
}

const modifyBrightness = (dispatch: Dispatch<any>, layerIndex: number, value: number) => {
    dispatch({
        type: 'changeBrightness',
        layerIndex: layerIndex,
        value: value
    })
}

export const LayerEditor = (props: LayerEditorProps) => {
    const classes = useStyles();

    const {layerIndex, dispatch, brightness, opacity} = props

    return (
        <div>
            <Typography id="brightness-slider" className={classes.sliderLabel}>
                Brightness
            </Typography>
            <Slider
                className={classes.slider}
                value={brightness}
                min={0}
                max={100}
                onChange={(e, v) => modifyBrightness(dispatch, layerIndex, v as number)}
                aria-labelledby="brightness-slider"/>
            <Typography id="opacity-slider" className={classes.sliderLabel}>
                Opacity
            </Typography>
            <Slider
                className={classes.slider}
                value={opacity}
                min={0}
                max={100}
                onChange={(e, v) => modifyOpacity(dispatch, layerIndex, v as number)}
                aria-labelledby="opacity-slider"/>
        </div>
    )
}
