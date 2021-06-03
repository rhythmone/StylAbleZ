# StyleAbleZ Image Stacking Library

A library for processing a stack of images that can flex in both color and style according to the digital product they are embedded in.

## Demo
You can find a working example of a project using this library [here](https://rhythmone.github.io/StylAbleZ/examples/dnd/build/)

## Get Started

> To install into your project:
> * yarn install @styleablez/core
> * See the [Example](./examples/dnd) for usage guidance.






## Working with Palettes
A [Palette](https://rhythmone.github.io/StylAbleZ/core/docs/Palette.html) is a simple object containing Color definitions to be used within some context.  A [Color](https://rhythmone.github.io/StylAbleZ/core/docs/Color.html) definition contains a color hex value and a class that indicates when it should be used.  When a palette class is selected, the color for that class will be used.

## Working with StyleAbleZ LayerComposition
Creating a [Composite](https://rhythmone.github.io/StylAbleZ/core/docs/Composite.html) from a list of files is easy.  Just create a new [LayerTool](https://rhythmone.github.io/StylAbleZ/core/docs/LayerTool.html) and call [buildStylizableLayers](https://rhythmone.github.io/StylAbleZ/core/docs/LayerTool.html#buildStylizableLayers) providing a list of image files.  An example of how to do this is provided in the [demo in this repository](../examples/dnd/src/styleablez/work).


## StyleAbleZ React Controlled Components
The only state a consumer of this library should need to manage within components is the [Palette](https://rhythmone.github.io/StylAbleZ/core/docs/Palette.html) object and a list of [Layer](https://rhythmone.github.io/StylAbleZ/core/docs/Layers.html) objects.  The [Composite](https://rhythmone.github.io/StylAbleZ/core/docs/Composite.html) JSX element takes each of these as attributes.  All style extraction is done within the [Layer](https://rhythmone.github.io/StylAbleZ/core/docs/CompositionLayers.html) so developers are free from having to manage any styling related to the layers.


# API Docs
> * The quickstart script generates the  [docs here](./core/docs)
> * The docs also [live here](https://rhythmone.github.io/StylAbleZ/core/docs/) 
> * They can be generated with
>   * `cd StyleAbleZ/core`
>   * `yarn doc`
