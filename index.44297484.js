window.onload=async function(){if(populateAmountRaisedinHTMLDB(),await isWeb3Installed()){WEB3_INSTALLED=!0,console.log("dev:onload"),console.log("dev: web3 installed  - checking if user is connected upon refreshing");try{console.log("dev: onload - enabling web3"),await Moralis.enableWeb3(),console.log("dev: onload - enabled web3")}catch(e){console.error(e),console.error("dev: onload - failed to enable web3")}isUserConnected()&&(console.log("dev: Page-refreshed - User already connected"),login()),console.log("dev: Page-refreshed - User not connected")}else if(!WEB3_INSTALLED&&await isUserConnected()){try{console.log("dev: onload - enabling web3"),await Moralis.enableWeb3({provider:"walletconnect"}),console.log("dev: onload - enabled web3")}catch(e){console.error(e),console.error("dev: onload - failed to enable web3")}isUserConnected()&&(console.log("dev: Page-refreshed - User already connected"),login("walletconnect")),console.log("dev: Page-refreshed - User not connected")}};const TEST_ENVIRONMENT=!1,REFER_CONTRACT_ADDRESS_TESTNET="0xfe2E124FE1418419A9efd8Ba987Fa1769D506c8a",REFER_CONTRACT_ADDRESS_MAINNET="0x5832E385f633b30519B3ECaDE3C5eD3d9881cf58",DEPLOYED_CONTRACT_ADDRESS=REFER_CONTRACT_ADDRESS_MAINNET;console.log(`Deployed Presale Contract is ${DEPLOYED_CONTRACT_ADDRESS}`);const CONFIRMATIONS_ON_BSC=5;let WEB3_INSTALLED=!1;const serverUrl_Testnet="https://gusm6vrpbwtk.usemoralis.com:2053/server",appId_Testnet="glRYjrZo9XjLE2MPc7sWgzc4PyoFs3RbmyoNiPbf";let currentChainIdHex,serverUrl="https://gb6gwydcjjw6.usemoralis.com:2053/server",appId="Zq3s8magh8mlppfXIGSHZRdLj49LlCnIaqs2mD2U";try{console.info("starting server - mainnet "),Moralis.start({serverUrl:serverUrl,appId:appId})}catch(e){console.error("Server failed to start -ln-34"),console.log(e)}const walletOptions=document.getElementById("wallet-options"),loginBtn=document.getElementById("web3-login-mm"),logoutBtn=document.getElementById("web3-logout"),buyBtn=document.getElementById("buy_btn"),showTokenBtn=document.getElementById("web3-tokens"),BscChainIdMain=56,BscChainIdTest=97,showAddress=document.getElementById("web3-wallet-address"),NODE_URL_TESTNET="https://speedy-nodes-nyc.moralis.io/7569a2c3fc822716349963c8/bsc/testnet",NODE_URL_MAINNET="https://speedy-nodes-nyc.moralis.io/7569a2c3fc822716349963c8/bsc/mainnet",userEnteredPassword=document.querySelector("#presale-password");function atLogin(){let e=getUserWalletAddress();let o=`https://presale.battleinfinity.io/?refercode=${e}`;userEnteredPassword||(presalePasswordEntered=!0),manageTooltipWidth(),toggleConnectStatus();const t=document.querySelector("#second-login-btn");disableButton(t),t.setAttribute("for","");try{console.log("start - populateReferralLinkinHTML .."),populateReferralLinkinHTML(o),console.log("done - populateReferralLinkinHTML ")}catch(e){console.error("failed - populateReferralLinkinHTML")}try{console.log("start - populateReferrerinHTML .."),populateReferrerinHTML(e),console.log("done - populateReferrerinHTML")}catch(e){console.error("failed - populateReferrerinHTML")}try{console.log("start - populateUserReferralComissions"),populateUserReferralComissions(e),console.log("done - populateUserReferralComissions")}catch(e){console.error("failed - populateUserReferralComissions")}try{console.log("start - populateUserReferralsCount"),populateUserReferralsCount(e),console.log("done - populateUserReferralsCount")}catch(e){console.error("failed - populateUserReferralsCount")}try{console.log("start - populateUsersInvestments"),populateUsersInvestments(e),console.log("done - populateUsersInvestments")}catch(e){console.error("failed - populateUsersInvestments")}try{updateBNBRaised()}catch(e){console.error("failed - updateBNBRaised - atlogin")}isUserConnected()&&toggleBtnVisibility(!0)}async function updateBNBRaised(){let e=await getTotalBNBAmount();e=+e.toFixed(2);let o="";try{o=percentageOfBNBRaised(e,16500)}catch(e){console.error("dev: percentageOfBNBRaised() issue")}console.log(`raisedAmount = ${e}`),console.log(`raisedAmountPercentage = ${o}`),updateRaisedBNBinDB(e,o)}function manageTooltipWidth(){if(document.querySelector("#web3-wallet-address")){if(isUserConnected())return console.log("setting left to : 0"),void showAddress.style.setProperty("--custom-tooltip-left","0px");console.log("setting left to : negative"),showAddress.style.setProperty("--custom-tooltip-left","-100px")}else console.error("tooltips missing")}async function addNetwork(e){const o=e,t="BNB Smart Chain Mainnet",n=NODE_URL_MAINNET,s="https://bscscan.com/";console.log("BscChainId-chainName-rpcUrl-blockexplorer"),console.log(`${o}-${t}-${n}-${s}`),await Moralis.addNetwork(o,t,"BNB","BNB",n,s)}async function switchAndAdd(e="0x61"){console.log("switchAndAdd - toChainid"),console.log(e);try{await switchNetwork(e)}catch(o){await addNetwork(e)}}async function switchNetwork(e="0x61"){currentChainIdHex=await Moralis.switchNetwork(e)}async function login(e){let o=Moralis.User.current();if(!o)if(console.log(`Provider :${e}`),"walletconnect"===e){console.info("Authenticating with WalletConnect");try{Moralis.isEnablingWeb3&&await Moralis.deactivateWeb3(),o=await Moralis.authenticate({provider:"walletconnect",signingMessage:"Battle Infinity Authentication: WalletConnect"}),console.info(`Enabling Web3 - ${e}`)}catch(e){console.error(e),console.error("dev:Authentication Failed - Walletconnect - login()")}}else try{if(console.info("Authenticating with MetaMask"),currentChainIdHex=await Moralis.getChainId(),console.log(`Current chain -${currentChainIdHex}`),console.log("BSC chain -56"),56!==currentChainIdHex){console.log("NOT - Connecting"),console.log("Current chain - Bsc"),console.log(`${currentChainIdHex} - 56`);try{console.log("dev: login metamask - enabling web3 for switching chain"),await Moralis.enableWeb3(),console.log("dev: login metamask - enabled web3 for switching chain")}catch(e){console.error(e),console.error("dev: login metamask - failed to enable web3 for switching chain")}await switchAndAdd(56)}o=await Moralis.authenticate({signingMessage:"Battle Infinity Authentication"});try{hitDataLayer(getUserWalletAddress())}catch(e){console.error("dev:couldn't hit data layer")}}catch(e){console.error(e),console.error("dev:Authentication Failed - MetaMask")}try{currentChainIdHex=await Moralis.getChainId()}catch(e){console.error(e),console.error("dev:getChainId() Failed - login()")}console.log("Battle Infinity Authentication - signing msg"),isUserConnected()&&(console.log("IBAT Authentication - userconnected"),atLogin(),showAddress.dataset.tip=o.get("ethAddress"),showAddress.style.setProperty("--custom-tooltip-left","0px"))}function getUserWalletAddress(){return isUserConnected()?Moralis.User.current().get("ethAddress"):"Wallet not connected"}function isUserConnected(){return!!Moralis.User.current()}async function logOut(){try{await updateBNBRaised()}catch(e){console.error("dev:failed - updateBNBRaised - logOut()")}try{await Moralis.deactivateWeb3()}catch(e){console.error("dev:failed Moralis.deactivateWeb3();")}await Moralis.User.logOut(),console.log("logged out"),await atLogout()}async function atLogout(){userEnteredPassword&&(presalePasswordEntered=!1);try{populateReferralLinkinHTML("Wallet not connected")}catch(e){console.error(e)}try{populateReferrerinHTML("Wallet not connected")}catch(e){console.error(e)}try{populateUserReferralComissions("0")}catch(e){console.error(e)}try{populateUserReferralsCount(0)}catch(e){console.error(e)}try{populateUsersInvestments("0")}catch(e){console.error("failed - populateUsersInvestments")}manageTooltipWidth(),toggleConnectStatus();const e=document.querySelector("#second-login-btn");enableButton(e),e.setAttribute("for","wallets");const o=document.querySelector("#add-referrer");o&&o.classList.add("hidden"),toggleBtnVisibility(!1),showAddress.dataset.tip="Wallet not connected";try{setPresalePassword&&setPresalePassword()}catch(e){console.error("dev:setPresalePassword(); not defined")}try{showArenaLock&&showArenaLock(!0)}catch(e){console.error("dev:showArenaLock(); not defined")}const t=document.getElementById("add-referrer-btn"),n=document.getElementById("add-referrer-address");enableButton(t),enableButton(n);try{console.log("dev: atlogout - enabling web3"),await Moralis.enableWeb3(),console.log("dev: atlogout - enabled web3")}catch(e){console.error(e),console.error("dev: atlogout - failed to enable web3")}}function toggleBtnVisibility(e){const o=document.querySelectorAll(".wallet-options-btn ");e?(o.forEach((e=>{e.classList.add("hidden")})),logoutBtn&&logoutBtn.classList.remove("hidden"),showTokenBtn&&showTokenBtn.classList.remove("hidden")):(o?o.forEach((e=>{e.classList.remove("hidden")})):console.error("ln:249-Invalid Arguments"),logoutBtn&&logoutBtn.classList.add("hidden"),showTokenBtn&&showTokenBtn.classList.add("hidden"))}function toggleConnectStatus(){const e=document.querySelectorAll(".connectivity-status");e&&e.forEach((e=>{isUserConnected()?(e.classList.remove("bg-red-400"),e.style.background="#4ade80",e.innerHTML="connected"):(e.style.background="#f87171",e.innerHTML="not connected")}))}function convertTokenBalance(e,o){let t=0==e?0:e/Math.pow(10,o);return t=t<.001?0:t,t}async function isPresaleOpen(){return await readFunction("isPresaleOpen",[{inputs:[],name:"isPresaleOpen",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"}])}async function readFunction(e,o){let t={contractAddress:DEPLOYED_CONTRACT_ADDRESS,functionName:e,abi:o};return await Moralis.executeFunction(t)}function getBuyAmount(){let e=0;return document.querySelectorAll(".buy-amount").forEach((o=>{o.value&&(e=+o.value)})),console.log("buyAmount = "),console.log(+e),e}async function buyToken(){const e=+getBuyAmount(),o=document.getElementById("buy-token-error-con"),t=document.getElementById("buy-token-error-msg");let n="Error";if(!isUserConnected())return console.log("User not Logged in - connect wallet"),n="Wallet not connected",void showErrMsg(o,t,n);const s=await isPresaleOpen();if(console.log(`sale open - ${s}`),!s)return console.log("Presale is not open"),n="Presale has not yet started !!!",void showErrMsg(o,t,n);if(console.log(getUserWalletAddress()),console.log("0xc8179e6927b61a4fdc3e5a2db14e641e51b9ad83"!==getUserWalletAddress()),"0xc8179e6927b61a4fdc3e5a2db14e641e51b9ad83"!==getUserWalletAddress()&&+e<.1)return n="Minimum BNB Amount should be 0.1BNB",void showErrMsg(o,t,n);let r={contractAddress:DEPLOYED_CONTRACT_ADDRESS,functionName:"buyToken",abi:[{inputs:[],name:"buyToken",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"payable",type:"function"}],msgValue:Moralis.Units.ETH(e)};try{let o=getUserWalletAddress();console.log("Transaction started"),swapAmountDataLayer(o);const t=await Moralis.executeFunction(r);confirmTransactionDataLayer(o),console.log("Transaction finished"),console.log("Transaction"),console.log(t);const n=await t.wait(5);console.log("Result"),console.log(n.transactionHash),console.log(n),alert("✅Transaction Successful✅\nPlease Import token and check your wallet.");let s=calculateIBATAmount(e);n&&swapSuccessfulDataLayer(o,n.transactionHash,e,s),console.log(`Add: ${o} \n tID: ${n.transactionHash} \n BNB: ${e} \nIBAT: ${s}`)}catch(e){console.log("Transaction cancelled");try{if(e.message&&(console.log("log- -"),console.log(e.message),n=e.message,n.includes("User denied transaction signature")))return n="Transaction declined by User",void showErrMsg(o,t,n)}catch(e){console.error("dev:insuffiecient funds error")}n="Insufficient BNB in wallet",showErrMsg(o,t,n)}}async function getTotalBNBAmount(){let e={contractAddress:DEPLOYED_CONTRACT_ADDRESS,functionName:"totalBNBAmount",abi:[{inputs:[],name:"totalBNBAmount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}]},o=await Moralis.executeFunction(e);return o/=Math.pow(10,DECIMALS),o}async function populateAmountRaisedinHTML(){console.log("populateAmountRaisedinHTML-switchAndAdd-chainId-56"),await switchAndAdd(56),console.log("ran - populateAmountRaisedinHTML");let e=await getTotalBNBAmount();e=+e.toFixed(2),console.log(`raisedAmount = ${e}`);let o="";try{o=percentageOfBNBRaised(e,16500)}catch(e){console.error("dev: percentageOfBNBRaised() issue")}console.log(`raisedAmount = ${e}`),console.log(`setting % = ${o}`);const t=document.querySelectorAll(".sale-progress");t&&t.forEach((e=>{let t=o;t<1&&(t=1),e.value=t}));const n=document.querySelectorAll(".sale-progress-amount");n&&n.forEach((o=>{o.innerHTML=e}));const s=document.querySelectorAll(".sale-progress-percentage");s&&s.forEach((e=>{e.innerHTML=o}));document.querySelectorAll(".sale-progress-val-parent").forEach((e=>{let t=+o-3;t>=94&&(t=94);t<=0&&(t=0),e.style.left=`${t}%`}));document.querySelectorAll(".sale-progress-val-parent-mob").forEach((e=>{let t=+o-3;t>=65&&(t=65);t<=0&&(t=0),e.style.left=`${t}%`}))}function toggleErrMsg(){const e=document.getElementById("buy-token-error-input");e.checked=!e.checked}async function isWeb3Installed(){const e=window.ethereum;let o=!0;return e&&e.on||(console.log("dev:isWeb3Installed - Metamask not installed"),o=!1),o}buyBtn?buyBtn.onclick=buyToken:console.error("Login button missing in UI"),loginBtn?loginBtn.onclick=login:console.error("Login button missing in UI"),logoutBtn?logoutBtn.onclick=logOut:console.error("Logout button missing in UI");const HEX_TO_CHAIN_DETAILS={"0x1":{chain:"ETH",nativeToken:"ETH"},"0x61":{chain:"tBSC",nativeToken:"tBNB"},"0x38":{chain:"BSC",nativeToken:"BNB"}};
//# sourceMappingURL=index.44297484.js.map
