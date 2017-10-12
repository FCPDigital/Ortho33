gem update --system
gem install compass
compass create --syntax sass --sass-dir "assets/sass" --css-dir "assets/css" --javascripts-dir "assets/js" --images-dir "assets/img"
compass watch
#sass --watch assets/sass/app.sass:assets/css/theme.css
