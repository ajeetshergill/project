const loader=document.getElementById("loader"),navItems=document.querySelectorAll(".nav-section");function navigateTo(e){const t=document.getElementById(e);navItems.forEach((e=>{e.classList.contains("hidden")||e.classList.add("hidden")})),loader.classList.remove("hidden"),setTimeout((()=>{loader.classList.add("hidden")}),500),t.classList.add("z-20"),t.classList.remove("hidden")}function hideSwap(e,t){document.querySelector(e).style.visibility=t?"hidden":"visible"}let presalePasswordEntered=!0;function authenticatePresale(){if(!isUserConnected())return void showPasswordErrMsg("Login Required");const e=document.querySelector("#presale-password");if("PASSWORD"===e.value)return presalePasswordEntered=!0,atLogin(),showArenaLock(!1),void(e.innerHTML="");showPasswordErrMsg("Incorrect Password")}function showPasswordErrMsg(e){const t=document.querySelector("#password-error-msg");t.innerHTML=e,t.classList.remove("opacity-0"),t.classList.add("opacity-100"),setTimeout((()=>{const e=document.querySelector("#password-error-msg");e.classList.remove("opacity-100"),e.classList.add("opacity-0")}),500)}function showErrMsg(e,t,n){t.innerHTML=n,e.classList.remove("opacity-0"),e.classList.add("opacity-100"),setTimeout(hideErrMsg,500,e)}function hideErrMsg(e){e.classList.remove("opacity-100"),e.classList.add("opacity-0")}function showArenaLock(e){let t=document.querySelector("#arena-lock");t&&(e?t.classList.remove("hidden"):t.classList.add("hidden"))}const copyReferLinkBtns=document.querySelectorAll(".refer-link");async function populateReferrerLinkinHTML(e){let t=e;isUserConnected()&&(t=await getReferrer(e));document.querySelectorAll(".refer-referrer").forEach((e=>{e.innerHTML=t}));const n=document.querySelector("#add-referrer");"0x0000000000000000000000000000000000000000"===t?n.classList.remove("hidden"):n.classList.add("hidden")}async function getReferrer(e){let t={contractAddress:REFER_CONTRACT_ADDRESS_TESTNET,functionName:"getReferrer",abi:[{inputs:[{internalType:"address",name:"_user",type:"address"}],name:"getReferrer",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"}],params:{_user:e}};return await Moralis.executeFunction(t)}async function populateUserReferralsCount(e){let t=e;isUserConnected()&&(t=await getReferralsCount(e));document.querySelectorAll(".refer-total").forEach((e=>{e.innerHTML=t}))}async function getReferralsCount(e){let t={contractAddress:REFER_CONTRACT_ADDRESS_TESTNET,functionName:"getReferralsCount",abi:[{inputs:[{internalType:"address",name:"_userReferralsCount",type:"address"}],name:"getReferralsCount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],params:{_userReferralsCount:e}},n="";try{n=await Moralis.executeFunction(t)}catch(e){n="error-ln99-app",console.error(e)}return n}async function addReferrer(){const e=document.querySelector("#add-referrer-address"),t=document.querySelector("#add-referrer-err"),n=document.querySelector("#add-referrer-msg");if(e.value)if(e.value.length<=6)showErrMsg(t,n,"Invalid Address!");else try{let t=await setReferAddress(e.value);populateReferrerLinkinHTML(getUserWalletAddress()),console.log(t)}catch(e){console.error(e),showErrMsg(t,n,"Invalid Address!!!")}else showErrMsg(t,n,"Empty Field!")}async function setReferAddress(e){console.log(`setReferAddress to - ${e}`);let t,n={contractAddress:REFER_CONTRACT_ADDRESS_TESTNET,functionName:"addReferAddress",abi:[{inputs:[{internalType:"address",name:"referAddress",type:"address"}],name:"addReferAddress",outputs:[],stateMutability:"nonpayable",type:"function"}],params:{referAddress:e}};try{await Moralis.enableWeb3(),t=await Moralis.executeFunction(n)}catch(e){console.error(e)}return await t.wait()}async function populateUserReferralComissions(e){let t=e;isUserConnected()&&(t=await getTotalReferralCommissions(e));document.querySelectorAll(".refer-earning").forEach((e=>{e.innerHTML=t}))}async function getTotalReferralCommissions(e){let t={contractAddress:REFER_CONTRACT_ADDRESS_TESTNET,functionName:"getTotalReferralCommissions",abi:[{inputs:[{internalType:"address",name:"_userCommission",type:"address"}],name:"getTotalReferralCommissions",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],params:{_userCommission:e}};return await Moralis.executeFunction(t)}function copyReferLink(){let e=`url/${getUserWalletAddress()}`;populateReferralLinkinHTML(e),navigator.clipboard.writeText(e)}function populateReferralLinkinHTML(e){document.querySelectorAll(".refer-link-text").forEach((t=>{t.innerHTML=e}))}copyReferLinkBtns.forEach((e=>e.onclick=copyReferLink));const serverUrl="https://cbdyvlhyonhj.usemoralis.com:2053/server",appId="PC04t9NTMGlWn2p5EGf8ukAZbNaZbA1PWrv7IlaC",CONTRACT_ADDRESS_TESTNET="0xf8992AE362561427602A50aff0f84085d1fd88f7",REFER_CONTRACT_ADDRESS_TESTNET="0xfe2E124FE1418419A9efd8Ba987Fa1769D506c8a",referABI=[{inputs:[{internalType:"address",name:"_user",type:"address"}],name:"getReferrer",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"referralsCount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"totalReferralCommissions",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],referOptions={contractAddress:REFER_CONTRACT_ADDRESS_TESTNET,abi:referABI};let currentChainIdHex;try{Moralis.start({serverUrl:serverUrl,appId:appId})}catch(e){console.log(e)}const walletOptions=document.getElementById("wallet-options"),loginBtn=document.getElementById("web3-login-mm"),logoutBtn=document.getElementById("web3-logout"),showTokenBtn=document.getElementById("web3-tokens"),showAddress=document.getElementById("web3-wallet-address");let web3=new Web3(Web3.givenProvider||"ws://localhost:8545");async function login(e){let t=Moralis.User.current();t||(t="walletconnect"===e?await Moralis.Web3.authenticate({provider:"walletconnect"}):await Moralis.Web3.authenticate(),currentChainIdHex=await Moralis.switchNetwork("0x61")),currentChainIdHex=await Moralis.getChainId(),await Moralis.enableWeb3(),atLogin(),showAddress.dataset.tip=t.get("ethAddress"),getBalance(currentChainIdHex,t.get("ethAddress"))}function getUserWalletAddress(){return isUserConnected()?Moralis.User.current().get("ethAddress"):"Logged Out"}function isUserConnected(){return!!Moralis.User.current()}async function logOut(){await Moralis.User.logOut(),atLogout()}function atLogout(){presalePasswordEntered=!1,populateReferralLinkinHTML("Logged Out"),populateReferrerLinkinHTML("Logged Out"),populateUserReferralComissions("0"),populateUserReferralsCount(0);document.querySelector("#add-referrer").classList.add("hidden"),toggleBtnVisibility(!1),showAddress.dataset.tip="Wallet not connected",showArenaLock(!0)}function atLogin(){let e=getUserWalletAddress();presalePasswordEntered&&(populateReferralLinkinHTML(`url/${e}`),populateReferrerLinkinHTML(e),populateUserReferralComissions(e),populateUserReferralsCount(e)),toggleBtnVisibility(!0)}async function getBalance(e,t){const n=document.getElementById("token-list");currentChainIdHex=await Moralis.getChainId();let r=Moralis.User.current().get("ethAddress");const s={chain:e||currentChainIdHex||"0x38",address:t||r||"0x9d51fd1a308c073f2f06a7181ad90c6d6ab5e9d7"},a=await Moralis.Web3API.account.getNativeBalance(s);n.innerHTML=`<li class="pr-2 flex justify-between w-full md:w-1/2 mx-auto mt-2"><span class="w-1/2 text-center">${HEX_TO_CHAIN_DETAILS[currentChainIdHex].nativeToken}</span><span class="w-1/2 text-left">${web3.utils.fromWei(a.balance)}</span></li>`;const o=await Moralis.Web3API.account.getTokenBalances(s);o.length?o.forEach((e=>{if("USDC"==e.symbol||"BUSD"==e.symbol||"IBAT"==e.symbol){const t=convertTokenBalance(e.balance,e.decimals);n.innerHTML+=`<li class="pr-2 flex justify-between w-full md:w-1/2 mx-auto"><span class="w-1/2 text-center">${e.symbol}</span><span class="w-1/2 text-left">${t}</span></li>`}})):n.innerHTML+='<li class="w-full text-center mx-auto text-xs opacity-80 mt-2">no other tokens available</li>'}function toggleBtnVisibility(e){const t=document.querySelectorAll(".wallet-options-btn ");e?(t.forEach((e=>{e.classList.add("hidden")})),logoutBtn.classList.remove("hidden"),showTokenBtn.classList.remove("hidden")):(t.forEach((e=>{e.classList.remove("hidden")})),logoutBtn.classList.add("hidden"),showTokenBtn.classList.add("hidden"))}function convertTokenBalance(e,t){let n=0==e?0:e/Math.pow(10,t);return n=n<.001?0:n,n}async function isPresaleOpen(){await Moralis.enableWeb3();await readFunction("isPresaleOpen",[{inputs:[],name:"isPresaleOpen",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"}])}async function readFunction(e,t){let n={contractAddress:CONTRACT_ADDRESS_TESTNET,functionName:e,abi:t};return await Moralis.executeFunction(n)}function getBuyAmount(){let e=0;return document.querySelectorAll(".buy-amount").forEach((t=>{t.value&&(e=+t.value)})),e}async function buyToken(){let e=getBuyAmount();if(await Moralis.enableWeb3(),!isUserConnected())return void console.log("User not Logged in - connect wallet");let t,n={contractAddress:CONTRACT_ADDRESS_TESTNET,functionName:"buyToken",abi:[{inputs:[],name:"buyToken",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"payable",type:"function"}],msgValue:Moralis.Units.ETH(e)};try{t=await Moralis.executeFunction(n)}catch(e){document.getElementById("buy-token-error-msg").innerHTML=e.data.message,toggleErrMsg()}}function toggleErrMsg(){const e=document.getElementById("buy-token-error-input");e.checked=!e.checked}loginBtn.onclick=login,logoutBtn.onclick=logOut;const HEX_TO_CHAIN_DETAILS={"0x1":{chain:"ETH",nativeToken:"ETH"},"0x61":{chain:"BSC",nativeToken:"BNB"},"0x38":{chain:"BSC",nativeToken:"BNB"}};
//# sourceMappingURL=dapp.864c79eb.js.map
