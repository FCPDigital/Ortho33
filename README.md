# Ortho33
Theme prestashop

## Contribute

- Cloner le repository dans le répertoire du /themes 
``` bash
git clone https://github.com/SolalDR/Ortho33.git
```
- Executer sass en executant le script `sass.sh` à la racine du thème ou en lançant la méthode 
``` bash
sass --watch assets/sass/app.sass:assets/css/theme.css
```
- Modifier les fichiers souhaités
- Mettre en ligne : 
``` bash
git stash
git pull
git stash apply
[Resolve conflict]
git add .
git commit -m "Votre commit"
git push
```
