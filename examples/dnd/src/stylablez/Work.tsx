import React, {useCallback, useMemo, useReducer} from 'react';

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
import splash from '../img/splash.png'

export interface WorkProps {
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        text: {
            position: 'absolute',
            left: 70
        },
        compWrapper: {
            position: 'absolute',
            top: 100,
            left: 100
        },
        noDragActive: {
            backgroundColor: 'green'
        },
        dragActive: {
            border: '1px solid',
            padding: '10',
            boxShadow: '5px 10px #88888850',
            borderRadius: 5,
            borderColor: '#88888850'
        },
        img: {
            width: 400,
            height: 330,
            top: 184,
            left: 264,
            position: 'absolute'
        },
        dropZone: {
            height: 150,
            width: 245
        },
        wrapper: {
            height: 500,
            position: 'absolute',
            top: 90,
            bottom: 90,
            left: 50,
            width: 850,
            borderRadius: 10,
            borderColor: '#d6d4d4',
            borderWidth: 10,
            borderStyle: 'dashed',
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
    const classes = useStyles();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const lenientFilenames = true
        let StylizAbleZ = buildStylizableLayers(acceptedFiles, lenientFilenames);
        dispatch({
            type: 'changeLayers',
            layers: StylizAbleZ
        })
    }, [])

    const {getRootProps,
        isDragActive,
        isDragAccept,
        isDragReject} = useDropzone({
        noDragEventsBubbling: true,
        onDrop: onDrop,
        accept: 'image/*'
    })

    const dragStyle = useMemo(() => {
        if (isDragActive) {
            return classes.dragActive
        } else {
            return classes.noDragActive
        }
    }, [
        isDragActive,
        isDragReject,
        isDragAccept,
        classes.dragActive,
        classes.noDragActive
    ]);

    const {ref, ...rootProps} = getRootProps()

    return (
        <RootRef rootRef={ref}>
            <Paper {...rootProps} elevation={0}>
                <p className={classes.text}>Drag 'n' drop some image files below</p>
                {state.layers.length > 0 ? <div className={classes.compWrapper}><Composite
                    backgroundColor={backgroundColorValue}
                    layers={state.layers}
                    layerHeight={500}
                    layerWidth={800}
                    palette={state.palette}
                    /></div>
                : <img src={splash} className={`${classes.img} ${dragStyle}`} alt={""}/>
                }
            <div className={`${classes.wrapper}`}>
                <EditLayersPanel compositionState={state} dispatch={dispatch}/>
            </div>
            </Paper>
        </RootRef>
    )
}
