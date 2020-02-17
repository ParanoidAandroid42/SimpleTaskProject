namespace Core.Parts {

    export class ButtonText extends Parts.Button {

        private _text: Parts.Text;

        /**
         * running when loading class
         * @param x - position x
         * @param y - position y 
         * @param w - width
         * @param h - height
         * @param c - buttontext config
         * @param cB - callback function
         * @param p - parent
         */
        constructor(x: number, y: number, w: number, h: number, c: Interfaces.IButtonTextConfig, cB?: Function, p?: PIXI.Container) {
            super(x, y, w, h, c.bConfig, cB, p);
            this._text = new Parts.Text(0, 0, c.tConfig, this);
            if(c.name) this.name = c.name;
        }

        public get textAsset() {
            return this._text;
        }
        
    }
}