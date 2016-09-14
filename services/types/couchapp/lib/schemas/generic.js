exports.v1 = {
  "id": "generic",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "version": "1.0",
  "type": "object",
  "description": "Generic document structure",
  "definitions": {
    "alphanumeric": {
      "type": "string",
      "pattern": "^[0-9A-Za-z-_]*$"
    },
    "url": {
      "type": "string",
      "pattern": "(http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?"
    },
    "date_key": {
      "type": "string",
      "pattern": "^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))$"
    }
  },
  "properties": {
    "_id": { "$ref": "#/definitions/alphanumeric" },
    "type": { "$ref": "#/definitions/alphanumeric" },
    "version": { "$ref": "#/definitions/alphanumeric" },
    "producer": {
      "type": "string"
    },
    "producer_content_id": {
      "type": "string"
    },
    "canonical_url": {
      "type": "object",
      "patternProperties": {
        "^([a-z]{2}|und)$": { "$ref": "#/definitions/url" }
      },
      "additionalProperties": false
    },
    "created": { "$ref": "#/definitions/date_key" },
    "updated": { "$ref": "#/definitions/date_key" },
    "default_language": {
      "type": "string",
      "pattern": "^([a-z]{2}|und)$"
    },
    "languages": {
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^([a-z]{2}|und)$"
      }
    },
    "fields": {
      "type": "object",
      "patternProperties": {
        "^[a-z_]*$": {
          "type": "object",
          "patternProperties": {
            "^([a-z]{2}|und)$": {
              "type": "array"
            }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    }
  },
  "required": [
    "_id",
    "fields",
    "type",
    "version",
    "producer",
    "producer_content_id",
    "canonical_url",
    "created",
    "updated",
    "default_language",
    "languages"
  ]
};
