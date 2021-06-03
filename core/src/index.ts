export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export * from './styleablez/tools/FilenameParser'
export * from './styleablez/tools/LayerTool'
export * from './styleablez/tools/PaletteTool'
export * from './styleablez/model/types'
export * from './styleablez/components/Composite'
export * from './styleablez/components/CompositionLayer'
