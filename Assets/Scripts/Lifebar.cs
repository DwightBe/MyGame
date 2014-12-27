using UnityEngine;
using System.Collections;

public class Lifebar : MonoBehaviour 
{
	public float health = 100f;					// The player's health.
	public float damageAmount = 10f;			// The amount of damage to take when enemies touch the player
	public float count = 0f;
	
	private SpriteRenderer healthBar;			// Reference to the sprite renderer of the health bar.
	private Vector3 healthScale;				// The local scale of the health bar initially (with full health)
	private GrandmaMovement grandma;

	void Start (){


	}

	void Awake ()
	{
		healthBar = GameObject.Find("HealthBar").GetComponent<SpriteRenderer>();
		grandma = GameObject.Find("Grandma").GetComponent<GrandmaMovement>();
		
		// Getting the intial scale of the healthbar (whilst the player has full health).
		healthScale = healthBar.transform.localScale;
		
	}
	
	// Update is called once per frame
	void Update () {

		if (!grandma.myTarget) {
						if (health > 0f) {
								health -= 0.05f;
								UpdateHealthBar ();
						}
				}
	
	}

	public void UpdateHealthBar ()
	{
		// Set the health bar's colour to proportion of the way between green and red based on the player's health.
		healthBar.material.color = Color.Lerp(Color.green, Color.red, 1 - health * 0.01f);
		
		// Set the scale of the health bar to be proportional to the player's health.
		healthBar.transform.localScale = new Vector3(healthScale.x * health * 0.01f, 1, 1);
	}

}
