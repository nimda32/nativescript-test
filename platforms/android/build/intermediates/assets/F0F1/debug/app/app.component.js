"use strict";
var core_1 = require("@angular/core");
var color_1 = require("color");
var search_bar_1 = require("ui/search-bar");
var page_1 = require("ui/page");
var tab_view_1 = require("ui/tab-view");
var AppComponent = (function () {
    function AppComponent(page) {
        this.page = page;
        this.search = "searchText";
        page.actionBarHidden = true;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.nsSearchBar = this.ngSearchBar.nativeElement;
        this.nsSearchBar.backgroundColor = new color_1.Color("#FAFAFA");
        this.nsSearchBar.textFieldHintColor = new color_1.Color("rgba(0,0,0,.38)");
        this.nsSearchBar.color = new color_1.Color("black");
        this.nsSearchBar.on(search_bar_1.SearchBar.submitEvent, function (e) {
            console.log("submit text", _this.search);
            _this.nsSearchBar.dismissSoftInput();
        });
        // setTimeout(function () {
        //   console.log("dismsi");
        //   this.nsSearchBar.dismissSoftInput();
        // }, 1000);
        this.tabView = this.tab.nativeElement;
        this.tabView.selectedIndex = 1;
        this.tabView.tabTextColor = new color_1.Color("White");
        this.tabView.selectedTabTextColor = new color_1.Color("White");
        this.tabView.selectedColor = new color_1.Color("white");
        this.tabView.tabsBackgroundColor = new color_1.Color("#9F50CB");
        this.tab.nativeElement.on(tab_view_1.TabView.selectedIndexChangedEvent, function (arg) {
            console.log(arg.oldIndex);
            for (var item in arg) {
                console.log(item);
            }
            this.nsSearchBar.dismissSoftInput();
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
    core_1.ViewChild('favs'),
    __metadata("design:type", core_1.ElementRef)
], AppComponent.prototype, "favStacl", void 0);
__decorate([
    core_1.ViewChild('nearby'),
    __metadata("design:type", core_1.ElementRef)
], AppComponent.prototype, "nearStack", void 0);
__decorate([
    core_1.ViewChild('search'),
    __metadata("design:type", core_1.ElementRef)
], AppComponent.prototype, "searchStack", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        template: "\n      <StackLayout orientation=\"vertical\">\n\n        <!--> HEADER <!-->\n        <AbsoluteLayout>\n            <Image id=\"header\" src=\"~/images/header.jpg\" width=\"100%\" height=\"130\" stretch =\"aspectFill\" >\n            </Image>\n            <SearchBar #searchBar id=\"searchBar\" hint=\"Search artists\" [(ngModel)]='search' top=\"100\" left=\"40\" ></SearchBar>\n        </AbsoluteLayout>\n\n        <!--> TABS <!-->\n        <TabView #tab id=\"tabs\">\n          <StackLayout *tabItem=\"{title: 'Favorites'}\">\n            <ScrollView orientation=\"vertical\">\n              <StackLayout #favs orientation=\"vertical\">\n                <Label text=\"test\"> </Label>\n              </ScrollView>\n            </StackLayout>\n          </StackLayout>\n          <StackLayout *tabItem=\"{title: 'Nearby Events'}\">\n            <ScrollView orientation=\"vertical\">\n              <StackLayout #nearby orientation=\"vertical\">\n              <Label text=\"test\"> </Label>\n              </StackLayout>\n            </ScrollView>\n          </StackLayout>\n          <StackLayout *tabItem=\"{title: 'Search'}\">\n          <ScrollView orientation=\"vertical\">\n            <StackLayout #search orientation=\"vertical\">\n            <Label text=\"test\"> </Label>\n            </StackLayout>\n          </ScrollView>\n          </StackLayout>\n        </TabView>\n\n      </StackLayout>\n  ",
        styles: ["app.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUErRDtBQUMvRCwrQkFBNkI7QUFDN0IsNENBQXdDO0FBQ3hDLGdDQUE2QjtBQUM3Qix3Q0FBb0M7QUErQ3BDLElBQWEsWUFBWTtJQVlyQixzQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFWOUIsV0FBTSxHQUFXLFlBQVksQ0FBQztRQVcxQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUVoQyxDQUFDO0lBR0Qsc0NBQWUsR0FBZjtRQUFBLGlCQThCQztRQTdCRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBRWxELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxhQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUNsRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxzQkFBUyxDQUFDLFdBQVcsRUFBRSxVQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVILDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IseUNBQXlDO1FBQ3pDLFlBQVk7UUFFWixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFHLElBQUksYUFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLElBQUksYUFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGtCQUFPLENBQUMseUJBQXlCLEVBQUUsVUFBUyxHQUFHO1lBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQztZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFHTCxtQkFBQztBQUFELENBQUMsQUFuREQsSUFtREM7QUE3Q3FCO0lBQWpCLGdCQUFTLENBQUMsS0FBSyxDQUFDOzhCQUFNLGlCQUFVO3lDQUFDO0FBQ1Y7SUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7OEJBQWMsaUJBQVU7aURBQUM7QUFDN0I7SUFBbEIsZ0JBQVMsQ0FBQyxNQUFNLENBQUM7OEJBQVcsaUJBQVU7OENBQUM7QUFDbkI7SUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7OEJBQVksaUJBQVU7K0NBQUM7QUFDdEI7SUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7OEJBQWMsaUJBQVU7aURBQUM7QUFWcEMsWUFBWTtJQXpDeEIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFFBQVEsRUFBRSxvNENBb0NYO1FBQ0MsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO0tBQ3RCLENBQUM7cUNBYTRCLFdBQUk7R0FackIsWUFBWSxDQW1EeEI7QUFuRFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb2xvcn0gIGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gXCJ1aS90YWItdmlld1wiO1xuaW1wb3J0IHtMYWJlbH0gZnJvbSBcInVpL2xhYmVsXCI7XG5pbXBvcnQge1Njcm9sbFZpZXd9IGZyb20gXCJ1aS9zY3JvbGwtdmlld1wiO1xuaW1wb3J0IHtHZXN0dXJlVHlwZXN9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICA8U3RhY2tMYXlvdXQgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxuXG4gICAgICAgIDwhLS0+IEhFQURFUiA8XFwhLS0+XG4gICAgICAgIDxBYnNvbHV0ZUxheW91dD5cbiAgICAgICAgICAgIDxJbWFnZSBpZD1cImhlYWRlclwiIHNyYz1cIn4vaW1hZ2VzL2hlYWRlci5qcGdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMzBcIiBzdHJldGNoID1cImFzcGVjdEZpbGxcIiA+XG4gICAgICAgICAgICA8L0ltYWdlPlxuICAgICAgICAgICAgPFNlYXJjaEJhciAjc2VhcmNoQmFyIGlkPVwic2VhcmNoQmFyXCIgaGludD1cIlNlYXJjaCBhcnRpc3RzXCIgWyhuZ01vZGVsKV09J3NlYXJjaCcgdG9wPVwiMTAwXCIgbGVmdD1cIjQwXCIgPjwvU2VhcmNoQmFyPlxuICAgICAgICA8L0Fic29sdXRlTGF5b3V0PlxuXG4gICAgICAgIDwhLS0+IFRBQlMgPFxcIS0tPlxuICAgICAgICA8VGFiVmlldyAjdGFiIGlkPVwidGFic1wiPlxuICAgICAgICAgIDxTdGFja0xheW91dCAqdGFiSXRlbT1cInt0aXRsZTogJ0Zhdm9yaXRlcyd9XCI+XG4gICAgICAgICAgICA8U2Nyb2xsVmlldyBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+XG4gICAgICAgICAgICAgIDxTdGFja0xheW91dCAjZmF2cyBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJ0ZXN0XCI+IDwvTGFiZWw+XG4gICAgICAgICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICA8U3RhY2tMYXlvdXQgKnRhYkl0ZW09XCJ7dGl0bGU6ICdOZWFyYnkgRXZlbnRzJ31cIj5cbiAgICAgICAgICAgIDxTY3JvbGxWaWV3IG9yaWVudGF0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0ICNuZWFyYnkgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgICAgICAgICA8TGFiZWwgdGV4dD1cInRlc3RcIj4gPC9MYWJlbD5cbiAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgIDxTdGFja0xheW91dCAqdGFiSXRlbT1cInt0aXRsZTogJ1NlYXJjaCd9XCI+XG4gICAgICAgICAgPFNjcm9sbFZpZXcgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgICAgICAgPFN0YWNrTGF5b3V0ICNzZWFyY2ggb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJ0ZXN0XCI+IDwvTGFiZWw+XG4gICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICA8L1RhYlZpZXc+XG5cbiAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gIGAsXG4gICAgc3R5bGVzOiBbXCJhcHAuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cbiAgICBzZWFyY2g6IHN0cmluZyA9IFwic2VhcmNoVGV4dFwiO1xuICAgIG5zU2VhcmNoQmFyOiBTZWFyY2hCYXI7XG4gICAgdGFiVmlldzogVGFiVmlldztcblxuICAgIEBWaWV3Q2hpbGQoJ3RhYicpIHRhYjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdzZWFyY2hCYXInKSBuZ1NlYXJjaEJhcjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdmYXZzJykgZmF2U3RhY2w6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnbmVhcmJ5JykgbmVhclN0YWNrOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaCcpIHNlYXJjaFN0YWNrOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcblxuICAgIH1cblxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLm5zU2VhcmNoQmFyID0gdGhpcy5uZ1NlYXJjaEJhci5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMubnNTZWFyY2hCYXIuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKFwiI0ZBRkFGQVwiKTtcbiAgICAgICAgdGhpcy5uc1NlYXJjaEJhci50ZXh0RmllbGRIaW50Q29sb3IgPSBuZXcgQ29sb3IoXCJyZ2JhKDAsMCwwLC4zOClcIilcbiAgICAgICAgdGhpcy5uc1NlYXJjaEJhci5jb2xvciA9IG5ldyBDb2xvcihcImJsYWNrXCIpO1xuICAgICAgICB0aGlzLm5zU2VhcmNoQmFyLm9uKFNlYXJjaEJhci5zdWJtaXRFdmVudCwgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VibWl0IHRleHRcIiwgdGhpcy5zZWFyY2gpO1xuICAgICAgICAgICAgdGhpcy5uc1NlYXJjaEJhci5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiZGlzbXNpXCIpO1xuICAgICAgICAvLyAgIHRoaXMubnNTZWFyY2hCYXIuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAvLyB9LCAxMDAwKTtcblxuICAgICAgICB0aGlzLnRhYlZpZXcgPSB0aGlzLnRhYi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLnRhYlZpZXcuc2VsZWN0ZWRJbmRleCA9IDE7XG4gICAgICAgIHRoaXMudGFiVmlldy50YWJUZXh0Q29sb3IgPSBuZXcgQ29sb3IoXCJXaGl0ZVwiKVxuICAgICAgICB0aGlzLnRhYlZpZXcuc2VsZWN0ZWRUYWJUZXh0Q29sb3IgPSBuZXcgQ29sb3IoXCJXaGl0ZVwiKVxuICAgICAgICB0aGlzLnRhYlZpZXcuc2VsZWN0ZWRDb2xvciA9IG5ldyBDb2xvcihcIndoaXRlXCIpO1xuICAgICAgICB0aGlzLnRhYlZpZXcudGFic0JhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiM5RjUwQ0JcIik7XG4gICAgICAgIHRoaXMudGFiLm5hdGl2ZUVsZW1lbnQub24oVGFiVmlldy5zZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50LCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFyZy5vbGRJbmRleCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpdGVtIGluIGFyZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5uc1NlYXJjaEJhci5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgIH0pXG5cbiAgICB9XG5cblxufVxuIl19