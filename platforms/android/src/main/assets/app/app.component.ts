import {Component, ViewChild, ElementRef} from "@angular/core";
import {Color}  from "color";
import {SearchBar} from "ui/search-bar";
import {Page} from "ui/page";
import {TabView} from "ui/tab-view";
import {Label} from "ui/label";
import {StackLayout} from "ui/layouts/stack-layout";
import {GestureTypes} from "ui/gestures";
import * as elementRegistryModule from 'nativescript-angular/element-registry';
import { Http } from "@angular/http";

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styles: ["app.css"]
})

export class AppComponent {
    // public searchPhrase: string; //binding failure
    nsSearchBar: SearchBar;
    tabView: TabView;
    nsNearbyLayout : StackLayout;

    @ViewChild('tab') tab: ElementRef;
    @ViewChild('searchBar') ngSearchBar: ElementRef;
    @ViewChild('fav') favLayout: ElementRef;
    @ViewChild('nearby') nearbyLayout: ElementRef;
    @ViewChild('search') searchLayout: ElementRef;

    constructor(page: Page, private http: Http) {
        page.actionBarHidden = true;
        elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);
    }
    public search(artist: string){

        var eventDetails = this.getArtistsEvents(artist);
        console.log("tessst111t");

        // <CardView class="event" margin="10" elevation="40" radius="1">
        //     <GridLayout rows="250, 30, 30" columns="auto">
        //         <Image src="~/images/header.jpg" stretch="aspectFit" row="0" col="1" colSpan="1"></Image>
        //         <Label class="eventTitle" horizontalAlignment="left" verticalAlignment="center" text="item.CreatedBy" row="1" col="1"></Label>
        //         <Label class="eventDetails" horizontalAlignment="left" text="item.UpdatedDate" row="2" col="1"></Label>
        //     </GridLayout>
        // </CardView>


        var CardView = require('nativescript-cardview').CardView;
        var card = new CardView();

        

        // card.height = 100;
        // card.width = 500;
        // card.radius = 8; /// same for iOS and Android
        if (card.android) {
            card.elevation = 10;
        } else if (card.ios) {
            card.shadowOffsetWidth = 10;
            card.shadowColor = new Color('#3489db').ios;
        }
        this.nsNearbyLayout.addChild(card);
    }

    public getArtistsEvents(artist: string) {
        //stores the artists per event
        var eventDetails = {};

        this.http.get("http://api.songkick.com/api/3.0/events.json?apikey=kWvqvn4PIBVxIuqH&artist_name=" + artist)
            .subscribe(result => {
                var json = result.json();

                console.log("res|" + artist + "|");
                if (json.resultsPage != null) {
                    var resultsPage = json.resultsPage;
                    var results = resultsPage.results;
                    var events = results.event; //array

                    events.forEach(e => {
                        var performers = e.performance; //array
                        var eventName = e.displayName;
                        // console.log(eventName);

                        var artists = new Set();

                        performers.forEach(perf => {
                            artists.add(perf.displayName);
                        });
                        //store all artists at an event

                        var eventInfo = [];

                        eventInfo.push(artists);

                        eventInfo.push(e.location.city);
                        eventInfo.push(e.start.date);
                        eventInfo.push(e.venue.displayName);
                        eventInfo.push(e.uri);

                        eventDetails[eventName] = eventInfo;
                        // console.log(eventInfo[4]);
                        //start spotify preview retrieval
                        this.getPreviewSong();
                    });
                }

                //this.stocks.push(result);
            }, error => {
                console.log("ERROR: ", error);
            });

            return eventDetails;

    }

    public getPreviewSong() {
        // public void startSpotifyPlayback(String artist) {
        //    // Searches Spotify's API for the artist
        //    String url = "https://api.spotify.com/v1/search?q=" + artist.replaceAll(" ", "%20") + "&type=artist";
        //    Log.v("spot", "first:" + url);
        //
        //    //
        //    // This sends a query to spotify to find the artist's id and then start's music playback.
        //    //
        //    Ion.with(activity)
        //        .load(url)
        //        .asString()
        //        .setCallback(new FutureCallback<String>() {
        //          @Override
        //          public void onCompleted(Exception e, String result) {
        //            Log.v("spot1", "result" + result + ":" + e);
        //            if (result != null) {
        //
        //              try {
        //                JSONObject spotify_ret1 = new JSONObject(result);
        //                JSONObject artists = spotify_ret1.getJSONObject("artists");
        //                JSONArray items = artists.getJSONArray("items");
        //                JSONObject mostPopularArtist = items.getJSONObject(0);
        //                String artistID = mostPopularArtist.getString("id");
        //
        //                playArtistPreview(artistID);
        //
        //              } catch (JSONException je) {
        //                je.printStackTrace();
        //              }
        //
        //            }
        //          }
        //        });
        //  }
        //
        //  /**
        //   * @param artistID JSON result from Spotify API.
        //   *                 This method will retrieve the preview URL gathered from the Spotify API.
        //   */
        //  public void playArtistPreview(String artistID) {
        //
        //    Ion.with(activity)
        //        .load("https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US")
        //        .asString()
        //        .setCallback(new FutureCallback<String>() {
        //          @Override
        //          public void onCompleted(Exception e, String result) {
        //            if (result != null) {
        //
        //              try {
        //                JSONObject spotify_ret2 = new JSONObject(result);
        //                JSONArray tracks = spotify_ret2.getJSONArray("tracks");
        //                JSONObject randomTrack = tracks.getJSONObject(1);
        //                String previewURL = randomTrack.getString("preview_url");
        //
        //                mediaPlayer.setDataSource(previewURL);
        //                mediaPlayer.prepare();
        //                mediaPlayer.start();
        //
        //              } catch (Exception ee) {
        //                ee.printStackTrace();
        //              }
        //
        //            }
        //          }
        //        });
        //  }
    }

    ngAfterViewInit() {

        this.nsNearbyLayout = this.nearbyLayout.nativeElement;

        this.setupTabs();
        this.setupSearchBar();
    }

    public setupSearchBar() {
        this.nsSearchBar = this.ngSearchBar.nativeElement;
        this.nsSearchBar.backgroundColor = new Color("#FAFAFA");
        this.nsSearchBar.textFieldHintColor = new Color("rgba(0,0,0,.38)")
        this.nsSearchBar.color = new Color("black");
        this.nsSearchBar.on(SearchBar.submitEvent, (e) => {
            // console.log( e.object.get("text"));
            this.search(e.object.get("text"));
            this.nsSearchBar.dismissSoftInput();
        });
        this.nsSearchBar.dismissSoftInput();

        // setTimeout(function () {
        //   console.log("dismsi");
        //   this.nsSearchBar.dismissSoftInput();
        // }, 1000);
    }
    public setupTabs() {
        this.tabView = this.tab.nativeElement;
        this.tabView.selectedIndex = 1;
        this.tabView.tabTextColor = new Color("White")
        this.tabView.selectedTabTextColor = new Color("White")
        this.tabView.selectedColor = new Color("white");
        this.tabView.tabsBackgroundColor = new Color("#9F50CB");
        this.tab.nativeElement.on(TabView.selectedIndexChangedEvent, function(arg) {
            // console.log(arg.oldIndex);
            // for (var item in arg) {
            // }
        });
    }
}
