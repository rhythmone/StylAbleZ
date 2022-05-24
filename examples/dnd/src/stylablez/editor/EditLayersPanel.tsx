import React, {Dispatch, useState} from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Loupe from '@material-ui/icons/LoupeSharp';
import {
    Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Radio,
    RadioGroup
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {LayerEditor} from "./LayerEditor";
import {CompositionState} from "../Work";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listItem: {
            padding: 0,
            margin: 0
        },
        backgroundControl: {
            marginTop: 20
        },
        drawerContent: {
            padding: 20
        },
        shownEditor: {
            marginBottom: 98,
            backgroundColor: '#EEEEEE',
            transition: 'margin .2s ease-out'
        },
        notShownEditor: {
            marginBottom: 0,
            backgroundColor: '#EEEEEE',
            transition: 'margin .2s ease-out'
        },
        notFocused: {
            backgroundColor: '#FFFFFF'
        },
        drawer: {
            paddingTop: 15,
            paddingLeft: 8
        },
        layerEditor: {
            width: 235,
            backgroundColor: '#EEEEEE',
            position: 'absolute',
            top: 35,
            paddingRight: 32,
            paddingLeft: 32
        },
        focused: {
            backgroundColor: '#EEEEEE',
            borderStyle: 'solid',
            borderWidth: '0 1px 1px 0'
        }
    })
);

interface LayerEditorProps {
    compositionState: CompositionState;
    dispatch: Dispatch<any>;
}

export const EditLayersPanel = (props: LayerEditorProps) => {
    const {compositionState, dispatch} = props
    const {layers, paletteNames, palette} = compositionState
    const classes = useStyles();


    const [shownEditor, setShownEditor] = useState(-1);

    return (<Drawer
            anchor='right'
            variant="permanent"
            className={classes.drawer}>
            <div className={classes.drawerContent}>
            <Autocomplete
                value={palette.name}
                onChange={(event: any, newValue: string | null) => {
                    dispatch({
                        type: 'changePaletteName',
                        paletteName: newValue as string
                    });
                }}
                id="palette-selector"
                disableClearable={true}
                options={paletteNames}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Palette" variant="outlined" />}
            />
                <div className={classes.backgroundControl}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Background</FormLabel>
                        <RadioGroup aria-label="background" name="background" value={compositionState.backgroundColor} onChange={
                            (evt) => (dispatch({
                                type: 'changeBackgroundColor',
                                backgroundColor: evt.target.value
                            }))}>
                            <FormControlLabel value="" control={<Radio />} label="Transparent" />
                            <FormControlLabel value="prim" control={<Radio />} label="Primary" />
                            <FormControlLabel value="scnd" control={<Radio />} label="Secondary" />
                            <FormControlLabel value="acnt" control={<Radio />} label="Accent" />
                        </RadioGroup>
                    </FormControl>
                </div>
            <List>
                {
                    layers.map((layer, layerIndex) => {
                        const showEditorStyle = layerIndex === shownEditor ? classes.shownEditor : classes.notShownEditor
                        const hideEditor = layerIndex !== shownEditor
                        return <ListItem className={`${classes.listItem} ${showEditorStyle}`}
                                         key={layerIndex}
                                         onClick={() => {
                                             setShownEditor(layerIndex);
                                         }}>
                            <ListItemIcon><Loupe/></ListItemIcon>
                            <ListItemText primary={layer.sourceId} />
                            <div className={classes.layerEditor} style={{opacity: hideEditor ? 0 : 1}}>
                                <LayerEditor
                                    brightness={(layer.styleMap.brightness || 100) as number}
                                    opacity={(layer.styleMap.opacity || 100) as number}
                                    layerIndex={layerIndex} dispatch={dispatch}/>
                            </div>
                        </ListItem>;
                    })
                }
            </List>
        </div>
        </Drawer>
    )

}
