export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export * from './stylablez/tools/FilenameParser'
export * from './stylablez/tools/LayerTool'
export * from './stylablez/tools/PaletteTool'
export * from './stylablez/model/types'
export * from './stylablez/components/Composite'
export * from './stylablez/components/CompositionLayer'
