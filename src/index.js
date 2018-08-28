import component from './component';
import { bake } from './shake';

import 'purecss';
import './main.css';

document.body.appendChild(component('🔥 Click me! 🔥'));

function foo() {
  function bar() {
    console.warn('apple');
  }
}

foo();
bake();
