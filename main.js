(()=>{"use strict";function e(e,t,n,r,o,c){var a=e.querySelector(".places__item").cloneNode(!0),u=a.querySelector(".card__image"),i=a.querySelector(".card__delete-button"),l=a.querySelector(".card__like-button"),s=a.querySelector(".card__like-count"),d=a.querySelector(".card__title"),p=t._id;return a.querySelector(".card__image").src=t.link,a.querySelector(".card__image").alt=t.name,a.querySelector(".card__title").textContent=t.name,d.textContent=t.name,s.textContent=t.likes.length||"",t.likes.some((function(e){return e._id===c}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(e){r(e,p).then((function(t){e.target.classList.toggle("card__like-button_is-active"),s.textContent=t.likes.length||""})).catch((function(e){return console.log(e)}))})),t.owner._id!==c?i.remove():i.addEventListener("click",(function(e){n(p).then((function(){evt.target.closest(".places__item.card").remove()})).catch((function(e){return console.log(e)}))})),u.addEventListener("click",(function(){return o(t)})),a}function t(e){e.classList.add("popup_is-opened"),e.addEventListener("click",o),document.addEventListener("keydown",c)}function n(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",o),document.removeEventListener("keydown",c)}function r(e){e.classList.add("popup_is-animated")}function o(e){e.target===e.currentTarget&&n(document.querySelector(".popup_is-opened"))}function c(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function a(e,t,n){e.classList.remove(n.inputErrorClass),t.textContent="",t.classList.remove(n.errorClass)}function u(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}function i(e,t){var n=t.inputSelector,r=t.submitButtonSelector,o=t.inactiveButtonClass,c=t.inputErrorClass,i=t.errorClass,l=Array.from(e.querySelectorAll(n)),s=e.querySelector(r);l.forEach((function(t){t.setCustomValidity(""),a(t,e.querySelector(".".concat(t.id,"-error")),{inputErrorClass:c,errorClass:i})})),u(l,s,o)}var l={baseUrl:"https://nomoreparties.co/v1/wff-cohort-16",headers:{authorization:"3e43a5b2-a6d9-4484-930f-36eb60fe3745","Content-Type":"application/json"}},s=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},d=function(e){return fetch("".concat(l.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:l.headers}).then(s)};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f,_=document.querySelector("#card-template").content,m=document.querySelector(".places__list"),y=document.querySelector(".popup_type_edit"),v=document.forms["edit-profile"],h=v.elements.name,S=v.elements.description,b=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),C=document.querySelector(".popup_type_new-card"),q=document.forms["new-place"],E=q.querySelector(".popup__input_type_card-name"),L=q.querySelector(".popup__input_type_url"),k=document.querySelector(".popup_type_image"),x=k.querySelector(".popup__content_content_image"),A=x.querySelector(".popup__image"),T=x.querySelector(".popup__caption"),U=document.querySelector(".profile__edit-button"),w=document.querySelector(".profile__add-button"),M=document.querySelectorAll(".popup__close"),j=document.querySelector(".profile__image"),D=document.querySelector(".popup_type_update-avatar"),O=document.forms["update-avatar"],B=O.querySelector(".popup__input_type_avatar-url");function H(e){A.src=e.link,T.textContent=e.name,T.alt=e.name,t(k),r(k)}Promise.all([fetch("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).then(s),fetch("".concat(l.baseUrl,"/cards"),{headers:l.headers}).then(s)]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(n,r)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];f=c._id,j.style.backgroundImage="url(".concat(c.avatar,")"),b.textContent=c.name,g.textContent=c.about,a.forEach((function(t){m.append(e(_,t,d,P,H,f))}))})).catch((function(e){return console.log(e)}));var P=function(e,t){return e.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:l.headers}).then(s)}(t):function(e){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:l.headers}).then(s)}(t)};M.forEach((function(e){var t=e.closest("div.popup");e.addEventListener("click",(function(e){n(t),r(t)}))})),v.addEventListener("submit",(function(e){e.preventDefault(),b.textContent=h.value,g.textContent=S.value,n(y)})),U.addEventListener("click",(function(e){h.value=b.textContent,S.value=g.textContent,i(v,G),t(y)})),w.addEventListener("click",(function(e){t(C),i(q,G)})),q.addEventListener("submit",(function(t){t.preventDefault();var r,o,c,a=q.querySelector(".popup__button");a.innerHTML="Сохранение...",console.log(a),console.log("это кнопка сохранить"),(r={name:E.value,link:L.value},o=r.name,c=r.link,fetch("".concat(l.baseUrl,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify({name:o,link:c})}).then(s)).then((function(t){var r=t,o=(r.owner._id,e(_,r,card,d,P,H));m.prepend(o),n(C)})).catch((function(e){console.log(e)})).finally((function(){a.innerHTML="Сохранить",console.log(a)}))})),v.addEventListener("submit",(function(e){e.preventDefault();var t,r=v.querySelector(".popup__button");r.innerHTML="Сохранение...",(t={name:h.value,about:S.value},fetch("".concat(l.baseUrl,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify(t)}).then(s)).then((function(e){b.textContent=h.value,g.textContent=S.value,n(y)})).catch((function(e){console.log(e)})).finally((function(){r.innerHTML="Сохранить",console.log(r)}))})),j.addEventListener("click",(function(e){t(D)})),O.addEventListener("submit",(function(e){e.preventDefault();var t,r=O.querySelector(".popup__button");r.textContent="Сохранение...",(t=B.value,fetch("".concat(l.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:t})}).then(s)).then((function(e){j.style.backgroundImage="url(".concat(e.avatar,")"),O.reset(),i(O,G),n(D)})).catch((function(e){return console.log(e)})).finally((function(){return r.textContent="Сохранить"}))}));var I,N,J,V,z,$,F,G={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};N=(I=G).formSelector,J=I.inputSelector,V=I.submitButtonSelector,z=I.inactiveButtonClass,$=I.inputErrorClass,F=I.errorClass,Array.from(document.querySelectorAll(N)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()}));var t=Array.from(e.querySelectorAll(J)),n=e.querySelector(V);u(t,n,z),t.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity("");var r=e.querySelector(".".concat(t.id,"-error"));t.validity.valid?a(t,r,n):function(e,t,n,r){e.classList.add(r.inputErrorClass),n.textContent=t,n.classList.add(r.errorClass)}(t,t.validationMessage,r,n)}(e,r,{inputErrorClass:$,errorClass:F}),u(t,n,z)}))}))}))})();