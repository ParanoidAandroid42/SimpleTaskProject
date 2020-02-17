/// <reference path="../modules/stage.ts" />

namespace Core.Stages {

    export class ShaderFireParticle extends Core.Modules.Stage {

        private _container: Modules.Container;
        private _particleContainer: Modules.Container;
        private _particleFogContainer: Modules.Container;
        private _particleAddContainer: Modules.Container;
        private _particleGlowContainer: Modules.Container;
        private _particleSparksContainer: Modules.Container;

        private _menuButton: Parts.Button;
        private _woodSprite: Parts.Sprite;

        private _fEmitter: PIXI.particles.Emitter;
        private _aEmitter: PIXI.particles.Emitter;
        private _gEmitter: PIXI.particles.Emitter;
        private _sEmitter: PIXI.particles.Emitter;

        /** * running when loading stage */
        public init() {
            /**create containers*/
            let w, h;
            w = Managers.DisplayManager.instance.width;
            h = Managers.DisplayManager.instance.height;
            this._container = new Modules.Container(0, 0, this, "Container");

            /**create sprites*/
            this._woodSprite = new Parts.Sprite(722, 613, 200, 75, GameInformation.WoodSPrite, this._container);
            /**create containers for particle*/
            this._particleContainer = new Modules.Container(718, 607, this._container, "ParticleContainer");
            this._particleContainer.scale.set(2,2);
            this._particleFogContainer = new Modules.Container(0, -25, this._particleContainer, "particleFogContainer");
            this._particleSparksContainer = new Modules.Container(0, -45, this._particleContainer, "particleSparksContainer");
            this._particleSparksContainer.scale.set(2, 1);
            this._particleGlowContainer = new Modules.Container(0, 0, this._particleContainer, "particleGlowContainer");
            this._particleAddContainer = new Modules.Container(0, 0, this._particleContainer, "particleAddContainer");

            /**create buttons*/
            let callback: Function = Managers.StageManager.instance.backMenuButtonUp;
            this._menuButton = new Parts.Button(1245, 35, 70, 70, GameInformation.MenuButton, callback.bind(this, this.name), this._container);            
            
            /**create emitters */
            this._fEmitter = new PIXI.particles.Emitter(this._particleFogContainer, ["fire/fire01", "fire/fire02", "fire/fire03"], GameInformation.fireGeneralEmitter); //sprite Count = 3
            this._fEmitter.maxParticles = 10;
            this._gEmitter = new PIXI.particles.Emitter(this._particleGlowContainer, ["fire/fire01", "fire/fire02", "fire/fire03"], GameInformation.fireGlowEmitter);  //sprite Count = 6
            this._gEmitter.maxParticles = 10;
            this._aEmitter = new PIXI.particles.Emitter(this._particleAddContainer, ["fire/fire01", "fire/fire02", "fire/fire03"], GameInformation.fireGeneralEmitter);  //sprite Count = 9
            this._aEmitter.maxParticles = 20;
            this._sEmitter = new PIXI.particles.Emitter(this._particleSparksContainer, "particle", GameInformation.fireSparkEmitter);  //total sprite counter = 10
            this._sEmitter.maxParticles = 10;

            let elapsed = Date.now();      //current time
            this._aEmitter.particleBlendMode = 1; //blend mode = add
            this._aEmitter.update(1);

            //add shader - filter
            let particle: PIXI.Texture = PIXI.Texture.fromFrame("particle");
            let simpleLightFilterBlack = new PIXI.filters.SimpleLightmapFilter(particle, 0x0); //light filter for dark
            let simpleLightFilterSunshine = new PIXI.filters.SimpleLightmapFilter(particle, 0xca7e40); //light filter for sunshine
            this._woodSprite.filters = [simpleLightFilterSunshine, simpleLightFilterBlack];  //light filter for sunshine + outline filter + light filter for dark
            
            ////update emitters according deltatime
            PIXI.ticker.shared.add((deltatime) => {
                this._fEmitter.update((Date.now() - elapsed) * 0.0008);
                this._gEmitter.update((Date.now() - elapsed) * 0.0008);
                this._aEmitter.update((Date.now() - elapsed) * 0.0008);
                this._sEmitter.update((Date.now() - elapsed) * 0.0008);
                elapsed = Date.now();
            }, this);
        }

        /** * running when destroying stage*/
        public dispose() {
            this._fEmitter.destroy();
            this._gEmitter.destroy();
            this._aEmitter.destroy();
            this._sEmitter.destroy();
        }

        public get container() {
            return this._container;
        }
    }
}