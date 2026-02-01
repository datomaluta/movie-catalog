import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Search } from "../search/search.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, Search],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {

}
