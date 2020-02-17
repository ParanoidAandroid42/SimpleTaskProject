namespace Core.Parts {

    /** buttonsstate enum*/
    export enum ButtonStates {
        Disabled = "Disabled",
        Down = "Down",
        Out = "Out",
        Over = "Over"
    }

     /**  running when loading class */
    export class Button extends PIXI.Sprite {
        private _frames: Core.Interfaces.IButtonFrames = null;
        private _state: ButtonStates = ButtonStates.Out;
        private _callback: Function = null;
        private _isEnabled: boolean = true;
        private _zIndex: number = 0;

        /**
         * running when loading class
         * @param x - position x
         * @param y - position y
         * @param w - width
         * @param h - height
         * @param c - BUttonConfig
         * @param p - parent
         * @param cB - callback function - when button up
         */
        constructor(x: number, y: number, w: number, h: number, c: Interfaces.IButtonConfig, cB?: Function, p?: PIXI.Container) {
            super();
            this.width = w;
            this.height = h;
            this.anchor.set(0.5, 0.5);
            this.position.set(x, y);
            this.buttonMode = true;
            this.interactive = true;
            this._frames = c.frames;
            this._callback = cB;
            c.name ? this.name = c.name : this.name = "button";
            p && p.addChild(this);
            this.state = ButtonStates.Out;
            this.initEvent();
        }

        /**
         * set events
         */
        private initEvent() {
            /** Mouse & touch events are normalized into the pointer* events for handling different button events. */
            this.on('pointerdown', this.onButtonDown)
            this.on('pointerup', this.onButtonUp)
            this.on('pointerover', this.onButtonOver)
            this.on('pointerout', this.onButtonOut);
            this.on('pointertap', this.onButtonOut);
        }

        /**
         * running when button down
         */
        private onButtonDown() {
            this.state = ButtonStates.Down;
        }

        /**
         * running when button up
         */
        private onButtonUp() {
            this._callback.call("", this);
        }

        /**
         * running when button over
         */
        private onButtonOver() {
            this.state = ButtonStates.Over;
        }

        /**
         * running when button out
         */
        private onButtonOut() {
            this.state = ButtonStates.Out;
        }

         /**
         * change textures acccording to button states
         * @param state - buttonstates
         */
        private set state(state: ButtonStates) {
            this._state = state;
            switch (state) {
                case ButtonStates.Out:
                    this.texture = PIXI.Texture.fromFrame(this._frames.out);
                    break;
                case ButtonStates.Over:
                    this.texture = PIXI.Texture.fromFrame(this._frames.over);
                    break;
                case ButtonStates.Down:
                    this.texture = PIXI.Texture.fromFrame(this._frames.down);
                    break;
                case ButtonStates.Disabled:
                    this.texture = PIXI.Texture.fromFrame(this._frames.disabled);
                    break;
            }
        }

        public set isEnabled(enable: boolean) {
            this._isEnabled = enable;
            if (!this._isEnabled) {
                this.state = ButtonStates.Disabled;
            } else {
                this.state = ButtonStates.Out;
            }
            this.interactive = enable;
        }

        public get zIndex() {
            return this._zIndex;
        }

        public set zIndex(zIndex) {
            this._zIndex = zIndex;
        }
    }
}