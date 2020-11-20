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
    <Form ref="form" v-slot="{ errors, handleSubmit, values }" as="div">
      <form @submit="handleSubmit($event, submit)">
        <fieldset class="basis-settings">
          <p class="mandatory-field-message">
            <i>Fields with <b>*</b> are mandatory</i>
          </p>
          <div class="label-set">
            <label :for="$id('name')"> Name <b>*</b> </label>
            <div>
              <Field
                ref="name"
                type="text"
                name="name"
                rules="required"
                :class="{ error: errors.name }"
                :id="$id('name')"
                @focusout="update(values)"
                :value="mergedEnv.name"
              />
              <div class="error" v-if="errors.name">
                Name field is required.
              </div>
            </div>
          </div>
          <transition name="fade-in">
            <div class="label-set" v-if="!newEnv">
              <label :for="$id('short-name')"> Short name </label>
              <Field
                :id="$id('short-name')"
                type="text"
                name="shortName"
                maxlength="4"
                @focusout="update(values)"
                :value="mergedEnv.shortName"
              />
            </div>
          </transition>
          <div class="label-set">
            <label :for="$id('url')"> Url <b>*</b> </label>
            <div>
              <Field
                :class="{ error: errors.url }"
                :id="$id('url')"
                type="text"
                name="url"
                rules="required|url"
                placeholder="eg: https://www.ecosia.org"
                @focusout="update(values)"
                :value="mergedEnv.url"
              />
              <div class="error" v-if="errors.url">
                Url field is required and must have an url format.
              </div>
            </div>
          </div>
          <transition name="fade-in">
            <div v-if="!newEnv">
              <div class="label-set">
                <label :for="$id('append-url-params')">
                  Append url params
                </label>
                <div>
                  <Field
                    :class="{ error: errors.appendUrlParams }"
                    :id="$id('append-url-params')"
                    type="text"
                    placeholder="eg: search=true&query=dev&..."
                    rules="urlParams"
                    name="appendUrlParams"
                    @focusout="update(values)"
                    :value="mergedEnv.appendUrlParams"
                  />
                  <div class="error" v-if="errors.appendUrlParams">
                    Append url params is not valid. (eg: search=true&query=dev )
                  </div>
                </div>
              </div>
              <div class="label-set">
                <label :for="$id('remove-url-params')">
                  Remove url params
                </label>
                <div>
                  <Field
                    :id="$id('remove-url-params')"
                    :class="{ error: errors.removeUrlParams }"
                    type="text"
                    rules="list"
                    placeholder="eg: search,query,..."
                    name="removeUrlParams"
                    @focusout="update(values)"
                    :value="mergedEnv.removeUrlParams"
                  />
                  <div class="error" v-if="errors.removeUrlParams">
                    Remove url params is not valid. (eg: search,query )
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <div v-if="newEnv" class="create-btns">
            <CoreButton
              icon-name="Add"
              variation="positive"
              class="create-env-btn"
            >
              Create and configure
            </CoreButton>

            <CoreButton
              class="cancel-btn"
              @click.stop.prevent="$emit('cancel-new-env')"
            >
              Cancel
            </CoreButton>
          </div>
        </fieldset>

        <transition name="fade-in">
          <div class="override-options" v-if="!newEnv">
            <div class="override-message">
              <span>
                Overrides global options for this environment <br />
                <i
                  >Fields with * are using global options, change to override</i
                >
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

            <fieldset class="field-domain">
              <div class="label-set">
                <input
                  :id="$id('ping-url')"
                  type="checkbox"
                  v-model="pingUrl"
                />
                <label
                  :for="$id('ping-url')"
                  :class="{ defaulted: env.pingUrl === undefined }"
                >
                  Check if environment url is up
                </label>
              </div>
            </fieldset>
          </div>
        </transition>
      </form>
    </Form>
  </div>
</template>

<script>
import deepmerge from "deepmerge";
import { getComputedFactory } from "@/services/business/ui";
import EditorFormRibbon from "@/components/options/form/EditorFormRibbon";
import EditorFormBadge from "@/components/options/form/EditorFormBadge";
import { removeEmptyString, removeUndefined } from "@/services/utils";
import { DEFAULT_OPTIONS } from "@/services/business/storage/defaults";
import ConfirmationDeleteButton from "@/components/options/form/ConfirmationDeleteButton";
import CoreButton from "@/components/core/Button";
import { Field, Form } from "vee-validate";

const computed = getComputedFactory("mergedEnv");

export default {
  name: "EditorFormConfigEnv",
  components: {
    CoreButton,
    ConfirmationDeleteButton,
    EditorFormBadge,
    EditorFormRibbon,
    Field,
    Form,
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
  mounted() {
    if (this.newEnv) {
      const nameEl = this.$refs.name.$el;
      if (nameEl) {
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
    displayDomain: computed("displayDomain", null),
    pingUrl: computed("pingUrl", null),
    hasOverrides() {
      const env = this.env;
      if (env) {
        const hasBadgeOverrides =
          env.displayBadge !== undefined || env.badgeOptions !== undefined;
        const hasRibbonOverrides =
          env.displayRibbon !== undefined || env.ribbonOptions !== undefined;
        const hasDisplayDomainOverrides = env.displayDomain !== undefined;
        const hasDisplayPingOverrides = env.pingUrl !== undefined;
        return (
          hasBadgeOverrides ||
          hasRibbonOverrides ||
          hasDisplayDomainOverrides ||
          hasDisplayPingOverrides
        );
      }
      return false;
    },
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
    submit(values) {
      if (this.newEnv) {
        const mergedEnv = deepmerge(deepmerge({}, this.env), values);
        this.$emit("create-new-env", mergedEnv);
      }
    },
    update(values) {
      if (!this.newEnv) {
        const mergedEnv = deepmerge(deepmerge({}, this.env), values);
        removeEmptyString(mergedEnv);
        this.$emit("update-env", mergedEnv);
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
