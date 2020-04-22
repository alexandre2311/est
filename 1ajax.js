  /*******************************************************************************************************************************
     * HTTP-Requests
     * *****************************************************************************************************************************/
    function ajaxObserver() {
        $(document).ajaxComplete(function (e, xhr, opt) {

            var url = opt.url.split("?"), action = "";

            //console.debug("0: ", url[0]);
            //console.debug("1: ", url[1]);

            if(typeof(url[1]) !== "undefined" && typeof(url[1].split(/&/)[1]) !== "undefined") {

                action = url[0].substr(5) + "/" + url[1].split(/&/)[1].substr(7);
            }


            if (PID == 84367 || PID == 104769 || PID == 1577066) {
                console.log(action);
                //console.log((JSON.parse(xhr.responseText).json));
            }
            switch (action) {
                case "/frontend_bridge/fetch": // Daily Reward
                    //$('.daily_login').find(".minimize").click();
                    break;
                case "/player/index":
                    settings();
                    if (diosettings) {
                        $('#dio_tools').click();
                        diosettings = false;
                    }
                    break;
                // Ab Grepolis Version 2.114 ist der Ajax-Request: /frontend_bridge/execute
                case "/frontend_bridge/execute":
                case "/index/switch_town":
                    if (DATA.options.str) {
                        setTimeout(function () {
                            UnitStrength.Menu.update();
                        }, 0);
                    }
                    if (DATA.options.tra) {
                        setTimeout(function () {
                            TransportCapacity.update();
                        }, 0);
                    }
                    if (DATA.options.bir) {
                        //BiremeCounter.get();
                    }
                    if (DATA.options.tic) {
                        setTimeout(function () {
                            TownIcons.changeTownIcon();
                        }, 0);

                    }
                    break;
                case "/building_docks/index":
                    if (DATA.options.bir) {
                        //BiremeCounter.getDocks();
                    }
                    break;
                case "/building_place/units_beyond":
                    if (DATA.options.bir) {
                        //BiremeCounter.getAgora();
                    }
                    //addTransporterBackButtons();
                    break;
                case "/building_place/simulator":
                    if (DATA.options.sim) {
                        Simulator.change();
                    }
                    break;
                case "/building_place/simulate":
                    if (DATA.options.sim) {
                        afterSimulation();
                    }
                    break;

                case "/alliance_forum/forum":
                case "/message/new":
                case "/message/forward":
                case "/message/view":
                case "/player_memo/load_memo_content":
                    if (DATA.options.sml) {
                        SmileyBox.add(action);
                    }
                    if (DATA.options.bbc) {
                        addForm(action);
                    }
                    break;
                case "/wonders/index":
                    if (DATA.options.per) {
                        WWTradeHandler();
                    }
                    if (DATA.options.wwc) {
                        getResWW();
                    }
                    break;
                case "/wonders/send_resources":
                    if (DATA.options.wwc) {
                        getResWW();
                    }
                    break;
                case "/ranking/alliance":
                    getPointRatioFromAllianceRanking();
                    break;
                case "/ranking/wonder_alliance":
                    getPointRatioFromAllianceRanking();
                    if (DATA.options.wwr) {
                        WorldWonderRanking.change(JSON.parse(xhr.responseText).plain.html);
                    }
                    if (DATA.options.wwi) {
                        WorldWonderIcons.activate();
                    }
                    break;
                case "/alliance/members_show":
                    getPointRatioFromAllianceMembers();
                    break;
                case "/town_info/trading":
                    addTradeMarks(15, 18, 15, "red");
                    TownTabHandler(action.split("/")[2]);
                    break;
                case "/town_overviews/trade_overview":
                    addPercentTrade(1234, false); // TODO
                case "/farm_town_overviews/get_farm_towns_for_town":
                    changeResColor();
                    break;
                case "/command_info/conquest_info":
                    if (DATA.options.str) {
                        UnitStrength.Conquest.add();
                    }
                    break;
                case "/command_info/conquest_movements":
                case "/conquest_info/getinfo":
                    if (DATA.options.cnt) {
                        countMovements();
                    }
                    break;
                case "/building_barracks/index":
                case "/building_barracks/build":
                    if (DATA.options.str) {
                        UnitStrength.Barracks.add();
                    }
                    break;
                case "/town_info/attack":
                case "/town_info/support":
                    //console.debug(JSON.parse(xhr.responseText));
                    TownTabHandler(action.split("/")[2]);

                    break;
                case "/report/index":
                    changeDropDownButton();
                    loadFilter();
                    saveFilter();
                    //removeReports();
                    break;
                case "/report/view":
                    Statistics.LuckCounter.count();
                    break;
                case "/message/default":
                case "/message/index":
                    break;
                case "/town_info/go_to_town":
                    /*
                     //console.log(Layout.wnd);
                     var windo = GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_TOWNINDEX).getID();
                     //console.log(GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_TOWNINDEX));
                     GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_TOWNINDEX).setPosition([100,400]);
                     //console.log(windo);
                     //console.log(GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_TOWNINDEX).getPosition());
                     */
                    break;
            }
        });
    }
