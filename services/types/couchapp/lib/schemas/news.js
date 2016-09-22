exports.v1 = {
    "id": "news",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "version": "1.0",
    "description": "news document structure",
    "definitions": {
      "field_date": {
          "type": "object",
          "patternProperties": {
              "^([a-z]{2}|und)$": {
                  "type": "array",
                  "items": {
                      "type": "string",
                      "pattern": "^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))$"
                  }
              }
          },
          "additionalProperties": false
      },
      "field_open" : {
          "type": "object",
          "patternProperties": {
              "^([a-z]{2}|und)$": {
                  "type": "array"
              }
          },
          "additionalProperties": false
      },
      "field_reference" : {
          "type": "object",
          "patternProperties": {
              "^([a-z]{2}|und)$": {
                  "type": "array",
                  "items": {
                      "type": "string",
                      "pattern": "[0-9A-Za-z-?! ]{32}$"
                  }
              }
          },
          "additionalProperties": false
      },
      "field_url": {
          "type": "object",
          "patternProperties": {
              "^([a-z]{2}|und)$": {
                  "type": "array",
                  "items": {
                      "type": "string",
                      "pattern": "\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?"
                  }
              }
          },
          "additionalProperties": false
      }
    },
    "type": "object",
    "properties": {
        "fields": {
            "type": "object",
            "properties": {
                "av_document": { "$ref": "news#/definitions/field_open" },
                "background_information": { "$ref" : "news#/definitions/field_open"},
                "body": { "$ref" : "news#/definitions/field_open"},
                "contact": { "$ref": "news#/definitions/field_open"},
                "department": { "$ref": "news#/definitions/field_reference"},
                "description": { "$ref" : "news#/definitions/field_open"},
                "event_date": { "$ref": "news#/definitions/field_date" },
                "featured_image": { "$ref": "news#/definitions/field_url" },
                "featured_media": { "$ref": "news#/definitions/field_url" },
                "location": { "$ref" : "news#/definitions/field_open"},
                "long_title": { "$ref" : "news#/definitions/field_open"},
                "news_type": {
                  "type": "object",
                  "patternProperties": {
                    "^([a-z]{2}|und)$": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "enum": ["IP","MEMO","MEX","SPEECH","CLDR","AGENDA","STATEMENT","STAT","OLAF","EPSO","AC","WM"]
                      }
                    }
                  },
                  "additionalProperties": false
                },
                "introduction": { "$ref" : "news#/definitions/field_open"},
                "pdf": { "$ref": "news#/definitions/field_open" },
                "person": { "$ref": "news#/definitions/field_reference"},
                "publish_date": { "$ref": "news#/definitions/field_date" },
                "sources": { "$ref": "news#/definitions/field_url" },
                "title": {
                    "type": "object",
                    "patternProperties": {
                        "^([a-z]{2}|und)$": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "pattern": "[0-9A-Za-z-?! ]{1,256}$"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "update_date": { "$ref": "news#/definitions/field_date" }
            },
            "required": [
                "body",
                "description",
                "location",
                "long_title",
                "news_type",
                "publish_date",
                "title",
                "update_date"
            ]
        }
    }
};
