'use strict';
var formats = require('ajv/lib/compile/formats')();
var ucs2length = require('ajv/lib/compile/ucs2length');
var equal = require('ajv/lib/compile/equal');
var validate = (function() {
  var pattern0 = new RegExp('^(https?|wss?|ftp)://');
  var refVal = [];
  var refVal1 = {
    "type": "object",
    "default": {},
    "properties": {
      "id": {
        "type": "number"
      },
      "name": {
        "type": "string"
      },
      "envs": {
        "type": "array",
        "items": {
          "type": "number"
        }
      }
    },
    "required": ["id", "name", "envs"]
  };
  refVal[1] = refVal1;
  var refVal2 = (function() {
    var pattern0 = new RegExp('^(https?|wss?|ftp)://');
    return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      if ((data && typeof data === "object" && !Array.isArray(data))) {
        if (true) {
          var errs__0 = errors;
          var valid1 = true;
          for (var key0 in data) {
            var isAdditional0 = !(false || validate.schema.properties.hasOwnProperty(key0));
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [{
                keyword: 'additionalProperties',
                dataPath: (dataPath || '') + "",
                schemaPath: '#/additionalProperties',
                params: {
                  additionalProperty: '' + key0 + ''
                },
                message: 'should NOT have additional properties'
              }];
              return false;
              break;
            }
          }
          if (valid1) {
            if (data.id === undefined) {
              valid1 = false;
              validate.errors = [{
                keyword: 'required',
                dataPath: (dataPath || '') + "",
                schemaPath: '#/required',
                params: {
                  missingProperty: 'id'
                },
                message: 'should have required property \'id\''
              }];
              return false;
            } else {
              var errs_1 = errors;
              if ((typeof data.id !== "number")) {
                validate.errors = [{
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.id',
                  schemaPath: '#/properties/id/type',
                  params: {
                    type: 'number'
                  },
                  message: 'should be number'
                }];
                return false;
              }
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              if (data.displayRibbon === undefined) {
                valid1 = true;
              } else {
                var errs_1 = errors;
                if (typeof data.displayRibbon !== "boolean") {
                  validate.errors = [{
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.displayRibbon',
                    schemaPath: '#/properties/displayRibbon/type',
                    params: {
                      type: 'boolean'
                    },
                    message: 'should be boolean'
                  }];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.ribbonOptions;
                if (data1 === undefined) {
                  valid1 = true;
                } else {
                  var errs_1 = errors;
                  var errs_2 = errors;
                  if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
                    var errs__2 = errors;
                    var valid3 = true;
                    for (var key2 in data1) {
                      var isAdditional2 = !(false || key2 == 'type' || key2 == 'color' || key2 == 'backgroundColor' || key2 == 'position');
                      if (isAdditional2) {
                        valid3 = false;
                        validate.errors = [{
                          keyword: 'additionalProperties',
                          dataPath: (dataPath || '') + '.ribbonOptions',
                          schemaPath: '#/definitions/ribbon/additionalProperties',
                          params: {
                            additionalProperty: '' + key2 + ''
                          },
                          message: 'should NOT have additional properties'
                        }];
                        return false;
                        break;
                      }
                    }
                    if (valid3) {
                      var data2 = data1.type;
                      if (data2 === undefined) {
                        valid3 = true;
                      } else {
                        var errs_3 = errors;
                        if (typeof data2 !== "string") {
                          validate.errors = [{
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.ribbonOptions.type',
                            schemaPath: '#/definitions/ribbon/properties/type/type',
                            params: {
                              type: 'string'
                            },
                            message: 'should be string'
                          }];
                          return false;
                        }
                        var schema3 = refVal3.properties.type.enum;
                        var valid3;
                        valid3 = false;
                        for (var i3 = 0; i3 < schema3.length; i3++)
                          if (equal(data2, schema3[i3])) {
                            valid3 = true;
                            break;
                          } if (!valid3) {
                          validate.errors = [{
                            keyword: 'enum',
                            dataPath: (dataPath || '') + '.ribbonOptions.type',
                            schemaPath: '#/definitions/ribbon/properties/type/enum',
                            params: {
                              allowedValues: schema3
                            },
                            message: 'should be equal to one of the allowed values'
                          }];
                          return false;
                        } else {}
                        if (errors === errs_3) {}
                        var valid3 = errors === errs_3;
                      }
                      if (valid3) {
                        if (data1.color === undefined) {
                          valid3 = true;
                        } else {
                          var errs_3 = errors;
                          if (typeof data1.color !== "string") {
                            validate.errors = [{
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.ribbonOptions.color',
                              schemaPath: '#/definitions/ribbon/properties/color/type',
                              params: {
                                type: 'string'
                              },
                              message: 'should be string'
                            }];
                            return false;
                          }
                          var valid3 = errors === errs_3;
                        }
                        if (valid3) {
                          if (data1.backgroundColor === undefined) {
                            valid3 = true;
                          } else {
                            var errs_3 = errors;
                            if (typeof data1.backgroundColor !== "string") {
                              validate.errors = [{
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.ribbonOptions.backgroundColor',
                                schemaPath: '#/definitions/ribbon/properties/backgroundColor/type',
                                params: {
                                  type: 'string'
                                },
                                message: 'should be string'
                              }];
                              return false;
                            }
                            var valid3 = errors === errs_3;
                          }
                          if (valid3) {
                            var data2 = data1.position;
                            if (data2 === undefined) {
                              valid3 = true;
                            } else {
                              var errs_3 = errors;
                              if (typeof data2 !== "string") {
                                validate.errors = [{
                                  keyword: 'type',
                                  dataPath: (dataPath || '') + '.ribbonOptions.position',
                                  schemaPath: '#/definitions/ribbon/properties/position/type',
                                  params: {
                                    type: 'string'
                                  },
                                  message: 'should be string'
                                }];
                                return false;
                              }
                              var schema3 = refVal3.properties.position.enum;
                              var valid3;
                              valid3 = false;
                              for (var i3 = 0; i3 < schema3.length; i3++)
                                if (equal(data2, schema3[i3])) {
                                  valid3 = true;
                                  break;
                                } if (!valid3) {
                                validate.errors = [{
                                  keyword: 'enum',
                                  dataPath: (dataPath || '') + '.ribbonOptions.position',
                                  schemaPath: '#/definitions/ribbon/properties/position/enum',
                                  params: {
                                    allowedValues: schema3
                                  },
                                  message: 'should be equal to one of the allowed values'
                                }];
                                return false;
                              } else {}
                              if (errors === errs_3) {}
                              var valid3 = errors === errs_3;
                            }
                            if (valid3) {}
                          }
                        }
                      }
                    }
                    if (errs__2 == errors) {}
                  } else {
                    validate.errors = [{
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.ribbonOptions',
                      schemaPath: '#/definitions/ribbon/type',
                      params: {
                        type: 'object'
                      },
                      message: 'should be object'
                    }];
                    return false;
                  }
                  if (errors === errs_2) {}
                  var valid2 = errors === errs_2;
                  if (valid2) {}
                  if (errors === errs_1) {}
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  if (data.displayBadge === undefined) {
                    valid1 = true;
                  } else {
                    var errs_1 = errors;
                    if (typeof data.displayBadge !== "boolean") {
                      validate.errors = [{
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.displayBadge',
                        schemaPath: '#/properties/displayBadge/type',
                        params: {
                          type: 'boolean'
                        },
                        message: 'should be boolean'
                      }];
                      return false;
                    }
                    var valid1 = errors === errs_1;
                  }
                  if (valid1) {
                    var data1 = data.badgeOptions;
                    if (data1 === undefined) {
                      valid1 = true;
                    } else {
                      var errs_1 = errors;
                      var errs_2 = errors;
                      if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
                        var errs__2 = errors;
                        var valid3 = true;
                        for (var key2 in data1) {
                          var isAdditional2 = !(false || key2 == 'backgroundColor');
                          if (isAdditional2) {
                            valid3 = false;
                            validate.errors = [{
                              keyword: 'additionalProperties',
                              dataPath: (dataPath || '') + '.badgeOptions',
                              schemaPath: '#/definitions/badge/additionalProperties',
                              params: {
                                additionalProperty: '' + key2 + ''
                              },
                              message: 'should NOT have additional properties'
                            }];
                            return false;
                            break;
                          }
                        }
                        if (valid3) {
                          if (data1.backgroundColor === undefined) {
                            valid3 = true;
                          } else {
                            var errs_3 = errors;
                            if (typeof data1.backgroundColor !== "string") {
                              validate.errors = [{
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.badgeOptions.backgroundColor',
                                schemaPath: '#/definitions/badge/properties/backgroundColor/type',
                                params: {
                                  type: 'string'
                                },
                                message: 'should be string'
                              }];
                              return false;
                            }
                            var valid3 = errors === errs_3;
                          }
                          if (valid3) {}
                        }
                        if (errs__2 == errors) {}
                      } else {
                        validate.errors = [{
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.badgeOptions',
                          schemaPath: '#/definitions/badge/type',
                          params: {
                            type: 'object'
                          },
                          message: 'should be object'
                        }];
                        return false;
                      }
                      if (errors === errs_2) {}
                      var valid2 = errors === errs_2;
                      if (valid2) {}
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
                      if (valid1) {
                        var data1 = data.shortName;
                        if (data1 === undefined) {
                          valid1 = true;
                        } else {
                          var errs_1 = errors;
                          if (typeof data1 === "string") {
                            if (ucs2length(data1) > 4) {
                              validate.errors = [{
                                keyword: 'maxLength',
                                dataPath: (dataPath || '') + '.shortName',
                                schemaPath: '#/properties/shortName/maxLength',
                                params: {
                                  limit: 4
                                },
                                message: 'should NOT be longer than 4 characters'
                              }];
                              return false;
                            } else {
                              if (ucs2length(data1) < 1) {
                                validate.errors = [{
                                  keyword: 'minLength',
                                  dataPath: (dataPath || '') + '.shortName',
                                  schemaPath: '#/properties/shortName/minLength',
                                  params: {
                                    limit: 1
                                  },
                                  message: 'should NOT be shorter than 1 characters'
                                }];
                                return false;
                              } else {}
                            }
                          } else {
                            validate.errors = [{
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.shortName',
                              schemaPath: '#/properties/shortName/type',
                              params: {
                                type: 'string'
                              },
                              message: 'should be string'
                            }];
                            return false;
                          }
                          if (errors === errs_1) {}
                          var valid1 = errors === errs_1;
                        }
                        if (valid1) {
                          var data1 = data.name;
                          if (data1 === undefined) {
                            valid1 = true;
                          } else {
                            var errs_1 = errors;
                            if (typeof data1 === "string") {
                              if (ucs2length(data1) < 1) {
                                validate.errors = [{
                                  keyword: 'minLength',
                                  dataPath: (dataPath || '') + '.name',
                                  schemaPath: '#/properties/name/minLength',
                                  params: {
                                    limit: 1
                                  },
                                  message: 'should NOT be shorter than 1 characters'
                                }];
                                return false;
                              } else {}
                            } else {
                              validate.errors = [{
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.name',
                                schemaPath: '#/properties/name/type',
                                params: {
                                  type: 'string'
                                },
                                message: 'should be string'
                              }];
                              return false;
                            }
                            if (errors === errs_1) {}
                            var valid1 = errors === errs_1;
                          }
                          if (valid1) {
                            var data1 = data.url;
                            if (data1 === undefined) {
                              valid1 = false;
                              validate.errors = [{
                                keyword: 'required',
                                dataPath: (dataPath || '') + "",
                                schemaPath: '#/required',
                                params: {
                                  missingProperty: 'url'
                                },
                                message: 'should have required property \'url\''
                              }];
                              return false;
                            } else {
                              var errs_1 = errors;
                              if ((typeof data1 === "number")) {
                                if (true) {}
                              }
                              if (errors === errs_1) {
                                if (typeof data1 === "string") {
                                  if (!pattern0.test(data1)) {
                                    validate.errors = [{
                                      keyword: 'pattern',
                                      dataPath: (dataPath || '') + '.url',
                                      schemaPath: '#/properties/url/pattern',
                                      params: {
                                        pattern: '^(https?|wss?|ftp)://'
                                      },
                                      message: 'should match pattern "^(https?|wss?|ftp)://"'
                                    }];
                                    return false;
                                  } else {
                                    if (!formats.uri.test(data1)) {
                                      validate.errors = [{
                                        keyword: 'format',
                                        dataPath: (dataPath || '') + '.url',
                                        schemaPath: '#/properties/url/format',
                                        params: {
                                          format: 'uri'
                                        },
                                        message: 'should match format "uri"'
                                      }];
                                      return false;
                                    } else {}
                                  }
                                } else {
                                  validate.errors = [{
                                    keyword: 'type',
                                    dataPath: (dataPath || '') + '.url',
                                    schemaPath: '#/properties/url/type',
                                    params: {
                                      type: 'string'
                                    },
                                    message: 'should be string'
                                  }];
                                  return false;
                                }
                                if (errors === errs_1) {}
                              }
                              var valid1 = errors === errs_1;
                            }
                            if (valid1) {}
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
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
      if (errors === 0) {
        var errs__0 = errors;
        var valid0 = false;
        var errs_1 = errors;
        if ((data && typeof data === "object" && !Array.isArray(data))) {
          var missing1;
          if (((data.shortName === undefined) && (missing1 = '.shortName'))) {
            var err = {
              keyword: 'required',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/anyOf/0/required',
              params: {
                missingProperty: '' + missing1 + ''
              },
              message: 'should have required property \'' + missing1 + '\''
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          } else {}
        }
        if (errors === errs_1) {}
        var valid1 = errors === errs_1;
        valid0 = valid0 || valid1;
        if (!valid0) {
          var errs_1 = errors;
          if ((data && typeof data === "object" && !Array.isArray(data))) {
            var missing1;
            if (((data.name === undefined) && (missing1 = '.name'))) {
              var err = {
                keyword: 'required',
                dataPath: (dataPath || '') + "",
                schemaPath: '#/anyOf/1/required',
                params: {
                  missingProperty: '' + missing1 + ''
                },
                message: 'should have required property \'' + missing1 + '\''
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            } else {}
          }
          if (errors === errs_1) {}
          var valid1 = errors === errs_1;
          valid0 = valid0 || valid1;
          if (!valid0) {}
        }
        if (!valid0) {
          var err = {
            keyword: 'anyOf',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/anyOf',
            params: {},
            message: 'should match some schema in anyOf'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
          validate.errors = vErrors;
          return false;
        } else {
          errors = errs__0;
          if (vErrors !== null) {
            if (errs__0) vErrors.length = errs__0;
            else vErrors = null;
          }
        }
        if (errors === 0) {}
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal2.schema = {
    "type": "object",
    "properties": {
      "id": {
        "type": "number"
      },
      "displayRibbon": {
        "type": "boolean",
        "default": true
      },
      "ribbonOptions": {
        "$ref": "#/definitions/ribbon"
      },
      "displayBadge": {
        "type": "boolean",
        "default": true
      },
      "badgeOptions": {
        "$ref": "#/definitions/badge"
      },
      "displayDomain": {
        "type": "boolean",
        "default": true
      },
      "shortName": {
        "type": "string",
        "minLength": 1,
        "maxLength": 4
      },
      "name": {
        "type": "string",
        "minLength": 1
      },
      "url": {
        "type": "string",
        "format": "uri",
        "pattern": "^(https?|wss?|ftp)://"
      }
    },
    "anyOf": [{
      "required": ["shortName"]
    }, {
      "required": ["name"]
    }],
    "required": ["id", "url"],
    "additionalProperties": false
  };
  refVal2.errors = null;
  refVal[2] = refVal2;
  var refVal3 = {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": ["corner-ribbon", "square-ribbon"],
        "default": "corner-ribbon"
      },
      "color": {
        "type": "string",
        "default": "white"
      },
      "backgroundColor": {
        "type": "string",
        "default": "#2f2f2f"
      },
      "position": {
        "type": "string",
        "enum": ["left", "right"],
        "default": "right"
      }
    },
    "additionalProperties": false
  };
  refVal[3] = refVal3;
  var refVal4 = {
    "type": "object",
    "properties": {
      "backgroundColor": {
        "type": "string",
        "default": "#2677c9"
      }
    },
    "additionalProperties": false
  };
  refVal[4] = refVal4;
  var refVal5 = (function() {
    var pattern0 = new RegExp('^(https?|wss?|ftp)://');
    return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      if ((data && typeof data === "object" && !Array.isArray(data))) {
        var errs__0 = errors;
        var valid1 = true;
        for (var key0 in data) {
          var isAdditional0 = !(false || key0 == 'displayRibbon' || key0 == 'ribbonOptions' || key0 == 'displayBadge' || key0 == 'badgeOptions' || key0 == 'displayDomain' || key0 == 'displayHeader' || key0 == 'displayFooter' || key0 == 'displaySeeProjectsLink');
          if (isAdditional0) {
            valid1 = false;
            validate.errors = [{
              keyword: 'additionalProperties',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/additionalProperties',
              params: {
                additionalProperty: '' + key0 + ''
              },
              message: 'should NOT have additional properties'
            }];
            return false;
            break;
          }
        }
        if (valid1) {
          if (data.displayRibbon === undefined) {
            valid1 = true;
          } else {
            var errs_1 = errors;
            if (typeof data.displayRibbon !== "boolean") {
              validate.errors = [{
                keyword: 'type',
                dataPath: (dataPath || '') + '.displayRibbon',
                schemaPath: '#/properties/displayRibbon/type',
                params: {
                  type: 'boolean'
                },
                message: 'should be boolean'
              }];
              return false;
            }
            var valid1 = errors === errs_1;
          }
          if (valid1) {
            var data1 = data.ribbonOptions;
            if (data1 === undefined) {
              valid1 = true;
            } else {
              var errs_1 = errors;
              var errs_2 = errors;
              if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
                var errs__2 = errors;
                var valid3 = true;
                for (var key2 in data1) {
                  var isAdditional2 = !(false || key2 == 'type' || key2 == 'color' || key2 == 'backgroundColor' || key2 == 'position');
                  if (isAdditional2) {
                    valid3 = false;
                    validate.errors = [{
                      keyword: 'additionalProperties',
                      dataPath: (dataPath || '') + '.ribbonOptions',
                      schemaPath: '#/definitions/ribbon/additionalProperties',
                      params: {
                        additionalProperty: '' + key2 + ''
                      },
                      message: 'should NOT have additional properties'
                    }];
                    return false;
                    break;
                  }
                }
                if (valid3) {
                  var data2 = data1.type;
                  if (data2 === undefined) {
                    valid3 = true;
                  } else {
                    var errs_3 = errors;
                    if (typeof data2 !== "string") {
                      validate.errors = [{
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.ribbonOptions.type',
                        schemaPath: '#/definitions/ribbon/properties/type/type',
                        params: {
                          type: 'string'
                        },
                        message: 'should be string'
                      }];
                      return false;
                    }
                    var schema3 = refVal[3].properties.type.enum;
                    var valid3;
                    valid3 = false;
                    for (var i3 = 0; i3 < schema3.length; i3++)
                      if (equal(data2, schema3[i3])) {
                        valid3 = true;
                        break;
                      } if (!valid3) {
                      validate.errors = [{
                        keyword: 'enum',
                        dataPath: (dataPath || '') + '.ribbonOptions.type',
                        schemaPath: '#/definitions/ribbon/properties/type/enum',
                        params: {
                          allowedValues: schema3
                        },
                        message: 'should be equal to one of the allowed values'
                      }];
                      return false;
                    } else {}
                    if (errors === errs_3) {}
                    var valid3 = errors === errs_3;
                  }
                  if (valid3) {
                    if (data1.color === undefined) {
                      valid3 = true;
                    } else {
                      var errs_3 = errors;
                      if (typeof data1.color !== "string") {
                        validate.errors = [{
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.ribbonOptions.color',
                          schemaPath: '#/definitions/ribbon/properties/color/type',
                          params: {
                            type: 'string'
                          },
                          message: 'should be string'
                        }];
                        return false;
                      }
                      var valid3 = errors === errs_3;
                    }
                    if (valid3) {
                      if (data1.backgroundColor === undefined) {
                        valid3 = true;
                      } else {
                        var errs_3 = errors;
                        if (typeof data1.backgroundColor !== "string") {
                          validate.errors = [{
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.ribbonOptions.backgroundColor',
                            schemaPath: '#/definitions/ribbon/properties/backgroundColor/type',
                            params: {
                              type: 'string'
                            },
                            message: 'should be string'
                          }];
                          return false;
                        }
                        var valid3 = errors === errs_3;
                      }
                      if (valid3) {
                        var data2 = data1.position;
                        if (data2 === undefined) {
                          valid3 = true;
                        } else {
                          var errs_3 = errors;
                          if (typeof data2 !== "string") {
                            validate.errors = [{
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.ribbonOptions.position',
                              schemaPath: '#/definitions/ribbon/properties/position/type',
                              params: {
                                type: 'string'
                              },
                              message: 'should be string'
                            }];
                            return false;
                          }
                          var schema3 = refVal[3].properties.position.enum;
                          var valid3;
                          valid3 = false;
                          for (var i3 = 0; i3 < schema3.length; i3++)
                            if (equal(data2, schema3[i3])) {
                              valid3 = true;
                              break;
                            } if (!valid3) {
                            validate.errors = [{
                              keyword: 'enum',
                              dataPath: (dataPath || '') + '.ribbonOptions.position',
                              schemaPath: '#/definitions/ribbon/properties/position/enum',
                              params: {
                                allowedValues: schema3
                              },
                              message: 'should be equal to one of the allowed values'
                            }];
                            return false;
                          } else {}
                          if (errors === errs_3) {}
                          var valid3 = errors === errs_3;
                        }
                        if (valid3) {}
                      }
                    }
                  }
                }
                if (errs__2 == errors) {}
              } else {
                validate.errors = [{
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.ribbonOptions',
                  schemaPath: '#/definitions/ribbon/type',
                  params: {
                    type: 'object'
                  },
                  message: 'should be object'
                }];
                return false;
              }
              if (errors === errs_2) {}
              var valid2 = errors === errs_2;
              if (valid2) {}
              if (errors === errs_1) {}
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              if (data.displayBadge === undefined) {
                valid1 = true;
              } else {
                var errs_1 = errors;
                if (typeof data.displayBadge !== "boolean") {
                  validate.errors = [{
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.displayBadge',
                    schemaPath: '#/properties/displayBadge/type',
                    params: {
                      type: 'boolean'
                    },
                    message: 'should be boolean'
                  }];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.badgeOptions;
                if (data1 === undefined) {
                  valid1 = true;
                } else {
                  var errs_1 = errors;
                  var errs_2 = errors;
                  if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
                    var errs__2 = errors;
                    var valid3 = true;
                    for (var key2 in data1) {
                      var isAdditional2 = !(false || key2 == 'backgroundColor');
                      if (isAdditional2) {
                        valid3 = false;
                        validate.errors = [{
                          keyword: 'additionalProperties',
                          dataPath: (dataPath || '') + '.badgeOptions',
                          schemaPath: '#/definitions/badge/additionalProperties',
                          params: {
                            additionalProperty: '' + key2 + ''
                          },
                          message: 'should NOT have additional properties'
                        }];
                        return false;
                        break;
                      }
                    }
                    if (valid3) {
                      if (data1.backgroundColor === undefined) {
                        valid3 = true;
                      } else {
                        var errs_3 = errors;
                        if (typeof data1.backgroundColor !== "string") {
                          validate.errors = [{
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.badgeOptions.backgroundColor',
                            schemaPath: '#/definitions/badge/properties/backgroundColor/type',
                            params: {
                              type: 'string'
                            },
                            message: 'should be string'
                          }];
                          return false;
                        }
                        var valid3 = errors === errs_3;
                      }
                      if (valid3) {}
                    }
                    if (errs__2 == errors) {}
                  } else {
                    validate.errors = [{
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.badgeOptions',
                      schemaPath: '#/definitions/badge/type',
                      params: {
                        type: 'object'
                      },
                      message: 'should be object'
                    }];
                    return false;
                  }
                  if (errors === errs_2) {}
                  var valid2 = errors === errs_2;
                  if (valid2) {}
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
                  if (valid1) {
                    if (data.displayHeader === undefined) {
                      valid1 = true;
                    } else {
                      var errs_1 = errors;
                      if (typeof data.displayHeader !== "boolean") {
                        validate.errors = [{
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.displayHeader',
                          schemaPath: '#/properties/displayHeader/type',
                          params: {
                            type: 'boolean'
                          },
                          message: 'should be boolean'
                        }];
                        return false;
                      }
                      var valid1 = errors === errs_1;
                    }
                    if (valid1) {
                      if (data.displayFooter === undefined) {
                        valid1 = true;
                      } else {
                        var errs_1 = errors;
                        if (typeof data.displayFooter !== "boolean") {
                          validate.errors = [{
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.displayFooter',
                            schemaPath: '#/properties/displayFooter/type',
                            params: {
                              type: 'boolean'
                            },
                            message: 'should be boolean'
                          }];
                          return false;
                        }
                        var valid1 = errors === errs_1;
                      }
                      if (valid1) {
                        if (data.displaySeeProjectsLink === undefined) {
                          valid1 = true;
                        } else {
                          var errs_1 = errors;
                          if (typeof data.displaySeeProjectsLink !== "boolean") {
                            validate.errors = [{
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.displaySeeProjectsLink',
                              schemaPath: '#/properties/displaySeeProjectsLink/type',
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
                  }
                }
              }
            }
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
  refVal5.schema = {
    "type": "object",
    "description": "Object containing global options",
    "default": {},
    "properties": {
      "displayRibbon": {
        "type": "boolean",
        "default": true
      },
      "ribbonOptions": {
        "$ref": "#/definitions/ribbon"
      },
      "displayBadge": {
        "type": "boolean",
        "default": true
      },
      "badgeOptions": {
        "$ref": "#/definitions/badge"
      },
      "displayDomain": {
        "type": "boolean",
        "default": true
      },
      "displayHeader": {
        "type": "boolean",
        "default": true
      },
      "displayFooter": {
        "type": "boolean",
        "default": true
      },
      "displaySeeProjectsLink": {
        "type": "boolean",
        "default": true
      }
    },
    "additionalProperties": false
  };
  refVal5.errors = null;
  refVal[5] = refVal5;
  return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
    'use strict'; /*# sourceURL=https://github.com/ymenard-dev/yaes/blob/main/src/schemas/config.schema.json */
    var vErrors = null;
    var errors = 0;
    if (rootData === undefined) rootData = data;
    if ((data && typeof data === "object" && !Array.isArray(data))) {
      if (true) {
        var errs__0 = errors;
        var valid1 = true;
        for (var key0 in data) {
          var isAdditional0 = !(false || key0 == 'version' || key0 == 'projects' || key0 == 'envs' || key0 == 'options');
          if (isAdditional0) {
            valid1 = false;
            validate.errors = [{
              keyword: 'additionalProperties',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/additionalProperties',
              params: {
                additionalProperty: '' + key0 + ''
              },
              message: 'should NOT have additional properties'
            }];
            return false;
            break;
          }
        }
        if (valid1) {
          if (data.version === undefined) {
            valid1 = false;
            validate.errors = [{
              keyword: 'required',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/required',
              params: {
                missingProperty: 'version'
              },
              message: 'should have required property \'version\''
            }];
            return false;
          } else {
            var errs_1 = errors;
            if (typeof data.version !== "string") {
              validate.errors = [{
                keyword: 'type',
                dataPath: (dataPath || '') + '.version',
                schemaPath: '#/properties/version/type',
                params: {
                  type: 'string'
                },
                message: 'should be string'
              }];
              return false;
            }
            var valid1 = errors === errs_1;
          }
          if (valid1) {
            var data1 = data.projects;
            if (data1 === undefined) {
              valid1 = false;
              validate.errors = [{
                keyword: 'required',
                dataPath: (dataPath || '') + "",
                schemaPath: '#/required',
                params: {
                  missingProperty: 'projects'
                },
                message: 'should have required property \'projects\''
              }];
              return false;
            } else {
              var errs_1 = errors;
              if (Array.isArray(data1)) {
                var errs__1 = errors;
                var valid1;
                for (var i1 = 0; i1 < data1.length; i1++) {
                  var data2 = data1[i1];
                  var errs_2 = errors;
                  var errs_3 = errors;
                  if ((data2 && typeof data2 === "object" && !Array.isArray(data2))) {
                    if (true) {
                      var errs__3 = errors;
                      var valid4 = true;
                      if (data2.id === undefined) {
                        valid4 = false;
                        validate.errors = [{
                          keyword: 'required',
                          dataPath: (dataPath || '') + '.projects[' + i1 + ']',
                          schemaPath: '#/definitions/project/required',
                          params: {
                            missingProperty: 'id'
                          },
                          message: 'should have required property \'id\''
                        }];
                        return false;
                      } else {
                        var errs_4 = errors;
                        if ((typeof data2.id !== "number")) {
                          validate.errors = [{
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.projects[' + i1 + '].id',
                            schemaPath: '#/definitions/project/properties/id/type',
                            params: {
                              type: 'number'
                            },
                            message: 'should be number'
                          }];
                          return false;
                        }
                        var valid4 = errors === errs_4;
                      }
                      if (valid4) {
                        if (data2.name === undefined) {
                          valid4 = false;
                          validate.errors = [{
                            keyword: 'required',
                            dataPath: (dataPath || '') + '.projects[' + i1 + ']',
                            schemaPath: '#/definitions/project/required',
                            params: {
                              missingProperty: 'name'
                            },
                            message: 'should have required property \'name\''
                          }];
                          return false;
                        } else {
                          var errs_4 = errors;
                          if (typeof data2.name !== "string") {
                            validate.errors = [{
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.projects[' + i1 + '].name',
                              schemaPath: '#/definitions/project/properties/name/type',
                              params: {
                                type: 'string'
                              },
                              message: 'should be string'
                            }];
                            return false;
                          }
                          var valid4 = errors === errs_4;
                        }
                        if (valid4) {
                          var data3 = data2.envs;
                          if (data3 === undefined) {
                            valid4 = false;
                            validate.errors = [{
                              keyword: 'required',
                              dataPath: (dataPath || '') + '.projects[' + i1 + ']',
                              schemaPath: '#/definitions/project/required',
                              params: {
                                missingProperty: 'envs'
                              },
                              message: 'should have required property \'envs\''
                            }];
                            return false;
                          } else {
                            var errs_4 = errors;
                            if (Array.isArray(data3)) {
                              var errs__4 = errors;
                              var valid4;
                              for (var i4 = 0; i4 < data3.length; i4++) {
                                var errs_5 = errors;
                                if ((typeof data3[i4] !== "number")) {
                                  validate.errors = [{
                                    keyword: 'type',
                                    dataPath: (dataPath || '') + '.projects[' + i1 + '].envs[' + i4 + ']',
                                    schemaPath: '#/definitions/project/properties/envs/items/type',
                                    params: {
                                      type: 'number'
                                    },
                                    message: 'should be number'
                                  }];
                                  return false;
                                }
                                var valid5 = errors === errs_5;
                                if (!valid5) break;
                              }
                              if (errs__4 == errors) {}
                            } else {
                              validate.errors = [{
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.projects[' + i1 + '].envs',
                                schemaPath: '#/definitions/project/properties/envs/type',
                                params: {
                                  type: 'array'
                                },
                                message: 'should be array'
                              }];
                              return false;
                            }
                            if (errors === errs_4) {}
                            var valid4 = errors === errs_4;
                          }
                          if (valid4) {}
                        }
                      }
                      if (errs__3 == errors) {}
                    }
                  } else {
                    validate.errors = [{
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.projects[' + i1 + ']',
                      schemaPath: '#/definitions/project/type',
                      params: {
                        type: 'object'
                      },
                      message: 'should be object'
                    }];
                    return false;
                  }
                  if (errors === errs_3) {}
                  var valid3 = errors === errs_3;
                  if (valid3) {}
                  if (errors === errs_2) {}
                  var valid2 = errors === errs_2;
                  if (!valid2) break;
                }
                if (errs__1 == errors) {}
              } else {
                validate.errors = [{
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.projects',
                  schemaPath: '#/properties/projects/type',
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
                    if (!refVal2(data1[i1], (dataPath || '') + '.envs[' + i1 + ']', data1, i1, rootData)) {
                      if (vErrors === null) vErrors = refVal2.errors;
                      else vErrors = vErrors.concat(refVal2.errors);
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
                var data1 = data.options;
                if (data1 === undefined) {
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
                  if ((!data1 || typeof data1 !== "object" || Array.isArray(data1))) {
                    validate.errors = [{
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.options',
                      schemaPath: '#/properties/options/type',
                      params: {
                        type: 'object'
                      },
                      message: 'should be object'
                    }];
                    return false;
                  }
                  var errs__1 = errors;
                  var valid1 = false;
                  var errs_2 = errors;
                  if (!refVal5(data1, (dataPath || '') + '.options', data, 'options', rootData)) {
                    if (vErrors === null) vErrors = refVal5.errors;
                    else vErrors = vErrors.concat(refVal5.errors);
                    errors = vErrors.length;
                  } else {}
                  if (errors === errs_2) {}
                  var valid2 = errors === errs_2;
                  valid1 = valid1 || valid2;
                  if (!valid1) {}
                  if (!valid1) {
                    var err = {
                      keyword: 'anyOf',
                      dataPath: (dataPath || '') + '.options',
                      schemaPath: '#/properties/options/anyOf',
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
                  var valid1 = errors === errs_1;
                }
                if (valid1) {}
              }
            }
          }
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
  "$id": "https://github.com/ymenard-dev/yaes/blob/main/src/schemas/config.schema.json",
  "title": "Config",
  "description": "Object containing config details",
  "type": "object",
  "properties": {
    "version": {
      "type": "string"
    },
    "projects": {
      "type": "array",
      "default": [{
        "id": 0,
        "name": "Google"
      }, {
        "id": 1,
        "name": "Yahoo"
      }],
      "items": {
        "$ref": "#/definitions/project"
      }
    },
    "envs": {
      "type": "array",
      "default": [{
        "shortName": "FR",
        "url": "https://www.google.fr/",
        "displayRibbon": true,
        "ribbonOptions": {
          "backgroundColor": "#2519c7",
          "color": "pink",
          "type": "corner-ribbon"
        },
        "displayBadge": true,
        "badgeOptions": {
          "backgroundColor": "#154785"
        }
      }, {
        "name": "ES",
        "url": "https://www.google.es/",
        "displayRibbon": false
      }, {
        "shortName": "DE",
        "name": "Germany",
        "url": "https://www.google.de/",
        "displayRibbon": true,
        "ribbonOptions": {
          "backgroundColor": "#1fab19"
        },
        "displayBadge": false
      }],
      "items": {
        "$ref": "#/definitions/env"
      }
    },
    "options": {
      "type": "object",
      "description": "Global options",
      "default": {
        "displayRibbon": true,
        "ribbonOptions": {
          "type": "corner-ribbon",
          "color": "white",
          "backgroundColor": "#2f2f2f",
          "position": "right"
        },
        "displayBadge": true,
        "badgeOptions": {
          "backgroundColor": "#2677c9"
        },
        "displayDomain": true,
        "displayHeader": true,
        "displayFooter": true,
        "displaySeeProjectsLink": true
      },
      "anyOf": [{
        "$ref": "#/definitions/options"
      }]
    }
  },
  "definitions": {
    "project": {
      "type": "object",
      "default": {},
      "properties": {
        "id": {
          "type": "number"
        },
        "name": {
          "type": "string"
        },
        "envs": {
          "type": "array",
          "items": {
            "type": "number"
          }
        }
      },
      "required": ["id", "name", "envs"]
    },
    "options": {
      "type": "object",
      "description": "Object containing global options",
      "default": {},
      "properties": {
        "displayRibbon": {
          "type": "boolean",
          "default": true
        },
        "ribbonOptions": {
          "$ref": "#/definitions/ribbon"
        },
        "displayBadge": {
          "type": "boolean",
          "default": true
        },
        "badgeOptions": {
          "$ref": "#/definitions/badge"
        },
        "displayDomain": {
          "type": "boolean",
          "default": true
        },
        "displayHeader": {
          "type": "boolean",
          "default": true
        },
        "displayFooter": {
          "type": "boolean",
          "default": true
        },
        "displaySeeProjectsLink": {
          "type": "boolean",
          "default": true
        }
      },
      "additionalProperties": false
    },
    "env": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "displayRibbon": {
          "type": "boolean",
          "default": true
        },
        "ribbonOptions": {
          "$ref": "#/definitions/ribbon"
        },
        "displayBadge": {
          "type": "boolean",
          "default": true
        },
        "badgeOptions": {
          "$ref": "#/definitions/badge"
        },
        "displayDomain": {
          "type": "boolean",
          "default": true
        },
        "shortName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "url": {
          "type": "string",
          "format": "uri",
          "pattern": "^(https?|wss?|ftp)://"
        }
      },
      "anyOf": [{
        "required": ["shortName"]
      }, {
        "required": ["name"]
      }],
      "required": ["id", "url"],
      "additionalProperties": false
    },
    "badge": {
      "type": "object",
      "properties": {
        "backgroundColor": {
          "type": "string",
          "default": "#2677c9"
        }
      },
      "additionalProperties": false
    },
    "ribbon": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["corner-ribbon", "square-ribbon"],
          "default": "corner-ribbon"
        },
        "color": {
          "type": "string",
          "default": "white"
        },
        "backgroundColor": {
          "type": "string",
          "default": "#2f2f2f"
        },
        "position": {
          "type": "string",
          "enum": ["left", "right"],
          "default": "right"
        }
      },
      "additionalProperties": false
    },
    "boolean": {
      "type": "boolean"
    }
  },
  "required": ["version", "projects", "envs", "options"],
  "additionalProperties": false
};
validate.errors = null;
module.exports = validate;