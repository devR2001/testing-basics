import { expect } from "chai";
import App from "@/App.vue";
describe("App.vue", () => {
  /*  it("Dieser Test sollte erfolgreich ausgeführt werden.", () => {
    expect("Hello" + " World!").to.equal("Hello World!");
  }); */
  it("setzt die initialen Daten korrekt.", () => {
    // Erwartungen mit chai formulieren
    const initialData = App.data();
    expect(initialData.item).to.equal("");
    expect(initialData.items).to.deep.equal([]);
  });
});
