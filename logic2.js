let price = document.getElementById("selling-price");
let product = document.getElementById("product");
let form = document.getElementById("add-item")
let items = document.getElementById("items")
let cost = document.getElementById("cost")
let totalPrice = 0;
let ids = []

// adding  the eventlistner
form.addEventListener('submit',addData);
window.addEventListener('DOMContentLoaded',initData)
items.addEventListener('click',deledata);




// gettingthe initial data
 function initData(){
   axios.get("https://crudcrud.com/api/c33e7176865a4f3987fa64f9bdd86135/peoductDetails").then((res)=>{
    console.log(res)
     res.data.forEach((obj)=>{
       console.log("hellow")
       ids.push(obj._id);
        totalPrice += parseInt(obj.Price)
      console.log(totalPrice)
      console.log(ids)
      displaydata(obj);
    })
  })
  
}



// adding the data;
function addData(e){
  e.preventDefault();
  
  console.log(totalPrice)
  totalPrice += parseInt(price.value);
  let obj = {
    Price : price.value,
    Product : product.value
  }
  axios.post(`https://crudcrud.com/api/c33e7176865a4f3987fa64f9bdd86135/peoductDetails`,obj).then((response)=>{
    displaydata(obj);
    ids.push(response.data._id);
  }).then(()=>{
    price.value = "";
    product.value = "";
  });
}

// display the data 
function displaydata(obj){
  items.innerHTML += `<li class ="list-group-item mt-3"><span> Price : ${obj.Price}, </span><span>  Product : ${obj.Product},</span><button class="btn btn-success btn-sm float-end delete mx-1">DELETE</button>`;
  cost.textContent = totalPrice ;
}



// implimenting the delete button 

async function deledata(e){
  if(e.target.classList.contains("delete")){
     li = e.target.parentElement
     let index  = Array.from(li.parentElement.children).indexOf(li);
     let id = ids[index]
  
     axios.get(`https://crudcrud.com/api/c33e7176865a4f3987fa64f9bdd86135/peoductDetails/${id}`).then((res)=>{
      console.log(res.data.Price)
     totalPrice = totalPrice -  parseInt(res.data.Price);
    cost.innerText = totalPrice;

      axios.delete(`https://crudcrud.com/api/c33e7176865a4f3987fa64f9bdd86135/peoductDetails/${id}`).then(()=>{
        ids.splice(index,1);
        items.removeChild(li);
      })
      })
    
  }

}

