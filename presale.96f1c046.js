const serverUrl="https://gusm6vrpbwtk.usemoralis.com:2053/server",appId="glRYjrZo9XjLE2MPc7sWgzc4PyoFs3RbmyoNiPbf",CONTRACT_ADDRESS_TESTNET="0xf8992AE362561427602A50aff0f84085d1fd88f7",REFER_CONTRACT_ADDRESS_TESTNET="0xfe2E124FE1418419A9efd8Ba987Fa1769D506c8a",referABI=[{inputs:[{internalType:"address",name:"_user",type:"address"}],name:"getReferrer",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"referralsCount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"totalReferralCommissions",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],referOptions={contractAddress:REFER_CONTRACT_ADDRESS_TESTNET,abi:referABI};let currentChainIdHex;try{console.info("starting server - ln-30 "),Moralis.start({serverUrl:serverUrl,appId:appId})}catch(e){console.error("Server failed to start -ln-34"),console.log(e)}const walletOptions=document.getElementById("wallet-options"),loginBtn=document.getElementById("web3-login-mm"),logoutBtn=document.getElementById("web3-logout"),showTokenBtn=document.getElementById("web3-tokens"),showAddress=document.getElementById("web3-wallet-address");let web3=new Web3(Moralis.provider||Web3.givenProvider);const NODE_URL="https://speedy-nodes-nyc.moralis.io/d633c685eb50e4bb5f7bdcf8/bsc/testnet";let provider=new Web3.providers.HttpProvider(NODE_URL);const userEnteredPassword=document.querySelector("#presale-password");function atLogin(){let e=getUserWalletAddress();let t=`https://battleinfinstg.wpengine.com/BattleTeam/dapp.php?refercode=${e}`;if(userEnteredPassword||(presalePasswordEntered=!0),userEnteredPassword&&presalePasswordEntered){try{console.log("start - populateReferralLinkinHTML ... ln-65"),populateReferralLinkinHTML(t),console.log("done - populateReferralLinkinHTML ...")}catch(e){console.error("failed - populateReferralLinkinHTML ... ln-69")}try{console.log("start - populateReferrerLinkinHTML ... ln-72"),populateReferrerLinkinHTML(e),console.log("done - populateReferrerLinkinHTML")}catch(e){console.error("failed - populateReferrerLinkinHTML ... ln-76")}try{console.log("start - populateUserReferralComissions ... ln-79"),populateUserReferralComissions(e),console.log("done - populateUserReferralComissions")}catch(e){console.error("failed - populateUserReferralComissions ... ln-83")}try{console.log("start - populateUserReferralsCount ... ln-86"),populateUserReferralsCount(e),console.log("done - populateUserReferralsCount")}catch(e){console.error("failed - populateUserReferralsCount ... ln-90")}}isUserConnected()&&toggleBtnVisibility(!0)}async function login(e){let t=Moralis.User.current();if(!t)if(console.log(`Provider :${e} -ln-108`),"walletconnect"===e)try{console.info("Authenticating with WalletConnect ... ln-113"),t=await Moralis.authenticate({provider:"walletconnect"}),console.info(`Enabling Web3 - ${e}... ln-128`),await Moralis.enableWeb3({provider:"walletconnect"})}catch(e){console.error("Authentication Failed - Walletconnect - ln-118"),console.error(e)}else try{console.info("Authenticating with MetaMask... ln-123"),t=await Moralis.authenticate(),console.info("Enabling Web3 - Metamask... ln-125"),await Moralis.enableWeb3(),currentChainIdHex=await Moralis.switchNetwork("0x61")}catch(e){console.error("Authentication Failed - MetaMask"),console.error(e)}currentChainIdHex=await Moralis.getChainId(),isUserConnected()&&(atLogin(),showAddress.dataset.tip=t.get("ethAddress"),getBalance(currentChainIdHex,t.get("ethAddress")))}function getUserWalletAddress(){return isUserConnected()?Moralis.User.current().get("ethAddress"):"Logged Out"}function isUserConnected(){return!!Moralis.User.current()}async function logOut(){await Moralis.User.logOut(),console.log("logged out"),atLogout()}function atLogout(){userEnteredPassword&&(presalePasswordEntered=!1);try{populateReferralLinkinHTML("Logged Out")}catch(e){console.error(e)}try{populateReferrerLinkinHTML("Logged Out")}catch(e){console.error(e)}try{populateUserReferralComissions("0")}catch(e){console.error(e)}try{populateUserReferralsCount(0)}catch(e){console.error(e)}const e=document.querySelector("#add-referrer");e&&e.classList.add("hidden"),toggleBtnVisibility(!1),showAddress.dataset.tip="Wallet not connected",setPresalePassword(),showArenaLock(!0)}async function getBalance(e,t){const n=document.getElementById("token-list");currentChainIdHex=await Moralis.getChainId();let o=Moralis.User.current().get("ethAddress");const r={chain:e||currentChainIdHex||"0x38",address:t||o||"0x9d51fd1a308c073f2f06a7181ad90c6d6ab5e9d7"},s=await Moralis.Web3API.account.getNativeBalance(r);n&&(n.innerHTML=`<li class="pr-2 flex justify-between w-full md:w-1/2 mx-auto mt-2"><span class="w-1/2 text-center">${HEX_TO_CHAIN_DETAILS[currentChainIdHex].nativeToken}</span><span class="w-1/2 text-left">${web3.utils.fromWei(s.balance)}</span></li>`);const a=await Moralis.Web3API.account.getTokenBalances(r);a.length?a.forEach((e=>{if("USDC"==e.symbol||"BUSD"==e.symbol||"IBAT"==e.symbol){const t=convertTokenBalance(e.balance,e.decimals);n?n.innerHTML+=`<li class="pr-2 flex justify-between w-full md:w-1/2 mx-auto"><span class="w-1/2 text-center">${e.symbol}</span><span class="w-1/2 text-left">${t}</span></li>`:console.error("ln:226 - Token List Missing")}})):n?n.innerHTML+='<li class="w-full text-center mx-auto text-xs opacity-80 mt-2">no other tokens available</li>':console.error("ln:226 - Token List Missing")}function toggleBtnVisibility(e){const t=document.querySelectorAll(".wallet-options-btn ");e?(t.forEach((e=>{e.classList.add("hidden")})),logoutBtn.classList.remove("hidden"),showTokenBtn.classList.remove("hidden")):(t?t.forEach((e=>{e.classList.remove("hidden")})):console.error("ln:249-Invalid Arguments"),logoutBtn&&logoutBtn.classList.add("hidden"),showTokenBtn&&showTokenBtn.classList.add("hidden"))}function convertTokenBalance(e,t){let n=0==e?0:e/Math.pow(10,t);return n=n<.001?0:n,n}async function isPresaleOpen(){await readFunction("isPresaleOpen",[{inputs:[],name:"isPresaleOpen",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"}])}async function readFunction(e,t){let n={contractAddress:CONTRACT_ADDRESS_TESTNET,functionName:e,abi:t};return await Moralis.executeFunction(n)}function getBuyAmount(){let e=0;return document.querySelectorAll(".buy-amount").forEach((t=>{t.value&&(e=+t.value)})),e}async function buyToken(){let e=getBuyAmount();if(!isUserConnected())return void console.log("User not Logged in - connect wallet");let t,n={contractAddress:CONTRACT_ADDRESS_TESTNET,functionName:"buyToken",abi:[{inputs:[],name:"buyToken",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"payable",type:"function"}],msgValue:Moralis.Units.ETH(e)};try{t=await Moralis.executeFunction(n)}catch(e){document.getElementById("buy-token-error-msg").innerHTML=e.data.message,toggleErrMsg()}}function toggleErrMsg(){const e=document.getElementById("buy-token-error-input");e.checked=!e.checked}loginBtn.onclick=login,logoutBtn.onclick=logOut;const HEX_TO_CHAIN_DETAILS={"0x1":{chain:"ETH",nativeToken:"ETH"},"0x61":{chain:"BSC",nativeToken:"BNB"},"0x38":{chain:"BSC",nativeToken:"BNB"}};
//# sourceMappingURL=presale.96f1c046.js.map
