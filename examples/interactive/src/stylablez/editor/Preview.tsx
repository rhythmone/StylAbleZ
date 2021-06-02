import React from 'react';
import {Composition, StylablezWork} from "../../../../../src";

interface  PreviewProps {
  asset: StylablezWork;
  comp: Composition;
}

export const Preview = (props: PreviewProps) => {
    const {asset, comp} = props
    const path = `${asset.localPath}/${comp.preview}`;
    return <img src={path} alt={asset.alt} className="img-responsive"/>
}
