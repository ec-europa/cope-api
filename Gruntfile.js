module.exports = function(grunt) {

  var defaults = require('lodash/defaults');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    settings: grunt.file.exists('config.json') ?
      defaults(grunt.file.readJSON('config.json'), grunt.file.readJSON('config.dist.json')) :
      grunt.file.readJSON('config.dist.json'),
    'couch-compile': {
      facade: {
        files: {
          '.tmp/facade.json': 'facade/couchapp'
        }
      },
      'service-display': {
        files: {
          '.tmp/service-display.json': 'service-display/couchapp'
        }
      },
      'service-document': {
        files: {
          '.tmp/service-document.json': 'service-document/couchapp'
        }
      },
      'service-notification': {
        files: {
          '.tmp/service-notification.json': 'service-notification/couchapp'
        }
      },
      'service-redirection': {
        files: {
          '.tmp/service-redirection.json': 'service-redirection/couchapp'
        }
      },
      'service-remote-browser': {
        files: {
          '.tmp/service-remote-browser.json': 'service-remote-browser/couchapp'
        }
      },
      'service-types': {
        files: {
          '.tmp/service-types.json': 'service-types/couchapp'
        }
      }
    },
    'couch-push': {
      options: {
        user: '<%= settings.username %>',
        pass: '<%= settings.password %>'
      },
      facade: {
        files: {
          '<%= settings.database %>': '.tmp/facade.json'
        }
      },
      'service-display': {
        files: {
          '<%= settings.database %>': '.tmp/service-display.json'
        }
      },
      'service-document': {
        files: {
          '<%= settings.database %>': '.tmp/service-document.json'
        }
      },
      'service-notification': {
        files: {
          '<%= settings.database %>': '.tmp/service-notification.json'
        }
      },
      'service-redirection': {
        files: {
          '<%= settings.database %>': '.tmp/service-redirection.json'
        }
      },
      'service-remote-browser': {
        files: {
          '<%= settings.database %>': '.tmp/service-remote-browser.json'
        }
      },
      'service-types': {
        files: {
          '<%= settings.database %>': '.tmp/service-types.json'
        }
      }
    }
  });

  // Load the couch plugin
  grunt.loadNpmTasks('grunt-couch');
};
