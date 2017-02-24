"use strict";
var core_1 = require("@angular/core");
var color_1 = require("color");
var search_bar_1 = require("ui/search-bar");
var page_1 = require("ui/page");
var tab_view_1 = require("ui/tab-view");
var elementRegistryModule = require("nativescript-angular/element-registry");
var http_1 = require("@angular/http");
var AppComponent = (function () {
    function AppComponent(page, http) {
        this.http = http;
        page.actionBarHidden = true;
        elementRegistryModule.registerElement("CardView", function () { return require("nativescript-cardview").CardView; });
    }
    AppComponent.prototype.search = function (artist) {
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
        }
        else if (card.ios) {
            card.shadowOffsetWidth = 10;
            card.shadowColor = new color_1.Color('#3489db').ios;
        }
        this.nsNearbyLayout.addChild(card);
    };
    AppComponent.prototype.getArtistsEvents = function (artist) {
        var _this = this;
        //stores the artists per event
        var eventDetails = {};
        this.http.get("http://api.songkick.com/api/3.0/events.json?apikey=kWvqvn4PIBVxIuqH&artist_name=" + artist)
            .subscribe(function (result) {
            var json = result.json();
            console.log("res|" + artist + "|");
            if (json.resultsPage != null) {
                var resultsPage = json.resultsPage;
                var results = resultsPage.results;
                var events = results.event; //array
                events.forEach(function (e) {
                    var performers = e.performance; //array
                    var eventName = e.displayName;
                    // console.log(eventName);
                    var artists = new Set();
                    performers.forEach(function (perf) {
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
                    _this.getPreviewSong();
                });
            }
            //this.stocks.push(result);
        }, function (error) {
            console.log("ERROR: ", error);
        });
        return eventDetails;
    };
    AppComponent.prototype.getPreviewSong = function () {
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
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.nsNearbyLayout = this.nearbyLayout.nativeElement;
        this.setupTabs();
        this.setupSearchBar();
    };
    AppComponent.prototype.setupSearchBar = function () {
        var _this = this;
        this.nsSearchBar = this.ngSearchBar.nativeElement;
        this.nsSearchBar.backgroundColor = new color_1.Color("#FAFAFA");
        this.nsSearchBar.textFieldHintColor = new color_1.Color("rgba(0,0,0,.38)");
        this.nsSearchBar.color = new color_1.Color("black");
        this.nsSearchBar.on(search_bar_1.SearchBar.submitEvent, function (e) {
            // console.log( e.object.get("text"));
            _this.search(e.object.get("text"));
            _this.nsSearchBar.dismissSoftInput();
        });
        this.nsSearchBar.dismissSoftInput();
        // setTimeout(function () {
        //   console.log("dismsi");
        //   this.nsSearchBar.dismissSoftInput();
        // }, 1000);
    };
    AppComponent.prototype.setupTabs = function () {
        this.tabView = this.tab.nativeElement;
        this.tabView.selectedIndex = 1;
        this.tabView.tabTextColor = new color_1.Color("White");
        this.tabView.selectedTabTextColor = new color_1.Color("White");
        this.tabView.selectedColor = new color_1.Color("white");
        this.tabView.tabsBackgroundColor = new color_1.Color("#9F50CB");
        this.tab.nativeElement.on(tab_view_1.TabView.selectedIndexChangedEvent, function (arg) {
            // console.log(arg.oldIndex);
            // for (var item in arg) {
            // }
        });
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild('tab'),
    __metadata("design:type", core_1.ElementRef)
], AppComponent.prototype, "tab", void 0);
__decorate([
    core_1.ViewChild('searchBar'),
    __metadata("design:type", core_1.ElementRef)
], AppComponent.prototype, "ngSearchBar", void 0);
__decorate([
    core_1.ViewChild('fav'),
    __metadata("design:type", core_1.ElementRef)
], AppComponent.prototype, "favLayout", void 0);
__decorate([
    core_1.ViewChild('nearby'),
    __metadata("design:type", core_1.ElementRef)
], AppComponent.prototype, "nearbyLayout", void 0);
__decorate([
    core_1.ViewChild('search'),
    __metadata("design:type", core_1.ElementRef)
], AppComponent.prototype, "searchLayout", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "./app.component.html",
        styles: ["app.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page, http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUErRDtBQUMvRCwrQkFBNkI7QUFDN0IsNENBQXdDO0FBQ3hDLGdDQUE2QjtBQUM3Qix3Q0FBb0M7QUFJcEMsNkVBQStFO0FBQy9FLHNDQUFxQztBQVFyQyxJQUFhLFlBQVk7SUFZckIsc0JBQVksSUFBVSxFQUFVLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFDTSw2QkFBTSxHQUFiLFVBQWMsTUFBYztRQUV4QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxQixpRUFBaUU7UUFDakUscURBQXFEO1FBQ3JELG9HQUFvRztRQUNwRyx5SUFBeUk7UUFDekksa0hBQWtIO1FBQ2xILG9CQUFvQjtRQUNwQixjQUFjO1FBR2QsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3pELElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFJMUIscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixnREFBZ0Q7UUFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUks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eUJBQXlCLEVBQUUsVUFBUyxHQUFHO1lBQ3JFLDZCQUE2QjtZQUM3QiwwQkFBMEI7WUFDMUIsSUFBSTtRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQTlNRCxJQThNQztBQXhNcUI7SUFBakIsZ0JBQVMsQ0FBQyxLQUFLLENBQUM7OEJBQU0saUJBQVU7eUNBQUM7QUFDVjtJQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQzs4QkFBYyxpQkFBVTtpREFBQztBQUM5QjtJQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQzs4QkFBWSxpQkFBVTsrQ0FBQztBQUNuQjtJQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQzs4QkFBZSxpQkFBVTtrREFBQztBQUN6QjtJQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQzs4QkFBZSxpQkFBVTtrREFBQztBQVZyQyxZQUFZO0lBTnhCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsc0JBQXNCO1FBQ25DLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztLQUN0QixDQUFDO3FDQWNvQixXQUFJLEVBQWdCLFdBQUk7R0FaakMsWUFBWSxDQThNeEI7QUE5TVksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb2xvcn0gIGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gXCJ1aS90YWItdmlld1wiO1xuaW1wb3J0IHtMYWJlbH0gZnJvbSBcInVpL2xhYmVsXCI7XG5pbXBvcnQge1N0YWNrTGF5b3V0fSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcbmltcG9ydCB7R2VzdHVyZVR5cGVzfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcbmltcG9ydCAqIGFzIGVsZW1lbnRSZWdpc3RyeU1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcbmltcG9ydCB7IEh0dHAgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FwcC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlczogW1wiYXBwLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gICAgLy8gcHVibGljIHNlYXJjaFBocmFzZTogc3RyaW5nOyAvL2JpbmRpbmcgZmFpbHVyZVxuICAgIG5zU2VhcmNoQmFyOiBTZWFyY2hCYXI7XG4gICAgdGFiVmlldzogVGFiVmlldztcbiAgICBuc05lYXJieUxheW91dCA6IFN0YWNrTGF5b3V0O1xuXG4gICAgQFZpZXdDaGlsZCgndGFiJykgdGFiOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaEJhcicpIG5nU2VhcmNoQmFyOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2ZhdicpIGZhdkxheW91dDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCduZWFyYnknKSBuZWFyYnlMYXlvdXQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoJykgc2VhcmNoTGF5b3V0OiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocGFnZTogUGFnZSwgcHJpdmF0ZSBodHRwOiBIdHRwKSB7XG4gICAgICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgZWxlbWVudFJlZ2lzdHJ5TW9kdWxlLnJlZ2lzdGVyRWxlbWVudChcIkNhcmRWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY2FyZHZpZXdcIikuQ2FyZFZpZXcpO1xuICAgIH1cbiAgICBwdWJsaWMgc2VhcmNoKGFydGlzdDogc3RyaW5nKXtcblxuICAgICAgICB2YXIgZXZlbnREZXRhaWxzID0gdGhpcy5nZXRBcnRpc3RzRXZlbnRzKGFydGlzdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGVzc3N0MTExdFwiKTtcblxuICAgICAgICAvLyA8Q2FyZFZpZXcgY2xhc3M9XCJldmVudFwiIG1hcmdpbj1cIjEwXCIgZWxldmF0aW9uPVwiNDBcIiByYWRpdXM9XCIxXCI+XG4gICAgICAgIC8vICAgICA8R3JpZExheW91dCByb3dzPVwiMjUwLCAzMCwgMzBcIiBjb2x1bW5zPVwiYXV0b1wiPlxuICAgICAgICAvLyAgICAgICAgIDxJbWFnZSBzcmM9XCJ+L2ltYWdlcy9oZWFkZXIuanBnXCIgc3RyZXRjaD1cImFzcGVjdEZpdFwiIHJvdz1cIjBcIiBjb2w9XCIxXCIgY29sU3Bhbj1cIjFcIj48L0ltYWdlPlxuICAgICAgICAvLyAgICAgICAgIDxMYWJlbCBjbGFzcz1cImV2ZW50VGl0bGVcIiBob3Jpem9udGFsQWxpZ25tZW50PVwibGVmdFwiIHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCIgdGV4dD1cIml0ZW0uQ3JlYXRlZEJ5XCIgcm93PVwiMVwiIGNvbD1cIjFcIj48L0xhYmVsPlxuICAgICAgICAvLyAgICAgICAgIDxMYWJlbCBjbGFzcz1cImV2ZW50RGV0YWlsc1wiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJsZWZ0XCIgdGV4dD1cIml0ZW0uVXBkYXRlZERhdGVcIiByb3c9XCIyXCIgY29sPVwiMVwiPjwvTGFiZWw+XG4gICAgICAgIC8vICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgIC8vIDwvQ2FyZFZpZXc+XG5cblxuICAgICAgICB2YXIgQ2FyZFZpZXcgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtY2FyZHZpZXcnKS5DYXJkVmlldztcbiAgICAgICAgdmFyIGNhcmQgPSBuZXcgQ2FyZFZpZXcoKTtcblxuICAgICAgICBcblxuICAgICAgICAvLyBjYXJkLmhlaWdodCA9IDEwMDtcbiAgICAgICAgLy8gY2FyZC53aWR0aCA9IDUwMDtcbiAgICAgICAgLy8gY2FyZC5yYWRpdXMgPSA4OyAvLy8gc2FtZSBmb3IgaU9TIGFuZCBBbmRyb2lkXG4gICAgICAgIGlmIChjYXJkLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIGNhcmQuZWxldmF0aW9uID0gMTA7XG4gICAgICAgIH0gZWxzZSBpZiAoY2FyZC5pb3MpIHtcbiAgICAgICAgICAgIGNhcmQuc2hhZG93T2Zmc2V0V2lkdGggPSAxMDtcbiAgICAgICAgICAgIGNhcmQuc2hhZG93Q29sb3IgPSBuZXcgQ29sb3IoJyMzNDg5ZGInKS5pb3M7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uc05lYXJieUxheW91dC5hZGRDaGlsZChjYXJkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QXJ0aXN0c0V2ZW50cyhhcnRpc3Q6IHN0cmluZykge1xuICAgICAgICAvL3N0b3JlcyB0aGUgYXJ0aXN0cyBwZXIgZXZlbnRcbiAgICAgICAgdmFyIGV2ZW50RGV0YWlscyA9IHt9O1xuXG4gICAgICAgIHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vYXBpLnNvbmdraWNrLmNvbS9hcGkvMy4wL2V2ZW50cy5qc29uP2FwaWtleT1rV3Zxdm40UElCVnhJdXFIJmFydGlzdF9uYW1lPVwiICsgYXJ0aXN0KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gcmVzdWx0Lmpzb24oKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzfFwiICsgYXJ0aXN0ICsgXCJ8XCIpO1xuICAgICAgICAgICAgICAgIGlmIChqc29uLnJlc3VsdHNQYWdlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdHNQYWdlID0ganNvbi5yZXN1bHRzUGFnZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSByZXN1bHRzUGFnZS5yZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnRzID0gcmVzdWx0cy5ldmVudDsgLy9hcnJheVxuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmZvcm1lcnMgPSBlLnBlcmZvcm1hbmNlOyAvL2FycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gZS5kaXNwbGF5TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcnRpc3RzID0gbmV3IFNldCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJmb3JtZXJzLmZvckVhY2gocGVyZiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aXN0cy5hZGQocGVyZi5kaXNwbGF5TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc3RvcmUgYWxsIGFydGlzdHMgYXQgYW4gZXZlbnRcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50SW5mbyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEluZm8ucHVzaChhcnRpc3RzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRJbmZvLnB1c2goZS5sb2NhdGlvbi5jaXR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SW5mby5wdXNoKGUuc3RhcnQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEluZm8ucHVzaChlLnZlbnVlLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SW5mby5wdXNoKGUudXJpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnREZXRhaWxzW2V2ZW50TmFtZV0gPSBldmVudEluZm87XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudEluZm9bNF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zdGFydCBzcG90aWZ5IHByZXZpZXcgcmV0cmlldmFsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFByZXZpZXdTb25nKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vdGhpcy5zdG9ja3MucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50RGV0YWlscztcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcmV2aWV3U29uZygpIHtcbiAgICAgICAgLy8gcHVibGljIHZvaWQgc3RhcnRTcG90aWZ5UGxheWJhY2soU3RyaW5nIGFydGlzdCkge1xuICAgICAgICAvLyAgICAvLyBTZWFyY2hlcyBTcG90aWZ5J3MgQVBJIGZvciB0aGUgYXJ0aXN0XG4gICAgICAgIC8vICAgIFN0cmluZyB1cmwgPSBcImh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL3NlYXJjaD9xPVwiICsgYXJ0aXN0LnJlcGxhY2VBbGwoXCIgXCIsIFwiJTIwXCIpICsgXCImdHlwZT1hcnRpc3RcIjtcbiAgICAgICAgLy8gICAgTG9nLnYoXCJzcG90XCIsIFwiZmlyc3Q6XCIgKyB1cmwpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAvL1xuICAgICAgICAvLyAgICAvLyBUaGlzIHNlbmRzIGEgcXVlcnkgdG8gc3BvdGlmeSB0byBmaW5kIHRoZSBhcnRpc3QncyBpZCBhbmQgdGhlbiBzdGFydCdzIG11c2ljIHBsYXliYWNrLlxuICAgICAgICAvLyAgICAvL1xuICAgICAgICAvLyAgICBJb24ud2l0aChhY3Rpdml0eSlcbiAgICAgICAgLy8gICAgICAgIC5sb2FkKHVybClcbiAgICAgICAgLy8gICAgICAgIC5hc1N0cmluZygpXG4gICAgICAgIC8vICAgICAgICAuc2V0Q2FsbGJhY2sobmV3IEZ1dHVyZUNhbGxiYWNrPFN0cmluZz4oKSB7XG4gICAgICAgIC8vICAgICAgICAgIEBPdmVycmlkZVxuICAgICAgICAvLyAgICAgICAgICBwdWJsaWMgdm9pZCBvbkNvbXBsZXRlZChFeGNlcHRpb24gZSwgU3RyaW5nIHJlc3VsdCkge1xuICAgICAgICAvLyAgICAgICAgICAgIExvZy52KFwic3BvdDFcIiwgXCJyZXN1bHRcIiArIHJlc3VsdCArIFwiOlwiICsgZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICBKU09OT2JqZWN0IHNwb3RpZnlfcmV0MSA9IG5ldyBKU09OT2JqZWN0KHJlc3VsdCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIEpTT05PYmplY3QgYXJ0aXN0cyA9IHNwb3RpZnlfcmV0MS5nZXRKU09OT2JqZWN0KFwiYXJ0aXN0c1wiKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgSlNPTkFycmF5IGl0ZW1zID0gYXJ0aXN0cy5nZXRKU09OQXJyYXkoXCJpdGVtc1wiKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgSlNPTk9iamVjdCBtb3N0UG9wdWxhckFydGlzdCA9IGl0ZW1zLmdldEpTT05PYmplY3QoMCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIFN0cmluZyBhcnRpc3RJRCA9IG1vc3RQb3B1bGFyQXJ0aXN0LmdldFN0cmluZyhcImlkXCIpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgICAgICAgICBwbGF5QXJ0aXN0UHJldmlldyhhcnRpc3RJRCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgICAgICB9IGNhdGNoIChKU09ORXhjZXB0aW9uIGplKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGplLnByaW50U3RhY2tUcmFjZSgpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgfSk7XG4gICAgICAgIC8vICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAvKipcbiAgICAgICAgLy8gICAqIEBwYXJhbSBhcnRpc3RJRCBKU09OIHJlc3VsdCBmcm9tIFNwb3RpZnkgQVBJLlxuICAgICAgICAvLyAgICogICAgICAgICAgICAgICAgIFRoaXMgbWV0aG9kIHdpbGwgcmV0cmlldmUgdGhlIHByZXZpZXcgVVJMIGdhdGhlcmVkIGZyb20gdGhlIFNwb3RpZnkgQVBJLlxuICAgICAgICAvLyAgICovXG4gICAgICAgIC8vICBwdWJsaWMgdm9pZCBwbGF5QXJ0aXN0UHJldmlldyhTdHJpbmcgYXJ0aXN0SUQpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgSW9uLndpdGgoYWN0aXZpdHkpXG4gICAgICAgIC8vICAgICAgICAubG9hZChcImh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL2FydGlzdHMvXCIgKyBhcnRpc3RJRCArIFwiL3RvcC10cmFja3M/Y291bnRyeT1VU1wiKVxuICAgICAgICAvLyAgICAgICAgLmFzU3RyaW5nKClcbiAgICAgICAgLy8gICAgICAgIC5zZXRDYWxsYmFjayhuZXcgRnV0dXJlQ2FsbGJhY2s8U3RyaW5nPigpIHtcbiAgICAgICAgLy8gICAgICAgICAgQE92ZXJyaWRlXG4gICAgICAgIC8vICAgICAgICAgIHB1YmxpYyB2b2lkIG9uQ29tcGxldGVkKEV4Y2VwdGlvbiBlLCBTdHJpbmcgcmVzdWx0KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICBKU09OT2JqZWN0IHNwb3RpZnlfcmV0MiA9IG5ldyBKU09OT2JqZWN0KHJlc3VsdCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIEpTT05BcnJheSB0cmFja3MgPSBzcG90aWZ5X3JldDIuZ2V0SlNPTkFycmF5KFwidHJhY2tzXCIpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICBKU09OT2JqZWN0IHJhbmRvbVRyYWNrID0gdHJhY2tzLmdldEpTT05PYmplY3QoMSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIFN0cmluZyBwcmV2aWV3VVJMID0gcmFuZG9tVHJhY2suZ2V0U3RyaW5nKFwicHJldmlld191cmxcIik7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIG1lZGlhUGxheWVyLnNldERhdGFTb3VyY2UocHJldmlld1VSTCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIG1lZGlhUGxheWVyLnByZXBhcmUoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgbWVkaWFQbGF5ZXIuc3RhcnQoKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICAgICAgIH0gY2F0Y2ggKEV4Y2VwdGlvbiBlZSkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICBlZS5wcmludFN0YWNrVHJhY2UoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgIH0pO1xuICAgICAgICAvLyAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgICAgICB0aGlzLm5zTmVhcmJ5TGF5b3V0ID0gdGhpcy5uZWFyYnlMYXlvdXQubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB0aGlzLnNldHVwVGFicygpO1xuICAgICAgICB0aGlzLnNldHVwU2VhcmNoQmFyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldHVwU2VhcmNoQmFyKCkge1xuICAgICAgICB0aGlzLm5zU2VhcmNoQmFyID0gdGhpcy5uZ1NlYXJjaEJhci5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLm5zU2VhcmNoQmFyLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiNGQUZBRkFcIik7XG4gICAgICAgIHRoaXMubnNTZWFyY2hCYXIudGV4dEZpZWxkSGludENvbG9yID0gbmV3IENvbG9yKFwicmdiYSgwLDAsMCwuMzgpXCIpXG4gICAgICAgIHRoaXMubnNTZWFyY2hCYXIuY29sb3IgPSBuZXcgQ29sb3IoXCJibGFja1wiKTtcbiAgICAgICAgdGhpcy5uc1NlYXJjaEJhci5vbihTZWFyY2hCYXIuc3VibWl0RXZlbnQsIChlKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyggZS5vYmplY3QuZ2V0KFwidGV4dFwiKSk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaChlLm9iamVjdC5nZXQoXCJ0ZXh0XCIpKTtcbiAgICAgICAgICAgIHRoaXMubnNTZWFyY2hCYXIuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5uc1NlYXJjaEJhci5kaXNtaXNzU29mdElucHV0KCk7XG5cbiAgICAgICAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coXCJkaXNtc2lcIik7XG4gICAgICAgIC8vICAgdGhpcy5uc1NlYXJjaEJhci5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgIC8vIH0sIDEwMDApO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0dXBUYWJzKCkge1xuICAgICAgICB0aGlzLnRhYlZpZXcgPSB0aGlzLnRhYi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLnRhYlZpZXcuc2VsZWN0ZWRJbmRleCA9IDE7XG4gICAgICAgIHRoaXMudGFiVmlldy50YWJUZXh0Q29sb3IgPSBuZXcgQ29sb3IoXCJXaGl0ZVwiKVxuICAgICAgICB0aGlzLnRhYlZpZXcuc2VsZWN0ZWRUYWJUZXh0Q29sb3IgPSBuZXcgQ29sb3IoXCJXaGl0ZVwiKVxuICAgICAgICB0aGlzLnRhYlZpZXcuc2VsZWN0ZWRDb2xvciA9IG5ldyBDb2xvcihcIndoaXRlXCIpO1xuICAgICAgICB0aGlzLnRhYlZpZXcudGFic0JhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiM5RjUwQ0JcIik7XG4gICAgICAgIHRoaXMudGFiLm5hdGl2ZUVsZW1lbnQub24oVGFiVmlldy5zZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50LCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFyZy5vbGRJbmRleCk7XG4gICAgICAgICAgICAvLyBmb3IgKHZhciBpdGVtIGluIGFyZykge1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=