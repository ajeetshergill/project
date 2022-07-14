const firebaseConfig = {
    apiKey: "AIzaSyCW_zePbfL7fms_Jg4oRL8Up5OE36rTjcU",
    authDomain: "battleinfinityio.firebaseapp.com",
    projectId: "battleinfinityio",
    storageBucket: "battleinfinityio.appspot.com",
    messagingSenderId: "694775551331",
    appId: "1:694775551331:web:93cd3513614d2ce11daf56",
},
    app = firebase.initializeApp(firebaseConfig),
    db = firebase.firestore(),
    progressBars = document.querySelectorAll(".sale-progress"),
    raisedAmountPercentageHTML = document.querySelectorAll(
        ".sale-progress-percentage"
    ),
    raisedAmountHTML = document.querySelectorAll(".sale-progress-amount"),
    parentContainer = document.querySelectorAll(".sale-progress-val-parent"),
    parentContainerMob = document.querySelectorAll(
        ".sale-progress-val-parent-mob"
    );
function populateAmountRaisedinHTMLDB() {
    console.log("ran - populateAmountRaisedinHTML");
    let e = "",
        o = "0";
    db.collection("privatesale")
        .doc("raised")
        .onSnapshot((r) => {
            console.log("Current data: ", r.data()),
                (e = r.data().percentage),
                (e = +e),
                (o = r.data().amount),
                (o = +o.toFixed(2)),
                console.log(`raisedAmount = ${o}`),
                console.log(`setting % = ${e}`),
                progressBars &&
                progressBars.forEach((o) => {
                    e < 1 && (percentageForBar = 1), (o.value = +e.toFixed(2));
                }),
                raisedAmountPercentageHTML &&
                raisedAmountPercentageHTML.forEach((o) => {
                    o.innerHTML = +e.toFixed(2);
                }),
                raisedAmountHTML &&
                raisedAmountHTML.forEach((e) => {
                    e.innerHTML = o;
                }),
                t.forEach((o) => {
                    let t = +e - 3;
                    t >= 94 && (t = 94);
                    t <= 0 && (t = 0), (o.style.left = `${t}%`);
                }),
                a.forEach((o) => {
                    let t = +e - 3;
                    t >= 65 && (t = 65);
                    t <= 15 && (t = 15), (o.style.left = `${t}%`);
                });
        });
    const t = document.querySelectorAll(".sale-progress-val-parent");
    t.forEach((o) => {
        let t = +e - 3;
        t >= 94 && (t = 94);
        t <= 0 && (t = 0), (o.style.left = `${t}%`);
    });
    const a = document.querySelectorAll(".sale-progress-val-parent-mob");
    a.forEach((o) => {
        let t = +e - 3;
        t >= 65 && (t = 65);
        t <= 0 && (t = 0), (o.style.left = `${t}%`);
    });
}
function updateRaisedBNBinDB(e, o) {
    db.collection("privatesale")
        .doc("raised")
        .set({ percentage: o, amount: e });
}
//# sourceMappingURL=index.4e9e47a6.js.map
