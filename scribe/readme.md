PLUGIN: SCRIBE
==============
Le plugin Scribe (pour Sarah) permet d'utiliser la reconnaissance vocale HTML5 de Google, � travers Google Chrome.
Le plugin cr�e un serveur HTTPS qui h�berge une page li�e au moteur de reconnaissance vocale HTML5 de Google.
Toute phrase prononc�e dans le micro est � la fois interpr�t�e par Sarah (et ses grammaires XML) et la page HTTPS.
La page HTTPS envoie au plugin Scribe tout ce qu'elle reconnait comme mots (y compris durant la phase de reconnaissance "partielle").
Le plugin Scribe offre des facilit�s pour utiliser ce que Google a reconnu comme phrase afin d'exploiter Google dans des plugins tiers.

En bonus, le plugin Scribe �crit dans une zone de la page HTTPS quel est le plugin actif mais aussi ce que Sarah a dit en surlignant les mots qui sont prononc�s au fur et � mesure (le timing de cette partie est � r�gler ind�pendamment et est totalement exp�rimental) et en animant un petit visage form� de smileys ... :-)

Pr�requis
---------
- Sarah v3 (j'ai mis du code compatible v4 mais je n'ai pas test�)
- Google Chrome en derni�re version

Installation
------------
1- copiez le r�pertoire `scribe` dans le r�pertoire `plugins` de Sarah
1bis - installez �ventuellement l'un ou l'autre plugin exemple (voir plus bas)
2- lancez Sarah (serveur+client)
3- Google Chrome s'ouvre sur la page `https://127.0.0.1:4300` (<-- HTTPS !!)
4- confirmez l'exception de s�curit�
5- au besoin confirmez l'utilisation du micro (cette �tape ne sera plus jamais demand�e car on est en HTTPS)
6- dans Chrome, appuyez sur ALT-F pour ouvrir le menu de Chrome, puis choisissez `Param�tres` (5e avant la fin)
7- allez tout en bas de la page des Param�tres et cliquez sur `Afficher les param�tres avanc�s`
8- cliquez sur le bouton `G�rer les certificats' dans la section HTTPS/SSL (vers la fin)
9- choisissez l'onglet `autorit�s de certification RACINES de confiance`
10- cliquez sur le bouton `importer` puis sur le bouton `suivant`, puis sur le bouton `parcourir`
11- dans la fen�tre qui s'ouvre choisissez `Certificats PKCS#7` dans la liste d�roulante en bas � droite (au dessus du bouton `ouvrir`)
12- s�lectionnez le fichier `sarah_chrome.p7b` qui est dans le r�pertoire du plugin et cliquez sur le bouton `ouvrir`
13- cliquez sur `suivant` deux fois, puis sur `terminer`

Les �tapes 6 � 13 ne sont � effectuer qu'une seule fois et permettent que Chrome n'�mette plus d'avertissement (�tape 4), la prochaine fois que vous lancerez Sarah

Fonctionnalit�s
---------------
Le plugin Scribe est compos� d'une partie NodeJS et d'une page web HTTPS. La page web HTTPS discute avec Sarah/NodeJS de mani�re bidirectionelle:
- elle renvoie � Sarah/NodeJS ce que Google a pu d�chiffrer, ainsi que l'indice de confiance de la reconnaissance Google
- elle re�oit de Sarah les phrases qu'elle est en train de prononcer et surligne les mots qu'elle prononce. En m�me temps un petit visage constitu� de smileys s'anime

Quand vous dites une phrase, vous pouvez voir dans Chrome le moteur de Google chercher la meilleure correspondance (=reconnaissance PARTIELLE) jusqu'� ce que le moteur consid�re que la reconnaissance est termin�e, auquel cas il renvoie une reconnaissance COMPLETE (qui s'affiche sur fond noir).

Les deux types de reconnaissance sont envoy�s � Sarah, ce qui lui permet de r�agir beaucoup plus vite que s'il fallait attendre la reconnaissance compl�te. Cette fonctionnalit� est tr�s utile car Google peut parfois mettre plusieurs secondes � reconnaitre une phrase simple ("oui", "non", "Sarah allume la lumi�re"). La reconnaissance partielle permet au plugins bas�s sur Scribe de r�agir beaucoup plus vite. Ainsi, d�s que la reconnaissance partielle � identifi� "oui", "non" ou "allum*" (� rechercher avec un Regex par ex.), on pourrait utiliser ce r�sultat plut�t que d'attendre la reconnaissance compl�te. Bien entendu ce m�canisme est optionnel et vous n'�tes pas oblig� de l'utiliser syst�matiquement.

Le plugin Scribe expose de nouveaux objets JavaScript exploitables dans vos plugins, � travers l'objet `SARAH.context.scribe`.

- compteur: il s'agit d'un compteur de phrases reconnues enti�rement par Google. A chaque fois qu'une phrase est reconnue COMPLETEMENT, ce compteur est incr�ment� de 1. Ce m�canisme permet de s'assurer tr�s rapidement qu'une nouvelle phrase a �t� prononc�e dans le micro simplement en comparant une valeur m�moris�e du compteur avec l'actuelle valeur.
- compteurPartial: il s'agit d'un compteur de phrases reconnues PARTIELLEMENT par Google. A chaque fois qu'une phrase est reconnue PARTIELLEMENT, ce compteur est incr�ment� de 1. D�s que la phrase est reconnue enti�rement, `compteurPartial` reprend la m�me valeur que `compteur`. Si on utilise la reconnaissance partielle, il faut mettre soi-m�me ce compteur � la m�me valeur que `compteur` sous peine de mal identifier les reconnaissances partielles suivantes.
- lastReco: contient la derni�re phrase reconnue COMPLETEMENT par Google.
- lastPartial: contient la derni�re phrase reconnue PARTIELLEMENT par Google.
- lastConfidence: contient la valeur de confiance de la derni�re reconnaissance COMPLETE
- lastPartialConfidence: idem pour la derni�re reconnaissance PARTIELLE
- lastX: contient un objet `[{compteur: ..., reco: ..., confidence: ...}, {}, ...]` des X derni�res reconnaissances compl�tes. La derni�re phrase reconnue est toujours en `[0]`
- microOFF(): fonction appelant `nircmd` pour �teindre le micro. C'est notamment utile pendant que Sarah parle afin que Google n'interpr�te pas ce que dit Sarah. Cette fonction est d�j� appel�e par `ScribeSpeak  et `ScribeAskMe`, il n'est donc pas n�cessaire de l'appeler lorsqu'on utilise ces deux fonctions-l�.
- microON(): fonction appelant `nircmd` pour allumer le micro.
- SarahEcoute(true|false): cette fonction permet de rendre sourde Sarah si on passe `false` en param�tre. Pour r�tablir l'�coute de Sarah, on passe `true`. Cette fonction est tr�s utile quand on d�sire ne traiter QUE la reconnaissance Google tout en emp�chant Sarah d'ex�cuter la moindre grammaire. Cette fonction est d�j� appel�e par `ScribeAskMe`.
- hook(): ceci permet d'appeler une fonction `callback` d�s 




Avantages
---------
- PLUS DE LIMITATION A 50 UTILISATIONS !!
- Plus besoin de cr�er une cl� Google API (dont le principe d'inscription change tout le temps)
- vous pouvez utiliser le m�me principe (sans n�cessairement Garbage) pour r�cup�rer ce que Chrome a compris A TOUT INSTANT ! Par ex:
  - votre grammaire contient "Sarah allume la lumi�re du salon" et "Sarah allume la lumi�re de la cuisine"
  - anciennement il fallait passer en argument (action/data) le mot "salon" ou "cuisine" si on voulait que Sarah r�ponde "j'ai allum� la lumi�re de la cuisine/salon"
  - vous pouvez � pr�sent utiliser la derni�re phrase reconnue par Google pour savoir quelle lumi�re vous avez demand� en dernier !
- Pour certains mots, Chrome est beaucoup plus pr�cis au niveau de la reconnaissance. C'est notamment le cas pour tous les mots en anglais mais aussi pour les nombres.
  

Inconv�nients
-------------
- tributaire de Google Chrome (plantages ? comment les d�tecter, relancer Chrome, etc)
- d�pend de la qualit� de la connexion (vitesse, stabilit�, disponibilit� des serveurs Google etc)
- Chrome peut entendre la r�ponse de Sarah ou d'autres bruits et donc renvoyer quelques chose d'erron� (solution ? couper le micro ?)
- il faut (l�g�rement) r��crire les plugins qui utiliseraient la r�gle GARBAGE si on veut utiliser ce principe (il faut aussi r��crire le code de speech_test.js pour qu'il utilise un certificat SSL qui ne change pas � chaque lancement ... mais bon c'est une autre histoire)

