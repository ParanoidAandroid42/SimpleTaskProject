
namespace Core.Controller {
    export class GameController {

        private _displayManager: Managers.DisplayManager;
        private _stageManager: Managers.StageManager;
        private _ticker: Managers.TickerManager;

        private _stats: Parts.StatElement;

        constructor() {
            //ticker for timer
            this._ticker = new Managers.TickerManager();
            //view of the game according to resolution 1280x720
            this._displayManager = new Managers.DisplayManager(GameInformation.DisplayResolution.width, GameInformation.DisplayResolution.height);
            //view of the stage according to resolution Display's Resolution
            this._stageManager = new Managers.StageManager(0, 0, this._displayManager.rendererContainer);
            //started to MainStage Stage
            this._stageManager.startStage(Stages.MainStage, StageNames.Menu);
            //stat is showing fps performance
            this._stats = new Parts.StatElement();
        }
    }
}