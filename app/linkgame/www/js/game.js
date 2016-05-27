'use strict';
function onLoad() {
	//document.addEventListener('deviceready', onDeviceReady, false);
		
	//function onDeviceReady(){
		new game.Main();
	//}
}
var utils; !
function(a) {
    var b = function() {
        function a() {
            this._enabled = !0,
            this.init();
        }
        return a.prototype.init = function() {
            try {
                this.localStorage = window.localStorage,
                this.localStorage.setItem("testKey", "testData"),
                this.localStorage.removeItem("testKey")
            } catch(a) {
                this._enabled = !1
            }
        },
        a.prototype.saveValue = function(a, b) {
            if (this._enabled) {
                var c = JSON.stringify(b);
                this.localStorage.setItem(a, c)
            }
        },
        a.prototype.getValue = function(a) {
            return this.localStorage.getItem(a)
        },
        a.prototype.remove = function(a) {
            this._enabled && this.localStorage.removeItem(a)
        },
        a.prototype.clear = function() {
            this._enabled && this.localStorage.clear()
        },
        Object.defineProperty(a.prototype, "enabled", {
            get: function() {
                return this._enabled
            },
            enumerable: !0,
            configurable: !0
        }),
        a
    } ();
    a.LocalStorageWrapper = b
} (utils || (utils = {}));
var game; !
function(a) {
    var b = function() {
        function a() {}
        return a.SOURCE_GAME_WIDTH = 640,
        a.SOURCE_GAME_HEIGHT = 780,
        a.GAME_WIDTH = a.SOURCE_GAME_WIDTH,
        a.GAME_HEIGHT = a.SOURCE_GAME_HEIGHT,
        a.HALF_GAME_WIDTH = .5 * a.GAME_WIDTH,
        a.HALF_GAME_HEIGHT = .5 * a.GAME_HEIGHT,
        a.WORLD_SCALE = 1,
        a
    } ();
    a.Config = b
} (game || (game = {}));
var __extends = this.__extends ||
function(a, b) {
    function c() {
        this.constructor = a
    }
    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
    c.prototype = b.prototype,
    a.prototype = new c
},
utils; !
function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b, b.stage, "FPS Meter"),
            this.updateInterval = 500,
            this.timer = 0,
            this.initBackground(),
            this.initText(),
            this.setPosition(),
            this.game.time.advancedTiming = !0
        }
        return __extends(b, a),
        b.prototype.setPosition = function() {
            this.x = 0;
            //this.game.scale.scaleMode === Phaser.ScaleManager.SHOW_ALL ? this.position.y = game.Config.GAME_HEIGHT - this.bg.height: this.position.y = game.Config.GAME_HEIGHT * game.Config.WORLD_SCALE - this.bg.height
			if(this.game.scale.scaleMode === Phaser.ScaleManager.SHOW_ALL){
				this.position.y = game.Config.GAME_HEIGHT - this.bg.height;console.log('setPosition');
			}else{
				this.position.y = game.Config.GAME_HEIGHT * game.Config.WORLD_SCALE - this.bg.height
			}
        },
        b.prototype.initBackground = function() {
            var a = 90,
            b = 25,
            c = this.game.add.bitmapData(a, b);
            c.fill(0, 0, 0),
            c.rect(0, 0, a, b),
            this.bg = new Phaser.Image(this.game, 0, 0, c),
            this.add(this.bg)
        },
        b.prototype.initText = function() {
            var a = {
                font: "18px Consolas",
                fill: "#FFFFFF",
                align: "left"
            };
            this.statsText = this.game.add.text(6, 3, "0 fps", a, this)
        },
        b.prototype.update = function() {
            this.timer += this.game.time.elapsed,
            this.timer >= this.updateInterval && (this.timer -= this.updateInterval, this.updateStats())
        },
        b.prototype.updateStats = function() {
            var a = "FPS: " + this.game.time.fps;
            this.statsText.setText(a)
        },
        b.prototype.destroy = function() {
            this.game.time.advancedTiming = !1,
            a.prototype.destroy.call(this, !0, !1)
        },
        b
    } (Phaser.Group);
    a.FPSMeter = b
} (utils || (utils = {}));
var utils; !
function(a) {
    var b = function() {
        function a() {
            this.intervalID = -1,
            this.counter = 0,
            this.repeatTimes = 0
        }
        return a.prototype.repeat = function(a, b, c, d) {
            var e = this;
            this.intervalID > -1 && clearInterval(this.intervalID),
            this.func = a,
            this.context = b,
            this.repeatTimes = c,
            this.counter = 0,
            this.intervalID = setInterval(function() {
                e.execute()
            },
            d)
        },
        a.prototype.execute = function() {
            this.func.apply(this.context),
            ++this.counter === this.repeatTimes && (clearInterval(this.intervalID), this.intervalID = -1)
        },
        a.prototype.stop = function() {
            this.intervalID > -1 && clearInterval(this.intervalID)
        },
        a
    } ();
    a.Timer = b
} (utils || (utils = {}));
var game; !
function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b),
        c.prototype.init = function() {
            Phaser.Device.isAndroidStockBrowser() && (this.game.canvas.parentElement.style.overflow = "visible");
            var a = {
                font: "10px GrilledCheeseBTNToasted"
            },
            b = this.add.text(0, 0, "1234567890%", a);
            b.destroy();
            var c = {
                font: "10px arialblack"
            },
            d = this.add.text(0, 0, "1234567890%", c);
            d.destroy()
        },
        c.prototype.preload = function() {
            this.game.device.ie && this.game.device.ieVersion <= 9 && (this.load.useXDomainRequest = !1),
            this.load.atlasJSONHash("preloader", "assets/graphics/preloader.png", "assets/graphics/preloader.json")
        },
        c.prototype.create = function() {
            this.setupScale(),
            this.setupCanvasStyle(),
            this.setupCustomConsole(),
            this.addFPSMeter(),
            this.detectWeakDevice(),
            this.input.maxPointers = 1,
            this.stage.disableVisibilityChange = !0,
            this.game.plugins.add(new a.StateTransition(this.game)),
            this.game.renderer.clearBeforeRender = !1,
            this.game.state.start("Preloader", !0, !1)
        },
        c.prototype.setupScale = function() {
            a.Main.isDesktop ? this.scaleForDesktop() : (this.scaleForMobile(), this.scaleGame(), this.isLandscape() && this.onEnterLandscape())
        },
        c.prototype.scaleForDesktop = function() {
            var b = this.game.scale;
            b.scaleMode = Phaser.ScaleManager.SHOW_ALL,
            b.aspectRatio = a.Config.SOURCE_GAME_WIDTH / a.Config.SOURCE_GAME_HEIGHT,
            b.pageAlignHorizontally = !0,
            b.pageAlignVertically = !0
        },
        c.prototype.scaleForMobile = function() {
            var a = this.game.scale;
            a.scaleMode = Phaser.ScaleManager.EXACT_FIT,
            a.forceOrientation(!1, !0),
            a.onSizeChange.add(this.onSizeChange, this)
        },
        c.prototype.onSizeChange = function() {
            this.isPortrait() ? (this.scaleGame(), this.game.state.resize(a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT), this.onEnterPortrait()) : this.onEnterLandscape()
        },
        c.prototype.setupCanvasStyle = function() {
            this.game.device.desktop ? (this.game.canvas.style.boxShadow = "0 0 30px black", this.game.canvas.parentElement.style.backgroundColor = "#152E4D") : this.game.canvas.style.backgroundColor = "black"
        },
        c.prototype.setupCustomConsole = function() {
            if (a.Main.isDesktop) {
                var b = document.getElementById("debug_console");
                b && (b.style.display = "none")
            }
        },
        c.prototype.addFPSMeter = function() {
            if (a.Main.development) {
                var b = new utils.FPSMeter(this.game);
                this.stage.addChild(b)
            }
        },
        c.prototype.detectWeakDevice = function() {
            a.Main.weakDevice = this.game.renderType === Phaser.CANVAS
        },
        c.prototype.scaleGame = function() {
            var b = window.innerWidth,
            c = window.innerHeight,
            d = b * this.game.device.pixelRatio,
            e = 0,
            f = 0;
            d <= a.Config.SOURCE_GAME_WIDTH ? (e = 2 * b, f = 2 * c) : (e = b, f = c);
            var g = a.Config.SOURCE_GAME_WIDTH,
            h = e / g;
            this.world.scale.set(h, h),
            this.scale.setGameSize(e, f),
            a.Config.WORLD_SCALE = h,
            a.Config.GAME_WIDTH = this.game.canvas.width / h,
            a.Config.GAME_HEIGHT = this.game.canvas.height / h,
            a.Config.HALF_GAME_WIDTH = .5 * a.Config.GAME_WIDTH,
            a.Config.HALF_GAME_HEIGHT = .5 * a.Config.GAME_HEIGHT
        },
        c.prototype.onEnterLandscape = function() {
            document.getElementById("rotate").style.display = "block",
            document.getElementById("rotate").style.width = window.innerWidth + "px",
            document.getElementById("rotate").style.height = window.innerHeight + "px"
        },
        c.prototype.onEnterPortrait = function() {
            document.getElementById("rotate").style.display = "none"
        },
        c.prototype.isLandscape = function() {
            return window.innerWidth > window.innerHeight
        },
        c.prototype.isPortrait = function() {
            return window.innerHeight > window.innerWidth
        },
        c
    } (Phaser.State);
    a.Boot = b
} (game || (game = {}));
var utils; !
function(a) {
    var b = function() {
        function a() {}
        return a.createRectTexture = function(a, b, c, d, e) {
            void 0 === d && (d = "#000000");
            var f = Phaser.Color.hexToColor(d),
            g = !!e,
            h = a.add.bitmapData(b, c, e, g);
            return h.fill(f.r, f.g, f.b),
            h
        },
        a.createCircleTexture = function(a, b, c, d) {
            void 0 === c && (c = "#000000");
            var e = !!d,
            f = a.add.bitmapData(2 * b, 2 * b, d, e);
            return f.context.fillStyle = c,
            f.circle(b, b, b),
            f
        },
        a
    } ();
    a.DrawUtil = b
} (utils || (utils = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a) {
            b.call(this, a, a.stage),
            this.overlayDuration = 400;
            var c = utils.DrawUtil.createRectTexture(this.game, 1, 1, "#000000", "black_rect");
            this.overlay = new Phaser.Image(a, 0, 0, c),
            this.overlay.visible = !1,
            this.game.stage.addChild(this.overlay)
        }
        return __extends(c, b),
        c.prototype.fillStage = function() {
            var b = a.Config.GAME_WIDTH * a.Config.WORLD_SCALE,
            c = a.Config.GAME_HEIGHT * a.Config.WORLD_SCALE;
            this.overlay.scale.set(b, c)
        },
        c.prototype.changeState = function(a, b) {
            this.fillStage(),
            this.showOverlay(a, b)
        },
        c.prototype.showOverlay = function(a, b) {
            var c = this;
            this.overlay.visible = !0,
            this.overlay.alpha = 0,
            this.overlayTween = this.game.add.tween(this.overlay).to({
                alpha: 1
            },
            this.overlayDuration, Phaser.Easing.Cubic.Out, !0),
            this.overlayTween.onComplete.addOnce(function() {
                c.doChangeState(a, b)
            },
            this)
        },
        c.prototype.doChangeState = function(a, b) {
            var c = this;
            this.game.state.start(a, !0, !1, b),
            setTimeout(function() {
                c.hideOverlay()
            },
            100),
            setTimeout(function() {
                c.overlay.visible = !1
            },
            100 + this.overlayDuration)
        },
        c.prototype.hideOverlay = function() {
            this.overlayTween = this.game.add.tween(this.overlay).to({
                alpha: 0
            },
            this.overlayDuration, Phaser.Easing.Cubic.Out, !0)
        },
        c
    } (Phaser.Plugin);
    a.StateTransition = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b() {}
        return b.generateAndSaveTextures = function(b) {
            for (var c = a.Item.ITEM_TYPES.length,
            d = new a.ProgressPopUp(b, b.world), e = a.Item.ITEM_TYPES.length - 1, f = 1; e > f; f++) {
                var g = a.ItemType[f],
                h = f + 1;
                d.updateContent(g, h, c);
                var i = d.generateTexture(),
                j = g + "_Popup";
                b.cache.addRenderTexture(j, i)
            }
            d.destroy()
        },
        b
    } ();
    a.ProgressPopupTexturesGenerator = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b),
        c.prototype.init = function() {
            this.addBackgound(),
            this.addPreloadBar(),
            this.addLoadingText(),
            this.addCopyright(),
            this.resize()
        },
        c.prototype.addBackgound = function() {
            this.bg = this.game.add.image(0, 0, "preloader", "Preloader_Background0000")
        },
        c.prototype.addPreloadBar = function() {
            this.backPreloadSprite = this.game.add.image(0, 0, "preloader", "Preloader_Back0000"),
            this.backPreloadSprite.anchor.set(.5, .5),
            this.backPreloadSprite.x = a.Config.HALF_GAME_WIDTH,
            this.backPreloadSprite.y = a.Config.HALF_GAME_HEIGHT,
            this.frontPreloadSprite = this.game.add.sprite(0, 0, "preloader", "Preloader_Front0000"),
            this.frontPreloadSprite.x = this.backPreloadSprite.x - .5 * this.frontPreloadSprite.width + 27,
            this.frontPreloadSprite.y = this.backPreloadSprite.y + .5 * this.frontPreloadSprite.height + 27,
            this.frontPreloadSprite.angle = -90
        },
        c.prototype.addLoadingText = function() {
            var b = {
                font: "45px GrilledCheeseBTNToasted",
                fill: "#CDE7F7",
                align: "center"
            };
            this.loadingText = this.game.add.text(0, 0, "Loading...", b),
            this.loadingText.anchor.set(.5, .5),
            this.loadingText.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT + 175),
            this.loadingText.setShadow(2, 2, "#0C1829")
        },
        c.prototype.addCopyright = function() {
            var b = "(C) abc, 2015\nUse with permission",
            c = {
                font: "22px Verdana",
                fill: "#CDE7F7",
                align: "center"
            };
            this.copyright = this.game.add.text(0, 0, b, c),
            this.copyright.anchor.set(.5, .5),
            this.copyright.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT + 175),
            this.copyright.setShadow(2, 2, "#0C1829"),
            this.copyright.lineSpacing = -8,
            this.copyright.alpha = .75
        },
        c.prototype.preload = function() {
            this.loadOtherAssets(),
            this.loadAudio(),
            this.loadGraphics(),
            this.load.setPreloadSprite(this.frontPreloadSprite)
        },
        c.prototype.loadOtherAssets = function() {
            this.load.bitmapFont("digits", "assets/fonts/font.png", "assets/fonts/font.fnt", null),
            this.load.json("texts", "assets/texts.json"),
            this.load.json("boosters", "assets/boosters.json")
        },
        c.prototype.loadAudio = function() {
            this.load.audio("main_loop", ["assets/audio/MainLoop.ogg", "assets/audio/MainLoop.m4a"], !0),
            this.game.sound.usingWebAudio && (this.load.audio("tap", ["assets/audio/tap.wav"], !0), this.load.audio("collect", ["assets/audio/collect.wav"], !0), this.load.audio("select", ["assets/audio/plop.ogg", "assets/audio/plop.m4a"], !0), this.load.audio("new_item", ["assets/audio/convert_item.ogg", "assets/audio/convert_item.m4a"], !0), this.load.audio("achieved", ["assets/audio/achieved.ogg", "assets/audio/achieved.m4a"], !0), this.load.audio("cash", ["assets/audio/cash.ogg", "assets/audio/cash.m4a"], !0), this.load.audio("electric", ["assets/audio/electric.ogg", "assets/audio/electric.m4a"], !0), this.load.audio("game_over", ["assets/audio/game_over.ogg", "assets/audio/game_over.m4a"], !0), this.load.audio("shake", ["assets/audio/shake.ogg", "assets/audio/shake.m4a"], !0), this.load.audio("magnet", ["assets/audio/magnet.ogg", "assets/audio/magnet.m4a"], !0), this.load.audio("lightning", ["assets/audio/lightning.ogg", "assets/audio/lightning.m4a"], !0), this.load.audio("restart", ["assets/audio/restart.ogg", "assets/audio/restart.m4a"], !0), this.load.audio("game_complete", ["assets/audio/game_complete.mp3"], !0), a.Main.stats.getValue(a.GameStats.TUTORIAL_COMPLETE) || this.load.audio("mumble", ["assets/audio/mumble.ogg", "assets/audio/mumble.m4a"], !0))
        },
        c.prototype.loadGraphics = function() {
            this.load.image("credits", "assets/graphics/credits.png"),
            this.load.atlasJSONHash("interface", "assets/graphics/interface.png", "assets/graphics/interface.json"),
            this.load.atlasJSONHash("items", "assets/graphics/items.png", "assets/graphics/items.json"),
            this.load.atlasJSONHash("background", "assets/graphics/background.png", "assets/graphics/background.json"),
            this.load.atlasJSONHash("game_complete", "assets/graphics/game_complete.png", "assets/graphics/game_complete.json"),
            this.load.atlasJSONHash("main_menu", "assets/graphics/main_menu.png", "assets/graphics/main_menu.json"),
            this.load.atlasJSONHash("tutorial", "assets/graphics/tutorial.png", "assets/graphics/tutorial.json"),
            this.load.atlasJSONHash("boosters", "assets/graphics/boosters.png", "assets/graphics/boosters.json")
        },
        c.prototype.loadUpdate = function() {
            this.loadingText.setText(this.load.progress + "%")
        },
        c.prototype.create = function() {
            this.initTexts(),
            this.initBoosters(),
            this.createProgressPopupTextures(),
            this.game.changeState("MainMenu", !0)
        },
        c.prototype.initTexts = function() {
            var b = this.game.cache.getJSON("texts");
            a.Main.language = this.getLanguage(),
            a.Main.texts = b[a.Main.language],
            "ru" === a.Main.language ? a.Main.fontFamily = "arialblack": a.Main.fontFamily = "GrilledCheeseBTNToasted"
        },
        c.prototype.getLanguage = function() {
            var a = new Phaser.Net(this.game),
            b = a.getQueryString("lang");
            return _.isString(b) && b.length > 0 ? b: "en"
        },
        c.prototype.initBoosters = function() {
            a.Main.boostersConfig = this.game.cache.getJSON("boosters"),
            a.Main.boosters = new a.BoostersManager
        },
        c.prototype.resize = function() {
            this.resizeBackground(),
            this.alignSprites()
        },
        c.prototype.resizeBackground = function() {
            this.bg.width = a.Config.GAME_WIDTH + 1,
            this.bg.height = a.Config.GAME_HEIGHT
        },
        c.prototype.alignSprites = function() {
            this.backPreloadSprite.y = .45 * a.Config.GAME_HEIGHT,
            this.frontPreloadSprite.y = this.backPreloadSprite.y + .5 * this.frontPreloadSprite.height + 25,
            this.loadingText.y = this.backPreloadSprite.y + 180,
            this.copyright.y = a.Config.GAME_HEIGHT - .5 * this.copyright.height - 8
        },
        c.prototype.createProgressPopupTextures = function() {
            a.ProgressPopupTexturesGenerator.generateAndSaveTextures(this.game)
        },
        c
    } (Phaser.State);
    a.Preloader = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(c) {
            b.call(this, c, c.world),
            this.addBricks(),
            a.Main.weakDevice === !1 && this.addWeb(),
            this.addFloor(),
            this.addFloorShadows(),
            this.addBooks(),
            this.addShadows()
        }
        return __extends(c, b),
        c.prototype.addBricks = function() {
            this.bricks = [];
            for (var b = a.Config.HALF_GAME_WIDTH - 3,
            c = -40,
            d = 331,
            e = 0; 4 > e; e++) {
                var f = this.game.add.image(b, c, "background", "Bricks_Back0000", this);
                f.anchor.set(.5, 0),
                c += d,
                this.setChildIndex(f, 0),
                this.bricks.push(f)
            }
        },
        c.prototype.addWeb = function() {
            this.leftWeb = this.game.add.image(0, 0, "background", "Web0000", this),
            this.leftWeb.x = -18,
            this.leftWeb.y = -16,
            this.rightWeb = this.game.add.image(0, 0, "background", "Web0000", this),
            this.rightWeb.anchor.set(.5, 0),
            this.rightWeb.scale.x = -.8,
            this.rightWeb.scale.y = .8,
            this.rightWeb.x = a.Config.GAME_WIDTH - 90,
            this.rightWeb.y = -10
        },
        c.prototype.addFloorShadows = function() {
            this.topFloorShadow = this.game.add.image(0, 0, "background", "Shadow0000", this),
            this.topFloorShadow.anchor.set(.5, 1),
            this.topFloorShadow.x = a.Config.HALF_GAME_WIDTH,
            this.bottomFloorShadow = this.game.add.image(0, 0, "background", "Shadow0000", this),
            this.bottomFloorShadow.anchor.set(.5, 1),
            this.bottomFloorShadow.x = a.Config.HALF_GAME_WIDTH,
            this.bottomFloorShadow.angle = 180
        },
        c.prototype.addFloor = function() {
            this.floor = this.game.add.image(0, 0, "background", "Floor0000", this),
            this.floor.anchor.set(.5, 0),
            this.floor.x = a.Config.HALF_GAME_WIDTH
        },
        c.prototype.addBooks = function() {
            this.leftBooks = this.game.add.image(0, 0, "background", "Books_L0000", this),
            this.leftBooks.anchor.set(.5, 1),
            this.leftBooks.x = 0,
            this.rightBooks = this.game.add.image(0, 0, "background", "Books_R0000", this),
            this.rightBooks.anchor.set(.5, 1),
            this.rightBooks.x = a.Config.GAME_WIDTH
        },
        c.prototype.addShadows = function() {
            this.topShadow = this.game.add.image(0, 0, "background", "Shadow0000", this),
            this.topShadow.anchor.set(.5, 1),
            this.topShadow.x = a.Config.HALF_GAME_WIDTH,
            this.topShadow.y = a.Config.GAME_HEIGHT - this.topShadow.height,
            this.topShadow.angle = 180,
            this.bottomShadow = this.game.add.image(0, 0, "background", "Shadow0000", this),
            this.bottomShadow.anchor.set(.5, 1),
            this.bottomShadow.x = a.Config.HALF_GAME_WIDTH,
            this.bottomShadow.y = a.Config.GAME_HEIGHT,
            this.leftShadow = this.game.add.image( - 1, 0, "background", "Shadow0000", this),
            this.leftShadow.anchor.set(.5, .5),
            this.leftShadow.x = .5 * this.leftShadow.height - 1,
            this.leftShadow.y = a.Config.HALF_GAME_HEIGHT,
            this.leftShadow.width = a.Config.GAME_HEIGHT,
            this.leftShadow.angle = 90,
            this.rightShadow = this.game.add.image(0, 0, "background", "Shadow0000", this),
            this.rightShadow.anchor.set(.5, .5),
            this.rightShadow.x = a.Config.GAME_WIDTH - .5 * this.rightShadow.height + 1,
            this.rightShadow.y = a.Config.HALF_GAME_HEIGHT,
            this.rightShadow.width = a.Config.GAME_HEIGHT,
            this.rightShadow.angle = -90
        },
        c.prototype.resize = function() {
            this.alignFloor(),
            this.alignBooks(),
            this.alignBricks(),
            this.alignShadows()
        },
        c.prototype.alignFloor = function() {
            this.floor.y = .8 * a.Config.GAME_HEIGHT,
            this.floor.height = .2 * a.Config.GAME_HEIGHT + 6,
            this.topFloorShadow.y = this.floor.y + 1,
            this.bottomFloorShadow.y = this.floor.y
        },
        c.prototype.alignBooks = function() {
            this.leftBooks.y = this.floor.y + 20,
            this.rightBooks.y = this.floor.y + 20
        },
        c.prototype.alignBricks = function() {
            for (var a = 331,
            b = this.bricks.length,
            c = 0; c < this.bricks.length; c++, b--) {
                var d = this.bricks[c],
                e = this.floor.y - a * b - 23;
                d.y = e
            }
        },
        c.prototype.alignShadows = function() {
            this.topShadow.y = -1,
            this.bottomShadow.y = a.Config.GAME_HEIGHT + 1,
            this.leftShadow.width = a.Config.GAME_HEIGHT,
            this.leftShadow.x = .5 * this.leftShadow.height - 5,
            this.leftShadow.y = a.Config.HALF_GAME_HEIGHT,
            this.rightShadow.width = a.Config.GAME_HEIGHT,
            this.rightShadow.x = a.Config.GAME_WIDTH - .5 * this.rightShadow.height + 5,
            this.rightShadow.y = a.Config.HALF_GAME_HEIGHT
        },
        c.prototype.getFloorY = function() {
            return this.floor.y
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1),
            this.bricks = null
        },
        c
    } (Phaser.SpriteBatch);
    a.MainMenuBackground = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c),
            this.lowerShadow = this.game.add.image(0, 0, "main_menu", "Shadow_Lower0000", this),
            this.lowerShadow.anchor.set(.5, 1),
            this.upperShadow = this.game.add.image(0, 0, "main_menu", "Shadow_Upper0000", this),
            this.upperShadow.anchor.set(.5, 1),
            this.upperShadow.x = this.lowerShadow.x - 3,
            this.upperShadow.y = this.lowerShadow.y - this.lowerShadow.height + 8,
            this.upperBody = this.game.add.image(0, 0, "main_menu", "Magician_Upper0000", this),
            this.upperBody.anchor.set(.5, 1),
            this.upperBody.x = this.upperShadow.x + 15,
            this.upperBody.y = this.upperShadow.y + 5,
            this.lowerBody = this.game.add.image(0, 0, "main_menu", "Magician_Lower0000", this),
            this.lowerBody.anchor.set(.5, 1),
            this.lowerBody.x = this.upperBody.x - 5,
            this.lowerBody.y = this.upperBody.y + this.lowerBody.height - 14
        }
        return __extends(b, a),
        b.prototype.playTween = function() {
            var a = 500,
            b = 2,
            c = .95;
            this.upperBody.angle = -b,
            this.game.add.tween(this.upperBody.scale).to({
                y: c
            },
            a, Phaser.Easing.Sinusoidal.InOut, !0, 0, 1e4, !0),
            this.game.add.tween(this.upperBody).to({
                angle: Math.abs(this.upperBody.angle)
            },
            2 * a, Phaser.Easing.Sinusoidal.InOut, !0, 0, 1e3, !0),
            this.upperShadow.angle = -b - 2,
            this.game.add.tween(this.upperShadow.scale).to({
                y: c
            },
            a, Phaser.Easing.Sinusoidal.InOut, !0, 0, 1e4, !0),
            this.game.add.tween(this.upperShadow).to({
                angle: Math.abs(this.upperShadow.angle)
            },
            2 * a, Phaser.Easing.Sinusoidal.InOut, !0, 0, 1e3, !0)
        },
        b.prototype.getHeight = function() {
            return this.upperBody.height + this.lowerBody.height
        },
        b
    } (Phaser.Group);
    a.Wizard = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c),
            this.addCaldron(),
            this.addSmoke(),
            this.addBackStones()
        }
        return __extends(b, a),
        b.prototype.addCaldron = function() {
            this.caldron = this.game.add.image(0, 0, "main_menu", "Caldron0000", this),
            this.caldron.anchor.set(.5, 1)
        },
        b.prototype.addSmoke = function() {
            this.smoke = this.game.add.image(0, 0, "main_menu", "Smoke0000", this),
            this.smoke.anchor.set(.5, 1),
            this.smoke.x = this.caldron.x,
            this.smoke.y = this.caldron.y - this.caldron.height + 30
        },
        b.prototype.addBackStones = function() {
            var a = this.game.add.image(0, 0, "main_menu", "Stone0000", this);
            a.anchor.set(.5, .5),
            a.x = this.caldron.left + 42,
            a.y = this.caldron.bottom - 50,
            this.setChildIndex(a, 0);
            var b = this.game.add.image(0, 0, "main_menu", "Stone0000", this);
            b.anchor.set(.5, .5),
            b.x = this.caldron.right - 40,
            b.y = this.caldron.bottom - 50,
            this.setChildIndex(b, 0)
        },
        b.prototype.playSmokeTween = function() {
            var a = 4,
            b = 600;
            this.smoke.angle = -a,
            this.game.add.tween(this.smoke).to({
                angle: Math.abs(this.smoke.angle)
            },
            2 * b, Phaser.Easing.Sinusoidal.InOut, !0, 0, 1e3, !0)
        },
        b
    } (Phaser.Group);
    a.Caldron = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments),
            this.fromPreloader = !1
        }
        return __extends(c, b),
        c.prototype.init = function(a) {
            this.fromPreloader = a
        },
        c.prototype.create = function() {
            this.addBackground(),
            this.addTitle(),
            this.addWizard(),
            this.addCaldron(),
            this.addButtons(),
            this.addCredits(),
            this.resize(),
            a.Main.weakDevice === !1 && this.initAnimation(),
            this.fromPreloader && (this.soundButton.input.enabled = !1, this.soundButton.switchTextures(), this.game.input.onDown.addOnce(this.startMusic, this), this.stage.disableVisibilityChange = !1, this.game.onBlur.add(this.onFocusLost, this), this.game.onFocus.add(this.onFocus, this))
        },
        c.prototype.onFocusLost = function() {
            a.Main.wasMuted = this.game.sound.mute,
            this.game.sound.mute = !0
        },
        c.prototype.onFocus = function() {
            a.Main.wasMuted === !1 && (this.game.sound.mute = !1)
        },
        c.prototype.addBackground = function() {
            this.background = new a.MainMenuBackground(this.game)
        },
        c.prototype.addTitle = function() {
            this.title = this.add.image(0, 0, "main_menu", "Title0000"),
            this.title.anchor.set(.5, .5),
            this.title.x = a.Config.HALF_GAME_WIDTH - .5,
            this.title.y = .15 * a.Config.GAME_HEIGHT
        },
        c.prototype.addWizard = function() {
            this.wizard = new a.Wizard(this.game, this.world),
            this.wizard.position.set(230, this.background.getFloorY()),
            a.Main.weakDevice === !1 && this.wizard.playTween()
        },
        c.prototype.addCaldron = function() {
            this.caldron = new a.Caldron(this.game, this.world),
            this.caldron.position.set(this.wizard.position.x + 136, this.wizard.position.y + 30)
        },
        c.prototype.addButtons = function() {
            var b = this;
            this.playButton = new a.SimpleButton(this.game, 0, 0, "interface", "Button_Play0000"),
            this.playButton.setCallbackDelay(200),
            this.playButton.callback.addOnce(this.onPlayButtonClick, this),
            this.soundButton = new a.ToggleButton(this.game, 0, 0, "interface", "Button_Sound_On0000", "Button_Sound_Off0000"),
            this.soundButton.callback.add(function() {
                b.game.sound.mute = !b.game.sound.mute
            }),
            this.game.sound.mute && this.soundButton.switchTextures(),
            this.moreGamesButton = new a.SimpleButton(this.game, 0, 0, "interface", "Button_MoreGames0000"),
            this.moreGamesButton.callback.add(this.openUrl, this),
            this.creditsButton = new a.SimpleButton(this.game, 0, 0, "interface", "Button_Credits0000"),
            this.creditsButton.callback.add(this.toggleCredits, this),
            this.buttons = [this.moreGamesButton, this.playButton, this.soundButton, this.creditsButton],
            this.buttons.forEach(function(a) {
                b.world.add(a)
            })
        },
        c.prototype.onPlayButtonClick = function() {
            var b = a.Main.stats.getValue(a.GameStats.TUTORIAL_COMPLETE);
            this.game.changeState(b ? "BoostersState": "Level")
        },
        c.prototype.openUrl = function() {
            a.Main.storage.clear(),
            window.location.reload()
        },
        c.prototype.addCredits = function() {
            this.credits = this.game.add.image(0, 0, "credits"),
            this.credits.position.set(Math.round(.5 * (a.Config.GAME_WIDTH - this.credits.width)), Math.round(.5 * (a.Config.GAME_HEIGHT - this.credits.height))),
            this.credits.visible = !1
        },
        c.prototype.addBuildDate = function() {
            var b = new Date,
            c = b.toDateString(),
            d = b.toTimeString().split("GMT")[0],
            e = c + " " + d,
            f = {
                font: "20px Verdana",
                fill: "#FFFFFF",
                align: "center"
            };
            this.buildDate = this.game.add.text(0, 0, e, f),
            this.buildDate.anchor.set(.5, .5),
            this.buildDate.position.set(a.Config.HALF_GAME_WIDTH, a.Config.GAME_HEIGHT - this.buildDate.height),
            this.buildDate.setShadow(2, 2, "#333333"),
            this.buildDate.alpha = .75,
            this.buildDate.visible = !1
        },
        c.prototype.toggleCredits = function() {
            this.credits.visible ? this.hideCredits() : this.showCredits()
        },
        c.prototype.hideCredits = function() {
            var a = this;
            this.buildDate && (this.buildDate.visible = !1),
            this.game.add.tween(this.credits).to({
                alpha: 0
            },
            500, Phaser.Easing.Linear.None, !0),
            this.game.add.tween(this.credits).to({
                y: this.credits.y + 200
            },
            500, Phaser.Easing.Back.In, !0).onComplete.addOnce(function() {
                a.playButton.input.enabled = !0,
                a.creditsButton.input.enabled = !0,
                a.credits.visible = !1
            },
            this)
        },
        c.prototype.showCredits = function() {
            var b = this;
            this.buildDate && (this.buildDate.visible = !0),
            this.credits.visible = !0,
            this.credits.alpha = 0,
            this.credits.y = .5 * (a.Config.GAME_HEIGHT - this.credits.height) + 200,
            this.game.add.tween(this.credits).to({
                alpha: 1
            },
            500, Phaser.Easing.Linear.None, !0),
            this.game.add.tween(this.credits).to({
                y: this.credits.y - 200
            },
            500, Phaser.Easing.Back.Out, !0),
            this.playButton.input.enabled = !1,
            this.creditsButton.input.enabled = !1,
            this.game.input.onDown.addOnce(function() {
                b.hideCredits()
            },
            this)
        },
        c.prototype.startMusic = function() {
            a.Main.mainMusicLoop = this.sound.add("main_loop", .25, !0, !0),
            a.Main.mainMusicLoop.play(),
            this.soundButton.switchTextures(),
            this.soundButton.input.enabled = !0
        },
        c.prototype.initAnimation = function() {
            this.animateTitle(),
            this.animateButtons()
        },
        c.prototype.animateTitle = function() {
            var a = this,
            b = 350;
            this.title.alpha = 0,
            this.title.scale.set(1.3, 1.3),
            this.game.add.tween(this.title).to({
                alpha: 1
            },
            300, Phaser.Easing.Cubic.Out, !0, b),
            this.game.add.tween(this.title.scale).to({
                x: 1,
                y: 1
            },
            600, Phaser.Easing.Back.Out, !0, b).onComplete.addOnce(function() {
                a.game.add.tween(a.title).to({
                    y: a.title.y + 10
                },
                800, Phaser.Easing.Sinusoidal.InOut, !0, 0, 1e3, !0)
            })
        },
        c.prototype.animateButtons = function() {
            var a = this,
            b = 900;
            this.buttons.forEach(function(c) {
                c.scale.set(0, 0);
                var d = a.game.add.tween(c.scale).to({
                    x: 1,
                    y: 1
                },
                500, Phaser.Easing.Back.Out, !0, b);
                c === a.playButton && d.onComplete.addOnce(a.shakePlayButton, a),
                b += 150
            })
        },
        c.prototype.shakePlayButton = function() {
            var a = this,
            b = -4;
            this.time.events.repeat(2200, Number.MAX_VALUE,
            function() {
                a.playButton.angle = b,
                a.game.add.tween(a.playButton).to({
                    angle: Math.abs(b)
                },
                100, Phaser.Easing.Sinusoidal.InOut, !0, 0, 2, !0).onComplete.add(function() {
                    a.game.add.tween(a.playButton).to({
                        angle: 0
                    },
                    100, Phaser.Easing.Linear.None, !0)
                })
            },
            this)
        },
        c.prototype.resize = function() {
            this.background.resize(),
            this.alingSprites(),
            this.alignButtons()
        },
        c.prototype.alingSprites = function() {
            this.title.y = .13 * a.Config.GAME_HEIGHT,
            this.wizard.position.y = .935 * a.Config.GAME_HEIGHT,
            this.caldron.position.y = this.wizard.position.y + 46
        },
        c.prototype.alignButtons = function() {
            var b = this.wizard.position.y - this.wizard.getHeight() - this.title.bottom,
            c = this.title.bottom + .5 * b + 40,
            d = 140;
            this.playButton.x = a.Config.HALF_GAME_WIDTH,
            this.playButton.y = c,
            this.moreGamesButton.x = this.playButton.x - d,
            this.moreGamesButton.y = c,
            this.soundButton.x = this.playButton.x + d,
            this.soundButton.y = c;
            var e = 5;
            this.creditsButton.x = a.Config.GAME_WIDTH - .5 * this.creditsButton.width - e,
            this.creditsButton.y = a.Config.GAME_HEIGHT - .5 * this.creditsButton.height - e
        },
        c.prototype.shutdown = function() {
            this.buttons = null
        },
        c
    } (Phaser.State);
    a.MainMenu = b
} (game || (game = {}));
var utils; !
function(a) {
    var b = function() {
        function a() {}
        return a.distanceSquared = function(a, b, c, d) {
            var e = c - a,
            f = d - b;
            return e * e + f * f
        },
        a.distance = function(b, c, d, e) {
            var f = a.distanceSquared(b, c, d, e);
            return Math.sqrt(f)
        },
        a.realInRange = function(a, b) {
            return Math.random() * (b - a) + a
        },
        a.integerInRange = function(b, c) {
            return Math.round(a.realInRange(b, c))
        },
        a.lowPrecisionSin = function(a) {
            var b;
            return - 3.14159265 > a ? a += 6.28318531 : a > 3.14159265 && (a -= 6.28318531),
            b = 0 > a ? 1.27323954 * a + .405284735 * a * a: 1.27323954 * a - .405284735 * a * a
        },
        a.DEG_TO_RAD = .017453292519943295,
        a.RAD_TO_DEG = 57.29577951308232,
        a
    } ();
    a.MathUtil = b
} (utils || (utils = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b, c, d, e, f) {
            a.call(this, b, c, d, e, f),
            this.callbackDelay = 0,
            this.enabled = !0,
            this.disableInput = !1,
            this.userData = null,
            this._callback = new Phaser.Signal,
            this.anchor.set(.5, .5),
            this.inputEnabled = !0,
            this.events.onInputDown.add(this.onInputDown, this),
            this.events.onInputUp.add(this.onInputUp, this),
            this.game.device.desktop && (this.input.useHandCursor = !0)
        }
        return __extends(b, a),
        b.prototype.onInputDown = function() {
            this.disableInput || (this.game.device.webAudio && this.game.sound.play("tap"), this.game.add.tween(this.scale).to({
                x: .9,
                y: .9
            },
            50, Phaser.Easing.Cubic.Out, !0))
        },
        b.prototype.onInputUp = function() {
            this.disableInput || (this.game.tweens.removeFrom(this.scale), this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            },
            150, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(this.onInputUpComplete, this))
        },
        b.prototype.onInputUpComplete = function() {
            this.callbackDelay > 0 ? this.game.time.events.add(this.callbackDelay, this._callback.dispatch, this._callback, this) : this._callback.dispatch(this)
        },
        b.prototype.setCallbackDelay = function(a) {
            this.callbackDelay = a
        },
        b.prototype.enable = function() {
            this.enabled === !1 && (this.enabled = !0, this.input.enabled = !0)
        },
        b.prototype.disable = function() {
            this.enabled && (this.enabled = !1, this.input.enabled = !1)
        },
        b.prototype.destroy = function() {
            a.prototype.destroy.call(this),
            this._callback.dispose(),
            this._callback = null
        },
        Object.defineProperty(b.prototype, "callback", {
            get: function() {
                return this._callback
            },
            enumerable: !0,
            configurable: !0
        }),
        b
    } (Phaser.Image);
    a.SimpleButton = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b, c, d, e, f, g) {
            a.call(this, b, c, d, e, f),
            this.spriteSheet = e,
            this.textureKey1 = f,
            this.textureKey2 = g,
            this.activeTextureKey = this.textureKey1,
            this._state = 1,
            this.events.onInputUp.add(this.switchTextures, this, 2)
        }
        return __extends(b, a),
        b.prototype.switchTextures = function() {
            this.activeTextureKey = this.activeTextureKey === this.textureKey1 ? this.textureKey2: this.textureKey1,
            this.frameName = this.activeTextureKey,
            this._state = this.activeTextureKey === this.textureKey1 ? 1 : 2
        },
        Object.defineProperty(b.prototype, "state", {
            get: function() {
                return this._state
            },
            enumerable: !0,
            configurable: !0
        }),
        b
    } (game.SimpleButton);
    a.ToggleButton = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "Pause Popup"),
            this.buttonsY = 0,
            this.exists = !1,
            this.visible = !1,
            this.addBack(),
            this.addButtons(),
            this.addText()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "interface", "PausePopup_Back0000", this),
            this.back.anchor.set(.5, .5)
        },
        c.prototype.addText = function() {
            var b = a.Main.texts.pause,
            c = {
                font: "80px " + a.Main.fontFamily,
                fill: "#E7B00E",
                align: "center"
            },
            d = new Phaser.Text(this.game, 0, 0, b, c);
            d.padding.x = 3,
            d.anchor.set(.5, .5),
            d.setShadow(4, 4, "#333333", 2),
            d.position.y = .25 * -this.back.height + 25,
            this.add(d)
        },
        c.prototype.addButtons = function() {
            var a = this;
            this.buttonsY = .25 * this.back.height - 25;
            var b = 120,
            c = new game.SimpleButton(this.game, -b, this.buttonsY, "interface", "Button_Menu0000");
            c.callback.addOnce(function() {
                a.game.changeState("MainMenu")
            },
            this);
            var d = new game.SimpleButton(this.game, 0, this.buttonsY, "interface", "Button_Next0000");
            d.callback.add(this.hide, this);
            var e = new game.ToggleButton(this.game, b, this.buttonsY, "interface", "Button_Sound_On0000", "Button_Sound_Off0000");
            e.callback.add(function() {
                a.game.sound.mute = !a.game.sound.mute
            }),
            this.game.sound.mute && e.switchTextures(),
            this.buttons = [c, d, e],
            this.buttons.forEach(function(b) {
                a.add(b)
            })
        },
        c.prototype.show = function() {
            this.exists = !0,
            this.visible = !0,
            this.startAnimation()
        },
        c.prototype.startAnimation = function() {
            this.tweenBoard(),
            this.enableButtons()
        },
        c.prototype.tweenBoard = function() {
            this.alpha = 0,
            this.scale.set(1.2, 1.2),
            this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            },
            400, Phaser.Easing.Back.Out, !0),
            this.game.add.tween(this).to({
                alpha: 1
            },
            400, Phaser.Easing.Cubic.Out, !0)
        },
        c.prototype.enableButtons = function() {
            this.buttons.forEach(function(a) {
                a.disableInput = !1
            })
        },
        c.prototype.hide = function() {
            this.disableButtons(),
            this.game.add.tween(this.scale).to({
                x: 1.2,
                y: 1.2
            },
            400, Phaser.Easing.Back.In, !0),
            this.game.add.tween(this).to({
                alpha: 0
            },
            400, Phaser.Easing.Cubic.In, !0).onComplete.addOnce(this.onHideComplete, this)
        },
        c.prototype.disableButtons = function() {
            this.buttons.forEach(function(a) {
                a.disableInput = !0
            })
        },
        c.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1;
            var a = this.game.state.getCurrentState();
            a.resume()
        },
        c.prototype.onRestart = function() {
            this.exists = !1,
            this.visible = !1
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0),
            this.buttons = null
        },
        c
    } (Phaser.Group);
    a.PauseBoard = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c, "coins_counter"),
            this.counter = 0,
            this.addBack(),
            this.addCoinImage(),
            this.addText();

        }
        return __extends(b, a),
        b.prototype.addBack = function() {
            this.back = this.game.add.image(18, 0, "interface", "RoundRect0000", this),
            this.back.anchor.set(0, .5)
        },
        b.prototype.addCoinImage = function() {
            this.coinImage = this.game.add.image(0, 0, "interface", "CoinsCounter0000", this),
            this.coinImage.anchor.set(.5, .5)
        },
        b.prototype.addText = function() {
            this.text = this.game.add.bitmapText(0, 0, "digits", "0", 41, this),
            this.text.anchor.set(1, .5),
            this.text.position.set(this.back.x + this.back.width - 14, 8)
        },
        b.prototype.updateCount = function(a, b) {
            void 0 === b && (b = !1),
            this.counter !== a && (this.counter = a, this.text.setText(a.toString()), b === !1 && this.playUpdateTween())
        },
        b.prototype.playUpdateTween = function() {
            var a = this;
            this.game.add.tween(this.text.scale).to({
                x: 1.25,
                y: .75
            },
            100, Phaser.Easing.Linear.None, !0).onComplete.addOnce(function() {
                a.game.add.tween(a.text.scale).to({
                    y: 1,
                    x: 1
                },
                400, Phaser.Easing.Back.Out, !0)
            })
        },
        b
    } (Phaser.Group);
    a.CoinsCounter = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b(c) {
            this.storage = c,
            this.getValue(b.TUTORIAL_COMPLETE) || this.saveValue(a.Booster.REMOVE, 1)
        }
        return b.prototype.getValue = function(a) {
            return this.storage.getValue(a)
        },
        b.prototype.getNumericValue = function(a) {
            var b = this.storage.getValue(a),
            c = parseFloat(b) || 0;
            return c
        },
        b.prototype.saveValue = function(a, b) {
            this.storage.saveValue(a, b)
        },
        b.prototype.increase = function(a, b) {
            void 0 === b && (b = 1);
            var c = parseInt(this.storage.getValue(a)),
            d = c + b;
            this.saveValue(a, d)
        },
        b.prototype.changeNumericValue = function(a, b) {
            var c = this.getNumericValue(a),
            d = c + b;
            return this.saveValue(a, d),
            d
        },
        b.BOOSTERS_WAS_SEEN = "Boosters_Was_Seen",
        b.TUTORIAL_COMPLETE = "Tutorial",
        b.COINS = "Coins",
        b
    } ();
    a.GameStats = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a),
            this._powerUpType = c,
            this.addBack(),
            this.addText()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            var a = this.game.add.image(0, 0, "interface", "PowerUp_Label0000", this);
            a.anchor.set(.5, .5)
        },
        c.prototype.addText = function() {
            var b = a.Main.texts.victory,
            c = {
                font: "20px " + a.Main.fontFamily,
                fill: "#BEC337",
                align: "center"
            };
            this.text = this.game.add.text( - 4, 0, b, c, this),
            this.text.padding.x = 2,
            this.text.padding.y = 2,
            this.text.anchor.set(.5, .5),
            this.text.setShadow(2, 2, "#333333", 1)
        },
        c.prototype.updateText = function(a) {
            this.text.setText(a.toString())
        },
        Object.defineProperty(c.prototype, "powerUpType", {
            get: function() {
                return this._powerUpType
            },
            enumerable: !0,
            configurable: !0
        }),
        c
    } (Phaser.Group);
    a.PowerUpLabel = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c),
            this.exists = !1,
            this.visible = !1,
            this.addBack(),
            this.addIcons(),
            this.addLabels(),
            this._powerUpSelectedSignal = new Phaser.Signal
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "interface", "ChoosePowerUp_Back0000", this),
            this.back.anchor.set(.5, 0),
            this.back.y += 3
        },
        c.prototype.addIcons = function() {
            var b = this;
            this.icons = [];
            var c = [a.Booster.MAGNET, a.Booster.SORTER, a.Booster.REMOVE],
            d = -100,
            e = 78,
            f = 100;
            c.forEach(function(c) {
                var g = "PowerUp_" + c + "0000",
                h = new a.SimpleButton(b.game, d, e, "interface", g);
                h.callback.add(b.onPowerUpSelected, b),
                h.userData = c,
                d += f,
                b.add(h),
                b.icons.push(h)
            })
        },
        c.prototype.addLabels = function() {
            var b = this;
            this.labels = [];
            var c = 42;
            this.icons.forEach(function(d) {
                var e = d.userData,
                f = a.Main.boosters.getBooster(e).num || 0,
                g = new a.PowerUpLabel(b.game, e);
                g.position.set(d.x + 28, c),
                g.updateText(f),
                b.add(g),
                b.labels.push(g)
            }),
            _.last(this.labels).x -= 6
        },
        c.prototype.onPowerUpSelected = function(a) {
            this._powerUpSelectedSignal.dispatch(a.userData),
            this.hide()
        },
        c.prototype.show = function() {
            this.exists = !0,
            this.visible = !0,
            this.updateLabels(),
            this.updateIcons(),
            this.alpha = 0,
            this.position.y = this.position.y + 30,
            this.game.add.tween(this).to({
                alpha: 1
            },
            200, Phaser.Easing.Quadratic.Out, !0),
            this.game.add.tween(this.position).to({
                y: this.position.y - 30
            },
            200, Phaser.Easing.Quadratic.Out, !0)
        },
        c.prototype.updateLabels = function() {
            this.labels.forEach(function(b) {
                var c = b.powerUpType,
                d = a.Main.boosters.getBooster(c).num;
                b.updateText(d)
            })
        },
        c.prototype.updateIcons = function() {
            this.icons.forEach(function(b) {
                var c = a.Main.boosters.getBooster(b.userData);
                0 === c.num ? (b.alpha = .5, b.input.enabled = !1) : (b.alpha = 1, b.input.enabled = !0)
            })
        },
        c.prototype.hide = function() {
            this.game.add.tween(this.position).to({
                y: this.position.y + 30
            },
            200, Phaser.Easing.Quadratic.Out, !0),
            this.game.add.tween(this).to({
                alpha: 0
            },
            200, Phaser.Easing.Quadratic.Out, !0).onComplete.addOnce(this.onHideComplete, this)
        },
        c.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1
        },
        Object.defineProperty(c.prototype, "powerUpSelectedSignal", {
            get: function() {
                return this._powerUpSelectedSignal
            },
            enumerable: !0,
            configurable: !0
        }),
        c
    } (Phaser.Group);
    a.ChoosePowerUpGUI = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b(b) {
            this._pType = b,
            this._title = a.Main.texts.boosters[this._pType].title,
            this._description = a.Main.texts.boosters[this._pType].description,
            this._hint = a.Main.texts.boosters[this._pType].hint,
            this._num = a.Main.stats.getNumericValue(this._pType),
            this._maxNum = a.Main.boostersConfig[this._pType].max,
            this.basePrice = a.Main.boostersConfig[this._pType].price,
            this._price = this.calculatePrice()
        }
        return b.prototype.calculatePrice = function() {
            return this.basePrice
        },
        Object.defineProperty(b.prototype, "description", {
            get: function() {
                return this._description
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "title", {
            get: function() {
                return this._title
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "pType", {
            get: function() {
                return this._pType
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "price", {
            get: function() {
                return this._price
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "num", {
            get: function() {
                return this._num
            },
            set: function(b) {
                b >= 0 && b <= this._maxNum && (this._num = b, this._price = this.calculatePrice(), a.Main.stats.saveValue(this._pType, b))
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "hint", {
            get: function() {
                return this._hint
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "maxNum", {
            get: function() {
                return this._maxNum
            },
            enumerable: !0,
            configurable: !0
        }),
        b.REMOVE = "Remove",
        b.MAGNET = "Magnet",
        b.SORTER = "Sort",
        b.EXTRA_UNDO = "Extra_Undo",
        b
    } ();
    a.Booster = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c),
            this.exists = !1,
            this.visible = !1,
            this._cancelSignal = new Phaser.Signal,
            this.addBack(),
            this.addCancelButton(),
            this.addHintText()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "interface", "PowerUp_Hint_Back0000", this),
            this.back.anchor.set(0, .5)
        },
        c.prototype.addCancelButton = function() {
            this.delimiter = this.back.width - 120,
            this.cancelButton = new a.SimpleButton(this.game, 0, 0, "interface", "Button_Close0000"),
            this.cancelButton.callback.add(this.cancel, this),
            this.cancelButton.x = this.delimiter + .5 * (this.back.width - this.delimiter),
            this.add(this.cancelButton)
        },
        c.prototype.addHintText = function() {
            var b = "ru" === a.Main.language ? "26px ": "34px ",
            c = {
                font: b + a.Main.fontFamily,
                fill: "#66CCCC",
                align: "center"
            },
            d = a.Main.boosters.getBooster(a.Booster.MAGNET).hint;
            this.hintText = this.game.add.text(0, 0, d, c, this),
            this.hintText.anchor.set(.5, .5),
            this.hintText.x = .5 * this.back.width - 55,
            this.hintText.lineSpacing = -10
        },
        c.prototype.cancel = function() {
            this._cancelSignal.dispatch(),
            this.hide()
        },
        c.prototype.show = function(b, c) {
            this.exists = !0,
            this.visible = !0,
            this.hintText.setText(b),
            this.position.y = .5 * -this.back.height,
            this.game.add.tween(this.position).to({
                y: c
            },
            400, Phaser.Easing.Back.Out, !0),
            a.Main.stats.getValue(a.GameStats.TUTORIAL_COMPLETE) ? this.cancelButton.enable() : this.cancelButton.disable()
        },
        c.prototype.hide = function() {
            this.game.add.tween(this.position).to({
                y: .5 * -this.back.height
            },
            400, Phaser.Easing.Back.In, !0).onComplete.addOnce(this.onHideComplete, this)
        },
        c.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1
        },
        c.prototype.getWidth = function() {
            return this.back.width
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1),
            this._cancelSignal.dispose(),
            this._cancelSignal = null
        },
        Object.defineProperty(c.prototype, "cancelSignal", {
            get: function() {
                return this._cancelSignal
            },
            enumerable: !0,
            configurable: !0
        }),
        c
    } (Phaser.Group);
    a.PowerUpHint = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, 0, 0, "digits", "+0", 45),
            this.totalCoins = 0,
            this.coinsCounter = c,
            this.exists = !1,
            this.visible = !1,
            this.anchor.set(.5, .5)
        }
        return __extends(b, a),
        b.prototype.show = function(a, b) {
            this.exists = !0,
            this.visible = !0,
            this.totalCoins = b,
            this.setText("+" + a.toString()),
            this.alpha = 0,
            this.y += 20,
            this.game.add.tween(this).to({
                alpha: 1
            },
            300, Phaser.Easing.Cubic.Out, !0),
            this.game.add.tween(this).to({
                y: this.y - 20
            },
            300, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(this.onScaleTweenComplete, this)
        },
        b.prototype.onScaleTweenComplete = function() {
            var a = this,
            b = this.coinsCounter.x + 80,
            c = this.coinsCounter.y,
            d = Phaser.Math.distance(b, c, this.x, this.y),
            e = d,
            f = 300;
            this.game.add.tween(this).to({
                x: b,
                y: c
            },
            e, Phaser.Easing.Cubic.In, !0, f),
            this.game.add.tween(this).to({
                alpha: .33
            },
            .5 * e, Phaser.Easing.Cubic.Out, !0, .5 * e + f).onComplete.addOnce(function() {
                a.coinsCounter.updateCount(a.totalCoins),
                a.hide()
            })
        },
        b.prototype.hide = function() {
            this.exists = !1,
            this.visible = !1
        },
        b.prototype.stop = function() {
            this.game.tweens.removeFrom(this.position),
            this.game.tweens.removeFrom(this),
            this.hide()
        },
        b
    } (Phaser.BitmapText);
    a.CoinsFX = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c, "undo_label"),
            this.num = 0,
            this.exists = !1,
            this.visible = !1,
            this.addBack(),
            this.addText()
        }
        return __extends(b, a),
        b.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "interface", "UndoLabel_Back0000", this),
            this.back.anchor.set(.5, .5)
        },
        b.prototype.addText = function() {
            this.text = this.game.add.bitmapText(0, 5, "digits", "0", 24, this),
            this.text.anchor.set(.5, .5)
        },
        b.prototype.updateNum = function(a) {
            this.num = a,
            this.text.setText(a.toString()),
            0 >= a ? (this.exists = !1, this.visible = !1) : (this.exists = !0, this.visible = !0)
        },
        b.prototype.hide = function() {
            this.exists = !1,
            this.visible = !1
        },
        b.prototype.show = function() {
            this.num > 0 && (this.exists = !0, this.visible = !0)
        },
        b
    } (Phaser.Group);
    a.UndoLabel = b
} (game || (game = {}));
var utils; !
function(a) {
    var b = function() {
        function a() {}
        return a.setAll = function(a, b, c) {
            for (var d = a.length; d--;) a[d] && (a[d][b] = c)
        },
        a
    } ();
    a.ArrayUtil = b
} (utils || (utils = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a) {
            b.call(this, a),
            this.addBack(),
            this.addItems(),
            this.placeItems(),
            this.addCentralItem()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "interface", "ItemsChain0000", this),
            this.back.anchor.set(.5, .5)
        },
        c.prototype.addItems = function() {
            this.items = [];
            for (var b = a.Item.ITEM_TYPES.length - 1,
            c = 0; b > c; c++) {
                var d = this.game.add.image(0, 0, "interface", "QuestionMark0000", this);
                d.anchor.set(.5, .5),
                this.items.push(d)
            }
        },
        c.prototype.placeItems = function() {
            var a = .5 * -Math.PI,
            b = 2 * Math.PI / this.items.length,
            c = 130;
            this.items.forEach(function(d) {
                var e = Math.cos(a) * c,
                f = Math.sin(a) * c;
                d.position.set(e - 2, f - 2),
                a += b
            })
        },
        c.prototype.addCentralItem = function() {
            this.centralItem = this.game.add.image(0, 0, "interface", "QuestionMark0000", this),
            this.centralItem.anchor.set(.5, .5),
            this.centralItem.scale.set(2, 2)
        },
        c.prototype.updateItems = function(b) {
            var c = this;
            this.items.forEach(function(d) {
                var e = c.items.indexOf(d),
                f = a.Item.ITEM_TYPES[e];
                if (b >= f) {
                    var g = "Item_" + a.ItemType[f] + "0000";
                    d.loadTexture("items", g),
                    d.scale.set(.5, .5)
                } else d.loadTexture("interface", "QuestionMark0000"),
                d.scale.set(1, 1)
            })
        },
        c.prototype.hideItems = function() {
            utils.ArrayUtil.setAll(this.items, "visible", !1)
        },
        c.prototype.showItems = function() {
            var b = this;
            if (a.Main.weakDevice) utils.ArrayUtil.setAll(this.items, "visible", !0);
            else {
                var c = 100;
                this.items.forEach(function(a) {
                    var d = a.scale.x,
                    e = a.scale.y;
                    a.visible = !0,
                    a.scale.set(0, 0),
                    b.game.add.tween(a.scale).to({
                        x: d,
                        y: e
                    },
                    300, Phaser.Easing.Cubic.Out, !0, c),
                    c += 100
                })
            }
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1),
            this.items = null
        },
        c
    } (Phaser.Group);
    a.GameOverItemsChain = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "Continue Hint"),
            this.exists = !1,
            this.visible = !1,
            this.addBack(),
            this.addText()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "boosters", "CoinsWarn_Back0000", this),
            this.back.anchor.set(.5, 1)
        },
        c.prototype.addText = function() {
            var b = "ru" === a.Main.language ? "26px ": "30px ",
            c = {
                font: b + a.Main.fontFamily,
                fill: "#FFE933",
                align: "center"
            },
            d = a.Main.texts.continue_hint;
            this.text = this.game.add.text(0, 0, d, c, this),
            this.text.anchor.set(.5, .5),
            this.text.y = this.back.y - .5 * this.back.height - 11,
            this.text.lineSpacing = -10
        },
        c.prototype.show = function(a) {
            this.exists = !0,
            this.visible = !0,
            this.alpha = 1,
            this.scale.set(0, 0),
            this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            },
            400, Phaser.Easing.Back.Out, !0, a).onComplete.addOnce(this.float, this)
        },
        c.prototype.float = function() {
            this.game.add.tween(this.position).to({
                y: this.position.y - 10
            },
            300, Phaser.Easing.Sinusoidal.InOut, !0, 0, 1e3, !0)
        },
        c.prototype.hide = function() {
            this.game.tweens.removeFrom(this.position),
            this.game.add.tween(this).to({
                alpha: 0
            },
            50, Phaser.Easing.Cubic.Out, !0, 1500).onComplete.addOnce(this.onHideComplete, this)
        },
        c.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1
        },
        c
    } (Phaser.Group);
    a.ContinueHint = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(c, d) {
            b.call(this, c, d, "Game Over Popup"),
            this.undoAfterHide = !1,
            this.exists = !1,
            this.visible = !1,
            this._undoSignal = new Phaser.Signal,
            this.mainGroup = this.game.add.group(this),
            this.mainGroup.position.x = a.Config.HALF_GAME_WIDTH,
            this.addGameOverText(),
            this.addBack(),
            this.addItemsChain(),
            this.addCoins(),
            this.addButtons(),
            this.addUndoLabel(),
            this.addHint()
        }
        return __extends(c, b),
        c.prototype.addGameOverText = function() {
            var b = a.Main.texts.game_over,
            c = {
                font: "70px " + a.Main.fontFamily,
                fill: "#E7B00E",
                align: "center"
            };
            this.gameOverText = this.game.add.text(0, 0, b, c, this),
            this.gameOverText.padding.x = 4,
            this.gameOverText.anchor.set(.5, .5),
            this.gameOverText.stroke = "#304557",
            this.gameOverText.strokeThickness = 12,
            this.gameOverText.setShadow(2, 2, "#121A21", 4),
            this.gameOverText.x = a.Config.HALF_GAME_WIDTH
        },
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "interface", "GameOver_Back0000", this.mainGroup),
            this.back.anchor.set(.5, .5)
        },
        c.prototype.addItemsChain = function() {
            this.itemsChain = new a.GameOverItemsChain(this.game),
            this.itemsChain.position.y = -40,
            this.mainGroup.add(this.itemsChain)
        },
        c.prototype.addCoins = function() {
            this.coinImage = this.game.add.image(0, 0, "interface", "CoinFX0000", this.mainGroup),
            this.coinImage.anchor.set(.5, .5),
            this.coinImage.position.set( - 40, 165),
            this.coinsText = this.game.add.bitmapText(0, 0, "digits", "0", 45, this.mainGroup),
            this.coinsText.anchor.set(0, .5),
            this.coinsText.y = this.coinImage.y + 6
        },
        c.prototype.addButtons = function() {
            var b = this,
            c = .5 * this.back.height + 20,
            d = 70,
            e = new a.SimpleButton(this.game, a.Config.HALF_GAME_WIDTH - d, c, "interface", "Button_Undo0000");
            e.callback.add(function() {
                b.undoAfterHide = !0,
                b.hide()
            });
            var f = new a.SimpleButton(this.game, a.Config.HALF_GAME_WIDTH + d, c, "interface", "Button_Next0000");
            f.callback.addOnce(this.gotoBoostersMenu, this),
            this.buttons = [e, f],
            this.buttons.forEach(function(a) {
                b.add(a)
            })
        },
        c.prototype.gotoBoostersMenu = function() {
            this.game.changeState("BoostersState")
        },
        c.prototype.addUndoLabel = function() {
            this.undoLabel = new a.UndoLabel(this.game, this),
            this.undoLabel.position.set(a.Config.HALF_GAME_WIDTH - 120, .5 * this.back.height + 20)
        },
        c.prototype.addHint = function() {
            this.hint = new a.ContinueHint(this.game, this)
        },
        c.prototype.show = function(b, c, d) {
            this.itemsChain.updateItems(b),
            this.itemsChain.hideItems(),
            this.updateCoins(c),
            this.undoLabel.updateNum(d),
            this.undoAfterHide = !1,
            this.exists = !0,
            this.visible = !0,
            this.scale.set(1, 1),
            this.alpha = 1,
            this.resize(),
            this.showGameOverText(),
            this.showBoard(600),
            this.showButtons(500),
            this.showUndoLabel(700),
            this.showHint(850),
            this.game.sound.usingWebAudio && a.Main.mainMusicLoop && (a.Main.mainMusicLoop.fadeTo(100, .1), this.game.sound.play("game_over", .66).onStop.addOnce(function() {
                a.Main.mainMusicLoop.fadeTo(300, .25)
            }))
        },
        c.prototype.updateCoins = function(a) {
            this.coinsText.setText(a.toString()),
            this.coinsText.x = -12,
            this.coinImage.x = this.coinsText.x - 31
        },
        c.prototype.showGameOverText = function() {
            this.gameOverText.scale.set(0, 0),
            this.game.add.tween(this.gameOverText.scale).to({
                x: 1,
                y: 1
            },
            600, Phaser.Easing.Back.Out, !0)
        },
        c.prototype.showBoard = function(b) {
            var c = this;
            a.Main.weakDevice === !1 ? (this.mainGroup.scale.set(1.2, 1.2), this.mainGroup.alpha = 0, this.game.add.tween(this.mainGroup).to({
                alpha: 1
            },
            400, Phaser.Easing.Cubic.Out, !0, b), this.game.add.tween(this.mainGroup.scale).to({
                x: 1,
                y: 1
            },
            400, Phaser.Easing.Back.Out, !0, b).onComplete.addOnce(function() {
                c.itemsChain.showItems()
            })) : this.itemsChain.showItems()
        },
        c.prototype.showButtons = function(a) {
            var b = this,
            c = a;
            this.buttons.forEach(function(a) {
                var d = a.y;
                a.disableInput = !1,
                a.y = d + 100,
                a.scale.set(0, 0),
                b.game.add.tween(a.scale).to({
                    x: 1,
                    y: 1
                },
                100, Phaser.Easing.Cubic.Out, !0, c),
                b.game.add.tween(a).to({
                    y: d
                },
                500, Phaser.Easing.Back.Out, !0, c),
                c += 80
            })
        },
        c.prototype.showUndoLabel = function(a) {
            var b = this.buttons[0].x + 30,
            c = this.buttons[0].y + 30 - 100;
            this.undoLabel.position.set(b, c),
            this.undoLabel.alpha = 0,
            this.game.add.tween(this.undoLabel).to({
                alpha: 1
            },
            100, Phaser.Easing.Linear.None, !0, a)
        },
        c.prototype.showHint = function(b) {
            if (a.Main.stats.getValue(a.GameStats.BOOSTERS_WAS_SEEN)) this.hint.exists = !1,
            this.hint.visible = !1;
            else {
                var c = this.buttons[1].x,
                d = this.buttons[1].y - 150;
                this.hint.position.set(c, d),
                this.hint.show(b)
            }
        },
        c.prototype.hide = function() {
            a.Main.weakDevice === !1 ? (this.disableButtons(), this.hint.hide(), this.game.add.tween(this.mainGroup.scale).to({
                x: 1.2,
                y: 1.2
            },
            400, Phaser.Easing.Back.In, !0), this.game.add.tween(this).to({
                alpha: 0
            },
            400, Phaser.Easing.Cubic.In, !0).onComplete.addOnce(this.onHideComplete, this)) : this.onHideComplete()
        },
        c.prototype.disableButtons = function() {
            this.buttons.forEach(function(a) {
                a.disableInput = !0
            })
        },
        c.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1,
            this.undoAfterHide && this._undoSignal.dispatch()
        },
        c.prototype.resize = function() {
            this.gameOverText.y = .12 * a.Config.GAME_HEIGHT,
            this.mainGroup.position.y = .5 * a.Config.GAME_HEIGHT,
            this.buttons.forEach(function(b) {
                b.y = .88 * a.Config.GAME_HEIGHT
            })
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1),
            this._undoSignal.dispose(),
            this._undoSignal = null,
            this.buttons = null
        },
        Object.defineProperty(c.prototype, "undoSignal", {
            get: function() {
                return this._undoSignal
            },
            enumerable: !0,
            configurable: !0
        }),
        c
    } (Phaser.Group);
    a.GameOverPopup = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(c) {
            var d = a.Main.texts.no_moves,
            e = {
                font: "70px " + a.Main.fontFamily,
                fill: "#E7B00E",
                align: "center"
            };
            b.call(this, c, 0, 0, d, e),
            this.exists = !1,
            this.visible = !1,
            this.anchor.set(.5, .5),
            this.stroke = "#304557",
            this.strokeThickness = 12,
            this.setShadow(2, 2, "#121A21", 4)
        }
        return __extends(c, b),
        c.prototype.show = function() {
            this.exists = !0,
            this.visible = !0,
            this.scale.set(.96, .96),
            this.alpha = 0,
            this.game.add.tween(this).to({
                alpha: 1
            },
            400, Phaser.Easing.Cubic.Out, !0),
            this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            },
            400, Phaser.Easing.Sinusoidal.InOut, !0, 0, 1, !0).onComplete.addOnce(this.hide, this)
        },
        c.prototype.hide = function() {
            this.game.add.tween(this.scale).to({
                x: 1.1,
                y: 1.1
            },
            300, Phaser.Easing.Cubic.In, !0),
            this.game.add.tween(this).to({
                alpha: 0
            },
            300, Phaser.Easing.Cubic.In, !0).onComplete.addOnce(this.onHideComplete, this)
        },
        c.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1
        },
        c
    } (Phaser.Text);
    a.NoPossibleMoves = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c),
            this.addBack(),
            this.addItemTitle(),
            this.addProgress()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "boosters", "CoinsWarn_Back0000", this),
            this.back.anchor.set(.5, 1)
        },
        c.prototype.addItemTitle = function() {
            var b = "ru" === a.Main.language ? "26px ": "34px ",
            c = {
                font: b + a.Main.fontFamily,
                fill: "#FFFF99",
                align: "center"
            };
            this.title = this.game.add.text(0, 0, "Medallion", c, this),
            this.title.anchor.set(.5, .5),
            this.title.y = this.back.top + .5 * this.title.height + 2
        },
        c.prototype.addProgress = function() {
            var b = "ru" === a.Main.language ? "26px ": "28px ",
            c = {
                font: b + a.Main.fontFamily,
                fill: "#FF9933",
                align: "center"
            };
            this.progress = this.game.add.text(0, 0, "1 from 15", c, this),
            this.progress.anchor.set(.5, .5),
            this.progress.y = this.title.y + .5 * this.title.height + 10
        },
        c.prototype.updateContent = function(a, b, c) {
            this.title.setText(a),
            this.progress.setText(b.toString() + " from " + c.toString())
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1)
        },
        c
    } (Phaser.Group);
    a.ProgressPopUp = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b, 0, 0, "interface", "Button_Undo0000")
        }
        return __extends(b, a),
        b.prototype.enable = function() {
            a.prototype.enable.call(this),
            this.frameName = "Button_Undo0000"
        },
        b.prototype.disable = function() {
            a.prototype.disable.call(this),
            this.frameName = "Button_Undo_Disabled0000"
        },
        b
    } (a.SimpleButton);
    a.UndoButton = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(c) {
            b.call(this, c, c.world, "gui"),
            this._guiHeight = 0,
            this.level = this.game.state.getCurrentState(),
            this._guiHeight = .17 * a.Config.GAME_HEIGHT,
            this._boosterSelected = new Phaser.Signal,
            this.addButtons(),
            this.addUndoLabel(),
            this.addCoinsCounter(),
            this.addCoinsFX(),
            this.addProgressPopup(),
            this.addPowerUpsGUI(),
            this.addPowerUpHint(),
            this.initPausePopup(),
            this.addNoMoves(),
            this.addGameOverPopup(),
            this.initRestartOverlay()
        }
        return __extends(c, b),
        c.prototype.addButtons = function() {
            var b = this,
            c = 102,
            d = .5 * this._guiHeight + 4;
            this._pauseButton = new a.SimpleButton(this.game, 0, d, "interface", "Button_Pause0000"),
            this._pauseButton.x = a.Config.GAME_WIDTH - 70,
            this._pauseButton.callback.add(this.level.pause, this.level),
            this._undoButton = new a.UndoButton(this.game),
            this._undoButton.x = this._pauseButton.x - c,
            this._boostersButton = new a.SimpleButton(this.game, 0, d, "interface", "Button_PowerUp0000"),
            this._boostersButton.x = this._undoButton.x - c,
            this._boostersButton.callback.add(this.togglePowerUpsGUI, this),
            this.buttons = [this._pauseButton, this._undoButton, this._boostersButton],
            this.buttons.forEach(function(a) {
                a.y = d,
                b.add(a)
            })
        },
        c.prototype.addUndoLabel = function() {
            this._undoLabel = new a.UndoLabel(this.game, this),
            this._undoLabel.x = this.undoButton.x + 45,
            this._undoLabel.y = this.undoButton.y + 45
        },
        c.prototype.addPowerUpsGUI = function() {
            this.chooseBoosterUI = new a.ChoosePowerUpGUI(this.game, this),
            this.chooseBoosterUI.powerUpSelectedSignal.add(this.onPowerUpSelected, this),
            this.chooseBoosterUI.position.set(this._boostersButton.x + 4, this._boostersButton.y + .5 * this._boostersButton.height - 14)
        },
        c.prototype.onPowerUpSelected = function(b) {
            var c = a.Main.boosters.getBooster(b);
            this.powerUpHint.show(c.hint, this._pauseButton.y),
            this._boosterSelected.dispatch(b),
            this.buttons.forEach(function(a) {
                a.visible = !1
            }),
            this.undoLabel.visible = !1,
            this.coinsCounter.visible = !1
        },
        c.prototype.onPowerUpComplete = function() {
            this.powerUpHint.hide(),
            this.buttons.forEach(function(a) {
                a.visible = !0
            }),
            this.undoLabel.show(),
            this.coinsCounter.visible = !0
        },
        c.prototype.onPowerUpCancel = function() {
            this.buttons.forEach(function(a) {
                a.visible = !0
            }),
            this.coinsCounter.visible = !0,
            this.level.boostersMode.cancel(),
            this.level.pointerEnabled = !0
        },
        c.prototype.addPowerUpHint = function() {
            this.powerUpHint = new a.PowerUpHint(this.game, this),
            this.powerUpHint.cancelSignal.add(this.onPowerUpCancel, this),
            this.powerUpHint.position.set(.5 * (a.Config.GAME_WIDTH - this.powerUpHint.getWidth()), this._pauseButton.y)
        },
        c.prototype.addCoinsCounter = function() {
            this._coinsCounter = new a.CoinsCounter(this.game, this),
            this._coinsCounter.position.set(70, this._pauseButton.y),
            this._coinsCounter.updateCount(a.Main.stats.getNumericValue(a.GameStats.COINS), !0)
        },
        c.prototype.addCoinsFX = function() {
            this.coinsFX = new a.CoinsFX(this.game, this._coinsCounter),
            this.add(this.coinsFX)
        },
        c.prototype.addProgressPopup = function() {
            this._progressPopup = new a.ProgressPopupSimple(this.game),
            this.add(this._progressPopup)
        },
        c.prototype.initPausePopup = function() {
            this.pausePopup = new a.PauseBoard(this.game, this),
            this.pausePopup.position.set(a.Config.HALF_GAME_WIDTH, .5 * a.Config.GAME_HEIGHT)
        },
        c.prototype.addNoMoves = function() {
            this._noMoves = new a.NoPossibleMoves(this.game),
            this._noMoves.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT),
            this.add(this._noMoves)
        },
        c.prototype.addGameOverPopup = function() {
            this._gameOverPopup = new a.GameOverPopup(this.game, this)
        },
        c.prototype.initRestartOverlay = function() {
            var b = utils.DrawUtil.createRectTexture(this.game, 1, 1, "#FFFFFF", "white_rect");
            this.restartOverlay = this.game.add.image(0, 0, b, null, this),
            this.restartOverlay.scale.set(a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT),
            this.restartOverlay.exists = !1,
            this.restartOverlay.visible = !1
        },
        c.prototype.togglePowerUpsGUI = function() {
            this.chooseBoosterUI.visible ? (this.chooseBoosterUI.hide(), this.level.pointerEnabled = !0) : (this.chooseBoosterUI.position.y = this._boostersButton.y + .5 * this._boostersButton.height - 16, this.chooseBoosterUI.show(), this.level.pointerEnabled = !1)
        },
        c.prototype.showRestartOverlay = function(a) {
            var b = this;
            void 0 === a && (a = 300),
            this.game.sound.usingWebAudio && this.game.sound.play("restart"),
            this.restartOverlay.exists = !0,
            this.restartOverlay.visible = !0,
            this.restartOverlay.alpha = 1,
            this.game.add.tween(this.restartOverlay).to({
                alpha: 0
            },
            a, Phaser.Easing.Linear.None, !0, 100).onComplete.addOnce(function() {
                b.restartOverlay.exists = !1,
                b.restartOverlay.visible = !1
            })
        },
        c.prototype.resize = function() {
            var b = this;
            this._guiHeight = .17 * a.Config.GAME_HEIGHT,
            this.buttons.forEach(function(a) {
                a.y = .5 * b._guiHeight
            });
            var c = 30;
            this._undoLabel.x = this.undoButton.x + c,
            this._undoLabel.y = this.undoButton.y + c,
            this._coinsCounter.y = .5 * this._guiHeight,
            this._gameOverPopup.resize()
        },
        c.prototype.onPause = function() {
            this.pausePopup.show(),
            this.buttons.forEach(function(a) {
                a.visible = !1
            }),
            this._undoLabel.hide()
        },
        c.prototype.onResume = function() {
            this.buttons.forEach(function(a) {
                a.visible = !0
            }),
            this._undoLabel.show()
        },
        c.prototype.onRestore = function() {
            this.coinsFX.stop(),
            this.showRestartOverlay()
        },
        c.prototype.onGameOver = function(a, b, c) {
            this.buttons.forEach(function(a) {
                a.visible = !1
            }),
            this.undoLabel.visible = !1,
            this.coinsCounter.visible = !1,
            this._gameOverPopup.show(a, b, c)
        },
        c.prototype.showElementsAfterGameOver = function() {
            this.buttons.forEach(function(a) {
                a.visible = !0
            }),
            this.undoLabel.visible = !0,
            this.coinsCounter.visible = !0
        },
        c.prototype.onGameComplete = function() {
            this.buttons.forEach(function(a) {
                a.visible = !1
            }),
            this.undoLabel.visible = !1,
            this.coinsCounter.visible = !1
        },
        c.prototype.showCoinsFX = function(a, b, c, d) {
            this.coinsFX.position.set(c, d),
            this.coinsFX.show(a, b)
        },
        c.prototype.enableButtons = function() {
            this.buttons.forEach(function(a) {
                a.enable()
            })
        },
        c.prototype.disableButtons = function() {
            this.buttons.forEach(function(a) {
                a.disable()
            })
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0),
            this._boosterSelected.dispose(),
            this._boosterSelected = null,
            this.level = null
        },
        Object.defineProperty(c.prototype, "coinsCounter", {
            get: function() {
                return this._coinsCounter
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "boosterSelected", {
            get: function() {
                return this._boosterSelected
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "undoLabel", {
            get: function() {
                return this._undoLabel
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "guiHeight", {
            get: function() {
                return this._guiHeight
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "undoButton", {
            get: function() {
                return this._undoButton
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "gameOverPopup", {
            get: function() {
                return this._gameOverPopup
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "boostersButton", {
            get: function() {
                return this._boostersButton
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "pauseButton", {
            get: function() {
                return this._pauseButton
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "noMoves", {
            get: function() {
                return this._noMoves
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "progressPopup", {
            get: function() {
                return this._progressPopup
            },
            enumerable: !0,
            configurable: !0
        }),
        c
    } (Phaser.Group);
    a.LevelGUI = b
} (game || (game = {}));
var game; !
function(a) { !
    function(a) {
        a[a.Clover = 0] = "Clover",
        a[a.Mushroom = 1] = "Mushroom",
        a[a.Skull = 2] = "Skull",
        a[a.Stone = 3] = "Stone",
        a[a.Caldron = 4] = "Caldron",
        a[a.Potion = 5] = "Potion",
        a[a.Hat = 6] = "Hat",
        a[a.Roll = 7] = "Roll",
        a[a.Book = 8] = "Book",
        a[a.Chest = 9] = "Chest",
        a[a.Diamond = 10] = "Diamond",
        a[a.Medallion = 11] = "Medallion",
        a[a.Sphere = 12] = "Sphere"
    } (a.ItemType || (a.ItemType = {}));
    a.ItemType
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a) {
            b.call(this, a, 0, 0, "items"),
            this._itemType = null,
            this.dropCell = null,
            this.exists = !1,
            this.visible = !1,
            this.anchor.set(.5, .5),
            this._collectCompleteSignal = new Phaser.Signal,
            this.initTweens()
        }
        return __extends(c, b),
        c.prototype.setItemType = function(b) {
            this._itemType = b,
            this._title = a.Main.texts.items[b],
            this.initTextures(),
            this.setNormalTexture()
        },
        c.prototype.initTextures = function() {
            var b = a.ItemType[this._itemType];
            this.normalTexture = "Item_" + b + "0000",
            this.highlightedTexture = "Item_" + b + "_Shine0000"
        },
        c.prototype.setNormalTexture = function() {
            this.frameName = this.normalTexture
        },
        c.prototype.setHighlightedTexture = function() {
            this.frameName = this.highlightedTexture
        },
        c.prototype.initTweens = function() {
            this.angle = -5,
            this.rotateTween = this.game.add.tween(this).to({
                angle: Math.abs(this.angle)
            },
            250, Phaser.Easing.Sinusoidal.Out, !0, 0, Number.MAX_VALUE, !0),
            this.rotateTween.pause(),
            this.angle = 0
        },
        c.prototype.highlight = function() {
            this.setHighlightedTexture(),
            this.game.add.tween(this.position).to({
                y: this.y - 12
            },
            200, Phaser.Easing.Quadratic.Out, !0, 0, 0, !0),
            a.Main.weakDevice === !1 && this.rotateTween.resume()
        },
        c.prototype.unhighlight = function() {
            this.rotateTween.pause(),
            this.angle = 0,
            this.cell && (this.game.tweens.removeFrom(this.position), this.position.set(this.cell.centerX, this.cell.centerY)),
            this.setNormalTexture()
        },
        c.prototype.showOnGrid = function(a, b) {
            a === !1 && (this.alpha = 0, this.game.add.tween(this).to({
                alpha: 1
            },
            100, Phaser.Easing.Linear.None, !0, b), this.y -= 35, this.showTween = this.game.add.tween(this).to({
                y: this.y + 35
            },
            500, Phaser.Easing.Back.Out, !0, b))
        },
        c.prototype.collect = function(a) {
            this.unhighlight(),
            this.game.add.tween(this).to({
                x: a.x,
                y: a.y
            },
            400, Phaser.Easing.Back.In, !0).onComplete.addOnce(this.onCollectComplete, this)
        },
        c.prototype.onCollectComplete = function() {
            this._collectCompleteSignal.dispatch(this),
            this.onAddToPool()
        },
        c.prototype.linkCell = function(a) {
            this.cell && this.clearCell(),
            this.cell = a,
            this.cell.item = this
        },
        c.prototype.clearCell = function() {
            this.cell && (this.cell.item = null, this.cell = null)
        },
        c.prototype.removeFromGrid = function() {
            this.showTween && (this.showTween.stop(), this.showTween = null),
            this.clearCell(),
            this.onAddToPool()
        },
        c.prototype.moveToCell = function(b, c) {
            var d = Phaser.Math.distance(this.x, this.y, b.centerX, b.centerY),
            e = d / a.Cell.HEIGHT * 200;
            return this.game.add.tween(this).to({
                x: b.centerX,
                y: b.centerY
            },
            e, Phaser.Easing.Quadratic.Out, !0, c),
            this.linkCell(b),
            e
        },
        c.prototype.dropToCell = function(a, b) {
            void 0 === b && (b = 0),
            this.dropTween && (this.dropTween.stop(!1), this.dropTween = null);
            var c = Phaser.Math.distance(this.x, this.y, a.centerX, a.centerY),
            d = 1.1 * c;
            return this.dropTween = this.game.add.tween(this).to({
                x: a.centerX,
                y: a.centerY
            },
            d, Phaser.Easing.Linear.None, !0, b),
            d
        },
        c.prototype.onAddToPool = function() {
            this.exists = !1,
            this.visible = !1
        },
        c.prototype.onRemoveFromPool = function() {
            this.exists = !0,
            this.visible = !0,
            this.alpha = 1,
            this.scale.set(1, 1),
            this.angle = 0,
            this.setNormalTexture()
        },
        c.prototype.alignToCellCenter = function() {
            this.cell && this.position.set(this.cell.centerX, this.cell.centerY)
        },
        c.prototype.upgrade = function() {
            var a = this,
            b = c.ITEM_TYPES.indexOf(this._itemType),
            d = c.ITEM_TYPES[b + 1];
            this.game.add.tween(this.scale).to({
                x: 0,
                y: 0
            },
            300, Phaser.Easing.Back.In, !0).onComplete.addOnce(function() {
                a.setItemType(d),
                a.game.add.tween(a.scale).to({
                    x: 1,
                    y: 1
                },
                300, Phaser.Easing.Back.Out, !0)
            })
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0),
            this._collectCompleteSignal.dispose(),
            this._collectCompleteSignal = null,
            this.clearCell(),
            this.destroyTweens()
        },
        c.prototype.destroyTweens = function() {
            this.rotateTween.stop(),
            this.rotateTween = null
        },
        Object.defineProperty(c.prototype, "itemType", {
            get: function() {
                return this._itemType
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "collectCompleteSignal", {
            get: function() {
                return this._collectCompleteSignal
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "title", {
            get: function() {
                return this._title
            },
            enumerable: !0,
            configurable: !0
        }),
        c.RADIUS = 55,
        c.RADIUS_SQUARED = c.RADIUS * c.RADIUS,
        c.CONTACT_RADIUS = 177,
        c.CONTACT_RADIUS_SQUARED = c.CONTACT_RADIUS * c.CONTACT_RADIUS,
        c.ITEM_TYPES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        c
    } (Phaser.Image);
    a.Item = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b, c, d, e) {
            a.call(this, b, 0, 0, "background", c),
            this.item = null,
            this._row = d,
            this._column = e
        }
        return __extends(b, a),
        b.prototype.isFree = function() {
            return null === this.item
        },
        b.prototype.toString = function() {
            return "Cell {row: " + this._row + ", column: " + this._column + "}"
        },
        Object.defineProperty(b.prototype, "centerX", {
            get: function() {
                return this.x + .5 * this.width
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "centerY", {
            get: function() {
                return this.y + .5 * this.height
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "column", {
            get: function() {
                return this._column
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "row", {
            get: function() {
                return this._row
            },
            enumerable: !0,
            configurable: !0
        }),
        b.WIDTH = 120,
        b.HEIGHT = 120,
        b
    } (Phaser.Image);
    a.Cell = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(c, d, e) {
            b.call(this, c, c.world, "grid_layer"),
            this._rows = 0,
            this._columns = 0,
            this._rows = d,
            this._columns = e,
            this.addCells(),
            a.Main.weakDevice === !1 && this.addGlow(),
            this.addFrame(),
            a.Main.weakDevice === !1 && this.addShadows()
        }
        return __extends(c, b),
        c.prototype.addCells = function() {
            this.cells = [];
            for (var a = !0,
            b = 0; b < this._rows; b++) {
                for (var c = 0; c < this._columns; c++) {
                    var d = a ? "Field_Block_Dark0000": "Field_Block_Light0000";
                    a = !a,
                    this.addCell(b, c, d)
                }
                a = !a
            }
        },
        c.prototype.addCell = function(b, c, d) {
            var e = b * this._columns + c;
            if (this.cells[e]) return null;
            var f = new a.Cell(this.game, d, b, c);
            return f.x = a.Cell.WIDTH * c,
            f.y = a.Cell.HEIGHT * b,
            this.cells[e] = f,
            this.add(f),
            f
        },
        c.prototype.addGlow = function() {
            this.glow = this.game.add.image(0, 0, "background", "Frame_Glow0000", this),
            this.glow.scale.set(2, 2),
            this.glow.x = -14,
            this.glow.y = -15,
            this.glow.exists = !1,
            this.glow.visible = !1
        },
        c.prototype.addFrame = function() {
            var a = this.game.add.image(0, 0, "background", "Frame0000", this);
            a.x = -25,
            a.y = -34
        },
        c.prototype.addShadows = function() {
            var b = this.game.add.image(0, 0, "background", "Frame_Shadow_Right0000", this);
            b.anchor.set(.5, .5),
            b.x = this._columns * a.Cell.WIDTH + 2,
            b.y = a.Cell.HEIGHT * this.rows * .5 - 15,
            this.setChildIndex(b, 0);
            var c = this.game.add.image(0, 0, "background", "Frame_Shadow_Bottom0000", this);
            c.anchor.set(.5, .5),
            c.x = .5 * this.columns * a.Cell.WIDTH + 4,
            c.y = this.rows * a.Cell.HEIGHT + 3,
            this.setChildIndex(c, 0)
        },
        c.prototype.getCellAt = function(a, b) {
            for (var c = this.cells.length,
            d = 0; c > d; d++) {
                var e = this.cells[d];
                if (e.row === a && e.column === b) return e
            }
            return null
        },
        c.prototype.getFreeCell = function() {
            for (var a = 0; a < this.cells.length; a++) {
                var b = this.cells[a];
                if (b.isFree()) return b
            }
            return null
        },
        c.prototype.getFreeCellsNum = function() {
            var a = 0;
            return this.cells.forEach(function(b) {
                b.isFree() && a++
            }),
            a
        },
        c.prototype.getCellUnderPoint = function(b, c) {
            var d = b - this.position.x,
            e = c - this.position.y,
            f = Math.floor(e / a.Cell.WIDTH),
            g = Math.floor(d / a.Cell.HEIGHT);
            return this.getCellAt(f, g)
        },
        c.prototype.topRowIsEmpty = function() {
            for (var a = 0; a < this._columns; a++) {
                var b = this.getCellAt(0, a);
                if (b.isFree() === !1) return ! 1
            }
            return ! 0
        },
        c.prototype.getWidth = function() {
            var a = this.cells[0].x,
            b = this.cells[this.cells.length - 1].x + this.cells[this.cells.length - 1].width;
            return b - a
        },
        c.prototype.getHeight = function() {
            var a = this.cells[0].y,
            b = this.cells[this.cells.length - 1].y + this.cells[this.cells.length - 1].height;
            return b - a
        },
        c.prototype.playGlow = function() {
            this.glow && (this.glow.exists = !0, this.glow.visible = !0, this.glow.alpha = .2, this.game.add.tween(this.glow).to({
                alpha: .66
            },
            600, Phaser.Easing.Sinusoidal.InOut, !0, 0, 1e3, !0))
        },
        c.prototype.stopGlow = function() {
            var a = this;
            this.glow && (this.game.tweens.removeFrom(this.glow), this.game.add.tween(this.glow).to({
                alpha: 0
            },
            100, Phaser.Easing.Linear.None, !0).onComplete.addOnce(function() {
                a.glow.visible = !1,
                a.glow.exists = !1
            }))
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1),
            this.cells = null
        },
        Object.defineProperty(c.prototype, "rows", {
            get: function() {
                return this._rows
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "columns", {
            get: function() {
                return this._columns
            },
            enumerable: !0,
            configurable: !0
        }),
        c
    } (Phaser.SpriteBatch);
    a.Grid = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b(a, b) {
            this._game = a,
            this.itemsLayer = b,
            this.initItems()
        }
        return b.prototype.initItems = function() {
            this.items = [];
            for (var b = 22,
            c = 0; b > c; c++) {
                var d = new a.Item(this._game);
                this.itemsLayer.add(d),
                this.items.push(d)
            }
        },
        b.prototype.getItem = function(b) {
            var c = this.getAvailableItem(b);
            return c || (c = new a.Item(this._game), c.setItemType(b), this.items.push(c), this.itemsLayer.add(c)),
            c.onRemoveFromPool(),
            c
        },
        b.prototype.getAvailableItem = function(a) {
            for (var b = this.items.length,
            c = 0; b > c; c++) {
                var d = this.items[c];
                if (d.exists === !1) return d.setItemType(a),
                d
            }
            return null
        },
        b.prototype.returnItem = function(a) {
            a.onAddToPool()
        },
        b.prototype.doReset = function() {
            for (var a = this.items.length,
            b = 0; a > b; b++) {
                var c = this.items[b];
                c.exists && this.returnItem(c)
            }
        },
        b.prototype.destroy = function() {
            this._game = null,
            this.itemsLayer = null,
            this.items.length = 0,
            this.items = null
        },
        b
    } ();
    a.ItemsPool = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a) {
            b.call(this, a, 0, 0, "items", "Chain_Link0000"),
            this.anchor.set(.5, .5),
            this.exists = !1,
            this.visible = !1,
            this.initTween()
        }
        return __extends(c, b),
        c.prototype.initTween = function() {
            this.scale.set(1, 0),
            this.showTween = this.game.add.tween(this.scale).to({
                y: 1
            },
            150, Phaser.Easing.Linear.None),
            this.scale.set(1, 1)
        },
        c.prototype.show = function() {
            this.visible = !0,
            this.exists = !0,
            a.Main.weakDevice === !1 && (this.scale.set(1, 0), this.showTween.start(), this.startRotateTween())
        },
        c.prototype.startRotateTween = function() {
            var a = Math.abs(this.angle),
            b = 45 === a || 135 === a ? 3.2 : 6;
            this.angle -= b,
            this.rotateTween = this.game.add.tween(this).to({
                angle: this.angle + 2 * b
            },
            40, Phaser.Easing.Linear.None, !0, 0, 1e3, !0)
        },
        c.prototype.hide = function() {
            this.rotateTween && (this.rotateTween.stop(), this.rotateTween = null),
            this.exists = !1,
            this.visible = !1
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0),
            this.showTween.stop(),
            this.showTween = null,
            this.rotateTween && (this.rotateTween.stop(), this.rotateTween = null)
        },
        c
    } (Phaser.Image);
    a.ChainLink = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b(a) {
            this.game = a,
            this.itemRnd = new Phaser.RandomDataGenerator([0]),
            this.initUpgradeLevels(),
            this.setNewSeed()
        }
        return b.prototype.initUpgradeLevels = function() {
            this.bestWorstTypes = [],
            this.bestWorstTypes[0] = 0,
            this.bestWorstTypes[1] = 0,
            this.bestWorstTypes[2] = 0,
            this.bestWorstTypes[3] = 0,
            this.bestWorstTypes[4] = 0,
            this.bestWorstTypes[5] = 0,
            this.bestWorstTypes[6] = 1,
            this.bestWorstTypes[7] = 1,
            this.bestWorstTypes[8] = 2,
            this.bestWorstTypes[9] = 2,
            this.bestWorstTypes[10] = 3,
            this.bestWorstTypes[11] = 3,
            this.bestWorstTypes[12] = 3
        },
        b.prototype.getWorstType = function(a) {
            return this.bestWorstTypes[a]
        },
        b.prototype.setAllowedItemTypes = function(a) {
            this.allowedItemTypes = a
        },
        b.prototype.getNewItemType = function() {
            return this.itemRnd.pick(this.allowedItemTypes)
        },
        b.prototype.updateAllowedItemTypes = function(a) {
            var b = _.max(a, "itemType").itemType,
            c = this.getWorstType(b),
            d = [];
            if (1 === b) d.push(0, 1);
            else for (var e = c; b > e; e++) d.push(e);
            this.setChances(d)
        },
        b.prototype.setChances = function(a) {
            this.allowedItemTypes.length = 0;
            for (var b = 1.25,
            c = a.length,
            d = 0; d < a.length; d++) {
                var e = a[d],
                f = 0;
                c > 1 ? (f = (100 - this.allowedItemTypes.length) / c, f = Math.floor(f * b)) : f = 100 - this.allowedItemTypes.length;
                for (var g = 0; f > g; g++) this.allowedItemTypes.push(e);
                c--
            }
        },
        b.prototype.setNewSeed = function() {
            this.itemRnd.sow(a.Main.stats.getValue(a.GameStats.TUTORIAL_COMPLETE) ? [Date.now()] : [3])
        },
        b.prototype.destroy = function() {
            this.game = null,
            this.itemRnd = null,
            this.allowedItemTypes = null,
            this.bestWorstTypes = null
        },
        b
    } ();
    a.ItemsGenerator = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function a(a, b) {
            this.stack = [],
            this.foundChain = [],
            this.game = a,
            this.grid = b
        }
        return a.prototype.getPossibleMove = function(a) {
            for (var b = a.length,
            c = 0; b > c; c++) {
                var d = a[c],
                e = this.getPossibleChain(d);
                if (e && e.length >= 3) return e
            }
            return null
        },
        a.prototype.getPossibleChain = function(a) {
            this.stack.length = 0,
            this.stack.push(a),
            this.foundChain.length = 0;
            for (var b = a.itemType; this.stack.length > 0;) {
                var c = this.stack.pop();
                if (this.foundChain.push(c), this.foundChain.length > 2) return this.foundChain;
                this.putInStack(c, b, -1, -1),
                this.putInStack(c, b, -1, 0),
                this.putInStack(c, b, -1, 1),
                this.putInStack(c, b, 0, 1),
                this.putInStack(c, b, 1, 1),
                this.putInStack(c, b, 1, 0),
                this.putInStack(c, b, 1, -1),
                this.putInStack(c, b, 0, -1)
            }
            return null
        },
        a.prototype.putInStack = function(a, b, c, d) {
            var e = this.getItem(a, c, d);
            e && this.itemGoodForChain(e, b) && this.stack.push(e)
        },
        a.prototype.getItem = function(a, b, c) {
            var d = a.cell,
            e = d.row + b,
            f = d.column + c;
            return e >= 0 && e < this.grid.rows && f >= 0 && f < this.grid.columns ? this.grid.getCellAt(e, f).item: void 0
        },
        a.prototype.itemGoodForChain = function(a, b) {
            return a.itemType === b && -1 === this.foundChain.indexOf(a)
        },
        a.prototype.destroy = function() {
            this.game = null,
            this.grid = null,
            this.stack = null,
            this.foundChain = null
        },
        a
    } ();
    a.FindChainStrategy = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function a(a, b) {
            this.dropDuration = 0,
            this.game = a,
            this.grid = b,
            this._onComplete = new Phaser.Signal
        }
        return a.prototype.dropItems = function(a) {
            this.items = a,
            this.dropDuration = 0,
            this.doDrop()
        },
        a.prototype.doDrop = function() {
            var a = this,
            b = !1,
            c = Number.MAX_VALUE;
            this.sortItemsBottomUp(),
            this.items.forEach(function(d) {
                var e = a.findBottomFreeCell(d.cell);
                e && (d.dropCell = e, d.linkCell(e), c = d.dropCell.row - 1, b = !0)
            }),
            this.sortItemsUpBottom();
            for (var d = 0; d < this.items.length; d++) {
                var e = this.items[d],
                f = this.findDropCell(e.cell);
                if (f && f.row < c) {
                    e.dropCell = f,
                    e.linkCell(f),
                    b = !0;
                    break
                }
            }
            b === !1 ? this.game.time.events.add(.25 * this.dropDuration, this.onDropComplete, this) : (this.items.forEach(function(b) {
                if (b.dropCell) {
                    var c = b.dropToCell(b.dropCell);
                    c > a.dropDuration && (a.dropDuration = c),
                    b.dropCell = null
                }
            }), this.game.time.events.add(.75 * this.dropDuration, this.doDrop, this))
        },
        a.prototype.sortItemsBottomUp = function() {
            this.items.sort(function(a, b) {
                var c = a.cell,
                d = b.cell;
                return c.row === d.row ? d.column - c.column: d.row - c.row
            })
        },
        a.prototype.sortItemsUpBottom = function() {
            this.items.sort(function(a, b) {
                var c = a.cell,
                d = b.cell;
                return c.row === d.row ? d.column - c.column: c.row - d.row
            })
        },
        a.prototype.findBottomFreeCell = function(a) {
            var b = this.grid.getCellAt(a.row + 1, a.column);
            return b && b.isFree() ? b: null
        },
        a.prototype.findDropCell = function(a) {
            var b = this.grid.getCellAt(a.row + 1, a.column);
            if (b && b.isFree()) return b;
            var c = this.grid.getCellAt(a.row, a.column + 1),
            d = this.grid.getCellAt(a.row + 1, a.column + 1);
            if (c && c.isFree() && d && d.isFree()) return d;
            var e = this.grid.getCellAt(a.row, a.column - 1),
            f = this.grid.getCellAt(a.row + 1, a.column - 1);
            return e && e.isFree() && f && f.isFree() ? f: null
        },
        a.prototype.onDropComplete = function() {
            this._onComplete.dispatch()
        },
        a.prototype.destroy = function() {
            this.game = null,
            this.grid = null,
            this.items = null,
            this._onComplete.dispose(),
            this._onComplete = null
        },
        Object.defineProperty(a.prototype, "onComplete", {
            get: function() {
                return this._onComplete
            },
            enumerable: !0,
            configurable: !0
        }),
        a
    } ();
    a.DropStrategy = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b(b, c) {
            this.moveUpDuration = 0,
            this.game = b,
            this.grid = c,
            this.dropStrategy = new a.DropStrategy(this.game, this.grid),
            this._addItemSignal = new Phaser.Signal,
            this._completeSignal = new Phaser.Signal
        }
        return b.prototype.alignAndRefill = function(a) {
            this.items = a,
            this.dropItems()
        },
        b.prototype.dropItems = function() {
            this.dropStrategy.onComplete.addOnce(this.refillGrid, this),
            this.dropStrategy.dropItems(this.items)
        },
        b.prototype.moveUpItems = function() {
            var a = _.min(this.items,
            function(a) {
                return a.cell.row
            }),
            b = a.cell.row;
            b > 0 ? (this.sortItemsForMoveUp(), this.doMoveUpItems(b), this.game.time.events.add(this.moveUpDuration, this.refillGrid, this)) : this.refillGrid()
        },
        b.prototype.sortItemsForMoveUp = function() {
            this.items.sort(function(a, b) {
                var c = a.cell,
                d = b.cell;
                return c.row === d.row ? d.column - c.column: c.row - d.row
            })
        },
        b.prototype.doMoveUpItems = function(a) {
            var b = this,
            c = 0,
            d = 0;
            this.items.forEach(function(e) {
                var f = b.grid.getCellAt(e.cell.row - a, e.cell.column),
                g = e.moveToCell(f, d) + d;
                g > c && (c = g),
                d += 20
            }),
            this.moveUpDuration = c
        },
        b.prototype.refillGrid = function() {
            var a = this.getCellToRefill();
            a.length > 0 && this.doRefillGrid(a),
            this.onComplete()
        },
        b.prototype.getCellToRefill = function() {
            var a = _.filter(this.grid.cells,
            function(a) {
                return a.isFree()
            });
            return a
        },
        b.prototype.doRefillGrid = function(a) {
            var b = this,
            c = 0;
            a.forEach(function(a) {
                b._addItemSignal.dispatch(a, c),
                c += 33
            })
        },
        b.prototype.onComplete = function() {
            this._completeSignal.dispatch()
        },
        b.prototype.destroy = function() {
            this.game = null,
            this.grid = null,
            this.items = null,
            this.dropStrategy.destroy(),
            this.dropStrategy = null,
            this._addItemSignal.dispose(),
            this._addItemSignal = null,
            this._completeSignal.dispose(),
            this._completeSignal = null
        },
        Object.defineProperty(b.prototype, "addItemSignal", {
            get: function() {
                return this._addItemSignal
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "completeSignal", {
            get: function() {
                return this._completeSignal
            },
            enumerable: !0,
            configurable: !0
        }),
        b
    } ();
    a.ItemsAligner = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function a(a, b) {
            this.itemType = null,
            this.row = a,
            this.column = b
        }
        return a
    } ();
    a.CellState = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b(b) {
            this.cellStates = [];
            for (var c = b.cells.length,
            d = 0; c > d; d++) {
                var e = b.cells[d],
                f = new a.CellState(e.row, e.column);
                f.row = e.row,
                f.column = e.column,
                f.itemType = e.isFree() ? null: e.item.itemType,
                this.cellStates[d] = f
            }
        }
        return b.prototype.destroy = function() {
            this.cellStates = null
        },
        b
    } ();
    a.GridState = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b(a, b) {
            this.game = a,
            this.parent = b,
            this.initChildren()
        }
        return b.prototype.initChildren = function() {
            this.vertLine = this.game.add.image(0, 0, "items", "GlowLine0000", this.parent),
            this.vertLine.height = 1.2 * a.Config.GAME_HEIGHT,
            this.horLine = this.game.add.image(0, 0, "items", "GlowLine0000", this.parent),
            this.horLine.angle = 90,
            this.horLine.height = 1.2 * a.Config.GAME_WIDTH,
            this.star = this.game.add.image(0, 0, "items", "GlowStar0000", this.parent),
            this.children = [this.vertLine, this.horLine, this.star],
            this.children.forEach(function(a) {
                a.anchor.set(.5, .5),
                a.exists = !1,
                a.visible = !1
            })
        },
        b.prototype.show = function(b) {
            var c = this,
            d = b.parent.getChildIndex(b);
            this.children.forEach(function(a) {
                c.parent.setChildIndex(a, d - 1),
                a.exists = !0,
                a.visible = !0
            }),
            this.vertLine.x = b.x,
            this.vertLine.y = a.Config.HALF_GAME_HEIGHT - this.parent.position.y,
            this.tweenLine(this.vertLine),
            this.horLine.x = a.Config.HALF_GAME_WIDTH - this.parent.position.x,
            this.horLine.y = b.y,
            this.tweenLine(this.horLine),
            this.star.position.set(b.x, b.y),
            this.star.alpha = 0,
            this.star.angle = 0,
            this.game.add.tween(this.star).to({
                alpha: 1
            },
            100, Phaser.Easing.Linear.None, !0).onComplete.addOnce(function() {
                c.game.add.tween(c.star).to({
                    angle: 60
                },
                800, Phaser.Easing.Cubic.Out, !0),
                c.game.add.tween(c.star).to({
                    alpha: 0
                },
                400, Phaser.Easing.Linear.None, !0, 400).onComplete.addOnce(c.hide, c)
            })
        },
        b.prototype.tweenLine = function(a) {
            var b = this,
            c = 700;
            a.scale.x = 1,
            a.alpha = 0,
            this.game.add.tween(a.scale).to({
                x: .92
            },
            66, Phaser.Easing.Sinusoidal.Out, !0, 0, 5, !0),
            this.game.add.tween(a).to({
                alpha: 1
            },
            c, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(function() {
                b.game.tweens.removeFrom(a.scale),
                b.game.add.tween(a).to({
                    alpha: 0
                },
                300, Phaser.Easing.Cubic.Out, !0),
                b.game.add.tween(a.scale).to({
                    x: 0
                },
                300, Phaser.Easing.Cubic.Out, !0)
            })
        },
        b.prototype.hide = function() {
            this.children.forEach(function(a) {
                a.exists = !1,
                a.visible = !1
            })
        },
        b.prototype.destroy = function() {
            this.children = null
        },
        b
    } ();
    a.RemoveItemFX = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b(a, b, c, d) {
            this.active = !1,
            this.game = a,
            this.grid = b,
            this.itemsLayer = c,
            this.itemsAligner = d,
            this._addItemSignal = new Phaser.Signal,
            this._onBoosterComplete = new Phaser.Signal,
            this._saveSignal = new Phaser.Signal,
            this.addRemoveItemFX(),
            this.initCallbacks()
        }
        return b.prototype.addRemoveItemFX = function() {
            a.Main.weakDevice === !1 && (this.removeItemFX = new a.RemoveItemFX(this.game, this.itemsLayer))
        },
        b.prototype.initCallbacks = function() {
            this.callbacks = {},
            this.callbacks[a.Booster.REMOVE] = this.applyRemoveItem,
            this.callbacks[a.Booster.MAGNET] = this.applyMagnet,
            this.callbacks[a.Booster.SORTER] = this.applySorter
        },
        b.prototype.activate = function(a, b) {
            this.active = !0,
            this.items = a,
            this.boosterType = b,
            this.game.input.onDown.add(this.onInputDown, this),
            this.startFloatItems(),
            this.grid.playGlow()
        },
        b.prototype.startFloatItems = function() {
            var a = this,
            b = 0,
            c = 0;
            this.items.forEach(function(d) {
                a.game.add.tween(d.position).to({
                    y: d.y - 7
                },
                500, Phaser.Easing.Sinusoidal.InOut, !0, c, 100, !0),
                ++b % 4 === 0 ? c = 0 : c += 100
            })
        },
        b.prototype.stopFloatItems = function() {
            var a = this;
            this.items.forEach(function(b) {
                a.game.tweens.removeFrom(b.position),
                b.alignToCellCenter()
            })
        },
        b.prototype.onInputDown = function(b) {
            if (this.active !== !1) {
                var c = this.grid.getCellUnderPoint(b.x / a.Config.WORLD_SCALE, b.y / a.Config.WORLD_SCALE);
                if (c && c.item) {
                    var d = this.callbacks[this.boosterType];
                    d && (this.active = !1, this.stopFloatItems(), this.grid.stopGlow(), this.beforePowerUpStart(), d.call(this, c.item))
                }
            }
        },
        b.prototype.applyRemoveItem = function(b) {
            var c = this;
            this.game.sound.usingWebAudio && a.Main.weakDevice === !1 && this.game.sound.play("lightning"),
            b.parent.setChildIndex(b, b.parent.children.length - 1),
            b.angle = -10,
            this.game.add.tween(b).to({
                alpha: 0
            },
            100, Phaser.Easing.Linear.None, !0, 700),
            this.game.add.tween(b.scale).to({
                x: 3,
                y: 3
            },
            800, Phaser.Easing.Back.In, !0),
            this.game.add.tween(b).to({
                angle: Math.abs(b.angle)
            },
            100, Phaser.Easing.Cubic.Out, !0, 0, 4, !0).onComplete.addOnce(function() {
                c.onRemoveItemComplete(b)
            }),
            this.removeItemFX ? this.removeItemFX.show(b) : b.setHighlightedTexture()
        },
        b.prototype.onRemoveItemComplete = function(a) {
            this.removeItem(a),
            this.updateGridAfterPowerUp()
        },
        b.prototype.applyMagnet = function(a) {
            this.game.sound.usingWebAudio && this.game.sound.play("magnet"),
            a.parent.setChildIndex(a, a.parent.children.length - 1),
            a.setHighlightedTexture(),
            this.game.add.tween(a.scale).to({
                x: 1.2,
                y: 1.2
            },
            400, Phaser.Easing.Cubic.Out, !0),
            this.game.add.tween(a.position).to({
                y: a.y - 10
            },
            150, Phaser.Easing.Sinusoidal.Out, !0, 0, 6, !0),
            this.attractItems(a)
        },
        b.prototype.attractItems = function(a) {
            this.game.sound.play("whoosh_up", .5);
            for (var b = _.filter(this.items,
            function(b) {
                return b.itemType === a.itemType
            }), c = 100, d = 0; d < b.length; d++) {
                var e = b[d];
                e !== a && (this.applyMagnetToItem(a, e, c), c += 33)
            }
            this.game.time.events.add(c + 400, this.onMagnetComplete, this, a)
        },
        b.prototype.applyMagnetToItem = function(a, b, c) {
            var d = this;
            this.game.add.tween(b).to({
                x: a.x,
                y: a.y
            },
            400, Phaser.Easing.Back.In, !0, c).onComplete.addOnce(function() {
                d.removeItem(b)
            })
        },
        b.prototype.onMagnetComplete = function(b) {
            this.game.sound.usingWebAudio && this.game.sound.play("new_item", .75);
            var c = a.Item.ITEM_TYPES.indexOf(b.itemType) + 1,
            d = a.Item.ITEM_TYPES[c],
            e = b.cell;
            this.game.tweens.removeFrom(b.position),
            this.removeItem(b),
            this._addItemSignal.dispatch(e, d),
            this.game.time.events.add(600, this.updateGridAfterPowerUp, this)
        },
        b.prototype.applySorter = function() {
            this.game.sound.usingWebAudio && a.Main.weakDevice === !1 && this.game.sound.play("shake"),
            this.shakeGrid(),
            this.sortItems()
        },
        b.prototype.shakeGrid = function() {
            if (a.Main.weakDevice === !1) {
                var b = 80,
                c = 10;
                this.game.add.tween(this.grid.position).to({
                    x: this.grid.position.x + c
                },
                b, Phaser.Easing.Sinusoidal.InOut, !0, 0, 5, !0),
                this.game.add.tween(this.itemsLayer.position).to({
                    x: this.itemsLayer.position.x + c
                },
                b, Phaser.Easing.Sinusoidal.InOut, !0, 0, 5, !0)
            }
        },
        b.prototype.sortItems = function() {
            var a = _.filter(this.grid.cells,
            function(a) {
                return a.isFree() === !1
            });
            this.items.sort(function(a, b) {
                return b.itemType - a.itemType
            }),
            this.items.forEach(function(a) {
                a.clearCell()
            });
            for (var b = this.items.length,
            c = new Phaser.Point(.5 * this.grid.getWidth(), .5 * this.grid.getHeight()), d = 0; b > d; d++) {
                var e = this.items[d];
                e.linkCell(a.pop()),
                e.scale.set(0, 0),
                e.position.set(c.x, c.y),
                this.game.add.tween(e.scale).to({
                    x: 1,
                    y: 1
                },
                500, Phaser.Easing.Back.Out, !0, 33 * d + 100);
                var f = this.game.add.tween(e).to({
                    x: e.cell.centerX,
                    y: e.cell.centerY
                },
                500, Phaser.Easing.Cubic.Out, !0, 33 * d);
                d === b - 1 && f.onComplete.addOnce(this.onPowerUpComplete, this)
            }
        },
        b.prototype.removeItem = function(a) {
            a.clearCell(),
            a.onAddToPool();
            var b = this.items.indexOf(a);
            b > -1 && this.items.splice(b, 1)
        },
        b.prototype.updateGridAfterPowerUp = function() {
            this.itemsAligner.completeSignal.addOnce(this.onPowerUpComplete, this),
            this.itemsAligner.alignAndRefill(this.items)
        },
        b.prototype.beforePowerUpStart = function() {
            this._saveSignal.dispatch(),
            a.Main.boosters.getBooster(this.boosterType).num--
        },
        b.prototype.onPowerUpComplete = function() {
            this.active = !1,
            this.game.input.onDown.remove(this.onInputDown, this),
            this._onBoosterComplete.dispatch(this.boosterType)
        },
        b.prototype.cancel = function() {
            this.active = !1,
            this.game.input.onDown.remove(this.onInputDown, this),
            this.stopFloatItems(),
            this.grid.stopGlow()
        },
        b.prototype.destroy = function() {
            this._onBoosterComplete.dispose(),
            this._onBoosterComplete = null,
            this._addItemSignal.dispose(),
            this._addItemSignal = null,
            this._saveSignal.dispose(),
            this._saveSignal = null,
            this.callbacks = null,
            this.items = null,
            this.grid = null,
            this.game = null,
            this.itemsAligner = null,
            this.removeItemFX && (this.removeItemFX.destroy(), this.removeItemFX = null)
        },
        Object.defineProperty(b.prototype, "onBoosterComplete", {
            get: function() {
                return this._onBoosterComplete
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "addItemSignal", {
            get: function() {
                return this._addItemSignal
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(b.prototype, "saveSignal", {
            get: function() {
                return this._saveSignal
            },
            enumerable: !0,
            configurable: !0
        }),
        b
    } ();
    a.PowerUpMode = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(c, d) {
            b.call(this, c, d, "background"),
            this.addBricks(),
            this.addRays(),
            this.addShadows(),
            a.Main.weakDevice === !1 && this.addWeb()
        }
        return __extends(c, b),
        c.prototype.addBricks = function() {
            for (var b = a.Config.HALF_GAME_WIDTH - 3,
            c = -40,
            d = 331,
            e = 0; 4 > e; e++) {
                var f = this.game.add.image(b, c, "background", "Bricks_Back0000", this);
                f.anchor.set(.5, 0),
                c += d,
                this.setChildIndex(f, 0)
            }
        },
        c.prototype.addRays = function() {
            this.rays = [],
            this.addRay( - 40, -50, -30, 1),
            this.addRay(40, -50, -30, 1),
            this.addRay(120, -50, -30, 1),
            this.addRay(380, -40, -30, 1, .66),
            this.addRay(440, -40, -30, 1, .66),
            this.addRay(500, -40, -30, 1, .66)
        },
        c.prototype.addRay = function(a, b, c, d, e) {
            void 0 === e && (e = 1);
            var f = 1 === d ? "Ray_10000": "Ray_20000",
            g = this.game.add.image(a, b, "background", f, this);
            g.anchor.set(.5, 0),
            g.angle = c,
            g.alpha = e,
            this.rays.push(g)
        },
        c.prototype.addWeb = function() {
            this.leftWeb = this.game.add.image(0, 0, "background", "Web0000", this),
            this.leftWeb.anchor.set(.5, .5),
            this.leftWeb.scale.set(.66, .66),
            this.leftWeb.angle = -90,
            this.leftWeb.x = .5 * this.leftWeb.height - 8,
            this.leftWeb.y = a.Config.GAME_HEIGHT - .5 * this.leftWeb.width + 8,
            this.rightWeb = this.game.add.image(0, 0, "background", "Web0000", this),
            this.rightWeb.anchor.set(.5, .5),
            this.rightWeb.scale.set(.75, .75),
            this.rightWeb.angle = 180,
            this.rightWeb.x = a.Config.GAME_WIDTH - .5 * this.rightWeb.width + 12,
            this.rightWeb.y = a.Config.GAME_HEIGHT - .5 * this.rightWeb.height + 8
        },
        c.prototype.addShadows = function() {
            this.topShadow = this.game.add.image(0, 0, "background", "Shadow0000", this),
            this.topShadow.anchor.set(.5, 1),
            this.topShadow.x = a.Config.HALF_GAME_WIDTH,
            this.topShadow.y = a.Config.GAME_HEIGHT - this.topShadow.height,
            this.topShadow.angle = 180,
            this.bottomShadow = this.game.add.image(0, 0, "background", "Shadow0000", this),
            this.bottomShadow.anchor.set(.5, 1),
            this.bottomShadow.x = a.Config.HALF_GAME_WIDTH,
            this.bottomShadow.y = a.Config.GAME_HEIGHT,
            this.leftShadow = this.game.add.image( - 1, 0, "background", "Shadow0000", this),
            this.leftShadow.anchor.set(.5, .5),
            this.leftShadow.x = .5 * this.leftShadow.height - 1,
            this.leftShadow.y = a.Config.HALF_GAME_HEIGHT,
            this.leftShadow.width = a.Config.GAME_HEIGHT,
            this.leftShadow.angle = 90,
            this.rightShadow = this.game.add.image(0, 0, "background", "Shadow0000", this),
            this.rightShadow.anchor.set(.5, .5),
            this.rightShadow.x = a.Config.GAME_WIDTH - .5 * this.rightShadow.height + 1,
            this.rightShadow.y = a.Config.HALF_GAME_HEIGHT,
            this.rightShadow.width = a.Config.GAME_HEIGHT,
            this.rightShadow.angle = -90
        },
        c.prototype.resize = function() {
            this.alignShadows(),
            this.alignRays(),
            a.Main.weakDevice === !1 && this.alignWebs()
        },
        c.prototype.alignShadows = function() {
            this.topShadow.y = -1,
            this.bottomShadow.y = a.Config.GAME_HEIGHT + 1,
            this.leftShadow.width = a.Config.GAME_HEIGHT,
            this.leftShadow.x = .5 * this.leftShadow.height - 5,
            this.leftShadow.y = a.Config.HALF_GAME_HEIGHT,
            this.rightShadow.width = a.Config.GAME_HEIGHT,
            this.rightShadow.x = a.Config.GAME_WIDTH - .5 * this.rightShadow.height + 5,
            this.rightShadow.y = a.Config.HALF_GAME_HEIGHT,
            a.Config.GAME_HEIGHT < 820 ? this.bottomShadow.visible = !1 : this.bottomShadow.visible = !0
        },
        c.prototype.alignRays = function() {
            this.rays.forEach(function(b) {
                b.height = .75 * a.Config.GAME_HEIGHT
            })
        },
        c.prototype.alignWebs = function() {
            this.leftWeb.y = a.Config.GAME_HEIGHT - .5 * this.leftWeb.width + 8,
            this.rightWeb.y = a.Config.GAME_HEIGHT - .5 * this.rightWeb.height + 8,
            a.Config.GAME_HEIGHT < 820 ? (this.leftWeb.visible = !1, this.rightWeb.visible = !1) : (this.leftWeb.visible = !0, this.rightWeb.visible = !0)
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1),
            this.rays = null
        },
        c
    } (Phaser.SpriteBatch);
    a.Background = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b, 0, 0, "items", "Star_Particle0000"),
            this.anchor.set(.5, .5),
            this.initTweens(),
            this.events.onAddedToGroup.addOnce(this.onAddedToGroup, this)
        }
        return __extends(b, a),
        b.prototype.onAddedToGroup = function() {
            this.exists = !1,
            this.visible = !1
        },
        b.prototype.initTweens = function() {
            this.scaleTween = this.game.add.tween(this.scale).to({
                x: 0,
                y: 0
            },
            400, Phaser.Easing.Linear.None, !1, 300),
            this.scaleTween.onComplete.add(this.onHideComplete, this)
        },
        b.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1
        },
        b.prototype.showParticle = function(a, b) {
            this.exists = !0,
            this.visible = !0,
            this.scale.set(1, 1),
            this.alpha = 1,
            this.angle = this.game.renderType === Phaser.CANVAS ? 0 : this.game.rnd.realInRange(120, 180),
            this.game.add.tween(this).to({
                x: a,
                y: b,
                angle: 0,
                alpha: .7
            },
            400, Phaser.Easing.Cubic.Out, !0),
            this.scaleTween.start()
        },
        b.prototype.destroy = function() {
            a.prototype.destroy.call(this, !0),
            this.scaleTween.stop(),
            this.scaleTween = null
        },
        b
    } (Phaser.Image);
    a.StarParticle = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b(a, b) {
            this.game = a,
            this.parentLayer = b,
            this.initParticles(),
            this.calculateOffsets()
        }
        return b.prototype.initParticles = function() {
            this.particles = [];
            for (var b = 0; 12 > b; b++) {
                var c = new a.StarParticle(this.game);
                this.parentLayer.add(c),
                this.particles.push(c)
            }
        },
        b.prototype.calculateOffsets = function() {
            this.offsets = [];
            for (var a = Phaser.ArrayUtils.numberArrayStep(0, 2 * Math.PI, 2 * Math.PI / this.particles.length), b = 0; b < this.particles.length; b++) {
                var c = this.game.rnd.realInRange(70, 90),
                d = a[b],
                e = new Phaser.Point;
                e.x = Math.cos(d) * c,
                e.y = Math.sin(d) * c,
                this.offsets.push(e)
            }
        },
        b.prototype.show = function(a) {
            for (var b = this.parentLayer.getChildIndex(a) - 1, c = 0; c < this.particles.length; c++) {
                var d = this.offsets[c],
                e = a.x + d.x,
                f = a.y + d.y,
                g = this.particles[c];
                g.position.set(a.x, a.y),
                g.showParticle(e, f),
                this.parentLayer.setChildIndex(g, b)
            }
        },
        b.prototype.destroy = function() {
            this.particles = null,
            this.offsets = null,
            this.parentLayer = null,
            this.game = null
        },
        b
    } ();
    a.ConvertItemFX = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b() {
            this.maxSaveNum = 3,
            this.gameStates = []
        }
        return b.prototype.save = function(b, c, d) {
            var e = new a.GameState;
            if (e.save(b, c, d), this.gameStates.push(e), this.gameStates.length > this.maxSaveNum) {
                var f = this.gameStates.shift();
                f.destroy(),
                f = null
            }
        },
        b.prototype.getLatestSave = function() {
            return this.gameStates.length > 0 ? this.gameStates.pop() : null
        },
        b.prototype.removeLatestSave = function() {
            if (this.gameStates.length > 0) {
                var a = this.gameStates.pop();
                a.destroy(),
                a = null
            }
        },
        b.prototype.savedStatesNum = function() {
            return this.gameStates.length
        },
        b.prototype.destroy = function() {
            this.gameStates.forEach(function(a) {
                a.destroy()
            }),
            this.gameStates = null
        },
        b
    } ();
    a.UndoHandler = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b() {}
        return b.prototype.save = function(b, c, d) {
            this.gridState = new a.GridState(b),
            this._coins = c,
            this.boosters = d
        },
        b.prototype.destroy = function() {
            this.gridState.destroy(),
            this.gridState = null,
            this.boosters = null
        },
        Object.defineProperty(b.prototype, "coins", {
            get: function() {
                return this._coins
            },
            enumerable: !0,
            configurable: !0
        }),
        b
    } ();
    a.GameState = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b, 0, 0, "game_complete", "Star_Particle0000"),
            this.alphaTweenDuration = 0,
            this.exists = !1,
            this.visible = !1,
            this.anchor.set(.5, .5),
            this._tweenComplete = new Phaser.Signal,
            this.initTweens()
        }
        return __extends(b, a),
        b.prototype.initTweens = function() {
            this.alphaTweenDuration = 200,
            this.alphaTween = this.game.add.tween(this).to({
                alpha: 0
            },
            this.alphaTweenDuration, Phaser.Easing.Linear.None, !1)
        },
        b.prototype.playTween = function(a) {
            var b = _.random(.5, 1, !0),
            c = _.random(260, 360) * Phaser.Math.randomSign(),
            d = 9 * (a - this.y),
            e = d - this.alphaTweenDuration;
            this.alpha = 1,
            this.scale.set(b, b),
            this.angle = 0,
            this.alphaTween.delay(e).start(),
            this.game.add.tween(this).to({
                y: a,
                angle: c
            },
            d, Phaser.Easing.Linear.None, !0).onComplete.add(this._tweenComplete.dispatch, this._tweenComplete)
        },
        b.prototype.destroy = function() {
            a.prototype.destroy.call(this, !0),
            this.alphaTween.stop(),
            this.alphaTween = null,
            this._tweenComplete.dispose(),
            this._tweenComplete = null
        },
        Object.defineProperty(b.prototype, "tweenComplete", {
            get: function() {
                return this._tweenComplete
            },
            enumerable: !0,
            configurable: !0
        }),
        b
    } (Phaser.Image);
    a.FadeParticle = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(c, d) {
            b.call(this, c, d, "Game Complete UI"),
            this.addRays(),
            a.Main.weakDevice === !1 && this.addParticles(),
            this.addSphere(),
            this.addVictoryText(),
            this.addStoneText(),
            this.addPlayButton()
        }
        return __extends(c, b),
        c.prototype.addRays = function() {
            var b = this.game.add.image(0, 0, "game_complete", "Ray0000", this);
            b.width *= 1.1;
            var c = 20,
            d = this.game.add.image(0, 0, "game_complete", "Ray0000", this);
            d.angle = c,
            d.width *= 1.2;
            var e = this.game.add.image(0, 0, "game_complete", "Ray0000", this);
            e.angle = -c,
            e.width *= 1.2,
            this.rays = [b, d, e],
            this.rays.forEach(function(b) {
                b.anchor.set(.5, .5),
                b.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT)
            })
        },
        c.prototype.addParticles = function() {
            this.particles = [];
            for (var b = 0; 15 > b; b++) {
                var c = new a.FadeParticle(this.game);
                this.add(c),
                this.particles.push(c)
            }
        },
        c.prototype.addSphere = function() {
            this.sphere = this.game.add.image(0, 0, "game_complete", "Sphere0000", this),
            this.sphere.anchor.set(.5, .5),
            this.sphere.x = a.Config.HALF_GAME_WIDTH
        },
        c.prototype.addVictoryText = function() {
            var b = a.Main.texts.victory,
            c = {
                font: "90px " + a.Main.fontFamily,
                fill: "#BEC337",
                align: "center"
            };
            this.victoryText = this.game.add.text(0, 0, b, c, this.game.world),
            this.victoryText.anchor.set(.5, .5),
            this.victoryText.padding.y = 4,
            this.victoryText.setShadow(2, 2, "#333333", 4),
            this.victoryText.stroke = "#FFFFCC",
            this.victoryText.strokeThickness = 14,
            this.victoryText.x = a.Config.HALF_GAME_WIDTH
        },
        c.prototype.addStoneText = function() {
            var b = a.Main.texts.stone,
            c = {
                font: "44px " + a.Main.fontFamily,
                fill: "#98CBCB",
                align: "center"
            };
            this.stoneText = this.game.add.text(0, 0, b, c, this.game.world),
            this.stoneText.padding.x = 4,
            this.stoneText.anchor.set(.5, .5),
            this.stoneText.setShadow(2, 2, "#080C0F", 2),
            this.stoneText.x = a.Config.HALF_GAME_WIDTH,
            this.stoneText.lineSpacing = -16
        },
        c.prototype.addPlayButton = function() {
            this.playButton = new a.SimpleButton(this.game, 0, 0, "interface", "Button_Play0000"),
            this.playButton.callback.addOnce(this.gotoMainMenu, this),
            this.playButton.x = a.Config.HALF_GAME_WIDTH,
            this.game.world.add(this.playButton)
        },
        c.prototype.gotoMainMenu = function() {
            this.game.changeState("MainMenu")
        },
        c.prototype.show = function() {
            this.exists = !0,
            this.visible = !0,
            this.resize(),
            this.particles && this.showParticles(),
            this.tweenRays(),
            this.tweenVictoryText(400),
            this.tweenTexts(1200),
            this.tweenPlayButton(1800),
            this.game.sound.usingWebAudio && a.Main.mainMusicLoop && (a.Main.mainMusicLoop.fadeTo(100, .1), this.game.sound.play("game_complete").onStop.addOnce(function() {
                a.Main.mainMusicLoop.fadeTo(300, .25)
            }))
        },
        c.prototype.showParticles = function() {
            var a = this,
            b = 0;

            this.particles.forEach(function(c) {
                a.game.time.events.add(b, a.showParticle, a, c),
                b += 120
            })
        },
        c.prototype.showParticle = function(a) {
            a.exists = !0,
            a.visible = !0,
            a.x = _.random(this.sphere.x - 60, this.sphere.x + 70),
            a.y = this.sphere.y;
            var b = a.y + _.random(150, 200);
            a.tweenComplete.add(this.onParticleTweenComplete, this),
            a.playTween(b)
        },
        c.prototype.onParticleTweenComplete = function(a) {
            a.x = _.random(this.sphere.x - 60, this.sphere.x + 70),
            a.y = this.sphere.y;
            var b = a.y + _.random(150, 200);
            a.playTween(b)
        },
        c.prototype.tweenVictoryText = function(a) {
            this.victoryText.angle = -2,
            this.victoryText.alpha = 0,
            this.game.add.tween(this.victoryText).to({
                alpha: 1
            },
            300, Phaser.Easing.Cubic.Out, !0, a),
            this.game.add.tween(this.victoryText.scale).to({
                x: 1.2,
                y: .9
            },
            300, Phaser.Easing.Sinusoidal.InOut, !0, 0, 1e3, !0),
            this.game.add.tween(this.victoryText).to({
                angle: Math.abs(this.victoryText.angle)
            },
            600, Phaser.Easing.Sinusoidal.InOut, !0, 0, 1e3, !0)
        },
        c.prototype.tweenTexts = function(a) {
            this.stoneText.x += 30,
            this.stoneText.alpha = 0,
            this.game.add.tween(this.stoneText).to({
                x: this.stoneText.x - 30,
                alpha: 1
            },
            400, Phaser.Easing.Cubic.Out, !0, a)
        },
        c.prototype.tweenPlayButton = function(a) {
            this.playButton.scale.set(0, 0),
            this.game.add.tween(this.playButton.scale).to({
                x: 1,
                y: 1
            },
            500, Phaser.Easing.Back.Out, !0, a)
        },
        c.prototype.tweenRays = function() {
            var a = this,
            b = 0;
            this.rays.forEach(function(c) {
                a.game.add.tween(c.scale).to({
                    y: 1.2
                },
                100, Phaser.Easing.Sinusoidal.Out, !0, b, Number.MAX_VALUE, !0),
                b += 100
            })
        },
        c.prototype.resize = function() {
            var b = this;
            this.sphere.y = .4 * a.Config.GAME_HEIGHT,
            this.rays.forEach(function(a) {
                a.position.set(b.sphere.x, b.sphere.y)
            }),
            this.victoryText.y = this.sphere.y - .27 * a.Config.GAME_HEIGHT,
            this.stoneText.y = this.sphere.y + .25 * a.Config.GAME_HEIGHT;
            var c = this.stoneText.y + .5 * this.stoneText.height;
            this.playButton.y = c + .5 * (a.Config.GAME_HEIGHT - c)
        },
        c.prototype.update = function() {
            this.visible && (this.sphere.angle += .25)
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1),
            this.rays = null,
            this.particles && (this.particles = null)
        },
        c
    } (Phaser.SpriteBatch);
    a.GameCompleteUI = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b, 0, 0, "tutorial", "Hand0000"),
            this.exists = !1,
            this.visible = !1
        }
        return __extends(b, a),
        b.prototype.followPath = function(a) {
            this.exists = !0,
            this.visible = !0,
            this.path = a,
            this.currentPoint = _.first(this.path),
            this.position.set(this.currentPoint.x, this.currentPoint.y),
            this.moveAlongPath()
        },
        b.prototype.moveAlongPath = function() {
            var a = this;
            this.currentPoint === _.first(this.path) && (this.alpha = 0, this.game.add.tween(this).to({
                alpha: 1
            },
            400, Phaser.Easing.Cubic.Out, !0));
            var b = this.getNextPoint(),
            c = 2.5 * this.currentPoint.distance(b);
            if (b === _.last(this.path)) this.game.add.tween(this).to({
                alpha: 0
            },
            c, Phaser.Easing.Cubic.In, !0);
            else if (b === _.first(this.path)) return void this.game.time.events.add(500,
            function() {
                a.path && (a.currentPoint = b, a.position.set(a.currentPoint.x, a.currentPoint.y), a.moveAlongPath())
            },
            this);
            this.game.add.tween(this).to({
                x: b.x,
                y: b.y
            },
            c, Phaser.Easing.Linear.None, !0).onComplete.addOnce(function() {
                a.currentPoint = b,
                a.moveAlongPath()
            })
        },
        b.prototype.getNextPoint = function() {
            var a = this.path.indexOf(this.currentPoint),
            b = a === this.path.length - 1 ? 0 : a + 1;
            return this.path[b]
        },
        b.prototype.stopFollowPath = function() {
            this.path = null,
            this.hide()
        },
        b.prototype.pointAt = function(a, b) {
            void 0 === b && (b = 0),
            this.exists = !0,
            this.visible = !0,
            this.alpha = 0,
            this.game.add.tween(this).to({
                alpha: 1
            },
            200, Phaser.Easing.Cubic.Out, !0, b),
            this.position.set(a.x, a.y + 30),
            this.game.add.tween(this).to({
                y: a.y
            },
            400, Phaser.Easing.Cubic.Out, !0, b, 1e3, !0)
        },
        b.prototype.hide = function() {
            this.game.tweens.removeFrom(this),
            this.game.add.tween(this).to({
                alpha: 0
            },
            100, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(this.onHideComplete, this)
        },
        b.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1
        },
        b.prototype.destroy = function() {
            a.prototype.destroy.call(this, !0),
            this.path = null,
            this.currentPoint = null
        },
        b
    } (Phaser.Image);
    a.Hand = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b(b, c) {
            this.currentLine = 0,
            this.game = b,
            this.parent = c,
            this._hideComplete = new Phaser.Signal,
            this.tutorialLines = a.Main.texts.tutorial,
            this.addBack(),
            this.addWizard(),
            this.addText(),
            this.setTextLine(0)
        }
        return b.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "tutorial", "TutorText_Back0000", this.parent),
            this.back.width = a.Config.GAME_WIDTH,
            this.back.height = 100,
            this.back.anchor.set(.5, 0),
            this.back.position.set(a.Config.HALF_GAME_WIDTH, a.Config.GAME_HEIGHT - this.back.height)
        },
        b.prototype.addWizard = function() {
            this.wizard = this.game.add.image(0, 0, "tutorial", "Wizard_Head0000", this.parent),
            this.wizard.anchor.set(.5, .5),
            this.wizard.position.set(.87 * a.Config.GAME_WIDTH, this.back.y - 10)
        },
        b.prototype.addText = function() {
            var b = "ru" === a.Main.language ? "28px ": "32px ",
            c = {
                font: b + a.Main.fontFamily,
                fill: "#66CCCC",
                align: "center"
            },
            d = this.tutorialLines[0];
            this.text = this.game.add.text(0, 0, d, c, this.game.world),
            this.text.anchor.set(.5, .5),
            this.text.x = .5 * this.wizard.left + 6,
            this.text.y = this.back.y + .5 * this.back.height,
            this.text.lineSpacing = -10
        },
        b.prototype.setTextLine = function(a) {
            if (a < this.tutorialLines.length) {
                var b = this.tutorialLines[a];
                this.text.setText(b),
                this.currentLine = a
            }
        },
        b.prototype.show = function() {
            this.back.alpha = 0,
            this.game.add.tween(this.back).to({
                alpha: 1
            },
            200, Phaser.Easing.Cubic.Out, !0),
            this.wizard.scale.set(0, 0),
            this.game.add.tween(this.wizard.scale).to({
                x: 1,
                y: 1
            },
            500, Phaser.Easing.Back.Out, !0, 200),
            this.text.scale.set(0, 0),
            this.game.add.tween(this.text.scale).to({
                x: 1,
                y: 1
            },
            400, Phaser.Easing.Cubic.Out, !0, 700)
        },
        b.prototype.playNextLine = function() {
            this.game.sound.usingWebAudio && this.currentLine % 2 === 0 && this.game.sound.play("mumble"),
            this.tweenWizard(),
            this.tweenText()
        },
        b.prototype.tweenWizard = function() {
            var a = this;
            this.game.tweens.removeFrom(this.wizard),
            this.game.tweens.removeFrom(this.wizard.scale),
            this.wizard.angle = 0,
            this.game.add.tween(this.wizard.scale).to({
                x: .7,
                y: .7
            },
            100, Phaser.Easing.Linear.None, !0).onComplete.addOnce(function() {
                a.game.add.tween(a.wizard.scale).to({
                    x: 1,
                    y: 1
                },
                400, Phaser.Easing.Back.Out, !0),
                a.game.add.tween(a.wizard).to({
                    angle: -6
                },
                100, Phaser.Easing.Sinusoidal.InOut, !0, 0, 2, !0)
            })
        },
        b.prototype.tweenText = function() {
            this.setTextLine(this.currentLine + 1),
            this.game.tweens.removeFrom(this.text.scale),
            this.text.scale.set(0, 0),
            this.game.add.tween(this.text.scale).to({
                x: 1,
                y: 1
            },
            300, Phaser.Easing.Cubic.Out, !0)
        },
        b.prototype.hide = function() {
            this.game.add.tween(this.wizard.scale).to({
                x: 0,
                y: 0
            },
            400, Phaser.Easing.Back.In, !0),
            this.game.add.tween(this.text.scale).to({
                x: 0,
                y: 0
            },
            400, Phaser.Easing.Back.In, !0, 300),
            this.game.add.tween(this.back).to({
                alpha: 0
            },
            200, Phaser.Easing.Cubic.In, !0, 600).onComplete.addOnce(this._hideComplete.dispatch, this._hideComplete)
        },
        b.prototype.resize = function() {
            this.back.y = a.Config.GAME_HEIGHT - this.back.height,
            this.wizard.y = this.back.y - 20,
            this.text.y = this.back.y + .5 * this.back.height
        },
        b.prototype.destroy = function() {
            this.tutorialLines = null,
            this.text.destroy(),
            this.text = null,
            this._hideComplete.dispose(),
            this._hideComplete = null
        },
        Object.defineProperty(b.prototype, "hideComplete", {
            get: function() {
                return this._hideComplete
            },
            enumerable: !0,
            configurable: !0
        }),
        b
    } ();
    a.WizardTutor = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c, d) {
            b.call(this, a, c),
            this.clicks = 0,
            this.level = d,
            this._onComplete = new Phaser.Signal,
            this.initAllowedItems(),
            this.addGridOverlay(),
            this.addHand(),
            this.addWizard()
        }
        return __extends(c, b),
        c.prototype.initAllowedItems = function() {
            var a = this.level.grid;
            this._allowedItems = [a.getCellAt(3, 1).item, a.getCellAt(2, 2).item, a.getCellAt(1, 2).item];
            this._allowedItems.every(function(a) {
                return a && 0 === a.itemType
            })
        },
        c.prototype.addGridOverlay = function() {
            this.gridOverlay = this.game.add.image(0, 0, "tutorial", "Grid_Overlay0000", this),
            this.gridOverlay.anchor.set(.5, .5),
            this.gridOverlay.scale.set(2, 2),
            this.gridOverlay.exists = !1,
            this.gridOverlay.visible = !1
        },
        c.prototype.addHand = function() {
            this.hand = new a.Hand(this.game),
            this.add(this.hand)
        },
        c.prototype.addWizard = function() {
            this.wizard = new a.WizardTutor(this.game, this)
        },
        c.prototype.resize = function() {
            this.gridOverlay.x = a.Config.HALF_GAME_WIDTH + 3,
            this.gridOverlay.y = this.level.grid.position.y + .5 * this.gridOverlay.height - 6,
            this.wizard.resize()
        },
        c.prototype.show = function() {
            this.level.pointerEnabled = !1,
            this.level.gui.pauseButton.visible = !1,
            this.level.gui.undoButton.visible = !1,
            this.level.gui.boostersButton.visible = !1,
            this.level.itemsLayer.visible = !1,
            this.wizard.show(),
            this.game.input.onDown.add(this.onInputDown, this)
        },
        c.prototype.onInputDown = function() {
            switch (this.clicks) {
            case 1:
                this.showItems(),
                this.wizard.playNextLine();
                break;
            case 2:
                this.game.input.onDown.remove(this.onInputDown, this),
                this.wizard.playNextLine(),
                this.showCombineTutorial(),
                this.level.gui.undoLabel.alpha = 0,
                this.level.firstComboComplete.addOnce(this.onFirstComboComplete, this),
                this.level.pointerEnabled = !0;
                break;
            case 3:
                this.game.input.onDown.remove(this.onInputDown, this),
                this.wizard.playNextLine(),
                this.hand.pointAt(new Phaser.Point(this.level.gui.undoButton.x - 10, this.level.gui.undoButton.y + 30)),
                this.level.gui.undoButton.events.onInputUp.addOnce(this.onUndoComplete, this, 2),
                this.level.gui.undoButton.visible = !0;
                break;
            case 4:
                this.game.input.onDown.remove(this.onInputDown, this),
                this.wizard.playNextLine(),
                this.hand.pointAt(new Phaser.Point(this.level.gui.boostersButton.x - 10, this.level.gui.boostersButton.y + 30)),
                this.level.gui.boostersButton.events.onInputUp.addOnce(this.onBoostersUIShow, this, 2),
                this.level.gui.boostersButton.visible = !0;
                break;
            case 7:
                this.game.input.onDown.remove(this.onInputDown, this),
                this.hide();
                break;
            default:
                this.wizard.playNextLine()
            }
            this.clicks++
        },
        c.prototype.hide = function() {
            this.wizard.hideComplete.addOnce(this.onHideComplete, this),
            this.wizard.hide()
        },
        c.prototype.onHideComplete = function() {
            this.level.gui.undoLabel.alpha = 1,
            this.level.gui.undoButton.disableInput = !1,
            this.level.gui.pauseButton.input.enabled = !0,
            this.level.gui.boostersButton.input.enabled = !0,
            this._onComplete.dispatch()
        },
        c.prototype.showItems = function() {
            this.level.itemsLayer.visible = !0;
            var a = 0;
            this.level.activeItems.forEach(function(b) {
                b.showOnGrid(!1, a),
                a += 33
            })
        },
        c.prototype.showCombineTutorial = function() {
            this.showGridOverlay(),
            this.showHandWithPath()
        },
        c.prototype.showGridOverlay = function() {
            this.gridOverlay.exists = !0,
            this.gridOverlay.visible = !0
        },
        c.prototype.showHandWithPath = function() {
            var a = this.createPath();
            this.hand.followPath(a)
        },
        c.prototype.createPath = function() {
            for (var a = this.level.grid,
            b = [a.getCellAt(4, 1), a.getCellAt(3, 1), a.getCellAt(2, 2), a.getCellAt(1, 2), a.getCellAt(0, 2)], c = [], d = 0; d < b.length; d++) {
                var e = b[d],
                f = new Phaser.Point(e.centerX + a.position.x, e.centerY + a.position.y);
                c[d] = f
            }
            return c
        },
        c.prototype.onFirstComboComplete = function() {
            this.game.input.onDown.add(this.onInputDown, this),
            this.level.pointerEnabled = !1,
            this.gridOverlay.visible = !1,
            this.hand.stopFollowPath(),
            this.wizard.playNextLine()
        },
        c.prototype.onUndoComplete = function() {
            this.game.input.onDown.add(this.onInputDown, this),
            this.allowedItems.length = 0,
            this.hand.hide(),
            this.wizard.playNextLine(),
            this.level.pointerEnabled = !1
        },
        c.prototype.onBoostersUIShow = function() {
            this.level.gui.undoButton.disableInput = !0,
            this.level.gui.pauseButton.input.enabled = !1,
            this.level.gui.boostersButton.input.enabled = !1,
            this.wizard.playNextLine(),
            this.hand.pointAt(new Phaser.Point(this.level.gui.boostersButton.x + 88, this.level.gui.boostersButton.y + 140), 500),
            this.level.gui.boosterSelected.addOnce(this.onBoosterSelect, this),
            this.level.pointerEnabled = !1
        },
        c.prototype.onBoosterSelect = function() {
            this.level.boostersMode.onBoosterComplete.addOnce(this.onBoosterComplete, this),
            this.hand.hide()
        },
        c.prototype.onBoosterComplete = function() {
            this.game.input.onDown.add(this.onInputDown, this),
            this.wizard.playNextLine()
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1),
            this.game.input.onDown.remove(this.onInputDown, this),
            this._onComplete.dispose(),
            this._onComplete = null,
            this.wizard.destroy(),
            this._allowedItems = null
        },
        Object.defineProperty(c.prototype, "onComplete", {
            get: function() {
                return this._onComplete
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "allowedItems", {
            get: function() {
                return this._allowedItems
            },
            enumerable: !0,
            configurable: !0
        }),
        c
    } (Phaser.SpriteBatch);
    a.Tutorial = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a) {
            b.call(this, a, 0, 0, "items", "Question_Icon0000"),
            this.exists = !1,
            this.visible = !1,
            this.anchor.set(.5, .5)
        }
        return __extends(c, b),
        c.prototype.show = function() {
            this.visible || (this.exists = !0, this.visible = !0, a.Main.weakDevice === !1 && (this.alpha = 0, this.game.add.tween(this).to({
                alpha: 1
            },
            100, Phaser.Easing.Linear.None, !0)))
        },
        c.prototype.hide = function() {
            this.exists = !1,
            this.visible = !1
        },
        c
    } (Phaser.Image);
    a.NextItemIcon = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a) {
            b.call(this, a, 0, 0, ""),
            this.anchor.set(.5, 1)
        }
        return __extends(c, b),
        c.prototype.show = function(a, b, c, d) {
            this.item = a,
            this.updateTexture(a),
            this.exists = !0,
            this.visible = !0,
            this.alpha = 1,
            this.scale.set(0, 0),
            this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            },
            400, Phaser.Easing.Back.Out, !0).onComplete.addOnce(this.hide, this)
        },
        c.prototype.updateTexture = function(b) {
            var c = a.ItemType[b.itemType] + "_Popup",
            d = this.game.cache.getRenderTexture(c);
            d && this.loadTexture(d.texture)
        },
        c.prototype.hide = function() {
            this.game.add.tween(this).to({
                alpha: 0
            },
            300, Phaser.Easing.Cubic.Out, !0, 1500).onComplete.addOnce(this.onHideComplete, this)
        },
        c.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1,
            this.item = null
        },
        c.prototype.update = function() {
            if (this.exists && this.item) {
                var b = this.item.x + this.item.parent.position.x,
                c = this.item.y + this.item.parent.position.y - .5 * a.Cell.HEIGHT;
                this.position.set(b, c)
            }
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0),
            this.item = null
        },
        c
    } (Phaser.Image);
    a.ProgressPopupSimple = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments),
            this.chainItemType = null,
            this.lastSelectedItem = null,
            this.pointerDown = !1,
            this.pointerEnabled = !1,
            this.coins = 0
        }
        return __extends(c, b),
        c.prototype.init = function() {
            this.coins = a.Main.stats.getNumericValue(a.GameStats.COINS),
            this._activeItems = [],
            this.chain = [],
            this.chainItemType = null,
            this.lastSelectedItem = null,
            this.pointerDown = !1,
            this.pointerEnabled = !0,
            this.debugRenderFlag = !1
        },
        c.prototype.create = function() {
            this.initItemsProgress(),
            this.setupLayers(),
            this.initChainLinks(),
            this.addConvertItemFX(),
            this.initItemsGenerator(),
            this.itemsPool = new a.ItemsPool(this.game, this._itemsLayer),
            this.findPossibleMovesStrategy = new a.FindChainStrategy(this.game, this._grid),
            this.initUndoHandler(),
            this.initItemsAligner(),
            this.initBoostersMode(),
            this.input.onDown.add(this.onPointerDown, this),
            this.input.onUp.add(this.onPointerUp, this),
            this.fillGridFirstTime(),
            this.addTutorial(),
            this.initGlowItem(),
            this.initNextItemIcon(),
            this.initPauseables(),
            this.initKeyCallbacks(),
            this.initElectricSound(),
            this.resize(),
            this.tutorial || a.Main.weakDevice !== !1 || this.showGridAndItems()
        },
        c.prototype.showGridAndItems = function() {
            var b = this,
            c = this._grid.position.y,
            d = a.Config.GAME_HEIGHT - c,
            e = 1.1 * d;
            this._grid.position.y = a.Config.GAME_HEIGHT,
            this._activeItems.forEach(function(a) {
                a.alpha = 0
            }),
            this.game.add.tween(this._grid.position).to({
                y: c
            },
            e, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(function() {
                var a = 0;
                b._activeItems.forEach(function(b) {
                    b.showOnGrid(!1, a),
                    a += 50
                })
            })
        },
        c.prototype.initItemsProgress = function() {
            this.itemsProgress = [];
            for (var b = 0; b < a.Item.ITEM_TYPES.length; b++) this.itemsProgress[b] = !1;
            this.itemsProgress[0] = !0,
            this.itemsProgress[1] = !0
        },
        c.prototype.setupLayers = function() {
            this.background = new a.Background(this.game, this.world),
            this._grid = new a.Grid(this.game, 5, 4),
            this._itemsLayer = this.add.spriteBatch(this.world, "items_layer"),
            this.addGUI()
        },
        c.prototype.addGUI = function() {
            this._gui = new a.LevelGUI(this.game),
            this._gui.boosterSelected.add(this.onPowerUpSelected, this),
            this._gui.gameOverPopup.undoSignal.add(this.undoAfterGameOver, this),
            this._gui.undoButton.callback.add(this.undoLastAction, this),
            this._gui.undoButton.disable()
        },
        c.prototype.onPowerUpSelected = function(a) {
            this.pointerEnabled = !1,
            this._boostersMode.activate(this._activeItems, a)
        },
        c.prototype.undoAfterGameOver = function() {
            this._grid.visible = !0,
            this._itemsLayer.visible = !0,
            this._gui.enableButtons(),
            this._gui.showElementsAfterGameOver(),
            this.undoLastAction()
        },
        c.prototype.addTutorial = function() {
            var b = !0;
            b || (this.tutorial = new a.Tutorial(this.game, this.world, this), this.tutorial.onComplete.addOnce(this.onTutorialComplete, this), this.tutorial.show(), this._firstComboComplete = new Phaser.Signal)
        },
        c.prototype.onTutorialComplete = function() {
            a.Main.stats.saveValue(a.GameStats.TUTORIAL_COMPLETE, !0),
            this.world.remove(this.tutorial, !0),
            this.tutorial = null,
            this.pointerEnabled = !0
        },
        c.prototype.initChainLinks = function() {
            var b = 20;
            this.chainLinks = [];
            for (var c = 0; b > c; c++) {
                var d = new a.ChainLink(this.game);
                this._itemsLayer.add(d),
                this.chainLinks.push(d)
            }
        },
        c.prototype.addConvertItemFX = function() {
            a.Main.weakDevice === !1 && (this.convertItemFX = new a.ConvertItemFX(this.game, this._itemsLayer))
        },
        c.prototype.initItemsGenerator = function() {
            var b = _.take(a.Item.ITEM_TYPES, 2);
            this.itemsGenerator = new a.ItemsGenerator(this.game),
            this.itemsGenerator.setAllowedItemTypes(b)
        },
        c.prototype.initUndoHandler = function() {
            this.undoHandler = new a.UndoHandler,
            this.undoHandler.maxSaveNum = 1 + a.Main.boosters.getBooster(a.Booster.EXTRA_UNDO).num
        },
        c.prototype.initItemsAligner = function() {
            this.itemsAligner = new a.ItemsAligner(this.game, this._grid),
            this.itemsAligner.addItemSignal.add(this.addItemOnRefill, this)
        },
        c.prototype.addItemOnRefill = function(a, b) {
            var c = this.createAndAddItemToGrid(a);
            c.showOnGrid(!1, b)
        },
        c.prototype.initBoostersMode = function() {
            this._boostersMode = new a.PowerUpMode(this.game, this._grid, this._itemsLayer, this.itemsAligner),
            this._boostersMode.saveSignal.add(this.saveGameState, this),
            this._boostersMode.addItemSignal.add(this.onMagnetApplied, this),
            this._boostersMode.onBoosterComplete.add(this.onPowerUpComplete, this)
        },
        c.prototype.onMagnetApplied = function(a, b) {
            var c = this.createAndAddItemToGrid(a, b);
            c.setHighlightedTexture(),
            this._itemsLayer.setChildIndex(c, this._itemsLayer.children.length - 1),
            this.game.time.events.add(450, c.setNormalTexture, c),
            this.game.add.tween(c.scale).to({
                x: 1.1,
                y: 1.1
            },
            300, Phaser.Easing.Back.Out, !0, 0, 0, !0),
            this.convertItemFX && this.convertItemFX.show(c),
            this.showGlowItem(c),
            12 === c.itemType && this.onGameComplete(c),
            this.upgradeItems()
        },
        c.prototype.onPowerUpComplete = function(a) {
            this._gui.onPowerUpComplete(),
            this.findPossibleMovesStrategy.getPossibleMove(this._activeItems) ? this.tutorial || (this.pointerEnabled = !0) : this.onGameOver()
        },
        c.prototype.fillGridFirstTime = function() {
            var a = this;
            this._grid.cells.forEach(function(b) {
                a.createAndAddItemToGrid(b)
            })
        },
        c.prototype.createAndAddItemToGrid = function(a, b) {
            void 0 === b && (b = null);
            var c = null === b ? this.itemsGenerator.getNewItemType() : b,
            d = this.itemsPool.getItem(c);
            return d.position.set(a.centerX, a.centerY),
            d.linkCell(a),
            this._activeItems.push(d),
            d
        },
        c.prototype.initGlowItem = function() {
            var a = this;
            this.glowItem = this.game.add.image(0, 0, "items", ""),
            this.glowItem.anchor.set(.5, .5),
            this.glowItem.scale.set(1.1, 1.1),
            this.glowItem.events.onAddedToGroup.addOnce(function() {
                a.glowItem.exists = !1,
                a.glowItem.visible = !1
            }),
            this._itemsLayer.add(this.glowItem)
        },
        c.prototype.initNextItemIcon = function() {
            this.nextItemIcon = new a.NextItemIcon(this.game),
            this._itemsLayer.add(this.nextItemIcon)
        },
        c.prototype.initPauseables = function() {
            this.pauseables = [this._gui]
        },
        c.prototype.initElectricSound = function() {
            this.sound.usingWebAudio && a.Main.weakDevice === !1 && (this.electricSound = this.game.make.sound("electric", 1, !0))
        },
        c.prototype.initKeyCallbacks = function() {
            var b = this;
            a.Main.development && (this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.toggleDebugRender, this), this.game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(this.togglePause, this), this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(function() {
                b.changeCoins(500)
            }), this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(function() {
                b.changeCoins( - 500)
            }), this.game.input.keyboard.addKey(Phaser.Keyboard.O).onDown.add(this.toggleGameOver, this), this.game.input.keyboard.addKey(Phaser.Keyboard.C).onDown.add(this.testGameComplete, this))
        },
        c.prototype.toggleGameOver = function() {
            this._gui.gameOverPopup.visible ? (this._gui.gameOverPopup.hide(), this._grid.visible = !0, this._itemsLayer.visible = !0) : (this._gui.onGameOver(10, 11421, this.undoHandler.savedStatesNum()), this._grid.visible = !1, this._itemsLayer.visible = !1)
        },
        c.prototype.testGameComplete = function() {
            var a = _.sample(this.activeItems);
            this.onGameComplete(a)
        },
        c.prototype.changeCoins = function(a) {
            void 0 === a && (a = 5),
            this.coins += a,
            this.coins = Math.max(0, this.coins),
            this._gui.coinsCounter.updateCount(this.coins)
        },
        c.prototype.togglePause = function() {
            this.game.paused = !this.game.paused
        },
        c.prototype.toggleDebugRender = function() {
            this.debugRenderFlag = !this.debugRenderFlag
        },
        c.prototype.onPointerDown = function(a) {
            this.pointerEnabled && (this.pointerDown = !0, this.chain.length = 0, this.chainItemType = null, this.lastSelectedItem = null)
        },
        c.prototype.onPointerUp = function(a) {
            this.pointerEnabled && this.pointerDown && (this.pointerDown = !1, this.hideAllChainLinks(), this.fadeInAllItems(), this.stopElectricSound(), this.nextItemIcon.hide(), this.chain.length > 2 ? (this.pointerEnabled = !1, this.saveGameState(), this.collectItems(), this.tutorial || this._gui.disableButtons()) : this.unhighlightChainItems())
        },
        c.prototype.hideAllChainLinks = function() {
            for (var a = this.chainLinks.length,
            b = 0; a > b; b++) this.chainLinks[b].hide()
        },
        c.prototype.stopElectricSound = function() {
            this.electricSound && this.electricSound.isPlaying && this.electricSound.stop()
        },
        c.prototype.unhighlightChainItems = function() {
            for (var a = this.chain.length,
            b = 0; a > b; b++) this.chain[b].unhighlight()
        },
        c.prototype.collectItems = function() {
            var a = this;
            this.game.sound.usingWebAudio && this.game.sound.play("collect"),
            this.lastSelectedItem.collectCompleteSignal.addOnce(this.onChainCollected, this),
            this.chain.forEach(function(b) {
                b.clearCell(),
                b.collect(a.lastSelectedItem.position),
                a.removeFromActiveItems(b)
            })
        },
        c.prototype.onChainCollected = function() {
            this._firstComboComplete && this._firstComboComplete.dispatch(),
            this.calculateCoins();
            var a = this.convertChainToNewItem();
            this.upgradeItems(),
            12 === a.itemType ? this.onGameComplete(a) : (this.itemsGenerator.updateAllowedItemTypes(this._activeItems), this.game.time.events.add(400, this.onCollectComplete, this))
        },
        c.prototype.removeFromActiveItems = function(a) {
            var b = this._activeItems.indexOf(a);
            b > -1 && this._activeItems.splice(b, 1)
        },
        c.prototype.calculateCoins = function() {
            var b = a.Item.ITEM_TYPES.indexOf(this.chainItemType) + 1,
            c = this.chain.length * b;
            this.coins += c,
            a.Main.stats.saveValue(a.GameStats.COINS, this.coins);
            var d = this._grid.position.x + this.lastSelectedItem.x,
            e = this._grid.position.y + this.lastSelectedItem.y - 90;
            this.gui.showCoinsFX(c, this.coins, d, e)
        },
        c.prototype.convertChainToNewItem = function() {
            this.game.sound.usingWebAudio && this.game.sound.play("new_item", .75);
            var a = this.getNextItemType(this.chainItemType),
            b = this.lastSelectedItem.position.clone(),
            c = this._grid.getCellUnderPoint(b.x + this._grid.position.x, b.y + this._grid.position.y),
            d = this.createAndAddItemToGrid(c, a);
            return d.setHighlightedTexture(),
            this._itemsLayer.setChildIndex(d, this._itemsLayer.children.length - 1),
            this.game.time.events.add(450, d.setNormalTexture, d),
            this.game.add.tween(d.scale).to({
                x: 1.1,
                y: 1.1
            },
            300, Phaser.Easing.Back.Out, !0, 0, 0, !0),
            this.convertItemFX && this.convertItemFX.show(d),
            this.showGlowItem(d),
            this.showProgressPopup(d),
            d
        },
        c.prototype.showGlowItem = function(b) {
            var c = this;
            this._itemsLayer.setChildIndex(this.glowItem, this._itemsLayer.children.length - 1),
            this.glowItem.frameName = "Item_" + a.ItemType[b.itemType] + "_Glow0000",
            this.glowItem.exists = !0,
            this.glowItem.visible = !0,
            this.glowItem.position.set(b.x - 2, b.y - 1),
            this.glowItem.alpha = .9,
            this.game.add.tween(this.glowItem).to({
                alpha: 0
            },
            400, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(function() {
                c.glowItem.exists = !1,
                c.glowItem.visible = !1
            })
        },
        c.prototype.showProgressPopup = function(b) {
            var c = this.itemsProgress[b.itemType];
            if (c === !1) {
                if (this.itemsProgress[b.itemType] = !0, 12 !== b.itemType) {
                    this.game.sound.usingWebAudio && this.game.sound.play("achieved", .66);
                    var d = b.title,
                    e = a.Item.ITEM_TYPES.indexOf(b.itemType) + 1,
                    f = a.Item.ITEM_TYPES.length,
                    g = this.gui.progressPopup;
                    g.show(b, d, e, f)
                }
                var h = window.ga;
                h && h("send", "event", "new_item", d)
            }
        },
        c.prototype.getNextItemType = function(b) {
            var c = a.Item.ITEM_TYPES.indexOf(b);
            return a.Item.ITEM_TYPES[c + 1]
        },
        c.prototype.upgradeItems = function() {
            var a = _.max(this._activeItems, "itemType").itemType,
            b = this.itemsGenerator.getWorstType(a);
            this._activeItems.forEach(function(a) {
                a.itemType < b && a.upgrade()
            })
        },
        c.prototype.onCollectComplete = function() {
            this.itemsAligner.addItemSignal.add(this.addItemOnRefill, this),
            this.itemsAligner.completeSignal.addOnce(this.checkPossibleMoves, this),
            this.itemsAligner.alignAndRefill(this._activeItems)
        },
        c.prototype.checkPossibleMoves = function() {
            var a = null !== this.findPossibleMovesStrategy.getPossibleMove(this._activeItems);
            a === !1 ? this.onGameOver() : this.tutorial || (this.pointerEnabled = !0, this._gui.enableButtons())
        },
        c.prototype.undoLastAction = function() {
            this.undoHandler.savedStatesNum() > 0 && (this._activeItems.forEach(function(a) {
                a.removeFromGrid()
            }), this._activeItems.length = 0, this.hideAllChainLinks(), this.clearChain(), this.pointerDown = !1, this.pointerEnabled = !0, this.restore(), this._gui.onRestore()),
            this._gui.undoLabel.updateNum(this.undoHandler.savedStatesNum()),
            0 === this.undoHandler.savedStatesNum() && this._gui.undoButton.disable()
        },
        c.prototype.saveGameState = function() {
            this.undoHandler.save(this._grid, this.coins, a.Main.boosters.createSave()),
            this._gui.undoButton.enable(),
            this._gui.undoLabel.updateNum(this.undoHandler.savedStatesNum())
        },
        c.prototype.restore = function() {
            if (this.undoHandler.maxSaveNum > 0) {
                var a = this.undoHandler.getLatestSave();
                this.coins = a.coins,
                this._gui.coinsCounter.updateCount(this.coins, !0),
                this.restoreBoosters(a.boosters),
                this.restoreGrid(a.gridState),
                a.destroy(),
                a = null
            }
        },
        c.prototype.restoreBoosters = function(b) {
            a.Main.boosters.loadFromSave(b)
        },
        c.prototype.restoreGrid = function(a) {
            var b = this;
            a.cellStates.forEach(function(a) {
                var c = b._grid.getCellAt(a.row, a.column),
                d = a.itemType;
                if (null !== d) {
                    b.createAndAddItemToGrid(c, d)
                }
            })
        },
        c.prototype.clearChain = function() {
            this.chain.length = 0,
            this.chainItemType = null,
            this.lastSelectedItem = null
        },
        c.prototype.update = function() {
            this.selectItems()
        },
        c.prototype.selectItems = function() {
            if (this.pointerDown && this._itemsLayer.visible) {
                var a = this.getItemUnderPoint(this.input.activePointer.x, this.input.activePointer.y);
                if (a) {
                    var b = !(this.tutorial && -1 === this.tutorial.allowedItems.indexOf(a)),
                    c = null === this.chainItemType || this.chainItemType === a.itemType,
                    d = -1 === this.chain.indexOf(a),
                    e = this.lastSelectedItem ? this.isDistanceFits(this.lastSelectedItem, a) : !0;
                    if (c && d === !1) {
                        var f = this.chain.indexOf(a);
                        if (f === this.chain.length - 2) return this.lastSelectedItem.unhighlight(),
                        this.chain.splice(f + 1, 1),
                        this.lastSelectedItem = a,
                        this.hideLastUsedChainLink(),
                        this.chain.length <= 1 && this.electricSound && this.electricSound.fadeOut(300),
                        void this.updateNextItemIcon()
                    }
                    c && d && e && b && (this.addItemToChain(a), this.chain.length > 1 && this.showNewChainLink(), 2 === this.chain.length && this.electricSound && (this.electricSound.restart("", 0, 0, !0), this.electricSound.fadeTo(300, .33)), this.updateNextItemIcon())
                }
            }
        },
        c.prototype.getItemUnderPoint = function(b, c) {
            for (var d = this._activeItems.length,
            e = 0,
            f = 0,
            g = 0; d > g; g++) {
                var h = this._activeItems[g];
                e = (this._grid.position.x + h.x) * a.Config.WORLD_SCALE,
                f = (this._grid.position.y + h.y) * a.Config.WORLD_SCALE;
                var i = utils.MathUtil.distanceSquared(e, f, b, c);
                if (i < a.Item.RADIUS_SQUARED) return h
            }
            return null
        },
        c.prototype.isDistanceFits = function(b, c) {
            var d = utils.MathUtil.distanceSquared(b.position.x, b.position.y, c.position.x, c.position.y);
            return d < a.Item.CONTACT_RADIUS_SQUARED
        },
        c.prototype.hideLastUsedChainLink = function() {
            for (var a = this.chainLinks.length; --a > -1;) if (this.chainLinks[a].visible === !0) return void this.chainLinks[a].hide()
        },
        c.prototype.addItemToChain = function(a) {
            this.game.sound.usingWebAudio && this.game.sound.play("select", .5),
            a.highlight(),
            this.chain.push(a),
            this.lastSelectedItem = a;
            var b = this.chain.length;
            1 === b && (this.chainItemType = a.itemType, this.fadeOutSomeItems(this.chainItemType))
        },
        c.prototype.showNewChainLink = function() {
            var a = _.find(this.chainLinks,
            function(a) {
                return ! a.visible
            });
            if (a) {
                var b = this.chain.length,
                c = this.chain[b - 1],
                d = this.chain[b - 2],
                e = Phaser.Math.linear(c.cell.centerX, d.cell.centerX, .5),
                f = Phaser.Math.linear(c.cell.centerY, d.cell.centerY, .5);
                a.position.set(e, f),
                a.rotation = Phaser.Math.angleBetween(d.cell.centerX, d.cell.centerY, c.cell.centerX, c.cell.centerY),
                a.show()
            }
        },
        c.prototype.updateNextItemIcon = function() {
            if (this.chain.length < 3) this.nextItemIcon.hide();
            else {
                if (this.tutorial) return;
                this.nextItemIcon.frameName = this.getNextItemIconFrameName(),
                this.nextItemIcon.show(),
                this.nextItemIcon.position.set(this.lastSelectedItem.cell.right, this.lastSelectedItem.cell.top)
            }
        },
        c.prototype.getNextItemIconFrameName = function() {
            var b = a.Item.ITEM_TYPES.indexOf(this.chainItemType),
            c = a.Item.ITEM_TYPES[b + 1];
            return this.itemsProgress[c] ? a.ItemType[c] + "_Icon0000": "Question_Icon0000"
        },
        c.prototype.fadeOutSomeItems = function(a) {
            this._activeItems.forEach(function(b) {
                b.itemType !== a && (b.alpha = .33)
            })
        },
        c.prototype.fadeInAllItems = function() {
            for (var a = this._activeItems.length,
            b = 0; a > b; b++) this._activeItems[b].alpha = 1
        },
        c.prototype.render = function() {
            this.debugRenderFlag && this.game.debug.inputInfo(30, 30)
        },
        c.prototype.onGameOver = function() {
            var a = this,
            b = _.max(this._activeItems, "itemType").itemType;
            this._gui.disableButtons(),
            this._gui.noMoves.show(),
            this.game.time.events.add(2e3,
            function() {
                a._gui.onGameOver(b, a.coins, a.undoHandler.savedStatesNum()),
                a._grid.visible = !1,
                a._itemsLayer.visible = !1
            },
            this)
        },
        c.prototype.onGameComplete = function(a) {
            this.gui.disableButtons(),
            this.game.add.tween(a).to({
                angle: 3
            },
            100, Phaser.Easing.Sinusoidal.InOut, !0, 0, 10, !0),
            this.game.add.tween(a.scale).to({
                x: 2,
                y: 2
            },
            1200, Phaser.Easing.Back.In, !0),
            this.game.time.events.add(1200, this._gui.showRestartOverlay, this._gui, 700),
            this.game.time.events.add(1300, this.showGameComplete, this)
        },
        c.prototype.showGameComplete = function() {
            this.gameCompleteUI = new a.GameCompleteUI(this.game, this.world),
            this.gameCompleteUI.show(),
            this.world.setChildIndex(this.gameCompleteUI, this.world.getChildIndex(this._gui) - 1),
            this._itemsLayer.exists = !1,
            this._itemsLayer.visible = !1,
            this._grid.exists = !1,
            this._grid.visible = !1,
            this._gui.onGameComplete()
        },
        c.prototype.resize = function() {
            this.background.resize(),
            this._gui.resize(),
            this.alignGrid(),
            this.gameCompleteUI && this.gameCompleteUI.resize(),
            this.tutorial && this.tutorial.resize()
        },
        c.prototype.alignGrid = function() {
            var b = this._gui.guiHeight,
            c = a.Config.GAME_HEIGHT - b;
            this._grid.position.x = a.Config.HALF_GAME_WIDTH - .5 * this._grid.getWidth(),
            this._grid.position.y = b + .5 * (c - this._grid.getHeight()) - 10,
            this._itemsLayer.position.x = this._grid.position.x,
            this._itemsLayer.position.y = this._grid.position.y
        },
        c.prototype.pause = function() {
            this.pauseables.forEach(function(a) {
                a.onPause()
            }),
            this._grid.visible = !1,
            this._itemsLayer.visible = !1
        },
        c.prototype.resume = function() {
            this.pauseables.forEach(function(a) {
                a.onResume()
            }),
            this._grid.visible = !0,
            this._itemsLayer.visible = !0
        },
        c.prototype.shutdown = function() {
            this.pauseables = null,
            this._activeItems = null,
            this._boostersMode.destroy(),
            this.itemsAligner.destroy(),
            this.undoHandler.destroy(),
            this.findPossibleMovesStrategy.destroy(),
            this.itemsGenerator.destroy(),
            this.itemsPool.destroy(),
            this.itemsProgress = null,
            this.gameCompleteUI = null,
            this.convertItemFX && (this.convertItemFX.destroy(), this.convertItemFX = null),
            this._firstComboComplete && (this._firstComboComplete.dispose(), this._firstComboComplete = null)
        },
        Object.defineProperty(c.prototype, "boostersMode", {
            get: function() {
                return this._boostersMode
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "grid", {
            get: function() {
                return this._grid
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "itemsLayer", {
            get: function() {
                return this._itemsLayer
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "gui", {
            get: function() {
                return this._gui
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "firstComboComplete", {
            get: function() {
                return this._firstComboComplete
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "activeItems", {
            get: function() {
                return this._activeItems
            },
            enumerable: !0,
            configurable: !0
        }),
        c
    } (Phaser.State);
    a.Level = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b() {}
        return b.createConfig = function() {
            a.Main.isDesktop = this.checkDesktop();
            var b = a.Main.isDesktop;
            return {
                width: a.Config.SOURCE_GAME_WIDTH,
                height: a.Config.SOURCE_GAME_HEIGHT,
                renderer: Phaser.AUTO,
                transparent: b,
                antialias: !1,
                enableDebug: a.Main.development
            }
        },
        b.checkDesktop = function() {
            var a = !1,
            b = detect.parse(window.navigator.userAgent);
            return "Desktop" === b.device.type && (a = !0, b.device.family.indexOf("Nexus") > -1 && (a = !1)),
            a
        },
        b
    } ();
    a.GameConfigCreator = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b),
        c.prototype.create = function() {
            this.addBackground(),
            this.addImages(),
            this.resize(),
            a.Main.weakDevice ? this.game.time.events.add(1500, this.onHideComplete, this) : this.startTweens()
        },
        c.prototype.addBackground = function() {
            var a = utils.DrawUtil.createRectTexture(this.game, 1, 1, "#281234");
            this.bg = this.game.add.image(0, 0, a)
        },
        c.prototype.addImages = function() {
            this.logo = this.game.add.image(a.Config.HALF_GAME_WIDTH, 0, "lr_splash", "Splash_Logo0000"),
            this.logo.anchor.set(.5, .5),
            this.logo.y = .4 * a.Config.GAME_HEIGHT,
            this.text = this.game.add.image(a.Config.HALF_GAME_WIDTH, 0, "lr_splash", "Splash_Text0000"),
            this.text.anchor.set(.5, .5),
            this.text.y = this.logo.y + .5 * this.logo.height + .5 * this.text.height + 50
        },
        c.prototype.startTweens = function() {
            var a = 200,
            b = 500,
            c = 100;
            this.logo.alpha = 0,
            this.logo.y -= c,
            this.game.add.tween(this.logo).to({
                y: this.logo.y + c
            },
            b, Phaser.Easing.Back.Out, !0, a),
            this.game.add.tween(this.logo).to({
                alpha: 1
            },
            .5 * b, Phaser.Easing.Linear.None, !0, a),
            this.text.alpha = 0,
            this.text.y += c,
            this.game.add.tween(this.text).to({
                y: this.text.y - c
            },
            b, Phaser.Easing.Back.Out, !0, a),
            this.game.add.tween(this.text).to({
                alpha: 1
            },
            .5 * b, Phaser.Easing.Linear.None, !0, a),
            this.game.time.events.add(b + a + 1200, this.hide, this)
        },
        c.prototype.hide = function() {
            var a = 500,
            b = 100;
            this.game.add.tween(this.logo).to({
                y: this.logo.y - b
            },
            a, Phaser.Easing.Back.In, !0),
            this.game.add.tween(this.logo).to({
                alpha: 0
            },
            a, Phaser.Easing.Quadratic.In, !0),
            this.game.add.tween(this.text).to({
                y: this.text.y + b
            },
            a, Phaser.Easing.Back.In, !0),
            this.game.add.tween(this.text).to({
                alpha: 0
            },
            a, Phaser.Easing.Quadratic.In, !0).onComplete.addOnce(this.onHideComplete, this)
        },
        c.prototype.onHideComplete = function() {
            this.game.changeState("MainMenu", !0)
        },
        c.prototype.resize = function() {
            this.bg.scale.set(a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT),
            this.logo.y = .37 * a.Config.GAME_HEIGHT,
            this.text.y = this.logo.y + .5 * this.logo.height + .5 * this.text.height + 20
        },
        c
    } (Phaser.State);
    a.LR_SplashScreen = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function() {
        function b() {
            var b = this;
            this.boosters = [],
            a.BoostersManager.TYPES.forEach(function(c) {
                var d = new a.Booster(c);
                b.boosters.push(d)
            })
        }
        return b.prototype.getBooster = function(a) {
            return _.find(this.boosters,
            function(b) {
                return b.pType === a
            })
        },
        b.prototype.createSave = function() {
            var a = {};
            return this.boosters.forEach(function(b) {
                a[b.pType] = b.num
            }),
            a
        },
        b.prototype.loadFromSave = function(a) {
            for (var b in a) if (a.hasOwnProperty(b)) {
                var c = this.getBooster(b);
                c.num = a[b]
            }
        },
        b.TYPES = [a.Booster.EXTRA_UNDO, a.Booster.MAGNET, a.Booster.REMOVE, a.Booster.SORTER],
        b
    } ();
    a.BoostersManager = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, ""),
            this.addBack(),
            this.addText()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            var a = this.game.add.image(0, 0, "boosters", "BoosterCount_Back0000", this);
            a.anchor.set(.5, .5)
        },
        c.prototype.addText = function() {
            var b = "ru" === a.Main.language ? "20px ": "24px ",
            c = {
                font: b + a.Main.fontFamily,
                fill: "#66CCCC",
                align: "left"
            };
            this.text = this.game.add.text(0, 0, "x 0", c, this),
            this.text.anchor.set(.5, .5),
            this.text.padding.x = 4,
            this.text.y = 2
        },
        c.prototype.updateCount = function(a) {
            this.text.setText("x " + a.toString())
        },
        c
    } (Phaser.Group);
    a.BoosterCount = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c, d) {
            b.call(this, a, c, ""),
            this.booster = d,
            this.addBack(),
            this.addIcon(),
            this.addTitle(),
            this.addCount(),
            this.addDescription(),
            this.addPrice(),
            this.addBuyButton()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "boosters", "BoosterView_Back0000", this),
            this.back.anchor.set(.5, .5)
        },
        c.prototype.addIcon = function() {
            var a = "Booster_" + this.booster.pType + "0000";
            this.icon = this.game.add.image(0, 0, "boosters", a, this),
            this.icon.anchor.set(.5, .5),
            this.icon.x = this.back.left + .5 * this.icon.width + 17
        },
        c.prototype.addTitle = function() {
            var b = "ru" === a.Main.language ? "26px ": "30px ",
            c = {
                font: b + a.Main.fontFamily,
                fill: "#66CCCC",
                align: "left"
            },
            d = this.booster.title;
            this.title = this.game.add.text(0, 0, d, c, this),
            this.title.setShadow(2, 2, "#141B21", 0),
            this.title.padding.x = 2,
            this.title.anchor.set(0, .5),
            this.title.x = this.icon.x + 68,
            this.title.y = this.back.top + .5 * this.title.height + 5
        },
        c.prototype.addCount = function() {
            this.count = new a.BoosterCount(this.game, this),
            this.count.position.set(this.back.right - 100, this.title.y),
            this.count.position.x = this.title.x + this.title.width + 40
        },
        c.prototype.addDescription = function() {
            var b = "ru" === a.Main.language ? "26px ": "24px ",
            c = {
                font: b + a.Main.fontFamily,
                fill: "#66CCCC",
                align: "left"
            },
            d = this.booster.description;
            this.description = this.game.add.text(0, 0, d, c, this),
            this.description.anchor.set(0, 0),
            this.description.x = this.title.x,
            this.description.y = this.title.y + .5 * this.title.height - 4,
            this.description.lineSpacing = -10,
            this.description.setShadow(2, 2, "#141B21", 0)
        },
        c.prototype.addPrice = function() {
            var b = "ru" === a.Main.language ? "26px ": "32px ",
            c = {
                font: b + a.Main.fontFamily,
                fill: "#FBD045",
                align: "right"
            },
            d = this.booster.price.toString();
            this.price = this.game.add.text(0, 0, d, c, this),
            this.price.setShadow(2, 2, "#222222", 0),
            this.price.padding.x = 2,
            this.price.anchor.set(1, .5),
            this.price.x = this.back.right - 18,
            this.price.y = this.title.y + 5;
            var e = this.game.add.image(0, 0, "boosters", "Coin_Small0000", this);
            e.anchor.set(.5, .5),
            e.x = this.price.x - this.price.width - .5 * e.width,
            e.y = this.price.y
        },
        c.prototype.addBuyButton = function() {
            this._buyButton = new a.SimpleButton(this.game, this.back.right - 10, 0, "boosters", "Button_Buy0000"),
            this._buyButton.userData = this.booster,
            this.add(this._buyButton),
            this._buyButton.x = this.back.right - .5 * this._buyButton.width - 22,
            this._buyButton.y = .2 * this.back.height
        },
        c.prototype.updateData = function() {
            this.count.updateCount(this.booster.num),
            this.price.setText(this.booster.price.toString())
        },
        c.prototype.getHeight = function() {
            return this.back.height
        },
        Object.defineProperty(c.prototype, "buyButton", {
            get: function() {
                return this._buyButton
            },
            enumerable: !0,
            configurable: !0
        }),
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1),
            this.booster = null
        },
        c
    } (Phaser.Group);
    a.BoosterView = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "Boosters UI"),
            this.addBoosterViews(),
            this.initBuyButtons(),
            this.addFrame()
        }
        return __extends(c, b),
        c.prototype.addBoosterViews = function() {
            var b = this;
            this.views = [];
            var c = 0,
            d = -158,
            e = 112,
            f = _.clone(a.Main.boosters.boosters);
            f = _.sortBy(f, "price"),
            f.forEach(function(f) {
                var g = new a.BoosterView(b.game, b, f);
                g.position.set(c, d),
                d += e,
                b.views.push(g)
            })
        },
        c.prototype.initBuyButtons = function() {
            var a = this;
            this._buyButtons = [],
            this.views.forEach(function(b) {
                a._buyButtons.push(b.buyButton)
            })
        },
        c.prototype.addFrame = function() {
            var a = 266,
            b = this.game.add.image(0, 0, "boosters", "Frame_Vert0000", this);
            b.anchor.set(.5, .5),
            b.x = -a,
            b.y = this.views[1].y + .5 * this.views[1].getHeight() - 2;
            var c = this.game.add.image(0, 0, "boosters", "Frame_Vert0000", this);
            c.anchor.set(.5, .5),
            c.angle = 180,
            c.x = a,
            c.y = b.y;
            var d = this.game.add.image(0, 0, "boosters", "Frame_Horizontal0000", this);
            d.anchor.set(.5, .5),
            d.x = 0,
            d.y = this.views[0].y - .5 * this.views[0].getHeight() + 5;
            var e = this.game.add.image(0, 0, "boosters", "Frame_Horizontal0000", this);
            e.anchor.set(.5, .5),
            e.angle = 180,
            e.x = 0,
            e.y = this.views[3].y + .5 * this.views[3].getHeight() - 7
        },
        c.prototype.updateData = function() {
            this.views.forEach(function(a) {
                a.updateData()
            })
        },
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1),
            this.views = null,
            this._buyButtons = null
        },
        Object.defineProperty(c.prototype, "buyButtons", {
            get: function() {
                return this._buyButtons
            },
            enumerable: !0,
            configurable: !0
        }),
        c
    } (Phaser.Group);
    a.BuyBoostersUI = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "Coins Label"),
            this.addBack(),
            this.addCoin(),
            this.addText(),
            this.addBuyButton()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "boosters", "CoinsLabel_Back0000", this),
            this.back.anchor.set(.5, .5)
        },
        c.prototype.addCoin = function() {
            this.coin = this.game.add.image(0, 0, "boosters", "Coin_Big0000", this),
            this.coin.anchor.set(.5, .5),
            this.coin.x = this.back.left + .5 * this.coin.width + 5
        },
        c.prototype.addText = function() {
            this.text = this.game.add.bitmapText(0, 0, "digits", "0", 41, this),
            this.text.anchor.set(0, .5),
            this.text.position.set(this.back.x + this.back.width - 14, 8),
            this.text.x = this.coin.right - 4,
            this.text.y = 7
        },
        c.prototype.addBuyButton = function() {
            this._buyButton = new a.SimpleButton(this.game, 0, 0, "boosters", "Button_Plus0000"),
            this._buyButton.x = this.back.right - .5 * this._buyButton.width - 14,
            this.add(this._buyButton)
        },
        c.prototype.updateCoins = function(a, b) {
            void 0 === b && (b = !0),
            this.text.setText(a.toString()),
            b && (this.game.tweens.removeFrom(this.text.scale), this.text.scale.set(1, 1), this.game.add.tween(this.text.scale).to({
                x: 1.2,
                y: 1.2
            },
            200, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0))
        },
        Object.defineProperty(c.prototype, "buyButton", {
            get: function() {
                return this._buyButton
            },
            enumerable: !0,
            configurable: !0
        }),
        c
    } (Phaser.Group);
    a.CoinsLabel = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "Coins Warning"),
            this.initialX = 0,
            this.exists = !1,
            this.visible = !1,
            this.addBack(),
            this.addText()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "boosters", "CoinsWarn_Back0000", this),
            this.back.anchor.set(.5, 1)
        },
        c.prototype.addText = function() {
            var b = "ru" === a.Main.language ? "26px ": "30px ",
            c = {
                font: b + a.Main.fontFamily,
                fill: "#FF9933",
                align: "center"
            },
            d = a.Main.texts.coins_warning;
            this.text = this.game.add.text(0, 0, d, c, this),
            this.text.anchor.set(.5, .5),
            this.text.y = this.back.top + .5 * this.text.height + 18
        },
        c.prototype.show = function() {
            this.visible === !1 && (this.exists = !0, this.visible = !0, this.position.x = this.initialX, this.alpha = 0, this.game.add.tween(this.position).to({
                x: this.initialX + 10
            },
            50, Phaser.Easing.Sinusoidal.InOut, !0, 0, 2, !0), this.game.add.tween(this).to({
                alpha: 1
            },
            100, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(this.hide, this))
        },
        c.prototype.hide = function() {
            this.game.add.tween(this).to({
                alpha: 0
            },
            200, Phaser.Easing.Cubic.Out, !0, 1500).onComplete.addOnce(this.onHideComplete, this)
        },
        c.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1
        },
        c
    } (Phaser.Group);
    a.CoinsWarning = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "IAP UI"),
            this.exists = !1,
            this.visible = !1,
            this.addBack(),
            this.addText()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            var b = utils.DrawUtil.createRectTexture(this.game, a.Config.GAME_WIDTH, 200),
            c = this.game.add.image(0, 0, b, null, this);
            c.anchor.set(.5, .5),
            c.alpha = .9
        },
        c.prototype.addText = function() {
            var b = {
                font: "42px " + a.Main.fontFamily,
                fill: "#66CCCC",
                align: "center"
            },
            c = "In App Purchases\ncurrently disabled!";
            this.text = this.game.add.text(0, 0, c, b, this),
            this.text.setShadow(2, 2, "#141B21", 0),
            this.text.anchor.set(.5, .5),
            this.text.lineSpacing = -10
        },
        c.prototype.show = function() {
            this.exists = !0,
            this.visible = !0,
            this.game.tweens.removeFrom(this),
            this.game.tweens.removeFrom(this.position),
            this.alpha = 0,
            this.position.y = a.Config.HALF_GAME_HEIGHT + 100,
            this.game.add.tween(this).to({
                alpha: 1
            },
            100, Phaser.Easing.Linear.None, !0),
            this.game.add.tween(this.position).to({
                y: a.Config.HALF_GAME_HEIGHT
            },
            300, Phaser.Easing.Back.Out, !0).onComplete.add(this.hide, this)
        },
        c.prototype.hide = function() {
            this.game.add.tween(this).to({
                alpha: 0
            },
            200, Phaser.Easing.Cubic.Out, !0, 1700).onComplete.addOnce(this.onHideComplete, this)
        },
        c.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1
        },
        c
    } (Phaser.Group);
    a.IapUI = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "Maxed Warning"),
            this.initialX = 0,
            this.exists = !1,
            this.visible = !1,
            this.addBack(),
            this.addText()
        }
        return __extends(c, b),
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "boosters", "CoinsWarn_Back0000", this),
            this.back.anchor.set(.5, 1)
        },
        c.prototype.addText = function() {
            var b = "ru" === a.Main.language ? "26px ": "30px ",
            c = {
                font: b + a.Main.fontFamily,
                fill: "#FF9933",
                align: "center"
            },
            d = a.Main.texts.maxed_warning;
            this.text = this.game.add.text(0, 0, d, c, this),
            this.text.anchor.set(.5, .5),
            this.text.y = this.back.top + .5 * this.text.height + 18
        },
        c.prototype.show = function() {
            this.visible === !1 && (this.exists = !0, this.visible = !0, this.position.x = this.initialX, this.alpha = 0, this.game.add.tween(this.position).to({
                x: this.initialX + 10
            },
            50, Phaser.Easing.Sinusoidal.InOut, !0, 0, 2, !0), this.game.add.tween(this).to({
                alpha: 1
            },
            100, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(this.hide, this))
        },
        c.prototype.hide = function() {
            this.game.add.tween(this).to({
                alpha: 0
            },
            200, Phaser.Easing.Cubic.Out, !0, 1500).onComplete.addOnce(this.onHideComplete, this)
        },
        c.prototype.onHideComplete = function() {
            this.exists = !1,
            this.visible = !1
        },
        c
    } (Phaser.Group);
    a.MaxedWarning = b
} (game || (game = {}));
var game; !
function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b),
        c.prototype.create = function() {
            a.Main.stats.saveValue(a.GameStats.BOOSTERS_WAS_SEEN, !0),
            this.addBackground(),
            this.addTitle(),
            this.addBoostersUI(),
            this.addCoinsLabel(),
            this.addCoinsWarning(),
            this.addMaxedWarning(),
            this.addContinueButton(),
            this.addIapUI(),
            this.addButtons(),
            this.resize(),
            a.Main.weakDevice === !1 && this.startAnimation()
        },
        c.prototype.addBackground = function() {
            this.backround = new a.Background(this.game, this.world)
        },
        c.prototype.addTitle = function() {
            var b = a.Main.texts.boosters_title,
            c = {
                font: "70px " + a.Main.fontFamily,
                fill: "#E7B00E",
                align: "center"
            };
            this.title = this.game.add.text(0, 0, b, c),
            this.title.anchor.set(.5, .5),
            this.title.padding.y = 4,
            this.title.setShadow(2, 2, "#121A21", 3),
            this.title.stroke = "#304557",
            this.title.strokeThickness = 12,
            this.title.x = a.Config.HALF_GAME_WIDTH
        },
        c.prototype.addBoostersUI = function() {
            var b = this;
            this.boostersUI = new a.BuyBoostersUI(this.game, this.world),
            this.boostersUI.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT),
            this.boostersUI.buyButtons.forEach(function(a) {
                a.callback.add(b.onBuy, b)
            }),
            this.boostersUI.updateData()
        },
        c.prototype.onBuy = function(b) {
            var c = a.Main.stats.getNumericValue(a.GameStats.COINS),
            d = b.userData,
            e = d.num >= d.maxNum,
            f = c >= d.price;
            if (f === !1) return void this.coinsWarning.show();
            if (e) {
                var g = b.parent.toGlobal(b.position);
                return g.x = g.x / a.Config.WORLD_SCALE - 150,
                g.y = g.y / a.Config.WORLD_SCALE - 68,
                this.maxedWarning.position.set(g.x, g.y),
                this.maxedWarning.initialX = g.x,
                void this.maxedWarning.show()
            }
            f && !e && this.performBuy(d)
        },
        c.prototype.performBuy = function(b) {
            this.game.sound.usingWebAudio && this.game.sound.play("cash");
            var c = a.Main.stats.changeNumericValue(a.GameStats.COINS, -b.price);
            a.Main.boosters.getBooster(b.pType).num++,
            this.coinsLabel.updateCoins(c),
            this.boostersUI.updateData()
        },
        c.prototype.addCoinsLabel = function() {
            this.coinsLabel = new a.CoinsLabel(this.game),
            this.coinsLabel.position.set(.33 * a.Config.GAME_WIDTH, .8 * a.Config.GAME_HEIGHT),
            this.coinsLabel.updateCoins(a.Main.stats.getNumericValue(a.GameStats.COINS), !1),
            this.coinsLabel.buyButton.callback.add(this.buyCoins, this)
        },
        c.prototype.buyCoins = function() {
            a.Main.stats.changeNumericValue(a.GameStats.COINS, 1e3),
            this.coinsLabel.updateCoins(a.Main.stats.getNumericValue(a.GameStats.COINS)),
            this.iapUI.visible === !1 && this.iapUI.show()
        },
        c.prototype.addCoinsWarning = function() {
            this.coinsWarning = new a.CoinsWarning(this.game, this.world),
            this.coinsWarning.position.set(this.coinsLabel.position.x, this.coinsLabel.position.y),
            this.coinsWarning.initialX = this.coinsLabel.position.x
        },
        c.prototype.addMaxedWarning = function() {
            this.maxedWarning = new a.MaxedWarning(this.game, this.world)
        },
        c.prototype.addContinueButton = function() {
            var b = this;
            this.continueButton = new a.SimpleButton(this.game, 0, 0, "boosters", "Button_Play0000"),
            this.continueButton.callback.addOnce(function() {
                b.game.changeState("Level")
            },
            this),
            this.continueButton.x = .75 * a.Config.GAME_WIDTH,
            this.world.add(this.continueButton)
        },
        c.prototype.addIapUI = function() {
            this.iapUI = new a.IapUI(this.game, this.world),
            this.iapUI.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT)
        },
        c.prototype.addButtons = function() {
            var b = this;
            this.menuButton = new a.SimpleButton(this.game, 0, 0, "interface", "Button_Menu0000"),
            this.menuButton.x = .5 * this.menuButton.width + 3,
            this.menuButton.y = .5 * this.menuButton.height + 10,
            this.menuButton.callback.add(this.gotoMainMenu, this),
            this.world.add(this.menuButton),
            this.soundButton = new a.ToggleButton(this.game, 0, 0, "interface", "Button_Sound_On0000", "Button_Sound_Off0000"),
            this.soundButton.x = a.Config.GAME_WIDTH - .5 * this.soundButton.width,
            this.soundButton.y = .5 * this.soundButton.height + 10,
            this.soundButton.callback.add(function() {
                b.game.sound.mute = !b.game.sound.mute
            }),
            this.game.sound.mute && this.soundButton.switchTextures(),
            this.world.add(this.soundButton)
        },
        c.prototype.gotoMainMenu = function() {
            this.game.changeState("MainMenu")
        },
        c.prototype.resize = function() {
            this.backround.resize(),
            this.title.y = .13 * a.Config.GAME_HEIGHT,
            this.boostersUI.position.y = a.Config.HALF_GAME_HEIGHT,
            this.iapUI.position.y = a.Config.HALF_GAME_HEIGHT,
            this.coinsLabel.position.y = .9 * a.Config.GAME_HEIGHT,
            this.coinsWarning.position.y = this.coinsLabel.position.y - 35,
            this.continueButton.y = this.coinsLabel.position.y + 3
        },
        c.prototype.startAnimation = function() {
            var a = 200;
            this.boostersUI.alpha = 0,
            this.boostersUI.scale.set(1.2, 1.2),
            this.game.add.tween(this.boostersUI.scale).to({
                x: 1,
                y: 1
            },
            500, Phaser.Easing.Back.Out, !0, a),
            this.game.add.tween(this.boostersUI).to({
                alpha: 1
            },
            200, Phaser.Easing.Cubic.Out, !0, a),
            this.title.alpha = 0,
            this.title.y -= 50,
            this.game.add.tween(this.title).to({
                y: this.title.y + 50
            },
            400, Phaser.Easing.Back.Out, !0, a + 300),
            this.game.add.tween(this.title).to({
                alpha: 1
            },
            200, Phaser.Easing.Cubic.Out, !0, a + 300),
            this.coinsLabel.alpha = 0,
            this.coinsLabel.position.y += 50,
            this.game.add.tween(this.coinsLabel.position).to({
                y: this.coinsLabel.position.y - 50
            },
            400, Phaser.Easing.Back.Out, !0, a + 600),
            this.game.add.tween(this.coinsLabel).to({
                alpha: 1
            },
            200, Phaser.Easing.Cubic.Out, !0, a + 600),
            this.continueButton.alpha = 0,
            this.continueButton.position.y += 50,
            this.game.add.tween(this.continueButton.position).to({
                y: this.continueButton.position.y - 50
            },
            400, Phaser.Easing.Back.Out, !0, a + 800),
            this.game.add.tween(this.continueButton).to({
                alpha: 1
            },
            200, Phaser.Easing.Cubic.Out, !0, a + 800)
        },
        c
    } (Phaser.State);
    a.BoostersState = b
} (game || (game = {}));
var utils; !
function(a) {
    var b = function() {
        function a() {}
        return a.getCurrentHost = function() {
            return window.location && window.location.hostname ? window.location.hostname: null
        },
        a.isHostAllowed = function(b) {
            var c = a.getCurrentHost();
            return c ? b.some(function(a) {
                return c.indexOf(atob(a)) > -1
            }) : !1
        },
        a.inIFrame = function() {
            try {
                return window.self !== window.top
            } catch(a) {
                return ! 0
            }
        },
        a
    } ();
    a.NetUtil = b
} (utils || (utils = {})),
window.addEventListener("load", onLoad, !1);
var game; !
function(a) {
    var b = function(b) {
        function c() {
            var d = a.GameConfigCreator.createConfig();
            b.call(this, d);
            //var e = ["MTkyLjE2OC4yMC4xOTg="];
            utils.NetUtil.inIFrame() ||/* utils.NetUtil.isHostAllowed(e) === !1 || */(c.storage = new utils.LocalStorageWrapper, c.stats = new a.GameStats(c.storage), this.state.add("Boot", a.Boot, !0), this.state.add("Preloader", a.Preloader, !1), this.state.add("MainMenu", a.MainMenu, !1), this.state.add("BoostersState", a.BoostersState, !1), this.state.add("Level", a.Level, !1))
        }
        return __extends(c, b),
        c.prototype.changeState = function(a, b) {
            var c = this.plugins.plugins[0];
            c.changeState(a, b)
        },
        c.isDesktop = !0,
        c.weakDevice = !1,
        c.wasPaused = !1,
        c.wasMuted = !1,
        c.development = !1,
        c.language = "en",
        c.fontFamily = "arialblack",
        c
    } (Phaser.Game);
    a.Main = b
} (game || (game = {}));