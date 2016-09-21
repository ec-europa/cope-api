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
                      "pattern": "\\\/\\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\\/|\\\/([\\w#!:.?+=&%@!\\-\\\/]))?"
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
                "av_document": { "$ref": "#/definitions/field_open" },
                "background_information": { "$ref" : "#/definitions/field_open"},
                "body": { "$ref" : "#/definitions/field_open"},
                "contact": { "$ref": "#/definitions/field_open"},
                "department": { "$ref": "#/definitions/field_reference"},
                "description": { "$ref" : "#/definitions/field_open"},
                "event_date": { "$ref": "#/definitions/field_date" },
                "featured_image": { "$ref": "#/definitions/field_url" },
                "featured_media": { "$ref": "#/definitions/field_url" },
                "location": { "$ref" : "#/definitions/field_open"},
                "long_title": { "$ref" : "#/definitions/field_open"},
                "news_type": {
                  "type": "object",
                  "patternProperties": {
                    "^([a-z]{2}|und)$": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "enum": ["press release", "speech", "news article", "announcement", "blog post", "statement", "factsheet", "infographic", "legal document", "document"]
                      }
                    }
                  },
                  "additionalProperties": false
                },
                "introduction": { "$ref" : "#/definitions/field_open"},
                "pdf": { "$ref": "#/definitions/field_open" },
                "person": { "$ref": "#/definitions/field_reference"},
                "publish_date": { "$ref": "#/definitions/field_date" },
                "sources": { "$ref": "#/definitions/field_url" },
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
                "update_date": { "$ref": "#/definitions/field_date" }
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
