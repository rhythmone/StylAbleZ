import React from 'react';

export const Toggle = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const renderMode = urlParams.get('render') || 'live';
    return <p>
                <input type="radio"
                       name="previewToggle"
                       id="previewToggleOn"
                       data-render-toggle="preview"
                       value="showPreview" checked={renderMode === 'preview' ? true : false}/>
                <label htmlFor="previewToggleOn">Prerendered Preview</label>
                &emsp;
                <input
                    type="radio"
                    name="previewToggle"
                    id="previewToggleOff"
                    data-render-toggle="live"
                    value="showPreview" checked={renderMode === 'preview' ? true : false}/>
                <label htmlFor="previewToggleOff">Live Composite</label>
            </p>;
}
