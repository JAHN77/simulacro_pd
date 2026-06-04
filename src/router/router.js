import { PATHS } from './routes.js';


export function router(vista) {
    const route = PATHS[vista];

    const app = document.getElementById('app');

    app.innerHTML = route.render;

    // console.log(route);
    // console.log(vista);
    console.log(route.render);


}


