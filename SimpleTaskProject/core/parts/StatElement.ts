module Core.Parts {
    export class StatElement {
        /**
         * running when loading class
         */
        public constructor() {
            //this is for fps container
            let stats: Stats = new Stats();
            document.body.appendChild(stats.domElement);
            function animate() {
                var time = performance.now() / 1000;
                stats.begin();
                stats.end();
                requestAnimationFrame(animate);
            }
            animate();
        }
    }
}