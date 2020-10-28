<template>
  <div class="side-panel" :class="{ 'has-env': !!env }">
    <h3>
      <span>
        Environment settings
      </span>
      <button class="clone-env" @click="cloneEnv">
        <CloneIcon height="18px" width="18px" />
        Clone
      </button>
      <button class="delete-env" @click="deleteEnv">
        <DeleteIcon height="18px" width="18px" />
        Delete
      </button>
    </h3>
    <form>
      <fieldset class="basis-settings">
        <label>
          <span> Name </span> <input type="text" v-model="name" />
        </label>
        <label>
          <span> Short name </span> <input type="text" v-model="shortName" />
        </label>
        <label>
          <span> Url </span>
          <input
            type="text"
            v-model="url"
            placeholder="https://www.exemple.com"
          />
        </label>
        <label>
          <span> Append url params </span>
          <input
            type="text"
            v-model="appendUrlParams"
            placeholder="eg: search=true&query=dev&..."
          />
        </label>
        <label>
          <span> Remove url params </span>
          <input
            type="text"
            v-model="removeUrlParams"
            placeholder="eg: search,query,..."
          />
        </label>
      </fieldset>

      <div class="override-options">
        <div class="override-message">
          <span>
            Overrides default options for this environment <br />
            <i>* Grayed out fields are using global options</i>
          </span>
          <button @click.prevent="resetToGlobalOptions" v-if="hasOverrides">
            <GoBack height="18px" width="18px" />
            Reset
          </button>
        </div>

        <EditorFormBadge
          :option="mergedEnv"
          :env="env"
          @update:option="updateComputed"
        />

        <EditorFormRibbon
          class="form-ribbon"
          :option="mergedEnv"
          :env="env"
          @update:option="updateComputed"
        />

        <fieldset class="field-domain">
          <label :class="{ defaulted: env.displayDomain === undefined }">
            <input type="checkbox" v-model="displayDomain" /> Display domain
          </label>
        </fieldset>
      </div>
    </form>
  </div>
</template>

<script>
import deepmerge from "deepmerge";
import { getComputedFactory } from "@/services/business/ui";
import EditorFormRibbon from "@/components/options/form/EditorFormRibbon";
import EditorFormBadge from "@/components/options/form/EditorFormBadge";
import DeleteIcon from "@/components/icons/Delete";
import CloneIcon from "@/components/icons/Clone";
import GoBack from "@/components/icons/GoBack";

const computed = getComputedFactory("mergedEnv");

export default {
  name: "EditorFormConfigEnv",
  components: {
    EditorFormBadge,
    EditorFormRibbon,
    DeleteIcon,
    CloneIcon,
    GoBack
  },
  props: {
    env: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  emits: ["update:env", "delete-env", "clone-env"],
  computed: {
    mergedEnv() {
      return deepmerge(deepmerge({}, this.config.options), this.env);
    },
    name: computed("name"),
    shortName: computed("shortName"),
    url: computed("url"),
    appendUrlParams: computed("appendUrlParams", null),
    removeUrlParams: computed("removeUrlParams", null),
    displayDomain: computed("displayDomain", null, true),
    hasOverrides() {
      const env = this.env;
      const hasBadgeOverrides =
        env.displayBadge !== undefined || env.badgeOptions !== undefined;
      const hasRibbonOverrides =
        env.displayRibbon !== undefined || env.ribbonOptions !== undefined;
      const hasDisplayDomainOverrides = env.displayDomain !== undefined;
      return (
        hasBadgeOverrides || hasRibbonOverrides || hasDisplayDomainOverrides
      );
    }
  },
  methods: {
    updateComputed(data) {
      this.$emit("update:env", deepmerge(deepmerge({}, this.env), data));
    },
    resetToGlobalOptions() {
      const {
        id,
        name,
        shortName,
        url,
        appendUrlParams,
        removeUrlParams
      } = this.env;

      this.$emit("update:env", {
        id,
        name,
        shortName,
        url,
        appendUrlParams,
        removeUrlParams
      });
    },
    deleteEnv() {
      this.$emit("delete-env", this.env);
    },
    cloneEnv() {
      this.$emit("clone-env", this.env);
    }
  }
};
</script>

<style scoped lang="scss">
h3 {
  margin: 0 0 8px 0;
  font-size: 12px;
  display: flex;
  align-items: center;

  span {
    flex: 1;
  }
}

.basis-settings {
  padding: 4px 0;

  label {
    margin-bottom: 8px;

    span {
      min-width: 114px;
      text-align: right;
      padding-right: 16px;
    }

    input {
      flex: 1;
    }
  }
}

.field-domain,
.form-ribbon {
  margin-top: 8px;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  display: flex;
  align-items: center;
  background: none;
  padding: 8px;
  border-radius: 4px;

  svg {
    margin-right: 4px;
  }

  &:hover {
    background: var(--bg-grey-hover);
  }
}

.override-options {
  border-top: 1px solid var(--bg-grey-2);
  padding-top: 4px;

  .override-message {
    display: flex;
    align-items: center;

    i {
      color: var(--fg-black-disabled);
      font-weight: normal;
    }

    > span {
      padding: 9px 0;
      flex: 1;
    }
  }
}

.delete-env {
  fill: var(--ruby);
  color: var(--ruby);
}

.clone-env {
  fill: var(--fg-black);
}

.side-panel {
  width: 100%;
}

.has-env {
  font-weight: 500;
}
</style>
