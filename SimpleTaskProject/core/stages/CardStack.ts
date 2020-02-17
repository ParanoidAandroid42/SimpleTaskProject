/// <reference path="../modules/stage.ts" />
namespace Core.Stages {

    export class CardStack extends Core.Modules.Stage {

        private _container: Modules.Container;
        private _cards: Parts.Sprite[] = [];
        private _displayWidth = Managers.DisplayManager.instance.width;
        private _displayHeight = Managers.DisplayManager.instance.height;

        private _animationTimeline: TimelineMax = new TimelineMax({paused : true});
        private _cardButtonText: Parts.ButtonText;
        private _menuButton: Parts.Button;
        private _restart: boolean = false;

        /**  running when loading stage */
        public init() {

            /**create containers*/
            this._container = new Modules.Container(0, 0, this, "Container");

            /**create buttons*/
            this._cardButtonText = new Parts.ButtonText(640, 654, 200, 100, GameInformation.CardButtonText, this.cardButtonUp.bind(this), this._container);
            this._cardButtonText.isEnabled = false;
            let callback: Function = Managers.StageManager.instance.backMenuButtonUp;
            this._menuButton = new Parts.Button(1245, 35, 70, 70, GameInformation.MenuButton, callback.bind(this, this.name), this._container);
            /**create cards*/
          //  PIXI.utils.TextureCache["card"];
            this.createCardAssets(0, GameInformation.CardCounter); //0 = first index for card sprites 
        }

        /**running when card button up*/
        private cardButtonUp() {
            this._restart = !this._restart;
            if (this._restart) {
                //change text to restart text
                this._cardButtonText.textAsset.setTextConfig(GameInformation.RestartText);
                this._animationTimeline.play();
            } else {
                //change text to play text
                this._cardButtonText.textAsset.setTextConfig(GameInformation.PlayText);
                this._animationTimeline.restart();
                this._animationTimeline.paused(true);
            }
        }

         /** playanimation function is recoursive
          * @param {number} index - Creating index of Card Sprites. (First index = 0 )
          */
        private playAnimation(index: number) {
            let yOffset = index * 1.5; // for deep of card    
            this._animationTimeline.to(this._cards[index], GameInformation.CardAnimationDuration, {
                x: (5 / 6) * this._displayWidth, y: this._displayHeight / 3 + yOffset, onStart: () => {
                    this._container.addChild(this._cards[index]);
                }
            }, "+=" + GameInformation.CardAnimationDurationOffset);   
        }

         /** createCardAssets function is recoursive
          * @param {number} counter - Card Counter. Getting cardcounter from styleinformation. (This Game's card counter = 144.)
          * @param {number} index - Creating index of Card Sprites. (First index = 0 )
          */
        private createCardAssets(index: number, counter: number) {
            let x, y;
            x = this._displayWidth / 6;
            y = this._displayHeight / 3;
            let card: Parts.Sprite = new Parts.Sprite(x, y, 196, 281, GameInformation.CardSprite, this._container);
            this._cards.push(card);
            this._container.addChild(card);
            index++;
            index < counter && this.createCardAssets(index, counter);
            this._cardButtonText.isEnabled = true;
            this.playAnimation(index - 1);  //so at the end of whole process I should have reversed stack
        }

        /** running when destroying stage*/
        public dispose() {
            this._animationTimeline.kill();
        }

        public get container() {
            return this._container;
        }
    }
}