// JavaScript Document

//page vars

//create Array of Question Objects
var QuestionsArr = new Array();

//current Questions
var currentQuestion = 0;

var correct = false;
var incorrect = false;

var currentSlideId = "Title";

function initQuestions(){
	//Get questions from xml file
	
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.open("GET","questions.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	
	questions = xmlDoc.getElementsByTagName("QuestionItem");
	
	
	
	//loop through xml and create html content and javascript arrays of questions
	
	for (var i = 0; i < questions.length; i++) {
		
		//Create Questions Object
		questionObj = new Object();
		
		//add id to question object
		questionObj.id = i;
		
		//get question text
		var questionText = questions[i].getElementsByTagName("Question")[0].childNodes[0].nodeValue;
		
		//add question text to question Object
		questionObj.questionText = questionText;
		
		//get question Anwsers
		var AnwserObjects = questions[i].getElementsByTagName("Anwsers");
		
		//create array of question Anwsers
		var anwsersArr = new Array();
		
		for(var x = 0; x < AnwserObjects.length; x++){
			
			var Anwsers = AnwserObjects[x].getElementsByTagName("Anwser");
			
			for(var y = 0; y < Anwsers.length; y++){
				
				//get anwser option id
				var Anwser = Anwsers[y].childNodes[0].nodeValue;
				
				//add anwser option id to anwser array
				anwsersArr.push(Anwser);
				
				//alert("Anwser " + y + ": " + Anwser);
			}
		}
		
		//create html content for question slide
		var questionSlide = "<div class='slide' id='slide" + i + "'><p class='question'>" + questionText + "</p><form><ul class='optionsList' >";
		
		//get the question options
		var OptionsObjects = questions[i].getElementsByTagName("Options");
		
		for(var x = 0; x < OptionsObjects.length; x++){
			
			var Options = OptionsObjects[x].getElementsByTagName("Option");
			
			for(var y = 0; y < Options.length; y++){
				
				//question option text
				var OptionText = Options[y].childNodes[0].nodeValue;
				
				//question option id
				var OptionId = Options[y].getAttribute("id");
				//alert("option " + y + ": " + Option  + " id: " + OptionId);
				
				//set form type
				if(anwsersArr.length > 1){
					var type = "checkbox";
				}else{
					var type = "radio";
				}
				
				//add option to question html slide
				questionSlide = questionSlide + "<li class='optionItem' ><div class='optionDiv'><div class='formInput'> <input type='" + type + "' name='" + i + "' value='" + OptionId + "' ></div><div class='formText' >" + OptionText + "</div></div></li>";
			}
			
			
			//add js for question anwser elements
			if(type == "checkbox"){
				
				//get number of anwsers needed
				var answerLen = anwsersArr.length;
				
				questionSlide = questionSlide + "<scr" + "ipt type='text/javascript' >$('input[type=checkbox][name=" + i + "]').click(function() { var bol = $('input[type=checkbox][name=" + i + "]:checked').length >=" + answerLen + ";if(bol){checkCheckboxesCorrect(" + i + ");}$('input[type=checkbox][name=" + i + "]').not(':checked').attr('disabled',bol);});</sc" + "ript>";
			}else if(type == "radio"){
				questionSlide = questionSlide + "<scr" + "ipt type='text/javascript' >$('input[type=radio][name=" + i + "]').click(function() { checkRadioCorrect(" + i + "); });</sc" + "ript>";
			}
			
		}
		
		//close html elements on html question slide
		questionSlide = questionSlide + '</ul></form><div id="answer' + i + '" class="answerDiv"></div><div class="backDiv" ><a href="#"  class="backButton" onClick="backButton();return false;" >Back</a></div></div>';
		
		//add question slide to div of questions
		$('#QuestionsSlides').append(questionSlide);
		
		
		
		//add anwser array to question object
		questionObj.anwsers = anwsersArr;
		
		//add question object to questions array
		QuestionsArr.push(questionObj);
	}
	
	//Debug
	//console.log(QuestionsArr);
}

//Function to check checkboxes ticked match correct anwsers
function checkCheckboxesCorrect(questionId){
	
	//get the question object by id
	var result = $.grep(QuestionsArr, function(e){ return e.id == questionId; });
	
	//get array of question anwsers
	var arrAnwsers = result[0].anwsers;
	
	//get an array of checkbox values
	var checkboxVals = [];
	$('input[type=checkbox][name= ' + questionId + ' ]:checked').each(function() {
		checkboxVals.push($(this).val());
	});
	
	//compare checkbox values with anwser values
	if( $(arrAnwsers).not(checkboxVals).length == 0 && $(checkboxVals).not(arrAnwsers).length == 0){
		//console.log("arrays the same");
		correctAnwser(questionId);
	}else{
		//console.log("arrays are different");
		incorrectAnwser(questionId);
	}
}

//Function to check radio ticked match correct anwser
function checkRadioCorrect(questionId){
	
	//get the question object by id
	var result = $.grep(QuestionsArr, function(e){ return e.id == questionId; });
	
	//get array of question anwsers
	var arrAnwsers = result[0].anwsers;
	
	//get value of radio button selected and put in array
	var radioVal = $("input:radio[name='" + questionId + "']:checked").val();
	
	var radiosVals = [];
	
	radiosVals.push(radioVal);
	
	//compare checkbox values with anwser values
	if( $(arrAnwsers).not(radiosVals).length == 0 && $(radiosVals).not(arrAnwsers).length == 0){
		//console.log("arrays the same");
		correctAnwser(questionId);
	}else{
		//console.log("arrays are different");
		incorrectAnwser(questionId);
	}
}

//current question anwsered correctly... do actions
function correctAnwser(questionId){
	
	//console.log(incorrect);
	//console.log(correct);
	
	$('#incorrectDiv').remove();
	
	
	if(!correct){
		var correctDivHtml = ' <div id="correctDiv"><div class="nextCorrect"><a href="#"  class="nextButton" onClick="next();return false;" >Next</a></div><div class="correctTick"><img src="images/tick.png" alt="correct" width="49" height="41" /><span class="correct">Correct</span></div></div>';
		
		//add correct to end of question slide
		$('#answer' + questionId + '').append(correctDivHtml);
	}
	
	correct = true;
	incorrect = false;
}

//current question anwsered correctly... do actions
function incorrectAnwser(questionId){
	
	//console.log(incorrect);
	//console.log(correct);
	
	$('#correctDiv').remove();
	
	
	if(!incorrect){
		var incorrectDivHtml = ' <div id="incorrectDiv"><img src="images/cross.png" alt="incorrect" width="46" height="41" /><span class="incorrect">Incorrect</span></div>' ;
		
		//add correct to end of question slide
		$('#answer' + questionId + '').append(incorrectDivHtml);
	}
	
	correct = false;
	incorrect = true;
}

function next(){ 

	//reset slides and values
	correct = false;
	incorrect = false;
	
	
	if(currentSlideId == 'Title'){
		//hide title slide
		$('#startSlide').fadeOut('slow', function() {
			
			$('#correctDiv').remove();
			$('#incorrectDiv').remove();
			//show 1st question
			$('#slide0').fadeIn('slow');
			
			currentSlideId = 0;
		});
		
		

	}else{
		
		//get last question id
		var lastQuestionObj = QuestionsArr[QuestionsArr.length - 1];
		
		var lastQuestionId = lastQuestionObj.id;
		
		
		//hide current question slide
		$('#slide' + currentSlideId + '').fadeOut('slow', function() {
		   
		   $('#correctDiv').remove();
			$('#incorrectDiv').remove();
		   //if last question show end slide
			if(lastQuestionId == currentSlideId){
				
				//show end slide
				$('#finalSlide').fadeIn('slow');
				
			}else{
				
				currentSlideId++;
				
				//show next question
				$('#slide' + currentSlideId + '').fadeIn('slow');
			
			}
	  	});
		
		
	}
}


function backButton(){ 

	//reset slides and values
	correct = false;
	incorrect = false;
	
	
	
	
	//hide current question slide
	$('#slide' + currentSlideId + '').fadeOut('slow', function() {
	   
	   $('#correctDiv').remove();
		$('#incorrectDiv').remove();
		currentSlideId = currentSlideId - 1;
		
		if(currentSlideId < 0){
			currentSlideId = 'Title';
			//hide title slide
			$('#startSlide').fadeIn('slow');
		}else{
			//show next question
			$('#slide' + currentSlideId + '').fadeIn('slow');
		}
		
		resetForm($('#questionsForm'));
		
	});
}
	
function finish(){ 

	//hide title slide
	$('#finalSlide').fadeOut('slow', function() {
		//show 1st question
		$('#endSlide').fadeIn('slow');
	});

	
}

function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
}
	
