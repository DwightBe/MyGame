using UnityEngine;
using System.Collections;

public class Cutscene : MonoBehaviour {

	private Animator playeranim;			
	private Transform playertransform;

	// Use this for initialization
	void Awake () {
		playeranim = GameObject.Find("Grandma").GetComponent<Animator>();
		playertransform = GameObject.Find("Grandma").GetComponent<Transform>();
	
	}

	void Start () {
		GameObject.Find("Grandma").GetComponent<PlayerMovement>().enabled = false;
		StartCoroutine("OpeningScene");
		
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	IEnumerator OpeningScene ()
	{

		playeranim.SetFloat("Speed", 1);
		var delay = 4.0f;

		for (var time = delay; time > 0f; time -= Time.deltaTime)
		{		
			playertransform.position = Vector3.Lerp(new Vector3 (0,0,0), new Vector3(-3,0,0), time / delay);				
			yield return null;
		}
		playeranim.SetFloat("Speed", 0);
		yield return new WaitForSeconds(2);
		GameObject.Find("Grandma").GetComponent<PlayerMovement>().enabled = true;


		
	}
}
