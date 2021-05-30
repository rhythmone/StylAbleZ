import React from 'react';
import './App.css';
import {Work} from "./stylablez/Work";
import {Gallery, StylablezWork} from "./stylablez/model/types";
import fxsSassAsset from "./data/fxsSass.json"

const assetId = 'fxs_sass'
const compId = 'classic'

const tym_transpData: Gallery = {
    assets: [
        fxsSassAsset as StylablezWork
    ]
}


const App = () => {
    return (
        <div className="App">
            <Work gallery={tym_transpData} assetId={assetId} compId={compId}/>
        </div>
    );
}

export default App;
