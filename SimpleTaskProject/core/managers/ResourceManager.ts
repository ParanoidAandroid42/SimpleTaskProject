namespace Core.Managers {
    export class ResourceManager{
        
        private _loader: PIXI.loaders.Loader;

        /**
       * ResourceManager constructor
        */
        constructor() {
            this.initProperties();
        }

        /**
        * ResourceManager manager's init function
         */
        private initProperties() {
            this._loader = new PIXI.loaders.Loader();        
            //created by texture packer 
            this._loader.add("assets/sprites/ui.json");
            this._loader.add("particle", "assets/sprites/particle.png");
            this._loader.load();

            this._loader.onProgress.add(this.onProgress.bind(this)); 
            this._loader.onError.add(this.onError.bind(this)); 
            this._loader.onLoad.add(this.onLoad.bind(this)); 
            this._loader.onComplete.add(this.onComplete.bind(this)); 
        }

         /**
        * Called once per errored file
         */
        private onError() {

        }

        /**
        * Called once per loaded file
        */
        private onLoad() {
        }

        /**
        * Called once when the queued resources all load.
         */
        private onComplete() {
            new Core.Controller.GameController(); 
        }

        /**
        *Called once per loaded/errored file
        */
        private onProgress() {
        }
    } 
}