'use strict';
var equal = require('ajv/lib/compile/equal');
var validate = (function() {
  var refVal = [];
  var refVal1 = (function() {
    return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      var errs_1 = errors;
      if (!refVal2(data, (dataPath || ''), parentData, parentDataProperty, rootData)) {
        if (vErrors === null) vErrors = refVal2.errors;
        else vErrors = vErrors.concat(refVal2.errors);
        errors = vErrors.length;
      } else {}
      if (errors === errs_1) {}
      var valid1 = errors === errs_1;
      if (valid1) {
        var errs_1 = errors;
        if ((data && typeof data === "object" && !Array.isArray(data))) {
          if (true) {
            var errs__1 = errors;
            var valid2 = true;
            if (data.shortName === undefined) {
              valid2 = true;
            } else {
              var errs_2 = errors;
              if (typeof data.shortName !== "string") {
                validate.errors = [{
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.shortName',
                  schemaPath: '#/allOf/1/properties/shortName/type',
                  params: {
                    type: 'string'
                  },
                  message: 'should be string'
                }];
                return false;
              }
              var valid2 = errors === errs_2;
            }
            if (valid2) {
              if (data.name === undefined) {
                valid2 = true;
              } else {
                var errs_2 = errors;
                if (typeof data.name !== "string") {
                  validate.errors = [{
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.name',
                    schemaPath: '#/allOf/1/properties/name/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  }];
                  return false;
                }
                var valid2 = errors === errs_2;
              }
              if (valid2) {
                if (data.url === undefined) {
                  valid2 = false;
                  validate.errors = [{
                    keyword: 'required',
                    dataPath: (dataPath || '') + "",
                    schemaPath: '#/allOf/1/required',
                    params: {
                      missingProperty: 'url'
                    },
                    message: 'should have required property \'url\''
                  }];
                  return false;
                } else {
                  var errs_2 = errors;
                  if (typeof data.url !== "string") {
                    validate.errors = [{
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.url',
                      schemaPath: '#/allOf/1/properties/url/type',
                      params: {
                        type: 'string'
                      },
                      message: 'should be string'
                    }];
                    return false;
                  }
                  var valid2 = errors === errs_2;
                }
                if (valid2) {}
              }
            }
            if (errs__1 == errors) {}
          }
        }
        if (errors === errs_1) {
          var errs__1 = errors;
          var valid1 = false;
          var errs_2 = errors;
          if ((data && typeof data === "object" && !Array.isArray(data))) {
            var missing2;
            if (((data.shortName === undefined) && (missing2 = '.shortName'))) {
              var err = {
                keyword: 'required',
                dataPath: (dataPath || '') + "",
                schemaPath: '#/allOf/1/anyOf/0/required',
                params: {
                  missingProperty: '' + missing2 + ''
                },
                message: 'should have required property \'' + missing2 + '\''
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            } else {}
          }
          if (errors === errs_2) {}
          var valid2 = errors === errs_2;
          valid1 = valid1 || valid2;
          if (!valid1) {
            var errs_2 = errors;
            if ((data && typeof data === "object" && !Array.isArray(data))) {
              var missing2;
              if (((data.name === undefined) && (missing2 = '.name'))) {
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + "",
                  schemaPath: '#/allOf/1/anyOf/1/required',
                  params: {
                    missingProperty: '' + missing2 + ''
                  },
                  message: 'should have required property \'' + missing2 + '\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {}
            }
            if (errors === errs_2) {}
            var valid2 = errors === errs_2;
            valid1 = valid1 || valid2;
            if (!valid1) {}
          }
          if (!valid1) {
            var err = {
              keyword: 'anyOf',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/allOf/1/anyOf',
              params: {},
              message: 'should match some schema in anyOf'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
            validate.errors = vErrors;
            return false;
          } else {
            errors = errs__1;
            if (vErrors !== null) {
              if (errs__1) vErrors.length = errs__1;
              else vErrors = null;
            }
          }
          if (errors === errs_1) {}
        }
        var valid1 = errors === errs_1;
        if (valid1) {}
      }
      if (errors === 0) {}
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal1.schema = {
    "allOf": [{
      "$ref": "#/definitions/options"
    }, {
      "properties": {
        "shortName": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      },
      "anyOf": [{
        "required": ["shortName"]
      }, {
        "required": ["name"]
      }],
      "required": ["url"]
    }]
  };
  refVal1.errors = null;
  refVal[1] = refVal1;
  var refVal2 = (function() {
    return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      if ((data && typeof data === "object" && !Array.isArray(data))) {
        var errs__0 = errors;
        var valid1 = true;
        var data1 = data.ribbon;
        if (data1 === undefined) {
          valid1 = true;
        } else {
          var errs_1 = errors;
          var errs__1 = errors,
            prevValid1 = false,
            valid1 = false,
            passingSchemas1 = null;
          var errs_2 = errors;
          if (typeof data1 !== "boolean") {
            var err = {
              keyword: 'type',
              dataPath: (dataPath || '') + '.ribbon',
              schemaPath: '#/properties/ribbon/oneOf/0/type',
              params: {
                type: 'boolean'
              },
              message: 'should be boolean'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var valid2 = errors === errs_2;
          if (valid2) {
            valid1 = prevValid1 = true;
            passingSchemas1 = 0;
          }
          var errs_2 = errors;
          var errs_3 = errors;
          if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
            var errs__3 = errors;
            var valid4 = true;
            if (data1.color === undefined) {
              valid4 = true;
            } else {
              var errs_4 = errors;
              if (typeof data1.color !== "string") {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.ribbon.color',
                  schemaPath: '#/definitions/ribbon/properties/color/type',
                  params: {
                    type: 'string'
                  },
                  message: 'should be string'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              }
              var valid4 = errors === errs_4;
            }
            if (valid4) {
              var data2 = data1.position;
              if (data2 === undefined) {
                valid4 = true;
              } else {
                var errs_4 = errors;
                if (typeof data2 !== "string") {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.ribbon.position',
                    schemaPath: '#/definitions/ribbon/properties/position/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var schema4 = refVal3.properties.position.enum;
                var valid4;
                valid4 = false;
                for (var i4 = 0; i4 < schema4.length; i4++)
                  if (equal(data2, schema4[i4])) {
                    valid4 = true;
                    break;
                  } if (!valid4) {
                  var err = {
                    keyword: 'enum',
                    dataPath: (dataPath || '') + '.ribbon.position',
                    schemaPath: '#/definitions/ribbon/properties/position/enum',
                    params: {
                      allowedValues: schema4
                    },
                    message: 'should be equal to one of the allowed values'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                } else {}
                if (errors === errs_4) {}
                var valid4 = errors === errs_4;
              }
              if (valid4) {
                var data2 = data1.type;
                if (data2 === undefined) {
                  valid4 = true;
                } else {
                  var errs_4 = errors;
                  if (typeof data2 !== "string") {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.ribbon.type',
                      schemaPath: '#/definitions/ribbon/properties/type/type',
                      params: {
                        type: 'string'
                      },
                      message: 'should be string'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var schema4 = refVal3.properties.type.enum;
                  var valid4;
                  valid4 = false;
                  for (var i4 = 0; i4 < schema4.length; i4++)
                    if (equal(data2, schema4[i4])) {
                      valid4 = true;
                      break;
                    } if (!valid4) {
                    var err = {
                      keyword: 'enum',
                      dataPath: (dataPath || '') + '.ribbon.type',
                      schemaPath: '#/definitions/ribbon/properties/type/enum',
                      params: {
                        allowedValues: schema4
                      },
                      message: 'should be equal to one of the allowed values'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  } else {}
                  if (errors === errs_4) {}
                  var valid4 = errors === errs_4;
                }
                if (valid4) {}
              }
            }
            if (errs__3 == errors) {}
          } else {
            var err = {
              keyword: 'type',
              dataPath: (dataPath || '') + '.ribbon',
              schemaPath: '#/definitions/ribbon/type',
              params: {
                type: 'object'
              },
              message: 'should be object'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          if (errors === errs_3) {}
          var valid3 = errors === errs_3;
          if (valid3) {}
          if (errors === errs_2) {}
          var valid2 = errors === errs_2;
          if (valid2 && prevValid1) {
            valid1 = false;
            passingSchemas1 = [passingSchemas1, 1];
          } else {
            if (valid2) {
              valid1 = prevValid1 = true;
              passingSchemas1 = 1;
            }
          }
          if (!valid1) {
            var err = {
              keyword: 'oneOf',
              dataPath: (dataPath || '') + '.ribbon',
              schemaPath: '#/properties/ribbon/oneOf',
              params: {
                passingSchemas: passingSchemas1
              },
              message: 'should match exactly one schema in oneOf'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
            validate.errors = vErrors;
            return false;
          } else {
            errors = errs__1;
            if (vErrors !== null) {
              if (errs__1) vErrors.length = errs__1;
              else vErrors = null;
            }
          }
          if (errors === errs_1) {}
          var valid1 = errors === errs_1;
        }
        if (valid1) {
          var data1 = data.badge;
          if (data1 === undefined) {
            valid1 = true;
          } else {
            var errs_1 = errors;
            var errs__1 = errors,
              prevValid1 = false,
              valid1 = false,
              passingSchemas1 = null;
            var errs_2 = errors;
            if (typeof data1 !== "boolean") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.badge',
                schemaPath: '#/properties/badge/oneOf/0/type',
                params: {
                  type: 'boolean'
                },
                message: 'should be boolean'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
            if (valid2) {
              valid1 = prevValid1 = true;
              passingSchemas1 = 0;
            }
            var errs_2 = errors;
            var errs_3 = errors;
            if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
              var errs__3 = errors;
              var valid4 = true;
              if (data1.color === undefined) {
                valid4 = true;
              } else {
                var errs_4 = errors;
                if (typeof data1.color !== "string") {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.badge.color',
                    schemaPath: '#/definitions/badge/properties/color/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid4 = errors === errs_4;
              }
              if (valid4) {}
              if (errs__3 == errors) {}
            } else {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.badge',
                schemaPath: '#/definitions/badge/type',
                params: {
                  type: 'object'
                },
                message: 'should be object'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            if (errors === errs_3) {}
            var valid3 = errors === errs_3;
            if (valid3) {}
            if (errors === errs_2) {}
            var valid2 = errors === errs_2;
            if (valid2 && prevValid1) {
              valid1 = false;
              passingSchemas1 = [passingSchemas1, 1];
            } else {
              if (valid2) {
                valid1 = prevValid1 = true;
                passingSchemas1 = 1;
              }
            }
            if (!valid1) {
              var err = {
                keyword: 'oneOf',
                dataPath: (dataPath || '') + '.badge',
                schemaPath: '#/properties/badge/oneOf',
                params: {
                  passingSchemas: passingSchemas1
                },
                message: 'should match exactly one schema in oneOf'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
              validate.errors = vErrors;
              return false;
            } else {
              errors = errs__1;
              if (vErrors !== null) {
                if (errs__1) vErrors.length = errs__1;
                else vErrors = null;
              }
            }
            if (errors === errs_1) {}
            var valid1 = errors === errs_1;
          }
          if (valid1) {
            if (data.displayDomain === undefined) {
              valid1 = true;
            } else {
              var errs_1 = errors;
              if (typeof data.displayDomain !== "boolean") {
                validate.errors = [{
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.displayDomain',
                  schemaPath: '#/properties/displayDomain/type',
                  params: {
                    type: 'boolean'
                  },
                  message: 'should be boolean'
                }];
                return false;
              }
              var valid1 = errors === errs_1;
            }
            if (valid1) {}
          }
        }
        if (errs__0 == errors) {}
      } else {
        validate.errors = [{
          keyword: 'type',
          dataPath: (dataPath || '') + "",
          schemaPath: '#/type',
          params: {
            type: 'object'
          },
          message: 'should be object'
        }];
        return false;
      }
      if (errors === 0) {}
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal2.schema = {
    "type": "object",
    "default": {},
    "properties": {
      "ribbon": {
        "oneOf": [{
          "type": "boolean"
        }, {
          "$ref": "#/definitions/ribbon"
        }]
      },
      "badge": {
        "oneOf": [{
          "type": "boolean"
        }, {
          "$ref": "#/definitions/badge"
        }]
      },
      "displayDomain": {
        "type": "boolean",
        "default": true
      }
    }
  };
  refVal2.errors = null;
  refVal[2] = refVal2;
  var refVal3 = {
    "type": "object",
    "properties": {
      "color": {
        "type": "string",
        "default": "#2f2f2f"
      },
      "position": {
        "type": "string",
        "enum": ["left", "right"],
        "default": "right"
      },
      "type": {
        "type": "string",
        "enum": ["corner-ribbon", "square-ribbon"],
        "default": "corner-ribbon"
      }
    }
  };
  refVal[3] = refVal3;
  var refVal4 = {
    "type": "object",
    "properties": {
      "color": {
        "type": "string",
        "default": "#2677c9"
      }
    }
  };
  refVal[4] = refVal4;
  return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
    'use strict';
    var vErrors = null;
    var errors = 0;
    if (rootData === undefined) rootData = data;
    if ((data && typeof data === "object" && !Array.isArray(data))) {
      if (true) {
        var errs__0 = errors;
        var valid1 = true;
        var data1 = data.envs;
        if (data1 === undefined) {
          valid1 = false;
          validate.errors = [{
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/required',
            params: {
              missingProperty: 'envs'
            },
            message: 'should have required property \'envs\''
          }];
          return false;
        } else {
          var errs_1 = errors;
          if (Array.isArray(data1)) {
            var errs__1 = errors;
            var valid1;
            for (var i1 = 0; i1 < data1.length; i1++) {
              var errs_2 = errors;
              if (!refVal1(data1[i1], (dataPath || '') + '.envs[' + i1 + ']', data1, i1, rootData)) {
                if (vErrors === null) vErrors = refVal1.errors;
                else vErrors = vErrors.concat(refVal1.errors);
                errors = vErrors.length;
              } else {}
              if (errors === errs_2) {}
              var valid2 = errors === errs_2;
              if (!valid2) break;
            }
            if (errs__1 == errors) {}
          } else {
            validate.errors = [{
              keyword: 'type',
              dataPath: (dataPath || '') + '.envs',
              schemaPath: '#/properties/envs/type',
              params: {
                type: 'array'
              },
              message: 'should be array'
            }];
            return false;
          }
          if (errors === errs_1) {}
          var valid1 = errors === errs_1;
        }
        if (valid1) {
          if (data.options === undefined) {
            valid1 = false;
            validate.errors = [{
              keyword: 'required',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/required',
              params: {
                missingProperty: 'options'
              },
              message: 'should have required property \'options\''
            }];
            return false;
          } else {
            var errs_1 = errors;
            if (!refVal[2](data.options, (dataPath || '') + '.options', data, 'options', rootData)) {
              if (vErrors === null) vErrors = refVal[2].errors;
              else vErrors = vErrors.concat(refVal[2].errors);
              errors = vErrors.length;
            } else {}
            if (errors === errs_1) {}
            var valid1 = errors === errs_1;
          }
          if (valid1) {}
        }
        if (errs__0 == errors) {}
      }
    } else {
      validate.errors = [{
        keyword: 'type',
        dataPath: (dataPath || '') + "",
        schemaPath: '#/type',
        params: {
          type: 'object'
        },
        message: 'should be object'
      }];
      return false;
    }
    if (errors === 0) {}
    validate.errors = vErrors;
    return errors === 0;
  };
})();
validate.schema = {
  "title": "Config",
  "description": "Object containing config details",
  "type": "object",
  "properties": {
    "envs": {
      "type": "array",
      "default": [],
      "items": {
        "$ref": "#/definitions/env"
      }
    },
    "options": {
      "$ref": "#/definitions/options"
    }
  },
  "definitions": {
    "options": {
      "type": "object",
      "default": {},
      "properties": {
        "ribbon": {
          "oneOf": [{
            "type": "boolean"
          }, {
            "$ref": "#/definitions/ribbon"
          }]
        },
        "badge": {
          "oneOf": [{
            "type": "boolean"
          }, {
            "$ref": "#/definitions/badge"
          }]
        },
        "displayDomain": {
          "type": "boolean",
          "default": true
        }
      }
    },
    "env": {
      "allOf": [{
        "$ref": "#/definitions/options"
      }, {
        "properties": {
          "shortName": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "url": {
            "type": "string"
          }
        },
        "anyOf": [{
          "required": ["shortName"]
        }, {
          "required": ["name"]
        }],
        "required": ["url"]
      }]
    },
    "badge": {
      "type": "object",
      "properties": {
        "color": {
          "type": "string",
          "default": "#2677c9"
        }
      }
    },
    "ribbon": {
      "type": "object",
      "properties": {
        "color": {
          "type": "string",
          "default": "#2f2f2f"
        },
        "position": {
          "type": "string",
          "enum": ["left", "right"],
          "default": "right"
        },
        "type": {
          "type": "string",
          "enum": ["corner-ribbon", "square-ribbon"],
          "default": "corner-ribbon"
        }
      }
    }
  },
  "required": ["envs", "options"]
};
validate.errors = null;
module.exports = validate;