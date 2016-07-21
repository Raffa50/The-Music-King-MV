/*:
 * @plugindesc v0.1 Change class and skill of one actor. Can also be used to update skills if you want to add skill later to the game!
 * @author Aldrigo Raffaele
 *
 */

(function() {
  var parameters = PluginManager.parameters('Class_change_with_skill_update');

  //-----------------------------------------------------------------------------
  function classChanger( actorId, newClassId ){
    var actor= $gameActors.actor( actorId );
    //forget old skills
    actor.currentClass().learnings.forEach( function( i ){
      actor.forgetSkill( i.skillId );
    } );

    actor.changeClass(newClassId, true);

    //learn new skills
    actor.currentClass().learnings.forEach( function( i ){
      if( actor.level >= i.level )
        actor.learnSkill( i.skillId );
    } );
  }

  var classChangerCmd= Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function( command, args ){
    classChangerCmd.apply( this );

    if( command === "classChanger" )
      classChanger( args[0], args[1] );
  }

})();  // dont touch this.
  
  