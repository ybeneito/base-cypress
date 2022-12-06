# cypress project model

## Introduction

Il est souvent laborieux de mettre en place toutes les configurations et les bonnes pratiques en place à chaque fois. Soit cela nous prend trop de temps, soit on oublie des choses.

Je partage ici mon modèle de projet Cypress qui me sert de base de référence sans avoir à repartir de zéro à chaque fois.

Il contient notamment:

 - Une architecture Cypress préconfiguré
 - Des modèles de fonctions et de commandes personnalisés Cypress prêt à l'emploi
 - Une configuration CircleCI préconfiguré  pour l'intégration continue
 - Une configuration fonctionnelle de git hooks pour formater systématiquement le code
 - Des exemples d'utilisation de Newman dans une intégration continue
 - Des exemples d'utilisation de contrôle des débits du réseau lors des tests
 - Lancement des tests dans un Dashboard Cypress préconfiguré

***NB***: Ce projet est juste un **MODELE**. De ce fait, il contient plusieurs exemples d'implémentations et des pratiques assez courantes mais il faudra l'adapter à votre application et votre environnement, ou même changer complètement les fonctions selon les besoins (faire du ***custom command cypress*** par exemple).

### Public cible

Cet modèle sera utile pour tout développeur web et tout testeur cherchant à automatiser les tests d'applications web en utilisant Cypress.io ou Postman.
Le niveau minimum **débutant ++** est requis car il faudra reconfigurer certains éléments pour l'adapter à chaque besoin.

### Les principaux packages installés

Ce modèle contient déjà plusieurs packages, dont voici les plus importants:

- [Cypress](https://www.cypress.io/)
- [Newman](https://www.npmjs.com/package/newman) qui est Postman en ligne de commande
- [ESLint](https://www.npmjs.com/package/eslint) et [Prettier](https://www.npmjs.com/package/prettier): analyse et formatage de code
- [Husky](https://typicode.github.io/husky/#/): la gestion des [git hooks](https://git-scm.com/book/fr/v2/Personnalisation-de-Git-Crochets-Git)
- [junit reporter](https://www.npmjs.com/package/mocha-junit-reporter): génération de rapports de tests sous junit

## Prérequis

- Tout ordinateur : Mac, Windows, Linux
- [Node 14.0.0+ (LTS)](https://nodejs.org/)
- Installer [Visual Studio Code](https://code.visualstudio.com/download)
- Installer [git](https://git-scm.com/)
- Installer [Postman](https://www.postman.com/downloads/)
- Un compte [GitHub](https://github.com/)
- Un compte [CircleCI](https://circleci.com/vcs-authorize/) en se connectant avec votre compte **GitHub**
- Un compte pour le [Dashboard Cypress.io](https://dashboard.cypress.io/login)

Vérifiez la version de Node et de npm dans votre terminal:

```
$ node -v
# exemple: v14.17.1
$ npm -v
# exemple: 6.14.13

```

Afin d'obtenir le modèle et d'installer les dépendances NPM
Connectez vous sur votre compte [Github](https://github.com/).
Aller sur le projet: https://github.com/rwralitera/cypress-postman-template-circleci-githooks

Ensuite, cliquez sur le bouton "**Utiliser ce modèle**"
Puis donnez le nom que vous voulez à votre nouveau projet.

Pensez ensuite à cloner votre nouveau projet pour pouvoir l'utiliser, et bien sure à installer les dépendances.

Par exemple:
```
git clone https://github.com/rwralitera/nom-projet
cd nom-projet
npm install
```

### Vérification rapide  ✅

Vous pouvez tester l'installation en démarrant dans la fenêtre de terminal

```
npx cypress:run
```
et vous devriez voir dans Cypress exécuté tous les tests

## Configuration et ajustements
Maintenant que vous avez le projet en main, il va falloir faire quelques modifications pour qu'il s'adapte parfaitement à votre environnement.

### Configuration CircleCI
Ce modèle de projet intègre déjà un fichier de configuration [config.yml](https://github.com/rwralitera/backup-cypress-postman-template-circleci-githooks/blob/master/.circleci/config.yml) qui lance automatiquement les tests à chaque push.

Il reste juste à le lancer dans votre compte CircleCI.
Pour cela:

 - Connectez vous sur votre **CircleCI**
 - Allez dans l'onglet **Projet**
 - Appuyez sur le bouton **Configurer le projet** correspondant au bon projet

### Configuration Git Hooks
L'exécution des git hooks se fait grâce au package Husky dont la configuration de lancement se trouve dans le fichier package.json:
```
"husky": {
	"hooks": {
		"pre-commit": "npm run format:code:staged",
		"prepare-commit-msg": "sh scripts/prepare-commit-msg.sh ${HUSKY_GIT_PARAMS}"
	}
}
```

Comme vous pouvez le voir, il y a 2 étapes:
 - Le "**pre-commit**" qui va juste lancer [prettier](https://www.npmjs.com/package/prettier) sur tous les fichiers modifiés
 -  Le "**prepare-commit-msg**" qui va rajouter les initiales de celui qui modifie le commit [prepare-commit-msg.sh](https://github.com/rwralitera/backup-cypress-postman-template-circleci-githooks/blob/master/scripts/prepare-commit-msg.sh). 

La seule chose que vous pourriez avoir besoin de modifier, c'est peut être de rajouter ou supprimer des branches qui ne doivent pas lancer ce script:
```
if [ -z "$BRANCHES_TO_SKIP" ]; then
	BRANCHES_TO_SKIP=(develop)
fi
```
### Configuration dans les fichiers json

Il faut faire une rechercher de mot clé **XXXXXXX** dans les fichiers de configurations. Puis les remplacer par les bonnes valeurs:

 - Dans ***cypress.json***, il faut remplacer "**projectId**": "**ID_PROJET_DASHBOARD_CYPRESS**"
 - Dans ***develop.json***, il faut remplacer par le bon URL pour un environnement de développement

### Configuration dans les fichiers de code
Il faut faire une rechercher de mot clé **FIXME** dans les fichiers de configurations. Puis les remplacer par les bonnes valeurs:

 - Dans le fichier ***command.ts***, c'est principalement les URL cibles à changer selon votre environnement.
 - Dans le fichier **waitLoader.ts**, il faut juste adapté le nom du sélecteur correspondant au chargement.

### Configuration des badges
Dans l'entête de ce fichier **READMDE.md** , n'oubliez pas de changer les liens des badges pour voir rapidement rapidement l'exécution dans CircleCI et aussi le Dashboard Cypress.

## Demandes

N'hésitez pas à me contacter:

 - Si vous avez des questions concernant ce modèle
 - Si vous avez des propositions d'améliorations
 - Si vous trouvez des Bugs (Oui ca peut arriver même pour un QA)
 - Ou tout simplement si vous avez besoin d'accompagnement

## Auteur

William RALITERA est diplômé en tant qu'ingénieur en Réseaux et Télécommunications et travaille en tant que Lead QA. Il a travaillé sur dans plusieurs entreprises pour la mise en place de tests Cypress jusqu'à l'intégration CI. Il a parlé des bonnes pratiques d'utilisation ainsi que des stratégies d'automatisation de tests à adopter dans des conférences, a écrit des articles de blog sur les tests. Aujourd'hui, William utilise encore beaucoup Cypress dans les entreprises pour s'assurer que ses applications web fonctionnent toujours correctement.
