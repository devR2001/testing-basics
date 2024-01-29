import App from "@/App.vue";
import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";

describe("Die App-Component", () => {
  /*   it("Dieser Test sollte erfolgreich ausgeführt werden.", () => {
    expect("Hello" + " World!").to.equal("Hello World!");
  }); */
  /*
    const wrapper = mount(Component);
    const vm = wrapper.vm;
    const html = wrapper.html();
    const button = wrapper.find(button);  
  */
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  it("setzt die initialen Daten korrekt.", () => {
    // const initialData = App.data();
    // Erwartungen mit chai formulieren
    expect(wrapper.vm.item).to.equal("");
    expect(wrapper.vm.items).to.deep.equal([]);
  });

  it("rendert das korrekte Template.", () => {
    expect(wrapper.html()).to.contain('<th class="fs-2">Einträge</th>');
    expect(wrapper.html()).to.contain(
      '<input type="text" class="form-control" placeholder="Eintrag hinzufügen...">'
    );
  });

  it("setzt den Button 'Hinzufügen' auf disabled.", () => {
    const addItemButton = wrapper.find(".btn.btn-primary");
    expect(addItemButton.element.disabled).to.be.true;
  });

  describe("Der Benutzer schreibt etwas in das Textfeld", () => {
    let inputField;
    beforeEach(async () => {
      inputField = wrapper.find("input");
      inputField.element.value = "Testeintrag";
      await inputField.trigger("input");
    });

    it("Das 'item'-Datenattribut wird aktualisiert.", () => {
      expect(wrapper.vm.item).to.equal("Testeintrag");
    });

    it("Der Button 'Hinzufügen' steht zur Verfügung.", () => {
      const addItemButton = wrapper.find(".btn.btn-primary");
      expect(addItemButton.element.disabled).to.be.false;
    });

    describe("und löscht seine Eingabe wieder.", () => {
      it("Der Button 'Hinzufügen' steht nicht zur Verfügung.", async () => {
        inputField.element.value = "";
        await inputField.trigger("input");
        const addItemButton = wrapper.find(".btn.btn-primary");
        expect(addItemButton.element.disabled).to.be.true;
      });
    });

    describe("und schickt das Formular ab.", () => {
      let addItemButton;
      let itemList;
      let inputField;
      beforeEach(async () => {
        wrapper.setData({ item: "Testeintrag" });
        addItemButton = wrapper.find(".btn.btn-primary");
        itemList = wrapper.find(".item-list");
        inputField = wrapper.find("input");
        await addItemButton.trigger("submit");
      });

      it("Ein neuer Eintrag befindet sich im items-Datenattribut.", () => {
        expect(wrapper.vm.items).to.contain("Testeintrag");
      });
      it("Der neue Eintrag befindet sich der gerenderten Tabelle.", () => {
        // const itemList = wrapper.find(".item-list");
        expect(itemList.html()).to.contain('<td class="fs-4">Testeintrag</td>');
      });
      it("Das item-Datenattribut ist leer und das Textfeld ebenfalls.", () => {
        // const inputField = wrapper.find("input");
        expect(wrapper.vm.item).to.equal("");
        expect(inputField.element.value).to.equal("");
      });
      it("Der 'Hinzufügen'-Button steht nicht mehr zur Verfügung.", () => {
        expect(addItemButton.element.disabled).to.be.true;
      });
    });
  });

  describe("Der Benutzer klickt auf das 'Alle entfernen'-Span", () => {
    let itemList;
    let removeItemsSpan;

    beforeEach(async () => {
      itemList = wrapper.find(".item-list");
      removeItemsSpan = wrapper.find(".float-end");
      wrapper.setData({
        items: ["Testeintrag #1", "Testeintrag #2", "Testeintrag #3"],
      });
      await removeItemsSpan.trigger("click");
    });

    it("Alle Einträge sollten aus dem items-Datenattribut gelöscht sein.", () => {
      expect(wrapper.vm.items).to.deep.equal([]);
      expect(itemList.html()).to.not.contain(
        '<td class="fs-4">Testeintrag #1</td>'
      );
      expect(itemList.html()).to.not.contain(
        '<td class="fs-4">Testeintrag #2</td>'
      );
      expect(itemList.html()).to.not.contain(
        '<td class="fs-4">Testeintrag #3</td>'
      );
    });
  });
});
