import DemoScene from 'DemoScene2';
import { Application } from '../src';

const dom = document.getElementById('app');

const app = new Application({ dom });
const demoScene = new DemoScene();

app.switchToScene(demoScene);
