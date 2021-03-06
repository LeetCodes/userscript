// ==UserScript==
// @name        R2D CnC Tiberium Alliances Ultimate Pack 1.60b TACS 3.0b
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
/* @description Packing all more used script for C&C Tiberium Alliance Web Game.

Pack list : 

- Infernal Wrapper (API needed)
- Chat Helper Enhanced
- Tiberium Zoomer (KOMMANDO)
- Tiberium Coords 500:500
- Maelstorm Tools
- Formation Saver
- TACS - Tiberium Alliances Combat Simulator
- CnCOpt
- MT Basescan
- Transfer All
- C&C:TA Compass Movable
- Tiberium Alliances Info
- Coords Button - All
- Base Info
- The Green Cross - Tiberium Alliances Tools
- Tiberium Alliances Info Sticker
- Formation saver
- Tiberium Alliances Upgrade Base/Defense/Army
- POI Analyser
- Map
- PvP/PvE Player Info Mod
- Loot Summary
- Extra Weltkarte 31


*/
// @version     1.60b
// @updateURL   http://userscripts.org/scripts/source/175493.meta.js
// @downloadURL http://userscripts.org/scripts/source/175493.user.js
// @grant       none
// ==/UserScript==

// type: /chelp in any text box and hit <enter> for a list of commands


/***************************************************************************************************
***************************************************************************************************/


// ==UserScript==
// @name infernal wrapper
// @description Supplies some wrapper functions for public use 
// @namespace infernal_wrapper
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 0.390737.5
// @author infernal_me, KRS_L, krisan
// ==/UserScript==
(function () {
    var CCTAWrapper_main = function () {
        try {
            _log = function () {
                if (typeof console != 'undefined') console.log(arguments);
                else if (window.opera) opera.postError(arguments);
                else GM_log(arguments);
            }

            function createCCTAWrapper() {
                console.log('CCTAWrapper loaded');
                _log('wrapper loading' + PerforceChangelist);
                System = $I;
                SharedLib = $I;
                var strFunction;
                
                // SharedLib.Combat.CbtSimulation.prototype.DoStep
                for (var x in $I) {
                    for (var key in $I[x].prototype) {
                        if ($I[x].prototype.hasOwnProperty(key) && typeof($I[x].prototype[key]) === 'function') {  // reduced iterations from 20K to 12K
                            strFunction = $I[x].prototype[key].toString();
                            if (strFunction.indexOf("().l;var b;for (var d = 0 ; d < c.length ; d++){b = c[d];if((b.") > -1) {
                                $I[x].prototype.DoStep = $I[x].prototype[key];
                                console.log("SharedLib.Combat.CbtSimulation.prototype.DoStep = $I." + x + ".prototype." + key);
                                break;
                            }
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.CanRepair
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("DefenseSetup") > -1 && strFunction.indexOf("DamagedEntity") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("Type==7") > -1 && strFunction.indexOf("var a=0;if") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityUnits.prototype.get_OffenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                var searchString = "for (var b in {d:this.";
                var startPos = strFunction.indexOf(searchString) + searchString.length;
                var fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                var fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_OffenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Data.CityUnits.prototype.get_DefenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                searchString = "for (var c in {d:this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_DefenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation
                strFunction = ClientLib.Vis.Battleground.Battleground.prototype.StartBattle.toString();
                searchString = "=0;for(var a=0; (a<9); a++){this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = fn;
                console.log("ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = function(){return this." + fn_name + ";}");

                // GetNerfBoostModifier
                if (typeof ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier == 'undefined') ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier = ClientLib.Base.Util.GetNerfAndBoostModifier;

                _log('wrapper loaded');
            }
        } catch (e) {
            console.log("createCCTAWrapper: ", e);
        }

        function CCTAWrapper_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined') {
                    createCCTAWrapper();
                } else {
                    window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
                }
            } catch (e) {
                CCTAWrapper_IsInstalled = false;
                console.log("CCTAWrapper_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
        }
    }

    try {
        var CCTAWrapper = document.createElement("script");
        CCTAWrapper.innerHTML = "var CCTAWrapper_IsInstalled = true; (" + CCTAWrapper_main.toString() + ")();";
        CCTAWrapper.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(CCTAWrapper);
        }
    } catch (e) {
        console.log("CCTAWrapper: init error: ", e);
    }
})();


// ==UserScript==
// @name        C&C:Tiberium Alliances Coords Button - All
// @namespace   CNCTACoordsButtonAll
// @description Copy & Paste selected world object coords to chat message
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     2.0.1
// @author Bruce Doan, Chiantii
// @updateURL   https://userscripts.org/scripts/source/167957.meta.js
// @downloadURL https://userscripts.org/scripts/source/167957.user.js
// ==/UserScript==
(function () {
  var CNCTACoordsButtonAll_main = function () {
    try {
      function createCoordsButton() {
        console.log('C&C:Tiberium Alliances Coords Button All loaded.');
 
        /*
        $a = qx.core.Init.getApplication(); // Application
        $c = $a.getChat(); // ChatWindow
        $w = $c.getChatWidget(); // ChatWidget
        $i = $cw.getEditable(); // Input
        $d = $i.getContentElement().getDomElement(); // Input DOM Element
        */
 
        var coordsButton = {
          selectedBase: null,
          pasteCoords: function(){
            var $i = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
            var $d = $i.getContentElement().getDomElement(); // Input DOM Element
 
            var result = new Array();
            result.push($d.value.substring(0,$d.selectionStart)); // start
 
            result.push('[coords]' + coordsButton.selectedBase.get_RawX() + ':' + coordsButton.selectedBase.get_RawY() + '[/coords]');
 
            result.push($d.value.substring($d.selectionEnd, $d.value.length)); // end
 
            $i.setValue(result.join(' '));
          }
        };
 
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
       
          webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {
            coordsButton.selectedBase = selectedVisObject;
            if (this.__coordsButton_initialized != 1) {
              this.__coordsButton_initialized = 1;
              this.__newComposite = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({
                padding: 2
              });
              for(i in this) {
                if(this[i] && this[i].basename == "Composite") {
                  var button = new qx.ui.form.Button("Paste Coords");
                  button.addListener("execute", function () {
                    coordsButton.pasteCoords();
                  });            
                  this[i].add(button);
                }
              }
            }
            this.__coordsButton_showMenu(selectedVisObject);
            switch (selectedVisObject.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
              case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubServer:
                this.add(this.__newComposite);
                break;
            }
          }
        }
      }    
    } catch (e) {
      console.log("createCoordsButton: ", e);
    }
 
    function CNCTACoordsButtonAll_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          createCoordsButton();
        } else {
          window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("CNCTACoordsButtonAll_checkIfLoaded: ", e);
      }
    }
  window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
  };
  try {
    var CNCTACoordsButtonAll = document.createElement("script");
    CNCTACoordsButtonAll.innerHTML = "(" + CNCTACoordsButtonAll_main.toString() + ")();";
    CNCTACoordsButtonAll.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(CNCTACoordsButtonAll);
  } catch (e) {
    console.log("CNCTACoordsButtonAll: init error: ", e);
  }
})();


// ==UserScript==
// @name 			The Green Cross - Tiberium Alliances Tools
// @description 	Tools to help the player manage their gameplay more efficiently and effectively. A non-wrapper take of Maelstrom tools with some original touch.
// @namespace      	http*://*.alliances.commandandconquer.com/*
// @include        	http*://*.alliances.commandandconquer.com/*
// @version 		0.5 / 0.51.b
// @author 			Peluski17
// @Modifié par		Christian_FR
// Modification de la présentation de la partie gestion des POI.
// Adaptation pour les coordonnées supérieures à 999:999 (mondes ayant des coordonnées en 1600:1600)
// @grant 			none
// ==/UserScript==

(function () 
{
	var injectFunction = function() 
	{
		function createClasses()
		{
			qx.Class.define("TGCTools", 
			{
				type: "singleton",
				extend: qx.core.Object,
            
				construct: function()
				{
					try
					{
						//Collect All Resources from other bases button
						/*var playArea = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA);
						
						var transAllResBtn = new qx.ui.form.Button("Transfer All");
						transAllResBtn.set
						({
							alignY: "middle",
							width: 75,
							height: 30,
							toolTipText: "Transfers all resources from the other bases to this one",
							appearance: "button-text-small"
						});
						transAllResBtn.addListener("click", this._transferAllResources, this);
						playArea.add(transAllResBtn, { top: 5, right: 300 });*/
						
						var app = qx.core.Init.getApplication()
						var bar = app.getOptionsBar();
						var cntButton = bar.getChildren()[2];
						this.managerBtn = new qx.ui.form.Button("Manager").set({alignX: "center"});
						this.managerBtn.set
						({
							alignY: "middle",
							width: 75,
							height: 30,
							toolTipText: "Opens popup menu with buttons to management tools",
							appearance: "button-text-small"
						});
						this.managerBtn.addListener("click", this._popupManager, this);
						cntButton.removeAt(0);
						cntButton.addAt(this.managerBtn, 1);
						
						//var scanBtn = new qx.ui.form.Button("", "webfrontend/ui/icons/icon_mainui_base_button.png").set
						var scanBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_attack_start_combat.png").set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 40,
							height: 40,
							toolTipText: "Opens up Base Scanner",
							appearance: "button-text-small"
						});
						scanBtn.addListener("click", this._openScanner, this);
						
						var poiBtn = new qx.ui.form.Button("", "webfrontend/battleview/neutral/gui/icn_mutants.png").set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 40,
							height: 40,
							toolTipText: "Opens POI Management Tool",
							appearance: "button-text-small"
						});
						poiBtn.addListener("click", this._openPOIWindow, this);
						
						var upgradeBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_mode_upgrade.png").set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 40,
							height: 40,
							toolTipText: "Opens Upgrade Management Tool",
							appearance: "button-text-small"
						});
						upgradeBtn.addListener("click", this._openUpgradeWindow, this);
						
						this.managerPopup = new qx.ui.popup.Popup(new qx.ui.layout.Grid(5)).set({
							width: 150,
							height: 150,
							allowGrowY: false,
							allowGrowX: false,
							padding: 5,
							position: "top-right"
						});
						this.managerPopup.add(scanBtn, {row: 0, column: 0});
						this.managerPopup.add(poiBtn, {row: 0, column: 1});
						this.managerPopup.add(upgradeBtn, {row: 0, column: 2});
						this.managerPopup.setAutoHide(false);
						//this.add(this.managerPopup);
					}
					catch(e)
					{
						console.log("Error initializing TGCTools Class: " + e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					managerBtn: null,
					managerPopup: null,
					
					attachNetEvent: function()
					{
						console.log("Need to assign correct function!");
					},
					
					formatNumbersCompact: function()
					{
						console.log("Need to assign correct function!");
					},
					
					numberWithCommas: function(x)
					{
						var parts = x.toString().split(".");
						parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						return parts.join(".");
					},
					
					/*_transferAllResources: function()
					{
						try
						{
							playerCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
							ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							ownCityID = ownCity.get_Id();
							
							//playerCities.d contains the city ID's
							for (var cityID in playerCities.d)
							{
								transCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityID);
								console.log(transCity.get_Name());
								var transID = transCity.get_Id();
								console.log(transID);
								if (transID != ownCityID)
								{
									var tib = Math.round(transCity.GetResourceCount(1) - 0.5);
									console.log("Tiberium: " + tib);
									var cry = Math.round(transCity.GetResourceCount(2) - 0.5);
									console.log("Crystal: " + cry);
									ownCity.SelfTrade(transID, 1, tib); //1 is for tiberium
									ownCity.SelfTrade(transID, 2, cry);
								}
							}
							console.log("Transfer of All Resources Complete");
						}
						catch(e)
						{
							console.log("Error Transferring All Resources to City: " + e.toString());
						}
					},*/
					
					_openScanner: function()
					{
						if (TGCTools.BaseScanner.getInstance().isVisible())
							TGCTools.BaseScanner.getInstance().close();
						else
						{
							TGCTools.BaseScanner.getInstance().open();
							this.managerPopup.hide();
						}
					},
					
					_openPOIWindow: function()
					{
						if (TGCTools.POIWindow.getInstance().isVisible())
						{
							TGCTools.POIWindow.getInstance().close();
						}
						else
						{
							TGCTools.POIWindow.getInstance().open();
							this.managerPopup.hide();
						}
					},
					
					_openUpgradeWindow: function()
					{
						if (TGCTools.UpgradeWindow.getInstance().isVisible())
						{
							TGCTools.UpgradeWindow.getInstance().close();
						}
						else
						{
							TGCTools.UpgradeWindow.getInstance().open();
							this.managerPopup.hide();
						}
					},
					
					_popupManager: function()
					{
						if (this.managerPopup.isVisible())
						{
							this.managerPopup.hide();
						}
						else
						{
							this.managerPopup.placeToWidget(this.managerBtn, false);
							this.managerPopup.show();
						}
					}
				}
			});
			
			qx.Class.define("TGCTools.BaseScanner", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{
					try
					{
						this.base(arguments);
						this.setLayout(new qx.ui.layout.VBox());
					
						this.set({
							width: 700,
							caption: "Base Scanner",
							padding: 5,
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,	
						});
						
						var scanBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
						var scanBtn = new qx.ui.form.Button("Scan").set({
							allowGrowY: false,
							width: 60, 
							height: 20,
							toolTipText: "Scans all nearby bases within 20 spaces",
							appearance: "button-text-small"
						});
						
						scanBtn.addListener("click", function()
						{
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							var object = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
							ClientLib.Vis.VisMain.GetInstance().set_SelectedObject(object);
							TGCTools.BaseScanner.getInstance()._waitForPlayerCity(ownCity);
						}, this);
						
						stopBtn = new qx.ui.form.Button("Stop").set({
							allowGrowY: false,
							width: 60, 
							height: 20,
							toolTipText: "Stops scan",
							appearance: "button-text-small"
						});
						this.stopScan = false;
						
						stopBtn.addListener("click", this.setStopScan, this);
						stopBtn.setEnabled(false);
						
						//var cityTypeLabel = new qx.ui.basic.Label("City Type:").set({marginLeft: 15, marginRight: 5});
						//cityTypeLabel.setTextColor("white");
						this.cityTypeSelectBox =  new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("City Type (All)", null, "0"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Camp/Outpost Only", null, "1"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Camp/Outpost/NPC Base", null, "2"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Camp/Outpost/Player", null, "3"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("NPC Base Only", null, "4"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("NPC Base/Player", null, "5"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Player Only", null, "6"));
						
						var layoutBtn = new qx.ui.form.Button("Layouts").set({
							allowGrowY: false,
							width: 60, 
							height: 20,
							toolTipText: "Opens new window that displays the layouts of the cities found.",
							appearance: "button-text-small"
						});
						layoutBtn.addListener("click", this._openLayoutWindow, this);
						
						this.distanceSelectBox = new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						
						this.distanceSelectBox.add(new qx.ui.form.ListItem("Distance (All)", null, "0"));
						for (var i = 1; i <= 20; i++)
						{
							var distSelectItem = new qx.ui.form.ListItem("<= " + i + "", null, "" + i + "");
							this.distanceSelectBox.add(distSelectItem);
						}
						
						this.cpCostBox = new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						
						this.cpCostBox.add(new qx.ui.form.ListItem("CP Cost (All)", null, "0"));
						for (var i = 11; i <= 45; i += 2)
						{
							var cpCostItem = new qx.ui.form.ListItem("<= " + i + "", null, "" + i + "");
							this.cpCostBox.add(cpCostItem);
						}
						
						this.layoutSelectBox = new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						var allLayouts =  new qx.ui.form.ListItem("Layout Type (All)", null, "0");
						var moreTib = new qx.ui.form.ListItem("7 Tib / 5 Cry", null, "1");
						var equalTibCry = new qx.ui.form.ListItem("6 Tib / 6 Cry", null, "2");
						var moreCry = new qx.ui.form.ListItem("5 Tib / 7 Cry", null, "3");
						this.layoutSelectBox.add(allLayouts);
						this.layoutSelectBox.add(moreTib);
						this.layoutSelectBox.add(equalTibCry);
						this.layoutSelectBox.add(moreCry);

						scanBox.add(scanBtn);
						scanBox.add(stopBtn);
						scanBox.add(layoutBtn);
						scanBox.add(this.cityTypeSelectBox);
						scanBox.add(this.distanceSelectBox);
						scanBox.add(this.cpCostBox);
						scanBox.add(this.layoutSelectBox);
						
						this.add(scanBox);
						
						this.scanTableModel = new qx.ui.table.model.Simple();
						this.scanTableModel.setColumns(["ID", "Level", "Name", "Owner", "Coords", "Distance", "CP Cost", "Loot/CP", "Total Loot", "Tiberium", "Crystals", "Credits", "RP"]);
						this.scanTable = new qx.ui.table.Table(this.scanTableModel);
						this.scanTable.setColumnWidth(1, 45);
						this.scanTable.setColumnWidth(4, 60);
						this.scanTable.setColumnWidth(5, 65);
						this.scanTable.setColumnWidth(6, 60);
						this.scanTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
						this.scanTable.addListener("cellDblclick", function(evt)
						{
							var row = evt.getRow();
							var id = parseInt(this.scanTableModel.getValueById("ID", row));
							//var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(id);

							ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(id);
							 
							//Set it to the right army layout
							setTimeout(function(){
								webfrontend.gui.UtilView.openVisModeInMainWindow(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, id, false);
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
								var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
								var formationManager = ownCity.get_CityArmyFormationsManager();
								ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
							}, 1000);
						}, this);
						this.add(this.scanTable);
						
						var scanStatusBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
						this.scanStatus = new qx.ui.basic.Label("");
						this.scanStatus.setTextColor("white");
						scanStatusBox.add(this.scanStatus);
						
						this.add(scanStatusBox);

						this.resourceInfo = new Array();
						this.gotResources = false;
						this.scannedCities = new Array();
						this.tableData = new Array();
						this.loopCount = 0;
					}
					catch(e)
					{
						console.log("Error initializing TGCTools Class: " + e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					scanTable: null,
					scanTableModel: null,
					scannedCities: null,
					tableData: null,
					scanStatus: null,
					distanceSelectBox: null,
					cpCostBox: null,
					layoutSelectBox: null,
					gotResources: null,
					resourceInfo: null,
					loopCount: null,
					
					_openLayoutWindow:function()
					{
						if (TGCTools.BaseScanner.TerrainLayout.getInstance().isVisible())
						{
							TGCTools.BaseScanner.TerrainLayout.getInstance().close();
						}
						else
						{
							TGCTools.BaseScanner.TerrainLayout.getInstance().open();
							TGCTools.BaseScanner.TerrainLayout.getInstance().getLayouts();
						}
					},
					
					_waitForPlayerCity: function(ownCity)
					{
						stopBtn.setEnabled(true);
						if (ownCity.m_Level <= 0)
						{
							(function(ownCity)
							{
								setTimeout(function() 
								{
									TGCTools.BaseScanner.getInstance()._waitForPlayerCity(ownCity);
								}, 1000);
							}(ownCity));
						}
						else
						{
							this._scanBases(ownCity);
						}
					},
				
					_scanBases: function(ownCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
							
						var count = 0;
						if (this.scannedCities.length > 0)
						{
							this.scannedCities = new Array();
							this.tableData = new Array();
							var numRows = this.scanTableModel.getRowCount();
							
							this.scanTableModel.removeRows(0, numRows, true);
						}
							
						this.scanStatus.setValue("Scanning for Cities - found: " + count);
						//var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var ownCoordsX = ownCity.get_PosX();
						var ownCoordsY = ownCity.get_PosY();
						var maxDist = this.distanceSelectBox.getSelection()[0].getModel();
						var maxCP = this.cpCostBox.getSelection()[0].getModel();
						var cityType = this.cityTypeSelectBox.getSelection()[0].getModel();
						
						if (maxDist == "0")
							maxDist = 20;
							
						if (maxCP == "0")
							maxCP = 45;
						
						for (var x = -maxDist; x <= maxDist; x++)
						{
							if(this.stopScan == true)
							{
								this.stopScan = false;
								this._getNextScannedCity("stop");
								return;
							}
							for (var y = -maxDist; y <= maxDist; y++)
							{
								if (x == 0 && y == 0) continue;
									
								var scanX = ownCoordsX + x;
								var scanY = ownCoordsY + y;
								var distance = ClientLib.Base.Util.CalculateDistance(ownCoordsX, ownCoordsY, scanX, scanY);
								if(distance > maxDist)
									continue;
								
								var cpCost = ownCity.CalculateAttackCommandPointCostToCoord(scanX, scanY);
								
								if (cpCost > maxCP)
									continue;
								
								var width = ClientLib.Vis.VisMain.GetInstance().get_Region().get_GridWidth();
								var height = ClientLib.Vis.VisMain.GetInstance().get_Region().get_GridHeight();
								
								var object = ClientLib.Vis.VisMain.GetInstance().get_Region().GetObjectFromPosition(scanX * width, scanY * height);
								//ClientLib.Vis.VisMain.GetInstance().get_Region().GetObjectFromPosition(245 * 128, 366 * 96);
								if (object != null)
								{
									cityAttr = {};
									cityAttr.type = object.get_VisObjectType();
									switch(cityAttr.type)
									{
										case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
											cityAttr.name = "Base";
											cityAttr.owner = "Forgotten";
											break;
										case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
											cityAttr.name = "Camp/Outpost";
											cityAttr.owner = "Forgotten";
											break;
										case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
											if (object.IsOwnBase())
												continue;
											cityAttr.name = object.get_Name();
											cityAttr.owner = object.get_PlayerName();
											break;

										default: continue; break;
									}
									
									//Is it a selected type
									if (cityType == 1 && (cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionCityType || cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCBase))
										continue;
									else if (cityType == 2 && cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionCityType)
										continue;
									else if (cityType == 3 && cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCBase)
										continue
									else if (cityType == 4 && (cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionCityType || cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp))
										continue;
									else if (cityType == 5 && cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp)
										continue;
									else if (cityType == 6 && (cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCBase || cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp))
										continue;
									
									if (object.get_ConditionDefense() == 0)
										continue;
									count++;
									this.scanStatus.setValue("Scanning for Cities - found: " + count);
									cityAttr.id = object.get_Id();
									
									cityAttr.level = object.get_BaseLevel();
									cityAttr.coords = scanX + ":" + scanY;
									cityAttr.distance = distance;
									cityAttr.cp = cpCost;
									this.scannedCities.push(cityAttr);
								}
							}
						}
						
						this.scanIdx = 0;
						this._getScannedCityData();
					},
					
					_getScannedCityData: function()
					{
						if (this.scannedCities.length == 0)
							return;
							
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}	

						this.scanStatus.setValue("Retrieving City Information: (" + (this.scanIdx + 1) + " of " + this.scannedCities.length + ")");						
						var cityID = this.scannedCities[this.scanIdx].id;
					
						//Select Current Base
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(cityID);
						var thisCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
						var thisVisCity =  ClientLib.Vis.VisMain.GetInstance().get_City();
						
						this.loopCount = 0;
						this._waitForCity(thisCity, thisVisCity);
					},
					
					_waitForCity: function(city, visCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
						
						if ((visCity.get_CurrentCityId() <= 0 || city.m_Level <= 0) && this.loopCount <= 10)
						{
							this.loopCount++;
							(function(city, visCity) 
							{
								setTimeout(function() 
								{
									TGCTools.BaseScanner.getInstance()._waitForCity(city, visCity);
								}, 1000);
							}(city, visCity));
						}
						else if (this.loopCount > 10)
						{
							this._getNextScannedCity();
							return;
						}
						else
						{
							this.resourceInfo = this.getCityResourcesAndLayout(city, visCity);
							this._waitForResources(city, visCity);
						}
					},
					
					_waitForResources: function(city, visCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
						
						if (this.gotResources == false)
						{
							(function(city, visCity) 
							{
								setTimeout(function() 
								{
									TGCTools.BaseScanner.getInstance()._waitForResources(city, visCity);
								}, 1000);
							}(city, visCity));
						}
						else
						{
							this.gotResources = false;
							this._scannedCityInfo(city, visCity);
						}
					},
					
					_scannedCityInfo: function(city, visCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
						
						var cityObj = this.scannedCities;
						idx = this.scanIdx;
						var info = this.resourceInfo;
						
						var layoutType = parseInt(this.layoutSelectBox.getSelection()[0].getModel());
						if (layoutType == 1 && (info.tibCount != 7 && info.cryCount != 5))
						{
							this._getNextScannedCity();
							return;
						}
						else if (layoutType == 2 && (info.tibCount != 6 || info.cryCount != 6))
						{
							this._getNextScannedCity();
							return;
						}
						else if (layoutType == 3 && (info.tibCount != 5 || info.cryCount != 7))
						{
							this._getNextScannedCity();
							return;
						}

						cityData = {};
						cityData.scanInfo = cityObj[idx];
						cityData.loot = info.loot;
						cityData.layout = info.layout;
						
						var totalLoot = info.loot[1] + info.loot[2] + info.loot[3] + info.loot[6];
						var lootPerCP = totalLoot / cityObj[idx].cp;
			
						this.tableData.push(cityData); //Important
						this.scanTableModel.addRows([[cityObj[idx].id.toString(), cityObj[idx].level, cityObj[idx].name, cityObj[idx].owner, cityObj[idx].coords, cityObj[idx].distance, cityObj[idx].cp, lootPerCP, totalLoot, info.loot[1], info.loot[2], info.loot[3], info.loot[6]]]);
						this._getNextScannedCity();
					},
					
					_getNextScannedCity: function(status)
					{
						this.scanIdx++;
						if (this.scanIdx != this.scannedCities.length && typeof status == 'undefined')
							this._getScannedCityData();
						else
						{
							this.scanStatus.setValue("Scan Complete: Showing " + this.tableData.length + " results.");	
							stopBtn.setEnabled(false);
						}
					},
					
					getCityResourcesAndLayout: function(city, visCity)
					{
						try
						{  
                            //Pretty sure we just need the EResourceType
                            var lootArray = {1: 0, 2: 0, 3: 0, 6: 0}; //1: Tib, 2: Cry, 3: Gold(credits) 6: RP
							var info = new Array();
							var layout = new Array();
							var tibCount = 0;
							var cryCount = 0;
                            var mod = 0;
                            for (var x = 0; x < 9; x++)
							{
								if(this.stopScan == true)
								{
									this.stopScan = false;
									this._getNextScannedCity("stop");
									return;
								}
                                for (var y = 0; y < 8; y++)
                                {
									
									var field = {};
									var fieldType = city.GetResourceType(x ,y);
									field.type = fieldType;
									field.x = x;
									field.y = y;
									
									layout.push(field);

									if (fieldType == ClientLib.Data.ECityTerrainType.CRYSTAL)
										cryCount++;
									else if (fieldType == ClientLib.Data.ECityTerrainType.TIBERIUM)
										tibCount++;

                                	var width =  visCity.get_GridWidth();
                                	var height =  visCity.get_GridHeight();
                                
                               		var cityEntity = visCity.GetCityObjectFromPosition(x * width, y * height);
                                    
                                    if (cityEntity != null && cityEntity.get_CityEntity() !== null)
                                    {
                                        var buildingDetails = cityEntity.get_BuildingDetails();		
										mod = buildingDetails.get_HitpointsPercent();
                                        var reqs = buildingDetails.get_UnitLevelRepairRequirements();
										
										for (var idx2 = 0; idx2 < reqs.length; idx2++)
										{
											var type = reqs[idx2].Type;
											var count = reqs[idx2].Count;
											lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
										}
                                    }							
                                    
                                    //Now do the same for defense units
                                    var defEntity = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition(x * width, y * height);
                                    if (defEntity !== null && defEntity.get_CityEntity() !== null) 
                                    {
                                        var unitDetails = defEntity.get_UnitDetails();	
                                        mod = unitDetails.get_HitpointsPercent();	
                                        var reqs = unitDetails.get_UnitLevelRepairRequirements();
										
										for (var idx2 = 0; idx2 < reqs.length; idx2++)
										{
											var type = reqs[idx2].Type;
											var count = reqs[idx2].Count;
											lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
										}
                                    }
                                }
                            }
							
							var infoProps = {};
							info.loot = lootArray;
							info.layout = layout;

							info.tibCount = tibCount;
							info.cryCount = cryCount;
							info.push(infoProps);
							this.gotResources = true;
							return info;
						}
						catch(e)
						{
							console.log(e.toString());
						}
					},
					
					getTableData: function()
					{
						return this.tableData;
					},
					
					setStopScan: function()
					{
						this.stopScan = true;
					}
					
					//_getTableSelection: function()
					//{
					//	this.scanTable.getSelection()
					//}
				}
			});
			
			qx.Class.define("TGCTools.BaseScanner.TerrainLayout", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{
					try
					{
						this.base(arguments);
						this.setLayout(new qx.ui.layout.VBox());
					
						this.set({
							width: 600,
							caption: "City Layouts",
							padding: 5,
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,	
						});
						
						this.resourceImages = new Array();
						this.resourceImages[0] = "webfrontend/ui/common/icn_res_tiberium.png";
						this.resourceImages[1] = "webfrontend/ui/common/icn_res_chrystal.png";
						
						this.scroll = new qx.ui.container.Scroll().set({
							width: 300,
							height: 240
						});
						
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					resourceImages: null,
					scroll: null,
					
					getLayouts: function()
					{
						var tableData = TGCTools.BaseScanner.getInstance().getTableData();
						var layoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));

						for (var i = 0; i < tableData.length; i++)
						{	
							var cityGrid = new qx.ui.container.Composite();
							var cityGridLayout = new qx.ui.layout.Grid(5);
							cityGridLayout.setColumnMinWidth(0, 25);
							cityGridLayout.setColumnMinWidth(1, 25);
							cityGridLayout.setColumnMinWidth(2, 25);
							cityGridLayout.setColumnMinWidth(3, 25);
							cityGridLayout.setColumnMinWidth(4, 25);
							cityGridLayout.setColumnMinWidth(5, 25);
							cityGridLayout.setColumnMinWidth(6, 25);
							cityGridLayout.setColumnMinWidth(7, 25);
							cityGridLayout.setColumnMinWidth(8, 25);
							cityGridLayout.setRowMinHeight(0, 25);
							cityGridLayout.setRowMinHeight(1, 25);
							cityGridLayout.setRowMinHeight(2, 25);
							cityGridLayout.setRowMinHeight(3, 25);
							cityGridLayout.setRowMinHeight(4, 25);
							cityGridLayout.setRowMinHeight(5, 25);
							cityGridLayout.setRowMinHeight(6, 25);
							cityGridLayout.setRowMinHeight(7, 25);
							cityGrid.setLayout(cityGridLayout);
							var cityType = tableData[i].scanInfo.type;

							switch(cityType)
							{
								case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
									cityGrid.setBackgroundColor("darkred");
									cityGrid.setOpacity(0.7);
									break;
								case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
									cityGrid.setBackgroundColor("darkblue");
									cityGrid.setOpacity(0.7);
									break;
								case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
									cityGrid.setBackgroundColor("darkgreen");
									cityGrid.setOpacity(0.7);
									break;
							}
							
							cityGrid.setToolTipText("Level " + tableData[i].scanInfo.level + " " + tableData[i].scanInfo.name + " @ " + tableData[i].scanInfo.coords);
							//for (var x = 0; x < 9; x++)
							//{
								//for (var y = 0; y < 8; y++)
								//{
								for (var j = 0; j < tableData[i].layout.length; j++)
								{
									var fieldType = tableData[i].layout[j].type;
									var cell = new qx.ui.basic.Image();
									var x = tableData[i].layout[j].x;
									var y = tableData[i].layout[j].y;
									
									switch(fieldType)
									{
										case ClientLib.Data.ECityTerrainType.CRYSTAL:
											cell.setSource(this.resourceImages[1]);
											break;
										case ClientLib.Data.ECityTerrainType.TIBERIUM:
											cell.setSource(this.resourceImages[0]);
											break;	
									}
									cityGrid.add(cell, {row: y, column: x});
								}
							//}
							layoutBox.add(cityGrid);
						}
						this.scroll.add(layoutBox);
						this.add(this.scroll);
					}
				}
			});	

			qx.Class.define("TGCTools.POIWindow", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{	
					try
					{
						this.base(arguments);
						this.setLayout(new qx.ui.layout.VBox(5));
					
						this.set({
							// Largeur de la fenêtre principale
							//width: 725,
							width: 500,
							caption: "POI Management Tool",
							padding: 5,
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,	
						});
					
						//POI Struct
						this.poiData = 
						{
							labels:
							{
								total:
								{
									score: new qx.ui.basic.Label("Total Score: "),
									qty: new qx.ui.basic.Label("Total Quantity: "),
									bonus: new qx.ui.basic.Label("Total Bonus: "),
									nextTier: new qx.ui.basic.Label("To Next Tier: "),
									nextRank: new qx.ui.basic.Label("To Next Rank: "),
								},
								
								tier:
								{
									tier: new qx.ui.basic.Label("Tiers").set({textColor: "black"}),
									prev: new qx.ui.basic.Label("Previous:").set({textColor: "red"}),
									curr: new qx.ui.basic.Label("Current:").set({textColor: "blue"}),
									next: new qx.ui.basic.Label("Next:").set({textColor: "green"}),
									
									lower: new qx.ui.basic.Label("Lower").set({textColor: "black"}),
									upper: new qx.ui.basic.Label("Upper").set({textColor: "black"}),
									bonus: new qx.ui.basic.Label("Bonus").set({textColor: "black"}),
									diff:  new qx.ui.basic.Label("Diff +/-").set({textColor: "black"}),
								},
							
								rank:
								{
									rank: new qx.ui.basic.Label("Rankings").set({textColor: "black"}),
									prev: new qx.ui.basic.Label("Previous:").set({textColor: "red"}),
									curr: new qx.ui.basic.Label("Current:").set({textColor: "blue"}),
									next: new qx.ui.basic.Label("Next:").set({textColor: "green"}),
									
									alliance: new qx.ui.basic.Label("Alliance").set({textColor: "black"}),
									score: new qx.ui.basic.Label("Score").set({textColor: "black"}),
									multi: new qx.ui.basic.Label("Multiplier").set({textColor: "black"}),
									diff: new qx.ui.basic.Label("Diff +/-").set({textColor: "black"}),
								},
								
								simulation:
								{
									sim: new qx.ui.basic.Label("Simulation").set({textColor: "black"}),
									prev: new qx.ui.basic.Label("Previous:").set({textColor: "red"}),
									curr: new qx.ui.basic.Label("Current:").set({textColor: "blue"}),
									
									score: new qx.ui.basic.Label("Score").set({textColor: "black"}),
									bonus: new qx.ui.basic.Label("Bonus").set({textColor: "black"}),
									multi: new qx.ui.basic.Label("Multiplier").set({textColor: "black"}),
									totalBonus: new qx.ui.basic.Label("Total Bonus").set({textColor: "black"}),
								},
							},
							
							counts:
							{
								total:
								{
									score: new qx.ui.basic.Label("0"),
									qty: new qx.ui.basic.Label("0"),
									bonus: new qx.ui.basic.Label("0"),
									nextTier: new qx.ui.basic.Label("0"),
									nextRank: new qx.ui.basic.Label("0"),
								},
								
								tier:
								{
									prev:
									{
										lower: new qx.ui.basic.Label("0").set({textColor: "red"}),
										upper: new qx.ui.basic.Label("0").set({textColor: "red"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "red"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "red"}),
									},
									
									curr:
									{
										lower: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										upper: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "blue"}),
									},
									
									next:
									{
										lower: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										upper: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
									},
								},
								
								rank:
								{
									prev:
									{
										alliance: new qx.ui.basic.Label("N/A").set({textColor: "red"}),
										score: new qx.ui.basic.Label("0").set({textColor: "red"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "red"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "red"}),
									},
									
									curr:
									{
										alliance: new qx.ui.basic.Label("N/A").set({textColor: "blue"}),
										score: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "blue"}),
									},
									
									next:
									{
										alliance: new qx.ui.basic.Label("N/A").set({textColor: "darkgreen"}),
										score: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
									},
								},
								
								simulation:
								{
									prev:
									{
										score: new qx.ui.basic.Label("0").set({textColor: "red"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "red"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "red"}),
										totalBonus: new qx.ui.basic.Label("0").set({textColor: "red"}),
									},
									
									curr:
									{
										score: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										totalBonus: new qx.ui.basic.Label("0").set({textColor: "blue"}),
									},
								},
							},
						};	

						//POI Table Box
						var tableBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({allowGrowY: false});
						this.tableModel = new qx.ui.table.model.Simple();	
						this.tableModel.setColumns(["Level", "Coords", "Score", "Loss", "Tier", "Rank"]);
						//this.table = new qx.ui.table.Table(this.tableModel).set({height: 300, allowGrowX: false, width: 625, alignX: "center"});
						// Largeur de la table des POI
						this.table = new qx.ui.table.Table(this.tableModel).set({height: 200, allowGrowX: false, width: 400, alignX: "center"});
						this.table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
						this.table.setColumnVisibilityButtonVisible(false);
						
						// définition de la largeur des colonnes de la table des POI
						this.table.setColumnWidth(0,30);
						this.table.setColumnWidth(1,70);
						this.table.setColumnWidth(2,90);
						this.table.setColumnWidth(3,90);
						this.table.setColumnWidth(4,50);
						this.table.setColumnWidth(5,50);
						
						this.table.addListener("cellDblclick", function(evt) {this.showPOILocation(evt);}, this);
						this.table.setToolTipText("Displays POI Data for selected POI Type. To go to a POI Location, double-click the intended row."); 
						tableBox.add(this.table);						
						
						//POI Total Stats
						var totalStatsBox1 = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({alignX: "center", allowGrowX: false, allowGrowY: false});
						var totalStatsBox2 = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({alignX: "center", allowGrowX: false, allowGrowY: false});
						this.poiData["labels"]["total"].score.setThemedFont("bold");
						this.poiData["labels"]["total"].qty.setThemedFont("bold");
						this.poiData["labels"]["total"].bonus.setThemedFont("bold");
						this.poiData["labels"]["total"].nextTier.setThemedFont("bold");
						this.poiData["labels"]["total"].nextRank.setThemedFont("bold");
						totalStatsBox1.add(this.poiData["labels"]["total"].score);
						totalStatsBox1.add(this.poiData["counts"]["total"].score);
						totalStatsBox1.add(this.poiData["labels"]["total"].qty);
						totalStatsBox1.add(this.poiData["counts"]["total"].qty);
						totalStatsBox1.add(this.poiData["labels"]["total"].bonus);
						totalStatsBox1.add(this.poiData["counts"]["total"].bonus);
						totalStatsBox2.add(this.poiData["labels"]["total"].nextTier);
						totalStatsBox2.add(this.poiData["counts"]["total"].nextTier);
						totalStatsBox2.add(this.poiData["labels"]["total"].nextRank);
						totalStatsBox2.add(this.poiData["counts"]["total"].nextRank);
						
						//POI Current Stats
						var currStatsLayout = new qx.ui.layout.Grid(5).set({spacingX: 20, spacingY: 5});
						var currStatsBox = new qx.ui.container.Composite(currStatsLayout).set({allowGrowX: false, allowGrowY: false, alignX: "center"});
						this.poiData["labels"]["tier"].tier.setThemedFont("bold");
						this.poiData["labels"]["tier"].prev.setThemedFont("bold");
						this.poiData["labels"]["tier"].curr.setThemedFont("bold");
						this.poiData["labels"]["tier"].next.setThemedFont("bold");
						this.poiData["labels"]["tier"].lower.setThemedFont("bold");
						this.poiData["labels"]["tier"].upper.setThemedFont("bold");
						this.poiData["labels"]["tier"].bonus.setThemedFont("bold");
						this.poiData["labels"]["tier"].diff.setThemedFont("bold");
						
						this.poiData["labels"]["rank"].rank.setThemedFont("bold");
						this.poiData["labels"]["rank"].prev.setThemedFont("bold");
						this.poiData["labels"]["rank"].curr.setThemedFont("bold");
						this.poiData["labels"]["rank"].next.setThemedFont("bold");
						this.poiData["labels"]["rank"].alliance.setThemedFont("bold");
						this.poiData["labels"]["rank"].score.setThemedFont("bold");
						this.poiData["labels"]["rank"].multi.setThemedFont("bold");
						this.poiData["labels"]["rank"].diff.setThemedFont("bold");
						
						this.poiData["labels"]["simulation"].sim.setThemedFont("bold");
						this.poiData["labels"]["simulation"].prev.setThemedFont("bold");
						this.poiData["labels"]["simulation"].curr.setThemedFont("bold");
						this.poiData["labels"]["simulation"].score.setThemedFont("bold");
						this.poiData["labels"]["simulation"].bonus.setThemedFont("bold");
						this.poiData["labels"]["simulation"].multi.setThemedFont("bold");
						this.poiData["labels"]["simulation"].totalBonus.setThemedFont("bold");
						
						this.poiData["labels"]["tier"].tier.set({alignX: "center", font: "font_size_14_bold"});
						currStatsBox.add(this.poiData["labels"]["tier"].tier, {row: 0, column: 0, colSpan: 5});
						
						//Labels
						currStatsBox.add(this.poiData["labels"]["tier"].prev, {row: 2, column: 0});
						currStatsBox.add(this.poiData["labels"]["tier"].curr, {row: 3, column: 0});
						currStatsBox.add(this.poiData["labels"]["tier"].next, {row: 4, column: 0});
						currStatsBox.add(this.poiData["labels"]["tier"].lower, {row: 1, column: 1});
						currStatsBox.add(this.poiData["labels"]["tier"].upper, {row: 1, column: 2});
						currStatsBox.add(this.poiData["labels"]["tier"].bonus, {row: 1, column: 3});
						currStatsBox.add(this.poiData["labels"]["tier"].diff, {row: 1, column: 4});
						
						this.poiData["labels"]["rank"].rank.set({alignX: "center", font: "font_size_14_bold"});
						currStatsBox.add(this.poiData["labels"]["rank"].rank, {row: 5, column: 0, colSpan: 5});
						currStatsBox.add(this.poiData["labels"]["rank"].prev, {row: 7, column: 0});
						currStatsBox.add(this.poiData["labels"]["rank"].curr, {row: 8, column: 0});
						currStatsBox.add(this.poiData["labels"]["rank"].next, {row: 9, column: 0});
						currStatsBox.add(this.poiData["labels"]["rank"].alliance, {row: 6, column: 1});
						currStatsBox.add(this.poiData["labels"]["rank"].score, {row: 6, column: 2});
						currStatsBox.add(this.poiData["labels"]["rank"].multi, {row: 6, column: 3});
						currStatsBox.add(this.poiData["labels"]["rank"].diff, {row: 6, column: 4});
						
						this.poiData["labels"]["simulation"].sim.set({alignX: "center", font: "font_size_14_bold"});
						currStatsBox.add(this.poiData["labels"]["simulation"].sim, {row: 10, column: 0, colSpan: 5});
						currStatsBox.add(this.poiData["labels"]["simulation"].prev, {row: 12, column: 0});
						currStatsBox.add(this.poiData["labels"]["simulation"].curr, {row: 13, column: 0});
						currStatsBox.add(this.poiData["labels"]["simulation"].score, {row: 11, column: 1});
						currStatsBox.add(this.poiData["labels"]["simulation"].bonus, {row: 11, column: 2});
						currStatsBox.add(this.poiData["labels"]["simulation"].multi, {row: 11, column: 3});
						currStatsBox.add(this.poiData["labels"]["simulation"].totalBonus, {row: 11, column: 4});
						
						//Counts
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].lower, {row: 2, column: 1});
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].upper, {row: 2, column: 2});
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].bonus, {row: 2, column: 3});
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].diff, {row: 2, column: 4});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].lower, {row: 3, column: 1});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].upper, {row: 3, column: 2});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].bonus, {row: 3, column: 3});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].diff, {row: 3, column: 4});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].lower, {row: 4, column: 1});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].upper, {row: 4, column: 2});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].bonus, {row: 4, column: 3});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].diff, {row: 4, column: 4});
						
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].alliance, {row: 7, column: 1});
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].score, {row: 7, column: 2});
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].multi, {row: 7, column: 3});
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].diff, {row: 7, column: 4});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].alliance, {row: 8, column: 1});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].score, {row: 8, column: 2});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].multi, {row: 8, column: 3});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].diff, {row: 8, column: 4});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].alliance, {row: 9, column: 1});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].score, {row: 9, column: 2});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].multi, {row: 9, column: 3});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].diff, {row: 9, column: 4});
						
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].score, {row: 12, column: 1});
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].bonus, {row: 12, column: 2});
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].multi, {row: 12, column: 3});
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].totalBonus, {row: 12, column: 4});
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].score, {row: 13, column: 1});
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].bonus, {row: 13, column: 2});
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].multi, {row: 13, column: 3});
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].totalBonus, {row: 13, column: 4});
						
						//Buttons
						var buttonBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({allowGrowX: false, allowGrowY: false, alignX: "center"});
						this.selectBox = new qx.ui.form.SelectBox();
						this.selectBox.add(new qx.ui.form.ListItem("Tiberium", "webfrontend/ui/common/icn_res_tiberium.png", "4"));
						this.selectBox.add(new qx.ui.form.ListItem("Crystal", "webfrontend/ui/common/icn_res_chrystal.png", "5"));
						this.selectBox.add(new qx.ui.form.ListItem("Reactor", "webfrontend/ui/common/icn_res_power.png", "6"));
						this.selectBox.add(new qx.ui.form.ListItem("Tungsten", "FactionUI/icons/icon_alliance_bonus_inf.png", "7"));
						this.selectBox.add(new qx.ui.form.ListItem("Uranium", "FactionUI/icons/icon_alliance_bonus_tnk.png", "8"));
						this.selectBox.add(new qx.ui.form.ListItem("Aircraft", "FactionUI/icons/icon_alliance_bonus_air.png", "9"));
						this.selectBox.add(new qx.ui.form.ListItem("Resonator", "FactionUI/icons/icon_def_army_points.png", "10"));
						this.selectBox.setToolTipText("Choose a POI Type you want to view.");
						
						this.selectBox.addListener("changeSelection", function(e) {
							var numRows = TGCTools.POIWindow.getInstance().tableModel.getRowCount();
							TGCTools.POIWindow.getInstance().tableModel.removeRows(0, numRows, true);
						});
						
						var updateBtn = new qx.ui.form.Button("Update").set({height: 35, allowGrowX: false, allowGrowY: false, alignX: "center", rich: true});
						var simulateBtn = new qx.ui.form.Button("Simulate").set({height: 35, allowGrowX: false, allowGrowY: false, alignX: "center", rich: true});
						var listBtn = new qx.ui.form.Button("Add to List").set({height: 35, allowGrowX: false, allowGrowY: false, alignX: "center", rich: true});
						updateBtn.setToolTipText("Updates the table below with <br />POI's from selected POI type.");
						simulateBtn.setToolTipText("Simulates releasing selected POI's. <br /> To select multiple POI's hold ctrl and click on a row.");
						listBtn.setToolTipText("Add selected POIs to list for pasting into message. <br />For each POI you can copy the selected POIs. <br />" + 
						"Each time you click the button for the same POI, <br /> it rewrites the data for that POI type. <br /><br />To paste the message, hit Alt-L. <br /> To clear the list, hit Alt-C.");
						simulateBtn.addListener("click", function()
						{
							var selection = this.getPOISelection();
							this.currPOIType = selection - 2;

							this.isSimulation = true;
							this.getRankingData(selection);
							this.doSimulation();
						}, this);
						simulateBtn.setEnabled(false);
						
						updateBtn.addListener("click", function() 
						{
							var numRows = this.tableModel.getRowCount();
							this.tableModel.removeRows(0, numRows, true);
							var selection = this.getPOISelection();
							this.currPOIType = selection - 2;

							this.isSimulation = false;
							simulateBtn.setEnabled(true);
							this.getRankingData(selection);
						}, this);
						listBtn.addListener("click", this.addToList, this);
						
						//For copying POI List for messaging
						addEventListener("keyup", this.onKeyPress, false);
						
						buttonBox.add(this.selectBox);
						buttonBox.add(updateBtn);
						buttonBox.add(simulateBtn);
						buttonBox.add(listBtn);
						
						var poiContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({allowGrowY: false, alignX: "center", decorator: "main", padding: 5});
						poiContainer.setBackgroundColor("lightgray");
						poiContainer.add(totalStatsBox1);
						poiContainer.add(totalStatsBox2);
						poiContainer.add(currStatsBox);
						poiContainer.add(buttonBox);
						poiContainer.add(tableBox);
						
						var scrollBox = new qx.ui.container.Scroll().set({
							width: 725,
							height: 600
						});
						scrollBox.add(poiContainer);
						this.add(scrollBox);
						
						this.rankingData = new Array();
						this.msgList = {4: "", 5: "", 6: "", 7: "", 8: "", 9: "", 10: ""};
						this.__ranking = new ClientLib.Data.Ranking.Ranking();
						phe.cnc.Util.attachNetEvent(this.__ranking, "FireReceivedCount", ClientLib.Data.Ranking.RankingReceivedCount, this, this.__onRankingReceivedCount);
						phe.cnc.Util.attachNetEvent(this.__ranking, "FireReceivedData", ClientLib.Data.Ranking.RankingReceivedData, this, this.__onRankingReceivedData);
					}
					catch(e)
					{
						console.log("Failed POIWindow Constructor: " + e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members:
				{
					__ranking: null,
					rankingData: null,
					currPOIType: null,
					isSimulation: null,
					msgList: null,
					
					getPOISelection: function()
					{
						var selection = parseInt(this.selectBox.getSelection()[0].getModel());
						return selection;
					},
					
					updatePOIList: function()
					{
						if (this.isSimulation)
							return;
							
						var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						var allianceID = alliance.get_Id();
						var alliancePOIList = alliance.get_OwnedPOIs();
						var poiList = [];
						var totalScore = 0;
						var baseValue = 0;
						
						//Grab the POIs under the current selected type
						for (var idx in alliancePOIList)
						{
							if (alliancePOIList[idx].t == this.currPOIType)
							{
								poiList.push(alliancePOIList[idx]);
							}
						}
						
						poiList = this.sortPOIList(poiList);
						
						//Get Total Score
						totalScore = this.getTotalScore(allianceID);
						var rankData = this.getRankMultiplier(allianceID);
						baseValue = this.getBaseValue(totalScore);
						
						this.calculatePOIData(poiList, totalScore, rankData, baseValue);
						this.updatePOIStats(poiList, totalScore, rankData, baseValue);
					},
					
					updatePOIStats: function(poiList, totalScore, rankData, baseValue)
					{
						//Totals
						//totalScore passed in
						var totalQty = poiList.length;
						var totalBonus = baseValue * (1 + (rankData.multiplier / 100));
						var toNextTier = ClientLib.Base.PointOfInterestTypes.GetNextScore(totalScore) - totalScore;
						
						if (rankData.rank == 1)
							var toNextRank = "N/A";
						else
							var toNextRank = this.getRankScore(rankData.rank-1) - totalScore;
							
						//Tiers	
						var prevUpper = this.getTierLowerBound(totalScore) - 1;
						var prevLower = this.getTierLowerBound(prevUpper); //hack
						var prevBonus = this.getBaseValue(prevUpper); //upper or lower works
						
						var currLower = this.getTierLowerBound(totalScore);
						var currUpper = ClientLib.Base.PointOfInterestTypes.GetNextScore(totalScore) - 1;
						var currBonus = this.getBaseValue(totalScore);
						
						var nextLower = currUpper + 1;
						var nextUpper = ClientLib.Base.PointOfInterestTypes.GetNextScore(nextLower) - 1;
						var nextBonus = this.getBaseValue(nextLower);
						
						var prevDiff = currBonus - prevBonus;
						var currDiff = 0;
						var nextDiff = nextBonus - currBonus;
						
						//Ranks
						var prevAlliance = this.getAllianceName(rankData.rank+1);
						var prevScore = this.getRankScore(rankData.rank+1);
						var prevMulti =  ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(rankData.rank+1);
						
						var currAlliance = this.getAllianceName(rankData.rank);
						var currScore = totalScore;
						var currMulti = rankData.multiplier;
						var currRankDiff = 0;
						if (rankData.rank == 1)
						{
							var nextAlliance = "N/A";
							var nextScore = "N/A";
							var nextMulti = "N/A";
							var nextRankDiff = "N/A";
						}
						else
						{
							var nextAlliance = this.getAllianceName(rankData.rank-1);
							var nextScore = this.getRankScore(rankData.rank-1);
							var nextMulti =  ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(rankData.rank-1);
							var nextRankDiff = nextScore - currScore;
						}
						var prevRankDiff = currScore - prevScore;
						
						//Set Values
						//Total
						this.poiData["counts"]["total"].score.setValue(TGCTools.getInstance().numberWithCommas(totalScore));
						this.poiData["counts"]["total"].qty.setValue(TGCTools.getInstance().numberWithCommas(totalQty));
						if (this.currPOIType < 5)
							this.poiData["counts"]["total"].bonus.setValue(TGCTools.getInstance().numberWithCommas(totalBonus) + "/hr");
						else
							this.poiData["counts"]["total"].bonus.setValue(totalBonus + "%");
						this.poiData["counts"]["total"].nextTier.setValue(TGCTools.getInstance().numberWithCommas(toNextTier));
						if (rankData.rank != 1)
							this.poiData["counts"]["total"].nextRank.setValue(TGCTools.getInstance().numberWithCommas(toNextRank));
						else
							this.poiData["counts"]["total"].nextRank.setValue(toNextRank);
						
						//Tiers
						this.poiData["counts"]["tier"]["prev"].lower.setValue(TGCTools.getInstance().numberWithCommas(prevLower));
						this.poiData["counts"]["tier"]["prev"].upper.setValue(TGCTools.getInstance().numberWithCommas(prevUpper));
						this.poiData["counts"]["tier"]["curr"].lower.setValue(TGCTools.getInstance().numberWithCommas(currLower));
						this.poiData["counts"]["tier"]["curr"].upper.setValue(TGCTools.getInstance().numberWithCommas(currUpper));
						this.poiData["counts"]["tier"]["next"].lower.setValue(TGCTools.getInstance().numberWithCommas(nextLower));
						this.poiData["counts"]["tier"]["next"].upper.setValue(TGCTools.getInstance().numberWithCommas(nextUpper));
						
						if (this.currPOIType < 5)
						{
							this.poiData["counts"]["tier"]["prev"].bonus.setValue(TGCTools.getInstance().numberWithCommas(prevBonus) + "/hr");
							this.poiData["counts"]["tier"]["curr"].bonus.setValue(TGCTools.getInstance().numberWithCommas(currBonus) + "/hr");
							this.poiData["counts"]["tier"]["next"].bonus.setValue(TGCTools.getInstance().numberWithCommas(nextBonus) + "/hr");
						}
						else	
						{
							this.poiData["counts"]["tier"]["prev"].bonus.setValue(TGCTools.getInstance().numberWithCommas(prevBonus) + "%");
							this.poiData["counts"]["tier"]["curr"].bonus.setValue(TGCTools.getInstance().numberWithCommas(currBonus) + "%");
							this.poiData["counts"]["tier"]["next"].bonus.setValue(TGCTools.getInstance().numberWithCommas(nextBonus) + "%");
						}
						this.poiData["counts"]["tier"]["prev"].diff.setValue(TGCTools.getInstance().numberWithCommas(prevDiff));
						this.poiData["counts"]["tier"]["curr"].diff.setValue(TGCTools.getInstance().numberWithCommas(currDiff));
						this.poiData["counts"]["tier"]["next"].diff.setValue(TGCTools.getInstance().numberWithCommas(nextDiff));
						
						//Ranks
						this.poiData["counts"]["rank"]["prev"].alliance.setValue(prevAlliance);
						this.poiData["counts"]["rank"]["prev"].score.setValue(TGCTools.getInstance().numberWithCommas(prevScore));
						this.poiData["counts"]["rank"]["prev"].multi.setValue(TGCTools.getInstance().numberWithCommas(prevMulti) + "%");
						this.poiData["counts"]["rank"]["prev"].diff.setValue(TGCTools.getInstance().numberWithCommas(prevRankDiff));
						
						this.poiData["counts"]["rank"]["curr"].alliance.setValue(currAlliance);
						this.poiData["counts"]["rank"]["curr"].score.setValue(TGCTools.getInstance().numberWithCommas(currScore));
						this.poiData["counts"]["rank"]["curr"].multi.setValue(TGCTools.getInstance().numberWithCommas(currMulti) + "%");
						this.poiData["counts"]["rank"]["curr"].diff.setValue(TGCTools.getInstance().numberWithCommas(currRankDiff));
						
						this.poiData["counts"]["rank"]["next"].alliance.setValue(nextAlliance);
						
						if (rankData.rank != 1)
						{
							this.poiData["counts"]["rank"]["next"].score.setValue(TGCTools.getInstance().numberWithCommas(nextScore));
							this.poiData["counts"]["rank"]["next"].multi.setValue(TGCTools.getInstance().numberWithCommas(nextMulti) + "%");
							this.poiData["counts"]["rank"]["next"].diff.setValue(TGCTools.getInstance().numberWithCommas(nextRankDiff));
						}
						else
						{
							this.poiData["counts"]["rank"]["next"].score.setValue(nextScore);
							this.poiData["counts"]["rank"]["next"].multi.setValue(nextMulti);
							this.poiData["counts"]["rank"]["next"].diff.setValue(nextRankDiff);
						}
					},
					
					getAllianceName: function(rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							//find next rank score
							for (var idx in this.rankingData)
							{
								var info = this.rankingData[idx];
								
								if (info.poir == rank)
								{
									return info.an;
								}
							}
						}
					},
					
					calculatePOIData: function(poiList, totalScore, rankData, baseValue)
					{
						if (typeof poiList != 'undefined')
						{
							var tierBufferSum = 0;
							var rankBufferSum = 0;
							var currTierLowerBound = this.getTierLowerBound(totalScore);
							var currRankLowerBound = this.getRankLowerBound(rankData.rank);
							var poiInfo = {};
							var poiArray = [];
							for (var idx in poiList)
							{
								var poi = poiList[idx];
								
								var newTotalScore = totalScore - poi.score;
								var newBaseValue = this.getBaseValue(newTotalScore);
								var newRankMultiplier = this.calculateNewRankMultiplier(newTotalScore, rankData.rank);
								
								var isNeededForTier = "Hold";
								if (tierBufferSum >= currTierLowerBound)
									isNeededForTier = "Buffer";
								tierBufferSum += poi.score;
								
								var isNeededForRank = "Hold";
								if (rankBufferSum >= currRankLowerBound)
									isNeededForRank = "Buffer";
								rankBufferSum += poi.score;
								
								
								//Calculate Loss
								var totalBonus = baseValue * (1 + (rankData.multiplier / 100));
								var newTotalBonus = newBaseValue * (1 + (newRankMultiplier / 100));
								var loss = totalBonus - newTotalBonus;
								
								poiInfo = 
								{
									"type": poi.type,
									"score": poi.score,
									"coords": poi.x + ":" + poi.y,
									"level": poi.level,
									"loss": loss,
									"tier": isNeededForTier,
									"rank": isNeededForRank
								}
								poiArray.push(poiInfo);
							}
							
							this.displayPOIData(poiArray);
						}
					},
					
					displayPOIData: function(data)
					{
						if (data != undefined)
						{
							var displayData = [];
							for (var idx in data)
							{
								var poi = data[idx];
								this.tableModel.addRows([[poi.level, poi.coords, poi.score, poi.loss, poi.tier, poi.rank]]);
							}
						}
					},
					
					calculateNewRankMultiplier: function(score, rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							//find next rank score
							for (var idx in this.rankingData)
							{
								var info = this.rankingData[idx];
								
								if (info.poir == (rank + 1))
								{
									if (info.pois <= score)
										return ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(rank);
									else
										return this.calculateNewRankMultiplier(score, (rank + 1));
								}
							}
						}
					},
					
					getRankScore: function(rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							for (var idx in this.rankingData)
							{
								var alliance = this.rankingData[idx];
								
								if (alliance.poir == rank)
								{
									return alliance.pois;
								}
							}
						}
					},
					
					getRankLowerBound: function(rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							for (var idx in this.rankingData)
							{
								var alliance = this.rankingData[idx];
								if (alliance.poir == (rank + 1))
								{
									return alliance.pois;
								}
							}
						}
					},
					
					//From an online source
					/*numberWithCommas: function(x)
					{
						var parts = x.toString().split(".");
						parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						return parts.join(".");
					},*/
		
					getTierLowerBound: function(score)
					{
						var tiers = [];
						tiers.push(1);
						tiers.push(4);
						tiers.push(9);
						tiers.push(16);
						tiers.push(27);
						tiers.push(50);
						tiers.push(90);
						tiers.push(160);
						tiers.push(260);
						tiers.push(420);
						tiers.push(750);
						tiers.push(1300);
						tiers.push(2200);
						tiers.push(3600);
						tiers.push(5700);
						tiers.push(9700);
						tiers.push(16400);
						tiers.push(28000);
						tiers.push(44000);
						tiers.push(68000);
						tiers.push(115000);
						tiers.push(190000);
						tiers.push(330000);
						tiers.push(510000);
						tiers.push(800000);
						tiers.push(1350000);
						tiers.push(2200000);
						tiers.push(3600000);
						tiers.push(6000000);
						tiers.push(9000000);
						tiers.push(15000000);
						tiers.push(25000000);
						tiers.push(42000000);
						tiers.push(65000000);
						tiers.push(100000000);
						tiers.push(165000000);
						tiers.push(270000000);
						tiers.push(450000000);
						tiers.push(1000000000);
						
						for (var idx in tiers)
						{
							if (score <= tiers[idx])
							{
								if (idx == 0)
									return 0;
								else if (score < tiers[idx])
									return tiers[idx-1];
								else
									return tiers[idx];
							}
						}
					},
					
					getRankingData: function(poiType)
					{
						//4-10
						//ClientLib.Data.Ranking.ERankingType.BonusTiberium:
						//ClientLib.Data.Ranking.ERankingType.BonusCrystal:
						//ClientLib.Data.Ranking.ERankingType.BonusPower:
						//ClientLib.Data.Ranking.ERankingType.BonusInfantry:
						//ClientLib.Data.Ranking.ERankingType.BonusVehicles:
						//ClientLib.Data.Ranking.ERankingType.BonusAircraft:
						//ClientLib.Data.Ranking.ERankingType.BonusDefense:
						this.__ranking.RequestCount(ClientLib.Data.Ranking.EViewType.Alliance, poiType);
					},

					__onRankingReceivedCount: function(data)
					{
						if (data != undefined)
							this.__ranking.RequestData(0, data, ClientLib.Data.Ranking.ESortColumn.Rank, ClientLib.Data.Ranking.ESortDirection.Ascending);
					},

					__onRankingReceivedData: function(data)
					{
						if (data != undefined)
						{
							this.rankingData = data;
							this.updatePOIList();
						}
					},
					
					sortPOIList: function(obj)
					{
						var arr = [];
						for (var idx in obj) {
							arr.push({
								'type': obj[idx].t,
								'level': obj[idx].l,
								'x': obj[idx].x,
								'y': obj[idx].y,
								'score': ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(obj[idx].l)
							});
						}
						arr.sort(function(a, b) { return b.level - a.level; });
						return arr; // returns array
					},
					
					getTotalScore: function(allianceID)
					{
						if (typeof this.rankingData != 'undefined')
						{	
							for (var idx in this.rankingData)
							{
								if (this.rankingData[idx].a == allianceID)
									return this.rankingData[idx].pois;
							}
						}
					},
					
					getRankMultiplier: function(allianceID)
					{
						if (typeof this.rankingData != 'undefined')
						{	
							for (var idx in this.rankingData)
							{
								if (this.rankingData[idx].a == allianceID)
								{
									var rankInfo = 
									{
										"rank" : this.rankingData[idx].poir,
										"multiplier" : ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(this.rankingData[idx].poir)
									};
									return rankInfo;
								}
							}
						}
					},
					
					getBaseValue: function(totalScore)
					{
						return ClientLib.Base.PointOfInterestTypes.GetBonusByType(this.currPOIType, totalScore);
					},
					
					showPOILocation: function(evt)
					{
						var row = evt.getRow();
						var coords = "";
						
						coords = this.tableModel.getValueById("Coords", row);

						if (coords != "")
						{
						    if (coords.substring(4,5)==":")
							{
							    var x = parseInt(coords.substring(0, 4));
								var y = parseInt(coords.substring(5));
							}
							else
							{
							    var x = parseInt(coords.substring(0, 3));
								var y = parseInt(coords.substring(4));
							}
							var view = ClientLib.Vis.VisMain.GetInstance().GetActiveView();
							view.CenterGridPosition(x, y);
						}
					},
					
					doSimulation: function()
					{		
						//Grab Selection Data
						var selection = [];
						var tableModel = this.tableModel;
						var table = this.table;
						
						if (typeof table != undefined)
						{
							table.getSelectionModel().iterateSelection(function(index) {
								selection.push(tableModel.getRowData(index));
							});
						}
						else
						{
							return;
						}
						
						var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						var allianceID = alliance.get_Id();
						var alliancePOIList = alliance.get_OwnedPOIs();
						var poiList = [];
						var totalScore = 0;
						var baseValue = 0;
						
						//Grab the POIs under the current selected type
						for (var idx in alliancePOIList)
						{
							if (alliancePOIList[idx].t == this.currPOIType)
							{
								var isUnselected = true;
								//Check if it is selected
								for (var idx2 in selection)
								{
									if (selection[idx2][1] == (alliancePOIList[idx].x + ":" + alliancePOIList[idx].y))
									{
										isUnselected = false;
										break;
									}
								}
								if (isUnselected == true)
								{
									totalScore += ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(alliancePOIList[idx].l)
									poiList.push(alliancePOIList[idx]);
								}
							}
						}
						
						poiList = this.sortPOIList(poiList);
						
						//Previous
						var prevScore = this.getTotalScore(allianceID);
						var prevBonus = this.getBaseValue(prevScore);
						var rankData = this.getRankMultiplier(allianceID);
						var prevMulti = rankData.multiplier;
						var prevTotalBonus = prevBonus * (1 + (prevMulti / 100));
						
						var currScore = totalScore;
						var currBonus =  this.getBaseValue(currScore);
						var currMulti = this.calculateNewRankMultiplier(currScore, rankData.rank);
						var currTotalBonus = currBonus * (1 + (currMulti / 100));
						
						//Update Simulation Data
						this.poiData["counts"]["simulation"]["prev"].score.setValue(TGCTools.getInstance().numberWithCommas(prevScore));
						this.poiData["counts"]["simulation"]["curr"].score.setValue(TGCTools.getInstance().numberWithCommas(currScore));
						if (this.currPOIType < 5)
						{
							this.poiData["counts"]["simulation"]["prev"].bonus.setValue(TGCTools.getInstance().numberWithCommas(prevBonus) + "/hr");
							this.poiData["counts"]["simulation"]["prev"].totalBonus.setValue(TGCTools.getInstance().numberWithCommas(prevTotalBonus) + "/hr");
							this.poiData["counts"]["simulation"]["curr"].bonus.setValue(TGCTools.getInstance().numberWithCommas(currBonus) + "/hr");
							this.poiData["counts"]["simulation"]["curr"].totalBonus.setValue(TGCTools.getInstance().numberWithCommas(currTotalBonus) + "/hr");
						}
						else
						{
							this.poiData["counts"]["simulation"]["prev"].bonus.setValue(prevBonus + "%");
							this.poiData["counts"]["simulation"]["prev"].totalBonus.setValue(prevTotalBonus + "%");
							this.poiData["counts"]["simulation"]["curr"].bonus.setValue(currBonus + "%");
							this.poiData["counts"]["simulation"]["curr"].totalBonus.setValue(currTotalBonus + "%");
						}
							
						this.poiData["counts"]["simulation"]["prev"].multi.setValue(prevMulti + "%");
						this.poiData["counts"]["simulation"]["curr"].multi.setValue(currMulti + "%");
					},
					
					addToList: function()
					{
						var selection = [];
						var tableModel = this.tableModel;
						var table = this.table;
						
						if (typeof table != undefined)
						{
							table.getSelectionModel().iterateSelection(function(index) {
								selection.push(tableModel.getRowData(index));
							});
						}
						else
						{
							return;
						}
						
						var poiType = this.getPOISelection();
						var poiMsg = "";

						if (selection.length != 0)
						{
							switch(poiType)
							{
								case 4:
									poiMsg += "[b][u]Tiberium[/u][/b] \r";
									break;
								case 5:
									poiMsg += "[b][u]Crystal[/u][/b] \r";
									break;
								case 6:
									poiMsg += "[b][u]Reactor[/u][/b] \r";
									break;
								case 7:
									poiMsg += "[b][u]Tungsten[/u][/b] \r";
									break;
								case 8:
									poiMsg += "[b][u]Uranium[/u][/b] \r";
									break;
								case 9:
									poiMsg += "[b][u]Aircraft[/u][/b] \r";
									break;
								case 10:
									poiMsg += "[b][u]Resonator[/u][/b] \r";
									break;
							}
							for (var idx in selection)
							{
								var level = parseInt(selection[idx][0]);
								var coords = selection[idx][1];
								var points = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(level);
								
								poiMsg += "L" + level + " [coords]" + coords + "[/coords] (" + points + ")\r"; 
							}
						}
						this.msgList[poiType] = poiMsg;
					},
					
					/**
						Want to thank this script (http://userscripts.org/scripts/show/158800) and its author for the idea
					*/
					onKeyPress: function(event)
					{
						var key = String.fromCharCode(event.keyCode);
						if (event.altKey && key == "L")
						{
							var inputField = document.querySelector('input:focus, textarea:focus');
							if (inputField != null)
							{
								var msg = "";
								var msgList = TGCTools.POIWindow.getInstance().getMsgList();
								if (typeof msgList != 'undefined')
								{
									for (var idx = 4; idx < 11; idx++)
									{
										if (msgList[idx] != "")
										{
											msg += msgList[idx] + "\r";
										}
									}
									inputField.value += msg;
								}
							}
						}
						else if (event.altKey && key == "C")
						{
							var msgList = TGCTools.POIWindow.getInstance().getMsgList();
							if (typeof msgList != 'undefined')
							{
								for (var idx = 4; idx < 11; idx++)
								{
									msgList[idx] = "";
								}
							}
						}
					},
					
					getMsgList: function()
					{
						return this.msgList;
					}
				}
			});
			
			qx.Class.define("TGCTools.UpgradeWindow", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{
					this.base(arguments);
					this.setLayout(new qx.ui.layout.VBox(5));
				
					this.set({
						width: 600,
						caption: "Upgrade Management Tool",
						padding: 5,
						allowMaximize: false,
						showMaximize: false,
						allowMinimize: false,
						showMinimize: false,	
					});
					
					var upgradeLevelBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque", padding: 10});
					var upgradeBaseBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
					var baseLabel = new qx.ui.basic.Label("Base Level: ").set({allowGrowX: false, allowGrowY: false, font: "font_size_14_bold"});
					this.baseTextField = new qx.ui.form.TextField();
					this.baseTextField.setToolTipText("Enter desired level to upgrade to");
					var baseUpgradeBtn = new qx.ui.form.Button("","FactionUI/icons/icon_building_detail_upgrade.png");
					baseUpgradeBtn.setShow("icon");
					baseUpgradeBtn.setToolTipText("Upgrades all buildings to desired level if resources exist.");
					baseUpgradeBtn.addListener("click", this.baseUpgradeAllLevel, this);
					var baseUpgradeOneBtn = new qx.ui.form.Button("+1").set({allowGrowX: false, allowGrowY: false, height: 35, font: "font_size_14_bold"});
					baseUpgradeOneBtn.addListener("click", this.baseUpgradeOneLevel, this);
					baseUpgradeOneBtn.setToolTipText("Upgrades all buildings by one level if resources exist.");
					this.baseUpgradeMaximizeBtn = new qx.ui.form.Button("Maximize").set({allowGrowX: false, allowGrowY: false, height: 35});
					this.baseUpgradeMaximizeBtn.setToolTipText("Upgrades production buildings that maximize gain/costs based on selected resource type.");
					this.baseUpgradeMaximizeBtn.addListener("click", this.baseUpgradeMaximizeLevel, this);
					
					this.baseUpgradeMaximizeSelect = new qx.ui.form.SelectBox().set({allowGrowX: false, allowGrowY: false, height: 35});
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Tiberium", "webfrontend/ui/common/icn_res_tiberium.png", "1"));
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Crystal", "webfrontend/ui/common/icn_res_chrystal.png", "2"));
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Power", "webfrontend/ui/common/icn_res_power.png", "5"));
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Credits", "webfrontend/ui/common/icn_res_dollar.png", "3"));
					this.baseUpgradeMaximizeSelect.setToolTipText("Select desired resource to maximize by gain/cost.");
					upgradeBaseBox.add(baseLabel);
					upgradeBaseBox.add(this.baseTextField);
					upgradeBaseBox.add(baseUpgradeBtn);
					upgradeBaseBox.add(baseUpgradeOneBtn);
					upgradeBaseBox.add(this.baseUpgradeMaximizeBtn);
					upgradeBaseBox.add(this.baseUpgradeMaximizeSelect);
					upgradeLevelBox.add(upgradeBaseBox);
					
					
					this.add(upgradeLevelBox);
					
					this.numMaximizeSteps = 0;
				},
				
				destruct: function()
				{
				},
				
				members:
				{
					numMaximizeSteps: null,
					
					baseUpgradeAllLevel: function()
					{
						var newLevel = parseInt(this.baseTextField.getValue());
						
						if (isNaN(newLevel))
							return;
							
						if (newLevel > 51)
							newLevel = 51;
							
						if (newLevel < 0)
							newLevel = 0;

						//Based on Topper's Example
						if (PerforceChangelist <= 384441)
							newLevel--;
							
						ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
						this.baseTextField.setValue("");
					},
					
					baseUpgradeOneLevel: function()
					{
						var currOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(currOwnCity.get_Id());
						var visCity =  ClientLib.Vis.VisMain.GetInstance().get_City();
						var width =  visCity.get_GridWidth();
						var height =  visCity.get_GridHeight();

						for (var x = 0; x < 9; x++)
						{
							for (var y = 0; y < 8; y++)
							{
								var cityEntity = visCity.GetCityObjectFromPosition(x * width, y * height);
								if (cityEntity != null)
								{
									if (cityEntity.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType)
									{
										ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(cityEntity.get_BuildingDetails(), (cityEntity.get_BuildingLevel() + 1));
									}
								}
							}
						}
					},
					
					baseUpgradeMaximizeLevel: function()
					{
						this.baseUpgradeMaximizeBtn.setEnabled(false);
						this.baseUpgradeMaximizeSelect.setEnabled(false);
						var currOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(currOwnCity.get_Id());
						var visCity =  ClientLib.Vis.VisMain.GetInstance().get_City();
						var width =  visCity.get_GridWidth();
						var height =  visCity.get_GridHeight();
						
						var buildingsData = currOwnCity.get_Buildings().d;
						var buildings = [];
						for (var idx in buildingsData)
						{
							var tName = buildingsData[idx].get_TechName();
							//If not a production type then skip
							switch(parseInt(tName))
							{
								case 1: 
								case 2: 
								case 10: 
								case 11: 
								case 15:
								case 16: 
									break;
								default: continue; break;
							}

							var objData = buildingsData[idx].get_TechGameData_Obj();
							var detailView = currOwnCity.GetBuildingDetailViewInfo(buildingsData[idx]);
							
							if (detailView == null)
								continue;
							
							var level = buildingsData[idx].get_CurrentLevel();
							if (level == 51)
								continue;
							
							var upgradeReqs = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(level + 1, objData);
							
							//Gain per hour if upgraded from Maelstrom tools
							var upgradeGPH = {1: 0, 2: 0, 3: 0, 5: 0};
							var totalGPH = 0;
							for (var type in detailView.OwnProdModifiers.d)
							{
								switch (parseInt(type)) 
								{
									case ClientLib.Base.EModifierType.TiberiumPackageSize:
									case ClientLib.Base.EModifierType.CrystalPackageSize:
									case ClientLib.Base.EModifierType.PowerPackageSize:
									case ClientLib.Base.EModifierType.CreditsPackageSize:
										var ModOj = detailView.OwnProdModifiers.d[buildingsData[idx].get_MainModifierTypeId()];
										var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
										totalGPH += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
										switch(parseInt(type))
										{
											case ClientLib.Base.EModifierType.TiberiumPackageSize:
												upgradeGPH[1] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
											case ClientLib.Base.EModifierType.CrystalPackageSize:
												upgradeGPH[2] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
											case ClientLib.Base.EModifierType.PowerPackageSize:
												upgradeGPH[5] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
											case ClientLib.Base.EModifierType.CreditsPackageSize:
												upgradeGPH[3] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
										}
										break;
									case ClientLib.Base.EModifierType.TiberiumProduction:
									case ClientLib.Base.EModifierType.CrystalProduction:
									case ClientLib.Base.EModifierType.PowerProduction:
									case ClientLib.Base.EModifierType.CreditsProduction:
										totalGPH += detailView.OwnProdModifiers.d[type].NewLvlDelta;
										switch(parseInt(type))
										{
											case ClientLib.Base.EModifierType.TiberiumProduction:
												upgradeGPH[1] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
											case ClientLib.Base.EModifierType.CrystalProduction:
												upgradeGPH[2] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
											case ClientLib.Base.EModifierType.PowerProduction:
												upgradeGPH[5] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
											case ClientLib.Base.EModifierType.CreditsProduction:
												upgradeGPH[3] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
										}
										break;
								}
							}
							
							//Check if building produces any gain for selecte resource. If not, continue
							var selection = parseInt(this.baseUpgradeMaximizeSelect.getSelection()[0].getModel());
							if (upgradeGPH[selection] == 0)
								continue;
							
							//Determine upgrade 
							var totalCosts = 0;
							
							for (var costs in upgradeReqs)
							{
								//don't need functions
								if (typeof upgradeReqs[costs] == 'function')
									continue;
									
								//don't need 0 costs
								if (upgradeReqs[costs].Type == 0)
									continue;
									
								totalCosts += upgradeReqs[costs].Count;	
							}
							var hasResources = currOwnCity.HasEnoughResources(upgradeReqs);

							if (!hasResources)
								continue;
								
							var gainPerCostRatio = (upgradeGPH[selection] / totalCosts) * 100;	
							
							var visBuilding = visCity.GetCityObjectFromPosition(buildingsData[idx].get_CoordX() * width, buildingsData[idx].get_CoordY() * height);
							
							var upgradeInfo = 
							{
								"nLevel": level + 1,
								"gpcr": gainPerCostRatio,
								"x": buildingsData[idx].get_CoordX(),
								"y": buildingsData[idx].get_CoordY(),
								"data": buildingsData[idx],
								"detail": visBuilding.get_BuildingDetails(),
								"tech": objData
							};
							
							buildings.push(upgradeInfo);
						}
						
						if (buildings.length == 0)
						{
							this.baseUpgradeMaximizeBtn.setEnabled(true);
							this.baseUpgradeMaximizeSelect.setEnabled(true);
							return;
						}
							
						//Sort by GCPR
						buildings = this.sortBuildingList(buildings);
						
						//Have list now time to maximize
						this.doMaximizeUpgrading(buildings, currOwnCity);
					},
					
					doMaximizeUpgrading: function(buildings, currOwnCity)
					{			
						if (buildings.length == 0)
						{
							this.baseUpgradeMaximizeBtn.setEnabled(true);
							this.baseUpgradeMaximizeSelect.setEnabled(true);
							return;
						}
							
						//Upgrade the first one
						ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(buildings[0].detail, buildings[0].nLevel);
						
						//Now we need to recalculate the next gpcr
						if (buildings[0].nLevel == 51)
						{
							buildings = this.removeItemFromArray(buildings, 0, 1);
							this.waitToMaximizeAgain(buildings, currOwnCity);
							return;
						}
						else
						{
							buildings[0].nLevel = buildings[0].nLevel + 1;
						}

						var upgradeReqs =  ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(buildings[0].nLevel, buildings[0].tech);
						
						//Check to make sure player has enough to purchase upgrade
						if (!currOwnCity.HasEnoughResources(upgradeReqs))
						{
							buildings = this.removeItemFromArray(buildings, 0, 1);
							this.waitToMaximizeAgain(buildings, currOwnCity);
							return;
						}
						
						//Get Total Costs
						var totalCosts = 0;
						for (var costs in upgradeReqs)
						{
							//don't need functions
							if (typeof upgradeReqs[costs] == 'function')
								continue;
								
							//don't need 0 costs
							if (upgradeReqs[costs].Type == 0)
								continue;
								
							totalCosts += upgradeReqs[costs].Count;	
						}
						
						//Get GainsPerHour
						var upgradeGPH = {1: 0, 2: 0, 3: 0, 5: 0};
						var detailView = currOwnCity.GetBuildingDetailViewInfo(buildings[0].data);
							
						for (var type in detailView.OwnProdModifiers.d)
						{
							switch (parseInt(type)) 
							{
								case ClientLib.Base.EModifierType.TiberiumPackageSize:
								case ClientLib.Base.EModifierType.CrystalPackageSize:
								case ClientLib.Base.EModifierType.PowerPackageSize:
								case ClientLib.Base.EModifierType.CreditsPackageSize:
									var ModOj = detailView.OwnProdModifiers.d[buildings[0].data.get_MainModifierTypeId()];
									var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
									//totalGPH += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
									switch(parseInt(type))
									{
										case ClientLib.Base.EModifierType.TiberiumPackageSize:
											upgradeGPH[1] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
										case ClientLib.Base.EModifierType.CrystalPackageSize:
											upgradeGPH[2] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
										case ClientLib.Base.EModifierType.PowerPackageSize:
											upgradeGPH[5] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
										case ClientLib.Base.EModifierType.CreditsPackageSize:
											upgradeGPH[3] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
									}
									break;
								case ClientLib.Base.EModifierType.TiberiumProduction:
								case ClientLib.Base.EModifierType.CrystalProduction:
								case ClientLib.Base.EModifierType.PowerProduction:
								case ClientLib.Base.EModifierType.CreditsProduction:
									//totalGPH += detailView.OwnProdModifiers.d[type].NewLvlDelta;
									switch(parseInt(type))
									{
										case ClientLib.Base.EModifierType.TiberiumProduction:
											upgradeGPH[1] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
										case ClientLib.Base.EModifierType.CrystalProduction:
											upgradeGPH[2] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
										case ClientLib.Base.EModifierType.PowerProduction:
											upgradeGPH[5] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
										case ClientLib.Base.EModifierType.CreditsProduction:
											upgradeGPH[3] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
									}
									break;
							}
						}
						
						//Make sure gains are present
						var selection = parseInt(this.baseUpgradeMaximizeSelect.getSelection()[0].getModel());
						if (upgradeGPH[selection] == 0)
						{
							buildings = this.removeItemFromArray(buildings, 0, 1);
							this.waitToMaximizeAgain(buildings, currOwnCity);
							return;
						}
						var gainPerCostRatio = (upgradeGPH[selection] / totalCosts) * 100;
						buildings[0].gpcr = gainPerCostRatio;

						//Sort again
						buildings = this.sortBuildingList(buildings);
						this.waitToMaximizeAgain(buildings, currOwnCity);
					},
					
					waitToMaximizeAgain: function(buildings, currOwnCity)
					{
						(function(buildings, currOwnCity)
						{
							setTimeout(function()
							{
								TGCTools.UpgradeWindow.getInstance().doMaximizeUpgrading(buildings, currOwnCity);
							}, 500);
						}(buildings, currOwnCity));
					},
					
					removeItemFromArray: function(array, index, howMany)
					{
						array.splice(index, howMany);
						return array;
					},
					
					sortBuildingList: function(obj)
					{
						var arr = [];
						for (var idx in obj) {
							arr.push({
								'nLevel': obj[idx].nLevel,
								'gpcr': obj[idx].gpcr,
								'x': obj[idx].x,
								'y': obj[idx].y,
								"data": obj[idx].data,
								"detail": obj[idx].detail,
								"tech": obj[idx].tech
							});
						}
						arr.sort(function(a, b) { return b.gpcr - a.gpcr; });
						return arr; // returns array
					}
				}
			});
		}
		
		function waitForGame() 
		{
			try 
			{
				if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') 
				{
					var app = qx.core.Init.getApplication();
					if (app.initDone == true) 
					{
						try
						{
							createClasses();
							
							console.log("Creating phe.cnc function wraps");
							
							//Current Server patch (World 52 - US East Coast) uses phe
							if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
								TGCTools.getInstance().attachNetEvent = webfrontend.gui.Util.attachNetEvent;
							else
								TGCTools.getInstance().attachNetEvent = phe.cnc.Util.attachNetEvent;
                        
							//Current Server patch (World 52 - US East Coast) uses webfrontend
							if (typeof phe.cnc.gui.util == 'undefined')
								TGCTools.getInstance().formatNumbersCompact = webfrontend.gui.Util.formatNumbersCompact;    
							else
								TGCTools.getInstance().formatNumbersCompact = phe.cnc.gui.util.Numbers.formatNumbersCompact;   
							
							TGCTools.BaseScanner.getInstance();
						}
						catch(e)
						{
							console.log("Simulator initialization error:");
							console.log(e);
						}
					} 
					else
						window.setTimeout(waitForGame, 1000);
				} 
				else 
				{
					window.setTimeout(waitForGame, 1000);
				}
			} 
			catch (e) 
			{
				if (typeof console != 'undefined') console.log(e);
				else if (window.opera) opera.postError(e);
				else GM_log(e);
			}
		}
		window.setTimeout(waitForGame, 1000);
	};
	
	var script = document.createElement("script");
    var txt = injectFunction.toString();
	script.innerHTML = "(" + txt + ")();";
	script.type = "text/javascript";
    
    document.getElementsByTagName("head")[0].appendChild(script);
})();


// ==UserScript==
// @name           BaseInfo
// @author         Dooki
// @description    Basis Informationen zur wöchentlichen Auswertung und Übergabe an die Allianz Befehlshaber. Diese Version bietet einen Button oberhalb des Spielfensters an. Welcher ein Fenster mittels eines Klicks hervorruft. Darüber können die Werte übermittelt werden.
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @require        http://www.php-gfx.net/Wrapper/update/144825
// @updateURL      http://www.php-gfx.net/Wrapper/update/144825
// @downloadURL    http://www.php-gfx.net/Wrapper/144825.user.js
// @version        2.5.5
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QEEEAcmURyr/AAACJBJREFUWMPVll2MXVUVx3/rnHPvPffOR2cKlCnt1OmUpnbaYqsIpUFbSSkVrFD6YIgmfsRoCEWRJzU8GGMioj4QNelDTZAEAyHS0BICrQrhwXZsC8UwkEhJh/nqfHS+7rnnnnPPOXsvH+4ZmH4g6ps3Wdn73rv3/v/2XmuvteH/8ZMkyRV/f/XVV//rtbz/ZNDAwAAbNmwAYGho6HNzc3Ofn5mZWee6bjsgxpgoy7LBOI5P7Nmz54UjR45kAEePHmXXrl3/+06Hh4cX2o6xsbHvTU9PZ0EQaBiGWq/Xbb1e19xsGIZaq9V0dnZWR0ZGDg4ODl63sM6JEyc+UkM+DmJ0dPS7lUrlUc/zOhzHQcRRcQpibQOhDliUEuK0gKqqzUTVkmVZEgTBc93d3ff9u/U/EuDAgQOyd+/eZ0ul0j7P8xC3iMbv4cQncfU8jtNAJJ+uBmsshg6suw7at4M6aq2RMAwHx8fHd2zevPn9jwVQVUSE559/XrZu3XrW9/1e13VBU3T0cSr2fZyu20G0aRfNBcGBcJBo5K/YdY8jxR6MMcRxzPj4+Nobbrjh7BtvvMGWLVuuDHDu3DlWr17N+Pj4c77v73XdgmoyIsVT36DYewfSvgLFNLUX9BXA5lCC4iBJgjn7DLVl+/DW7FeTRFKv1yeXL19+7ce6YHh4+IFyufzbYrGIbZzHO3YPLZv2oq1LESwYgQwwuWUJFDvAX4JmU+DGiOOBcbDHH2Pukw9R6NuPyTKq1erxY8eObdu4cSNbt269GGBwcBAR6SgWi4PlcnkJGJxnv0TbkgjW78kTABALNJp9TTNwO2DXDxDXw9bnkNOPIW0e6oBceJf01IsEX/kThaW3aBzX5cKFC5/p6+t7fUHXWej09PQAfLtQKCzBLVA/dYCWkTfRtjVQq8FMDSYDmKjCVBVmq8jMLCpXoY6LtRZ1fexYBONVZLYGxW4KFtzffZM0mRbP8yiXy88uPnHnIn+I/FJESOrnqfzhFzi4SFaE2QAuVGE6gGoAYQD1AE1CdOQtbK2KbcTUTr2CTE3AVK05fi5AtZUl8zXS48+AOFoqlXrPnDlzS39//4eZMI5jRkdHb2vec9Hk5MtyjXEgMTA7C56BKHeBAlZRkyJhHWdmCPvIfWhHhTY/wvErTeAIKBeQuQYkIC8/DTvuF9d1qVQq+zZv3nz8AwDf9zl79ux213WxOKKnX4EUiFwYG4L2nuZ3A6iFeoAsXY/e+XVYfzNSKGD+8BO8kdegoU3IBjDfgLkGRB7FgTdJGmOIdKrrulsuc4GIrAXUCriD7zTDs64wOdWMgShEGwHUJtFVtzBz+8NE167GOEKWJsS9N0I4A0kIcQi1EAbfbW4iUZZ4DnNv/Q0FEZGeywCstR2AGJvh1WfRIiACUQLn34MkRBqz2J6bmendRtuv7qZgYowxqCpm5B9QisGGYOswNw61KliBoiAVB8aHAUFV268E4FlrsdYgLkghd5DjQBZCOAJuwPzSa2g5dj/O2mVoVy+qioqLd/4otGZQCiGZgGgcHIECUFQoODiqqFqstc5l5dhaG6iqYh0xS9rQtI54Ao4FV6AQgRfR8f5vkKtC4jsfRUyGKoQTg7S7/WilA6k2moKtTjMQLc3k5VnMVVdjrWKtrV8GkGXZcJqmUnCLJCuuR4YmmvSeQEGhFWgHKjHGW0Z63U1I0gCnSPTafq5eEYMJm7CONHOcA6QKCdRdxV/7WYzJyLJs/DIXGGP+nqYpmFSTtTc307ynUFIoC1SAVkUqMenqexCbICKk4STXtP4FlnpoewPaFNpoti35XM8h7FmNW16FyTKyLHv7IgBVpaur64UoirDWiFn/BeKkGQuUBHyFEmixWQXT7q99kLzM7OuUyhmNdU8SJAZ8Cz5QBsqClpsVq37jHkiNxnFMkiQvXQQgInR1dVWttU+naUqxs5ehW++F1KCFZhTjgliDyVrJOm8iyzJUCuj5lzBrHmdq8DTtZQMqzStcVPCb3VAd0k/fizGpRFFk+vr6nrliKvY878dhGCZiUtVtDzPnL0cS/XBUaon9WzFpjIigpkFxy2MMDpzmuulfo0kFGg6ooo4DCia2DN/9I7zWbo3jGGPM/paWFntFgI0bN56r1+uHoyiSUrmdsTt+TjAvEIIaAeviT71GOPFPamHMdP/vsYc2sSZ6EidrRSKvWaozaYJPpwz1fpHimr2YtEEQBBccx3lCVT/yPSCA9vf3n+vs7Oxx3IJGoyfkE3/+IW3+LHQIFGJs1CDJwO8A/BIqJcQKGNBEkBCyaWVo1V1kt/0M16rOz89JEATbduzYcXyxoLtI2M1PxNu+fftLLS0tD5SKBSl1dDO9ZjfR8Nt0TI6BFqFQouD7gA+ZhzQEjUECQWahOlfi3G0/RTZ9CxfRIAhkamrqOzt37nwx15DFAE6eDzygBPiHDh0Kly1bdmTlypVfLhQKlVK5XeO1d8nE0k1EsaJT0ziTVdyqQeYzshlDVCsxU+nj/PVfZXb7I5Su3qzWGObn52VgYOChffv2/TFff/Gmm/G6SLyUX6AS4LuuWzp06NDBlStXbqhUKuI4rhqLpJqh6SR2bhRMhlQ6cNq6cZ1WPAcVVOI4Znp6ev6pp576/sGDB8/k9bFBMz8u9DNZJFjJrTW3FqAsIv7u3bvXPvjgg/uXL1++rFAo4HmeijiXvKgt1lrSNKVarWaHDx9+8sCBA68EQRAAMRACtdzquTUkFyrlbVtu7TlEJQcsAnbnzp3rd+3a9alVq1at6Ozs7PR93xcRSZIkCYKgOjY2NnHy5Ml3nnjiidP58yXLd1zPhatAkFu4AFDmw9y1APHBCeT/FWlWBjc3ueQGLX6kL7yX04VnbA6xcAIL4hEQe/ng5JIF4nxwKRdeLO4sApBF8xbMXgKR5v6OF8HEuab5F8JUZQbxrSgeAAAAAElFTkSuQmCC
// ==/UserScript==

function Ini() {
	console.log("BaseInfo initialisiert...");
};
Ini();
(function () {
	var BaseInfoMain = function () {
		function BaseInfoCreate()
			{
				try
					{
						qx.Class.define("BaseInfo", {
							type: "singleton",
							extend: qx.core.Object,
							construct: function () {
								window.addEventListener("click", this.onClick, false);
								window.addEventListener("keyup", this.onKey, false);
								window.addEventListener("mouseover", this.onMouseOver, false);
								console.log("BaseInfo geladen...");
								VERSION = '2.5.5';
								AUTHOR = 'Dooki';
								CLASS = 'BaseInfo';
							},
							members: {
								BasenwerteFenster: null,
								BasenwerteTab: null,
								BasenwertePage: null,
								BasenwerteVBox: null,
								AusgabeTab: null,
								AusgabePage: null,
								AusgabeVBox: null,
								BasenwerteButton: null,
								app: null,
								initialize: function () {
									this.BasenwerteFenster = new qx.ui.window.Window(CLASS + " " + VERSION,"http://ccta.php-gfx.net/images/info.png").set({
										padding: 5,
										paddingRight: 0,
										showMaximize:false,
										showMinimize:false,
										showClose:true,
										allowClose:true,
										resizable:false
									});
									this.BasenwerteFenster.setTextColor('black');
									this.BasenwerteFenster.setLayout(new qx.ui.layout.HBox); 
									this.BasenwerteFenster.moveTo(280, 60);
									
									// Tab Reihe
									this.BasenwerteTab = (new qx.ui.tabview.TabView).set({
										contentPaddingTop: 3,
										contentPaddingBottom: 6,
										contentPaddingRight: 7,
										contentPaddingLeft: 3
									});
									this.BasenwerteFenster.add(this.BasenwerteTab);
									
									// Tab 1
									this.BasenwertePage = new qx.ui.tabview.Page("Basenwerte");
									this.BasenwertePage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.BasenwertePage);
									this.BasenwerteVBox = new qx.ui.container.Composite();
									this.BasenwerteVBox.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteVBox.setThemedPadding(2);
									this.BasenwerteVBox.setThemedBackgroundColor("#eef");
									this.BasenwertePage.add(this.BasenwerteVBox);

									// Tab 2
									this.MembersPage = new qx.ui.tabview.Page("Mitglieder");
									this.MembersPage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.MembersPage);
									this.MembersVBox = new qx.ui.container.Composite();
									this.MembersVBox.setLayout(new qx.ui.layout.VBox(5));
									this.MembersVBox.setThemedPadding(2);
									this.MembersVBox.setThemedBackgroundColor("#eef");
									this.MembersPage.add(this.MembersVBox);

									// Tab 3
									this.AboutPage = new qx.ui.tabview.Page("ScriptInfo");
									this.AboutPage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.AboutPage);
									this.AboutVBox = new qx.ui.container.Composite();
									this.AboutVBox.setLayout(new qx.ui.layout.VBox(5));
									this.AboutVBox.setThemedPadding(2);
									this.AboutVBox.setThemedBackgroundColor("#eef");
									this.AboutPage.add(this.AboutVBox);

									this.BasenwerteButton = new qx.ui.form.Button(null, "http://ccta.php-gfx.net/images/info_small.png").set({
										toolTipText: CLASS + " " + VERSION + " anzeigen",
										width: 32,
										height: 32,
										maxWidth: 32,
										maxHeight: 32,
										appearance: ("button-playarea-mode-frame"),
										center: true
									});
									this.BasenwerteButton.addListener("click", function (e) {
										this.BasenwerteVBox.removeAll();
										this.AboutVBox.removeAll();
										this.MembersVBox.removeAll();
										this.showBasenwerte();
										this.BasenwerteFenster.show();
									}, this);
									this.app = qx.core.Init.getApplication();
									this.app.getDesktop().add(this.BasenwerteButton, {
										right: 125,
										top: 0
									});
								},
								showBasenwerte: function (ev) {
									var instance = ClientLib.Data.MainData.GetInstance();
									var alliance = instance.get_Alliance();
									var serverName = instance.get_Server().get_Name();
									var player = instance.get_Player();
									var faction1 = player.get_Faction();
									var playerRank = player.get_OverallRank();
									var aktuellesDatum = new Date();
									var Stunde = aktuellesDatum.getHours();
									var Minute = aktuellesDatum.getMinutes();
									var Monat = aktuellesDatum.getMonth()+1 ;
									var Tag = aktuellesDatum.getDate();
									var Jahr = aktuellesDatum.getFullYear();
									if(Stunde<10) Stunde = "0" + Stunde;
									if(Minute<10) Minute = "0" + Minute;
									if(Tag<10) Tag = "0" + Tag;
									if(Monat<10) Monat = "0" + Monat;
									var Datum = Tag + "." + Monat + "." + Jahr;
									var Uhrzeit = Stunde + ":" + Minute;
									var player_basen = 0;
									var support_gebaeude = 0;
									var v = 0;
									var credit_b = 0;
									var base1 = '';
									var base2 = '';
									var VE_durchschnitt = null;
									var VE_lvl = null;
									var support = 0;
									var supportlvl = null;
									var credit_def = null;
									var credit_durchschnitt = null;
									var repairMaxTime = null;
									var creditPerHour = 0;
									var creditsPerHour = 0;
									var credit_basen = '';
									var first_rep_flug = 0;
									var first_rep_fahr = 0;
									var first_rep_fuss = 0;
									var second_rep_flug = 0;
									var second_rep_fahr = 0;
									var second_rep_fuss = 0;
									var firstBaseName = '';
									var firstBaselvl = 0;
									var firstOfflvl = 0;
									var firstDeflvl = 0;
									var firstPowerProduction = 0;
									var firstRepairAir = null;
									var firstRepairVehicle = null;
									var firstRepairInfantry = null;
									var secondBaseName = '';
									var secondBaselvl = 0;
									var secondOfflvl = 0;
									var secondDeflvl = 0;
									var secondPowerProduction = 0;
									var secondRepairAir = null;
									var secondRepairVehicle = null;
									var secondRepairInfantry = null;
									var factionArt = new Array();
									factionArt[0] = "";
									factionArt[1] = "GDI";
									factionArt[2] = "NOD";
									var newAusgabe = new Array();
									var apc = instance.get_Cities();
									var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
									var PlayerID = apc.get_CurrentOwnCity().get_PlayerId();
									var AllianzName = apc.get_CurrentOwnCity().get_AllianceName();
									var AllianzID = apc.get_CurrentOwnCity().get_AllianceId();
									var apcl = apc.get_AllCities().d;
									var members = alliance.get_MemberData().d, member;
									keys = Object.keys(members);
									len = keys.length;
									var AllianzRolle = new Array();
									var AllianzSpieler = new Array();
									var sd;
									while (len--)
										{
											member = members[keys[len]];
											AllianzRolle[member.Id] = member.RoleName;
											AllianzSpieler[member.Id] = member.Name;
										}
									var allBases = '';
									var aB_basename,aB_baselvl,aB_offlvl,aB_deflvl,aB_velvl,aB_vzlvl,aB_cclvl,aB_supportlvl,aB_credits,aB_strom;
									for (var key in apcl)
										{
											player_basen++;
											var c = apcl[key];
											try
												{
													sd = c.get_SupportData();
													if(sd !== null)
														{
															support_gebaeude++;
															support = sd.get_Level();
															supportlvl = supportlvl+support;
															
														}
													else
														{
															support = 0;
														}
													unitData = c.get_CityBuildingsData();
													ve = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
													vz = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ);
													creditPerHour = ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false) + ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false);
													repairMaxTime = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
													commandpointsMaxStorage = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.CommandPoints);
													creditsPerHour = creditsPerHour + creditPerHour;
													if(c.get_CommandCenterLevel() > 0)
														{
															if(firstOfflvl < c.get_LvlOffense())
																{
																	secondBaseName = firstBaseName;
																	secondBaselvl = firstBaselvl;
																	secondOfflvl = firstOfflvl;
																	secondDeflvl = firstDeflvl;
																	secondPowerProduction = firstPowerProduction;
																	secondRepairInfantry = firstRepairInfantry;
																	secondRepairVehicle = firstRepairVehicle;
																	secondRepairAir = firstRepairAir;
																	
																	firstBaseName = c.get_Name();
																	firstBaselvl = c.get_LvlBase();
																	firstOfflvl = c.get_LvlOffense();
																	firstDeflvl = c.get_LvlDefense();
																	firstPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
																	firstRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
																	firstRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
																	firstRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
																}
															else if(c.get_LvlOffense() > secondOfflvl)
																{
																	secondBaseName = c.get_Name();
																	secondBaselvl = c.get_LvlBase();
																	secondOfflvl = c.get_LvlOffense();
																	secondDeflvl = c.get_LvlDefense();
																	secondPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
																	secondRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
																	secondRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
																	secondRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
																}
														}
													if(parseInt(creditPerHour) > 50000)
														{
															credit_b++;
															credit_def = credit_def + c.get_LvlDefense();
														}
													if(ve !== null)
														{
															v++;
															VE_lvl = VE_lvl+ve.get_CurrentLevel();
														}
													// All Bases v2.5
													// Basename,BaseLvl,OffLvl,DefLvl,VE,VZ,KZ,SupportLvl,Credits,Strom,
													if(allBases != "")
														{
															allBases += ' |||| ';
														}
													if(ve !== null) { aB_velvl = ve.get_CurrentLevel().toString(); } else { aB_velvl = 0;}
													if(vz !== null) { aB_vzlvl = vz.get_CurrentLevel().toString(); } else { aB_vzlvl = 0;}
													if(c.get_CommandCenterLevel)  { aB_cclvl =  c.get_CommandCenterLevel().toString(); } else { aB_cclvl = 0;}
													allBases += '' + c.get_Name().toString() + ' | ' + c.get_LvlBase().toFixed(2).toString() + ' | ' + c.get_LvlOffense().toFixed(2).toString() + ' | ' + c.get_LvlDefense().toFixed(2).toString() + ' | ' + aB_velvl + ' | ' + aB_vzlvl + ' | ' + aB_cclvl + ' | ' + support.toFixed(2).toString() + ' | ' + parseInt(creditPerHour) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power)) + '';
													
												}
											catch (e)
												{
													console.warn("BaseInfo pro Base: ", e); 
												}
										}

									credit_durchschnitt = credit_def / credit_b;
									newAusgabe["credit_basen"] = credit_b;
									if(credit_b>0)
										{
											newAusgabe["credit_def"] = "" + credit_durchschnitt.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["credit_def"] = 0;
										}
									newAusgabe["support_basen"] = support_gebaeude;
									if(support_gebaeude>0)
										{
											supportlvl = supportlvl / support_gebaeude;
											newAusgabe["support_lvl"] = "" + supportlvl.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["support_lvl"] = 0;
										}
									VE_durchschnitt = VE_lvl / v;
									if(v>0)
										{
											newAusgabe["ve"] = "" + VE_durchschnitt.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["ve"] = 0;
										}
									first_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(firstRepairAir);
									first_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(firstRepairVehicle);
									first_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(firstRepairInfantry);
									if(first_rep_flug.split(":").length < 3)
										{
											first_rep_flug = "0:" + first_rep_flug;
										}
									if(first_rep_fahr.split(":").length < 3)
										{
											first_rep_fahr = "0:" + first_rep_fahr;
										}
									if(first_rep_fuss.split(":").length < 3)
										{
											first_rep_fuss = "0:" + first_rep_fuss;
										}
									second_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(secondRepairAir);
									second_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(secondRepairVehicle);
									second_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(secondRepairInfantry);
									if(second_rep_flug.split(":").length < 3)
										{
											second_rep_flug = "0:" + second_rep_flug;
										}
									if(second_rep_fahr.split(":").length < 3)
										{
											second_rep_fahr = "0:" + second_rep_fahr;
										}
									if(second_rep_fuss.split(":").length < 3)
										{
											second_rep_fuss = "0:" + second_rep_fuss;
										}
									
									newAusgabe["AllianzID"] = AllianzID;
									newAusgabe["AllianzName"] = AllianzName.toString();
									newAusgabe["AllianzRolle"] = AllianzRolle[PlayerID].toString();
									newAusgabe["ServerName"] = serverName.toString();

									newAusgabe["Spieler"] = PlayerName;
									newAusgabe["Klasse"] = factionArt[faction1];
									newAusgabe["Datum"] = Datum;
									newAusgabe["Uhrzeit"] = Uhrzeit;
									newAusgabe["Rang"] = playerRank;
									newAusgabe["maxKP"] = commandpointsMaxStorage;
									newAusgabe["repZeit"] = repairMaxTime / 60 / 60;
									newAusgabe["Basen"] = player_basen;
									newAusgabe["Creditproduktion"] = parseInt(creditsPerHour);
									
									newAusgabe["1st_Base"] = firstBaselvl.toFixed(2).toString();
									newAusgabe["1st_Def"] = firstDeflvl.toFixed(2).toString();
									newAusgabe["1st_Off"] = firstOfflvl.toFixed(2).toString();
									newAusgabe["1st_Stromproduktion"] = parseInt(firstPowerProduction);
									newAusgabe["1st_Flugzeuge"] = first_rep_flug;
									newAusgabe["1st_Fahrzeuge"] = first_rep_fahr;
									newAusgabe["1st_Fusstruppen"] = first_rep_fuss;
									
									newAusgabe["2nd_Base"] = secondBaselvl.toFixed(2).toString();
									newAusgabe["2nd_Def"] = secondDeflvl.toFixed(2).toString();
									newAusgabe["2nd_Off"] = secondOfflvl.toFixed(2).toString();
									newAusgabe["2nd_Stromproduktion"] = parseInt(secondPowerProduction);
									newAusgabe["2nd_Flugzeuge"] = second_rep_flug;
									newAusgabe["2nd_Fahrzeuge"] = second_rep_fahr;
									newAusgabe["2nd_Fusstruppen"] = second_rep_fuss;

									var usersubmit = '';
									for(var werte in newAusgabe)
										{
											usersubmit += "[" + werte + "] == " + newAusgabe[werte] + "\n";
										}
									// Tab 1 Basenwerte
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Allgemeine Informationen</u></b></big><br><b>Allianz Rolle:</b> " + newAusgabe["AllianzRolle"] + "<br><b>Spielername:</b> " + newAusgabe["Spieler"] + "<br><b>Spielerklasse:</b> " + newAusgabe["Klasse"] + "<br><b>Aktuelle Uhrzeit:</b> " + newAusgabe["Uhrzeit"] + "Uhr - " + newAusgabe["Datum"] + "<br><b>Rang:</b> " + newAusgabe["Rang"] + "<br><b>Maximale KP:</b> " + newAusgabe["maxKP"] + "<br><b>Maximale Repzeit:</b> " + newAusgabe["repZeit"] + "<br><b>Basenanzahl:</b> " + newAusgabe["Basen"] + "<br><b>Credit Basen Anzahl:</b> " + newAusgabe["credit_basen"] + "<br><b>Creditproduktion:</b> " + newAusgabe["Creditproduktion"] + "<br><b>Creditbasen Defensive Ø:</b> " + newAusgabe["credit_def"] + "<br><b>Supportgebäude Anzahl:</b> " + newAusgabe["support_basen"] + "<br><b>Supportgebäude Level Ø:</b> " + newAusgabe["support_lvl"] + "<br><b>VE Ø aller Basen:</b> " + newAusgabe["ve"] + "</td></tr></table>").set({rich: true}));
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>1. Offensiv Basis</u></b></big><br><b>Basis Name:</b> " + firstBaseName + "<br><b>Basis Level:</b> " + newAusgabe["1st_Base"] + "<br><b>Offensive:</b> " + newAusgabe["1st_Off"] + "<br><b>Defensive:</b> " + newAusgabe["1st_Def"] + "<br><b>Stromproduktion:</b> " + newAusgabe["1st_Stromproduktion"] + "<br><b>Rep. Flugzeuge:</b> " + newAusgabe["1st_Flugzeuge"] + "<br><b>Rep. Fahrzeuge:</b> " + newAusgabe["1st_Fahrzeuge"] + "<br><b>Rep. Fußtruppen:</b> " + newAusgabe["1st_Fusstruppen"] + "</td><td><big><b><u>2. Offensiv Basis</u></b></big><br><b>Basis Name:</b> " + secondBaseName + "<br><b>Basis Level:</b> " + newAusgabe["2nd_Base"] + "<br><b>Offensive:</b> " + newAusgabe["2nd_Off"] + "<br><b>Defensive:</b> " + newAusgabe["2nd_Def"] + "<br><b>Stromproduktion:</b> " + newAusgabe["2nd_Stromproduktion"] + "<br><b>Rep. Flugzeuge:</b> " + newAusgabe["2nd_Flugzeuge"] + "<br><b>Rep. Fahrzeuge:</b> " + newAusgabe["2nd_Fahrzeuge"] + "<br><b>Rep. Fußtruppen:</b> " + newAusgabe["2nd_Fusstruppen"] + "</td></tr></table>").set({rich: true}));
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?usersubmit=" + escape(usersubmit) + "&amp;allBases=" + escape(allBases) + "' target='_blank'><button><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Werte übertragen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></button></a></td></tr></table>").set({rich: true}));
									
									// Tab 2 Mitglieder
									var keys = Object.keys(AllianzSpieler);
									var anzahl = keys.length;
									var len = keys.length;
									var member='',userreplace='',i=0;
									userreplace += newAusgabe["AllianzID"] + ',' + newAusgabe["AllianzName"] + ',' + newAusgabe["AllianzRolle"] + ',' + newAusgabe["ServerName"] + ',';
									while (len--)
										{
											i++;
											if(member != '')
												{
													if(i == 5)
														{
															member += ',<br>';
															i = 0;
														}
													else
														{
															member += ', ';
														}
													userreplace += ',';
												}
											member += AllianzSpieler[keys[len]];
											userreplace += AllianzSpieler[keys[len]];
										}
									this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Mitglieder Auflistung (" + anzahl + ")</u></b></big><br><br>" + member + "</td></tr></table>").set({rich: true}));
									if(newAusgabe["AllianzRolle"] == 'Oberbefehlshaber' || newAusgabe["AllianzRolle"] == 'Leader')
										{
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><span style='color: #bb0000;'><u>Nur für OBH's sichtbar:</u></span></td></tr></table>").set({rich: true}));
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Mitglieder Anpassung</u></b></big><br>Mit diesem Button kannste du deine Mitglieder auf<br>der BaseInfo Seite anpassen, sollten ehemalige Mitglieder,<br>die z.Z. einer anderen Allianz angehören,<br>noch in der Auflistung angezeigt werden.</td></tr></table>").set({rich: true}));
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?userreplace=" + escape(userreplace) + "' target='_blank'><button><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mitglieder abgleichen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></button></a><br><span style='color: #bb0000;'><i>Du musst auf der " + CLASS + "-Seite eingeloggt sein</i></span></td></tr></table>").set({rich: true}));
										}

									// Tab 3 ScriptInfo
									this.AboutVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Script Informationen</u></b></big><br><b>Name:</b> " + CLASS + "<br><b>Version:</b> " + VERSION + "<br><b>Ersteller:</b> " + AUTHOR + "<br><b>Homepage:</b> <a href='http://ccta.php-gfx.net/baseinfo' target='_blank'>ccta.php-gfx.net/baseinfo</a><br><br><big><b><u>Warum entstand dieses Script?</u></b></big><br>Es gibt ein paar Hauptgründe warum dieses Script entstand. Zum einen wollten Befehlshaber einen Überblick haben, über die einzelnen Werte ihrer Mitglieder, zum anderen sollten die Mitglieder selber sehen, wie ihre Werte sind.<br><br><big><b><u>Was bewirkt \"Werte übertragen\"?</u></b></big><br>Mit dem Button \"Werte übertragen\" können eure Basenwerte an eine Homepage übermittelt werden, wo sich OBH's anmelden können und ihre Allianz auswerten können. Die OBH's bekommen mit dem erstmaligen Übertragen ihrer eigenen Werte einen \"Befehlshaber Login\" angezeigt, welcher nur EINMAL sichtbar ist. Danach können sich Zugriffsberechtigte (diese Zugangsdaten sollten von diesem OBH an berechtigte Personen weitergegeben werden) ihre Allianz einsehen und diverse Einstellungen tätigen. Mitglieder bekommen mit dem übertragen ihrer Werte einen permanenten Link angezeigt welchen sie für ihre eigenen Werte nutzen können. Sie sehen dann ihre letzten 5 Einträge wo sie selbst auswerten können wo sie sich verbessert haben.</td></tr></table>").set({rich: true, width: 350}));
								}
							}
						});          
					}
				catch (e)
					{
						console.warn("qx.Class.define(BaseInfo: ", e);      
					}
				BaseInfo.getInstance();
			}
		function LoadExtension()
			{
				try
					{
						if (typeof(qx)!='undefined')
							{
								if (!!qx.core.Init.getApplication().getMenuBar())
									{
										BaseInfoCreate();
										BaseInfo.getInstance().initialize();
										return;
									}
							}
					}
				catch (e)
					{
						if (console !== undefined) console.log(e);
						else if (window.opera) opera.postError(e);
						else GM_log(e);
					}
				window.setTimeout(LoadExtension, 1000);
			}
		LoadExtension();
	}
	function Inject()
		{
			if (window.location.pathname != ("/login/auth"))
				{
					var Script = document.createElement("script");
					Script.innerHTML = "(" + BaseInfoMain.toString() + ")();";
					Script.type = "text/javascript";        
					document.getElementsByTagName("head")[0].appendChild(Script);
				}
		}    
	Inject();
})();


// ==UserScript==
// @name           CnC: Tiberium Alliances Info
// @author         TheStriker
// @description    Alt+Y - Insert to message/chat/post all your bases/cities info
// @description    Alt+N - Insert to message/chat/post ally support info
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.0.3
// ==/UserScript==
(function () {
  var TAI_main = function () {
    function createInstance() {
      qx.Class.define("TAI", { //TAS.main
        type : "singleton",
        extend : qx.core.Object,
        members : {
          initialize : function () {
            addEventListener("keyup", this.onKey, false);
            console.log("TA Info loaded.");
          },
          onKey : function (ev) {
            var s = String.fromCharCode(ev.keyCode);
            var inputField = document.querySelector('input:focus, textarea:focus');
            if (inputField != null) {
              // ALT+
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "Y") {
                // player bases info to share with others

                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;//all player cities
                var txt = "", c, unitData, bh, supp, type, df;
                for (var key in apc) {
                  c = apc[key];
                  txt += "[u][b]" + c.get_Name() + "[/b][/u] [coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords]: ";
                  txt += "[u]Def:[/u] [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b]";
                  txt += " [u]Off:[/u] [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] ";
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (bh !== null) {
                    txt += "[u]" + bh.get_TechGameData_Obj().dn + ":[/u] [b]" + bh.get_CurrentLevel() + "[/b] ";
                    //txt += "[u]BaseRep:[/u] [b]" + (c.get_CityBuildingsData().GetFullRepairTime() / 3600).toFixed(2) + "h[/b] ";
                    //txt += "[u]DefRep:[/u] [b]" + (c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Defense) / 3600).toFixed(2) + "h[/b] ";
                  }
                  if (df !== null) {
                    txt += "[u]" + df.get_TechGameData_Obj().dn + ":[/u] [b]" + df.get_CurrentLevel() + "[/b] ";
                  }
                  if (supp !== null) {
                    txt += "[u]" + supp.get_TechGameData_Obj().dn.slice(0, 3) + ":[/u] [b]" + supp.get_CurrentLevel() + "[/b] ";
                  }
                  txt += "[hr]";
                }
                inputField.value += txt;
              } else if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "N") {
                var bases = ClientLib.Data.MainData.GetInstance().get_AllianceSupportState().get_Bases().d;
                var base, keys = Object.keys(bases), len = keys.length, info = {}, avg = 0, high = 0, supBaseCount = len;
                while (len--) {
                  base = bases[keys[len]];
                  if (!info.hasOwnProperty(base.get_Type())) {
                    info[base.get_Type()] = 0;
                  }
                  info[base.get_Type()]++;
                  if (base.get_Level() >= 30)
                    high++;
                  avg += base.get_Level();
                }
                avg /= supBaseCount;
                var members = ClientLib.Data.MainData.GetInstance().get_Alliance().get_MemberData().d, member, baseCount = 0;
                keys = Object.keys(members);
                len = keys.length;
                while (len--) {
                  member = members[keys[len]];
                  baseCount += member.Bases;
                }
                inputField.value += "Bases: " + baseCount + " SupCount: " + supBaseCount + "(" + (supBaseCount / baseCount * 100).toFixed(0) + "%) Avg: " + avg.toFixed(2) + " 30+: " + high + "(" + (high / baseCount * 100).toFixed(0) + "%)";
                //for (var i in info)
                //  console.log("Type: " + i + " Count: " + info[i]);
              }
            }
          }
        } // members
      });
    }

    // Loading
    function TAI_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          if (qx.core.Init.getApplication().getMenuBar() !== null) {
            createInstance();
            TAI.getInstance().initialize();
          } else setTimeout(TAI_checkIfLoaded, 1000);
        } else {
          setTimeout(TAI_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') {
          console.log(e);
        } else if (window.opera) {
          opera.postError(e);
        } else {
          GM_log(e);
        }
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      setTimeout(TAI_checkIfLoaded, 1000);
    }
  };
  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var TAIScript = document.createElement("script");
  var txt = TAI_main.toString();
  TAIScript.innerHTML = "(" + txt + ")();";
  TAIScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TAIScript);

  }
})();


// ==UserScript==
// @name        MaelstromTools Dev
// @namespace   MaelstromTools
// @description Just a set of statistics & summaries about repair time and base resources. Mainly for internal use, but you are free to test and comment it.
// @version     0.1.3.2
// @author      Maelstrom, HuffyLuf, KRS_L and Krisan
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
//var offense_units = own_city.get_CityArmyFormationsManager().GetFormationByTargetBaseId(current_city.get_Id()).get_ArmyUnits().l;
//System.Int64 GetForumIdByType (ClientLib.Data.Forum.EForumType eForumType)
//static ClientLib.Data.Forum.EForumType NormalForum
//System.Collections.Generic.List$1 get_ForumsAlliance ()
//System.Void CreateThread (System.Int64 forumId ,System.String threadTitle ,System.String threadPost ,System.Boolean autoSubscribe)
//System.Void CreatePost (System.Int64 forumId ,System.Int64 threadId ,System.String postMessage)
//System.Void StartGetForumThreadData (System.Int64 forumId ,System.Int32 skip ,System.Int32 take)
//System.Void OnForumThreadDataReceived (System.Object context ,System.Object result)
//System.Void add_ThreadsFetched (ClientLib.Data.ForumThreadsFetched value)
//System.Void MarkThreadsAsRead (System.Int64 forumId ,System.Int64[] threadIds)
//
//var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(lvl);
//var scoreNext = ClientLib.Base.PointOfInterestTypes.GetNextScore(score);
//var resBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.TiberiumBonus, score);
//var unitBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.InfanteryBonus, score);
//console.log("POI lvl" + lvl + "gives " + score + "points, next lvl at " + scoreNext + " points. Resource bonus: " + resBonus + " Unit bonus: " + unitBonus + "%");
/*
 ClientLib.Data.Player
 get_ResearchPoints
 GetCreditsCount
 GetCreditsGrowth
ClientLib.Data.PlayerResearch get_PlayerResearch ()
ClientLib.Data.PlayerResearchItem GetResearchItemFomMdbId (System.Int32 _mdbId)
ClientLib.Data.PlayerResearchItem.System.Object get_NextLevelInfo_Obj ()

var cw=ClientLib.Data.MainData.GetInstance().get_Player().get_Faction();
var cj=ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound,cw);
var cd=cr.GetResearchItemFomMdbId(cj);
 */
(function () {
  var MaelstromTools_main = function () {
    try {
      function CCTAWrapperIsInstalled() {
        return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
      }

      function createMaelstromTools() {
        console.log('MaelstromTools loaded');

        qx.Class.define("MaelstromTools.Language", {
          type: "singleton",
          extend: qx.core.Object,
          construct: function (language) {
            this.Languages = ['de', 'pt', 'fr', 'tr']; // en is default, not needed in here!
            if (language != null) {
              this.MyLanguage = language;
            }
          },
          members: {
            MyLanguage: "en",
            Languages: null,
            Data: null,

            loadData: function (language) {
              var l = this.Languages.indexOf(language);

              if (l < 0) {
                this.Data = null;
                return;
              }

              this.Data = new Object();
              this.Data["Collect all packages"] = ["Alle Pakete einsammeln", "Recolher todos os pacotes", "Récupérez tous les paquets", "Tüm paketleri topla"][l];
              this.Data["Overall production"] = ["Produktionsübersicht", "Produção global", "La production globale", "Genel üretim"][l];
              this.Data["Army overview"] = ["Truppenübersicht", "Vista Geral de Exército", "Armée aperçu", "Ordu önizlemesi"][l];
              this.Data["Base resources"] = ["Basis Ressourcen", "Recursos base", "ressources de base", "Üs önizlemesi"][l];
              this.Data["Main menu"] = ["Hauptmenü", "Menu Principal", "menu principal", "Ana menü"][l];
              this.Data["Repair all units"] = ["Alle Einheiten reparieren", "Reparar todas as unidades", "Réparer toutes les unités", "Tüm üniteleri onar"][l];
              this.Data["Repair all defense buildings"] = ["Alle Verteidigungsgebäude reparieren", "Reparar todos os edifícios de defesa", "Réparer tous les bâtiments de défense", "Tüm savunma binalarini onar"][l];
              this.Data["Repair all buildings"] = ["Alle Gebäurde reparieren", "Reparar todos os edifícios", "Réparer tous les bâtiments", "Tüm binalari onar"][l];
              this.Data["Base status overview"] = ["Basisübersicht", "Estado geral da base", "aperçu de l'état de base", "Üs durumu önizlemesi"][l];
              this.Data["Upgrade priority overview"] = ["Upgrade Übersicht", "Prioridade de upgrades", "aperçu des priorités de mise à niveau", "Yükseltme önceligi önizlemesi"][l];
              this.Data["MaelstromTools Preferences"] = ["MaelstromTools Einstellungen", "Preferências de MaelstromTools", "Préférences MaelstromTools", "MaelstromTools Ayarlari"][l];
              this.Data["Options"] = ["Einstellungen", "Opções", "Options", "Seçenekler"][l];
              this.Data["Target out of range, no resource calculation possible"] = ["Ziel nicht in Reichweite, kann die plünderbaren Ressourcen nicht berechnen", "Alvo fora do alcance, não é possivel calcular os recursos", "Cible hors de portée, pas de calcul de ressources possible",
			  "Hedef menzil disinda, kaynak hesaplamasi olanaksiz"][l];
              this.Data["Lootable resources"] = ["Plünderbare Ressourcen", "Recursos roubáveis", "Ressources à piller", "Yagmalanabilir kaynaklar"][l];
              this.Data["per CP"] = ["pro KP", "por PC", "par PC", "KP basina"][l];
              this.Data["Calculating resources..."] = ["Berechne plünderbare Ressourcen...", "A calcular recursos...", "calcul de ressources ...", "Kaynaklar hesaplaniyor..."][l];
              this.Data["Next MCV"] = ["MBF", "MCV", "VCM"][l];
              this.Data["Show time to next MCV"] = ["Zeige Zeit bis zum nächsten MBF", "Mostrar tempo restante até ao próximo MCV", "Afficher l'heure pour le prochain VCM ", "Sirdaki MCV için gereken süreyi göster"][l];
              this.Data["Show lootable resources (restart required)"] = ["Zeige plünderbare Ressourcen (Neustart nötig)", "Mostrar recursos roubáveis (é necessário reiniciar)", "Afficher les ressources fouiller (redémarrage nécessaire)", "Yagmalanabilir kaynaklari göster (yeniden baslatma gerekli)"][l];
              this.Data["Use dedicated Main Menu (restart required)"] = ["Verwende extra Hauptmenü (Neustart nötig)", "Usar botão para o Menu Principal (é necessário reiniciar)", "Utiliser dédiée du menu principal (redémarrage nécessaire)", "Ana menü tusunu kullan (yeniden baslatma gerekli)"][l];
              this.Data["Autocollect packages"] = ["Sammle Pakete automatisch", "Auto recolher pacotes", "paquets autocollecté", "Paketleri otomatik topla"][l];
              this.Data["Autorepair units"] = ["Repariere Einheiten automatisch", "Auto reparar o exército", "unités autoréparé", "Üniteleri otomatik onar"][l];
              this.Data["Autorepair defense (higher prio than buildings)"] = ["Repariere Verteidigung automatisch (höhere Prio als Gebäude)", "Auto reparar defesa (maior prioridade do que os edifícios)", "réparation automatique la défense (priorité plus élevé que les bâtiments) ", "Savunmayi otomatik onar (binalardan daha yüksek öncelikli olarak)"][l];
              this.Data["Autorepair buildings"] = ["Repariere Gebäude automatisch", "Auto reparar edifícios", "bâtiments autoréparé", "Binalari otomatik onar"][l];
              this.Data["Automatic interval in minutes"] = ["Auto-Intervall in Minuten", "Intervalo de tempo automático (em minutos)", "intervalle automatique en quelques minutes", "Otomatik toplama araligi (dk)"][l];
              this.Data["Apply changes"] = ["Speichern", "Confirmar", "Appliquer changements", "Uygula"][l];
              this.Data["Discard changes"] = ["Abbrechen", "Cancelar", "Annuler changements", "Iptal"][l];
              this.Data["Reset to default"] = ["Auf Standard zurücksetzen", "Definições padrão", "Réinitialiser", "Sifirla"][l];
              this.Data["Continuous"] = ["Kontinuierlich", "Contínua", "continue", "Sürekli"][l];
              this.Data["Bonus"] = ["Pakete", "Bónus", "Bonus", "Bonus"][l];
              this.Data["POI"] = ["POI", "POI", "POI", "POI"][l];
              this.Data["Total / h"] = ["Gesamt / h", "Total / h", "Total / h", "Toplam / sa."][l];
              this.Data["Repaircharges"] = ["Reparaturzeiten", "Custo de reparação", "frais de réparation", "Onarim maliyeti"][l];
              this.Data["Repairtime"] = ["Max. verfügbar", "Tempo de reparação", "Temps de réparation", "Onarim süresi"][l];
              this.Data["Attacks"] = ["Angriffe", "Ataques", "Attaques", "Saldirilar"][l];
              this.Data[MaelstromTools.Statics.Infantry] = ["Infanterie", "Infantaria", "Infanterie", "Piyade"][l];
              this.Data[MaelstromTools.Statics.Vehicle] = ["Fahrzeuge", "Veículos", "Vehicule", "Motorlu B."][l];
              this.Data[MaelstromTools.Statics.Aircraft] = ["Flugzeuge", "Aeronaves", "Aviation", "Hava A."][l];
              this.Data[MaelstromTools.Statics.Tiberium] = ["Tiberium", "Tibério", "Tiberium", "Tiberium"][l];
              this.Data[MaelstromTools.Statics.Crystal] = ["Kristalle", "Cristal", "Cristal", "Kristal"][l];
              this.Data[MaelstromTools.Statics.Power] = ["Strom", "Potência", "Energie", "Güç"][l];
              this.Data[MaelstromTools.Statics.Dollar] = ["Credits", "Créditos", "Crédit", "Kredi"][l];
              this.Data[MaelstromTools.Statics.Research] = ["Forschung", "Investigação", "Recherche", "Arastirma"][l];
              this.Data["Base"] = ["Basis", "Base", "Base", "Üs"][l];
              this.Data["Defense"] = ["Verteidigung", "Defesa", "Défense", "Savunma"][l];
              this.Data["Army"] = ["Armee", "Exército", "Armée", "Ordu"][l];
              this.Data["Level"] = ["Stufe", "Nível", "Niveau", "Seviye"][l];
              this.Data["Buildings"] = ["Gebäude", "Edifícios", "Bâtiments", "Binalar"][l];
              this.Data["Health"] = ["Leben", "Vida", "Santé", "Saglik"][l];
              this.Data["Units"] = ["Einheiten", "Unidades", "Unités", "Üniteler"][l];
              this.Data["Hide Mission Tracker"] = ["Missionsfenster ausblenden", "Esconder janela das Missões", "Cacher la fenêtre de mission", "Görev Izleyicisini Gizle"][l];
              this.Data["none"] = ["keine", "nenhum", "aucun", "hiçbiri"][l];
              this.Data["Cooldown"] = ["Cooldown", "Relocalização", "Recharge", "Cooldown"][l];
              this.Data["Protection"] = ["Geschützt bis", "Protecção", "Protection", "Koruma"][l];
              this.Data["Available weapon"] = ["Verfügbare Artillerie", "Apoio disponível", "arme disponible", "Mevcut silah"][l];
              this.Data["Calibrated on"] = ["Kalibriert auf", "Calibrado em", "Calibré sur ", "Kalibreli"][l];
              this.Data["Total resources"] = ["Gesamt", "Total de recursos", "Ressources totales", "Toplam kaynaklar"][l];
              this.Data["Max. storage"] = ["Max. Kapazität", "Armazenamento Máx.", "Max. de stockage", "Maks. Depo"][l];
              this.Data["Storage full!"] = ["Lager voll!", "Armazenamento cheio!", "Stockage plein", "Depo dolu!"][l];
              this.Data["Storage"] = ["Lagerstand", "Armazenamento", "Stockage", "Depo"][l];
              this.Data["display only top buildings"] = ["Nur Top-Gebäude anzeigen", "Mostrar apenas melhores edifícios", "afficher uniquement les bâtiments principaux", "yalnizca en iyi binalari göster"][l];
              this.Data["display only affordable buildings"] = ["Nur einsetzbare Gebäude anzeigen", "Mostrar apenas edíficios acessíveis", "afficher uniquement les bâtiments abordables", "yalnizca satin alinabilir binalari göster"][l];
              this.Data["City"] = ["Stadt", "Base", "Base", "Sehir"][l];
              this.Data["Type (coord)"] = ["Typ (Koord.)", "Escrever (coord)", "Type (coord)", "Tip (koord.)"][l];
              this.Data["to Level"] = ["Auf Stufe", "para nível", "à Niveau ", "Seviye için"][l];
              this.Data["Gain/h"] = ["Zuwachs/h", "Melhoria/h", "Gain / h", "Kazanç / sa."][l];
              this.Data["Factor"] = ["Faktor", "Factor", "Facteur", "Faktör"][l];
              this.Data["Tib/gain"] = ["Tib./Zuwachs", "Tib/melhoria", "Tib / gain", "Tib/Kazanç"][l];
              this.Data["Pow/gain"] = ["Strom/Zuwachs", "Potencia/melhoria", "Puissance / Gain", "Güç/Kazanç"][l];
              this.Data["ETA"] = ["Verfügbar in", "Tempo restante", "Temps restant", "Kalan Zaman"][l];
              this.Data["Upgrade"] = ["Aufrüsten", "Upgrade", "Upgrade", "Yükselt"][l];
              this.Data["Powerplant"] = ["Kratfwerk", "Central de Energia", "Centrale", "Güç Santrali"][l];
              this.Data["Refinery"] = ["Raffinerie", "Refinaria", "Raffinerie", "Rafineri"][l];
              this.Data["Harvester"] = ["Sammler", "Harvester", "Collecteur", "Biçerdöver"][l];
              this.Data["Silo"] = ["Silo", "Silo", "Silo", "Silo"][l];
              this.Data["Accumulator"] = ["Akkumulator", "Acumulador", "Accumulateur", "Akümülatör"][l];
              this.Data["Calibrate support"] = ["Artillerie kalibrieren", "Calibrar apoio", "Calibrer soutien", "Takviyeyi kalibre et"][l];
              this.Data["Access"] = ["Öffne", "Aceder", "Accès ", "Aç"][l];
              this.Data["Focus on"] = ["Zentriere auf", "Concentrar em", "Centré sur", "Odaklan"][l];
              this.Data["Possible attacks from this base (available CP)"] = ["Mögliche Angriffe (verfügbare KP)", "Possible attacks from this base (available CP)","Possible attacks from this base (available CP)", "Bu üsten yapilmasi mümkün olan saldirilar (mevcut KP)"][l];
              //this.Data[""] = [""][l];
            },
            get: function (ident) {
              return this.gt(ident);
            },
            gt: function (ident) {
              if (!this.Data || !this.Data[ident]) {
                /*if(!parseInt(ident.substr(0, 1), 10) && ident != "0") {
                  console.log("missing language data: " + ident);
                }*/
                return ident;
              }
              return this.Data[ident];
            }
          }
        }),

        // define Base
        qx.Class.define("MaelstromTools.Base", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            /* Desktop */
            timerInterval: 1500,
            mainTimerInterval: 5000,
            lootStatusInfoInterval: null,
            images: null,
            mWindows: null,
            mainMenuWindow: null,

            itemsOnDesktop: null,
            itemsOnDesktopCount: null,
            itemsInMainMenu: null,
            itemsInMainMenuCount: null,
            buttonCollectAllResources: null,
            buttonRepairAllUnits: null,
            buttonRepairAllBuildings: null,

            lootWidget: null,

            initialize: function () {
              try {
                //console.log(qx.locale.Manager.getInstance().getLocale());
                Lang.loadData(qx.locale.Manager.getInstance().getLocale());
                //console.log("Client version: " + MaelstromTools.Wrapper.GetClientVersion());
                this.itemsOnDesktopCount = new Array();
                this.itemsOnDesktop = new Object();
                this.itemsInMainMenuCount = new Array();
                this.itemsInMainMenu = new Object();

                var fileManager = ClientLib.File.FileManager.GetInstance();
                //ui/icons/icon_mainui_defense_button
                //ui/icons/icon_mainui_base_button
                //ui/icons/icon_army_points
                //icon_def_army_points
                var factionText = ClientLib.Base.Util.GetFactionGuiPatchText();
                this.createNewImage(MaelstromTools.Statics.Tiberium, "ui/common/icn_res_tiberium.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Crystal, "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Power, "ui/common/icn_res_power.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Dollar, "ui/common/icn_res_dollar.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Research, "ui/common/icn_res_research.png", fileManager);
                this.createNewImage("Sum", "ui/common/icn_build_slots.png", fileManager);
                this.createNewImage("AccessBase", "ui/" + factionText + "/icons/icon_mainui_enterbase.png", fileManager);
                this.createNewImage("FocusBase", "ui/" + factionText + "/icons/icon_mainui_focusbase.png", fileManager);
                this.createNewImage("Packages", "ui/" + factionText + "/icons/icon_collect_packages.png", fileManager);
                this.createNewImage("RepairAllUnits", "ui/" + factionText + "/icons/icon_army_points.png", fileManager);
                this.createNewImage("RepairAllBuildings", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("ResourceOverviewMenu", "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage("ProductionMenu", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("RepairTimeMenu", "ui/" + factionText + "/icons/icon_repair_all_button.png", fileManager);
                this.createNewImage("Crosshair", "ui/icons/icon_support_tnk_white.png", fileManager);
                this.createNewImage("UpgradeBuilding", "ui/" + factionText + "/icons/icon_building_detail_upgrade.png", fileManager);

                this.createNewWindow("MainMenu", "R", 125, 140, 120, 100, "B");
                this.createNewWindow("Production", "L", 120, 60, 340, 140);
                this.createNewWindow("RepairTime", "L", 120, 60, 340, 140);
                this.createNewWindow("ResourceOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("BaseStatusOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("Preferences", "L", 120, 60, 440, 140);
                this.createNewWindow("UpgradePriority", "L", 120, 60, 870, 400);

                if (!this.mainMenuWindow) {
                  this.mainMenuWindow = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
                    //backgroundColor: "#303030",
                    padding: 5,
                    paddingRight: 0
                  });
                  if (MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.mainMenuWindow.setPlaceMethod("mouse");
                    this.mainMenuWindow.setPosition("top-left");
                  } else {
                    this.mainMenuWindow.setPlaceMethod("widget");
                    this.mainMenuWindow.setPosition("bottom-right");
                    this.mainMenuWindow.setAutoHide(false);
                    this.mainMenuWindow.setBackgroundColor("transparent");
                    this.mainMenuWindow.setShadow(null);
                    this.mainMenuWindow.setDecorator(new qx.ui.decoration.Background());
                  }
                }

                var desktopPositionModifier = 0;

                this.buttonCollectAllResources = this.createDesktopButton(Lang.gt("Collect all packages"), "Packages", true, this.desktopPosition(desktopPositionModifier));
                this.buttonCollectAllResources.addListener("execute", this.collectAllPackages, this);

                var openProductionWindowButton = this.createDesktopButton(Lang.gt("Overall production"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openProductionWindowButton.addListener("execute", function () {
                  window.MaelstromTools.Production.getInstance().openWindow("Production", Lang.gt("Overall production"));
                }, this);

                var openResourceOverviewWindowButton = this.createDesktopButton(Lang.gt("Base resources"), "ResourceOverviewMenu", false, this.desktopPosition(desktopPositionModifier));
                openResourceOverviewWindowButton.addListener("execute", function () {
                  window.MaelstromTools.ResourceOverview.getInstance().openWindow("ResourceOverview", Lang.gt("Base resources"));
                }, this);

                desktopPositionModifier++;
                var openMainMenuButton = this.createDesktopButton(Lang.gt("Main menu"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openMainMenuButton.addListener("click", function (e) {
                  this.mainMenuWindow.placeToMouse(e);
                  this.mainMenuWindow.show();
                }, this);

                this.buttonRepairAllUnits = this.createDesktopButton(Lang.gt("Repair all units"), "RepairAllUnits", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllUnits.addListener("execute", this.repairAllUnits, this);

                this.buttonRepairAllBuildings = this.createDesktopButton(Lang.gt("Repair all buildings"), "RepairAllBuildings", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllBuildings.addListener("execute", this.repairAllBuildings, this);

                var openRepairTimeWindowButton = this.createDesktopButton(Lang.gt("Army overview"), "RepairTimeMenu", false, this.desktopPosition(desktopPositionModifier));
                openRepairTimeWindowButton.addListener("execute", function () {
                  window.MaelstromTools.RepairTime.getInstance().openWindow("RepairTime", Lang.gt("Army overview"));
                }, this);

                var openBaseStatusOverview = this.createDesktopButton(Lang.gt("Base status overview"), "Crosshair", false, this.desktopPosition(desktopPositionModifier));
                openBaseStatusOverview.addListener("execute", function () {
                  window.MaelstromTools.BaseStatus.getInstance().openWindow("BaseStatusOverview", Lang.gt("Base status overview"));
                }, this);

                desktopPositionModifier++;
                var openHuffyUpgradeOverview = this.createDesktopButton(Lang.gt("Upgrade priority overview"), "UpgradeBuilding", false, this.desktopPosition(desktopPositionModifier));
                openHuffyUpgradeOverview.addListener("execute", function () {
                  window.HuffyTools.UpgradePriorityGUI.getInstance().openWindow("UpgradePriority", Lang.gt("Upgrade priority overview"));
                }, this);

                desktopPositionModifier++;
                var preferencesButton = new qx.ui.form.Button(Lang.gt("Options")).set({
                  appearance: "button-text-small",
                  width: 100,
                  minWidth: 100,
                  maxWidth: 100
                });
                preferencesButton.setUserData("desktopPosition", this.desktopPosition(desktopPositionModifier));
                preferencesButton.addListener("execute", function () {
                  window.MaelstromTools.Preferences.getInstance().openWindow("Preferences", Lang.gt("MaelstromTools Preferences"), true);
                }, this);

                if (MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop("MainMenu", openMainMenuButton);
                }
                this.addToMainMenu("ResourceOverviewMenu", openResourceOverviewWindowButton);
                this.addToMainMenu("ProductionMenu", openProductionWindowButton);
                this.addToMainMenu("BaseStatusMenu", openBaseStatusOverview);
                this.addToMainMenu("RepairTimeMenu", openRepairTimeWindowButton);
                this.addToMainMenu("UpgradeBuilding", openHuffyUpgradeOverview);

                this.addToMainMenu("PreferencesMenu", preferencesButton);

                if (!MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.mainMenuWindow.show();
                  var target = qx.core.Init.getApplication().getOptionsBar(); //getServerBar(); //qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_APPOINTMENTS);
                  this.mainMenuWindow.placeToWidget(target, true);
                }

                webfrontend.gui.chat.ChatWidget.recvbufsize = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);
                this.runSecondlyTimer();
                this.runMainTimer();
                this.runAutoCollectTimer();
              } catch (e) {
                console.log("MaelstromTools.initialize: ", e);
              }
            },

            desktopPosition: function (modifier) {
              if (!modifier) modifier = 0;
              return modifier;
            },

            createDesktopButton: function (title, imageName, isNotification, desktopPosition) {
              try {
                if (!isNotification) {
                  isNotification = false;
                }
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                var desktopButton = new qx.ui.form.Button(null, this.images[imageName]).set({
                  toolTipText: title,
                  width: 50,
                  height: 40,
                  maxWidth: 50,
                  maxHeight: 40,
                  appearance: (isNotification ? "button-standard-nod" : "button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
                  center: true
                });

                desktopButton.setUserData("isNotification", isNotification);
                desktopButton.setUserData("desktopPosition", desktopPosition);
                return desktopButton;
              } catch (e) {
                console.log("MaelstromTools.createDesktopButton: ", e);
              }
            },

            createNewImage: function (name, path, fileManager) {
              try {
                if (!this.images) {
                  this.images = new Object();
                }
                if (!fileManager) {
                  return;
                }

                this.images[name] = fileManager.GetPhysicalPath(path);
              } catch (e) {
                console.log("MaelstromTools.createNewImage: ", e);
              }
            },

            createNewWindow: function (name, align, x, y, w, h, alignV) {
              try {
                if (!this.mWindows) {
                  this.mWindows = new Object();
                }
                this.mWindows[name] = new Object();
                this.mWindows[name]["Align"] = align;
                this.mWindows[name]["AlignV"] = alignV;
                this.mWindows[name]["x"] = x;
                this.mWindows[name]["y"] = y;
                this.mWindows[name]["w"] = w;
                this.mWindows[name]["h"] = h;
              } catch (e) {
                console.log("MaelstromTools.createNewWindow: ", e);
              }
            },

            addToMainMenu: function (name, button) {
              try {
                /*if(!this.useDedicatedMainMenu) {
                  return;
                }*/
                if (this.itemsInMainMenu[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                var isNotification = button.getUserData("isNotification");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                if (!isNotification) {
                  isNotification = false;
                }

                if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop(name, button);
                } else {
                  if (!this.itemsInMainMenuCount[desktopPosition]) {
                    this.itemsInMainMenuCount[desktopPosition] = 0;
                  }
                  this.mainMenuWindow.add(button, {
                    right: 5 + (52 * this.itemsInMainMenuCount[desktopPosition]),
                    top: 0 + (42 * (desktopPosition)) //bottom: 0 - (42 * (desktopPosition - 1))
                  });

                  this.itemsInMainMenu[name] = button;
                  this.itemsInMainMenuCount[desktopPosition]++;
                }
              } catch (e) {
                console.log("MaelstromTools.addToMainMenu: ", e);
              }
            },

            removeFromMainMenu: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                if (this.itemsOnDesktop[name] != null) {
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!isNotification) {
                    isNotification = false;
                  }
                  if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.removeFromDesktop(name, rearrange);
                  }
                } else if (this.itemsInMainMenu[name] != null) {
                  var desktopPosition = this.itemsInMainMenu[name].getUserData("desktopPosition");
                  var isNotification = this.itemsInMainMenu[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  this.mainMenuWindow.remove(this.itemsInMainMenu[name]);
                  this.itemsInMainMenu[name] = null;
                  this.itemsInMainMenuCount[desktopPosition]--;

                  if (rearrange && this.itemsInMainMenu[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsInMainMenu[itemName] == null) {
                        continue;
                      }
                      if (!isNotification) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsInMainMenu[itemName];
                      this.removeFromMainMenu(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            addToDesktop: function (name, button) {
              try {
                if (this.itemsOnDesktop[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }

                if (!this.itemsOnDesktopCount[desktopPosition]) {
                  this.itemsOnDesktopCount[desktopPosition] = 0;
                }

                var app = qx.core.Init.getApplication();
                //var navBar = app.getNavigationBar();

                // console.log("add to Desktop at pos: " + this.itemsOnDesktopCount);
                app.getDesktop().add(button, {
                  //right: navBar.getBounds().width + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: 42 * (desktopPosition - 1)
                  right: 5 + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: this.initialAppointmentBarHeight + 125 + (42 * (desktopPosition - 1))
                  bottom: 200 - (42 * (desktopPosition - 1))
                });

                this.itemsOnDesktop[name] = button;
                this.itemsOnDesktopCount[desktopPosition]++;
              } catch (e) {
                console.log("MaelstromTools.addToDesktop: ", e);
              }
            },

            removeFromDesktop: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                var app = qx.core.Init.getApplication();

                if (this.itemsOnDesktop[name] != null) {
                  var desktopPosition = this.itemsOnDesktop[name].getUserData("desktopPosition");
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  app.getDesktop().remove(this.itemsOnDesktop[name]);
                  this.itemsOnDesktop[name] = null;
                  this.itemsOnDesktopCount[desktopPosition]--;

                  if (rearrange && this.itemsOnDesktopCount[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsOnDesktop[itemName] == null) {
                        continue;
                      }
                      if (!this.itemsOnDesktop[itemName].getUserData("isNotification")) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsOnDesktop[itemName];
                      this.removeFromDesktop(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            runSecondlyTimer: function () {
              try {
                this.calculateCostsForNextMCV();

                var self = this;
                window.setTimeout(function () {
                  self.runSecondlyTimer();
                }, 1000);
              } catch (e) {
                console.log("MaelstromTools.runSecondlyTimer: ", e);
              }
            },

            runMainTimer: function () {
              try {
                this.checkForPackages();
                if (CCTAWrapperIsInstalled()) {
                  this.checkRepairAllUnits();
                  this.checkRepairAllBuildings();
                }

                var missionTracker = typeof (qx.core.Init.getApplication().getMissionsBar) === 'function' ? qx.core.Init.getApplication().getMissionsBar() : qx.core.Init.getApplication().getMissionTracker(); //fix for PerforceChangelist>=376877
                if (MT_Preferences.Settings.autoHideMissionTracker) {
                  if (missionTracker.isVisible()) {
                    missionTracker.hide();
                  }
                  if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                    if (qx.core.Init.getApplication().getMissionsBar().getSizeHint().height != 0) {
                      qx.core.Init.getApplication().getMissionsBar().getSizeHint().height = 0;
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                } else {
                  if (!missionTracker.isVisible()) {
                    missionTracker.show();
                    if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                      qx.core.Init.getApplication().getMissionsBar().initHeight();
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                }
                
                var self = this;
                window.setTimeout(function () {
                  self.runMainTimer();
                }, this.mainTimerInterval);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            runAutoCollectTimer: function () {
              try {
                //console.log("runAutoCollectTimer ", MT_Preferences.Settings.AutoCollectTimer);
                if (!CCTAWrapperIsInstalled()) return; // run timer only then wrapper is running
                if (this.checkForPackages() && MT_Preferences.Settings.autoCollectPackages) {
                  this.collectAllPackages();
                }
                if (this.checkRepairAllUnits() && MT_Preferences.Settings.autoRepairUnits) {
                  this.repairAllUnits();
                }
                if (this.checkRepairAllBuildings() && MT_Preferences.Settings.autoRepairBuildings) {
                  this.repairAllBuildings();
                }

                var self = this;
                window.setTimeout(function () {
                  self.runAutoCollectTimer();
                }, MT_Preferences.Settings.AutoCollectTimer * 60000);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            openWindow: function (windowObj, windowName, skipMoveWindow) {
              try {
                if (!windowObj.isVisible()) {
                  if (windowName == "MainMenu") {
                    windowObj.show();
                  } else {
                    if (!skipMoveWindow) {
                      this.moveWindow(windowObj, windowName);
                    }
                    windowObj.open();
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.openWindow: ", e);
              }
            },

            moveWindow: function (windowObj, windowName) {
              try {
                var x = this.mWindows[windowName]["x"];
                var y = this.mWindows[windowName]["y"];
                if (this.mWindows[windowName]["Align"] == "R") {
                  x = qx.bom.Viewport.getWidth(window) - this.mWindows[windowName]["x"];
                }
                if (this.mWindows[windowName]["AlignV"] == "B") {
                  y = qx.bom.Viewport.getHeight(window) - this.mWindows[windowName]["y"] - windowObj.height;
                }
                windowObj.moveTo(x, y);
                if (windowName != "MainMenu") {
                  windowObj.setHeight(this.mWindows[windowName]["h"]);
                  windowObj.setWidth(this.mWindows[windowName]["w"]);
                }
              } catch (e) {
                console.log("MaelstromTools.moveWindow: ", e);
              }
            },

            checkForPackages: function () {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    this.addToMainMenu("CollectAllResources", this.buttonCollectAllResources);
                    return true;
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkForPackages: ", e);
                return false;
              }
            },

            collectAllPackages: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    if (MT_Cache.CityCount <= 1) {
                      var buildings = ncity.get_Buildings().d;
                      for (var x in buildings) {
                        var building = buildings[x];
                        if (building.get_ProducesPackages() && building.get_ReadyToCollect()) {
                          ClientLib.Net.CommunicationManager.GetInstance().SendCommand("CollectResource",{cityid:ncity.get_Id(), posX:building.get_CoordX(),posY:building.get_CoordY()}, null, null, true);
                        }
                      }
                    } else {
                      ncity.CollectAllResources();
                    }
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
              } catch (e) {
                console.log("MaelstromTools.collectAllPackages: ", e);
              }
            },

            checkRepairAll: function (visMode, buttonName, button) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    this.addToMainMenu(buttonName, button);
                    return true;
                  }
                }

                this.removeFromMainMenu(buttonName);
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkRepairAll: ", e);
                return false;
              }
            },

            checkRepairAllUnits: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits", this.buttonRepairAllUnits);
            },

            checkRepairAllBuildings: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings", this.buttonRepairAllBuildings);
            },

            repairAll: function (visMode, buttonName) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    MaelstromTools.Wrapper.RepairAll(ncity, visMode);
                  }

                }
                this.removeFromMainMenu(buttonName);
              } catch (e) {
                console.log("MaelstromTools.repairAll: ", e);
              }
            },

            //ClientLib.Data.City.prototype.get_CityRepairData
            //ClientLib.Data.CityRepair.prototype.CanRepairAll
            //ClientLib.Data.CityRepair.prototype.RepairAll
            repairAllUnits: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits");
              } catch (e) {
                console.log("MaelstromTools.repairAllUnits: ", e);
              }
            },

            repairAllBuildings: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings");
              } catch (e) {
                console.log("MaelstromTools.repairAllBuildings: ", e);
              }
            },

            updateLoot: function (ident, visCity, widget) {
              try {
                clearInterval(this.lootStatusInfoInterval);
                if (!MT_Preferences.Settings.showLoot) {
                  if (this.lootWidget[ident]) {
                    this.lootWidget[ident].removeAll();
                  }
                  return;
                }

                var baseLoadState = MT_Cache.updateLoot(visCity);
                if (baseLoadState == -2) { // base already cached and base not changed
                  return;
                }

                if (!this.lootWidget) {
                  this.lootWidget = new Object();
                }
                if (!this.lootWidget[ident]) {
                  this.lootWidget[ident] = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                  this.lootWidget[ident].setTextColor("white");
                  widget.add(this.lootWidget[ident]);
                }
                var lootWidget = this.lootWidget[ident];

                var rowIdx = 1;
                var colIdx = 1;
                lootWidget.removeAll();
                switch (baseLoadState) {
                  case -1:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Ziel nicht in Reichweite", null, null, 'bold', null);
                      break;
                    }
                  case 1:
                    {
                      var Resources = MT_Cache.SelectedBaseResources;
                      this.createResourceLabels(lootWidget, ++rowIdx, "Mögliche Angriffe", Resources, - 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "Plünderbare Ressourcen", Resources, 1);
                      break;
                    }
                  default:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Scanne...", null, null, 'bold', null);
                      this.lootStatusInfoInterval = setInterval(function () {
                        MaelstromTools.Base.getInstance().updateLoot(ident, visCity, widget);
                      }, 100);
                      break;
                    }
                }
              } catch (e) {
                console.log("MaelstromTools.updateLoot: ", e);
              }
            },

            createResourceLabels: function (lootWidget, rowIdx, Label, Resources, Modifier) {
              var colIdx = 1;
              var font = (Modifier > 1 ? null : 'bold');

              if (Modifier == -1 && Resources.CPNeeded > 0) {
                Label = Lang.gt(Label) + ": " + Math.floor(ClientLib.Data.MainData.GetInstance().get_Player().GetCommandPointCount() / Resources.CPNeeded);
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Label, null, 'left', font, null, 9);
                return;
              }
              colIdx = 1;
              if (Modifier > 0) {
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Lang.gt(Label) + ":", null, null, font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Research));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Research] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Tiberium] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Crystal] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Dollar));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Dollar] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage("Sum"));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources["Total"] / Modifier), 50, 'right', font);
              }
            },

            mcvPopup: null,
            mcvPopupX : 0,
            mcvPopupY : 0,
            mcvTimerLabel: null,
            calculateCostsForNextMCV: function () {
              try {
                if (!MT_Preferences.Settings.showCostsForNextMCV) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }
                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                var cw = player.get_Faction();
                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                var cr = player.get_PlayerResearch();
                var cd = cr.GetResearchItemFomMdbId(cj);
                if (cd == null) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                if (!this.mcvPopup) {
                  this.mcvPopup = new qx.ui.window.Window("").set({
                    contentPadding : 0,
                    showMinimize : false,
                    showMaximize : false,
                    showClose : false,
                    resizable : false
                  });
                  this.mcvPopup.setLayout(new qx.ui.layout.VBox());
                  this.mcvPopup.addListener("move", function (e) {
                    var base = MaelstromTools.Base.getInstance();
                    var size = qx.core.Init.getApplication().getRoot().getBounds();
                    var value = size.width - e.getData().left;
                    base.mcvPopupX = value < 0 ? 150 : value;
                    value = size.height - e.getData().top;
                    base.mcvPopupY = value < 0 ? 70 : value;
                    MaelstromTools.LocalStorage.set("mcvPopup", {
                      x : base.mcvPopupX,
                      y : base.mcvPopupY
                    });
                  });
                  var font = qx.bom.Font.fromString('bold').set({
                    size: 20
                  });

                  this.mcvTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: 'red',
                    width: 155,
                    textAlign: 'center',
                    marginBottom : 5
                  });
                  this.mcvPopup.add(this.mcvTimerLabel);
                  var serverBar = qx.core.Init.getApplication().getServerBar().getBounds();
                  var pos = MaelstromTools.LocalStorage.get("mcvPopup", {
                      x : serverBar.width + 150,
                      y : 70
                    });
                  this.mcvPopupX = pos.x;
                  this.mcvPopupY = pos.y;
                  this.mcvPopup.open();
                }
                var size = qx.core.Init.getApplication().getRoot().getBounds();
                this.mcvPopup.moveTo(size.width - this.mcvPopupX, size.height - this.mcvPopupY);

                var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                var resourcesNeeded = new Array();
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                //var currentResearchPoints = player.get_ResearchPoints();

                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;

                if (creditGrowthPerHour == 0 || creditTimeLeftInHours <= 0) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                this.mcvPopup.setCaption(Lang.gt("Next MCV") + " ($ " + MaelstromTools.Wrapper.FormatNumbersCompact(creditsNeeded) + ")");
                this.mcvTimerLabel.setValue(MaelstromTools.Wrapper.FormatTimespan(creditTimeLeftInHours * 60 * 60));

                if (!this.mcvPopup.isVisible()) {
                  this.mcvPopup.open();
                }
              } catch (e) {
                console.log("calculateCostsForNextMCV", e);
              }
            }
          }
        });

        // define Preferences
        qx.Class.define("MaelstromTools.Preferences", {
          type: "singleton",
          extend: qx.core.Object,

          statics: {
            USEDEDICATEDMAINMENU: "useDedicatedMainMenu",
            AUTOCOLLECTPACKAGES: "autoCollectPackages",
            AUTOREPAIRUNITS: "autoRepairUnits",
            AUTOREPAIRBUILDINGS: "autoRepairBuildings",
            AUTOHIDEMISSIONTRACKER: "autoHideMissionTracker",
            AUTOCOLLECTTIMER: "AutoCollectTimer",
            SHOWLOOT: "showLoot",
            SHOWCOSTSFORNEXTMCV: "showCostsForNextMCV",
            CHATHISTORYLENGTH: "ChatHistoryLength"
          },

          members: {
            Window: null,
            Widget: null,
            Settings: null,
            FormElements: null,

            readOptions: function () {
              try {
                if (!this.Settings) {
                  this.Settings = new Object();
                }

                /*
                if(MaelstromTools.LocalStorage.get("useDedicatedMainMenu") == null) {
                  if(qx.bom.Viewport.getWidth(window) > 1800) {
                    this.Settings["useDedicatedMainMenu"] = false;
                  }
                } else {
                  this.Settings["useDedicatedMainMenu"] = (MaelstromTools.LocalStorage.get("useDedicatedMainMenu", 1) == 1);
                }*/
                this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRUNITS, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 60);
                this.Settings[MaelstromTools.Preferences.SHOWLOOT] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWLOOT, 1) == 1);
                this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, 0) == 1);
                this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 128);

                if (!CCTAWrapperIsInstalled()) {
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = false;
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = false;
                  //this.Settings[MaelstromTools.Preferences.SHOWLOOT] = false;
                }
                //console.log(this.Settings);

              } catch (e) {
                console.log("MaelstromTools.Preferences.readOptions: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  //this.Window = new qx.ui.window.Window(WindowTitle).set({
                  this.Window = new webfrontend.gui.OverlayWindow().set({
                    autoHide: false,
                    title: WindowTitle,
                    minHeight: 350

                    //resizable: false,
                    //showMaximize:false,
                    //showMinimize:false,
                    //allowMaximize:false,
                    //allowMinimize:false,
                    //showStatusbar: false
                  });
                  this.Window.clientArea.setPadding(10);
                  this.Window.clientArea.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid().set({
                    spacingX: 5,
                    spacingY: 5
                  }));

                  //this.Widget.setTextColor("white");

                  this.Window.clientArea.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.setWidgetLabels();
                }
              } catch (e) {
                console.log("MaelstromTools.Preferences.openWindow: ", e);
              }
            },

            addFormElement: function (name, element) {
              this.FormElements[name] = element;
            },

            setWidgetLabels: function () {
              try {
                this.readOptions();

                this.FormElements = new Object();
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 1;

                var chkAutoHideMissionTracker = new qx.ui.form.CheckBox(Lang.gt("Hide Mission Tracker")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] == 1
                });
                var chkUseDedicatedMainMenu = new qx.ui.form.CheckBox(Lang.gt("Use dedicated Main Menu (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] == 1
                });
                var chkShowLoot = new qx.ui.form.CheckBox(Lang.gt("Show lootable resources (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWLOOT] == 1/*,
                  enabled: CCTAWrapperIsInstalled()*/
                });
                var chkCostsNextMCV = new qx.ui.form.CheckBox(Lang.gt("Show time to next MCV")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] == 1
                });
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoHideMissionTracker, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkUseDedicatedMainMenu, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkShowLoot, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkCostsNextMCV, 2);

                var chkAutoCollectPackages = new qx.ui.form.CheckBox(Lang.gt("Autocollect packages")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] == 1
                });
                var chkAutoRepairUnits = new qx.ui.form.CheckBox(Lang.gt("Autorepair units")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });
                var chkAutoRepairBuildings = new qx.ui.form.CheckBox(Lang.gt("Autorepair buildings")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });

                var spinnerChatHistoryLength = new qx.ui.form.Spinner().set({
                  minimum: 64,
                  maximum: 512,
                  value: this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Chat history length") + " (" + spinnerChatHistoryLength.getMinimum() + " - " + spinnerChatHistoryLength.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerChatHistoryLength);

                var spinnerAutoCollectTimer = new qx.ui.form.Spinner().set({
                  minimum: 5,
                  maximum: 60 * 6,
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Automatic interval in minutes") + " (" + spinnerAutoCollectTimer.getMinimum() + " - " + spinnerAutoCollectTimer.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerAutoCollectTimer);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoCollectPackages, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairUnits, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairBuildings, 2);

                var applyButton = new qx.ui.form.Button(Lang.gt("Apply changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                applyButton.addListener("execute", this.applyChanges, this);

                var cancelButton = new qx.ui.form.Button(Lang.gt("Discard changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                cancelButton.addListener("execute", function () {
                  this.Window.close();
                }, this);

                var resetButton = new qx.ui.form.Button(Lang.gt("Reset to default")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                resetButton.addListener("execute", this.resetToDefault, this);

                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, resetButton);
                colIdx = 1;
                MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, cancelButton);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, applyButton);

                this.addFormElement(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, chkAutoHideMissionTracker);
                this.addFormElement(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, chkUseDedicatedMainMenu);
                this.addFormElement(MaelstromTools.Preferences.SHOWLOOT, chkShowLoot);
                this.addFormElement(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, chkCostsNextMCV);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, chkAutoCollectPackages);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRUNITS, chkAutoRepairUnits);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, chkAutoRepairBuildings);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTTIMER, spinnerAutoCollectTimer);
                this.addFormElement(MaelstromTools.Preferences.CHATHISTORYLENGTH, spinnerChatHistoryLength);
              } catch (e) {
                console.log("MaelstromTools.Preferences.setWidgetLabels: ", e);
              }
            },

            applyChanges: function () {
              try {
                var autoRunNeeded = false;
                for (var idx in this.FormElements) {
                  var element = this.FormElements[idx];
                  if (idx == MaelstromTools.Preferences.AUTOCOLLECTTIMER) {
                    autoRunNeeded = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 0) != element.getValue());
                  }
                  if (idx == MaelstromTools.Preferences.CHATHISTORYLENGTH) {
                    webfrontend.gui.chat.ChatWidget.recvbufsize = element.getValue();
                  }
                  MaelstromTools.LocalStorage.set(idx, element.getValue());
                }
                this.readOptions();
                if (autoRunNeeded) {
                  MT_Base.runAutoCollectTimer();
                }
                this.Window.close();
              } catch (e) {
                console.log("MaelstromTools.Preferences.applyChanges: ", e);
              }
            },

            resetToDefault: function () {
              try {
                MaelstromTools.LocalStorage.clearAll();
                this.setWidgetLabels();
              } catch (e) {
                console.log("MaelstromTools.Preferences.resetToDefault: ", e);
              }
            }
          }
        });

        // define DefaultObject
        qx.Class.define("MaelstromTools.DefaultObject", {
          type: "abstract",
          extend: qx.core.Object,
          members: {
            Window: null,
            Widget: null,
            Cache: {}, //k null
            IsTimerEnabled: true,

            calc: function () {
              try {
                if (this.Window.isVisible()) {
                  this.updateCache();
                  this.setWidgetLabels();
                  if (this.IsTimerEnabled) {
                    var self = this;
                    window.setTimeout(function () {
                      self.calc();
                    }, MT_Base.timerInterval);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.calc: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  this.Window = new qx.ui.window.Window(WindowTitle).set({
                    resizable: false,
                    showMaximize: false,
                    showMinimize: false,
                    allowMaximize: false,
                    allowMinimize: false,
                    showStatusbar: false
                  });
                  this.Window.setPadding(10);
                  this.Window.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid());
                  this.Widget.setTextColor("white");

                  this.Window.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.calc();
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.openWindow: ", e);
              }
            }
          }
        });

        // define Production
        qx.Class.define("MaelstromTools.Production", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            updateCache: function (onlyForCity) {
              try {
                MT_Cache.updateCityCache();
                var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                //this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  if (onlyForCity != null && onlyForCity != cname) {
                    continue;
                  }
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (typeof (this.Cache[cname]) !== 'object') this.Cache[cname] = {};
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Tiberium]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Tiberium] = {}; // all have to be checked, 
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Crystal]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Crystal] = {}; // this.Cache[cname] can be created inside different namespaces
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Power]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Power] = {}; // like the RepairTime etc... without those objs
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Dollar]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Dollar] = {};

                  this.Cache[cname]["ProductionStopped"] = ncity.get_IsGhostMode();
                  this.Cache[cname]["PackagesStopped"] = (ncity.get_hasCooldown() || ncity.get_IsGhostMode());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false); // (production.d[ClientLib.Base.EResourceType.Tiberium]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium); //(production.d[ClientLib.Base.EResourceType.Tiberium]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false); //(production.d[ClientLib.Base.EResourceType.Crystal]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal); //(production.d[ClientLib.Base.EResourceType.Crystal]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Power]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false); //(production.d[ClientLib.Base.EResourceType.Power]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power); // (production.d[ClientLib.Base.EResourceType.Power]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["Delta"] = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["ExtraBonusDelta"] = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["POI"] = 0;
                  this.Cache[cname]["BaseLevel"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  if (onlyForCity != null && onlyForCity == cname) return this.Cache[cname];
                }
              } catch (e) {
                console.log("MaelstromTools.Production.updateCache: ", e);
              }
            },

            createProductionLabels2: function (rowIdx, colIdx, cityName, resourceType) {
              try {
                if (cityName == "-Total-") {
                  var Totals = Object();
                  Totals["Delta"] = 0;
                  Totals["ExtraBonusDelta"] = 0;
                  Totals["POI"] = 0;
                  Totals["Total"] = 0;

                  for (var cname in this.Cache) {
                    Totals["Delta"] += this.Cache[cname][resourceType]['Delta'];
                    Totals["ExtraBonusDelta"] += this.Cache[cname][resourceType]['ExtraBonusDelta'];
                    Totals["POI"] += this.Cache[cname][resourceType]['POI'];
                  }
                  Totals["Total"] = Totals['Delta'] + Totals['ExtraBonusDelta'] + Totals['POI'];

                  rowIdx++;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Delta']), 80, 'right', 'bold');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['ExtraBonusDelta']), 80, 'right', 'bold');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['POI']), 80, 'right', 'bold');
                  } else {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Total']), 80, 'right', 'bold');
                } else if (cityName == "-Labels-") {
                  MaelstromTools.Util.addImage(this.Widget, rowIdx++, colIdx, MaelstromTools.Util.getImage(resourceType));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Continuous", 100, 'left');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Bonus", 100, 'left');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "POI", 100, 'left');
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / BaseLevel", 100, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / h", 100, 'left');
                } else {
                  var cityCache = this.Cache[cityName];
                  if (rowIdx > 2) {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta']), 80, 'right', null, ((cityCache["ProductionStopped"] || cityCache[resourceType]['Delta'] == 0) ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['ExtraBonusDelta']), 80, 'right', null, ((cityCache["PackagesStopped"] || cityCache[resourceType]['ExtraBonusDelta'] == 0) ? "red" : "white"));
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['POI']), 80, 'right', null, (cityCache[resourceType]['POI'] == 0 ? "red" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact((cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']) / cityCache["BaseLevel"]), 80, 'right');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']), 80, 'right', 'bold');
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.Production.createProductionLabels2: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var rowIdx = 1;
                var colIdx = 1;

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Dollar);

                colIdx++;
                for (var cityName in this.Cache) {
                  rowIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, cityName, 80, 'right');

                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Tiberium);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Crystal);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Power);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Dollar);

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                }

                rowIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Total / h", 80, 'right', 'bold');

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Dollar);
              } catch (e) {
                console.log("MaelstromTools.Production.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define RepairTime
        qx.Class.define("MaelstromTools.RepairTime", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var RepLargest = '';

                  this.Cache[cname] = Object();
                  this.Cache[cname]["RepairTime"] = Object();
                  this.Cache[cname]["Repaircharge"] = Object();
                  this.Cache[cname]["Repaircharge"]["Smallest"] = 999999999;
                  this.Cache[cname]["RepairTime"]["Largest"] = 0;

                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                  this.Cache[cname]["RepairTime"]["Maximum"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);

                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft];
                  }

                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry];
                    RepLargest = "Infantry";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle];
                    RepLargest = "Vehicle";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft];
                    RepLargest = "Aircraft";
                  }

                  //PossibleAttacks and MaxAttacks fixes
                  var offHealth = ncity.GetOffenseConditionInPercent();
                  if (RepLargest !== '') {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = this.Cache[cname]["RepairTime"][RepLargest];
                    var i = Math.ceil(this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv); //fix
                    var j = this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv;
                    if (offHealth !== 100) { i--; i += '*';} // Decrease number of attacks by 1 when unit unhealthy. Additional visual info: asterisk when units aren't healthy
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = i;
                    var k = this.Cache[cname]["RepairTime"].Maximum / this.Cache[cname]["RepairTime"].LargestDiv;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = Math.ceil(k); //fix
                  } else {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = 0;
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = 0;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = 0;
                  }

                  var unitsData = ncity.get_CityUnitsData();
                  this.Cache[cname]["Base"] = Object();
                  this.Cache[cname]["Base"]["Level"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  this.Cache[cname]["Base"]["UnitLimit"] = ncity.GetBuildingSlotLimit(); //ncity.GetNumBuildings();
                  this.Cache[cname]["Base"]["TotalHeadCount"] = ncity.GetBuildingSlotCount();
                  this.Cache[cname]["Base"]["FreeHeadCount"] = this.Cache[cname]["Base"]["UnitLimit"] - this.Cache[cname]["Base"]["TotalHeadCount"];
                  this.Cache[cname]["Base"]["HealthInPercent"] = ncity.GetBuildingsConditionInPercent();

                  this.Cache[cname]["Offense"] = Object();
                  this.Cache[cname]["Offense"]["Level"] = (Math.floor(ncity.get_LvlOffense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Offense"]["UnitLimit"] = unitsData.get_UnitLimitOffense();
                  this.Cache[cname]["Offense"]["TotalHeadCount"] = unitsData.get_TotalOffenseHeadCount();
                  this.Cache[cname]["Offense"]["FreeHeadCount"] = unitsData.get_FreeOffenseHeadCount();
                  this.Cache[cname]["Offense"]["HealthInPercent"] = offHealth > 0 ? offHealth : 0;

                  this.Cache[cname]["Defense"] = Object();
                  this.Cache[cname]["Defense"]["Level"] = (Math.floor(ncity.get_LvlDefense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Defense"]["UnitLimit"] = unitsData.get_UnitLimitDefense();
                  this.Cache[cname]["Defense"]["TotalHeadCount"] = unitsData.get_TotalDefenseHeadCount();
                  this.Cache[cname]["Defense"]["FreeHeadCount"] = unitsData.get_FreeDefenseHeadCount();
                  this.Cache[cname]["Defense"]["HealthInPercent"] = ncity.GetDefenseConditionInPercent() > 0 ? ncity.GetDefenseConditionInPercent() : 0;

                  //console.log(ncity.get_CityUnitsData().get_UnitLimitOffense() + " / " + ncity.get_CityUnitsData().get_TotalOffenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeOffenseHeadCount());
                  //console.log(ncity.get_CityUnitsData().get_UnitLimitDefense() + " / " + ncity.get_CityUnitsData().get_TotalDefenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeDefenseHeadCount());
                }
              } catch (e) {
                console.log("MaelstromTools.RepairTime.updateCache: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;

                rowIdx = this.createOverviewLabels(rowIdx);
                rowIdx = this.createRepairchargeLabels(rowIdx);
              } catch (e) {
                console.log("MaelstromTools.RepairTime.setWidgetLabels: ", e);
              }
            },

            createRepairchargeLabels: function (rowIdx) {
              try {
                var colIdx = 2;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx++, "Repaircharges", null, 'left', null, null, 3);
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Infantry, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Vehicle, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Aircraft, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Repairtime", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Attacks", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Next at", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Max+1 at", 80, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  if (cityCache.Offense.UnitLimit == 0) {
                    continue;
                  }
                  colIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Infantry), 60, 'right', null, (cityCache.RepairTime.Infantry == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Vehicle), 60, 'right', null, (cityCache.RepairTime.Vehicle == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Aircraft), 60, 'right', null, (cityCache.RepairTime.Aircraft == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.Repaircharge.Smallest), 80, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.RepairTime.PossibleAttacks + " / " + cityCache.RepairTime.MaxAttacks, 60, 'right', null, (cityCache.Offense.HealthInPercent !== 100 ? 'red' : null)); // mark red when unhealthy
                    var i = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.PossibleAttacks;
                    var j = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.MaxAttacks;
                    (i>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(i), 80, 'right', null, (i > cityCache.RepairTime.Maximum ? "yellow" : "white")) : colIdx++; /// yellow if more than Maximum RT
                    (j>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(j), 80, 'right') : colIdx++;
                  } else {
                    colIdx += 7;
                  }

                  colIdx += 4;
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName, PerforceChangelist >= 376877 ? ClientLib.Data.PlayerAreaViewMode.pavmPlayerOffense : webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense));
                  rowIdx += 2;
                }

                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createRepairchargeLabels: ", e);
              }
            },

            createOverviewLabels: function (rowIdx) {
              try {
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Base", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Defense", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Army", 60, 'right');

                rowIdx++;
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Units", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.Level, 60, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.TotalHeadCount + " / " + cityCache.Base.UnitLimit, 60, 'right', null, (cityCache.Base.FreeHeadCount >= 1 ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.HealthInPercent + "%", 60, 'right', null, (cityCache.Base.HealthInPercent < 25 ? "red" : (cityCache.Base.HealthInPercent < 100 ? "yellow" : "white")));

                  if (cityCache.Defense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.TotalHeadCount + " / " + cityCache.Defense.UnitLimit, 60, 'right', null, (cityCache.Defense.FreeHeadCount >= 5 ? "red" : (cityCache.Defense.FreeHeadCount >= 3 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.HealthInPercent + "%", 60, 'right', null, (cityCache.Defense.HealthInPercent < 25 ? "red" : (cityCache.Defense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.TotalHeadCount + " / " + cityCache.Offense.UnitLimit, 60, 'right', null, (cityCache.Offense.FreeHeadCount >= 10 ? "red" : (cityCache.Offense.FreeHeadCount >= 5 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.HealthInPercent + "%", 60, 'right', null, (cityCache.Offense.HealthInPercent < 25 ? "red" : (cityCache.Offense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx += 2;
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createOverviewLabels: ", e);
              }
            }

          }
        });

        // define ResourceOverview
        qx.Class.define("MaelstromTools.ResourceOverview", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            Table: null,
            Model: null,

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var mtime = ClientLib.Data.MainData.GetInstance().get_Time();

                  this.Cache[cname] = Object();
                  this.Cache[cname][MaelstromTools.Statics.Tiberium] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Tiberium));
                  this.Cache[cname][MaelstromTools.Statics.Crystal] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Crystal));
                  this.Cache[cname][MaelstromTools.Statics.Power] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Power));
                }

              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.updateCache: ", e);
              }
            },
/*
            setWidgetLabelsTable: function () {
              try {
                if (!this.Table) {
                  this.Widget.setLayout(new qx.ui.layout.HBox());

                  this.Model = new qx.ui.table.model.Simple();
                  this.Model.setColumns(["City", "Tib. Storage", "Tiberium", "Full", "Crystal", "Full", "Power", "Storage", "Full"]);
                  this.Table = new qx.ui.table.Table(this.Model);
                  this.Widget.add(this.Table, {
                    flex: 1
                  });
                }

                var Totals = Object();
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                var rowData = [];

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];

                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  rowData.push([
                    cityName,
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full'])
                    ]);
                }
                rowData.push([
                  'Total resources',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']),
                  ''
                  ]);

                this.Model.setData(rowData);
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            },

            */
            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var first = true;
                var rowIdx = 2;
                var Totals = Object();
                var colIdx = 1;
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left');
                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Max. storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right');

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= cityCache[MaelstromTools.Statics.Tiberium + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Tiberium] < cityCache[MaelstromTools.Statics.Tiberium + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }
                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= cityCache[MaelstromTools.Statics.Crystal + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Crystal] < cityCache[MaelstromTools.Statics.Crystal + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Power));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= cityCache[MaelstromTools.Statics.Power + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white")));

                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']), 80, 'right');

                  if (cityCache[MaelstromTools.Statics.Power] < cityCache[MaelstromTools.Statics.Power + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }


                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx++;
                  first = false;
                }

                colIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Total resources", 100, 'left', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Tiberium] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Crystal] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Power] / Totals[MaelstromTools.Statics.Power + 'Max'] * 100) + '%', 100, 'center', 'bold');
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define BaseStatus
        qx.Class.define("MaelstromTools.BaseStatus", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            CityMenuButtons: null,

            //City.SetDedicatedSupport
            //City.RecallDedicatedSupport
            //City.get_SupportDedicatedBaseId
            //System.String get_SupportDedicatedBaseName ()
            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var player = ClientLib.Data.MainData.GetInstance().get_Player();
                  var supportData = ncity.get_SupportData();
                  //System.String get_PlayerName ()
                  this.Cache[cname] = Object();
                  // Movement lock
                  this.Cache[cname]["HasCooldown"] = ncity.get_hasCooldown();
                  this.Cache[cname]["CooldownEnd"] = Math.max(ncity.get_MoveCooldownEndStep(), ncity.get_MoveRestictionEndStep());
                  this.Cache[cname]["MoveCooldownEnd"] = ncity.get_MoveCooldownEndStep();
                  this.Cache[cname]["MoveLockdownEnd"] = ncity.get_MoveRestictionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_isProtected();
                  this.Cache[cname]["ProtectionEnd"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsAlerted"] = ncity.get_isAlerted();

                  // Supportweapon
                  if (supportData == null) {
                    this.Cache[cname]["HasSupportWeapon"] = false;
                  } else {
                    this.Cache[cname]["HasSupportWeapon"] = true;
                    if (ncity.get_SupportDedicatedBaseId() > 0) {
                      this.Cache[cname]["SupportedCityId"] = ncity.get_SupportDedicatedBaseId();
                      this.Cache[cname]["SupportedCityName"] = ncity.get_SupportDedicatedBaseName();
                      var coordId = ncity.get_SupportDedicatedBaseCoordId();
                      this.Cache[cname]["SupportedCityX"] = (coordId & 0xffff);
                      this.Cache[cname]["SupportedCityY"] = ((coordId >> 0x10) & 0xffff);
                      /*
                      var cityX = ncity.get_PosX();
                      var cityY = ncity.get_PosY();
                      
                      var mainData = ClientLib.Data.MainData.GetInstance();
                      var visRegion = ClientLib.Vis.VisMain.GetInstance().get_Region();

                      var gridW = visRegion.get_GridWidth();
                      var gridH = visRegion.get_GridHeight();
                      //console.log(cname);
                      //console.log("x: " + cityX + " y: " + cityY);

                      var worldObj = visRegion.GetObjectFromPosition((this.Cache[cname]["SupportedCityX"]*gridW), (this.Cache[cname]["SupportedCityY"]*gridH));
                      
                      //ClientLib.Vis.Region.RegionCity
                      if (worldObj == null) {
                        this.Cache[cname]["SupportTime"] = "";
                      } else {
                        console.log(cname);
                        //console.log(worldObj.CalibrationSupportDuration());
                        var weaponState = worldObj.get_SupportWeaponStatus();
                        
                        //console.log(this.calcDuration(ncity, worldObj));
                        var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                        cities.set_CurrentOwnCityId(ncity.get_Id());
                        var status = worldObj.get_SupportWeaponStatus();
                        var server = mainData.get_Server();
                        //console.log(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()));
                        console.log(status);
                        console.log(currStep);
                        this.Cache[cname]["SupportTime"] = mainData.get_Time().GetTimespanString(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()), currStep);
                        //status.Status&ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating)==ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating
                        var currStep = ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep();
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, status.CalibrationEndStep) - currStep), false);
                        //this.Cache[cname]["SupportTime"] = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(weaponState.CalibrationEndStep, currStep);
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()) - currStep)), false);
                      //console.log(this.Cache[cname]["SupportTime"]);
                      }
                       */
                    } else { // prevent reference to undefined property ReferenceError
                      this.Cache[cname]["SupportedCityId"] = null;
                      this.Cache[cname]["SupportedCityName"] = null;
                      this.Cache[cname]["SupportedCityX"] = null;
                      this.Cache[cname]["SupportedCityY"] = null;
                    }
                    this.Cache[cname]["SupportRange"] = MaelstromTools.Wrapper.GetSupportWeaponRange(ncity.get_SupportWeapon());
                    var techName = ClientLib.Base.Tech.GetTechNameFromTechId(supportData.get_Type(), player.get_Faction());
                    this.Cache[cname]["SupportName"] = ClientLib.Base.Tech.GetProductionBuildingNameFromFaction(techName, player.get_Faction());
                    this.Cache[cname]["SupportLevel"] = supportData.get_Level();
                    //this.Cache[cname]["SupportBuilding"] = ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName);
                    //console.log(this.Cache[cname]["SupportBuilding"]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.updateCache: ", e);
              }
            },
            /*
            calcDuration: function(currOwnCity, regionCity) {
              var targetCity = MaelstromTools.Wrapper.GetCity(regionCity.get_Id());
              
              var supportBase=regionCity.get_SupportData();
              if(supportBase == null)
              {
                return -1;
              }
              var weapon=regionCity.get_SupportWeapon();
              if(weapon == null)
              {
                return -1;
              }
              if(currOwnCity.get_Id() == regionCity.get_Id())
              {
                if(supportBase.get_Magnitude() == 0) {
                  return -1;
                }
                return 0;
              }
              var dx=(currOwnCity.get_X() - targetCity.get_PosX());
              var dy=(currOwnCity.get_Y() - targetCity.get_PosY());
              var distance=((dx * dx) + (dy * dy));
              return Math.floor((weapon.pt + (weapon.tpf * Math.floor((Math.sqrt(distance) + 0.5)))));
            },*/

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Cooldown", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Protection", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Available weapon", 140, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Calibrated on", 140, 'left');

                //colIdx++;
                var rowIdxRecall = rowIdx;
                var colIdxRecall = 0;
                var supportWeaponCount = 0;

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left', null, (cityCache.IsAlerted ? 'red' : null));

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.CooldownEnd), 70, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.ProtectionEnd), 70, 'right');

                  if (!cityCache.HasSupportWeapon) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "none", 140, 'left');
                    colIdx += 2;
                  } else {
                    supportWeaponCount++;
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportName + " (" + cityCache.SupportLevel + ")", 140, 'left');

                    if (cityCache.SupportedCityId > 0) {
                      MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportedCityName, 140, 'left');
                      colIdxRecall = colIdx;
                      MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, this.getRecallButton(cityName));
                    } else {
                      colIdx += 2;
                    }
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getFocusBaseButton(cityName));

                  rowIdx++;
                }

                if (supportWeaponCount > 0 && colIdxRecall > 0) {
                  MaelstromTools.Util.addElement(this.Widget, rowIdxRecall, colIdxRecall, this.getRecallAllButton());
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.setWidgetLabels: ", e);
              }
            },

            getRecallAllButton: function () {
              var button = new qx.ui.form.Button("Recall all").set({
                appearance: "button-text-small",
                toolTipText: "Recall all support weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallAllSupport();
              }, this);
              return button;
            },

            getRecallButton: function (cityName) {
              var button = new qx.ui.form.Button("Recall").set({
                appearance: "button-text-small",
                toolTipText: "Recall support to " + cityName,
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallSupport(cityName);
              }, this);
              return button;
            }
            /*
            getCalibrateAllOnSelectedBaseButton: function() {
              var button = new qx.ui.form.Button("Calibrate all weapons on selected base").set({
                appearance: "button-text-small",
                toolTipText: "Calibrate all weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function(e){
                Util.calibrateWholeSupport(ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId());
              }, this);
              return button;
            }*/


          }
        });

        // define Statics
        qx.Class.define("MaelstromTools.Statics", {
          type: "static",
          statics: {
            Tiberium: 'Tiberium',
            Crystal: 'Crystal',
            Power: 'Power',
            Dollar: 'Dollar',
            Research: 'Research',
            Vehicle: "Vehicle",
            Aircraft: "Aircraft",
            Infantry: "Infantry",

            LootTypeName: function (ltype) {
              switch (ltype) {
                case ClientLib.Base.EResourceType.Tiberium:
                  return MaelstromTools.Statics.Tiberium;
                  break;
                case ClientLib.Base.EResourceType.Crystal:
                  return MaelstromTools.Statics.Crystal;
                  break;
                case ClientLib.Base.EResourceType.Power:
                  return MaelstromTools.Statics.Power;
                  break;
                case ClientLib.Base.EResourceType.Gold:
                  return MaelstromTools.Statics.Dollar;
                  break;
                default:
                  return "";
                  break;
              }
            }
          }
        });

        // define Util
        //ClientLib.Data.Cities.prototype.GetCityByCoord
        //ClientLib.Data.City.prototype.get_HasIncommingAttack
        qx.Class.define("MaelstromTools.Util", {
          type: "static",
          statics: {
            ArrayUnique: function (array) {
              var o = {};
              var l = array.length;
              r = [];
              for (var i = 0; i < l; i++) o[array[i]] = array[i];
              for (var i in o) r.push(o[i]);
              return r;
            },

            ArraySize: function (array) {
              var size = 0;
              for (var key in array)
              if (array.hasOwnProperty(key)) size++;
              return size;
            },

            addLabel: function (widget, rowIdx, colIdx, value, width, textAlign, font, color, colSpan) {
              try {
                var label = new qx.ui.basic.Label().set({
                  value: Lang.gt(value)
                });
                if (width) {
                  label.setWidth(width);
                }
                if (textAlign) {
                  label.setTextAlign(textAlign);
                }
                if (color) {
                  label.setTextColor(color);
                }
                if (font) {
                  label.setFont(font);
                }
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }

                widget.add(label, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addLabel: ", e);
              }
            },

            addElement: function (widget, rowIdx, colIdx, element, colSpan) {
              try {
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }
                widget.add(element, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addElement: ", e);
              }
            },

            addImage: function (widget, rowIdx, colIdx, image) {
              try {
                widget.add(image, {
                  row: rowIdx,
                  column: colIdx
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addImage: ", e);
              }
            },

            getImage: function (name) {
              var image = new qx.ui.basic.Image(MT_Base.images[name]);
              image.setScale(true);
              image.setWidth(20);
              image.setHeight(20);
              return image;
            },

            getAccessBaseButton: function (cityName, viewMode) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["AccessBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Access") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.setUserData("viewMode", viewMode);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.accessBase(e.getTarget().getUserData("cityId"), e.getTarget().getUserData("viewMode"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getAccessBaseButton: ", e);
              }
            },

            getFocusBaseButton: function (cityName) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["FocusBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Focus on") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.focusBase(e.getTarget().getUserData("cityId"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getFocusBaseButton: ", e);
              }
            },

            accessBase: function (cityId, viewMode) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    if (viewMode) {
                      webfrontend.gui.UtilView.openVisModeInMainWindow(viewMode, cityId, false);
                    } else {
                      webfrontend.gui.UtilView.openCityInMainWindow(cityId);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.accessBase: ", e);
              }
            },
            focusBase: function (cityId) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cityId);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.focusBase: ", e);
              }
            },

            recallSupport: function (cityName) {
              try {
                var ncity = MT_Cache.Cities[cityName]["Object"];
                ncity.RecallDedicatedSupport();
              } catch (e) {
                console.log("MaelstromTools.Util.recallSupport: ", e);
              }
            },

            recallAllSupport: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  ncity.RecallDedicatedSupport();
                }
              } catch (e) {
                console.log("MaelstromTools.Util.recallAllSupport: ", e);
              }
            },

            checkIfSupportIsAllowed: function (selectedBase) {
              try {
                if (selectedBase.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.RegionCityType) {
                  return false;
                }
                if (selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Own && selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance) {
                  return false;
                }
                return true;
              } catch (e) {
                console.log("MaelstromTools.Util.checkIfSupportIsAllowed: ", e);
                return false;
              }
            },

            calibrateWholeSupportOnSelectedBase: function () {
              if (this.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu)) {
                this.calibrateWholeSupport(MT_Cache.SelectedBaseForMenu);
              }
            },

            calibrateWholeSupport: function (targetRegionCity) {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  //var targetCity = MaelstromTools.Wrapper.GetCity(targetCityId);
                  var weapon = ncity.get_SupportWeapon();

                  //console.log("checking support weapon for " + ncity.get_Name() + " calibrating on " + targetRegionCity.get_Name());

                  if (targetRegionCity != null && weapon != null) {
                    //console.log("city at " + ncity.get_X() + " / " + ncity.get_Y());
                    //console.log("targetRegionCity at " + targetRegionCity.get_RawX() + " / " + targetRegionCity.get_RawY());
                    //var distance = ClientLib.Base.Util.CalculateDistance(ncity.get_X(), ncity.get_Y(), targetRegionCity.get_RawX(), targetRegionCity.get_RawY());
                    var dx = (ncity.get_X() - targetRegionCity.get_RawX());
                    var dy = (ncity.get_Y() - targetRegionCity.get_RawY());
                    var distance = ((dx * dx) + (dy * dy));
                    var range = MaelstromTools.Wrapper.GetSupportWeaponRange(weapon);
                    //console.log("distance is " + distance);
                    //console.log("range isy " + range*range);
                    if (distance <= (range * range)) {
                      ncity.SetDedicatedSupport(targetRegionCity.get_Id());
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.calibrateWholeSupport: ", e);
              }
            },

            // visCity : ClientLib.Vis.Region.RegionObject
            getResources: function (visCity) { // to verifier against PerforceChangelist>=376877
              try {
                var loot = new Object();
                if (visCity.get_X() < 0 || visCity.get_Y() < 0) {
                  loot["LoadState"] = 0;
                  return loot;
                }
                var currentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                var distance = ClientLib.Base.Util.CalculateDistance(currentOwnCity.get_X(), currentOwnCity.get_Y(), visCity.get_RawX(), visCity.get_RawY());
                var maxAttackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
                if (distance > maxAttackDistance) {
                  loot["LoadState"] = -1;
                  return loot;
                }

                var ncity = MaelstromTools.Wrapper.GetCity(visCity.get_Id());
                /* ClientLib.Data.CityBuildings */
                //var cityBuildings = ncity.get_CityBuildingsData();
                var cityUnits = ncity.get_CityUnitsData();

                //var buildings = MaelstromTools.Wrapper.GetBuildings(cityBuildings);
                var buildings = ncity.get_Buildings().d;
                var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits(cityUnits);
                //var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits();

                /*for(var u in buildings) {
              console.log(buildings[u].get_MdbBuildingId());
              console.log("----------------");
            }*/

                var buildingLoot = MaelstromTools.Util.getResourcesPart(buildings);
                //var buildingLoot2 = MaelstromTools.Util.getResourcesPart(this.collectBuildings(ncity));

                var unitLoot = MaelstromTools.Util.getResourcesPart(defenseUnits);

                loot[MaelstromTools.Statics.Tiberium] = buildingLoot[ClientLib.Base.EResourceType.Tiberium] + unitLoot[ClientLib.Base.EResourceType.Tiberium];
                loot[MaelstromTools.Statics.Crystal] = buildingLoot[ClientLib.Base.EResourceType.Crystal] + unitLoot[ClientLib.Base.EResourceType.Crystal];
                loot[MaelstromTools.Statics.Dollar] = buildingLoot[ClientLib.Base.EResourceType.Gold] + unitLoot[ClientLib.Base.EResourceType.Gold];
                loot[MaelstromTools.Statics.Research] = buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + unitLoot[ClientLib.Base.EResourceType.ResearchPoints];
                loot["Factor"] = loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar] + loot[MaelstromTools.Statics.Research];
                loot["CPNeeded"] = currentOwnCity.CalculateAttackCommandPointCostToCoord(ncity.get_X(), ncity.get_Y());
                loot["LoadState"] = (loot["Factor"] > 0 ? 1 : 0);
                loot["Total"] = loot[MaelstromTools.Statics.Research] + loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar];

                /*console.log("Building loot");
                console.log( buildingLoot[ClientLib.Base.EResourceType.Tiberium] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Tiberium]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Crystal] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Crystal]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Gold] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Gold]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.ResearchPoints]);
                console.log("-------------");*/
                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResources", e);
              }
            },
            /*
            collectBuildings: function(ncity) {
              var cityBuildings = ncity.get_CityBuildingsData();
              var buildings = new Array();
              var count = 0;
              // ncity.GetNumBuildings()
              for(var i = 0; i < 100000; i++) {
                var building = cityBuildings.GetBuildingByMDBId(i);
                if(!building) {
                  continue;
                }
                
                //console.log(building.get_TechName() + " - " + ncity.get_CityFaction() + " - " + ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(building.get_TechName(), ncity.get_CityFaction()) + " at lvl " + building.get_CurrentLevel());
                buildings.push(building);
              //buildings[count++] = building;
              }
              return buildings; //MaelstromTools.Util.ArrayUnique(buildings);
            },*/

            getResourcesPart: function (cityEntities) {
              try {
                var loot = [0, 0, 0, 0, 0, 0, 0, 0];
                if (cityEntities == null) {
                  return loot;
                }

                var objcityEntities = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in cityEntities) objcityEntities.push(cityEntities[o]);
                } else { //old
                  for (var i = 0; i < cityEntities.length; i++) objcityEntities.push(cityEntities[i]);
                }

                for (var i = 0; i < objcityEntities.length; i++) {
                  var cityEntity = objcityEntities[i];
                  var unitLevelRequirements = MaelstromTools.Wrapper.GetUnitLevelRequirements(cityEntity);

                  for (var x = 0; x < unitLevelRequirements.length; x++) {
                    loot[unitLevelRequirements[x].Type] += unitLevelRequirements[x].Count * cityEntity.get_HitpointsPercent();
                    if (cityEntity.get_HitpointsPercent() < 1.0) {
                      // destroyed

                    }
                  }
                }

                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResourcesPart", e);
              }
            }

            /*
            findBuildings: function(city) {
              for (var k in city) {
                if ((typeof(city[k]) == "object") && city[k] && city[k] && 0 in city[k]) {
                  if ((typeof(city[k][0]) == "object")  && city[k][0] && "BuildingDBId" in city[k][0]) {
                    return city[k];
                  }
                }
              }
              return [];
            }*/
          }
        });

        // define Wrapper
        qx.Class.define("MaelstromTools.Wrapper", {
          type: "static",
          statics: {
            GetStepTime: function (step, defaultString) {
              if (!defaultString) {
                defaultString = "";
              }
              var endTime = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(step, ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep());
              if (endTime == "00:00") {
                return defaultString;
              }
              return endTime;
            },

            FormatNumbersCompact: function (value) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(value);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(value);
              }
            },

            GetDateTimeString: function (value) {
                return phe.cnc.Util.getDateTimeString(value);
            },

            FormatTimespan: function (value) {
              return ClientLib.Vis.VisMain.FormatTimespan(value);
            },

            GetSupportWeaponRange: function (weapon) {
              return weapon.r;
            },

            GetCity: function (cityId) {
              return ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityId);
            },

            RepairAll: function (ncity, visMode) {
              var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
              ncity.RepairAll();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
            },

            CanRepairAll: function (ncity, viewMode) {
              try {
                /*var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
                var retVal = ncity.CanRepairAll();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
                return retVal;*/

                var repairData = ncity.get_CityRepairData();
                var myRepair = repairData.CanRepair(0, viewMode);
                repairData.UpdateCachedFullRepairAllCost(viewMode);
                return ((myRepair != null) && (!ncity.get_IsLocked() || (viewMode != ClientLib.Vis.Mode.ArmySetup)));

                return false;
              } catch (e) {
                console.log("MaelstromTools.Wrapper.CanRepairAll: ", e);
                return false;
              }
            },
            /*GetBuildings: function (cityBuildings) {
              if (PerforceChangelist >= 376877) { //new
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().d : null);
              } else { //old
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().l : null);
              }
            },*/
            GetDefenseUnits: function (cityUnits) {
            //GetDefenseUnits: function () {
              if (PerforceChangelist >= 392583) { //endgame patch
                return (cityUnits.get_DefenseUnits() != null ? cityUnits.get_DefenseUnits().d : null);
              } else { //old
                var defenseObjects = [];
                for (var x = 0; x < 9; x++) {
                  for (var y = 0; y < 8; y++) {
                    var defenseObject = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition((x * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth()),(y * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight()));
                    if (defenseObject !== null && defenseObject.get_CityEntity() !== null) {
                      defenseObjects.push(defenseObject.get_UnitDetails());
                    }
                  }
                }
                return defenseObjects;
              }
            },
            GetUnitLevelRequirements: function (cityEntity) {
              if (PerforceChangelist >= 376877) { //new
                return (cityEntity.get_UnitLevelRepairRequirements() != null ? cityEntity.get_UnitLevelRepairRequirements() : null);
              } else { //old
                return (cityEntity.get_UnitLevelRequirements() != null ? cityEntity.get_UnitLevelRequirements() : null);
              }
            },

            GetBaseLevel: function (ncity) {
              return (Math.floor(ncity.get_LvlBase() * 100) / 100).toFixed(2);
            }
            /*,
            
            GetPointsByLevelWithThresholds: function (_levelThresholds,_levelFactors,_iLevel) {
              var result=0;
              var lastLevel=_iLevel;
              if(_levelThresholds.length != _levelFactors.length) {
                return 0;
              }
              for (var i=(_levelThresholds.length - 1); (i >= 0); i--) {
                var threshold=(_levelThresholds[i] - 1);
                if(lastLevel >= threshold) {
                  result += ((lastLevel - threshold) * _levelFactors[i]);
                  lastLevel=threshold;
                }
              }
              return result;
            },
            GetArmyPoints: function(_iLevel) {
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
              var m_iArmyPointsPerLevelThresholds = server.get_ArmyPointsPerLevelThresholds();
              var m_fArmyPointsPerLevel = server.get_ArmyPointsPerLevel();
              _iLevel += 4;
              var armyPoints = MaelstromTools.Wrapper.GetPointsByLevelWithThresholds(m_iArmyPointsPerLevelThresholds, m_fArmyPointsPerLevel, _iLevel);
              return Math.min(armyPoints, server.get_MaxArmyPoints());
            },
            
            GetBuilding: function(ncity, techName) {
              return ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName)
            },
            
            GetCommandCenter: function(ncity) {
              //var techName = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Command_Center, ClientLib.Data.MainData.GetInstance().get_Player().get_Faction());

              return MaelstromTools.Wrapper.GetBuilding(ncity, ClientLib.Base.ETechName.Command_Center);
            // conyard return this.GetBuildingCondition$0(ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction$0(0, ClientLib.Data.MainData.GetInstance$9().get_Player$2().get_Faction$2()));
            // ClientLib.Data.City.prototype.GetOffenseConditionInPercent=ClientLib.Data.City.prototype.GetOffenseConditionInPercent$0;
            }*/
          }
        });

        // define LocalStorage
        qx.Class.define("MaelstromTools.LocalStorage", {
          type: "static",
          statics: {
            isSupported: function () {
              return typeof (Storage) !== "undefined";
            },
            set: function (key, value) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  localStorage["CCTA_MaelstromTools_" + key] = JSON.stringify(value);
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.set: ", e);
              }
            },
            get: function (key, defaultValueIfNotSet) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  if (localStorage["CCTA_MaelstromTools_" + key] != null && localStorage["CCTA_MaelstromTools_" + key] != 'undefined') {
                    return JSON.parse(localStorage["CCTA_MaelstromTools_" + key]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.get: ", e);
              }
              return defaultValueIfNotSet;
            },
            clearAll: function () {
              try {
                if (!MaelstromTools.LocalStorage.isSupported()) {
                  return;
                }
                for (var key in localStorage) {
                  if (key.indexOf("CCTA_MaelstromTools_") == 0) {
                    localStorage.removeItem(key);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.clearAll: ", e);
              }
            }
          }
        });

        // define Cache
        qx.Class.define("MaelstromTools.Cache", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            CityCount: 0,
            Cities: null,
            SelectedBaseForMenu: null,
            SelectedBaseResources: null,
            SelectedBaseForLoot: null,

            updateCityCache: function () {
              try {
                this.CityCount = 0;
                this.Cities = Object();

                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                for (var cindex in cities.d) {
                  this.CityCount++;
                  var ncity = MaelstromTools.Wrapper.GetCity(cindex);
                  var ncityName = ncity.get_Name();
                  this.Cities[ncityName] = Object();
                  this.Cities[ncityName]["ID"] = cindex;
                  this.Cities[ncityName]["Object"] = ncity;
                }
              } catch (e) {
                console.log("MaelstromTools.Cache.updateCityCache: ", e);
              }
            },

            updateLoot: function (visCity) {
              var cityId = visCity.get_Id();

              if (this.SelectedBaseForLoot != null && cityId == this.SelectedBaseForLoot.get_Id() && this.SelectedBaseResources != null && this.SelectedBaseResources["LoadState"] > 0) {
                return -2;
              }
              this.SelectedBaseForLoot = visCity;
              this.SelectedBaseResources = MaelstromTools.Util.getResources(visCity);
              return this.SelectedBaseResources["LoadState"];
            }
          }
        });

        // define HuffyTools.ImageRender
        qx.Class.define("HuffyTools.ImageRender", {
          extend: qx.ui.table.cellrenderer.AbstractImage,
          construct: function (width, height) {
            this.base(arguments);
            if (width) {
              this.__imageWidth = width;
            }
            if (height) {
              this.__imageHeight = height;
            }
            this.__am = qx.util.AliasManager.getInstance();
          },
          members: {
            __am: null,
            __imageHeight: 16,
            __imageWidth: 16,
            // overridden
            _identifyImage: function (cellInfo) {
              var imageHints = {
                imageWidth: this.__imageWidth,
                imageHeight: this.__imageHeight
              };
              if (cellInfo.value == "") {
                imageHints.url = null;
              } else {
                imageHints.url = this.__am.resolve(cellInfo.value);
              }
              imageHints.tooltip = cellInfo.tooltip;
              return imageHints;
            }
          },
          destruct: function () {
            this.__am = null;
          }
        });

        // define HuffyTools.ReplaceRender
        qx.Class.define("HuffyTools.ReplaceRender", {
          extend: qx.ui.table.cellrenderer.Default,
          properties: {
            replaceFunction: {
              check: "Function",
              nullable: true,
              init: null
            }
          },
          members: {
            // overridden
            _getContentHtml: function (cellInfo) {
              var value = cellInfo.value;
              var replaceFunc = this.getReplaceFunction();
              // use function
              if (replaceFunc) {
                cellInfo.value = replaceFunc(value);
              }
              return qx.bom.String.escape(this._formatValue(cellInfo));
            }
          }
        });

        qx.Class.define("HuffyTools.CityCheckBox", {
          extend: qx.ui.form.CheckBox,
          members: {
            HT_CityID: null
          }
        });

        // define HuffyTools.UpgradePriorityGUI
        qx.Class.define("HuffyTools.UpgradePriorityGUI", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            HT_TabView: null,
            HT_Options: null,
            HT_ShowOnlyTopBuildings: null,
            HT_ShowOnlyAffordableBuildings: null,
            HT_CityBuildings: null,
            HT_Pages: null,
            HT_Tables: null,
            HT_Models: null,
            HT_SelectedResourceType: null,
            BuildingList: null,
            upgradeInProgress: null,
            init: function () {
              /*
              Done:
              - Added cost per gain to the lists
              - Added building coordinates to the lists
              - Only display the top affordable and not affordable building
              - Persistent filter by city, top and affordable per resource type
              - Reload onTabChange for speed optimization
              - Estimated time until upgrade is affordable
              
              ToDo:
              - let the user decide to sort by colums he like i.e. timefactor or cost/gain and save it in the configuration
              - integrate buttons to transfer resources ?

               */
              try {
                this.HT_SelectedResourceType = -1;
                this.IsTimerEnabled = false;
                this.upgradeInProgress = false;

                this.HT_TabView = new qx.ui.tabview.TabView();
                this.HT_TabView.set({
                  contentPadding: 0,
                  appearance: "tabview",
                  margin: 5,
                  barPosition: 'left'
                });
                this.Widget = new qx.ui.tabview.Page("UpgradePriority");
                this.Widget.setPadding(0);
                this.Widget.setMargin(0);
                this.Widget.setBackgroundColor("#BEC8CF");
                this.Widget.setLayout(new qx.ui.layout.VBox(2));
                //this.Widget.add(this.HT_Options);
                this.Widget.add(this.HT_TabView, {
                  flex: 1
                });
                this.Window.setPadding(0);
                this.Window.set({
                  resizable: true
                });

                this.Window.removeAll();
                this.Window.add(this.Widget);

                this.BuildingList = new Array;
                this.HT_Models = new Array;
                this.HT_Tables = new Array;
                this.HT_Pages = new Array;

                this.createTabPage(ClientLib.Base.EResourceType.Tiberium);
                this.createTable(ClientLib.Base.EResourceType.Tiberium);
                this.HT_Tables[ClientLib.Base.EResourceType.Tiberium].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Tiberium);
                }, this);


                this.createTabPage(ClientLib.Base.EResourceType.Crystal);
                this.createTable(ClientLib.Base.EResourceType.Crystal);
                this.HT_Tables[ClientLib.Base.EResourceType.Crystal].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Crystal);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Power);
                this.createTable(ClientLib.Base.EResourceType.Power);
                this.HT_Tables[ClientLib.Base.EResourceType.Power].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Power);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Gold);
                this.createTable(ClientLib.Base.EResourceType.Gold);
                this.HT_Tables[ClientLib.Base.EResourceType.Gold].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Gold);
                }, this);


                MT_Cache.updateCityCache();
                this.HT_Options = new Array();
                this.HT_ShowOnlyTopBuildings = new Array();
                this.HT_ShowOnlyAffordableBuildings = new Array();
                this.HT_CityBuildings = new Array();
                for (var mPage in this.HT_Pages) {
                  this.createOptions(mPage);
                  this.HT_Pages[mPage].add(this.HT_Options[mPage]);
                  this.HT_Pages[mPage].add(this.HT_Tables[mPage], {
                    flex: 1
                  });
                  this.HT_TabView.add(this.HT_Pages[mPage]);
                }

                // Zeigen wir Dollars an !
                this.HT_TabView.setSelection([this.HT_TabView.getChildren()[2]]);
                this.HT_SelectedResourceType = ClientLib.Base.EResourceType.Gold;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.init: ", e);
              }
            },
            createOptions: function (eType) {
              var oBox = new qx.ui.layout.Flow();
              var oOptions = new qx.ui.container.Composite(oBox);
              oOptions.setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only top buildings"));
              this.HT_ShowOnlyTopBuildings[eType].setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_TOPBUILDINGS_" + eType, true));
              this.HT_ShowOnlyTopBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyTopBuildings[eType], {
                left: 10,
                top: 10
              });
              this.HT_ShowOnlyAffordableBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only affordable buildings"));
              this.HT_ShowOnlyAffordableBuildings[eType].setMargin(5);
              this.HT_ShowOnlyAffordableBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_AFFORDABLE_" + eType, true));
              this.HT_ShowOnlyAffordableBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyAffordableBuildings[eType], {
                left: 10,
                top: 10,
                lineBreak: true
              });
              this.HT_CityBuildings[eType] = new Array();
              for (var cname in MT_Cache.Cities) {
                var oCity = MT_Cache.Cities[cname].Object;
                var oCityBuildings = new HuffyTools.CityCheckBox(cname);
                oCityBuildings.HT_CityID = oCity.get_Id();
                oCityBuildings.setMargin(5);
                oCityBuildings.setValue(MaelstromTools.LocalStorage.get("UGL_CITYFILTER_" + eType + "_" + oCity.get_Id(), true));
                oCityBuildings.addListener("execute", this.CBChanged, this);
                oOptions.add(oCityBuildings, {
                  left: 10,
                  top: 10
                });
                this.HT_CityBuildings[eType][cname] = oCityBuildings;
              }
              this.HT_Options[eType] = oOptions;
            },
            createTable: function (eType) {
              try {
                this.HT_Models[eType] = new qx.ui.table.model.Simple();
                this.HT_Models[eType].setColumns(["ID", Lang.gt("City"), Lang.gt("Type (coord)"), Lang.gt("to Level"), Lang.gt("Gain/h"), Lang.gt("Factor"), Lang.gt("Tiberium"), Lang.gt("Power"), Lang.gt("Tib/gain"), Lang.gt("Pow/gain"), Lang.gt("ETA"), Lang.gt("Upgrade"), "State"]);
                this.HT_Tables[eType] = new qx.ui.table.Table(this.HT_Models[eType]);
                this.HT_Tables[eType].setColumnVisibilityButtonVisible(false);
                this.HT_Tables[eType].setColumnWidth(0, 0);
                this.HT_Tables[eType].setColumnWidth(1, 90);
                this.HT_Tables[eType].setColumnWidth(2, 120);
                this.HT_Tables[eType].setColumnWidth(3, 55);
                this.HT_Tables[eType].setColumnWidth(4, 70);
                this.HT_Tables[eType].setColumnWidth(5, 60);
                this.HT_Tables[eType].setColumnWidth(6, 70);
                this.HT_Tables[eType].setColumnWidth(7, 70);
                this.HT_Tables[eType].setColumnWidth(8, 70);
                this.HT_Tables[eType].setColumnWidth(9, 70);
                this.HT_Tables[eType].setColumnWidth(10, 70);
                this.HT_Tables[eType].setColumnWidth(11, 40);
                this.HT_Tables[eType].setColumnWidth(12, 0);
                var tcm = this.HT_Tables[eType].getTableColumnModel();
                tcm.setColumnVisible(0, false);
                tcm.setColumnVisible(12, false);
                tcm.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }));
                tcm.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 5
                  })
                }));
                tcm.setDataCellRenderer(6, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(7, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(11, new HuffyTools.ImageRender(40, 20));
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTable: ", e);
              }
            },
            createTabPage: function (resource_type) {
              try {
                var sName = MaelstromTools.Statics.LootTypeName(resource_type);
                var oRes = new qx.ui.tabview.Page(Lang.gt(sName), MT_Base.images[sName]);
                oRes.setLayout(new qx.ui.layout.VBox(2));
                oRes.setPadding(5);
                var btnTab = oRes.getChildControl("button");
                btnTab.resetWidth();
                btnTab.resetHeight();
                btnTab.set({
                  show: "icon",
                  margin: 0,
                  padding: 0,
                  toolTipText: sName
                });
                btnTab.addListener("execute", this.TabChanged, [this, resource_type]);
                this.HT_Pages[resource_type] = oRes;
                return oRes;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTabPage: ", e);
              }
            },

            TabChanged: function (e) {
              try {
                this[0].HT_SelectedResourceType = this[1];
                this[0].UpgradeCompleted(null, null);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.TabChanged: ", e);
              }
            },

            upgradeBuilding: function (e, eResourceType) {
              if (this.upgradeInProgress == true) {
                console.log("upgradeBuilding:", "upgrade in progress !");
                return;
              }
              try {
                if (e.getColumn() == 11) {
                  var buildingID = this.HT_Models[eResourceType].getValue(0, e.getRow());
                  var iState = parseInt(this.HT_Models[eResourceType].getValue(12, e.getRow()));
                  if (iState != 1) {
                    return;
                  }
                  if (buildingID in this.BuildingList) {
                    this.upgradeInProgress = true;
                    if (PerforceChangelist >= 382917) { //new
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    } else { //old
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], webfrontend.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    }
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.upgradeBuilding: ", e);
              }
            },
            UpgradeCompleted: function (context, result) {
              var self = this;
              window.setTimeout(function () {
                self.calc();
              }, 1000);
              this.upgradeInProgress = false;
            },
            CBChanged: function (e) {
              this.UpgradeCompleted(null, null);
            },
            formatTiberiumAndPower: function (oValue) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(oValue);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(oValue);
              }
            },
            updateCache: function () {
              try {
                if (!this.HT_TabView) {
                  this.init();
                }
                var eType = this.HT_SelectedResourceType;
                var bTop = this.HT_ShowOnlyTopBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_TOPBUILDINGS_" + eType, bTop);
                var bAffordable = this.HT_ShowOnlyAffordableBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_AFFORDABLE_" + eType, bAffordable);
                var oCityFilter = new Array();
                for (var cname in this.HT_CityBuildings[eType]) {
                  var oCityBuildings = this.HT_CityBuildings[eType][cname];
                  var bFilterBuilding = oCityBuildings.getValue();
                  MaelstromTools.LocalStorage.set("UGL_CITYFILTER_" + eType + "_" + oCityBuildings.HT_CityID, bFilterBuilding);
                  oCityFilter[cname] = bFilterBuilding;
                }
                window.HuffyTools.UpgradePriority.getInstance().collectData(bTop, bAffordable, oCityFilter, eType);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.updateCache: ", e);
              }
            },
            setWidgetLabels: function () {
              try {
                var HuffyCalc = window.HuffyTools.UpgradePriority.getInstance();
                var UpgradeList = HuffyCalc.Cache;

                for (var eResourceType in UpgradeList) {
                  //var eResourceType = MaelstromTools.Statics.LootTypeName(eResourceName);
                  var rowData = [];

                  this.HT_Models[eResourceType].setData([]);

                  for (var mCity in UpgradeList[eResourceType]) {
                    for (var mBuilding in UpgradeList[eResourceType][mCity]) {
                      var UpItem = UpgradeList[eResourceType][mCity][mBuilding];
                      if (typeof (UpItem.Type) == "undefined") {
                        continue;
                      }
                      if (!(mBuilding in this.BuildingList)) {
                        this.BuildingList[UpItem.ID] = UpItem.Building;
                      }
                      var iTiberiumCosts = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumCosts = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium];
                      }
                      var iTiberiumPerGain = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium] / UpItem.GainPerHour;
                      }
                      var iPowerCosts = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerCosts = UpItem.Costs[ClientLib.Base.EResourceType.Power];
                      }
                      var iPowerPerGain = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Power] / UpItem.GainPerHour;
                      }
                      var img = MT_Base.images["UpgradeBuilding"];
                      if (UpItem.Affordable == false) {
                        img = "";
                      }
                      var sType = UpItem.Type;
                      sType = sType + "(" + UpItem.PosX + ":" + UpItem.PosY + ")";
                      var iETA = 0;
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium] > 0) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium];
                      }
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power] > iETA) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power];
                      }
                      var sETA = "";
                      if (iETA > 0) {
                        sETA = ClientLib.Vis.VisMain.FormatTimespan(iETA);
                      }
                      var iState = 0;
                      if (UpItem.Affordable == true) {
                        iState = 1;
                      } else if (UpItem.AffordableByTransfer == true) {
                        iState = 2;
                      } else {
                        iState = 3;
                      }
                      rowData.push([UpItem.ID, mCity, sType, UpItem.Level, UpItem.GainPerHour, UpItem.Ticks, iTiberiumCosts, iPowerCosts, iTiberiumPerGain, iPowerPerGain, sETA, img, iState]);
                    }
                  }
                  this.HT_Models[eResourceType].setData(rowData);
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define HuffyTools.UpgradePriority
        qx.Class.define("HuffyTools.UpgradePriority", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            list_units: null,
            list_buildings: null,

            comparePrio: function (elem1, elem2) {
              if (elem1.Ticks < elem2.Ticks) return -1;
              if (elem1.Ticks > elem2.Ticks) return 1;
              return 0;
            },
            getPrioList: function (city, arTechtypes, eModPackageSize, eModProduction, bOnlyTopBuildings, bOnlyAffordableBuildings) {
              try {
                var RSI = window.MaelstromTools.ResourceOverview.getInstance();
                RSI.updateCache();
                var TotalTiberium = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  var i = cityCache[MaelstromTools.Statics.Tiberium];
                  if (typeof (i) !== 'undefined') {
                    TotalTiberium += i;
                    //but never goes here during test.... // to optimize - to do
                  }
                }
                var resAll = new Array();
                var prod = MaelstromTools.Production.getInstance().updateCache(city.get_Name());
                //var buildings = MaelstromTools.Wrapper.GetBuildings(city.get_CityBuildingsData());
                var buildings = city.get_Buildings().d;

                // 376877 & old fixes 
                var objbuildings = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in buildings) objbuildings.push(buildings[o]);
                } else { //old
                  for (var i = 0; i < buildings.length; i++) objbuildings.push(buildings[i]);
                }


                for (var i = 0; i < objbuildings.length; i++) {
                  var city_building = objbuildings[i];

                  // TODO: check for destroyed building

                  var iTechType = city_building.get_TechName();
                  var bSkip = true;
                  for (var iTypeKey in arTechtypes) {
                    if (arTechtypes[iTypeKey] == iTechType) {
                      bSkip = false;
                      break;
                    }
                  }
                  if (bSkip == true) {
                    continue;
                  }
                  var city_buildingdetailview = city.GetBuildingDetailViewInfo(city_building);
                  if (city_buildingdetailview == null) {
                    continue;
                  }
                  var bindex = city_building.get_Id();
                  var resbuilding = new Array();
                  resbuilding["ID"] = bindex;
                  resbuilding["Type"] = this.TechTypeName(parseInt(iTechType, 10));
                  resbuilding["PosX"] = city_building.get_CoordX();
                  resbuilding["PosY"] = city_building.get_CoordY();

                  resbuilding["Building"] = {
                    cityid: city.get_Id(),
                    posX: resbuilding["PosX"],
                    posY: resbuilding["PosY"],
                    isPaid: true
                  };

                  resbuilding["GainPerHour"] = 0;
                  resbuilding["Level"] = city_building.get_CurrentLevel() + 1;
                  for (var ModifierType in city_buildingdetailview.OwnProdModifiers.d) {
                    switch (parseInt(ModifierType, 10)) {
                      case eModPackageSize:
                        {
                          var ModOj = city_buildingdetailview.OwnProdModifiers.d[city_building.get_MainModifierTypeId()];
                          var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                          resbuilding["GainPerHour"] += (city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta / Mod);
                          break;
                        }
                      case eModProduction:
                        {
                          resbuilding["GainPerHour"] += city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta;
                          break;
                        }
                    }
                  }
                  // Nutzen ins VerhÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¤ltnis zu den Kosten setzten
                  var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(city_building.get_CurrentLevel() + 1, city_building.get_TechGameData_Obj());
                  var RatioPerCostType = new Object();
                  var sRatio = "";
                  var sCosts = "";
                  var lTicks = 0;
                  var bHasPower = true;
                  var bHasTiberium = true;
                  var bAffordableByTransfer = true;
                  var oCosts = new Array();
                  var oTimes = new Array();
                  for (var costtype in TechLevelData) {
                    if (typeof (TechLevelData[costtype]) == "function") {
                      continue;
                    }
                    if (TechLevelData[costtype].Type == "0") {
                      continue;
                    }

                    oCosts[TechLevelData[costtype].Type] = TechLevelData[costtype].Count;
                    if (parseInt(TechLevelData[costtype].Count) <= 0) {
                      continue;
                    }
                    RatioPerCostType[costtype] = TechLevelData[costtype].Count / resbuilding["GainPerHour"];
                    if (sCosts.length > 0) {
                      sCosts = sCosts + ", ";
                    }
                    sCosts = sCosts + MaelstromTools.Wrapper.FormatNumbersCompact(TechLevelData[costtype].Count) + " " + MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);
                    if (sRatio.length > 0) {
                      sRatio = sRatio + ", ";
                    }
                    // Upgrade affordable ?
                    if (city.GetResourceCount(TechLevelData[costtype].Type) < TechLevelData[costtype].Count) {
                      switch (TechLevelData[costtype].Type) {
                        case ClientLib.Base.EResourceType.Tiberium:
                          {
                            bHasTiberium = false;
                            if (TotalTiberium < TechLevelData[costtype].Count) {
                              bAffordableByTransfer = false;
                            }
                          }
                          break;
                        case ClientLib.Base.EResourceType.Power:
                          {
                            bHasPower = false;
                          }
                          break;
                      }
                    }
                    sRatio = sRatio + MaelstromTools.Wrapper.FormatNumbersCompact(RatioPerCostType[costtype]);

                    var techlevelData = MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);

                    var dCityProduction = prod[techlevelData].Delta + prod[techlevelData].ExtraBonusDelta + prod[techlevelData].POI;
                    if (dCityProduction > 0) {
                      if (lTicks < (3600 * RatioPerCostType[costtype] / dCityProduction)) {
                        lTicks = (3600 * RatioPerCostType[costtype] / dCityProduction);
                      }
                    }
                    oTimes[TechLevelData[costtype].Type] = 0;
                    if (oCosts[TechLevelData[costtype].Type] > city.GetResourceCount(TechLevelData[costtype].Type)) {
                      oTimes[TechLevelData[costtype].Type] = (3600 * (oCosts[TechLevelData[costtype].Type] - city.GetResourceCount(TechLevelData[costtype].Type))) / dCityProduction;
                    }
                  }
                  resbuilding["Ticks"] = lTicks;
                  resbuilding["Time"] = ClientLib.Vis.VisMain.FormatTimespan(lTicks);
                  resbuilding["Costtext"] = sCosts;
                  resbuilding["Costs"] = oCosts;
                  resbuilding["TimeTillUpgradable"] = oTimes;
                  resbuilding["Ratio"] = sRatio;
                  resbuilding["Affordable"] = bHasTiberium && bHasPower;
                  resbuilding["AffordableByTransfer"] = bHasPower && bAffordableByTransfer;
                  if (resbuilding["GainPerHour"] > 0 && (bOnlyAffordableBuildings == false || resbuilding["Affordable"] == true)) {
                    resAll[bindex] = resbuilding;
                  }
                }


                resAll = resAll.sort(this.comparePrio);
                if (!bOnlyTopBuildings) {
                  return resAll;
                }
                var res2 = new Array();
                if (MaelstromTools.Util.ArraySize(resAll) > 0) {
                  var iTopNotAffordable = -1;
                  var iTopAffordable = -1;
                  var iNextNotAffordable = -1;
                  var iLastIndex = -1;
                  for (var iNewIndex in resAll) {
                    if (resAll[iNewIndex].Affordable == true) {
                      if (iTopAffordable == -1) {
                        iTopAffordable = iNewIndex;
                        iNextNotAffordable = iLastIndex;
                      }
                    } else {
                      if (iTopNotAffordable == -1) {
                        iTopNotAffordable = iNewIndex;
                      }
                    }
                    iLastIndex = iNewIndex;
                  }
                  if (iTopAffordable == -1) {
                    iNextNotAffordable = iLastIndex;
                  }
                  var iIndex = 0;
                  if (iTopNotAffordable != -1) {
                    res2[iIndex++] = resAll[iTopNotAffordable];
                  }
                  if (iNextNotAffordable != -1) {
                    res2[iIndex++] = resAll[iNextNotAffordable];
                  }
                  if (iTopAffordable != -1) {
                    res2[iIndex++] = resAll[iTopAffordable];
                  }
                }
                res2 = res2.sort(this.comparePrio);
                return res2;
              } catch (e) {
                console.log("HuffyTools.getPrioList: ", e);
              }
            },
            TechTypeName: function (iTechType) {
              switch (iTechType) {
                case ClientLib.Base.ETechName.PowerPlant:
                  {
                    return Lang.gt("Powerplant");
                    break;
                  }
                case ClientLib.Base.ETechName.Refinery:
                  {
                    return Lang.gt("Refinery");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester_Crystal:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Silo:
                  {
                    return Lang.gt("Silo");
                    break;
                  }
                case ClientLib.Base.ETechName.Accumulator:
                  {
                    return Lang.gt("Accumulator");
                    break;
                  }
              }
              return "?";
            },
            collectData: function (bOnlyTopBuildings, bOnlyAffordableBuildings, oCityFilter, eSelectedResourceType) {
              try {
                MT_Cache.updateCityCache();
                this.Cache = new Object();
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                  this.Cache[ClientLib.Base.EResourceType.Tiberium] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                  this.Cache[ClientLib.Base.EResourceType.Crystal] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                  this.Cache[ClientLib.Base.EResourceType.Power] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                  this.Cache[ClientLib.Base.EResourceType.Gold] = new Object();
                }
                for (var cname in MT_Cache.Cities) {
                  var city = MT_Cache.Cities[cname].Object;
                  if (oCityFilter[cname] == false) {
                    continue;
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                    this.Cache[ClientLib.Base.EResourceType.Tiberium][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.TiberiumPackageSize, ClientLib.Base.EModifierType.TiberiumProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                    this.Cache[ClientLib.Base.EResourceType.Crystal][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.CrystalPackageSize, ClientLib.Base.EModifierType.CrystalProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                    this.Cache[ClientLib.Base.EResourceType.Power][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                    this.Cache[ClientLib.Base.EResourceType.Gold][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.collectData: ", e);
              }
            }
          }
        });

        var __MTCity_initialized = false; //k undeclared

        var Lang = window.MaelstromTools.Language.getInstance();
        var MT_Cache = window.MaelstromTools.Cache.getInstance();
        var MT_Base = window.MaelstromTools.Base.getInstance();
        var MT_Preferences = window.MaelstromTools.Preferences.getInstance();
        MT_Preferences.readOptions();

        if (!webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {

          MT_Cache.SelectedBaseForMenu = selectedVisObject;
          var baseStatusOverview = window.MaelstromTools.BaseStatus.getInstance();

          if (__MTCity_initialized == false) {
            //console.log(selectedBase.get_Name());
            __MTCity_initialized = true;
            baseStatusOverview.CityMenuButtons = new Array();

            for (var k in this) {
              try {
                if (this.hasOwnProperty(k)) {
                  if (this[k] && this[k].basename == "Composite") {
                    var button = new qx.ui.form.Button(Lang.gt("Calibrate support"));
                    button.addListener("execute", function (e) {
                      MaelstromTools.Util.calibrateWholeSupportOnSelectedBase();
                    }, this);

                    this[k].add(button);
                    baseStatusOverview.CityMenuButtons.push(button);
                  }
                }
              } catch (e) {
                console.log("webfrontend.gui.region.RegionCityMenu.prototype.showMenu: ", e);
              }
            }
          }

          var isAllowed = MaelstromTools.Util.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu);

          for (var x = 0; x < baseStatusOverview.CityMenuButtons.length; ++x) {
            baseStatusOverview.CityMenuButtons[x].setVisibility(isAllowed ? 'visible' : 'excluded');
          }
          this.__MTCity_showMenu(selectedVisObject);
        };

        if (MT_Preferences.Settings.showLoot) {
          // Wrap onCitiesChange method
          if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp) {
            webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(1, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance());
            return this.__MTCity_NPCCamp();
          };

          if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase) {
            webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(2, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            //MT_Base.updateLoot(2, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            return this.__MTCity_NPCBase();
          };

          if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City) {
            webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(3, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            //MT_Base.updateLoot(3, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            return this.__MTCity_City();
          };
        }

      }
    } catch (e) {
      console.log("createMaelstromTools: ", e);
    }

    function MaelstromTools_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createMaelstromTools();
          window.MaelstromTools.Base.getInstance().initialize();
        } else {
          window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("MaelstromTools_checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
    }
  };

  try {
    var MaelstromScript = document.createElement("script");
    MaelstromScript.innerHTML = "(" + MaelstromTools_main.toString() + ")();";
    MaelstromScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(MaelstromScript);
    }
  } catch (e) {
    console.log("MaelstromTools: init error: ", e);
  }
})();


// ==UserScript==
// @name        Maelstrom ADDON Basescanner
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Maelstrom ADDON Basescanner
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.8.4
// @author      BlinDManX
// @grant       none
// @copyright   2012+, Claus Neumann
// @license     CC BY-NC-ND 3.0 - http://creativecommons.org/licenses/by-nc-nd/3.0/
// @updateURL   https://userscripts.org/scripts/source/145168.meta.js
// @downloadURL https://userscripts.org/scripts/source/145168.user.js
// ==/UserScript==
(function(){
var b=function(){var e=["__msbs_version","1.8.4","Addons.BaseScannerGUI","singleton","Window","window","ui","base","Addons.BaseScannerGUI ","info","T","getInstance","Language","setWidth","setHeight","setContentPadding","setShowMinimize","setShowMaximize","setShowClose","setResizable","setAllowMaximize","setAllowMinimize","setAllowClose","setShowStatusbar","setDecorator","setPadding","layout","setLayout","src","stats","http://goo.gl/DrJ2x","ZE","removeAll","add","setData","ZL","Addons.BaseScannerGUI.construct: ","debug","img","createElement","setCaption","isVisible","close","updateCityCache","Cache","MaelstromTools","ZC","Cities","form","Basescanner_LastCityID","getserver","LocalStorage","get_Id","Object","setSelection","open","moveTo","MaelstromTools.DefaultObject.openWindow: ","log","model","table","ID","LoadState","City","get","Location","Level","Tiberium","Crystal","Dollar","Research","Crystalfields","Tiberiumfields","Building state","Defense state","CP","Def.HP/Off.HP","Sum Tib+Cry+Cre","(Tib+Cry+Cre)/CP","CY","DF","base set up at","setColumns","YY","get_Player","MainData","Data","ZN","setColumnVisibilityButtonVisible","setColumnWidth","Basescanner_ColWidth_2","Basescanner_ColWidth_3","Basescanner_ColWidth_4","Basescanner_ColWidth_5","Basescanner_ColWidth_6","Basescanner_ColWidth_7","Basescanner_ColWidth_8","Basescanner_ColWidth_9","Basescanner_ColWidth_10","Basescanner_ColWidth_11","Basescanner_ColWidth_12","Basescanner_ColWidth_13","Basescanner_ColWidth_14","Basescanner_ColWidth_15","Basescanner_ColWidth_16","Basescanner_ColWidth_17","Basescanner_ColWidth_18","Basescanner_ColWidth_19","getTableColumnModel","getColumnCount","Basescanner_Column_","setColumnVisible","Statics","images","headerrenderer","setHeaderCellRenderer","FA","set","cellrenderer","setDataCellRenderer","cellDblclick","BaseScannerGUI","addListener","widthChanged","col","getData","newWidth","Basescanner_ColWidth_","setserver","Addons.BaseScannerGUI.FI: ","getRow","length",":","split","VisMain","Vis","getValue","ZK","getApplication","Init","core","closeCityInfo","getBackgroundArea","pavmCombatSetupDefense","PlayerAreaViewMode","setView","getPlayArea","get_CurrentOwnCity","get_Cities","set_CurrentTargetBaseId","get_CityArmyFormationsManager","Addons.BaseScannerGUI FB error: ","Scan","setLabel","ZG","ZH","format","util","setGroupingUsed","setMaximumFractionDigits","abs","floor","k","M","G","container","setMargin","changeSelection","CP Limit","white","basic","ZQ","Basescanner_Cplimiter","","min Level","Basescanner_minLevel","1","ZY","Player","setTextColor","Basescanner_Show0","setValue","changeValue","Bases","Basescanner_Show1","Outpost","Basescanner_Show2","Camp","Basescanner_Show3","execute","solid","blue","decoration","ZV","red","ZU","green","ZX","center","YZ","clear Cache","ZZ","Only center on World","ZJ","7 "," 5 ","6 "," 6 ","5 "," 7 ","ZD","Get Layouts","BaseScannerLayout","Addons","BaseScanner Layout","openWindow","setEnabled","ZB","Loader","gui","ZR","getColumnName","isColumnVisible","index","ZO","+","ZI","addAfter","-","remove","right","setAlignX","ZF","Addons.BaseScannerGUI.createOptions: ","\x3Ca href=\x22https://sites.google.com/site/blindmanxdonate\x22 target=\x22_blank\x22\x3ESupport Development of BlinDManX Addons\x3C/a\x3E","ZP","getModel","getSelection","get_PosX","get_PosY","set_CurrentCityId","ZT","prototype","WorldObjectCity","WorldSector","$ctor","ClientLib.Data.WorldSector.WorldObjectCity","getLevel","Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined","error","getID","Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined","WorldObjectNPCBase","ClientLib.Data.WorldSector.WorldObjectNPCBase","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined","WorldObjectNPCCamp","ClientLib.Data.WorldSector.WorldObjectNPCCamp","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined","getCampType","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined","Pause","window.Addons.BaseScannerGUI.getInstance().FJ()","setTimeout","window.Addons.BaseScannerGUI.getInstance().FG()","/","ZM","get_World","Scanning from: ","get_Name","get_MaxAttackDistance","get_Server","sqrt","Type","function","push","sortByColumn","name","DR01D","Maelstrom_Basescanner FJ error: ","data null: ","warn","data[i] null: ","get_PlayerId","get_AllianceId","get_IsGhostMode","get_CityUnitsData","d","get_Buildings","get_DefenseUnits","get_OffenseUnits","EResourceType","Base","Gold","ResearchPoints","ZA","get_Health","get_MdbUnitId","get_CoordY","HPRecord"," finish","countlastidchecked"," on "," removed (GetBuildingsConditionInPercent == 0)","splice"," removed (IsGhostMode)","lastid"," removed (found no data)","MaelstromTools_Basescanner getResources","ZS","define","Class","Addons.BaseScannerLayout","Addons.BaseScannerLayout ","ZW","Addons.BaseScannerLayout.construct: ","Addons.BaseScannerLayout.openWindow: ","ZE null: ","\x3Ctable border=\x222\x22 cellspacing=\x220\x22 cellpadding=\x220\x22\x3E"," - ","\x3Ctr\x3E\x3Ctd colspan=\x229\x22\x3E\x3Cfont color=\x22#FFF\x22\x3E","\x3C/font\x3E\x3C/td\x3E\x3C/tr\x3E","\x3Ctr\x3E","\x3Cimg width=\x2214\x22 height=\x2214\x22 src=\x22","\x22\x3E","Emptypixels","\x3Ctd\x3E","\x3C/td\x3E","\x3C/tr\x3E","\x3C/table\x3E","#303030","cid","click","setReturnValue","Addons.LocalStorage","static","undefined","isSupported","stringify","Addons.LocalStorage.setglobal: ","isdefined","parse","Addons.LocalStorage.getglobal: ","object","LocalStorage data from server not null, but not object","LocalStorage data from server not null, but parsererror","Addons.LocalStorage.setserver: ","isdefineddata","Addons.LocalStorage.getserver: ","Addons.Language","main","hasOwnProperty","Translate Added ","Addons.Language.addtranslateobj main not define","getLocale","Manager","locale","_","Addons.Language.get "," not translate for locale ","qx.ui.table.cellrenderer.Replace","Default","Function","value","getReplaceMap","getReplaceFunction","escape","String","bom","Maelstrom_Basescanner initalisiert","Point","Position","addtranslateobj","BaseScanner Overview","Basescanner Übersicht","Visão geral do scanner de base","Aperçu du scanner de base","Scannen","Esquadrinhar","Balayer","Lage","localização","Emplacement","Spieler","Jogador","Joueur","Camp,Outpost","Lager,Vorposten","Camp,posto avançado","Camp,avant-poste","Lager","Vorposten","posto avançado","avant-poste","Layout da Base de Dados de Scanner","Mise scanner de base","Show Layouts","Layouts anzeigen","Mostrar Layouts","Voir Layouts","Gebäudezustand","construção do Estado","construction de l\x27État","Verteidigungszustand","de Defesa do Estado","défense de l\x27Etat","KP","KP begrenzen","CP limitar","CP limiter","min. Level","nível mínimo","niveau minimum","Cache leeren","limpar cache","vider le cache","Nur auf Welt zentrieren","Único centro no Mundial","Seul centre sur World","Basis errichtbar","base de configurar a","mis en place à la base","Infantry","Infanterie","Infantaria","Vehicle","Fahrzeuge","Veículos","Vehicule","Aircraft","Flugzeuge","Aeronaves","Aviation","Tibério","Kristalle","Cristal","Power","Strom","Potência","Energie","Credits","Créditos","Crédit","Forschung","Investigação","Recherche","-----","--","FileManager","File","BaseScanner","ui/icons/icon_item.png","createNewImage","ui/menues/main_menu/misc_empty_pixel.png","version ","desktopPosition","createDesktopButton"," version ","addToMainMenu","AddonMainMenu","Basescanner","ALT+B","Wrapper","Count","get_HitpointsPercent","MaelstromTools_Basescanner getResourcesPart","replace","match","Error - ","not found","MaelstromTools_Basescanner_checkIfLoaded: ","domain","test"];window[e[0]]=e[1];function j(){qx[e[312]][e[311]](e[2],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[8]+window[e[0]]);this[e[10]]=Addons[e[12]][e[11]]();this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](true);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](true);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](5);this[e[27]](new qx[e[6]][e[26]].VBox(3));this[e[29]][e[28]]=e[30];this.FI();this.FH();this.FD();if(this[e[31]]==null){this[e[31]]=[];}this[e[25]](0);this[e[32]]();this[e[33]](this.ZF);this[e[33]](this.ZN);this[e[33]](this.ZP);this[e[35]][e[34]](this.ZE);}catch(t){console[e[37]](e[36],t);}},members:{stats:document[e[39]](e[38]),T:null,ZA:0,ZB:null,ZC:null,ZD:null,ZE:null,ZF:null,ZG:null,ZH:false,ZI:true,ZJ:null,ZK:null,ZL:null,ZM:null,ZN:null,ZO:null,ZP:null,ZQ:null,ZR:[],ZT:true,ZU:null,ZV:null,ZX:null,ZY:null,ZZ:[],ZS:{},YZ:null,YY:null,openWindow:function(w){try{this[e[40]](w);if(this[e[41]]()){this[e[42]]();}else{q[e[43]]();q=window[e[45]][e[44]][e[11]]();var v;this[e[46]][e[32]]();for(v in q[e[47]]){var u=new qx[e[6]][e[48]].ListItem(v,null,q[e[47]][v].Object);this[e[46]][e[33]](u);if(Addons[e[51]][e[50]](e[49])==q[e[47]][v][e[53]][e[52]]()){this[e[46]][e[54]]([u]);}}this[e[55]]();this[e[56]](100,100);}}catch(t){console[e[58]](e[57],t);}},FI:function(){try{this[e[35]]=new qx[e[6]][e[60]][e[59]].Simple();this[e[35]][e[82]]([e[61],e[62],this[e[10]][e[64]](e[63]),this[e[10]][e[64]](e[65]),this[e[10]][e[64]](e[66]),this[e[10]][e[64]](e[67]),this[e[10]][e[64]](e[68]),this[e[10]][e[64]](e[69]),this[e[10]][e[64]](e[70]),e[71],e[72],this[e[10]][e[64]](e[73]),this[e[10]][e[64]](e[74]),this[e[10]][e[64]](e[75]),e[76],e[77],e[78],e[79],e[80],this[e[10]][e[64]](e[81])]);this[e[83]]=ClientLib[e[86]][e[85]].GetInstance()[e[84]]();this[e[87]]=new qx[e[6]][e[60]].Table(this.ZL);this[e[87]][e[88]](false);this[e[87]][e[89]](0,0);this[e[87]][e[89]](1,0);this[e[87]][e[89]](2,Addons[e[51]][e[50]](e[90],120));this[e[87]][e[89]](3,Addons[e[51]][e[50]](e[91],60));this[e[87]][e[89]](4,Addons[e[51]][e[50]](e[92],50));this[e[87]][e[89]](5,Addons[e[51]][e[50]](e[93],60));this[e[87]][e[89]](6,Addons[e[51]][e[50]](e[94],60));this[e[87]][e[89]](7,Addons[e[51]][e[50]](e[95],60));this[e[87]][e[89]](8,Addons[e[51]][e[50]](e[96],60));this[e[87]][e[89]](9,Addons[e[51]][e[50]](e[97],30));this[e[87]][e[89]](10,Addons[e[51]][e[50]](e[98],30));this[e[87]][e[89]](11,Addons[e[51]][e[50]](e[99],50));this[e[87]][e[89]](12,Addons[e[51]][e[50]](e[100],50));this[e[87]][e[89]](13,Addons[e[51]][e[50]](e[101],30));this[e[87]][e[89]](14,Addons[e[51]][e[50]](e[102],60));this[e[87]][e[89]](15,Addons[e[51]][e[50]](e[103],60));this[e[87]][e[89]](16,Addons[e[51]][e[50]](e[104],60));this[e[87]][e[89]](17,Addons[e[51]][e[50]](e[105],50));this[e[87]][e[89]](18,Addons[e[51]][e[50]](e[106],50));this[e[87]][e[89]](19,Addons[e[51]][e[50]](e[107],40));var u=0;var t=this[e[87]][e[108]]();for(u=0;u<this[e[35]][e[109]]();u++){if(u==0||u==1||u==11||u==12){t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,false));}else{t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,true));}}t[e[111]](1,false);t[e[115]](9,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[68]]]),e[71]);t[e[115]](10,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[67]]],e[72]));t[e[119]](5,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](6,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](7,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](8,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](15,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](16,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](19,new qx[e[6]][e[60]][e[118]].Boolean());this[e[87]][e[122]](e[120],function(w){Addons[e[121]][e[11]]().FB(w);},this);t[e[122]](e[123],function(y){var x=y[e[125]]()[e[124]];var w=y[e[125]]()[e[126]];Addons[e[51]][e[128]](e[127]+x,w);},t);}catch(v){console[e[37]](e[129],v);}},FB:function(y){try{var A=this[e[31]][y[e[130]]()][0];var z=this[e[31]][y[e[130]]()][3];if(z!=null&&z[e[133]](e[132])[e[131]]==2){var x=parseInt(z[e[133]](e[132])[0]);var w=parseInt(z[e[133]](e[132])[1]);ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(x,w);}if(A&&!(this[e[137]][4][e[136]]())){var u=qx[e[140]][e[139]][e[138]]();u[e[142]]()[e[141]]();u[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],A,0,0);}var t=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(t!=null){t[e[150]]()[e[149]](A);}}catch(v){console[e[37]](e[151],v);}},FN:function(t){this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;},CBChanged:function(t){this[e[155]]=false;},FA:function(t){var u=new qx[e[157]][e[156]].NumberFormat();u[e[158]](true);u[e[159]](3);if(!isNaN(t)){if(Math[e[160]](t)<100000){t=u[e[156]](Math[e[161]](t));}else{if(Math[e[160]](t)>=100000&&Math[e[160]](t)<1000000){t=u[e[156]](Math[e[161]](t/100)/10)+e[162];}else{if(Math[e[160]](t)>=1000000&&Math[e[160]](t)<10000000){t=u[e[156]](Math[e[161]](t/1000)/1000)+e[163];}else{if(Math[e[160]](t)>=10000000&&Math[e[160]](t)<100000000){t=u[e[156]](Math[e[161]](t/10000)/100)+e[163];}else{if(Math[e[160]](t)>=100000000&&Math[e[160]](t)<1000000000){t=u[e[156]](Math[e[161]](t/100000)/10)+e[163];}else{if(Math[e[160]](t)>=1000000000&&Math[e[160]](t)<10000000000){t=u[e[156]](Math[e[161]](t/1000000)/1000)+e[164];}else{if(Math[e[160]](t)>=10000000000&&Math[e[160]](t)<100000000000){t=u[e[156]](Math[e[161]](t/10000000)/100)+e[164];}else{if(Math[e[160]](t)>=100000000000&&Math[e[160]](t)<1000000000000){t=u[e[156]](Math[e[161]](t/100000000)/10)+e[164];}else{if(Math[e[160]](t)>=1000000000000&&Math[e[160]](t)<10000000000000){t=u[e[156]](Math[e[161]](t/1000000000)/1000)+e[10];}else{if(Math[e[160]](t)>=10000000000000&&Math[e[160]](t)<100000000000000){t=u[e[156]](Math[e[161]](t/10000000000)/100)+e[10];}else{if(Math[e[160]](t)>=100000000000000&&Math[e[160]](t)<1000000000000000){t=u[e[156]](Math[e[161]](t/100000000000)/10)+e[10];}else{if(Math[e[160]](t)>=1000000000000000){t=u[e[156]](Math[e[161]](t/1000000000000))+e[10];}}}}}}}}}}}}}return t.toString();},FH:function(){try{var D=new qx[e[6]][e[26]].Flow();var C=new qx[e[6]][e[165]].Composite(D);this[e[46]]=new qx[e[6]][e[48]].SelectBox();this[e[46]][e[14]](25);this[e[46]][e[166]](5);q[e[43]]();q=window[e[45]][e[44]][e[11]]();var G;for(G in q[e[47]]){var F=new qx[e[6]][e[48]].ListItem(G,null,q[e[47]][G].Object);this[e[46]][e[33]](F);if(Addons[e[51]][e[50]](e[49])==q[e[47]][G][e[53]][e[52]]()){this[e[46]][e[54]]([F]);}}this[e[46]][e[122]](e[167],function(H){this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZC);var B=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[168]),textColor:e[169],margin:5});C[e[33]](B);this[e[171]]=new qx[e[6]][e[48]].SelectBox();this[e[171]][e[13]](50);this[e[171]][e[14]](25);this[e[171]][e[166]](5);var z=Addons[e[51]][e[50]](e[172],25);for(var x=11;x<41;x+=1){F=new qx[e[6]][e[48]].ListItem(e[173]+x,null,x);this[e[171]][e[33]](F);if(z==x){this[e[171]][e[54]]([F]);}}this[e[171]][e[122]](e[167],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZQ);var v=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[174]),textColor:e[169],margin:5});C[e[33]](v);var u=Addons[e[51]][e[50]](e[175],e[176]);this[e[177]]=new qx[e[6]][e[48]].TextField(u)[e[117]]({width:50});C[e[33]](this.ZY);this[e[137]]=[];this[e[137]][0]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[178]));this[e[137]][0][e[166]](5);this[e[137]][0][e[179]](e[169]);this[e[137]][0][e[181]](Addons[e[51]][e[50]](e[180],false));this[e[137]][0][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][0]);this[e[137]][1]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[183]));this[e[137]][1][e[166]](5);this[e[137]][1][e[179]](e[169]);this[e[137]][1][e[181]](Addons[e[51]][e[50]](e[184],false));this[e[137]][1][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][1]);this[e[137]][2]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[185]));this[e[137]][2][e[166]](5);this[e[137]][2][e[179]](e[169]);this[e[137]][2][e[181]](Addons[e[51]][e[50]](e[186],false));this[e[137]][2][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][2]);this[e[137]][3]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[187]));this[e[137]][3][e[166]](5);this[e[137]][3][e[179]](e[169]);this[e[137]][3][e[181]](Addons[e[51]][e[50]](e[188],true));this[e[137]][3][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][3],{lineBreak:true});this[e[154]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[152]))[e[117]]({width:100,minWidth:100,maxWidth:100,height:25,margin:5});this[e[154]][e[122]](e[189],function(){this.FE();},this);C[e[33]](this.ZG);var t=new qx[e[6]][e[192]].Single(2,e[190],e[191]);this[e[193]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Basic())[e[117]]({decorator:t,backgroundColor:e[194],allowGrowX:false,height:20,width:200});this[e[195]]=new qx[e[6]][e[140]].Widget()[e[117]]({decorator:null,backgroundColor:e[196],width:0});this[e[193]][e[33]](this.ZU);this[e[197]]=new qx[e[6]][e[170]].Label(e[173])[e[117]]({decorator:null,textAlign:e[198],width:200});this[e[193]][e[33]](this.ZX,{left:0,top:-3});C[e[33]](this.ZV);this[e[199]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[200]))[e[117]]({minWidth:100,height:25,margin:5});this[e[199]][e[122]](e[189],function(){this[e[201]]=[];},this);C[e[33]](this.YZ);this[e[137]][4]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[202]));this[e[137]][4][e[166]](5);this[e[137]][4][e[179]](e[169]);C[e[33]](this[e[137]][4],{lineBreak:true});this[e[203]]=new qx[e[6]][e[48]].SelectBox();this[e[203]][e[13]](150);this[e[203]][e[14]](25);this[e[203]][e[166]](5);var F=new qx[e[6]][e[48]].ListItem(e[204]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[205]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,7);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[206]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[207]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,6);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[208]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[209]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,5);this[e[203]][e[33]](F);C[e[33]](this.ZJ);this[e[210]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[211]))[e[117]]({width:120,minWidth:120,maxWidth:120,height:25,margin:5});this[e[210]][e[122]](e[189],function(){var H=window[e[213]][e[212]][e[11]]();H[e[215]](this[e[10]][e[64]](e[214]));},this);this[e[210]][e[216]](false);C[e[33]](this.ZD);this[e[217]]=new qx[e[6]][e[165]].Composite();this[e[217]][e[27]](new qx[e[6]][e[26]].Flow());this[e[217]][e[13]](750);var A=webfrontend[e[219]][e[26]][e[218]][e[11]]();var y=2;for(y=2;y<this[e[35]][e[109]]();y++){var w=y-2;this[e[220]][w]=new qx[e[6]][e[48]].CheckBox(this[e[35]][e[221]](y));this[e[220]][w][e[181]](this[e[87]][e[108]]()[e[222]](y));this[e[220]][w][e[179]](e[169]);this[e[220]][w][e[223]]=y;this[e[220]][w][e[60]]=this[e[87]];this[e[220]][w][e[122]](e[182],function(H){var I=this[e[60]][e[108]]();I[e[111]](this[e[223]],H[e[125]]());Addons[e[51]][e[128]](e[110]+this[e[223]],H[e[125]]());});this[e[217]][e[33]](this[e[220]][w]);}this[e[224]]=new qx[e[6]][e[48]].Button(e[225])[e[117]]({margin:5});this[e[224]][e[122]](e[189],function(){if(this[e[226]]){C[e[227]](this.ZB,this.ZO);this[e[224]][e[153]](e[228]);}else{C[e[229]](this.ZB);this[e[224]][e[153]](e[225]);}this[e[226]]=!this[e[226]];},this);this[e[224]][e[231]](e[230]);C[e[33]](this.ZO,{lineBreak:true});this[e[232]]=C;}catch(E){console[e[37]](e[233],E);}},FD:function(){var v=ClientLib[e[86]][e[85]].GetInstance()[e[148]]();var t=v[e[147]]();var u=e[234];var w=new qx[e[6]][e[170]].Label()[e[117]]({value:u,rich:true,width:800});this[e[235]]=w;},FE:function(){var u=this[e[46]][e[237]]()[0][e[236]]();ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(u[e[238]](),u[e[239]]());ClientLib[e[135]][e[134]].GetInstance().Update();ClientLib[e[135]][e[134]].GetInstance().ViewUpdate();ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](u[e[52]]());if(this[e[241]]){var t=ClientLib[e[86]][e[244]][e[243]][e[242]];var y=g(t[e[245]],/this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/,e[246],2);if(y!=null&&y[1][e[131]]==6){t[e[247]]=function(){return this[y[1]];};}else{console[e[249]](e[248]);}if(y!=null&&y[2][e[131]]==6){t[e[250]]=function(){return this[y[2]];};}else{console[e[249]](e[251]);}t=ClientLib[e[86]][e[244]][e[252]][e[242]];var x=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/,e[253],2);if(x!=null&&x[1][e[131]]==6){t[e[247]]=function(){return this[x[1]];};}else{console[e[249]](e[254]);}if(x!=null&&x[2][e[131]]==6){t[e[250]]=function(){return this[x[2]];};}else{console[e[249]](e[255]);}t=ClientLib[e[86]][e[244]][e[256]][e[242]];var w=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&.*=-1;\}this\.(.{6})=\(/,e[257],4);if(w!=null&&w[1][e[131]]==6){t[e[247]]=function(){return this[w[1]];};}else{console[e[249]](e[258]);}if(w!=null&&w[2][e[131]]==6){t[e[259]]=function(){return this[w[2]];};}else{console[e[249]](e[260]);}if(w!=null&&w[4][e[131]]==6){t[e[250]]=function(){return this[w[4]];};}else{console[e[249]](e[261]);}this[e[241]]=false;}if(this[e[31]]==null){this[e[155]]=false;this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);window[e[264]](e[263],1000);return;}var v=0;for(i=0;i<this[e[31]][e[131]];i++){if(this[e[31]][i][1]==-1){v++;}}if(!this[e[155]]){this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);if(v>0){this[e[155]]=true;window[e[264]](e[265],1000);return;}else{this[e[155]]=false;window[e[264]](e[263],1000);}}else{this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));}},FP:function(v,u,t){if(this[e[195]]!=null&&this[e[197]]!=null){this[e[195]][e[13]](parseInt(v/u*t,10));this[e[197]][e[181]](v+e[266]+u);}},FJ:function(){try{this[e[267]]={};this[e[31]]=[];var N=this[e[46]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[49],N[e[52]]());var G=this[e[171]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[172],G);Addons[e[51]][e[128]](e[175],this[e[177]][e[136]]());var M=this[e[137]][0][e[136]]();var L=this[e[137]][1][e[136]]();var K=this[e[137]][2][e[136]]();var J=this[e[137]][3][e[136]]();var I=parseInt(this[e[177]][e[136]](),10);Addons[e[51]][e[128]](e[180],M);Addons[e[51]][e[128]](e[184],L);Addons[e[51]][e[128]](e[186],K);Addons[e[51]][e[128]](e[188],J);var F=N[e[238]]();var E=N[e[239]]();var H=0;var C=0;var B=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();console[e[9]](e[269]+N[e[270]]());var A=true;var y=true;var w=true;var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[271]]();for(C=E-Math[e[161]](u+1);C<=E+Math[e[161]](u+1);C++){for(H=F-Math[e[161]](u+1);H<=F+Math[e[161]](u+1);H++){var t=Math[e[160]](F-H);var R=Math[e[160]](E-C);var Q=Math[e[273]]((t*t)+(R*R));if(Q<=u){var P=B.GetObjectFromPosition(H,C);var z={};if(P){if(P[e[274]]==1&&A){}if(P[e[274]]==2&&y){}if(P[e[274]]==3&&w){}if(P[e[274]]==3){if(I<=parseInt(P[e[247]](),10)){}}var x=N.CalculateAttackCommandPointCostToCoord(H,C);if(x<=G&&typeof P[e[247]]==e[275]){if(I<=parseInt(P[e[247]](),10)){var v=this.FL(P[e[250]](),0);var D=this.FL(P[e[250]](),1);if(D!=null){this[e[267]][P[e[250]]()]=D;}if(P[e[274]]==1&&M){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[178]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==2&&L){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[183]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==3&&(K||J)){if(v!=null){if(P[e[259]]()==2&&J){this[e[31]][e[276]](v);}if(P[e[259]]()==3&&K){this[e[31]][e[276]](v);}}else{if(P[e[259]]()==2&&J){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[187]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}if(P[e[259]]()==3&&K){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[185]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}}}}}}}}this[e[155]]=true;this[e[35]][e[34]](this.ZE);this.FP(0,this[e[31]][e[131]],200);this[e[35]][e[277]](4,false);if(this[e[83]][e[278]]!=e[279]){window[e[264]](e[265],50);}}catch(O){console[e[37]](e[280],O);}},FG:function(){try{var u=false;var t=0;var X=10;var y=0;var R=150;while(!u){var Q=null;var O=0;var M=0;if(this[e[31]]==null){console[e[282]](e[281]);this[e[155]]=false;break;}for(y=0;y<this[e[31]][e[131]];y++){if(this[e[31]][y][1]==-1){break;}}if(y==this[e[31]][e[131]]){this[e[155]]=false;}this.FP(y,this[e[31]][e[131]],200);if(this[e[31]][y]==null){console[e[282]](e[283]);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[210]][e[216]](true);break;}posData=this[e[31]][y][3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);var K=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();var v=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();var I=v.CheckFoundBase(posX,posY,K[e[284]](),K[e[285]]());this[e[31]][y][19]=(I==0)?true:false;M=this[e[31]][y][0];ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](M);Q=ClientLib[e[86]][e[85]].GetInstance()[e[148]]().GetCity(M);if(Q!=null){if(!Q[e[286]]()){var E=Q[e[287]]();if(E!=null){var T=this[e[46]][e[237]]()[0][e[236]]();var C=Q[e[289]]()[e[288]];var z=E[e[290]]()[e[288]];var w=T[e[287]]()[e[291]]()[e[288]];if(C!=null){var P=d(C);var L=d(z);this[e[31]][y][2]=Q[e[270]]();this[e[31]][y][5]=P[ClientLib[e[293]][e[292]][e[67]]]+L[ClientLib[e[293]][e[292]][e[67]]];this[e[31]][y][6]=P[ClientLib[e[293]][e[292]][e[68]]]+L[ClientLib[e[293]][e[292]][e[68]]];this[e[31]][y][7]=P[ClientLib[e[293]][e[292]][e[294]]]+L[ClientLib[e[293]][e[292]][e[294]]];this[e[31]][y][8]=P[ClientLib[e[293]][e[292]][e[295]]]+L[ClientLib[e[293]][e[292]][e[295]]];if(Q.GetBuildingsConditionInPercent()!=0){this[e[296]]=0;if(this[e[31]][y][5]!=0){var S=0;var J=0;var B=0;var H=0;var G=0;this[e[267]][M]=new Array(9);for(B=0;B<9;B++){this[e[267]][M][B]=new Array(8);}for(H=0;H<9;H++){for(G=0;G<8;G++){switch(Q.GetResourceType(H,G)){case 1:this[e[267]][M][H][G]=1;S++;break;case 2:this[e[267]][M][H][G]=2;J++;break;default:break;}}}this[e[31]][y][9]=S;this[e[31]][y][10]=J;this[e[31]][y][11]=Q.GetBuildingsConditionInPercent();this[e[31]][y][12]=Q.GetDefenseConditionInPercent();try{var F=w;var D=0;var A=0;for(var V in F){D+=F[V][e[297]]();}F=z;for(var V in F){A+=F[V][e[297]]();}F=C;for(var V in F){var U=F[V][e[298]]();if(U==158||U==131||U==195){this[e[31]][y][18]=8-F[V][e[299]]();}if(U==112||U==151||U==177){this[e[31]][y][17]=8-F[V][e[299]]();}}}catch(N){console[e[37]](e[300],N);}this[e[31]][y][14]=(A/D);this[e[31]][y][15]=this[e[31]][y][5]+this[e[31]][y][6]+this[e[31]][y][7];this[e[31]][y][16]=this[e[31]][y][15]/this[e[31]][y][13];this[e[31]][y][1]=0;u=true;console[e[9]](Q[e[270]](),e[301]);this[e[296]]=0;this[e[302]]=0;this.FK(this[e[31]][y],this[e[267]][M],M);this[e[35]][e[34]](this.ZE);}}else{if(this[e[296]]>250){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[304]);this[e[31]][e[305]](y,1);this[e[296]]=0;this[e[302]]=0;break;}this[e[296]]++;}}}}else{console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[306]);this[e[31]][e[305]](y,1);break;}}}t++;if(t>=X){u=true;break;}}if(this[e[307]]!=y){this[e[307]]=y;this[e[302]]=0;this[e[296]]=0;}else{if(this[e[302]]>16){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[308]);this[e[31]][e[305]](y,1);this[e[302]]=0;}else{if(this[e[302]]>10){R=500;}else{if(this[e[302]]>4){R=250;}}}this[e[302]]++;}if(this[e[155]]&&Addons[e[121]][e[11]]()[e[41]]()){window[e[264]](e[265],R);}else{this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;}}catch(W){console[e[37]](e[309],W);}},FK:function(v,u,t){this[e[201]][e[276]](v);this[e[310]][t]=u;},FL:function(u,v){if(v==0){for(var t=0;t<this[e[201]][e[131]];t++){if(this[e[201]][t][0]==u){return this[e[201]][t];}}}else{if(this[e[310]][u]){return this[e[310]][u];}}return null;}}});qx[e[312]][e[311]](e[313],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[314]+window[e[0]]);this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](false);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](false);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](10);this[e[27]](new qx[e[6]][e[26]].Grow());this[e[315]]=[];this[e[32]]();this[e[201]]=new qx[e[6]][e[165]].Scroll();this[e[177]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Flow());this[e[33]](this.ZZ,{flex:3});this[e[201]][e[33]](this.ZY);}catch(t){console[e[37]](e[316],t);}},members:{ZW:null,ZZ:null,ZY:null,ZX:null,openWindow:function(u){try{this[e[40]](u);if(this[e[41]]()){this[e[42]]();}else{this[e[55]]();this[e[56]](100,100);this.FO();}}catch(t){console[e[58]](e[317],t);}},FO:function(){var H=window[e[213]][e[121]][e[11]]()[e[267]];var F=window[e[213]][e[121]][e[11]]()[e[31]];this[e[197]]=[];var D=window[e[213]][e[121]][e[11]]()[e[203]][e[237]]()[0][e[236]]();var B=null;if(F==null){console[e[9]](e[318]);return;}this[e[315]]=[];var w;var u;var z;var y;var I;for(w in H){for(u=0;u<F[e[131]];u++){if(F[u][0]==w){B=F[u];}}if(B==null){continue;}if(D>4&&D<8){if(D!=B[10]){continue;}}else{continue;}posData=B[3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);}var t=e[319];var G=B[2]+e[320]+B[3];t=t+e[321]+G+e[322];for(y=0;y<8;y++){t=t+e[323];for(z=0;z<9;z++){var E=e[173];var C=H[w][z][y];switch(C==undefined?0:C){case 2:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[67]]]+e[325];break;case 1:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[68]]]+e[325];break;default:E=e[324]+p[e[113]][e[326]]+e[325];break;}t=t+e[327]+E+e[328];}t=t+e[329];}t=t+e[330];var v=new qx[e[6]][e[170]].Label()[e[117]]({backgroundColor:e[331],value:t,rich:true});v[e[332]]=w;this[e[197]][e[276]](w);v[e[122]](e[333],function(L){var K=qx[e[140]][e[139]][e[138]]();K[e[142]]()[e[141]]();K[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],this[e[332]],0,0);var J=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(J!=null){J[e[150]]()[e[149]](this[e[332]]);}});v[e[334]]=w;this[e[315]][e[276]](v);}this[e[177]][e[32]]();var A=0;var x=0;for(I=0;I<this[e[315]][e[131]];I++){this[e[177]][e[33]](this[e[315]][I],{row:A,column:x});x++;if(x>4){x=0;A++;}}}}});qx[e[312]][e[311]](e[335],{type:e[336],extend:qx[e[140]][e[53]],statics:{isSupported:function(){return typeof(localStorage)!==e[337];},isdefined:function(t){return(localStorage[t]!==e[337]&&localStorage[t]!=null);},isdefineddata:function(u,t){return(u[t]!==e[337]&&u[t]!=null);},setglobal:function(v,t){try{if(Addons[e[51]][e[338]]()){localStorage[v]=JSON[e[339]](t);}}catch(u){console[e[37]](e[340],u);}},getglobal:function(v,u){try{if(Addons[e[51]][e[338]]()){if(Addons[e[51]][e[341]](v)){return JSON[e[342]](localStorage[v]);}}}catch(t){console[e[58]](e[343],t);}return u;},setserver:function(w,t){try{if(Addons[e[51]][e[338]]()){var v=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();var x;if(Addons[e[51]][e[341]](v)){try{x=JSON[e[342]](localStorage[v]);if(!(typeof x===e[344])){x={};console[e[37]](e[345]);}}catch(u){console[e[37]](e[346],u);x={};}}else{x={};}x[w]=t;localStorage[v]=JSON[e[339]](x);}}catch(u){console[e[37]](e[347],u);}},getserver:function(w,v){try{if(Addons[e[51]][e[338]]()){var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();if(Addons[e[51]][e[341]](u)){var x=JSON[e[342]](localStorage[u]);if(Addons[e[51]][e[348]](x,w)){return x[w];}}}}catch(t){console[e[58]](e[349],t);}return v;}}});if(typeof Addons[e[12]]===e[337]){qx[e[312]][e[311]](e[350],{type:e[3],extend:qx[e[140]][e[53]],members:{d:{},debug:false,addtranslateobj:function(t){if(t[e[352]](e[351])){this[e[288]][t[e[351]].toString()]=t;if(this[e[37]]){console[e[58]](e[353],t[e[351]].toString());}delete t[e[351]];}else{console[e[37]](e[354]);}},get:function(v){var u=qx[e[357]][e[356]][e[11]]()[e[355]]();var t=u[e[133]](e[358])[0];if(this[e[288]][e[352]](v)){if(this[e[288]][v][e[352]](t)){return this[e[288]][v][t];}}if(this[e[37]]){console[e[37]](e[359],v,e[360],t);}return v;}}});}qx[e[312]][e[311]](e[361],{extend:qx[e[6]][e[60]][e[118]][e[362]],properties:{replaceMap:{check:e[53],nullable:true,init:null},replaceFunction:{check:e[363],nullable:true,init:null}},members:{_getContentHtml:function(w){var x=w[e[364]];var v=this[e[365]]();var u=this[e[366]]();var t;if(v){t=v[x];if(typeof t!=e[337]){w[e[364]]=t;return qx[e[369]][e[368]][e[367]](this._formatValue(w));}}if(u){w[e[364]]=u(x);}return qx[e[369]][e[368]][e[367]](this._formatValue(w));},addReversedReplaceMap:function(){var t=this[e[365]]();for(var v in t){var u=t[v];t[u]=v;}return true;}}});console[e[9]](e[370]);var s=Addons[e[12]][e[11]]();s[e[37]]=false;s[e[373]]({main:e[371],de:e[372],pt:e[372],fr:e[372]});s[e[373]]({main:e[374],de:e[375],pt:e[376],fr:e[377]});s[e[373]]({main:e[152],de:e[378],pt:e[379],fr:e[380]});s[e[373]]({main:e[65],de:e[381],pt:e[382],fr:e[383]});s[e[373]]({main:e[178],de:e[384],pt:e[385],fr:e[386]});s[e[373]]({main:e[183],de:e[183],pt:e[183],fr:e[183]});s[e[373]]({main:e[387],de:e[388],pt:e[389],fr:e[390]});s[e[373]]({main:e[187],de:e[391],pt:e[187],fr:e[187]});s[e[373]]({main:e[185],de:e[392],pt:e[393],fr:e[394]});s[e[373]]({main:e[214],de:e[214],pt:e[395],fr:e[396]});s[e[373]]({main:e[397],de:e[398],pt:e[399],fr:e[400]});s[e[373]]({main:e[73],de:e[401],pt:e[402],fr:e[403]});s[e[373]]({main:e[74],de:e[404],pt:e[405],fr:e[406]});s[e[373]]({main:e[75],de:e[407],pt:e[75],fr:e[75]});s[e[373]]({main:e[168],de:e[408],pt:e[409],fr:e[410]});s[e[373]]({main:e[174],de:e[411],pt:e[412],fr:e[413]});s[e[373]]({main:e[200],de:e[414],pt:e[415],fr:e[416]});s[e[373]]({main:e[202],de:e[417],pt:e[418],fr:e[419]});s[e[373]]({main:e[81],de:e[420],pt:e[421],fr:e[422]});s[e[373]]({main:e[423],de:e[424],pt:e[425],fr:e[424]});s[e[373]]({main:e[426],de:e[427],pt:e[428],fr:e[429]});s[e[373]]({main:e[430],de:e[431],pt:e[432],fr:e[433]});s[e[373]]({main:e[67],de:e[67],pt:e[434],fr:e[67]});s[e[373]]({main:e[68],de:e[435],pt:e[436],fr:e[436]});s[e[373]]({main:e[437],de:e[438],pt:e[439],fr:e[440]});s[e[373]]({main:e[69],de:e[441],pt:e[442],fr:e[443]});s[e[373]]({main:e[70],de:e[444],pt:e[445],fr:e[446]});s[e[373]]({main:e[447],de:e[448],pt:e[448],fr:e[448]});var r=null;var q=null;var p=null;var o=null;var n=0;var m=0;o=ClientLib[e[450]][e[449]].GetInstance();r=window[e[45]][e[12]][e[11]]();q=window[e[45]][e[44]][e[11]]();p=window[e[45]][e[293]][e[11]]();p[e[453]](e[451],e[452],o);p[e[453]](e[326],e[454],o);var l=p[e[457]](s[e[64]](e[374])+e[455]+window[e[0]],e[451],false,p[e[456]](2));l[e[122]](e[189],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},this);Addons[e[121]][e[11]]()[e[122]](e[42],Addons[e[121]][e[11]]().FN,Addons[e[121]][e[11]]());p[e[459]](e[451],l);if(typeof Addons[e[460]]!==e[337]){var k=Addons[e[460]][e[11]]();k.AddMainMenu(e[461],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},e[462]);}}function d(o){try{var q=[0,0,0,0,0,0,0,0];if(o==null){return q;}for(var l in o){var n=o[l];var m=MaelstromTools[e[463]].GetUnitLevelRequirements(n);for(var k=0;k<m[e[131]];k++){q[m[k][e[274]]]+=m[k][e[464]]*n[e[465]]();if(n[e[465]]()<1){}}}return q;}catch(p){console[e[37]](e[466],p);}}function f(k){var m;for(m in k){if(typeof(k[m])==e[275]){var l=k[m].toString();console[e[37]](m,l);}}}function g(k,r,q,m){var p=[];var o=k.toString();var n=o[e[467]](/\s/gim,e[173]);p=n[e[468]](r);var l;for(l=1;l<(m+1);l++){if(p!=null&&p[l][e[131]]==6){console[e[37]](q,l,p[l]);}else{if(p!=null&&p[l][e[131]]>0){console[e[282]](q,l,p[l]);}else{console[e[249]](e[469],q,l,e[470]);console[e[282]](q,n);}}}return p;}function h(){try{if(typeof qx!=e[337]&&typeof MaelstromTools!=e[337]){j();}else{window[e[264]](h,1000);}}catch(k){console[e[37]](e[471],k);}}if(/commandandconquer\.com/i[e[473]](document[e[472]])){window[e[264]](h,10000);}};try{var a=document.createElement("script");a.innerHTML="("+b.toString()+")();";a.type="text/javascript";if(/commandandconquer\.com/i.test(document.domain)){document.getElementsByTagName("head")[0].appendChild(a);}}catch(c){console.debug("MaelstromTools_Basescanner: init error: ",c);}}
)();

/***********************************************************************************
CCTA Zoom (KOMMANDO)
***********************************************************************************/

(function (){
  var tazoom_main = function() {
    function initialize() {
      console.log("Zoom Loaded");
      
      var zoomMin = 2.0;	// Larger number means able to zoom in closer.
      var zoomMax = 0.1;	// Smaller number means able to zoom out further.
      var zoomInc = 0.08;	// Larger number for faster zooming, Smaller number for slower zooming.
      
      webfrontend.gui.BackgroundArea.prototype.onHotKeyPress = function(be) {
        if(!this.active || be.getTarget() != this.mapContainer)
          return;
        var bh = be.getKeyIdentifier();
        var bf = ClientLib.Vis.VisMain.GetInstance();
        switch(bh) {
          case "+":
            var bg = bf.get_Region().get_ZoomFactor() + zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
          case "-":
            var bg = bf.get_Region().get_ZoomFactor() - zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
        }
        this.closeCityInfo();
        this.closeCityList();
      }

      var backgroundArea = qx.core.Init.getApplication().getBackgroundArea();
      qx.bom.Element.removeListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.removeListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      webfrontend.gui.BackgroundArea.prototype._onMouseWheel = function(e) {
        if(this.activeSceneView == null)
          return;
        var bz = e.getWheelDelta();
        var by = this.activeSceneView.get_ZoomFactor();
        by += bz > 0 ? -zoomInc : zoomInc;
        by = Math.min(zoomMin, Math.max(zoomMax, by));
        this.activeSceneView.set_ZoomFactor(by);
        e.stop();
      }
      qx.bom.Element.addListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.addListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea); 
    }
 
    function tazoom_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tazoom_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tazoom_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tazoom_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tazoomScript = document.createElement("script");
  tazoomScript.innerHTML = "(" + tazoom_main.toString() + ")();";
  tazoomScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tazoomScript);
  }
})();


// ==UserScript==
// @name           TACS (Tiberium Alliances Combat Simulator)
// @description    Allows you to simulate combat before actually attacking.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        3.0b
// @author         WildKatana | Updated by CodeEcho, PythEch, Matthias Fuchs, Enceladus, KRS_L, TheLuminary, Panavia2, Da Xue, MrHIDEn, TheStriker, JDuarteDJ, null
// @translator     TR: PythEch | DE: Matthias Fuchs & Leafy | PT: JDuarteDJ & Contosbarbudos | IT: Hellcco | NL: SkeeterPan | HU: Mancika | FR: Pyroa & NgXAlex | FI: jipx
// @grant none
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('nS.eZ=nR.cB.nQ;(1c(){1d p=7b.nT("cB");p.nU="("+1c(){1c d(d){1v{if(-1<w.4D(p)){1d q=z[d][w.4D(p)];2v""!==q?q:d}2v d}1u(E){2v 1j.1l(E),d}}1c q(){1v{if("3V"!==2E qx){1d x=qx.3h.3w.3v(),w=qx.3h.3w.3v().nW(),E=1e.1P.6k.2L(),z=1e.1Q.cr.2L();if(x&&w&&E&&z&&"3V"!==2E ax)if(10<G||"3V"!==2E 9u){qx.nV.nP("2m",{es:"nO",nJ:qx.3h.nI,nH:{1V:{bH:{9G:"nK"},5H:{9w:cG,9I:cG},3k:{3H:!0,3R:!0,3N:!1,3M:!1,3J:!1},4a:{em:!0},6e:{3s:1A}},17:{1a:{1B:{52:18,6t:18},2k:18,3F:18,1D:18,nL:18,5L:18,5S:18,5P:18,5W:18,2S:18,2Q:18,2R:18,3A:18,3E:18,3n:18,61:18,6q:18,5X:18,1f:18},2k:{5I:18,5B:18},55:18,4R:18,4V:18,4Y:18,6F:18},1g:{2W:{6G:18,6C:18,6D:18,5R:18},2h:{2y:18,2K:18,2I:18,1K:18},1D:{2y:18,2K:18,2I:18,1K:18,2a:18,5Z:18},2l:{8j:18,8k:18,7a:18,5b:18,8m:18},1q:{2r:{1K:18},1E:{3B:18,47:18,3L:18,4j:18,1K:18},1K:18},42:18,49:18},1i:{2h:{2y:18,2K:18,2I:18,1K:18},1D:{2a:18},2T:{2y:18,2K:18,2I:18,2a:18},2l:{2a:18},1q:{2r:{1K:18},1E:{3B:18,47:18,3L:18,4j:18,1K:18},1K:18,5M:18},42:18,49:18,4b:18},1Y:{4W:18,7C:18,nN:18,8C:18,5Q:18,bm:18,2p:18},1F:{3K:18,4p:18,3l:18,3f:18,9O:18},1f:{43:18,4i:18,9Z:18,9X:18,7i:18,3G:18,4t:18,4q:18,4g:18,4k:18,3H:18,3R:18,3N:18,7h:18,3s:18,7m:18,3M:18,3J:18},4a:{4J:18,4O:18},3r:18,1O:18,nM:18,3d:18,cW:18,6a:18,4l:18,1N:18,nX:18,nY:18,2g:18,2V:18,3X:18,a1:18,57:18,9z:18,7L:18,5u:18,6s:18,2i:18,o9:18,o8:18,oa:18,ob:18,1I:18,a0:od,96:c5,4T:c7,2w:18,2U:[],78:18,4L:18,7s:18,9i:18,5n:18,dh:18,oc:18,4M:[],8Q:18,8P:18,bX:1c(){1d b=1C.er("2m");if(18!=b){1d b=1Z.2F(b),a;24(a in 14.1V)if("9v"==2E b[a])24(1d c in 14.1V[a])"9v"!=2E b[a][c]&&"3V"==2E b[a][c]&&(1j.1l("cp cq 52 9G: "+a+"."+c),b[a][c]=14.1V[a][c]);3q"3V"==2E b[a]&&(1j.1l("cp cq 9G bH: "+a),b[a]=14.1V[a]);14.1V=b;14.6o()}},6o:1c(){1d b=14.1V||2d.2m.2j().1V,b=1Z.3g(b);1C.o7("2m",b)},aA:1c(){1v{14.bX();p=qx.o6.8s.2j().o1();14.5Q="0";14.3r=qx.3h.3w.3v();14.1O=1e.1Q.cr.2L();14.3d=1e.1P.6k.2L();14.cW=14.3d.dk();14.6a=14.3r.4v();14.4l=14.3r.o0();14.1N=14.3r.a6(1e.1Q.a7.a4.nZ);31.36.2n.9t(1e.3Y.5V.2L(),"d7",1e.3Y.d7,14,14.7G);31.36.2n.9t(14.3d,"d4",1e.1P.d4,14,14.eS);31.36.2n.9t(14.1O.2z(),"df",1e.1Q.o2,14,14.dl);14.17.2k.5I=19 qx.ui.1w.1U(d("56"));14.17.2k.5I.1s({1G:80,1T:"1X-1R-1W",1S:d("9g to 4A 56")});14.17.2k.5I.1o("1H",14.ei,14);14.17.2k.5B=19 qx.ui.1w.1U(d("o3"));14.17.2k.5B.1s({1G:50,2e:21,1T:"1X-1R-1W",1S:d("7e to fD")});14.17.2k.5B.1o("1H",14.eC,14);1d b=14.3r.o5();b.1b(14.17.2k.5I,{1M:12,2f:nG});"3V"!=2E 9u&&9u&&b.1b(14.17.2k.5B,{1M:38,2f:ni});14.17.1a.3F=19 qx.ui.1w.1U(d("4d"));14.17.1a.3F.1s({1G:45,2e:45,3y:0,1T:"1X-1R-1W",1S:d("4d 4o 1U")});14.17.1a.3F.1o("1H",14.dM,14);14.17.1a.3F.2X(0.5);1d a=1C.6b;(a=a?1Z.2F(1C.6b):!0)&&14.1N.1b(14.17.1a.3F,{1M:b1,26:9});14.17.1a.1D=19 qx.ui.1w.1U(d("4d"));14.17.1a.1D.1s({1G:45,2e:45,3y:0,1T:"1X-1R-1W",1S:d("4d 3b 1U")});14.17.1a.1D.1o("1H",14.dK,14);14.17.1a.1D.2X(0.5);(a=(a=1C.6d)?1Z.2F(1C.6d):!0)&&14.1N.1b(14.17.1a.1D,{1M:16,26:9});1d c=1e.1Q.nh.2b;c.7M||(c.7M=c.4K);c.4K=1c(a){14.7M(a);2d.2m.2j().8L()};c.9y||(c.9y=c.9L);c.9L=1c(a,b){1d c=2d.2m.2j();if(c.1f.4k.1k()&&2<=c.4L&&14.4E()===a&&14.4w()===b){1d e=14.65();14.7M(e^1)}14.9y(a,b);c.8L();c.4L=0;6z(c.7s)};14.aY();14.2V=(19 qx.ui.2d.59(d("4Z"),"3S/2Z/8R.1J")).1s({9V:1,9U:8,9T:8,9W:8,1G:cD,2e:cD,cO:!1,cK:!1,cJ:!1,cF:!1,bF:!1});14.2V.cH("2Y").1s({aI:!0,1G:25,2e:25});14.2V.2c(19 qx.ui.1B.41);1d e=1C.9x;if(e){1d e=1Z.2F(1C.9x),h=1Z.2F(1C.cL);14.2V.aQ(h,e)}3q 14.2V.8w();14.2V.1o("7n",1c(){1C.9x=1Z.3g(14.2V.cM().1M);1C.cL=1Z.3g(14.2V.cM().2f);14.6o()},14);14.2g=(19 qx.ui.2d.59("2m","3S/2Z/ng.1J")).1s({9V:0,9U:2,9T:2,9W:6,cO:!1,cK:!1,cJ:!1,cF:!1,bF:!1});14.2g.cH("2Y").1s({aI:!0,1G:20,2e:20,nj:"4r"});14.2g.2c(19 qx.ui.1B.9K);14.2g.aQ(14.1V.5H.9w,14.1V.5H.9I);14.2g.1o("nk",1c(){14.1V.5H.9w=14.2g.5i().2f;14.1V.5H.9I=14.2g.5i().1M;14.6o()},14);14.2g.1o("76",1c(){14.2g.2X(14.1V.6e.3s/1A)},14);1d f=(19 qx.ui.6x.nl).1s({9V:3,9U:6,9T:7,9W:3});14.2g.1b(f);14.aq(f);14.bw(f);14.b6(f);14.f2();14.6I();14.71(1e.1P.6Z.6Q);14.71(1e.1P.6Z.al);14.71(1e.1P.6Z.nf);14.dX()}1u(g){1j.1l(g)}},aq:1c(b){1v{14.3X=19 qx.ui.6x.9P(d("2J"));14.3X.2c(19 qx.ui.1B.41(1));b.1b(14.3X);1d a=19 qx.ui.2t.2s,c=19 qx.ui.1B.4n;c.4I(0,"2f","4r");c.4I(1,"26","4r");c.51(0,1);c.ne(0,15);a.2c(c);a.3i("3j");a.39("#3a");14.3X.1b(a);14.1i.4b=19 qx.ui.1p.1y("");14.1i.4b.1s({1G:0,2e:10,n8:5,f3:"#n7"});a.1b(14.1i.4b,{1m:0,1n:0});a=19 qx.ui.2t.2s;c=19 qx.ui.1B.4n;c.4I(1,"26","4r");c.51(0,1);a.2c(c);a.3i("3j");a.39("#3a");14.3X.1b(a);a.1b(19 qx.ui.1p.1y(d("cR 1z:")),{1m:0,1n:0});14.1i.1q.1K=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.1K,{1m:0,1n:1});a.1b(19 qx.ui.1p.1y(d("cY:")),{1m:1,1n:0});14.1i.1q.2r.1K=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.2r.1K,{1m:1,1n:1});a.1b(19 qx.ui.1p.1y(d("cs:")),{1m:2,1n:0});14.1i.1q.1E.1K=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.1E.1K,{1m:2,1n:1});a.1b(19 qx.ui.1p.1y(d("9e bT:")),{1m:3,1n:0});14.1i.1q.1E.3B=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.1E.3B,{1m:3,1n:1});a.1b(19 qx.ui.1p.1y(d("9d c1:")),{1m:4,1n:0});14.1i.1q.1E.47=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.1E.47,{1m:4,1n:1});a.1b(19 qx.ui.1p.1y(d("bJ bI:")),{1m:5,1n:0});14.1i.1q.1E.3L=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.1E.3L,{1m:5,1n:1});14.1i.49=19 qx.ui.1p.1y("");a.1b(14.1i.49,{1m:6,1n:0});14.1i.1q.1E.4j=19 qx.ui.1p.1y("");a.1b(14.1i.1q.1E.4j,{1m:6,1n:1});a=19 qx.ui.2t.2s;c=19 qx.ui.1B.4n;c.4I(1,"26","4r");c.51(0,1);a.2c(c);a.3i("3j");a.39("#3a");14.3X.1b(a);a.1b(19 qx.ui.1p.1y(d("ch:")),{1m:0,1n:0});14.1i.2h.1K=19 qx.ui.1p.1y("1A");a.1b(14.1i.2h.1K,{1m:0,1n:1});a.1b(19 qx.ui.1p.1y(d("4c:")),{1m:1,1n:0});14.1i.2h.2y=19 qx.ui.1p.1y("1A");a.1b(14.1i.2h.2y,{1m:1,1n:1});a.1b(19 qx.ui.1p.1y(d("94:")),{1m:2,1n:0});14.1i.2h.2K=19 qx.ui.1p.1y("1A");a.1b(14.1i.2h.2K,{1m:2,1n:1});a.1b(19 qx.ui.1p.1y(d("93:")),{1m:3,1n:0});14.1i.2h.2I=19 qx.ui.1p.1y("1A");a.1b(14.1i.2h.2I,{1m:3,1n:1});a=19 qx.ui.2t.2s;c=19 qx.ui.1B.4n;c.4I(1,"26","4r");c.51(0,1);a.2c(c);a.3i("3j");a.39("#3a");14.3X.1b(a);a.1b(19 qx.ui.1p.1y(d("c6:")),{1m:0,1n:0});14.1i.1q.5M=19 qx.ui.1p.1y(d("ca"));a.1b(14.1i.1q.5M,{1m:0,1n:1});a.1b(19 qx.ui.1p.1y(d("73 8q:")),{1m:1,1n:0});14.1i.42=19 qx.ui.1p.1y("fA");a.1b(14.1i.42,{1m:1,1n:1});a=19 qx.ui.2t.2s;c=19 qx.ui.1B.4n;c.4I(1,"26","4r");c.51(0,1);a.2c(c);a.3i("3j");a.39("#3a");14.3X.1b(a);a.1b(19 qx.ui.1p.1y(d("7A 3b:")),{1m:0,1n:0});14.1i.1D.2a=19 qx.ui.1p.1y("9Y:9Y:9Y");a.1b(14.1i.1D.2a,{1m:0,1n:1});a.1b(19 qx.ui.1p.1y(d("7A cj:")),{1m:1,1n:0});14.1i.2l.2a=19 qx.ui.1p.1y("CP:- / FR:- / n9:-");a.1b(14.1i.2l.2a,{1m:1,1n:1})}1u(e){1j.1l(e)}},bw:1c(b){1v{1d a=19 qx.ui.6x.9P(d("8n"));a.2c(19 qx.ui.1B.41);b.1b(a);14.1F.4p=19 qx.ui.1w.nb;14.1F.4p.1s({2e:nd,nc:"nn"});a.1b(14.1F.4p);1d c=19 qx.ui.2t.2s;c.2c(19 qx.ui.1B.9K(5));14.17.1a.1B.6t=19 qx.ui.1w.1U(d("7P"));14.17.1a.1B.6t.1s({1G:80,1T:"1X-1R-1W",1S:d("7P 14 5d 1B.")});14.17.1a.1B.6t.1o("1H",14.ct,14);c.1b(14.17.1a.1B.6t);14.6y=19 qx.ui.1w.1U(d("7v"));14.6y.1s({1G:80,1T:"1X-1R-1W",1S:d("7v 14 5d 1B.")});14.6y.1o("1H",14.cx,14);c.1b(14.6y);a.1b(c);1d e=19 qx.ui.2t.2s;e.2c(19 qx.ui.1B.41(1));e.3i("3j");e.6j(2);e.39("#3a");1d h=19 qx.ui.2t.2s;h.2c(19 qx.ui.1B.9K(5));h.1b(19 qx.ui.1p.1y(d("8f: ")));14.1F.3K=19 qx.ui.1w.nA;14.1F.3K.1r("");h.1b(14.1F.3K);e.1b(h);14.17.1a.1B.52=19 qx.ui.1w.1U(d("7F"));14.17.1a.1B.52.1s({1G:80,1T:"1X-1R-1W",1S:d("7F 14 1B.")});14.17.1a.1B.52.1o("1H",14.aP,14);e.1b(14.17.1a.1B.52);a.1b(e)}1u(f){1j.1l(f)}},b6:1c(b){1v{1d a=19 qx.ui.6x.9P(d("4u"));a.2c(19 qx.ui.1B.41(1));b.1b(a);1d c=19 qx.ui.2t.2s;c.2c(19 qx.ui.1B.41(1));c.3i("3j");c.6j(2);c.39("#3a");a.1b(c);1d e=(19 qx.ui.1p.1y).1s({fz:"<a eR=\'dN\' dJ=\'6Y://dQ.dY/e1/dW/dS\'>"+d("6f")+"</a>",ds:!0});c.1b(e);1d h=19 qx.ui.2t.2s;h.2c(19 qx.ui.1B.41(1));h.3i("3j");h.6j(2);h.39("#3a");a.1b(h);h.1b(19 qx.ui.1p.1y(d("c4")));14.1g.2W.6G=19 qx.ui.1p.6A("0","2C/ui/6B/nB.1J");h.1b(14.1g.2W.6G);14.1g.2W.6C=19 qx.ui.1p.6A("0","2C/ui/6B/nC.1J");h.1b(14.1g.2W.6C);14.1g.2W.6D=19 qx.ui.1p.6A("0","2C/ui/6B/nE.1J");h.1b(14.1g.2W.6D);14.1g.2W.5R=19 qx.ui.1p.6A("0","2C/ui/6B/nD.1J");h.1b(14.1g.2W.5R);1d f=19 qx.ui.2t.2s,g=19 qx.ui.1B.4n;f.2c(g);f.3i("3j");f.39("#3a");a.1b(f);14.17.6F=(19 qx.ui.1w.1U).1s({2e:25,1G:aa,nx:15,nw:"8w",3K:d("4Z"),1T:"1X-1R-1W",2Y:"3S/2Z/8R.1J",1S:d("2m 4Z")});14.17.6F.1o("1H",14.8M,14);f.1b(14.17.6F,{1m:0,1n:0});14.2g.1b(b)}1u(j){1j.1l(j)}},f2:1c(){1v{1d b=19 qx.ui.2t.2s;b.2c(19 qx.ui.1B.41(1));b.6j(10);b.39("#3a");14.2V.1b(b);1d a=19 qx.ui.2t.2s,c=19 qx.ui.1B.4n(5,5);c.51(2,1);a.2c(c);a.3i("3j");a.39("#3a");b.1b(a);a.1b(19 qx.ui.1p.1y(d("dV: ")+2d.eZ),{1m:0,1n:0,3e:3});14.1f.43=19 qx.ui.1w.3u(d("7D cg 1g"));1d e=1C.8E;e?(e=1Z.2F(1C.8E),14.1f.43.1r(e)):14.1f.43.1r(!0);14.1f.43.1o("1H",14.bt,14);a.1b(14.1f.43,{1m:1,1n:0,3e:3});14.1f.4g=19 qx.ui.1w.3u(d("dF 5d dE on dn dp"));(e=1C.9R)?(e=1Z.2F(1C.9R),14.1f.4g.1r(e)):14.1f.4g.1r(!0);14.1f.4g.1o("1H",1c(){1C.9R=1Z.3g(14.1f.4g.1k())},14);a.1b(14.1f.4g,{1m:2,1n:0,3e:3});14.1f.4k=19 qx.ui.1w.3u(d("dr \'dm-1H to (De)dg 2r\'"));(e=1C.9S)?(e=1Z.2F(1C.9S),14.1f.4k.1r(e)):14.1f.4k.1r(!0);14.1f.4k.1o("1H",1c(){1C.9S=1Z.3g(14.1f.4k.1k())},14);a.1b(14.1f.4k,{1m:3,1n:0,3e:3});14.1f.4i=19 qx.ui.1w.3u(d("5o ci 17"));(e=1C.5y)?(e=1Z.2F(1C.5y),14.1f.4i.1r(e)):14.1f.4i.1r(!0);14.1f.4i.1o("1H",14.bB,14);a.1b(14.1f.4i,{1m:4,1n:0,3e:3});14.1f.9Z=19 qx.ui.1p.1y(d("ao:"));14.1f.7i=19 qx.ui.1w.eW(d("at"));14.1f.3G=19 qx.ui.1w.eW(d("aT"));1d h=19 qx.ui.1w.np;h.1b(14.1f.7i,14.1f.3G);(e=1C.a8)?(e=1Z.2F(1C.a8),14.1f.3G.1r(e)):14.1f.3G.1r(!0);h.1o("ns",14.6I,14);a.1b(14.1f.9Z,{1m:5,1n:0});a.1b(14.1f.7i,{1m:5,1n:1});a.1b(14.1f.3G,{1m:5,1n:2});14.1f.9X=19 qx.ui.1p.1y(d("bj:"));14.1f.4t=19 qx.ui.1w.3u(d("4o"));(e=1C.6b)?(e=1Z.2F(1C.6b),14.1f.4t.1r(e)):14.1f.4t.1r(!0);14.1f.4q=19 qx.ui.1w.3u(d("3b"));(e=1C.6d)?(e=1Z.2F(1C.6d),14.1f.4q.1r(e)):14.1f.4q.1r(!0);14.1f.4t.1o("1H",14.bA,14);14.1f.4q.1o("1H",14.aZ,14);a.1b(14.1f.9X,{1m:6,1n:0});a.1b(14.1f.4t,{1m:6,1n:1});a.1b(14.1f.4q,{1m:6,1n:2});14.1f.3H=19 qx.ui.1w.3u(d("5o 2J 7f 4o"));14.1f.3H.5e="3H";14.1f.3H.1r(14.1V.3k.3H);14.1f.3H.1o("1H",14.5s,14);a.1b(14.1f.3H,{1m:7,1n:0,3e:3});14.1f.3R=19 qx.ui.1w.3u(d("5o 2J 7f 3W"));14.1f.3R.5e="3R";14.1f.3R.1r(14.1V.3k.3R);14.1f.3R.1o("1H",14.5s,14);a.1b(14.1f.3R,{1m:8,1n:0,3e:3});14.1f.3N=19 qx.ui.1w.3u(d("7e 5l-dD dz 73"));14.1f.3N.5e="3N";14.1f.3N.1r(14.1V.3k.3N);14.1f.3N.1o("1H",14.5s,14);a.1b(14.1f.3N,{1m:9,1n:0,3e:3});2C.3Z.7W.fk.2j().1o("76",1c(){14.1V.3k.3N&&2C.3Z.7W.fk.2j().nv()},14);14.1f.3J=19 qx.ui.1w.3u(d("70 74 In 4o ew ex"));14.1f.3J.5e="3J";14.1f.3J.1r(14.1V.3k.3J);14.1f.3J.1o("1H",14.5s,14);a.1b(14.1f.3J,{1m:10,1n:0,3e:3});14.1f.3M=19 qx.ui.1w.3u(d("70 5k 74 In e3 72 8s"));14.1f.3M.5e="3M";14.1f.3M.1r(14.1V.3k.3M);14.1f.3M.1o("1H",14.5s,14);a.1b(14.1f.3M,{1m:11,1n:0,3e:3});14.1f.7h=19 qx.ui.1p.1y(d("2J 59 dw"));14.1f.7h.nu(10);a.1b(14.1f.7h,{1m:12,1n:0,3e:3});14.1f.3s=19 qx.ui.1w.oe;a.1b(14.1f.3s,{1m:13,1n:1,3e:2});14.1f.3s.1r(14.1V.6e.3s);14.1f.7m=19 qx.ui.1p.1y(f1(14.1V.6e.3s));a.1b(14.1f.7m,{1m:13,1n:0});14.1f.3s.1o("5j",1c(){1d a=14.1f.3s.1k();14.2g.2X(a/1A);14.1f.7m.1r(f1(a)+"%");14.1V.6e.3s=a},14);1d f=19 qx.ui.2t.2s;f.2c(19 qx.ui.1B.41(1));f.3i("3j");f.6j(10);f.39("#3a");b.1b(f);1d g=(19 qx.ui.1p.1y).1s({fz:"<a eR=\'dN\' dJ=\'6Y://dQ.dY/e1/dW/dS\'>"+d("6f")+"</a>",ds:!0});f.1b(g)}1u(j){1j.1l(j)}},5s:1c(b){b=b.p5();1d a=b.1k();14.1V.3k[b.5e]=a;14.6o()},71:1c(b){1v{1d a=b.2b,c;24(c in a)if("1c"===2E a[c]&&(e=a[c].28(),-1<e.4D("oU"))){c=/[A-Z]{6}\\=\\(19 \\$I.[A-Z]{6}\\).[A-Z]{6}\\(\\$I.[A-Z]{6}.aM/;1d e=e.6n(c).28(),d=e.4P(0,6);if(b===1e.1P.6Z.6Q){1d f="2v "+e.4P(12,21)+".2b."+e.4P(23,29)+".28();",g=5w("",f),e=g();c=/.I.[A-Z]{6}.2b.[A-Z]{6}/;1d j=e.6n(/.I.[A-Z]{6}.2b/).28(),e=e.6n(c).28(),f="2v "+e+".28();",g=5w("",f),e=g(),k=e.6n(/14.[A-Z]{6}=a/).28(),k="14."+k.4P(5,11)+"=a;",m=e.6n(/14.[A-Z]{6}\\(\\)/).28(),m="14."+m.4P(5,13)+";",l=j+".8U = 1c(a){"+k+m+"};9A.6U = 1c(){2v 14."+d+";}"}3q l="9A.6U = 1c(){2v 14."+d+";}";g=5w("9A",l);g(a);22}}1u(y){1j.1l(y)}},c9:1c(){1v{1d b=14.6a.3p().5i(),a=14.6a.3p().5i().1G;14.6a.1o("9E",1c(){14.1I.5x()&&(14.2D.2O(),14.1I.9C({4Q:14.a0}),14.1I.33(1))},14);14.4l.1o("76",1c(){14.4l.33(3);14.1I.2O();14.2D.2O()},14);14.4l.1o("oV",1c(){14.4l.5x()||(14.1I.5U(),14.2D.5U())},14);14.2D.1o("9E",1c(){1d c=b.1G;if(a!==c&&(a=c,c=14.4l.5i()))14.1I.eP(c.2f+(c.1G-14.4T)/2),14.2D.eP(c.2f+(c.1G-14.4T)/2);14.2D.5U();14.1I.33(11);14.1I.9C({4Q:14.96})},14);14.1I.1o("76",1c(){14.1I.33(1)},14);14.1N.1o("9E",1c(){14.2D.2O();14.1I.33(1);14.1I.9C({4Q:14.a0})},14);14.1N.1o("1H",1c(){14.4L+=1;1==14.4L&&(14.7s=9k(14.b0,8o))},14)}1u(c){1j.1l(c)}},6I:1c(){1v{1C.a8=1Z.3g(14.1f.3G.1k());1d b=14.3r.a6(1e.1Q.a7.a4.e4),a=14.3r.a6(1e.1Q.a7.a4.e4).3p().3p().5i().1G;14.4L=0;37(14.1O.8G().bn()){1x 1e.1z.5c.8N:1d c="2o:2G/1J;2A,oY+oX+p7+p8/8/pj/pi+pk/pm/po/pn/ph+pg/pb+pa+p9/pc+pd/pf+/pe/oR+oQ+O+ou+ot/os/ov+ow+oy/ox/or/oq/oj/oi/oh/ok+ol/oo/om/oz/oA+oL/oK/oM+oN+oP+oO/oJ+oI+oD+oC/C/oB+/oE/oF",e="2o:2G/1J;2A,oH/oG+n5/n4+/ly/lx+lw/lz/lA/lC++lB/lv+lu+lp+lo+ln/lq/lr+lt+/ls+lD+lE/lP/lO//lQ+lR+lT/lS/lN+lM+/lH+lG/lF/lI%3D%3D",h="2o:2G/1J;2A,lJ/lL+lK+lm/ll//+kX+kW+kV/F2/kY+kZ/l1+l0/kU/kT+kO+kN+kM+kP/kQ/kS/kR+l2+e+l3+lg+lf/lh+ux/li+lk+lj/ld+lc++e+Dx+l6+a+l5/l4+l7/l8/lb+l9/lU+lV/mI+mH/mJ/mK+mM+mL+mG+34//mF/4C/mA%3D%3D",f="2o:2G/1J;2A,mz///my/mB/mC+mE+mD/mN+mO+mZ++mY/n0+n1/n3/n2/mX+mW/mR+mQ+mP+mS+mT+mV/mU+mx/mw/m7/m6//m5/m8+m9/mb/ma/m4+F+m3/lY/G+lX/lW/lZ+m0/m2",g="2o:2G/1J;2A,m1////mc+md/mp+mo+/mq+mr+mv+mu/mn++ml/mg+mf/me+mh+mi/6S/mk+mj";22;1x 1e.1z.5c.8O:c="2o:2G/1J;2A,pp/pq/su/st/ss+sv+sw+sy/sx+sr+sq/sl/sk/sj+sm+f0+sn/sp+/S/6+so/B/sz/sA/sL+sK+sM+sN/sP+sO/sJ/sI+sD+sC+sB+sE/sF/sH+h/sG/si+sg/rT+rS+rR/69+rU/rV/rX+rW/rQ+rP+rK+rJ+rI+rL+rM+rO+rN/rY/c/rZ+sb//s9/sc/sd/sf/se%3D",e="2o:2G/1J;2A,s8+s7+cc+Z//s2/s1/s0/s3/s4+s6/s5/sQ+sR+tE/tD/tF+tG/tJ/tI/tC+tB/tv/tt+ts/tw/tx/tA/tz/tK/tL///tW+tV/tX+tY++u0+tZ+tU/tT+tO+tN/tM+tP+tQ/tS+tR+tr+tq/t3+t2+t1/t4/t5+t7+t6/4/x/t0%3D",h="2o:2G/1J;2A,sZ+sU+n/sT+sS/M+z/sV/sW+sY+sX+t8/t9++tk/tj+U/tl+/tm+/tp/tn+ti/th+tc+L/tb+ta/td/te/tg/tf+m/rH+s/rG/qc/qb+/qa+qd/qe/qg/qf+q9/q8+q3+q2/q1/q4+q5/q7+q6+qh/qi+qt+X+qs/qu+qv+qy+qw/qr/R//qq",f="2o:2G/1J;2A,ql///+qk/qj+qm+qn/qp/qo+/q0+pZ+pD+pC+pB+pE+pF+/pH/pG/pA+pz+pu+ps+/pr/pv/pw/py/kL/pI+pJ/pU+pT+pV+pW+pY//pX/pS/pR+pM+/pL/pK/pN+pO%3D",g="2o:2G/1J;2A,pQ////pP/qz+qA+rk/rj++rl+rm+ro//rn+ri/rh/rc+rb+ra+rd/re+rg+rf/rp+rq/rB%3D%3D"}14.1I&&14.1N.3p().3p().2M(14.1I);14.2w&&b.2M(14.2w);14.2w=19 qx.ui.2t.2s;1d j=19 qx.ui.1B.4n;j.4I(0,"26","4r");14.2w.2c(j);14.2w.3i("3j");14.2w.1s({97:!1});14.2w.1b(19 qx.ui.1p.6r("2C/ui/2Z/rF.1J"),{1m:0,1n:1});14.1i.2T.2a=(19 qx.ui.1p.1y("1A")).1s({7t:"7I"});14.2w.1b(14.1i.2T.2a,{1m:0,1n:0});14.2w.1b(19 qx.ui.1p.6r("2C/ui/2Z/rE.1J"),{1m:1,1n:1});14.1i.2T.2y=(19 qx.ui.1p.1y("1A")).1s({7t:"7I"});14.2w.1b(14.1i.2T.2y,{1m:1,1n:0});14.2w.1b(19 qx.ui.1p.6r("2C/ui/2Z/rz.1J"),{1m:2,1n:1});14.1i.2T.2K=(19 qx.ui.1p.1y("1A")).1s({7t:"7I"});14.2w.1b(14.1i.2T.2K,{1m:2,1n:0});14.2w.1b(19 qx.ui.1p.6r("2C/ui/2Z/ry.1J"),{1m:3,1n:1});14.1i.2T.2I=(19 qx.ui.1p.1y("1A")).1s({7t:"7I"});14.2w.1b(14.1i.2T.2I,{1m:3,1n:0});b.1b(14.2w,{4Q:aK,26:3});14.1I=19 qx.ui.2t.2s;14.1I.2c(19 qx.ui.1B.8W);14.1I.8V(53);14.1I.4N(14.4T);14.1I.1s({7X:(19 qx.ui.88.8b).1s({bp:"3S/ru/rv/rx.1J"}),97:!1});14.1N.3p().3p().1b(14.1I,{4Q:14.96,2f:(a-14.4T)/2,97:!1});14.2D=19 qx.ui.2t.2s;14.2D.2c(19 qx.ui.1B.8W);14.2D.8V(25);14.2D.4N(c7);14.1N.3p().3p().1b(14.2D,{4Q:c5,2f:(a-14.4T)/2});14.2D.5U();14.2D.r8("#qM");14.2D.2X(0);14.2D.33(10);14.c9();14.17.1a.3A=19 qx.ui.1w.5N("","3S/2Z/qK.1J");14.17.1a.3A.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("2P 5G")+"</1t>"});14.17.1a.3A.1o("5j",1c(){1d a=14.17.1a.3A;a.1k()?(a.2X(0.75),a.3Q("<1t>"+d("3x 5G")+"</1t>")):(a.2X(1),a.3Q("<1t>"+d("2P 5G")+"</1t>"))},14);14.17.1a.3A.1o("7k",1c(){1d a=14.17.1a.3A;14.17.1a.2S.1k()!==a.1k()&&14.17.1a.2S.1r(a.1k());14.17.1a.2Q.1k()!==a.1k()&&14.17.1a.2Q.1r(a.1k());14.17.1a.2R.1k()!==a.1k()&&14.17.1a.2R.1r(a.1k())},14);14.17.1a.2S=19 qx.ui.1w.5N("","3S/2Z/qN.1J");14.17.1a.2S.1s({1G:44,2e:40,1T:"1X-1R-1W",1S:"<1t>"+d("2P 4c")+"</1t>"});14.17.1a.2S.1o("5j",1c(){1d a=14.17.1a.2S;a.1k()===14.17.1a.2Q.1k()&&a.1k()===14.17.1a.2R.1k()&&14.17.1a.3A.1r(a.1k());14.7j("2y",!a.1k());a.1k()?(a.2X(0.75),a.3Q("<1t>"+d("3x 4c")+"</1t>")):(a.2X(1),a.3Q("<1t>"+d("2P 4c")+"</1t>"))},14);14.17.1a.2Q=19 qx.ui.1w.5N("","3S/2Z/qO.1J");14.17.1a.2Q.1s({1G:44,2e:40,1T:"1X-1R-1W",1S:"<1t>"+d("2P 5z")+"</1t>"});14.17.1a.2Q.1o("5j",1c(){1d a=14.17.1a.2Q;a.1k()===14.17.1a.2S.1k()&&a.1k()===14.17.1a.2R.1k()&&14.17.1a.3A.1r(a.1k());14.7j("fj",!a.1k());a.1k()?(a.2X(0.75),a.3Q("<1t>"+d("3x 5z")+"</1t>")):(a.2X(1),a.3Q("<1t>"+d("2P 5z")+"</1t>"))},14);14.17.1a.2R=19 qx.ui.1w.5N("","3S/2Z/qQ.1J");14.17.1a.2R.1s({1G:44,2e:40,1T:"1X-1R-1W",1S:"<1t>"+d("2P 4m")+"</1t>"});14.17.1a.2R.1o("5j",1c(){1d a=14.17.1a.2R;a.1k()===14.17.1a.2S.1k()&&a.1k()===14.17.1a.2Q.1k()&&14.17.1a.3A.1r(a.1k());14.7j("fp",!a.1k());a.1k()?(a.2X(0.75),a.3Q("<1t>"+d("3x 4m")+"</1t>")):(a.2X(1),a.3Q("<1t>"+d("2P 4m")+"</1t>"))},14);14.17.1a.5S=19 qx.ui.1w.1U("","2o:2G/1J;2A,qJ/7Q/qI+qD/qC+qB+qE/qF/4+qH+qG/qR+qS+r3+r2/r4+r5/r7/r6+r1/r0/qV+qU/qT+qW+qX/qZ/qY/u1/i0+ha+hc+h9+h7/hk+hm+/hj+hg/hh/h4+/h3/gP+gL+h1+gZ/C/gY/gV/gX+hn/hR/hS+hM/n+hT+hU/hW+hX+hK/+hJ/hu+hw+ht+hs+hG++hH+hI/hF//hD/hC+i2/g1/i/g0+fZ+fX+fY/g4/g9+g7/ga/fN/fL/fU+fS/fV++fO=");14.17.1a.5S.1s({1G:44,2e:40,1T:"1X-1R-1W",1S:"<1t>"+d("7p 72")+"</1t>"});14.17.1a.5S.1o("1H",14.eB,14);14.17.1a.5W=19 qx.ui.1w.1U("",c);14.17.1a.5W.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("7o 87")+"</1t>"});14.17.1a.5W.1o("1H",1c(){14.9Q("f9")},14);14.17.1a.5P=19 qx.ui.1w.1U("",e);14.17.1a.5P.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("7o dO")+"</1t>"});14.17.1a.5P.1o("1H",1c(){14.9Q("fs")},14);14.17.1a.3E=19 qx.ui.1w.5N("","3S/2Z/gJ.1J");14.17.1a.3E.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("3x 3b 4z")+"</1t>"});14.17.1a.3E.1o("7k",14.fm,14);14.17.1a.3E.1o("5j",1c(){1d a=14.17.1a.3E;a.1k()?a.3Q("<1t>"+d("3x 3b 4z")+"</1t>"):a.3Q("<1t>"+d("2P 3b 4z")+"</1t>")},14);14.17.1a.3n=19 qx.ui.1w.1U("",h);14.17.1a.3n.1o("1H",14.aU,14);14.17.1a.3n.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("8X 2J")+"</1t>"});14.17.1a.61=19 qx.ui.1w.1U("","2o:2G/1J;2A,gb+fe+gB+/q/gF/gD/gE+gt/gs++gf/gd/++go+gm+gn+ge+gg//gh/gI/gH/gw+gu+fQ+/fR+fM+fP+kK+jT/jU/jR+jQ+jN+jO/jV+jW+i3+k4+k0+vx/jX+jY+jZ+jM+jL/jy//jA+jx+jw/js/jt/ju+jv+jC/jJ/jK+jH/jG/jD/jE=");14.17.1a.61.1o("1H",14.9q,14);14.17.1a.61.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("5K 2J 59")+"</1t>"});14.17.1a.6q=19 qx.ui.1w.1U("","2o:2G/1J;2A,k5+k6+kx/kz/N//kw+ks/ku+c+kA/kB+kH+kI+kG+kr/kq+BG/kd+F+ke+kf/kc+kb/k8+k9+ka+kg/+kh+kn/ko/km+kl/ki/kj+jq/iy=");14.17.1a.6q.1o("1H",1c(){1j.1l("8y")},14);14.17.1a.6q.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("8y")+"</1t>"});14.17.1a.5X=19 qx.ui.1w.1U("","2o:2G/1J;2A,iz/iA+ix/iw/is+iu+iv/iB+iI/iJ/iH+iG+iD+iE+iF+ir+ib/i9/i5+i7+im+io+il/ii/iL/je/jf+jc+j8+jh/E4/jp/l+jm/jl+ji/jj/j6=");14.17.1a.5X.1o("1H",1c(){1j.1l("8x")},14);14.17.1a.5X.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("<1t>8x")+"</1t>"});14.17.1a.1f=(19 qx.ui.1w.1U).1s({1G:44,2e:40,1T:"1X-1R-1W",2Y:"3S/2Z/8R.1J",1S:"<1t>"+d("4Z")+"</1t>"});14.17.1a.1f.1o("1H",14.8M,14);14.1I.1b(14.17.1a.5P,{1M:10,2f:10});14.1I.1b(14.17.1a.5W,{1M:10,2f:60});14.1I.1b(14.17.1a.3A,{1M:10,2f:aK});14.1I.1b(14.17.1a.2S,{1M:10,2f:j4});14.1I.1b(14.17.1a.2Q,{1M:10,2f:j2});14.1I.1b(14.17.1a.2R,{1M:10,2f:iY});14.1I.1b(14.17.1a.3n,{1M:10,2f:iZ});14.1I.1b(14.17.1a.1f,{1M:10,26:10});14.1I.1b(14.17.1a.3E,{1M:10,26:60});14.1I.1b(14.17.1a.61,{1M:10,26:9J});14.1I.1b(14.17.1a.5X,{1M:10,26:j1});14.1I.1b(14.17.1a.6q,{1M:10,26:jn});14.1I.1b(14.17.1a.5S,{1M:10,26:j9});14.2i&&14.1N.2M(14.2i);if(14.1f.3G.1k())1d k=64,m=g,l=5,y=0,I=30,p=15,q=15;3q k=90,m=f,l=15,y=16,I=46,q=p=30;14.2i=19 qx.ui.2t.2s;14.2i.2c(19 qx.ui.1B.8W);14.2i.8V(aa);14.2i.4N(k);14.2i.1s({7X:(19 qx.ui.88.8b).1s({bp:m})});14.1f.3G.1k()?14.1N.1b(14.2i,{1M:0,26:53}):14.1N.1b(14.2i,{1M:0,2f:0});14.17.1a.2k=19 qx.ui.1w.1U(d("bZ"));14.17.1a.2k.1s({1G:58,1T:"1X-1R-1W",1S:d("9o 4A 3W")});14.17.1a.2k.1o("1H",14.eU,14);14.17.1a.5L=19 qx.ui.1w.1U(d("2J"));14.17.1a.5L.1s({1G:58,1T:"1X-1R-1W",1S:d("5K 7E cT")});14.17.1a.5L.1o("1H",14.9q,14);14.17.4V=19 qx.ui.1w.1U("<");14.17.4V.1s({1G:30,1T:"1X-1R-1W",1S:d("4h 2r 2f")});14.17.4V.1o("1H",1c(){14.62("l")},14);14.17.4Y=19 qx.ui.1w.1U(">");14.17.4Y.1s({1G:30,1T:"1X-1R-1W",1S:d("4h 2r 26")});14.17.4Y.1o("1H",1c(){14.62("r")},14);14.17.55=19 qx.ui.1w.1U("^");14.17.55.1s({1G:30,1T:"1X-1R-1W",1S:d("4h 2r up")});14.17.55.1o("1H",1c(){14.62("u")},14);14.17.4R=19 qx.ui.1w.1U("v");14.17.4R.1s({1G:30,1T:"1X-1R-1W",1S:d("4h 2r cC")});14.17.4R.1o("1H",1c(){14.62("d")},14);1d s=1C.5y;if(s=s?1Z.2F(1C.5y):!0)14.2i.1b(14.17.55,{1M:16,26:p}),14.2i.1b(14.17.4V,{1M:35,26:I}),14.2i.1b(14.17.4Y,{1M:35,26:y}),14.2i.1b(14.17.4R,{1M:54,26:q});14.2i.1b(14.17.1a.5L,{1M:77,2f:l});14.2i.1b(14.17.1a.2k,{1M:1A,2f:l})}1u(t){1j.1l(t)}},dy:1c(){1v{1d b=14.1O.2z().3m(),a=14.1O.2z().4x();if(18!=a){1d c=a.2q(),e=b.c8().kJ(c);14.1Y.bm=e;14.1Y.2p=e.g2().l}}1u(d){1j.1l(d)}},bt:1c(){1C.8E=1Z.3g(14.1f.43.1k())},bB:1c(){1C.5y=1Z.3g(14.1f.4i.1k());14.1f.4i.1k()?14.6I():(14.2i.2M(14.17.55),14.2i.2M(14.17.4V),14.2i.2M(14.17.4Y),14.2i.2M(14.17.4R))},bA:1c(){1v{1C.6b=1Z.3g(14.1f.4t.1k()),14.1f.4t.1k()?14.1N.1b(14.17.1a.3F,{1M:b1,26:9}):14.1N.2M(14.17.1a.3F)}1u(b){1j.1l(b)}},aZ:1c(){1v{1C.6d=1Z.3g(14.1f.4q.1k()),14.1f.4q.1k()?14.1N.1b(14.17.1a.1D,{1M:16,26:9}):14.1N.2M(14.17.1a.1D)}1u(b){1j.1l(b)}},9q:1c(){14.2g.5x()?14.2g.7n():14.2g.5O()},8M:1c(){14.2V.5x()?14.2V.7n():14.2V.5O()},9s:1c(){24(1d b=14.6v(),a=!1,c=0;c<b.2B;c++)if(b[c].e){a=!0;22}1j.1l(a);2v a?!1:!0},aU:1c(){1v{1d b=14.1O.2z().3m();!14.9s()&&0<b.9N()&&(14.dd(),1e.3Y.5V.2L().bu(),14.17.1a.3n.32(!1),14.17.1a.2k.32(!1),14.1i.4b.4N(9J),14.57=10,14.7L=!0)}1u(a){1j.1l(a)}},bU:1c(){1v{1d b=2d.2m.2j();b.57-=1;b.1i.4b.4N(b.1i.4b.aW()-11);0>=b.57&&(6z(b.9z),b.17.1a.3n.32(!0),b.6s&&(b.1N.2M(b.5u),b.6s=!1))}1u(a){1j.1l(a)}},8L:1c(){1v{0!=14.1i.4b.aW()&&!14.6s&&(14.5u=19 qx.ui.1p.6r("h0://gN-a.gM.gR/hf/kF/2o/h8.1J"),14.5u.1s({1S:d("3W bv be bx on by bi bh 1g!")}),14.1f.3G.1k()?14.1N.1b(14.5u,{1M:f5,26:67}):14.1N.1b(14.5u,{1M:f5,2f:27}),14.6s=!0)}1u(b){1j.1l(b)}},dC:1c(){1v{1d b={1:0,2:0,3:0,6:0,7:0},a=1e.3Y.5V.2L().gU(),c;24(c in a)b[a[c].92]+=a[c].fy;14.1g.2W.6G.6X(14.5g(b[1]));14.1g.2W.6C.6X(14.5g(b[2]));14.1g.2W.6D.6X(14.5g(b[3]));14.1g.2W.5R.6X(14.5g(b[6]))}1u(e){1j.1l(e)}},5Y:1c(b,a,c,e,d){if(b!=a){b=1e.3Y.2n.8S(e,d,0<a?(b-a)/16/c:b/16/c);24(c=a=0;c<b.2B;c++)37(e=b[c],eu(e.92)){1x 1e.1z.3t.g6:1x 1e.1z.3t.8Z:1x 1e.1z.3t.8J:1x 1e.1z.3t.8K:a+=e.fy}2v a}2v 0},7q:1c(b,a,c){1d e=["89","fd","fw","fc"],d=e[0];0<=c&&(a=1A-a);99.99<a?d=e[3]:50<a?d=e[2]:0<a&&(d=e[1]);b.9a(d)},4e:1c(b,a,c){14.7q(b,a,c);a=2N.k3(1A*a)/1A;b.1r(a.5f(2).28())},68:1c(b,a,c,e){e=a.5f(2).28()+" @ "+31.36.2n.4s(e);14.7q(b,a,c);b.1r(e)},ce:1c(){1d b=14,a="",c=0;0===14.1g.1q.1E.3B?(a=d("4H 5l"),c=0):1A>14.1g.1q.1E.1K?(a=d("5l"),c=1):(a=d("4H aB"),c=3);14.1i.1q.5M.1r(a);14.1i.1q.5M.9a(["fw","fd","89","fc"][c]);14.4e(14.1i.1q.1K,14.1g.1q.1K,-1);14.4e(14.1i.1q.2r.1K,14.1g.1q.2r.1K,-1);14.4e(14.1i.1q.1E.1K,14.1g.1q.1E.1K,-1);14.4e(14.1i.1q.1E.3B,14.1g.1q.1E.3B,-1);14.4e(14.1i.1q.1E.47,14.1g.1q.1E.47,-1);14.1Y.4W?14.4e(14.1i.1q.1E.3L,14.1g.1q.1E.3L,-1):(14.1i.1q.1E.3L.1r("--"),14.1i.1q.1E.3L.9a("89"));a=0<14.1g.49?14.1g.49.28():"--";14.1i.49.1r(d("6T 8T ")+a+": ");14.4e(14.1i.1q.1E.4j,14.1g.1q.1E.4j,-1);14.1i.1D.2a.1r(31.36.2n.4s(14.1g.1D.2a));14.1i.2l.2a.1r("CP:"+14.1g.2l.7a+" / F:"+14.1g.2l.5b+"/ C:"+14.1g.2l.8m);14.68(14.1i.2h.1K,14.1g.2h.1K,1,14.1g.1D.1K);14.68(14.1i.2h.2y,14.1g.2h.2y,1,14.1g.1D.2y);14.68(14.1i.2h.2K,14.1g.2h.2K,1,14.1g.1D.2K);14.68(14.1i.2h.2I,14.1g.2h.2I,1,14.1g.1D.2I);3C(1c(){b.1g.42=b.3d.5a().iQ()/4G;b.7q(b.1i.42,b.1g.42/fA,-1);b.1i.42.1r(b.1g.42.5f(2).28())},1)},5g:1c(b){2v 2N.4S(b).28().cI(/\\B(?=(\\d{3})+(?!\\d))/g,",")},dM:1c(){14.1N.2M(14.17.1a.3F);1d b=14;3C(1c(){b.1N.1b(b.17.1a.3F)},iW)},dK:1c(){14.1N.2M(14.17.1a.1D);1d b=14;3C(1c(){b.1N.1b(b.17.1a.1D)},iR)},e2:1c(b,a){1v{14.1Y.7C=2N.8e(1e.1z.iT.j7(1e.1z.jo.jg,a.e0[6].r,a.e0[6].s))}1u(c){1j.1l(c)}},dj:1c(){14.17.1a.3E.1k()&&14.17.1a.3E.7k();14.2g.5x()&&14.2g.7n()},dX:1c(){2C.3Z.7W.iM.2j().33(20);2C.3Z.ij.ik.2j().33(20);2C.3Z.ip.ie.2j().33(20);2C.3Z.i4.i8.2j().33(20);2C.3Z.5R.iq.2j().33(20);2C.3Z.iK.iC.2j().33(20);2C.3Z.kk.kp.2j().33(20)},dl:1c(){1j.1l("df kE");14.4l.5x()&&(14.17.1a.3n.32(!1),14.17.1a.2k.32(!1),14.5p(),14.8u());14.6H()},eS:1c(b,a){14.dh=a;14.17.1a.2k.32(!1);14.17.1a.3n.32(!1);1v{37(14.dj(),a){1x 1e.1P.4z.5V:14.5n=qx.3h.3w.3v().4v().8d();14.5p();22;1x 1e.1P.4z.kt:14.5n=qx.3h.3w.3v().4v().8d(),14.5p()}}1u(c){1j.1l(c)}},8u:1c(){1v{14.17.1a.2S.1k(!0)&&14.17.1a.2S.1r(!1),14.17.1a.2Q.1k(!0)&&14.17.1a.2Q.1r(!1),14.17.1a.2R.1k(!0)&&14.17.1a.2R.1r(!1)}1u(b){1j.1l(b)}},5p:1c(){1v{1d b=14;if(14.3d.dk().kv()){if(3C(1c(){1d a=1e.1P.6k.2L().ee();a.ky(0,a.jF()+a.jB()*a.an())},8o),14.aO(),3<14.5n){14.eE();1d a=14.1O.2z().4x();if(18!=a){1d c=14.1O.2z().3m();14.1g.2l.8k=c.jz(a.a2(),a.a5());14.a3();14.dC();14.6R();14.dy();if(18!=14.5Q&&14.5Q!==a.2q()){14.1i.1D.2a.1r(31.36.2n.4s(14.1g.1D.2a));14.1i.2l.2a.1r("CP:"+14.1g.2l.7a+" / F:"+14.1g.2l.5b+"/ C:-");14.8u();1d e=a.gz();14.1Y.4W=e===1e.1z.5c.8N||e===1e.1z.5c.8O;if(14.1Y.4W){1d d=a.gc();1e.79.ej.2L().gj("gk",{id:d},31.36.2n.eh(1e.79.eg,14,14.e2),18)}}14.5Q=a.2q()}}}3q 3C(1c(){b.5p()},cQ)}1u(f){1j.1l(f)}},eE:1c(){14.5n=qx.3h.3w.3v().4v().8d();37(14.5n){1x 1e.1Q.48.ey:1j.1l("!!!\\n 2m bQ\\n!!!\\n 5p, fT 1x ey");22;1x 1e.1Q.48.8I:14.1f.43.1k()&&14.2g.5O();22;1x 1e.1Q.48.g5:14.1f.43.1k()&&14.1V.3k.3H&&14.2g.5O();22;1x 1e.1Q.48.eG:1j.1l("eG");22;1x 1e.1Q.48.eN:1j.1l("eN");22;1x 1e.1Q.48.bS:14.1V.3k.3R&&(1j.1l("hr 1x 10"),14.2g.5O())}},a3:1c(){1v{1d b=14.1O.2z().3m(),a=b.9N(),c=b.hv(),e=c.8i(1e.1Q.8h.4c,!1),d=c.8i(1e.1Q.8h.94,!1),f=c.8i(1e.1Q.8h.93,!1);14.1g.1D.2a=1e.1z.b5.5T(b.b4().aX());14.1g.1D.5Z=14.1O.5q().5r(2N.5Z(e,f,d));14.1g.2l.8j=14.1O.8G().hO();14.1g.2l.7a=2N.4S(14.1g.2l.8j/14.1g.2l.8k);14.1g.2l.5b=2N.4S(14.1g.1D.2a/14.1g.1D.5Z)+1;14.1g.2l.8m=2N.4S(14.1g.1D.2a/14.1g.1D.1K)+1;1A!==a&&(14.1g.2l.5b--,14.1g.2l.5b+="*")}1u(g){1j.1l(g)}},ei:1c(){1v{14.3r.4v().9H(1e.1Q.48.8I,1C.9F,0,0)}1u(b){14.3r.4v().9H(1e.1Q.48.8I,1C.9F,0,0),1j.1l(b)}},aO:1c(){1v{1d b=14.1O.2z(),a=b.4x();if(18!=a){1d c=b.3m();10>=1e.1z.2n.he(a.a2(),a.a5(),c.a2(),c.a5())&&(14.17.1a.2k.32(!0),0>=14.57&&14.17.1a.3n.32(!0))}}1u(e){1j.1l(e)}},eC:1c(){1v{24(;14.3d.5a().jS().jk(!1););14.3d.5a().9r(1)}1u(b){1j.1l(b)}},eU:1c(){1v{if(hd<6p.da()-14.a1){1d b=14.1O.2z().3m();!14.9s()&&0<b.9N()&&(1e.3Y.5V.2L().bu(),14.17.1a.3n.32(!1),14.17.1a.2k.32(!1),14.1i.4b.4N(9J),14.57=10,14.7L=!1)}3q 14.9B(),14.3d.5a().iO(),14.3d.5a().9r(1)}1u(a){1j.1l(a)}},7G:1c(b){14.aR("7G");1v{14.7L||(14.9B(),3C(1c(){1e.1P.6k.2L().5a().9r(1)},1));1d a=0,c=0,e=0,d=0,f=0,g=0,j=0,k=0,m=0,l=0,y=0,p=0,q=0,s=0,t=0,u=0,v=0;14.1g.1q.1E.47=0;14.1g.1q.1E.3B=0;14.1g.1q.1E.3L=0;14.1g.49=0;14.1g.1q.1E.4j=0;14.1g.1D.2y=0;14.1g.1D.2K=0;14.1g.1D.2I=0;14.a1=6p.da();14.9z=9k(14.bU,4G);24(1d x=0;x<b.2B;x++){1d w=b[x].hp,A=w.t,z=1e.hB.hA.2L().hx(A),E=z.pt,F=z.mt,B=w.l,H=w.sh,r=w.h,n=1e.3Y.2n.hV(B,z,!1);37(E){1x 1e.1z.9D.9d:if(14.1Y.4W)1d C=14.1Y.7C,D=1e.1z.2n.cS(B,C),n=2N.4S(16*(n*D/1A))/16;j+=n;k+=r;e+=n;d+=r;22;1x 1e.1z.9D.hY:a+=n;c+=r;37(F){1x 1e.1z.3I.fi:s+=n;m+=r;t+=14.5Y(H,r,n,B,A);22;1x 1e.1z.3I.fa:1x 1e.1z.3I.fH:p+=n;l+=r;v+=14.5Y(H,r,n,B,A);22;1x 1e.1z.3I.4m:1x 1e.1z.3I.fh:q+=n,y+=r,u+=14.5Y(H,r,n,B,A)}22;1x 1e.1z.9D.hN:14.1Y.4W&&(C=14.1Y.7C,D=1e.1z.2n.cS(B,C),n=2N.4S(16*(n*D/1A))/16),f+=n,g+=r,e+=n,d+=r}if(cQ<=A&&gW>=A)14.1g.49=B,14.1g.1q.1E.4j=1A*(r/16/n);3q 37(A){1x hl:1x hb:1x px:14.1g.1q.1E.47=0<H?1A*(r/16/n):0;22;1x Hd:1x Hb:1x H2:14.1g.1q.1E.3B=1A*(r/16/n);22;1x H3:1x Hm:14.1g.1q.1E.3L=1A*(r/16/n)}}14.1g.2h.2y=s?1A*(m/16/s):1A;14.1g.2h.2K=p?1A*(l/16/p):1A;14.1g.2h.2I=q?1A*(y/16/q):1A;14.1g.1q.2r.1K=j?1A*(k/16/j):0;14.1g.1q.1E.1K=1A*(g/16/f);14.1g.1q.1K=1A*(d/16/e);14.1g.2h.1K=c?1A*(c/16/a):0;14.1g.1D.2y=14.1O.5q().5r(t);14.1g.1D.2I=14.1O.5q().5r(u);14.1g.1D.2K=14.1O.5q().5r(v);14.1g.1D.1K=14.1O.5q().5r(2N.5Z(t,u,v));14.a3();14.ce();14.17.1a.2k.32(!0)}1u(G){1j.1l("7G()\\n Gn 5Y()",G)}},9B:1c(){1v{1d b=14.1O.2z().4x();14.1O.2z().3m().c8().Gw(b.2q());1C.9F=b.2q();14.3r.4v().9H(1e.1Q.48.bS,b.2q(),0,0)}1u(a){1j.1l(a)}},J6:1c(){1d b=14.6v(),a=14.6V(),c=14.aH(14.1g);14.4M[0]={f:b,t:a,s:c};1j.1l(14.4M[0])},IR:1c(b){1d a;24(a=0;a<14.4M.2B&&!(14.4M[a].t>b);a++);14.4M=14.4M.4P(0,a)},6R:1c(){1v{if(14.1F.4p.I4(),14.bz(),14.1F.3f)24(1d b in 14.1F.3f){1d a=14.1F.3f[b],c=19 qx.ui.1w.Ie(a.3K,18,a.id);14.1F.4p.1b(c)}}1u(e){1j.1l(e)}},cx:1c(){1v{1d b=14.1F.4p.cu();if(18!=b&&0<b.2B){1d a=b[0].cN();14.1F.3f&&"3V"!==2E 14.1F.3f[a]&&(eq 14.1F.3f[a],14.9M(),14.6R(),14.6H())}}1u(c){1j.1l(c)}},ct:1c(b){1v{1d a=14.1F.4p.cu();if(18!=a&&0<a.2B){1d c="9v"===2E b?a[0].cN():b;14.1F.3f&&"3V"!==2E 14.1F.3f[c]&&14.5t(14.1F.3f[c].1B)}}1u(e){1j.1l(e)}},aP:1c(){1d b=[],a,c;1v{b=14.6v(),a=(19 6p).aN().28(),c=18!==14.1g.1q.1E.3B?14.1F.3K.1k()+" ("+14.1g.1q.1E.3B.5f(0).28()+":"+14.1g.1q.1E.47.5f(0).28()+":"+14.1g.1q.2r.1K.5f(0).28()+")":14.1F.3K.1k()+" (??:??:??)",14.1F.3f[a]={id:a,3K:c,1B:b},14.9M(),14.6R(),14.6H(),14.1F.3K.1r("")}1u(e){1j.1l(e)}2v a},bz:1c(){1v{if(18!=14.1O.2z().4x()){1d b=14.1O.2z().4x().2q(),a=14.1O.2z().3m().2q();14.1F.3l.4B(b)||(14.1F.3l[b]={});14.1F.3l[b].4B(a)||(14.1F.3l[b][a]={});14.1F.3f=14.1F.3l[b][a]}}1u(c){1j.1l(c)}},aY:1c(){1v{1d b=1C.bc;14.1F.3l=b?1Z.2F(b):{}}1u(a){1j.1l(a)}},9M:1c(){1v{1C.bc=1Z.3g(14.1F.3l)}1u(b){1j.1l(b)}},5t:1c(b){1v{14.1F.9O=!0;24(1d a=0;a<b.2B;a++)24(1d c=b[a],e=0;e<14.1Y.2p.2B;e++)14.1Y.2p[e].2q()===c.id&&(14.1Y.2p[e].9L(c.x,c.y),Ip 0===c.e?14.1Y.2p[e].4K(!0):14.1Y.2p[e].4K(c.e));14.1F.9O=!1}1u(d){1j.1l(d)}},6v:1c(){1d b=[];1v{24(1d a=0;a<14.1Y.2p.2B;a++){1d c=14.1Y.2p[a],e={};e.x=c.4E();e.y=c.4w();e.id=c.2q();e.e=c.65();b.63(e)}}1u(d){1j.1l(d)}2v b},62:1c(b){1d a=[],c=0,e=0;"u"===b&&(c=-1);"d"===b&&(c=1);"l"===b&&(e=-1);"r"===b&&(e=1);24(b=0;b<14.1Y.2p.2B;b++){1d d=14.1Y.2p[b],f={},g=d.4E()+e;37(g){1x 9:g=0;22;1x-1:g=8}1d j=d.4w()+c;37(j){1x 4:j=0;22;1x-1:j=3}f.x=g;f.y=j;f.id=d.2q();f.e=d.65();a.63(f)}14.5t(a)},9Q:1c(b){1d a=[];1v{24(1d c=0;c<14.1Y.2p.2B;c++){1d e=14.1Y.2p[c],d={},f=e.4E(),g=e.4w();"f9"===b?f=2N.fI(f-8):"fs"===b&&(g=2N.fI(g-3));d.x=f;d.y=g;d.id=e.2q();d.e=e.65();a.63(d)}14.5t(a)}1u(j){1j.1l(j)}},7j:1c(b,a){1d c=[];1v{24(1d e=0;e<14.1Y.2p.2B;e++){1d d=14.1Y.2p[e],f={};37(b){1x"fp":(d.66().mt===1e.1z.3I.4m||d.66().mt===1e.1z.3I.fh)&&d.4K(a);22;1x"2y":d.66().mt===1e.1z.3I.fi&&d.4K(a);22;1x"fj":(d.66().mt===1e.1z.3I.fa||d.66().mt===1e.1z.3I.fH)&&d.4K(a)}f.x=d.4E();f.y=d.4w();f.e=d.65();f.id=d.2q();c.63(f)}14.5t(c)}1u(g){1j.1l(g)}},eB:1c(){1d b=[];1v{24(1d a=0;a<14.1Y.2p.2B;a++){1d c=14.1Y.2p[a],d={};d.x=c.8g().4E();d.y=c.8g().4w();d.id=c.2q();b.63(d)}14.5t(b);14.17.1a.2S.1k(!0)&&14.17.1a.2S.1r(!1);14.17.1a.2Q.1k(!0)&&14.17.1a.2Q.1r(!1);14.17.1a.2R.1k(!0)&&14.17.1a.2R.1r(!1)}1u(h){1j.1l(h)}},8l:1c(b,a){1d c=a.4a[b].E8(!0);c.95=a.6E().ui/1A;c.Ee()},6E:1c(){2v 1Z.2F(1C.er("E5"))},f8:1c(){1v{1e.79.ej.2L().DU("3b",{E2:14.8C,E1:14.fo,E0:4},31.36.2n.eh(1e.79.eg,14,2d.2m.2j().ek),14.fl,!0)}1u(b){1j.1l(b)}},ek:1c(b,a){1v{if(a){1d c=2d.2m.2j();c.1V.4a.em&&("eK"==c.2U[b].eT?c.8l("4O",c):c.8l("4J",c));c.1N.2M(c.2U[b]);eq c.2U[b]}}1u(d){1j.1l(d)}},9f:1c(){24(1d b in 14.2U)14.1N.2M(14.2U[b]);14.2U=[]},9h:1c(){1d b=14;14.78&&CK(b.78);14.78=3C(1c(){b.9m(b)},8o)},9m:1c(b){b=b||14;1d a=b.1O.2z().3m().2q();0<b.2U.2B&&b.9f();24(1d c=b.3d.ee(),d=c.CI(),h=2N.8e(-1*c.CJ()*d)+10,c=2N.8e(c.au()*d),d=0;d<b.1Y.2p.2B;d++){1d f=b.1Y.2p[d];if(1>f.Cu()){1d g=f.8g().CF().d,j,k,m,l;24(l in g)37(l=eu(l),l){1x 1e.1z.3t.fB:j=g[l];22;1x 1e.1z.3t.8Z:k=g[l];m="eK";22;1x 1e.1z.3t.8J:k=g[l];m="CD";22;1x 1e.1z.3t.8K:k=g[l],m="4m"}k=31.36.2n.4s(b.1O.5q().5r(k));j=b.5g(j);b.2U[d]=19 qx.ui.1w.1U("","2o:2G/1J;2A,Df/wD/AP+Dc/Dg/Dh+Dl/Dk+Dj+D0/CZ++D2+D5+D3/D4+Fs/Q+Fr+Fv/Fw++FA/Fx/Fo/Fe/Fc/Fd/+Fh/Fi/Fn/Fm/Fl/Fj+u2+FQ/FW/+FP/FN+3O+EE+En+Ej/Ek+Eo/Ep/Eu/Es/Eq/Er/EJ+F1/F0+EY+EZ+F4/F8/EM/EK/hE+EV/ET/ES///DM+ER+EU+EQ/EP+EL+EN+EO+EW+EX%3D%3D");b.2U[d].1s({7X:(19 qx.ui.88.8b).1s({f3:"F6"}),1G:c,2e:38,2O:"2Y",8w:!1,3y:3,1T:"1X-1R-1W",F3:"EI",1S:"fB: "+j+" / 8q: "+k+" / 92: "+m});b.2U[d].1o("7k",b.f8,{8C:a,fo:f.2q(),fl:d,Et:b});b.2U[d].eT=m;b.1N.1b(b.2U[d],{2f:h+c*f.4E(),1M:7+38*f.4w()})}}},fm:1c(){1v{14.4a.4J||(14.4a.4J=19 fb(2d.4J.d),14.4a.4O=19 fb(2d.4O.d),14.4a.4J.95=14.6E().ui/1A,14.4a.4O.95=14.6E().ui/1A),14.1N.3p().9l(),14.1N.32(!0),14.2i.9l(),14.2g.9l(),14.17.1a.3E.1k()?(14.9m(),14.1N.1o("b7",14.9h,14),14.2w.2O(),14.91(),14.9i=9k(14.91,4G)):(14.9f(),14.1N.EC("b7",14.9h,14),14.2w.5U(),6z(14.9i))}1u(b){1j.1l(b)}},91:1c(){1v{1d b=2d.2m.2j(),a=b.1O.2z().3m(),c=a.5T(1e.1z.3t.8Z),d=a.5T(1e.1z.3t.8J),h=a.5T(1e.1z.3t.8K);b.1g.1D.2a=1e.1z.b5.5T(a.b4().aX());b.1i.2T.2a.1r(31.36.2n.4s(b.1g.1D.2a));b.1i.2T.2y.1r(31.36.2n.4s(c-b.1g.1D.2a));b.1i.2T.2K.1r(31.36.2n.4s(d-b.1g.1D.2a));b.1i.2T.2I.1r(31.36.2n.4s(h-b.1g.1D.2a))}1u(f){1j.1l(f)}},b0:1c(){1v{1d b=2d.2m.2j();6z(b.7s);b.4L=0}1u(a){1j.1l(a)}},6H:1c(){1v{if(14.1f.4g.1k()){1d b=14.1O.2z().3m(),a=b.2q(),c=b.G0(),d=b.G1(),h=14.3d.FS(),f=14.1O.FT().FU()+0.1;37(14.1O.8G().bn()){1x 1e.1z.5c.8N:1d g=1e.1P.8Y.FB;22;1x 1e.1z.5c.8O:g=1e.1P.8Y.Fp}24(b=c-f;b<c+f;b++)24(1d j=d-f;j<d+f;j++){1d k=h.Fy(b*h.au(),j*h.an());if(18!=k&&(k.6m()==1e.1P.6l.6u.6Q||k.6m()==1e.1P.6l.6u.aj||k.6m()==1e.1P.6l.6u.al)&&!(k.6m()==1e.1P.6l.6u.6Q&&k.Fz())&&!(k.6m()==1e.1P.6l.6u.aj&&k.Ei())){k.6U().8U(1e.1P.8Y.aM);1d m=k.2q();if(14.1F.3l.4B(m)&&14.1F.3l[m].4B(a)){1d l=0,p;24(p in 14.1F.3l[m][a])14.1F.3l[m][a].4B(p)&&l++;0<l&&k.6U().8U(g)}}}}}1u(q){1j.1l(q)}},D1:1c(b){2v 19 6p(b)},6V:1c(){2v(19 6p).aN()},dd:1c(){14.8Q=14.6V()},aR:1c(b){b=b||"CY";14.8P=14.6V();1j.1l(14.8P-14.8Q+"ms to D8 "+b)},aH:1c(b){2v 1Z.3g(b)}}});2d.2m.2j().aA();if(Db<=ax){1d F=1e.1Q.3U.2b.4x.28(),t;24(t in 1e.1Q.3U.2b)if(1e.1Q.3U.2b.4B(t)&&"1c"===2E 1e.1Q.3U.2b[t]&&-1<1e.1Q.3U.2b[t].28().4D(F)&&6==t.2B){F=t;22}1d C=1e.1Q.3U.2b.3m.28(),u;24(u in 1e.1Q.3U.2b)if(1e.1Q.3U.2b.4B(u)&&"1c"===2E 1e.1Q.3U.2b[u]&&-1<1e.1Q.3U.2b[u].28().4D(C)&&6==u.2B){C=u;22}1d s=1e.3Y.2n.8S.28(),s=s.cI(F,C),J=s.CC(s.4D("{")+1,s.CB("}")),K=5w("a,b,c",J);1e.3Y.2n.8S=K}24(1d v in 1e.1P.2u.2u.2b)if("1c"===2E 1e.1P.2u.2u.2b[v]&&(s=1e.1P.2u.2u.2b[v].28(),-1<s.4D(1e.1P.2u.2u.2b.Cw.28()))){1j.1l("1e.1P.2u.2u.2b.8F = 1e.1P.2u.2u.2b."+v);5w("","1e.1P.2u.2u.2b.8F = 1e.1P.2u.2u.2b."+v)();x="1e.1P.2u.2u.2b."+v+"=1c (a){if(1e.1P.6k.2L().CT()==7&&2d.2m.2j().1V.3k.3J){2v;}3q{14.8F(a);}}";5w("",x)();1j.1l(x);22}qx.3h.3w.3v().6c().8D=qx.3h.3w.3v().6c().cA;qx.3h.3w.3v().6c().cA=1c(b){2d.2m.2j().1V.3k.3M?qx.3h.3w.3v().6c().8D(!1):qx.3h.3w.3v().6c().8D(b)}}3q G++,2d.3C(q,4G);3q 2d.3C(q,4G)}3q 2d.3C(q,4G)}1u(D){"3V"!==2E 1j?1j.1l(D):2d.d6?d6.Ed(D):Ef(D)}}1j.1l("2m: 7E Eb");1d p=18,w="E9 Ea DQ DP Dy Dw Dz DA".1h(" "),z={2J:"\\DB ah ae\\ac ab ai Dv Dt dx".1h(" "),"cR 1z:":"D\\7g\\Dp \\Do\\7g:;Dq d0:;1z Dr:;1z Ds:;DC d0:;DD\\DL b\\bR:;1z DN:;DO DK:".1h(";"),"cY:":"c0 \\DJ:;DF:;DE:;bY:;DG:;V\\DH:;D\\DI:;G2:".1h(";"),"cs:":"Gx: Iq\\Is: It\\Io: Im: Ij: \\Ik\\Il: B\\Iu: ID:".1h(" "),"9e bT:":"\\IE:;IF:;IG:;IC:;Ix:;K\\c2:;Iw De 9e:;Iy:".1h(";"),"9d c1:":"c0 Iz:;IA:;Ig\\2H\\6i de If:;HY di bY:;HX:;V\\HZ B\\bR:;I1 De D\\HW:;HR:".1h(";"),"bJ bI:":"HQ HS:;HT:;bO de bN:;bO di bN:;I2:;I3 k\\c2:;Ib De Ic:;Id:".1h(";"),"7A 3b:":";;;;;;;Ia j\\I9\\1L:".1h(";"),"7A cj:":"       Hy\\5E\\I5\\1L:".1h(" "),"ch:":"T\\II cn:;I8:;IH:;4f:;IK:;\\Jf\\3c:;4H:;Jb\\1L:".1h(";"),"4c:":"Je: 5D: Jd: Jc: 5D: Jh\\Ji: 5D: Ja\\84:".1h(" "),"94:":"Jg cn:;8c:;Jj\\Jl:;Jm:;Jk:;J\\IQ:;V\\IS:;IT:".1h(";"),"93:":"IU d1\\d2\\3T:;83:;IP\\6i:;IO:;J9:;L\\IJ:;IL:;IM:".1h(";"),"c6:":"IN\\2H: IV: IW: J4: J5: J7\\cf: R\\J3: J2:".1h(" "),ca:"IY IX J0 J1 I6 HO GD GF".1h(" "),"73 8q:":"bW\\9n S\\GH:;GC:;bD de GB:;bD di HP:;Gy:;bV Gz:;GA\\fx Du 4A:;GI GJ:".1h(";"),8n:"GR\\9n 8n GS\\2H\\6i GT GU cX\\3c GQ GP".1h(" "),7P:"Y\\b8 GL ba bb bg T\\GK\\3c bf bd".1h(" "),"7P 14 5d 1B.":"b3\\b2\\3T 8z\\8A y\\b8.;GM 8r GN.;ba 7z 8t\\2H\\3P am.;bb 8B 7Y aS.;bg aJ cE 7Z.;T\\GO be 7U az cw 7w\\8a.;bf 7V 85.;bd cy 86.".1h(";"),7v:"Gv L\\bC bl ak av T\\Gu\\3c cv 3o".1h(" "),"8f: ":"\\Gb: ;8f: ;aV: ;aV: ;Gd: ;N\\Ge: ;Gf: ;Ga: ".1h(";"),"7v 14 5d 1B.":"b3\\b2\\3T 8z\\8A G9.;G5\\G4 8r l\\bC.;bl 7z 8t\\2H\\3P am.;ak 8B 7Y aS.;av aJ cE 7Z.;T\\cU\\G6 7U az cw 7w\\8a.;cv 7V 85.;3o cy 86.".1h(";"),7F:"G7 G8 bM ck Gg Gh\\3c cb cd".1h(" "),"7F 14 1B.":"Bu 8z\\8A Gr.;8r Gs.;bM 7z 8t\\2H\\3P.;ck 8B 7Y.;Gt 7Z Go.;Gj el 7U az 7w\\8a.;cb 7V 85.;cd Gi 86.".1h(";"),4u:"Gk 4u 4u 4u 4u 4u Gm GV".1h(" "),6f:"9p 9p F\\GW 9p 6f F\\Hw 6f Hx".1h(" "),c4:"Hz HA Hu\\Hp Ho Hq Hr\\Hs\\cf HB HC".1h(" "),4Z:"HK\\HL: HM HN\\2H\\6i: HJ: HI: HD\\HF: 4Z: Hn".1h(" "),"7D cg 1g":"Bu H5 H4 g\\7B;H6 H7 cl \\db;c3 7z H8 cm;d8 cm la GY GX;GZ H0 cl bP;H1 d5 H9\\Ha bL\\6g\\bK;bG. 7D. de Hi Hj\\Hk;N\\3z\\1L dt 5C Hl".1h(";"),"5o ci 17":"Hg\\Hc tu\\He\\d9\\3T g\\7B;Hf CG;c3 9b\\6i de wS;wR i wT di wU;wW bP;wV\\9j wQ bL\\6g\\bK;bG. 7D. wP de D\\wK;N\\3z\\1L 8v wJ".1h(";"),"bQ!":"wL\\3T! wM! wO! wN! wX! wY! x8! x7!".1h(" "),bZ:"x9 et;xa;xc;xb;x6;x5\\8H\\9j;x0;wZ".1h(";"),"9o 4A 3W":"bW\\9n x1 Ba\\x2;x4 x3;wI\\Ct a wH\\2H\\3P de cZ;wl wk;9o wm;bV d3\\8H\\9j wn\\6g\\5m;D\\wp 6w 3W Du 4A;wo du wj".1h(";"),56:"D\\wi wd wc\\2H\\3P 56 we cX\\3c cV wf".1h(" "),"9g to 4A 56":"wh d\\wg g\\7B;wq\\wr wB wA;wC \\4X wE\\2H\\3P de cZ;wG wF wz;wy wt ws wu;wv az wx\\6h 7w\\3c\\ww;xd \\4X l\'cV xe xU;9g to 4A 56".1h(";"),4d:"xW a\\2H;bk;9c;fr;98;xY;xX;7c".1h(";"),"5K 7E cT":"xS\\cU d1\\d2\\d9\\3T G\\7B;xR \\db;xM as xL do xN;d8 xO;5K 7E xQ;xP a d3\\xZ y0\\8H\\ya d5\\y9;yb 4U R\\yc Du ye;7c yd ty\\y8".1h(";"),"4h 2r 2f":"7y y2 7x\\4y;5J 7H cP 7T;7R as 7S 7K a y1;7N le 7O\\4X a y3;7u 7r cP;6N\\6h 6M\\5m y4;D\\6L 4U 5k\\3c 6J 6w bE;6K\\1L\\1L 6O\\6P\\1L y6".1h(";"),"4h 2r 26":"7y sa\\xK 7x\\4y;5J 7H cz 7T;7R as 7S 7K a xJ;7N le 7O\\4X a xo;7u 7r cz;6N\\6h 6M\\5m xn;D\\6L 4U 5k\\3c 6J 6w bo;6K\\1L\\1L 6O\\6P\\1L xp".1h(";"),"4h 2r up":"7y xq\\3T 7x\\4y;5J 7H xs 7T;7R as 7S 7K xr;7N le 7O\\4X in xm;7u 7r xl;6N\\6h 6M\\5m xg;D\\6L 4U 5k\\3c 6J 7l xf;6K\\1L\\1L 6O\\6P\\1L yl\\xh".1h(";"),"4h 2r cC":"7y a\\xk\\br\\3T 7x\\4y;5J 7H xj 7T;7R as 7S 7K xt;7N le 7O\\4X in xE;7u 7r xD;6N\\6h 6M\\5m le;D\\6L 4U 5k\\3c 6J 7l xG;6K\\1L\\1L 6O\\6P\\1L xI".1h(";"),"4H 5l":"aw dc;xH;bq\\aD 4H;aE 4f;4f aF;ay xC;aG 4f;xB aC".1h(";"),5l:"dc xw bq\\aD aE aF xv aG aC".1h(" "),"4H aB":"aw xx;4f xy;xA xz;wb 4f;4f wa;ay uM\\uL;D\\uN 4f;4H uP".1h(";"),"6T 8T ":\'uK uJ ;uE uD ;N\\uF do uG ;uI 8T ;uH ;"6T" \\uR\\uS v2 ;v1. Du 6T ;v3\\v4 v6 \'.1h(";"),8X:"af ag v5 a9 ad v0\\6g ar P\\ap\\1L".1h(" "),"8X 2J":"\\uZ af;ag ah;ae\\ac;a9 ab;ad ai;uU\\6g\\3c 2J;ar 4U 2J;P\\ap\\1L 5C".1h(";"),"ao:":"uY: uX uC:  uB  C\\uc\\ub ud:".1h(" "),at:"ue aL ug  aL  bE uf".1h(" "),aT:"ua\\br bs u9  bs  bo u4".1h(" "),"bj:":"u3: bk u5:  u6:  V\\u8: u7:".1h(" "),4o:"eY\\4y\\3T uh uj  uv  uu Hy\\5E\\uw".1h(" "),3b:"fF\\fE 82 uy  uA  R\\uz ut".1h(" "),7p:"       fK".1h(" "),"3W bv be bx on by bi bh 1g!":"us en um g\\ul un g\\uo ur\\uq\\4y!;v7 3W v8 dq vP vO vQ vR;A vT\\2H\\3P vS vN vM na vH vG 2o!;;vI vJ vL vK op vU vV w5 w4!;;6w 3W w6 w7\\fx en w9 w8 w3\\w2 1g vW\\vY !;vZ w1 w0\\vF p\\vE vi!".1h(";"),"4d 4o 1U":"eY\\4y\\3T D\\7g\\fv vk A\\2H;vm fG;9c o 9b\\3P de vl;fr vg d\'vf;98 va;a T\\v9\\vb vc ve\\5m;D\\fn 7l eX d\'vn;3o hy\\5E\\vo f7".1h(";"),"4d 3b 1U":"fF\\fE D\\7g\\fv vz A\\2H;vy fG;9c 9b\\3P de vA\\2H\\3P;;98 vC;;D\\fn 7l eX de R\\vw;3o vv f7".1h(";"),"4d 7p 1U":";;;;;;;7c vr\\1L vs".1h(";"),"7e to fD":";vu vt yf;;;;;;yg B3".1h(";"),"7p 72":";;;;;;;fK 8v B2".1h(";"),"7o 87":";87 dP;;;;;;K\\1L\\dL\\1L B4".1h(";"),"7o dO":";B5 dP;;;;;;K\\1L\\dL\\1L B7".1h(";"),"3x 5G":";dG 5h;;;;;;5A dH".1h(";"),"2P 5G":";dG 5F;;;;;;3o dH k\\3z\\4F\\1L".1h(";"),"3x 4c":";5D 5h;;;;;;5A dI\\84".1h(";"),"2P 4c":";5D 5F;;;;;;3o dI\\84 k\\3z\\4F\\1L".1h(";"),"3x 5z":";8c 5h;;;;;;5A dR".1h(";"),"2P 5z":"8c 5F;;;;;;;3o dR k\\3z\\4F\\1L".1h(";"),"3x 4m":";83 5h;;;;;;5A dZ".1h(";"),"2P 4m":";83 5F;;;;;;3o dZ k\\3z\\4F\\1L".1h(";"),"3x 3b 4z":";82 dT 5h;;;;;;5A dU".1h(";"),"2P 3b 4z":";82 dT 5F;;;;;;3o dU k\\3z\\4F\\1L".1h(";"),"dV: ":";;;;;;;Bk: ".1h(";"),"dF 5d dE on dn dp":";Bj Bl dq Bm Bo Bn;;;;;;Bi Bh Bc Bb Bd".1h(";"),"dr \'dm-1H to (De)dg 2r":";Bf-AT AS 5J (De)-5h ;;;;;;Ax Ay/AA eD\\Az".1h(";"),"5o 2J 7f 4o":";;;;;;;N\\3z\\1L 5C -8p hy\\5E\\eO dA".1h(";"),"5o 2J 7f 3W":";;;;;;;N\\3z\\1L 5C -8p dt dA".1h(";"),"7e 5l-dD dz 73":";;;;;;;An du j\\Ap Aq".1h(";"),"2J 59 dw":";;;;;;;dx -As l\\Ar\\AB".1h(";"),"70 5k 74 In e3 72 8s":";;;;;;;3o k\\3z\\4F\\1L eD\\AM ty\\eF 8v AL".1h(";"),"70 74 In 4o ew ex":";;;;;;;3o ty\\eF k\\3z\\4F\\1L hy\\5E\\eO AE".1h(";"),8y:"       AD".1h(" "),8x:";;;;;;;AF AG".1h(";"),"5K 2J 59":";;;;;;;7c 5C -8p".1h(";")},G=0;/eb\\.ec/i.ed(7b.e9)&&2d.3C(q,4G)}.28()+")();";p.es="1R/Cb";/eb\\.ec/i.ed(7b.e9)&&7b.C6("C5")[0].C0(p);2d.4J={f4:"C1 C2 C4; f6 in 2m; fq of: 6Y://ff.fg.co.uk",d:"2o:fu/eV;2A,C3///////////////ft+eQ+eM+eL+eH/eI/eJ/5v/5v/5v/ea/e8/e5+ep+eo/ef+e7+e6+ev+ez+eA+dv+dB+fC+fJ+b9+Cd+Ce+Co/Cn++Cp/Cq/Cr+Cm+Cl/Cg/Cf+Ch/Ci/Ck/Cj/BY/X+BX+BB+BA/O/BC+BD/7+BF/BE/Bz+By+Bs/Br+Bt+Bv/Bx+Bw/BH/BI/BS/BR/BT+BU+BW+BV+BQ/BP/BK/BJ+BL/BM/BO/BN/pl+Am+Al+yY+u+yX+7d+yZ+z0/z2/z1+yW/yV/yQ//yP/yR/yS+yU+yT/z3+z4/ze+zd/zf+zg/zi+zh/zc+zb+z6+z5/z7+z8/za+z9/yO/7J+yN/ys/yr+yt/yu/yw+yv+yq/yp+yj+yi/yk+ym+yo+yn/yx/yy+yI/yH+yJ/yK/yM+yL+yG/yF+yA+yz/O/yB+yC+yE/yD+zj+zk+A0+zZ+A1/A2+A4+A3/zY/+zX+zS/Y/zR/zT/zU+zW/zV/A5/A6/Ag+Af++Ah+Ai+Ak+Aj+Ae+Ad+A8/A7/A9+Aa/Ac/Ab/zQ+zP+zu/zt/zv/zw+zy/zx+zs/v/zr+zm/zl/zn/zo+zq+zp/zz/zA/zK/zJ/zL++tH/2x/zM+zO/zN+zI/zH/zC/zB/zD/zE+zG/zF/Fk/BZ+Cc/Ca+C9+C7+C8+Bq+Bp+AH+AI+AJ+AK+AQ+AR/AO+AN/AC/Ao+At+Au/Av+Aw+Bg/Be/J/B9+B8/AY/AZ+AX/AW+AU+AV+B0+B1+B6+vp/vq/vD+vB+vd+vj+vh+vX/uW+uV+uT+uQ+uO/xF/xu/xi/y5+y7/xV/xT+Cs+Hh+HG+Hv/Gl/Gp+Gq+G3+E6/E7+Ec+Eg+s+E3/DV+DT+DR+DS/DW/DX+DY+DZ+Dn/Dm/CM/CL/6+CN+CO+CS/CR+CQ//CH/Cy/Cx+Cv+Cz/CA+CE/CU/CV+Y/1+Dd/Da/Di/D9+CW/CX+D7//D6+Eh/Ft+Fq/Fg/Ff/FC/+FV/FX/FZ/FY/FO/FH/FG/FF+FD+FE/FI+FJ/l/FM+FL/FK/Fb+Fa+EB+EA+Ez/Ex++Ey+ED+EH++EG//EF+Ew/Ev"};2d.4O={f4:"Em El; f6 in 2m; fq of: 6Y://ff.fg.co.uk; F5 F9",d:"2o:fu/eV;2A,F7///////////////ft+eQ+eM+eL+eH/eI/eJ/5v/5v/5v/ea/e8/e5+ep+eo/ef+e7+e6+ev+ez+eA+dv+dB+fC+fJ+b9+Ir+Ii+Ih+Iv+IB+mm+I0+HV/HU+I7/J8/IZ/GE/GG/Gc+Ht+HE+HH+nz/hi+gQ+hQ/hP+ic+j5/i6/jI/jP+hq+h5/h6/gK/hz/g3/fW+gC/gG/x/kC/kD//k7/jr/it/ia+iX+k2+iN+jd+k1+p+gT/gO/gS/h2+ho+/hL/i1+hZ+gv+gi+gq/81+7//gl/gx+gp/gr+D+ig/ih/jb/j/ja/7/+j0/yh+j3/iP+iS+6W+/iV/iU/gy//gA/g8/qP/qL+r9+rw+rr+rs/rt/rD/rC+3/F+rA/oW+oS/oT/oZ/+p0+p6+p4/p3+i+p1/W/y+p2/og+y/nt+nq/nr/ny/no/n6+nm/nF+o4+Fu"}})();',62,2813,'||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||this|||buttons|null|new|attack|add|function|var|ClientLib|options|stats|split|labels|console|getValue|log|row|column|addListener|basic|damage|setValue|set|strong|catch|try|form|case|Label|Base|100|layout|localStorage|repair|structures|layouts|width|click|toolBar|png|overall|u00e4|top|_armyBar|_MainData|Vis|Data|text|toolTipText|appearance|Button|saveObj|small|button|view|JSON|||break||for||right||toString||available|prototype|setLayout|window|height|left|battleResultsBox|health|userInterface|getInstance|simulate|attacks|TACS|Util|data|lastUnitList|get_Id|units|Composite|container|BaseView|return|repairInfo||infantry|get_Cities|base64|length|webfrontend|toolBarMouse|typeof|parse|image|u00e7|aircraft|Stats|vehicle|GetInstance|remove|Math|show|Deactivate|activateVehicles|activateAir|activateInfantry|repairinfos|repairButtons|optionsWindow|spoils|setOpacity|icon|icons||phe|setEnabled|setZIndex|||cnc|switch||setThemedBackgroundColor|eef|Repair|u00e9s|_VisMain|colSpan|current|stringify|core|setThemedFont|bold|checkbox|all|get_CurrentOwnCity|toolbarRefreshStats|Poista|getLayoutParent|else|_Application|statsOpacity|EResourceType|CheckBox|getApplication|Init|Activate|padding|u00e4yt|activateAll|construction|setTimeout||repairMode|unlock|rightSide|showStatsDuringAttack|EUnitMovementType|disableAttackPreparationTooltips|label|command|disableArmyFormationManagerTooltips|skipVictoryPopup||u00e3o|setToolTipText|showStatsDuringSimulation|FactionUI|u0131|Cities|undefined|Simulation|statsPage|API|gui||VBox|time|autoDisplayStats||||defense|PlayerAreaViewMode|supportLevel|audio|countDown|Infantry|Unlock|updateLabel100|Totale|markSavedTargets|Shift|showShift|support|dblClick2DeActivate|_armyBarContainer|Air|Grid|Attack|list|repairLock|middle|getTimespanString|attackLock|Info|getPlayArea|get_CoordY|get_CurrentCity|u0131r|Mode|Combat|hasOwnProperty||indexOf|get_CoordX|u00f6st|1E3|Total|setColumnAlign|soundRepairImpact|set_Enabled|armybarClickCount|undoCache|setWidth|soundRepairReload|slice|bottom|shiftFormationDown|floor|TOOL_BAR_WIDTH|Les|shiftFormationLeft|playerCity|u00e0|shiftFormationRight|Options||setColumnFlex|save|||shiftFormationUp|Setup|count||Window|get_Battleground|availableAttacksAtFullStrength|EFactionType|saved|saveLocation|toFixed|formatNumberWithCommas|Aktivieren|getBounds|changeValue|Unit|Victory|u00e1sa|curPAVM|Show|onCityLoadComplete|get_Time|GetTimeSpan|toggleCheckboxOption|loadFormation|simulationWarning|3fd|Function|isVisible|ta_sim_showShift|Vehicles|Aktivoi|skip|tiedot|Infanterie|u00f6kk|Deaktivieren|All|bounds|back|Einheiten|Open|tools|outcome|ToggleButton|open|flipVertical|targetCityId|research|formationReset|GetResourceCount|hide|Battleground|flipHorizontal|toolbarRedo|getRepairCost|max||toolbarShowStats|shiftFormation|push||get_Enabled|get_UnitGameData_Obj||updateLabel100time||_PlayArea|ta_sim_attackLock|getArmyUnitTooltipOverlay|ta_sim_repairLock|slider|Forums|u00edt|u00e9gek|u00f5es|setThemedPadding|VisMain|VisObject|get_VisObjectType|match|saveData|Date|toolbarUndo|Image|warningIcon|load|EObjectType|getFormation|La|tabview|buttonLayoutDelete|clearInterval|Atom|common|crystal|credit|getAudioSettings|optionStats|tiberium|updateSaveMarkers|setupInterface|Vers|Siirt|u00e9placer|eltol|Egys|yksikk|u00f6j|RegionNPCCamp|updateLayoutsList||Support|get_BasePlate|getTimestamp||setLabel|http|Region|Disable|createBasePlateFunction|Formation|Battle|Tooltips||appear||repairButtonsRedrawTimer|Net|availableAttacksCP|document|Avaa||Skip|During|u00fc|statsOpacityLabel|leftSide|activateUnits|execute|Le|statsOpacityOutput|close|Flip|Reset|setLabelColor|eenheden|armybarClearnClickCounter|textColor|Verschuif|Delete|elrendez|kayd|Birlikleri|esta|Available|u00f6ster|playerCityDefenseBonus|Auto|Simulator|Save|onSimulateBattleFinishedEvent|nach|white||para|statsOnly|set_Enabled_Original|Spostare|unit|Load||Deslocar|unidades|bewegen|ezt|Cette|reports|decorator|formazione|indeling|||Reparatur|Flugzeuge|u00e4ki|Disposition|asetelma|Horizontal|decoration|green|u00e9st|Background|Fahrzeuge|getViewMode|round|Name|GetCityUnit|EUnitGroup|GetRepairTimeFromEUnitGroup|availableCP|attackCost|playSound|availableAttacksWithCurrentRepairCharges|Layouts|500|ikkuna|Time|Layout|Manager|forma|resetDisableButtons|armeijan|center|Redo|Undo|dizili|u015fi|questa|ownCityId|setVisibility_Original|ta_sim_popup|ShowToolTip_Original|get_Player|u00e1ci|pavmCombatSetupDefense|RepairChargeVeh|RepairChargeAir|formationChangeHandler|toggleOptionsWindow|GDIFaction|NODFaction|ts2|ts1|icon_forum_properties|GetUnitRepairCosts|lvl|setPlateColor|setHeight|Canvas|Refresh|EBackgroundPlateColor|RepairChargeInf||updateRepairTimeInfobox|Type|Aircraft|Vehicle|volume|TOOL_BAR_HIGH|visibility|Ontgrendel||setTextColor|bot|Desbloquear|Defense|Construction|removeAllRepairButtons|Return|setResizeTimer|repairModeTimer|u00f3|setInterval|toggleEnabled|redrawRepairButtons|u015f|Start|Forum|toggleTools|set_ReplaySpeed|getAllUnitsDeactivated|attachNetEvent|CCTAWrapper_IsInstalled|object|battleResultsBoxLeft|ta_sim_options_top|MoveBattleUnit_Original|counter|regionObject|enterSimulationView|setLayoutProperties|EPlacementType|mouseover|ta_sim_last_city|option|setView|battleResultsBoxTop|110|HBox|MoveBattleUnit|saveLayouts|GetOffenseConditionInPercent|restore|Page|flipFormation|ta_sim_marksavedtargets|ta_sim_dblClick2DeActivate|contentPaddingRight|contentPaddingBottom|contentPaddingTop|contentPaddingLeft|locksLabel|00|sideLabel|TOOL_BAR_LOW|lastSimulation|get_PosX|getAvailableRepairAndCP|PATH|get_PosY|getUIItem|Missions|ta_sim_side|Rinfrescare|160|Statistiche|u00edstica|Verversen|Estat|Yenile|Erfrischen|Statistik|Statistieken|RegionCityType|Cancella|RegionNPCBase|guardada|get_GridHeight|Side|u00e4ivit|initializeStats|Actualiser||Left|get_GridWidth|Verwijder|Mutlak|PerforceChangelist|Teljes||initialize|Defeat|Voitto|u00f3ria|Vittoria|Overwinning|Victoire|badClone|scale|deze|130|Links|Black|getTime|checkAttackRange|saveCityLayout|moveTo|timerEnd|salvata|Right|refreshStatistics|Nome|getWidth|get_RepairChargeOffense|loadLayouts|optionRepairLock|resetDblClick|108|u0131tl|Kay|get_RepairOffenseResources|Resource|initializeInfo|resize|u00fckle|sRxHtq77ujD8xnAkAAA8wQEAqMCG1RFOisYCCw1ZCQBkAAAQxiBkEFLIIIQUUkgphJRSAgAABhwAAAJMKAOFhqwEAKIAAAAirLXWWmOttdZai6y11lprraWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUgEAUhMOAFIPNmhKLA5QaMhKACAVAAAwhimmHIMMOsOUc9BJKCWlhjHnnIOSUkqVc1JKSam11jLnpJSSUmsxZhBSaS3GGmvNIJSUWowx9hpKaS3GWnPPPZTSWou11txzaS3GHHvPQQiTUqu15hyEDqq1WmvOOfggTGux1hp0EEIYAIDT4AAAemDD6ggnRWOBhYasBABSAQAIhJRizDHnnENKMeacc845h5RizDHnnHNOMcacc85BCKFizDHnIIQQQuacc85BCCGEzDnnnIMQQgidcw5CCCGEEDrnIIQQQgghdA5CCCGEEELoIIQQQgghhNBBCCGEEEIIoYMQQgghhBBCAQCABQ4AAAE2rI5wUjQWWGjISgAACAAAgtpyLDEzSDnmLDYEIQW5VUgpxbRmRhnluFUKIaQ0ZE4xZKTEWnOpHAAAAIIAAAEhAQAGCApmAIDBAcLnIOgECI42AABBiMwQiYaF4PCgEiAipgKAxASFXACosLhIu7iALgNc0MVdB0IIQhCCWBxAAQk4OOGGJ97whBucoFNU6iAAAAAAAA4A4AEA4LgAIiKaw8jQ2ODo8PgACQkAAAAAABwA|Carregar|Carica|ta_sim_layouts|Lataa||Charger|Laad|refreshed|recently|Locks|Freigabe|Apagar|lastUnits|get_Faction|Droite|backgroundImage|Vit|u011f|Rechts|optionPopup|SimulateBattle|will|initializeLayout|based|most|loadCityLayouts|optionAttackLock|optionShowShift|u00f6schen|Tempo|Gauche|resizable|Affich|section|Center|Command|u00e9se|megjelen|Guardar|Comando|Centro|weergeven|Warning|u00e1zis|pavmCombatReplay|Yard|countDownToNextSimulation|Csata|Sava|loadData|Difesa|Simulate|Savunma|Facility|u00f6zpont|Mostrar|Spoils|155|Outcome|740|get_CityArmyFormationsManager|initToolBarListeners|Unknown|Sauvegarder||Tallenna|updateStatsWindow|u00e9ny|display|Overall|shift|Attacks|Salva|automatisch|automaticamente|Birlikler||Creating|missing|MainData|Buildings|loadCityLayout|getSelection|Effacer|elmentett|deleteCityLayout|valittu|rechts|setVisibility|script|down|400|opgeslagen|allowMinimize|125|getChildControl|replace|allowMaximize|showMinimize|ta_sim_options_left|getLayoutProperties|getModel|showMaximize|links|200|Enemy|GetNerfAndBoostModifier|Tools|u00f6r|Organisation|_ActiveView|Elrendez|Defences|combate|Basis|Ara|u00e7lar|szimul|ViewModeChange|ablak|opera|OnSimulateBattleFinished|Apri|u0131n|now|u00f6ffnen|Zafer|timerStart||CurrentOwnChange|activate|curViewMode||hideAll|GetActiveView|ownCityChangeHandler|Double|region||map|auf|Enable|rich|simuloinnin|taistelun|q2I1meJ4qqqqq2bXmeKaqqqrqurlueJ4qqqrquq|Opacity|Tiedot|getAttackUnits|After|aikana|ueaaqqqrquLOu|calculateLoot|Popup|targets|Mark|Alle|kaikki|jalkav|href|unlockRepairs|u00e4nn|unlockAttacks|_blank|Vertical|Spiegeln|userscripts|ajoneuvot|138212|Modus|korjaustila|Version|discuss|gameOverlaysToFront|org|lentokoneet|rpois|scripts|calculateDefenseBonus|Army|OVL_PLAYAREA|Wbd|E1X9oVb143j1n1nGV2XrsqyL6yyrAy37xvD7vvCstq2ccy2jmvryrH7SmX3lWV4bdtXZl0nzLptHLuvM35hSAAAwIADAECACWWg0JAVAUCcAACDkHOIKQiRYhBCCCmFEFKKGIOQOSclY05KKSW1UEpqEWMQKsekZM5JCaW0FEppKZTSWikltlBKi621WlNrsYZSWgultFhKaTG1VmNrrcaIMQmZc1Iy56SUUlorpbSWOUelc5BSByGlklKLJaUYK|XbVsZbl1HVFVfV2VZ|zNE8TPdETPdNTRVd0gdCQVQAAIACAAAAAAAAADMmwFMvRHE0SJdVSLVVTLdVSRdVTVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTdM0TRMIDVkJAAABAMAchM4tqJBJCS2YiijEJOhSQQcp6M4wgqD3EjmDnMcUOUKQxpZJhJgGQkNWBABRAACAMcgxxBxyzlHqJEXOOSodpcY5R6mj1FFKsaYYM0oltlRr45yj1FHqKKUaS4sdpRRjirEAAIAABwCAAAuh0JAVAUAUAACBEFIKKYWUYs4p55BSyjHmHFKKOaecU845KJ2UyjkmnZMSKaWcY84p55yUzknlnJPSSSgAACDAAQAgwEIoNGRFABAnAOBwHM2TNE0UJU0TRU8UXdUTRdWVNM00NVFUVU0UTdVUVVkWTdWVJU0zTU0UVVMTRVUVVVOWTVWVZc80bdlUVd0WVVW3ZVv2bVeWdd8zTdkWVdXWTVW1dVeWdd2Vbd2XNM00NVFUVU0UVddUVVs2VdW2NVF0XVFVZVlUVVl2Zde2VVfWdU0UXddTTdkVVVWWVdnVZVWWdV90VV1XXdfXVVf2fdnWfV3WdWEYVdXWTdfVdVV2dV|domain|3fV0HQkNWAQASAAA6kiMpkiIpkuM4jiRJQGjIKgBABgBAAACK4iiO4ziSJEmSJWmSZ3mWqJma6ZmeKqpAaMgqAAAQAEAAAAAAAACKpniKqXiKqHiO6IiSaJmWqKmaK8qm7Lqu67qu67qu67qu67qu67qu67qu67qu67qu67qu67qu67quC4SGrAIAJAAAdCRHciRHUiRFUiRHcoDQkFUAgAwAgAAAHMMxJEVyLMvSNE|commandandconquer|com|test|get_CombatSetup|ArPdO0ddNVdd1UXV|CommandResult|createEventDelegate|returnSetup|CommunicationManager|repairResult||playRepairSound||VZd0WVVW3Vdn1dVN1dV22bWOYbVsXTlW1dVV2dWGVXd2XddsYbl33jc00bdt0XV03XVfXbV03hlnXfV9UVV9XZdk3Vln2fd33sXXfGEZV1XVTdoVfdWVfuHVfWW5d57y2jWz7yjHrvjP8RnRfOJbVtimvbgvDrOv4wu4su|XdV1YJk0zTU0UXVUTRVU1VdW2TVWVbU0UXVdUVVkWTdWVVdn1ddV1bV0TRdcVVVWWRVWVXVV2dd|delete|getItem|type||parseInt|ekZNBR6SCkVFKJqaQUYyglxpJSjCWlGluKLbcYcw6ltFhSibGkFGOLKccWY84RY1Ay56RkzkkppbRWSmqtck5KByGlzEFJJaUYS0kpZs5J6iCk1EFHqaQUY0kptlBKbCWlGktJMbYYc24pthpKabGkFGtJKcYWY84tttw6CK2FVGIMpcTYYsy5tVZrKCXGklKsJaXaYqy1txhzDaXEWFKpsaQUa6ux1xhjzSm2XFOLNbcYe64tt15zDj61VnOKKdcWY|Preparation|View|pavmCombatSetupBase|4xtyBrzr13EFoLpcQYSomxxVZrizHnUEqMJaUaS0mxthhzba3WHkqJsaQUa0mpxhhjzrHGXlNrtbYYe04t1lxz7r3GHINqreYWY|4ptpxrrr3X3IIsAABgwAEAIMCEMlBoyEoAIAoAADCGMecgNAo555yUBinnnJOSOQchhJQy5yCEkFLnHISSWuucg1BKa6WUlFqLsZSSUmsxFgAAUOAAABBgg6bE4gCFhqwEAFIBAAyOY1meZ5qqasuOJXmeKKqmq|resetFormation|skipSimulation|yksik|showCombatTools|u00f6kaluvihjeet|pavmCombatViewerAttacker|4555qDtFZaa621UkoppZRSCkJDVgEAIAAABEIGGWSQUUghhRRiiCmnnHIKKqiA0JBVAAAgAIAAAAAAT|Ic0REd0REd0REd0REd0fEczxElURIlURIt0zI101NFVXVl15Z1Wbd9W9iFXfd93fd93fh1YViWZVmWZVmWZVmWZVmWZVmWIDRkFQAAAgAAIIQQQkghhRRSSCnGGHPMOegklBAIDVkFAAACAAgAAABwFEdxHMmRHEmyJEvSJM3SLE|zNE8TPVEURdM0VdEVXVE3bVE2ZdM1XVM2XVVWbVeWbVu2dduXZdv3fd|Inf|BqEZ0F4FoRpQQghhCRBSJCDBkHIGIRGQViSgwY5uBSEy0GoGoQqOQgfhCA0ZBUAkAAAoKIoiqIoChAasgoAyAAAEEBRFMdxHMmRHMmxHAsIDVkFAAABAAgAAKBIiqRIjuRIkiRZkiVZkiVZkuaJqizLsizLsizLMhAasgoASAAAUFEMRXEUBwgNWQUAZAAACKA4iqVYiqVoiueIjgiEhqwCAIAAAAQAABA0Q1M8R5REz1RV17Zt27Zt27Zt27Zt27ZtW5ZlGQgNWQUAQAAAENJpZqkGiDADGQZCQ1YBAAgAAIARijDEgNCQVQAAQAAAgBhKDqIJrTnfnOOgWQ6aSrE5HZxItXmSm4q5Oeecc87J5pwxzjnnnKKcWQyaCa0555zEoFkKmgmtOeecJ7F50JoqrTnnnHHO6WCcEcY555wmrXmQmo21OeecBa1pjppLsTnnnEi5eVKbS7U555xzzjnnnHPOOeec6sXpHJwTzjnnnKi9uZab0MU555xPxunenBDOOeecc84555xzzjnnnCA0ZBUAAAQAQBCGjWHcKQjS52ggRhFiGjLpQffoMAkag5xC6tHoaKSUOggllXFSSicIDVkFAAACAEAIIYUUUkghhRRSSCGFFGKIIYYYcsopp6CCSiqpqKKMMssss8wyyyyzzDrsrLMOOwwxxBBDK63EUlNtNdZYa|ByERTlYEIMnQegghA9CuJqDrDkIIYQkNUhQgwY56ByEwiwoioLEMLgWhAQ1KIyC5DDI1IMLQoiag0k1|pavmCombatViewerDefender|u00e4yksen|setDomLeft|U4|target|viewChangeHandler|unitType|startSimulation|ogg|RadioButton|Bouton|Sald|tacs_version||String|initializeOptions|backgroundColor|info|122|Used|lukitus|repairUnit|horizontal|Wheel|Audio|red|blue||www|freesfx|Air2|Feet|vehicles|CombatVictoryPopup|buttonId|toggleRepairMode|u00e9bloquer|unitId|air|courtesy|Sblocca|vertical|8RA3ZvcmJpcx0AAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDA3MDYyMgEAAAAhAAAAQ09NTUVOVFM9aHR0cDovL3d3dy5mcmVlc2Z4LmNvLnVrAQV2b3JiaXMiQkNWAQBAAAAkcxgqRqVzFoQQGkJQGeMcQs5r7BlCTBGCHDJMW8slc5AhpKBCiFsogdCQVQAAQAAAh0F4FISKQQghhCU9WJKDJz0IIYSIOXgUhGlBCCGEEEIIIYQQQgghhEU5aJKDJ0EIHYTjMDgMg|video|u011fmesinin|black|u00e9e|Count|value|120|Crystal|Z5qqqqquK8u|end|u0131m|Onar|freigeben|Track|abs|b6qq67quLMuy8Juq6rquK8uy7Qur68qyLNu2bhvD6rqyLMu2bevKceu6rvu|Palauta|YhWUqQH|LAeR5g53HtsnSDCMZcipie6mLflMtIHVCee8h77z1MeMKUivkS132NaXf6S2ugI|5UWK7xoWVQ2Kivt1zS7Jaua4ewVNzzhmu7tTcLMJCinDpBo1eMqLAzb09MnTHFx4yxYwxyKRIaPl23|q5JEgAAAAASUVORK5CYII|Rg6MDGlHwdYVqnP|QUQBDHwYDTm9ZufyaeDQ3JrGN|Ixvbe2w88yN49W|8d75v94QuHOqW3Oz2s9|unexpected|7tZV4w2ViJ3LTl1MWNRup9mczrFizrDSSSxyFo75AhNZ3if|Z3uu7gtUkRO1GxftJvXfAgwA2h5U|8X3P3|kVRlHyTk5Hpvr45eGkq2u18Jvji3G4ZalqJNn2V2jaFwcBKRW02yKzIPbbSjz6SIRhFXbW1ArI6rEm|EJLTu9TWFhpra9Puhv4n5o68POvi6KgXCUrh8BUcOZK|x2c0JamoyY|e01xcYLeaExG3Ifxnk9rPHXbtqRH3nijADb6OYcoDCEioM6ESAjJGzbEoGNlQK30iKGysKDYYmbywNWra5HhrniPJ9Fgsbh5KZdOibo4MuJCu46FHgzNDw6OaY3TOez3z7q3b89EEoa4jU8pJalZlptYy7cBj0DZdpG4kMhoWyqdY|ctKTUlgYZ4yNdXJOOFlSk|get_ArmyUnits|OzF8fp8fR|KisromqAsr7ULEDVRaqNXUuavr7n|pavmCombatAttacker|RepairChargeBase|89trf0dozNh07ts2ckEB7jUZWSq8QtTfUcSeL5cTKAHL9U1NZ|19x9qimpqb|PkNjSdOpMwODExqu1rUVuwB46b4eLnw5Zfz0AnTpnt65q|fX1GQiJday1dZEWFisZd23c6MgqL7dgcxLr3rFDzQM79hQxNHMY|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3QMQFzoqkrYqRAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAGrUlEQVRYw52WyY9c1RXGf|get_OwnerAllianceId|dvfiRIL9TlbOese84EODkZ6r|fr3qIrAlWvX|PhF3Z5fJebH30kNarOOVnrdrh3OKTbTCnqSPCe1b01eivr5I0EQH0x4|ezuPf7x19eYjE7I0hQABRLrOB4OmU1HNFsdEUStEeoQpDg85NiqLAzgg6fbacnOek8|uSIVNpy5cpVfXg8ltHREaPjQ1QEVUjTlOYGfLp|BsxGl9WTeIrxFIX9dr4ZNuD8KH77Li9O008oswqAAVlcirxa7tDl6FYR5EFy75x8Pn37pTEdHDR3BjOeU|SendSimpleCommand|GetPublicAllianceInfo|3mypPL3bPrdp6qupt78|BNaogItHr7TsPdCDHZk18XBhgf3|fQVpx|YYdBqXPiMFwqtPpROrZhG6rxXA0QSTiAyTOYW9Bv7|KzmpfrD49znFnkn1VMeWndjtgN6ELMmPLxWPxsHg|kpxCjyTb53jzj|Jmr664Xa6cHspRDn|zy57vfdo87CyB0t176xcsv|yQhqtCZUHkTEGBAiUQURQVVI04zJbIogIIIxQFQ9GM30sIpmOdU7r|Rp576hl88KBz|t18Km6TEJpYFbsqqvJuJa6L699crTZR5LELi8kk|7LwgDLvT6XrzwneWOFrc0GIiI|fkavUv5iTLxfDQCWqFkJvXRalkpHMNTTXIb4zqvr|4Mum7n|get_CityFaction|v175Li6VR4ArDx3bhgM9tMxqYUF4wHVjGqq2Sy|4aqrqG7qgd6wm2MjYnBKFFIskAifwASipRlttlHkSJlkb8iUnYRy6yyyzKgDEgBJYRJcUAYhGkPZWx6qK7pDffek0W1CSB6Uf2WT|jPn|Oa3v|tT3d1|t53zvedI5zx|q5z64IW|uDfiwOIIFHRNGvI8soKeSPXaEQ67Q4mCs4YQowYa3HWIVmOtykbq6vqux2ZFgXLvb5WdSWDT|i6efuc5sfEJZVXRXepJ88J7e|icon_mode_repair_active|VMVPN1QAstWuEhB987tOm0snSr8YZW8tO4KwDvc|88CjGu4CNgIPvk|akamaihd|eaassets|f7X|O3PmBkgYNKoYuvvNNwL0I4s1xUq5ILLIpACrey9cyODYK8YtDoch76mnQkwiwnkp4bn4iy|Qbfhtd|net|b7TEz933WmMj|K0IgD0TQbKyOaEg72X4UF3vtVJWrJ6O7KzJVZftig9ZIrV4UmWbpfFhrgk8z9m|GetLootFromCurrentCity|VkDAyCVK|205|sYLnn59VjdN5fng4gFK3czkaRe5u1qHr15O1sbempASTcnOpXH6mrEUZXUQVTAtK1B4kgcQs05BwcvNaIBn3FBWNx6xaZVZJ|zvln39el1VRMaEhIYNEGNUSAxIlGG|DBBSYhsyckzMZ66aWX9mO8GcgHkrlfkPzeB3rT9u7tXbtnj6B6gMpv8No1HROOVwlYiM29GzdcUjAYXFY2g0GPTO|https|jcBW7g3dai48cHkTcChykcmJub6Th9Oo1s8aQNKoFEZKxzor3drnV7weHDM2WffHI39|1buCher0tu5|37BVHe3SWtUU7sRqoLu2lrTd0eOFGGcDazh92e57skrzbEOx09|NDQzI8nTqznMDhZQwSRjVMVeG6|rKo57krC2sRvlGt2RRd9ocVcPY|Pcsy33BrDRPRLoe2xsseQq4dOohoHKp9VUFiE6xqm7sePH3f4zauchfVZlLw5RAIWGzvTXsU14RXHk8Vdr67hIuMa5kOEdWfod5psQb17w9Kn0zsT9kK1gpwBM5u5lW9sMf0IHYECvLLZYehl6t5H52pARNwgoIZpLG9t|d6sV|d75cf9c68c248256dfb416d8b7a86037|vbZ599iJPsgZlnV1bqK0|WKBREQOQSKwD|158|0l9Xt|1E4|CalculateDistance|cncalliancesgame|m8kcpq4cASrIWoIGA5Pvh4LlzzX|askWvEbLw|t39ELHGsj8nu6zrbXoAAOqmXms8|iRekfR4|SrA2YBggYzaehOe3y5fXtbz1VvbYL7|131|EuAQVLYlfvdpyqKGhyZKU9D3GP3G1hEV2v5Hr2vxjVVXaSsbpp|CYmxqe6upI46Q3icov9z|PMiG0js9vOTeNy|Value|1vP|simulation|Ma0c9260cScnKXJzk6VhNxWXZ2W9|Furq0db3n47j7rscEtLWAoEvBzKgD0jw2RLTZ3iJA0a|0Gs3nr7jffpEw3DTc2upZmZ3tU43Eej8XmcpEtn6qElLHzKZs3jyHzRbXUUBFL|get_CityUnitsData|DiplkejXEEmQdXxc1l1dd26Z54JgYislhpI|GetUnit_Obj||nITaCFnEFBDQpP13Z2AsJqiFOKvcKnL3vyNiqvX2lD0R7uFWBPENEdtFP6B6kJAC64aTUDdQXFBP2Iab1u0w3HCl2v6sFQ1Ne50qaqrcPoZsW9V7Iiuvh3LAdTCBbfNoX94vpjNc6YBVSyyerKYWNVbeT89u|ResMain|Res|vrrBdkVFeSRVk7qgEpAWd|4YORTKRDueRE6oM16eOf3f||eyy7yqqvFH6ZqQUVqqQ22noQF5kRNkKAAyS0ONjf1Qv2nVOGZuhDo6INW3Me6nsBKBCPdnKzxg7fz667yQzxdiEhI8YkEHs6ds2iSr6wZNP1d7vyV9|ST2fDCfRaZUQ0J5Sj58EPqhnvQiFATYaXUqJxvvvdeB8K6vuPLL|rxmmymSUlJu4D5IWwvqqqShUjJ|LugcviVAJwnRRcXExCP|0wn6vWlXWfPimScPkh949eTJ|eF7bWFAVJkisIzY5WY3XIntCOco|bNmzdv1nSlqB3TBbyyOcZXKDY3oJ9gaZb8cFovwjWF1|KLLy5DjOaYhFLnEUkKdZ45E|Structure|GetCommandPointCount|rTq5|uez4yje6n|SW3W9NTl7kjjbImd76aE1Nfc5jj82AREStc5AIdp89a6g7dqwkigR9zwfjfjz|QLsW4F22qxe1LTlKXtWZLgHjQAdwu|1VcPYLydNcXJRmhuIc1aIQB5X|7EhuX4ILW02g5XWTg|GetUnitMaxHealthByLevel|LDzbETboqzh5MnBJFP8K95spIek6SITvfPWVrDeb9|17910bNx8SuFgYDGo8sMQeIbuygS96kx9|Offense|d84ATMOsg9YDp1cvrJYDUH|elHzjwA8bXOS|CWLePr6JsiACn6J1qwnStqgUxx02QflETNAsx595eTkWOMvX9|ZbDYzjCUM1Nc7SGSUOpek4GBDQ5x|6N7y8OkGQZ33n2Ou3|forum|tK9Up|7QiSN8uNKr9yofhdH0LKqS0yHM85j65neuIvH42z4lqO7oTUc8wq2gdMUDtsJACo4x1f6TiemHXGm|NMM6t6PMj6eZPJ3OWBGwHoyDa|ForumOverlay|myBexisk2y9htRL|HusPwDaxKN2a8OrGcfdX57fyaVmpOuaMTLnGB|w1gnyQIQxcq4yvAGzANXjMhf2WyqmuWrZTkGPNInLoCHrjG3QjIi0fo0aIT9gpFXZaQY6Kww|Vsf97bo57D3OFvkRlXKjdgDsQMdoOJE1H9yduOZYooYGAKpSMz75mYm8uB4zEq2Dt5kRGV||AllianceOverlay||fXCmg79sqZe8YcqpOnuqp8HC7HrmGedlemGBJbZqJKk1G0wL4mdlHgYdZAWF75f9dDvKrxeRzrrvo4SCbvZK5|WFwd3HZcVbAjnGmz1IRxr|v7IH|mail|MailOverlay|BJknEtwOem8wF8V|CW3njiIuDxAzG0oDLecN1vgud28||gwWsyRl|alliance|ResearchOverlay|C67xPwTQ|VLoe93zn3HPuPZ3LZTTCMDSg43teRsZ9XDaD1SLkvwvAKIFT4DqoJEUiKwFN8A5sB|pegIyjOw1c9oWAPRO01tZyeP6ZFRblm8f35f8y3cEr2qe|fB0jgRXo|hdjEMeQM8BE|HdOK6q6mrd5Sa|wtbSxFqyJiEeEeGS0kU4YY3qobt3lO|BRgAhgJgQiBnZrUAAAAASUVORK5CYII|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAx9JREFUeNq8l8uPDFEUxvtWV8|o7hmPTCeeC4bJYIhHIhZYiNjZ2CEidlYWHrEwEyxn7x|BCXAWlKNE|InventoryOverlay|3ZCQmsRErUyGIxNQhiXibayfIbAR06Sj5nYJEQiR|F2Cb6CKUlOmwN|xJqvBRcZrk807DtrOcTnkvnv6ZlxRA3QW8OKmGc5PoLxVlwEilyfYRr3nVAv57274A54xYkbEdHZA06DbUy|ehIog54ybK9RaBFFUAPHwKxEwU8wLnV8lWGuMdR5tcba|0BAjoqeXEJ3JZ7VoRJ4bFMvgMcB7s5mUzccpbSOE7puQ0jJblxDtyHgHaiABiXUG4CZ8B|N0mFi55UABLwDAY4GO5N8LnOT6vglFwEnwBNzDHgjG|08Kk8ZKREmMbwU4wAVaBNfKKhBgsA21i5|monetization|fiwvhX0Vv5DwKq7rUkoavDo5KREbLDJ|ReportsOverlay|PK9qoi2gL6oOqL2tYyHno6J2JI4i3szvQuYwxXTVZ31aTku9p95FPOwaNltdXTN6Fa|RestartReplay|VKxeArQ22AKrz4Y|get_BattleDuration|5E3|vxchLBJAtS9E|PointOfInterestTypes|3lSfPZUYjdf8aHgG8Yz|7l7|2E3|yobmf88fJyK455hg5blpDS7KaLPHLvIgMY2Q1WT01PY21hbF9nea4OT789e2aMeKffFm|280|349|rPrdv6mL|175|230|THXMddeTaW8UXv|180|dhWfzqt8Jswq1z1L|WM5TsNz3A2bUd1PP8ZPAQYA6tkaX3nBq4MAAAAASUVORK5CYII|GetTotalBonusByType|837vUHuFFlJqBFASUVgYBiZtgJjXZqsXvNgSrXu|275|p2c5f|YWD7N8E2TPzysmRwK0PAAzYTpHnbuiSQsgAlQt35YeEkfKzxLsyG2lXHvPazya4z4CaKCrALQuABfA2MGYe3BdS0xAta7V7|0CJwHrjE4hKwGe8jSkp4G6LvI0LKZpMHsR0KTnniOizjIcS9M79CKgwUOnwKy3R|dTwNgoFAX|lfprJlIjU71oBeWZ0nSWTU5tILa33|zJ8Z|DefenseBonus|VEYZ4cUvtDJgJmmQcF5b1dhhc81db1Oxk9tXHMsZevOEsQ8JnkwlFZpn6K8Jw|t2xGava86Ga|70aA|DoStep|eBecFhtvxL|CTAR|225|EPOIType|ZgrWdZQjUH42D3bbzqQTwlHvGtmmEZVeioAl2xHW24|I1sD3vGPHvGAoI39PO|DjSdUGheq99e3x2yXFUVYitt9JbdTud2AD6yAtXlceOF56itqOXrqTIcH8wPiuf43cfTu8prh|rr4upQ4RNKqqytzzc8u12m12LlwAjWzuPk7mBHE5BqUoC|a2d|n7BzcWB9CoTKZTTdqVxLrSMih1VUmdJIQwbyprDUVRUhY1vi6YemFlKcdXM4xGQlRGowne|8UXEmtFG3mGiqhJUvLUMRrPqOpIkiQ4ZxExrPTWuHrtOls7j|9w4P73PzwBuvbewzu3MJZQ9Lo4AxUVcHNGykPvjg8RxOKsLq6Tqu|8z5Zd5XaRxILFy89SavZJEYFnU|PFwdHiAHne4MUXX6S50sfXnuADxlpUIyIGRIlRWFlZ5yc|CalculateAttackCommandPointCostToCoord|RkhKkYUBOo6Yq3B1zW72x1ufP5gcYAQPDf|get_DefenseOffsetY|PEE22CL2ZUviTNLVkmjxaEBUugqoqKsVY1ICFUgoimaSpiDBrt6T6sxAhZo0O328e4jCxJKUtDVQnHRw5|3hj1e77VaMihhrJMRA9IEkTbDOgJ6OX4SoEdVTHAHvoa4hM8JnD88ex|8DigFIoHwdTR8AAAAASUVORK5CYII|get_MinYPosition|Dwc1hpgymTcywkxfDDX|cPB|OM9ctiveaa|nhzwQU3HutBMU6N1Qae|rdPJidRHD9m4uIlNvrqUA7S5uPv0l|HM3GwnQ65s03Xmdra4OTaQRfkjc7EEtqhAd3b|2dazxiM73PPjhj7yfmaUGPEe49GwVpLmrYQMYgREpPgnKOqCibjMc4IdVQSY0AMtZaU0xnWpUi05wgiZB4lNsVRMZmM2bv4JK1mTohxPoYFJuMRDwYDqnpGHR0mVNisgcRARFgJGyTnATBG6PdXSVoroJ6g0GzkgOBsAsxrniQpS60l2qZJ4SHRGnUNEiucnAzJckfgHEHkfc3b77xLo9Oh9DVBLZcuXuLypSe|0uY7Xm8GRKb7nNxb0ncM59zZdBA6N6xGQ2owzleZpQeOyxTda2tyhKT|KE6aTg8XnlSdMmT5nArAzIqSXlVGpVJXNNLrQvsLXR4tX03cUB6qrivbffonh|6hN1wh4JKL7b97MLnYWarKvd0Zb46VOjjj0E7lfJbH3Pyp2j0bQpia|v6RmsI5csCQ5znd7jLOOjJnUQzGCM4ZxqMReaMF6gFzOph0HiCn6lgMSI3IORQQI5RlyeDuHUbTgmaWkmeOW7dv0|GUdiPBpQ3EGKJGjDUQ5z7QRyByqoZy|get_Simulation|14Vdpcyfv3Cs9w6OMIIjGZTru3t8tqfP14cIIaazwcD0mkAjYSqIIrBWWG5t8HO5hrhW8z1w16HH6cwrUr2R|fwjTEF1eIARiydTgfTzIkhYJs51lmSJKXT7lD7uSLGyP9LospoBqOZUIVIWVg6zT6ZSc8EMGeXQIhRcdahGKxzCEKr1SHLskc3oqqIKqgiIlgrWAtGFCXiYySoLq4AMVBWFVQFo|CWMgz3N6nRbT6YyD4ZjhwV12n7zOD777LNaYufynEEaEUXHEjcMP|cvwU|fXn2Vx7gf3WK|dIwhA4PDpiVBRMixJjLWVZ0e32OCom|DCX3sfI2uraly74ZpbUKFHDOZIwKjFGfFCQZJ4HydxuW5s71CHQWlrCWIM1BplvY6jO|T1lWaFRUFPMViKhKK|jTUV2XdAczbuv88Ex3BvMbsTgB|98W4mJyfN2CerlS3SAOhd50AO4oGbNh|ceil|GrPZDFXFWkdRlVxOHNY|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzdJREFUeNq8ll2ITGEYx|edj901i2UNaaiVyFdK3PgohUJSyo3ykVsXeyFy7|EpEn6|nclOBpzAbifCn6sU|OvAUXtMZwImcVSt4FXumA47LRO6BiJqdhpW8Cq38mzcDhh|OQ4Du0pIimlIxOlAF|ggUsaiZ0L2ABEdvOsrAsA9nQgtISLjN9CK6BebS6RiEVitwIutruBVoEDhFxnIvoy3gllimUkvwAbOf4dTpQowuLWPSKof0AB5QZvAPPcF3pqLa3REqge3StpigzPTk|5WUAIfjyb0C3iv6LvxTinlDPqULnL0UoNWg386hPEvqfEecOsfUZRi8Rke|KMTkdaf8sQIYvvPBfTHg58H9zkqrfFT6eIzWALWMxZV5UI4RPYC16Bx7qope2CQhEXafdusJIDD|3aobJV6|AXfALnCA|vHNxXcVRWy4pf0yB3g6s6z4Iyo4C7XQ4bOxJYCcXUDv|yCu6oDW20bSmOYPZSbreym66o4C5TM0ZhsTggu|9TXwJe6AX4V0sWUQqy7CnlMxwAC|lfhuKu2LuqiakO|ranking|sAUs5Y|DrfkRqQCaP18cBB8ZDvvWg7MkBaeW7cXtQOG3ZTMrB|gOBhu2gksq5qr|oxWA2SfZzq8DLzlLx7J|RankingOverlay|ZPP1pUbDcYQd2|ucy1sB8MyrhBIuxF2AeOgUOgRCEVDtYMcKeXC1dm|gClaA5QxcBqO8Fn7hvTGcXVAXp|CombatSetup|5HkLHyPhucAdvAGAV2B6RHjmGKk|get_VisAreaComplete|857nfUwi5PA8T05GLo0xiTiO5DjBe8BaMIDfZsoEMHg32Akug00gNZUOSLD14CQYAu9BMw4B6YDZi9WrwGnQC56A161bf9Lg6Xcmsz7SAcHz4BTIge|NOElfkjpBy5Yoil5S4EclolfK5YwfL7JwzX8f|SetPosition|af5Hj9eZs2P3nD3165yZc877|gLfgKd0qiiAI8ToSwOAzwVFwGPxgzvUAnvXbv29IimI|g0fgNiiAWpgjvgB5eR|3b8HBE|HH7ycenVdD1gpiZiAaqcfcp7dR|event|cdn|XZn1FSYRSJABH|tL9PKoOA2TXXWgqZxnEvgrrjUTkRSnXO03Jtg8AaFO2CEv0|AI6CPLrcVUANXwXUwS|GetFormationByTargetBaseId|rCMZarDFf|8a1uBbX4vpUTMZxjOubHhlTHkRI7iDMNZsHKMYIYR4|Uli3Ezbhou0BszP7Zt4LNrdFupm6waPnA6TNeej5i7eacm37ExGrxVo0RjzvIJhS4HIWRQZ1cA4LLtJegM0b0HzvSe|odGSUGSYptnddz2e7XGrntxR7e0DxjoeU|OWf5kH|fvAV8fP|rzz|Z1Dhlw1vviJ|Y3lh9asmN|rEtOrGKwfalgLAQ5kwMAGpzJWE8bzT0nZE0CJhoKp6XvL41gd6uqpyi0u7Zy94Kf78jCl5PGburOn5MyZXLASAYttl|ahHSzwL65ZPWNNQV|ECjgwJ84lISDZSgIxF8lJGTiA3EQW5ywDJkLicEizLl4QXnxvt2Lx4rNTycqG0c4pPrAEALyIWVMyuwHiSQshUBkQkBymp9pJl1V5xGRHufJdZ5kh77ZIlotNZ2|9AmSw1XZpIj5kxIm4EAcSRFTE2F4hs|ee8|SfPNm39hi8LmkjYN2AJjBnvJLMn|8TlfCCo0f7j3b8NXLr4q6fwmTlHTzY3VRBJXpUzplAun1T93sU9LdkTFyzlJvwE7LcCpBRn|bYt7sLdn|yrv9EfUa1t27o1917qbXDi0Xzm|27At|JCiIvzmLYBYwfSSMB|Hysll2t7zfbWw3guLMLybIJUMxkY5yJ0FxrYhd0eZHCkJUgwlG2smw9b3lgEH622aH5zEaxdNg9ww3MzGl4wJo9FFDzhWrH8VqB4K9fj4wyAGgwS1xPs1P6AsRbFPweAS0gIof94EiaoCQkDI00rBxRldWoOibFuuXSSuhCCRLAS2pFA6jbkzxuIH1EQnb83ogHG0DoKq5RBSh|B2OddVrlyx6fb5j4fMvEj|uZmg9LXix8eCyIR0meogBjUhJ6|owE0xPjbiq0gU6UeOIAYSTxnhWaP|5jpGFbRpchOQTDlLvkBAH1E8nRE9RXikWMcIsxe4gzhlIFGTG0hffSr2UxmwTdrA1NoPO4NKeOrtfr|C5CDgcTuhZs4McDqz0kuAZM5AQtcLqkqKpKenlQH||fL1aWFMPur4|2tMS7Dl5ak332XNhdTCg5U2s3DDztYbY9cMHsksmPhadWf6IO1cWx3GBcxFzB98CiP|XZOye40QQwOdxr8bOsaI5c1t||GeCdg52nA9|u9x5puuLth9|v2esKXu4tzyurOK9Hw|Kpkrw|kokFn|Wzn2KJatEZ1fxcQHpu28ZzmrY|DJ7956Z|9Gb|Z5vrsYVXEi59ulMyrk05mGtLcDpxcpbzw6l371WEQCEDZVhAAWRjsgZmMjo36pBuFAPvsumvbf7U|zzkFQFeGB7xLTR2UdqcdvS7Ah7dnDx3cPnp0NUDnMsxADDySVMhyXvB1pdQM|o6dk|aFXR7ymgCn8oX|PT|8NFLUzseybpZKDZLvNkbjF6W6tQPbjNpFiPEhAPqmu|06T3fMKBcLNdGixkgrkBuBJLzmXvlkOLuwcG089nudBuA1z|7xNN5peBVOJqTEFhzEH6WwBf52uH929KCgCtAHQqYgbNwKOewoQFcL3SetDShv|pZR3Z5KqrnuAayula4kY4gjHsLtmi7PVIOlZissD6QTn7IFP9m2fXMyifPdAmgLEjLwsIu42UG4WgqWykHYKjSCxcE|8HQSHg722Fl|kxl850HAXPB1I|0ehDXqXIkxbhECKgBFPOFZDD2qNQHOl2hbzff3C4BWSHOZAe8axqG4SyH9OwBF8xo16h8YpsZik34eSLnHLQsvZwfcKy2G6h4bdW8Blun|tT7lkvFZtuGqhNuRj0qAN0eKIfjtyoAmx1EUKikNno6VKwXCe4CGRubR3sO6kcmBGQ8j4XdVcBzhXDQ3v71dHpKgMCsKsQXQsgabG2kfmbRf8uI94Ephu5bPp4GIM7oYLCVAypSx3Qh|f0W0euC4CFCMwMDMC2gCAAbEtAyMz01YJ|ULzLhhT8pz4l17K|ywKetxRcHMqkvtAIdycTON8FgFAA1ArAw4pApFg4UMnh8TTwckD|0CD4GwDP7Mm0AXj529jlLwQEEDAkgVIgEzAaiJ0YDiIgMUa10EVfuiAPVWgNHRM7EEzvef2PX9lmQagfwmGUBICtiBFaoonlDRGCIvg|IEXvEg5FiI0a|6P609VRf8|RmrKcVp5yUPdmO|8xoJulqIpLVrCqr2bxlYVlWs0qLIZTVjHu6mp34vbLFcWLxyA|TUkZ4wAAAABJRU5ErkJggg|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFfUlEQVR4Xu2Va2wUVRTHz9zZme6zpbQVSgxU21r64hUSUIkPFFPhCx|ZmfmzvXcnWWxBaoy|kFTEkkhYwNYX4ICFRoTFEKomhIajBICRNSgSifrBWHpaAChUhPFtqIVKUAm63y86|CmXKRerKYHLs|VoEfxnJiNiyxPKgTlIFMTWL5onKhLhOmJZZzV2P5D2Uee7oPcrKYUMHXRhYTKgRcikurJV4tJdOxqh|7nxx74iddbKw3CzBluQgELfrdscpiXjlRkvOtZD9gODevoxaagtwYiE|yTGCih6re0GG1eSTo3Ov7ny00RbgzZM|sKWoZxvmHvwJzQUd64cyCXm1hvDcRnDYRlD7uIYsowhyRgWN6W9mf2bneJ6QjT2yshobloAuiBEWoQIRIgq0oViyo3nRYjKIkRmPSkeFykeFiXkDUoxihS3RIpBpLguUrwIQGWR4rJIsRYp5k5mNC55YDVAZzNCMaOWmBGJGbXEjO5rMhUxo|ruBLZWUW8IoL0da7HjQOw4FDu|ySSCUAsAmgTyYiZQSJZ3QJuWgpKEsnyGqExKa3uRigdk1Cak1DKfwmlZCODhNIGI9aBqSahdCGMQX3CxqCbsVw6AMO|zxaUxI7rYscrH94YQOdAQhJIGmBMKIEkL4FkiVH5Ekia|bpYkgRdFCZjQdzOEBCGiUaAiTe4Jg1IQBCGYMQOMMeoQCZ5W0yGVbS4AWRjRceoqXOoPWKlH|LMwPw8CIaVhWt3mGr5chAhElqTOY1sbmh7UQHKd|Z0DROO0P6YhNg|TpAqws2vWm5wVALnSpwF1lO2UHMfaGR1pf|a4x33cfJr1|x15GquSUOxqhQ0jt9wqMtpU4KdG9h3Mhts0lBKZTK1xXantpCKSODQcCY710LDdSrxjMxkOwgUKbzRbbqT4|zXz3IItA0Ezj|iVBORw0KGgoAAAANSUhEUgAAAEAAAACgCAMAAACL85puAAAAn1BMVEX|GomcePMQKcuH9HSx6fv70T0KzcLgY6GqkAAAAAElFTkSuQmCC|0hYucTrUVrzHeC3UNjBnF|EGdm3VdTewbvac5LYb2HB|MYFk37TtVxgrBZw6O9WEEoJl1BC|6a1aC1ai9Z3rSC3cFpfzJPYUB4lSOQQWmuQfxAdJwhA|Ng0VwsY9NGKQ|JHWrQWrfv2YtH9b58gfdDlXiNRR6EjUSOB9P96|14Caw8ZDZJYzG3LAnh1QnS3LWZ0lLirNT8t9mvRWrQWrQ281uH9aK1B|BkaIG29gx7O75QYm9mvxLCNau|obVmj3dfSFINIQn6nhL8Coe7XXlfl35N0FEa9E6fBCrtdz7eg0niBw9ey6LQoejxhWkPcQwEijLgnMDQ6HFHiJ2PtFatBatRettJBr|c3Nzr6|vw8PDT09PFxcXp6enV1dWdnpro6Ojt7e2en5v29vb39|kImqr7xL8kCk1enXsUjyUKTUae1dDgVU|cM2|T4MyVSj8ZsvnGv|wYIaM0DyssE0AEd0EGGO|Aqj9CAMxpwQgOuzQNOeAAdnM1XuVUFn7N5QKtKB8MLSFAHiYlELpJ9wajZE9mVl9YtjSWLDnrkzqCl8XswZAd0QAd0QAd0MLrIz5UdiQ7M6|12wMgNiLyCSBzH6zUwst1stsj8AK74lmQgdGoWAAAAAElFTkSuQmCC|YD9YEAO6IAO6GDy8oGdUGTP79gRx2qxcNAZyVOapgVyyFJGv4yBU5puPj8c7l34MU83m|7MOQ1a9A18d||ea3qv9z9bYuQE0XyAXswDuJ3FA2XPgkJEHkFEQSRSjZDBAxQED7hCHTzgARhyqz3|kpaOdnpvs7OyhoZ7g4ODOzs7Q0NDX19eam5ecnZq9vb3CwsK6urrGxsbv7|fq6uqhop|Hx8fy8vKPkIyTlJC2tLGSk5DLy8ubnJiWl5TR0dGdnpwbfqafoJzZ2dna2trIyMj19fXd3d3e3t74|Pj5|||voyWnv7AAAAAXRSTlMAQObYZgAAAR9JREFUeF7tmkduxTAMREnJvf|fn6|9LtMI|qiTY8HCQkRDJoO6yR2W|8bfqbc3Nyhop|iVBORw0KGgoAAAANSUhEUgAAAFoAAACgCAMAAAC7f4tPAAABklBMVEUAAAD|OeihXxgLfsQAAAABJRU5ErkJggg|T09PZ2dnY2Njx8fHy8vLz8|Oen5t2d3XW1tZyc3C5ubnJycnLy8ugoZ6hoZ7X19bX19eKioiXmJTa2tqXmJXg4ODh4eHi4uLr6|Pq6uqen52LjIrK09eMjIvOzs3Q0NC3t7e4uLiRko9qa2iWl5NtbmsbfqZ0dHK9vr3b29t2dnTf39|ucnZmcnZqdnpr09PTR0dHS0tLV1dV0dXPj4|Uf9|vtCITCT95rFoKVjruNKeEhMTk|oUvQFlRLuBrUP9BKyjRuGZnCcBAkcEEHRIgA4GYbmUlblAwdAoqAgxjUe9GGE2Z1p5gGGPLAEWRIDcgDDUQRWF2x0A6IyGNgj9h|RFrvbk4b7JMIKzqIACDmGECReI6hXEFeZCb7ZoUjcUn8YyFonEIhpTpAPBgBtBB8oQLaUa65DhZKK1Syk2lDagYQCmD|Tas0rRngM8ipNMhH5KYgBmwRPixTBENAezfQgMyN8D|t8rSfgYUfehMHGCCapjJDKi6AQ4igpYyxPcLiRupDFD7BpjJQIkl|ztAlCQMADSm8UzID2wgx|O90GRIUi6MwRQxNTwKSAxivCkaAmAIwhJo2M2AyJuuJBBxp3Tc8xtpcKPB7ekxIbpOb|IyMifoJygoZ3CwsLo6Ojp6enDw8Pu7u7w8PCGh4OIiYewsLC0tLR1dnRnoblsbWqpqairq6irrKmsrKutrq2ur6xub22zs7OHiISHiIW4uLZub26Jioi5uri6urq7vLtvb22Ki4dvb27FxcVra2nIz9KNjoqOjouQkY5zc3HOzs7O1djPz8|Sk4|sDg|DZjYcfsdoVoPJS|ZLQj80|2Pz|cHp7VJ4X6O0awzkzf8k8npdieZTEERbDoepxRO6Ixu1Fg6EqiuaGq7o2kFJV0CgDLLYR7wzlr0jrwRSH9SeEbVlORNRgPI3a|XGA2bUwkSDJEmPa1y0|Ozln0mP1JWfdXmcxlFzIli6YgR18cexRiNLAZmFxReEfLSIw2T05dHso36cGkxk|5MjcNFj0xEdGN2rcAO5p0ABxaz6|THuAZSZLYX9kBmrRnqwekDkyZQpyacUmyaEe|jo6OkpaKlpaOlpqOmp6Wnp6Um7BAdAAAAA3RSTlMAAH5Ny5jlAAACu0lEQVR4Xu3b1Y|TlJCVlpNpamd0dXJubmyYmJaZmpeam5ibm5l1dnNqpbxubm2enptub2x4eXd6enh8fXuCgoGEhYKEhYOioqHt7e2io6Hv7|bQBDA4Wtm1|wgM8MhMzOUmZmZmfH|qjnSv38NPymmccbr2oM3vtKC7nPGMdXRaaM|rtc5K6kq9SGbac|VMJvMkm8l8crLn|A8Yb8WXC68QiBFjIEYwigQiYFEoFVBCX3ZL931nd555zvFkQnphu11Td|Wbd887sa4rtmueZzM4P12GsOAx90GHA|B40404|marginLeft|CFR||List|selectionMode|174|setRowHeight|RegionCity|icon_res_plinfo_command_points|CityPreArmyUnit|460|alignY|move|TabView|zvVhlrWnmnxQtNvMK9cLi1RhmjLHx4eNzTjo81iEAALZ6|one|5ce92|RadioGroup|zQFx2hTklqFj8z4qG2dxMWAIAwWlQWP|mhpsfqkTByDJ0x1uOXu3dPZuT93V9OOjHN2Ok24GzI13RmtVufUUSeuVxUal8ctdlHdcEBSlAf1y65o6Luh0KqQCxBeAieHLHq4BabDL67yxPz8ybyJw5hGsfz3jjCpAVwOn7nMU3hFenCdOm7zglPvJTTA3BOcE6M4RyDHk6vom3ZVKYIA01gH|changeSelection|fjoRI|setMarginTop|_onBtnClose|alignX|margin|dK2j4dauqssLTs||TextField|icn_res_tiberium|icn_res_chrystal|icn_res_research_mission|icn_res_dollar|V0Ed3b1xbgCYU4k50S3aXR4TSz0cjRxwNJH1pTWnMXC|150|members|Object|extend|foo|unlockReset|_Cities|ownCity|singleton|define|version|GM_info|unsafeWindow|createElement|innerHTML|Class|getMenuBar|attacker_modules|defender_modules|BAR_ATTACKSETUP|getArmySetupAttackBar|getLocale|CurrentOwnCityChange|SKIP|mESXifvgB2RsNSCCGZJXvVI9ZOtr7IAgvxNQZorxQMEj47nW0QBcnidD8FuLqwqgYjCgttaPSy1IyiE|getReportReplayOverlay|locale|setItem|vehiclesActivated|infantryActivated|airActivated|allActivated|DEFAULTS|113|Slider||BmjZty8j|6LqG41ItiywOTprJuBR7|ZP9bu5Qkga7G5L7NYiEgRYDGaiZigLj0F4cdwFZSs5EwhTSKPG0MHpfndfsaHcxrp15|WJlBy|UKAlPst6KEP1JUvOLpZnVavhKznPcSEgZibdepxCbz93eA8sCk8FmeIzMF0o5eK7Blf3PrlQo7ypnen8u|YSjdHqlLtQdvEZXpKxF12DLBNuBRwpeGXj61lu5ZHi5WDqwVCy|xzO7e6QMaIE0WRvbdjHXNiLjwYXnl4ZuBNjkTAsdufz8jg4||5zqarLVsPr8tV||BIfIWUuAsqriRDlLi|YQ|ZqKiCu6EJd|aCkQbLMjNg2y5Yr60FxO3xFA09WCkf6XPV9lq0JmhvTiw4AGj7hrNlgJUEcxRsN|buvFI1YDrWLNjM2x|GKx9oyQmnx|JDnxa5m4w|CssAywczBXYOHk2eKq5oVoQSQsOlIHwxn3KmCnWK93wnfxZEpyZZBlgEZh|LbGDc|gXu1sWSur2azIb7|z2vlGl|pP4|qM7UY7z90WlX4i2LE9a0vrvtZ1wEPuNvwsQs9OPte42fjx3t2bzH|AYAgML6xHYsDSrMTeIVr8d8oGT6m940P3j79|ARzr|zZI4lPKAAAAAElFTkSuQmCC|4BfwlxiF|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEz0lEQVR4XsWX3W8U5RfHz3lmd2Z2drftdinQjRhKE02MV7SIhZYLSUyIMcZ45wVeatQ|D1A67LK8X05LahYHIkRSygHPvicvbSrfn9IiYkhDAsTfMLp5hZ44hMxICwh4epFF|MeJ6hQXZbh1CAldOIf6|Q1T1FmV4al1QYXEaqbBtrowFL05T|LpmxHhm1Nqzp7jjzlkKiSbSrrOYSVCRXRfeKEAMaUUVY|uBJGIz4T7udvRrt0TtR0|SWjqktAuKVbUIthhotW6UZETrRXrOKwkCMKb399d|Xq|PTcbxpANoKTpPnXFmAuBMs84GVVKHWZm1vZI0LfGkO10xfnwt|Rqnl6hmXMG2tymptDnJTYGScBveBqVt1QbVavato273F4juseMDX7IRGhLllC0Vo616zWpuDXAbDAWs7mIlWXVAPm9sKz1clFVWjfVrrna|3CY37|yWV7EwRNxxroEvdfPrgzNKWBhAZUyWmTv11RT9Qj|uclxujx|region_city_owner|changeVisibility|88Sibdd|AZIfIE|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFTElEQVR4XtWVW28bRRTHz5nZ9Xrt2IlzKUlanJReiEhLpUpFPAQJBIUH4K1IXEQf|96cUwuRux|i3F5qL0uCjy1AsYDetfbWFH4c7Fxo|Yftb0iy|VPPXpjkDqj2DdmxqKqmi2c5xyR22j7meFQ1vT9OdEbNRMbYsVXxZHwVvI0BbPvh|39QcnPcYwYLgLAFiNtauDrNiq44bV07|n68f33po4xun|getTarget|is5xTz4|9oXPgAChPlb0DVGFXlBBlFJoaakobVVCkxbiJI7ttdfeOfwnySo18UXIlRBnd|X1zP|cjtvQAlolbLwcFSJTjiOUosUta5EW2GyEYboCFox5CTVdJDAefLGy5GdpLwwcmsNzzqu5mFqgi3aK4ds3PQuNC6yBlAbipm|slHLZCbK63gs4VxGqBpR3tDs9PZDMu0p7QSTEQg34xhCxY5jT0PjQZoMK|EppplKrHx7w9BpViEwsEHsiMEfQDC|esCZtJMXwfiSGSmqtXakX7PcSuRkOKmZysPf7Nz0Ai0jJwx5PaBwWC1L6DT6o0x|XK5drg|UBdVu9ecC8VzhPVFkXnoy6w0CTA63fLObyFYDrezFY0DuMBhpsFS7Lqh2q1ck4w8Kq28orf3RpPYLoV09dzS3YTVWO5bUWuEEY1yxeO26oNqs3nci3stKP|6aZ3pt3MPaxQNbOEpKkAshpoE8jRyB0Bw|b2XoCNTJ7U|hDGXsPcc9CMQ8txbrdQ3QQzI0xn7ghXyjRKrJ59aiA5dWAoRa6mEWau4zKOogTGGHN90OTKZUoix|2LwSWioNnMeZRx4so1vhLK0Km7xbdO3Fw6fnYpOvr|mfO7tj0v4lvStKDtseYfVAiGxeCBt8Q8a5Hkj67JGkRYVyEe|ye9e||uDzi4NnlqIdGJvC3PjVUNzPfrr66IzP|cPmvslxalZPvfjz74dFPZnfj|ylk47pI4tTc6psnbi3|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFrklEQVR4XtVW3W8UZRd|zjPPzO7Mdks|hLoJyi2Fbp9unpnyUvTOWqCPrig0zzZtci1K0d8ibXQ0kqBrLpFFCLQ|m6UTqycthWaVT5||oMJifl49tNRdZid8u7v9A|FpOxP|5H6FA|195|CZpHSSU7aKCQ|rGjS|jA7UGxeM8PeBQ90rWOc65DnURBuHZHoZnN|rf2Wl0epWgSEelxA9TkYQryEGcQLBBENfkC8kSjpO9L|5DxTEIrMzPDhjRtZztqx1E2vNNuzmNZv|Px8fGcnZrh4eGsrKv09PSioqHTwL2mGxvW19by8vJyc3Czs7Ojo6KfoJxubmyEhYPOuri4uLjS0tK9vb2en5tub254eXdub21rpm98AAAAAXRSTlMAQObYZgAAAr9JREFUeF7s0MUOwzAURNF|8YKjatoQJQdXj5loKK1jffZvKHlvGhf3cuyEObrgOE0NT9rOQ47cuCalDP08KWFYAzPh30j30fjrtq6ptRiktwAcH3HZr47WjmOkv6nffPsbRoKozBva|oRO6NJS5OSpIWWTubee|udwrUgOX|xxqgOqCBGQaobpUKOxIdW|YqDQfv7CBEaIShGH7qGE|Ej0KEzIH9HiWlznD6PQ48tXQQfdnHZszOMpV3Js0PN6csVG9ZBDLhlG1soC92KiGFbMYK4J63r40NKvxbW4FtcOznXhNsw1m2dRrtXb3TkCoblwfgJXghfh1R3fr|gRLycvsVCj039|WTLQCaVd49fYZCzzx|SyemIidCeMPnx3GC3tP0|onvUF9K|HA7eQAAAAASUVORK5CYII|o6Ojg4ODLy8vIyMien5uhop|iVBORw0KGgoAAAANSUhEUgAAAEAAAACgCAMAAACL85puAAAAolBMVEX|cFM27nXK5MvK3qTQ66jf30fywujSA5kd|3m5xfwN7QD|4FtfiWlxPgtD4DYwoixvY9eqwbGDSr|FovBBxLa4LF1GuzelLRYwQs3T5ShWCLpSca6Ae4jg2oCykGxgELT1EOp|VdRlxncQO7sZi5Dazu2ERZ28DGvCHqIdL5xLW4Rt4Jzg4aKST7rhF33Wv0|4X0D3uAjhoJetYicq0BdKerbWS|z3AYaLLvruf6G9i9hftbKZo3NsNuoPENRzS|kwhp37IWBi|uRDqvRTzj4|f39|EZmE0NPSQHwAosRHeoiXBEmc4Y0hAxis3YjTXAsDEEhIMFSE14bOTcKkm3xDNKIkg6g01pGUdchJJEDoMUAoMHSdIxyS4wylYiglG4kn6ccQsg6xeskQoFkYRtSe2HPKIlkg2AqvIwUNDvBc5dimULB|HcA5EiC6FTeQoUUBKICIJxuw01zFQCVDEFM|WZUrt6DyrW7Eqzei4WPvQ5dCDCMmvyCiZEgT7g9Mc14kuZ7AAhAUhlch9BiCHUdR8cnG2i|MpLq7fFZ7phQiIYDdZBlG1wZbsyaMQ9Wp5ttRM0AJH0BNFXNKRxfZCuZNNNs3|50wOn0QBcy|Ho7occC0CXNfAZ0XYckSf60BWCjuixbcf|L52|qAuRO24SkYPDGnqYd8J7YAeAs6RtqC2KGMLBk|iAw5lR9WJF8ZsAHCSDh8ycC33RFU679f1D1dMPIW|9G59nu8MSSfE9rMKxVO21ySZbLiofnPW6AguLtAnCadFpxHb22pmhJNBx5SRgC15IsyXCOcK8F8PXi|g2o6tN9X|v2wAe|wp2ba5v9h851bbuh9Md|b5QXL07P|AJJkAYxEeP4CITSc7|OVjYunRD5s6fGUTrg9XFz6gAuuUWNAoff7WrAD4pVwHb2y6ra3dU1fNTa|DqwBJgAINOO7Eubb98F5qg87qhcSVqwqyc7MR8AfWPL|81grB7ZIhyTaHral6y6|p6el0dXOXmJSTlJBqa2jY2NihoZ6XmJV2d3XX19egoZ6dnprOzs3X19aIiYeKiojQ0NDr6|hop|iVBORw0KGgoAAAANSUhEUgAAAFoAAACgCAMAAAC7f4tPAAABj1BMVEX|vq6uqen51sbWqnp6WRko|cnZl0dHKMjIuur6yLjIro6Oh2dnTIyMh1dnRtbmupqajCwsLu7u6enpuWl5OGh4OgoZ2EhYJ0dXKHiIWHiIR6eniSk49ub2yam5hpameJioiNjoqlpqOkpaK9vr25uritrq18fXtvb22Ki4d1dnOOjou4uLZzc3Fra2mrq6irrKnPz8|PW1tbJycnLy8u0tLTi4uLSvbq5ubnDw8OwsLC3t7fb29vw8PDR0dHv7|t7e2lpaOQkY6mp6W7vLvOzs6CgoFubm1vb26bm5mYmJaZmpfFxcWVlpO6urrc3NzZ2dnT09PV1dXa2trg4ODz8|oD9nHCW2twSEjAAAAAElFTkSuQmCC|kBRgubn5L8h65aJAk3oUGlCGAJmS1Y9DEmRIJmHUuoN2KOqhtqGo7haggZCAmrPdyeCyeYrPvd5YbPKHABUVQe3yT7sAO5M98FQIDD9Wi3SHBYMVsj4699ketyNQAB|QvXI3vkZAAatm5ZDKUrrIIafgOaBhHpveogcrD6UKIdGgvEE1thANFQLwxPJz|bhhnAgBACQrtovtM8EcJwQIsFYQiZxmEwJ7R4BDl5eXC5biqNRCKlgEAkFELwSv9UAMMNANaqIR72AQOOX5stgwEU8yHU1RDt4wwSMc|rHOO9HEwhAEwTXfEBA|YRNgdElAEYUGMADTY2EmUjBsf7oPd3m|MASuRbHYah01DXaUxNPNwoif0iB96iAENwXsIE6S2BToniV4ZOBHDWCHiUZoaiHPlNlgZVDXbiocZwCVB530Mn3oA||0IoZlzpNSAxga0SB|FxcXCwsLOzs66urrGxsa9vb2Sk5CPkIyTlJCdnpvV1dXHx8eWl5T5|fmkpaPQ0NCam5fX19fR0dHa2trZ2dnd3d3e3t6foJzc3Nzr6|g0xyRSETASQ8Y|f53svzfp|Y7t|JLE0PE1I2AGTAx6NgKEgSAQ4HOYEREEQfdHhxBlnAwkAIl8bx7wsiH1uh2IB2KZhMyGF|n5GWAWmAP8|PAP|IEGV8FfAQkAOIwD1gCogB3EAqPTPR0eGc6euz6wRBFJTXI5J7585xq8s1zc|rDGKMxxsSoGK1Lq7GkabW2W7CpKZVLbVpBoVwKwi7Qcr8zM8zlnNnnPfse9nQW3ZM8c|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACF9JREFUeNqEV2tMXGUannPmxjADTGGGYZlpyx2hpZbey1ba9LLAguhWE29N6yU2aaLxhz|icon_disable_unit_active|uvLugK91|FF0000|icon_alliance_bonus_inf|icon_alliance_bonus_tnk|OjN1Z|icon_alliance_bonus_air|k92eYoLQSCSHKOBn|83Bz886Omhp36ccfN2FMHzXdPX8|ksvvljac|7GeBOQCcRp7CoeoPg7gS3A|hwbtunn|6cjYxrK5R|YMiY8|rpO5z5Ot|jjC2n79t3Lf|N9d|43KCCZhxtnOAdG|fnduN4J|p7O2Nutec7MruLAgyJIksfuVOYhGo96WkhJYXVw8vuWVVzod|MaEyJNhkIhEEzCwW2nmO2B894Xnntu6NDMj5z7xhLfw6NHBa8ePrx29fdsakWVZa1RzVqHc15tMhsyysrG977zTBK|0M5EBDk1QS4IIkHvXAsXDTU3lFw4d2uGfnlYST6BDr9fL4XB4BaMrGuezAhg3Hvjgg|NXJOYkZWMEy|bM0tKbGN9iIhNMQvmAqMkFoePUKQ|setBackgroundColor|LrJ|AAnVQ8CJ5uUj|jfgIYxQQo4ARChh6B4zoAB8h9n6VQ1X0c8YB8Ah0cH|4rsVG1mTRE4RkJtzfZlETgD2tqqrAkgQHbMAUDoHXAdgQ7ogA7gEWr|C0bFnsiuvEQBMQsGS9YtAFO4pfE94JtIB3RAB3TwWA7GKGDKjsSe2AC81|0l3wO|e8eWOE6rlYHWSDZJkpTIIks7veQMrNLMF4vJ5MW4L|iXRAB3RwRw52r2tshaJ|n5XbpFT81NstrdHt0h9AZy3tjQmv8bk|zBseZhhRE5fGARBSOpaoocHKBgcMAnOsIPDsAiX9rE|ehoZ7y8vKdnpqlGxu2tLHv7|vw8PDT09P29vbq6ur19fWmGxvp6ent7e339|bnJj4|PicnZrs7Oydnpz6|7US8QX1IBmhGcmvR|voBl3AiAAAAAXRSTlMAQObYZgAAAS9JREFUeNrtmttuwjAQRDe0JNxDuPcCayehSSCUFtr|PMu91|HzjyBEaewUgURYMBcKTX6fSQ8wfrkQWdCN|oMoAKgGuuY36lVr|tuJlqxCves8uOMx31xlCR94|b4MWOrqzgKbwxRx2c4a15|menues|victory_screen|61V6WvdVXMAeRK2JEGhAdr7Z8xN|bgr_victscr_header|icon_res_repair_air|icon_res_repair_tnk|M1RfnSlqb5|EzwAAAABJRU5ErkJggg|mdvv1X9VefVy121dXLwvb|LUQSE1C1tP|icon_res_repair_inf|icn_repair_off_points|3lgfMM0ptH1cS16Vkbraj7U07|dU7YmylVUvW2q3v|CVxyeUXgLJcghTed1VtuWZiPWGxJzN4VQkdpfL0azUkHXa0NfU0J4xMwG1sAzg7u|UNjBUm1ONDQ|cj3YckJV8T2srq7LfgFRXpedP3liQNyqamn56ZmX5fGeGldzXz8qOyTpr2p0Bjgb|5vAKE8KIbVXW7JjQvEkd3ggAMDPZjp2ZcJ2SweFNHi|RILf8aoRWHcGeIR2H2S0NOSUHIbDhOSnXzkc8YyMB4wEjF01L|StoRKLpbe1x15BcCBRcr1SjqSKeiV7ruBSuFgoXHSKxfyt64Om9cfFManpOnuuo0mlyo9ISVKrvDwSBcL5fFE9Fu|hZlTbILVCykWFfC10OAkMV4hRoZuX39l|ph3fueOWaGv|k16yIgIe|zIE3UKUIC|BrRMXToWtJv5z5NLPGU50eTIEOJoscL87Mta87ZeYY|M7G2nuKhxkTQPm4CxqFri|QQNaApoN0G4VmmbM3jlXmYIsJ4k1Zo3MxNhu4eafMtY|20z2uMbscf32iYKD68E8hhZB04B2Izxa1jUWqTwFiSTB771wvA3Sc|dzcq8pq14lLMuie6vkHppIYV66HomAK0CRoEzza4IX3hUggLj2MQWRycUNp262u|qMjv4d0p3RhVcUQFHdCQRfAXzq4AINaEGToB2V7KwTRTcMz2AKcuH33pLpidHd|JRzo2IUDrRh4|xmcuzuMT0ULgU8qj7hCKyAiw|FHXyJZtOT0lXOBYONB1N2nPeHIGRDyOrY8L2oKMHZi9|BWDohx37w|gdhgaCxIwhKIAAf0glbtxDUKBYEyJ3bu8Kpw5MAKIkco75w01nQtQxGNql|7ohp6XwRwnMztSsHIjRciPJEH3nK4LhH|U6|t2hfbuH0bTJ0A8D8AyhbSlkoYqeQ1XWROWkq71Ngc|vPkyFmtLbuYk0ARo|bZZDMXk9|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFMElEQVR4XsWXXWwUZRfHz5nZ7213u91u2W26RRFfaoCgiSDbxpiYKIitcueFGKM3mhhD64WJ0Qgx75WxkBATjRdcCBdyIYlEJNF4gdrlI6AUiNBCtFK3Le2W3S3dnZl9nnnOe7ZbQJp2obDre|xHgKyyjnz8jG4X8oxJLbvhyk1Uhl8xI00Tw1d||TkB4HabSiU1AXLv58blvvrhbbzgkJH8BYErFY1AWj7utUnpyu48h8JpNd|Lx09u0rzo5|0rZr|mQbNYn9dLkAAAAASUVORK5CYII|r9df|dxc||PSAbyuf4XGhEoAXNYhTawRTgtTJAZTyG1pqaTu6lcFOXKOUhLqn2Q4qCo1YFXGhAK5yaSm6Atl71qgaoJOLkSdOem31OJ|wCaz1Yq|fxXH7TePX|2cdnjh54|T0|SuH1rD7xMI4eW7QmL16ZP|fPPTWl6cH9m|EpYPD2cSge|ef3jv|2zgwPvDv52|P7OiezsyP|wAuMMYG8SSVw440avVAQQzABLBRiAiWEQIyQki3U7ee2u9vdnZ2dOf5myu72g13QNjGe7cw0z|toW2ZrGIpXyIpkFNGtQLJUbfGBODgjHhwuitt8a|M8XjP6wCu8rikW|Da3buO|hrGnlhg8Tp8|L8ryHODUW4eNliZsIh2LkisaZhT87Pfl|y9h7X|YewEYhBikMndNyrnzI|t36eDGhNQi0JK1piBrda9pbmdqcuxtQ0lTi3abXEiyoJVwQRxcKgWMj9UauzVwJTQ6oRWqNQX5oO7dxHETWz1K0k6zZ19cpC5D16CV5nAP5o9rtRaw4Jg9|6rvtKaMOuFpG5LUjqJOpXgAGWQ|3mIM9YNiItBI4HeA2eIkTBK3aAep1T2zHs9n0HrOhJaLHdkY5O8LLKBwcVJXzMSq20wBHA7cNicx6U5C1ui8lToSEVE|y1oRKHVAE0N2vUCVBNKQ7RPJ0ff0xQ1kd6g2C3AbLk|geB|QIQUNBqwuZjAdNQS429xPy6HFL2M6OsKJuc9uHm3nqApNUtCI63R8|yiEWFbA|KbzRnxQS9M7nC3v1SKsunLQg0mgBcB|l7wOjA6uA0gWuVtf52AIq|kUsvZEbHXwNmO2cPGWC80ja8lFAqsmU6fHEbjuf3WNE2he6YxcnCgDMXnDVI|H4qXjm2sAX86ODeUalbnxz7fTAvsNnjx3oSd34|0CmFh6ItGsmi1akwBeAp1k8nFDqe1mV39chUIh4eYEPDkA4Bz4Yw17GjCmoatGkc6Z4K4|AJEnC9lUXzab2auMMAeOCwcLwplIcHVNACOymUwHOI3g|BMWiLteHjr|uMA1ZvP9bpx7rPat8aM5u4oz9|wZc|pA0VM65vEtUFSCV7PuyJdH7CqT7gVAj1H0IDh8oLSBI81Bh6MAwgj0oleNiQzR|3es|WMyGHHtnz7Lr|GczjQOUaAuyioSPxjSC6BmAiEixjMEEz4UiJxfs2PoJL9gyFeVDJGgID4gd443R8oRByyTRBwiDg23YAxVrvSru1pT895j4|u8Z28lpFFG|WwLADvJIE5iJX4SJZo050sDV8maJmMJgI14SA7JIyOTQVrIZRIkgwLIaTK3Jw2L4c6ZjcI5NSip3IW7V9Qhb1oFgBHEMuku550MKyeR0tWAhWSRIuSULUVe|UtO09eP15fUAogwRk5G67GQUssbNwuh7njDNI5e7zx7dd|VJI8oB5DYaDPLO6cZHDKlU|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFmklEQVR4Xu2VfWxT5QLGn3P6tbasU9nGAO|8AHKjlP9O9djoAAAAASUVORK5CYII|NQBUumiBSwJcsrcpqku7LBpugEKFXA1hesapjSTi5BaAFTqkjzAJvSAoKdl8ox0xBtHQegPDdWsZq2vDO2kTMwdfyGLVe2VMS2vKiLbM5SOMO2|LFknj|jFCJkeRzneRxb92JIOtmQhO7SkCg2JAU2JJINyYS3rj4NhAYbEvN|Cq49LxtKOFY3kXVXkw6eDEJgzmmzOzfNi8miheTLOieLC8maV5MrpMhbF5MVK1Ws6ea4o|5lbQUr2bXA8HwGOquHK9m0yCk5E|n0xh9TtRmO|KarqaZc580ex2O1ygkAgcJi|rDujfa4W09|MzOH|g1tKVuJqXTqyAd6TewEw3vyN|UAJze|Fq9bX|uCVilB|IONfhWVOWB0ylN7fALSnvgUXDn|MnJzFAx77a2byuZufEuZu|0c|qpER5MWYvS9b|c7TigjMrOiN3tuakD7|R0Xt71XE3n3o4PyZ43nglW7j7nOXAhVj89zu9cu|026SVhaNcrvKyopc3159bBCCXZKQjQA4Zj9ypy0DF|Bs0|MH7KtH|BEOkIUEDugjMnH9QXn9ZJgYgGJS5aPW5rdWtXsKR4jPvMsrnTlfKZ80eCmvHQgmyGeBTA7RJSlPHLtgPgRHDmjoMWE||uvtw53|EAZY6jLCYOmqJQlrxMLJCjZGUkHKah1HJR1pLGccbuATNDLCEcXxOWOOnizyOJY|VspAOkn3KMVopZKWsExgKc6zFF9VgDmW4hwIQ7AU052G0ROxRE|xs2di7A6bKAEsKJculCaxGJgIrOzxdnEmTnb04AJr7uM|BcLIYqxL3KEEn||XcMhBXjG1xw|fcMTV1HgKw5tnFgfo7|u0paPnLZj8GQArAVTOCKAG4F||1DdGdnqDDcdxWTct1gPvxxK9|OfyVJYQtzckAamSu|A1zWJoWfUXfZA3x7ugbfnAVQOshlEEAbXIDjrwEr1TwnLIuva4GV|N0TCA|ypJpFThwt5LipxjpLlOBiPRb0HZw9j64tj990By975oYvstgHLMgQAh6giIQKHHSRXGDfPy18NFW8t6vHXfef11R5n6D2zbOno|EED9WRSuSXfbs6o6GejnDHT0bIN0EkBzABABXwzimQUm|JfisJdHzJqSP3Q4AMA9GETqDCIHVIKfO5qzxX9OmVcgFg|H9iPCb7vQOYhtnZMklSO76PJbY||yCCLw7F0aNpkU9bRjZ1NRSK7BO2|sY8gMVBVJHQ|wW7UCZChHsOUgCaCwCdAKBg6vxXps8pX|OGIgdw2ZaFAQa|S0RuFyZ|oIER9a2OJd1ZwE6oaNKHkJhzwtb86WukzXN|XYTb3lwr39G0ErgO2YlhDIcjFwJrX5|oap|htMmcGFBG5q9MoHHZkPc|M2VkKqghAJFiJgIZpmIcqwEE2wEOVYiOxKUrw|2zKVhGgdj|Zog5QK4Kt3ICkISAt1BM0R1F|i5VgZaR1jV|AmDpENwKJJq9hYu1Oc4FoE65iWGtMRx5rz4SO4zRzQsDHNrV1e30eLodqBEBSNRKnKjKPyBAPogAxIeonCKkOQbCf|DdSHztKiVFOyJeI6ViCFB|bXPFSwTNO9sn3dx|2bPrq0aA8c3rN1ldvrAx21Ej6V4G|YLa|eYkZae4eAdGNGtHshbcSgTRHgEQ3y2gaBj78yLqRh57|4ePzAlStr2mtq1ozcumUC6RCXLxEJG2JiDJWnT|BuRoYG8su2|Kilitler|Oikea|Bloquear|Vergrendelingen|Varmistimet|u00e9rouiller|Direita|Sa|u00e9|u00f4t|Sijainti|Sol|Vasen|Esquerda|Angriff||Atacar||u00fcncellenen|son|istatistiklere|u00f6re||u0131lacakt|yap|Simulasyon|Korjaus|Attaquer|Aanvallen|u00e4ys||Reparar|u00e9parer|Repareren|Zijde|Lado|Supportwaffe|Stufe|u00edvel|Suporte|Ondersteuningsniveau|Supporto|seviyesi|Takviye|u00e9g|veres|u00e9faite|qLFuymVaq5YzLTXdpbiJKHGFtZ3z|Tappio|3lZ56mJgydbCMM77JCHRVfMYOFutduMDvvfaOEXSs7oEhFBxfhuoDm9ndtJNE2fVJ8|u00e9p|u00fclet|XtqGA5sT90ViTKCBzlwnTkh20H0YvzTV68|Friss|aTqe8Fgu8Ktl0Gm2s1jloXQnd648lBpMIzlFMlVxs5WblCmx|V0OZZ7Kk03eJSe|Seite|Taraf|u0130statistikleri|Felfriss|Lvl|szintje|Tukitykist|u00f6n|Actualizar|taso|Die|basiert|u00e1mad|Aanvalsknop|u00e1s|gomb|Kqt6o6ZdOdeknOiGMupkWrNscPYsdBkyz7DWLFowdrhnAP|felold|attacco|pulsante|aJoyL1aGdfa97EPTVGwRA|tiedoilla|F9s4RbKydkECQuCpL5ib3fJYtqHPPTEwZ1VJ4mRb6D8NpiwxXauZeGrryNnPM9YhPDtOr2bNZ6Hm5tHjNCsTGQtHv21kWHK7uEdUOSpVH5NbKoPgsYjwTSHHVZjDLRiy5Z07jKIPMg|Kilidini|ataque|Angriffsbutton|Attaque|u00e4usnapin|cDbFn1EEpdvAtzZvlln51lO3RDIsu4QAp5n21TFM1ddCusHyKmH8PT2LUBd|TonZti0c88zq2wsK1cqmi7v03u2HBOsBmt00aa1h1prlvruCz2iOs7N4ynn9aIGIBU|Tyhjenn|nappi|Ende|Zum|korjausnapin|u00e9paration||Reparaturbutton|Kildini|repara|PUR6uiqpVHO74Zrs3A7EQgf|Repareerknop|rJ62qIWIaBKyUuuhCfjV00nlpxfCwtsLxwFeLCTbT8N5BRGaXRTp9iWGTrCuUZgOFuVCkPG0qN3IVLhZ0CRxqT11XSKRHw6WdisjmbZOlo9IIawqiXHiRH8sZUMxycs4WfBoftTCJ6xQ|u00e4ivityksen|u00e4n|recente|mais|Simulatie|zal|worden|gebaseerd|baseada|ser|zuletzt|den|aktualisierten|Stand|vai|simula|meest|recentelijke|actualis|Lj3|u00e9es|Simulaatio|viimeisimm|suoritetaan|u00e8res|derni|statistieken|ververste|sera|bas|des|fonction|Nederlaag|Sconfitta|Configura|Aufstellung|Opzet|Takaisin|u00fczenini|Ordu|u00fczen|simulaatio|simulazione|Avvia|Gevechtssimulatie|elind|Aloita|u00e9marrer|Zur|u00fcck|naar|terug|Gevechtsopzet|Vissza|u00e9hez|egys|Keer|configurazione|Einheitenaufstellung|zur|Voltar||configura|alla|Ritorna|simala|Come|siirtopainikkeet|u00e9placement|Uyar|Warnung|Attenzione|Aviso|Boutons|gombok|Mostra|deslocamento|pulsanti|spostamento|Eltol|Verschuifknoppen|Waarschuwing|Figyelem|Simuloi|Simuler|Simulasyonunu|u015flat|starten|Kampfsimulation|Szimul|Simuleer|Varoitus|Attention|Simule|Simulieren|Simula|Simular|Retourner|Des|Haut|fel|u00f6s|52tOizyBKDimz5I5|unten|u015fa|omhoog|alto|jobbra|destra|oikealle|yukar|cima|oben|baixo|LFznB8qaMOJR3abxBBC|Gyozelem|Sieg|Yenilgi|Niederlage|total|Derrota|Totaalinen|gyozelem|omlaag|basso|XI49559b9T7ly0d5ZliX8CDHlSz|Bas|Gesamtsieg|alas|direita|u011fa|ferramentas|Abrir|simulador|strumenti|Megnyitja|Gereedschap|Extras|Simulat|V8bpVoYfZevxFcrti1P9Kk5TRXOVywSuLfvUU9o9dZUZGMI9XINkI|Troupes|Mlr9hzLUdxn46nK0XYGWeNyoUJ9pSzOcyA4jY0yHUy83HPFvTyDqTbKvlQDfjZ97TJpRaScdr|Kilidi|Debloquer|Felold|u00e1tor|inform|esquerda|sola|sinistra|balra|q1NOGJQ|vasemmalle|5sKFt6jwIc6os5380xEx|u00f6kalut|u00e1t|u00f3s|Ouvrir|u00e9glages|simulaattorin|Simulateur|Vorspringen|Mene||TS12i0C|ioCrcpGLj|xVg||dXQE|VGYPt2HFjT0|LI|57n7Z95d3jFrnB23vbgNQoN|uztBZ2xul1ajXBXKMqnP0g1xYPVbanmOuRF3ks88YvNQYyVY4b6nWzOYCS1CSBK9OObPdeIr5hGwovxUe5dwXCYOFHu783PfjjrmNi35yN7jXBlwF7mnnskZmlqjEdjidLjq7CUZ0WzYeNXl1PVeOVt5YBl88G5oodMD594OmYjiVllnLgYaltSvyDLMFBlXZVUJYsbhulqIicWyr1XaNqnXA2jcfFqf4OvofcpAwgK3EJYIGHeL95TinEbkhCt1zY0xIAFZfNtJmytTNLD7O38UB9OSTV|hT1iJB1Hoen13ljX1KUZ8KHtmm73z1rVvfv91FmfXIlYO6idBNJFfz79yJL5Y3IDjEE03lkHBgPPDrIx3RV03G3ZnEUGwD|G9Vx9|kYKVjMSpsTjktsXWYa|2DXOm2lX0|7BlsUjEJNkkqfT0xf|qXOc|4oKPoAf9fdge2xI8eQmrdu1JvIkNIEVMOPFfYCCqRuYDaUZGfne8T9bK1vN9DpeX1w1LHmh8BoRvJGbuAYSHUqHwDUdy9lXRLCRL67SZkmxXnMImXd5YwKCX3uUjZpQA89RnY2mRsxq6v8mY47gh8Fi8CF12XWcNKFvPLuSWOx4leJ9w0OcjsfukBwPHpsMbE1nN2p23iOXsX3N5kA0Bl2mSr8sbw7h|zOo2|I6CJjULNMTu5FkpycDMToT5lx77IkA0PRZVVYpKere415Ms1c2X3K|LeSa6hJrEa1t6j8IgYAZ5X23geA|JqYmofYcX5zH|mFrnfa|InLvRwY8N2m7GWdaeKr4CKJupdqSbcpe84bAuZoKFRVQ0yIuRChYnVmvRXVipKMAcIZl8oAMq|ichw3BwhOqWlhEbHXKq8uIyD0isn|XYotzfQTWDC|fyqjHbw28jJaDlFTeoMhsNiq73s7PWHosYQRJMleK1lL8e19AodiO|32uaYzYaSEzkXFyOMq8lrv16PC3ju1Dmor79hMYSGZ2VplRc|Jk9X8pXeFtU5Zcram|0RuS4m1f78uc|JBiWQqsYurxy0XFxWbq3U7YKUn|MEeIH8tkPq21wDKpfirVzi9Ii|sQa2cbr003Oyu7tcTGJUDooybS|efqKaRrb1KytDyfCn|oLaqdVE|qYVW3puJRH9h329LDb7VJS|e7Jx5Nrii3vG|52vAUxRKWIsW|9xLtISjsQXCAWoQWR|ppEN9nT0a91yCLD3LFkn7p7eHl8N43xdZItDjpY3BjP4cWWBjHMTA3hCQAgLoRGGYOdtapsXEqZgumO749yha4bc6|4xzbyrXR|j6qc9uP53|kZw2saJLqRlNTUL6iLxxG7eR3SliEVj2AfHEVZZAbMv1ZdbCIjoJo1Z|paQilADQKGHuO1IB63tkovL75ulPpz1ugw6nEWb47HFv4lvyBVXrfjSx8MT1ga4yx2fzO1doIkoCofXfaRavXtHQ378|qqwMkTSkszuz|8EmMgpKTy5iJ6fJv7Q1DEkAQbJk95|YiE0K0AjCcr7|VbgxoBFRZK|kFx4kFAWrxp5FL32MtfjtbajdCt3FgD8SqiUhPlvz8WeJQmoSlZrba5KrycjPfT1X475v91ToGKppbLofAzNDBIExETS0SiZVd|nkZqvTJdzr0Ojt43vfPXM|8HrS4|KXmQC1c2rqbFIdHqz4ih5O2|RVxJLXUJGcEhqfNdf7vGXPg1ndbMbZDNKafdlybFpLbOtzuS1ZXEa4Joptf7chEbt0e8end97CyX3tj9MotFNVeXzKYuUoVDHHIZw8xed1lFfFRjzbhFvPdLeLvecj2VUUqz6ODrZUcbV|t27j1kF|Gm2NN5DU|RqBA0B5KMwFWWsZfWb5aIXvlEvYXuDajOm|64o|5K7AlCUcQ7sqSaEardxSkXYXlYIp1d6sFMUc0aEHduVFjoYQcO4UuT79b8RwazmU2fsvTSRX6kbSULbSpc2qZrTX07cvtMhqJM3RuDOmj8h7BeFP74G|KFmg5ADJ5qV0eupbHH53FKhsd2umqwMXh9FTSnZf4MMlcNeITLnL80VrMGF2mSI3t2IAqb|KLrg5G7OxNyaQNSr0omvTD7CgHYXZtVwCmHMk|V43P7y1b3fhnFp89Xe1KzXfvhMIWN4n0eTqxWeVnyOmBBF4voD8okVDNbLZ2543HZKo8Ol|omHYWtF4wn8v8rezs2LqQnroDyf4IWjgXQ20O|WqnZQQu4DaMUVsHfjlrQGjiQr6KaMd3hFOTLM7f0WONv5Gk14ULPRw8rhf|3vRpWb9yhbBM8aqypNazNjWiEPDeSLZZmWOH5I5gYpaqJohPhkcVBT0iGsgYi1ueOw9V2SLsbkZO0OkGeEGVgKouGzvSyZKDIT120cL631hDdP6jHTNbaXPYO9yVQ5zwrVGKbqkKnf0sUfMMYsP0jU81xEkw3PYRjKTjO|3wm|2aYVtsg5iqjRLRAbO7aOh5Tl14X30aKoR0HIiqZeytPp6iKVWvFUHkJpCmrH9XvN5XvlGEpZxm3q05E|SogAhbznUOKKgUFrEXN03Od9zxdVp4324iCQeoVkwnwyJxPjHJg9dyHsDsmt3TBGQFQjY0rlopdG0v7t|drmp8to0TnzeP0uvDZJ9HvTwrkKgNhRQs0R7zg8v757Z5AJqDaEhdr|G27y1lV5fHhY|7aL1fe8vr|vGa|lqnpn9793jO3DdxCoHv3y|Pq6en0n|lS9fFkODEFIZYb0y1TcsmcqAVVJ|W6m2rlj1Fd6m1Ua7|Radvw62S9Od|epC3Wnq|3wFlAIUGXWLx|Wpi6WT5BAFREt7Zx9VHu6jf6GWsLUkx0cPRwg5M|DQxJeoy6z8PscfrW|XRrSlATYxoNqm|mUxngA8R0jVAub5oFiN1pxAAqrNxOpx796flialz3OLteX38|GW79393z6N2jn38JQZC47H|j0ZKVfHEZ2P7tdqh30qJh5UkMD9cz8NjWdR7mltp84Q28kwOaMkRovLE7Dd1f6We0i|fvX|5LfHrw|rkjjSeUuiLbgcZo1P|Bzvvt8DringYXDGi3gU5GbBIuL9sp5xQx2dJVUN1foos3XsTBxQAvgfcNAFJ7e2KvKiKTo8SaNL04KLRRnzZ1gbBsRF5ZwA0mpVZsulFRHKk6XoTlc|10JdYcNzbJ|USY|delldxWNm4RAPwfVP45UwxvqclzmzO4eK2lkl20WxZo6FVYXiP4OHKL7OWZWPSWIrMqrS9JJM|gC699tkC|Lqv|CFuEYD0PDUv1X|lVZWTnj9cZLwtX0E9gp2r8XScNkjJ|oc0j5sTXmSZL9vulwy521n0etf|uv3rDP|oImCBU2JMQ1ioolJY0YfkUrbPNk|qmQPktaechfkOgAlweM8r|5U1TuPcxhzpEb601m9aaslXom5flK9a|8ZBGK8xLbBvhxIj7NH2mIBebRwWeQ5X96TYcs48cCq4DlhcbBhHH6BUuDCV4cVXUH31w|XqWeyzU6|Z6ebddolZO3UfT6Lp8|JJBLtOhZrTlJKpNVNbdqMdgIkWxUHWVuhpfR1g3X7rHil|zqGJllNQgkRFf|lqgTBMSylmCCWXCR89xfR|GTc1ez95|mmWxGtfkXMYqEz5zvMompkHF6dKN|eRJiG81ad|3hEntT0FuJiB2GmYjcHHFtIefRVq0jIr34|9pZ0P3LIgjzO9rJbrQ45JdMg54M|kmsmEfGbrERMVfMjwjzWFatpiHCkSwWqqI7pVx7iJmbdUV55CDkzdqwDIJycwTs6NOZVy5oI|aiWyqI|PNQWwZ|P4guJ95C|Q0yH7q7rMuFhAEqLpp|U8hdVNqEyGTXgZ9DhVWdRy95eZkSQBle09ya211OyLEH72HimPxXTvrB7yj1okp1hTB|MYaqf3bJvsEI1lNM4n25NnX|WNKfs6IAQQ5qSTcpNn9XXYAT0BVvBLykJm2kE|gyw|bisvR62L|zdnSwKDejPZ2uNXI55oSdEzG88d3W4fGo3kOFJCYkrOvviwFQ0SUJUYqett6Kep2DdZMVdF6|Pi4l0gDFCZ|xri7s78htK0KFuOyNnnpKU6t7pTd|VvUvZLIxiaLLq|45kCXofhQL1fiUP|TADp1PZS8bWsSl98tbVh8phw2|qbWU7V3wN6dVx3EpR29B3au73eBuw4WG5Rd|viaMVIbaUVPW8F3wlVJBDWvAK7OT|7p8P2poQP7bxHRSSuQJNKjwe2S|eDY3zOq|Ohita|Anh5zy9clQ549IRvq7e92Ry80JElNkjkdUob3QBNWmK5kHQDEyxVTHt3m|u00e4lkeinen|voittoruutu|u00e4pin|ikkunan|hIviojl7JqlQB6ZmxtDo7HJSCx|jrVTYaDegKHujL8yFd2CseLwveeUey8RHzhqCT4fo5OYJe3EBnABhrLwCAmSJWVsLD2ownfXUbmzGoFjO33xiRYnu3n48oBTd0j21G0UrKJFWOkxFt4|pFV7Gtc|rR7x9fk0|Tuplaklikkaus|aktivoi|u00f6t|deaktivoi|u00e4kyvyys|aGxJSvqSKPG8Een8xl|Kumoa|valmisteluikkunassa|Tee|uudelleen|Pj5N3g3NfQzbZ|KNwoCVi7uBSWDz2xq2MQnJ|zsxHqIONz1M2e0ALxLSQANhIANFWVGcqmAmh7rb7M3I|eaKW9tZFY|muodostamisikkunassa|u00f6iden|XJyB8GblJKqDlqSd0gX77N7DidKEsYRopOB8qSmRxI9DsVtZPeiGgcnCDgYvKK9MQ9WlgJtS88nZlK7|GmqjsYo8PcParRDDBC5PWKc1NyYR7J2X||FabcM|37btBaohTwCyT|zum|Klick|10DOYE9ocJuB4rv1dlPN6zcrBi6Q1exbaTvofRZXFwov3Y8Xr2tXRYKm|ya0Day|ktLmW5fZNao87ALZCgcoRlb9vDqC39I3tB71P9qVUvKOUjL67H11TFSKqPZx9Xj|GxMk7uE9ZWvIz2WUc|1HBWGSWmFV8WgGag7BDlneF7NbUotwkpy7XQBn2l5|vbcAvqfbUCFokis8dHinDPH57RAhDszhTFyNCUDQe6teANTMoNL2VpZI|2dKJpQK7yf4A1vHF6YuJWl6qgInQaxsrDCPn5|UlvbMxpI3r2de5I0x161dEKJLlT0fNks6vAdzEd|oletusasetelma|loppuun|vaakasuunnassa|Vertikal|6wp|pystysuunnassa|gkyg|Wpbu9fHDFFgNWGIncsIfgmh||alue|kohteet|kartalle|q0GlM6ZvJ37pt9|Doppel|PZ4f8rGWJGi6eH93zRnJ99HWeVacvf5buEYo6T9peOMImQQyk7Gxf8azKo4ZopjrgogcFGyWV0Rf5tx0hZQunCWMG3WKXmcdnjhA|tallennetut|Merkitse|Gespeicherte|Versio|Ziele|der|Markieren|Karte|Xf5|15OJufjLluqMbPuT258gGSm2BE9nZ1MABHt4AAAAAAAAxjQAAAMAAAAknZ7hEPTt6|JGr3PmCkFqDrp7ffkf2HGdayKMwlEr|I383XVb57PPCkxN1DpUny|Yev55CV8LMxPHi||kYkyp|1H1kpqATU0CP8JX|nwgA8U6khcV|DTPYDEvr305bPWbUV7o|SL85c1ccMj|3flvTbpTYz1bUY|Kj|xfVhmu|obtVcVHEVcYHL|efd|ma0CoB1WZO2||401CB91czUf558vh|g3voo|MX9ubTEwxdlsg9fKlDztQQ0TVgiVubcfrsuJAwgoOpPd17FeoJM74pc4GDg0GlrmTJ|DTxTwGLSf511t4TwgKrzWEll8KrmMOKw|LRhHl3FezzYkUVhCmWwDMAJBZcD5VT|MgSLT5ltPgpVpYDyxR03u2rCZHkjGnAIkR8hug61Pn3Nvwgq9MQHVbrr64S|TcPPFHA5dD626KzJg2otgyV1Yrx|kbsnhnGJcuuhtZ2dVUjy5P65ubbHDyyFSrK63|07IcnQcUbvlVCi|TDv9eD3d|fSMPLvGbM8S0AzmV9|5ulxSuT8iS6|NUISFaAGzTxtjPp|18c|3L6Vqw|Xvtv|yWlx|8fF3sSUQGqHUelL6S5pMu|320eOuePQTuTRXP2c8|appendChild|Impact|Wrench|T2dnUwACAAAAAAAAAADGNAAAAAAAAGaVV6ABHgF2b3JiaXMAAAAAAQB9AAAAAAAAAPoAAAAAAAC4AU9nZ1MAAAAAAAAAAAAAxjQAAAEAAACQEk9NDlL|Sound|head|getElementsByTagName|cC1bpWbU65i3gq|2F9z5kkEh9eVa920MMiEpIuLSNKDcpyqdRYfdfPygUe6lqM69f4m86Dzy5DJXOoFyFe9|QorXyaOd01WLVZezfZaVftKudblALSzZB1MI0aQl|0X|javascript|rmdVxtIY66mIlWFqfPKSubPt0|AAAOESAiIjmMDI0Njg6PD5AQgIAAAAAAAAAAICAgAAAAAAAQAAAAICAT2dnUwAAQDoAAAAAAADGNAAAAgAAAI6VwgUsNzcxNCw0NDEzMigqJzQyMyspKyo3Nv7i8Ozg497p5SgoKCcoJigxMjY29|60KESpQcu8|Lbk6fUo3qrUQMWxHF16jAOQwKTRzU6|dhxbHae|ecxYkQnMCat5MrBrWeATD8mJePwPlxvSeApkEnm65rK2XZaoqMgdXsRIEP1kCDCD81xU5p509PQcAqrU0mLGTtWohLlCJLL|x8rRJ1kH5UfXMhrAv2Hk9Iop1Z28T7EKoBDhx9sgHdrdxAFTD17C|vVPclwMMRVxEs|HO4Xvo2We7V5bRz2BOxbZKCKbBS|wBcRSUQwoIYHcI5UR51H0J7Va5ydH3npel4|flxCRZoWX|Q8i2Eaq8cHq1T7|vnCTK1FbMKAar2Hnlj|eHYpP|TjN|tGla6gOHVWV3scT|wUxkUjh525ZEtH8D4|u00e7ar|get_HitpointsPercent|mKeeqihJei|ShowToolTip|5XrxU3mc8qRSEaOFHy6vVm191onsFIt|das1ctWBxZaShuDcrW68Uk9HixH2wZ2fwZGbf8lgSUFXldVGUn24TuxYVRb5P|HTY3p|RPOeFwqgQ5|lastIndexOf|substring|Veh|dMtTHEg1|GetResourceCostForFullRepair|anzeigen|r1laeb3Y7zzlsmzkvdxXdhj5NOxVZeI42QLUe9I5GCGsS7iUj3cDjCLB8SWJglKD7QyLAqFLvuWkwVGxbnn6YUhBZKLR|get_ZoomFactor|get_MinXPosition|clearTimeout|L6je8bvPanHYRsWPjXyHtUvFDhWKxR90myKcrv0MBx46FE|788OURV9VZyWcbKcZePgwcou5DXR67WY0jRuy14nlnZtd|RVb2jnFK2uYU8B7K51yS5WrYVhG6VnTdWefQ2DNRSKwf2N264SI0esB|wknje65S2TG28RmsGQTjK3gidzpLNNMadS9yGQpnF1Vg4pt0Ab0L7||9jQ2pP5|uYZRlDIuQBs4HHrjGZ18PAhqclxWq6qSkkqQcb4q3z|3h9rqekn0vq1GwvRRU3kkYCSE|get_Mode|zySj9yXGKl|rS4eB9cTzwDet8lSxo3YguqESuU5jDFC6nbcFsY81ycUcwajbMmRYLFYPZv90o8rX2v2yjCJ|iUzIqrpggWmhWHiP7NXKXILKLi0h9eHLJqalHFC9nXs5XWEQ|blQFlgInKyFWns6TZOnvqMQUoRy6eiAuhA|nullName|AutWf6V7Zq3dHU|9YVdrVqQk9PT7r1B8fJd220e0fU2RaMaYv23meioe19hrf1yXOqkWqklgdZJAtBNScfN47Jk2mMoH|getDateFromMillis|20q6i03VLX5HDYN9GezQyYzqC3Ttyp111hrf|h03VPrhB|0drFJG2IpIjD|vNL|9f5BNrM0o3Xcrz44fsfJYcmDGsBAwKNz5DWRNiNjyxmdog0bQAPKxuXTSpKYlci6iqe92TgiNpjFj1pHGKMleIgodLrjIhKfx1bvn9WxcxVMx8EbLT|dD5EfGZo|run|HmJR04Nab7K6Yqje4WGrjDZ|PVx8vzqyL30LA7Oarz3F3zj9S3oKsa1DkWtVIucczPGaT3fBbSd0KA6pHpJbj|392583|gvaeTAAAGVUlEQVQYGQXBeZCWdQEA4Of3e9|NvvaeFv||iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QERCx8kSr25tQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAABmJLR0QA|3O3aXD2EBAcFWQcyLQ3Qcwxs88koJxXQ0y7QcTRunsfJIM9HRmTxIKrzKP|IqybPySscZdQylVZTEVRLDDeQS2F2W3e97fz1PSCmBpYuuSXMXfhcAAAAAAAAAAAA8t|F09c8xsZmTxRlVviiHa5ch|PGjvPLoYmlgk5H1YGSFehFUY1CJCOSRPBADWRZlyAIlWmi26GuyY6i0dTDZ1Fcq62PM|9xLQrjrlmvS|yPrrz6hgAhpWTJomvSmAmjvfDwYkM7NmorgmpOFsgCMRIBRQwgIIGglLRKBlsMNpMdQ0llxFgnnXuFotYw|1SOMd7iacX|4lLYAqkRVFBZ4XygGAj1wBtiB4on7jLJKxEbuL1s6TXX0G1qZsRVlUegZ7pDub0Y|u00dcss|u015fman|Feindliche|Inimiga|Nemica|Statistiques||Statisztika|hu_HU||nl_NL|fr_FR|fi_FI|u0130statistik|Vijandelijke|Ellens|Defesas|Verteidigung|Verdediging|u00e9delem|u00e9fenses|u00dcniteleri|tukikohta|u00e9ges|XQRAB8Ps|Ennemie|Vihollisen|it_IT|pt_PT|ymDBjht5tyI9WmNqOLM6rtA6d|NX56zHIEipiYeuYIl|jTXtCjuQjFzeMrIeaMsFQeElggXBY2|SendCommand|Pc5RvzXI29OLsTxdhGIH3LMa3l3MskGAWu3J3FpuInC45fjugdjy3WMLcbI586zuHGlK6ohW7xVUZ0fqjBX7dYTiN7223WNKPT1oaU1k|UV|boV5mT8CI2P0IVPGLtmU|PNL1IiV|7Hd2b6dHwuqMS|mode|entityId|cityid|MbqYz8Sody91GgCq721JqpSC3BjaKUuT09TMydQ||CNC_Audio|wmaRznMt7P1vcfCjfjpNqw95TLi7b2UANquIGEdsyWdmOy9uns5BEY9dTllbvkPgb95JkiPDL3eD2yNzk6ps7NabwfK|ZhhWJG8S4NXpfJy6m|cloneNode|tr_TR|de_DE|loaded|qEZNxAeqoppgVcsROZMvVT3bBDx3G5GrscvyyjFOkio81sELLqqCxP06zS0nY9jSGMI3xFidiGlWwoOkHwY5CCEHgDc4nLJS9zrwPFWlDsl9yutgCdMZir2mi3agemvadZK5Cz432pDTgF6ADNLjg|postError|play|GM_log|mgN9h6N|avi|IsOwnBase|DL3QiyLAohgBxCpCiCLI9qBSqBeqAj0shornHer2caLktzZz7ujt|PseaK1|sound|Reload|1nlz9pDeDIPfndsgWqExqMrrGmx|13cJubX76QbDVbevhgkP|uBCknKYlADkUMijyq50GlktGWUYs0MnbL2W0v1tZM3HuUM84ZcNNlr|ML8s17Ribd2fp9aovYR1UAWiVEWW2IW5CEYRoQYqWRUMnS2cex05pxE15F6u0vHjX|Ip4DNm7bb|1pBIlMZAFURRDFGMpIYcsCypZ0F7NqAbqkVE1xlXZcwobGuZ1PeRTPPb4sVav|frm|vlQ8dq7FYjW4|eLObBAUAD|y1C8UTQHG9vbyK9vj0RDizko6qqYXWVRdXoOUfha2CeLgDAYroAsN|7ZqzMfwv75j9vXQY4xh7|usqts9ZPkasx595fnYc45o69vtvDq6hbhVQRz5Est4KyIg|yetE4y5eaX|wPu2oRLAxR0Ux76q6otUIfOkf4pZiVk2yhtJUuZ0pLCtMWl5dnWJb8CYg9AFTlHjkODEYAH4HEnPntnG7TQypIH4AY4zUI43BCXvOOcyZOaUoERQCACAq2|zrzUjrfvopAYX6hRbRVYvZ9fDyALrzEu2cfMP1WsbvlNtcyHzkY9M7tXlEYZTn5|removeListener|lp5unD|L4Z3R3n|wkAED1y6omS1iQXmdI|CRY6vM0555x7|lYn1dXVMK|pointer|EUCm3FC21Ib3g|ede9bF6gB4EvM73qAPfYV26pSIIYEIqTEYBkMr|3JVv6GM5Hg3D3bTemqZMb3vzLEiPCNqPaokY9qudEZDkpkRIEECQhEGKQA4iaqbSzybaB0pb|g6gJFj2mltZXCYZh|0tZWw|FnXmZEY4KQUrL49l|u1pRGsbWJ97WXv2XaiBmpESJsgRiJA9kIZC1eHQ5liubpR1DpQ19pc|9aZOXeqgbVf2NlMmgkIPT096cGrDjWlMzels9A1OjPulNnCtAOFkDHUy4oPWLeeBAjIAhAiR86ic38pRSkN2tndbdVT3Xo2DevZ2HTRHcvlMJSNsrl|LZlUyZJEbKBEQYKpOhZmn7LlKrIm3bYNG3XzSUuHD|2zjsxaftvj0Q6OnRA|1J7f70bynwVfb0DGB|7p7dfCVbVrBuJ71DrBti3TBvvGH6iaM98uTJJqIT|usLGO|kqZMbXv3TPYrmVrUiquTkAhFQAgAiARAAJYaa7BwqDWa7Oeasy4kNJy|8KISUElh656I097SFAAAAAAAAAAAA4O1Xn3PO964M8H8RODTRLDM3YgAAAABJRU5ErkJggg|49QAaxInHLTM209uYv|DiYE8qGYUkTwEECHGKM9w|PS|0H0BEEciDPCOPhABEqISglmeKSsa8mR695xNHhbsdEpY4atZTPgMcPyM64dJj||cursor|DSvLfvcdTeu0osvATBvevTb7qvxodnfmOSGm6cD6Md5Z|7806|transparent|T2dnUwACAAAAAAAAAACpAAAAAAAAAJKfvKcBHgF2b3JiaXMAAAAAAQB9AAAAAAAAAPoAAAAAAAC4AU9nZ1MAAAAAAAAAAAAAqQAAAAEAAABQ3ZLQDlL|7DR68NcMQhRLIsk8dMzAKIkATNEJg21R9uedOJB1e89NYCx88oANz21PlYhfX42FnXLjCzE4AWzj36aQNbOpgzQ8yDmAUhRhChFZJUYuVHHvz3lZa8c7Gu6ckP7|bytes|AXLVYc1|jLDyuIlVWqTcxIgai|YMLERfdEXjOgP2orggetPFaGWB|UiqBdRHNolTBvjriv2tRq|xLnrILs9u59udfU5|tgYhCsXuDUNvqsLlUIceedfm1srqiYwnNULfUBmfmzd|HNteXNQN10g5CECRIujhCijZTq8FsJbOGo3ATzr31oagedSdhwY75ikWtCCSywt|vEzTJ|GyILROWNyxhV8ZYz3u3vtQobHnj|36DIgzwGEKESKSK1SFukvYIc73WbfXKn39w6y0nffMGX72HCfprvdzhh1mM|oz1qLtmrym2lzS9O3a9BdwgujXbrfEGzkvapObBcQ1BEeNc96P7kcfd|7b3he18wutZw8AyLEEBQxquZBrcjUJd7pNue0CR5ZfJjvXL1c74ctDpzBpIK99mH9WHfdvgrAkr9tcfqlr1udOOP8Wfo|4RTF3Z56OZZlr641T9f28RhMxibMT5nj4zxNRu39oMW7lz0klXvtZzSda|bAYfmQmTSgnkm7d7QVolqRQAR8kiRU2RUczbc|u1UI5VINTCiw66yw|Cyan|4uiZzj9GiBd3hLUfrNJUQLjK2YeZejjx|ydm3p7mte9t7HyZ6juf|SB|Flg3IcLy5U5eMUlFrL|evidZbPgU0k|Zcwxs2CIZtLPZ9NmWTSB|4PpT1YugvcKIWrDH2Jr6lwMuvukd|QMbiV|GetObjectFromPosition|get_IsDestroyed|K5dy|Orange|O9Ke5|eECSlzOzIk0vzXJhr4zPoh|V4zZ0z7FrM3So1166RnlqoG9F0zFcIACABXtdRTRQAQgcAHjGsHna3Vg6zFf2e1ntWVV|Jl0ZF9S8RfqBhbq5ji2LqNcqEb|aUFWtTXYIefImaXiYP3XYmpV6ur4X1NcJLiW3EuKShAHUEr2b|04FC5WrQ|JjCQNFERNPJLftL0Pq77GNT1OTvXe0|Wo79njR|R2Og5Wph7YPISuWF8XX|qyJ9Vw|1YialWOMk|0k8|RIBFWzdTjEAwNS|8DRl8|OsZOj||get_Region|get_Server|get_MaxAttackDistance|WImoxAcwvjTO0w5jNet8lKxwcANkyPNCbUybGxwers7FNH5sxRpUxJ3oGWkL|t7NMmQByCHPgyJSL4L2epTVMjoCHRn|kkD|R3ryW2NpTce5KBTtyzoJ8yR0eu1qcmcl|Vc2bLNUdo906OtCVEcV7ve13cnIXsDuGj7A2z|get_X|get_Y|Puolustus|1HdNeUVc2qwD78PFJIei3LcbeX9VlZYjaCPrzqRaDqWdKlSM50Tw81aDnqxlovnFwN4pWZVe7rEsZ1iurmh87H8iFoqMPxeeVYsezSCqL9P8plYISsGvbkBzhjQZyPJSXl1FnlKgAep9qoxSDzDRZMRfDIfR9mE02bYfXptNkzDFamymfKBt1jjTpwTcNnR25Sb|u00e4hltes|Gew|u00f6ld|Kaydet|Speichern|sil|Nimi|u0130sim|yoejoOVS3D37YdPXi94Mhbo2rUMMe91GfB1C8|Naam|u00e9v|Nom|Opslaan|Ment|nykyinen|Mentsd|Bilgi|b794k0Uc0aU7aGy0p6eIozfKT611FnZ2P8Hl|Infos|check|opslaan|Y5Sc3CwyrNmCv6ecUOnzTGyiy2fxSOjhol2e2vBhBfZTCQM6un|OSa47ETpp9nK2q3u1xZ8Di|kaydet|speichern|Deze|u00f6rl|Sil|set_CurrentTargetBaseId|Binalar|Gevechtsduur|ideje|Dur|Batalha|Kampfdauer|Inconnu|ijIHtNCAANXu|Tuntematon|3NNGMn94ww9fVZ6VY3Hs|u00fcresi|Taistelun|kesto|u00f6lt|Laden|Gespeichertes|laden|u00f6ltsd|Asetelmat|Dispositions|Dizili|Forma|Formazione|Indelingen|Tietoa|u00f3runs|Strumenti|finestra|Dit|venster|Ezen|177|111|otomatik|pencereyi|Dieses|Fenster|caixa|aut|u00f3matikus|151|u0131rma|112|u015flar|Bewegungstasten|Kayd|fnkHvtfawKZ0E5eMCyUsjk|cette|Fen|u00eatre|automaattisesti|159|Asetukset|Bottino|u00f3lios|Opbrengst|Zs|u00e1km|bAemS4GOeEC1oF|Esp|Jq|u00f3rum|Keskustelupalsta||Ganimetler|Rohstoffausbeute|Butin|Sotasaalis|Opci|01j3Hnb5et|u00f3k|NuniY0JGORp8TdctVFdBeNmcSEe8bp6S|6XLpRW4zGeu6lQuNLS4ru5ASWPPlSnZ5dCA8Q0C1swFsCXWl46I9ANnTECqiX2HP01t1ejvNPMt76finmyfvMOO43TNbf68GErHcT19c|Opties|Opzioni|Se|u00e7enekler|Optionen|Op|Ismeretlen|Battaglia|Komuta|Puolustuslaitos|Merkezi|Kommandozentrale|kQcfnols0s|4HqXLpFk5QB1Zpp7ZBwd0yrP8PpgqzZsa9jxG4Cn5innikeYqqXH8XTKbwmRxQY91t7im7Yd7uhhTlBQLU8kPSlHPa4lZQLp|u00e9fense|Defensiefaciliteit|Stazione|u00e9delmi|2BFvhcj59PTzNFJD6p84bV4XhRkEOwO0HliC4lTU|Complexe|Commandocentrum|Parancsnoki|removeAll|u00e4yksi|Onbekend|flbMgQVierqZT2Fp3O8KkdX0M|Gesamt|u00e4ljell|Korjausaikaa|Centre|Commandement|Komentokeskus|ListItem|Defesa|Instala|gsLTU1Nfbo5ikzNTQzNjX017Qc0MHayNpfi94O6u2FMqBqfecfb|h8AAAAAAACpAAAAAgAAABjIRxMcMTMyNDYzODg1M|Gebouwen|u00c9p|u00fcletek|Strutture||u00edcios|void|Geb|AAAOESAiIjmMDI0Njg6PD5AQgIAAAAAAAAAAICAgAAAAAAAQAAAAICAT2dnUwAE|u00e4ude|Edif|u00e2timents|7z3LLmIA1w1fpZfVdl52kwPupvVY6jzALlj1m0HCkyjAXx9T1FHctGA6rWUDFnmX|Chantier|Bouwplaats|Rakennustukikohta|Tesisi|Verteidigungseinrichtung|WuVEV|Cantiere|Rakennelmat|u015eantiye|Bauhof|Estaleiro|Geral|u00fcm|u00e9giero|Totaal|Avions|Lentokoneet|Sonu|Velivoli|Avi|u00e1rmu|wipeUndoStateAfter|u00e9hicules|Ajoneuvot|Hava|Ergebnis|Resultado|Unbekannt|Bilinmiyor|X5sso7HsURpd7ap5qq8EE8uCm8E1OePzbgC0MMdpaCK|Desconhecido|Sconosciuto|Lopputulos|u00e9sultat|Esito|Uitkomst|saveUndoState|Eredm|WupfpGHgD89JinxI4gGr7dvuOHNc|Vliegtuigen|Jalkav|Yhteens|Fanteria|Infantaria|Piyadeler|u00c1ttekint|Motorlu|Gyalogs|u00e1g|Ve|Voertuigen|u00edculos|Veicoli'.split('|')));



// ==UserScript==
// @name Tiberium Alliances Transfer All Resources
// @description Integrates a transfer all feature into the transfer window.
// @namespace transfer_all
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.6.1
// @author KRS_L
// @updateURL https://userscripts.org/scripts/source/158164.meta.js
// @downloadURL https://userscripts.org/scripts/source/158164.user.js
// ==/UserScript==
(function () {
	var TransferAll_main = function () {
		var chkbxConfirm = null;
		var resTypeToggle = null;
		var transferQueue = null;
		var transferWindow = null;
		var retry = null;
		var resType = null;
		var resAmount = null;

		function createTransferAll() {
			try {
				console.log('TransferAll loaded');
				chkbxConfirm = new qx.ui.form.CheckBox("");
				transferWindow = webfrontend.gui.trade.TradeOverlay.getInstance().getLayoutChildren()[13].getLayoutChildren()[1].getLayout()._getLayoutChildren();
				resTypeToggle = transferWindow[1].getLayoutChildren()[2];
				var btnTransferAll=new webfrontend.ui.SoundButton("Transfer All").set({width:80,enabled:false});

				chkbxConfirm.addListener("changeValue", function () {
					btnTransferAll.setEnabled(chkbxConfirm.getValue());
					if (chkbxConfirm.getValue()) performAction('costCalculation');
				}, this);

				resTypeToggle.addListener("changeValue", function () {
					chkbxConfirm.setValue(false);
				}, this);

				btnTransferAll.addListener("click", function () {
					performAction('transfer');
				}, this);

				transferWindow[3].add(btnTransferAll,{right:2,top:100});
				transferWindow[3].add(chkbxConfirm,{right:68,top:104});
			} catch (e) {
				console.log("createTransferAll: ", e);
			}
		}

		function performAction(action) {
			try {
				var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
				var ownCity = cities.get_CurrentOwnCity();
				var allCities = cities.get_AllCities().d;
				var isTiberium = resTypeToggle.getValue();
				var costLabel = transferWindow[3].getLayoutChildren()[1].getLayoutChildren()[1].getLayoutChildren()[2];
				resType = ClientLib.Base.EResourceType.Crystal;
				var transferCost = 0;
				resAmount;
				if (isTiberium) resType = ClientLib.Base.EResourceType.Tiberium;
				var item = [];
				transferQueue = [];

				for (var sourceCity in allCities) {
					if (sourceCity == ownCity.get_Id()) continue;
					resAmount = Math.floor(allCities[sourceCity].GetResourceCount(resType));
					if (allCities[sourceCity].CanTrade() == ClientLib.Data.ETradeError.None && ownCity.CanTrade() == ClientLib.Data.ETradeError.None) {
						if (action == 'transfer') {
							item = [ownCity,allCities[sourceCity],resType,resAmount];
							transferQueue.push(item);
						}
						if (action == 'costCalculation') transferCost += allCities[sourceCity].CalculateTradeCostToCoord(ownCity.get_PosX(), ownCity.get_PosY(), resAmount);
					}
				}
				if (action == 'transfer') {
					chkbxConfirm.setValue(false);
					retry = false;
					transfer();
				}
				if (action == 'costCalculation') {
					costLabel.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompactAfterMillion(transferCost));
					if (transferCost > ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsCount()) costLabel.setTextColor("red");
				}
			} catch (e) {
				console.log("performAction: ", e);
			}
		}

		function transfer() {
			try {
				if (transferQueue.length > 0) {
					var targetCity = transferQueue[0][0];
					var sourceCity = transferQueue[0][1];
					resType = transferQueue[0][2];
					resAmount = transferQueue[0][3];
					ClientLib.Net.CommunicationManager.GetInstance().SendCommand ("SelfTrade",{targetCityId:targetCity.get_Id(),sourceCityId:sourceCity.get_Id(),resourceType:resType,amount:resAmount}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, transferResult), null, true);
				}
			} catch (e) {
				console.log("transfer: ", e);
			}
		}

		function transferResult(context, result) {
			try {
				if (result != 0 && retry == false) {
					retry = true;
					transfer();
				} else {
					transferQueue.splice(0,1);
					retry = false;
					transfer();
				}
			} catch (e) {
				console.log("transferResult: ", e);
			}
		}

		function TransferAll_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined') {
					if (ClientLib.Data.MainData.GetInstance().get_Player().get_Faction() !== null) {
						createTransferAll();
					} else {
						window.setTimeout(TransferAll_checkIfLoaded, 1000);
					}
				} else {
					window.setTimeout(TransferAll_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("TransferAll_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(TransferAll_checkIfLoaded, 1000);
		}
	};

	try {
		var TransferAll = document.createElement("script");
		TransferAll.innerHTML = "(" + TransferAll_main.toString() + ")();";
		TransferAll.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(TransferAll);
		}
	} catch (e) {
		console.log("TransferAll: init error: ", e);
	}
})();


/***********************************************************************************
Chat Helper Enhanced
***********************************************************************************/

(function () {
	var CNCTAChatHelper_main = function () {
		try {
			// Caret functions from: http://userscripts.org/scripts/show/151099
			function createChatHelper() {
				window.__ChatHelper_ch_debug = false;
				window.__ChatHelper_suppressBrowserAltKeys = true;
				window.__ChatHelper_version = "3.0.0";
				window.__ChatHelper_fullname = "C&C: Tiberium Alliances Chat Helper Enhanced";
				console.log(window.__ChatHelper_fullname + ' v' + window.__ChatHelper_version + ': loading.');
				
				function getCaretPos(obj) {
					obj.focus();
					
					if (obj.selectionStart)
						return obj.selectionStart; //Gecko
					else if (document.selection) //IE
					{
						var sel = document.selection.createRange();
						var clone = sel.duplicate();
						sel.collapse(true);
						clone.moveToElementText(obj);
						clone.setEndPoint('EndToEnd', sel);
						return clone.text.length;
					}
					
					return 0;
				}
				
				function moveCaret(inputObject, pos) {
					if (inputObject.selectionStart) {
						inputObject.setSelectionRange(pos, pos);
						inputObject.focus();
					}
				}
				
				function getCursorWordPos(inputField) {
					var pos = getCaretPos(inputField);
					var inText = inputField.value;
					var lc = inText.charAt(pos - 1);
					if (lc.match(/\w/) !== null) {
						var sPos = pos;
						var ePos = pos;
						var t = inputField.value;
						while (sPos >= 0 && t.charAt(sPos - 1).match(/\w/) !== null) {
							sPos--;
						}
						while (ePos <= t.length && t.charAt(ePos).match(/\w/) !== null) {
							ePos++;
						}
						//inputField.setSelectionRange(sPos,ePos);
						return [sPos, ePos];
					}
				}
				
				function tagWith(tag, inputField) {
					var eTag = tag.replace('[', '[/');
					var tagLen = tag.length;
					var eTagLen = eTag.length;
					if (inputField !== null) {
						var pos = getCaretPos(inputField);
						var inText = inputField.value;
						if (inputField.type === 'textarea')
							var st = inputField.scrollTop;
						if (inputField.selectionStart !== inputField.selectionEnd) {
							var a = inText.slice(0, inputField.selectionStart);
							var b = inText.slice(inputField.selectionStart, inputField.selectionEnd);
							var c = inText.slice(inputField.selectionEnd, inText.length);
							inputField.value = a + tag + b + eTag + c;
							moveCaret(inputField, pos + tagLen + eTagLen + b.length);
						} else if ((inText === "" || inText.charAt(pos - 1) === " ") && (inText.charAt(pos) !== '[')) {
							inputField.value = inText.substr(0, pos) + tag + eTag + inText.substr(pos, inText.length);
							moveCaret(inputField, pos + tagLen);
						} else if (inText.slice(pos - 1, pos).match(/\w/) !== null) {
							var arr = getCursorWordPos(inputField);
							var s = arr[0];
							var e = arr[1];
							inputField.value = inText.slice(0, s) + tag + inText.slice(s, e) + eTag + inText.slice(e, inText.length);
							moveCaret(inputField, e + tagLen + eTagLen);
						}
						if (inputField.type === 'textarea')
							inputField.scrollTop = st;
					}
				}
				
				function showHelp() {
					alert("Type /chelp in any text box to show this message.\n\nEnter key in chat:\tsearches your chat string for Urls and Coords and wraps them before submission.\n\nAlt + 1\t:\tsearches for Urls and Coords in a message or forum post and tags accordingly. Cursor is moved to the beginning.\nAlt + 2\t:\tManual URL insertion popup window\nAlt + 0\t:\tclears all tags\n\nWord wraps: tags a selected word -or- tags the word where the cursor is (if chat is empty or you hit <space> empty tags are inserted).\nAttempts to preserve cursor and scroll position.\n|\tAlt + P or Alt + 3\t:\tplayer tags\n|\tAlt + A or Alt + 4\t:\talliance tags\n|\tAlt + B\t\t\t:\tbold tags\n|\tAlt + I\t\t\t:\titalic tags\n|\tAlt + U\t\t\t:\tunderline tags\n|\tAlt + T\t\t\t:\tstrikethrough tags\n|\tAlt + X\t\t\t:\tPaste last coords hovered with mouse\n");
				}
				
				var isWhisp = false;
				var contacts = [];
				
				if (!localStorage.myContacts) {
					console.log("Chat Helper: No contacts saved");
					//localStorage.myContacts = [];
				} else {
					contacts = localStorage.myContacts.split(',');
					//console.log("Contacts: " + contacts);
				}
				
				function saveContact(fr) {
					//console.log("Number of contacts: "+contacts.length);
					contacts.push(fr);
					console.log(fr + " added to contacts list.");
					localStorage.myContacts = contacts.join(',');
				}
				
				function caseInsensitiveSort(a, b) {
					a = a.toLowerCase();
					b = b.toLowerCase();
					if (a > b)
						return 1;
					if (a < b)
						return -1;
					return 0;
				}
				
				function listContacts() {
					if (contacts.length > 0) {
						var a = contacts.sort(caseInsensitiveSort);
						//console.log(contacts);
						alert(contacts.length + " Contacts:\n\n" + a.join("\n") + "\n")
					} else {
						var p = prompt("Your contacts list is empty.\n\nWould you like to add a contact?\n", "");
						if (p) {
							saveContact(p);
						}
					}
				}
				
				function deleteContact(fr) {
					if (fr === "all") {
						localStorage.myContacts = "";
						contacts = new Array();
						console.log("All contacts deleted");
					} else {
						var ind = contacts.indexOf(fr);
						if (ind > -1) {
							contacts.splice(ind, 1);
							localStorage.myContacts = contacts.join(',');
						}
						console.log(fr + " deleted from contacts list.");
					}
				}
				var timer;
				function keyUpTimer(kEv){
					kEv = kEv || window.event;
					if (kEv.target.type === "text" && kEv.target.value != '') {
						var inputField = kEv.target;
						var inText = inputField.value;
						var len = inText.length;
						var sub;
						var kc = kEv.keyCode;
						if (len >= 10 && inText.match(/^(\/whisper)/) != null) {
							isWhisp = true;
						}
						if (isWhisp && len >= 10 && !kEv.altGraphKey && !kEv.ctrlKey && !kEv.altKey && kc > 47 && kc < 91) {
							//console.log(kEv.keyCode);
							sub = inText.substr(9);
							if (!sub.match(/\s/)) {
								//console.log("2:"+inText.substr(9));
								for (var i = 0; i < contacts.length; i++) {
									var slen = sub.length;
									if (contacts[i][slen - 1] === sub[slen - 1] && contacts[i].substr(0, slen) == sub) {
										inputField.value = "/whisper " + contacts[i] + " ";
										inputField.setSelectionRange(10 + slen - 1, 10 + contacts[i].length, "forward");
									}
								}
							} else {
								isWhisp = false;
							}
						} else {
							isWhisp = false;
						}
					}
				}
				
				document.onkeyup = function (kEv) {
					clearTimeout(timer);
					timer = setTimeout(function () {
						keyUpTimer(kEv);
					}, 100);
				}
				
				var _sub;
				function delayedConfirm(){
					if (confirm("Add " + _sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
						saveContact(_sub);
						//continue without return false to allow whisper message to go through
					}
				}
				
				document.onkeydown = function (kEv) {
					kEv = kEv || window.event;
					
					/* Tab key
					if (kEv.keyCode == 9){
						var input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
						kEv.preventDefault();
						kEv.stopPropagation();
					}
					*/
					if (!kEv.shiftKey && kEv.keyCode === 13 && (kEv.target.type === "text" || kEv.target.type === "textarea")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						var add = inText.match(/^(\/add)/);
						var del = inText.match(/^(\/del)/);
						var showContacts = inText.match(/^((\/contacts)|(\/list))/);
						var sub;
						var cf;
						//add contact dialog
						if (inText.match(/^(\/whisper)/) != null || add != null) {
							if (add != null) {
								sub = inText.substr(5);
							} else {
								sub = inText.substr(9);
							}
							if (sub.match(/^(\w*)\s/)) {
								//if space after player name (is a whisper or a typo)
								var arr = sub.match(/^(\w*)/);
								sub = arr[0].replace(/\s$/, "");
								if (contacts.indexOf(sub) == -1) {
									//not in contacts list
									_sub = sub;
									setTimeout(delayedConfirm,1000);
								}
							} else if (contacts.indexOf(sub) == -1) {
								//not in contacts, promt to add, clear input
								inputField.focus();
								inputField.value = "";
								if (confirm("Add " + sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
									saveContact(sub);
									return false;
								}
							} else if (sub && contacts.indexOf(sub) > -1) {
								//not a whisper, reject duplicate contact
								alert(sub + " is already in your contacts list.");
							}
						}
						//remove contact(s)
						if (del) {
							sub = inText.substr(5);
							inputField.value = "";
							if ((contacts.indexOf(sub) > -1 || sub == "all") && confirm("Really delete " + sub + " from your contacts?\n\n Type \"/del all\" to delete all of your contacts")) {
								deleteContact(sub);
							} else {
								alert(sub + " is not in your contacts list.");
							}
							return false;
						}
						// show contacts list
						if (showContacts) {
							inputField.value = "";
							listContacts();
							return false;
							
						}
						// /chelp dialog
						if (inText.length === 6 && inText.match(/^(\/chelp)/) != null) {
							inputField.value = "";
							showHelp();
							return false;
						}
						
						if (inputField !== null && inputField.type === "text") {
							if (window.__ChatHelper_ch_debug)
								console.log("Chat Helper: onEnter auto-tagging");
							//this code is from Bruce Doan: http://userscripts.org/scripts/show/151965
							inText = inText.replace(/(\[coords\])*([0-9]{3})[:|.]([0-9]{3})([:|.]\w+)?(\[\/coords\])*/gi, function () {
									var result = new Array();
									result.push('[coords]');
									result.push(arguments[2]);
									result.push(':');
									result.push(arguments[3]);
									if (arguments[4] !== undefined) {
										result.push(arguments[4].replace('.', ':'));
									}
									result.push('[/coords]');
									return result.join('');
								});
							// auto url
							inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\|#]*)*\/?(\[\/url\])*/gi, function () {
									var result = new Array();
									result.push('[url]');
									result.push(arguments[2]); // http[s]://
									result.push(arguments[3]); // domain
									result.push(arguments[4]); // ext
									result.push(arguments[5]); // query string
									result.push('[/url]');
									return result.join('');
									
								});
							// shorthand for player
							inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
							// shorthand for alliance
							inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
							if (inText !== "" || inText !== inputField.value) {
								inputField.value = inText;
							}
						}
					}
					
					if (kEv.altKey && !kEv.shiftKey && !kEv.altGraphKey && !kEv.ctrlKey && kEv.target != null && (kEv.target.type === "textarea" || kEv.target.type === "text")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						// Alt key, not Ctrl or AltGr
						if (kEv.altKey && !kEv.altGraphKey && !kEv.ctrlKey) {
							var cc = kEv.charCode;
							var kc = kEv.keyCode;
							if (window.__ChatHelper_ch_debug) {
								console.log(cc);
								console.log(kc);
							}
							/* Alt+1 for auto Coordinates/Urls in message body */
							if (inputField.type === "textarea" && (cc === 49 || kc === 49)) {
								var pos = getCaretPos(inputField);
								if (window.__ChatHelper_ch_debug)
									console.log("Chat Helper: attempting Alt+1 message auto-tag");
								if (inputField != null) {
									var st = inputField.scrollTop;
									inText = inText.replace(/(\[coords\])*([0-9]{3})[:|.]([0-9]{3})([:|.]\w+)?(\[\/coords\])*/gi, function () {
											var result = new Array();
											result.push('[coords]');
											result.push(arguments[2]);
											result.push(':');
											result.push(arguments[3]);
											if (arguments[4] !== undefined) {
												result.push(arguments[4].replace('.', ':'));
											}
											result.push('[/coords]');
											return result.join('');
										});
									// auto url
									inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\|#]*)*\/?(\[\/url\])*/gi, function () {
											var result = new Array();
											result.push('[url]');
											result.push(arguments[2]); // http[s]://
											result.push(arguments[3]); // domain
											result.push(arguments[4]); // ext
											result.push(arguments[5]); // query string
											result.push('[/url]');
											return result.join('');
											
										});
									inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
									inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
									if (inText !== "" || inText !== inputField.value) {
										inputField.value = inText;
										inputField.scrollTop = st;
										moveCaret(inputField, 0);
									}
								}
							}
							/* Alt+2 for URLs fallback */
							if (cc === 50 || kc === 50) {
								if (inputField !== null) {
									var url = prompt("Website (Syntax: google.com or www.google.com)", "");
									if (url !== null) {
										inputField.value += '[url]' + url + '[/url]';
									}
								}
							}
							/* Alt+3 or Alt+p for players */
							if ((cc === 112 || kc === 80) || (cc === 51 || kc === 51)) {
								tagWith('[player]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+4 or Alt+a for alliances */
							if ((cc === 97 || kc === 65) || (cc === 52 || kc === 52)) {
								tagWith('[alliance]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+0 to clear tags */
							if (cc === 48 || kc === 48) {
								if (inputField.type === 'textarea')
									var st = inputField.scrollTop;
								if (inputField !== null) {
									inText = inText.replace(/\[\/?coords\]/gi, '');
									inText = inText.replace(/\[\/?url\]/gi, '');
									inText = inText.replace(/\[\/?player\]/gi, '');
									inText = inText.replace(/\[\/?alliance\]/gi, '');
									inText = inText.replace(/\[\/?b\]/gi, '');
									inText = inText.replace(/\[\/?i\]/gi, '');
									inText = inText.replace(/\[\/?u\]/gi, '');
									inText = inText.replace(/\[\/?s\]/gi, '');
									inputField.value = inText;
								}
								if (inputField.type === 'textarea')
									inputField.scrollTop = st;
							}
							/* Alt+b for bold */
							if (cc === 98 || kc === 66) {
								tagWith('[b]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+i for italics */
							if (cc === 105 || kc === 73) {
								tagWith('[i]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+u for underline */
							if (cc === 117 || kc === 85) {
								tagWith('[u]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+T for strikethrough (CHANGED for compatibility, initial Alt+S) )*/
							if (cc === 116 || kc === 84) {
								tagWith('[s]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
						}
					}
				}
			}
		} catch (err) {
			console.log("createChatHelper: ", err);
		}
		
		function CNCTAChatHelper_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined') {
					createChatHelper();
				} else {
					window.setTimeout(CNCTAChatHelper_checkIfLoaded, 1000);
				}
			} catch (err) {
				console.log("CNCTAChatHelper_checkIfLoaded: ", err);
			}
		}
		window.setTimeout(CNCTAChatHelper_checkIfLoaded, 1000);
	};
	try {
		var CNCTAChatHelper = document.createElement("script");
		CNCTAChatHelper.innerHTML = "(" + CNCTAChatHelper_main.toString() + ")();";
		CNCTAChatHelper.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(CNCTAChatHelper);
	} catch (err) {
		console.log("CNCTAChatHelper: init error: ", err);
	}
})();


/***********************************************************************************
CCTA Coords 500:500
***********************************************************************************/
function Ini() {
	m = "CnC: Tiberium Alliances COORDS has been loaded";
	if (typeof console != 'undefined') console.log(m);
	else if (window.opera) opera.postError(m);
	else GM_log(m);
};

(function () {
	var TACoordsMain = function () {
			var IsDEBUG = false;
			function log(m) {
				if (IsDEBUG) {
					if (typeof console != 'undefined') console.log(m);
					else if (window.opera) opera.postError(m);
					else GM_log(m);
				}
			};
			log("IsDEBUG = true");
			function createInstance() {
				var MrHIDE = {};
				qx.Class.define("MrHIDE.main", {
					type: "singleton",
					extend: qx.core.Object,
					members: {
						Coords: "First, just move mouse cursor over some map coordinates numbers ex. 0:0",
						initialize: function () {
							window.addEventListener("keyup", this.onKey, false);
							window.addEventListener("mouseover", this.onMouseOver, false);
						},
						GetCaretPosition: function (ctrl) {
							var CaretPos = 0; // IE Support
							if (document.selection) {
								ctrl.focus();
								var Sel = document.selection.createRange();
								Sel.moveStart('character', -ctrl.value.length);
								CaretPos = Sel.text.length;
							}
							// Firefox support
							else if (ctrl.selectionStart || ctrl.selectionStart == '0') CaretPos = ctrl.selectionStart;
							return (CaretPos);
						},
						SetCaretPosition: function (ctrl, pos) {
							if (ctrl.setSelectionRange) {
								ctrl.focus();
								ctrl.setSelectionRange(pos, pos);
							} else if (ctrl.createTextRange) {
								var range = ctrl.createTextRange();
								range.collapse(true);
								range.moveEnd('character', pos);
								range.moveStart('character', pos);
								range.select();
							}
						},
						onKey: function (ev) {
							var s = String.fromCharCode(ev.keyCode);
							var MRH = window.MrHIDE.main.getInstance();

							// ALT+
							if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey) {
								// log("Alt+" + s);

								switch (s) {
								case "Z":
									// coords by popup window
									var inputField = document.querySelector('input:focus, textarea:focus');
									if (inputField != null) {
										this.Coords = prompt("Place coordinates. Ex. 800:800", "");
										if (Coords != null) {
											var position = MRH.GetCaretPosition(inputField);
											var txt = inputField.value;
											var insert = "[coords]" + this.Coords + "[/coords]";
											inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
											MRH.SetCaretPosition(inputField, position + insert.length);
										}
									}
									break;
								case "X":
									// coords by moving mouse OVER map coordinates
									var inputField = document.querySelector('input:focus, textarea:focus');
									if (inputField != null) {
										if (this.Coords != null) {
											var position = MRH.GetCaretPosition(inputField);
											var txt = inputField.value;
											var insert = "[coords]" + this.Coords + "[/coords]";
											inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
											MRH.SetCaretPosition(inputField, position + insert.length);
										}
									}
									break;
								case "S":
									// coords by inserting [coords][/coords]
									var inputField = document.querySelector('input:focus, textarea:focus');
									if (inputField != null) {
										var position = MRH.GetCaretPosition(inputField);
										var txt = inputField.value;
										var insert = "[coords][/coords]";
										inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
										MRH.SetCaretPosition(inputField, position + ("[coords]").length);
									}
									break;
								default:
									// Other letters
									log("Other letter (" + s + ")");
								}
							}
						},
						onMouseOver: function (ev) {					
							var tag = ev.target.tagName;
							if (tag == "B" || tag == "DIV" || tag == "A") {
								var s = ev.target.textContent;
								var semicolon = s.indexOf(":");
								if (semicolon > 0) {
									var n1 = s.substring(0, semicolon);
									var n2 = s.substring(semicolon + 1, s.lenght);
									if (isFinite(n1) && isFinite(n2)) {
                                                                                if(s.length==5 && s[0]=="0") return;
										Coords = s;
										ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectTiberium');
									}
								}
							}
						},
					} // members
				});
			}

			// Loading
			function TACoords_checkIfLoaded() {
				try {
					if (typeof qx != 'undefined') {
						ap = qx.core.Init.getApplication();
						mb = qx.core.Init.getApplication().getMenuBar();
						if (ap && mb) {
							createInstance();
							window.MrHIDE.main.getInstance().initialize();
						} else window.setTimeout(TACoords_checkIfLoaded, 1000);
					} else {
						window.setTimeout(TACoords_checkIfLoaded, 1000);
					}
				} catch (e) {
					if (typeof console != 'undefined') console.log(e);
					else if (window.opera) opera.postError(e);
					else GM_log(e);
				}
			}
			if (/commandandconquer\.com/i.test(document.domain)) {
				window.setTimeout(TACoords_checkIfLoaded, 1000);
			}
		}
		// Injecting
	if (window.location.pathname != ("/login/auth")) {
		var TACScript = document.createElement("script");
		TACScript.innerHTML = "(" + TACoordsMain.toString() + ")();";
		TACScript.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(TACScript);
		}
	}
})();Ini();


/***********************************************************************************
CNCOpt
***********************************************************************************/
// ==UserScript==
// @version       1.7.4
// @updateURL     https://userscripts.org/scripts/source/131289.meta.js
// @downloadURL   https://userscripts.org/scripts/source/131289.user.js
// @name          C&C:TA CNCOpt Link Button
// @namespace     http://cncopt.com/
// @icon          http://cncopt.com/favicon.ico
// @description   Creates a "CNCOpt" button when selecting a base in Command & Conquer: Tiberium Alliances. The share button takes you to http://cncopt.com/ and fills in the selected base information so you can analyze or share the base.
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://*.cncopt.com/*
// @include       http*://cncopt.com/*
// @grant         GM_log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// @contributor   PythEch (http://http://userscripts.org/users/220246)
// ==/UserScript==
/* 

Special thanks to PythEch for fixing this up so it worked again!

*/
var scity = null;
var tcity = null;
var tbase = null;
try {
  unsafeWindow.__cncopt_version = "1.7.4";
  (function () {
    var cncopt_main = function () {

      var defense_unit_map = {
        /* GDI Defense Units */"GDI_Wall": "w",
        "GDI_Cannon": "c",
        "GDI_Antitank Barrier": "t",
        "GDI_Barbwire": "b",
        "GDI_Turret": "m",
        "GDI_Flak": "f",
        "GDI_Art Inf": "r",
        "GDI_Art Air": "e",
        "GDI_Art Tank": "a",
        "GDI_Def_APC Guardian": "g",
        "GDI_Def_Missile Squad": "q",
        "GDI_Def_Pitbull": "p",
        "GDI_Def_Predator": "d",
        "GDI_Def_Sniper": "s",
        "GDI_Def_Zone Trooper": "z",
        /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
        "NOD_Def_Art Air": "e",
        "NOD_Def_Art Inf": "r",
        "NOD_Def_Art Tank": "a",
        "NOD_Def_Attack Bike": "p",
        "NOD_Def_Barbwire": "b",
        "NOD_Def_Black Hand": "z",
        "NOD_Def_Cannon": "c",
        "NOD_Def_Confessor": "s",
        "NOD_Def_Flak": "f",
        "NOD_Def_MG Nest": "m",
        "NOD_Def_Militant Rocket Soldiers": "q",
        "NOD_Def_Reckoner": "g",
        "NOD_Def_Scorpion Tank": "d",
        "NOD_Def_Wall": "w",

        /* Forgotten Defense Units */"FOR_Wall": "w",
        "FOR_Barbwire_VS_Inf": "b",
        "FOR_Barrier_VS_Veh": "t",
        "FOR_Inf_VS_Inf": "g",
        "FOR_Inf_VS_Veh": "r",
        "FOR_Inf_VS_Air": "q",
        "FOR_Sniper": "n",
        "FOR_Mammoth": "y",
        "FOR_Veh_VS_Inf": "o",
        "FOR_Veh_VS_Veh": "s",
        "FOR_Veh_VS_Air": "u",
        "FOR_Turret_VS_Inf": "m",
        "FOR_Turret_VS_Inf_ranged": "a",
        "FOR_Turret_VS_Veh": "v",
        "FOR_Turret_VS_Veh_ranged": "d",
        "FOR_Turret_VS_Air": "f",
        "FOR_Turret_VS_Air_ranged": "e",
        "": ""
      };

      var offense_unit_map = {
        /* GDI Offense Units */"GDI_APC Guardian": "g",
        "GDI_Commando": "c",
        "GDI_Firehawk": "f",
        "GDI_Juggernaut": "j",
        "GDI_Kodiak": "k",
        "GDI_Mammoth": "m",
        "GDI_Missile Squad": "q",
        "GDI_Orca": "o",
        "GDI_Paladin": "a",
        "GDI_Pitbull": "p",
        "GDI_Predator": "d",
        "GDI_Riflemen": "r",
        "GDI_Sniper Team": "s",
        "GDI_Zone Trooper": "z",

        /* Nod Offense Units */"NOD_Attack Bike": "b",
        "NOD_Avatar": "a",
        "NOD_Black Hand": "z",
        "NOD_Cobra": "r",
        "NOD_Commando": "c",
        "NOD_Confessor": "s",
        "NOD_Militant Rocket Soldiers": "q",
        "NOD_Militants": "m",
        "NOD_Reckoner": "k",
        "NOD_Salamander": "l",
        "NOD_Scorpion Tank": "o",
        "NOD_Specter Artilery": "p",
        "NOD_Venom": "v",
        "NOD_Vertigo": "t",
        "": ""
      };


      function findTechLayout(city) {
        for (var k in city) {
          //console.log(typeof(city[k]), "1.city[", k, "]", city[k])
          if ((typeof (city[k]) == "object") && city[k] && 0 in city[k] && 8 in city[k]) {
            if ((typeof (city[k][0]) == "object") && city[k][0] && city[k][0] && 0 in city[k][0] && 15 in city[k][0]) {
              if ((typeof (city[k][0][0]) == "object") && city[k][0][0] && "BuildingIndex" in city[k][0][0]) {
                return city[k];
              }
            }
          }
        }
        return null;
      }

      function findBuildings(city) {
        var cityBuildings = city.get_CityBuildingsData();
        for (var k in cityBuildings) {
          if (PerforceChangelist >= 376877) {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k] && "c" in cityBuildings[k] && cityBuildings[k].c > 0) {
              return cityBuildings[k].d;
            }
          } else {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "l" in cityBuildings[k]) {
              return cityBuildings[k].l;
            }
          }
        }
      }

      function isOffenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in offense_unit_map);
      }

      function isDefenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in defense_unit_map);
      }

      function getUnitArrays(city) {
        var ret = [];
        for (var k in city) {
          if ((typeof (city[k]) == "object") && city[k]) {
            for (var k2 in city[k]) {
              if (PerforceChangelist >= 376877) {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "d" in city[k][k2]) {
                  var lst = city[k][k2].d;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              } else {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "l" in city[k][k2]) {
                  var lst = city[k][k2].l;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return ret;
      }

      function getDefenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isDefenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }

      function getOffenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isOffenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }


      function cncopt_create() {
        console.log("CNCOpt Link Button v" + window.__cncopt_version + " loaded");
        var cncopt = {
          selected_base: null,
          keymap: {
            /* GDI Buildings */"GDI_Accumulator": "a",
            "GDI_Refinery": "r",
            "GDI_Trade Center": "u",
            "GDI_Silo": "s",
            "GDI_Power Plant": "p",
            "GDI_Construction Yard": "y",
            "GDI_Airport": "d",
            "GDI_Barracks": "b",
            "GDI_Factory": "f",
            "GDI_Defense HQ": "q",
            "GDI_Defense Facility": "w",
            "GDI_Command Center": "e",
            "GDI_Support_Art": "z",
            "GDI_Support_Air": "x",
            "GDI_Support_Ion": "i",
            /* Forgotten Buildings */"FOR_Silo": "s",
            "FOR_Refinery": "r",
            "FOR_Tiberium Booster": "b",
            "FOR_Crystal Booster": "v",
            "FOR_Trade Center": "u",
            "FOR_Defense Facility": "w",
            "FOR_Construction Yard": "y",
            "FOR_Harvester_Tiberium": "h",
            "FOR_Defense HQ": "q",
            "FOR_Harvester_Crystal": "n",
            /* Nod Buildings */"NOD_Refinery": "r",
            "NOD_Power Plant": "p",
            "NOD_Harvester": "h",
            "NOD_Construction Yard": "y",
            "NOD_Airport": "d",
            "NOD_Trade Center": "u",
            "NOD_Defense HQ": "q",
            "NOD_Barracks": "b",
            "NOD_Silo": "s",
            "NOD_Factory": "f",
            "NOD_Harvester_Crystal": "n",
            "NOD_Command Post": "e",
            "NOD_Support_Art": "z",
            "NOD_Support_Ion": "i",
            "NOD_Accumulator": "a",
            "NOD_Support_Air": "x",
            "NOD_Defense Facility": "w",
            //"NOD_Tech Lab": "",
            //"NOD_Recruitment Hub": "X",
            //"NOD_Temple of Nod": "X",

            /* GDI Defense Units */"GDI_Wall": "w",
            "GDI_Cannon": "c",
            "GDI_Antitank Barrier": "t",
            "GDI_Barbwire": "b",
            "GDI_Turret": "m",
            "GDI_Flak": "f",
            "GDI_Art Inf": "r",
            "GDI_Art Air": "e",
            "GDI_Art Tank": "a",
            "GDI_Def_APC Guardian": "g",
            "GDI_Def_Missile Squad": "q",
            "GDI_Def_Pitbull": "p",
            "GDI_Def_Predator": "d",
            "GDI_Def_Sniper": "s",
            "GDI_Def_Zone Trooper": "z",
            /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
            "NOD_Def_Art Air": "e",
            "NOD_Def_Art Inf": "r",
            "NOD_Def_Art Tank": "a",
            "NOD_Def_Attack Bike": "p",
            "NOD_Def_Barbwire": "b",
            "NOD_Def_Black Hand": "z",
            "NOD_Def_Cannon": "c",
            "NOD_Def_Confessor": "s",
            "NOD_Def_Flak": "f",
            "NOD_Def_MG Nest": "m",
            "NOD_Def_Militant Rocket Soldiers": "q",
            "NOD_Def_Reckoner": "g",
            "NOD_Def_Scorpion Tank": "d",
            "NOD_Def_Wall": "w",

            /* Forgotten Defense Units */"FOR_Wall": "w",
            "FOR_Barbwire_VS_Inf": "b",
            "FOR_Barrier_VS_Veh": "t",
            "FOR_Inf_VS_Inf": "g",
            "FOR_Inf_VS_Veh": "r",
            "FOR_Inf_VS_Air": "q",
            "FOR_Sniper": "n",
            "FOR_Mammoth": "y",
            "FOR_Veh_VS_Inf": "o",
            "FOR_Veh_VS_Veh": "s",
            "FOR_Veh_VS_Air": "u",
            "FOR_Turret_VS_Inf": "m",
            "FOR_Turret_VS_Inf_ranged": "a",
            "FOR_Turret_VS_Veh": "v",
            "FOR_Turret_VS_Veh_ranged": "d",
            "FOR_Turret_VS_Air": "f",
            "FOR_Turret_VS_Air_ranged": "e",

            /* GDI Offense Units */"GDI_APC Guardian": "g",
            "GDI_Commando": "c",
            "GDI_Firehawk": "f",
            "GDI_Juggernaut": "j",
            "GDI_Kodiak": "k",
            "GDI_Mammoth": "m",
            "GDI_Missile Squad": "q",
            "GDI_Orca": "o",
            "GDI_Paladin": "a",
            "GDI_Pitbull": "p",
            "GDI_Predator": "d",
            "GDI_Riflemen": "r",
            "GDI_Sniper Team": "s",
            "GDI_Zone Trooper": "z",

            /* Nod Offense Units */"NOD_Attack Bike": "b",
            "NOD_Avatar": "a",
            "NOD_Black Hand": "z",
            "NOD_Cobra": "r",
            "NOD_Commando": "c",
            "NOD_Confessor": "s",
            "NOD_Militant Rocket Soldiers": "q",
            "NOD_Militants": "m",
            "NOD_Reckoner": "k",
            "NOD_Salamander": "l",
            "NOD_Scorpion Tank": "o",
            "NOD_Specter Artilery": "p",
            "NOD_Venom": "v",
            "NOD_Vertigo": "t",

            "<last>": "."
          },
          make_sharelink: function () {
            try {
              var selected_base = cncopt.selected_base;
              var city_id = selected_base.get_Id();
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
              var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
              var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
              tbase = selected_base;
              tcity = city;
              scity = own_city;
              //console.log("Target City: ", city);
              //console.log("Own City: ", own_city);
              var link = "http://cncopt.com/?map=";
              link += "3|"; /* link version */
              switch (city.get_CityFaction()) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + city.get_CityFaction());
                  link += "E|";
                  break;
              }
              switch (own_city.get_CityFaction()) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + own_city.get_CityFaction());
                  link += "E|";
                  break;
              }
              link += city.get_Name() + "|";
              defense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                defense_units.push(col)
              }
              var defense_unit_list = getDefenseUnits(city);
              if (PerforceChangelist >= 376877) {
                for (var i in defense_unit_list) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              } else {
                for (var i = 0; i < defense_unit_list.length; ++i) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              }

              offense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                offense_units.push(col)
              }

              var offense_unit_list = getOffenseUnits(own_city);
              if (PerforceChangelist >= 376877) {
                for (var i in offense_unit_list) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              } else {
                for (var i = 0; i < offense_unit_list.length; ++i) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              }

              var techLayout = findTechLayout(city);
              var buildings = findBuildings(city);
              for (var i = 0; i < 20; ++i) {
                row = [];
                for (var j = 0; j < 9; ++j) {
                  var spot = i > 16 ? null : techLayout[j][i];
                  var level = 0;
                  var building = null;
                  if (spot && spot.BuildingIndex >= 0) {
                    building = buildings[spot.BuildingIndex];
                    level = building.get_CurrentLevel();
                  }
                  var defense_unit = defense_units[j][i];
                  if (defense_unit) {
                    level = defense_unit.get_CurrentLevel();
                  }
                  var offense_unit = offense_units[j][i];
                  if (offense_unit) {
                    level = offense_unit.get_CurrentLevel();
                  }
                  if (level > 1) {
                    link += level;
                  }

                  switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                    case 0:
                      if (building) {
                        var techId = building.get_MdbBuildingId();
                        if (GAMEDATA.Tech[techId].n in cncopt.keymap) {
                          link += cncopt.keymap[GAMEDATA.Tech[techId].n];
                        } else {
                          console.log("cncopt [5]: Unhandled building: " + techId, building);
                          link += ".";
                        }
                      } else if (defense_unit) {
                        if (defense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[defense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else if (offense_unit) {
                        if (offense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[offense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else {
                        link += ".";
                      }
                      break;
                    case 1:
                      /* Crystal */
                      if (spot.BuildingIndex < 0) link += "c";
                      else link += "n";
                      break;
                    case 2:
                      /* Tiberium */
                      if (spot.BuildingIndex < 0) link += "t";
                      else link += "h";
                      break;
                    case 4:
                      /* Woods */
                      link += "j";
                      break;
                    case 5:
                      /* Scrub */
                      link += "h";
                      break;
                    case 6:
                      /* Oil */
                      link += "l";
                      break;
                    case 7:
                      /* Swamp */
                      link += "k";
                      break;
                    default:
                      console.log("cncopt [4]: Unhandled resource type: " + city.GetResourceType(j, i));
                      link += ".";
                      break;
                  }
                }
              }
              /* Tack on our alliance bonuses */
              if (alliance && scity.get_AllianceId() == tcity.get_AllianceId()) {
                link += "|" + alliance.get_POITiberiumBonus();
                link += "|" + alliance.get_POICrystalBonus();
                link += "|" + alliance.get_POIPowerBonus();
                link += "|" + alliance.get_POIInfantryBonus();
                link += "|" + alliance.get_POIVehicleBonus();
                link += "|" + alliance.get_POIAirBonus();
                link += "|" + alliance.get_POIDefenseBonus();
              }

              //console.log(link);
              window.open(link, "_blank");
            } catch (e) {
              console.log("cncopt [1]: ", e);
            }
          }
        };
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }

        var check_ct = 0;
        var check_timer = null;
        var button_enabled = 123456;
        /* Wrap showMenu so we can inject our Sharelink at the end of menus and
         * sync Base object to our cncopt.selected_base variable  */
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
          try {
            var self = this;
            //console.log(selected_base);
            cncopt.selected_base = selected_base;
            if (this.__cncopt_initialized != 1) {
              this.__cncopt_initialized = 1;
              this.__cncopt_links = [];
              for (var i in this) {
                try {
                  if (this[i] && this[i].basename == "Composite") {
                    var link = new qx.ui.form.Button("CNCOpt", "http://cncopt.com/favicon.ico");
                    link.addListener("execute", function () {
                      var bt = qx.core.Init.getApplication();
                      bt.getBackgroundArea().closeCityInfo();
                      cncopt.make_sharelink();
                    });
                    this[i].add(link);
                    this.__cncopt_links.push(link)
                  }
                } catch (e) {
                  console.log("cncopt [2]: ", e);
                }
              }
            }
            var tf = false;
            switch (selected_base.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                switch (selected_base.get_Type()) {
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                    tf = true;
                    break;
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                    tf = true;
                    break;
                }
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                tf = false;
                console.log("cncopt: Ghost City selected.. ignoring because we don't know what to do here");
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                tf = true;
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                tf = true;
                break;
            }

            var orig_tf = tf;

            function check_if_button_should_be_enabled() {
              try {
                tf = orig_tf;
                var selected_base = cncopt.selected_base;
                var still_loading = false;
                if (check_timer != null) {
                  clearTimeout(check_timer);
                }

                /* When a city is selected, the data for the city is loaded in the background.. once the 
                 * data arrives, this method is called again with these fields set, but until it does
                 * we can't actually generate the link.. so this section of the code grays out the button
                 * until the data is ready, then it'll light up. */
                if (selected_base && selected_base.get_Id) {
                  var city_id = selected_base.get_Id();
                  var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                  //if (!city || !city.m_CityUnits || !city.m_CityUnits.m_DefenseUnits) {
                  //console.log("City", city);
                  //console.log("get_OwnerId", city.get_OwnerId());
                  if (!city || city.get_OwnerId() == 0) {
                    still_loading = true;
                    tf = false;
                  }
                } else {
                  tf = false;
                }
                if (tf != button_enabled) {
                  button_enabled = tf;
                  for (var i = 0; i < self.__cncopt_links.length; ++i) {
                    self.__cncopt_links[i].setEnabled(tf);
                  }
                }
                if (!still_loading) {
                  check_ct = 0;
                } else {
                  if (check_ct > 0) {
                    check_ct--;
                    check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                  } else {
                    check_timer = null;
                  }
                }
              } catch (e) {
                console.log("cncopt [3]: ", e);
                tf = false;
              }
            }

            check_ct = 50;
            check_if_button_should_be_enabled();
          } catch (e) {
            console.log("cncopt [3]: ", e);
          }
          this.__cncopt_real_showMenu(selected_base);
        }
      }


      /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
      function cnc_check_if_loaded() {
        try {
          if (typeof qx != 'undefined') {
            a = qx.core.Init.getApplication(); // application
            if (a) {
              cncopt_create();
            } else {
              window.setTimeout(cnc_check_if_loaded, 1000);
            }
          } else {
            window.setTimeout(cnc_check_if_loaded, 1000);
          }
        } catch (e) {
          if (typeof console != 'undefined') console.log(e);
          else if (window.opera) opera.postError(e);
          else GM_log(e);
        }
      }
      if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
    }

    // injecting because we can't seem to hook into the game interface via unsafeWindow 
    //   (Ripped from AmpliDude's LoU Tweak script)
    var script_block = document.createElement("script");
    txt = cncopt_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
  })();
} catch (e) {
  GM_log(e);
}



// ==UserScript==
// @name        C&C:TA Compass Movable
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Creates compass poiting to the currently selected base (compass points from itself).
// @version     1.1.0
// @author      Caine,BlinDManX
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
(function () {
    var CompassMain = function () {
        try {
            function createCompass() {
                console.log('Compass loaded');
                qx.Class.define("Compass", {
                    extend: qx.ui.window.Window,
                    construct: function () {
                        this.base(arguments);
                        this.setWidth(54);
                        this.setHeight(90);
                        this.setContentPadding(0);
                        this.setShowMinimize(false);
                        this.setShowMaximize(false);
                        this.setShowClose(false);
                        this.setResizable(false);
                        this.setAllowMaximize(false);
                        this.setAllowMinimize(false);
                        this.setAllowClose(false);
                        this.setShowStatusbar(false);
                        this.setDecorator(null);                        
                        var title = this.getChildControl("title");
                        title.setTextAlign("center");
                        title.setTextColor("#FFF");
                        title.setRich(true);
                        title.setDecorator("tabview-chat-pane");
                        var captionBar = this.getChildControl("captionbar");
                        captionBar.setDecorator(null);
                        captionBar.remove(this.getChildControl("icon"));
                        captionBar.remove(this.getChildControl("minimize-button"));
                        captionBar.remove(this.getChildControl("restore-button"));
                        captionBar.remove(this.getChildControl("maximize-button"));
                        captionBar.remove(this.getChildControl("close-button"));
                        captionBar.setLayout(new qx.ui.layout.Grow());
                       
                        var pane = this.getChildControl("pane");
                        pane.setDecorator(null);
                        pane.setLayout(new qx.ui.layout.Grow());
                        this.setLayout(new qx.ui.layout.Canvas());
                      
                        var st = '<canvas id="compass" style="border:1px solid;position: absolute; top: 0px; left: 0px;" height="50" width="50"></canvas>';
                        var l = new qx.ui.basic.Label().set({
                            value: st,
                            rich: true
                        });
                        this.add(l);  
                        if (PerforceChangelist >= 382917) {
                            phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayCompass);
                        } else {
                            webfrontend.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayCompass);
                        }
                        this.addListener("move", function (e) {
                            this.displayCompass();
                        });
                        this.displayCompass();
                        
                    },
                    members: {
                        needle: null,                        
                        ec: null,
                        ctx: null,
                        halfsize: 25,
                        displayCompass: function () {
                            try {                                                              
                                if (this.ctx != null) {   
                                        var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(); 
                                        var faction = currentCity.get_CityFaction();
                                        var winpos = this.getLayoutProperties();
                                        var ctx = this.ctx; 
                                        var cityCoordX = currentCity.get_PosX();
                                        var cityCoordY = currentCity.get_PosY();
                                        var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
                                        var zoom = region.get_ZoomFactor();
                                        var targetCoordX = winpos.left + 34;
                                        var targetCoordY = winpos.top +  61;
                                        var gridW = region.get_GridWidth();
                                        var gridH = region.get_GridHeight();
                                        var viewCoordX = (region.get_PosX() + targetCoordX / zoom - zoom * gridW / 2) / gridW;
                                        var viewCoordY = (region.get_PosY() + targetCoordY / zoom - zoom * gridH / 2) / gridH;
                                        var dx = viewCoordX - cityCoordX;
                                        var dy = cityCoordY - viewCoordY;
                                        var distance = Math.sqrt(dx * dx + dy * dy);
                                        var dtext = Math.round(10 * distance) / 10;
                                        var t = qx.lang.String.pad(currentCity.get_Name(),7,"")+"<br>"+dtext;
                                        this.setCaption(t);
                                        
                                        
                                        ctx.clearRect(0, 0, 50, 50);
                                        ctx.save();
                                        ctx.globalAlpha = 0.5;
                                        ctx.fillStyle = '#000';
                                        ctx.fillRect(0, 0, 50, 50); // Mittelpunkt
                                        ctx.globalAlpha = 1.0;
                     
                                        ctx.translate(25, 25);
                                        ctx.rotate(dy > 0 ? Math.asin(dx / distance) : -Math.asin(dx / distance) + Math.PI); 
                                        ctx.beginPath();			
                                        ctx.moveTo(0, 20);			
                                        ctx.lineTo(17, -15);
                                        ctx.lineTo(-17, -15);
                                        ctx.closePath();
                                        ctx.moveTo(0, 0);			
                                        ctx.lineTo(10, -22);
                                        ctx.lineTo(-10, -22);
                                        ctx.closePath();            
                                        
                                        ctx.lineWidth =4.0;                                    
                                        ctx.fillStyle = faction == ClientLib.Base.EFactionType.GDIFaction ? "#00a" : "#a00"; 
                                        ctx.strokeStyle = "#000";
                                    
                                        ctx.fill();
                                        ctx.stroke();
                                        ctx.restore();
                                        //console.log(faction);
                                                                        
                                } else {                                    
                                    this.ec = document.getElementById("compass");
                                    if (this.ec != null){
                                        this.ctx = this.ec.getContext('2d');
                                        console.log("Compass ok");                                                                                                          
                                    } 
                                } 
                            } catch (e) {
                                console.log("displayCompass", e);
                            }
                        }
                    }
                });
                var win = new Compass();
                win.moveTo(140, 30);
                win.open();               
            }
        } catch (e) {
            console.log('createCompass: ', e);
        }
        function CompassCheckLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    window.setTimeout(createCompass, 5000);
                    
                } else {
                    window.setTimeout(CompassCheckLoaded, 1000);
                }
            } catch (e) {
                console.log('CompassCheckLoaded: ', e);
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CompassCheckLoaded, 5000);
        }
    }
    try {
        var CompassScript = document.createElement('script');
        CompassScript.innerHTML = "(" + CompassMain.toString() + ')();';
        CompassScript.type = 'text/javascript';
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName('head')[0].appendChild(CompassScript);
        }
    } catch (e) {
        console.log('Compass: init error: ', e);
    }
})();




/***********************************************************************************
Tiberium Alliances Info Sticker
***********************************************************************************/
                                    

(function () {
    var InfoSticker_main = function () {
        try {
            function createInfoSticker() {
                console.log('InfoSticker loaded');
                // define Base
                qx.Class.define("InfoSticker.Base", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        /* Desktop */
                        dataTimerInterval: 1000,
                        positionInterval: 500,
                        tibIcon: null,
                        cryIcon: null,
                        powIcon: null,
                        creditIcon: null,
                        repairIcon: null,
                        hasStorage: false,

                        initialize: function () {
                            try {
                                this.hasStorage = 'localStorage' in window && window['localStorage'] !== null;
                            } catch (se) {}
                            try {
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.tibIcon = fileManager.GetPhysicalPath("ui/common/icn_res_tiberium.png");
                                this.cryIcon = fileManager.GetPhysicalPath("ui/common/icn_res_chrystal.png");
                                this.powIcon = fileManager.GetPhysicalPath("ui/common/icn_res_power.png");
                                this.creditIcon = fileManager.GetPhysicalPath("ui/common/icn_res_dollar.png");
								this.repairIcon = fileManager.GetPhysicalPath("ui/icons/icn_repair_off_points.png");
                                
								if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
									this.attachEvent = webfrontend.gui.Util.attachNetEvent;
								else
									this.attachEvent = phe.cnc.Util.attachNetEvent;
                                
                                this.runMainTimer();
                            } catch (e) {
                                console.log("InfoSticker.initialize: ", e.toString());
                            }
                        },
                        runMainTimer: function () {
                            try {
                                var self = this;
                                this.calculateInfoData();
                                window.setTimeout(function () {
                                    self.runMainTimer();
                                }, this.dataTimerInterval);
                            } catch (e) {
                                console.log("InfoSticker.runMainTimer: ", e.toString());
                            }
                        },
                        runPositionTimer: function () {
                            try {
                                var self = this;
                                this.repositionSticker();
                                window.setTimeout(function () {
                                    self.runPositionTimer();
                                }, this.positionInterval);
                            } catch (e) {
                                console.log("InfoSticker.runPositionTimer: ", e.toString());
                            }
                        },
                        infoSticker: null,
                        mcvPopup: null,
                        mcvTimerLabel: null,
                        mcvInfoLabel: null,
                        mcvPane: null,
                        
                        repairPopup: null,
                        repairTimerLabel: null,

                        resourcePane: null,
                        resourceHidden: false,
                        resourceTitleLabel: null,
                        resourceHideButton: null,
                        resourceLabel1: null,
                        resourceLabel2: null,
                        resourceLabel3: null,

                        resourceLabel1per: null,
                        resourceLabel2per: null,
                        resourceLabel3per: null,

                        productionTitleLabel: null,
                        productionLabelPower: null,
                        productionLabelCredit: null,

                        repairInfoLabel: null,

                        lastButton: null,

                        top_image: null,
                        bot_image: null,

                        toFlipH: [],

                        pinButton: null,
                        pinned: false,

                        pinTop: 130,
                        pinButtonDecoration: null,
                        pinPane: null,

                        pinIconFix: false,
                        
                        lockButton: null,
                        locked: false,

                        lockButtonDecoration: null,
                        lockPane: null,

                        lockIconFix: false,
                        
                        mcvHide: false,
                        repairHide: false,
                        resourceHide: false,
                        productionHide: false,
                        stickerBackground: null,
                        
                        mcvPane: null,
                        
                        pinLockPos: 0,
                        
                        attachEvent: function() {},
                        
                        isNull: function(e) {
                            return typeof e == "undefined" || e == null;
                        },
                        
                        getApp: function() {
                            return qx.core.Init.getApplication();
                        },
                        
                        getBaseListBar: function() {
                            var app = this.getApp();
                            var b;
                            if(!this.isNull(app)) {
                                b = app.getBaseNavigationBar();
                                if(!this.isNull(b)) {
                                    if(b.getChildren().length > 0) {
                                        b = b.getChildren()[0];
                                        if(b.getChildren().length > 0) {
                                            b = b.getChildren()[0];
                                            return b;
                                        }
                                    }
                                }
                            }
                            return null;
                        },
                        
                        repositionSticker: function () {
                            try {
                            	var i;
                                
                                if (this.infoSticker && !this.mcvInfoLabel.isDisposed() && !this.mcvPopup.isDisposed()) {
                                    var dele;

                                    try {
                                        if (this.top_image != null) {
                                            dele = this.top_image.getContentElement().getDomElement();
                                            if (dele != null) {
                                                dele.style["-moz-transform"] = "scaleY(-1)";
                                                dele.style["-o-transform"] = "scaleY(-1)";
                                                dele.style["-webkit-transform"] = "scaleY(-1)";
                                                dele.style.transform = "scaleY(-1)";
                                                dele.style.filter = "FlipV";
                                                dele.style["-ms-filter"] = "FlipV";
                                                this.top_image = null;
                                            }
                                        }
                                        for (i = this.toFlipH.length - 1; i >= 0; i--) {
                                            var e = this.toFlipH[i];
                                            if(e.isDisposed()) this.toFlipH.splice(i, 1);
                                            else {
                                                dele = e.getDecoratorElement().getDomElement();
                                                if (dele != null) {
                                                    dele.style["-moz-transform"] = "scaleX(-1)";
                                                    dele.style["-o-transform"] = "scaleX(-1)";
                                                    dele.style["-webkit-transform"] = "scaleX(-1)";
                                                    dele.style.transform = "scaleX(-1)";
                                                    dele.style.filter = "FlipH";
                                                    dele.style["-ms-filter"] = "FlipH";
                                                    this.toFlipH.splice(i, 1);
                                                }
                                            }
                                        }
                                    } catch (e2) {
                                        console.log("Error flipping images.", e2.toString());
                                    }
                                    var baseListBar = this.getBaseListBar();
                                    if(baseListBar!=null) {
                                        var baseCont = baseListBar.getChildren();
                                        for (i = 0; i < baseCont.length; i++) {
                                            var baseButton = baseCont[i];
                                            if(typeof baseButton.getBaseId === 'function') {
                                                if(baseButton.getBaseId() == ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id()
                                                    && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                            //var baseButtonDecorator = baseButton.getDecorator();
                                            //if (baseButton!=this.mcvPopup && baseButtonDecorator != null && typeof baseButtonDecorator === "string" && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                                //if (baseButtonDecorator.indexOf("focused") >= 0 || baseButtonDecorator.indexOf("pressed") >= 0) {
                                                    if(this.locked) {
                                                        if(!this.pinned) {
                                                            if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                                baseListBar.remove(this.mcvPopup);
                                                            }
                                                            this.pinLockPos = baseListBar.indexOf(baseButton)+1;
                                                            baseListBar.addAt(this.mcvPopup, this.pinLockPos);
                                                        } else if(baseListBar.indexOf(this.mcvPopup)<0) {
                                                            baseListBar.addAt(this.mcvPopup, Math.max(0, Math.min(this.pinLockPos, baseCont.length)));
                                                        }
                                                    } else {
                                                        if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                            baseListBar.remove(this.mcvPopup);
                                                        }
                                                        if (!this.pinned) {
                                                            var top = baseButton.getBounds().top;
                                                            var infoTop;
                                                            try {
                                                                var stickerHeight = this.infoSticker.getContentElement().getDomElement().style.height;
                                                                stickerHeight = stickerHeight.substring(0, stickerHeight.indexOf("px"));
                                                                infoTop = Math.min(130 + top, Math.max(660, window.innerHeight) - parseInt(stickerHeight, 10) - 130);
                                                            } catch (heighterror) {
                                                                infoTop = 130 + top;
                                                            }
                                                            if(this.infoSticker.getContentElement().getDomElement()!=null)
                                                                this.infoSticker.setDomTop(infoTop);
                                                            
                                                            this.pinTop = infoTop;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    
                                }
                            } catch (ex) {
                                console.log("InfoSticker.repositionSticker: ", ex.toString());
                            }
                        },
                        toLock: function (e) {
                            try {
                                this.locked = !this.locked;
                                if(!this.locked) {
                                    this.infoSticker.show();
                                    this.stickerBackground.add(this.mcvPopup);
                                }
                                else this.infoSticker.hide();
                                this.lockButton.setIcon(this.locked ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png");
                                this.updateLockButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.locked) {
                                        localStorage["infoSticker-locked"] = "true";
                                        if(this.pinned) localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                    } else {
                                        localStorage["infoSticker-locked"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                                this.repositionSticker();
                            } catch(e) {
                                console.log("InfoSticker.toLock: ", e.toString());
                            }
                        },
                        updateLockButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.lockPane.setDecorator(null);
                            this.lockButtonDecoration = new qx.ui.decoration.Background();
                            this.lockButtonDecoration.setBackgroundColor(this.locked ? dark : light);
                            this.lockPane.setDecorator(this.lockButtonDecoration);
                        },
                        toPin: function (e) {
                            try {
                                this.pinned = !this.pinned;
                                this.pinButton.setIcon(this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png");
                                this.updatePinButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.pinned) {
                                        localStorage["infoSticker-pinned"] = "true";
                                        localStorage["infoSticker-top"] = this.pinTop.toString();
                                        if(this.locked) {
                                            localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                        }
                                    } else {
                                        localStorage["infoSticker-pinned"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                            } catch(e) {
                                console.log("InfoSticker.toPin: ", e.toString());
                            }
                        },
                        updatePinButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.pinPane.setDecorator(null);
                            this.pinButtonDecoration = new qx.ui.decoration.Background().set({
                                //innerOpacity: 0.5
                            });
                            //this.pinButtonDecoration.setInnerColor(this.pinned ? mid : light);
                            //this.pinButtonDecoration.setOuterColor(this.pinned ? light : mid);
                            this.pinButtonDecoration.setBackgroundColor(this.pinned ? dark : light);
                            this.pinPane.setDecorator(this.pinButtonDecoration);
                        },
                        hideResource: function () {
                            try {
                                //if(this.resourceHidden) 
                                if (this.resourcePane.isVisible()) {
                                    //this.resourcePane.hide();
                                    this.resourcePane.exclude();
                                    this.resourceHideButton.setLabel("+");
                                } else {
                                    this.resourcePane.show();
                                    this.resourceHideButton.setLabel("-");
                                }
                            } catch(e) {
                                console.log("InfoSticker.hideResource: ", e.toString());
                            }
                        },
                        lastPane: null,
                        createSection: function (parent, titleLabel, visible, visibilityStorageName) {
							try {
								var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									padding: [5, 0, 5, 5],
									width: 124,
									decorator: new qx.ui.decoration.Background().set({
										backgroundImage: "decoration/pane_messaging_item/messaging_items_pane.png",
										backgroundRepeat: "scale",
									}),
									alignX: "right"
								});
								
								var labelStyle = {
									font: qx.bom.Font.fromString('bold').set({
										size: 12
									}),
									textColor: '#595969'
								};
								titleLabel.set(labelStyle);
								
								var hidePane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									width: 124,
                                    alignX: "right"
								});
								
								var hideButton = new qx.ui.form.Button("-").set({
									//decorator: new qx.ui.decoration.Single(1, "solid", "black"),
									maxWidth: 15,
									maxHeight: 10,
									//textColor: "black"
								});
                                var self = this;
								//resourceHideButton.addListener("execute", this.hideResource, this);
								hideButton.addListener("execute", function () {
									if (hidePane.isVisible()) {
										hidePane.exclude();
										hideButton.setLabel("+");
									} else {
										hidePane.show();
										hideButton.setLabel("-");
									}
									if(self.hasStorage)
										localStorage["infoSticker-"+visibilityStorageName] = !hidePane.isVisible();
								});

								var titleBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));
								titleBar.add(hideButton);
								titleBar.add(titleLabel);
								pane.add(titleBar);
								pane.add(hidePane);
								
                                if(!visible) hidePane.exclude();
                                
								this.toFlipH.push(pane);

                                this.lastPane = pane;
								parent.add(pane);
								
								return hidePane;
							} catch(e) {
								console.log("InfoSticker.createSection: ", e.toString());
								throw e;
							}
                        },
						createHBox: function (ele1, ele2, ele3) {
							var cnt;
							cnt = new qx.ui.container.Composite();
							cnt.setLayout(new qx.ui.layout.HBox(0));
							if (ele1 != null) {
								cnt.add(ele1);
								ele1.setAlignY("middle");
							}
							if (ele2 != null) {
								cnt.add(ele2);
								ele2.setAlignY("bottom");
							}
							if (ele3 != null) {
								cnt.add(ele3);
								ele3.setAlignY("bottom");
							}

							return cnt;
						},
                        
                        formatCompactTime: function (time) {
                            var comps = time.split(":");
                            
                            var i = 0;
                            var value = Math.round(parseInt(comps[i], 10)).toString();
                            var len = comps.length;
                            while(value==0) {
                                value = Math.round(parseInt(comps[++i], 10)).toString();
                                len--;
                            }
                            var unit;
                            switch(len) {
                                case 1: unit = "s"; break;
                                case 2: unit = "m"; break;
                                case 3: unit = "h"; break;
                                case 4: unit = "d"; break;
                            }
                            return value+unit;
                        },
                        createImage: function(icon) {
                            var image = new qx.ui.basic.Image(icon);
                            image.setScale(true);
                            image.setWidth(20);
                            image.setHeight(20);
                            return image;
                        },

                        createMCVPane: function() {
                            try {
                                this.mcvInfoLabel = new qx.ui.basic.Label();
                                this.mcvTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 18
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center'
                                });
                                this.mcvTimerCreditProdLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('normal').set({
                                        size: 12
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center',
                                    marginTop: 4,
                                    marginBottom: -4
                                });
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                
                                
                                var pane = this.createSection(b3, this.mcvInfoLabel, !this.mcvHide, "mcvHide");
                                pane.add(this.mcvTimerLabel);
                                pane.add(this.mcvTimerCreditProdLabel);
                                this.mcvPane = this.lastPane;
                                this.lastPane.setMarginLeft(7);
                                
                            } catch(e) {
                                console.log("InfoSticker.createMCVPopup", e.toString());
                            }
                        },
                        moveStickerUp: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.max(0, this.pinLockPos-1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerUp", e.toString());
                            }
                        },
                        moveStickerDown: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.min(baseListBar.getChildren().length, this.pinLockPos+1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerDown", e.toString());
                            }
                        },
                        menuUpButton: null,
                        menuDownButton: null,
                        createMCVPopup: function() {
                            try {
                                var self = this;
                                this.mcvPopup = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                    spacing: 3})).set({
                                    paddingLeft: 5,
                                    width: 105,
                                    decorator: new qx.ui.decoration.Background()
                                });
                                
                                var menu = new qx.ui.menu.Menu();
                                var menuPinButton = new qx.ui.menu.Button("Pin", "FactionUI/icons/icn_thread_pin_inactive.png");
                                menuPinButton.addListener("execute", this.toPin, this);
                                menu.add(menuPinButton);
                                var menuLockButton = new qx.ui.menu.Button("Lock", "FactionUI/icons/icn_thread_locked_inactive.png");
                                menuLockButton.addListener("execute", this.toLock, this);
                                menu.add(menuLockButton);
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.menuUpButton = new qx.ui.menu.Button("Move up", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_up.png"));
                                //ui/icons/icon_tracker_arrow_up.png ui/gdi/icons/cht_opt_arrow_down.png
                                this.menuUpButton.addListener("execute", this.moveStickerUp, this);
                                menu.add(this.menuUpButton);
                                this.menuDownButton = new qx.ui.menu.Button("Move down", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_down.png"));
                                this.menuDownButton.addListener("execute", this.moveStickerDown, this);
                                menu.add(this.menuDownButton);
                                this.mcvPopup.setContextMenu(menu);
                                if(!this.locked) {
                                    this.stickerBackground.add(this.mcvPopup);
                                }
    
    ////////////////////////////----------------------------------------------------------
                                this.pinButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.pinButton.addListener("execute", this.toPin, this);
                                
                                this.pinPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updatePinButtonDecoration();
                                
                                this.pinPane.setDecorator(this.pinButtonDecoration);
                                this.pinPane.add(this.pinButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                var icon = this.pinButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.lockButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.lockButton.addListener("execute", this.toLock, this);
                                
                                this.lockPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updateLockButtonDecoration();
                                
                                this.lockPane.setDecorator(this.lockButtonDecoration);
                                this.lockPane.add(this.lockButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                icon = this.lockButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.resourceTitleLabel = new qx.ui.basic.Label();
                                this.resourceTitleLabel.setValue("Base");
                                var resStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 14
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 65,
                                    marginLeft: -10,
                                    textAlign: 'right'
                                };
                                
                                this.resourceLabel1 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel2 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel3 = new qx.ui.basic.Label().set(resStyle);
                                
                                var perStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 9
                                    }),
                                    textColor: '#282828',
                                    height: 18,
                                    width: 33,
                                    textAlign: 'right'
                                };
                                this.resourceLabel1per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel2per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel3per = new qx.ui.basic.Label().set(perStyle);
                                
                                
                                var pane3 = this.createSection(this.mcvPopup, this.resourceTitleLabel, !this.resourceHide, "resourceHide");
                                
                                
                                this.repairTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 16
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    marginLeft: 0,
                                    textAlign: 'center'
                                });
                                pane3.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimerLabel));
                                
                                pane3.add(this.createHBox(this.createImage(this.tibIcon), this.resourceLabel1, this.resourceLabel1per));
                                pane3.add(this.createHBox(this.createImage(this.cryIcon), this.resourceLabel2, this.resourceLabel2per));
                                pane3.add(this.createHBox(this.createImage(this.powIcon), this.resourceLabel3, this.resourceLabel3per));
                                
                                var mcvC = this.mcvPopup.getChildren();
                                mcvC[mcvC.length-1].getChildren()[0].add(this.pinPane);
                                mcvC[mcvC.length-1].getChildren()[0].add(this.lockPane);
    ////////////////////////////----------------------------------------------------------
    
                                this.productionTitleLabel = new qx.ui.basic.Label();
                                this.productionTitleLabel.setValue("Productions");
                                
                                var productionStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 60,
                                    textAlign: 'right',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
                                this.productionLabelPower = new qx.ui.basic.Label().set(productionStyle);
                                this.productionLabelCredit = new qx.ui.basic.Label().set(productionStyle);
                                
                                var pane4 = this.createSection(this.mcvPopup, this.productionTitleLabel, !this.productionHide, "productionHide");
                                pane4.add(this.createHBox(this.createImage(this.powIcon), this.productionLabelPower));
                                pane4.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
                            } catch(e) {
                                console.log("InfoSticker: createMCVPopup", e.toString());
                            }
                        },
                        currentCityChange: function() {
                            this.calculateInfoData();
                            this.repositionSticker();
                        },
                        disposeRecover: function() {
                            
                            try {
                                if(this.mcvPane.isDisposed()) {
                                    this.createMCVPane();
                                }
                                
                                if(this.mcvPopup.isDisposed()) {
                                    this.createMCVPopup();
                                    
                                    this.repositionSticker();
                                }
                                this.waitingRecovery = false;
                            } catch(e) {
                                console.log("InfoSticker: disposeRecover", e.toString());
                            }
                            
                        },
                        waitingRecovery: false,
                        citiesChange: function() {
                            try {
                                var self = this;
                                var baseListBar = this.getBaseListBar();
                                this.disposeRecover();
                                
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                    this.mcvPopup.dispose();
                                }
                                
                                if(baseListBar.indexOf(this.mcvPane)>=0) {
                                    baseListBar.remove(this.mcvPane);
                                    this.mcvPane.dispose();
                                }
                                if(!this.waitingRecovery) {
                                    this.waitingRecovery = true;
                                    window.setTimeout(function () {
                                        self.disposeRecover();
                                    }, 10);
                                }
                            } catch(e) {
                                console.log("InfoSticker: citiesChange", e.toString());
                            }
                        },
                        calculateInfoData: function () {
                            try {
                                var self = this;
                                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                                var cw = player.get_Faction();
                                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                                var cr = player.get_PlayerResearch();
                                var cd = cr.GetResearchItemFomMdbId(cj);
                                
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                if(b3.getChildren().length==0) return;
                                if (!this.infoSticker) {
                                    this.infoSticker = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                        alignX: "right"
                                    })).set({
                                        width: 105,
                                    });

                                    var top = 130;
                                    if (this.hasStorage) {
                                        var l = localStorage["infoSticker-locked"] == "true";
                                        if (l != null) {
                                            this.locked = l;
                                            var pl = localStorage["infoSticker-pinLock"];
                                            if(pl!=null) {
                                                try {
                                                	this.pinLockPos = parseInt(pl, 10);
                                                } catch(etm) {}
                                            }
                                        }
                                        
                                        var p = localStorage["infoSticker-pinned"];
                                        var t = localStorage["infoSticker-top"];
                                        if (p != null && t != null) {
                                            var tn;
                                            try {
                                                this.pinned = p == "true";
                                                if (this.pinned) {
                                                    tn = parseInt(t, 10);
                                                    top = tn;
                                                }
                                            } catch (etn) {}
                                        }
                                        this.mcvHide = localStorage["infoSticker-mcvHide"] == "true";
                                        this.repairHide = localStorage["infoSticker-repairHide"] == "true";
                                        this.resourceHide = localStorage["infoSticker-resourceHide"] == "true";
                                        this.productionHide = localStorage["infoSticker-productionHide"] == "true";
                                    }
                                    
                                    
                                    app.getDesktop().add(this.infoSticker, {
                                        right: 124,
                                        top: top
                                    });
                                    if(this.locked) {
                                        this.infoSticker.hide();
                                    }

                                    this.stickerBackground = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                        //paddingLeft: 5,
                                        width: 105,
                                        decorator: new qx.ui.decoration.Background().set({
                                            backgroundImage: "webfrontend/ui/common/bgr_region_world_select_scaler.png",
                                            backgroundRepeat: "scale",
                                        })
                                    });
                                    
                                    this.createMCVPane();
                                    this.createMCVPopup();
									
                                    if(this.locked && this.pinned) {
                                        this.menuUpButton.setEnabled(true);
                                        this.menuDownButton.setEnabled(true);
                                    } else {
                                        this.menuUpButton.setEnabled(false);
                                        this.menuDownButton.setEnabled(false);
                                    }
                                    
                                    this.top_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.top_image);

                                    this.infoSticker.add(this.stickerBackground);
                                    //this.infoSticker.add(this.mcvPopup);

                                    this.bot_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.bot_image);

                                    this.runPositionTimer();

                                    try {
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.currentCityChange);
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "Change", ClientLib.Data.CitiesChange, this, this.citiesChange);
                                    } catch(eventError) {
                                        console.log("InfoSticker.EventAttach:", eventError);
                                        console.log("The script will continue to run, but with slower response speed.");
                                    }
                                }
                                this.disposeRecover();
                                
                                if (cd == null) {
                                    if (this.mcvPopup) {
                                        //this.mcvInfoLabel.setValue("MCV ($???)");
                                        this.mcvInfoLabel.setValue("MCV<br>$???");
                                        this.mcvTimerLabel.setValue("Loading");
                                    }
                                } else {
                                    var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                                    var resourcesNeeded = [];
                                    for (var i in nextLevelInfo.rr) {
                                        if (nextLevelInfo.rr[i].t > 0) {
                                            resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                                        }
                                    }
                                    //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                                    //var currentResearchPoints = player.get_ResearchPoints();
                                    var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                                    var creditsResourceData = player.get_Credits();
                                    var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                                    var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
                                    this.mcvInfoLabel.setValue("MCV ($ " + this.formatNumbersCompact(creditsNeeded) + ")");
                                    //this.mcvInfoLabel.setValue("MCV<br>$" + this.formatNumbersCompact(creditsNeeded));
                                    this.mcvTimerCreditProdLabel.setValue("at " + this.formatNumbersCompact(creditGrowthPerHour) + "/h");
                                    if (creditTimeLeftInHours <= 0) {
                                        this.mcvTimerLabel.setValue("Ready");
                                    } else if (creditGrowthPerHour == 0) {
                                        this.mcvTimerLabel.setValue("Never");
                                    } else {
                                        if(creditTimeLeftInHours >= 24 * 100) {
                                            this.mcvTimerLabel.setValue("> 99 days");
                                        } else {
                                            this.mcvTimerLabel.setValue(this.FormatTimespan(creditTimeLeftInHours * 60 * 60));
                                        }
                                    }
                                }

                                var ncity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                if (ncity == null) {
                                    if (this.mcvPopup) {
                                        this.repairTimerLabel.setValue("Select a base");

                                        this.resourceLabel1.setValue("N/A");
                                        this.resourceLabel2.setValue("N/A");
                                        this.resourceLabel3.setValue("N/A");
                                    }
                                } else {

                                    var rt = Math.min(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
                                    if (ncity.get_CityUnitsData().get_UnitLimitOffense() == 0) {
                                        this.repairTimerLabel.setValue("No army");
                                    } else {
                                        this.repairTimerLabel.setValue(this.FormatTimespan(rt));
                                    }

                                    var tib = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                                    var tibMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                                    var tibRatio = tib / tibMax;
                                    this.resourceLabel1.setTextColor(this.formatNumberColor(tib, tibMax));
                                    this.resourceLabel1.setValue(this.formatNumbersCompact(tib));
                                    this.resourceLabel1per.setValue(this.formatPercent(tibRatio));

                                    var cry = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                                    var cryMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                                    var cryRatio = cry / cryMax;
                                    this.resourceLabel2.setTextColor(this.formatNumberColor(cry, cryMax));
                                    this.resourceLabel2.setValue(this.formatNumbersCompact(cry));
                                    this.resourceLabel2per.setValue(this.formatPercent(cryRatio));

                                    var power = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                                    var powerMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                                    var powerRatio = power / powerMax;
                                    this.resourceLabel3.setTextColor(this.formatNumberColor(power, powerMax));
                                    this.resourceLabel3.setValue(this.formatNumbersCompact(power));
                                    this.resourceLabel3per.setValue(this.formatPercent(powerRatio));

                                    var powerCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
                                    var powerBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
                                    var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var powerAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    var powerProd = powerCont + powerBonus + powerAlly;

                                    var creditCont = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditBonus = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditProd = creditCont + creditBonus;

                                    this.productionLabelPower.setValue(this.formatNumbersCompact(powerProd) + "/h");
                                    this.productionLabelCredit.setValue(this.formatNumbersCompact(creditProd) + "/h");
                                }
                            } catch (e) {
                                console.log("InfoSticker.calculateInfoData", e.toString());
                            }
                        },
                        formatPercent: function (value) {
                            return value > 999 / 100 ? ">999%" : this.formatNumbersCompact(value * 100, 0) + "%";
                            //return this.formatNumbersCompact(value*100, 0) + "%";
                        },
                        formatNumberColor: function (value, max) {
                            var ratio = value / max;

                            var color;
                            var black = [40, 180, 40];
                            var yellow = [181, 181, 0];
                            var red = [187, 43, 43];

                            if (ratio < 0.5) color = black;
                            else if (ratio < 0.75) color = this.interpolateColor(black, yellow, (ratio - 0.5) / 0.25);
                            else if (ratio < 1) color = this.interpolateColor(yellow, red, (ratio - 0.75) / 0.25);
                            else color = red;

                            //console.log(qx.util.ColorUtil.rgbToHexString(color));
                            return qx.util.ColorUtil.rgbToHexString(color);
                        },
                        interpolateColor: function (color1, color2, s) {
                            //console.log("interp "+s+ " " + color1[1]+" " +color2[1]+" " +(color1[1]+s*(color2[1]-color1[1])));
                            return [Math.floor(color1[0] + s * (color2[0] - color1[0])),
                            Math.floor(color1[1] + s * (color2[1] - color1[1])),
                            Math.floor(color1[2] + s * (color2[2] - color1[2]))];
                        },
                        formatNumbersCompact: function (value, decimals) {
                            if (decimals == undefined) decimals = 2;
                            var valueStr;
                            var unit = "";
                            if (value < 1000) valueStr = value.toString();
                            else if (value < 1000 * 1000) {
                                valueStr = (value / 1000).toString();
                                unit = "k";
                            } else if (value < 1000 * 1000 * 1000) {
                                valueStr = (value / 1000000).toString();
                                unit = "M";
                            } else {
                                valueStr = (value / 1000000000).toString();
                                unit = "G";
                            }
                            if (valueStr.indexOf(".") >= 0) {
                                var whole = valueStr.substring(0, valueStr.indexOf("."));
                                if (decimals === 0) {
                                    valueStr = whole;
                                } else {
                                    var fraction = valueStr.substring(valueStr.indexOf(".") + 1);
                                    if (fraction.length > decimals) fraction = fraction.substring(0, decimals);
                                    valueStr = whole + "." + fraction;
                                }
                            }

                            valueStr = valueStr + unit;
                            return valueStr;
                        },
                        FormatTimespan: function (value) {
                            var i;
                            var t = ClientLib.Vis.VisMain.FormatTimespan(value);
                            var colonCount = 0;
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') colonCount++;
                            }
                            var r = "";
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') {
                                    if (colonCount > 2) {
                                        r += "d ";
                                    } else {
                                        r += t.charAt(i);
                                    }
                                    colonCount--;
                                } else {
                                    r += t.charAt(i);
                                }
                            }
                            return r;
                        }
                    }
                });
            }
        } catch (e) {
            console.log("InfoSticker: createInfoSticker: ", e.toString());
        }

        function InfoSticker_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    createInfoSticker();
                    window.InfoSticker.Base.getInstance().initialize();
                } else {
                    window.setTimeout(InfoSticker_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("InfoSticker_checkIfLoaded: ", e.toString());
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(InfoSticker_checkIfLoaded, 1000);
        }
    }
    try {
        var InfoStickerScript = document.createElement("script");
        InfoStickerScript.innerHTML = "(" + InfoSticker_main.toString() + ")();";
        InfoStickerScript.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(InfoStickerScript);
        }
    } catch (e) {
        console.log("InfoSticker: init error: ", e.toString());
    }
})(); 


/***********************************************************************************
Tiberium Alliances Formation Saver
***********************************************************************************/

// ==UserScript==
// @name           Tiberium Alliances Formation Saver
// @description    Allows you to save attack formations
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        2.1.9
// @author         Panavia
// ==/UserScript==

(function (){
  var tafs_main = function() {
    var windowSaver;
      
    function initialize() {
      console.log("Formation Saver Loaded");

      qx.Class.define("webfrontend.gui.PlayArea.FormationSaver", {
        extend: qx.ui.container.Composite,

        construct:function() {
          qx.ui.container.Composite.call(this);
          this.setLayout(new qx.ui.layout.Canvas());
          this.add(this.init());
        },

        statics: {
          SaverCollapsedHeight: 32,
          SaverExpandedHeight: 245,
        },

        properties: {
          expanded: {init: true, apply: "expand"},
        },

        members: {
          buttonResize: null,
          containerContence: null,
          containerSaves: null,
          containerMain: null,
          buttonSave: null,

          init: function() {          
            var Y = 6;
            this.buttonResize = new webfrontend.ui.SoundButton(null, "FactionUI/icons/icon_tracker_minimise.png").set({width: 20, height: 20, appearance: "button-notif-cat", center: true, allowGrowX: false});
            this.buttonResize.addListener("click",function(e) {
              this.setExpanded(!this.getExpanded());
            }, this);
            var ba = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({alignY:"middle"})).set({margin:Y,marginRight:Y+3});
            ba.add(this.buttonResize);
            var labelTitle = new qx.ui.basic.Label("<b>Saver</b>");
            labelTitle.set({marginLeft: 4, rich: true});
            labelTitle.setTextColor("#FFFFFF");
            ba.add(labelTitle);
            this.containerContence = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"center"})).set({allowGrowX:true,marginTop:0,marginBottom:5});

            containerSaves = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 2)).set({allowGrowX: true , marginLeft: 0, marginBottom: 5});
            this.containerContence.add(containerSaves);

            buttonSave = new qx.ui.form.Button("Save");
            buttonSave.set({width: 50, appearance: "button-text-small", toolTipText: "Save attack formation", allowGrowX:false});
            buttonSave.addListener("click", this.save, this); 
            this.containerContence.add(buttonSave);

            this.containerMain=new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"right"})).set({maxHeight:webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight,width:75,minHeight:32,allowShrinkY:true,decorator:new qx.ui.decoration.VBox().set({baseImage:"webfrontend/ui/common/bgr_mission_tracker.png"})});
            this.containerMain.add(ba);
            this.containerMain.add(this.containerContence,{flex:1});

            return this.containerMain;
          },

          expand: function(bs) {
            if(!bs) {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_maximise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverCollapsedHeight);
            } else {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_minimise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight);
            }
          },

          update: function() {
            containerSaves.removeAll();

            var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
            var currentOwnCity = playerCities.get_CurrentOwnCity();
            var cityID = playerCities.get_CurrentCity().get_Id();
            var ownCityID = currentOwnCity.get_Id();

            var formations = this.loadFormations();
            if(!formations) {
              return;
            }
            if(!formations[cityID]) {
              return;
            }
            if(!formations[cityID][ownCityID]) {
              return;
            }

            var i = 0;
            for(var id in formations[cityID][ownCityID]) {
              if(id != 0) {
                i++;
                var formation = formations[cityID][ownCityID][id];
                var date = new Date(Number(formation.t));
                var toolTipText = "<div><span style='float: left'><b>" + formation.n + "</b></span><span style='float: right'>&nbsp;&nbsp;&nbsp;&nbsp;" + date.getHours() + ":" + (date.getMinutes() <= 9 ? "0" : "") + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth() + 1) + "</span></div><div style='clear: both;'></div>";
                if(formation.cy != null) {
                  toolTipText += formation.cy + "% Construction Yard</br>" + formation.df + "% Defense Facility</br>" + formation.ts + "% Troop Strength</br>" + this.formatSecondsAsTime(formation.r) + " Repair Time";
                }

                var labelLoad = new qx.ui.basic.Label(formation.n);
                labelLoad.set({width: 40, allowGrowX: false, toolTipText: toolTipText});
                labelLoad.setTextColor("#FFFFFF");
                labelLoad.addListener("click", this.clickLoad(formation), this);
                labelLoad.addListener("mouseover", this.mouseover(labelLoad, "#BBBBBB"), this);
                labelLoad.addListener("mouseout", this.mouseout(labelLoad, "#FFFFFF"), this);
                containerSaves.add(labelLoad, {row: i, column: 1});

                var labelDelete = new qx.ui.basic.Label("<b>X</b>");
                labelDelete.set({width: 10, allowGrowX:false, rich: true, toolTipText: "Delete " + formation.n});
                labelDelete.setTextColor("#881717");
                labelDelete.addListener("click", this.clickDeleteF(cityID, ownCityID, id), this);
                labelDelete.addListener("mouseover", this.mouseover(labelDelete, "#550909"), this);
                labelDelete.addListener("mouseout", this.mouseover(labelDelete, "#881717"), this);
                containerSaves.add(labelDelete, {row: i, column: 2});
              }
            }
          },

          mouseover: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          mouseout: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          save: function() {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              var ownCityID = currentOwnCity.get_Id();
 
              var newFormation = new Object();
              newFormation.t = new Date().getTime().toString();
              newFormation.n = "";
              newFormation.l = new Array();

              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor saving!");
                return;
              }
              armyUnits = armyUnits.l;
              for(var i in armyUnits)
              {
                var unit = armyUnits[i];
                newFormation.l[i] = new Object();
                newFormation.l[i].x = unit.get_CoordX();
                newFormation.l[i].y = unit.get_CoordY();
                newFormation.l[i].e = unit.get_Enabled();
              }

              var formations = this.loadFormations();
              if(!formations) {
                formations = new Object();
              }
              if(!formations[cityID]) {
                formations[cityID] = new Object();
              }
              if(!formations[cityID][ownCityID]) {
                formations[cityID][ownCityID] = new Array();
                formations[cityID][ownCityID][0] = 0;
              }
              formations[cityID][ownCityID][0]++;
              newFormation.n = "Save " + formations[cityID][ownCityID][0];
              
              formations[cityID][ownCityID].push(newFormation);
              this.saveFormations(formations);

              windowSaver.update();
            } catch(e) {
              console.log(e);
            }
          },

          clickLoad: function(newFormation) {
            return function() {
              this.load(newFormation);
            }
          },

          load: function(newFormation) {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities();
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              
              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor loading!");
                return;
              }
              armyUnits = armyUnits.l;

              for(var i in newFormation.l)
              {
                var unitData = newFormation.l[i];
                armyUnits[i].MoveBattleUnit(unitData.x, unitData.y);
                if(unitData.e != null) {
                  if(armyUnits[i].set_Enabled_Original) {
                    armyUnits[i].set_Enabled_Original(unitData.e);
                  } else {
                    armyUnits[i].set_Enabled(unitData.e);
                  }
                }
              }

              //formation.set_CurrentTargetBaseId(cityID);
            } catch(e) {
              console.log(e);
            }
          },

          clickDeleteF: function(cityID, ownCityID, id) {
            return function() {
              this.deleteF(cityID, ownCityID, id);
            }
          },

          deleteF: function(cityID, ownCityID, id) {
            var formations = this.loadFormations();
            if(!formations || !formations[cityID] || !formations[cityID][ownCityID])
              return;

            formations[cityID][ownCityID].splice(id, 1);
            if(formations[cityID][ownCityID].length <= 1) {
              delete formations[cityID][ownCityID];
            }
            var i
            for(i in formations[cityID]) {
              if(formations[cityID].hasOwnProperty(i)) {
                break;
              }
            }
            if(!i)
              delete formations[cityID];

            this.saveFormations(formations);

            windowSaver.update();
          },

          saveFormations: function(formations) {
            var data = JSON.stringify(formations);
            localStorage.formations = data;
          },

          loadFormations: function() {
            var formations = localStorage.formations;
            return formations && JSON.parse(formations);
          },
          
          formatSecondsAsTime: function(secs, format) {
            var hr = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600)) / 60);
            var sec = Math.floor(secs - (hr * 3600) - (min * 60));

            if(hr < 10) {
              hr = "0" + hr;
            }
            if(min < 10) {
              min = "0" + min;
            }
            if(sec < 10) {
              sec = "0" + sec;
            }
            
            return hr + ':' + min + ':' + sec;
          },
        }
      })
      
      windowSaver = new webfrontend.gui.PlayArea.FormationSaver();
      windowSaver.hide();
      qx.core.Init.getApplication().getPlayArea().add(windowSaver, {top: 55, right: -2});
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId = function(a) {
        this.__tafs__set_CurrentOwnCityId(a); 
        updateView();
      }
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId = function(a) {
        this.__tafs__set_CurrentCityId(a); 
        updateView();
      }
      
      function updateView() {
        if (PerforceChangelist >= 376877) {
          switch(qx.core.Init.getApplication().getPlayArea().getViewMode()) {
            case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense:
            case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupBase:
              windowSaver.update();
              windowSaver.show();
              break;
            default:
              windowSaver.hide();
          }          
        } else {
          switch(qx.core.Init.getApplication().getPlayArea().getViewMode()) {
            case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense:
            case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupBase:
              windowSaver.update();
              windowSaver.show();
              break;
            default:
              windowSaver.hide();
          }
        }
      }
    }

    function tafs_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tafs_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tafs_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tafs_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tafsScript = document.createElement("script");
  tafsScript.innerHTML = "(" + tafs_main.toString() + ")();";
  tafsScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tafsScript);
  }
})();


// ==UserScript==
// @name            WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army
// @description     Upgrade your Base,Defense Army to a specific Level.
// @author          Eistee
// @version         13.07.20
// @namespace       http*://*.alliances.commandandconquer.com/*
// @include         http*://*.alliances.commandandconquer.com/*
// @require         http://usocheckup.redirectme.net/167564.js
// @icon            http://s3.amazonaws.com/uso_ss/icon/167564/large.png
// @updateURL       https://userscripts.org/scripts/source/167564.meta.js
// @downloadURL     https://userscripts.org/scripts/source/167564.user.js
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==
(function () {
    var injectFunction = function () {
        function createClasses() {
            qx.Class.define("Upgrade", {
                type: "singleton",
                extend: qx.core.Object,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();

                        var btnUpgrade = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png").set({
                            toolTipText: qxApp.tr("tnf:toggle upgrade mode"),
                            alignY: "middle",
                            show: "icon",
                            width : 60,
                            allowGrowX : false,
                            allowGrowY : false,
                            appearance : "button"
                        });
                        btnUpgrade.addListener("click", this.toggleWindow, this);

                        var btnTrade = qx.core.Init.getApplication().getPlayArea().getHUD().getUIItem(ClientLib.Data.Missions.PATH.WDG_TRADE);
                        btnTrade.getLayoutParent().addAfter(btnUpgrade, btnTrade);
                    } catch (e) {
                        console.log("Error setting up Upgrade Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    toggleWindow: function () {
                        if (Upgrade.Window.getInstance().isVisible()) Upgrade.Window.getInstance().close();
                        else Upgrade.Window.getInstance().open();
                    }
                }
            });
            qx.Class.define("Upgrade.Window", {
                type: "singleton",
                extend: qx.ui.window.Window,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();
                        this.base(arguments);
                        this.set({
                            layout: new qx.ui.layout.VBox().set({ spacing: 0 }),
                            contentPadding: 5,
                            contentPaddingTop: 0,
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            resizable: false
                        });
                        this.moveTo(124, 31);
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

                        var cntCurrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntCurrent.add(this.titCurrent = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));
                        cntCurrent.add(this.selCurrent = new qx.ui.basic.Label("").set({ alignX: "center" }));
                        var cntCurrentHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntCurrentHBox.add(new qx.ui.basic.Label(qxApp.tr("tnf:level:")).set({ alignY: "middle" }));
                        cntCurrentHBox.add(this.txtCurrent = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
                        cntCurrentHBox.add(this.btnCurrent = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
                        this.txtCurrent.addListener("changeValue", this.onInputCurrent, this);
                        this.btnCurrent.addListener("execute", this.onUpgradeCurrent, this);
                        cntCurrent.add(cntCurrentHBox);
                        var cntCurrentRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntCurrentRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntCurrentRes.add(this.tibCurrent = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        cntCurrentRes.add(this.cryCurrent = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        cntCurrentRes.add(this.powCurrent = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.tibCurrent.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                        this.cryCurrent.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                        this.powCurrent.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                        this.tibCurrent.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.cryCurrent.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.powCurrent.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        cntCurrent.add(cntCurrentRes);
                        this.add(cntCurrent);

                        var cntAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntAll.add(this.titAll = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));
                        var cntAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntAllHBox.add(new qx.ui.basic.Label(qxApp.tr("tnf:level:")).set({ alignY: "middle" }));
                        cntAllHBox.add(this.txtAll = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
                        cntAllHBox.add(this.btnAll = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
                        this.txtAll.addListener("changeValue", this.onInputAll, this);
                        this.btnAll.addListener("execute", this.onUpgradeAll, this);
                        cntAll.add(cntAllHBox);
                        var cntAllRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntAllRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntAllRes.add(this.tibAll = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        cntAllRes.add(this.cryAll = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        cntAllRes.add(this.powAll = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.tibAll.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                        this.cryAll.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                        this.powAll.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                        this.tibAll.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.cryAll.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.powAll.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        cntAll.add(cntAllRes);
                        this.add(cntAll);

                        this.addListener("appear", this.onOpen, this);
                        this.addListener("close", this.onClose, this);
                    } catch (e) {
                        console.log("Error setting up Upgrade.Window Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    Current: null,
                    titCurrent: null,
                    selCurrent: null,
                    txtCurrent: null,
                    btnCurrent: null,
                    tibCurrent: null,
                    cryCurrent: null,
                    powCurrent: null,
                    titAll: null,
                    txtAll: null,
                    btnAll: null,
                    tibAll: null,
                    cryAll: null,
                    powAll: null,
                    onOpen: function () {
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                        this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
                    },
                    onClose: function () {
                        phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                        phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                    },
                    onViewModeChanged: function (oldMode, newMode) {
                        if (oldMode !== newMode) {
                            var qxApp = qx.core.Init.getApplication();
                            switch (newMode) {
                            case ClientLib.Vis.Mode.City:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:base"));
                                this.setIcon("FactionUI/icons/icon_arsnl_base_buildings.png");
                                this.titCurrent.setValue(qxApp.tr("Selected building"));
                                this.titAll.setValue(qxApp.tr("All buildings"));
                                this.resetAll();
                                this.resetCurrent();
                                break;
                            case ClientLib.Vis.Mode.DefenseSetup:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:defense"));
                                this.setIcon("FactionUI/icons/icon_def_army_points.png");
                                this.titCurrent.setValue(qxApp.tr("Selected defense unit"));
                                this.titAll.setValue(qxApp.tr("All defense units"));
                                this.resetAll();
                                this.resetCurrent();
                                break;
                            case ClientLib.Vis.Mode.ArmySetup:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:offense"));
                                this.setIcon("FactionUI/icons/icon_army_points.png");
                                this.titCurrent.setValue(qxApp.tr("Selected army unit"));
                                this.titAll.setValue(qxApp.tr("All army units"));
                                this.resetAll();
                                this.resetCurrent();
                                break;
                            default:
                                this.close();
                                break;
                            }
                        }
                    },
                    onSelectionChange: function (oldObj, newObj) {
                        if (newObj != null) {
                            switch (newObj.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                this.Current = newObj;
                                var name = newObj.get_BuildingName();
                                var level = newObj.get_BuildingLevel();
                                this.selCurrent.setValue(name + " (" + level + ")");
                                this.txtCurrent.setMinimum(level + 1);
                                this.txtCurrent.setMaximum(level + 51);
                                this.txtCurrent.setValue(level + 1);
                                this.txtCurrent.setEnabled(true);
                                this.btnCurrent.setEnabled(true);
                                this.onInputCurrent();
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                this.Current = newObj;
                                var name = newObj.get_UnitName();
                                var level = newObj.get_UnitLevel();
                                this.selCurrent.setValue(name + " (" + level + ")");
                                this.txtCurrent.setMinimum(level + 1);
                                this.txtCurrent.setMaximum(level + 51);
                                this.txtCurrent.setValue(level + 1);
                                this.txtCurrent.setEnabled(true);
                                this.btnCurrent.setEnabled(true);
                                this.onInputCurrent();
                                break;
                            }
                        }
                    },
                    onCurrentCityChange: function (oldObj, newObj) {
                        if (oldObj !== newObj) {
                            this.resetAll();
                            this.resetCurrent();
                        }
                    },
                    GetCurrentUpgradeCostsToLevel: function (Current, newLevel) {
                        var costs = null;
                        if (Current !== null && newLevel > 0) {
                            switch (Current.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                if (newLevel > Current.get_BuildingLevel())
                                    costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForBuildingToLevel(Current.get_BuildingDetails(), newLevel);
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                                if (newLevel > Current.get_UnitLevel())
                                    costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForUnitToLevel(Current.get_UnitDetails(), newLevel);
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                if (newLevel > Current.get_UnitLevel())
                                    costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForUnitToLevel(Current.get_UnitDetails(), newLevel);
                                break;
                            }
                        }
                        return costs;
                    },
                    resetCurrent: function () {
                        this.Current = null;
                        this.selCurrent.setValue("-");
                        this.txtCurrent.setMinimum(0);
                        this.txtCurrent.setMaximum(0);
                        this.txtCurrent.resetValue();
                        this.txtCurrent.setEnabled(false);
                        this.btnCurrent.setEnabled(false);
                        this.onInputCurrent();
                    },
                    onInputCurrent: function () {
                        var costs = this.GetCurrentUpgradeCostsToLevel(this.Current, parseInt(this.txtCurrent.getValue(), 10));
                        if (costs !== null) {
                            for (var i = 0, Tib = 0, Cry = 0, Pow = 0; i < costs.length; i++) {
                                var uCosts = costs[i];
                                var cType = parseInt(uCosts.Type, 10);
                                switch (cType) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    Tib += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Crystal:
                                    Cry += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Power:
                                    Pow += uCosts.Count;
                                    break;
                                }
                            }
                            this.tibCurrent.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib));
                            this.tibCurrent.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                            if (Tib === 0) this.tibCurrent.exclude();
                            else this.tibCurrent.show();
                            this.cryCurrent.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry));
                            this.cryCurrent.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                            if (Cry === 0) this.cryCurrent.exclude();
                            else this.cryCurrent.show();
                            this.powCurrent.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow));
                            this.powCurrent.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                            if (Pow === 0) this.powCurrent.exclude();
                            else this.powCurrent.show();
                        } else {
                            this.tibCurrent.setLabel("-");
                            this.tibCurrent.resetToolTipText();
                            this.tibCurrent.show();
                            this.cryCurrent.setLabel("-");
                            this.cryCurrent.resetToolTipText();
                            this.cryCurrent.show();
                            this.powCurrent.setLabel("-");
                            this.powCurrent.resetToolTipText();
                            this.powCurrent.show();
                        }
                    },
                    onUpgradeCurrent: function() {
                        var newLevel = parseInt(this.txtCurrent.getValue(), 10);
                        if (newLevel > 0 && this.Current !== null) {
                            switch (this.Current.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                if (newLevel > this.Current.get_BuildingLevel()) {
                                    ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(this.Current.get_BuildingDetails(), newLevel);
                                    this.onSelectionChange(null, this.Current);
                                }
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                                if (newLevel > this.Current.get_UnitLevel()) {
                                    ClientLib.API.Defense.GetInstance().UpgradeUnitToLevel(this.Current.get_UnitDetails(), newLevel);
                                    this.onSelectionChange(null, this.Current);
                                }
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                if (newLevel > this.Current.get_UnitLevel()) {
                                    ClientLib.API.Army.GetInstance().UpgradeUnitToLevel(this.Current.get_UnitDetails(), newLevel);
                                    this.onSelectionChange(null, this.Current);
                                }
                                break;
                            }
                        }
                    },
                    GetAllUpgradeCostsToLevel: function (newLevel) {
                        if (newLevel > 0) {
                            switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
                            case ClientLib.Vis.Mode.City:
                                return ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(newLevel);
                            case ClientLib.Vis.Mode.DefenseSetup:
                                return ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
                            case ClientLib.Vis.Mode.ArmySetup:
                                return ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
                            }
                        }
                        return null;
                    },
                    calcAllLowLevel: function () {
                        for (var newLevel = 1, Tib = 0, Cry = 0, Pow = 0; Tib === 0 && Cry === 0 && Pow === 0 && newLevel < 1000; newLevel++) {
                            var costs = this.GetAllUpgradeCostsToLevel(newLevel);
                            if (costs !== null) {
                                for (var i = 0; i < costs.length; i++) {
                                    var uCosts = costs[i];
                                    var cType = parseInt(uCosts.Type, 10);
                                    switch (cType) {
                                    case ClientLib.Base.EResourceType.Tiberium:
                                        Tib += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Crystal:
                                        Cry += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Power:
                                        Pow += uCosts.Count;
                                        break;
                                    }
                                }
                            }
                        }
                        return (newLevel === 1000?0:(newLevel - 1));
                    },
                    resetAll: function () {
                        var allLowLevel = this.calcAllLowLevel();
                        if (allLowLevel > 0) {
                            this.txtAll.setMinimum(allLowLevel);
                            this.txtAll.setMaximum(allLowLevel + 50);
                            this.txtAll.setValue(allLowLevel);
                            this.txtAll.setEnabled(true);
                            this.btnAll.setEnabled(true);
                        } else {
                            this.txtAll.setMinimum(0);
                            this.txtAll.setMaximum(0);
                            this.txtAll.resetValue();
                            this.txtAll.setEnabled(false);
                            this.btnAll.setEnabled(false);
                        }
                        this.onInputAll();
                    },
                    onInputAll: function () {
                        var newLevel = parseInt(this.txtAll.getValue(), 10);
                        var costs = this.GetAllUpgradeCostsToLevel(newLevel);
                        if (newLevel > 0 && costs !== null) {
                            for (var i = 0, Tib = 0, Cry = 0, Pow = 0; i < costs.length; i++) {
                                var uCosts = costs[i];
                                switch (parseInt(uCosts.Type, 10)) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    Tib += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Crystal:
                                    Cry += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Power:
                                    Pow += uCosts.Count;
                                    break;
                                }
                            }
                            this.tibAll.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib));
                            this.tibAll.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                            if (Tib === 0) this.tibAll.exclude();
                            else this.tibAll.show();
                            this.cryAll.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry));
                            this.cryAll.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                            if (Cry === 0) this.cryAll.exclude();
                            else this.cryAll.show();
                            this.powAll.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow));
                            this.powAll.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                            if (Pow === 0) this.powAll.exclude();
                            else this.powAll.show();
                        } else {
                            this.tibAll.setLabel("-");
                            this.tibAll.resetToolTipText();
                            this.tibAll.show();
                            this.cryAll.setLabel("-");
                            this.cryAll.resetToolTipText();
                            this.cryAll.show();
                            this.powAll.setLabel("-");
                            this.powAll.resetToolTipText();
                            this.powAll.show();
                        }
                    },
                    onUpgradeAll: function () {
                        var newLevel = parseInt(this.txtAll.getValue(), 10);
                        if (newLevel > 0) {
                            switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
                            case ClientLib.Vis.Mode.City:
                                ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
                                this.resetAll()
                                break;
                            case ClientLib.Vis.Mode.DefenseSetup:
                                ClientLib.API.Defense.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                                this.resetAll()
                                break;
                            case ClientLib.Vis.Mode.ArmySetup:
                                ClientLib.API.Army.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                                this.resetAll()
                                break;
                            }
                        }
                    }
                }
            });
        }
        function translation() {
            var localeManager = qx.locale.Manager.getInstance();

            // Default language is english (en)
            // Available Languages are: ar,ce,cs,da,de,en,es,fi,fr,hu,id,it,nb,nl,pl,pt,ro,ru,sk,sv,ta,tr,uk
            // You can send me translations so i can include them in the Script.

            // German
            localeManager.addTranslation("de", {
                "Selected building": "Markiertes Gebäude",
                "All buildings": "Alle Gebäude",
                "Selected defense unit": "Markierte Abwehrstellung",
                "All defense units": "Alle Abwehrstellungen",
                "Selected army unit": "Markierte Armee-Einheit",
                "All army units": "Alle Armee-Einheiten"
            });
        }
        function waitForGame() {
            try {
                if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loading");
                            translation();
                            createClasses();
                            Upgrade.getInstance();
                            Upgrade.Base.getInstance();
                            Upgrade.Defense.getInstance();
                            Upgrade.Army.getInstance();
                            console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loaded");
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        window.setTimeout(waitForGame, 1000);
                    }
                } else {
                    window.setTimeout(waitForGame, 1000);
                }
            } catch (e) {
                console.log(e);
            }
        }
        window.setTimeout(waitForGame, 1000);
    };

    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";

    document.getElementsByTagName("head")[0].appendChild(script);
})();


// ==UserScript==
// @name Command & Conquer TA POIs Analyser
// @description Display alliance's POIs scores and next tier requirements.
// @namespace https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.5.1
// @grant none
// @author zdoom
// @updateURL rem https://userscripts.org/scripts/source/171353.meta.js
// @downloadURL rem https://userscripts.org/scripts/source/171353.user.js
// ==/UserScript==

(function(){

function create_ccta_pa_class()
{
qx.Class.define('ccta_pa',
{
type: 'singleton',
extend: qx.ui.tabview.Page,

construct: function()
{
try
{
this.base(arguments);
this.setLayout(new qx.ui.layout.Grow());
this.set({label: "Alliance POIs", padding: 10});

var root = this;

var label = new qx.ui.basic.Label("Made by zdoom.");
label.set({
textColor: "text-value",
font: "font_size_13",
padding: 10
});

var img = new qx.ui.basic.Image('http://archeikhmeri.co.uk/images/fop.png');
img.setAlignX("center");

var scrl = new qx.ui.container.Scroll();

var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
cont.set({allowGrowY: true, padding: 10});

var gb = new qx.ui.groupbox.GroupBox("Statistics");
gb.setLayout(new qx.ui.layout.VBox());
gb.setMarginLeft(2);

var lgb = new webfrontend.gui.GroupBoxLarge('POIs');
lgb.setLayout(new qx.ui.layout.Canvas());

var lgbc = new qx.ui.container.Composite(new qx.ui.layout.VBox());
lgbc.setPadding(60,10,40,10);

var widget = new qx.ui.core.Widget();
widget.setMinWidth(628);
widget.setMinHeight(335);

var html = new qx.html.Element('div', null, {id: "graph"});

var info = new qx.ui.groupbox.GroupBox("Additional Information");
info.setLayout(new qx.ui.layout.VBox());
info.setMarginTop(10);

var grid = new qx.ui.container.Composite(new qx.ui.layout.Grid(2,1));

var buttonCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
buttonCont.setMarginTop(10);

var tableCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
tableCont.setMinWidth(500);

grid.add(buttonCont, {row: 1, column: 1});
grid.add(tableCont, {row: 1, column: 2});

var noAllianceLabel = new qx.ui.basic.Label('Loading data, please wait....');

var createTable = function(){
var score = root.__score, multiplier = root.__multiplier, bonus = root.__bonus;
var scoreData = function(){
var arr = [];
for(var x in score){
arr.push([x, score[x]]);
};
return arr;
};
var multiplierData = function(){
var arr = [];
for(var x in multiplier){
if(x != 0) arr.push([parseInt(x), multiplier[x] + "%"]);
};
return arr;
};
var bonusData = function(){
var arr = [];
bonus.map(function(key){
arr.push([key[4], key[0], key[2], key[3] + "%"]);
});
return arr;
};

var columns = [["POI Level", "Score"], ["Tier", "Score Required", "Bonus", "Percentage"], ["Rank", "Multiplier"]];
var rows = [scoreData(), bonusData(), multiplierData()];

var make = function(n){
var model = new qx.ui.table.model.Simple();
model.setColumns(columns[n]);
model.setData(rows[n]);
var table = new qx.ui.table.Table(model);
table.setColumnVisibilityButtonVisible(false);
table.setHeaderCellHeight(25);
table.setMarginTop(20);
table.setMinWidth(500);
var renderer = new qx.ui.table.cellrenderer.Default();
renderer.setUseAutoAlign(false);
for (i = 0; i < columns[n].length; i++){
table.getTableColumnModel().setDataCellRenderer(i, renderer);
}
return table;
};

this.score = make(0);
this.bonus = make(1);
this.multiplier = make(2);
};
var tables = new createTable();

[['Scores', 'score'], ['Muliplier', 'multiplier'], ['Tiers', 'bonus']].map(function(key){
var table = tables[key[1]];
table.setColumnVisibilityButtonVisible(false);
table.setHeaderCellHeight(25);
table.setMarginTop(20);
table.setMinWidth(500);

var button = new qx.ui.form.Button(key[0]);
button.setWidth(100);
button.setMargin(10, 10, 0, 10);
button.addListener('execute', function(){
tableCont.removeAll();
tableCont.add(table);
}, this);

buttonCont.add(button);
});

tableCont.add(tables.score);
info.add(grid);

Element.prototype.css = function(arr){
for(var prop in arr){
this.style[prop] = arr[prop];
}
};

Element.prototype.prop = function(arr){
for(var prop in arr){
this[prop] = arr[prop];
}
};

Number.prototype.format = function(){
var f = "", n = this.toString();
if(n.length < 3) return this;
for(i = 0; i < n.length; i++){
(((n.length - i) % 3 === 0) && (i !== 0)) ? f += "," + n[i] : f += n[i];
}
return f;
};

this.add(scrl);
scrl.add(cont);
cont.add(img);
cont.add(lgb);
cont.add(label);
lgb.add(lgbc);
lgbc.add(gb);
lgbc.add(info);
widget.getContentElement().add(html);
gb.add(noAllianceLabel);

this.__timer = new qx.event.Timer(1000);
this.__groupBox = gb;
this.__widget = widget;
this.__label = noAllianceLabel;
this.addListener('appear', this.__updateGraph, this);
this.__timer.addListener('interval', this.__updateGraph, this);

var tabview = webfrontend.gui.alliance.AllianceOverlay.getInstance().__bvJ;
tabview.addAt(this, 0);
tabview.setSelection(this);
}
catch(e)
{
console.log(e.toString());
}
},
destruct: function(){},
members:
{
__widget: null,
__groupBox: null,
__label: null,
__loaded: false,
__timer: null,
__allianceName: null,
__pois: null,
__multiplier: {1:100, 2:90, 3:85, 4:80, 5:76, 6:72, 7:68, 8:64, 9:60, 10:57, 11:54, 12:51, 13:48, 14:45, 15:42, 16:39, 17:36, 18:33, 19:30, 20:28, 21:26, 22:24, 23:22, 24:20, 25:18, 26:16, 27:14, 28:13, 29:12, 30:11, 31:10, 32:9, 33:8, 34:7, 35:6, 36:5, 37:4, 38:3, 39:2, 40:1, 0:0},
__score: {12:1, 13:3, 14:6, 15:10, 16:15, 17:25, 18:40, 19:65, 20:100, 21:150, 22:250, 23:400, 24:650, 25:1000, 26:1500, 27:2500, 28:4000, 29:6500, 30:10000, 31:15000, 32:25000, 33:40000, 34:65000, 35:100000, 36:150000, 37:250000, 38:400000, 39:650000, 40:1000000, 41:1500000, 42:2500000, 43:4000000, 44:6500000, 45:10000000},
__bonus: [[1,3,1200,5,1],[4,8,2000,10,2],[9,15,3000,14,3],[16,26,4000,17,4],[27,49,5500,20,5],[50,89,7000,23,6],[90,159,8500,26,7],[160,259,10000,29,8],[260,419,12000,32,9],[420,749,15000,35,10],[750,1299,18000,38,11],[1300,2199,22000,41,12],[2200,3599,26000,44,13],[3600,5699,30000,47,14],[5700,9699,36000,50,15],[9700,16399,45000,53,16],[16400,27999,60000,56,17],[28000,43999,80000,58,18],[44000,67999,105000,60,19],[68000,114999,135000,62,20],[115000,189999,170000,64,21],[190000,329999,215000,66,22],[330000,509999,270000,68,23],[510000,799999,330000,70,24],[800000,1349999,400000,72,25],[1350000,2199999,480000,74,26],[2200000,3599999,580000,76,27],[3600000,5999999,700000,78,28],[6000000,8999999,830000,80,29],[9000000,14999999,1000000,82,30],[15000000,24999999,1200000,84,31],[25000000,41999999,1450000,86,32],[42000000,64999999,1770000,88,33],[65000000,99999999,2200200,90,34],[100000000,164999999,2700000,92,35],[165000000,269999999,3300000,94,36],[270000000,449999999,4000000,96,37],[450000000,900000000,4800000,98,38]],
__style: {
"table": {"margin": "5px", "borderTop": "1px solid #333", "borderBottom": "1px solid #333", "fontFamily": "Verdana, Geneva, sans-serif"},
"graph": {
"td": {"width": "68px", "verticalAlign": "bottom", "textAlign": "center"},
"div": {"width": "24px", "margin": "0 auto -1px auto", "border": "3px solid #333", "borderBottom": "none"}
},
"icon": {
"ul": {"listStyleType": "none", "margin": 0, "padding": 0},
"div": {"padding": "6px", "marginRight": "6px", "display": "inline-block", "border": "1px solid #000"},
"p": {"display": "inline", "fontSize": "10px", "color": "#555"},
"li": {"height": "15px", "padding": "2px", "marginLeft": "10px"}
},
"cell": {
"data": {"width": "68px", "textAlign": "center", "color": "#555", "padding": "3px 2px"},
"header": {"color": "#416d96", "padding": "3px 2px"}
},
"rows": {
"graph": {"borderBottom": "3px solid #333", "height": "200px"},
"tr": {"fontSize": "11px", "borderBottom": "1px solid #333", "backgroundColor": "#d6dde1"}
}
},

__updateGraph: function()
{
try
{
this.__timer.stop();
var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
var allianceName = alliance.get_Name();
var ranks = alliance.get_POIRankScore();
var exists = alliance.get_Exists();
var root = this;
var gb = root.__groupBox, widget = root.__widget, noAllianceLabel = root.__label;

if(!gb || !widget || !noAllianceLabel || exists === 'undefined')
{
this.__timer.start();
console.log('retrying check if alliance exists');
console.log(gb, widget, noAllianceLabel, exists);
}
else
{
if(exists === false)
{
noAllianceLabel.setValue('No Alliance found, please create or join an alliance.');
if(gb.hasChildren()) gb.removeAll();
gb.add(noAllianceLabel);
console.log('No alliance found');
}
else if(exists === true)
{
if(root.__loaded === false)
{
noAllianceLabel.setValue('Loading data, please wait....')
if(gb.hasChildren()) gb.removeAll();
gb.add(noAllianceLabel);
gb.add(widget);
root.__loaded = true;
}

var div = document.getElementById('graph');
if(!div)
{
this.__timer.start();
console.log('Waiting for div dom element to be loaded');
}
if(div)
{
console.log('Reloading graph');
div.innerHTML = "";
if(noAllianceLabel.isSeeable()) gb.remove(noAllianceLabel);
root.__getData(allianceName, ranks);
}
}
}
}
catch(e)
{
console.log(e.toString())
}
},

__getData: function(n,r)
{
try
{
var bonus = this.__bonus, allianceName = n, ranks = r;

var range = function(val)
{
if(val == 0) return [0,0,0,0];
var i;
bonus.map(function(key)
{
if(val > key[0] && val < key[1]) i = key;
});
return i;
};

var	poisConstructor = function()
{
this.tib = {"scr": ranks[0].s, "color": "#8dc186", "range": range(ranks[0].s), "type": 1, "rank": ranks[0].r, "name": "Tiberium"};
this.crs = {"scr": ranks[1].s, "color": "#5b9dcb", "range": range(ranks[1].s), "type": 1, "rank": ranks[1].r, "name": "Crystal"};
this.pwr = {"scr": ranks[2].s, "color": "#8cc1c7", "range": range(ranks[2].s), "type": 1, "rank": ranks[2].r, "name": "Power"};
this.tun = {"scr": ranks[3].s, "color": "#d7d49c", "range": range(ranks[3].s), "type": 2, "rank": ranks[3].r, "name": "Infantry"};
this.urn = {"scr": ranks[4].s, "color": "#dbb476", "range": range(ranks[4].s), "type": 2, "rank": ranks[4].r, "name": "Uranium"};
this.air = {"scr": ranks[5].s, "color": "#c47f76", "range": range(ranks[5].s), "type": 2, "rank": ranks[5].r, "name": "Aircraft"};
this.res = {"scr": ranks[6].s, "color": "#928195", "range": range(ranks[6].s), "type": 2, "rank": ranks[6].r, "name": "Defence"};
};

var pois = new poisConstructor();

this.__allianceName = allianceName;
this.__pois = pois;

console.log('data ready')
this.__graph();
}
catch(e)
{
console.log(e.toString());
}
},

__graph: function()
{
console.log('creating graph');
var root = this, pois = this.__pois, style = this.__style, bonus = this.__bonus, multiplier = this.__multiplier;

var addRow = function(title, arr, table, selected)
{
var row = document.createElement('tr'), header = document.createElement('td');
row.css(style.rows.tr);
row.onclick = function()
{
var tr = table.getElementsByTagName('tr');
for (i = 1; i < tr.length; i++)
{
tr[i].style.backgroundColor = '#d6dde1';
}
this.style.backgroundColor = '#ecf6fc';
};
if(selected == 1) row.style.backgroundColor = '#ecf6fc';
header.css(style.cell.header);
header.appendChild(document.createTextNode(title));
row.appendChild(header);
for(var key in arr)
{
var td = document.createElement('td');
td.css(style.cell.data);
td.appendChild(document.createTextNode(arr[key]));
row.appendChild(td);
}
table.appendChild(row);
};

var table = document.createElement('table'),
gc = document.createElement('tr'),
gh = document.createElement('td'),
ul = document.createElement('ul');

table.prop({"id": "data", "cell-spacing": 0, "cell-padding": 0, "rules": "groups", "width": "100%"});
table.css(style.table);
gc.css(style.rows.graph);
ul.css(style.icon.ul);
gh.appendChild(ul);
gc.appendChild(gh);
table.appendChild(gc);

var score = [], tier = [], nextTier = [], bns = [], nextBns = [], poiRank = [], m = 0;

for(var key in pois)
{
var min = pois[key].range[0],
max = pois[key].range[1],
rank = (pois[key].rank > 40) ? 0 : pois[key].rank,
color = pois[key].color,
name = pois[key].name,
scr = pois[key].scr,
td = document.createElement('td'),
div = document.createElement('div'),
li = document.createElement('li'),
icon = document.createElement('div'),
p = document.createElement('p');

bns[m] = (pois[key].type == 1) ? Math.round(pois[key].range[2] * (1 + multiplier[rank]/100)).format() :
Math.round(pois[key].range[3] * (1 + multiplier[rank]/100)) + "%";
poiRank[m] = pois[key].rank + " (" + multiplier[rank] + "%)";
score[m] = (pois[key].scr).format();
tier[m] = (max == 0) ? 0 : pois[key].range[4];
nextTier[m] = (max == 0) ? 1 : (max - scr + 1).format();
nextBns[m] = (pois[key].type == 1) ? Math.round(bonus[tier[m]][2] * (1 + multiplier[rank]/100)).format() :
Math.round(bonus[tier[m]][3] * (1 + multiplier[rank]/100)) + "%";

var h = (scr == 0) ? 0 : Math.round((scr - min)/(max - min) * 100);

div.css(style.graph.div);
div.style.backgroundColor = color;
div.style.height = h * 2 - 3 + 'px';
td.css(style.graph.td);
td.appendChild(div);
gc.appendChild(td);
icon.css(style.icon.div);
icon.style.backgroundColor = color;
p.appendChild(document.createTextNode(name));
p.css(style.icon.p);
li.css(style.icon.li);
li.appendChild(icon);
li.appendChild(p);
ul.appendChild(li);
m++;
}

addRow('Tier', tier, table, 0);
addRow('Alliance Rank', poiRank, table, 0);	
addRow('Score', score, table);
addRow('Next Tier Requires', nextTier, table, 0);
addRow('Bonus', bns, table, 1);
addRow('Next Tier Bonus', nextBns, table, 0);
document.getElementById('graph').appendChild(table);
}	

}
});
}

var onGameLoaded = function()
{
var qx = window["qx"];
var ClientLib = window["ClientLib"];
var webfrontend = window["webfrontend"];

if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
{
setTimeout(onGameLoaded, 10000);
console.log('retrying....');
}
else
{
try
{
var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
if(typeof alliance != 'undefined')
{
create_ccta_pa_class();
ccta_pa.getInstance();
}
}
catch(e)
{
setTimeout(onGameLoaded, 10000);
console.log(e.toString());
console.log('retrying....');
}
}
};

window.setTimeout(onGameLoaded, 10000);

})();

// ==UserScript==
// @name        Command & Conquer TA World Map
// @description Creates a detailed map of bases and pois of the alliance and enemies.
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.0.0
// @grant none
// @author zdoom
// @updateURL https://userscripts.org/scripts/source/173330.meta.js
// @downloadURL https://userscripts.org/scripts/source/173330.user.js
// ==/UserScript==

(function(){

	function create_ccta_map_class()
	{
		qx.Class.define("ccta_map", 
		{
			type: "singleton",
			extend: qx.core.Object,
			
			construct: function()
			{
				try
				{				
					var root = this;
							
					var mapButton = new qx.ui.form.Button('Map').set({ enabled: false });
					var app = qx.core.Init.getApplication();
					var optionsBar = app.getOptionsBar().getLayoutParent();
					this.__mapButton = mapButton;
					
					optionsBar.getChildren()[0].getChildren()[2].addAt(mapButton,1);
					
					var onReady = function()
					{
						console.log('checking if data is ready');
						var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Relationships;
						var world = ClientLib.Data.MainData.GetInstance().get_World();
						var endGame = ClientLib.Data.MainData.GetInstance().get_EndGame().get_Hubs().d;
						var command = ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand;
						var delegate = phe.cnc.Util.createEventDelegate;
						
						if(!!alliance && !!world && !!command && !!delegate && !!endGame)
						{
							var worldWidth = world.get_WorldWidth();
							if(!worldWidth) return;
							
							var factor = 500 / worldWidth;
							var hubs = [], fortress = [];
							
							for (var index in endGame)
							{
								var currentHub = endGame[index];
								if (currentHub.get_Type() == 1) hubs.push([(currentHub.get_X() + 2) * factor, (currentHub.get_Y() + 2) * factor]);
								if (currentHub.get_Type() == 3) fortress = [(currentHub.get_X() + 2) * factor, (currentHub.get_Y() + 2) * factor];
							}
							
							if (hubs.length > 0)
							{
								timer.stop();
								root.__factor = factor;
								root.__endGame['hubs'] = hubs;
								root.__endGame['fortress'] = fortress;
								root.__init();
							}
							console.log(hubs);
						}
						console.log(!!alliance, !!world, !!command, !!delegate, !!endGame);
					};
					
					var timer = new qx.event.Timer(1000);
					timer.addListener('interval', onReady, this);
					timer.start();
				}
				catch(e)
				{
					console.log(e.toString());
				}
				console.log('ccta_map initialization completed');
			},
			destruct: function(){},
			members: 
			{
				__mapButton: null,
				__allianceExist: null,
				__allianceName: null,
				__allianceId: null,
				__allianceHasRelations: false,
				__defaultAlliances: null,
				__selectedAlliances: null,
				__data: null,
				__totalProcesses: null,
				__completedProcesses: 0,
				__endGame: {},
				__isLoading: false,
				__factor: null,
				
				__init: function()
				{
					try
					{
						var root = this;
						var data = ClientLib.Data.MainData.GetInstance();
						var alliance_data = data.get_Alliance();
						var alliance_exists = alliance_data.get_Exists();
												
						if(alliance_exists)
						{
							var alliance_name = alliance_data.get_Name();
							var alliance_id = alliance_data.get_Id();
							var alliance_relations = alliance_data.get_Relationships();
							
							this.__allianceExist = true;
							this.__allianceId = alliance_id;
							this.__allianceName = alliance_name;
							
							var selectedAlliancesList = [];
							selectedAlliancesList[0] = [alliance_id, 'alliance', alliance_name, 0];
											
							if (alliance_relations != null)
							{
								this.__allianceHasRelations = true;
								alliance_relations.map(function(x)
								{
									var type = x.Relationship, id = x.OtherAllianceId, name = x.OtherAllianceName;
									if ((type == 3) && (selectedAlliancesList.length < 9)) selectedAlliancesList.push([id, 'enemy', name, 0]);
								});
							}
							this.__defaultAlliances = selectedAlliancesList;
						}
						else
						{
							this.__allianceExist = false;
						}
						
						if (typeof(Storage) !== 'undefined' && typeof(localStorage.ccta_map_settings) !== 'undefined')
						{
							this.__selectedAlliances = JSON.parse(localStorage.ccta_map_settings);
						}
						
						this.__mapButton.setEnabled(true);
						this.__mapButton.addListener('execute', function()
						{
							root.getData();
							ccta_map.container.getInstance().open(1);
						}, this);
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				getData: function()
				{
					if (this.__isLoading === true) return;
					this.__isLoading = true;
					var arr = (this.__selectedAlliances == null) ? this.__defaultAlliances : this.__selectedAlliances;
					
					if(arr != null)
					{
						this.__data = [];
						this.__totalProcesses = arr.length;
						for(var i = 0; i < arr.length; i++)
						{
							this.__getAlliance(arr[i][0], arr[i][1], arr[i][3]);
						}
					}
				},
				
				__getAlliance: function(aid, type, color)
				{
					try
					{
						var alliance = {}, root = this, factor = this.__factor;
						alliance.id = aid;
						alliance.players = {};
						var totalProcesses = this.__totalProcesses;
						
						var getBases = function(pid, pn, p, tp)
						{
							ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfo", { id: pid }, 
							phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
							{
								if (data.c != null)
								{
									var totalBases = data.c.length;
									var player = {};
									var bases = [];
									
									for (var b = 0; b < data.c.length; b++)
									{
										var id   = data.c[b].i;
										var name = data.c[b].n;
										var x    = data.c[b].x * factor;
										var y    = data.c[b].y * factor;
										bases.push([x, y, name, id]);
										if((p == tp - 1) && (b == totalBases - 1))
										{
											root.__completedProcesses++;
											var loader = ccta_map.container.getInstance().loader;
											loader.setValue('Loading: ' + root.__completedProcesses + "/" + totalProcesses);
										}
										if(root.__completedProcesses == totalProcesses) root.__onProcessComplete();
									}
									player.id = pid;
									player.name = pn;
									player.bases = bases;
									alliance.players[pn] = player;
								}
							}), null);
						};
						
						ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", { id: aid }, 
						phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
						{
							if (data == null) return;
							if (data.opois != null)
							{
								var pois = [];
								data.opois.map(function(poi)
								{
									pois.push({'i': poi.i, 'l': poi.l, 't': poi.t, 'x': poi.x * factor, 'y': poi.y * factor});
								});
								alliance.pois = pois;
							}
							if (data.n != null) alliance.name = data.n;
							if (data.m != null)
							{
								
								for (var p = 0; p < data.m.length; p++)
								{
									var playerName = data.m[p].n;
									var playerId   = data.m[p].i;
									getBases(playerId, playerName, p, data.m.length);								
								}
								root.__data.push([alliance, type, color]);
							}
						}), null);
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__onProcessComplete: function()
				{
					console.log('process completed - alliances data has been generated', this.__data);
					this.__isLoading = false;
					var win = ccta_map.container.getInstance();
					win.receivedData = this.__data;
					win.__updateList();
					win.drawCanvas();
					win.loader.setValue('Completed');
					this.__totalProcess = null;
					this.__completedProcesses = 0;
					setTimeout(function(){
						win.loader.setValue('');
					}, 3000);
				}
				
			}
			
		});
		
		qx.Class.define("ccta_map.container",
		{
			type: "singleton",
			extend: qx.ui.container.Composite,
			
			construct: function()
			{
				try
				{
					this.base(arguments);
					var layout = new qx.ui.layout.Canvas();
					this._setLayout(layout);
					
					var worldWidth = ClientLib.Data.MainData.GetInstance().get_World().get_WorldWidth();
					var factor = 500 / worldWidth;
					this.__factor = factor;
					
					var zoomIn = new qx.ui.form.Button('+').set({ width: 30 });
					var zoomOut = new qx.ui.form.Button('-').set({ width: 30, enabled: false });
					var zoomReset = new qx.ui.form.Button('R').set({ width: 30, enabled: false });
					var grid = new qx.ui.container.Composite(new qx.ui.layout.Grid(3,1));
					var info = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ minHeight: 300, padding: 10 });
					var canvasContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());
					var rightBar = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					var leftBar = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					var widget = new qx.ui.core.Widget().set({ width: 500, height: 500 });
					var div = new qx.html.Element('div', null, {id: 'canvasContainer'});
					
					
					var li1 = new qx.ui.form.ListItem('All', null, "all");
					var li2 = new qx.ui.form.ListItem('My Bases', null, "bases");
					var li3 = new qx.ui.form.ListItem('My Alliance', null, "alliance");
					var li4 = new qx.ui.form.ListItem('Selected', null, "selected");
					var displayMode = new qx.ui.form.SelectBox().set({ height: 28 });
						displayMode.add(li1);
						displayMode.add(li2);
						displayMode.add(li3);
						displayMode.add(li4);
					
					var zoomBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(15));
					
					var bothOpt = new qx.ui.form.RadioButton('Both').set({ model: "both" });
					var basesOpt = new qx.ui.form.RadioButton('Base').set({ model: "bases" });;
					var poisOpt = new qx.ui.form.RadioButton('Poi').set({ model: "pois" });
					var displayOptions = new qx.ui.form.RadioButtonGroup().set({ layout: new qx.ui.layout.HBox(), font :'font_size_11' });
						displayOptions.add(bothOpt);
						displayOptions.add(basesOpt);
						displayOptions.add(poisOpt);
						
					var allianceList = new qx.ui.form.List().set({ font :'font_size_11', height: 215 });
					var editAlliance = new qx.ui.form.Button('Edit Alliances');
					var label = new qx.ui.basic.Label('Transparency');
					var slider = new qx.ui.form.Slider().set({ minimum: 30, maximum: 100, value: 100 });
					var coordsField = new qx.ui.form.TextField().set({maxWidth: 100, textAlign: 'center', readOnly: 'true', alignX: 'center'});
					var loader = new qx.ui.basic.Label().set({ marginTop: 100 });
					
					grid.set({ minWidth: 780, backgroundColor: '#8e979b', minHeight: 524, margin: 3, paddingTop: 10 });
					rightBar.set({ maxWidth: 130, minWidth: 130, paddingTop: 30, paddingRight: 10 });
					leftBar.set({ maxWidth: 130, minWidth: 130, paddingTop: 30, paddingLeft: 10 });
					
					var hints = [[zoomIn,'Zoom in'], [zoomOut,'Zoom out'], [zoomReset,'Restet zoom'], [basesOpt,'Show bases only'] , [poisOpt,'Show POIs only'], [bothOpt,'Show bases and POIs']]
					for(var i = 0; i < hints.length; i++)
					{
						var tooltip = new qx.ui.tooltip.ToolTip(hints[i][1]);
						hints[i][0].setToolTip(tooltip);
					}
					
					zoomBar.add(zoomIn);
					zoomBar.add(zoomOut);
					zoomBar.add(zoomReset);
					
					rightBar.add(zoomBar);
					rightBar.add(displayMode);
					rightBar.add(displayOptions);
					rightBar.add(allianceList);
					rightBar.add(editAlliance);
					rightBar.add(label);
					rightBar.add(slider);
					
					leftBar.add(coordsField);
					leftBar.add(info);
					leftBar.add(loader);
					
					canvasContainer.add(widget);
					widget.getContentElement().add(div);
					grid.add(leftBar, {row: 1, column: 1});
					grid.add(rightBar, {row: 1, column: 3});
					grid.add(canvasContainer, {row: 1, column: 2});
					
					this.info = info;
					this.coordsField = coordsField;
					this.allianceList = allianceList;
					this.panel = [zoomOut, zoomReset, zoomIn, displayOptions, displayMode, allianceList, editAlliance];
					this.loader = loader;
					this.zoomIn = zoomIn;
					this.zoomOut = zoomOut;
					this.zoomReset = zoomReset;
					
					//canvas
					var cont = document.createElement('div'),
						mask = document.createElement('div'),
						canvas = document.createElement('canvas'),
						ctx = canvas.getContext("2d"),
						root = this;
									
					cont.style.width = '500px';
					cont.style.height = '500px';
					cont.style.position = 'absolute';
					cont.style.overflow = 'hidden';
					cont.style.backgroundColor = '#0b2833';
					
					canvas.style.position = 'absolute';
					canvas.style.backgroundColor = '#0b2833';
					
					mask.style.position = 'absolute';
					mask.style.width = '500px';
					mask.style.height = '500px';
					mask.style.background = 'url("http://archeikhmeri.co.uk/images/map_mask.png") center center no-repeat';
					
					this.canvas = canvas;
					this.mask = mask;
					this.ctx = ctx;				
					
					var __zoomIn = function(){ if (root.scale < 12) root.__scaleMap('up') };
					var __zoomOut = function(){if (root.scale > 1) root.__scaleMap('down') };
					var __zoomReset = function()
					{
						canvas.width = 500;
						canvas.height = 500;
						canvas.style.left = 0;
						canvas.style.top = 0;
						root.scale = 1;
						root.drawCanvas();
						zoomIn.setEnabled(true);
						zoomOut.setEnabled(false);
						zoomReset.setEnabled(false);
					};
					
					cont.appendChild(canvas);
					cont.appendChild(mask);				
					root.__draggable(mask);
					root.resetMap();
					
					slider.addListener('changeValue', function(e)
					{
						if (e.getData())
						{
							var val = e.getData() / 100;
							this.setOpacity(val);
							slider.setToolTipText(" " + val * 100 + "% ");
						}
					}, this);
					
					allianceList.addListener('changeSelection', function(e)
					{
						if ((root.__displayM == "bases") || (root.__displayM == "alliance") || !e.getData()[0]) return;
						var aid = e.getData()[0].getModel();
						root.__selectedA = aid;
						root.drawCanvas();
					}, this);
									
					displayMode.addListener('changeSelection', function(e)
					{
						var dm = e.getData()[0].getModel();
						root.__displayM = dm;
						root.__updateList();
						
						if(dm == "bases")
						{
							displayOptions.setSelection([basesOpt]);
							poisOpt.setEnabled(false);
							bothOpt.setEnabled(false);
							root.__displayO = "bases";
						}
						else
						{
							if(!poisOpt.isEnabled()) poisOpt.setEnabled(true);
							if(!bothOpt.isEnabled()) bothOpt.setEnabled(true);
							displayOptions.setSelection([bothOpt]);
							root.__displayO = "both";
						}
						root.drawCanvas();
					}, this);
					
					displayOptions.addListener('changeSelection', function(e)
					{
						if (!e.getData()[0]) return;
						var dop = e.getData()[0].getModel();
						root.__displayO = dop;
						root.drawCanvas();
					}, this);
					
					editAlliance.addListener('execute', function()
					{
						ccta_map.options.getInstance().open();
					}, this);
					
					var desktop = qx.core.Init.getApplication().getDesktop();
					desktop.addListener('resize', this._onResize, this);
					
					zoomIn.addListener('execute', __zoomIn, this);
					zoomOut.addListener('execute', __zoomOut, this);
					zoomReset.addListener('execute', __zoomReset, this);
					
					this.add(grid);
			
					this.wdgAnchor = new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tl1.png").set({ width: 3, height: 32 });
					this.__imgTopRightCorner = new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tr.png").set({ width: 34, height: 35 });				
					this._add(this.__imgTopRightCorner, { right: 0, top: 0, bottom: 28 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_r.png").set({ width: 3, height: 1, allowGrowY: true, scale: true }), { right: 0, top: 35, bottom: 29 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_br.png").set({ width: 5, height: 28, allowGrowY: true, scale: true }), { right: 0, bottom: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_b.png").set({ width: 1, height: 3, allowGrowX: true, scale: true }), { right: 5, bottom: 0, left: 5 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_bl.png").set({ width: 5, height: 29 }), { left: 0, bottom: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_l.png").set({ width: 3, height: 1, allowGrowY: true, scale: true }), { left: 0, bottom: 29, top: 32 });
					this._add(this.wdgAnchor, { left: 0, top: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tl2.png").set({ width: 25, height: 5 }), { left: 3, top: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_t.png").set({ width: 1, height: 3, allowGrowX: true, scale: true }), { left: 28, right: 34, top: 0 });
			
					this.__btnClose = new webfrontend.ui.SoundButton(null, "FactionUI/icons/icon_close_button.png").set({ appearance: "button-close", width: 23, height: 23, toolTipText: this.tr("tnf:close base view") });
					this.__btnClose.addListener("execute", this._onClose, this);
					this._add(this.__btnClose, { top: 6, right: 5 });
					
					var onLoaded = function()
					{
						var counter = 0;
						var check = function()
						{
							if(counter > 60) return;
							var htmlDiv = document.getElementById('canvasContainer');
							(htmlDiv) ? htmlDiv.appendChild(cont) : setTimeout(check, 1000);
							console.log('retrying check for canvasContainer is loaded');
							counter++;
						};
						check();
					};
					onLoaded();
					
				}
				catch(e)
				{
					console.log(e.toString());
				}
				console.log('container creation completed');
			},
			destruct: function(){},
			members:
			{
				info: null,
				coordsField: null,
				panel: null,
				loader: null,
				canvas: null,
				mask: null,
				ctx: null,
				receivedData: null,
				allianceList: null,
				circles: [53, 85, 113, 145, 242],
				scale: 1,
				selectedBase: false,
				elements: [],
				locations: [],
				inProgress: false,
				isRadarVisible: false,
				__interval: null,
				__pointerX: null,
				__pointerY: null,
				__selectedA: null,
				__selectedB: null,
				__displayM: "all",
				__displayO: "both",
				__factor: null,
		
				__setInfo: function(base)
				{
					try
					{
		//				console.log(base);
						var info = this.info;
						info.removeAll();
						if(!base) return;
						for ( var i = 0; i < base.length; i++)
						{
							var title = new qx.ui.basic.Label(base[i][0]).set({font: 'font_size_13_bold', textColor: '#375773'});
							var value = new qx.ui.basic.Label(base[i][1]).set({font: 'font_size_11', textColor: '#333333', marginBottom: 5});
							info.add(title);
							info.add(value);
						}
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__createLayout: function()
				{
					var s = this.scale, circles = this.circles, ctx = this.ctx;
					for (var i = 0; i < circles.length; i++) {
						var r = circles[i];
						ctx.beginPath();
						ctx.arc(250, 250, r, 0, Math.PI * 2, true);
						ctx.lineWidth = (i == 4) ? 1/s : 0.3/s;
						ctx.strokeStyle = '#8ce9ef';
						ctx.stroke();
						ctx.closePath();
					}
					
					for(var i = 0; i < 8; i++){
						var r = circles[4], a = (Math.PI * i / 4) - Math.PI / 8;
						ctx.beginPath();
						ctx.moveTo(250,250);
						ctx.lineTo((r * Math.cos(a)) + 250, (r * Math.sin(a)) + 250);
						ctx.lineWidth = 0.3/s;
						ctx.strokeStyle = '#8ce9ef';
						ctx.stroke();
						ctx.closePath();
					}
					
					var endGame = ccta_map.getInstance().__endGame, hubs = endGame.hubs, fortress = endGame.fortress;
					var fortressX = fortress[0];
					var fortressY = fortress[1];
					
					var grd = ctx.createLinearGradient(fortressX, fortressY - 0.5, fortressX, fortressY + 0.5);
						grd.addColorStop(0, 'rgba(200, 228, 228, 0.5)');
						grd.addColorStop(1, 'rgba(170, 214, 118, 0.5)');
					ctx.beginPath();
					ctx.arc(fortressX - 0.2, fortressY - 0.2, 1, 0, Math.PI * 2, true);
					ctx.fillStyle = grd;
					ctx.lineWidth = 0.1;
					ctx.strokeStyle = '#a5fe6a';
					ctx.fill();
					ctx.stroke();	
					ctx.closePath();
						
					for(var i = 0; i < hubs.length; i++)
					{
						var c = 'rgba(200, 228, 228, 0.5)', d = 'rgba(170, 214, 118, 0.5)', l = 1.3, b = 0.1;
						var x = hubs[i][0];
						var y = hubs[i][1];
						var grd = ctx.createLinearGradient(x, y, x, y+l);
							grd.addColorStop(0, c);
							grd.addColorStop(1, d);
						ctx.beginPath();
						ctx.rect(x-b, y-b, l, l);
						ctx.fillStyle = grd;
						ctx.fill();
						ctx.strokeStyle = '#a5fe6a';
						ctx.lineWidth = b;
						ctx.stroke();
						ctx.closePath();
					}
					
				},
				
				__createAlliance: function(name, data, type, color)
				{
					try
					{
						this.inProgress = true;
						var colors = {
							"bases": {"alliance":[["#86d3fb","#75b7d9"]], "owner":[["#ffc48b","#d5a677"]], "enemy":[["#ff8e8b","#dc7a78"],['#e25050','#cc2d2d'],['#93b7f8','#527ef2'],['#d389aa','#b14e69']], "nap":[["#ffffff","#cccccc"]], "selected":[["#ffe50e", "#d7c109"]], "ally":[["#6ce272", "#5fc664"],['#d4e17e','#b3ca47'],['#92f8f2','#52f2e8'],['#1cba1c','#108510']]},
							"pois": [["#add2a8","#6db064"], ["#75b9da","#4282bd"], ["#abd2d6","#6bafb7"], ["#e2e0b7","#ccc880"], ["#e5c998","#d09e53"], ["#d4a297","#b35a54"], ["#afa3b1","#755f79"]]
						};
						
						var owner = ClientLib.Data.MainData.GetInstance().get_Player().name, ctx = this.ctx, factor = this.__factor;
						var dop = this.__displayO, dmd = this.__displayM, root = this, s = this.scale;
						
						var r = (s < 3) ? 0.65 : (s > 3) ? 0.35 : 0.5;
						
						var createBase = function (x, y, bt, clr) 
						{
							var c = colors.bases[bt][clr][0], d = colors.bases[bt][clr][1];
							var grd=ctx.createLinearGradient(x, y-r, x, y+r);
								grd.addColorStop(0, c);
								grd.addColorStop(1, d);
							ctx.beginPath();
							ctx.arc(x, y, r, 0, Math.PI * 2, true);
							ctx.closePath();
							ctx.fillStyle = grd;
							ctx.fill();
							ctx.lineWidth = 0.1;
							ctx.strokeStyle = '#000000';
							ctx.stroke();
							ctx.closePath();
						};
						
						var createPoi = function(x, y, t) 
						{
							var c = colors.pois[t][0], d = colors.pois[t][1];
							var grd = ctx.createLinearGradient(x, y-r, x, y+r);
								grd.addColorStop(0, c);
								grd.addColorStop(1, d);
							ctx.beginPath();
							ctx.rect(x-r, y-r, r*2, r*2);
							ctx.fillStyle = grd;
							ctx.fill();
							ctx.strokeStyle = "#000000";
							ctx.lineWidth = 0.1;
							ctx.stroke();
							ctx.closePath();
						};
						
						if (dop != "pois")
						{
							for (var player in data.players) {
								for (var i = 0; i < data.players[player].bases.length; i++){
									var b = data.players[player].bases[i], pid = data.players[player].id;
									if(dmd == "bases")
									{
										if (player == owner)
										{
											this.elements.push({"x":b[0],"y":b[1],"an":name,"pn":player,"bn":b[2],"bi":b[3],"ai":data.id,"pi":pid,"type":"base"});
											this.locations.push([b[0]/factor, b[1]/factor]);
											createBase(b[0], b[1], 'owner', 0);
										}
									}
									else
									{
										this.elements.push({"x":b[0],"y":b[1],"an":name,"pn":player,"bn":b[2],"bi":b[3],"ai":data.id,"pi":pid,"type":"base"});
										this.locations.push([b[0]/factor, b[1]/factor]);
										(player == owner) ? createBase(b[0], b[1], 'owner', 0) : createBase(b[0], b[1], type, color);
									}
								}
							}
						}
						
						if (dop != "bases")
						{
							for (var i = 0; i < data.pois.length; i++){
								var x = data.pois[i].x, y = data.pois[i].y, t = data.pois[i].t, l = data.pois[i].l;
								createPoi(x, y, t - 2);
								this.elements.push({"x": x, "y": y, "an": name, "ai": data.id, "t": t, "l": l});
								this.locations.push([x/factor, y/factor]);
							}
						}
						this.inProgress = false;
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__draggable: function(mask)
				{
					try
					{
						var start, end, initCoords = [], selectedBase = false, root = this, canvas = this.canvas, c = 0;
						var factor = root.__factor;				
						
						var displayBaseInfo = function()
						{
							try
							{
								if (!selectedBase || root.inProgress) return;
								var base = [];
								var pois = ['Tiberium', 'Crystal', 'Reactor', 'Tungesten', 'Uranium', 'Aircraft Guidance', 'Resonater'];
								for ( var i in selectedBase)
								{
									var txt = "", val = "";
									switch(i)
									{
										case "an": txt = "Alliance: "; val = selectedBase[i]; break;
										case "bn": txt = "Base    : "; val = selectedBase[i]; break;
										case "pn": txt = "Player  : "; val = selectedBase[i]; break;
										case "l" : txt = "Level   : "; val = selectedBase[i]; break;
										case "t" : txt = "Type    : "; val = pois[selectedBase[i] - 2]; break;
										default  : txt = false;
									}
									if(txt)
									{
										base.push([txt, val]);
									}
									root.__setInfo(base);
								}
							}
							catch(e)
							{
								console.log(e.toString());
							}
						};
						
						var onMapHover = function(event)
						{
							var loc = root.locations, elements = root.elements, coordsField = root.coordsField;
							var getCoords = function()
							{
								var canvasRect = canvas.getBoundingClientRect();
								var x = (event.pageX - canvasRect.left), y = (event.pageY - canvasRect.top);
								return [x, y];
							};
							
							var coords = getCoords();
							var x = coords[0] + canvas.offsetLeft, y = coords[1] + canvas.offsetTop;
		
							if(Math.sqrt(Math.pow(x - 250, 2) + Math.pow(y - 250, 2)) > 242)
							{
								coordsField.setValue("");
								return;
							}
							
							x = Math.round(coords[0] / (root.scale * factor)); root.__pointerX = x;
							y = Math.round(coords[1] / (root.scale * factor)); root.__pointerY = y;
							
							coordsField.setValue(x + ":" + y);
							
							if (root.scale < 2 || root.inProgress) return;
		
							for(var i = 0; i < loc.length; i++)
							{
								var elmX = loc[i][0], elmY = loc[i][1];
								if ((x == elmX) && (y == elmY)) 
								{
									selectedBase = elements[i];
									displayBaseInfo();
									break;
								}
								else
								{
									selectedBase = false;
									root.__setInfo(false);
								}
							}
						};
						
						var onMapDrag = function(event)
						{
							if (root.scale == 1 || root.inProgress) return;
							var cx = canvas.offsetLeft, cy = canvas.offsetTop, mx = event.pageX, my = event.pageY;
							var newX = cx + mx - initCoords[0], newY = cy + my - initCoords[1];
							initCoords[0] = mx;
							initCoords[1] = my;
							canvas.style.top = newY + 'px';
							canvas.style.left = newX + 'px';
						};
						
						var onMapWheel = function(event)
						{
							if (root.inProgress) return;
							var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
							if((delta < 0 && root.scale <= 1) || (delta > 0 && root.scale >= 12)) return;
							c += delta;
							var str = ( Math.abs(c) % 3 == 0 ) ? ((delta < 0) ? 'down' : 'up') : false;
							if(str) root.__scaleMap(str);
						};
						
						var onMapDown = function(event){
							var x = event.pageX, y = event.pageY, t = new Date();
							initCoords = [x,y];
							start = t.getTime();
							mask.removeEventListener('mousemove', onMapHover, false);
							mask.addEventListener('mousemove', onMapDrag, false);
						};
						
						var onMapUp = function(event){
							var x = event.pageX, y = event.pageY, t = new Date();
							end = t.getTime();
							initCoords = [x,y];
							mask.removeEventListener('mousemove', onMapDrag, false);
							mask.addEventListener('mousemove', onMapHover, false); 
							if (end - start < 150) webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(root.__pointerX, root.__pointerY);
						};
						
						var onMapOut = function(event){
							mask.removeEventListener('mousemove', onMapDrag, false);
							mask.addEventListener('mousemove', onMapHover, false); 
						};
						
						mask.addEventListener('mouseup', onMapUp, false);
						mask.addEventListener('mousedown', onMapDown, false);
						mask.addEventListener('mousemove', onMapHover, false); 
						mask.addEventListener('mouseout', onMapOut, false);
						mask.addEventListener('mousewheel', onMapWheel, false);
						mask.addEventListener('DOMMouseScroll', onMapWheel, false);
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__startRadarScan: function()
				{
					this.isRadarVisible = true;
					var FRAMES_PER_CYCLE = 20, FRAMERATE = 20, RINGS = 6;
					var canvas = this.canvas, ctx = this.ctx, canvassize = 400, animationframe = 0, root = this;
					var ringsize = canvassize / (2 * RINGS + 1);
					var radiusmax = ringsize / 2 + ringsize + (RINGS - 1) * ringsize;
				
					function animateRadarFrame() {
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						root.__createLayout();
						var radius, alpha;
						for (var ringno = 0; ringno < RINGS; ringno++)
						{
							radius = ringsize / 2 + (animationframe / FRAMES_PER_CYCLE) * ringsize + ringno * ringsize;
							alpha = (radiusmax - radius) / radiusmax;
							ctx.beginPath();
							ctx.fillStyle = "rgba(92,178,112," + alpha + ")";
							ctx.arc(250, 250, radius, 0, 2 * Math.PI, false);
							ctx.fill();
							ctx.closePath();
						}
				
						ctx.beginPath();
						ctx.fillStyle = "rgb(100,194,122)";
						ctx.arc(250, 250, ringsize / 2, 0, 2 * Math.PI, false);
						ctx.fill();
						ctx.closePath();
				
						animationframe = (animationframe >= (FRAMES_PER_CYCLE - 1)) ?  0 :  animationframe + 1;
					}
					this.__interval = setInterval(animateRadarFrame, 1000 / FRAMERATE);
				},
				
				__stopRadarScan: function()
				{
					if(!this.isRadarVisible) return;
					clearInterval(this.__interval);
					this.isRadarVisible = false;
					this.__enablePanel();
				},
				
				__disablePanel: function()
				{
					this.inProgress = true;
					for (var i = 0; i < this.panel.length; i++) this.panel[i].setEnabled(false);
				},
				
				__enablePanel: function()
				{
					for (var i = 0; i < this.panel.length; i++) if(i>1) this.panel[i].setEnabled(true);
				},
				
				__createIcon: function(color, width, height)
				{
					var canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;
				
					var ctx = canvas.getContext("2d");
					ctx.beginPath();
					ctx.rect(0, 0, width, height);
					ctx.fillStyle = color;
					ctx.fill();
					ctx.closePath();
				
					var data = canvas.toDataURL("image/png");
					return data;
				},
				
				__updateList: function()
				{
					var dm = this.__displayM;
					this.__selectedA = null;
					this.allianceList.removeAll();
					var d = this.receivedData, root = this;
					var colors = {"enemy":["#ff807d", "#a93939", "#739bf5", "#c26b89"], "ally": ["#3bbe5d", "#c4d663", "#73f5ed", "#169f16"], "nap": ["#ffffff"], "selected": ["#ffe50e"], "alliance": ["#75b7d9"], "owner": ["#ffc48b"]};
					for (var i = 0; i < d.length; i++)
					{
						var name = d[i][0].name, type = d[i][1], aid = d[i][0].id, clr = d[i][2];
						if((dm == "all") || (dm == "selected"))
						{
							var color = colors[type][clr];
							var li = new qx.ui.form.ListItem(name, root.__createIcon(color, 10, 10), aid);
							var tooltip = new qx.ui.tooltip.ToolTip(name + " - " + type, root.__createIcon(color, 15, 15));
							li.setToolTip(tooltip);
							this.allianceList.add(li);
						}
						else
						{
							if(type == "alliance")
							{
								var li = new qx.ui.form.ListItem(name, null, aid);
								var tooltip = new qx.ui.tooltip.ToolTip(name + " - " + type, root.__createIcon(color, 15, 15));
								li.setToolTip(tooltip);
								this.allianceList.add(li);
								break;
							}
						}
					}
				},
				
				drawCanvas: function()
				{
					var dmd = this.__displayM, b = this.receivedData, list = this.allianceList;
					var selected = (this.__selectedA != null && typeof this.__selectedA == 'number') ? this.__selectedA : false;
					var mask = this.mask, n = this.scale, canvas = this.canvas, ctx = this.ctx;
					
					this.elements = [];
					this.locations = [];
					this.__stopRadarScan();
					canvas.width = n * 500;
					canvas.height = n * 500;
					ctx = canvas.getContext("2d");
					ctx.scale(n, n);
					
					this.__createLayout();
					
					for (var i = 0; i < b.length; i++)
					{
						var name = b[i][0].name, data = b[i][0], type = b[i][1], aid = b[i][0].id, color = b[i][2];
						if(((dmd == "alliance") || (dmd == "bases")) && (type == "alliance"))
						{
							this.__createAlliance(name, data, type, 0);
							break;
						}
						if(dmd == "all")
						{
							if(selected && (aid == selected))
							{
								type = 'selected';
								color = 0;
							}
							this.__createAlliance(name, data, type, color);
						}
						if((dmd == "selected") && selected && (aid == selected))
						{
								this.__createAlliance(name, data, type, color);
								break;
						}
					}
				},
					
				__scaleMap: function(str)
				{
					try
					{
						var newScale = (str == 'up') ? this.scale + 2 : this.scale - 2;
						if (newScale > 12 || newScale < 1 || this.inProgress) return;
						var canvas = this.canvas, ctx = this.ctx;
						var x = ((canvas.offsetLeft - 250) * newScale/this.scale) + 250,
							y = ((canvas.offsetTop - 250) * newScale/this.scale) + 250;
							
						this.scale = newScale;
						switch (this.scale)
						{
							case 1: this.zoomOut.setEnabled(false); this.zoomReset.setEnabled(false); this.zoomIn.setEnabled(true); break
							case 11: this.zoomOut.setEnabled(true); this.zoomReset.setEnabled(true); this.zoomIn.setEnabled(false); break
							default: this.zoomOut.setEnabled(true); this.zoomReset.setEnabled(true); this.zoomIn.setEnabled(true); break
						}
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						this.drawCanvas();
						canvas.style.left = newScale == 1 ? 0 : x + 'px';
						canvas.style.top = newScale == 1 ? 0 : y + 'px';
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				resetMap: function()
				{
					var canvas = this.canvas, ctx = this.ctx;
					this.scale = 1;
					canvas.width = 500; canvas.height = 500; canvas.style.left = 0; canvas.style.top = 0;
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					this.__disablePanel();
					this.__startRadarScan();
				},
				
				open: function(faction)
				{
					
					var app = qx.core.Init.getApplication();
					var mainOverlay = app.getMainOverlay();
				   
					this.setWidth(mainOverlay.getWidth());
					this.setMaxWidth(mainOverlay.getMaxWidth());
					this.setHeight(mainOverlay.getHeight());
					this.setMaxHeight(mainOverlay.getMaxHeight());
					
					app.getDesktop().add(this, { left: mainOverlay.getBounds().left, top: mainOverlay.getBounds().top });
				},
				
				_onClose: function()
				{
					var opt = ccta_map.options.getInstance();
					var app = qx.core.Init.getApplication();
					app.getDesktop().remove(this);
					if(opt.isSeeable()) opt.close();
				},
				
				_onResize: function()
				{
					var windowWidth = window.innerWidth - 10;
					var width = this.getWidth();
					var offsetLeft = (windowWidth - width) / 2;
					
					this.setDomLeft(offsetLeft);
					
					var opt = ccta_map.options.getInstance();
					if (opt.isSeeable()) opt.setDomLeft(offsetLeft + width + 5);
				}
				
			}
		});
			
		qx.Class.define('ccta_map.options',
		{
			type: 'singleton',
			extend: webfrontend.gui.CustomWindow,
			
			construct: function()
			{
				try
				{
					this.base(arguments);
					this.setLayout(new qx.ui.layout.VBox(10));
					this.set({
						width: 200,
						height: 500,
						showMinimize: false,
						showMaximize: false,
						alwaysOnTop: true,
						caption: 'Edit Alliances'
					});
					
					this.__getAlliances();
					
					var root = this;
									
					var searchBox = new qx.ui.form.TextField().set({ placeholder: 'Search...'});
					var list = new qx.ui.form.List().set({ height: 80 });
					var editList = new qx.ui.form.List().set({ height: 160, selectionMode: 'additive' });
						
					var radioButtons = [['Enemy', 'enemy'],['Ally', 'ally'],['NAP', 'nap']];
					var radioGroup = new qx.ui.form.RadioButtonGroup().set({ layout: new qx.ui.layout.HBox(10), textColor: '#aaaaaa' });
						for (var i = 0; i < radioButtons.length; i++)
						{
							var radioButton = new qx.ui.form.RadioButton(radioButtons[i][0]);
								radioButton.setModel(radioButtons[i][1]);
							radioGroup.add(radioButton);
						}
					
					var colors = root.__colors;
					var colorSelectBox = new qx.ui.form.SelectBox().set({ height: 28 });
					var addColors = function(type)
					{
						colorSelectBox.removeAll();
						for (var i = 0; i < colors[type].length; i++)
						{
							var src = root.__createIcon(colors[type][i], 60, 15);
							var listItem = new qx.ui.form.ListItem(null, src, i);
							colorSelectBox.add(listItem);
						}
					};
					addColors('enemy');
						
					var addButton = new qx.ui.form.Button('Add').set({ enabled: false, width: 85, toolTipText: 'Maximum allowed number of alliances is 8.' });;
					var removeButton = new qx.ui.form.Button('Remove').set({ enabled: false, width: 85 });;
					var applyButton = new qx.ui.form.Button('Apply').set({ enabled: false });;
					var defaultsButton = new qx.ui.form.Button('Defaults').set({ enabled: false, width: 85 });;
					var saveButton = new qx.ui.form.Button('Save').set({ enabled: false, width: 85 });;
					
					var hbox1 = new qx.ui.container.Composite(new qx.ui.layout.HBox(10))
					var hbox2 = new qx.ui.container.Composite(new qx.ui.layout.HBox(10))
					
					hbox1.add(addButton);
					hbox1.add(removeButton);
					
					hbox2.add(saveButton);
					hbox2.add(defaultsButton);
						
					this.searchBox      = searchBox;
					this.list           = list;
					this.editList       = editList;
					this.radioGroup     = radioGroup;
					this.colorSelectBox = colorSelectBox;
					this.addButton      = addButton;
					this.removeButton   = removeButton;
					this.saveButton     = saveButton;
					this.defaultsButton = defaultsButton;
					this.applyButton    = applyButton;
					
					this.add(searchBox);
					this.add(list);
					this.add(editList);
					this.add(radioGroup);
					this.add(colorSelectBox);
					this.add(hbox1);
					this.add(hbox2);
					this.add(applyButton);
					
					this.addListener('appear', function()
					{
						var cont = ccta_map.container.getInstance()
						var bounds = cont.getBounds(), left = bounds.left, top = bounds.top, width = bounds.width, height = bounds.height;
						searchBox.setValue('');
						list.removeAll();
						addButton.setEnabled(false);
						removeButton.setEnabled(false);
						applyButton.setEnabled(false);
						radioGroup.setSelection([ radioGroup.getSelectables()[0] ]);
						colorSelectBox.setSelection([ colorSelectBox.getSelectables()[0] ]);
						this.__updateList();
						this.__checkDefaults();
						this.__checkSavedSettings();
						this.setUserBounds(left + width + 5, top, 200, height);
					}, this);
					
					searchBox.addListener('keyup', this.__searchAlliances, this);
					
					radioGroup.addListener('changeSelection', function(e)
					{
						if(e.getData()[0]) addColors(e.getData()[0].getModel());
					}, this);
					
					list.addListener('changeSelection', function(e)
					{
						if (!e.getData()[0]) return;
						var items = this.__items, aid = e.getData()[0].getModel();
						(((items != null) && (items.indexOf(aid) > -1)) || (items.length > 8)) ? addButton.setEnabled(false) : addButton.setEnabled(true);
					}, this);
					
					editList.addListener('changeSelection', function(e)
					{
						(e.getData()[0]) ? removeButton.setEnabled(true) : removeButton.setEnabled(false);
					}, this);
					
					addButton.addListener('execute', function()
					{
						var aid = list.getSelection()[0].getModel(), 
							name = list.getSelection()[0].getLabel(),
							type = radioGroup.getSelection()[0].getModel(), 
							color = colorSelectBox.getSelection()[0].getModel();
						
						var li = new qx.ui.form.ListItem(name + " - " + type, root.__createIcon(colors[type][color], 15, 15), {'aid': aid, 'type': type, 'name': name, 'color': color});
						editList.add(li);
						list.resetSelection();
						addButton.setEnabled(false);
						root.__updateItems();
					}, this);
					
					removeButton.addListener('execute', function()
					{
						var selection = (editList.isSelectionEmpty()) ? null : editList.getSelection();
						var ownAlliance = ccta_map.getInstance().__allianceName;
						if(selection != null)
						{
							for(var i = selection.length - 1; i > -1; i--) if(selection[i].getModel().name != ownAlliance) editList.remove(selection[i]);
							root.__updateItems();
							editList.resetSelection();
						}
					}, this);
					
					applyButton.addListener('execute', this.__applyChanges, this);
					defaultsButton.addListener('execute', this.__setDefaults, this);
					saveButton.addListener('execute', this.__saveSettings, this);
		
				}
				catch(e)
				{
					console.log(e.toString());
				}
				console.log('Options Panel creation completed');
			},
			destruct: function()
			{
				
			},
			members:
			{
				__data: null,
				searchBox: null,
				list: null,
				editList: null,
				radioGroup: null,
				colorSelectBox: null,
				addButton: null,
				removeButton: null,
				saveButton: null,
				applyButton: null,
				defaultsButton: null,
				__items: null,
				__colors: {"enemy":["#ff807d", "#a93939", "#739bf5", "#c26b89"], "ally": ["#3bbe5d", "#c4d663", "#73f5ed", "#169f16"], "nap": ["#ffffff"], "selected": ["#ffe50e"], "alliance": ["#75b7d9"], "owner": ["#ffc48b"]},
		
				
				__getAlliances: function()
				{
					var root = this;
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("RankingGetData", 
					{firstIndex: 0, lastIndex: 3000, ascending: true, view: 1, rankingType: 0, sortColumn: 2}, 
					phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
					{
						if(data.a != null)
						{
							var arr = [];
							for( var i = 0; i < data.a.length; i++) arr[i] = [data.a[i].an, data.a[i].a];
							root.__data = arr;
						}
						
					}), null);
				},
				
				__createIcon: function(color, width, height)
				{
					var canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;
				
					var ctx = canvas.getContext("2d");
					ctx.beginPath();
					ctx.rect(0,0,width,height);
					ctx.fillStyle = color;
					ctx.fill();
					ctx.closePath();
				
					var data = canvas.toDataURL("image/png");
					return data;
				},
				
				__updateList: function()
				{
					var map = ccta_map.getInstance();
					var selectedItems = [], list = this.editList, root = this;
					var alliancesList = (map.__selectedAlliances == null) ? map.__defaultAlliances : map.__selectedAlliances;
					var colors = this.__colors;
					list.removeAll();
					
					alliancesList.map(function(a)
					{
						var aid = a[0], at = a[1], an  = a[2], c = a[3];
						var li = new qx.ui.form.ListItem(an + " - " + at, root.__createIcon(colors[at][c], 15, 15), {'aid': aid, 'type': at, 'name': an, 'color': c});
						list.add(li);
						selectedItems.push(aid);
					});
					this.__items = selectedItems;
				},
				
				__setDefaults: function()
				{
					var map = ccta_map.getInstance();
					var selectedItems = [], list = this.editList, root = this, colors = this.__colors;
					var alliancesList = map.__defaultAlliances;
					list.removeAll();
					
					alliancesList.map(function(a)
					{
						var aid = a[0], at = a[1], an  = a[2], c = a[3];
						var li = new qx.ui.form.ListItem(an + " - " + at, root.__createIcon(colors[at][c], 15, 15), {'aid': aid, 'type': at, 'name': an, 'color': c});
						list.add(li);
						selectedItems.push(aid);
					});
					this.__items = selectedItems;
					this.__currentListModified();
					this.defaultsButton.setEnabled(false);
				},
				
				__searchAlliances: function()
				{
					var str = this.searchBox.getValue(), data = this.__data, list = this.list;
					list.removeAll();
					if (!data || (str == '')) return;
					
					data.map(function(x)
					{
						var patt = new RegExp("^" + str + ".+$", "i");
						var test = patt.test(x[0]);
						
						if(test)
						{
							var listItem = new qx.ui.form.ListItem(x[0], null, x[1]);
							list.add(listItem);
						}
					});
				},
				
				__updateItems: function()
				{
					var items = [], listItems = this.editList.getSelectables();
					for (var i = 0; i < listItems.length; i++) items.push(listItems[i].getModel().aid);
					this.__items = items;
					this.__checkSavedSettings();
					this.__currentListModified();
				},
				
				__applyChanges: function()
				{
					var selectedAlliances = [], listItems = this.editList.getSelectables();
					for(var i = 0; i < listItems.length; i++)
					{
						var model = listItems[i].getModel(), aid = model.aid, type = model.type, name = model.name, color = model.color;
						selectedAlliances.push([aid, type, name, color]);
					}
					ccta_map.getInstance().__selectedAlliances = selectedAlliances;
					ccta_map.container.getInstance().resetMap();
					ccta_map.getInstance().getData();
					this.close();
				},
				
				__saveSettings: function()
				{
					if(typeof(Storage) === 'undefined') return;
					
					var selectedAlliances = [], listItems = this.editList.getSelectables();
					for(var i = 0; i < listItems.length; i++)
					{
						var model = listItems[i].getModel(), aid = model.aid, type = model.type, name = model.name, color = model.color;
						selectedAlliances.push([aid, type, name, color]);
					}
					
					(!localStorage.ccta_map_settings) ? localStorage['ccta_map_settings'] = JSON.stringify(selectedAlliances) : localStorage.ccta_map_settings = JSON.stringify(selectedAlliances);
					this.saveButton.setEnabled(false);
		//			console.log(localStorage.ccta_map_settings);
				},
				
				__checkSavedSettings: function()
				{
					if(typeof(Storage) === 'undefined') return;
					var original = (localStorage.ccta_map_settings) ? JSON.parse(localStorage.ccta_map_settings) : null;
					var items = this.__items;
					var changed = false;
					
					if ((items != null) && (original != null) && (items.length != original.length)) changed = true;
					if ((items != null) && (original != null) && (items.length == original.length))
					{
						original.map(function(x)
						{
							if (items.indexOf(x[0]) < 0) changed = true;
						});
					}
					((items.length > 0) && ((original === null) || changed)) ? this.saveButton.setEnabled(true) : this.saveButton.setEnabled(false);
				},
				
				__checkDefaults: function()
				{
					var defaults = ccta_map.getInstance().__defaultAlliances, items = this.__items, changed = false;
					if(!defaults) return;
					if ((items != null) && (defaults != null) && (items.length != defaults.length)) changed = true;
					if ((items != null) && (defaults != null) && (items.length == defaults.length))
					{
						defaults.map(function(x)
						{
							if (items.indexOf(x[0]) < 0) changed = true;
						});
					}
					(changed) ? this.defaultsButton.setEnabled(true) : this.defaultsButton.setEnabled(false);
				},
				
				__currentListModified: function()
				{
					var map = ccta_map.getInstance(), current = (map.__selectedAlliances == null) ? map.__defaultAlliances : map.__selectedAlliances;
					var items = this.__items, changed = false;
					
					current.map(function(x)
					{
						if(items.indexOf(x[0]) < 0) changed = true;
					});
					((items.length > 0) && ((items.length != current.length) || (changed == true))) ? this.applyButton.setEnabled(true) : this.applyButton.setEnabled(false);
				}
				
			}
		});
	}
	
	var cctaMapLoader = function()
	{
		var qx = window["qx"];
		var ClientLib = window["ClientLib"];
		var webfrontend = window["webfrontend"];
		
		if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
		{
			setTimeout(cctaMapLoader, 1000);
			console.log('retrying....');
		}
		else
		{
			create_ccta_map_class();
			ccta_map.getInstance();
		}
	};
	window.setTimeout(cctaMapLoader, 10000);

})();
// ==UserScript==
// @name Tiberium Alliances PvP/PvE Player Info Mod
// @description Separates the number of bases destroyed into PvP and PvE in the Player Info window. Now also includes a tab showing all the POI the player is holding.
// @namespace player_info_mod
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.2
// @author KRS_L
// ==/UserScript==
(function () {
	var PlayerInfoMod_main = function () {
		var playerInfoWindow = null;
		var general = null;
		var pvpScoreLabel = null;
		var pveScoreLabel = null;
		var playerName = null;
		var tabView = null;
		var tableModel = null;
		var baseCoords = null;
		var rowData = null;

		function createPlayerInfoMod() {
			try {
				console.log('Player Info Mod loaded');
				var tr = qx.locale.Manager.tr;
				playerInfoWindow = webfrontend.gui.info.PlayerInfoWindow.getInstance();
				general = playerInfoWindow.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[1].getChildren()[0];
				tabView = playerInfoWindow.getChildren()[0];
				playerName = general.getChildren()[1];

				var pvpLabel = new qx.ui.basic.Label("- PvP:");
				pvpScoreLabel = new qx.ui.basic.Label("").set({
					textColor: "text-value",
					font: "font_size_13_bold"
				});
				general.add(pvpLabel, {
					row: 3,
					column: 3
				});
				general.add(pvpScoreLabel, {
					row: 3,
					column: 4
				});

				var pveLabel = new qx.ui.basic.Label("- PvE:");
				pveScoreLabel = new qx.ui.basic.Label("").set({
					textColor: "text-value",
					font: "font_size_13_bold"
				});
				general.add(pveLabel, {
					row: 4,
					column: 3
				});
				general.add(pveScoreLabel, {
					row: 4,
					column: 4
				});

				var poiTab = new qx.ui.tabview.Page("POI");
				poiTab.setLayout(new qx.ui.layout.Canvas());
				poiTab.setPaddingTop(6);
				poiTab.setPaddingLeft(8);
				poiTab.setPaddingRight(10);
				poiTab.setPaddingBottom(8);

				tableModel = new webfrontend.data.SimpleColFormattingDataModel().set({
					caseSensitiveSorting: false
				});

				tableModel.setColumns([tr("tnf:name"), tr("tnf:lvl"), tr("tnf:points"), tr("tnf:coordinates")], ["t", "l", "s", "c"]);
				tableModel.setColFormat(3, "<div style=\"cursor:pointer;color:" + webfrontend.gui.util.BBCode.clrLink + "\">", "</div>");
				var poiTable = new webfrontend.gui.widgets.CustomTable(tableModel);
				poiTable.addListener("cellClick", centerCoords, this);

				var columnModel = poiTable.getTableColumnModel();
				columnModel.setColumnWidth(0, 250);
				columnModel.setColumnWidth(1, 80);
				columnModel.setColumnWidth(2, 120);
				columnModel.setColumnWidth(3, 120);
				columnModel.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Html());
				columnModel.getDataCellRenderer(2).setUseAutoAlign(false);
				poiTable.setStatusBarVisible(false);
				poiTable.setColumnVisibilityButtonVisible(false);
				poiTab.add(poiTable, {
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				});
				tabView.add(poiTab);

				playerInfoWindow.addListener("close", onPlayerInfoWindowClose, this);
				playerName.addListener("changeValue", onPlayerChanged, this);

			} catch (e) {
				console.log("createPlayerInfoMod: ", e);
			}
		}

		function centerCoords(e) {
			try {
				var poiCoord = tableModel.getRowData(e.getRow())[3].split(":");
				if (e.getColumn() == 3) webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(Number(poiCoord[0]), Number(poiCoord[1]));
			} catch (e) {
				console.log("centerCoords: ", e);
			}
		}

		function onPlayerInfo(context, data) {
			try {
				pvpScoreLabel.setValue((data.bd - data.bde).toString());
				pveScoreLabel.setValue(data.bde.toString());
				var bases = data.c;
				baseCoords = new Object;
				for (var i in bases) {
					var base = bases[i];
					baseCoords[i] = new Object();
					baseCoords[i]["x"] = base.x;
					baseCoords[i]["y"] = base.y;
				}
				ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", {
					id: data.a
				}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onAllianceInfo), null);
			} catch (e) {
				console.log("onPlayerInfo: ", e);
			}
		}

		function onAllianceInfo(context, data) {
			try {
				rowData = [];
				var pois = data.opois;
				for (var i in pois) {
					var poi = pois[i];
					for (var j in baseCoords) {
						var distanceX = Math.abs(baseCoords[j].x - poi.x);
						var distanceY = Math.abs(baseCoords[j].y - poi.y);
						if (distanceX > 2 || distanceY > 2) continue;
						if (distanceX == 2 && distanceY == 2) continue;
						var name = phe.cnc.gui.util.Text.getPoiInfosByType(poi.t).name;
						var level = poi.l;
						var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(poi.l);
						var coords = phe.cnc.gui.util.Numbers.formatCoordinates(poi.x, poi.y);
						rowData.push([name, level, score, coords]);
						break;
					}
				}
				tableModel.setData(rowData);
				tableModel.sortByColumn(0, true);
			} catch (e) {
				console.log("onAllianceInfo: ", e);
			}
		}

		function onPlayerChanged() {
			try {
				if (playerName.getValue().length > 0) {
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {
						name: playerName.getValue()
					}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerInfo), null);
				}
			} catch (e) {
				console.log("onPlayerChanged: ", e);
			}
		}

		function onPlayerInfoWindowClose() {
			try {
				pvpScoreLabel.setValue("");
				pveScoreLabel.setValue("");
				tableModel.setData([]);
			} catch (e) {
				console.log("onPlayerInfoWindowClose: ", e);
			}
		}

		function PlayerInfoMod_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined') {
					if (ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders() !== null && ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l.length != 0) {
						createPlayerInfoMod();
					} else {
						window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
					}
				} else {
					window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("PlayerInfoMod_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
		}
	}

	try {
		var PlayerInfoMod = document.createElement("script");
		PlayerInfoMod.innerHTML = "(" + PlayerInfoMod_main.toString() + ")();";
		PlayerInfoMod.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(PlayerInfoMod);
		}
	} catch (e) {
		console.log("PlayerInfoMod: init error: ", e);
	}
})();
// ==UserScript==
// @name          CnC: Tiberium Alliances Available Loot Summary + Info Ver 2.0
// @description   CROSS SERVERS Loot & troops & bases & distance info.
// @version       2.04
// @author        MrHIDEn (in game: PEEU) based on Yaeger & Panavia code.
// @namespace     MHTools.Loot
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/160800.user.js
// @updateURL     https://userscripts.org/scripts/source/160800.meta.js
// ==/UserScript==
(function () {
  var MHLootMain = function () {    
    function MHToolsLootCreate() {        
      //console.log('MHToolsLootCreate');
      // Classes
      //=======================================================      
      //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
      function OptionsPage() {
        try {
          qx.Class.define("MHTools.OptionsPage", {
            type: 'singleton',
            extend: webfrontend.gui.options.OptionsPage,
            construct: function() {
              console.log('Create MHTools.OptionsPage at Loot+Info');
              this.base(arguments);
              this.setLabel('MHTools');
              
              this.extendOptionsWindow();
              
              //Add Content
              var container = this.getContentContainer(); 
              this.tabView = new qx.ui.tabview.TabView();
              container.add(this.tabView);//, {left:40, top:40});
              
              this.removeButtons();
              this.addPageAbout();
              console.log('MHTools: OptionsPage loaded.'); 
            },
            statics: {
              VERSION: '1.0.0',
              AUTHOR: 'MrHIDEn',
              CLASS: 'OptionsPage'
            },
            members: {
              pageCreated: null,
              tabView: null,
              getTabView: function() {
                return this.tabView;
              },
              addPage: function(name) {
                var c = this.tabView.getChildren();
                this.tabView.remove(c[c.length-1]);//remove PageAbout
                var page = new qx.ui.tabview.Page(name);
                page.set({height:220});
                this.tabView.add(page);
                this.addPageAbout();
                return page;
              },
              addPageAbout: function() {
                var page = new qx.ui.tabview.Page("About");
                page.set({height:220});
                this.tabView.add(page);
                page.setLayout(new qx.ui.layout.VBox());
                page.add(new qx.ui.basic.Label("<b>MHTools</b>").set({rich: true}));//, textColor: red
                page.add(new qx.ui.basic.Label("Created: <span style='color:blue'>2012</span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Author: <span style='color:blue'><b>MrHIDEn</b></span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Email: <a href='mailto:mrhiden@outlook.com'>mrhiden@outlook.com</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Public: <a href='https://userscripts.org/users/471241'>userscripts.org - MrHIDEn</a></br> ").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137978'>Aviable Loot +Info</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/135806'>Shortcuts +Coords</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Shorten Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/136743'>Coords 500:500</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/145657'>Pure Loot summary</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137955'>Login x9 + Logout</a>").set({rich: true,marginLeft:10}));
              },
              removeButtons: function() {
                this.getChildren()[2].removeAll();
              },
              getContentContainer: function() {
                  if(!this.contentCnt) {
                      this.contentCnt = this.getChildren()[0].getChildren()[0];
                  }
                  return this.contentCnt;
              },
              extendOptionsWindow: function() {
                var self = this;
                if(!webfrontend.gui.options.OptionsWidget.prototype.baseShow) {
                  webfrontend.gui.options.OptionsWidget.prototype.baseShow = webfrontend.gui.options.OptionsWidget.prototype.show;
                }
                webfrontend.gui.options.OptionsWidget.prototype.show = function() {
                  try {
                    var tabView = this.clientArea.getChildren()[0];
                    tabView.add(self);
                    webfrontend.gui.options.OptionsWidget.prototype.show = webfrontend.gui.options.OptionsWidget.prototype.baseShow;
                    self.pageCreated = true;
                    this.show();
                  } catch (e) {            
                    console.warn("MHTools.OptionsPage.extendOptionsWindow: ", e);
                  }
                };
              }
            }
          });
        } catch (e) {
          console.warn("qx.Class.define(MHTools.OptionsPage: ", e);      
        }
      }
      //=======================================================  
      try {
        qx.Class.define("MHTools.Loot", {
          type: 'singleton',
          extend: qx.core.Object,
          construct: function() {         
            //console.log('Create MHTools.Loot');
            this.stats.src = 'http://goo.gl/IDap9';//2.0.x
            var version = MHTools.Loot.VERSION.toString();
            //this.base(arguments);
            for(var k in this.resPaths) {
              this.resImages.push(new qx.ui.basic.Image("webfrontend/ui/common/"+this.resPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            for(var k in this.troopPaths) {
              this.troopImages.push(new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/"+this.troopPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            // reload bases stored in browser
            //this.lootList.reloadList();
            function Types(o) {
              var a = [];
              for(var k in o) a[o[k]] = k;
              return a;
            }             
            this.LObjectType = Types(ClientLib.Vis.VisObject.EObjectType);
            this.LViewMode = Types(ClientLib.Vis.Mode);
            
            // window
            this.Self = this;
            var backColor = '#eef';
            var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
            var viewW = region.get_ViewWidth();
            this.win = (new qx.ui.window.Window("Loot "+version));
            this.win.set({
              width:350,
              showMinimize:false,
              showMaximize:false,
              showClose:true,
              contentPadding: 6,
              allowClose:true,
              resizable:false,                  
              toolTipText: "MrHIDEn tool - Loot "+version
            });
            //http://demo.qooxdoo.org/2.0.2/apiviewer/#qx.ui.mobile.core.Widget~dblclick!event
            //mouseover
            //qx.event.Timer.once(fun,obj,time)
            /*NOTE
            MHTools.Loot.getInstance().win.toggleActive();
            MHTools.Loot.getInstance().win.setUseMoveFrame(1)
            MHTools.Loot.getInstance().win.moveTo(100,100);
            MHTools.Loot.getInstance().win.setLayoutProperties({left:200,top:100});
            lp=MHTools.Loot.getInstance().win.getLayoutProperties();
            //Object { left=586, top=112}
            */
            this.win.addListener("mouseover",function(e) {
                //this.extTimer.stop();
                //this.win.close(); 
            },this);
            this.win.addListener("move", function(e) {
              console.log('win MOVE');
              var pos = {left:e.getData().left, top:e.getData().top};
              if(pos!==null) {
                var S = ClientLib.Base.LocalStorage;
                if (S.get_IsSupported()) S.SetItem(this.classname+".winpos", pos);
              }
            }, this);
            this.win.addListener("click",function(e) {
                //webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(this.Data.Selected.X,this.Data.Selected.Y);
            },this);
            this.win.addListener("dblclick",function(e) {
                this.extTimer.stop();
                this.win.close(); 
            },this);
            this.win.addListener("close",function(e) {
                this.extTimer.stop();
                //this.win.close(); 
            },this);
            this.win.addListener("minimize",function(e) {
              if(this.extMinimized) {
                this.extMinimized = false;
                this.extPrint();
              }
              else {
                this.extMinimized = true;                
                this.win.removeAll();
              }
              this.win.restore();//trick
            },this);
            var pos = {left:(viewW-10-this.win.getWidth()), top:35};
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) {
              var posSaved = S.GetItem(this.classname+".winpos");
              if(posSaved!==null) {
                pos = posSaved;
              }
            }
            this.win.moveTo(pos.left, pos.top);
            var winLayout = new qx.ui.layout.Grid(5,5);
            this.win.setLayout(winLayout);
            this.win.setTextColor('yellow');   
            
            //this.extTimer = new qx.event.Timer.once(this.extOnTimer,this,500);
            this.extTimer = new qx.event.Timer(1000);
            this.extTimer.addListener("interval",this.extOnTimer,this);
            
            this.extendSelectionChange();
            this.extendViewModeChange();
            //options
            this.addLootPage();
            //bypass
            this.loadBypass();
            //rdy
            console.log('MHTools: Loot+Info '+version+' loaded.');
          },
          statics : {
            VERSION: 2.04,
            AUTHOR: 'MrHIDEn',
            CLASS: 'Loot',
            DATA: this.Data,
            LOOTLIST: this.lootList
          },
          members : {
            Self: null,
            win: null,
            extStoreName: this.classname,
            extItems: [],
            extMinimized: false,
            extTimer: null,
            extAdd: function(l,p) {
              this.extItems.push(l,p);
            },
            extPrint: function(type) {            
              this.win.removeAll();
              if(!this.extMinimized) {
                for(var i=0;i<this.extItems.length;i+=2) {
                  this.win.add(this.extItems[i],this.extItems[i+1]);
                }
              }
              this.win.open();
            },
            extOnTimer: function() {
              //console.log('extOnTimer');
              this.onSelectionChange('Timer');
              this.extPrint();
            },
            // setttings
            settings: {
              showLoot:                {v:true,  d:true,  l:'Shows Loot resources info'},
              showTroops:              {v:false, d:false, l:'Shows overall Hitpoints for Troops'},
              showTroopsExtra:         {v:false, d:false, l:'Shows Troops Hitpoints for Vehicles/Aircrafts/Infantry'},
              showInfo:                {v:true,  d:true,  l:'Shows HP/HC/DF/CY info'},
              showColumnCondition:     {v:false, d:false, l:'Shows your progress against DF/CY'},
              showRepairTime:          {v:true,  d:true,  l:'Shows Repair Times info for Enemy Base/Camp/Outpost'},
              showAllyRepairTimeInfo:  {v:true,  d:true,  l:'Shows Ally/Your Repair Times info'},
              showLevels:              {v:true,  d:true,  l:'Shows Levels of Base/Defence/Offence info'},
              showColumnLetter:        {v:false, d:false, l:'Shows columns letters for DF/CY position Ex A-1 or E-4. If \'false\' shows only 1 or 4'},
              showDistance:            {v:true,  d:true,  l:'Shows distance from selected base to the selected object'}
              //,showMeasure:             {v:true,  d:true,  l:'Shows distance from locked object to the selected object'}
            },
            // pictures
            stats: document.createElement('img'),
            resPaths: [
              "icn_res_research_mission.png",
              "icn_res_tiberium.png",
              "icn_res_chrystal.png",
              "icn_res_dollar.png"
            ],
            resImages: [],
            troopPaths: [
              "d8d4e71d9de051135a7f5baf1f799d77.png",//inf
              "af8d7527e441e1721ee8953d73287e9e.png",//veh
              "5f889719f06aad76f06d51863f8eb524.png",//stu
              "6962b667bd797fc2e9e74267e1b3e7c3.png" //air
            ],
            troopImages: [],
            // store v3
            lootList: {
              storeName: 'MHToolsLootList3',
              list: {
                d: {},
                c: 0
              },
              exist: function(xy) {
                return typeof(this.list.d[xy])=="object";
              },
              save: function(xy,d) {//in use
                //console.info("lootList.save");
                try {
                  if(xy<0) return;
                  //id could be not actual after some patch
                  var fprint = false;
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  if(!this.exist(xy)) {//new item
                    this.list.c++;
                    fprint = true;
                  }
                  this.list.d[xy] = {id:id, Data:d, xy:xy};
                  //if(fprint) console.dir(this.list.d);
                  // JSON - disabled
                  //var S = ClientLib.Base.LocalStorage;
                  //if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);  
                } catch (e) {
                  console.warn("lootList.save: ", e);
                }
              },
              load: function(xy) {//in use
                //console.info("lootList.load");
                try {
                  if(xy<0) return {id:id,Data:{}};
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  if(this.exist(xy)) return this.list.d[xy];
                  return {id:id,Data:{}};     
                } catch (e) {
                  console.warn("lootList.load: ", e);
                }
              },
              store: function(xy, k, d) {//in use
                //console.info("lootList.store key:",k);
                try {
                  var mem = this.load(xy).Data;
                  mem[k] = d;
                  this.save(xy,mem);        
                } catch (e) {
                  console.warn("lootList.store: ", e);
                }
              },
              restore: function(xy,k) {//?? NOT in use
                //console.info("lootList.restore");
                try {
                  var mem = this.load(xy).Data;
                  if(typeof(mem[k])=='undefined') return 'undefined';
                  return mem[k];    
                } catch (e) {
                  console.warn("lootList.restore: ", e);
                }
              }              
            },            
            // bases
            Data: {
              lastSelectedBaseId: -1,
              selectedBaseId: -1
            },
            // display containers
            lootWindowPlayer: null,
            lootWindowBase: null,
            lootWindowCamp: null,
            lootWindowOwn: null,
            lootWindowAlly: null,
            lootWindowPOI: null,
            lootWindowRUIN: null,
            lootWindowHUBServer: null,          
            waiting: [1,'0','_','1','_','2','_','3','_','4','_','5','_','6','_','7','_','8','_','9','_'],          
            Display: {
              troopsArray: [],
              lootArray: [],
              iconArrays: [],
              infoArrays: [],
              twoLineInfoArrays: [],
              distanceArray: []
            },
            LObjectType: [],
            LViewMode: [],
            viewMode: 0,//"None"
            // HELPERS
            kMG: function(v) {
              var t = [ '', 'k', 'M', 'G', 'T', 'P' ];
              var i = 0;
              while (v > 1000 && i < t.length) {
                v = (v / 1000).toFixed(1);
                i++;
              }
              return v.toString().replace('.',',') + t[i];
            },
            numberFormat: function(val,fixed) {
              return val.toFixed(fixed).replace('.',',');
            },
            hms: function(s) {
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + ":");
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms2: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + "d ");//  3:01:23:45
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString()) + "";
              return r;
            },
            hmsRT: function(city, type) {
              var nextLevelFlag = false;
              var s = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(type, nextLevelFlag);
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            // BYPASS
            getBypass: function(c,d) {
              try {
                function getKeys(obj, d) {
                  for (var k in obj) {
                    var o = obj[k];
                    if (o === null) continue;
                    if (typeof(o.c) == 'undefined') continue;//count
                    if (o.c === 0) continue;//empty
                    if (typeof(o.d) == 'undefined') continue;//data {}
                    var ks = Object.keys(o.d);
                    if (ks.length != o.c) continue;
                    var u = o.d[ks[0]];
                    if(typeof(u) != 'object') continue;                  
                    if(typeof(u.get_UnitLevelRepairRequirements) != 'function') continue;
                    if(typeof(u.GetUnitGroupType) ==  'undefined') {
                      // buildings
                      d.Keys.Buildings = k;
                      //c.GetNumBuildings.toString()==return this.XUQAIB.YYZSYN().c; //YYZSYN()==return this.GBZDQJ; //==this.XUQAIB.GBZDQJ.c
                    } else {
                      // units 3-attack
                      if(u.GetUnitGroupType()) {
                        d.Keys.Offences = k;
                      } else {
                        // units 0-defend
                        d.Keys.Defences = k;
                      }
                    }
                  }
                  if(typeof(d.Keys.Buildings)!='undefined') {
                    ClientLib.Data.City.prototype.kBuildings = d.Keys.Buildings;
                    ClientLib.Data.City.prototype.get_Buildings = function(){return this.get_CityBuildingsData()[this.kBuildings];};
                  }
                  if(typeof(d.Keys.Offences)!='undefined') {
                    ClientLib.Data.City.prototype.kOffenseUnits = d.Keys.Offences;
                    ClientLib.Data.City.prototype.get_OffenseUnits = function(){return this.get_CityUnitsData()[this.kOffenseUnits];};
                  }
                  if(typeof(d.Keys.Defences)!='undefined') {
                    ClientLib.Data.City.prototype.kDefenseUnits = d.Keys.Defences;
                    ClientLib.Data.City.prototype.get_DefenseUnits = function(){return this.get_CityUnitsData()[this.kDefenseUnits];};
                  }
                }
                if(typeof(d.Keys)=='undefined') d.Keys={};
                getKeys(c.get_CityBuildingsData(), d);
                getKeys(c.get_CityUnitsData(), d);
                var cnt=Object.keys(d.Keys).length;
                if(cnt==3) {
                  console.log('MHTools.Loot Helpers are ready:');
                  console.log(d.Keys);
                  delete d.Keys;
                  this.getBypass = function(){return true;};
                  return true;
                }
                else console.log('#Keys(!=3): ',cnt);
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
              //return d.Bypass.Rdy;
              return false;
            },
            loadBypass: function(self) {
              try {                
                if(typeof(self)=='undefined') self = this;
                var ac=ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                if(Object.keys(ac).length<1) {
                  window.setTimeout(self.loadBypass, 5000, self); // check again
                  return;
                }
                for(k in ac) if(self.getBypass(ac[k],self.Data)) break;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
            },
            getData: function(city) {
              try {   
                var l = {};  
                if(!this.getBypass(city,this.Data)) return l;
                
                l.Buildings = city.get_Buildings();
                l.Defences = city.get_DefenseUnits();
                l.Offences = city.get_OffenseUnits();
                
                l.rdy = true;              
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }               
              return l;
            },
            loadBase: function() { 
              try {
                //if (typeof(this.Data.lastSelectedBaseId)=='undefined') this.Data.lastSelectedBaseId = -1;//, Bypass: {}};
                
                var d = this.Data;    
                //console.info("loot.loadBase.lastID:",d.lastSelectedBaseId);      
                            
                d.selectedBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                d.selectedOwnBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                
                if (d.lastSelectedBaseId !== d.selectedBaseId) d.loaded = false;
                
                d.IsOwnBase = d.selectedBaseId === d.selectedOwnBaseId;
                            
                d.cc = ClientLib.Data.MainData.GetInstance().get_Cities();
                
                //d.ec = d.cc.GetCity(d.selectedBaseId);// this is very nice function
                d.ec = d.cc.get_CurrentCity();
                if(d.ec === null) return false;
                if(d.ec.get_CityBuildingsData() === null) return false;         
                if(d.ec.get_CityUnitsData() === null) return false;         
                
                d.oc = d.cc.get_CurrentOwnCity();            
                if(d.oc === null) return false;
                if(d.oc.get_CityBuildingsData() === null) return false;
                if(d.oc.get_CityUnitsData() === null) return false;
                
                d.ol = this.getData(d.oc);
                d.el = this.getData(d.ec);// Buildings Defence Offence               
                if(typeof(d.ol)=='undefined') return false;
                if(typeof(d.el)=='undefined') return false;

                if(d.el.Buildings.c === 0) return false;
                if(d.ol.Buildings.c === 0) return false;                 
                 
                //console.info("loot.loadBase.ID:",d.selectedBaseId); 
                d.lastSelectedBaseId = d.selectedBaseId; 
                d.loaded = true;
                return true;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
                console.dir("MHTools.Loot.Data: ",this.Data);
                return false;
              }
            },
            getImportants: function(list) {         
              list.Support = {Condition: '-',Row: '-',Column: '-'};
              list.CY = {Condition: '-',Row: '-',Column: '-'};
              list.DF = {Condition: '-',Row: '-',Column: '-'};
              if(!this.settings.showInfo.v) return;
              for (var j in list.Buildings.d) {
                var building = list.Buildings.d[j];
                var mod = building.get_HitpointsPercent();
                var id = building.get_MdbUnitId();
                if(id >= 200 && id <= 205) {
                  list.Support.Condition = 100*mod;
                  list.Support.Row = 8-parseInt(building.get_CoordY());
                  list.Support.Column = building.get_CoordX();
                } 
                else {
                  switch (id) {
                    case 112: // CONSTRUCTION YARD
                    case 151:
                    case 177:
                      list.CY.Condition = 100*mod;
                      list.CY.Row = 8-parseInt(building.get_CoordY());
                      list.CY.Column = building.get_CoordX();
                      break;
                    case 158: // DEFENSE FACILITY
                    case 131:
                    case 195:
                      list.DF.Condition = 100*mod;
                      list.DF.Row = 8-parseInt(building.get_CoordY());
                      list.DF.Column = building.get_CoordX();
                      break;
                    default:
                      break;
                  }
                }
              }
            },
            getLoots: function (ul,r) { 
              if(typeof(r)=='undefined') r={}; 
              //console.log('r',r);
              var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};//translate, ClientLib.Base.EResourceType.XXX
              for (var j in ul.d) {
                var u = ul.d[j];// unit/building
                //here are key infos about units ranges and behavior and more 
                //console.log(u.get_UnitGameData_Obj().n,u.get_UnitGameData_Obj());// unit/building
                var p = u.get_HitpointsPercent();// 0-1 , 1 means 100%               
                var cl = u.get_UnitLevelRepairRequirements();// EA API Resources/Repair Costs                
                for (var i in cl) {
                  var c = cl[i];//Requirement/Cost
                  if(typeof(c)!='object') continue;                
                  var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
                  if(typeof(r[k])=='undefined') r[k] = 0;//add branch
                  r[k] += p * c.Count;                 
                }
              }
              return r;
            },
            //NEW API for LOOTS
            getLoots2: function (r) {
              r = r || {};
              var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};
              var l=ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity();     
              for (var i in l) {
                var c = l[i];//Requirement/Cost
                if(typeof(c)!='object') continue;                
                var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
                if(typeof(r[k])=='undefined') r[k] = 0;//add branch
                r[k] += c.Count;                 
              }
              return r;
            },
            calcResources: function (xy) {
              //console.info("loot.calcResources"); 
              try {          
                if (!this.settings.showLoot.v) return;

                //console.log('Test getLoots2',this.getLoots2());
                if (!this.Data.loaded) return;
                //console.log('this.Data.loaded');
                
                this.Display.lootArray = [];            
                
                var el = this.Data.el;
                var ec = this.Data.ec;
                
                // NEW
                // ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity()
                var loots2 = this.getLoots2();              
                
                var loots = {RP:0, T:0, C:0, G:0};//for getLoots                
                
                this.getLoots(el.Buildings,loots);
                this.getLoots(el.Defences,loots);
                
                if(el.Offences.c>0) {
                  var off = this.getLoots(el.Offences);                  
                  //console.log('Offences: ',off);
                }
                
                this.Display.lootArray[0] = loots.RP;
                this.Display.lootArray[1] = loots.T;
                this.Display.lootArray[2] = loots.C;
                this.Display.lootArray[3] = loots.G;
                            
                this.lootList.store(xy,'lootArray',this.Display.lootArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcResources: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcTroops: function (xy) {
              //console.info("loot.calcTroops"); 
              try {
                if (!this.settings.showTroops.v) return;            

                if (!this.Data.loaded) return;            
                
                var troops = [0, 0, 0, 0, 0]; 
                
                var el = this.Data.el; 
                  
                // enemy defence units
                for (var j in el.Defences.d) {
                  var unit = el.Defences.d[j];
                  var h = unit.get_Health();//EA API
                  troops[0] += h;
                  if (this.settings.showTroopsExtra.v) {
                    switch (unit.get_UnitGameData_Obj().mt) {//keyTroop // TODO check .mt
                      case ClientLib.Base.EUnitMovementType.Feet:
                        troops[1] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Track:
                      case ClientLib.Base.EUnitMovementType.Wheel:
                        troops[2] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Structure:
                        troops[3] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Air:
                      case ClientLib.Base.EUnitMovementType.Air2:
                        troops[4] += h;
                        break;
                    }
                  }
                }
                this.Display.troopsArray = troops;
                this.lootList.store(xy,'troopsArray',this.Display.troopsArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcTroops: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcInfo: function (xy) { 
              //console.info("loot.calcInfo"); 
              this.Display.infoArrays = [];
              this.Display.twoLineInfoArrays = [];
              
              if (!this.Data.loaded) return;
              
              var hp;
              var t;         
              
              //var cc = this.Data.cc;
              var oc = this.Data.oc;
              var ec = this.Data.ec; 
              
              var ol = this.Data.ol;
              var el = this.Data.el; 
              
              if(this.settings.showInfo.v) { 
                try {                   
                  var ohp=0, dhp=0;
                  for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_Health();//own of units
                  for (var k in el.Defences.d) dhp += el.Defences.d[k].get_Health();//ene df units
                                  
                  // find CY & DF row/line
                  this.getImportants(el);
                  
                  hp = {};
                  hp.name = '<b>Info</b> (HP,HC - D/O ratio. Row.)';
                  hp.lbs = ['HP:','HC:','DF:','CY:'];
                  t = [];
                  t.push(this.numberFormat(dhp/ohp, 2));
                  t.push(this.numberFormat(ec.get_TotalDefenseHeadCount()/oc.get_TotalOffenseHeadCount(), 2));
                  var abc = "ABCDEFGHI";//abc[column]
                  if(this.settings.showColumnLetter.v) {
                    if(el.DF !== undefined) {t.push(abc[el.DF.Column]+ '-' + el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(abc[el.CY.Column]+ '-' + el.CY.Row);} else { t.push('??');}  
                  } else {
                    if(el.DF !== undefined) {t.push(el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(el.CY.Row);} else { t.push('??');}   
                  }                
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  // store
                  this.lootList.store(xy,'infoArrays',this.Display.infoArrays);                           
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 1: ", e);
                }
              }            
              if(this.settings.showColumnCondition.v) { 
                try {   
                  var bl = el.Buildings.d;
                  var dl = el.Defences.d;
                  
                  for(var k in bl) {
                    var b = bl[k];
                    if(b.get_TechName() == ClientLib.Base.ETechName.Defense_Facility) df = b;
                    if(b.get_TechName() == ClientLib.Base.ETechName.Construction_Yard) cy = b;
                  }

                  var tb;
                  var tbhp;
                  var cnt;
                  var mi;
                  var ma;
                  var dc;
                  
                  // CY
                  tb = cy;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  // scan
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    //if(o.get_CoordX() == tb.get_CoordX()) {
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var cyhp = tbhp;

                  // DF
                  tb = df;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var dfhp = tbhp;               
                  
                  hp = {};
                  hp.name = '<b>CY & DF column HP [%]</b>';
                  hp.lbs = ['CY:','DF:'];
                  t = [];
                  t.push(this.numberFormat(cyhp, 0));
                  t.push(this.numberFormat(dfhp, 0));        
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  //this.Display.twoLineInfoArrays.push(hp);
                  // store
                  this.lootList.store(xy,'infoArrays',this.Display.infoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 2: ", e);
                }
              }
              if(this.settings.showRepairTime.v) { 
                try {                 
                  var a = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ohp=0;
                  ohp = oc.GetOffenseConditionInPercent();
                  
                  var ool = this.numberFormat(oc.get_LvlOffense(), 1);
                  
                  hp = {};
                  hp.name = '<b>Repair time (Your offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  t.push(this.hms(am));
                  t.push(ohp);
                  t.push(ool);                 
                  hp.val = t;
                  //this.Display.infoArrays.push(hp);
                  this.Display.twoLineInfoArrays.push(hp);              
                  // store
                  this.lootList.store(xy,'twoLineInfoArrays',this.Display.twoLineInfoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 3: ", e);
                }
              }
            },
            calcFriendlyInfo: function(xy) {
              //console.info("loot.calcFriendlyInfo"); 
              this.Display.twoLineInfoArrays = [];
              if(!this.settings.showLevels.v && !this.settings.showAllyRepairTimeInfo.v) return;
                          
              try { 
                if (!this.Data.loaded) return;            
                
                var hp;
                var t;
                
                //var cc = this.Data.cc;
                var oc = this.Data.oc;
                var ec = this.Data.ec;
                
                var ol = this.Data.ol;
                var el = this.Data.el;            
                
                var IsOwn = this.Data.IsOwnBase;                
                
                
                if(this.settings.showLevels.v) { 
                  var sd = ec.get_SupportData();
                  var sn;
                  var sl;
                  if(sd !== null) {
                    sl = sd.get_Level();
                    sn = ec.get_SupportWeapon().dn; 
                  }
                
                  hp = {};
                  hp.name = '<b>Levels</b>';
                  hp.lbs = ['Base:','Defence:','Offence:','Support:'];
                  t = [];
                  if(el.Buildings.c>0) t.push(this.numberFormat(ec.get_LvlBase(), 1)); else t.push('--');  
                  if(el.Defences.c>0) t.push(this.numberFormat(ec.get_LvlDefense(), 1)); else t.push('--');  
                  if(el.Offences.c>0) t.push(this.numberFormat(ec.get_LvlOffense(), 1)); else t.push('--'); 
                  if(sd !== null) t.push(this.numberFormat(sl, 1)); else t.push('--'); 
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                }
              
                if(this.settings.showAllyRepairTimeInfo.v) {
                  
                  var a = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ofl;              
                  var ohp=0;
                  if(el.Offences.c>0) {
                    //my
                    //for (var k in el.Offences.d) ohp += el.Offences.d[k].get_HitpointsPercent();//get_Health();//Health - hitpoints
                    //ohp = 100.0 * ohp / el.Offences.c;
                    //console.log('Health',ohp,ec.GetOffenseConditionInPercent());
                    //ohp = this.numberFormat(ohp, 0);
                    //ea
                    ohp = ec.GetOffenseConditionInPercent();
                    //ohp = ec.GetOffenseConditionInPercent();//GetOffenseConditionInPercent ()
                    ofl = this.numberFormat(ec.get_LvlOffense(), 1);
                    //console.log('ec',ec,'ec.get_LvlOffense()',ec.get_LvlOffense());
                  } else {
                    ohp = '---';
                    ofl = '---';
                  }
                  
                  hp = {};
                  hp.name = IsOwn?'<b>Repair time (Your offence)</b>':'<b>Repair time (Ally offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  //t.push('---');
                  t.push(this.hms(am));
                  t.push(ohp); 
                  t.push(ofl);       
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                } 
                //this.Display.twoLineInfoArrays = twoLineInfoArrays;
                this.lootList.store(xy,'twoLineInfoArrays',this.Display.twoLineInfoArrays); 
              } catch (e) {
                console.warn("MHTools.Loot.calcFriendlyInfo: ", e);
              }
            },
            
//NOTE
//ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition
//ClientLib.Data.WorldSector.WorldObject GetObjectFromPosition (System.Int32 x ,System.Int32 y)
//ClientLib.Vis.City.CityObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.Region.RegionObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.VisObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Data.Hub GetObjectFromPosition (System.Int32 x ,System.Int32 y)
            calcDistance: function () {
              //console.info("loot.calcDistance"); 
              this.Display.distanceArray = [];
              
              var hp;
              
              if(!this.settings.showDistance.v) return;
              //console.log('calcDistance');              
              try {                
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject!==null) {
                  var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                  var t = visObject.get_VisObjectType();
                  switch (t) {                   
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin: 
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                      var ser = ClientLib.Data.MainData.GetInstance().get_Server();
                      var selX = visObject.get_RawX();
                      var selY = visObject.get_RawY();
                      var ocX = oc.get_X();
                      var ocY = oc.get_Y();          
                      var cenX = ser.get_ContinentWidth() / 2;
                      var cenY = ser.get_ContinentHeight() / 2;                        
                      //target is locked by button
                      // if(typeof(this.Data.Lock)=='undefined') {
                        // this.Data.Lock={X:ocX,Y:ocY};//{X:0,Y:0};
                      // }
                      //var locX = this.Data.Lock.X;                    
                      //var locY = this.Data.Lock.Y;
                      if(typeof(this.Data.Selected)=='undefined') {
                        this.Data.Selected={};
                      }
                      this.Data.Selected={X:selX,Y:selY};
                      var dis = ClientLib.Base.Util.CalculateDistance(ocX, ocY, selX, selY).toString();
                      var cen = ClientLib.Base.Util.CalculateDistance(cenX, cenY, selX, selY);
                      //var loc = ClientLib.Base.Util.CalculateDistance(locX, locY, selX, selY);
                      var cdt = oc.GetCityMoveCooldownTime(selX,selY);//cool down time
                      var stp = dis / 20;//steps
                      this.Data.Distance = dis;
                      //this.Data.MeasureDistance = loc;                      
                      var hp = {};
                      hp.name = '<b>Movement</b>';
                      hp.lbs = ['Distance:','EMT:','Steps:','To center:'];
                      var t = [];
                      t.push(dis);
                      t.push(this.dhms2(cdt));
                      t.push(stp);       
                      t.push(cen);       
                      hp.val = t;
                      this.Display.distanceArray.push(hp);
                      break;
                    default:
                      break;
                  }//switch (t) 
                }//if (visObject               
                //DISABLED this.lootList.store(xy,'distanceArray',this.Display.distanceArray);               
              } catch (e) {
                console.warn("MHTools.Loot.calcDistance: ", e);
              }
            },
            
            onSelectionChange: function(oldObject,newObject) {
              try { 
               if(qx.core.Init.getApplication().getChat().getFocused() || (qx.core.Init.getApplication().getPlayArea().getViewMode()!=ClientLib.Data.PlayerAreaViewMode.pavmNone)) {
                    //TODO something is wrong
                    //this.extTimer.stop();
                    //this.win.close();
                    //return;
                }            
                this.extItems = [];
                this.win.removeAll();
                this.win.close(); 
                
                if(oldObject=="Timer") {
                  //console.log("@Timer");
                }
                else {
                  //console.log("@Select");
                  this.Data.lastSelectedBaseId = -2;
                  this.waiting[0] = 1;
                }
                //ClientLib.Vis.SelectionChange
                //console.clear();
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if(visObject!==null) {
                  var vt = visObject.get_VisObjectType();
                  //console.log('onSelectionChange.Object: ',this.LObjectType[vt]);
                }
                else {
                  //console.log('onSelectionChange.Object: ','null');
                  this.Data.lastSelectedBaseId = -3;
                }
                
                if (visObject!==null) {
                  var t = visObject.get_VisObjectType();
                  //console.log('Vis Object Type:',t,', ',this.LObjectType[t]);
                  //console.log('!=null: Object type: ',this.LObjectType[t]);
                  //window.MHTools.visObject = visObject;
                  //window.visObject = visObject;
                  this.Data.visObject = visObject;
                  this.extTimer.start();
                  var xy = -1;
                  if(typeof(visObject.get_RawX)!='undefined') {
                    var xy = 10000 * visObject.get_RawX() + visObject.get_RawY();
                  }
                  switch (t) {                    
                    // Own bases, ally base
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                      //this.extTimer.setEnabled(true);
                      //this.extTimer.start();// does not work
                      var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                      var aid = oc.get_AllianceId();
                      var sid = visObject.get_AllianceId();
                      
                      this.calcDistance();                      
                      if(aid == sid) {
                        // Own, Ally
                        //clear                  
                        //self.Display.distanceArray = [];
                        if (this.loadBase() && oldObject=="Timer") {
                  this.extTimer.stop();
                          this.calcFriendlyInfo(xy);
                          this.addFriendlyLabel();
                        } else {
                          this.addLoadingLabel();
                        }
                      }
                      else {
                        // Enemy
                        if (this.loadBase() && oldObject=="Timer") {
                  this.extTimer.stop();
                          this.calcResources(xy);
                          this.calcTroops(xy);
                          this.calcInfo(xy);
                          this.addResourcesLabel();
                        } else {           
                          if(this.restoreDisplay(xy)) {
                            this.addResourcesLabel("r");
                          } else {          
                            this.addLoadingLabel();
                          }      
                        }
                      }
                      break;
                    // CAMP OUTPOST BASE
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                      this.calcDistance();
                      if (this.loadBase() && oldObject=="Timer") {
                  this.extTimer.stop();                       
                        this.calcResources(xy);
                        this.calcTroops(xy);
                        this.calcInfo(xy);
                        this.addResourcesLabel();
                      } else {          
                        if(this.restoreDisplay(xy)) {
                          this.addResourcesLabel("r");
                        } else {        
                          this.addLoadingLabel();
                        }
                      }
                      break;
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                      this.extTimer.stop();
                      //clear
                      this.Display.lootArray = [];
                      this.Display.troopsArray = [];
                      this.Display.infoArrays = [];
                      this.Display.twoLineInfoArrays = [];
                      this.calcDistance();
                      this.addResourcesLabel();
                      break;
                    default:
                      this.extTimer.stop();
                      this.win.close();
                      break;
                  }                  
                  // console.log('focusable: false');
                  // this.win.set({focusable: false});
                }
                else {                
                  this.extTimer.stop();
                  this.win.close();
                }
              } catch (e) {
                console.warn('MHTools.Loot.onSelectionChange: ', e);
              }
            },
            onViewChanged: function(oldMode, newMode) {
              //console.log('onViewChanged: ');
              // var p = qx.core.Init.getApplication().getPlayArea();
              // console.log('getViewMode',p.getViewMode());//0-map,1-base,2-def,3-off
              // qx.core.Init.getApplication().getPlayArea().getViewMode();
              // case ClientLib.Data.PlayerAreaViewMode.pavmCombatAttacker:
              // console.log('getViewCity',p.getViewCity());//id
              // var fH = ClientLib.Data.MainData.GetInstance().get_Combat();
              // qx.core.Init.getApplication().getPlayArea().getCurrentViewMode()
              // var c = qx.core.Init.getApplication().getChat();
              // c.getFocused();//good
              // c.getFocusedOrMoused();//good
              // qx.core.Init.getApplication().getChat().getFocusedOrMoused();
              try {
                //console.log('newMode: ',newMode);
                console.log('onViewChanged: ',this.LViewMode[newMode]);
                this.viewMode = newMode;
                if(newMode != ClientLib.Vis.Mode.Region) {
                  this.extTimer.stop();
                  this.win.close();
                }
              } catch (e) {
                console.warn('MHTools.Loot.onViewChanged: ', e);
              }
            },
            extendSelectionChange: function() {
              phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
            },
            extendViewModeChange: function() {
              //disabled
              //phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this , this.onViewChanged);
              
            },
            restoreDisplay: function(xy) {
              //console.info("loot.restoreDisplay");              
              var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
              if(this.lootList.exist(xy)) {
                var d = this.lootList.list.d[xy].Data;            
                var da = this.Display.distanceArray;
                this.Display = {};
                for(var k in d) this.Display[k] = d[k];
                this.Display.distanceArray = da;
                return true;
              }
              return false;
            },
            // DISPLAY data
            addLoadingLabel: function(widget) {
              //console.log('addLoadingLabel');
              try {
                this.extItems = [];
                //widget.removeAll();
                var r=0, c=0;
                var a;
                      
                // DISTANCE
                //console.log('DISTANCE');
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 230, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // AWAITING
                //console.log('AWAITING');
                c=0;
                var w = this.waiting[this.waiting[0]];
                if(++this.waiting[0] >= this.waiting.length) this.waiting[0]=1;
                this.extAdd(new qx.ui.basic.Label("<b style='color:white;font-size:10pt'>SCANNING... " + w + "</b>").set({rich: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true, colSpan: 6
                
                this.extPrint();
              } catch (e) {
                console.warn('MHTools.Loot.addLoadingLabel: ', e);
              }
            }, 
            addResourcesLabel: function(type) {
              //console.log('addResourcesLabel');
              try {
                this.extItems = [];
                //widget.removeAll();
                var r=0, c=0;                
                var hp;
                var a;
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // LOOT
                if (this.settings.showLoot.v) {
                  a = this.Display.lootArray;
                  if(typeof(a)!='undefined' && a.length>0) {
                    hp = {};
                    hp.name = '<b>Lootable Resources</b>';
                    hp.img = this.resImages;
                    t = [];  
                    t.push(this.Display.lootArray[0]);//Research 6  
                    t.push(this.Display.lootArray[1]);//Tiberium 1
                    t.push(this.Display.lootArray[2]);//Crystal 2
                    t.push(this.Display.lootArray[3]);//Credits 3           
                    hp.val = t;
                    //iconArrays.push(hp);  //store !!
                    
                    // draw icon's info              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    this.extAdd(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    //console.log('A) i',i);   
                    for(var j in hp.val) {
                      //console.log('B) i',i,'j',j);
                      //widget.add(hp.img[j], {row: r, column: c++}); 
                      this.extAdd(hp.img[j], {row: r, column: c++}); 
                      //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                      this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // TROOP
                if (this.settings.showTroops.v) { //to do  
                  a = this.Display.troopsArray;
                  if(typeof(a)!='undefined' && a.length>0) {   
                    hp = {};
                    hp.name = '<b>Troop Strength</b>';
                    hp.img = this.troopImages;
                    t = [];
                    t.push(this.Display.troopsArray[0]);
                    if (this.settings.showTroopsExtra.v) {
                      t.push(this.Display.troopsArray[1]);//inf
                      t.push(this.Display.troopsArray[2]);//veh
                      t.push(this.Display.troopsArray[3]);//stu
                      //t.push(this.Display.troopsArray[4]);//air
                    }              
                    hp.val = t;
                    // draw icon's info                            
                    c=0;
                    //widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    this.extAdd(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    //console.log('A) i',i);
                    c=2;
                    for(var j=1;j<hp.val.length;j++) {
                      //console.log('B) i',i,'j',j);
                      //widget.add(hp.img[j-1], {row: r,column: c++}); 
                      this.extAdd(hp.img[j-1], {row: r,column: c++}); 
                      //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                      this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // INFO
                a = this.Display.infoArrays;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.infoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.infoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                      c+=2;
                    }
                    r++;
                  }
                } 
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {       
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
                // WARNING
                c=0;
                if(type == "r") {
                  //this.extAdd(new qx.ui.basic.Label("<span style='color:blue'><b>Stored data. Wait...</b></span>").set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6});
                  this.extAdd(new qx.ui.basic.Label("<b style='color:white;font-size:10pt'>[*STORED DATA. WAIT...]</b>").set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6});
                }
                
                this.extPrint();
                
              } catch (e) {
                console.warn('MHTools.Loot.addResourcesLabel(): ', e);
              }
            },       
            addFriendlyLabel: function(widget) {
              //console.log('addFriendlyLabel');
              try {              
                this.extItems = [];
                //widget.removeAll();
                var a;
                var r=0, c=0;
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) {    
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {  
                  c=0;
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
                this.extPrint();

              } catch (e) {
                console.warn('MHTools.Loot.addFriendlyLabel: ', e);
              }
            },
            // OPTIONS
            optionsTab: null,
            optionsPage: null,
            btnApply: null,
            optionsStoreName: 'MHToolLootOptions',
            addLootPage: function() {            
              //console.log('addLootPage');
              try {
                if(!MHTools.OptionsPage) OptionsPage();
                
                if(!this.optionsTab) {
                  //Create Tab
                  this.optionsTab = MHTools.OptionsPage.getInstance();
                }
                this.optionsPage = this.optionsTab.addPage("Loot");
                this.optionsPage.setLayout(new qx.ui.layout.VBox());
                // ...
                this.optionsPage.add(new qx.ui.basic.Label("<b>Options:</b></br>").set({rich: true}));//, textColor: red
                var i = 0;
                for(var k in this.settings) {
                  this.settings[k].cb = new qx.ui.form.CheckBox(this.settings[k].l).set({
                    value: this.settings[k].v,
                    paddingLeft: 10
                  });
                  this.settings[k].cb.addListener("execute", this.optionsChanged, this);
                  this.optionsPage.add(this.settings[k].cb);//, {row:1+i++, column:3});
                }
                //typeGet
                //this.optionsPage.add(new qx.ui.basic.Label("<b>Obf:"+this.typeGet()+"</b>").set({rich: true}));//, textColor: red
                //  container.add(new qx.ui.core.Spacer(50));
                this.loadOptions();
                this.addButtons();               
              } catch (e) {
                console.warn("MHTool.Loot.addLootPage: ", e);
              }           
            },
            addButtons: function() {
              try {
                this.btnApply = new qx.ui.form.Button("Apply");
                this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
                
                var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
                c.setMarginTop(20);
                c.add(this.btnApply);
                this.optionsPage.add(c);
                
                this.btnApply.addListener("execute", this.applyOptions, this); 
                this.btnApply.setEnabled(false);
              } catch (e) {
                console.warn("MHTool.Loot.addButtons: ", e);
              }
            },
            optionsChanged: function() {
              var c = false;
              for(var k in this.settings) {
                c = c || (this.settings[k].v != this.settings[k].cb.getValue());
              }
              this.btnApply.setEnabled(c);
            },
            applyOptions: function(e) {
              //console.log("applyOptions e:",e);
              this.saveOptions();
              this.btnApply.setEnabled(false); 
            },
            saveOptions: function() {   
              var c = {};
              var i = 0;
              for(var k in this.settings) {
                c[k] = this.settings[k].cb.getValue();
                this.settings[k].v = c[k];
              }
              var S = ClientLib.Base.LocalStorage;
              if (S.get_IsSupported()) S.SetItem(this.optionsStoreName, c);
            },
            loadOptions: function() {
              try {
                var c = {};            
                var S = ClientLib.Base.LocalStorage;
                if (S.get_IsSupported()) c = S.GetItem(this.optionsStoreName);
                //console.log('loadOptions c:',c);
                if(c===null) c = {};
                var i = 0;              
                for(var k in this.settings) {
                  if(typeof(c[k])!='undefined') {
                    this.settings[k].cb.setValue(c[k]);
                    this.settings[k].v = c[k];
                  } else {
                    this.settings[k].cb.setValue(this.settings[k].d);
                    this.settings[k].v = this.settings[k].d;
                  }
                }             
                //console.log('loadOptions settings:',this.settings);
              } catch (e) {
                  console.warn("MHTool.Loot.loadOptions: ", e);
              }
            }
          }//members
        });      
      } catch (e) {
        console.warn("qx.Class.define(MHTools.Loot: ", e);      
      }
      //======================================================= 
      // START
      MHTools.Loot.getInstance();
    }//function MHToolsLootCreate
    //=======================================================   
    function LoadExtension() {
      try {
        if (typeof(qx) != 'undefined') {
          //if (qx.core.Init.getApplication().getMenuBar() !== null) {
          if (!!qx.core.Init.getApplication().getMenuBar()) {
            MHToolsLootCreate();
            return; // done
          } 
        }
      } catch (e) {
        if (typeof(console) != 'undefined') console.log('LoadExtension:',e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
      window.setTimeout(LoadExtension, 1000); // force it
    }
    LoadExtension();
  };
  //=======================================================
  function Inject() {
    var script = document.createElement('script');
    txt = MHLootMain.toString();
    script.innerHTML = '(' + txt + ')();';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  Inject();
})();

// ================================================================================================================================================================
// =========================================================================  Extra MenÃ¼ MOD    ===================================================================
// ================================================================================================================================================================

(function () {
	var AMMinnerHTML = function () {
		function AMM() {
			qx.Class.define("Addons.AddonMainMenu",{
				type : "singleton",
				extend : qx.core.Object,
				construct: function () { 				
					this.mainMenuContent = new qx.ui.menu.Menu();
					this.mainMenuButton = new qx.ui.form.MenuButton("EXTRAS", null , this.mainMenuContent);
					this.mainMenuButton.set({
						width : 82,
						appearance : "button-bar-right",
						toolTipText : "R2D hilft ^^"
					});
					var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU);
                    var childs = mainBar.getChildren()[1].getChildren();
                    
                    for( var z = childs.length - 1; z>=0;z--){	                       
						if( typeof childs[z].setAppearance === "function"){							
							if( childs[z].getAppearance() == "button-bar-right"){
								childs[z].setAppearance("button-bar-center");
							}
						}
                    }
					
					mainBar.getChildren()[1].add(this.mainMenuButton);					
					mainBar.getChildren()[0].setScale(true); //kosmetik
					mainBar.getChildren()[0].setWidth(764 + 80 );	//kosmetik				
					//console.log("Button added");
                    Addons_AddonMainMenu = "loaded";
				},
				members :
				{
					mainMenuContent : null,
					mainMenuButton : null,
					AddMainMenu: function (name,command,key) {
						if(name == null){
							console.log("Addons.AddonMainMenu.AddSubMenu: name empty");
							return;
						}
						if(command == null){
							console.log("Addons.AddonMainMenu.AddMainMenu: command empty");
							return;
						}
						if(key != null){
							var newCommand = new qx.ui.core.Command(key);
							newCommand.addListener("execute", command);
							var button = new qx.ui.menu.Button(name, null, newCommand);
						} else {
							var button = new qx.ui.menu.Button(name);
							button.addListener("execute", command);
						}
						
						this.mainMenuContent.add(button);
						
					},
					AddSubMainMenu: function (name) {	
						if(name == null){
							console.log("Addons.AddonMainMenu.AddSubMainMenu: name empty");
							return;
						}					
						var subMenu = new qx.ui.menu.Menu;
						var button = new qx.ui.menu.Button(name, null, null, subMenu);
						this.mainMenuContent.add(button);
						return subMenu;
					},
					AddSubMenu: function (subMenu,name,command,key) {		
						if(name == null){
							console.log("Addons.AddonMainMenu.AddSubMenu: name empty");
							return;
						}
						if(command == null){
							console.log("Addons.AddonMainMenu.AddSubMenu: command empty");
							return;
						}						
						if(subMenu == null){
							console.log("Addons.AddonMainMenu.AddSubMenu: subMenu empty");
							return;
						}
						
						if(key != null){
							var newCommand = new qx.ui.core.Command(key);
							newCommand.addListener("execute", command);
							var button = new qx.ui.menu.Button(name, null, newCommand);
						} else {
							var button = new qx.ui.menu.Button(name);
							button.addListener("execute", command);
						}						
						subMenu.add(button);
						
						
						
						
						var subMenu = new qx.ui.menu.Menu;
						var actionsButton = new qx.ui.menu.Button(name, null, null, subMenu);
						return subMenu;
					}
				}
			});
            Addons.AddonMainMenu.getInstance();
            
			//--HAUPTMENÃœ----
			var addonmenu  = Addons.AddonMainMenu.getInstance();		
            addonmenu.AddMainMenu("WELTKARTE 31",function(){window.open("http://map.tiberium-alliances.com/map/225", "_blank");;},"ALT+M");
			addonmenu.AddMainMenu("R2D Script Collection 1.60b TACS 3.0b",function(){window.open("http://userscripts.org/scripts/show/175493", "_blank")},"ALT+H");
			
			function debugfunction(k){
            	console.log("working key:" + k);
			}
		}
		
		
		
		function AMM_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
					AMM();
				} else {
					window.setTimeout(AMM_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("AMM_checkIfLoaded: ", e);
			}
		}
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(AMM_checkIfLoaded, 1000);
            Addons_AddonMainMenu = "install";
		}
	}
	try {
		var AMMS = document.createElement("script");
		AMMS.innerHTML = "(" + AMMinnerHTML.toString() + ")();";
		AMMS.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(AMMS);
		}
	} catch (e) {
		console.log("AMMinnerHTML init error: ", e);
	}
})();
