//////////////////////////////////////////////////////////////
// ParticlePickup.js
// Penelope iPhone Tutorial
//
// ParticlePickup allows the colliders for the particles to keep
// a reference to the emitter, and the index of the particle
// that the collider is representing. When the player collides with
// the ParticlePickup's GameObject, the ParticlePickup passes
// itself to the player's ScoreKeeper so that the player can
// determine whether or not to pickup the item.
//////////////////////////////////////////////////////////////

var emitter : ParticleEmitter;
var index : int;
var collectedParticle : GameObject;

// OnTriggerEnter is called whenever a Collider hits this GameObject's collider
function OnTriggerEnter(other : Collider)
{
	var sk : ScoreKeeper = other.GetComponent( ScoreKeeper );
	sk.Pickup( this );
}

// Collected is called when the player picks up this item.
function Collected()
{
	// Spawn particles where the orb was collected
	Instantiate( collectedParticle, transform.position, Quaternion.identity );
	
	// Scale the particle down, so it is no longer visible
 	var particles : Particle[] = emitter.particles;	 	
 	particles[ index ].size = 0;	 	
 	emitter.particles = particles;
	
	// Destroy the collider for this orb
	Destroy( gameObject );
}