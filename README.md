# Mathilde-Mode-Sarah
Mathilde-Mode-Sarah

Comme il y a des Membre qui mon demander le plugin Mathilde de +jeannel laurent car j'ai fait en sorte que le plugin Mathilde soie appelé Sarah.
Compliquer a expliquer.

Donc le plugin Mathilde avants on devais l'appelé Mathilde puis demandé l'action donné, maintenant plus besoin de dire Mathilde vous pouvez dire Sarah.
J'ai rajouté pas mal de plugin supplémentaire, c'est la surprise.

Voila le lien du dossier complé :  https://mega.nz/#!akAV3IaA!1ZnNY8wJFRXZwwphd8aXhp_r92ip9jpxJZD_Y0TDn2Q

Sinon ici je mettre tous les plugin a mettre dans le dossier plugins de Sarah, sa revien au même.

Explication de l'installation.

PRINCIPE /////

POUR ESSAIE///////////////////
VOUS POUVEZ METTRE dans le SARAH/custom.INI la valeur:

; Speech 1st word confidence (aka SARAH)
trigger=1

qui empecheras l'activation de SARAH et utiliseras que MATHILDE
de ce fait plus de faux positif



////////////////////////EXPLICATION

cette ensemble de plugin fonctionnent les un avec les autres
avec des mots clés et des phrases qua Mathilde mémorise
fonctionne en parallele de sarah
donc passer par mathilde ......
ou sarah ......
reviens au meme sauf que l'on n'utilise plus de garbage avec api key
donc  plus de LIMITATION A 50 REQUETE

L'APPEL AU PLUG SE FAIT EN COMMENCANT PAR MATHILDE et vos phrases habituelle
mais aussi en .......

****et c'est LA LE PRINCIPE INNNOVANT avec des phrases de votre invention

////////
INSTALATION
dézipper le repertoire mathilde V XXX
copier l'intérieur du dossier mathilde (30.. dossiers) dans SARAH/PLUGIN
relancer le nodejs(serveur et client) 2 fois de suite
apres autorisé l'expetion dans chrome

et maintenant utilisé, plus besoin de faire cela à nouveau


PRINCIPE /////////////////////////////////////

détect les autres nom que SARAH : EVA , JARVIS...
le plugin détecte automatiquement le nom du custom.ini
pas de modif à faire

ne toucher à rien sauf  :
dans memoiredemathilde/phraseclés/phrasesclés.json se trouve les phrases apprisent par MATHILDE
vous pouvez le modifier si elle apprends des choses fausses

penser à faire une sauvagarde de MEMOIREDEMATHILDE si vous réinstaler ou passer en version supperieur.... cela éviteras l'apprentissage

///////////////UTLISATION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

quand vous dites une phrase par exemple de votre plugin JARVIS :

JARVIS VA SUR INTERNET(qui est la phrase du XML)
firefox s'ouvre

avec MATHILDE :

vous : mathilde je veux que tu utilise VA SUR INTERNET
mathilde detect VA sur internet toute seul


elle recherche si c'est une phrase d'un xml
si oui : elle active le plugin avec cette phrase et elle mémorise "VA SUR INTERNET" et envoie au plugin : JARVIS : VA SUR INTERNET
et la prochaine fois que vous direz :


si non : elle recherche dans ses bases de donnée ou sur internet la meilleur réponse

MAINTENANT :
si vous dites: mathilde JE VEUX QUE TU UTILISE va sur facebook et qu'un xml correspond alors pas de question et elle active le plugin

/////////////////////////////////EXEMPLE

les mots clés suivant détecter dans une phrases active les plugins suivant :

traduction :
traduit de l'anglais au francais et vis versa
ex : mathilde il faut vraimant que j'ai la TRADUCTION de quoi d'autre
réponse : what else

synonymes :
donne les synonymes d'un mot
mathilde peux tu .....LES SYNONYMES de partir
et elle donne les synonymes

videos :
ouvre une page internet sur google video
mathilde montre moi.............VIDEOS de la guerre des étoiles

images :
idem au videos mais avec images

courses :
hack du plugin courses

permet de rajouter aux courses tout ce que vous voulez

mathilde ajoute à  la liste des courses du papier tue mouche et de l'encre
et elle rajoute papier tue mouche et de l'encre malgré que le xml est vide
mathilde enlève de la liste des courses du papier tue mouche et de l'encre
idem

memos
permet d'écrire, lire ou effacer un mémo

mathilde ...........MEMO....

et laisser vous guidez

lecture enfant:

'mathilde apprend la lecture' enclenche un plug que apprends aux enfants à lire
le texte est dans lectureenfnatmemoire/memoire.json


météo
permet d'avoir la météo du lieux de votre choix
'mathilde 'phrase de votre choix,pas important...., la météo à/sur......ce que vous voulez,pas important , le nom de votre choix

Réveil
permet de mettre le réveil à XX heure et xx minutes
'mathilde, mets le réveil à 6 heures et 21 minutes'
read me dans le dossier


infomathilde
est basé sur un timeout toutes les heures
il vérifie les mots clés(info1memoires/info.json)
modifier selon vos désirs
pour modifier voir le read me dans le plug


horoscope
 'mathilde 'phrase de votre choix,pas important...., horoscope......ce que vous voulez,pas important , le signe recherché

planing, lire le read me
""mathilde planing"" enclenche le planing, laissez vous guidez

SMS..............................

MERCI DE ME FAIRE DES RETOURS!!!!!!!!!!!!!!!!!!!!!!!

