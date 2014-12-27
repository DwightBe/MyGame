using UnityEngine;
using System.Collections;

public class Spawner2 : MonoBehaviour {
	public float spawnTime = 1f;		// The amount of time between each spawn.
	public float spawnDelay = 3f;		// The amount of time before spawning starts.
	public GameObject[] enemies;		// Array of enemy prefabs.

	// Use this for initialization
	void Start () {

		InvokeRepeating("Spawn", spawnDelay, spawnTime);
	
	}
	void Spawn ()
	{
		// Instantiate a random enemy.
		int enemyIndex = Random.Range(0, enemies.Length);
		Instantiate(enemies[enemyIndex], transform.position, transform.rotation);
	
	}
}
