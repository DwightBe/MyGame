//////////////////////////////////////////////////////////////
// DepositTrigger.js
// Penelope iPhone Tutorial
//
// The DepositTrigger handles the region in which the player
// can deposit their pickups. When the player enters the 
// DepositTrigger area, the particle effects for the deposit
// area are activated and the player's carried items are 
// deposited.
//////////////////////////////////////////////////////////////

var emitters : ParticleEmitter[];	// These are the particle systems associated with the depository
var depository : GameObject;		// The root GameObject for the depository
private var arrowShown = false;

function Start()
{
	// Disable everything by default
	for ( var emitter in emitters )
		emitter.emit = false;
		
	DeactivateDepository();
	
	for ( var child : Transform in transform )
		child.gameObject.SetActiveRecursively( false );
}

function OnTriggerEnter(other : Collider)
{
	// Activate depository objects and emitters
	ActivateDepository();
	for ( var emitter in emitters )
		emitter.emit = true;
		
	// Tell the player that they have entered the depository
	other.SendMessage( "Deposit" );

	// Destroy the arrow designating the depository, now that we know the player
	// has found and entered the depository.	
	if ( !arrowShown )
	{
		for ( var child : Transform in transform )
			Destroy( child.gameObject );
			
		arrowShown = true;
	}
}

function OnTriggerExit(other : Collider)
{
	// Disable depository when player leaves
	for ( var emitter in emitters )
		emitter.emit = false;
	DeactivateDepository();	
}

function ActivateDepository()
{
	if ( !arrowShown )
		gameObject.SetActiveRecursively( true );
	
	depository.SendMessage( "FadeIn" );
}

function DeactivateDepository()
{		
	depository.SendMessage( "FadeOut" );
}