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


var titre_error = document.getElementById('titre_error');
var auteur_error = document.getElementById('auteur_error');
var prix_error = document.getElementById('prix_error');
var pub_error = document.getElementById('pub_error');
var email_error = document.getElementById('email_error');
var langue_error = document.getElementById('langue_error');
var type_error = document.getElementById('type_error');
var ty = document.querySelectorAll('input[name="fav"]');
var lstOuvrage = []; /*Declaration du table vide en javascript*/
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
}
var listBooks = [];
            var list_temp = "";
            list_temp = JSON.parse(localStorage.getItem("list"));

            if (list_temp != null){

                for(i=0;i<list_temp.length;i++){
                    var bookInfo = new Ouvrage(list_temp[i].titre, list_temp[i].auteur, list_temp[i].email, list_temp[i].prix, list_temp[i].date, list_temp[i].language, list_temp[i].type)
                    listBooks.push(bookInfo);
                }
            }
			
		var table = document.getElementsByTagName("table")[0];	
		var checkedType = document.querySelector('input[name="fav"]:checked')
		function ajouter(){
			for(var i=0; i<listBooks.length; i++) {
				var row=table.insertRow(-1);
				row.insertCell(0).innerHTML = titre.value;
				row.insertCell(1).innerHTML = auteur.value;
				row.insertCell(2).innerHTML = Prix.value;
				row.insertCell(3).innerHTML = date.value;
				row.insertCell(4).innerHTML = email.value;
				row.insertCell(5).innerHTML = language.options[language.selectedIndex].value;
				row.insertCell(6).innerHTML = checkedType.value;
				row.insertCell(7).innerHTML = '<input  style="width:60px ; 	background-color: #684c3ec0" type="submit" onclick="deleterow(this)" value="Supprimer">'+
				'<input  style="width:60px ;background-color: #684c3ec0" type="submit" onclick="editrow(this)" id="btn" value="Modifier">'
			}
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
		// var table = document.getElementsByTagName("table")[0];

		var checkedType = document.querySelector('input[name="fav"]:checked');

		var ouvrage = new Ouvrage(titre.value,auteur.value,Prix.value, date.value, email.value, language.value, checkedType.value);
		listBooks.push(ouvrage);/*Ajouter les infos de person ds la liste*/
		localStorage.setItem("list",JSON.stringify(listBooks));
		ajouter();
		// row.insertCell(0).innerHTML = titre.value;
		// row.insertCell(1).innerHTML = auteur.value;
		// row.insertCell(2).innerHTML = Prix.value;
		// row.insertCell(3).innerHTML = date.value;
		// row.insertCell(4).innerHTML = email.value;
		// row.insertCell(5).innerHTML = language.options[language.selectedIndex].value;
		// row.insertCell(6).innerHTML = checkedType.value;
		// row.insertCell(7).innerHTML = '<input  style="width:60px ; 	background-color: #684c3ec0" type="submit" onclick="deleterow(this)" value="Supprimer">'+
		// '<input  style="width:60px ;background-color: #684c3ec0" type="submit" onclick="editrow(this)" id="btn" value="Modifier">'
		
		// clear input text
		titre.value = "";
		auteur.value = "";
		Prix.value = "";
		date.value = "";
		email.value = "";
		language.value = "select a language";

		// for (var i=0; i<ty.length;i++){
		// 	if(ty[i].checked){
		// 		row.insertCell(6).innerHTML = ty[i].value;
		// 		break;
		// 	}
		// }



	 // call the function to set the event to the new row
	 selectedRowToInput();

}

  // display selected row data into input text
  function selectedRowToInput()
  {

	  for(var i = 1; i < table.rows.length; i++)
	  {
		  table.rows[i].onclick = function()
		  {
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
	  var i =r.parentElement.parentElement.rowIndex;
	  var R=document.getElementsByTagName("table")[0].rows[i];
	 R.cells[0].innerHTML=document.getElementById("titre").value;
	 R.cells[1].innerHTML=document.getElementById("auteur").value;
	 R.cells[2].innerHTML=document.getElementById("Prix").value;
	 R.cells[3].innerHTML=document.getElementById("date").value;
	 R.cells[4].innerHTML=document.getElementById("email").value;
	 R.cells[5].innerHTML=document.getElementById("language").value;
  }


//  delete button

function deleterow(r) 

{
    if (confirm('Are you sure to delete this record ?')) {
        row = r.parentElement.parentElement;
        document.getElementById("table").deleteRow(row.rowIndex);    
    }
}

form.addEventListener('submit',  valider);