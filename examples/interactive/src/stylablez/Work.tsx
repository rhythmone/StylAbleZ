import {Composite} from "./Composite";
import * from "stylablez"

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
