var totalCutAmount = 1

function addRow(){
    const tbody = document.getElementById("invoiceBody");
    const newRow = tbody.insertRow();
    newRow.className = "invoice-row"; // Ensure new rows have the hover class

    const cutNum1 = newRow.insertCell(0);
    const cutType2 = newRow.insertCell(1);
    const cutAmount3 = newRow.insertCell(2);

    var currentCutNumber = parseInt(document.getElementById("cutNumberInput").value) || 0;
    var nextCutNumber = currentCutNumber + 1;

    // Notice the row-trigger div is baked right into the first cell layout
    cutNum1.innerHTML = `
        <p>c<input type="text" value="${nextCutNumber}"></p>
        <div class="row-trigger" onclick="addRow()">+</div>
    `;
    
    totalCutAmount += 1
    document.getElementById("cutNumberInput").value = nextCutNumber;

    cutType2.innerHTML = '<form action=""><select id="jobType" name="job"><option value="LO">LO</option><option value="GENGA">GENGA</option><option value="SAKKAN">SAKKAN</option><option value="DOUGA">DOUGA</option></select></form>';
    
    cutAmount3.innerHTML = '<input type="text" <form action=""><select id="moneyCurrency" name="currency"><option value="YEN">¥</option><option value="USD">$</option><option value="POUND">£</option><option value="WON">₩</option></select></form>';
    
    cutAmountUpdate()
    console.debug(totalCutAmount)
}

function addRowBetween(clickedButton) {

    const currentRow = clickedButton.closest("tr");
    

    const currentIndex = currentRow.rowIndex;
    

    const table = currentRow.closest("table");
    

    const currentInput = currentRow.querySelector('#cutNumber td input, td:first-child input');
    var currentRowNumber = currentInput ? parseInt(currentInput.value) : 0;

    if (isNaN(currentRowNumber)) {
        currentRowNumber = 0;
    }


    var nextCutNumber = currentRowNumber + 1;


    const newRow = table.insertRow(currentIndex + 1);
    newRow.className = "invoice-row"; 


    const cutNum1 = newRow.insertCell(0);
    const cutType2 = newRow.insertCell(1);
    const cutAmount3 = newRow.insertCell(2);

    cutNum1.innerHTML = `
        <p>c<input type="text" value="${nextCutNumber}"></p>
        <div class="row-trigger" onclick="addRowBetween(this)">+</div>
    `;
    
    totalCutAmount +=1
    
    cutType2.innerHTML = '<form action=""><select id="jobType" name="job"><option value="LO">LO</option><option value="GENGA">GENGA</option><option value="SAKKAN">SAKKAN</option><option value="DOUGA">DOUGA</option></select></form>';
    
    cutAmount3.innerHTML = '<input type="text" <form action=""><select id="moneyCurrency" name="currency"><option value="YEN">¥</option><option value="USD">$</option><option value="POUND">£</option><option value="WON">₩</option></select></form>';
    
    console.debug(`Inserted row at index ${currentIndex + 1} with dynamic value: ${nextCutNumber}`);
    cutAmountUpdate()
    console.debug(totalCutAmount)
}


function cutAmountUpdate(){
    const cutTotalElement = document.getElementById("totalCutNumbers");
    cutTotalElement.value = totalCutAmount;
    console.debug("update toal cuts")

}


function removeRow() {
    const tbody = document.getElementById("invoiceBody");
    
    if (tbody.rows.length > 1) {
        tbody.deleteRow(-1);
        totalCutAmount -=1
        cutAmountUpdate()
        console.debug("Row removed successfully");
    } else {
        console.warn("No rows left to remove!");
    }
}

function cutNumberColumnClear(){

}
function applyAllType(){
    console.debug("Apply all")
}

function sequenceNumbers(){
    console.debug("Numbers sequenced")
}

