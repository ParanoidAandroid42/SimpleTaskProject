var Core;
(function (Core) {
    var Controller;
    (function (Controller) {
        var GameController = (function () {
            function GameController() {
                this._ticker = new Core.Managers.TickerManager();
                this._displayManager = new Core.Managers.DisplayManager(Core.GameInformation.DisplayResolution.width, Core.GameInformation.DisplayResolution.height);
                this._stageManager = new Core.Managers.StageManager(0, 0, this._displayManager.rendererContainer);
                this._stageManager.startStage(Core.Stages.MainStage, Core.StageNames.Menu);
                this._stats = new Core.Parts.StatElement();
            }
            return GameController;
        }());
        Controller.GameController = GameController;
    })(Controller = Core.Controller || (Core.Controller = {}));
})(Core || (Core = {}));
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Core;
(function (Core) {
    var Managers;
    (function (Managers) {
        var DisplayManager = (function (_super) {
            __extends(DisplayManager, _super);
            function DisplayManager(w, h) {
                var _this = _super.call(this) || this;
                DisplayManager.instance = _this;
                _this.initProperties(w, h);
                return _this;
            }
            DisplayManager.prototype.initProperties = function (w, h) {
                var app = new PIXI.Application(w, h, { backgroundColor: 0x000000 });
                app.renderer.view.id = "videoslot";
                document.body.appendChild(app.view);
                this._rendererContainer = app.stage;
                this._renderer = app.renderer;
                this._width = w;
                this._height = h;
                document.body.ontouchend = this.onFullscreenChange.bind(this);
                document.body.onclick = this.onFullscreenChange.bind(this);
            };
            DisplayManager.prototype.onFullscreenChange = function () {
                var elem = document.documentElement;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                }
                else if (elem["mozRequestFullScreen"]) {
                    elem["mozRequestFullScreen"]();
                }
                else if (elem["webkitRequestFullscreen"]) {
                    elem["webkitRequestFullscreen"]();
                }
                else if (elem["msRequestFullscreen"]) {
                    elem["msRequestFullscreen"]();
                }
            };
            Object.defineProperty(DisplayManager.prototype, "renderer", {
                get: function () {
                    return this._renderer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayManager.prototype, "rendererContainer", {
                get: function () {
                    return this._rendererContainer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayManager.prototype, "width", {
                get: function () {
                    return this._width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayManager.prototype, "height", {
                get: function () {
                    return this._height;
                },
                enumerable: true,
                configurable: true
            });
            return DisplayManager;
        }(PIXI.utils.EventEmitter));
        Managers.DisplayManager = DisplayManager;
    })(Managers = Core.Managers || (Core.Managers = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Managers;
    (function (Managers) {
        var ResourceManager = (function () {
            function ResourceManager() {
                this.initProperties();
            }
            ResourceManager.prototype.initProperties = function () {
                this._loader = new PIXI.loaders.Loader();
                this._loader.add("assets/sprites/ui.json");
                this._loader.add("particle", "assets/sprites/particle.png");
                this._loader.load();
                this._loader.onProgress.add(this.onProgress.bind(this));
                this._loader.onError.add(this.onError.bind(this));
                this._loader.onLoad.add(this.onLoad.bind(this));
                this._loader.onComplete.add(this.onComplete.bind(this));
            };
            ResourceManager.prototype.onError = function () {
            };
            ResourceManager.prototype.onLoad = function () {
            };
            ResourceManager.prototype.onComplete = function () {
                new Core.Controller.GameController();
            };
            ResourceManager.prototype.onProgress = function () {
            };
            return ResourceManager;
        }());
        Managers.ResourceManager = ResourceManager;
    })(Managers = Core.Managers || (Core.Managers = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Managers;
    (function (Managers) {
        var StageManager = (function () {
            function StageManager(x, y, p) {
                this._stages = {};
                StageManager.instance = this;
                this._stageContainer = new Core.Modules.Container(x, y, p, "StageContainer");
            }
            StageManager.prototype.createStage = function (stage, stageName) {
                if (this._stages[stageName] == null) {
                    this._stages[stageName] = new stage();
                    this._stages[stageName].name = stageName;
                    this._stageContainer.addChild(this._stages[stageName]);
                }
            };
            StageManager.prototype.backMenuButtonUp = function (name) {
                Managers.StageManager.instance.removeStage(name);
                Managers.StageManager.instance.startStage(Core.Stages.MainStage, Core.StageNames.Menu);
            };
            StageManager.prototype.startStage = function (stage, stageName) {
                this.createStage(stage, stageName);
                this._stages[stageName].init();
            };
            StageManager.prototype.getStage = function (stageName) {
                return this._stages[stageName];
            };
            StageManager.prototype.removeStage = function (stageName) {
                this._stages[stageName].dispose();
                this._stages[stageName].destroy({ children: true, baseTexture: true });
                delete this._stages[stageName];
            };
            Object.defineProperty(StageManager.prototype, "stageContainer", {
                get: function () {
                    return this._stageContainer;
                },
                enumerable: true,
                configurable: true
            });
            return StageManager;
        }());
        Managers.StageManager = StageManager;
    })(Managers = Core.Managers || (Core.Managers = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Managers;
    (function (Managers) {
        var TickerManager = (function (_super) {
            __extends(TickerManager, _super);
            function TickerManager() {
                var _this = _super.call(this) || this;
                _this._tickers = {};
                TickerManager.instance = _this;
                return _this;
            }
            TickerManager.prototype.addTimeout = function (key, duration, callback, loop) {
                if (!this._tickers[key]) {
                    var ticker = new PIXI.ticker.Ticker();
                    ticker.autoStart = true;
                    this._tickers[key] = ticker;
                    this._gTime = (new Date()).getTime();
                    this._tickers[key].add(this.addLoop.bind(this, key, duration, callback, loop));
                }
            };
            TickerManager.prototype.addLoop = function (key, duration, callback, loop) {
                var g_TICK = duration * 1000;
                var timeNow = (new Date()).getTime();
                var timeDiff = timeNow - this._gTime;
                if (timeDiff < g_TICK) {
                    return;
                }
                callback.call("", this);
                if (loop) {
                    this._gTime = (new Date()).getTime();
                }
                else {
                    this._tickers[key].remove(this.addLoop.bind(this));
                }
            };
            TickerManager.prototype.removeTicker = function (key) {
                this._tickers[key].destroy();
                delete this._tickers[key];
            };
            Object.defineProperty(TickerManager.prototype, "tickers", {
                get: function () {
                    return this._tickers;
                },
                enumerable: true,
                configurable: true
            });
            return TickerManager;
        }(PIXI.ticker.Ticker));
        Managers.TickerManager = TickerManager;
    })(Managers = Core.Managers || (Core.Managers = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Container = (function (_super) {
            __extends(Container, _super);
            function Container(x, y, p, n) {
                var _this = _super.call(this) || this;
                if (n)
                    _this.name = n;
                if (p)
                    p.addChild(_this);
                if (x)
                    _this.position.x = x;
                if (y)
                    _this.position.y = y;
                return _this;
            }
            Container.prototype.sortChildren = function () {
                this.children.sort(function (a, b) {
                    a.zIndex = a.zIndex || 0;
                    b.zIndex = b.zIndex || 0;
                    return a.zIndex - b.zIndex;
                });
            };
            return Container;
        }(PIXI.Container));
        Modules.Container = Container;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var StageNames;
    (function (StageNames) {
        StageNames["Menu"] = "MainStage";
        StageNames["FirstTask"] = "FirstTask";
        StageNames["SecondTask"] = "SecondTaskStage";
        StageNames["ThirdTask"] = "ThirdTaskStage";
    })(StageNames = Core.StageNames || (Core.StageNames = {}));
    var GameInformation = (function () {
        function GameInformation() {
        }
        GameInformation.DisplayResolution = {
            width: 1280,
            height: 720
        };
        GameInformation.CardSprite = {
            frame: "card",
            name: "card"
        };
        GameInformation.WoodSPrite = {
            frame: "fire/wood",
            name: "wood"
        };
        GameInformation.GeneralButton = {
            frames: {
                out: "generalbutton_out",
                over: "generalbutton_over",
                down: "generalbutton_down",
                disabled: "generalbutton_disabled"
            },
            name: "generalButton"
        };
        GameInformation.GeneralTextStyle = {
            fontFamily: "Montserrat, sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
            fill: "#d08f38",
            stroke: 0x000000,
            strokeThickness: 3,
            align: "center"
        };
        GameInformation.GenericText = {
            text: "Generic Text",
            textStyle: GameInformation.GeneralTextStyle,
            name: "Generic Text"
        };
        GameInformation.RestartText = {
            text: "Restart",
            textStyle: GameInformation.GeneralTextStyle,
            name: "Restart Text"
        };
        GameInformation.PlayText = {
            text: "Play",
            textStyle: GameInformation.GeneralTextStyle,
            name: "Play Text"
        };
        GameInformation.FirstTaskText = {
            text: "First Task",
            textStyle: GameInformation.GeneralTextStyle,
            name: "First Text"
        };
        GameInformation.SecondTaskText = {
            text: "Second Task",
            textStyle: GameInformation.GeneralTextStyle,
            name: "Second Text"
        };
        GameInformation.ThirdTaskText = {
            text: "Third Task",
            textStyle: GameInformation.GeneralTextStyle,
            name: "Third Text"
        };
        GameInformation.MenuText = {
            text: "Menu",
            textStyle: GameInformation.GeneralTextStyle,
            name: "Menu Text"
        };
        GameInformation.CardButtonText = {
            bConfig: GameInformation.GeneralButton,
            tConfig: GameInformation.PlayText,
            name: "Restart Button Text",
        };
        GameInformation.MenuButton = {
            frames: {
                out: "home_out",
                over: "home_over",
                down: "home_down",
                disabled: "home_disabled"
            },
            name: "Menu Button"
        };
        GameInformation.FirstTaskButtonText = {
            bConfig: GameInformation.GeneralButton,
            tConfig: GameInformation.FirstTaskText,
            name: "First Task Button Text",
        };
        GameInformation.SecondTaskButtonText = {
            bConfig: GameInformation.GeneralButton,
            tConfig: GameInformation.SecondTaskText,
            name: "First Task Button Text",
        };
        GameInformation.ThirdTaskButtonText = {
            bConfig: GameInformation.GeneralButton,
            tConfig: GameInformation.ThirdTaskText,
            name: "Third Task Button Text",
        };
        GameInformation.CardCounter = 144;
        GameInformation.CardAnimationDurationOffset = 1;
        GameInformation.CardAnimationDuration = 2;
        GameInformation.RandomAssetCounter = 3;
        GameInformation.CreateAssetDuration = 2;
        GameInformation.fireGeneralEmitter = {
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
        };
        GameInformation.fireSparkEmitter = {
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
        };
        GameInformation.fireGlowEmitter = {
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
        };
        return GameInformation;
    }());
    Core.GameInformation = GameInformation;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Stage = (function (_super) {
            __extends(Stage, _super);
            function Stage(x, y, p, n) {
                return _super.call(this, x, y, p, n) || this;
            }
            return Stage;
        }(Modules.Container));
        Modules.Stage = Stage;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Parts;
    (function (Parts) {
        var ButtonStates;
        (function (ButtonStates) {
            ButtonStates["Disabled"] = "Disabled";
            ButtonStates["Down"] = "Down";
            ButtonStates["Out"] = "Out";
            ButtonStates["Over"] = "Over";
        })(ButtonStates = Parts.ButtonStates || (Parts.ButtonStates = {}));
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(x, y, w, h, c, cB, p) {
                var _this = _super.call(this) || this;
                _this._frames = null;
                _this._state = ButtonStates.Out;
                _this._callback = null;
                _this._isEnabled = true;
                _this._zIndex = 0;
                _this.width = w;
                _this.height = h;
                _this.anchor.set(0.5, 0.5);
                _this.position.set(x, y);
                _this.buttonMode = true;
                _this.interactive = true;
                _this._frames = c.frames;
                _this._callback = cB;
                c.name ? _this.name = c.name : _this.name = "button";
                p && p.addChild(_this);
                _this.state = ButtonStates.Out;
                _this.initEvent();
                return _this;
            }
            Button.prototype.initEvent = function () {
                this.on('pointerdown', this.onButtonDown);
                this.on('pointerup', this.onButtonUp);
                this.on('pointerover', this.onButtonOver);
                this.on('pointerout', this.onButtonOut);
                this.on('pointertap', this.onButtonOut);
            };
            Button.prototype.onButtonDown = function () {
                this.state = ButtonStates.Down;
            };
            Button.prototype.onButtonUp = function () {
                this._callback.call("", this);
            };
            Button.prototype.onButtonOver = function () {
                this.state = ButtonStates.Over;
            };
            Button.prototype.onButtonOut = function () {
                this.state = ButtonStates.Out;
            };
            Object.defineProperty(Button.prototype, "state", {
                set: function (state) {
                    this._state = state;
                    switch (state) {
                        case ButtonStates.Out:
                            this.texture = PIXI.Texture.fromFrame(this._frames.out);
                            break;
                        case ButtonStates.Over:
                            this.texture = PIXI.Texture.fromFrame(this._frames.over);
                            break;
                        case ButtonStates.Down:
                            this.texture = PIXI.Texture.fromFrame(this._frames.down);
                            break;
                        case ButtonStates.Disabled:
                            this.texture = PIXI.Texture.fromFrame(this._frames.disabled);
                            break;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Button.prototype, "isEnabled", {
                set: function (enable) {
                    this._isEnabled = enable;
                    if (!this._isEnabled) {
                        this.state = ButtonStates.Disabled;
                    }
                    else {
                        this.state = ButtonStates.Out;
                    }
                    this.interactive = enable;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Button.prototype, "zIndex", {
                get: function () {
                    return this._zIndex;
                },
                set: function (zIndex) {
                    this._zIndex = zIndex;
                },
                enumerable: true,
                configurable: true
            });
            return Button;
        }(PIXI.Sprite));
        Parts.Button = Button;
    })(Parts = Core.Parts || (Core.Parts = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Parts;
    (function (Parts) {
        var ButtonText = (function (_super) {
            __extends(ButtonText, _super);
            function ButtonText(x, y, w, h, c, cB, p) {
                var _this = _super.call(this, x, y, w, h, c.bConfig, cB, p) || this;
                _this._text = new Parts.Text(0, 0, c.tConfig, _this);
                if (c.name)
                    _this.name = c.name;
                return _this;
            }
            Object.defineProperty(ButtonText.prototype, "textAsset", {
                get: function () {
                    return this._text;
                },
                enumerable: true,
                configurable: true
            });
            return ButtonText;
        }(Parts.Button));
        Parts.ButtonText = ButtonText;
    })(Parts = Core.Parts || (Core.Parts = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Parts;
    (function (Parts) {
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            function Sprite(x, y, w, h, c, p) {
                var _this = _super.call(this, PIXI.utils.TextureCache[c.frame]) || this;
                _this._zIndex = 0;
                PIXI.Texture.addTextureToCache[c.frame];
                _this.width = w;
                _this.height = h;
                c.name ? _this.name = c.name : _this.name = "button";
                _this.anchor.set(0.5, 0.5);
                _this.position.set(x, y);
                p && p.addChild(_this);
                return _this;
            }
            Object.defineProperty(Sprite.prototype, "zIndex", {
                get: function () {
                    return this._zIndex;
                },
                set: function (zIndex) {
                    this._zIndex = zIndex;
                },
                enumerable: true,
                configurable: true
            });
            return Sprite;
        }(PIXI.Sprite));
        Parts.Sprite = Sprite;
    })(Parts = Core.Parts || (Core.Parts = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Parts;
    (function (Parts) {
        var SpriteText = (function (_super) {
            __extends(SpriteText, _super);
            function SpriteText(x, y, w, h, c, p) {
                var _this = _super.call(this, x, y, w, h, c.sConfig, p) || this;
                _this._text = new Parts.Text(0, 0, c.tConfig, _this);
                if (c.name)
                    _this.name = c.name;
                return _this;
            }
            Object.defineProperty(SpriteText.prototype, "textAsset", {
                get: function () {
                    return this._text;
                },
                enumerable: true,
                configurable: true
            });
            return SpriteText;
        }(Parts.Sprite));
        Parts.SpriteText = SpriteText;
    })(Parts = Core.Parts || (Core.Parts = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Parts;
    (function (Parts) {
        var StatElement = (function () {
            function StatElement() {
                var stats = new Stats();
                document.body.appendChild(stats.domElement);
                function animate() {
                    var time = performance.now() / 1000;
                    stats.begin();
                    stats.end();
                    requestAnimationFrame(animate);
                }
                animate();
            }
            return StatElement;
        }());
        Parts.StatElement = StatElement;
    })(Parts = Core.Parts || (Core.Parts = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Parts;
    (function (Parts) {
        var Text = (function (_super) {
            __extends(Text, _super);
            function Text(x, y, c, p) {
                var _this = _super.call(this, c.text, c.textStyle) || this;
                if (c.name)
                    _this.name = c.name;
                _this.position.set(x, y);
                _this.anchor.set(.5, .5);
                p && p.addChild(_this);
                return _this;
            }
            Text.prototype.setTextConfig = function (config) {
                this.style = new PIXI.TextStyle(config.textStyle);
                this.text = config.text;
            };
            return Text;
        }(PIXI.Text));
        Parts.Text = Text;
    })(Parts = Core.Parts || (Core.Parts = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Stages;
    (function (Stages) {
        var CardStack = (function (_super) {
            __extends(CardStack, _super);
            function CardStack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._cards = [];
                _this._displayWidth = Core.Managers.DisplayManager.instance.width;
                _this._displayHeight = Core.Managers.DisplayManager.instance.height;
                _this._animationTimeline = new TimelineMax({ paused: true });
                _this._restart = false;
                return _this;
            }
            CardStack.prototype.init = function () {
                this._container = new Core.Modules.Container(0, 0, this, "Container");
                this._cardButtonText = new Core.Parts.ButtonText(640, 654, 200, 100, Core.GameInformation.CardButtonText, this.cardButtonUp.bind(this), this._container);
                this._cardButtonText.isEnabled = false;
                var callback = Core.Managers.StageManager.instance.backMenuButtonUp;
                this._menuButton = new Core.Parts.Button(1245, 35, 70, 70, Core.GameInformation.MenuButton, callback.bind(this, this.name), this._container);
                this.createCardAssets(0, Core.GameInformation.CardCounter);
            };
            CardStack.prototype.cardButtonUp = function () {
                this._restart = !this._restart;
                if (this._restart) {
                    this._cardButtonText.textAsset.setTextConfig(Core.GameInformation.RestartText);
                    this._animationTimeline.play();
                }
                else {
                    this._cardButtonText.textAsset.setTextConfig(Core.GameInformation.PlayText);
                    this._animationTimeline.restart();
                    this._animationTimeline.paused(true);
                }
            };
            CardStack.prototype.playAnimation = function (index) {
                var _this = this;
                var yOffset = index * 1.5;
                this._animationTimeline.to(this._cards[index], Core.GameInformation.CardAnimationDuration, {
                    x: (5 / 6) * this._displayWidth, y: this._displayHeight / 3 + yOffset, onStart: function () {
                        _this._container.addChild(_this._cards[index]);
                    }
                }, "+=" + Core.GameInformation.CardAnimationDurationOffset);
            };
            CardStack.prototype.createCardAssets = function (index, counter) {
                var x, y;
                x = this._displayWidth / 6;
                y = this._displayHeight / 3;
                var card = new Core.Parts.Sprite(x, y, 196, 281, Core.GameInformation.CardSprite, this._container);
                this._cards.push(card);
                this._container.addChild(card);
                index++;
                index < counter && this.createCardAssets(index, counter);
                this._cardButtonText.isEnabled = true;
                this.playAnimation(index - 1);
            };
            CardStack.prototype.dispose = function () {
                this._animationTimeline.kill();
            };
            Object.defineProperty(CardStack.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: true,
                configurable: true
            });
            return CardStack;
        }(Core.Modules.Stage));
        Stages.CardStack = CardStack;
    })(Stages = Core.Stages || (Core.Stages = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Stages;
    (function (Stages) {
        var MainStage = (function (_super) {
            __extends(MainStage, _super);
            function MainStage() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MainStage.prototype.init = function () {
                this._container = new Core.Modules.Container(0, 0, this, "Container");
                this._firstTaskButton = new Core.Parts.ButtonText(360, 360, 250, 130, Core.GameInformation.FirstTaskButtonText, this.changeStage.bind(this, Core.StageNames.FirstTask), this);
                this._secondTaskButton = new Core.Parts.ButtonText(640, 360, 250, 130, Core.GameInformation.SecondTaskButtonText, this.changeStage.bind(this, Core.StageNames.SecondTask), this);
                this._thirdTaskButton = new Core.Parts.ButtonText(920, 360, 250, 130, Core.GameInformation.ThirdTaskButtonText, this.changeStage.bind(this, Core.StageNames.ThirdTask), this);
            };
            MainStage.prototype.changeStage = function (stage) {
                Core.Managers.StageManager.instance.removeStage(Core.StageNames.Menu);
                switch (stage) {
                    case Core.StageNames.FirstTask:
                        Core.Managers.StageManager.instance.startStage(Stages.CardStack, stage);
                        break;
                    case Core.StageNames.SecondTask:
                        Core.Managers.StageManager.instance.startStage(Stages.AssetTool, stage);
                        break;
                    case Core.StageNames.ThirdTask:
                        Core.Managers.StageManager.instance.startStage(Stages.ShaderFireParticle, stage);
                        break;
                }
            };
            MainStage.prototype.dispose = function () {
            };
            return MainStage;
        }(Core.Modules.Stage));
        Stages.MainStage = MainStage;
    })(Stages = Core.Stages || (Core.Stages = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Stages;
    (function (Stages) {
        var ShaderFireParticle = (function (_super) {
            __extends(ShaderFireParticle, _super);
            function ShaderFireParticle() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ShaderFireParticle.prototype.init = function () {
                var _this = this;
                var w, h;
                w = Core.Managers.DisplayManager.instance.width;
                h = Core.Managers.DisplayManager.instance.height;
                this._container = new Core.Modules.Container(0, 0, this, "Container");
                this._woodSprite = new Core.Parts.Sprite(722, 613, 200, 75, Core.GameInformation.WoodSPrite, this._container);
                this._particleContainer = new Core.Modules.Container(718, 607, this._container, "ParticleContainer");
                this._particleContainer.scale.set(2, 2);
                this._particleFogContainer = new Core.Modules.Container(0, -25, this._particleContainer, "particleFogContainer");
                this._particleSparksContainer = new Core.Modules.Container(0, -45, this._particleContainer, "particleSparksContainer");
                this._particleSparksContainer.scale.set(2, 1);
                this._particleGlowContainer = new Core.Modules.Container(0, 0, this._particleContainer, "particleGlowContainer");
                this._particleAddContainer = new Core.Modules.Container(0, 0, this._particleContainer, "particleAddContainer");
                var callback = Core.Managers.StageManager.instance.backMenuButtonUp;
                this._menuButton = new Core.Parts.Button(1245, 35, 70, 70, Core.GameInformation.MenuButton, callback.bind(this, this.name), this._container);
                this._fEmitter = new PIXI.particles.Emitter(this._particleFogContainer, ["fire/fire01", "fire/fire02", "fire/fire03"], Core.GameInformation.fireGeneralEmitter);
                this._fEmitter.maxParticles = 10;
                this._gEmitter = new PIXI.particles.Emitter(this._particleGlowContainer, ["fire/fire01", "fire/fire02", "fire/fire03"], Core.GameInformation.fireGlowEmitter);
                this._gEmitter.maxParticles = 10;
                this._aEmitter = new PIXI.particles.Emitter(this._particleAddContainer, ["fire/fire01", "fire/fire02", "fire/fire03"], Core.GameInformation.fireGeneralEmitter);
                this._aEmitter.maxParticles = 20;
                this._sEmitter = new PIXI.particles.Emitter(this._particleSparksContainer, "particle", Core.GameInformation.fireSparkEmitter);
                this._sEmitter.maxParticles = 10;
                var elapsed = Date.now();
                this._aEmitter.particleBlendMode = 1;
                this._aEmitter.update(1);
                var particle = PIXI.Texture.fromFrame("particle");
                var simpleLightFilterBlack = new PIXI.filters.SimpleLightmapFilter(particle, 0x0);
                var simpleLightFilterSunshine = new PIXI.filters.SimpleLightmapFilter(particle, 0xca7e40);
                this._woodSprite.filters = [simpleLightFilterSunshine, simpleLightFilterBlack];
                PIXI.ticker.shared.add(function (deltatime) {
                    _this._fEmitter.update((Date.now() - elapsed) * 0.0008);
                    _this._gEmitter.update((Date.now() - elapsed) * 0.0008);
                    _this._aEmitter.update((Date.now() - elapsed) * 0.0008);
                    _this._sEmitter.update((Date.now() - elapsed) * 0.0008);
                    elapsed = Date.now();
                }, this);
            };
            ShaderFireParticle.prototype.dispose = function () {
                this._fEmitter.destroy();
                this._gEmitter.destroy();
                this._aEmitter.destroy();
                this._sEmitter.destroy();
            };
            Object.defineProperty(ShaderFireParticle.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: true,
                configurable: true
            });
            return ShaderFireParticle;
        }(Core.Modules.Stage));
        Stages.ShaderFireParticle = ShaderFireParticle;
    })(Stages = Core.Stages || (Core.Stages = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Stages;
    (function (Stages) {
        var RandomAssetType;
        (function (RandomAssetType) {
            RandomAssetType[RandomAssetType["Image"] = 0] = "Image";
            RandomAssetType[RandomAssetType["Text"] = 1] = "Text";
        })(RandomAssetType || (RandomAssetType = {}));
        var AssetTool = (function (_super) {
            __extends(AssetTool, _super);
            function AssetTool() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._assets = [];
                return _this;
            }
            AssetTool.prototype.init = function () {
                var width = Core.Managers.DisplayManager.instance.width;
                var height = Core.Managers.DisplayManager.instance.height;
                this._container = new Core.Modules.Container(0, 0, this, "Container");
                this._assetContainer = new Core.Modules.Container(640, 0, this, "AssetContainer");
                var callback = Core.Managers.StageManager.instance.backMenuButtonUp;
                this._menuButton = new Core.Parts.Button(1245, 35, 70, 70, Core.GameInformation.MenuButton, callback.bind(this, this.name), this._container);
                var duration = Core.GameInformation.CreateAssetDuration;
                var loop = true;
                Core.Managers.TickerManager.instance.addTimeout("RandomAsset", duration, this.createRandomAssets.bind(this, 0), loop);
                this.createRandomAssets(0);
            };
            AssetTool.prototype.createRandomAssets = function (index) {
                index == 0 && this.removeAsset();
                var randomAssetTypeLen = Object.keys(RandomAssetType).length / 2;
                var randomAssetType = Math.floor(Math.random() * randomAssetTypeLen + 0);
                var object;
                switch (randomAssetType) {
                    case RandomAssetType.Image:
                        object = new Core.Parts.Sprite(100, 100, 100, 150, Core.GameInformation.CardSprite, this._assetContainer);
                        break;
                    case RandomAssetType.Text:
                        var textConfig = JSON.parse(JSON.stringify(Core.GameInformation.GenericText));
                        textConfig.textStyle.fontSize = Math.floor(Math.random() * 50 + 10);
                        object = new Core.Parts.Text(100, 100, textConfig, this._assetContainer);
                        break;
                }
                this.addAsset(index, object);
                index++;
                if (index < Core.GameInformation.RandomAssetCounter) {
                    this.createRandomAssets(index);
                    return;
                }
                this._assetContainer.position.x = 640 - this._assetContainer.width / 2;
            };
            AssetTool.prototype.addAsset = function (index, object) {
                var offset;
                var previousAsset = this._assets[index - 1];
                previousAsset ? offset = previousAsset.position.x + previousAsset.width / 2 : offset = 0;
                var x = object.width / 2 + offset;
                object.position.set(x, 360);
                this._assets.push(object);
            };
            AssetTool.prototype.removeAsset = function () {
                this._assetContainer.removeChildren();
                this._assets = [];
            };
            AssetTool.prototype.dispose = function () {
                Core.Managers.TickerManager.instance.removeTicker("RandomAsset");
            };
            Object.defineProperty(AssetTool.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: true,
                configurable: true
            });
            return AssetTool;
        }(Core.Modules.Stage));
        Stages.AssetTool = AssetTool;
<<<<<<< HEAD:SimpleTaskProject/dist/js/bundle.js
    })(Stages = Core.Stages || (Core.Stages = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Stages;
    (function (Stages) {
        var ShaderFireParticle = (function (_super) {
            __extends(ShaderFireParticle, _super);
            function ShaderFireParticle() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ShaderFireParticle.prototype.init = function () {
                var _this = this;
                var w, h;
                w = Core.Managers.DisplayManager.instance.width;
                h = Core.Managers.DisplayManager.instance.height;
                this._container = new Core.Modules.Container(0, 0, this, "Container");
                this._woodSprite = new Core.Parts.Sprite(722, 613, 200, 75, Core.GameInformation.WoodSPrite, this._container);
                this._particleContainer = new Core.Modules.Container(718, 607, this._container, "ParticleContainer");
                this._particleContainer.scale.set(2, 2);
                this._particleFogContainer = new Core.Modules.Container(0, -25, this._particleContainer, "particleFogContainer");
                this._particleSparksContainer = new Core.Modules.Container(0, -45, this._particleContainer, "particleSparksContainer");
                this._particleSparksContainer.scale.set(2, 1);
                this._particleGlowContainer = new Core.Modules.Container(0, 0, this._particleContainer, "particleGlowContainer");
                this._particleAddContainer = new Core.Modules.Container(0, 0, this._particleContainer, "particleAddContainer");
                var callback = Core.Managers.StageManager.instance.backMenuButtonUp;
                this._menuButton = new Core.Parts.Button(1245, 35, 70, 70, Core.GameInformation.MenuButton, callback.bind(this, this.name), this._container);
                this._fEmitter = new PIXI.particles.Emitter(this._particleFogContainer, ["fire/fire01", "fire/fire02", "fire/fire03"], Core.GameInformation.fireGeneralEmitter);
                this._fEmitter.maxParticles = 10;
                this._gEmitter = new PIXI.particles.Emitter(this._particleGlowContainer, ["fire/fire01", "fire/fire02", "fire/fire03"], Core.GameInformation.fireGlowEmitter);
                this._gEmitter.maxParticles = 10;
                this._aEmitter = new PIXI.particles.Emitter(this._particleAddContainer, ["fire/fire01", "fire/fire02", "fire/fire03"], Core.GameInformation.fireGeneralEmitter);
                this._aEmitter.maxParticles = 20;
                this._sEmitter = new PIXI.particles.Emitter(this._particleSparksContainer, "particle", Core.GameInformation.fireSparkEmitter);
                this._sEmitter.maxParticles = 10;
                var elapsed = Date.now();
                this._aEmitter.particleBlendMode = 1;
                this._aEmitter.update(1);
                var particle = PIXI.Texture.fromFrame("particle");
                var simpleLightFilterBlack = new PIXI.filters.SimpleLightmapFilter(particle, 0x0);
                var simpleLightFilterSunshine = new PIXI.filters.SimpleLightmapFilter(particle, 0xca7e40);
                this._woodSprite.filters = [simpleLightFilterSunshine, simpleLightFilterBlack];
                PIXI.ticker.shared.add(function (deltatime) {
                    _this._fEmitter.update((Date.now() - elapsed) * 0.0008);
                    _this._gEmitter.update((Date.now() - elapsed) * 0.0008);
                    _this._aEmitter.update((Date.now() - elapsed) * 0.0008);
                    _this._sEmitter.update((Date.now() - elapsed) * 0.0008);
                    elapsed = Date.now();
                }, this);
            };
            ShaderFireParticle.prototype.dispose = function () {
                this._fEmitter.destroy();
                this._gEmitter.destroy();
                this._aEmitter.destroy();
                this._sEmitter.destroy();
            };
            Object.defineProperty(ShaderFireParticle.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: true,
                configurable: true
            });
            return ShaderFireParticle;
        }(Core.Modules.Stage));
        Stages.ShaderFireParticle = ShaderFireParticle;
=======
>>>>>>> 278ad81... bugfix :dist/js/bundle.js
    })(Stages = Core.Stages || (Core.Stages = {}));
})(Core || (Core = {}));
//# sourceMappingURL=bundle.js.map