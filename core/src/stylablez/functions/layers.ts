import {Composition, Gallery, Layer, StylAbleZMap} from "../model/types";
import {parseStylablezFiles} from "./filenameParser";

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

export interface LayerSource {
    filename: string;
    imageDataUrl: string;
}

const getImageDataUrl = (file: File): string => {
    const reader = new FileReader();
    return  URL.createObjectURL(file)
}

export const buildStylizableLayers = (files: File[], lenientFilenames: boolean = false): Layer[] => {
    const filenames: string[] = files.map(file => file.name)

    const styleMaps: StylAbleZMap[] = parseStylablezFiles(filenames, lenientFilenames)
    return styleMaps.map((stylMap, idx) => ({
        styleMap: stylMap,
        imageDataUrl: getImageDataUrl(files[idx])
    }));
}

/**
 * Given a sorted list of files, parse the filenames to create a layer for each one.
 * Then compose those into a composition.
 * @param files
 */
export const loadCompositionLayers = (name: string, files: File[]): Composition => {
    const layers = buildStylizableLayers(files);
    return {
        name,
        layers
    }
}

export const loadLayerSourceImage = () => {
//export const loadLayerSourceImage = (layer: Layer, asset: StylablezWork) => {
        return null
}
