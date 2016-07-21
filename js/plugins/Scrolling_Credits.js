/*:
 * @plugindesc v0.1 Creates scrolling credits for yor game!
 * @author Aldrigo Raffaele
 *
 * @param BASE_HEIGHT
 * @desc Base line height
 * Default: 24
 * @default 24
 *
 * @param DURATION
 * @desc Duration of sequence in secs
 * Default: 10
 * @default 10
 *
 * @param SCROLL_DURATION
 * @desc Scoll duration in secs
 * Default: 0
 * @default 0
 *
 * @param SPEED
 * @desc Scroll speed
 * Default: 1.0
 * @default 1.0
 *
 * @param ALLOW_MANUAL_CREDITS_CLOSE
 * @desc Manually close Scene_Credits?
 * Defaut: true
 * @default true
 */

(function() {
  var parameters = PluginManager.parameters('Scrolling_Credits');
  var BASE_HEIGHT = Number(parameters["BASE_HEIGHT"]),
    TEXT_COLOR = Color.new(255, 255, 255, 255),  // Default color
    DURATION = Number(parameters["DURATION"]),
    SCROLL_DURATION = Number(parameters["SCROLL_DURATION"]),
    SPEED = Number(parameters["SPEED"]),
    ALLOW_MANUAL_CREDITS_CLOSE = String(parameters["ALLOW_MANUAL_CREDITS_CLOSE"]);


  //-----------------------------------------------------------------------------
  // Scene_Credits
  function Scene_Credits() {
    this.initialize.apply(this, arguments);
  }

  Scene_Credits.prototype = Object.create(Scene_Base.prototype);
  Scene_Credits.prototype.constructor = Scene_Credits;

  Scene_Credits.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
  };

  Scene_Credits.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createForeground();
    this.createWindowLayer();
    this.createCommandWindow();
  };

  Scene_Credits.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();

    this.startFadeIn(this.fadeSpeed(), false);
  };

  Scene_Credits.prototype.update = function() {
    if (!this.isBusy()) {
      this._commandWindow.open();
    }
    Scene_Base.prototype.update.call(this);
  };

  Scene_Credits.prototype.isBusy = function() {
    return this._commandWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
  };

  Scene_Credits.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
  };

  Scene_Credits.prototype.createBackground = function() {
    this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
    this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
  };

  Scene_Credits.prototype.createForeground = function() {
    this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.addChild(this._gameTitleSprite);
    if ($dataSystem.optDrawTitle) {
      this.drawGameTitle();
    }
  };
  
  

})();  // dont touch this.
  
  