/**
 * *******************************    dapp.html : Additional Functionality    *******************************
 * To enable #arana-lock
 * - uncomment the html code
 * set/declare presalePasswordEntered = false;
 */
// 
// When #arana-lock is commented, everthing will keep working like it's supposed to be if presalePasswordEntered = true && have to change the value of presale in atlogout() too(uncomment it)
// let presalePasswordEntered = true;
let presalePasswordEntered = false;

function authenticatePresale() {
    try {
        if (!isUserConnected()) {
            showPasswordErrMsg('Login Required');
            return;
        }
    } catch (error) {
        console.error('ln-19:Web3 Library not found');
    }

    const CORRECT_PASSWORD = 'IBATSEED';
    const userEnteredPassword = document.querySelector('#presale-password');

    // console.log(userEnteredPassword === CORRECT_PASSWORD);
    if (!userEnteredPassword) {
        console.error('Invalid Arguments - ln-27');
        return;
    };
    if (userEnteredPassword.value === CORRECT_PASSWORD) {
        presalePasswordEntered = true;
        try {
            atLogin();
            showArenaLock(false);
        } catch (error) {
            console.error('ln-36:Web3 Library not found');
        }
        userEnteredPassword.value = '';
        return;
    } else {
        showPasswordErrMsg('Incorrect Password');
    }

}
function setPresalePassword(password) {
    const EMPTY = ''
    const userEnteredPassword = document.querySelector('#presale-password');
    if (!userEnteredPassword) {
        console.error('Invalid Arguments - ln-49');
        return;
    };
    userEnteredPassword.value = password ? password : EMPTY;
}

function showPasswordErrMsg(msg) {
    const passwordErrMsg = document.querySelector('#password-error-msg');
    if (!passwordErrMsg) {
        console.error('Invalid Arguments - ln-58');
        return;
    };
    passwordErrMsg.innerHTML = msg;
    passwordErrMsg.classList.remove('opacity-0')
    passwordErrMsg.classList.add('opacity-100')
    setTimeout(() => {
        const passwordErrMsg = document.querySelector('#password-error-msg');
        passwordErrMsg.classList.remove('opacity-100')
        passwordErrMsg.classList.add('opacity-0')
    }, 500);
}

function showArenaLock(show) {
    // #arena-lock or #presale-lock
    let arenaLock = document.querySelector('#presale-lock');
    // If the element of areanlock doesn't exist (can be commented out)
    // just return because doing anything will throw console error
    if (!arenaLock) {
        return;
    }
    if (show) {
        arenaLock.classList.remove('hidden');
    }
    else {
        arenaLock.classList.add('hidden');
    }
}
