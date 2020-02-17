/// <reference path="container.ts" />
namespace Core.Modules {
    export abstract class Stage extends Modules.Container{
          /**
         * displaymanager constructor
         * @param {number} x - Stage's positionX
         * @param {number} y - Stage's positionY
         * @param {number} n - Stage's name
         * @param {number} p - Stage's parent
         */
        constructor(x?: number, y?: number, p?: PIXI.Container, n?: string) {
            super(x, y,p,n);
        }

        /**
         * running when loading stage
         * @param args - any arguments
         */
        public abstract init(...args: any[]): void; 

        /**
         * running when destroying stage
         */
        public abstract dispose(): void;
    }
}