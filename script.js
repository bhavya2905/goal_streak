let goal=document.getElementById('goal');
let add=document.getElementById('add');
let list=document.getElementById('list1');
let sub=document.getElementById('submit');
let nam=document.getElementById('name');
add.addEventListener('click',create);
sub.addEventListener('click',local);

let arr=[];
function create(){
    if(goal.value==""){
        alert("enter your goal IDIOT......")
    }else{
        arr.push(goal.value);
        show();
        goal.value="";
    }
    
}
function reset(){
    localStorage.clear();
    check();
}

function show(){
    check();
    list.innerHTML="";
    arr.map((e,i)=>{
    
            let li=document.createElement('li');
            let details=`<div class='each'> ${e} <button onclick="delet(${i})" class="delete">delete</button></div>`
            li.innerHTML=details;

            list.appendChild(li);
        
    })
}
function delet(i){
    
        arr.splice(i,1);
        show();

} 
check();
function check(){
    if(nam.value=='' || arr.length==0){
        sub.disabled=true;
        sub.style.background="grey";
        sub.style.cursor="not-allowed";
    }else{
        sub.disabled=false;
        sub.style.background="limegreen";
        sub.style.cursor="pointer";
    }
    if(localStorage.getItem('detail')){
        document.getElementById('first').style.display='none';
        showlocal();
    }else{
        document.getElementById('first').style.display='block';
        document.getElementById('second').style.display='none';
        
    }
}   
function local(){
    document.getElementById('first').style.display='none';
    
    
    let obj={
        name:nam.value,
        list:arr
    };
    localStorage.setItem('detail',JSON.stringify(obj));
    showlocal();
}

function showlocal(){
    document.getElementById('checkbox').innerHTML='';
    document.getElementById('second').style.display='block';
    let objval=localStorage.getItem('detail')?JSON.parse(localStorage.getItem('detail')):"";
    document.getElementById('hello').innerHTML= `hello ${objval.name}`;
    objval.list.map((e,i)=>{
    
        let li=document.createElement('div');
        
        li.innerHTML=`<input type="checkbox" > <span>${e}</span>`;

        document.getElementById('checkbox').appendChild(li);
    
})
}
if(localStorage.getItem('detail')){
    document.getElementById('first').style.display='none';
    showlocal();
}
    
