var settings = require('./utils/config');

module.exports = function gruntConfig(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    settings: settings,
    'couch-compile': {
      facade: {
        files: {
          '.tmp/facade.json': 'facade/couchapp'
        }
      },
      'service-display': {
        files: {
          '.tmp/services/display.json': 'services/display/couchapp'
        }
      },
      'service-document': {
        files: {
          '.tmp/services/document.json': 'services/document/couchapp'
        }
      },
      'service-notification': {
        files: {
          '.tmp/services/notification.json': 'services/notification/couchapp'
        }
      },
      'service-types': {
        files: {
          '.tmp/services/types.json': 'services/types/couchapp'
        }
      }
    },
    'couch-push': {
      options: {
        user: '<%= settings.admin.username %>',
        pass: '<%= settings.admin.password %>'
      },
      facade: {
        files: {
          '<%= settings.database %>': '.tmp/facade.json'
        }
      },
      'service-display': {
        files: {
          '<%= settings.database %>': '.tmp/services/display.json'
        }
      },
      'service-document': {
        files: {
          '<%= settings.database %>': '.tmp/services/document.json'
        }
      },
      'service-notification': {
        files: {
          '<%= settings.database %>': '.tmp/services/notification.json'
        }
      },
      'service-types': {
        files: {
          '<%= settings.database %>': '.tmp/services/types.json'
        }
      }
    }
  });

  // Load the couch plugin
  grunt.loadNpmTasks('grunt-couch');
};
