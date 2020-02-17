namespace Core.Interfaces {

    /**
    * Properties for Button frames 
    */
    export interface IButtonFrames {
        out: string;
        over: string;
        down: string;
        disabled: string;
    }


    /**
    * Properties for Sprite Asset
    */
    export interface ISpriteConfig {
        /* Sprite's texture path.*/
        frame: string;
        name ?: string;
    }

    /**
    * Properties for Button Asset
    */
    export interface IButtonConfig {
        /* Sprite's texture path.*/
        frames: IButtonFrames;
        name ?: string
    }

    /**
    * Properties for Text Asset
    */
    export interface ITextConfig {
        text: string;
        textStyle: PIXI.TextStyleOptions;
        name ?: string;
    }

    /**
    * Properties for button text Asset
    */
    export interface IButtonTextConfig {
        /** button config */
        bConfig: IButtonConfig;
        /** text config */
        tConfig: ITextConfig;
        name ?: string;
    }

    /**
    * Properties for sprite text Asset
    */
    export interface ISpriteTextConfig {
        /** sprite config */
        sConfig: ISpriteConfig;
        /** text config */
        tConfig: ITextConfig;
        name?: string;
    }
}