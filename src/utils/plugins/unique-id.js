export default {
  install: app => {
    let uuid = 0;
    app.mixin({
      beforeCreate: function() {
        this.uuid = uuid.toString();
        uuid += 1;
      }
    });

    // Generate a component-scoped id
    app.config.globalProperties.$id = function(id) {
      return "uid-" + this.uuid + "-" + id;
    };
  }
};
