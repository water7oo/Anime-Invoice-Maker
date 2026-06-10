var totalCutAmount = 1;
var cutCounter = 1;
var cutNumColumn = [];
var fileCleared = false

function readFile() {
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const fileInput = document.getElementById('fileUpload');

        if (fileInput.files.length === 0) {
            if (fileCleared == false)
                return;
        }

        const file = fileInput.files[0]; 
        const reader = new FileReader();

        reader.onload = function(e) {
            try {

                const data = JSON.parse(e.target.result); 
                console.log("JSON parsed successfully:", data);

    
                if (data.workerName) document.getElementById("workerName").value = data.workerName; resizeInput.call(workerName);
                if (data.workerAddress) document.getElementById("workerAddress").value = data.workerAddress; resizeInput.call(workerAddress);
                if (data.workerCountry) document.getElementById("workerCountry").value = data.workerCountry; resizeInput.call(workerCountry);
                if (data.workerSignature) document.getElementById("workerSignature").value = data.workerSignature; resizeInput.call(workerSignature);
                

                if (data.workerAccountHolderName) document.getElementById("workerAccountHolderName").value = data.workerAccountHolderName; resizeInput.call(workerAccountHolderName);
                if (data.workerBankName) document.getElementById("workerBankName").value = data.workerBankName; resizeInput.call(workerBankName);
                if (data.workerBankAddress) document.getElementById("workerBankAddress").value = data.workerBankAddress; resizeInput.call(workerBankAddress);
                if (data.workerAccountNumber) document.getElementById("workerAccountNumber").value = data.workerAccountNumber; resizeInput.call(workerAccountNumber);
                if (data.workerWireNumer) document.getElementById("workerWireNumer").value = data.workerWireNumer; resizeInput.call(workerWireNumer);
                if (data.workerSWIFTcode) document.getElementById("workerSWIFTcode").value = data.workerSWIFTcode; resizeInput.call(workerSWIFTcode);
                if (data.workerBankBranchName) document.getElementById("workerBankBranchName").value = data.workerBankBranchName; resizeInput.call(workerBankBranchName);
                if (data.workerIBANcode) document.getElementById("workerIBANcode").value = data.workerIBANcode; resizeInput.call(workerIBANcode);
                if (data.workerCompany) document.getElementById("studioName").value = data.workerCompany; resizeInput.call(studioName);
                if (data.workerPenName) document.getElementById("penName").value = data.workerPenName; resizeInput.call(penName);
                if (data.workerPhoneNumber) document.getElementById("workerPhoneNumber").value = data.workerPhoneNumber; resizeInput.call(workerPhoneNumber);
                 
                clearCurrentFile()
                
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



// 1. Added an 'amount' parameter with a default value of 1
function addRow({ mode = "below", clickedButton = null, amount = 1 } = {}) {
    const table = document.getElementById("invoiceBody").closest("table");
    const tbody = document.getElementById("invoiceBody");

    // We keep track of the row reference for the input listeners at the end
    let currentNewRows = []; 

    // 2. Wrap the row generation logic in a loop
    for (let i = 0; i < amount; i++) {
        let newRow;
        let nextNumber;

        if (mode === "below") {
            cutCounter += 1;
            nextNumber = cutCounter;

            newRow = tbody.insertRow();

            const input = document.getElementById("cutNumberInput");
            if (input) input.value = cutCounter;
        }

        if (mode === "between" && clickedButton) {
            // Note: If adding multiple "between", they will stack downwards in order
            const currentRow = clickedButton.closest("tr");
            const input = currentRow.querySelector("td input");

            let base = parseInt(input?.value) || 0;

            // Adjusts the numbering based on how many rows we've already added in this loop
            nextNumber = base + 1 + i; 

            const index = currentRow.rowIndex;
            // Adds + i so subsequent rows are inserted after the previously newly created row
            newRow = table.insertRow(index + 1 + i); 
        }

        buildRow(newRow, nextNumber, mode);

        totalCutAmount += 1;
        
        // Track this row to apply event listeners later
        currentNewRows.push(newRow);
    }

    // Update the UI once after all rows are added
    cutAmountUpdate();

    // 3. Apply the resize listeners to all the newly created rows
    currentNewRows.forEach(newRow => {
        newRow.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', resizeInput);
            resizeInput.call(input);
        });
    });
}

function buildRow(row, number, mode) {
    row.className = "invoice-row";

    const cutNum1 = row.insertCell(0);
    const cutType2 = row.insertCell(1);
    const cutAmount3 = row.insertCell(2);

    const handler =
        mode === "below"
            ? "addRow({ mode: 'below' })"
            : "addRow({ mode: 'between', clickedButton: this })";

    cutNum1.innerHTML = `
        <p>c<input type="text" class="cutNumberInput" id="cutNumberInputID" style="max-width: 40px;
    height: 20px;"></p>
        <div class="row-trigger" onclick="${handler}">+</div>
    `;

    cutType2.innerHTML = `
        <select id="jobType" name="job" class="typeSelection">
            <option value="LO">LO</option>
            <option value="NIGEN">NIGEN</option>
            <option value="GENGA">GENGA</option>
            <option value="SAKKAN">SAKKAN</option>
            <option value="DOUGA">DOUGA</option>
        </select>
    `;

    cutAmount3.innerHTML = `
            <input oninput="updateTotalAmount()" type="text" class="moneyAmountFields" id="moneyAmountFieldsID" style="    max-width: 40px;height: 20px;">
            <select id="moneyCurrency" name="currency" class="moneyAmountCurrency">
                <option value="¥">¥</option>
                <option value="$">$</option>
                <option value="£">£</option>
                <option value="₩">₩</option>
                <option value="R">R</option>
            </select>
    `;
}

// function totalMoneyAmount(){
//     document.getElementById("totalAmount").value = 
// }
function cutAmountUpdate() {
    document.getElementById("totalCutNumbers").value = totalCutAmount;
}


function removeRow() {
    const tbody = document.getElementById("invoiceBody");

    if (tbody.rows.length > 1) {
        tbody.deleteRow(-1);
        totalCutAmount -= 1;
        cutAmountUpdate();
    }
}

function cutNumberColumnClear(){
    const allCutNumberElements = document.querySelectorAll('.cutNumberInput');
  
    allCutNumberElements.forEach(element => {
        element.value = ""
    });
 


    console.log(allCutNumberElements)

}


function amountColumnClear(){
        const allAmountElements = document.querySelectorAll('.moneyAmountFields');
  
    allAmountElements.forEach(element => {
        element.value = ""
    });
 


    console.log(allAmountElements)
}
function applyAllType(){
    const allCutNumberElements = document.querySelectorAll('.typeSelection');
  
    if(allCutNumberElements.length === 0){
        return;
    }

    const firstValue = allCutNumberElements[0].value

    allCutNumberElements.forEach(selection => {
        const firstElementValue = selection[0]
        selection.value = firstValue;
    });
 
}

function applyAllMoneyAmount() {
    const amountFields = document.querySelectorAll('.moneyAmountFields');
    const currencyFields = document.querySelectorAll('.moneyAmountCurrency');

    if (amountFields.length === 0 || currencyFields.length === 0) return;

    const firstAmount = amountFields[0].value;
    const firstCurrency = currencyFields[0].value;

    let amount = 0;

    const totalAmountInput = document.getElementById("totalAmount");

    amountFields.forEach(input => {
        input.value = firstAmount;
        amount += parseInt(input.value) || 0;

        resizeInput.call(input); // resize this field
    });

    totalAmountInput.value = amount + " " + firstCurrency;
    resizeInput.call(totalAmountInput); // resize total field too

    currencyFields.forEach(select => {
        select.value = firstCurrency;
    });
}

function applyCutNumbersSequential() {
    const allCutNumberElements = document.querySelectorAll('.cutNumberInput');

    if (allCutNumberElements.length === 0) return;

    const base = parseInt(allCutNumberElements[0].value) || 1;

    for (let i = 1; i < allCutNumberElements.length; i++) {
        allCutNumberElements[i].value = base + i;
        
        resizeInput.call(allCutNumberElements[i]);
    }
}

function sequenceNumbers(){
    console.debug("Numbers sequenced")
}
function clearCurrentFile(){
    fileCleared = true
    const file = document.getElementById("fileUpload");
    file.value = "";
    console.log("file cleared");

}

function exportFile() {
    const html = document.documentElement.outerHTML;

    fetch("https://e.customjs.io/html2pdf", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "YOUR_API_KEY",
            "customjs-origin": "inline/pdf-generator"
        },
        body: JSON.stringify({
            input: {
                html,
                config: {
                    pdfWidthMm: 210,
                    pdfHeightMm: 297
                }
            }
        })
    })
    .then(res => res.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice.pdf";
        a.click();
        URL.revokeObjectURL(url);
    });
}

function clearInvoice(){
    const allCutNumberElements = document.querySelectorAll('.cutNumberInput');
    const allCutAmounts = document.querySelectorAll('.moneyAmountFields');
    allCutNumberElements.forEach(element => {
        element.value = ""
    });
 
    allCutAmounts.forEach(element => {
        element.value = ""
    });


    console.log(allCutNumberElements)
}

function toggleMenu(){
    var isToggled = false

    if (isToggled == false){
        console.log("no");
        isToggled = true;
    }else{
        console.log("yes");
        isToggled = false;
    }

}

function updateTotalAmount(){
    const amountFields = document.querySelectorAll('.moneyAmountFields');
    const currencyFields = document.querySelectorAll('.moneyAmountCurrency');

    const firstAmount = amountFields[0].value;
    const firstCurrency = currencyFields[0].value;
    var amount = 0
    var applyFirstCurrency;

    const totalAmountInput = document.getElementById("totalAmount");
    amountFields.forEach(input => {
        amount += parseInt(input.value);
        totalAmountInput.value = String(amount) + " " + firstCurrency
    });

    // totalAmountInput.value = String(amount) + " " + firstCurrency
}



var input = document.querySelectorAll('input:not(#fileUpload, #date, #totalCutNumbers, #totalAmount)'); 

input.forEach(input =>{
    input.addEventListener('input', resizeInput);
    resizeInput.call(input); 
})



function resizeInput() {
    const workerName = document.getElementById("workerName");
    const cutNumber = document.getElementById("cutNumberInputID");
    const moneyAmountField = document.getElementById("moneyAmountFieldsID");


    workerName.style.width = (workerName.value.length ) + "ch";
    cutNumber.style.width = (cutNumber.value.length) + "ch";

    moneyAmountField.style.width = (moneyAmountField.value.length + 5) + "ch";

    this.style.width = (this.value.length + 20) + "ch";

}


function resizeAllInputs() {
    document.querySelectorAll('input:not(#fileUpload)').forEach(input => {
        resizeInput.call(input);
    });
}