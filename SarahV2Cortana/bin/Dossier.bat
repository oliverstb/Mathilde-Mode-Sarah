@echo off
Title Cr�er un BATCH dans un dossier personalis� - By AlonsO

::************************::
::     Configuration      ::
::************************::


:: Nom du dossier
Set Dossier=Dossier

:: Chemin d'acc�s
Set Chemin=C:\Users\%username%\Desktop

:: V�rification de l'existance du dossier.
If not exist "%Chemin%\%Dossier%" Mkdir "%Chemin%\%Dossier%"

:: Cr�ation du BATCH
(
echo
echo
) > "%Chemin%\%Dossier%\%Programme%"