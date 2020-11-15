<template>
  <div class="side-panel" :class="{ 'has-env': !!env }">
    <h3>
      <span v-if="newEnv">
        Create a new environment for <i>{{ projectName }}</i> project
      </span>
      <transition name="fade-in">
        <div v-if="!newEnv">
          <span> Environment settings </span>
          <div class="env-btns">
            <ConfirmationDeleteButton
              v-model="deleteConfirm"
              @action="$emit('delete-env', env.id)"
            >
              <template #beforeButton>
                <CoreButton
                  elevation
                  class="clone-env"
                  icon-name="Clone"
                  @click="$emit('clone-env', env.id)"
                >
                  Clone
                </CoreButton>
              </template>
            </ConfirmationDeleteButton>
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
          <div>
            <input
              ref="name"
              :id="$id('name')"
              :class="{ error: $v.name.$error }"
              type="text"
              v-model="name"
              @keypress.stop.prevent.enter="createAndConfigure"
            />
            <div class="error" v-if="$v.name.$error">
              Name field is required.
            </div>
          </div>
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
          <div>
            <input
              :class="{ error: $v.url.$error }"
              :id="$id('url')"
              type="text"
              v-model="url"
              placeholder="eg: https://www.ecosia.org"
              @keypress.stop.prevent.enter="createAndConfigure"
            />
            <div class="error" v-if="$v.url.$error">
              Url field is required and must have an url format.
            </div>
          </div>
        </div>
        <transition name="fade-in">
          <div v-if="!newEnv">
            <div class="label-set">
              <label :for="$id('append-url-params')"> Append url params </label>
              <div>
                <input
                  :class="{ error: $v.appendUrlParams.$error }"
                  :id="$id('append-url-params')"
                  type="text"
                  v-model="appendUrlParams"
                  placeholder="eg: search=true&query=dev&..."
                />
                <div class="error" v-if="$v.appendUrlParams.$error">
                  Append url params is not valid. (eg: search=true&query=dev )
                </div>
              </div>
            </div>
            <div class="label-set">
              <label :for="$id('remove-url-params')"> Remove url params </label>
              <div>
                <input
                  :id="$id('remove-url-params')"
                  :class="{ error: $v.removeUrlParams.$error }"
                  type="text"
                  v-model="removeUrlParams"
                  placeholder="eg: search,query,..."
                />
                <div class="error" v-if="$v.removeUrlParams.$error">
                  Remove url params is not valid. (eg: search,query )
                </div>
              </div>
            </div>
          </div>
        </transition>

        <div v-if="newEnv" class="create-btns">
          <CoreButton
            class="cancel-btn"
            @click.prevent="$emit('cancel-new-env')"
          >
            Cancel
          </CoreButton>

          <CoreButton
            icon-name="Add"
            variation="positive"
            class="create-env-btn"
            @click.prevent="createAndConfigure"
          >
            Create and configure
          </CoreButton>
        </div>
      </fieldset>

      <transition name="fade-in">
        <div class="override-options" v-if="!newEnv">
          <div class="override-message">
            <span>
              Overrides global options for this environment <br />
              <i>Fields with * are using global options, change to override</i>
            </span>
            <CoreButton
              elevation
              icon-name="GoBack"
              @click.prevent="resetToGlobalOptions"
              v-if="hasOverrides"
            >
              Reset
            </CoreButton>
          </div>

          <EditorFormBadge
            v-if="env"
            :option="mergedEnv"
            :env="env"
            @update:option="updateComputed"
          />

          <EditorFormRibbon
            v-if="env && ribbonEnabled"
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
import { removeUndefined } from "@/services/utils";
import { DEFAULT_OPTIONS } from "@/services/business/storage/defaults";
import ConfirmationDeleteButton from "@/components/options/form/ConfirmationDeleteButton";
import { required, url } from "@vuelidate/validators";
import CoreButton from "@/components/core/Button";
import { helpers } from "@vuelidate/validators";

const computed = getComputedFactory("mergedEnv");

export default {
  name: "EditorFormConfigEnv",
  components: {
    CoreButton,
    ConfirmationDeleteButton,
    EditorFormBadge,
    EditorFormRibbon,
  },
  props: {
    newEnv: {
      type: Boolean,
      default: false,
    },
    env: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
    projectName: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      deleteConfirm: false,
    };
  },
  watch: {
    newEnv(val) {
      const nameEl = this.$refs.name;
      if (val && nameEl) {
        nameEl.focus();
        nameEl.setSelectionRange(0, nameEl.value.length);
        this.$v.$reset();
      }
    },
  },
  emits: [
    "update-env",
    "delete-env",
    "clone-env",
    "create-new-env",
    "cancel-new-env",
  ],
  computed: {
    ribbonEnabled: () => !window.ENV || window.ENV.WITHOUT_RIBBON !== true,
    mergedEnv() {
      const env = this.env
        ? deepmerge(
            deepmerge(deepmerge({}, DEFAULT_OPTIONS), this.config.options),
            this.env
          )
        : {};
      return env;
    },
    name: computed("name"),
    shortName: computed("shortName"),
    url: computed("url"),
    appendUrlParams: computed("appendUrlParams", null),
    removeUrlParams: computed("removeUrlParams", null),
    displayDomain: computed("displayDomain", null),
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
  },
  validations() {
    return {
      name: { required },
      url: { required, url },
      appendUrlParams: {
        searchParams: (value) =>
          !helpers.req(value) ||
          !!value.match(/^([^=&]+=[^=&]+)(&[^=&]+=[^=&]+)*$/),
      },
      removeUrlParams: {
        listString: (value) =>
          !helpers.req(value) || !!value.match(/^[^,]+(,[^,]+)*$/),
      },
    };
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
        removeUrlParams,
      } = this.env;

      const newEnv = {
        id,
        name,
        shortName,
        url,
        appendUrlParams,
        removeUrlParams,
      };
      removeUndefined(newEnv);

      this.$emit("update-env", newEnv);
    },
    createAndConfigure() {
      if (this.newEnv) {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.$emit("create-new-env", this.env);
        }
      }
    },
  },
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
    color: rgba(var(--blue));
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

    > div {
      display: flex;
      flex: 1;
      flex-direction: column;
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
  color: rgba(var(--ruby));
}

.field-domain,
.form-ribbon {
  margin-top: 8px;
}

.override-options {
  border-top: 1px solid rgba(var(--bg-grey-2));
  padding-top: 4px;

  @at-root .dark-mode & {
    border-top: 1px solid rgba(var(--black-2));
  }

  .override-message {
    display: flex;
    align-items: center;

    i {
      color: rgba(var(--blue));
      font-weight: normal;
    }

    > span {
      padding: 9px 0;
      flex: 1;
    }
  }
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
}
</style>
