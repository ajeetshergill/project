function showErrMsg(t,e,n){t&&e?(e.innerHTML=n,t.classList.remove("opacity-0"),t.classList.add("opacity-100"),setTimeout(hideErrMsg,1e3,t)):console.error("Invalid Arguments - showErrMsg()")}function hideErrMsg(t){t?(t.classList.add("opacity-0"),t.classList.remove("opacity-100")):console.error("hideErrMsg:Invalid Arguments")}function disableButton(t){t.classList.add("disable-btn")}function enableButton(t){t.classList.remove("disable-btn")}function percentageOfBNBRaised(t=1700){const e=t/7e3*100;return+(Math.round(100*e)/100)}function updateProgressBar(t){document.querySelectorAll(".sale-progress").forEach((t=>{t.value=percentageOfBNBRaised()}))}const IBAT_PER_BNB=156250,ibatAmount=document.querySelector("#ibat-amount"),BNBAmount=document.querySelector("#bnb-amount");function populateIBATAmount(){ibatAmount.value=calculateIBATAmount(BNBAmount.value)}function calculateIBATAmount(t){return 156250*t}function populateBNBAmount(){BNBAmount.value=calculateBNBAmount(ibatAmount.value)}function calculateBNBAmount(t){return+t/156250}BNBAmount.onkeyup=populateIBATAmount,ibatAmount.onkeyup=populateBNBAmount;
//# sourceMappingURL=index.f449fb06.js.map
