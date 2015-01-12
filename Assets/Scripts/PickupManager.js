//////////////////////////////////////////////////////////////
// PickupManager.js
// Penelope iPhone Tutorial
//
// PickupManager handles positioning the pickup particles.
// The PickupManager uses the children of its GameObject as
// the spawn locations for the pickups in game. It randomly
// selects a child, and then places a particle on top of it.
//////////////////////////////////////////////////////////////

@script RequireComponent( ParticleEmitter )

var colliderPrefab : GameObject;
var depositTrigger : DepositTrigger;

// The Start function is called at the beginning of the level,
// and is where the placing of the particles is handedled.
function Start()
{
	var emitter = particleEmitter;
	emitter.ClearParticles();
	emitter.Emit();
	
	var location : Vector3;
	var myParticles = emitter.particles;
	var colliderContainer = new GameObject( "ParticleColliders" );
	var toDestroy = new GameObject( "ObjectsToDestroy" );
	for(var i : int; i < emitter.particleCount; i++)
	{
		if ( transform.childCount <= 0 )
			break;
			
		var child = transform.GetChild( Random.Range( 0, transform.childCount ) );
		myParticles[i].position = child.position;
		
		// Move the particle to another parent, so it isn't selected again
		// for another orb position
		child.parent = toDestroy.transform;
		
		var prefab : GameObject = Instantiate( colliderPrefab, myParticles[i].position, Quaternion.identity );
		var pickup : ParticlePickup = prefab.GetComponent( ParticlePickup );
		pickup.emitter = emitter;
		pickup.index = i;
		
		prefab.transform.parent = colliderContainer.transform;		
	}	
	Destroy( toDestroy );
	emitter.particles = myParticles;
}

function ActivateDepository()
{
	depositTrigger.ActivateDepository();
}