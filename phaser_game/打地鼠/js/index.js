$(function(){
	var app = {
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		},
		onDeviceReady: function() {
			app.receivedEvent('deviceready');
		},
		// Update DOM on a Received Event
		receivedEvent: function(id) {
			var second_music_src = getMediaURL("audio/second_music.ogg");
			var begin_music_src = getMediaURL("audio/begin_music.ogg");
			var game_music_src = getMediaURL("audio/game_music.ogg");
			var pass_music_src = getMediaURL("audio/pass_music.ogg");
			var over_music_src = getMediaURL("audio/over_music.ogg");
			var bom_music_src = getMediaURL("audio/bom_music.mp3");
			
			function getMediaURL(s){
				if(device.platform.toLowerCase() === "android"){ 
					return "/android_asset/www/" + s;
				}
				return s;
			}
			
			 game_music = new Media(game_music_src,
				// success callback
				function () {
					config.gameMusicBg&&game_music.play();
				},
				// error callback
				function (err) {
					//console.log("Audio Error: " + JSON.stringify(err));
				}
			);
			var second_music = new Media(second_music_src,
				// success callback
				function () {
					
				},
				// error callback
				function (err) {
					//console.log("Audio Error: " + JSON.stringify(err));
				}
			);
			var begin_music = new Media(begin_music_src,
				// success callback
				function () {
					
				},
				// error callback
				function (err) {
					//console.log("Audio Error: " + JSON.stringify(err));
				}
			);
			var pass_music = new Media(pass_music_src,
				// success callback
				function () {
					
				},
				// error callback
				function (err) {
					//console.log("Audio Error: " + JSON.stringify(err));
				}
			);
			var over_music = new Media(over_music_src,
				// success callback
				function () {
					
				},
				// error callback
				function (err) {
					//console.log("Audio Error: " + JSON.stringify(err));
				}
			);
			var bom_music = new Media(bom_music_src,
				// success callback
				function () {
					
				},
				// error callback
				function (err) {
					//console.log("Audio Error: " + JSON.stringify(err));
				}
			);
			
		
			var debug = false;
			var config = {};
			config.win_w = window.innerWidth;
			config.win_h = window.innerHeight;
			config.SOURCE_GAME_WIDTH = 960;
			config.SOURCE_GAME_HEIGHT = 640;
			config.GAME_WIDTH = config.SOURCE_GAME_WIDTH;
			config.GAME_HEIGHT = config.SOURCE_GAME_HEIGHT;
			config.HALF_GAME_WIDTH = config.GAME_WIDTH*.5;
			config.HALF_GAME_HEIGHT = config.GAME_HEIGHT*.5;
			config.WORLD_SCALE = 1;
			config.gameMusicBg = true;
			config.gameMusic = true;
			config.playtime = 30;//秒
			config.loop = 18;//百毫秒
			config.n = 0;
			config.speed_m = true;
			config.speed_l = true;
			config.move_mousetime = 60;
			config.move_up = 90;
			config.tween = {};
			config.killtxt = 0;
			config.moneytxt = 0;
			config.level = 0;
			config.levelnum = 300;
			config.allNum = 0;
			config.nowNum = 0;
			config.aimNum = 100;
			config.gameElem = false;
			config.b = {
				font: "45px GrilledCheeseBTNToasted",
				fill: "yellow",
				align: "center"
			};
			config.timerEvents = {};
			config.mouseico = ['craze_mouse','angle_mouse','king_mouse','pretty_mouse','rabbit'];
			config.mousenum = {'craze_mouse':'+10','angle_mouse':'-.2','king_mouse':'+50','pretty_mouse':'-10','rabbit':'+.2'};
			config.mousenum_p = {'craze_mouse':96,'angle_mouse':1,'king_mouse':1,'pretty_mouse':1,'rabbit':1};
			function myRandom(p) {
				var p1 = p.craze_mouse/100;
				var p2 = (p.craze_mouse+p.angle_mouse)/100;
				var p3 = (p.craze_mouse+p.angle_mouse+p.king_mouse)/100;
				var p4 = (p.craze_mouse+p.angle_mouse+p.king_mouse+p.pretty_mouse)/100;
				
				var rand = Math.random();
				if (rand < p1) return 0;
				if (rand >= p1 && rand < p2) return 1;
				if (rand >= p2 && rand < p3) return 2;
				if (rand >= p3 && rand < p4) return 3;
				return 4;
			}

			config.hole = [[163,235],[387,232],[625,240],[131,356],[390,358],[631,356],[121,486],[389,492],[653,494]];
			config.position = [[230,260],[460,255],[695,262],[200,380],[460,378],[700,376],[190,506],[460,518],[723,520]];
			config.cache = function(){
				function a(){
					this._enabled = true;
					this.init();
				}
				return a.prototype.init = function() {
					try {
						this.localStorage = window.localStorage;
						this.localStorage.setItem("testKey", "testData");
						this.localStorage.removeItem("testKey");
					} catch(a) {
						this._enabled = false;
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
				},a;
			}();
			config.storage = new config.cache;
			
			var game = new Phaser.Game(config.SOURCE_GAME_WIDTH, config.SOURCE_GAME_HEIGHT, Phaser.CANVAS, 'susliks', {
				init:init, 
				preload: preload, 
				loadUpdate: loadUpdate,
				create: create 
				//update: update, 
				//render: render 
			});
			
			function init(){
				console.log("init事件");
				//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
				game.scale.aspectRatio = config.SOURCE_GAME_WIDTH / config.SOURCE_GAME_HEIGHT;
				game.scale.setMinMax(480, 320, window.innerWidth, window.innerHeight);
				game.scale.pageAlignHorizontally = true;
				game.scale.pageAlignVertically = true;
				/*
				game.scale.onSizeChange.add(function(){
					game.scale.setMinMax(480, 320, window.innerWidth, window.innerHeight);
				});
				*/
			}
			
			function preload(){
				console.log("preload事件");
				game.load.atlasJSONHash("preloader", "images/load.png", "images/load.json")
			}
			
			function loadUpdate(){
				
			}
			
			function create(){
				console.log("create事件");
				//背景图
				bg = game.add.image(0, 0, "preloader", "loader_bg.png");
				bg.height = game.canvas.height;
				bg.width = game.canvas.width;
				
				backPreloadSprite = game.add.image(0, 0, "preloader", "loader_ico0.png");
				backPreloadSprite.anchor.set(.5, .5);
				
				backPreloadSprite.x = config.HALF_GAME_WIDTH;
				backPreloadSprite.y = config.HALF_GAME_HEIGHT;
				
				frontPreloadSprite = game.add.sprite(0, 0, "preloader", "loader_ico1.png");
				frontPreloadSprite.angle = -90;
				frontPreloadSprite.anchor.set(0,.5);
				frontPreloadSprite.x = backPreloadSprite.x;
				frontPreloadSprite.y = backPreloadSprite.y + .5 * frontPreloadSprite.height-5;
				
				loadingText = game.add.text(0, 0, "Loading...", config.b);
				loadingText.anchor.set(.5, .5);
				loadingText.position.set(config.HALF_GAME_WIDTH, config.HALF_GAME_HEIGHT + 100);
				loadingText.setShadow(2, 2, "#0C1829");
				
				
				game.load.onLoadStart.add(loadStart, this);
				game.load.onFileComplete.add(fileComplete, this);
				game.load.onLoadComplete.add(loadComplete, this);
				
				start_load();
				
			}
			function start_load(){
				game.load.spritesheet('kaboom', 'images/explode.png', 128, 128);
				game.load.bitmapFont('num0', 'number/num0_0.png', 'number/num0.fnt');
				game.load.bitmapFont('num1', 'number/num1_0.png', 'number/num1.fnt');
				game.load.atlasJSONHash('mouse', 'images/mouse.png?20151223', "images/mouse.json?20151223");
				
				game.load.setPreloadSprite(frontPreloadSprite);
				game.load.start();
			}
			
			function loadStart() {
			
				loadingText.setText("Loading ...");
			
			}
			
			function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
			
				loadingText.setText(progress + "%");
			
			}
			
			function loadComplete() {	
				//游戏界面
				show_bg = game.add.image(0, 0, "mouse","background.png");
				show_bg.height = game.canvas.height;
				show_bg.width = game.canvas.width;
				
				//菜单组
				menugroup = game.add.group();
				
				//标题小老鼠
				mouse_title_m = game.add.sprite(game.world.centerX-50,game.world.centerY-30,'mouse','mouse_back0.png');
				var m_anim = mouse_title_m.animations.add('run',['mouse_back0.png','mouse_back1.png','mouse_back2.png','mouse_back3.png','mouse_back4.png'],6,true);
				m_anim.play();
				menugroup.add(mouse_title_m);
				
				//打地鼠图片标题
				mouse_title = game.add.image(150,game.world.centerY-50,"mouse","game_name.png");
				menugroup.add(mouse_title);
				
				//花
				flower = game.add.group();
				var flower_bef = game.add.sprite(game.world.width-20,game.world.centerY-230,"mouse",'flower1.png');
				flower_bef.anchor.setTo(1, .3);
				pollen = game.add.group();
				for(var i=0;i<3;i++){
					pollen.create(flower_bef.x-50+i*4, flower_bef.y+40+i*4, 'mouse', 'dot'+i+'.png');
				}
				pollen.alpha=0;
				var flower_aft = game.add.sprite(game.world.width-20,game.world.centerY-230,"mouse",'flower0.png');
				flower_aft.anchor.setTo(1, .3);
				flower_aft_tween2 = game.add.tween(flower_aft).to({alpha:0},2000,Phaser.Easing.Linear.None,true,500,-1,1);
				flowerloop = game.time.events.loop(Phaser.Timer.SECOND*5, loopflower, this);
				function loopflower(){
					flower_aft_tween0 = game.add.tween(flower_bef).to({angle:20},200,Phaser.Easing.Linear.None,true,1500,2,1);
					flower_aft_tween1 = game.add.tween(flower_aft).to({angle:20},200,Phaser.Easing.Linear.None,true,1500,2,1);
					flower_aft_tween0.onComplete.addOnce(function(){
						pollen.alpha=1;
						var i = Math.ceil(Math.random()*3);
						if(pollen.children[i]){
							pollen.children[i].alpha = 0;
						};
						var pollen_anim = game.add.tween(pollen).to( {y: flower_aft.y+100,alpha:0}, 3000, Phaser.Easing.Linear.None, true, 0, 0);
						pollen_anim.onComplete.addOnce(function(){
							pollen.y = 0;
							(pollen.children[i])&&(pollen.children[i].alpha = 1);
						});
					});
				}
				
				//游戏菜单
				//新游
				menu_newgame = game.add.image(game.world.centerX+50,game.world.centerY-150,"mouse",'button_new.png');
				menu_newgame_txt = game.add.button(game.world.centerX+95,game.world.centerY-125,"mouse",play_game,this,'game_new.png','game_new.png','game_new_on.png','game_new.png');
				menu_newgame_txt.onInputDown.add(changebg,this);
				menu_newgame_txt.onInputUp.add(changebg,this);
				
				//继续游戏
				menu_contgame = game.add.image(game.world.centerX+50,game.world.centerY-150,"mouse",'button_cont.png');
				menu_contgame_txt = game.add.button(game.world.centerX+80,game.world.centerY-125,"mouse",cont_game,this,'game_cont.png','game_cont.png','game_cont_on.png','game_cont.png');
				menu_contgame_txt.onInputDown.add(changebg,this);
				menu_contgame_txt.onInputUp.add(changebg,this);
				menu_contgame.visible = false;
				menu_contgame_txt.visible = false;
								
				//设置
				menu_setgame = game.add.image(game.world.centerX+50,game.world.centerY-75,"mouse",'button_set.png');
				menu_setgame_txt = game.add.button(game.world.centerX+100,game.world.centerY-55,"mouse",set_game,this,'game_set.png','game_set.png','game_set_on.png','game_set.png');
				menu_setgame_txt.onInputDown.add(changebg,this);
				menu_setgame_txt.onInputUp.add(changebg,this);
				
				//游戏说明
				menu_helpgame = game.add.image(game.world.centerX+50,game.world.centerY,"mouse",'button_hlep.png');
				menu_helpgame_txt = game.add.button(game.world.centerX+80,game.world.centerY+25,"mouse",help_game,this,'game_help.png','game_help.png','game_help_on.png','game_help.png');
				menu_helpgame_txt.onInputDown.add(changebg,this);
				menu_helpgame_txt.onInputUp.add(changebg,this);
				
				//退出
				menu_exitgame = game.add.image(game.world.centerX+50,game.world.centerY+75,"mouse",'button_exit.png');
				menu_exitgame_txt = game.add.button(game.world.centerX+100,game.world.centerY+95,"mouse",exit_game,this,'game_exit.png','game_exit.png','game_exit_on.png','game_exit.png');
				menu_exitgame_txt.onInputDown.add(changebg,this);
				menu_exitgame_txt.onInputUp.add(changebg,this);
				
				menugroup.add(menu_newgame);
				menugroup.add(menu_newgame_txt);
				menugroup.add(menu_contgame);
				menugroup.add(menu_contgame_txt);
				menugroup.add(menu_setgame);
				menugroup.add(menu_setgame_txt);
				menugroup.add(menu_helpgame);
				menugroup.add(menu_helpgame_txt);
				menugroup.add(menu_exitgame);
				menugroup.add(menu_exitgame_txt);		
				//play_game();
				
				gameElemGroup = game.add.group();
				//鼠组
				mouses = game.add.group();
				mouses.createMultiple(18, 'mouse','craze_mouse.png',false);
				gameElemGroup.add(mouses);
				
				//档板
				holes = game.add.group();
				for (var i = 0; i < 9; i++) {
					var hole_sprite = game.add.sprite(config.hole[i][0],config.hole[i][1],'mouse','bg'+i+'.png');
					hole_sprite.scale.set(1.1);
					hole_sprite.smoothed = false;
					holes.add(hole_sprite);
				};
				gameElemGroup.add(holes);
				
				//添加开始3秒倒计时
				config.counttime_n = 3;
				count_time = game.add.sprite(game.world.centerX,game.world.centerY,"mouse","start3.png");
				count_time.anchor.set(.5,.5);
				gameElemGroup.add(count_time);
				count_time.visible = false;
				
				//添加统计
				statistics_bg = game.add.image(150,0,"mouse","message.png");
				score_title = game.add.image(180,45,"mouse","all_score.png");
				now_score_title = game.add.image(360,45,"mouse","now_score.png");
				now_score_aim_title = game.add.image(580,45,"mouse","now_score_aim.png");
				
				//总分
				allNum = game.add.bitmapText(260, 48, 'num1', '0', 32);
				
				//本关得分
				nowNum = game.add.bitmapText(485, 48, 'num1', '0', 32);
				
				//过关目标分数
				aimNum = game.add.bitmapText(700, 48, 'num1', ''+config.aimNum, 32);
				gameElemGroup.add(statistics_bg);
				gameElemGroup.add(score_title);
				gameElemGroup.add(now_score_title);
				gameElemGroup.add(now_score_aim_title);
				gameElemGroup.add(allNum);
				gameElemGroup.add(nowNum);
				gameElemGroup.add(aimNum);
				
				
				//游戏时间倒计时
				playtime_bg = game.add.image(10,game.world.height-100,"mouse","time_roller.png");
				playtime_progress = game.add.image(373,game.world.height-46,"mouse","time_item.png");
				playtime_progress.anchor.set(0,.5);
				playtime_progress.angle = 180;
				config.playtime_w = playtime_progress.width;
				config.playtime = config.playtime*10;
				config._loop = config.loop;
				config._move_mousetime = config.move_mousetime;
				
				gameElemGroup.add(playtime_bg);
				gameElemGroup.add(playtime_progress);
				
				//关卡数
				level_bg = game.add.image(game.world.width-230,game.world.height-100,"mouse","level_num.png");
				level_txt = game.add.text(game.world.width-125, game.world.height-60, "0", {
					font: "20px GrilledCheeseBTNToasted",
					fill: "yellow",
					align: "left"
				});
				level_txt.setShadow(1, 1, "#0C1829");
				gameElemGroup.add(level_bg);
				gameElemGroup.add(level_txt);
				
				//爆炸组
				explosions = game.add.group();
				explosions.createMultiple(30, 'kaboom');
				explosions.forEach(setupInvader, this);
				gameElemGroup.add(explosions);
				
				//遮挡层
				keep = game.add.image(0,0,"mouse","back_on.png");
				keep.width = game.world.width;
				keep.height = game.world.height;
				keep.alpha = 0;
				keep.inputEnabled = true;
				keep.visible = false;
				gameElemGroup.add(keep);
				
				//过关成功
				pass = game.add.image(game.world.centerX,game.world.centerY+50,"mouse","pass_word.png");
				pass.anchor.set(.5,.5);
				pass_level = game.add.image(game.world.centerX-20,game.world.centerY-10,"mouse","level.png");
				pass_level.anchor.set(.5,.5);
				pass_level_n = game.add.bitmapText(pass_level.x+120, pass_level.y-8, 'num0', '1', 32);
				pass_level_n.anchor.set(.5,.5);
				pass_nextbtn = game.add.image(game.world.centerX,game.world.centerY+120,"mouse","button.png");
				pass_nextbtn.anchor.set(.5,.5);
				pass_nextbtn_txt = game.add.image(pass_nextbtn.x,pass_nextbtn.y-3,"mouse","pass_ok.png");
				pass_nextbtn_txt.anchor.set(.5,.5);
				
				pass.visible = false;
				pass_level.visible = false;
				pass_level_n.visible = false;
				pass_nextbtn.visible = false;
				pass_nextbtn_txt.visible = false;
				pass_nextbtn_txt.inputEnabled = true;
				pass_nextbtn_txt.events.onInputDown.add(nextLevel,this);
				
				gameElemGroup.add(pass);
				gameElemGroup.add(pass_level);
				gameElemGroup.add(pass_level_n);
				gameElemGroup.add(pass_nextbtn);
				gameElemGroup.add(pass_nextbtn_txt);
				
				//过关失败
				over = game.add.image(game.world.centerX,game.world.centerY-10,"mouse","gameover.png");
				over.anchor.set(.5,.5);
				replay = game.add.image(game.world.centerX,game.world.centerY+60,"mouse","button.png");
				replay.anchor.set(.5,.5);
				replay_txt = game.add.image(replay.x,replay.y-3,"mouse","repick.png");
				replay_txt.anchor.set(.5,.5);
				backMenu = game.add.image(game.world.centerX,game.world.centerY+140,"mouse","button_on.png");
				backMenu.anchor.set(.5,.5);
				backMenu_txt = game.add.image(backMenu.x,backMenu.y-3,"mouse","back_menu_on.png");
				backMenu_txt.anchor.set(.5,.5);
				
				over.visible = false;
				replay.visible = false;
				replay_txt.visible = false;
				backMenu.visible = false;
				backMenu_txt.visible = false;
				replay_txt.inputEnabled = true;
				backMenu_txt.inputEnabled = true;
				replay_txt.events.onInputDown.add(replayLevel,this);
				backMenu_txt.events.onInputDown.add(gameMenu,this);
				
				
				gameElemGroup.add(over);
				gameElemGroup.add(replay);
				gameElemGroup.add(replay_txt);
				gameElemGroup.add(backMenu);
				gameElemGroup.add(backMenu_txt);
				
				gameElemGroup.visible = false;
				
				//设置菜单
				gameSetGroup = game.add.group();
				setbg = game.add.image(game.world.centerX,game.world.centerY,"mouse","set_board.png");
				setbg.anchor.set(.5,.5);
				setico = game.add.image(setbg.x-220,setbg.y-90,"mouse","set_title.png");
				setMusicbg_checkbox = game.add.image(setbg.x-80,setbg.y-40,"mouse","on.png");
				setMusicbg = game.add.image(setbg.x-30,setbg.y-40,"mouse","music.png");
				setMusic_checkbox = game.add.image(setbg.x-80,setbg.y+20,"mouse","on.png");
				setMusic = game.add.image(setbg.x-30,setbg.y+20,"mouse","sound.png");
				setBack = game.add.image(setbg.x,setbg.y+115,"mouse","button1.png");
				setBack.anchor.set(.5,.5);
				
				gameSetGroup.add(setbg);
				gameSetGroup.add(setico);
				gameSetGroup.add(setMusicbg_checkbox);
				gameSetGroup.add(setMusicbg);
				gameSetGroup.add(setMusic_checkbox);
				gameSetGroup.add(setMusic);
				gameSetGroup.add(setBack);
				
				gameSetGroup.visible = false;
				
				setMusicbg_checkbox.inputEnabled = true;
				setMusicbg_checkbox.events.onInputDown.add(set_Musicbg,this);
				setMusic_checkbox.inputEnabled = true;
				setMusic_checkbox.events.onInputDown.add(set_Music,this);
				setBack.inputEnabled = true;
				setBack.events.onInputDown.add(set_Back,this);
				
				//说明
				gameHelpGroup = game.add.group();
				helpbg = game.add.image(game.world.centerX,game.world.centerY,"mouse","set_board.png");
				helpbg.anchor.set(.5,.5);
				help_ico1 = game.add.image(helpbg.x-150,helpbg.y-40,"mouse","craze_mouse.png");
				help_ico2 = game.add.image(helpbg.x-10,helpbg.y-40,"mouse","king_mouse.png");
				help_ico3 = game.add.image(helpbg.x+120,helpbg.y-40,"mouse","pretty_mouse.png");
				help_ico4 = game.add.image(helpbg.x-150,helpbg.y+50,"mouse","angle_mouse.png");
				help_ico5 = game.add.image(helpbg.x,helpbg.y+40,"mouse","rabbit.png");
				help_ico1.anchor.set(.5,.5);
				help_ico2.anchor.set(.5,.5);
				help_ico3.anchor.set(.5,.5);
				help_ico4.anchor.set(.5,.5);
				help_ico5.anchor.set(.5,.5);
				help_ico1.scale.set(.6);
				help_ico2.scale.set(.6);
				help_ico3.scale.set(.6);
				help_ico4.scale.set(.6);
				help_ico5.scale.set(.6);
				help_ico1_txt = game.add.text(help_ico1.x+30, help_ico1.y+10, "+10", {
					font: "20px GrilledCheeseBTNToasted",
					fill: "#264301",
					align: "left"
				});
				help_ico2_txt = game.add.text(help_ico2.x+30, help_ico2.y+10, "+50", {
					font: "20px GrilledCheeseBTNToasted",
					fill: "#264301",
					align: "left"
				});
				help_ico3_txt = game.add.text(help_ico3.x+30, help_ico3.y+10, "-10", {
					font: "20px GrilledCheeseBTNToasted",
					fill: "#264301",
					align: "left"
				});
				help_ico4_txt = game.add.text(help_ico4.x+40, help_ico4.y+10, "-20%", {
					font: "20px GrilledCheeseBTNToasted",
					fill: "#264301",
					align: "left"
				});
				help_ico5_txt = game.add.text(help_ico5.x+20, help_ico5.y+20, "+20%", {
					font: "20px GrilledCheeseBTNToasted",
					fill: "#264301",
					align: "left"
				});
				help_ico1_txt.anchor.set(0,.5);
				help_ico2_txt.anchor.set(0,.5);
				help_ico3_txt.anchor.set(0,.5);
				help_ico4_txt.anchor.set(0,.5);
				help_ico5_txt.anchor.set(0,.5);
				helpBack = game.add.image(helpbg.x,helpbg.y+125,"mouse","button1.png");
				helpBack.anchor.set(.5,.5);
				helpBack.inputEnabled = true;
				helpBack.events.onInputDown.add(help_Back,this);
				
				gameHelpGroup.add(helpbg);
				gameHelpGroup.add(help_ico1);
				gameHelpGroup.add(help_ico2);
				gameHelpGroup.add(help_ico3);
				gameHelpGroup.add(help_ico4);
				gameHelpGroup.add(help_ico5);
				gameHelpGroup.add(help_ico1_txt);
				gameHelpGroup.add(help_ico2_txt);
				gameHelpGroup.add(help_ico3_txt);
				gameHelpGroup.add(help_ico4_txt);
				gameHelpGroup.add(help_ico5_txt);
				gameHelpGroup.add(helpBack);
				
				gameHelpGroup.visible = false;
				cont_menu();
			}
			function changebg(btn){
				if(btn.frameName == 'game_new.png'||btn.frameName == 'game_new_on.png'){
					if(menu_newgame.frameName == "button_new.png"){
						menu_newgame.frameName = 'button_new_on.png';
					}else{
						menu_newgame.frameName = 'button_new.png';
					}
				}else if(btn.frameName == 'game_cont.png'||btn.frameName == 'game_cont_on.png'){
					if(menu_contgame.frameName == "button_cont.png"){
						menu_contgame.frameName = 'button_cont_on.png';
					}else{
						menu_contgame.frameName = 'button_cont.png';
					}
				}else if(btn.frameName == 'game_set.png'||btn.frameName == 'game_set_on.png'){
					if(menu_setgame.frameName == "button_set.png"){
						menu_setgame.frameName = 'button_set_on.png';
					}else{
						menu_setgame.frameName = 'button_set.png';
					}
				}else if(btn.frameName == 'game_help.png'||btn.frameName == 'game_help_on.png'){
					if(menu_helpgame.frameName == "button_hlep.png"){
						menu_helpgame.frameName = 'button_hlep_on.png';
					}else{
						menu_helpgame.frameName = 'button_hlep.png';
					}
				}else if(btn.frameName == 'game_exit.png'||btn.frameName == 'game_exit_on.png'){
					if(menu_exitgame.frameName == "button_exit.png"){
						menu_exitgame.frameName = 'button_exit_on.png';
					}else{
						menu_exitgame.frameName = 'button_exit.png';
					}
				}
				
			}
			
			function show_menu(){
				menugroup.visible = true;
			}
			
			function hide_menu(){
				menugroup.visible = false;
			}
			function cont_menu(){
				var cache_level = Number(config.storage.getValue("level"));
				var cache_allNum = Number(config.storage.getValue("allNum"));
				var cache_aimNum = Number(config.storage.getValue("aimNum"));
				if(cache_level&&cache_allNum&&cache_aimNum){
					menu_contgame.visible = true;
					menu_contgame_txt.visible = true;
					menu_newgame.y = 100;
					menu_newgame_txt.y = 125;
				}else{
					menu_contgame.visible = false;
					menu_contgame_txt.visible = false;
					menu_newgame.y = 170;
					menu_newgame_txt.y = 195;
				}
			}
			function cont_game(){
				config.gameMusicBg&&game_music.play();
				hide_menu();
				gameElemGroup.visible = true;		
				
				var cache_level = Number(config.storage.getValue("level"));
				var cache_allNum = Number(config.storage.getValue("allNum"));
				var cache_aimNum = Number(config.storage.getValue("aimNum"));
				config.allNum = cache_allNum;
				config.aimNum = cache_aimNum;
				config.level = cache_level;
				
				allNum.text = config.allNum;
				aimNum.text = config.aimNum;
				level_txt.text = config.level;
				
				config._loop = config.level < 50?config.loop:(config.level < 100?config.loop-6:config.loop-12);
				config._move_mousetime = config.level < 50?config.move_mousetime:(config.level < 100?config.move_mousetime-15:config.move_mousetime-30);
				
				config.mousenum_p.craze_mouse = Number(config.storage.getValue("craze_mouse"));
				config.mousenum_p.angle_mouse = Number(config.storage.getValue("angle_mouse"));
				config.mousenum_p.king_mouse = Number(config.storage.getValue("king_mouse"));
				config.mousenum_p.pretty_mouse = Number(config.storage.getValue("pretty_mouse"));
				config.mousenum_p.rabbit = Number(config.storage.getValue("rabbit"));
				
				mouseloop = game.time.create(false);
				mouseloop.loop(Phaser.Timer.SECOND/10, updateCounter, this);
				mouseloop.start();
					
			}
			function set_game(){
				gameSetGroup.visible = true;
				menugroup.visible = false;
			}
			
			function help_game(){
				gameHelpGroup.visible = true;
				menugroup.visible = false;
			}
			
			function exit_game(){
				navigator.app.exitApp();
			}
			
			function set_Musicbg(checkbox){
				if(config.gameMusicBg){
					config.gameMusicBg = false;
					checkbox.frameName = "off.png";
				}else{
					config.gameMusicBg = true;
					checkbox.frameName = "on.png";
				}				
			}
			
			function set_Music(checkbox){
				if(config.gameMusic){
					config.gameMusic = false;
					checkbox.frameName = "off.png";
				}else{
					config.gameMusic = true;
					checkbox.frameName = "on.png";
				}
			}
			
			function set_Back(){
				gameSetGroup.visible = false;
				menugroup.visible = true;
			}
			
			function help_Back(){
				gameHelpGroup.visible = false;
				menugroup.visible = true;
			}
			
			function play_game(){
				hide_menu();
				gameElemGroup.visible = true;	
				
				config.storage.clear();
				config.allNum = 0;
				config.aimNum = 100;
				config.level = 0;
				
				allNum.text = config.allNum;
				aimNum.text = config.aimNum;
				level_txt.text = config.level;
				//开始三秒倒计时
				config.gameMusic&&second_music.play();
				count_time.visible = true;
				game.time.events.repeat(Phaser.Timer.SECOND, 4, countTime, this);
				
			}
			
			
			
			
			//下一关
			function nextLevel(){
				config.gameMusicBg&&game_music.play();
				config.allNum = config.allNum+config.nowNum
				allNum.text = config.allNum;
				pass.visible = false;
				pass_level.visible = false;
				pass_level_n.visible = false;
				pass_nextbtn.visible = false;
				pass_nextbtn_txt.visible = false;
				keep.visible = false;
				config._loop = config.level < 50?config.loop:(config.level < 100?config.loop-6:config.loop-12);
				config._move_mousetime = config.level < 50?config.move_mousetime:(config.level < 100?config.move_mousetime-15:config.move_mousetime-30);
				config.speed_m = true;
				config.speed_l = true;
				config.n = 0;
				config.nowNum = 0;
				config.aimNum = config.aimNum+10;
				nowNum.text = 0;
				aimNum.text = config.aimNum;
				config.level = config.level+1;
				level_txt.text = config.level;
				playtime_progress.crop({x:0,y:0,width:config.playtime_w,height:playtime_progress.height},false);				
				
				mouseloop.resume();
			}
			
			//重新开始
			function replayLevel(){
				config.gameMusicBg&&game_music.play();
				over.visible = false;
				replay.visible = false;
				replay_txt.visible = false;
				backMenu.visible = false;
				backMenu_txt.visible = false;
				keep.visible = false;
				config._loop = config.level < 50?config.loop:(config.level < 100?config.loop-6:config.loop-12);
				config._move_mousetime = config.level < 50?config.move_mousetime:(config.level < 100?config.move_mousetime-15:config.move_mousetime-30);
				config.speed_m = true;
				config.speed_l = true;
				config.n = 0;
				config.nowNum = 0;
				nowNum.text = 0;
				aimNum.text = config.aimNum;
				playtime_progress.crop({x:0,y:0,width:config.playtime_w,height:playtime_progress.height},false);
				mouseloop.resume();
			}
			
			//返回主菜单
			function gameMenu(){
				over.visible = false;
				replay.visible = false;
				replay_txt.visible = false;
				backMenu.visible = false;
				backMenu_txt.visible = false;
				keep.visible = false;
				config._loop = config.loop;
				config._move_mousetime = config.move_mousetime;
				config.speed_m = true;
				config.speed_l = true;
				config.n = 0;
				config.nowNum = 0;
				nowNum.text = 0;
				aimNum.text = config.aimNum;
				playtime_progress.crop({x:0,y:0,width:config.playtime_w,height:playtime_progress.height},false);
				
				
				mouses.callAll('kill')
				/*game.world.bringToTop(menugroup);*/
				cont_menu();
				show_menu();
				gameElemGroup.visible = false;
				mouseloop.stop();
			}
			
			function countTime(a){
				config.counttime_n-=1;
				if(config.counttime_n > 0){
					count_time.frameName = "start"+config.counttime_n+".png";
					config.gameMusic&&second_music.stop();
					config.gameMusic&&second_music.play();
				}else if(config.counttime_n == 0){
					count_time.frameName = "start_word.png";
					config.gameMusic&&begin_music.play();
				}
				config.n+=1;
				//console.log(config.n);
				if(config.n == 4){
					//100毫秒跑一次
					config.n = 0;
					//mouseloop = game.time.events.loop(Phaser.Timer.SECOND/10, updateCounter, this);
					//game_music.play();
					config.gameMusicBg&&game_music.play();
					mouseloop = game.time.create(false);
					mouseloop.loop(Phaser.Timer.SECOND/10, updateCounter, this);
					mouseloop.start();
					
					config.counttime_n = 3;
					count_time.visible = false;
					count_time.frameName = "start3.png";
				}
			}
			
			
			function updateCounter(){
				config.n++;
			
				var crop_width = (1-config.n/config.playtime)*config.playtime_w > 0?(1-config.n/config.playtime)*config.playtime_w:0;
				playtime_progress.crop({x:0,y:0,width:crop_width,height:playtime_progress.height},false);
				
				if(config.n > config.playtime*.3&&config.speed_m){
					config._loop = Math.ceil(config.loop*.6);
					config._move_mousetime = Math.ceil(config._move_mousetime*.6);
					config.speed_m = false;
				}
				if(config.n > config.playtime*.6&&config.speed_l){
					config._loop = Math.ceil(config.loop*.3);
					config._move_mousetime = Math.ceil(config._move_mousetime*.3);
					config.speed_l = false;
				}
					
				if(config.n%config._loop == 0){
					//随机数，用于在哪个洞出鼠
					var position_n = Math.floor(Math.random()*9);
					position_n = position_n == 9?position_n-1:position_n;
					//var mouse_n = Math.floor(Math.random()*5);
					//mouse_n = mouse_n == 5?mouse_n-1:mouse_n;
					var mouse_n = myRandom(config.mousenum_p);
					
					var mouse_sprite = mouses.getFirstExists(false);
			
					if (mouse_sprite){
						//判断当前洞如果有鼠存在则跳过
						if(config.position[position_n].show){
							return false;
						}else{
							config.position[position_n].show = true;
						}
						//console.log('reset'+mouses.getIndex(mouse_sprite)+'___'+mouses.getChildIndex(mouse_sprite));
						//创建鼠
						mouse_sprite.reset(config.position[position_n][0],config.position[position_n][1]);
						//console.log(config.mouseico[mouse_n]+'___'+mouse_n);
						mouse_sprite.frameName = config.mouseico[mouse_n]+'.png';
						mouse_sprite.anchor.set(.5,0);
						
						mouse_sprite.smoothed = false;
						mouse_sprite.name = config.n;
						mouse_sprite._name = config.mouseico[mouse_n];
						mouse_sprite['p'] = position_n;
						mouse_sprite.inputEnabled = true;
						//给鼠添加点击事件
						mouse_sprite.events.onInputDown.addOnce(kill,this);
						
						//鼠左右扭动动画
						var mouse_anim = mouse_sprite.animations.add('run',[config.mouseico[mouse_n]+'.png',config.mouseico[mouse_n]+'_left.png',config.mouseico[mouse_n]+'_right.png'],10,true);
						mouse_anim.play();
						
						
						var mouseobj = {
							n:config.n,
							position:position_n,
							y:config.position[position_n][1],
							sprite:mouse_sprite,
							movetime:config._move_mousetime
						}
						
						move_mouse(mouseobj);
											
						
					}
			
				}
				
				if(config.n >= config.playtime){
					//game.tweens.pauseAll();
					mouseloop.pause();
					keep.visible = true;
					if(config.nowNum >= config.aimNum){
						//最好把所有需要的资源预先添加隐藏，需要再显示。不然此处在浏览器切换时会再跑一遍循环重复生成
						pass.visible = true;
						pass_level.visible = true;
						pass_level_n.visible = true;
						pass_nextbtn.visible = true;
						pass_nextbtn_txt.visible = true;
						pass_level_n.text = config.level;
						config.gameMusicBg&&game_music.pause();
						config.gameMusic&&pass_music.play();
						config.mousenum_p.craze_mouse = config.mousenum_p.craze_mouse>20?config.mousenum_p.craze_mouse-4:20;
						config.mousenum_p.angle_mouse = config.mousenum_p.angle_mouse<10?config.mousenum_p.angle_mouse+1:10;
						config.mousenum_p.king_mouse = config.mousenum_p.king_mouse<25?config.mousenum_p.king_mouse+1:25;
						config.mousenum_p.pretty_mouse = config.mousenum_p.pretty_mouse<25?config.mousenum_p.pretty_mouse+1:25;
						config.mousenum_p.rabbit = config.mousenum_p.rabbit<20?config.mousenum_p.rabbit+1:20;
				
						config.storage.saveValue("allNum",config.allNum+config.nowNum);
						config.storage.saveValue("aimNum",config.aimNum+10);
						config.storage.saveValue("level",config.level+1);
						
						config.storage.saveValue("craze_mouse",config.mousenum_p.craze_mouse);
						config.storage.saveValue("angle_mouse",config.mousenum_p.angle_mouse);
						config.storage.saveValue("king_mouse",config.mousenum_p.king_mouse);
						config.storage.saveValue("pretty_mouse",config.mousenum_p.pretty_mouse);
						config.storage.saveValue("rabbit",config.mousenum_p.rabbit);
					}else{
						over.visible = true;
						replay.visible = true;
						replay_txt.visible = true;
						backMenu.visible = true;
						backMenu_txt.visible = true;
						
						config.gameMusicBg&&game_music.pause();
						config.gameMusic&&over_music.play();
					}
				}
			}
			
			function move_mouse(obj){
				var up = true,y = 0,w = obj.sprite._frame.width;
				obj.sprite.crop(new Phaser.Rectangle(0, 0, w,0));
				config.timerEvents[obj.n] = game.time.events.loop(obj.movetime, function(){
					if(up){
						y+=2;
						obj.sprite.crop(new Phaser.Rectangle(0, 0, w,y));
						obj.sprite.y = obj.y-y;
						if(y >= config.move_up){
							up = false;
						}
					}else{
						y-=2;
						obj.sprite.crop(new Phaser.Rectangle(0, 0,w,y));
						obj.sprite.y = obj.y-y;
						if(y <= 0){
							game.time.events.remove(config.timerEvents[obj.n]);
							obj.sprite.kill();
							config.position[obj.position].show = null;
						}
					}
					
				}, this, obj.n);
			}
			
			
			//点击鼠回调
			function kill(sprite) {
				//鼠停止扭动
				sprite.animations.stop(true, true);
				//定位在被砸扁的那一帧
				//sprite.frame = 4;
				sprite.frameName = "hit_"+sprite._name+".png";
				
				//重新定位剪切矩形
				sprite.crop({'x':0,'y':0,'width':sprite._frame.width,'height':sprite.height},false);
				
				game.time.events.remove(config.timerEvents[sprite.name]);
			
				//添加爆炸效果
				var explosion = explosions.getFirstExists(false);
				explosion.reset(sprite.x, sprite.y+20);
				explosion.animations.currentAnim.onComplete.addOnce(function(anim){
					//炸完鼠就死了
					sprite.kill();
					config.position[sprite.p].show = null;
				},this);
				//开始爆炸
				explosion.play('kaboom', 30, false, true);
				config.gameMusic&&bom_music.stop();
				config.gameMusic&&bom_music.play();
				
				//得分
				var getNum = 0;
				if(config.mousenum[sprite._name] == '-.2'){
					getNum = -Math.floor(config.nowNum*.2);
				}else if(config.mousenum[sprite._name] == '+.2'){
					getNum = Math.floor(config.nowNum*.2);
				}else{
					getNum = Number(config.mousenum[sprite._name]);
				}
				config.nowNum += getNum;
				config.allNum = config.allNum<0?0:config.allNum;
				config.nowNum = config.nowNum<0?0:config.nowNum;
				var get_n = game.add.text(sprite.x, sprite.y, getNum>0?("+"+getNum):(""+getNum), config.b);
				get_n.anchor.set(.5,.5);
				get_n.setShadow(2, 2, "#0C1829");
				var s = game.add.tween(get_n.scale);
				s.to({x: 2, y:2}, 100, Phaser.Easing.Linear.None,false,0,0,true);
				s.onComplete.addOnce(function(t){
					var get_n_tween = game.add.tween(get_n).to({x:nowNum.x,y:nowNum.y+20,alpha: 0},500,Phaser.Easing.Linear.None,false,0,0);
					get_n_tween.onComplete.addOnce(function(t){
						nowNum.text = config.nowNum;
					},this);	
					get_n_tween.start();	
				}, this);
				s.start();
				
			}
			
			function setupInvader (invader){
				invader.anchor.x = 0.5;
				invader.anchor.y = 0.5;
				invader.animations.add('kaboom');
			}
			/*
			function update(){
				console.log("update事件");
				
			}
			
			function render(){
				console.log("render事件");
				// Display
				if(debug){
					game.debug.spriteBounds(mouse_sprite);
					game.debug.geom(mouse_sprite.getBounds());
				}
			}
			*/
		}
	};
	
	app.initialize();

});