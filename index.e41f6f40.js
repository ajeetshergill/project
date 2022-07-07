const copyReferLinkBtns=document.querySelectorAll(".refer-link"),DECIMALS=18,defaultReferrer="0x0000000000000000000000000000000000000000";async function populateReferrerinHTML(e){console.log(`populateReferrerinHTML - ${e}`);let t=e;isUserConnected()&&(t=await getReferrer(e));const r=document.querySelector(".refer-referrer");console.log("dev:Setting Referrer Field"),r?r.value=t:console.error("dev:referrerField missing");const n=document.querySelector("#add-referrer");n&&(t===defaultReferrer?n.classList.remove("hidden"):n.classList.add("hidden"));const s=document.getElementById("add-referrer-btn"),o=document.getElementById("add-referrer-address");t!==defaultReferrer&&(disableButton(s),disableButton(o))}async function getTotalBnbAMount(){await Moralis.enableWeb3();let e=await readFunction("totalBNBAmount",[{inputs:[],name:"totalBNBAmount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}]);e/=Math.pow(10,15),console.log("Raised Amount is"),console.log(e)}async function getReferrer(e){let t={contractAddress:REFER_CONTRACT_ADDRESS_TESTNET,functionName:"getReferrer",abi:[{inputs:[{internalType:"address",name:"_user",type:"address"}],name:"getReferrer",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"}],params:{_user:e}};return await Moralis.executeFunction(t)}async function populateUserReferralsCount(e){let t=e;isUserConnected()&&(t=await getReferralsCount(e));const r=document.querySelectorAll(".refer-total");r&&r.forEach((e=>{e.innerHTML=t}))}async function getReferralsCount(e){let t={contractAddress:REFER_CONTRACT_ADDRESS_TESTNET,functionName:"getReferralsCount",abi:[{inputs:[{internalType:"address",name:"_userReferralsCount",type:"address"}],name:"getReferralsCount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],params:{_userReferralsCount:e}},r="";try{r=await Moralis.executeFunction(t)}catch(e){r="error-ln99-app",console.error(e)}return r}async function addReferrer(){const e=document.querySelector("#add-referrer-address"),t=document.querySelector("#buy-token-error-con"),r=document.querySelector("#buy-token-error-msg");if(e&&!e.value)return void showErrMsg(t,r,"Empty Referrer Address Field!");if(e&&e.value.length<=6)return void showErrMsg(t,r,"Invalid Address!");if(isUserConnected){if(await Moralis.enableWeb3(),!isUserConnected())return void showErrMsg(t,r,"Wallet not connected!")}else console.error("referrerAddress#add-referrer-address missing");const n=document.querySelector(".refer-referrer").value;if(console.log(n),console.log(n!==defaultReferrer),console.log(defaultReferrer),n!==defaultReferrer)return console.log(`======= ${n}`),void showErrMsg(t,r,"Referrer Address already setup!");try{let t=await setReferAddress(e.value);populateReferrerinHTML(getUserWalletAddress()),console.log(t)}catch(e){console.error(e),showErrMsg(t,r,"Invalid Address!!!")}}async function setReferAddress(e){console.log(`setReferAddress to - ${e}`);let t,r={contractAddress:REFER_CONTRACT_ADDRESS_TESTNET,functionName:"addReferAddress",abi:[{inputs:[{internalType:"address",name:"referAddress",type:"address"}],name:"addReferAddress",outputs:[],stateMutability:"nonpayable",type:"function"}],params:{referAddress:e}};try{t=await Moralis.executeFunction(r)}catch(e){console.error(e)}return await t.wait()}async function populateUserReferralComissions(e){console.log(`Getting commission of: ${e}`);let t=e;isUserConnected()&&(t=await getTotalReferralCommissions(e)),t/=Math.pow(10,18);const r=document.querySelectorAll(".refer-earning");r&&r.forEach((e=>{console.log(`Setting commission to: ${t}`),e.innerHTML=`${t} IBAT`}))}async function getTotalReferralCommissions(e){let t={contractAddress:REFER_CONTRACT_ADDRESS_TESTNET,functionName:"getTotalReferralCommissions",abi:[{inputs:[{internalType:"address",name:"_userCommission",type:"address"}],name:"getTotalReferralCommissions",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],params:{_userCommission:e}};return await Moralis.executeFunction(t)}async function populateUsersInvestments(e){console.log(`Getting commission of: ${e}`);let t=e;isUserConnected()&&(t=await getUsersInvestments(e)),t/=Math.pow(10,18);const r=document.querySelectorAll(".user-investment");r&&r.forEach((e=>{console.log(`Setting investment to: ${t}`),e.innerHTML=`${t} IBAT`}))}const refreshUsersInvestmentBtn=document.getElementById("refreshUsersInvestmentsBtn");function refreshUsersInvestments(){if(console.log("refresh usersInvestments"),isUserConnected())try{populateUsersInvestments(getUserWalletAddress())}catch(e){console.error("failed refresh after buying - populateUsersInvestments")}}async function getUsersInvestments(e){let t={contractAddress:REFER_CONTRACT_ADDRESS_TESTNET,functionName:"usersInvestments",abi:[{inputs:[{internalType:"address",name:"",type:"address"}],name:"usersInvestments",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{stateMutability:"payable",type:"receive"}],params:{"":e}};return await Moralis.executeFunction(t)}function copyReferLink(){let e=`https://presale.battleinfinity.io/?refercode=${getUserWalletAddress()}`;populateReferralLinkinHTML(e),navigator.clipboard.writeText(e)}function populateReferralLinkinHTML(e){const t=document.querySelectorAll(".refer-link-text");t&&t.forEach((t=>{t.innerHTML=e,t.value=e}))}refreshUsersInvestmentBtn?refreshUsersInvestmentBtn.onclick=refreshUsersInvestments:console.error("Refresh UserInvestmentBtn missing in UI"),copyReferLinkBtns.forEach((e=>e.onclick=copyReferLink));
//# sourceMappingURL=index.e41f6f40.js.map
