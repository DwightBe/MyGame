//////////////////////////////////////////////////////////////
// Scorekeeper.js
// Penelope iPhone Tutorial
//
// Scorekeeper keeps track of the player's score, both the deposited
// and carried points. It also manages the game timer to keep
// track of how long until the game ends. The scorekeeper keeps
// references to the gui elements which display the score and time
// so that those gui elements can be updated whenever the values
// change.
//////////////////////////////////////////////////////////////

var carrying : int;
var carryLimit : int;
var deposited : int;
var winScore : int;								// How many orbs must be deposited to win

var gameLength : int;							// Length in seconds

var guiMessage : GameObject;					// Prefab for one-shot messages


// GUIText objects that must be assigned in editor
var carryingGui : GUIText;						
var depositedGui : GUIText;
var timerGui : GUIText;


// Sound fx and voices for different events
var collectSounds : AudioClip[];
var winSound : AudioClip;
var loseSound : AudioClip;
var pickupSound : AudioClip;
var depositSound : AudioClip;

private var timeSinceLastPlay : float;			// Last time we played a voice for pickup
private var timeLeft : float;

public function Start()
{
	timeLeft = gameLength;
	timeSinceLastPlay = Time.time;
	UpdateCarryingGui();
	UpdateDepositedGui();
	CheckTime();
}

function UpdateCarryingGui()
{
 	carryingGui.text = "Carrying: " + carrying + " of " + carryLimit;	
}

function UpdateDepositedGui()
{
 	depositedGui.text = "Deposited: " + deposited + " of " + winScore;	
}

function UpdateTimerGui()
{
	timerGui.text = "Time: " + TimeRemaining();		
}

private function CheckTime()
{
	// Rather than using Update(), use a co-routine that controls the timer.
	// We only need to check the timer once every second, not multiple times
	// per second.
	while ( timeLeft > 0 )
	{
		UpdateTimerGui();		
		yield WaitForSeconds(1);
		timeLeft -= 1;
	}
	UpdateTimerGui();
	EndGame();
}	

// This is a utility function to a play one shot audio at a specific position
// and at a specific volume
function PlayAudioClip( clip : AudioClip, position : Vector3, volume : float )
{
	var go = new GameObject( "One shot audio" );
	go.transform.position = position;
	var source : AudioSource = go.AddComponent( AudioSource );
	source.rolloffMode = AudioRolloffMode.Logarithmic;
	source.clip = clip;
	source.volume = volume;
	source.Play();
	Destroy( go, clip.length );
	return source;
}

private function EndGame()
{
	var animationController : AnimationController = GetComponent( AnimationController );
	var prefab : GameObject = Instantiate(guiMessage);
	var endMessage : GUIText = prefab.GetComponent( GUIText );

	if(deposited >= winScore)
	{
		//Player wins
		endMessage.text = "You win!";
		PlayAudioClip( winSound, Vector3.zero, 1.0 );
		animationController.animationTarget.Play( "WIN" );
	}
	else
	{
		//Player loses
		endMessage.text = "Oh no...You lose!";
		PlayAudioClip( loseSound, Vector3.zero, 1.0 );		
		animationController.animationTarget.Play( "LOSE" );		
	}
	
	// Alert other components on this GameObject that the game has ended
	SendMessage( "OnEndGame" );
	
	while( true )
	{
		// Wait for a touch before reloading the intro level
		yield WaitForFixedUpdate();
		if ( Input.touchCount > 0 && Input.GetTouch( 0 ).phase == TouchPhase.Began )
			break;
	}
	
	Application.LoadLevel( 0 );
}

public function Pickup( pickup : ParticlePickup )
{
	if ( carrying < carryLimit )
	{
	 	carrying++;
		UpdateCarryingGui();	 	
		
		// We don't want a voice played for every pickup as this would be annoying.
		// Only allow a voice to play with a random percentage of chance and only
		// after a minimum time has passed.
		var minTimeBetweenPlays = 5;
		if ( Random.value < 0.1 && Time.time > ( minTimeBetweenPlays + timeSinceLastPlay ) )
		{
			PlayAudioClip( collectSounds[ Random.Range( 0, collectSounds.length ) ], Vector3.zero, 0.25 );
			timeSinceLastPlay = Time.time;
		}
		
	 	pickup.Collected();	
		PlayAudioClip( pickupSound, pickup.transform.position, 1.0 );
	}
	else
	{
		var warning : GameObject = Instantiate( guiMessage );
		warning.guiText.text = "You can't carry any more";
		Destroy(warning, 2);
	}
	
	// Show the player where to deposit the orbs
 	if ( carrying >= carryLimit )
		pickup.emitter.SendMessage( "ActivateDepository" );	 	
}

public function Deposit()
{
	deposited += carrying;
	carrying = 0;
	UpdateCarryingGui();
 	UpdateDepositedGui();
	PlayAudioClip( depositSound, transform.position, 1.0 ); 	
}

public function TimeRemaining() : String
{
	var remaining : int = timeLeft;
	var val : String;
	if(remaining > 59) // Insert # of minutes
	 val+= remaining / 60 + ".";
	
	if(remaining >= 0) // Add # of seconds
	{
		var seconds : String = (remaining % 60).ToString();
		if(seconds.length  < 2)
			val += "0" + seconds; // insert leading 0
		else
			val += seconds;
	}
		
	return val;
}