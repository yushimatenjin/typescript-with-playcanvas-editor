const app = pc.createScript("app");

class App {
  initialize() {
    console.log(this.entity);
    this.entity.rotate(34, 45, 1);
  }
  update(dt) {
    this.entity.rotate(0, 42.1, 1);
  }
  postInitialize() {}
  postUpdate() {}
  swap() {
    window.location.href = "";
  }
}

Object.setPrototypeOf(app.prototype, App.prototype);
