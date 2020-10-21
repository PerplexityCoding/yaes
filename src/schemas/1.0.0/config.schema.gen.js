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
        "type": ["string", "number"]
      },
      "name": {
        "type": "string"
      }
    },
    "required": ["id"]
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
            var isAdditional0 = !(false || key0 == 'ribbon' || key0 == 'badge' || key0 == 'displayDomain' || key0 == 'shortName' || key0 == 'name' || key0 == 'url' || key0 == 'project');
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
              var errs_3 = errors;
              if (typeof data1 !== "boolean") {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.ribbon',
                  schemaPath: '#/definitions/boolean/type',
                  params: {
                    type: 'boolean'
                  },
                  message: 'should be boolean'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              }
              var valid3 = errors === errs_3;
              if (valid3) {}
              if (errors === errs_2) {}
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
                for (var key3 in data1) {
                  var isAdditional3 = !(false || key3 == 'type' || key3 == 'color' || key3 == 'backgroundColor' || key3 == 'position');
                  if (isAdditional3) {
                    valid4 = false;
                    var err = {
                      keyword: 'additionalProperties',
                      dataPath: (dataPath || '') + '.ribbon',
                      schemaPath: '#/definitions/ribbon/additionalProperties',
                      params: {
                        additionalProperty: '' + key3 + ''
                      },
                      message: 'should NOT have additional properties'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                    break;
                  }
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
                    var schema4 = refVal4.properties.type.enum;
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
                  if (valid4) {
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
                      if (data1.backgroundColor === undefined) {
                        valid4 = true;
                      } else {
                        var errs_4 = errors;
                        if (typeof data1.backgroundColor !== "string") {
                          var err = {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.ribbon.backgroundColor',
                            schemaPath: '#/definitions/ribbon/properties/backgroundColor/type',
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
                          var schema4 = refVal4.properties.position.enum;
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
                        if (valid4) {}
                      }
                    }
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
                var errs_3 = errors;
                if (typeof data1 !== "boolean") {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.badge',
                    schemaPath: '#/definitions/boolean/type',
                    params: {
                      type: 'boolean'
                    },
                    message: 'should be boolean'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
                if (valid3) {}
                if (errors === errs_2) {}
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
                  for (var key3 in data1) {
                    var isAdditional3 = !(false || key3 == 'backgroundColor');
                    if (isAdditional3) {
                      valid4 = false;
                      var err = {
                        keyword: 'additionalProperties',
                        dataPath: (dataPath || '') + '.badge',
                        schemaPath: '#/definitions/badge/additionalProperties',
                        params: {
                          additionalProperty: '' + key3 + ''
                        },
                        message: 'should NOT have additional properties'
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                      break;
                    }
                  }
                  if (valid4) {
                    if (data1.backgroundColor === undefined) {
                      valid4 = true;
                    } else {
                      var errs_4 = errors;
                      if (typeof data1.backgroundColor !== "string") {
                        var err = {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.badge.backgroundColor',
                          schemaPath: '#/definitions/badge/properties/backgroundColor/type',
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
                  }
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
                      if (valid1) {
                        var data1 = data.project;
                        if (data1 === undefined) {
                          valid1 = true;
                        } else {
                          var errs_1 = errors;
                          if (typeof data1 !== "string" && (typeof data1 !== "number")) {
                            validate.errors = [{
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.project',
                              schemaPath: '#/properties/project/type',
                              params: {
                                type: 'string,number'
                              },
                              message: 'should be string,number'
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
      "ribbon": {
        "oneOf": [{
          "$ref": "#/definitions/boolean"
        }, {
          "$ref": "#/definitions/ribbon"
        }]
      },
      "badge": {
        "oneOf": [{
          "$ref": "#/definitions/boolean"
        }, {
          "$ref": "#/definitions/badge"
        }]
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
      },
      "project": {
        "type": ["string", "number"]
      }
    },
    "anyOf": [{
      "required": ["shortName"]
    }, {
      "required": ["name"]
    }],
    "required": ["url"],
    "additionalProperties": false
  };
  refVal2.errors = null;
  refVal[2] = refVal2;
  var refVal3 = {
    "type": "boolean"
  };
  refVal[3] = refVal3;
  var refVal4 = {
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
  refVal[4] = refVal4;
  var refVal5 = {
    "type": "object",
    "properties": {
      "backgroundColor": {
        "type": "string",
        "default": "#2677c9"
      }
    },
    "additionalProperties": false
  };
  refVal[5] = refVal5;
  var refVal6 = (function() {
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
          var isAdditional0 = !(false || key0 == 'ribbon' || key0 == 'badge' || key0 == 'displayDomain' || key0 == 'displayHeader' || key0 == 'displayFooter' || key0 == 'displaySeeProjectsLink');
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
            var errs_3 = errors;
            if (typeof data1 !== "boolean") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.ribbon',
                schemaPath: '#/definitions/boolean/type',
                params: {
                  type: 'boolean'
                },
                message: 'should be boolean'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid3 = errors === errs_3;
            if (valid3) {}
            if (errors === errs_2) {}
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
              for (var key3 in data1) {
                var isAdditional3 = !(false || key3 == 'type' || key3 == 'color' || key3 == 'backgroundColor' || key3 == 'position');
                if (isAdditional3) {
                  valid4 = false;
                  var err = {
                    keyword: 'additionalProperties',
                    dataPath: (dataPath || '') + '.ribbon',
                    schemaPath: '#/definitions/ribbon/additionalProperties',
                    params: {
                      additionalProperty: '' + key3 + ''
                    },
                    message: 'should NOT have additional properties'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                  break;
                }
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
                  var schema4 = refVal[4].properties.type.enum;
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
                if (valid4) {
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
                    if (data1.backgroundColor === undefined) {
                      valid4 = true;
                    } else {
                      var errs_4 = errors;
                      if (typeof data1.backgroundColor !== "string") {
                        var err = {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.ribbon.backgroundColor',
                          schemaPath: '#/definitions/ribbon/properties/backgroundColor/type',
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
                        var schema4 = refVal[4].properties.position.enum;
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
                      if (valid4) {}
                    }
                  }
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
              var errs_3 = errors;
              if (typeof data1 !== "boolean") {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.badge',
                  schemaPath: '#/definitions/boolean/type',
                  params: {
                    type: 'boolean'
                  },
                  message: 'should be boolean'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              }
              var valid3 = errors === errs_3;
              if (valid3) {}
              if (errors === errs_2) {}
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
                for (var key3 in data1) {
                  var isAdditional3 = !(false || key3 == 'backgroundColor');
                  if (isAdditional3) {
                    valid4 = false;
                    var err = {
                      keyword: 'additionalProperties',
                      dataPath: (dataPath || '') + '.badge',
                      schemaPath: '#/definitions/badge/additionalProperties',
                      params: {
                        additionalProperty: '' + key3 + ''
                      },
                      message: 'should NOT have additional properties'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                    break;
                  }
                }
                if (valid4) {
                  if (data1.backgroundColor === undefined) {
                    valid4 = true;
                  } else {
                    var errs_4 = errors;
                    if (typeof data1.backgroundColor !== "string") {
                      var err = {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.badge.backgroundColor',
                        schemaPath: '#/definitions/badge/properties/backgroundColor/type',
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
                }
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
  refVal6.schema = {
    "type": "object",
    "description": "Object containing global options",
    "default": {},
    "properties": {
      "ribbon": {
        "oneOf": [{
          "$ref": "#/definitions/boolean"
        }, {
          "$ref": "#/definitions/ribbon"
        }]
      },
      "badge": {
        "oneOf": [{
          "$ref": "#/definitions/boolean"
        }, {
          "$ref": "#/definitions/badge"
        }]
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
  refVal6.errors = null;
  refVal[6] = refVal6;
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
          var isAdditional0 = !(false || key0 == 'projects' || key0 == 'envs' || key0 == 'options');
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
          var data1 = data.projects;
          if (data1 === undefined) {
            valid1 = true;
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
                    var data3 = data2.id;
                    if (data3 === undefined) {
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
                      if (typeof data3 !== "string" && (typeof data3 !== "number")) {
                        validate.errors = [{
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.projects[' + i1 + '].id',
                          schemaPath: '#/definitions/project/properties/id/type',
                          params: {
                            type: 'string,number'
                          },
                          message: 'should be string,number'
                        }];
                        return false;
                      }
                      var valid4 = errors === errs_4;
                    }
                    if (valid4) {
                      if (data2.name === undefined) {
                        valid4 = true;
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
                      if (valid4) {}
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
                if (!refVal6(data1, (dataPath || '') + '.options', data, 'options', rootData)) {
                  if (vErrors === null) vErrors = refVal6.errors;
                  else vErrors = vErrors.concat(refVal6.errors);
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
    "projects": {
      "type": "array",
      "default": [{
        "id": "Google"
      }, {
        "id": "Yahoo",
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
        "ribbon": {
          "backgroundColor": "#2519c7",
          "color": "pink",
          "type": "corner-ribbon"
        },
        "badge": {
          "backgroundColor": "#154785"
        },
        "project": "Google"
      }, {
        "name": "ES",
        "url": "https://www.google.es/",
        "ribbon": false,
        "project": "Google"
      }, {
        "shortName": "DE",
        "name": "Germany",
        "url": "https://www.google.de/",
        "ribbon": {
          "backgroundColor": "#1fab19"
        },
        "badge": false,
        "project": "Google"
      }],
      "items": {
        "$ref": "#/definitions/env"
      }
    },
    "options": {
      "type": "object",
      "description": "Global options",
      "default": {
        "ribbon": {
          "type": "corner-ribbon",
          "color": "white",
          "backgroundColor": "#2f2f2f",
          "position": "right"
        },
        "badge": {
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
          "type": ["string", "number"]
        },
        "name": {
          "type": "string"
        }
      },
      "required": ["id"]
    },
    "options": {
      "type": "object",
      "description": "Object containing global options",
      "default": {},
      "properties": {
        "ribbon": {
          "oneOf": [{
            "$ref": "#/definitions/boolean"
          }, {
            "$ref": "#/definitions/ribbon"
          }]
        },
        "badge": {
          "oneOf": [{
            "$ref": "#/definitions/boolean"
          }, {
            "$ref": "#/definitions/badge"
          }]
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
        "ribbon": {
          "oneOf": [{
            "$ref": "#/definitions/boolean"
          }, {
            "$ref": "#/definitions/ribbon"
          }]
        },
        "badge": {
          "oneOf": [{
            "$ref": "#/definitions/boolean"
          }, {
            "$ref": "#/definitions/badge"
          }]
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
        },
        "project": {
          "type": ["string", "number"]
        }
      },
      "anyOf": [{
        "required": ["shortName"]
      }, {
        "required": ["name"]
      }],
      "required": ["url"],
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
  "required": ["envs", "options"],
  "additionalProperties": false
};
validate.errors = null;
module.exports = validate;