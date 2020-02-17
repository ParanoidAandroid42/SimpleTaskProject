
namespace Core.Managers {

    /** running like dictionary*/
    interface Stage<T> {
        [K: string]: T; 
    }

    export class StageManager {        
        private _stages: Stage<Core.Modules.Stage> = {};
        private _stageContainer: Modules.Container;
        public static instance: StageManager;

        /**
        * stage manager's constructor
        * @param {number} x - Stage's PositionX
        * @param {number} y - Stage's PositionY
        * @param {number} p - Stage's Parent
        */
        constructor(x: number, y: number, p: PIXI.Container) {
            StageManager.instance = this;
            this._stageContainer = new Modules.Container(x, y, p, "StageContainer");
        }

        /** creted stage if the stage was not created before.*/
        public createStage(stage: any, stageName: string) {
            if (this._stages[stageName] == null) {   
                this._stages[stageName] = new stage();
                this._stages[stageName].name = stageName;
                this._stageContainer.addChild(this._stages[stageName]);
            }
        }

        /**
         * running when menu button up
         */
        public backMenuButtonUp(name:string) {
            Managers.StageManager.instance.removeStage(name);
            Managers.StageManager.instance.startStage(Stages.MainStage, StageNames.Menu);
        }

        /**
         * started stege's init function if the stage was created before.
         * @param {any}  stage - Stage type
         * @param {string} stageName - Stage name for added to stage dictionary
          */
        public startStage(stage: any, stageName: StageNames) {
            this.createStage(stage, stageName);
            this._stages[stageName].init();
        }

        /**
        * @param {string} stageName - Stage name for getting from stage dictionary
        * getting stege' if the stage was created before.
        */
        public getStage(stageName: StageNames): Core.Modules.Stage { //get stage if the stage was created before. 
            return this._stages[stageName];
        }

         /**
        * @param {string} stageName - Stage name for removing from stage dictionary
        * remove stage if the stage was created before.
        */
        public removeStage(stageName: string) {
            this._stages[stageName].dispose();
            this._stages[stageName].destroy({ children: true, baseTexture: true });
            delete this._stages[stageName];
        }

        /**
         * getting main container
        */
        public get stageContainer(): Modules.Container{
            return this._stageContainer;
        }
    }
}