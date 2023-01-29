import '../html/main.css';
import Navigo from 'navigo';

var toggler = document.querySelectorAll('.caret') as any;
for (var i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
}

const examples = document.querySelectorAll('.example'); 
const router = new Navigo("/", {hash: true});

const loadJS = (url:string) => {
    let ele = document.querySelector('#id-script');
    if(ele){
        ele.parentNode.removeChild(ele);
    }
    let script = document.createElement('script');
    script.setAttribute('id', 'id-scipt');
    script.setAttribute("src", url);
    document.body.appendChild(script);

    let htm = document.querySelector('html');
    let body = document.querySelector('body');
    let right_div = document.querySelector('.right-div') as HTMLDivElement;
    if(url.includes('home') || url.includes('ch01-test1')){
        htm.style.overflow = 'auto';
        body.style.overflow = 'auto';
        right_div.style.overflow = 'auto';
    } else {
        htm.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        right_div.style.overflow = 'hidden';
    }
    
    // html for the right_div
    if(url.includes('frame-rate')){
        right_div.innerHTML = 
        `<div class="m-2">
            <h2>FPS and Rendering Time</h2>
            <div id="gui"></div>
            <h3>using stats.js</h3>
            <div id="id-stats"></div>
        </div>`;
    } else if (url.includes('webgpu-info')){
        right_div.innerHTML = `
        <div class="m-5">
        <h3 style="line-height:10%;">Check whether your browser supports WebGPU</h3>
        <div id="id-result" style="line-height:10%;"></div>
        </div>
        <br />`;
    }
}

router.on({
    'index' : () => { loadJS('home.js'); },
    '/' : () => { loadJS('home.js'); },
});
examples.forEach(example => {
    let name = (example as any).href.split('#');
    if(name.length > 1 && name[1] !== 'index'){
        router.on(new RegExp(name[1]), () => { loadJS(name[1] + '.js'); });     
    }
});
router.resolve();
