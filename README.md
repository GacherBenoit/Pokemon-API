# API-POKEMONS
[![Node.js](https://img.shields.io/badge/Node.js-v20.2.0-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18.2-blue.svg)](https://expressjs.com/)

API Rest sur la ressources des Pokémons.

## Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Points de terminaison](#points-de-terminaison)


## Aperçu

Le projet est une API Rest développée sous NodeJs avec Express.

C'est un projet simple qui a pour objectif personnel de prendre en main Javascript coté Back-end.

Il se compose d'une table Pokémon et d'une table User pour la partie sécurité.

Le code est commenté en anglais pour une raison d'exercice pratique et d'inclusion.

## Fonctionnalités

**Opérations CRUD :**

Le projet met en place un système complet de création, lecture, mise à jour et suppression (CRUD) pour la table des Pokémon, vous permettant de gérer facilement les données Pokémon.

**Utilisation de paramètres d'URL et de query params :**

Les fonctionnalités du projet sont accessibles via des paramètres d'URL et des query parameters, offrant une flexibilité dans la personnalisation des requêtes.

**Communication Claire avec les Consommateurs de l'API :**

Chaque endpoint de l'API est soigneusement configuré pour renvoyer des messages précis et significatifs en cas de scénarios d'erreur. Que ce soit lors de la validation des données, d'une requête non autorisée ou de toute autre situation exceptionnelle, nous nous sommes efforcés de fournir des messages d'erreur détaillés et informatifs.

**Sécurité renforcée :**

Le projet intègre des mécanismes de sécurité tels que le chiffrement bcrypt pour les mots de passe et l'utilisation de JSON Web Token (JWT) pour l'authentification.

## Installation

Clonez le Répertoire : Ouvrez un terminal et utilisez la commande suivante pour cloner le répertoire de votre projet depuis GitHub (si c'est là où il est hébergé).

`git clone https://github.com/VotreNom/VotreProjet.git`

Installez les Dépendances : Utilisez la commande suivante pour installer toutes les dépendances listées dans le fichier package.json .

`npm install`

Configuration de l'Environnement : Assurez-vous d'avoir un fichier .env à la racine de votre projet pour définir vos variables d'environnement, notamment les informations sensibles comme la clé secrète pour la génération de token JWT et les paramètres de base de données. 

Dans ce projet nous avons définis dans le fichier .env:

-La clé privé utilisé pour la génération de Token JWT. Variable définis dans le projet : 'private_key' 

-L'adresse du serveur de votre base de données. Variable définis dans le projet : 'host' 

-Le nom de l'utilisateur enregistrer en base de donnée. Variable définis dans le projet : 'username'  

-Le mot de passe de l'utilisateur enregistrer en base de donnée. Variable définis dans le projet : 'password'  


Lancer le projet : Exécuter dans le terminal `npm start`.Un message dans le terminal vous indiquera si la base de donnée à bien été synchronisé.
En cas de succès cela exporteras les tables et leurs données , un utilisateur et quelques pokémons.


## Utilisation

1. Authentification : Se connecter et obtenir un token JWT

Utilisez une requête POST pour vous connecter et obtenir un token JWT à partir de la route /api/login. Dans le corps de la requête, envoyez les informations d'identification au format JSON (nom d'utilisateur et mot de passe). Si les informations sont valides, vous recevrez un token JWT que vous devrez inclure dans les en-têtes de vos requêtes ultérieures.

POST /api/login

`{"username": "votreNomUtilisateur","password": "votreMotDePasse"}`

Exemple de réponse (en cas de succès) :

`{"message": "Authentification réussie","token": "votreTokenJWT"}`

2. Obtenir la liste des pokémons limitée

Après avoir obtenu un token JWT en vous connectant avec succès, vous pouvez utiliser ce token pour accéder à des routes protégées. Dans cet exemple, nous allons utiliser la route /api/pokemons pour obtenir une liste de pokémons avec une limite spécifiée.

Exemple de requête :

`GET /api/pokemons?limit=10`

Dans cette requête, vous spécifiez le paramètre 'limit' dans la requête pour indiquer le nombre de pokémons que vous souhaitez obtenir. 

Assurez-vous également d'inclure le token JWT dans l'en-tête Authorization, en utilisant le schéma "Bearer", comme indiqué ci-dessus. Cela garantira que vous avez l'autorisation d'accéder à cette ressource protégée.

`Authorization: Bearer votreTokenJWT`

## Points de terminaison


Voici la liste des points de terminaison:

**Se Connecter et Récupérer un Token JWT**

Méthode HTTP : POST

Endpoint : `/api/login`

Paramètres du Corps de la Requête

Envoyez les informations d'identification (nom d'utilisateur et mot de passe) dans le corps de la requête au format JSON.

**Créer un Nouveau Pokémon**

Méthode HTTP : POST

Endpoint : `/api/pokemons`

Paramètres du Corps de la Requête

Envoyez les détails du nouveau Pokémon dans le corps de la requête au format JSON.

**Récupérer un Pokémon par son ID**

Méthode HTTP : GET

Endpoint : `/api/pokemons/:id`

Paramètres de la Requête

L'ID du Pokémon est spécifié dans l'URL.

**Récupérer une Liste de Pokémon**

Méthode HTTP : GET

Endpoint : `/api/pokemons`

Query Params

limit : Limite le nombre de Pokémon retournés.

name : Filtre les Pokémon par nom (facultatif).

**Supprimer un Pokémon**

Méthode HTTP : DELETE

Endpoint : `/api/pokemons/:id`

Paramètres de la Requête

L'ID du Pokémon à supprimer est spécifié dans l'URL.

**Modifier un Pokémon**

Méthode HTTP : PUT

Endpoint : `/api/pokemons/:id`

Paramètres du Corps de la Requête

Envoyez les détails mis à jour du Pokémon dans le corps de la requête au format JSON.

