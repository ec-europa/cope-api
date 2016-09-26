exports.v1 = {
  "id": "departments",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "version": "1.0",
  "description": "Departments document structure",
  "definitions": {
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
      "patternProperties": {
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
          additionalProperties: false
        },
        "description": { "$ref": "departments#/definitions/field_open" },
        "introduction": { "$ref": "departments#/definitions/field_open" },
        "abbreviation": { "$ref": "departments#/definitions/field_open" },
        "department_type": {
          "type": "object",
          "patternProperties": {
            "^([a-z]{2}|und)$": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["Directorate-General", "Service department", "Executive agency", "External department"]
              }
            }
          },
          additionalProperties: false
        },
        directorate_type: {
          type: 'object',
          patternProperties: {
            '^([a-z]{2}|und)$': {
              type: 'array',
              items: {
                type: 'string',
                enum: ['n/a', 'policy', 'operational']
              }
            }
          },
          additionalProperties: false
        },
        main_task: {
          type: 'object',
          patternProperties: {
            '^([a-z]{2}|und)$': {
              type: 'array',
              items: {
                type: 'string',
                enum: ['n/a', 'Policy-making and implementation', 'Managing programmes', 'Publications, archives, statistics', 'Support to the public', 'Support to EU institutions']
              }
            }
          },
          additionalProperties: false
        }
      },
      required: [
        'title',
        'department_type',
        'directorate_type',
        'main_task',
        'abbreviation'
      ]
    }
  }
};
