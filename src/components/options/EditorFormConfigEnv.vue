<template>
  <div v-if="env" class="side-panel" :class="{ 'has-env': !!envId }">
    <h3>
      <span>
        Environment settings
      </span>
      <button class="clone-env" @click="$emit('clone-env', envId)">
        <CloneIcon height="18px" width="18px" />
        Clone
      </button>
      <button class="delete-env" @click="$emit('delete-env', envId)">
        <DeleteIcon height="18px" width="18px" />
        Delete
      </button>
    </h3>
    <form>
      <fieldset class="basis-settings">
        <p class="mandatory-field-message">
          <i>Fields with <b>*</b> are mandatory</i>
        </p>
        <label>
          <span> Name <b>*</b> </span> <input type="text" v-model="name" />
        </label>
        <label>
          <span> Short name </span>
          <input type="text" v-model="shortName" maxlength="4" />
        </label>
        <label>
          <span> Url <b>*</b> </span>
          <input
            type="text"
            v-model="url"
            placeholder="eg: https://www.ecosia.org"
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
            <i>Fields with * are using global options, change to override</i>
          </span>
          <button @click.prevent="resetToGlobalOptions" v-if="hasOverrides">
            <GoBack height="18px" width="18px" />
            Reset
          </button>
        </div>

        <EditorFormBadge
          v-if="env"
          :option="mergedEnv"
          :env="env"
          @update:option="updateComputed"
        />

        <EditorFormRibbon
          v-if="env"
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
import { getEnvById } from "@/services/business/bo/config";
import { removeUndefined } from "@/services/utils";
import { DEFAULT_OPTIONS } from "@/services/business/storage";

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
    envId: {
      type: Number,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  emits: ["update-env", "delete-env", "clone-env"],
  computed: {
    mergedEnv() {
      return this.env
        ? deepmerge(
            deepmerge(deepmerge({}, DEFAULT_OPTIONS), this.config.options),
            this.env
          )
        : {};
    },
    name: computed("name"),
    shortName: computed("shortName"),
    url: computed("url"),
    appendUrlParams: computed("appendUrlParams", null),
    removeUrlParams: computed("removeUrlParams", null),
    displayDomain: computed("displayDomain", null, true),
    hasOverrides() {
      const env = this.env;
      if (env) {
        const hasBadgeOverrides =
          env.displayBadge !== undefined || env.badgeOptions !== undefined;
        const hasRibbonOverrides =
          env.displayRibbon !== undefined || env.ribbonOptions !== undefined;
        const hasDisplayDomainOverrides = env.displayDomain !== undefined;
        return (
          hasBadgeOverrides || hasRibbonOverrides || hasDisplayDomainOverrides
        );
      }
      return false;
    },
    env() {
      return getEnvById(this.config, this.envId);
    }
  },
  methods: {
    updateComputed(data) {
      const mergedEnv = deepmerge(deepmerge({}, this.env), data);
      this.$emit("update-env", mergedEnv);
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

      const newEnv = {
        id,
        name,
        shortName,
        url,
        appendUrlParams,
        removeUrlParams
      };
      removeUndefined(newEnv);

      this.$emit("update-env", newEnv);
    }
  }
};
</script>

<style scoped lang="scss">
h3 {
  margin: 0;
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

.mandatory-field-message {
  margin: 0 0 12px 0;
  font-weight: normal;
}

b {
  color: var(--ruby);
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
      color: var(--blue);
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
