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
        arr.push({
            goal:goal.value,
            streak:0,
            time:''
        });
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
            let details=`<div class='each'> ${e.goal} <button onclick="delet(${i})" class="delete">delete</button></div>`
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
        let curr_time=new Date().getTime();
        let diff_time=(curr_time-e.time)/(24*60*60*1000);

        if(diff_time<1){
            li.innerHTML=`<input type="checkbox" disabled checked  style="cursor:not-allowed;" onclick="streak(${i})"> <span style="margin-left:20px; ">${e.goal}</span><span style="margin-left:20px; ">${e.streak}</span>`;

        }else{
            if(diff_time>2){
                e.streak=0;
            }
            li.innerHTML=`<input type="checkbox" onclick="streak(${i})"> <span style="margin-left:20px; ">${e.goal}</span><span style="margin-left:20px; "><i class="fab fa-gripfire"></i>${e.streak}</span>`;
            
        }
       
        document.getElementById('checkbox').appendChild(li);
    
})
localStorage.setItem('detail',JSON.stringify(objval));
}
if(localStorage.getItem('detail')){
    document.getElementById('first').style.display='none';
    showlocal();
    // setInterval(
    //     ()=>{
    //         showlocal();
    //     },60000
    // )
 
}

function streak(i){
    let loc=JSON.parse(localStorage.getItem('detail'));
    loc.list[i].streak+=1;
    loc.list[i].time=new Date().getTime();
    localStorage.setItem('detail',JSON.stringify(loc));
    showlocal();

}
    
