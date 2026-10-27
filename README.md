# BusDirect 
c' est une application web pour gérer la reservation des siéges d'un autocar sur le trajet **SAFI -> MARRAKECH**
Le bus contient **20 siéges** et on peut reserver un siége , modifier une réservation ou l'annuler.

## Technologies
**HTML**
**CSS(fichier 'style.css')**
**Tailwind CSS**
**Javascript**

## Structure de projet
 BusDirect/
├── index.html          # la page et les formulaires
└── src/
    ├── images/         # les images
    ├── icons/          # les icônes
    ├── js/
    │   └── event.js    # la logique JavaScript
    └── css/
        ├── style.css   # le style de la page
        ├── input.css   # fichier d'entrée de Tailwind
        └── output.css  # fichier généré par Tailwind

## Fonctionnalités
**réserver** : choisir le siège libre et enregistrer la réservation
**modifier** : changer le siège d' une reservation existante.
**annuler** :supprimer une réservation pour libérer le siège.
## conditions
-un siège dèjà réservé ne peut pas etre réservé une deuxième fois.
-Lors d'une modification le nv numéro de siège doit etre différent de l'ancien 
-Les sièges occupés s'affichient en violet 

### Auteur 
projet realiser dans le cadre  d' un brief de formation.
