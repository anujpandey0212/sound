var width,height;
var canvas,cxt;
var leftOut,leftIn,topOut,topIn,canvasLeft,canvasTop;
var amp = new Array(11);
var pX = new Array(11);
var pY = new Array(11);
var har = new Array(11);
var slider = new Array(11);
var hear = new Array(11);
var fund=294;

window.onload = function(){
canvas = document.getElementById("timbre");

	
if (canvas && canvas.getContext){

leftOut = parseInt(canvas.style.left)+parseInt(canvas.style.marginLeft);
leftIn = parseInt(canvas.style.borderLeftWidth)+parseInt(canvas.style.paddingLeft);
topOut = parseInt(canvas.style.top)+parseInt(canvas.style.marginTop);
topIn = parseInt(canvas.style.borderTopWidth)+parseInt(canvas.style.paddingLeft);
canvasLeft = leftOut+leftIn;
canvasTop = topOut+topIn;

   for (var i = 0; i < 11; i++){    
	   hear[i] = document.getElementById("Play"+String(i));
    }

//------------------------	

	cxt = canvas.getContext("2d");
	cxt.font = '12pt Arial,Helvetica,"Times New Roman","Noto Sans Condensed","DejaVu Sans Condensed",sans-serif';
	width = canvas.width;
	height = canvas.height;
    cxt.textBaseline = "top";
	amp[0]=0;amp[1]=1;amp[2]=0.38;amp[3]=0.06;amp[4]=0.2;amp[5]=0.15;amp[6]=0.1;
	amp[7]=0.06;amp[8]=0.05;amp[9]=0.02;amp[10]=0.01;
	
	
	pX[1]=0;pY[1]=0;	pX[2]=300;pY[2]=0;
	pX[3]=0;pY[3]=200;  pX[4]=300;pY[4]=200;  
	pX[5]=0;pY[5]=400;  pX[6]=300;pY[6]=400;  
	pX[7]=0;pY[7]=600;	pX[8]=300;pY[8]=600;  
	pX[9]=0;pY[9]=800;	pX[10]=300;pY[10]=800;
   
   defineHar();
	

     for (var i = 2; i < 11; i++){
         slider[i] = new Scrollbar(pX[i]+130,pY[i]+170,150,30,0,50,amp[i]*100,"#088A08");	
	 }
  	
	 hear[0].style.left = String(990+canvasLeft)+"px";
	 hear[0].style.top = String(150+canvasTop)+"px";
	 
	for (var i = 1; i < 11; i++){
	
      hear[i].style.left = String(pX[i]+15+canvasLeft)+"px";
	  hear[i].style.top = String(pY[i]+170+canvasTop)+"px";	
	
	} 
	fundamentalFreq.style.left = String(50+canvasLeft)+"px";
	fundamentalFreq.style.top = String(-25+canvasTop)+"px";
	
	paint();
	
	
  }
}

function defineHar(){
    var Sfund=String(fund);
    har[1]="fundamental ("+Sfund+" Hz)";
	har[2]="1st overtone (2 × "+Sfund+" Hz)";
	har[3]="2nd overtone (3 × "+Sfund+" Hz)";
	har[4]="3rd overtone (4 × "+Sfund+" Hz)";
	har[5]="4th overtone (5 × "+Sfund+" Hz)";
	har[6]="5th overtone (6 × "+Sfund+" Hz)";	
	har[7]="6th overtone (7 × "+Sfund+" Hz)";
	har[8]="7th overtone (8 × "+Sfund+" Hz)";
	har[9]="8th overtone (9 × "+Sfund+" Hz)";
	har[10]="9th overtone (10 × "+Sfund+" Hz)";
}

function playH(n){
     for (var i=0;i<11; i++){ 
		hear[i].disabled=true;		
	  }
	   
	try {
			var context = new AudioContext();
			var oscill = context.createOscillator();
			var vol = context.createGain();
	}
	catch(err) {
		cxt.fillStyle ="gray";
		cxt.fillRect(0,250,width,100);
		cxt.font = '20pt Arial,Helvetica,"Times New Roman","Noto Sans Condensed","DejaVu Sans Condensed",sans-serif';
		cxt.fillStyle="yellow";
		cxt.textAlign = "left";
		cxt.fillText("Sorry! your browser does not support this applet.", 320,300);
	}	
	
	oscill.type = "sine";	
    oscill.frequency.value = n*fund;
    vol.gain.value = amp[n];
    oscill.connect(vol); 
	vol.connect(context.destination)
	oscill.start(context.currentTime +0);
	oscill.stop(context.currentTime+1); 
	oscill.onended = function(){
      for (var i=0;i<11; i++){ 
		hear[i].disabled=false;		
	   }
		context.close();
	};	
}


function playW(){

     for (var i=0;i<11; i++){ 
		hear[i].disabled=true;		
	  }
	  
    var numCoeffs = 11; 
    var realCoeffs = new Float32Array(numCoeffs);
    var imagCoeffs = new Float32Array(numCoeffs);

	imagCoeffs[0]=0;
	for (var i =0; i < numCoeffs; i++){
	   realCoeffs[i]=0;	   
    	}
	
	for (var i = 1; i < numCoeffs; i++){
	   imagCoeffs[i]=amp[i]; 
	} 

	try {
		var context = new AudioContext();
		var osc = context.createOscillator();
		var wave = context.createPeriodicWave(realCoeffs, imagCoeffs,{disableNormalization: false});
	}
	catch(err) {
		cxt.fillStyle ="gray";
		cxt.fillRect(0,250,width,100);
		cxt.font = '20pt Arial,Helvetica,"Times New Roman","Noto Sans Condensed","DejaVu Sans Condensed",sans-serif';
		cxt.fillStyle="yellow";
		cxt.textAlign = "left";
		cxt.fillText("Sorry! your browser does not support this applet.", 320,300);
	}

	osc.setPeriodicWave(wave);
    osc.frequency.value = fund;
    osc.connect(context.destination);
	osc.start(context.currentTime+0);
    osc.stop(context.currentTime+1);
	
	osc.onended = function(){
     for (var i=0;i<11; i++){ 
		hear[i].disabled=false;		
	   }
		context.close();
	};
}


function paint(){
 	cxt.fillStyle ="rgb(233,222,222)";
	cxt.fillRect(0,0,width,height);
	cxt.fill();
	
	  for (var i = 1 ; i < 11; i++){
		plotGraph(pX[i],pY[i],i,amp[i],har[i]);
	  }

	plotResultant(650,100);
	relativeStrength();
}


 function plotGraph(xx,yy,n,amp,harmonic){
    cxt.beginPath();
	cxt.fillStyle="#EFF8FB";
	cxt.fillRect(xx+10,yy+5,290,190);
	cxt.fill();
	
	cxt.strokeStyle="black";
	cxt.lineWidth="1";
	cxt.fillStyle="black";
	
	cxt.beginPath();
	cxt.moveTo(xx+50,yy+100);
	cxt.lineTo(xx+260,yy+100);
	cxt.stroke();
    cxt.beginPath();
	cxt.moveTo(xx+260-5,yy+100-3);
	cxt.lineTo(xx+260,yy+100);
	cxt.lineTo(xx+260-5,yy+100+3);
	cxt.stroke();
	cxt.font = '10pt Arial,Helvetica,"Times New Roman","Noto Sans Condensed","DejaVu Sans Condensed",sans-serif';
	cxt.textAlign = "right";
	cxt.fillText("time",xx+280,yy+100-20);
	cxt.fillText(harmonic,xx+270,yy+30);
	
	cxt.strokeStyle="blue";
	cxt.lineWidth="2";
	cxt.beginPath();	
	cxt.moveTo(xx+50,yy+100); 	
	for (var i=1;i<201;i++){
	  var yValue=90.0*amp*Math.sin(i*Math.PI*n/100.0);
	     cxt.lineTo(xx+50+i,yy+100-yValue); 	
	}
	cxt.stroke();
	

 } 

  function plotResultant(xx,yy){
    cxt.beginPath();
	cxt.fillStyle="rgb(228,211,211)";
	cxt.fillRect(xx,yy-95,538,1000);
	cxt.fill();
  
	cxt.strokeStyle="black";
	cxt.lineWidth="1";
	cxt.fillStyle="black";
	
	cxt.beginPath();
	cxt.moveTo(xx+50,yy+300);
	cxt.lineTo(xx+460,yy+300);
	cxt.stroke();
    cxt.beginPath();
	cxt.moveTo(xx+460-5,yy+300-3);
	cxt.lineTo(xx+460,yy+300);
	cxt.lineTo(xx+460-5,yy+300+3);
	cxt.stroke();
    cxt.font = '14pt Arial,Helvetica,"Times New Roman","Noto Sans Condensed","DejaVu Sans Condensed",sans-serif';
	cxt.textAlign = "left";
	cxt.fillText("time",xx+450,yy+300-25);
	cxt.fillText("Resultant Waveform",xx+300,yy+10);  
	
    cxt.strokeStyle="red";
	cxt.lineWidth="2";
	cxt.beginPath();	
	cxt.moveTo(xx+50,yy+300); 	
	for (var i=1;i<401;i++){
	      var yValue=0.0;
	   for (j = 1; j <11;j++){
	      yValue+=130.0*amp[j]*Math.sin(i*Math.PI*j/200.0);
	  }
	     cxt.lineTo(xx+50+i,yy+300-yValue); 	
	}
	cxt.stroke();	
  
  }

function relativeStrength(){
cxt.beginPath();
cxt.fillStyle="black";
cxt.textAlign = "right";
cxt.font = '10pt Arial,Helvetica,"Times New Roman","Noto Sans Condensed","DejaVu Sans Condensed",sans-serif';

for (var i = 1; i <11; i++){
   cxt.fillText(har[i],830,650+i*30);
   cxt.fillRect(850,650+i*30,amp[i]*300,20)
}
   cxt.fillText("Relative Amplitudes",1050,650);
}


function actionWhenSliderIsChanging(){
 for (var i=2;i<11;i++){
    if (slider[i].isChanging){
	   	amp[i] = slider[i].value()/100;
        break;		
	}
 }
 paint();
}

function fundFreq(){
 var sV = fundamentalFreq.selectedIndex;
	if (sV == 1){fund=262;}
	else if (sV == 2){fund=294;}
	else if (sV == 3){fund=329;}	
	else if (sV == 4){fund=349;}
	else if (sV == 5){fund=392;}	
	defineHar();
	fundamentalFreq.selectedIndex = "0";	
	paint();
}
