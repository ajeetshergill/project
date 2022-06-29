const onProgress=e=>{const r=e.target.querySelector(".progress-bar");e.target.querySelector(".update-bar").style.width=100*e.detail.totalProgress+"%",1==e.detail.totalProgress&&r.classList.add("hide")},_3Delements=document.querySelectorAll(".ar-model");_3Delements.forEach((e=>{e.addEventListener("progress",onProgress)}));
//# sourceMappingURL=index.8a2df8da.js.map
