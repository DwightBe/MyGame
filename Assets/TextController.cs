using UnityEngine;
using System.Collections;

public class TextController : MonoBehaviour {

	private GUIText text;

	// Use this for initialization
	void Start () {
		text = GetComponent<GUIText>();

		StartCoroutine("OpeningScene");

	
	}

	IEnumerator OpeningScene ()
	{

		yield return new WaitForSeconds(2);
		text.text = "Poor thing";
		yield return new WaitForSeconds(2);
		text.text = "Oh... Detective";
		yield return new WaitForSeconds(3);
		text.text = "Who called you here?";
		yield return new WaitForSeconds(3);
		text.text = "No need to get involved";
		yield return new WaitForSeconds(3);
		text.text = "I've got this all under control";
		yield return new WaitForSeconds(5);
		text.text = "I mean it... Why are you still here?";
		yield return new WaitForSeconds(10);
		text.text = "asshole....";




	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
