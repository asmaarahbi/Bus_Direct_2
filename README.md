# BusDirect Réseau

Petit site de réservation de places en autocar. Il y a 20 trajets entre des villes du Maroc (Safi, Marrakech, Casablanca, Rabat, Fès...), et pour chaque trajet on peut choisir un siège dans un bus de 20 places.

C'est la partie 2 de mon projet BusDirect. Dans la partie 1 il n'y avait qu'un seul bus Safi → Marrakech, ici j'ai passé à un réseau complet avec les données dans un fichier JSON.

Fait avec HTML, Tailwind (CDN) et du JavaScript pur, sans framework.

## Ce que fait le site

Page d'accueil :

- affiche les trajets en cartes (6 par page) avec le prix, les horaires et les places libres
- recherche par ville de départ ou d'arrivée
- filtre Tous / Disponible / Complet
- affiche le nombre total de passagers et le chiffre d'affaires du réseau

Page cabine (on y arrive avec le bouton Réserver) :

- plan des 20 sièges : bleu = libre, violet = occupé, jaune = VIP
- réserver, modifier et annuler une place
- les sièges 1 à 4 sont VIP et coûtent 10 % de plus
- les statistiques du trajet se mettent à jour à chaque action
- les messages de confirmation ou d'erreur s'affichent dans la page (pas de alert)

Liste d'attente :

- quand le bus est complet, on ajoute la personne avec son nom et son téléphone
- le téléphone est vérifié avec une regex : 06 ou 07 suivi de 8 chiffres (ou +212 au début)
- quand une place se libère, un bouton Ajouter apparaît à côté de chaque personne et la place sur le premier siège libre (les VIP en dernier)

Tout est enregistré dans le localStorage, donc les réservations restent après un rechargement.

## Lancer le projet

Il faut un serveur local, sinon `fetch` et les modules JS ne marchent pas.

1. Ouvrir le dossier dans VS Code
2. Installer l'extension Live Server
3. Clic droit sur `index.html`, puis Open with Live Server

Pour remettre les données à zéro, ouvrir la console (F12) et taper `localStorage.clear()`, puis recharger.

## Organisation des fichiers

```
index.html
cabine.html
data/trips.json
js/
  main-trajets.js   page d'accueil
  main-cabine.js    page cabine
  store.js          charge le JSON et sauvegarde dans le localStorage
  render.js         cartes, filtre et pagination
  reservations.js   petites fonctions (places libres, complet, VIP, prix)
```
