# Voltorbataille React
Recréation du jeu *Voltorbataille* (*Voltorb Flip* en anglais) tiré de Pokémon Heart Gold / Soul Silver avec le framework **ReactJS**.
## Principe du jeu
Ce jeu est un mixte entre de la chance et de la technique. Le but du jeu est de découvrir toutes les cases ayant une valeur supérieure à 1 sans découvrir de Voltorbe car le cas échéant la partie est perdue.

Pour ce faire vous devez vous servir des indices à votre disposition : sur chaque colonne et chaque ligne est affiché :
- La somme des points obtenables dans cette ligne / colonne.
- Le nombre de Voltorbe situés dans cette ligne / colonne.
### Calcul est points
Vous commencez avec 0 point. La valeur de la première case retournée s'ajoute à votre score. Votre score est ensuite multiplié par la valeur de chaque case retournée. *Ainsi retourner une case de valeur 1 n'augmentera pas votre score.*
## Jouez dès maintenant
Une implémentation de ce jeu est disponible à l'URL https://feavy.netlify.com/vb.
## Screens
### Début de partie
![Début de partie](https://image.prntscr.com/image/hfMMJRniQVazPusiDWqrkA.png)
### Fin de partie
![Fin de partie](https://image.prntscr.com/image/MEvbqWiCQZKTV4F2Sasf9w.png)
*Remarquez que **7** cases de valeur **2** on été retournées. Le score correspond donc à **2^7** soit 128.*
