// ==UserScript==

// @name		tools

// @version 	82

// @namespace 	

// @author		

// @description	 alliance Tools 

// @include		http://s*.ikariam.*/*

// @require		http://www.ika-core.org/scripts/ika-core.js

// ==/UserScript==

// ===========================================================================

//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js

//stays untouched.

// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location

// and it will fetch automatically the newest ika-core version.

// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.

// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.

//ika core hold its own version number now.





switch (location.host) {

	default:

		alliancefullnm='LOST';

		alliancenm='LOST';		

		alliance=[	['Νo alliance'	, NoAlliance],

					[ alliancenm	, Alliance	],

					['LOST'	, Alliance	],
							
					['IESP'		,Enemies	],
					['IESP2'	,Enemies	],
					['IESP3'	,Enemies	],
					['IESP4'	,Enemies	],
					['TESP'	        ,Enemies	],
					[''		,Enemies 	]];

		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.

		//chaturl='.';

		chaturl='http://www.lostalpha.com.ar/chat/index.php';

		//forumurl='.';

		forumurl='http://www.lostalpha.com.ar/';

		//forumurlnew='.';

		



forumurlnew='hhttp://www.avefenixweb.com.ar/search.php?sid=d5cdda06db30ef761425c8c77fde1ebc';

		break;

	//for a friend

	case 's4.ikariam.gr':

		alliancefullnm='Corsairs';

		alliancenm='CoR';

		alliance=[	['Χωρίς Συμμαχία', NoAlliance  ],

					[alliancenm , Alliance ],

					['CoR-A' , Alliance ],

					['1234' , Allies ],

					['ARGO' , Allies ],

					['ARGO2' , Allies ],

					['CGK' , Allies ],

					['CY_GR' , Allies ],

					['DRGNS' , Allies ],

					['FM1' , Allies ],

					['I-W' , Allies ],

					['IONES' , Allies ],

					['KAQ' , Allies ],

					['N_L' , Allies ],

					['O_Y_K' , Allies ],

					['PCM' , Allies ],

					['SJS' , Allies ],

					['ULh' , Allies ]

					];

		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.

		//chaturl='.';		

		chaturl='http://corsairs.phpbb9.com/chatbox_mod/chatbox.forum';

		forumurl='http://corsairs.phpbb9.com';

		forumurlnew='http://corsairs.phpbb9.com/search.forum?search_id=newposts';

		break;

}

	main();

	ToolsMenu();

	fixtreaties();

	

 /*   var showbubble=Math.floor(Math.random()*10);

    if (showbubble%2) { //If Even

       addsbubble('diplomat',"Hoy es el día.", 98);

       addsbubble('scientist',"¿Que día?", 101);

       addsbubble('diplomat',"El dia en el que sere mas fuerte.", 102);

       addsbubble('scientist',"Fuerte.... y para que?", 104);

       addsbubble('diplomat',"Para hacerme respetar.", 107);

       addsbubble('scientist',"¿Con que fin?", 99);

       addsbubble('diplomat',"Con el fin de ser Poderoso.", 111);

       addsbubble('scientist',"¿Y la alianza?", 113);

       addsbubble('diplomat',"Tambien lo sera.", 115);

       addsbubble('scientist',"¿Estas seguro?", 118);

       addsbubble('diplomat',"Claro que si.", 120);

       addsbubble('scientist',"¿Y puedo seguirte?", 123);

       addsbubble('scientist',"¿Me ayudaras?", 125);

       addsbubble('diplomat',"Por supuesto... contad con migo.", 128);

       addsbubble('scientist',"¡Gracias!", 130);

    } else {

       addsbubble('general',"Todo tranquilo hoy...", 147);

       addsbubble('general',"mmmm", 149);

       addsbubble('general',"¡que raro!", 152);

       addsbubble('mayor',"Si, esta muy extraño.", 155);

       addsbubble('general', "Habra que estar atentos.", 158);

       addsbubble('mayor', "Alista las tropas por si acaso.", 161);

       addsbubble('general', "En seguida.", 165);

    }





*/
