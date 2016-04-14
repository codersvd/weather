var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        //banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      src: {
        files: {
          'public/js/all.js': ['src/js/*.js']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    less: {
        development: {
            options: {
              paths: ["assets/css"]
            },
            files: {
              "public/css/main.css" : "src/less/style.less"
            }
          },
    },
    imagemin: {
                dynamic: {                         // Another target
                      files: [{
                        expand: true,                  // Enable dynamic expansion
                        cwd: 'src/',                   // Src matches are relative to this path
                        src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
                        dest: 'public/'                  // Destination path prefix
                      }]
                    }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'uglify']
      },
      css: {
          files: ['src/less/*'],
          tasks: ['less', 'autoprefixer']
      },
      html: {
              files: ['index.html'],
              //tasks: ['ejs']
      }
    },
    sprite:{
      all: {
        src: 'src/img/sprites/*.png',
        dest: 'public/img/spritesheet.png',
        destCss: 'public/css/sprites.css'
      }
    },
    autoprefixer: {
        options: {
            browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
        },
        main: {
            expand: true,
            flatten: true,
            src: 'public/css/main.css',
            dest: 'public/css/'
        }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['jshint', 'less', 'sprite', 'autoprefixer', 'uglify', 'autoprefixer', 'watch']);

};