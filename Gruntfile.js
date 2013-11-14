module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass:{
            dist: {
                options: {
                    style: 'expanded',
                    noCache: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: '*.scss',
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },
        coffee: {
            glob_to_multiple: {
                options: {
                    bare: true
                },
                expand: true,
                flatten: true,
                cwd: 'assets/',
                src: ['*.coffee'],
                dest: 'javascripts/',
                ext: '.js'
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: '**/*.coffee',
                tasks: ['coffee'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'coffee', 'watch']);
};
