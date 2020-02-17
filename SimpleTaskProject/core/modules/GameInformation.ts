namespace Core {

    /** Stage Names enum*/
    export enum StageNames {
        Menu = "MainStage",
        FirstTask = "FirstTask",
        SecondTask = "SecondTaskStage",
        ThirdTask = "ThirdTaskStage"
    }

    export class GameInformation {

        /**(this game engine's DisplayResolution = 1280x720)*/
        static DisplayResolution = {
            /* DisplayResolution widht */
            width: 1280,
            /* DisplayResolution height */
            height : 720
        }

        /** card sprite's config */
        static CardSprite: Interfaces.ISpriteConfig = {
            frame: "card",
            name: "card"       
        }

        /**wood sprite's config */
        static WoodSPrite: Interfaces.ISpriteConfig = {
            frame: "fire/wood",
            name: "wood"
        }

        /**general button's config*/
        static GeneralButton: Interfaces.IButtonConfig = {
            frames: {                
                out: "generalbutton_out",
                over: "generalbutton_over",
                down: "generalbutton_down",
                disabled: "generalbutton_disabled"
            },
            name : "generalButton"
        }

        /** general text's style*/
        static GeneralTextStyle: PIXI.TextStyleOptions = {
            fontFamily: "Montserrat, sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
            fill: "#d08f38",
            stroke: 0x000000,
            strokeThickness: 3,
            align: "center"
        }

        /** generic text's config*/
        static GenericText: Interfaces.ITextConfig = {
            text: "Generic Text",
            textStyle: GameInformation.GeneralTextStyle,
            name: "Generic Text"
        }

        /** restart text's config*/
        static RestartText: Interfaces.ITextConfig = {
            text: "Restart",
            textStyle: GameInformation.GeneralTextStyle,
            name : "Restart Text"
        }

        /** play text's config */
        static PlayText: Interfaces.ITextConfig = {
            text: "Play",
            textStyle: GameInformation.GeneralTextStyle,
            name: "Play Text"
        }

        /**first task text's config*/
        static FirstTaskText: Interfaces.ITextConfig = {
            text: "First Task",
            textStyle: GameInformation.GeneralTextStyle,
            name: "First Text"
        }

        /**second task text's config*/
        static SecondTaskText: Interfaces.ITextConfig = {
            text: "Second Task",
            textStyle: GameInformation.GeneralTextStyle,
            name: "Second Text"
        }

        /** third task text's config*/
        static ThirdTaskText: Interfaces.ITextConfig = {
            text: "Third Task",
            textStyle: GameInformation.GeneralTextStyle,
            name: "Third Text"
        }

        /** menu text's config*/
        static MenuText: Interfaces.ITextConfig = {
            text: "Menu",
            textStyle: GameInformation.GeneralTextStyle,
            name: "Menu Text"
        }

        /** restart button text's config*/
        static CardButtonText: Interfaces.IButtonTextConfig = {
            bConfig: GameInformation.GeneralButton,
            tConfig: GameInformation.PlayText,           
            name: "Restart Button Text",
        }

        /**restart button text's config*/
        static MenuButton: Interfaces.IButtonConfig = {
            frames: {
                out: "home_out",
                over: "home_over",
                down: "home_down",
                disabled: "home_disabled"
            },
            name: "Menu Button"
        }

        /** first task button text's config*/
        static FirstTaskButtonText: Interfaces.IButtonTextConfig = {
            bConfig: GameInformation.GeneralButton,
            tConfig: GameInformation.FirstTaskText,
            name: "First Task Button Text",
        }

        /** second task button text's config*/
        static SecondTaskButtonText: Interfaces.IButtonTextConfig = {
            bConfig: GameInformation.GeneralButton,
            tConfig: GameInformation.SecondTaskText,
            name: "First Task Button Text",
        }

        /** third task button text's config*/
        static ThirdTaskButtonText: Interfaces.IButtonTextConfig = {
            bConfig: GameInformation.GeneralButton,
            tConfig: GameInformation.ThirdTaskText,
            name: "Third Task Button Text",
        }

        /**card counter for create cards */
        static CardCounter = 144;
        /**offset duration of card animation */
        static CardAnimationDurationOffset = 1;
         /**duration of card animation */
        static CardAnimationDuration = 2;
        /**random asset counter for task2 mission */
        static RandomAssetCounter = 3;
        /**duration of create asset */
        static CreateAssetDuration = 2;


        /**fire general emitter */
        static fireGeneralEmitter = {
            "alpha": {
                "start": 1,
                "end": 0
            },
            "scale": {
                "start": 1.4,
                "end": 2.2,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#d18726",
                "end": "#333231"
            },
            "speed": {
                "start": 100,
                "end": 100,
                "minimumSpeedMultiplier": 0.5
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 2,
            "startRotation": {
                "min": -110,
                "max": -70
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": .5,
                "max": .5
            },
            "blendMode": "normal",
            "frequency": 0.021,
            "emitterLifetime": -0.01,
            "maxParticles": 130,
            "pos": {
                "x": 0,
                "y": -8
            },
            "addAtBack": true,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 5
            }
        }
        /**fire spark emitter */
        static fireSparkEmitter = {
            "alpha": {
                "start": 1,
                "end": 0
            },
            "scale": {
                "start": 0.1,
                "end": 0.1,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#47150b",
                "end": "#333231"
            },
            "speed": {
                "start": 100,
                "end": 100,
                "minimumSpeedMultiplier": 0.5
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 2,
            "startRotation": {
                "min": -110,
                "max": -70
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 2,
                "max": 2
            },
            "blendMode": "normal",
            "frequency": 0.021,
            "emitterLifetime": -0.01,
            "maxParticles": 30,
            "pos": {
                "x": 0,
                "y": -8
            },
            "addAtBack": true,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 5
            }
        }

        static fireGlowEmitter = {
            "alpha": {
                "start": .25,
                "end": 0
            },
            "scale": {
                "start": 1,
                "end": 1.4,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "0xa41e1e",
                "end": "0xa41e1e"
            },
            "speed": {
                "start": 100,
                "end": 100,
                "minimumSpeedMultiplier": 0.5
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 2,
            "startRotation": {
                "min": -110,
                "max": -70
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 1,
                "max": 1
            },
            "blendMode": "normal",
            "frequency": 0.021,
            "emitterLifetime": -0.01,
            "maxParticles": 130,
            "pos": {
                "x": 0,
                "y": -8
            },
            "addAtBack": true,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 5
            }
        }        
    }
}