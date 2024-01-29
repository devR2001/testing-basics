<template>
  <div id="app" class="container mt-5">
    <div class="row">
      <div class="col-6 offset-3">
        <table class="table">
          <thead>
            <tr>
              <th class="fs-2">Einträge</th>
            </tr>
          </thead>
          <tbody class="item-list">
            <tr v-for="(item, index) in items" :key="index">
              <td class="fs-4">{{ item }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>
                <form @submit="addItem">
                  <div class="my-2">
                    <input
                      v-model="item"
                      type="text"
                      class="form-control"
                      placeholder="Eintrag hinzufügen..."
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="!item"
                  >
                    Hinzufügen
                  </button>
                  <span class="float-end" role="button" @click="removeAllItems"
                    >Alle entfernen</span
                  >
                </form>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      item: "",
      items: [],
    };
  },
  methods: {
    addItem(evt) {
      evt.preventDefault();
      this.items.push(this.item);
      this.item = "";
    },
    removeAllItems() {
      this.items = [];
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>
