import {Composition, Gallery, Layer, LayerStyle, Palette, StyleAbleZMap} from "../model/types";
import {FilenameParser} from "./FilenameParser";
import {PaletteTool} from "./PaletteTool";


/**
 * A tool providing utilities for worling with Layers and image files
 */
export class LayerTool {

    /**
     * Call this method to convert a list of files to layers.
     * @param files image files used to construct layers.  If their names can be parsed by the
     * with parseStylablezFiles a set of default styles will be included in each layer based
     * on the tokens parsed from the filename.  Each layer will then be styled accordingly.
     * @param lenientFilenames
     */
    public buildStylizableLayers = (files: File[], lenientFilenames: boolean = false): Layer[] => {
        const filenames: string[] = files.map(file => file.name)

        const styleMaps: StyleAbleZMap[] = new FilenameParser(filenames).parseStylablezFiles(lenientFilenames)
        return styleMaps.map((stylMap, idx) => ({
            sourceId: files[idx].name,
            styleMap: stylMap,
            imageDataUrl: getImageDataUrl(files[idx])
        }));
    }


    /**
     * Given a compositionname and a list of image files this will create layers and wrap
     * them into a named composition
     * @param name the name to give the composition
     * @param files the image files that will be used for each layer
     */
    public loadCompositionLayers = (name: string, files: File[]): Composition => {
        const layers = this.buildStylizableLayers(files);
        return {
            name,
            layers
        }
    }

    /**
     * Given the specified palette and layer this will create styles that can be directely
     * applied to elements that take CSS styls.  The layer specs will be used ot map values out
     * of the palette and create the styles.
     */
    public extractLayerStyles = (palette: Palette, layer: Layer,  width: number, height: number): LayerStyle => {
        const imgDataUrl = layer.imageDataUrl
        const stylizableMap: StyleAbleZMap = layer.styleMap

        let layerStyle: LayerStyle = {
            // Add width and height when rendering HTML, based on parent element
            mixBlendMode: stylizableMap.mixBlendMode || 'normal',
            visibility: (stylizableMap.visible === false) ? 'hidden' : 'visible',
            width: width,
            height: height,
            filter: `brightness(100%)`,
            opacity: 1,
        }

        if (stylizableMap.backgroundColor && stylizableMap.backgroundColor !== 'transparent') {
            layerStyle.backgroundColor = new PaletteTool().getHexForLabel(palette, stylizableMap.backgroundColor);
        }
        if (stylizableMap.brightness) {
            layerStyle.filter = `brightness(${stylizableMap.brightness}%)`;
        }
        if (stylizableMap.opacity) {
            layerStyle.opacity = Number(stylizableMap.opacity) * 0.01;
        }

        if (stylizableMap.mask) {
            layerStyle = {
                ...layerStyle, ...{
                    'mask-repeat': 'no-repeat',
                    '-webkit-mask-repeat': 'no-repeat',
                    '-webkit-mask-size': 'contain',
                    'mask-size': 'contain',
                }
            }
            if (imgDataUrl) {
                layerStyle = {
                    ...layerStyle, ...{
                        'mask-image': `url('${imgDataUrl}')`,
                        '-webkit-mask-image': `url('${imgDataUrl}')`,
                    }
                }
            }
        } else {
            layerStyle = {
                ...layerStyle, ...{
                    backgroundBlendMode: stylizableMap.backgroundBlend,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                }
            }
            if (imgDataUrl) {
                layerStyle = {
                    ...layerStyle, ...{
                        backgroundImage: `url('${imgDataUrl}')`,
                    }
                }
            }
        }
        return layerStyle;
    }
}


export const loadCompositionElements = (transpData: Gallery, assetId: string, compId: string) => {
    if (!assetId || !compId) {
        throw new Error('Asset ID and composite ID are required');
    }
    const asset = transpData.assets.find(asset => asset.id === assetId);
    if (!asset) {
        throw new Error(`No asset found for ${assetId}`);
    }
    let comp = asset.comps.find(comp => comp.name === compId);
    if (!comp) {
        comp = asset.comps[0]
        // const alertCompFallback = true; // TO DO - add alert flag to tile to indicate fallback was used
        if (!comp.name) {
            throw new Error(`No composite found for ${compId} for asset ${assetId}`);
        }
    }

    // const imageAspectRatio = asset.width / asset.height;

    return {asset, comp};
}

const getImageDataUrl = (file: File): string => {
    const reader = new FileReader();
    return  URL.createObjectURL(file)
}

