// let transactionInProgress = false
function showTransactionLoader(isTransactionInProgress) {
    // const container = document.querySelector
    transactionText = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="26.349px" height="26.35px" viewBox="0 0 26.349 26.35" fill="#fff" style="margin-right: 6px; margin-top:-2px;" xml:space="preserve" class="rotate"><g><circle cx="13.792" cy="3.082" r="3.082" /><circle cx="13.792" cy="24.501" r="1.849" /><circle cx="6.219" cy="6.218" r="2.774" /><circle cx="21.365" cy="21.363" r="1.541" /><circle cx="3.082" cy="13.792" r="2.465" /><circle cx="24.501" cy="13.791" r="1.232" /><path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05 C6.902,18.996,5.537,18.988,4.694,19.84z" /><circle cx="21.364" cy="6.218" r="0.924" /></g></svg>Transaction in progress`;
    if (isTransactionInProgress) {
        // show loader
        buyBtn.onclick = '';
        buyBtn.innerHTML = `${transactionText}`;
    } else {
        // hide loader
        buyBtn.onclick = buyToken;
        buyBtn.innerHTML = 'Buy IBAT'
    }

}

/**
 * Don't forget to add these styles
 * @keyframes rotate {
                from {
                    -webkit-transform: rotate(0deg);
                }

                to {
                    -webkit-transform: rotate(360deg);
                }
            }

            svg.rotate {
                animation-name: rotate;
                animation-duration: 2s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }
 */