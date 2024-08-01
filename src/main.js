import { createApp } from "vue";
import App from "@/vue/App.vue";
import "@/styles/main.scss";
import router from "./scripts/router";

const app = createApp(App);
app.use(router);

app.mount("#app");
