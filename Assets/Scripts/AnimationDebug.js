//////////////////////////////////////////////////////////////
// AnimationDebug.js
// Penelope iPhone Tutorial
//
// AnimationDebug is not explained in the tutorial, however,
// was useful by us in debugging animations while building 
// controls.
//////////////////////////////////////////////////////////////
@script RequireComponent( AnimationController )

private var animationController : AnimationController;
private var character : CharacterController;

function Start()
{
	character = GetComponent( CharacterController );
	animationController = GetComponent( AnimationController );
	if ( !Application.isEditor )
		Destroy( this );
}

function OnGUI()
{
	GUI.skin.font = null;
	
	var largestWeight : float = 0;
	var animState : AnimationState;
	for( var state : AnimationState in animationController.animationTarget )
	{
		if ( state.weight > largestWeight )
		{
			largestWeight = state.weight;
			animState = state;
		}
	}

	var vel = character.velocity;
	var horizontalVel = vel;
	horizontalVel.y = 0;
	var speed = horizontalVel.magnitude;

	if ( animState )	
		GUI.Label( Rect( 10, 70, 400, 60 ), 
			String.Format( "Vel: {5}  Speed: {0:0.000}\nAnimation: {1}\n  * weight {2:0.00}  speed {3:0.00} time {4:0.00}", 
				speed, animState.name, animState.weight, animState.speed, animState.normalizedTime, vel ) );
		
//	GUI.Label( Rect( 10, 70, 100, 20 ), String.Format( "{0}", vel ) );
}
