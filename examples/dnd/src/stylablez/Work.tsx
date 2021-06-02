import React, {useCallback, useState} from 'react';

import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useDropzone} from "react-dropzone";
import {Paper, RootRef} from "@material-ui/core";
import { Layer, buildStylizableLayers, Composite } from '@stylizablez/core'
import {palettes} from "./Palletes";

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

export const Work = (props: WorkProps)  => {
    let [layers, setLayers] = useState<Layer[]>([]);

    const onDrop = useCallback(acceptedFiles => {
        const lenientFilenames = true
        let StylizAbleZ = buildStylizableLayers(acceptedFiles, lenientFilenames);
        setLayers(StylizAbleZ)
        console.log("ehhhe")
    }, [])

    const classes = useStyles();
    const {getRootProps, getInputProps} = useDropzone({ onDrop })
    const {ref, ...rootProps} = getRootProps()

    return (
        <RootRef rootRef={ref}>
            <Paper {...rootProps}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                return <Composite
                layers={layers}
                height={340}
                width={340}
                paletteList={palettes}

            />
            </Paper>
        </RootRef>
    )
}
