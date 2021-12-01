

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function openLeftNav() {
  document.getElementById("leftSidenav").style.width = "200px";
}

function closeLeftNav() {
  document.getElementById("leftSidenav").style.width = "0";
}


const subjects=["ds","dm","nc","os","soft","wd","dl","ae","ss","et","ad","ie","md","bd","mssm",
"emt","ht","fm","hb","cbbs","sb","bc","m","ps"]; 
  
  for (let i = 0; i < subjects.length; i++) {
    document.getElementById(subjects[i]).style.display="none";      

} 
var template=-1;
function func(id) {  
for (let i = 0; i < subjects.length; i++) {
  document.getElementById(subjects[i]).style.display="none";      
 }  

  var cs = ["none","none","none","none","none"]; 
  var d=parseInt(id);
  cs[d]="block"; 
  document.getElementById("CSE").style.display=cs[0];
  document.getElementById("ECE").style.display = cs[1];
  document.getElementById("MECH").style.display=cs[2];
  document.getElementById("BIO").style.display=cs[3];  

}
template=-1;
function funSub(id)
{
  for (let i = 0; i < subjects.length; i++) {
  document.getElementById(subjects[i]).style.display="none";      
  }    
  var d=parseInt(id);
  document.getElementById(subjects[d]).style.display="block";  
  template=d;
      

}

function langFunc(id){
let i=0;
if(template==-1)alert("Please select your subject first !!");
for (i = 0; i < subjects.length; i++) {
  if(document.getElementById(subjects[i]).style.display=="block")    
  break;  
  }     
if(id=="english")
{
    
  var doc= document.getElementById(subjects[i]).getElementsByClassName("grid-container")[0];
           
  for (let i = 0; i < doc.childNodes.length; i++) 
  {
    
   if (doc.childNodes[i].className == "grid-item eng easy"|| doc.childNodes[i].className == "grid-item eng medium"||doc.childNodes[i].className == "grid-item eng hard")         
      doc.childNodes[i].style.display="block";      
    else if (doc.childNodes[i].className == "grid-item hin easy"|| doc.childNodes[i].className == "grid-item hin medium"||doc.childNodes[i].className == "grid-item hin hard")
      doc.childNodes[i].style.display="none"; 
  }
              
}   

else if(id=="hindi")
{
  var doc= document.getElementById(subjects[i]).getElementsByClassName("grid-container")[0];             
  for (let i = 0; i < doc.childNodes.length; i++) 

    if (doc.childNodes[i].className == "grid-item hin easy"|| doc.childNodes[i].className == "grid-item hin medium"||doc.childNodes[i].className == "grid-item hin hard")       
      doc.childNodes[i].style.display="block";
    else if(doc.childNodes[i].className == "grid-item eng easy"|| doc.childNodes[i].className == "grid-item eng medium"||doc.childNodes[i].className == "grid-item eng hard") 
      doc.childNodes[i].style.display="none";       
             
           
}
else  if(id=="any"){
var doc= document.getElementById(subjects[i]).getElementsByClassName("grid-container")[0];
         
for (let i = 0; i < doc.childNodes.length; i++) 
  if (doc.childNodes[i].className == "grid-item eng easy" ||doc.childNodes[i].className == "grid-item eng medium"||doc.childNodes[i].className == "grid-item eng hard"   
  ||doc.childNodes[i].className == "grid-item hin easy"||doc.childNodes[i].className == "grid-item hin medium"||doc.childNodes[i].className == "grid-item hin hard"  )       
    doc.childNodes[i].style.display="block";
}
}



function diffFunc(id){
let i=0;

for (i = 0; i < subjects.length; i++) {
  if(document.getElementById(subjects[i]).style.display=="block")    
  break;  
  }    
if(id=="easy")
{  
  var doc= document.getElementById(subjects[i]).getElementsByClassName("grid-container")[0];
           
  for (let i = 0; i < doc.childNodes.length; i++) 
    if (doc.childNodes[i].className == "grid-item eng easy" || doc.childNodes[i].className == "grid-item hin easy")         
      doc.childNodes[i].style.display="block";      
    else if (doc.childNodes[i].className == "grid-item eng medium" || doc.childNodes[i].className == "grid-item hin medium" || 
    doc.childNodes[i].className == "grid-item eng hard" || doc.childNodes[i].className == "grid-item hin hard")
      doc.childNodes[i].style.display="none";                 
}   

else  if(id=="medium")
{
  var doc= document.getElementById(subjects[i]).getElementsByClassName("grid-container")[0];             
  for (let i = 0; i < doc.childNodes.length; i++) 
    if (doc.childNodes[i].className == "grid-item eng medium" || doc.childNodes[i].className == "grid-item hin medium")         
    doc.childNodes[i].style.display="block";      
  else if (doc.childNodes[i].className == "grid-item eng easy" || doc.childNodes[i].className == "grid-item hin easy" ||
    doc.childNodes[i].className == "grid-item eng hard" || doc.childNodes[i].className == "grid-item hin hard")
    doc.childNodes[i].style.display="none";                       
           
}
else  if(id=="hard"){
var doc= document.getElementById(subjects[i]).getElementsByClassName("grid-container")[0];
for (let i = 0; i < doc.childNodes.length; i++) 
    if (doc.childNodes[i].className == "grid-item eng hard" || doc.childNodes[i].className == "grid-item hin hard")         
    doc.childNodes[i].style.display="block";      
  else if (doc.childNodes[i].className == "grid-item eng easy" || doc.childNodes[i].className == "grid-item hin easy" ||
    doc.childNodes[i].className == "grid-item eng medium" || doc.childNodes[i].className == "grid-item hin medium")
    doc.childNodes[i].style.display="none";  
           
}

}



function searchKey()
{ 

if(document.getElementById("search").value.toLowerCase()=="english" || document.getElementById("search").value.toLowerCase()=="eng"  )
langFunc("english");
else if(document.getElementById("search").value.toLowerCase()=="hindi" || document.getElementById("search").value.toLowerCase()=="hin"  )
langFunc("hindi");
else if(document.getElementById("search").value.toLowerCase()=="easy" )
diffFunc("easy");
else if(document.getElementById("search").value.toLowerCase()=="medium")
diffFunc("medium");
else if(document.getElementById("search").value.toLowerCase()=="hard")
diffFunc("hard");
else if(document.getElementById("search").value.toLowerCase()=="any")
langFunc("any");
else if(document.getElementById("search").value.toLowerCase()=="data structures")
funSub(0);
else if(document.getElementById("search").value.toLowerCase()=="database mangement")
funSub(1);
else if(document.getElementById("search").value.toLowerCase()=="networks"||document.getElementById("search").value.toLowerCase()=="networks and communication")
funSub(2);
else if(document.getElementById("search").value.toLowerCase()=="operating systems")
funSub(3);
else if(document.getElementById("search").value.toLowerCase()=="software")
funSub(4);
else if(document.getElementById("search").value.toLowerCase()=="web development")
funSub(5);
else if(document.getElementById("search").value.toLowerCase()=="digital logic and circuit")
funSub(6);
else if(document.getElementById("search").value.toLowerCase()=="analog electronics")
funSub(7);
else if(document.getElementById("search").value.toLowerCase()=="signal & system")
funSub(8);
else if(document.getElementById("search").value.toLowerCase()=="electromagnetic theory")
funSub(9);
else if(document.getElementById("search").value.toLowerCase()=="analog and digital communications")
funSub(10);
else if(document.getElementById("search").value.toLowerCase()=="integrated electronics")
funSub(11);
else if(document.getElementById("search").value.toLowerCase()=="mechanical drawing")
funSub(12);
else if(document.getElementById("search").value.toLowerCase()=="basic thermodynamics")
funSub(13);
else if(document.getElementById("search").value.toLowerCase()=="mechanics of solids or solid Mechanics")
funSub(14);
else if(document.getElementById("search").value.toLowerCase()=="electromagnetic theory")
funSub(15);
else if(document.getElementById("search").value.toLowerCase()=="heat transfer")
funSub(16);
else if(document.getElementById("search").value.toLowerCase()=="fluid mechanics")
funSub(17);
else if(document.getElementById("search").value.toLowerCase()=="human biology")
funSub(18);
else if(document.getElementById("search").value.toLowerCase()=="cell biology and biological systems")
funSub(19);
else if(document.getElementById("search").value.toLowerCase()=="structural biochemistry")
funSub(20);
else if(document.getElementById("search").value.toLowerCase()=="biological chemistry")
funSub(21);
else if(document.getElementById("search").value.toLowerCase()=="microbiology")
funSub(22);
else if(document.getElementById("search").value.toLowerCase()=="plant science")
funSub(23);
else{
  var x=document.getElementById("search").value;
  var id;
  if(x=="Computer Science"||x=="cse") {id="0";func(id);}
  else if(x=="Electronics"||x=="ECE") {id="1";func(id);}
  else if(x=="Mechanical"||x=="MECH") {id="2";func(id);}
  else if(x=="Civil") {id="3";func(id);}
  else if(x=="BIO"||x=="Bio - Technology"){id="4";func(id);}
  }
  return false;  
}

if($(window).height() > $("body").height()){
$("footer").css("position", "fixed");
$("footer").css("width", "100%");
$("footer").css("bottom", "0");
} else {
$("footer").css("position", "relative");
}

var someVarS,someVarT;

function vedio(s,t){ 
JSON.stringify(s);
JSON.stringify(t);
localStorage.setItem("someVarS", s);
localStorage.setItem("someVarT", t);

}

function load()
{
var s=localStorage.getItem("someVarS");
var t=localStorage.getItem("someVarT");
s= JSON.parse(s);
t=JSON.parse(t);
var e="https://www.youtube.com/embed/?listType=playlist&list=";

var item=
[["PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT","PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU","PLAXnLdrLnQpRcveZTtD644gM9uzYqJCwr","PLBlnK6fEyqRj9lld8sWIUNwlKfdUoPd1Y","PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ"],
["PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y","PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU","PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV","PLBlnK6fEyqRi_CUQ-FXxgzKQ1dwr_ZJWZ","PLrjkTql3jnm-CLxHftqLgkrZbM8fUt0vn"],
["PLbRMhDVUMngf-peFloB7kyiA40EptH1up","PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_","PLrjkTql3jnm-iqlEOuVTkmCaRP8F2H3-u","PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx","PLBMO3ORTdwldCqlHVcbJSOa3GxLS6bpeE"],
["PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p","PLdo5W4Nhv31a5ucW_S1K3-x6ztBRD-PNa","PLrjkTql3jnm9U1tSPnPQWQGIGNkUwBFv-","PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O","PLacuG5pysFbDQU8kKxbUh4K5c1iL5_k7k"],
["PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2","PL0s3O6GgLL5eLjSEe4ZO0CRUonduv9LxP","PLrjkTql3jnm9b5nr-ggx7Pt1G4UAHeFlJ","PLWKjhJtqVAbmfoj2Th9fvxhHIeqFO7wOy","PLV8vIYTIdSnat3WCO9jfehtZyjnxb74wm"],
["PLfqMhTWNBTe3H6c9OGXb5_6wcc1Mca52n","PLTjRvDozrdlw5En5v2xrBr_EqieHf7hGs","PLWKjhJtqVAbnSe1qUNMG7AbPmjIG54u88","PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G","PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg"],

["PLWPirh4EWFpHk70zwYoHu87uVsCC8E2S-","PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm","PLmXKhU9FNesSfX1PVt4VGm-wbIKfemUWK","PLxCzCOWd7aiFOet6KEEqDff1aXEGLdUzn","PLTFMW-rP7fuqMiK174et4SKbbMKd4VjdU"],
["PLBlnK6fEyqRiw-GZRqfnlVIBz9dxrqHJS","PLgzsL8klq6DKVaZNkxyMTPADw5_N6m3WJ","PLTFMW-rP7fupAdK1GL8ADxJDmbLHzJtVn","PLbRMhDVUMngehqNF2w_UbAi94qIycZOTG","PLs5_Rtf2P2r674CTMNJ3odeHk9Wtb-WWl"],
["PLBlnK6fEyqRhG6s3jYIU48CqsT5cyiDTO","PL9RcWoqXmzaIG-RWneeqDJ-FCt66S15pl","PLWPirh4EWFpHr_1ZCkuF9ToYUrmujv9Aa","PLs5_Rtf2P2r4LCom0XTgCOJOI1cupZ-E9"],
["PLgwJf8NK-2e4I_YltJja47CwZJkzNWK89","PLb2wGSuEdRG-80PlUnUyBoLw-WqfVd00C","PL_mruqjnuVd87sjSDVS9wuit9CSpgIIfx","PLgzsL8klq6DKrV1NHc8fNSni2H1__loww","PLs5_Rtf2P2r5AJvc-EuBEwdur_dUVojW-"],
["PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm","PLwjK_iyK4LLArUHRm3SvPLT0XWlVhpl4h","PLDp9Jik5WjRsLppnN81bheIwGB8Hsx_Xa"],
["PL0c0N7xv8s04vWShAdts0FpMbfymZOWJF","PLe25ovnCxlLTcLcsUxjTru8ta2niZBHUp","PLBlnK6fEyqRiw-GZRqfnlVIBz9dxrqHJS","PLwjK_iyK4LLDBB1E9MFbxGCEnmMMOAXOH"],

["PLLvBXFAV-DeIsmVkmcNv2RzwCuT1XvhTV","PL1xA-pZWMKpPCC2IuYVt435v_2EqcA3ar","PLhSp9OSVmeyJDAdks5VU8Ie0RS4wYZ6sM"],
["PL727BYvm8B1nmaFwlzSAKpyVeOVhuVbJL","PLqwfRVlgGdFCs2ByAiC4bfGM3zSsbVcwF","PL9RcWoqXmzaK6AHCCyL_J6gqc02RN-w-D","PLgwJf8NK-2e7Fe4vAYDaL0bpseGNhc9on"],
["PL9RcWoqXmzaLlfmNg2Ku1SdZtvXnYrLbc","PLIhUrsYr8yHzft7ygw5THZo4aDcsxEadP","PLp6ek2hDcoNALS0KiBAUiCwrTrvil2vL3","PLKZlPALGW-7TK51CrfZRyWcY8h2gaxVCy"],
["PL9RcWoqXmzaIp3_6Gd6wwAwMtenRhGrJw","PLiSPNzs4fD9tyI_gNHcQkvtvzLvB3aE05","PLSGws_74K018Y3hGSqO1hlNiU8zEcBJfN","PLyqSpQzTE6M_MEUdn1izTMB2yZgP1NLfs"],
["PLgwJf8NK-2e4I_YltJja47CwZJkzNWK89","PLeIbFSFq3rct-DxELpGEM3NjDmfu1OYI3","PLFj2yLsQX6SJiZdnChk0nMyi9kJGWCtyu","PLb2wGSuEdRG-80PlUnUyBoLw-WqfVd00C","PLuv3GM6-gsE3-hVNaw-YEb7EeY5XVPZdz"],
["PLbRMhDVUMngeygd_uWiLqa3fzA2h7vdRx","PLNyPK_sfNdSTiAczWmvY3tq33yWh_IHL2","PL1gyM10tgL1hK9666oGndGlWDQdpQzkY9","PL9H2IJVEgfm_AtQy7vSZ4tT_axg2IWNGy"],
["PL727BYvm8B1mINwfNNRyd1iDWmImB_Xdz","PLbMVogVj5nJQEgL1sHuY24d6omOqXInnt","PL9RcWoqXmzaLnlGN39w2-1jyFyI_ALVa3","PLbRMhDVUMngdckEfioMsL-RfpmmFVu_O-"],

["PLZOyTsQ0KlAhpojEi_hBKZrWFUo0A6eSZ","PLUhSnh31IIVBtJZLpf2z_jOViZBLquZ-N","PLaXhdbWV6NQFyZZ76pog7VCJ-dkS-NGbu"],
["PL5B75043EEBE698AB","PLTF9h-T1TcJi_1FdKlH4dbf_3uI4wuT99","PL7rkRU_uK7Lks9BqP5JYwiRjTJvIJ2j3_"],
["PLb0WW0k29aHqu5uAunBXD9F_mGI3saGjW","PL7rkRU_uK7Lmm-oBM98eEn_NBosUegwo7","PLgTwKLydtnMlFEOHmWoYtGw4rORVu2Wiz"],
["PLFpCrsN3l3fDogcEvP28M-V-gpYWUjnJB","PLb0WW0k29aHqu5uAunBXD9F_mGI3saGjW","PL7rkRU_uK7Lmm-oBM98eEn_NBosUegwo7","PLUl4u3cNGP63vvR4xtexZdoPywRYIZI0-"],
["PLFpCrsN3l3fB3TaFS8ll0zwlnXJi619DI","PLb0WW0k29aHq7anfNEH7FQ08iVvw0neEP","PLjMo-ys5HQIZomKdqEKCgYSevvdgQyT8x","PLjMo-ys5HQIZomKdqEKCgYSevvdgQyT8x"]
["PLvxV7-LoXy4ot2FyS6APuPjj92wB_YNFX","PLtxSjxsaGiElKWrHdtHp-8WTPuUSfsPXn","PLMwQyDnbQLRW9s-GpqIn4WIpNyD1V167b"]
];
document.getElementById('main').src=e+item[s][t];
}