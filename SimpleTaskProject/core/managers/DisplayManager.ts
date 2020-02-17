namespace Core.Managers {
    export class DisplayManager extends PIXI.utils.EventEmitter  {

        private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        public static instance: DisplayManager;
        private _rendererContainer: PIXI.Container;

        private _width: number;
        private _height: number;

          /**
         * displaymanager constructor
         * @param {number}  w - Display width
         * @param {number} h - Display height
          */
        constructor(w: number, h: number) {
            super();
            DisplayManager.instance = this;
            this.initProperties(w, h);
        }

          /**
         * displaymanager manager's init function
         * @param {number}  w - Display width
         * @param {number} h - Display height
          */
        private initProperties(w: number, h: number) {
            var app = new PIXI.Application(w, h, { backgroundColor: 0x000000 }); // backgroundColor = black
            //create id for canvas
            app.renderer.view.id = "videoslot";
            //add child app.view to document.body
            document.body.appendChild(app.view);
            this._rendererContainer = app.stage;
            this._renderer = app.renderer;
            this._width = w;
            this._height = h;
            //init event for mobile
            document.body.ontouchend = this.onFullscreenChange.bind(this);
            //init event for desktop
            document.body.onclick = this.onFullscreenChange.bind(this);
        }
        
        public onFullscreenChange() {
            var elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem["mozRequestFullScreen"]) { /* Firefox */
                elem["mozRequestFullScreen"]();
            } else if (elem["webkitRequestFullscreen"]) { /* Chrome, Safari & Opera */
                elem["webkitRequestFullscreen"]();
            } else if (elem["msRequestFullscreen"]) { /* IE/Edge */
                elem["msRequestFullscreen"]();
            }
        }

        public get renderer(): PIXI.WebGLRenderer | PIXI.CanvasRenderer {
            return this._renderer;
        } 

        public get rendererContainer() {
            return this._rendererContainer;
        }

        public get width() {
            return this._width;
        }

        public get height() {
            return this._height;
        }
    }
}