using UnityEngine;
using System.Collections;

public class CreditsText : MonoBehaviour {

	private GUIText text;

	// Use this for initialization
	void Start () {
		text = GetComponent<GUIText>();
	
		StartCoroutine("OpeningScene");
	}
	
	// Update is called once per frame
	IEnumerator OpeningScene ()
	{
		yield return new WaitForSeconds(2);
		text.text = "Concept and Design   Dwight Benignus" + System.Environment.NewLine + 
			"Music                         Tyler Suder";

		yield return new WaitForSeconds(8);
		text.text = "";
	
	}
}
