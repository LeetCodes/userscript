﻿// ==UserScript==
                // @name           Changer
                // @namespace      Script Dragonish
                // @include        http://www.nettby.no*
                // @description    Script for nettby til å forandre utsende.
                // @version 	   v0.2
                // ==/UserScript==
                
                var d=document;
                var images=d.getElementsByTagName('img');
                var welcome=d.getElementsByTagName("span");
                var nick1=d.getElementsByTagName("tr");
                var nick2=d.getElementsByTagName("span");
                var member="";
                var city1=d.getElementsByTagName("tr");
                var city2=d.getElementsByTagName("strong");
                var count=0;
                var fonts=d.getElementsByTagName('font');
                var links=d.getElementsByTagName('a');
                var mm=d.getElementsByTagName('link');
                var r=d.getElementsByTagName('div');mm[0].href='http://dragen.mikromann.net/Mark.css';
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_evening.gif")
                {images[i].src='http://dragen.mikromann.net/changer/change.jpg';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_night.gif")
                {images[i].src='http://dragen.mikromann.net/changer/change.jpg';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_day.gif")
                {images[i].src='http://dragen.mikromann.net/changer/change.jpg';}}
                
                for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_morning.gif")
                {images[i].src='http://dragen.mikromann.net/changer/change.jpg';}}
                
                