import viewer from './viewer.vue';

viewer.install = function (app) {
    app.component(viewer.name, viewer);
};


export default viewer;