exports.v1 = {
    "id": "news",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "version": "1.0",
    "description": "News document structure",
    "definitions": {
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
      },
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
      "field_open" : {
          "type": "object",
          "patternProperties": {
              "^([a-z]{2}|und)$": {
                  "type": "array"
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
                "featured_image": { "$ref": "#/definitions/field_url" },
                "featured_media": { "$ref": "#/definitions/field_url" },
                "sources": { "$ref": "#/definitions/field_url" },
                "long_title": { "$ref" : "#/definitions/field_open" },
                "description": { "$ref" : "#/definitions/field_open" },
                "news_type": { "$ref" : "#/definitions/field_open" },
                "introduction": { "$ref" : "#/definitions/field_open" },
                "body": { "$ref" : "#/definitions/field_open" },
                "location": { "$ref" : "#/definitions/field_open" },
                "background_information": { "$ref" : "#/definitions/field_open" },
                "publish_date": { "$ref": "#/definitions/field_date" },
                "update_date": { "$ref": "#/definitions/field_date" },
                "department": { "$ref": "#/definitions/field_reference" },
                "person": { "$ref": "#/definitions/field_reference" }
            },
            "required": [
                "title",
                "long_title",
                "description",
                "news_type",
                "publish_date",
                "update_date",
                "body",
                "location"
            ]
        }
    }
};
