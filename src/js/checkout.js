function calculateChange() {
    
    const totalAmount = 339.76; 
    const cashAmount = parseFloat(document.getElementById('cashAmount').value);
    const changeField = document.getElementById('change');

    
    if (!isNaN(cashAmount) && cashAmount >= totalAmount) {
       
        const change = (cashAmount - totalAmount).toFixed(2);
        changeField.value = `$${change}`;
    } else {
        
        changeField.value = 'Insufficient amount!';
    }
}
