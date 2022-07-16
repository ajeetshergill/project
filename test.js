window.onload = async function () {
    populateAmountRaisedinHTMLDB(),
        (await isWeb3Installed()) &&
        ((WEB3_INSTALLED = !0),
            console.log("dev:onload"),
            console.log(
                "dev: web3 installed  - checking if user is connected upon refreshing"
            ),
            await Moralis.enableWeb3(),
            isUserConnected() &&
            (console.log("dev: Page-refreshed - User already connected"), login()),
            console.log("dev: Page-refreshed - User not connected"));
};
const TEST_ENVIRONMENT = !1;
let web3Instance = "";
const REFER_CONTRACT_ADDRESS_TESTNET =
    "0xfe2E124FE1418419A9efd8Ba987Fa1769D506c8a",
    REFER_CONTRACT_ADDRESS_MAINNET = "0x5832E385f633b30519B3ECaDE3C5eD3d9881cf58",
    DEPLOYED_CONTRACT_ADDRESS = REFER_CONTRACT_ADDRESS_MAINNET;
console.log(`Deployed Presale Contract is ${DEPLOYED_CONTRACT_ADDRESS}`);
const CONFIRMATIONS_ON_BSC = 11;
let WEB3_INSTALLED = !1;
const serverUrl_Testnet = "https://gusm6vrpbwtk.usemoralis.com:2053/server",
    appId_Testnet = "glRYjrZo9XjLE2MPc7sWgzc4PyoFs3RbmyoNiPbf";
let currentChainIdHex,
    serverUrl = "https://gb6gwydcjjw6.usemoralis.com:2053/server",
    appId = "Zq3s8magh8mlppfXIGSHZRdLj49LlCnIaqs2mD2U";
try {
    console.info("starting server - mainnet "),
        Moralis.start({ serverUrl: serverUrl, appId: appId });
} catch (e) {
    console.error("Server failed to start -ln-34"), console.log(e);
}
const walletOptions = document.getElementById("wallet-options"),
    loginBtn = document.getElementById("web3-login-mm"),
    logoutBtn = document.getElementById("web3-logout"),
    buyBtn = document.getElementById("buy_btn"),
    showTokenBtn = document.getElementById("web3-tokens"),
    BscChainIdMain = 56,
    BscChainIdTest = "0x61",
    showAddress = document.getElementById("web3-wallet-address");
let web3 = new Web3(Moralis.provider || Web3.givenProvider);
const NODE_URL_TESTNET =
    "https://speedy-nodes-nyc.moralis.io/7569a2c3fc822716349963c8/bsc/testnet",
    NODE_URL_MAINNET =
        "https://speedy-nodes-nyc.moralis.io/7569a2c3fc822716349963c8/bsc/mainnet";
let provider = "";
provider = new Web3.providers.HttpProvider(NODE_URL_MAINNET);
const userEnteredPassword = document.querySelector("#presale-password");
function atLogin() {
    let e = getUserWalletAddress();
    let t = `https://presale.battleinfinity.io/?refercode=${e}`;
    userEnteredPassword || (presalePasswordEntered = !0),
        manageTooltipWidth(),
        toggleConnectStatus();
    const o = document.querySelector("#second-login-btn");
    disableButton(o), o.setAttribute("for", "");
    try {
        console.log("start - populateReferralLinkinHTML .."),
            populateReferralLinkinHTML(t),
            console.log("done - populateReferralLinkinHTML ");
    } catch (e) {
        console.error("failed - populateReferralLinkinHTML");
    }
    try {
        console.log("start - populateReferrerinHTML .."),
            populateReferrerinHTML(e),
            console.log("done - populateReferrerinHTML");
    } catch (e) {
        console.error("failed - populateReferrerinHTML");
    }
    try {
        console.log("start - populateUserReferralComissions"),
            populateUserReferralComissions(e),
            console.log("done - populateUserReferralComissions");
    } catch (e) {
        console.error("failed - populateUserReferralComissions");
    }
    try {
        console.log("start - populateUserReferralsCount"),
            populateUserReferralsCount(e),
            console.log("done - populateUserReferralsCount");
    } catch (e) {
        console.error("failed - populateUserReferralsCount");
    }
    try {
        console.log("start - populateUsersInvestments"),
            populateUsersInvestments(e),
            console.log("done - populateUsersInvestments");
    } catch (e) {
        console.error("failed - populateUsersInvestments");
    }
    try {
        updateBNBRaised();
    } catch (e) {
        console.error("failed - updateBNBRaised - atlogin");
    }
    isUserConnected() && toggleBtnVisibility(!0);
}
async function updateBNBRaised() {
    let e = await getTotalBNBAmount();
    e = +e.toFixed(2);
    let t = "";
    try {
        t = percentageOfBNBRaised(e, 16500);
    } catch (e) {
        console.error("dev: percentageOfBNBRaised() issue");
    }
    console.log(`raisedAmount = ${e}`),
        console.log(`raisedAmountPercentage = ${t}`),
        updateRaisedBNBinDB(e, t);
}
function manageTooltipWidth() {
    if (document.querySelector("#web3-wallet-address")) {
        if (isUserConnected())
            return (
                console.log("setting left to : 0"),
                void showAddress.style.setProperty("--custom-tooltip-left", "0px")
            );
        console.log("setting left to : negative"),
            showAddress.style.setProperty("--custom-tooltip-left", "-100px");
    } else console.error("tooltips missing");
}
async function addNetwork(e) {
    const t = e,
        o = "BNB Smart Chain Mainnet",
        n = NODE_URL_MAINNET,
        s = "https://bscscan.com/";
    console.log("BscChainId-chainName-rpcUrl-blockexplorer"),
        console.log(`${t}-${o}-${n}-${s}`),
        await Moralis.addNetwork(t, o, "BNB", "BNB", n, s);
}
async function switchAndAdd(e = "0x61") {
    console.log("switchAndAdd - toChainid"), console.log(e);
    try {
        await switchNetwork(e);
    } catch (t) {
        await addNetwork(e);
    }
}
async function switchNetwork(e = "0x61") {
    currentChainIdHex = await Moralis.switchNetwork(e);
}
async function login(e) {
    let t = Moralis.User.current();
    if (!t)
        if (
            (console.log(`Provider :${e} - login(provider)`), "walletconnect" === e)
        )
            try {
                console.info("Authenticating with WalletConnect - chain -56"),
                    (t = await Moralis.authenticate({
                        provider: "walletconnect",
                        chainId: 56,
                        signingMessage: "Battle Infinity Authentication: WalletConnect",
                    })),
                    await Moralis.enableWeb3({ provider: "walletconnect" }),
                    console.info(`dev:Enabling Web3 - ${e} ln-128`);
            } catch (e) {
                console.error("dev:Authentication Failed - Walletconnect"),
                    console.error(e);
            }
        else
            try {
                console.info("Authenticating with MetaMask"),
                    (currentChainIdHex = await Moralis.getChainId()),
                    56 !== currentChainIdHex &&
                    (console.log("NOT - Connecting"),
                        console.log("Current chain - Bsc"),
                        console.log(`${currentChainIdHex} - 56`),
                        await switchAndAdd(56)),
                    (t = await Moralis.authenticate({
                        signingMessage: "Battle Infinity Authentication",
                    }));
                try {
                    hitDataLayer(getUserWalletAddress());
                } catch (e) {
                    console.error("dev:couldn't hit data layer");
                }
            } catch (e) {
                console.error("Authentication Failed - MetaMask"), console.error(e);
            }
    (currentChainIdHex = await Moralis.getChainId()),
        console.log("Battle Infinity Authentication - signing msg"),
        isUserConnected() &&
        (console.log("IBAT Authentication - userconnected"),
            atLogin(),
            (showAddress.dataset.tip = t.get("ethAddress")),
            showAddress.style.setProperty("--custom-tooltip-left", "0px"),
            getBalance(currentChainIdHex, t.get("ethAddress")));
}
function getUserWalletAddress() {
    return isUserConnected()
        ? Moralis.User.current().get("ethAddress")
        : "Wallet not connected";
}
function isUserConnected() {
    return !!Moralis.User.current();
}
async function logOut() {
    try {
        await updateBNBRaised();
    } catch (e) {
        console.error("dev:failed - updateBNBRaised - logOut()");
    }
    await Moralis.User.logOut(), console.log("logged out"), await atLogout();
}
async function atLogout() {
    userEnteredPassword && (presalePasswordEntered = !1);
    try {
        populateReferralLinkinHTML("Wallet not connected");
    } catch (e) {
        console.error(e);
    }
    try {
        populateReferrerinHTML("Wallet not connected");
    } catch (e) {
        console.error(e);
    }
    try {
        populateUserReferralComissions("0");
    } catch (e) {
        console.error(e);
    }
    try {
        populateUserReferralsCount(0);
    } catch (e) {
        console.error(e);
    }
    try {
        populateUsersInvestments("0");
    } catch (e) {
        console.error("failed - populateUsersInvestments");
    }
    manageTooltipWidth(), toggleConnectStatus();
    const e = document.querySelector("#second-login-btn");
    enableButton(e), e.setAttribute("for", "wallets");
    const t = document.querySelector("#add-referrer");
    t && t.classList.add("hidden"),
        toggleBtnVisibility(!1),
        (showAddress.dataset.tip = "Wallet not connected");
    try {
        setPresalePassword && setPresalePassword();
    } catch (e) {
        console.error("dev:setPresalePassword(); not defined");
    }
    try {
        showArenaLock && showArenaLock(!0);
    } catch (e) {
        console.error("dev:showArenaLock(); not defined");
    }
    const o = document.getElementById("add-referrer-btn"),
        n = document.getElementById("add-referrer-address");
    enableButton(o), enableButton(n), await Moralis.enableWeb3();
}
async function getBalance(e, t) {
    const o = document.getElementById("token-list");
    currentChainIdHex = await Moralis.getChainId();
    let n = Moralis.User.current().get("ethAddress");
    const s = {
        chain: e || currentChainIdHex || "0x38",
        address: t || n || "0x9d51fd1a308c073f2f06a7181ad90c6d6ab5e9d7",
    },
        a = await Moralis.Web3API.account.getNativeBalance(s);
    o &&
        (o.innerHTML = `<li class="pr-2 flex justify-between w-full md:w-1/2 mx-auto mt-2"><span class="w-1/2 text-center">${HEX_TO_CHAIN_DETAILS[currentChainIdHex].nativeToken
            }</span><span class="w-1/2 text-left">${web3.utils.fromWei(
                a.balance
            )}</span></li>`);
    const r = await Moralis.Web3API.account.getTokenBalances(s);
    r.length
        ? r.forEach((e) => {
            if ("USDC" == e.symbol || "BUSD" == e.symbol || "IBAT" == e.symbol) {
                const t = convertTokenBalance(e.balance, e.decimals);
                o
                    ? (o.innerHTML += `<li class="pr-2 flex justify-between w-full md:w-1/2 mx-auto"><span class="w-1/2 text-center">${e.symbol}</span><span class="w-1/2 text-left">${t}</span></li>`)
                    : console.error("ln:226 - Token List Missing");
            }
        })
        : o
            ? (o.innerHTML +=
                '<li class="w-full text-center mx-auto text-xs opacity-80 mt-2">no other tokens available</li>')
            : console.error("dev:getBalance() - Token List Missing");
}
function toggleBtnVisibility(e) {
    const t = document.querySelectorAll(".wallet-options-btn ");
    e
        ? (t.forEach((e) => {
            e.classList.add("hidden");
        }),
            logoutBtn && logoutBtn.classList.remove("hidden"),
            showTokenBtn && showTokenBtn.classList.remove("hidden"))
        : (t
            ? t.forEach((e) => {
                e.classList.remove("hidden");
            })
            : console.error("ln:249-Invalid Arguments"),
            logoutBtn && logoutBtn.classList.add("hidden"),
            showTokenBtn && showTokenBtn.classList.add("hidden"));
}
function toggleConnectStatus() {
    const e = document.querySelectorAll(".connectivity-status");
    e &&
        e.forEach((e) => {
            isUserConnected()
                ? (e.classList.remove("bg-red-400"),
                    (e.style.background = "#4ade80"),
                    (e.innerHTML = "connected"))
                : ((e.style.background = "#f87171"), (e.innerHTML = "not connected"));
        });
}
function convertTokenBalance(e, t) {
    let o = 0 == e ? 0 : e / Math.pow(10, t);
    return (o = o < 0.001 ? 0 : o), o;
}
async function isPresaleOpen() {
    return await readFunction("isPresaleOpen", [
        {
            inputs: [],
            name: "isPresaleOpen",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
        },
    ]);
}
async function readFunction(e, t) {
    let o = {
        contractAddress: DEPLOYED_CONTRACT_ADDRESS,
        functionName: e,
        abi: t,
    };
    return await Moralis.executeFunction(o);
}
function getBuyAmount() {
    let e = 0;
    return (
        document.querySelectorAll(".buy-amount").forEach((t) => {
            t.value && (e = +t.value);
        }),
        console.log("buyAmount = "),
        console.log(+e),
        e
    );
}
async function buyToken() {
    const e = +getBuyAmount(),
        t = document.getElementById("buy-token-error-con"),
        o = document.getElementById("buy-token-error-msg");
    let n = "Error";
    if (!isUserConnected())
        return (
            console.log("User not Logged in - connect wallet"),
            (n = "Wallet not connected"),
            void showErrMsg(t, o, n)
        );
    const s = await isPresaleOpen();
    if ((console.log(`sale open - ${s}`), !s))
        return (
            console.log("Presale is not open"),
            (n = "Presale has not yet started !!!"),
            void showErrMsg(t, o, n)
        );
    if (
        "0xC8179e6927b61A4FdC3e5a2dB14e641E51b9ad83" !== getUserWalletAddress() &&
        +e < 0.1
    )
        return (
            (n = "Minimum BNB Amount should be 0.1BNB"), void showErrMsg(t, o, n)
        );
    let a = {
        contractAddress: DEPLOYED_CONTRACT_ADDRESS,
        functionName: "buyToken",
        abi: [
            {
                inputs: [],
                name: "buyToken",
                outputs: [{ internalType: "address", name: "", type: "address" }],
                stateMutability: "payable",
                type: "function",
            },
        ],
        msgValue: Moralis.Units.ETH(e),
    };
    try {
        let t = getUserWalletAddress();
        console.log("Transaction started"), swapAmountDataLayer(t);
        const o = await Moralis.executeFunction(a);
        confirmTransactionDataLayer(t),
            console.log("Transaction finished"),
            console.log("Transaction"),
            console.log(o);
        const n = await o.wait(11);
        console.log("Result"), console.log(n.transactionHash);
        let s = calculateIBATAmount(e);
        n && swapSuccessfulDataLayer(t, n.transactionHash, e, s),
            console.log(
                `Add: ${t} \n tID: ${n.transactionHash} \n BNB: ${e} \nIBAT: ${s}`
            );
    } catch (e) {
        console.log("Transaction cancelled");
        try {
            if (
                e.message &&
                (console.log(e.message),
                    (n = e.message),
                    n.includes("User denied transaction signature"))
            )
                return (n = "Transaction declined by User"), void showErrMsg(t, o, n);
            n = e.data.message;
        } catch (e) {
            console.error("dev:bad error in BuyToken");
        }
        console.log(n), (n = "Insufficient BNB in wallet"), showErrMsg(t, o, n);
    }
}
async function getTotalBNBAmount() {
    let e = {
        contractAddress: DEPLOYED_CONTRACT_ADDRESS,
        functionName: "totalBNBAmount",
        abi: [
            {
                inputs: [],
                name: "totalBNBAmount",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
        ],
    },
        t = await Moralis.executeFunction(e);
    return (t /= Math.pow(10, DECIMALS)), t;
}
async function populateAmountRaisedinHTML() {
    console.log("populateAmountRaisedinHTML-switchAndAdd-chainId-56"),
        await switchAndAdd(56),
        console.log("ran - populateAmountRaisedinHTML");
    let e = await getTotalBNBAmount();
    (e = +e.toFixed(2)), console.log(`raisedAmount = ${e}`);
    let t = "";
    try {
        t = percentageOfBNBRaised(e, 16500);
    } catch (e) {
        console.error("dev: percentageOfBNBRaised() issue");
    }
    console.log(`raisedAmount = ${e}`), console.log(`setting % = ${t}`);
    const o = document.querySelectorAll(".sale-progress");
    o &&
        o.forEach((e) => {
            let o = t;
            o < 1 && (o = 1), (e.value = o);
        });
    const n = document.querySelectorAll(".sale-progress-amount");
    n &&
        n.forEach((t) => {
            t.innerHTML = e;
        });
    const s = document.querySelectorAll(".sale-progress-percentage");
    s &&
        s.forEach((e) => {
            e.innerHTML = t;
        });
    document.querySelectorAll(".sale-progress-val-parent").forEach((e) => {
        let o = +t - 3;
        o >= 94 && (o = 94);
        o <= 0 && (o = 0), (e.style.left = `${o}%`);
    });
    document.querySelectorAll(".sale-progress-val-parent-mob").forEach((e) => {
        let o = +t - 3;
        o >= 65 && (o = 65);
        o <= 0 && (o = 0), (e.style.left = `${o}%`);
    });
}
function toggleErrMsg() {
    const e = document.getElementById("buy-token-error-input");
    e.checked = !e.checked;
}
async function isWeb3Installed() {
    const e = window.ethereum;
    let t = !0;
    return (
        (e && e.on) ||
        (console.log("dev:isWeb3Installed - Metamask not installed"), (t = !1)),
        t
    );
}
buyBtn
    ? (buyBtn.onclick = buyToken)
    : console.error("Login button missing in UI"),
    loginBtn
        ? (loginBtn.onclick = login)
        : console.error("Login button missing in UI"),
    logoutBtn
        ? (logoutBtn.onclick = logOut)
        : console.error("Logout button missing in UI");
const HEX_TO_CHAIN_DETAILS = {
    "0x1": { chain: "ETH", nativeToken: "ETH" },
    "0x61": { chain: "tBSC", nativeToken: "tBNB" },
    "0x38": { chain: "BSC", nativeToken: "BNB" },
};
//# sourceMappingURL=index.3325dc19.js.map
