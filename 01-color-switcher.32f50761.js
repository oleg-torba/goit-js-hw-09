const t=document.querySelector("body"),e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]");e.addEventListener("click",(function(){e.setAttribute("disabled",""),r=setInterval(o,1e3),c()})),n.addEventListener("click",(function(){e.removeAttribute("disabled",""),clearInterval(r)}));let r=null;function o(){t.style.backgroundColor=c()}function c(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}
//# sourceMappingURL=01-color-switcher.32f50761.js.map