import {Component, ViewChild, ElementRef} from "@angular/core";
import {Color}  from "color";
import {SearchBar} from "ui/search-bar";
import {Page} from "ui/page";
import {TabView} from "ui/tab-view";
import {Label} from "ui/label";
import {ScrollView} from "ui/scroll-view";
import {GestureTypes} from "ui/gestures";


@Component({
    selector: "my-app",
    template: `
      <StackLayout orientation="vertical">

        <!--> HEADER <\!-->
        <AbsoluteLayout>
            <Image id="header" src="~/images/header.jpg" width="100%" height="130" stretch ="aspectFill" >
            </Image>
            <SearchBar #searchBar id="searchBar" hint="Search artists" [(ngModel)]='search' top="100" left="40" ></SearchBar>
        </AbsoluteLayout>

        <!--> TABS <\!-->
        <TabView #tab id="tabs">
          <StackLayout *tabItem="{title: 'Favorites'}">
            <ScrollView orientation="vertical">
              <StackLayout #favs orientation="vertical">
                <Label text="test"> </Label>
              </ScrollView>
            </StackLayout>
          </StackLayout>
          <StackLayout *tabItem="{title: 'Nearby Events'}">
            <ScrollView orientation="vertical">
              <StackLayout #nearby orientation="vertical">
              <Label text="test"> </Label>
              </StackLayout>
            </ScrollView>
          </StackLayout>
          <StackLayout *tabItem="{title: 'Search'}">
          <ScrollView orientation="vertical">
            <StackLayout #search orientation="vertical">
            <Label text="test"> </Label>
            </StackLayout>
          </ScrollView>
          </StackLayout>
        </TabView>

      </StackLayout>
  `,
    styles: ["app.css"]
})
export class AppComponent {

    search: string = "searchText";
    nsSearchBar: SearchBar;
    tabView: TabView;

    @ViewChild('tab') tab: ElementRef;
    @ViewChild('searchBar') ngSearchBar: ElementRef;
    @ViewChild('favs') favStacl: ElementRef;
    @ViewChild('nearby') nearStack: ElementRef;
    @ViewChild('search') searchStack: ElementRef;

    constructor(private page: Page) {
        page.actionBarHidden = true;

    }


    ngAfterViewInit() {
        this.nsSearchBar = this.ngSearchBar.nativeElement;

        this.nsSearchBar.backgroundColor = new Color("#FAFAFA");
        this.nsSearchBar.textFieldHintColor = new Color("rgba(0,0,0,.38)")
        this.nsSearchBar.color = new Color("black");
        this.nsSearchBar.on(SearchBar.submitEvent, (e) => {
            console.log("submit text", this.search);
            this.nsSearchBar.dismissSoftInput();
        });

        // setTimeout(function () {
        //   console.log("dismsi");
        //   this.nsSearchBar.dismissSoftInput();
        // }, 1000);

        this.tabView = this.tab.nativeElement;
        this.tabView.selectedIndex = 1;
        this.tabView.tabTextColor = new Color("White")
        this.tabView.selectedTabTextColor = new Color("White")
        this.tabView.selectedColor = new Color("white");
        this.tabView.tabsBackgroundColor = new Color("#9F50CB");
        this.tab.nativeElement.on(TabView.selectedIndexChangedEvent, function(arg) {
            console.log(arg.oldIndex);
            for (var item in arg) {
                console.log(item);
            }
            this.nsSearchBar.dismissSoftInput();
        })

    }


}
