import React, {useState} from 'react';


import {Layer} from "../model/types";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


import Loupe from '@material-ui/icons/LoupeSharp';
import _ from 'lodash'
import {
    Drawer, FormControl, FormControlLabel, FormLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText, Radio, RadioGroup,
    Switch
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {LayerEditor} from "./LayerEditor";
import {getPaletteNames, tym_getHexesForPalette} from "../functions/style";


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
    layers: Layer[]
    setBackground: (background: string) => void
    setPaletteName: (name: string) => void
    setOnlyLayer: (layerIdx: number) => void
    paletteName: string
}

function modifyLayer(layer: Layer, attribute: string, e: React.ChangeEvent<HTMLInputElement>) {
    // @ts-ignore
    layer[attribute] = e.target.value
}

const paletteNames = getPaletteNames()

export const EditLayersPanel = (props: LayerEditorProps) => {
    const {layers, setBackground, paletteName, setPaletteName, setOnlyLayer} = props
    const classes = useStyles();

    const [selectedLayer, setSelectedLayer] = useState<Layer | null>(null);
    const [layerIndex, setLayerIndex] = useState(-1);
    const [shownEditor, setShownEditor] = useState(-1);
    const [focusedLayer, setFocusedLayer] = useState(-1);
    const [hasFocus, setHasFocus] = useState(false)
    const [menuClickEnabled, setMenuClickEnabled] = useState(true);
    const colors = tym_getHexesForPalette(paletteName);

    // This shouldn't be in the layer editor.  It changes the background which is not layer specific
    const changeBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
        let variant = (event.target as HTMLInputElement).value;
        setBackgroundVariant(variant);
        // @ts-ignore
        setBackground(colors[variant])
    };
    const [backgroundVariant, setBackgroundVariant] = React.useState('transparent');

    return (<Drawer
            anchor='right'
            variant="permanent"
            className={classes.drawer}>
            <div className={classes.drawerContent}>
            <Autocomplete
                value={paletteName}
                onChange={(event: any, newValue: string | null) => {
                    setPaletteName(newValue as string);
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
                        <RadioGroup aria-label="background" name="background" value={backgroundVariant} onChange={changeBackground}>
                            <FormControlLabel value="transparent" control={<Radio />} label="Transparent" />
                            <FormControlLabel value="primary" control={<Radio />} label="Primary" />
                            <FormControlLabel value="secondary" control={<Radio />} label="Secondary" />
                            <FormControlLabel value="accent" control={<Radio />} label="Accent" />
                        </RadioGroup>
                    </FormControl>
                </div>
            <List onMouseOut={() => {
                setFocusedLayer(-1);
                setOnlyLayer(-1)}}>
                {
                    layers.map((layer, layerIndex) => {
                        const focusedStyle = layerIndex === focusedLayer ? classes.focused : classes.notFocused
                        const showEditorStyle = layerIndex === shownEditor ? classes.shownEditor : classes.notShownEditor
                        const hideEditor = layerIndex !== focusedLayer && layerIndex !== shownEditor
                        return <ListItem className={`${classes.listItem} ${focusedStyle} ${showEditorStyle}`}
                                         key={layerIndex}
                                         onClick={() => {
                                             setShownEditor(layerIndex);
                                         }}
                                         onMouseOver={() => {
                                             setFocusedLayer(layerIndex);
                                             setHasFocus(true);
                                             setOnlyLayer(layerIndex)}}>
                            <ListItemIcon><Loupe/></ListItemIcon>
                            <ListItemText primary={_.startCase(layer.sourceId) || <em>(fill color)</em>}/>
                            <div className={classes.layerEditor} style={{opacity: hideEditor ? 0 : 1}}>
                                <LayerEditor layer={layer} layerIndex={layerIndex} paletteName={paletteName}/>
                            </div>
                        </ListItem>;
                    })
                }
            </List>
            <p className="text-right">
                <button className="btn btn-primary" id="export">Copy Composite Data to Clipboard
                </button>
            </p>
        </div>
        </Drawer>
    )

}
