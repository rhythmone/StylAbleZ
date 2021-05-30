import React, {useState} from 'react';

import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Composition} from "stylzablez";

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
            props.children
        }
    </div>
}

