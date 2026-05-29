var totalCutAmount = 1


function readFile() {
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const fileInput = document.getElementById('fileUpload');

        if (fileInput.files.length === 0) {
            alert('Select a file first!');
            return;
        }

        const file = fileInput.files[0]; 
        const reader = new FileReader();

        reader.onload = function(e) {
            try {

                const data = JSON.parse(e.target.result); 
                console.log("JSON parsed successfully:", data);

    
                if (data.workerName) document.getElementById("workerName").value = data.workerName;
                if (data.workerAddress) document.getElementById("workerAddress").value = data.workerAddress;
                if (data.workerCountry) document.getElementById("workerCountry").value = data.workerCountry;
                if (data.workerSignature) document.getElementById("workerSignature").value = data.workerSignature;
                

                if (data.workerAccountHolderName) document.getElementById("workerAccountHolderName").value = data.workerAccountHolderName;
                if (data.workerBankName) document.getElementById("workerBankName").value = data.workerBankName;
                if (data.workerBankAddress) document.getElementById("workerBankAddress").value = data.workerBankAddress;
                if (data.workerAccountNumber) document.getElementById("workerAccountNumber").value = data.workerAccountNumber;
                if (data.workerWireNumer) document.getElementById("workerWireNumer").value = data.workerWireNumer;
                if (data.workerSWIFTcode) document.getElementById("workerSWIFTcode").value = data.workerSWIFTcode;
                if (data.workerBankBranchName) document.getElementById("workerBankBranchName").value = data.workerBankBranchName;
                if (data.workerIBANcode) document.getElementById("workerIBANcode").value = data.workerIBANcode;

            } catch (error) {
                console.error("Could not parse JSON file layout:", error);
                alert("Error reading file. Ensure it is formatted correctly.");
            }
        };

        reader.onerror = function() {
            console.error("Error reading the file:", reader.error);
        };

        reader.readAsText(file);
    });
}

readFile();




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

