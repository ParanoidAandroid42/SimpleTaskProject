/// <reference path="../modules/stage.ts" />
namespace Core.Stages {
    export class MainStage extends Core.Modules.Stage {

        private _container: Modules.Container;

        private _firstTaskButton: Parts.ButtonText;
        private _secondTaskButton: Parts.ButtonText;
        private _thirdTaskButton: Parts.ButtonText;

         /** running when loading stage */
        public init() {

            /** create containers*/
            this._container = new Modules.Container(0, 0, this, "Container");

            /** create buttontexts*/
            this._firstTaskButton = new Parts.ButtonText(360, 360, 250, 130, GameInformation.FirstTaskButtonText, this.changeStage.bind(this, StageNames.FirstTask), this);
            this._secondTaskButton = new Parts.ButtonText(640, 360, 250, 130, GameInformation.SecondTaskButtonText, this.changeStage.bind(this, StageNames.SecondTask), this);
            this._thirdTaskButton = new Parts.ButtonText(920, 360, 250, 130, GameInformation.ThirdTaskButtonText, this.changeStage.bind(this, StageNames.ThirdTask), this);            
        }

        /**
         * change stage according to stagename
         * @param stage - stage name
         */
        private changeStage(stage: StageNames) {
            Managers.StageManager.instance.removeStage(StageNames.Menu);
            switch (stage) {
                case StageNames.FirstTask:
                    Managers.StageManager.instance.startStage(Stages.CardStack, stage);
                    break;
                case StageNames.SecondTask:
                    Managers.StageManager.instance.startStage(Stages.AssetTool, stage);
                    break;
                case StageNames.ThirdTask:
                    Managers.StageManager.instance.startStage(Stages.ShaderFireParticle, stage);
                    break;
            }
        }

        /** running when destroying stage*/
        public dispose() {
        }
    }
}