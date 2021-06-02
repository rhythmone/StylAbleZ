export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export { loadCompositionElements, loadCompositionLayers, loadLayerSourceImage, buildStylizableLayers } from './stylablez/functions/layers'
export * from './stylablez/functions/filenameParser'
export * from './stylablez/functions/style'
export * from './stylablez/model/types'
export * from './stylablez/components/Composite'
export * from './stylablez/components/CompositionLayer'
