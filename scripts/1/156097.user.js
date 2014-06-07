// ==UserScript==
// @name        Liens rapides Droit français
// @namespace   http://userscripts.org/users/488111
// @description réalise automatiquement des liens des abréviations du droit vers Légifrance
// @include     http://www.juricaf.org/arret/*
// @include     http://www.legifrance.gouv.fr/*
// @version     1.3
// @grant       none
// ==/UserScript==
document.body.innerHTML = document.body.innerHTML.replace(/([0-9.-]{1,9}) du ([C|c]ode civil)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CCIVILL0.rcv&art=$1" title="Voir sur Légifrance">$1 du $2</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([0-9.-]{1,9}) du ([C|c]ode de procédure civile)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CPROCIV0.rcv&art=$1" title="Voir sur Légifrance">$1 du $2</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode de commerce)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CCOMMERL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode de l'entrée et du séjour des étrangers et du droit d'asile)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CENTGERL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode de l'organisation judiciaire)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CORGJUNL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode de la consommation)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CCONSOML.rcv&art=$1$2"" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode de la construction et de l'habitation)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CCONSOML.rcv&art=$1$2"" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode de la propriété intellectuelle)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CPROINTL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode de la route)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CROUTENL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode de la santé publique)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CSANPUNL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode de la [S|s]écurité [S|s]ociale)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CSECSOCL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode de procédure pénale)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CPROCPEL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode du travail)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CTRAVAIL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode général des Impôts (CGI))/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CGIMPO00.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode général des Impôts (CGI) annexe 1)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CGIMPO10.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode général des Impôts (CGI) annexe 2)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CGIMPO20.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode général des Impôts (CGI) annexe 3)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CGIMPO30.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode général des Impôts (CGI) annexe 4)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CGIMPO40.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode général des collectivités territoriales)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CGCTERRL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode pénal)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CPENALLL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du ([C|c]ode électoral)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CELECTOL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');
document.body.innerHTML = document.body.innerHTML.replace(/([LRD]).? ([0-9.-]{1,9}) du (Livre des procédures fiscales)/g,'<a href="http://www.legifrance.gouv.fr/WAspad/UnArticleDeCode?code=CGLIVPFL.rcv&art=$1$2" title="Voir sur Légifrance">$1.$2 du $3</a>');