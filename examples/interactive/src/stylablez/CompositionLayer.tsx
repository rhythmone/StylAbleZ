import {Layer, StylablezWork} from "./model/types";
import {extractLayerStyles} from "./functions/style";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: {
            display: 'flex',
            flexWrap: 'wrap',
            flex: '1 1 auto',
            marginRight: -12,
            marginLeft: -12
        },
        overlayItem: {
            position: 'absolute'
        },
        container: {
            maxWidth: 1185
        }
    })
);

interface LayerProps {
    asset: StylablezWork;
    layer: Layer;
    width: number;
    height: number;
    paletteName: string;
}

export const CompositionLayer = (props: LayerProps) => {
    const {asset, layer, width, height, paletteName} = props
    const classes = useStyles();
    let layerStyle = {}


    // useMemo(
        // () => {
            layerStyle = extractLayerStyles(asset, layer, width, height, paletteName);
        // },
        // [layer],
    // );

    return <div className={`${classes.container} ${classes.row} ${classes.overlayItem}`}>
        <div style={layerStyle}/>
    </div>;
}

// Blank page
// Two pallets...
// upload icon
// upload files and you render (with the parse that does what the JSON does)... fxsSass.json
