var pastCalculations = [];

    function calculateTax() {
        var amount = parseFloat(document.getElementById('amount').value);
        var calculationMethod = document.getElementById('calculationMethod').value;
        var gst = parseFloat(document.getElementById('gst').value) || 0;
        var pst = parseFloat(document.getElementById('pst').value) || 0;
        var hst = parseFloat(document.getElementById('hst').value) || 0;
        
        var netAmount;
        if (calculationMethod === 'net') {
            netAmount = amount;
        } else if (calculationMethod === 'gross') {
            netAmount = amount / (1 + (gst / 100) + (pst / 100) + (hst / 100));
        }

        var gstResult = netAmount * (gst / 100);
        var pstResult = netAmount * (pst / 100);
        var hstResult = netAmount * (hst / 100);
        var totalResult = netAmount + gstResult + pstResult + hstResult;

        document.getElementById('netResult').textContent = netAmount.toFixed(2);
        document.getElementById('gstResult').textContent = gstResult.toFixed(2);
        document.getElementById('pstResult').textContent = pstResult.toFixed(2);
        document.getElementById('hstResult').textContent = hstResult.toFixed(2);
        document.getElementById('totalResult').textContent = totalResult.toFixed(2);

        // Save the calculation
        var calculation = {
            calculationMethod: calculationMethod,
            netAmount: netAmount.toFixed(2),
            gstResult: gstResult.toFixed(2),
            pstResult: pstResult.toFixed(2),
            hstResult: hstResult.toFixed(2),
            totalResult: totalResult.toFixed(2)
        };
        pastCalculations.unshift(calculation);
        updatePastCalculations();
    }

    function updatePastCalculations() {
        var pastCalculationsContainer = document.getElementById('pastCalculations');
        pastCalculationsContainer.innerHTML = '';
        pastCalculations.forEach(function(calculation) {
            var calculationElement = document.createElement('div');
            calculationElement.innerHTML = `
                <p>Calculation Method: ${calculation.calculationMethod}</p>
                <p>Net Amount: ${calculation.netAmount}</p>
                <p>GST: ${calculation.gstResult}</p>
                <p>PST: ${calculation.pstResult}</p>
                <p>HST: ${calculation.hstResult}</p>
                <p>Total Amount: ${calculation.totalResult}</p>
                <hr>
            `;
            pastCalculationsContainer.appendChild(calculationElement);
        });
    }