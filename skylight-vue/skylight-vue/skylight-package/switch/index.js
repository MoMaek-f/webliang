import Switch from "./src/skylight-switch";
Switch.install = function(Vue) {
    Vue.component(Switch.name, Switch);
};
export default Switch;