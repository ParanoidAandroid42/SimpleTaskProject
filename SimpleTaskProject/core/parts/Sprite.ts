namespace Core.Parts {
    export class Sprite extends PIXI.Sprite{

        private _zIndex: number = 0;

        /**
         *  running when loading class
         * @param x - position x
         * @param y - position y
         * @param w - width
         * @param h - height
         * @param c - SpriteConfig
         * @param p - parent
         */
        constructor(x: number, y: number, w: number, h: number, c: Interfaces.ISpriteConfig, p?: PIXI.Container) {
            super(PIXI.utils.TextureCache[c.frame]);
            PIXI.Texture.addTextureToCache[c.frame];
            this.width = w;
            this.height = h;
            c.name ? this.name = c.name : this.name = "button";
            this.anchor.set(0.5, 0.5);
            this.position.set(x, y);
            p && p.addChild(this);
        }

        public get zIndex() {
            return this._zIndex;
        }

        public set zIndex(zIndex) {
            this._zIndex = zIndex;
        }
    }
}