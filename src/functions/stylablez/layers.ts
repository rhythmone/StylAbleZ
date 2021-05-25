import {Gallery, Layer, StylablezWork} from "../../model/types";
const images = require.context('../../data', true, /^\.\/.*\.png$/);

export const loadCompositionElements = (tym_transpData: Gallery, assetId: string, compId: string) => {
    if (!assetId || !compId) {
        throw new Error('Asset ID and composite ID are required');
    }
    const asset = tym_transpData.assets.find(asset => asset.id === assetId);
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

export const loadLayerSourceImage = (layer: Layer, asset: StylablezWork) => {
    let path;
    if (layer.sourceId) {
        const image = asset.images.find(image => image.sourceId === layer.sourceId);
        if (!image) {
            throw new Error(`Missing asset ${layer.sourceId}`);
        }
        if (false) {
            // TODO: Alternate version that uses Cloudinary for image URL
        } else {
            path = `./${asset.localPath}/${image.filename}`;
        }
    }
    if (path) {
        return images(path).default;
    } else {
        return null
    }
}
