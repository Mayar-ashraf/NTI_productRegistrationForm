var form = document.getElementById('form');
var table = document.getElementById('table');
var products = [];

function areValidFields() {
    var pdtName = document.getElementById('name');
    var pdtDesc = document.getElementById('desc');
    var pdtCateg = document.getElementById('category');
    var pdtPrice = document.getElementById('price');
    if(pdtName.value == ''){
        alert("Product's name is a required field!");
        return false;
    }else if(pdtPrice.value == ''){
        alert("Product's price is a required field!");
        return false;
    }else if(pdtPrice.value <= 0){
        alert("Product's price should be a positive number!");
        return false;
    }else if(pdtDesc.value == ''){
        alert("Product's Description is a required field!");
        return false;
    }else if (pdtCateg.value == "null") {
        alert('Please choose a category!');
        return false;
    }
    return true;
}
function emptyTextFields(){
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('category').value = "null";
    document.getElementById('available').checked = false;
}
function displayProducts(array){

    console.log(table);
    // CREATE FIRST ROW
    let tbody = document.querySelector('tbody');
    if(tbody){
        table.removeChild(tbody);
        console.log("Old table deleted");
    }
    document.getElementById('msg').innerText = '';
    if(array.length){
        var row = table.insertRow(0);
        var nameCell = row.insertCell(0);
        var priceCell = row.insertCell(1);
        var descCell = row.insertCell(2);
        var categCell = row.insertCell(3);
        var isAvailCell = row.insertCell(4);
        var actionsCell = row.insertCell(5);

        nameCell.innerText = "Name"
        priceCell.innerText = "Price";
        descCell.innerText = "Description";
        categCell.innerText = "Category";
        isAvailCell.innerText = "Availability";
        actionsCell.innerText = "Actions";

        array.forEach( function (product){
            
            const{name, price, desc, category, available} = product; // Object Destructing
            
            var row = table.insertRow(array.indexOf(product) + 1);
            var pdtName = row.insertCell(0);
            var pdtPrice = row.insertCell(1);
            var pdtDesc = row.insertCell(2);
            var pdtCateg = row.insertCell(3);
            var pdtIsAvail = row.insertCell(4);
            var pdtActions = row.insertCell(5);

            pdtName.innerText = name;
            pdtPrice.innerText = price;
            pdtDesc.innerText = desc;
            pdtCateg.innerText = category;
            pdtIsAvail.innerText = available;

            let editBtn = document.createElement('button');
            editBtn.innerText = "Edit";
            pdtActions.appendChild(editBtn);

            let deleteBtn = document.createElement('button');
            deleteBtn.innerText = "Delete"
            pdtActions.appendChild(deleteBtn);

            editBtn.addEventListener('click', function () {
                console.log("Edit button event listener for product number ", array.indexOf(product) + 1);
                document.getElementById('name').value = name;
                document.getElementById('price').value = price;
                document.getElementById('desc').value = desc;
                document.getElementById('category').value = category;
                document.getElementById('available').checked = available;
                // edit html document
                document.getElementById('formTitle').innerText = "Edit Product";
                document.getElementById('addBtn').style.display = "none";
                document.getElementById('updateBtn').style.display = "inline";

                document.getElementById('updateBtn').addEventListener('click', function(event){
                    console.log("entered here");
                    
                    event.preventDefault();

                    
                    if(confirm("Are you sure you want to edit the following product?")){
                        var updatedName = document.getElementById('name').value;
                        var updatedPrice = document.getElementById('price').value;
                        var updatedDesc = document.getElementById('desc').value;
                        var updatedCateg = document.getElementById('category').value;
                        var updatedAvail = document.getElementById('available').checked;
                        product.name = updatedName;
                        product.price = updatedPrice;
                        product.desc = updatedDesc;
                        product.category = updatedCateg;
                        product.available = updatedAvail;
                        displayProducts(array);
                        document.getElementById('formTitle').innerText = "Add new Product";
                        document.getElementById('addBtn').style.display = "inline";
                        document.getElementById('updateBtn').style.display = "none";
                        alert('Product Edited Successfully');
                        emptyTextFields();
                    }
                });


            });

            deleteBtn.addEventListener('click', function () {
                console.log("Delete button event listener for product number ", array.indexOf(product) + 1);
                if(confirm(`Are you sure you want to delete the product "${name}"?`)){
                    array.splice(array.indexOf(product), 1);
                    displayProducts(array);
                }
            });
        });
    }

    
}
document.getElementById('addBtn').addEventListener('click', function (event) {
    event.preventDefault();

    if(areValidFields()){
        console.log(products.length);
        if (products.length == 0) {
            // create table
            

        }
        var pdtName = document.getElementById('name');
        var pdtPrice = document.getElementById('price');
        var pdtDesc = document.getElementById('desc');
        var pdtCateg = document.getElementById('category');
        var isAvailable = document.getElementById('available');

        console.log("is Aval valueee", isAvailable.checked);
        
        var product = {
            name : pdtName.value,
            price : pdtPrice.value,
            desc : pdtDesc.value,
            category : pdtCateg.value,
            available : isAvailable.checked
        };
        products.unshift(product); // add new product to first of array
        displayProducts(products);
        alert('Product added successfully!');
        emptyTextFields();
    } 

});
document.getElementById('searchBar').addEventListener('blur', function(event){
    event.preventDefault();
    console.log("Entered Here");
    if(document.getElementById('searchBar').value == ''){ // Search Bar is Empty

        displayProducts(products);

    }else if(products.length){ // if products array && search bar are not empty
       
        console.log("Started Searching..", products);
        
        var input = document.getElementById('searchBar').value;
        console.log(input);
        var matchingProducts = [];

        products.forEach(function(product){
            var pdtName = product.name;
            var pdtCateg = product.category;

            if(pdtName.toLowerCase().includes(input.toLowerCase()) || pdtCateg.toLowerCase().includes(input.toLowerCase()) ){
                matchingProducts.push(product);  
            }

        });
        if(matchingProducts.length){
            console.log("Matchings Found");
            displayProducts(matchingProducts);
        }else{
            console.log("No Matchings");
            var msg = document.getElementById('msg'); 
            msg.innerText = "No Matchings Found";

        }       
    }else{
        var msg = document.getElementById('msg'); 
        msg.innerText = "No Products Available";
    }
});
document.getElementById('filterBtn').addEventListener('click', function(){
    var categFilter = document.getElementById('categFilter').value;
    console.log(`seach for ${categFilter}`);
    
    var filteredPdts = [];
    if(categFilter == "null"){
        alert("Please choose a valid Category");
    }else if(products.length){
        products.forEach(function(product){
            if(categFilter == product.category){
                filteredPdts.push(product);
            }

        });
        if(filteredPdts.length){
            displayProducts(filteredPdts);
        }else{
            console.log("No Matchings");
            var msg = document.getElementById('msg'); 
            msg.innerText = "No Matchings Found";
        }

    }else{
        var msg = document.getElementById('msg'); 
        msg.innerText = "No Products Available";
    }
    
    
})

