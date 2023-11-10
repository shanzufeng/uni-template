import { createSSRApp } from 'vue';
import App from './App.vue';
import uView from 'vk-uview-ui';
import { createPinia } from 'pinia';
import { createUnistorage } from 'pinia-plugin-unistorage';

// css
import 'uno.css';
export function createApp() {
	const app = createSSRApp(App);
	const pinia = createPinia();
	pinia.use(createUnistorage());
	// app.component('layout', layout);
	app.use(pinia);
	app.use(uView);
	return {
		app,
		pinia
	};
}
