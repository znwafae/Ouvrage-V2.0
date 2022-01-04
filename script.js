var form = document.getElementById('form');
var titre = document.getElementById('titre');
var auteur = document.getElementById('auteur');
var Prix = document.getElementById('Prix');
var date = document.getElementById('date');
var language = document.getElementById('language');
var email = document.getElementById('email');
var roman = document.getElementById('Roman');
var essai = document.getElementById('Essai');
var bande = document.getElementById('Bande');
var demo = document.getElementById('demo')

var titre_error = document.getElementById('titre_error');
var auteur_error = document.getElementById('auteur_error');
var prix_error = document.getElementById('prix_error');
var pub_error = document.getElementById('pub_error');
var email_error = document.getElementById('email_error');
var langue_error = document.getElementById('langue_error');
var type_error = document.getElementById('type_error');
var ty = document.querySelectorAll('input[name="fav"]');
var table = document.getElementsByTagName("table")[0];
var tbody = document.getElementById("tbody");	
var tabl = document.getElementById("tabl")

var listBooks = []; /*Declaration du table vide en javascript*/
var i = 0;

class Ouvrage{
	constructor(Titre, Auteur,Prix,Date,Email,Language,Type){
		this.titre = Titre;
		this.auteur = Auteur;
		this.prix = Prix;
		this.date = Date;
		this.email = Email;
		this.language = Language;
		this.type = Type;
	}

	bookDetail() {
		return " L'ouvrage "+this.titre + " est un " +this.type+"  en langue "+this.language+ " , écrit par "+this.auteur+" et publié le "+this.date+" . Le prix de "+this.titre+" est de  "+this.prix+" Dhs. "
	}
}
        var listOvrage=JSON.parse(localStorage.getItem("lstOuvrage"));
        if(listOvrage!=null){
            for(i=0;i<listOvrage.length;i++){
                var ouvrage = new Ouvrage(listOvrage[i].titre,listOvrage[i].auteur,listOvrage[i].prix,listOvrage[i].date,listOvrage[i].email,listOvrage[i].language,listOvrage[i].type);
                listBooks.push(ouvrage);
            }
        }
			
function ajouter(){
	for(var i=0; i<listBooks.length; i++) {
		var row=tbody.insertRow(-1);
		row.insertCell(0).innerHTML = listBooks[i].titre;
		row.insertCell(1).innerHTML = listBooks[i].auteur;
		row.insertCell(2).innerHTML = listBooks[i].prix;
		row.insertCell(3).innerHTML = listBooks[i].date;
		row.insertCell(4).innerHTML = listBooks[i].email;
		row.insertCell(5).innerHTML = listBooks[i].language;
		row.insertCell(6).innerHTML = listBooks[i].type;
		row.insertCell(7).innerHTML = '<input  style="width:60px ; 	background-color: #684c3ec0" type="submit" onclick="deleteRow(this)" value="Supprimer">'+
		'<input  style="width:60px ;background-color: #684c3ec0" type="submit" onclick="editrow(this)" id="btn" value="Modifier">'
	}
		// clear input text
		titre.value = "";
		auteur.value = "";
		Prix.value = "";
		date.value = "";
		email.value = "";
		language.value = "select a language";
}
ajouter()
	
function valider(event){

	event.preventDefault();
 
		//   titre value
		if(titre.value==""){
			titre_error.innerHTML = "nope!";
			titre_error.style.color="red";
			titre.style.borderColor = "red";
		}
		else if(titre.value.length>30){
			titre_error.innerHTML = "max 30";
			titre_error.style.color="red";
			titre.style.borderColor = "red";
		}

		//   auteur value

		if(auteur.value==""){
			auteur_error.innerHTML = "nope!";
			auteur_error.style.color="red";
			auteur.style.borderColor = "red";
		}
		else if(auteur.value.length>30){
			auteur_error.innerHTML = "max 30";
			auteur_error.style.color="red";
			auteur.style.borderColor = "red";
		}
		else if(!isNaN(auteur.value)){ //isNaN = is not a number
			auteur_error.innerHTML = "!!";
			auteur_error.style.color="red";
			auteur.style.borderColor = "red";
		}

		// prix value
		
		if(Prix.value!==""){
			if(!isNaN(Prix.value))
			{
				if(Prix.value>0)
				{
				prix_error.innerHTML = "";
				}
				else{
				prix_error.innerHTML = "nigatif!";
				prix_error.style.color="red";
				Prix.style.borderColor = "red";
				}
			}
			else{
				prix_error.innerHTML = "is not numbre!";
				prix_error.style.color="red";
				Prix.style.borderColor = "red";
				}
		}
		else{
			prix_error.innerHTML = "nope!";
			prix_error.style.color="red";
			Prix.style.borderColor = "red";
		}
			
		//  pub value

		if(date.value==""){
			pub_error.innerHTML = "nope!";
			pub_error.style.color="red";
			date.style.borderColor = "red";
		}

		// type value

		if(!(roman.checked || essai.checked || bande.checked)){
			type_error.innerHTML = "nope!";
			type_error.style.color="red";
		}
		else{type_error.innerHTML = "";}


		// langue value
		
		if(language.value=="select a language"){
			langue_error.innerHTML = "nope!";
			langue_error.style.color="red";
			language.style.borderColor = "red";
		}

		// email value

		var regxEmail = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
		if (email.value !="")
		if (regxEmail.test(email.value)){
			email_error.innerHTML=""
		}
		else{
			email_error.innerHTML="not email"
			email_error.style.color="red"
			email.style.borderColor = "red"
		}

		else{
			email_error.innerHTML="nope!"
			email_error.style.color='red'
			email.style.borderColor = "red"
		}

    //  add rows to teble

		var checkedType = document.querySelector('input[name="fav"]:checked').value;
		var ouvrage = new Ouvrage(titre.value,auteur.value,Prix.value, date.value, email.value, language.value, checkedType);
		demo.innerHTML = ouvrage.bookDetail()
		//  " L'ouvrage "+this.titre + " est un " +this.type+"  en langue "+this.language+ " , écrit par "+this.auteur+" et publié le "+this.date+" . Le prix de "+this.titre+" est de  "+this.prix+" Dhs. "
		listBooks.push(ouvrage);/*Ajouter les infos de person ds la liste*/
		trie();
		localStorage.setItem("lstOuvrage",JSON.stringify(listBooks));
		tbody.innerHTML="";
		ajouter();
	    selectedRowToInput();

}
// TRIE
   function trie(){
	listBooks.sort(function(a,b){
			if(a.titre.toUpperCase() < b.titre.toUpperCase())
			{
				return -1;
			}
			});
}

  // display selected row data into input text
   function selectedRowToInput(){
		for(var i = 1; i < table.rows.length; i++){
			table.rows[i].onclick = function(){
				// get the seected row index
				rIndex = this.rowIndex;
				document.getElementById("titre").value = this.cells[0].innerHTML;
				document.getElementById("auteur").value = this.cells[1].innerHTML;
				document.getElementById("Prix").value = this.cells[2].innerHTML;
				document.getElementById("date").value = this.cells[3].innerHTML;
				document.getElementById("email").value = this.cells[4].innerHTML;
				document.getElementById("language").value = this.cells[5].innerHTML;
			};
		}
		document.getElementById("btn").innerHTML="Submit";
		}
		selectedRowToInput();


   function editrow(r)
	{
		var i =r.parentElement.parentElement.rowIndex-1;
		var R=document.getElementsByTagName("table")[0].rows[i];
		listBooks[i].titre=document.getElementById("titre").value;
		listBooks[i].auteur=document.getElementById("auteur").value;
		listBooks[i].prix=document.getElementById("Prix").value;
		listBooks[i].date=document.getElementById("date").value;
		listBooks[i].email=document.getElementById("email").value;
		listBooks[i].language=document.getElementById("language").value;
		tbody.innerHTML = "";
		ajouter();
		localStorage.setItem("lstOuvrage",JSON.stringify(listBooks));
		titre.value = ""
	}


//  delete button
function deleteRow(r) {
	if(confirm('Are you sure to delete this record ?')){
		var i = r.parentNode.parentNode.rowIndex-1;
		listBooks.splice(i,1);
	localStorage.setItem("lstOuvrage",JSON.stringify(listBooks));
		tbody.innerHTML="";
		ajouter();
	}
}
function imprimer(){
	var intable = tabl.innerHTML
	var inbody = document.body.innerHTML;
	document.body.innerHTML = intable;
	window.print()
	document.body.innerHTML = inbody;
}
form.addEventListener('submit',  valider);