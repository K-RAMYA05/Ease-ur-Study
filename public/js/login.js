const myForm = document.getElementById('loginForm');

myForm.addEventListener("submit",function(e){
    e.preventDefault();
    
    const formData = new FormData(this);
    fetch('/login',{
        method:'post',
        body: formData
    }).then((response)=>response.text()).then((text)=>{
        console.log(text);
    }).catch((err)=>{
        console.log(err);
    })

})
