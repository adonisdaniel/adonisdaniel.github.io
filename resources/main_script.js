const $formBtn = document.querySelector(".formulario-btn"),
  $form = document.querySelector(".formulario"),
  $closeFormBtn = document.querySelector(".close-form-btn"),
  $stackItems = document.querySelectorAll(".items"),
  $footer = document.querySelector("footer"),
  $cabecera = document.querySelector(".cabecera-container");

const formContact = () => {
  $formBtn.style.display = "none";
  $form.classList.add("formulario-active");
};

const closeForm = () => {
  $form.classList.remove("formulario-active");
  $formBtn.style.display = "block";
};

/* ------animation stack images-------- */

const observersOptions = {
  threshold: [0.2, 0.8],
};

const animationStackImg = () => {
  const $stackImgs = document.querySelectorAll(".stack-card-container");

  const callbk1 = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationName = "fromLeft";
        /* console.log(entry) */
      }
    });
  };

  const observer1 = new IntersectionObserver(callbk1, observersOptions);

  const callbk2 = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationName = "fromRight";
        /* console.log(entry) */
      }
    });
  };

  const observer2 = new IntersectionObserver(callbk2, observersOptions);

  let cont = 0;

  $stackImgs.forEach((img) => {
    if (innerWidth >= 700 && innerWidth < 1290) {
      observer1.observe(img);
    } else {
      if (cont % 2 === 0) {
        observer1.observe(img);
      } else {
        observer2.observe(img);
      }
      cont++;
    }
  });
};

/* -----------------------Form loader----------------------- */

const loader = () => {
  let loaderContainer = document.createElement("div");

  loaderContainer.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader">
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
  <br>
  <span>Enviando...</span>`;
  loaderContainer.style.display = "flex";
  loaderContainer.style.flexDirection = "column";
  loaderContainer.classList.add("contact-response-container");
  loaderContainer.id = "loaderContainer";
  document.body.insertAdjacentElement("afterbegin", loaderContainer);

  return loaderContainer;
};

/*----------------ANIMATION LOGO---------------------- */

window.addEventListener("scroll", (e) => {
  if (scrollY > 0) {
    $cabecera.style.animationName = "hideLogo";
    if ($cabecera.style.animationName === "hideLogo") {
      return "";
    }
  } else {
    $cabecera.style.animationName = "showLogo";
  }
});

/*------------------ Modal slider ---------------------*/

const testingDimensions = () => {
  if (innerWidth < 1000) {
    const $sliderContainer = document.querySelectorAll(".slider-img-container");

    let $modalText = document.querySelectorAll(".tapLeftRight");

    console.log($sliderContainer, $modalText);

    const watchingSlider = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $modalText.forEach((modText) => {
            modText.classList.add("modalText");
            modText.style.animationName = "showModalText";
          });
        }
      });
    };

    let watchSlider = new IntersectionObserver(
      watchingSlider,
      observersOptions
    );

    $sliderContainer.forEach((cont) => watchSlider.observe(cont));
  }
};

let lines = document.querySelectorAll(".lines div"),
  techsImg = document.querySelector(".techs-imgs"),
  techImages = document.querySelectorAll(".techs-imgs img"),
  linesContainer = document.querySelector(".lines");

const linesAnimation = () => {
  setInterval(() => {
    lines.forEach((line) => {
      let random = Math.floor(Math.random() * 50),
        bottomPoints = 100 - random;

      line.style.clipPath = `polygon(0% ${random}%, 100% ${random}%, 100% ${bottomPoints}%, 0% ${bottomPoints}%)`;
    });
  }, 500);
};

document.addEventListener("animationend", (e) => {
  let validate = localStorage.getItem("isNew");

  if (e.target.matches(".presentacion")) {
    if (validate === "no") {
      welcome();
      showingFormBtn();
      return (document.querySelector("body").style.overflowY = "scroll");
    }
    document.querySelector(".doYouWantToStart").classList.remove("hidden");

    showingFormBtn();
  }
});

/* -------------------STACK CARDS AND CERTIFICATES---------- */

const $templateCard = document.getElementById("templateCard").content,
  $templateCertificate = document.getElementById("certificadosCard").content,
  $fragmentCard = document.createDocumentFragment(),
  $stackContainer = document.querySelector(".stack-cards"),
  $certificatesContainer = document.querySelector(".certificados");

const stackData = [
  {
    name: "Html",
    imgUrl: "./images/HTML_Logo.svg",
  },
  {
    name: "Css",
    imgUrl: "./images/CSS_Logo.svg",
  },
  {
    name: "JavaScript",
    imgUrl: "./images/JS_Logo.svg",
  },
  {
    name: "Git",
    imgUrl: "./images/git_Logo.svg",
  },
  {
    name: "React JS",
    imgUrl: "./images/React_Logo.png",
  },
  {
    name: "Vue JS",
    imgUrl: "./images/VUE_LOGO.svg",
  },
  {
    name: "Adonis JS",
    imgUrl: "./images/ADONIS_LOGO.svg",
  },
];

const certificatesData = [
  {
    imgUrl: "./images/Certificado_CSS.png",
    name: "Css",
    by: "Educa2",
  },
  {
    imgUrl: "./images/Certificado_js.png",
    name: "JavaScript",
    by: "Educa2",
  },
];

const creatingCards = () => {
  stackData.forEach((tech) => {
    let clon = $templateCard.cloneNode(true),
      $container = clon.querySelector(".stack-card-container"),
      $img = $container.querySelector(".stack-card-img > img");

    $img.src = tech.imgUrl;
    $img.alt = tech.name;
    $fragmentCard.append($container);
  });

  $stackContainer.append($fragmentCard);

  /* -------Certificates */

  certificatesData.forEach((cert) => {
    let clon = $templateCertificate.cloneNode(true),
      $img = clon.querySelector(".certificados-card-img img"),
      $techName = clon.querySelector(".certificados-card-info-tech-name"),
      $by = clon.querySelector(".certificados-card-info-tech-by > strong");

    $img.src = cert.imgUrl;
    $img.alt = `${cert.name} certificate`;
    $techName.textContent = cert.name;
    $by.textContent = cert.by;
    $fragmentCard.append(clon);
  });

  $certificatesContainer.append($fragmentCard);
};

/* -----------------EVENTS---------- */

document.addEventListener("DOMContentLoaded", (e) => {
  creatingCards();
  animationStackImg();
  creatingProjectsPost();
  testingDimensions();
});

document.addEventListener("click", (e) => {
  heroMsgBtn(e);

  if (e.target.matches(`.${$formBtn.className}`)) formContact();
  if (e.target.matches(`.${$closeFormBtn.className}`)) closeForm();

  if (e.target.matches(".certificados-card-img > img")) {
    /* e.target.classList.add(".img-active"); */
    e.target.classList.toggle("img-active");
  }

  let nameOfProject =
    e.target.closest("button") || false
      ? e.target.closest("button").classList[1]
      : false;

  /* Si el padre mas cercano no es un boton retornamos false
  Si hallamos un boton accedemos a sus clases y tomamos el nombre de la segunda */

  let listaItems = document.querySelectorAll(
    `[data-project="${nameOfProject}"]`
  );

  /* Con el nombre del proyecto podemos acceder a todas las images que contengan el selector declarado */

  if (!listaItems.length) {
    /* Si no hay boton cercano, eso quiere decir que la lista estara vacia, entonces buscamos el list items mas cercano y tomamos el valor del data-project */
    nameOfProject = e.target.closest("li")
      ? e.target.closest("li").getAttribute("data-project")
      : false;
    /* Si el atributo no existe retornamos falso y detenemos la funcion */

    if (!nameOfProject) return "";

    listaItems = document.querySelectorAll(`[data-project="${nameOfProject}"]`);
  }

  let sliderContainer = e.target.closest(".proyecto-slider-container") || false;

  if (innerWidth < 1000) {
    if (sliderContainer.className === "proyecto-slider-container") {
      let coorX = e.x;

      let left_or_right = sliderContainer.clientWidth / 2;

      if (coorX < left_or_right) {
        /* Para ir a la izquierda */
        for (let item = 0; item < listaItems.length; item++) {
          if (!listaItems[0].classList.contains("slideImg")) {
            /* Si el primer elemento es visible */
            listaItems[listaItems.length - 1].classList.remove("slideImg");
            /* Hacemos el ultimo elemento visible */
            listaItems[0].classList.add("slideImg");
            /* Lo contrario para el primero */
            break;
          }

          if (listaItems[item].classList.contains("slideImg")) {
          } else {
            listaItems[item].classList.add("slideImg");
            listaItems[item - 1].classList.remove("slideImg");
            break;
          }
        }
      }

      if (coorX >= left_or_right) {
        /* Para ir a la derecha */
        for (let item = 0; item < listaItems.length; item++) {
          if (item === listaItems.length - 1) {
            /* Para el ultimo elemento */
            listaItems[0].classList.remove("slideImg");
            /* Se hace visible el primer elemento */
            listaItems[listaItems.length - 1].classList.add("slideImg");
            /* Lo contrario para el ultimo */
            break;
          }

          if (listaItems[item].classList.contains("slideImg")) {
          } else {
            listaItems[item].classList.add("slideImg");
            listaItems[item + 1].classList.remove("slideImg");
            break;
          }
        }
      }
    }
  } else {
    if (e.target.matches(".btn-left") || e.target.matches(".btn-left > *")) {
      /* Para ir a la izquierda */
      for (let item = 0; item < listaItems.length; item++) {
        if (!listaItems[0].classList.contains("slideImg")) {
          /* Si el primer elemento es visible */
          listaItems[listaItems.length - 1].classList.remove("slideImg");
          /* Hacemos el ultimo elemento visible */
          listaItems[0].classList.add("slideImg");
          /* Lo contrario para el primero */
          break;
        }

        if (listaItems[item].classList.contains("slideImg")) {
        } else {
          listaItems[item].classList.add("slideImg");
          listaItems[item - 1].classList.remove("slideImg");
          break;
        }
      }
    }

    if (e.target.matches(".btn-right") || e.target.matches(".btn-right > *")) {
      for (let item = 0; item < listaItems.length; item++) {
        if (item === listaItems.length - 1) {
          /* Para el ultimo elemento */
          listaItems[0].classList.remove("slideImg");
          /* Se hace visible el primer elemento */
          listaItems[listaItems.length - 1].classList.add("slideImg");
          /* Lo contrario para el ultimo */
          break;
        }

        if (listaItems[item].classList.contains("slideImg")) {
        } else {
          listaItems[item].classList.add("slideImg");
          listaItems[item + 1].classList.remove("slideImg");
          break;
        }
      }
    }
  }
});

/* -----------------FORMULARIO------------------------ */

const $formContainer = document.querySelector(".formulario-container"),
  $formResponse = document.querySelector(".contact-response-container");

const $msg = document.createElement("div");

$formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  let container = loader();

  fetch("https://formsubmit.co/ajax/adonismendozacontact@gmail.com", {
    method: "POST",
    body: new FormData(e.target),
  })
    .then((respuesta) => {
      if (respuesta.ok) {
        respuesta.json();
      } else {
        Promise.reject(respuesta);
      }
    })
    .then((json) => {
      console.log(json);
      document.body.removeChild(container);
      /* Hacer otras cosas */
      $msg.textContent = "Me contactaré contigo pronto.";
      $msg.style.display = "flex";
      $msg.classList.add("contact-response-container");
      $formContainer.reset();
      document.body.insertAdjacentElement("afterbegin", $msg);
    })
    .catch((err) => {
      document.body.removeChild(container);
      console.log(err);
      /* Imprimir mensaje de error */
      $msg.classList.remove("contact-response-container");
      $msg.textContent = `Error ${err.status}. Vuelve a intentarlo`;
      $msg.style.display = "flex";
      $msg.classList.add("contact-response-container");
      document.body.insertAdjacentElement("afterbegin", $msg);
    })
    .finally(() => {
      /* Se completo el proceso del formulario */
      setTimeout(() => {
        $msg.style.display = "none";
      }, 3000);
    });
});

/* -------Projects------ */

/* Projects DATA */

const PROJECTS_DATA = [
  {
    title: "What u want to drink?",
    description:
      "This is an app to search and save your favorites cocktails. Here you can find the instructions and ingredients for make them. Web site created using create-react-app.",
    techs:
      "<strong><em>React Js</em></strong>, <strong><em>Bootstrap</em></strong>.",
    repoURL: "https://github.com/Donisaurius/cocktails-app-react-codes",
    projectUrl: "https://donisaurius.github.io/cocktails-app/",
    projectId: "CocktailsApp",
    imgs: [
      {
        src: "./images/proyecto7_img1.png",
        alt: "Cocktails App image number 1",
        title: "Cocktails App image number 1",
      },
      {
        src: "./images/proyecto7_img2.png",
        alt: "Cocktails App image number 2",
        title: "Cocktails App image number 2",
      },
      {
        src: "./images/proyecto7_img3.png",
        alt: "Cocktails App image number 3",
        title: "Cocktails App image number 3",
      },
      {
        src: "./images/proyecto7_img4.png",
        alt: "Cocktails App image number 4",
        title: "Cocktails App image number 4",
      },
    ],
  },
  {
    title: "Interest Calc App",
    description:
      "This is an app created for calculate the interest of your inversions. Web site created using create-react-app.",
    techs:
      "<strong><em>React Js</em></strong>, <strong><em>Bootstrap</em></strong>.",
    repoURL: "https://github.com/Donisaurius/interests-calc-react-codes",
    projectUrl: "https://incandescent-heliotrope-cafd28.netlify.app/",
    projectId: "InterestCalcApp",
    imgs: [
      {
        src: "./images/proyecto6_img1.png",
        alt: "Interest Calc App image number 1",
        title: "Interest Calc App image number 1",
      },
      {
        src: "./images/proyecto6_img2.png",
        alt: "Interest Calc App image number 2",
        title: "Interest Calc App image number 2",
      },
      {
        src: "./images/proyecto6_img3.png",
        alt: "Interest Calc App image number 3",
        title: "Interest Calc App image number 3",
      },
    ],
  },
  {
    title: "Stared Lyrics",
    description:
      "This is a web app where you can find the lyrics of your favorite songs. Let's sing! This is made with CodeSandBox. There you can see the source code. I made this app for practice my skills with React using the Api of Lyrics Ovh.",
    techs: "<strong><em>React Js</em></strong>.",
    repoURL: "#",
    projectUrl: "https://donisaurius.github.io/lyrics-app/",
    projectId: "StaredLyrics",
    imgs: [
      {
        src: "./images/proyecto5_img1.png",
        alt: "Stared Lyrics image number 1",
        title: "Stared Lyrics image number 1",
      },
      {
        src: "./images/proyecto5_img2.png",
        alt: "Stared Lyrics image number 2",
        title: "Stared Lyrics image number 2",
      },
      {
        src: "./images/proyecto5_img3.png",
        alt: "Stared Lyrics image number 3",
        title: "Stared Lyrics image number 3",
      },
      {
        src: "./images/proyecto5_img4.png",
        alt: "Stared Lyrics image number 4",
        title: "Stared Lyrics image number 4",
      },
    ],
  },
  {
    title: "The web news",
    description:
      "This is a web page that I made for a test. This was for proof my abilities with <strong><em>HTML</em></strong>, <strong><em>CSS</em></strong> and <strong><em>JavaScript</em></strong> making layouts. This is <strong>Responsive</strong> and the details of news are <strong>asynchronous</strong>.",
    techs:
      "<strong><em>HTML</em></strong>, <strong><em>CSS</em></strong> and <strong><em>JavaScript</em></strong>.",
    repoURL: "#",
    projectUrl: "https://adonismendoza.000webhostapp.com/",
    projectId: "webNews",
    imgs: [
      {
        src: "./images/proyecto4_img1.png",
        alt: "The web news image number 1",
        title: "The web news image number 1",
      },
      {
        src: "./images/proyecto4_img2.png",
        alt: "The web news image number 2",
        title: "The web news image number 2",
      },
      {
        src: "./images/proyecto4_img3.png",
        alt: "The web news image number 3",
        title: "The web news image number 3",
      },
      {
        src: "./images/proyecto4_img4.png",
        alt: "The web news image number 4",
        title: "The web news image number 4",
      },
    ],
  },
  {
    title: "Anemona's gallery",
    description:
      "Anemona's gallery is a web page created for show the life of Adonis Mendoza (myself) in the illustration world.",
    techs:
      "<strong><em>HTML</em></strong>, <strong><em>CSS</em></strong> and <strong><em>JavaScript</em></strong>.",
    repoURL: "https://github.com/Donisaurius/donisaurius.github.io",
    projectUrl: "https://anemonagallery.000webhostapp.com",
    projectId: "anemonaGallery",
    imgs: [
      {
        src: "./images/proyecto1_img1.png",
        alt: "Anemona gallery image number 1",
        title: "Anemona gallery image number 1",
      },
      {
        src: "./images/proyecto1_img2.png",
        alt: "Anemona gallery image number 2",
        title: "Anemona gallery image number 2",
      },
      {
        src: "./images/proyecto1_img3.png",
        alt: "Anemona gallery image number 3",
        title: "Anemona gallery image number 3",
      },
      {
        src: "./images/proyecto1_img4.png",
        alt: "Anemona gallery image number 4",
        title: "Anemona gallery image number 4",
      },
    ],
  },
  {
    title: "Note-calories",
    description:
      "Note-calories is a web app created for try to control the calories that people eat at day. You just need to put the food's name, the food's weight, and the food's cals. This app doesn't show how many calories are in your food when you put in, you have to know how many cals you're eating. With Note-calories you control the consume at day.",
    techs:
      "<strong><em>HTML</em></strong>, <strong><em>CSS</em></strong> and <strong><em>JavaScript</em></strong>.",
    repoURL: "https://github.com/Donisaurius/noteCalories",
    projectUrl: "https://donisaurius.github.io/noteCalories/",
    projectId: "noteCal",
    imgs: [
      {
        src: "./images/proyecto2_img1.png",
        alt: "Note-calories image number 1",
        title: "Note-calories image number 1",
      },
      {
        src: "./images/proyecto2_img2.png",
        alt: "Note-calories image number 2",
        title: "Note-calories image number 2",
      },
      {
        src: "./images/proyecto2_img3.png",
        alt: "Note-calories image number 3",
        title: "Note-calories image number 3",
      },
      {
        src: "./images/proyecto2_img4.png",
        alt: "Note-calories image number 4",
        title: "Note-calories image number 4",
      },
    ],
  },
  {
    title: "Dot's game",
    description:
      "Dot's game is a web app where you plus points when you touch the dots. Three level by three level a new dot will be on the screen. When you level up and level up the dots will move more faster, their size will change too, so you have to be focus. Luck!",
    techs:
      "<strong><em>HTML</em></strong>, <strong><em>CSS</em></strong> and <strong><em>JavaScript</em></strong>.",
    repoURL: "https://github.com/Donisaurius/dot-game",
    projectUrl: "https://donisaurius.github.io/dot-game",
    projectId: "dotGame",
    imgs: [
      {
        src: "./images/proyecto3_img1.png",
        alt: "Dots game image number 1",
        title: "Dots game image number 1",
      },
      {
        src: "./images/proyecto3_img2.png",
        alt: "Dots game image number 2",
        title: "Dots game image number 2",
      },
      {
        src: "./images/proyecto3_img3.png",
        alt: "Dots game image number 3",
        title: "Dots game image number 3",
      },
    ],
  },
];

/* ---------------- */

const creatingProjectsPost = () => {
  const $projectTemplate = document.getElementById("projectTemplate").content;

  let $projectsContainer = document.querySelector(".proyectos-container"),
    $fragmentProject = document.createDocumentFragment();

  PROJECTS_DATA.forEach((data) => {
    let clon = $projectTemplate.cloneNode(true),
      title = clon.querySelector(".proyecto-header > h3"),
      description = clon.querySelector(".project-description > p:nth-child(1)"),
      techs = clon.querySelector(".project-description > p:nth-child(2)"),
      repo = clon.querySelector(".btn-to-repo > a"),
      webPage = clon.querySelector(".btn-to-page > a"),
      imgTemplate = document.createElement("img");

    clon.querySelector(".btn-left").classList.add(data.projectId);
    clon.querySelector(".btn-right").classList.add(data.projectId);

    let $imgContainer = clon.querySelector(".slider-img-container");

    title.textContent = data.title;
    description.innerHTML += data.description;
    techs.innerHTML += data.techs;
    repo.href = data.repoURL;
    webPage.href = data.projectUrl;

    data.imgs.forEach((img) => {
      let $img = imgTemplate.cloneNode(true),
        li = document.createElement("li");

      li.classList.add("slider-item");
      li.setAttribute("data-project", data.projectId);

      if (!img.title.match("number 1")) {
        li.classList.add("slideImg");
      }

      $img.src = img.src;
      $img.alt = img.alt;
      $img.title = img.title;
      li.appendChild($img);
      $imgContainer.insertAdjacentElement("afterbegin", li);
    });

    $fragmentProject.append(clon);
  });

  $projectsContainer.append($fragmentProject);
};

const coding = document.querySelector(".doYouWantToStart");

coding.addEventListener("keyup", (e) => {
  askingAcces(e);
});

coding.addEventListener("click", (e) => {
  console.log(e);

  e.target.value = ">>  Do you want to start? (Y / N)\n\n>>  ";
});

const askingAcces = (e) => {
  const INITIAL_VALUE = ">>  Do you want to start? (Y / N)";

  let { value } = e.target,
    code = e.keyCode,
    lastValue = value.split("")[value.length - 1],
    body = document.querySelector("body");

  if (code === 13) {
    if (lastValue !== "\n") {
      e.target.value = INITIAL_VALUE;
      return false;
    }

    if (value.includes(">>  y") || value.includes(">>  Y")) {
      console.log("Te dejo ver el contenido");
      e.target.value += "\n>>  Starting...";
      e.target.disabled = true;
      body.style.overflowY = "scroll";
      welcome();
      return;
    }

    e.target.value = value + "\n>>  ";
    return false;
  }

  if (value.length <= INITIAL_VALUE.length) {
    e.target.value = INITIAL_VALUE;
    return false;
  }
};

const welcome = () => {
  let message =
      "Welcome to my portfolio. Don't forget to share your opinions with me. Be happy!",
    p = document.querySelector(".welcome");

  let cont = 0;

  let typing = setInterval(() => {
    if (!message[cont]) {
      localStorage.setItem("isNew", "no");
      return clearInterval(typing);
    }

    p.textContent += message[cont];
    cont++;
  }, 100);
};

const showingFormBtn = () => {
  const observerFunction = function (entries) {
    let clap = entries[0].isIntersecting,
      btn = document.querySelector(".formulario-btn-container");

    clap ? btn.classList.remove("hidden") : btn.classList.add("hidden");
  };

  const main = document.querySelector("main"),
    observer = new IntersectionObserver(observerFunction, {
      threshold: 0,
      rootMargin: "-100px",
    });

  observer.observe(main);
};

const heroMsgBtn = (e) => {
  const btnHero = document.querySelector(".message-btn"),
    btnFloating = document.querySelector(".formulario-btn-container"),
    form = document.querySelector(".formulario");

  if (e.target === btnHero) {
    btnFloating.classList.add("hidden");
    form.classList.add("formulario-active");
  }
};
