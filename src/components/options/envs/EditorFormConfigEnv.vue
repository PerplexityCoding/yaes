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
            <ConfirmationDeleteButton v-model="deleteConfirm" @action="$emit('delete-env', env.id)">
              <template #beforeButton>
                <CoreButton
                  elevation
                  class="clone-env"
                  icon-name="CloneIcon"
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
    <form @submit="submit($event)">
      <fieldset class="basis-settings">
        <p class="mandatory-field-message">
          <i>Fields with <b>*</b> are mandatory</i>
        </p>
        <div class="label-set">
          <label :for="$id('name')"> Name <b>*</b> </label>
          <div>
            <CoreInput
              type="text"
              :class="{ error: errors.name }"
              :id="$id('name')"
              @focusout="update()"
              @erase="update()"
              :focus-on-mounted="newEnv"
              v-model="fieldName"
            />
            <div class="error" v-if="errors.name">Name field is required.</div>
          </div>
        </div>
        <transition name="fade-in">
          <div class="label-set" v-if="!newEnv">
            <label :for="$id('short-name')"> Short name </label>
            <CoreInput
              :id="$id('short-name')"
              type="text"
              :maxlength="4"
              @focusout="update()"
              @erase="update()"
              v-model="fieldShortName"
            />
          </div>
        </transition>
        <div class="label-set">
          <label :for="$id('url')"> Url <b>*</b> </label>
          <div>
            <CoreInput
              :class="{ error: errors.url }"
              :id="$id('url')"
              type="text"
              placeholder="eg: https://www.ecosia.org"
              @focusout="update()"
              @erase="update()"
              v-model="fieldUrl"
            />
            <div class="error" v-if="errors.url">
              Url field is required and must have an url format.
            </div>
          </div>
        </div>
        <transition name="fade-in">
          <div v-if="!newEnv">
            <div class="label-set">
              <label :for="$id('append-url-params')"> Append url params </label>
              <div>
                <CoreInput
                  :class="{ error: errors.appendUrlParams }"
                  :id="$id('append-url-params')"
                  type="text"
                  placeholder="eg: search=true&query=dev&..."
                  name="appendUrlParams"
                  @focusout="update()"
                  @erase="update()"
                  v-model="fieldAppendUrlParams"
                />
                <div class="error" v-if="errors.appendUrlParams">
                  Append url params is not valid. (eg: search=true&query=dev )
                </div>
              </div>
            </div>
            <div class="label-set">
              <label :for="$id('remove-url-params')"> Remove url params </label>
              <div>
                <CoreInput
                  :id="$id('remove-url-params')"
                  :class="{ error: errors.removeUrlParams }"
                  type="text"
                  placeholder="eg: search,query,..."
                  @focusout="update()"
                  @erase="update()"
                  v-model="fieldRemoveUrlParams"
                />
                <div class="error" v-if="errors.removeUrlParams">
                  Remove url params is not valid. (eg: search,query )
                </div>
              </div>
            </div>
          </div>
        </transition>

        <div v-if="newEnv" class="create-btns">
          <CoreButton icon-name="AddIcon" variation="positive" class="create-env-btn">
            Create and configure
          </CoreButton>

          <CoreButton class="cancel-btn" @click.stop.prevent="$emit('cancel-new-env')">
            Cancel
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
              icon-name="GoBackIcon"
              @click.prevent="resetToGlobalOptions"
              v-if="hasOverrides"
            >
              Reset
            </CoreButton>
          </div>

          <EditorFormBadge
            v-if="env"
            :options="mergedEnv"
            :env="env"
            @update:options="updateComputed"
          />

          <EditorFormRibbon
            v-if="env && ribbonEnabled"
            class="form-ribbon"
            :options="mergedEnv"
            :env="env"
            @update:options="updateComputed"
          />

          <fieldset class="field-domain">
            <div class="label-set">
              <input :id="$id('display-domain')" type="checkbox" v-model="displayDomain" />
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
              <input :id="$id('ping-url')" type="checkbox" v-model="pingUrl" />
              <label :for="$id('ping-url')" :class="{ defaulted: env.pingUrl === undefined }">
                Check if environment url is up
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
import EditorFormRibbon from "@/components/options/form/EditorFormRibbon.vue";
import EditorFormBadge from "@/components/options/form/EditorFormBadge.vue";
import { removeEmptyString, removeUndefined } from "@/services/utils";
import { DEFAULT_OPTIONS } from "@/services/business/storage/defaults";
import ConfirmationDeleteButton from "@/components/options/core/ConfirmationDeleteButton.vue";
import CoreButton from "@/components/options/core/Button.vue";
import CoreInput from "@/components/options/core/Input.vue";
import { useForm, useField } from "vee-validate";

import { defineComponent, computed, ref } from "vue";
import { createComputedFactory } from "@/services/business/ui";

function useFormValidation(mergedEnv) {
  const { handleSubmit, errors, values, validate } = useForm();
  const { value: fieldName } = useField("name", "required", {
    initialValue: mergedEnv.value.name || "",
  });
  const { value: fieldShortName } = useField("shortName", "", {
    initialValue: mergedEnv.value.shortName || "",
  });
  const { value: fieldUrl } = useField("url", "required|url", {
    initialValue: mergedEnv.value.url || "",
  });
  const { value: fieldAppendUrlParams } = useField("appendUrlParams", "urlParams", {
    initialValue: mergedEnv.value.appendUrlParams || "",
  });
  const { value: fieldRemoveUrlParams } = useField("removeUrlParams", "list", {
    initialValue: mergedEnv.value.removeUrlParams || "",
  });

  return {
    handleSubmit,
    values,
    validate,
    fields: {
      errors,
      fieldName,
      fieldShortName,
      fieldUrl,
      fieldAppendUrlParams,
      fieldRemoveUrlParams,
    },
  };
}

export default defineComponent({
  name: "EditorFormConfigEnv",
  components: {
    CoreButton,
    CoreInput,
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
  emits: ["update-env", "delete-env", "clone-env", "create-new-env", "cancel-new-env"],
  setup(props, context) {
    const deleteConfirm = ref(false);
    const ribbonEnabled = !window.ENV || window.ENV.WITHOUT_RIBBON !== true;

    const mergedEnv = computed(() => {
      const env = props.env
        ? deepmerge(deepmerge(deepmerge({}, DEFAULT_OPTIONS), props.config.options), props.env)
        : {};
      return env;
    });

    const { handleSubmit, values, validate, fields } = useFormValidation(mergedEnv);

    const hasOverrides = computed(() => {
      const env = props.env;
      if (env) {
        const hasBadgeOverrides = env.displayBadge !== undefined || env.badgeOptions !== undefined;
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
    });

    const updateComputed = (data) => {
      const mergedEnv = deepmerge(deepmerge({}, props.env), data);
      context.emit("update-env", mergedEnv);
    };

    const resetToGlobalOptions = () => {
      const { id, name, shortName, url, appendUrlParams, removeUrlParams } = props.env;

      const newEnv = {
        id,
        name,
        shortName,
        url,
        appendUrlParams,
        removeUrlParams,
      };
      removeUndefined(newEnv);

      context.emit("update-env", newEnv);
    };

    const submit = handleSubmit(async () => {
      const isValid = await validate();
      if (isValid && props.newEnv) {
        const mergedEnv = deepmerge(deepmerge({}, props.env), values);
        removeEmptyString(mergedEnv);
        context.emit("create-new-env", mergedEnv);
      }
    });

    const update = async () => {
      if (!props.newEnv) {
        const isValid = await validate();
        if (isValid) {
          const mergedEnv = deepmerge(deepmerge({}, props.env), values);
          removeEmptyString(mergedEnv);
          context.emit("update-env", mergedEnv);
        }
      }
    };

    const createComputed = createComputedFactory(update);

    const displayDomain = createComputed(
      () => mergedEnv.value.displayDomain,
      (val) => ({ displayDomain: val })
    );

    const pingUrl = createComputed(
      () => mergedEnv.value.pingUrl,
      (val) => ({ pingUrl: val })
    );

    return {
      displayDomain,
      pingUrl,
      hasOverrides,
      deleteConfirm,
      ribbonEnabled,
      mergedEnv,
      updateComputed,
      resetToGlobalOptions,
      submit,
      update,
      ...fields,
    };
  },
});
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
