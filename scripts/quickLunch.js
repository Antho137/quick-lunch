function calcTotal() {
    let itemTotal = 0;
    let totalWithTax = 0;
    let itemTax = 0;
	let itemPrice = 0;
    let tax = 0.05;
	let itemTotals = 0;
	let today = new Date();
    let items = document.getElementsByClassName("lunch");
	let phone = document.getElementById("phoneNum").value;
	let customer = document.getElementById("cstName").value;
	let inReceipt = document.getElementById("invoice");
	inReceipt.innerHTML = "Quick Lunch<br>";
	inReceipt.innerHTML += "Invoice n° 00" + today.getHours() + today.getMinutes() + "<br>";
	inReceipt.innerHTML += "Customer: " + customer + "<br>";
	inReceipt.innerHTML += "Telephone: " + phone + "<br>";
	inReceipt.innerHTML += "Date: " + today.toLocaleDateString() + "<br>";
	inReceipt.innerHTML += "<hr>";
	
	// Declare the table that shows order information
	let table = "<table>";
    table += "<tr><th>Qty</th><th>Product</th><th>U. Price</th><th>T. Price</th></tr>";	
	
	// Variable for quantity order
	let quantity = getQuantity();
	// Iteraction into lunchs menu to get order result
	for (let i = 0; i < items.length; i++) {
        if (items[i].checked) {
            itemPrice = (items[i].value * 1) / 100;
			itemPrice = parseFloat(itemPrice).toFixed(2);
			console.log(itemPrice);
		    itemTotal = itemPrice * quantity[i];
			itemTotal = itemTotal.toFixed(2);
	        itemTotals += parseFloat(itemTotal);
		    itemTax = itemTotals * tax;
		    totalWithTax = itemTotals + itemTax;
		    table += "<tr>";
            table += "<td>" + quantity[i] + "</td><td>" + items[i].name + "</td><td> $" + itemPrice + "</td><td> $" + itemTotal + "</td>";
	        table += "</tr>";
        }
    }
	// Inserting order results into table rows
	table += "<tr>"
	table += "<td></td>" + "<td>Total due</td><td>............</td><td> $" +  itemTotals.toFixed(2) + "</td>";
	table += "</tr>";	
	table += "<tr>"
	table += "<td></td>" + "<td>Tax due (5%)</td><td>............</td><td> $" +  itemTax.toFixed(2) + "</td>";
	table += "</tr>";	
	table += "<tr>"
	table += "<td></td><td>Total </td><td>..........</td><td> $" +  totalWithTax.toFixed(2) + "</td>"; 
	table += "</tr>";	
	inReceipt.innerHTML += table;
    document.getElementById("orderForm").reset(); // empty the form after get invoice button click
	openWin();
}

// Get quantity value from check boxes
function getQuantity() {
	let allQuantities = [];
	let quantity = document.getElementsByClassName("itemNum");
	for (let i = 0; i < quantity.length; i++) {
		allQuantities.push(quantity[i].value);
	}
	return allQuantities;
}

// Function to open a new window for order information invoice
function openWin() {
	let thetable = document.getElementById("invoice");	
	let newSheet = window.open("", "", "width=310,height=390");
	newSheet.document.write(thetable.outerHTML);
	newSheet.document.write("<p style='text-align:center; font-size:20px; color:tomato;'>Thank you for the preference!</p>");
}

// Get current year
function updateYear() {
	let now = new Date();
	let theYear = now.getFullYear();
	document.getElementById("year").innerHTML = theYear;
}

function createEventListeners() {
    let calButton = document.getElementById("calculate");
    calButton.addEventListener("click", calcTotal, false);
    updateYear();
}

window.addEventListener("load", createEventListeners, false);

