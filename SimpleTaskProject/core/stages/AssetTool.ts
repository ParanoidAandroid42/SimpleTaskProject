/// <reference path="../modules/stage.ts" />

namespace Core.Stages {

    enum RandomAssetType {
        Image,
        Text
    }

    export class AssetTool extends Core.Modules.Stage {

        private _container: Modules.Container;
        private _assetContainer: Modules.Container;
        private _menuButton: Parts.Button;

        private _assets: Array<Parts.Sprite|Parts.Text> =[];

        /** running when loading stage */
        public init() {

            /**create containers*/
            let width = Managers.DisplayManager.instance.width;
            let height = Managers.DisplayManager.instance.height;
            this._container = new Modules.Container(0, 0, this, "Container");
            this._assetContainer = new Modules.Container(640, 0, this, "AssetContainer");

            /**create buttons*/
            let callback: Function = Managers.StageManager.instance.backMenuButtonUp;
            this._menuButton = new Parts.Button(1245, 35, 70, 70, GameInformation.MenuButton, callback.bind(this, this.name), this._container);

            // loop = true - every 2 ( CreateAssetDuration) seconds
            let duration = GameInformation.CreateAssetDuration;
            let loop = true;
            Managers.TickerManager.instance.addTimeout("RandomAsset", duration, this.createRandomAssets.bind(this, 0), loop);
            this.createRandomAssets(0);
        }

        /**
         * create asset
         * @param index - asset counter 
         */
        private createRandomAssets(index: number) {
            index == 0 && this.removeAsset();
            //random asset type's length
            let randomAssetTypeLen = Object.keys(RandomAssetType).length/2;
            let randomAssetType = Math.floor(Math.random() * randomAssetTypeLen + 0);
            let object: Parts.Sprite | Parts.Text;
            switch (randomAssetType) {
                case RandomAssetType.Image:
                    object = new Parts.Sprite(100, 100, 100, 150, GameInformation.CardSprite, this._assetContainer);
                    break;
                case RandomAssetType.Text:
                    //make dublicate of object, therefore GameInformation.GenericText config is not change
                    let textConfig: Interfaces.ITextConfig = JSON.parse(JSON.stringify(GameInformation.GenericText)); 
                    //set random font size
                    textConfig.textStyle.fontSize = Math.floor(Math.random() * 50 + 10)
                    object = new Parts.Text(100, 100, textConfig, this._assetContainer);
                    break;
            }

            this.addAsset(index,object);
            index++;
            
            if (index < GameInformation.RandomAssetCounter) {
                this.createRandomAssets(index);
                return;
            }
            //update asset container's position according center
            this._assetContainer.position.x = 640 - this._assetContainer.width / 2;
        }

        /**
         * add asset to asset array
         * @param index - asset index
         * @param object - object ( Parts.Sprite | Parts.Text)
         */
        private addAsset(index: number, object: Parts.Sprite | Parts.Text) {
            let offset;
            let previousAsset = this._assets[index - 1];
            previousAsset ? offset = previousAsset.position.x + previousAsset.width / 2 : offset = 0;
            let x = object.width / 2 + offset;
            object.position.set(x, 360);
            this._assets.push(object);
        }

        /**
         * remove asset from asset array
         */
        private removeAsset() {
            this._assetContainer.removeChildren();
            this._assets = [];
        }

        /** * running when destroying stage*/
        public dispose() {
            Managers.TickerManager.instance.removeTicker("RandomAsset");
        }

        public get container() {
            return this._container;
        }
    }
}