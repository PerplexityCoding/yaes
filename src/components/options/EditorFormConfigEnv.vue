<template>
  <div class="side-panel" :class="{ 'has-env': !!env }">
    <h3>
      <span v-if="newEnv">
        Create a new environment for <i>{{ projectName }}</i> project
      </span>
      <transition name="fade-in">
        <div v-if="!newEnv">
          <span>
            Environment settings
          </span>
          <div class="env-btns">
            <button
              v-if="!deleteConfirm"
              class="clone-env"
              @click="$emit('clone-env', env.id)"
            >
              <CloneIcon height="18px" width="18px" />
              Clone
            </button>
            <ConfirmationDeleteButton
              v-model="deleteConfirm"
              @action="$emit('delete-env', env.id)"
            />
          </div>
        </div>
      </transition>
    </h3>
    <form>
      <fieldset class="basis-settings">
        <p class="mandatory-field-message">
          <i>Fields with <b>*</b> are mandatory</i>
        </p>
        <div class="label-set">
          <label :for="$id('name')"> Name <b>*</b> </label>
          <input ref="name" :id="$id('name')" type="text" v-model="name" />
        </div>
        <transition name="fade-in">
          <div class="label-set" v-if="!newEnv">
            <label :for="$id('short-name')"> Short name </label>
            <input
              :id="$id('short-name')"
              type="text"
              v-model="shortName"
              maxlength="4"
            />
          </div>
        </transition>
        <div class="label-set">
          <label :for="$id('url')"> Url <b>*</b> </label>
          <input
            :id="$id('url')"
            type="text"
            v-model="url"
            placeholder="eg: https://www.ecosia.org"
          />
        </div>
        <transition name="fade-in">
          <div v-if="!newEnv">
            <div class="label-set">
              <label :for="$id('append-url-params')"> Append url params </label>
              <input
                :id="$id('append-url-params')"
                type="text"
                v-model="appendUrlParams"
                placeholder="eg: search=true&query=dev&..."
              />
            </div>
            <div class="label-set">
              <label :for="$id('remove-url-params')"> Remove url params </label>
              <input
                :id="$id('remove-url-params')"
                type="text"
                v-model="removeUrlParams"
                placeholder="eg: search,query,..."
              />
            </div>
          </div>
        </transition>

        <div v-if="newEnv" class="create-btns">
          <button class="cancel-btn" @click.prevent="$emit('cancel-new-env')">
            Cancel
          </button>

          <button
            class="create-env-btn"
            @click.prevent="$emit('create-new-env', env)"
          >
            <AddIcon height="18px" width="18px" /> Create and configure
          </button>
        </div>
      </fieldset>

      <transition name="fade-in">
        <div class="override-options" v-if="!newEnv">
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
            <div class="label-set">
              <input
                :id="$id('display-domain')"
                type="checkbox"
                v-model="displayDomain"
              />
              <label
                :for="$id('display-domain')"
                :class="{ defaulted: env.displayDomain === undefined }"
              >
                Display domain
              </label>
            </div>
          </fieldset>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
import deepmerge from "deepmerge";
import { getComputedFactory } from "@/services/business/ui";
import EditorFormRibbon from "@/components/options/form/EditorFormRibbon";
import EditorFormBadge from "@/components/options/form/EditorFormBadge";
import CloneIcon from "@/components/icons/Clone";
import GoBack from "@/components/icons/GoBack";
import { removeUndefined } from "@/services/utils";
import { DEFAULT_OPTIONS } from "@/services/business/storage";
import ConfirmationDeleteButton from "@/components/options/form/ConfirmationDeleteButton";
import AddIcon from "@/components/icons/Add";

const computed = getComputedFactory("mergedEnv");

export default {
  name: "EditorFormConfigEnv",
  components: {
    ConfirmationDeleteButton,
    EditorFormBadge,
    EditorFormRibbon,
    CloneIcon,
    GoBack,
    AddIcon
  },
  props: {
    newEnv: {
      type: Boolean,
      default: false
    },
    env: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    projectName: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      deleteConfirm: false
    };
  },
  watch: {
    newEnv(val) {
      console.log(val);
      const nameEl = this.$refs.name;
      if (val && nameEl) {
        nameEl.focus();
        nameEl.setSelectionRange(0, nameEl.value.length);
      }
    }
  },
  emits: [
    "update-env",
    "delete-env",
    "clone-env",
    "create-new-env",
    "cancel-new-env"
  ],
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
  min-height: 34px;

  > div {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .env-btns {
    display: flex;
  }

  span {
    flex: 1;
  }

  i {
    color: var(--blue);
  }
}

.basis-settings {
  padding: 4px 0;

  .label-set {
    margin-bottom: 8px;

    label {
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

.clone-env {
  fill: var(--fg-black);
}

.side-panel {
  width: 100%;
}

.has-env {
  font-weight: 500;
}

.create-btns {
  display: flex;
  justify-content: flex-end;

  .create-env-btn {
    fill: var(--green);
    color: var(--green);
  }
}
</style>
