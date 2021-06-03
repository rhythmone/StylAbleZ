import React, {useCallback, useReducer, useState} from 'react';

import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useDropzone} from "react-dropzone";
import {Paper, RootRef} from "@material-ui/core";
import {
    getPaletteNames,
    Layer,
    buildStylizableLayers,
    Composite,
    getPalette,
    getHexForLabel,
    Palette
} from '@stylizablez/core'
import {palettes} from "./Palettes";
import {EditLayersPanel} from "./editor/EditLayersPanel";

export interface WorkProps {
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dropZone: {
            height: 150,
            width: 245
        }
    })
);

const reducer = (state: CompositionState, action: any) => {
    switch (action.type) {
        case 'changeBackgroundColor':
            const newState = {...state, backgroundColor: action.backgroundColor};
            return newState
        case 'changePaletteName':
            return {...state, palette: getPalette(palettes, action.paletteName)};
        case 'changeOpacity':
            // A copy must be made for the memoized react layer component to re-render
            const opacityLayer: Layer = {...state.layers[action.layerIndex]}
            opacityLayer.styleMap.opacity = action.value
            const newOpacityState = {...state}
            newOpacityState.layers[action.layerIndex] = opacityLayer
            return newOpacityState
        case 'changeBrightness':
            // A copy must be made for the memoized react layer component to re-render
            const layer: Layer = {...state.layers[action.layerIndex]}
            layer.styleMap.brightness = action.value
            const newBrightnessState = {...state}
            newBrightnessState.layers[action.layerIndex] = layer
            return newBrightnessState
        case 'changeLayers':
            return {...state, layers: action.layers};
        default:
            throw new Error();
    }
}

export interface CompositionState {
    backgroundColor: 'prim' | 'scnd' | 'acnt';
    palette: Palette;
    paletteNames: string[];
    layers: Layer[]
}

const initialState: CompositionState = {
    backgroundColor: 'prim',
    palette: palettes.palettes[0],
    paletteNames: getPaletteNames(palettes),
    layers: []
}

export const Work = (props: WorkProps)  => {
    const [state, dispatch] = useReducer(reducer, initialState);
    let backgroundColorValue = getHexForLabel(state.palette, state.backgroundColor);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const lenientFilenames = true
        let StylizAbleZ = buildStylizableLayers(acceptedFiles, lenientFilenames);
        dispatch({
            type: 'changeLayers',
            layers: StylizAbleZ
        })
    }, [])

    const classes = useStyles();
    const {getRootProps} = useDropzone({ noDragEventsBubbling: true, onDrop })
    const {ref, ...rootProps} = getRootProps()

    return (
        <RootRef rootRef={ref}>
            <Paper {...rootProps}>
                <p>Drag 'n' drop some files here, or click to select files</p>
                <Composite
                backgroundColor={backgroundColorValue}
                layers={state.layers}
                layerHeight={800}
                layerWidth={800}
                palette={state.palette}
            />
                <EditLayersPanel compositionState={state} dispatch={dispatch}/>
            </Paper>
        </RootRef>
    )
}
