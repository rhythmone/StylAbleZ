// v1.0c - added comp fallback, if not found use index 0
// v1.0b added an HTML flag for a global override
// v1.0 7-31-20 validated against the "chpt8_wexIntro" test stack

import {Gallery} from "./model/types";
import {Composite} from "./Composite";
import {loadCompositionElements} from "./functions/layers";

export interface WorkProps {
    gallery: Gallery,
    assetId: string;
    compId: string;
}


export const Work = (props: WorkProps)  => {

    const {gallery, assetId, compId} = props
    const {asset, comp} = loadCompositionElements(gallery, assetId, compId);


    return ( <Composite width={1050} height={800} comp={comp} asset={asset} /> )
}
