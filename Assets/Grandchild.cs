using UnityEngine;
using System.Collections;

public class Grandchild : MonoBehaviour {

	public float moveSpeed = 2f;		// The speed the enemy moves at.
	
	void Awake()
	{

	}

	void FixedUpdate ()
	{
		rigidbody2D.velocity = new Vector2(transform.localScale.x * moveSpeed, rigidbody2D.velocity.y);	
	}

	// Update is called once per frame
	void Update () {
	
	}
}
